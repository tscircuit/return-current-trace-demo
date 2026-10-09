import { strict as assert } from "node:assert"
import { createHash } from "node:crypto"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { Resvg } from "@resvg/resvg-js"
import { convertCircuitJsonToPcbNoiseSvg } from "circuit-to-svg"
import { validatePcbNoiseCircuitJson, validatePcbNoiseDecodedAssets } from "circuit-json"
import { analyzeEye, loadNoiseAsset, type Waveform } from "simulate-pcb-noise"
import { cases, generateInput, type DemoCase } from "./generate-input"

const root = resolve(process.argv[2] ?? "work/two-line-pcb-noise")
const settings = resolve(import.meta.dir, "settings.json")
const authoredSettings = JSON.parse(await readFile(settings, "utf8"))
const extractionCachePath = resolve(root, "extraction-cache.json")
const nodeExecutable = process.env.PCB_NOISE_NODE ?? "node"
const cli = fileURLToPath(import.meta.resolve("simulate-pcb-noise/cli"))
const maximum = (values: number[]) => values.reduce((max, value) => Math.max(max, Math.abs(value)), 0)
const completed: Record<string, any> = {}
for (const name of cases) assert.equal(await Bun.file(resolve(root, name, "result.circuit.json")).exists(), false,
  "Choose a fresh output directory; completed and failed receipts are preserved")

