import { test } from "bun:test"
import { strict as assert } from "node:assert"
import { createHash } from "node:crypto"
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { resolve } from "node:path"
import { DEFAULT_SOURCE } from "./author"
import { fabricationStackup } from "../generate-input"
import { createDemoServer, stopDemoServer } from "./server"

type Json = Record<string, any>
const hash = (bytes: string | Uint8Array) => createHash("sha256").update(bytes).digest("hex")
const terminal = new Set(["completed", "failed", "cancelled"])

async function withServer(timeoutMs: number, verify: (url: string) => Promise<void>) {
  const scratch = resolve(import.meta.dir, "../work")
  await mkdir(scratch, { recursive: true })
  const runRoot = await mkdtemp(resolve(scratch, "interactive-test-"))
  const server = createDemoServer({ port: 0, runRoot, timeoutMs })
  try {
    await verify(server.url.toString())
  } finally {
    await stopDemoServer(server)
    await rm(runRoot, { recursive: true, force: true })
  }
}

async function json(url: string, path: string, init?: RequestInit, expected = 200): Promise<Json> {
  const headers = new Headers(init?.headers)
  if (init?.method && init.method !== "GET") headers.set("Origin", new URL(url).origin)
  const response = await fetch(new URL(path, url), { ...init, headers })
  const body = await response.json() as Json
  assert.equal(response.status, expected, JSON.stringify(body))
  return body
}

async function submit(url: string, request: Json) {
  const response = await json(url, "/api/runs", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(request),
  }, 202)
  assert.equal(typeof response.id, "string")
  return response.id as string
}

async function waitFor(url: string, id: string, predicate: (run: Json) => boolean, timeoutMs = 300_000) {
  const deadline = performance.now() + timeoutMs
  while (performance.now() < deadline) {
    const run = await json(url, `/api/runs/${id}`)
    if (predicate(run)) return run
    await Bun.sleep(100)
  }
  throw new Error(`Run ${id} did not reach the expected state: ${JSON.stringify(await json(url, `/api/runs/${id}`))}`)
}

const waitTerminal = (url: string, id: string, timeoutMs?: number) => waitFor(url, id, (run) => terminal.has(run.status), timeoutMs)

async function inputDefaults() {
  return { source: DEFAULT_SOURCE, stackup: fabricationStackup,
    settings: JSON.parse(await readFile(new URL("../settings.json", import.meta.url), "utf8")) }
}

async function bytes(url: string, id: string, name: string) {
  const response = await fetch(new URL(`/api/runs/${id}/files/${name}`, url))
  assert.equal(response.status, 200, `Missing artifact ${name}`)
  return new Uint8Array(await response.arrayBuffer())
}

async function artifact(url: string, id: string, name: string): Promise<Json> {
  return JSON.parse(new TextDecoder().decode(await bytes(url, id, name)))
}

