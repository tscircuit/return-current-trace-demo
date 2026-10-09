import { mkdir, readFile, realpath, writeFile } from "node:fs/promises"
import { isAbsolute, relative, resolve, sep } from "node:path"
import { randomUUID } from "node:crypto"
import { DEFAULT_SOURCE } from "./author"
import { simulateRun, SimulationRunError } from "./simulate"
import { fabricationStackup } from "../generate-input"
import type { Channel, DemoDefaults, RunArtifacts, RunState } from "./types"

const exampleDirectory = resolve(import.meta.dir, "..")
const terminal = new Set(["completed", "failed", "cancelled"])
const controls = new WeakMap<object, () => Promise<void>>()
type RequestInput = { source: string; settings: Record<string, unknown>; stackup: Record<string, unknown> }
type ProcessDetails = { kind: "author" | "solver"; pid: number; startedAt: string; exitedAt?: string; exitCode?: number }
type Job = RunState & {
  directory: string
  controller: AbortController
  createdAt: number
  finishedAt?: number
  timedOut?: boolean
  processes: ProcessDetails[]
  inputCircuitJson?: any[]
  channels?: Channel[]
  downloads: Record<string, string>
  done?: Promise<void>
}
export type DemoServerOptions = {
  port?: number
  runRoot?: string
  nodeExecutable?: string
  authorExecutable?: string
  timeoutMs?: number
  staticDirectory?: string
}

export function channelsFromInput(circuitJson: any[], receipt: any): Channel[] {
  const config = circuitJson.find((record) => record.type === "simulation_pcb_noise_configuration")
  return receipt.channelTraces.map((mapping: any) => {
    const load = config.terminations.find((termination: any) => termination.name === `${mapping.channel}_load`)
    return {
      name: mapping.channel, role: mapping.role, pcbTraceIds: mapping.pcb_trace_ids,
      observations: config.observations.filter((observation: any) => observation.port_name === mapping.source_port_name || observation.port_name === load?.port_name)
        .map((observation: any) => ({
          name: observation.name,
          label: `${observation.port_name === mapping.source_port_name ? "Source" : "Load"} ${observation.quantity}`,
          position: observation.port_name === mapping.source_port_name ? "source" : "load",
          quantity: observation.quantity, plots: {},
          eyeUnavailableReason: config.eyes?.some((eye: any) => eye.observation_name === observation.name)
            ? undefined : "No eye is requested for this observation",
        })),
    }
  })
}

function requestInput(value: unknown): RequestInput {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Send source, settings and stackup")
  const input = value as RequestInput
  if (typeof input.source !== "string" || !input.source.trim()) throw new Error("source must be a TSX module")
  if (Buffer.byteLength(input.source) > 128 * 1024) throw new Error("source exceeds 128 KiB")
  for (const key of ["settings", "stackup"] as const) {
    if (!input[key] || typeof input[key] !== "object" || Array.isArray(input[key])) throw new Error(`${key} must be an object`)
    if (Buffer.byteLength(JSON.stringify(input[key])) > 64 * 1024) throw new Error(`${key} exceeds 64 KiB`)
  }
  return input
}

async function persistInput(directory: string, input: RequestInput) {
  await mkdir(directory)
  await writeFile(resolve(directory, "source.tsx"), input.source, { flag: "wx" })
  await writeFile(resolve(directory, "settings.json"), JSON.stringify(input.settings, null, 2) + "\n", { flag: "wx" })
  await writeFile(resolve(directory, "stackup.json"), JSON.stringify(input.stackup, null, 2) + "\n", { flag: "wx" })
}

