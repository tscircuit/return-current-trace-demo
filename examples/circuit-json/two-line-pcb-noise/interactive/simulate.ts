import { strict as assert } from "node:assert"
import { spawn } from "node:child_process"
import { createHash, randomUUID } from "node:crypto"
import { readFile, writeFile } from "node:fs/promises"
import { relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { Resvg } from "@resvg/resvg-js"
import { convertCircuitJsonToPcbNoiseSvg } from "circuit-to-svg"
import { validatePcbNoiseCircuitJson, validatePcbNoiseDecodedAssets } from "circuit-json"
import { analyzeEye, loadNoiseAsset, type Waveform } from "simulate-pcb-noise"
import type { Channel, Observation } from "./types"

type JsonRecord = Record<string, any>
type Plot = { svg: string; png: string }
type ProcessDetails = { pid: number; startedAt: string; exitedAt?: string; exitCode?: number }
type Options = {
  signal: AbortSignal
  onStage: (stage: string, message: string) => void
  onLog: (text: string) => void
  onProcess?: (details: ProcessDetails) => void
  nodeExecutable?: string
  cacheRoot?: string
}

export class SimulationRunError extends Error {
  constructor(readonly status: string, readonly diagnostics: JsonRecord[]) {
    super(diagnostics.map((entry) => `${entry.code}: ${entry.message}`).join("\n") || `Simulation ${status}`)
    this.name = "SimulationRunError"
  }
}

/** Each invocation starts the installed Node solver against this run's authored input. */
export async function simulateRun(runDir: string, options: Options) {
  const { signal, onStage, onLog } = options
  signal.throwIfAborted()
  const directory = resolve(runDir)
  const inputPath = resolve(directory, "input.circuit.json")
  const resultPath = resolve(directory, "result.circuit.json")
  const assetRoot = resolve(directory, "run")
  const inputBytes = await readFile(inputPath, "utf8")
  const inputHash = createHash("sha256").update(inputBytes).digest("hex")
  const input = JSON.parse(inputBytes)
  const authoring = JSON.parse(await readFile(resolve(directory, "authoring-validation.json"), "utf8"))
  const settings = JSON.parse(await readFile(resolve(directory, "settings.json"), "utf8"))
  assert.ok(Array.isArray(input), "Authored Circuit JSON must be an array")
  assert.equal(typeof authoring.experiment_id, "string", "Authoring receipt needs the actual experiment ID")
  if (authoring.input_circuit_json_sha256) assert.equal(authoring.input_circuit_json_sha256, inputHash, "Authored input hash differs from its receipt")
  const id = randomUUID().replaceAll("-", "_")
  const runId = `live_${id}`
  const resultId = `simulation_pcb_noise_result_${id}`
  const cli = fileURLToPath(import.meta.resolve("simulate-pcb-noise/cli"))
  const started = performance.now()
  let log = ""
  let processDetails: ProcessDetails | undefined
  const command = [cli, inputPath, "--experiment-id", authoring.experiment_id,
    "--settings", resolve(directory, "settings.json"), "--output", assetRoot,
    "--result-json", resultPath, "--result-id", resultId, "--run-id", runId]
  // Every solve starts fresh; no saved waveform, result or extraction cache is loaded.
  signal.throwIfAborted()
  onStage("solving", "Starting the separate Node PCB noise solver")
  const child = spawn(options.nodeExecutable ?? process.env.PCB_NOISE_NODE ?? "node", command, {
    cwd: directory, stdio: ["ignore", "pipe", "pipe"],
  })
  const append = (chunk: Buffer) => { const text = chunk.toString(); log += text; onLog(text) }
  child.stdout.on("data", append)
  child.stderr.on("data", append)
  let processError: Error | undefined
  const exited = new Promise<number | null>((done) => {
    child.once("error", (error) => { processError = error })
    child.once("close", (code) => done(code))
  })
  let killTimer: ReturnType<typeof setTimeout> | undefined
  const cancel = () => {
    child.kill("SIGTERM")
    killTimer = setTimeout(() => child.kill("SIGKILL"), 1000)
    killTimer.unref()
  }
  signal.addEventListener("abort", cancel, { once: true })
  if (signal.aborted) cancel()
  let exitCode: number | null = null
  try {
    if (child.pid !== undefined) {
      processDetails = { pid: child.pid, startedAt: new Date().toISOString() }
      options.onProcess?.(processDetails)
      await writeFile(resolve(directory, "process.json"), JSON.stringify(processDetails, null, 2) + "\n", { flag: "wx" })
    }
    exitCode = await exited
  } catch (error) {
    child.kill("SIGKILL")
    exitCode = await exited
    throw error
  } finally {
    signal.removeEventListener("abort", cancel)
    if (killTimer) clearTimeout(killTimer)
    await writeFile(resolve(directory, "cli.log"), log, { flag: "wx" })
    if (processDetails) {
      processDetails = { ...processDetails, exitedAt: new Date().toISOString(), ...(exitCode === null ? {} : { exitCode }) }
      await writeFile(resolve(directory, "process.json"), JSON.stringify(processDetails, null, 2) + "\n")
      options.onProcess?.(processDetails)
    }
  }
  if (signal.aborted) {
    onLog("Solver process exited after cancellation\n")
    signal.throwIfAborted()
  }
  if (processError) throw processError
  let circuitJson: JsonRecord[]
  try { circuitJson = JSON.parse(await readFile(resultPath, "utf8")) }
  catch (error) {
    if (exitCode !== 0) throw new SimulationRunError("failed", [{ code: "solver_exit", message: log.trim() || `Node solver exited with status ${exitCode}` }])
    throw error
  }
  const result = circuitJson.find((record) => record.type === "simulation_pcb_noise_result" && record.simulation_pcb_noise_result_id === resultId)
  if (!result) throw new Error("Solver output has no matching result receipt")
  if (exitCode !== 0 || result.status !== "completed") {
    throw new SimulationRunError(result.status, result.diagnostics ?? [{ code: "solver_exit", message: `Node solver exited with status ${exitCode}` }])
  }
  onStage("validating", "Checking this run's authored inputs, asset hashes and numerical qualification")
  assert.deepEqual(circuitJson.slice(0, input.length), input, "The solver changed authored input records")
  validatePcbNoiseCircuitJson(circuitJson)
  assert.equal(result.validation?.state, "validated", "Result lacks validated numerical checks")
  const configuration = circuitJson.find((record) => record.type === "simulation_pcb_noise_configuration" && record.simulation_experiment_id === authoring.experiment_id)
  if (!configuration) throw new Error("Result configuration is missing")
  const resolveAsset = async (asset: { project_relative_path: string }) => {
    signal.throwIfAborted()
    const path = resolve(assetRoot, asset.project_relative_path)
    const local = relative(assetRoot, path)
    if (!local || local === ".." || local.startsWith("../") || local.startsWith("..\\")) throw new Error("Asset path escapes this run")
    return new Uint8Array(await readFile(path))
  }
  const load = (descriptor: any): Promise<JsonRecord> => loadNoiseAsset(descriptor, { resolveAsset, expectedRunId: runId })
  const manifest = await load(result.manifest_asset)
  const network = await load(result.network_asset)
  const waveforms = await Promise.all(result.waveform_assets.map((entry: any) => load(entry.asset)))
  const eyes = await Promise.all((result.eye_assets ?? []).map((entry: any) => load(entry.asset)))
  const spectra = await Promise.all((result.spectrum_assets ?? []).map((entry: any) => load(entry.asset)))
  await validatePcbNoiseDecodedAssets(configuration as any, result as any, { manifest, network, waveforms, eyes, spectra } as any)
  signal.throwIfAborted()
  const render = async (observationName: string, view: "waveform" | "spectrum" | "pcb" | "eye", filename: string): Promise<Plot> => {
    signal.throwIfAborted()
    onStage("rendering", `Rendering ${observationName}: validated ${view}`)
    const svg = await convertCircuitJsonToPcbNoiseSvg(circuitJson as any, {
      simulationResultId: resultId, observationName, view,
      resolveAsset, width: 1000, height: 440,
    })
    signal.throwIfAborted()
    const plot = { svg: `${filename}.svg`, png: `${filename}.png` }
    await writeFile(resolve(directory, plot.svg), svg, { flag: "wx" })
    await writeFile(resolve(directory, plot.png), new Resvg(svg).render().asPng(), { flag: "wx" })
    return plot
  }
  const observationViews = new Map<string, Observation>()
  for (const [index, observation] of configuration.observations.entries()) {
    const eye = eyes.find((entry: JsonRecord) => entry.observation_name === observation.name)
    const source = configuration.sources.find((entry: JsonRecord) => entry.port_name === observation.port_name)
    const position = source ? "source" : "load"
    const item: Observation = {
      name: observation.name, label: `${position === "load" ? "Receiver" : "Source"} ${observation.quantity}`,
      position, quantity: observation.quantity,
      plots: {
        waveform: await render(observation.name, "waveform", `observation-${index}-waveform`),
        spectrum: await render(observation.name, "spectrum", `observation-${index}-spectrum`),
      },
    }
    if (eye) {
      item.plots.eye = await render(observation.name, "eye", `observation-${index}-eye`)
      const timing = eye.resolved_timing
      item.eyeMetrics = { windows: eye.complete_window_count, crossings: eye.transition_count,
        jitterStdDevPs: eye.metrics.jitter_rms_s * 1e12,
        timingLabel: timing.kind === "known_ui" ? "Known UI, no clock" : timing.interpretation === "nominal_reference" ? "Authored nominal clock" : "Explicit clock" }
      const baselineEntry = result.waveform_assets.find((entry: JsonRecord) => entry.observation_name === observation.name && entry.variant === "baseline")
      const baseline = waveforms.find((entry: JsonRecord) => entry.observation_name === observation.name && entry.variant === "baseline")
      const authoredEye = settings.eyes?.[observation.name]
      if (baseline && baselineEntry && authoredEye) {
        const analysis = analyzeEye(baseline as Waveform, { ...authoredEye, signal_kind: "active_nrz", timing,
          waveform_sha256: baselineEntry.asset.sha256, timing_sha256: eye.timing_sha256,
          time_bins: eye.time_bins, voltage_bins: eye.voltage_bins, min_voltage_v: eye.min_voltage_v, max_voltage_v: eye.max_voltage_v })
        if (analysis.status === "eye_available") {
          item.eyeMetrics.baselineJitterStdDevPs = analysis.eye.metrics.jitter_rms_s * 1e12
          await writeFile(resolve(directory, `observation-${index}-baseline-eye.json`), JSON.stringify(analysis.eye) + "\n", { flag: "wx" })
        }
      }
    } else {
      const diagnostic = manifest.solver?.settings?.eye_diagnostics?.find((entry: JsonRecord) => entry.observation_name === observation.name)
      item.eyeUnavailableReason = diagnostic?.message ?? (observation.quantity === "current"
        ? "Digital eye analysis applies to voltage observations"
        : "No digital eye was authored for this observation")
    }
    observationViews.set(observation.name, item)
  }
  const channels: Channel[] = configuration.sources.map((source: JsonRecord) => {
    const mapping = authoring.channelTraces?.find((entry: JsonRecord) => entry.source_name === source.name)
    const name = mapping?.channel ?? source.name.replace(/_source$/, "")
    const termination = configuration.terminations.find((entry: JsonRecord) => entry.name === `${name}_load`)
    return { name, role: source.role, pcbTraceIds: mapping?.pcb_trace_ids ?? [],
      observations: configuration.observations.filter((entry: JsonRecord) => entry.port_name === source.port_name || entry.port_name === termination?.port_name)
        .map((entry: JsonRecord) => observationViews.get(entry.name)!) }
  })
  const selected = observationViews.get("victim_load_voltage") ?? channels.find((channel) => channel.role === "victim")?.observations.find((observation) => observation.position === "load" && observation.quantity === "voltage")
  if (!selected?.plots.waveform || !selected.plots.spectrum) throw new Error("The authored experiment needs a victim receiver voltage observation")
  const observationName = selected.name
  const plots = { ...selected.plots, waveform: selected.plots.waveform, spectrum: selected.plots.spectrum,
    pcb: await render(observationName, "pcb", "pcb") }
  signal.throwIfAborted()
  const total = waveforms.find((entry: JsonRecord) => entry.observation_name === observationName && entry.variant === "total")
  const difference = waveforms.find((entry: JsonRecord) => entry.observation_name === observationName && entry.variant === "difference")
  const eye = eyes.find((entry: JsonRecord) => entry.observation_name === observationName)
  const residuals: JsonRecord[] = result.validation.residuals
  const validation = { status: result.validation.state,
    passed: residuals.filter((entry) => typeof entry.limit === "number" && entry.value <= entry.limit).length, total: residuals.length }
  const capture = { durationS: configuration.duration_s, sampleIntervalS: configuration.sample_interval_s }
  const summary = {
    status: result.status, validation: result.validation, modelTier: result.model_tier,
    runtimeSeconds: (performance.now() - started) / 1000,
    observationName, samples: total?.values.length, unit: total?.unit,
    inducedPeakV: difference?.values.reduce((peak: number, value: number) => Math.max(peak, Math.abs(value)), 0),
    eye: eye ? { timing: eye.resolved_timing.kind, completeWindows: eye.complete_window_count,
      transitions: eye.transition_count, crossingStdPs: eye.metrics.jitter_rms_s * 1e12 } : null,
    validityBandHz: result.validity_band_hz,
  }
  await writeFile(resolve(directory, "simulation-summary.json"), JSON.stringify(summary, null, 2) + "\n", { flag: "wx" })
  const descriptors = [result.manifest_asset, result.network_asset,
    ...result.waveform_assets.map((entry: any) => entry.asset),
    ...(result.eye_assets ?? []).map((entry: any) => entry.asset),
    ...(result.spectrum_assets ?? []).map((entry: any) => entry.asset)]
  const artifacts = ["input.circuit.json", "settings.json", "authoring-validation.json", "result.circuit.json", "cli.log", "process.json", "simulation-summary.json", plots.pcb.svg, plots.pcb.png,
    ...[...observationViews.values()].flatMap((observation) => Object.values(observation.plots).flatMap((plot) => [plot.svg, plot.png])),
    ...configuration.observations.flatMap((observation: JsonRecord, index: number) => observationViews.get(observation.name)?.eyeMetrics?.baselineJitterStdDevPs === undefined ? [] : [`observation-${index}-baseline-eye.json`]),
    ...descriptors.map((descriptor: any) => `run/${descriptor.asset.project_relative_path}`)]
  return { resultId, runId, summary, plots, artifacts, channels, validation, capture,
    manifestPath: `run/${result.manifest_asset.asset.project_relative_path}`, inputHash }
}