async function verifyCompleted(url: string, id: string, source: string) {
  const run = await waitTerminal(url, id)
  assert.equal(run.status, "completed", JSON.stringify(run))
  assert.equal(run.artifacts.validation.status, "validated")
  assert.equal(run.artifacts.validation.passed, run.artifacts.validation.total)
  assert.ok(run.processes.some((process: Json) => process.kind === "solver" && process.pid > 0 && process.exitCode === 0))
  const [input, records, authored, child] = await Promise.all([
    artifact(url, id, "input.circuit.json"), artifact(url, id, "result.circuit.json"),
    artifact(url, id, "authoring-validation.json"), artifact(url, id, "process.json"),
  ])
  assert.equal(authored.source_sha256, hash(source))
  assert.deepEqual(records.slice(0, input.length), input)
  assert.ok(child.pid > 0, "The separate solver process must have an actual PID")
  assert.equal(child.exitCode, 0)
  assert.ok(Date.parse(child.exitedAt) >= Date.parse(child.startedAt))
  const result = records.find((record: Json) => record.type === "simulation_pcb_noise_result")
  assert.equal(result.status, "completed")
  assert.equal(result.validation.state, "validated")
  assert.ok(result.validation.residuals.length >= 80)
  for (const residual of result.validation.residuals) {
    assert.ok(Number.isFinite(residual.value) && residual.value <= residual.limit, residual.name)
  }
  const descriptors = [result.manifest_asset, result.network_asset,
    ...result.waveform_assets.map((entry: Json) => entry.asset),
    ...result.spectrum_assets.map((entry: Json) => entry.asset),
    ...result.eye_assets.map((entry: Json) => entry.asset)]
  assert.equal(descriptors.length, 35)
  const decoded = new Map<string, Json>()
  for (const descriptor of descriptors) {
    const name = descriptor.asset.project_relative_path
    const data = await bytes(url, id, `run/${name}`)
    assert.equal(data.byteLength, descriptor.byte_length)
    assert.equal(hash(data), descriptor.encoded_sha256)
    const payload = JSON.parse(new TextDecoder().decode(data))
    assert.equal(payload.run_id, result.run_id)
    decoded.set(name, payload)
  }
  const waveform = (variant: string) => {
    const entry = result.waveform_assets.find((entry: Json) => entry.observation_name === "victim_load_voltage" && entry.variant === variant)
    return decoded.get(entry.asset.asset.project_relative_path)!
  }
  const total = waveform("total"), baseline = waveform("baseline"), difference = waveform("difference")
  assert.equal(total.values.length, 38_401)
  assert.equal(total.full_resolution, true)
  assert.equal(total.time.step_s, 5e-12)
  assert.ok(difference.values.some((value: number) => Math.abs(value) > 1e-6))
  for (let index = 0; index < total.values.length; index++)
    assert.ok(Math.abs(total.values[index] - baseline.values[index] - difference.values[index]) < 1e-12)
  const eye = decoded.get(result.eye_assets[0].asset.asset.project_relative_path)!
  assert.equal(eye.resolved_timing.kind, "known_ui")
  assert.ok(eye.complete_window_count >= 64)
  assert.equal(run.artifacts.channels.length, 2)
  for (const channel of run.artifacts.channels) {
    assert.equal(channel.observations.length, 4)
    assert.ok(channel.pcbTraceIds.length > 0)
    for (const traceId of channel.pcbTraceIds)
      assert.ok(input.some((record: Json) => record.type === "pcb_trace" && record.pcb_trace_id === traceId))
  }
  const receiver = run.artifacts.channels.find((channel: Json) => channel.role === "victim")
    .observations.find((observation: Json) => observation.name === "victim_load_voltage")
  const plots = [...["eye", "waveform", "spectrum"].map((view) => receiver.plots[view]),
    { svg: `/api/runs/${id}/files/pcb.svg`, png: `/api/runs/${id}/files/pcb.png` }]
  for (const plot of plots) {
    assert.ok(plot)
    const svg = await fetch(new URL(plot.svg, url)), png = await fetch(new URL(plot.png, url))
    assert.equal(svg.status, 200)
    assert.equal(png.status, 200)
    assert.match(await svg.text(), /<svg[\s>]/)
    assert.deepEqual(Array.from(new Uint8Array(await png.arrayBuffer()).slice(0, 8)), [137, 80, 78, 71, 13, 10, 26, 10])
  }
  return { result, authored, total, manifest: decoded.get("manifest.json")!, network: decoded.get("network.json")! }
}