async function author(directory: string, signal: AbortSignal, options: DemoServerOptions,
  log: (message: string) => void, processEvent: (details: ProcessDetails) => void) {
  signal.throwIfAborted()
  const command = [options.authorExecutable ?? process.execPath, resolve(import.meta.dir, "author.ts"), directory]
  const child = Bun.spawn(command, { cwd: exampleDirectory, stdout: "pipe", stderr: "pipe" })
  let details: ProcessDetails = { kind: "author", pid: child.pid, startedAt: new Date().toISOString() }
  processEvent(details)
  let killTimer: ReturnType<typeof setTimeout> | undefined
  const cancel = () => {
    child.kill("SIGTERM")
    killTimer = setTimeout(() => child.kill("SIGKILL"), 1000)
    killTimer.unref()
  }
  signal.addEventListener("abort", cancel, { once: true })
  if (signal.aborted) cancel()
  const read = async (stream: ReadableStream<Uint8Array>) => {
    const reader = stream.getReader()
    const decoder = new TextDecoder()
    let text = ""
    for (;;) {
      const next = await reader.read()
      if (next.done) break
      const chunk = decoder.decode(next.value, { stream: true })
      text += chunk
      log(chunk)
    }
    return text + decoder.decode()
  }
  let exitCode: number | undefined
  try {
    const [stdout, stderr, code] = await Promise.all([read(child.stdout), read(child.stderr), child.exited])
    exitCode = code
    await writeFile(resolve(directory, "author.log"), stdout + stderr, { flag: "wx" })
    signal.throwIfAborted()
    if (code !== 0) throw new Error(stderr.trim() || stdout.trim() || `TSX authoring exited with status ${code}`)
    return JSON.parse(await readFile(resolve(directory, "authoring-validation.json"), "utf8"))
  } finally {
    signal.removeEventListener("abort", cancel)
    if (killTimer) clearTimeout(killTimer)
    details = { ...details, exitedAt: new Date().toISOString(), ...(exitCode === undefined ? {} : { exitCode }) }
    await writeFile(resolve(directory, "author-process.json"), JSON.stringify({ ...details, command }, null, 2) + "\n")
    processEvent(details)
  }
}

/** A stopped test or CLI server also terminates its active author/solver child. */
export async function stopDemoServer(server: object) {
  await controls.get(server)?.()
}