for (const caseName of cases) {
  const directory = resolve(root, caseName)
  await generateInput(caseName, directory)
  const input = JSON.parse(await readFile(resolve(directory, "input.circuit.json"), "utf8"))
  const resultId = `simulation_pcb_noise_result_demo_${caseName.replaceAll("-", "_")}`
  const started = performance.now()
  const suppliedCache = await Bun.file(extractionCachePath).exists()
  const command = [nodeExecutable, cli, resolve(directory, "input.circuit.json"),
    "--experiment-id", "simulation_experiment_0", "--settings", settings,
    "--output", resolve(directory, "run"), "--result-json", resolve(directory, "result.circuit.json"),
    "--result-id", resultId, "--run-id", `demo_${caseName.replaceAll("-", "_")}`,
    "--cache", extractionCachePath]
  const run = Bun.spawn(command, { stdout: "pipe", stderr: "pipe" })
  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(run.stdout).text(), new Response(run.stderr).text(), run.exited,
  ])
  // Public command records use portable relative paths; logs retain only solver diagnostics.
  await writeFile(resolve(directory, "cli.log"), (stdout + stderr)
    .replaceAll(directory, caseName).replaceAll(settings, "settings.json").replaceAll(cli, "simulate-pcb-noise/cli"))
  assert.equal(exitCode, 0, `Separate ${caseName} CLI failed: ${stdout}${stderr}`)
  const circuitJson = JSON.parse(await readFile(resolve(directory, "result.circuit.json"), "utf8"))
  assert.deepEqual(circuitJson.slice(0, input.length), input, "Solve must preserve all authored records")
  validatePcbNoiseCircuitJson(circuitJson)
  const configuration = circuitJson.find((record: any) => record.type === "simulation_pcb_noise_configuration")
  const result = circuitJson.find((record: any) => record.type === "simulation_pcb_noise_result" && record.simulation_pcb_noise_result_id === resultId)
  assert.equal(result.status, "completed", `Solver did not complete ${caseName}`)
  const resolveAsset = async (asset: { project_relative_path: string }) => new Uint8Array(await readFile(resolve(directory, "run", asset.project_relative_path)))
  const load = async (descriptor: any): Promise<Record<string, any>> => loadNoiseAsset(descriptor, { resolveAsset, expectedRunId: result.run_id })
  const manifest = await load(result.manifest_asset)
  const network = await load(result.network_asset)
  const cache = JSON.parse(await readFile(extractionCachePath, "utf8"))
  const waveforms = await Promise.all(result.waveform_assets.map(async (entry: any) => ({
    observation_name: entry.observation_name, variant: entry.variant, data: await load(entry.asset),
  })))
  const eyes = await Promise.all((result.eye_assets ?? []).map(async (entry: any) => ({ observation_name: entry.observation_name, data: await load(entry.asset) })))
  const spectra = await Promise.all((result.spectrum_assets ?? []).map(async (entry: any) => ({ observation_name: entry.observation_name, data: await load(entry.asset) })))
  await validatePcbNoiseDecodedAssets(configuration, result, {
    manifest, network, waveforms: waveforms.map((entry) => entry.data),
    eyes: eyes.map((entry) => entry.data), spectra: spectra.map((entry) => entry.data),
  })
  const observationReceipt = configuration.observations.map((observation: any) => {
    const variants = Object.fromEntries(waveforms.filter((entry) => entry.observation_name === observation.name).map((entry) => [entry.variant, entry.data]))
    assert.deepEqual(Object.keys(variants).sort(), ["baseline", "difference", "total"])
    const count = variants.total.values.length
    assert.equal(variants.total.full_resolution, true)
    assert.equal(variants.total.unit, observation.quantity === "voltage" ? "V" : "A")
    assert.equal(count, Math.round(configuration.duration_s / configuration.sample_interval_s) + 1)
    assert.equal(variants.total.time.kind, "uniform")
    assert.equal(variants.total.time.step_s, configuration.sample_interval_s)
    for (let i = 0; i < count; i++) assert.ok(Math.abs(variants.total.values[i] - variants.baseline.values[i] - variants.difference.values[i]) < 1e-12)
    if (!caseName.startsWith("active")) assert.ok(maximum(variants.baseline.values) < 1e-12, "Quiet-source baseline must be zero")
    if (observation.name.startsWith("victim_") && observation.quantity === "voltage")
      assert.ok(maximum(variants.difference.values) > 1e-6, "Victim must show nonzero crosstalk")
    return { observation: observation.name, unit: variants.total.unit, samples: count, total_peak: maximum(variants.total.values),
      baseline_peak: maximum(variants.baseline.values), induced_peak: maximum(variants.difference.values) }
  })
  if (caseName.startsWith("active")) {
    assert.equal(eyes.length, 1)
    assert.equal(eyes[0].data.resolved_timing.kind, caseName === "active" ? "known_ui" : "explicit_clock")
    for (const eye of eyes) assert.ok(eye.data.complete_window_count >= 64)
  } else assert.equal(eyes.length, 0, "Quiet victims have no digital eye")
  let baselineEye: Record<string, any> | undefined
  if (eyes.length) {
    const totalEye = eyes[0].data
    const baselineEntry = result.waveform_assets.find((entry: any) => entry.observation_name === "victim_load_voltage" && entry.variant === "baseline")
    const baselineWaveform = waveforms.find((entry) => entry.observation_name === "victim_load_voltage" && entry.variant === "baseline")!.data
    const analysis = analyzeEye(baselineWaveform as Waveform, {
      ...authoredSettings.eyes.victim_load_voltage, signal_kind: "active_nrz",
      timing: totalEye.resolved_timing, waveform_sha256: baselineEntry.asset.sha256,
      timing_sha256: totalEye.timing_sha256, time_bins: totalEye.time_bins, voltage_bins: totalEye.voltage_bins,
      min_voltage_v: totalEye.min_voltage_v, max_voltage_v: totalEye.max_voltage_v,
    })
    assert.equal(analysis.status, "eye_available", "Paired active baseline must support the same eye analysis")
    if (analysis.status === "eye_available") {
      baselineEye = analysis.eye
      await writeFile(resolve(directory, "baseline-eye.json"), JSON.stringify(baselineEye) + "\n")
    }
  }
  const receipt = {
    case: caseName, result_id: resultId, run_id: result.run_id, status: result.status,
    model_tier: result.model_tier, validation: result.validation, validity_band_hz: result.validity_band_hz,
    network_model_sha256: network.model_sha256,
    extraction_cache: { key_sha256: cache.key_sha256, data_sha256: cache.data_sha256, provided_to_cli: suppliedCache },
    checks: { pending_tsx_before_separate_cli: true, input_preserved: true, official_cross_record_schema: true,
      all_encoded_decoded_and_canonical_hashes: true, decoded_asset_ownership: true, paired_subtraction: true },
    observations: observationReceipt,
    eyes: eyes.map((entry) => ({ observation: entry.observation_name, timing: entry.data.resolved_timing.kind,
      complete_windows: entry.data.complete_window_count, transitions: entry.data.transition_count,
      baseline_complete_windows: baselineEye?.complete_window_count, total_metrics: entry.data.metrics, baseline_metrics: baselineEye?.metrics })),
    runtime_seconds: (performance.now() - started) / 1000,
  }
  const plots: { filename: string; observation: string; view: "waveform" | "spectrum" | "eye" | "pcb"; layer?: "top" | "bottom" }[] = [
    { filename: "victim-near-waveform", observation: "victim_source_voltage", view: "waveform" },
    { filename: "victim-far-waveform", observation: "victim_load_voltage", view: "waveform" },
    { filename: "victim-far-psd", observation: "victim_load_voltage", view: "spectrum" },
    { filename: "pcb-ports", observation: "victim_load_voltage", view: "pcb" },
    { filename: "pcb-ground-reference", observation: "victim_load_voltage", view: "pcb", layer: "bottom" },
  ]
  if (caseName.startsWith("active")) plots.push({
    filename: caseName === "active" ? "eye-known-ui" : "eye-explicit-clock",
    observation: "victim_load_voltage", view: "eye",
  })
  for (const plot of plots) {
    const svg = await convertCircuitJsonToPcbNoiseSvg(circuitJson, {
      simulationResultId: resultId, observationName: plot.observation, view: plot.view,
      resolveAsset, width: 1000, height: 440, layer: plot.layer ?? "top",
    })
    assert.ok(svg.includes("<svg"))
    await writeFile(resolve(directory, `${plot.filename}.svg`), svg)
    await writeFile(resolve(directory, `${plot.filename}.png`), new Resvg(svg).render().asPng())
  }
  await assert.rejects(convertCircuitJsonToPcbNoiseSvg(circuitJson, {
    simulationResultId: resultId, observationName: "victim_load_voltage", view: "waveform",
    expectedGeometryHash: "0".repeat(64), resolveAsset,
  }), /stale|hash|mismatch/i, "Selected plots must reject stale physical inputs")
  await assert.rejects(convertCircuitJsonToPcbNoiseSvg(circuitJson, {
    simulationResultId: resultId, observationName: "victim_load_voltage", view: "waveform",
    expectedConfigHash: "0".repeat(64), resolveAsset,
  }), /stale|hash|mismatch/i, "Selected plots must reject stale source/load/timing configuration")
  Object.assign(receipt.checks, { stale_geometry_rejected: true, stale_configuration_rejected: true })
  await writeFile(resolve(directory, "integration-validation.json"), JSON.stringify(receipt, null, 2) + "\n")
  completed[caseName] = { eye: eyes[0]?.data, farValues: waveforms.find((entry) => entry.observation_name === "victim_load_voltage" && entry.variant === "total")!.data.values, receipt }
  console.log(`Verified ${caseName}: ${directory}`)
}

