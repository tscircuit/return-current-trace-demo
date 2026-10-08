import { test, expect } from "bun:test"
import { readFile, mkdtemp, rm } from "node:fs/promises"
import { join } from "node:path"
import { tmpdir } from "node:os"
import { gunzipSync } from "node:zlib"
import {
  simulation_pcb_return_current_result,
  simulation_pcb_return_current_field,
  getSimulationReturnCurrentGridJsonSchema,
} from "circuit-json"
const root = new URL("../", import.meta.url)
const fixturePath = (name: string) =>
  new URL("examples/circuit-json/" + name, root).pathname
const resultId = "simulation_pcb_return_current_result_explicit_port_1mhz"
test("real EM result is portable and renders selected fields over its PCB", async () => {
  const circuit = JSON.parse(
    await readFile(
      fixturePath("explicit-port-1mhz.result.circuit.json"),
      "utf8",
    ),
  )
  const result = simulation_pcb_return_current_result.parse(
    circuit.find(
      (e: any) =>
        e.type === "simulation_pcb_return_current_result" &&
        e.simulation_pcb_return_current_result_id === resultId,
    ),
  )
  expect(result.frequency_hz).toBe(1_000_000)
  const field = simulation_pcb_return_current_field.parse(
    circuit.find((e: any) => e.type === "simulation_pcb_return_current_field"),
  )
  const bytes = Buffer.from(field.field_asset.url.split(",")[1]!, "base64")
  const grid = getSimulationReturnCurrentGridJsonSchema(field).parse(
    JSON.parse(gunzipSync(bytes).toString()),
  )
  expect(grid.field_type).toBe("complex_phasor")
  if (grid.field_type !== "complex_phasor") throw Error("Expected EM phasors")
  expect(grid.sheet_current_x_real.some((v) => v === null)).toBe(true)
  expect(
    grid.sheet_current_x_real.some((v) => v !== null && Math.abs(v) > 0),
  ).toBe(true)
  const { convertCircuitJsonToPcbSimulationSvg, convertCircuitJsonToPcbSvg } =
    await import(
      new URL("../prototype/circuit-to-svg/index.js", import.meta.url).href
    )
  const plain = convertCircuitJsonToPcbSvg(circuit, { layer: "bottom" })
  expect(plain).not.toContain("data-simulation-result-id")
  const svg = await convertCircuitJsonToPcbSimulationSvg(circuit, {
    simulationResultId: resultId,
    layer: "bottom",
    returnCurrent: {
      showVectors: true,
      phaseDegrees: 0,
      densityRange: { min: 0, max: 0.04 },
    },
    resolveAsset: () => {
      throw Error("Portable embedded assets must not need a resolver")
    },
  })
  expect(svg).toContain(`data-simulation-result-id="${resultId}"`)
  expect(svg).toContain('data-type="simulation_pcb_return_current_cell"')
  expect(svg).toContain('data-type="simulation_pcb_return_current_vector"')
  expect(svg).toContain('data-role="return_sink"')
  expect(svg).toContain('data-role="signal_source"')
  expect(svg).toContain('data-pcb-trace-id="pcb_trace_0"')
  expect(svg).toContain("0.00 – 0.0400 A/mm²")
})
test("bundled CLI accepts pending definitions and equivalent named flags without a solver", async () => {
  const work = await mkdtemp(join(tmpdir(), "return-current-prototype-"))
  const cli = new URL(
    "../prototype/simulate-return-current/cli.js",
    import.meta.url,
  ).pathname
  const run = async (args: string[]) => {
    const child = Bun.spawn([process.execPath, cli, ...args], {
      stdout: "pipe",
      stderr: "pipe",
    })
    const [code, out, error] = await Promise.all([
      child.exited,
      new Response(child.stdout).text(),
      new Response(child.stderr).text(),
    ])
    if (code) throw Error(out + "\n" + error)
  }
  try {
    const common = [
      "--prepare-only",
      "--frequency-hz",
      "1000000",
      "--sample-layer",
      "bottom",
      "--cell-size",
      "0.25",
      "--mesh-size",
      "1",
      "--order",
      "1",
    ]
    await run([
      fixturePath("explicit-port-1mhz.input.circuit.json"),
      "--experiment-id",
      "simulation_experiment_explicit_port_1mhz",
      "--output",
      join(work, "pending"),
      ...common,
    ])
    await run([
      fixturePath("explicit-port-1mhz.board.circuit.json"),
      "--experiment-id",
      "simulation_experiment_explicit_port_1mhz",
      "--source",
      "U1.OUT",
      "--source-reference",
      "U1.GND",
      "--load",
      "U2.IN",
      "--load-reference",
      "U2.GND",
      "--ground",
      "GND",
      "--current",
      "5mA",
      "--source-impedance",
      "25ohm",
      "--load-impedance",
      "100ohm",
      "--output",
      join(work, "flags"),
      ...common,
    ])
    const pending = JSON.parse(
        await readFile(join(work, "pending", "model.json"), "utf8"),
      ),
      flags = JSON.parse(
        await readFile(join(work, "flags", "model.json"), "utf8"),
      )
    for (const model of [pending, flags])
      for (const e of model.geometry.excitations)
        delete e.simulation_return_current_excitation_id
    expect(flags).toEqual(pending)
  } finally {
    await rm(work, { recursive: true, force: true })
  }
})