export function createDemoServer(options: DemoServerOptions = {}) {
  const runRoot = resolve(options.runRoot ?? resolve(exampleDirectory, "work", "interactive"))
  const jobs = new Map<string, Job>()
  const timeoutMs = options.timeoutMs ?? 5 * 60 * 1000
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) throw new Error("timeoutMs must be positive")
  const ready = mkdir(runRoot, { recursive: true })
  let active: Job | undefined
  const currentActive = () => active
  let stopping = false
  let defaultsController: AbortController | undefined
  let defaultsPromise: Promise<DemoDefaults> | undefined
  let sitePromise: Promise<string> | undefined
  const fileUrl = (id: string, file: string) => `/api/runs/${id}/files/${file.split("/").map(encodeURIComponent).join("/")}`
  const log = (job: Job, message: string) => {
    const lines = message.trim().split("\n").filter(Boolean).map((line) => line.length > 2000 ? line.slice(0, 2000) + "…" : line)
    job.logs.push(...lines)
    if (job.logs.length > 300) job.logs.splice(0, job.logs.length - 300)
  }
  const processEvent = (job: Job, details: ProcessDetails) => {
    const index = job.processes.findIndex((entry) => entry.kind === details.kind && entry.pid === details.pid)
    if (index < 0) job.processes.push(details)
    else job.processes[index] = details
  }
  const state = (job: Job) => ({
    id: job.id, status: job.status, stage: job.stage,
    elapsedMs: (job.finishedAt ?? Date.now()) - job.createdAt, logs: job.logs,
    ...(job.error ? { error: job.error } : {}),
    ...(job.artifacts ? { artifacts: job.artifacts } : {}),
    inputCircuitJson: job.inputCircuitJson, channels: job.channels,
    processes: job.processes, downloads: job.downloads,
  })
  const runJob = async (job: Job, input: RequestInput) => {
    const timer = setTimeout(() => { job.timedOut = true; job.controller.abort(new Error("Run timed out")) }, timeoutMs)
    timer.unref()
    try {
      await ready
      await persistInput(job.directory, input)
      for (const name of ["source.tsx", "settings.json", "stackup.json"]) job.downloads[name] = fileUrl(job.id, name)
      job.controller.signal.throwIfAborted()
      job.status = "running"
      log(job, "Authoring the edited TSX in a separate Bun process")
      const receipt = await author(job.directory, job.controller.signal, options,
        (message) => log(job, message), (details) => processEvent(job, details))
      job.inputCircuitJson = JSON.parse(await readFile(resolve(job.directory, "input.circuit.json"), "utf8"))
      job.channels = channelsFromInput(job.inputCircuitJson!, receipt)
      for (const name of ["input.circuit.json", "TwoLineBoard.tsx", "authoring-validation.json", "author-process.json", "author.log"])
        job.downloads[name] = fileUrl(job.id, name)
      const completed = await simulateRun(job.directory, {
        signal: job.controller.signal, nodeExecutable: options.nodeExecutable,
        onStage: (stage, message) => {
          if (["authoring", "solving", "validating", "rendering"].includes(stage)) job.stage = stage as RunState["stage"]
          log(job, message)
        },
        onLog: (message) => log(job, message),
        onProcess: (details) => processEvent(job, { kind: "solver", ...details }),
      })
      job.controller.signal.throwIfAborted()
      const result = completed as any
      const channels: Channel[] = result.channels ?? job.channels
      for (const channel of channels) for (const observation of channel.observations) {
        for (const plot of Object.values(observation.plots)) if (plot) {
          plot.svg = fileUrl(job.id, plot.svg)
          plot.png = fileUrl(job.id, plot.png)
        }
      }
      job.artifacts = {
        inputCircuitJson: job.inputCircuitJson!, channels,
        inputHash: result.inputHash ?? receipt.input_circuit_json_sha256,
        resultUrl: fileUrl(job.id, "result.circuit.json"),
        ...(result.manifestPath ? { manifestUrl: fileUrl(job.id, result.manifestPath) } : {}),
        validation: result.validation ?? { status: result.summary.validation.state, passed: 0, total: 0 },
        ...(result.capture ? { capture: result.capture } : {}),
      } satisfies RunArtifacts
      for (const name of ["source.tsx", "TwoLineBoard.tsx", "stackup.json", "author.log", "author-process.json", ...result.artifacts])
        job.downloads[name] = fileUrl(job.id, name)
      job.status = "completed"
      log(job, "Completed: current authored input, numerical checks and decoded assets validated")
    } catch (error) {
      if (job.controller.signal.aborted && !job.timedOut) {
        job.status = "cancelled"
        job.error = "Cancelled; partial run artifacts are retained"
      } else {
        job.status = "failed"
        job.error = job.timedOut ? `Run exceeded ${timeoutMs / 1000} seconds and its child process was terminated`
          : error instanceof Error ? error.message : String(error)
        if (error instanceof SimulationRunError) log(job, `${error.status}: ${job.error}`)
      }
      log(job, job.error!)
    } finally {
      clearTimeout(timer)
      job.finishedAt = Date.now()
      if (active === job) active = undefined
      for (const name of ["result.circuit.json", "cli.log", "process.json", "author.log", "author-process.json"])
        if (await Bun.file(resolve(job.directory, name)).exists()) job.downloads[name] = fileUrl(job.id, name)
      try { await writeFile(resolve(job.directory, "job.json"), JSON.stringify(state(job), null, 2) + "\n") } catch { /* Input creation may itself have failed. */ }
    }
  }
  const defaults = () => {
    if (stopping) return Promise.reject(new Error("Demo server is stopping"))
    return defaultsPromise ??= (async () => {
      const controller = new AbortController()
      defaultsController = controller
      await ready
      controller.signal.throwIfAborted()
      const input: RequestInput = {
        source: DEFAULT_SOURCE,
        settings: JSON.parse(await readFile(resolve(exampleDirectory, "settings.json"), "utf8")),
        stackup: JSON.parse(JSON.stringify(fabricationStackup)),
      }
      const directory = resolve(runRoot, `defaults_${randomUUID()}`)
      await persistInput(directory, input)
      const timer = setTimeout(() => controller.abort(new Error("Default TSX authoring timed out")), Math.max(timeoutMs, 30_000))
      timer.unref()
      try {
        const receipt = await author(directory, controller.signal, options, () => {}, () => {})
        const circuitJson = JSON.parse(await readFile(resolve(directory, "input.circuit.json"), "utf8"))
        return { ...input, circuitJson, channels: channelsFromInput(circuitJson, receipt) }
      } finally { clearTimeout(timer) }
    })()
  }
  const site = () => sitePromise ??= (async () => {
    await ready
    const output = resolve(runRoot, "_site")
    const built = await Bun.build({
      entrypoints: [resolve(options.staticDirectory ?? import.meta.dir, "index.html")],
      outdir: output, target: "browser", minify: false,
    })
    if (!built.success) throw new Error(built.logs.map(String).join("\n"))
    return output
  })()
  const json = (value: unknown, status = 200) => Response.json(value, { status, headers: { "cache-control": "no-store" } })
  const serveFile = async (root: string, name: string) => {
    if (!name || name.includes("\0") || name.includes("\\")) return json({ error: "Invalid file path" }, 400)
    const path = resolve(root, name)
    const local = relative(root, path)
    if (isAbsolute(local) || local === ".." || local.startsWith(`..${sep}`)) return json({ error: "Invalid file path" }, 400)
    let actual: string
    try { actual = await realpath(path) } catch { return json({ error: "File not found" }, 404) }
    const actualLocal = relative(await realpath(root), actual)
    if (isAbsolute(actualLocal) || actualLocal === ".." || actualLocal.startsWith(`..${sep}`)) return json({ error: "Invalid file path" }, 400)
    const file = Bun.file(actual)
    if (!await file.exists()) return json({ error: "File not found" }, 404)
    return new Response(file, { headers: { "cache-control": "no-store", "x-content-type-options": "nosniff" } })
  }
  const server = Bun.serve({
    hostname: "127.0.0.1", port: options.port ?? 3077, maxRequestBodySize: 300 * 1024,
    async fetch(request) {
      try {
        if (stopping) return json({ error: "Demo server is stopping" }, 503)
        const url = new URL(request.url)
        if (!["127.0.0.1", "localhost"].includes(url.hostname)) return json({ error: "Use the local demo URL" }, 403)
        if (request.method !== "GET" && request.method !== "HEAD") {
          const origin = request.headers.get("origin")
          if (origin !== url.origin) return json({ error: "Run requests must come from this demo" }, 403)
          if (request.headers.get("sec-fetch-site") === "cross-site") return json({ error: "Run requests must come from this demo" }, 403)
        }
        if (request.method === "GET" && url.pathname === "/api/health") return json({ ready: true })
        if (request.method === "GET" && url.pathname === "/api/defaults") return json(await defaults())
        if (request.method === "POST" && url.pathname === "/api/runs") {
          if (active) return json({ error: "A run is already active", id: active.id }, 409)
          const input = requestInput(await request.json())
          if (stopping) return json({ error: "Demo server is stopping" }, 503)
          const busy = currentActive()
          if (busy) return json({ error: "A run is already active", id: busy.id }, 409)
          const id = randomUUID()
          const job: Job = { id, status: "queued", stage: "authoring", elapsedMs: 0, logs: [],
            directory: resolve(runRoot, id), controller: new AbortController(), createdAt: Date.now(), processes: [], downloads: {} }
          jobs.set(id, job)
          active = job
          job.done = runJob(job, input)
          return json({ id }, 202)
        }
        const match = /^\/api\/runs\/([a-f0-9-]+)(?:\/(cancel|files)(?:\/(.*))?)?$/.exec(url.pathname)
        if (match) {
          const job = jobs.get(match[1]!)
          if (!job) return json({ error: "Unknown run" }, 404)
          if (request.method === "GET" && !match[2]) return json(state(job))
          if (request.method === "POST" && match[2] === "cancel") {
            if (!terminal.has(job.status)) { log(job, "Cancellation requested"); job.controller.abort(new Error("Cancelled by user")) }
            return json(state(job), 202)
          }
          if (request.method === "GET" && match[2] === "files" && match[3]) {
            const name = match[3].split("/").map(decodeURIComponent).join("/")
            return serveFile(job.directory, name)
          }
          return json({ error: "Method not allowed" }, 405)
        }
        if (url.pathname.startsWith("/api/")) return json({ error: "Route not found" }, 404)
        if (request.method !== "GET") return json({ error: "Method not allowed" }, 405)
        const name = url.pathname === "/" ? "index.html" : decodeURIComponent(url.pathname.slice(1))
        return serveFile(await site(), name)
      } catch (error) {
        return json({ error: error instanceof Error ? error.message : String(error) }, 400)
      }
    },
  })
  controls.set(server, async () => {
    stopping = true
    defaultsController?.abort(new Error("Demo server stopped"))
    active?.controller.abort(new Error("Demo server stopped"))
    await Promise.allSettled([active?.done ?? Promise.resolve(), defaultsPromise ?? Promise.resolve()])
    await server.stop(true)
  })
  return server
}

if (import.meta.main) {
  const server = createDemoServer({ port: Number(process.env.PORT ?? 3077) })
  console.log(`PCB noise demo: ${server.url}`)
  for (const event of ["SIGINT", "SIGTERM"] as const) process.once(event, async () => { await stopDemoServer(server); process.exit() })
}
