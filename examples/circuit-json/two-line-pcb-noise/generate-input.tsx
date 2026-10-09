/** @jsxImportSource react */
import * as React from "react"
import { Circuit, simulation } from "@tscircuit/core"
import { simulation_pcb_noise_configuration, validatePcbNoiseCircuitJson } from "circuit-json"
import { strict as assert } from "node:assert"
import { mkdir, writeFile } from "node:fs/promises"
import { resolve } from "node:path"
import { TwoLineBoard } from "./TwoLineBoard"

export const cases = ["active", "active-clock", "quiet", "quiet-100ohm"] as const
export type DemoCase = (typeof cases)[number]
export const fabricationStackup = {
  source: "specified",
  layers: [
    { type: "copper", layer: "top", thickness_mm: 0.035, conductivity_s_per_m: 5.8e7 },
    { type: "dielectric", thickness_mm: 0.2, dielectric_constant: 4.2,
      dielectric_constant_frequency_hz: 1e9, dielectric_loss_tangent: 0,
      dielectric_loss_tangent_frequency_hz: 1e9 },
    { type: "copper", layer: "bottom", thickness_mm: 0.035, conductivity_s_per_m: 5.8e7 },
  ],
} as const

const prbs = (seed: number) => ({
  kind: "prbs" as const, order: 7 as const, baudRate: "500MHz", lowVoltage: "0V",
  highVoltage: "1V", riseTime: "600ps", fallTime: "600ps", seed,
})

export async function generateInput(caseName: DemoCase, outputDir: string) {
  const active = caseName.startsWith("active")
  const loadResistance = caseName === "quiet-100ohm" ? "100ohm" : "50ohm"
  const declaration = (
    <simulation.pcbnoisesimulation name={`Two-line ${caseName}`} duration="192ns" sampleInterval="5ps"
      baseline={{ quietChannels: ["aggressor"], voltage: "0V" }}>
      <simulation.pcbnoisechannel name="aggressor" role="aggressor"
        source=".A > .SIGNAL" sourceReference=".A > .GND"
        load=".B > .SIGNAL" loadReference=".B > .GND"
        sourceImpedance="50ohm" loadImpedance="50ohm" loadBiasVoltage="0V" waveform={prbs(93)} />
      <simulation.pcbnoisechannel name="victim" role="victim"
        source=".C > .SIGNAL" sourceReference=".C > .GND"
        load=".D > .SIGNAL" loadReference=".D > .GND"
        sourceImpedance="50ohm" loadImpedance={loadResistance} loadBiasVoltage="0V"
        waveform={active ? prbs(57) : { kind: "dc", voltage: "0V" }} />
      {active && <simulation.pcbnoiseeye channel="victim"
        timing={caseName === "active"
          ? { kind: "known_ui", unitInterval: "2ns", epoch: "0ns", sampleOffset: "1ns" }
          : { kind: "source", channel: "victim", sampleOffset: "1ns" }} />}
    </simulation.pcbnoisesimulation>
  )
  const circuit = new Circuit({ platform: { drcChecksDisabled: true } })
  circuit.add(<TwoLineBoard>{declaration}</TwoLineBoard>)
  await circuit.renderUntilSettled()
  const circuitJson = circuit.getCircuitJson()
  assert.deepEqual(circuitJson.filter((record) => record.type.endsWith("_error")), [])
  const board = circuitJson.find((record) => record.type === "pcb_board")!
  // Core authors physical copper; the fixture separately supplies fabrication materials.
  Object.assign(board, { stackup: fabricationStackup })
  const config = simulation_pcb_noise_configuration.parse(
    circuitJson.find((record) => record.type === "simulation_pcb_noise_configuration"),
  )
  validatePcbNoiseCircuitJson(circuitJson)
  const experiment = circuitJson.find((record) => record.type === "simulation_experiment")!
  assert.equal(experiment.experiment_type, "pcb_noise")
  assert.equal(config.simulation_experiment_id, experiment.simulation_experiment_id)
  assert.equal(config.ports.length, 4)
  assert.equal(config.sources.length, 2)
  assert.equal(config.observations.length, 8)
  assert.equal(config.terminations.length, 2)
  assert.equal(config.eyes?.length ?? 0, active ? 1 : 0)
  assert.equal(circuitJson.some((record) => (record.type as string) === "simulation_pcb_noise_result"), false)
  const topTraces = circuitJson.filter((record) => record.type === "pcb_trace" && record.route.every((p) => p.route_type === "wire" && p.layer === "top"))
  assert.equal(topTraces.length, 2)
  await mkdir(outputDir, { recursive: true })
  await writeFile(resolve(outputDir, "input.circuit.json"), JSON.stringify(circuitJson, null, 2) + "\n")
  await writeFile(resolve(outputDir, "authoring-validation.json"), JSON.stringify({
    case: caseName, experiment_id: config.simulation_experiment_id, configuration_id: config.simulation_pcb_noise_configuration_id,
    checks: { render_errors: 0, top_signal_traces: topTraces.length, physical_ports: config.ports.length,
      pending_definition_only: true, material_stackup_supplied_after_authoring: true },
    fabrication_stackup: fabricationStackup,
    timing: config.eyes?.map((eye) => ({ observation: eye.observation_name, timing: eye.timing })) ?? [],
    victim_load_ohms: config.terminations.find((load) => load.name === "victim_load")!.model.resistance_ohms,
  }, null, 2) + "\n")
  return circuitJson
}

if (import.meta.main) {
  const outputDir = resolve(process.argv[2] ?? "work/two-line-pcb-noise")
  for (const caseName of cases) {
    await generateInput(caseName, resolve(outputDir, caseName))
    console.log(`Authored pending ${caseName}: ${resolve(outputDir, caseName, "input.circuit.json")}`)
  }
}