test("edited TSX starts fresh Node solves and publishes only validated current assets", async () => {
  await withServer(300_000, async (url) => {
    const defaults = await json(url, "/api/defaults")
    assert.ok(defaults.source.includes("prbs(57)"))
    const firstId = await submit(url, defaults)
    const first = await verifyCompleted(url, firstId, defaults.source)
    const source = defaults.source.replace("prbs(57)", "prbs(58)")
    const secondId = await submit(url, { ...defaults, source })
    const second = await verifyCompleted(url, secondId, source)
    assert.notEqual(firstId, secondId)
    assert.notEqual(first.result.run_id, second.result.run_id)
    assert.notEqual(first.authored.input_circuit_json_sha256, second.authored.input_circuit_json_sha256)
    assert.notEqual(first.manifest.inputs.configuration.sha256, second.manifest.inputs.configuration.sha256)
    assert.equal(first.manifest.inputs.geometry.sha256, second.manifest.inputs.geometry.sha256)
    assert.equal(first.network.model_sha256, second.network.model_sha256)
    assert.ok(first.total.values.some((value: number, index: number) => Math.abs(value - second.total.values[index]) > 1e-3),
      "A changed victim PRBS seed must change the newly solved waveform")
    assert.equal(hash(await bytes(url, firstId, "source.tsx")), hash(defaults.source), "Previous run must remain immutable")
  })
}, 650_000)

test("invalid TSX and unsupported bends publish diagnostics without completed plots", async () => {
  await withServer(30_000, async (url) => {
    const defaults = await json(url, "/api/defaults")
    const invalid = await submit(url, { ...defaults, source: "export default <board" })
    const failure = await waitTerminal(url, invalid, 30_000)
    assert.equal(failure.status, "failed")
    assert.ok(failure.error)
    assert.equal(failure.artifacts, undefined)
    assert.ok(failure.processes.some((process: Json) => process.kind === "author" && process.exitCode !== 0))
    assert.ok(!failure.processes.some((process: Json) => process.kind === "solver"))
    const helper = (await readFile(new URL("../TwoLineBoard.tsx", import.meta.url), "utf8"))
      .replace('import * as React from "react"', "")
      .replace("[{ x: 0, y: 0 }, { x: 20, y: 0 }]", "[{ x: 0, y: 0 }, { x: 10, y: 1 }, { x: 20, y: 0 }]")
    const source = defaults.source.replace('import { TwoLineBoard } from "./TwoLineBoard"', helper)
    assert.ok(source.includes("{ x: 10, y: 1 }"))
    const unsupported = await submit(url, { ...defaults, source })
    const rejected = await waitTerminal(url, unsupported, 30_000)
    assert.equal(rejected.status, "failed")
    assert.equal(rejected.artifacts, undefined)
    const result = (await artifact(url, unsupported, "result.circuit.json")).find((record: Json) => record.type === "simulation_pcb_noise_result")
    assert.equal(result.status, "unsupported")
    assert.ok(result.diagnostics.length > 0)
    const image = await fetch(new URL(`/api/runs/${unsupported}/files/eye.png`, url))
    assert.equal(image.status, 404)
  })
}, 65_000)

test("a run deadline kills authoring and cannot publish late completion", async () => {
  await withServer(600, async (url) => {
    const defaults = await inputDefaults()
    const id = await submit(url, { ...defaults, source: `await new Promise(() => {});\n${defaults.source}` })
    const run = await waitTerminal(url, id, 10_000)
    assert.equal(run.status, "failed")
    assert.match(JSON.stringify(run.error), /exceed|time|deadline/i)
    assert.equal(run.artifacts, undefined)
    assert.ok(run.processes.some((process: Json) => process.kind === "author" && process.pid > 0 && process.exitedAt))
    await Bun.sleep(1_200)
    assert.equal((await json(url, `/api/runs/${id}`)).status, "failed")
  })
}, 15_000)

test("cancel terminates an active authoring child and releases the one-run queue", async () => {
  await withServer(30_000, async (url) => {
    const defaults = await inputDefaults()
    const id = await submit(url, { ...defaults, source: `await new Promise(() => {});\n${defaults.source}` })
    await waitFor(url, id, (run) => run.status === "running" && run.processes.some((process: Json) => process.kind === "author" && process.pid > 0 && !process.exitedAt), 10_000)
    await json(url, "/api/runs", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(defaults),
    }, 409)
    await json(url, `/api/runs/${id}/cancel`, { method: "POST" }, 202)
    const run = await waitTerminal(url, id, 10_000)
    assert.equal(run.status, "cancelled")
    assert.equal(run.artifacts, undefined)
    assert.ok(run.processes.some((process: Json) => process.kind === "author" && process.exitedAt))
    const next = await submit(url, { ...defaults, source: "export default <board" })
    assert.equal((await waitTerminal(url, next, 10_000)).status, "failed")
    assert.equal((await json(url, `/api/runs/${id}`)).status, "cancelled")
  })
}, 35_000)