assert.deepEqual(completed.active.eye.counts, completed["active-clock"].eye.counts,
  "Known UI and the matching nominal source clock must fold the same full-resolution record")
const quiet = completed.quiet.farValues
const changedLoad = completed["quiet-100ohm"].farValues
const terminationDelta = maximum(quiet.map((value: number, index: number) => value - changedLoad[index]))
assert.ok(terminationDelta > 1e-6, "Changing victim termination must change physical response")
assert.equal(new Set(cases.map((name) => completed[name].receipt.network_model_sha256)).size, 1,
  "Source and load changes must preserve the bare PCB network")
assert.equal(new Set(cases.map((name) => completed[name].receipt.extraction_cache.data_sha256)).size, 1,
  "Shared immutable extraction cache must preserve its data")
await mkdir(root, { recursive: true })
await writeFile(resolve(root, "demo-validation.json"), JSON.stringify({
  cases: cases.map((name: DemoCase) => completed[name].receipt),
  matching_eye_timing: { known_ui_and_nominal_source_clock_density_equal: true, complete_windows: completed.active.eye.complete_window_count },
  termination_change: { from_ohms: 50, to_ohms: 100, maximum_waveform_difference_v: terminationDelta },
  package_sources: JSON.parse(await readFile(resolve(import.meta.dir, "package.json"), "utf8")).dependencies,
  lockfile_sha256: await Bun.file(resolve(import.meta.dir, "bun.lock")).exists()
    ? createHash("sha256").update(await readFile(resolve(import.meta.dir, "bun.lock"))).digest("hex") : undefined,
  package_versions: Object.fromEntries(await Promise.all(["@tscircuit/core", "@tscircuit/props", "circuit-json", "circuit-to-svg", "simulate-pcb-noise"].map(async (name) => {
    const entry = fileURLToPath(import.meta.resolve(name))
    const pkg = JSON.parse(await readFile(resolve(entry, "../../package.json"), "utf8"))
    return [name, pkg.version]
  }))),
}, null, 2) + "\n")
console.log(`All four end-to-end cases verified: ${resolve(root, "demo-validation.json")}`)