test("cancel terminates the actual Node solver child before publishing results", async () => {
  await withServer(30_000, async (url) => {
    const defaults = await inputDefaults()
    const source = defaults.source.replace('name="aggressor"', 'name="a"')
      .replace('name="victim"', 'name="a_extra"').replace('channel="victim"', 'channel="a_extra"')
      .replace('quietChannels: ["aggressor"]', 'quietChannels: ["a"]')
    const settings = { ...defaults.settings, eyes: { a_extra_load_voltage: defaults.settings.eyes.victim_load_voltage } }
    const id = await submit(url, { ...defaults, source, settings })
    const started = await waitFor(url, id, (run) => run.processes.some((child: Json) => child.kind === "solver" && child.pid > 0 && !child.exitedAt), 15_000)
    assert.equal(started.channels.length, 2)
    for (const channel of started.channels) {
      assert.equal(channel.observations.length, 4, "Similar channel-name prefixes must not merge observations")
      assert.ok(channel.observations.every((observation: Json) => [
        `${channel.name}_source_voltage`, `${channel.name}_load_voltage`,
        `${channel.name}_source_current`, `${channel.name}_load_current`,
      ].includes(observation.name)))
    }
    const pid = started.processes.find((child: Json) => child.kind === "solver").pid
    await json(url, `/api/runs/${id}/cancel`, { method: "POST" }, 202)
    const run = await waitTerminal(url, id, 10_000)
    assert.equal(run.status, "cancelled")
    assert.equal(run.artifacts, undefined)
    assert.ok(run.processes.some((child: Json) => child.kind === "solver" && child.pid === pid && child.exitedAt))
    assert.throws(() => process.kill(pid, 0), /ESRCH|no such process/i)
    const image = await fetch(new URL(`/api/runs/${id}/files/observation-5-eye.png`, url))
    assert.equal(image.status, 404)
  })
}, 30_000)

test("shutdown terminates a pending defaults authoring process", async () => {
  const scratch = resolve(import.meta.dir, "../work")
  await mkdir(scratch, { recursive: true })
  const directory = await mkdtemp(resolve(scratch, "interactive-shutdown-test-"))
  const authorExecutable = resolve(directory, "hanging-author.ts")
  const pidFile = resolve(directory, "pid")
  await writeFile(authorExecutable, `#!${process.execPath}\nimport { writeFile } from "node:fs/promises"\nawait writeFile(${JSON.stringify(pidFile)}, String(process.pid))\nawait new Promise(() => {})\n`, { mode: 0o755 })
  const server = createDemoServer({ port: 0, runRoot: resolve(directory, "runs"), authorExecutable, timeoutMs: 30_000 })
  const response = fetch(new URL("/api/defaults", server.url)).catch(() => undefined)
  let pid: number | undefined
  try {
    const deadline = performance.now() + 5_000
    while (!await Bun.file(pidFile).exists() && performance.now() < deadline) await Bun.sleep(25)
    pid = Number(await readFile(pidFile, "utf8"))
    assert.ok(pid > 0)
    await Promise.race([stopDemoServer(server), Bun.sleep(5_000).then(() => { throw new Error("Shutdown left the defaults authoring process running") })])
    await response
    assert.throws(() => process.kill(pid!, 0), /ESRCH|no such process/i)
  } finally {
    if (pid) try { process.kill(pid, "SIGKILL") } catch { /* Already exited. */ }
    await stopDemoServer(server)
    await rm(directory, { recursive: true, force: true })
  }
}, 12_000)
