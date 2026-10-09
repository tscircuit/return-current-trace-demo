import * as React from "react"
import { Circuit } from "@tscircuit/core"
import { simulation_pcb_noise_configuration, validatePcbNoiseCircuitJson, type SimulationPcbNoiseConfiguration } from "circuit-json"
import { createHash } from "node:crypto"
import { readFile, writeFile } from "node:fs/promises"
import { resolve } from "node:path"
import { pathToFileURL } from "node:url"

/** Complete editable input; no simulation results are embedded in this source. */
export const DEFAULT_SOURCE = `/** @jsxImportSource react */
import * as React from "react"
import { simulation } from "@tscircuit/core"
import { TwoLineBoard } from "./TwoLineBoard"

const prbs = (seed: number) => ({
  kind: "prbs" as const, order: 7 as const, baudRate: "500MHz",
  lowVoltage: "0V", highVoltage: "1V", riseTime: "600ps", fallTime: "600ps", seed,
})

export default function Board() {
  return (
    <TwoLineBoard>
      <simulation.pcbnoisesimulation name="Live two-line eye" duration="192ns" sampleInterval="5ps"
        baseline={{ quietChannels: ["aggressor"], voltage: "0V" }}>
        <simulation.pcbnoisechannel name="aggressor" role="aggressor"
          source=".A > .SIGNAL" sourceReference=".A > .GND" load=".B > .SIGNAL" loadReference=".B > .GND"
          sourceImpedance="50ohm" loadImpedance="50ohm" loadBiasVoltage="0V" waveform={prbs(93)} />
        <simulation.pcbnoisechannel name="victim" role="victim"
          source=".C > .SIGNAL" sourceReference=".C > .GND" load=".D > .SIGNAL" loadReference=".D > .GND"
          sourceImpedance="50ohm" loadImpedance="50ohm" loadBiasVoltage="0V" waveform={prbs(57)} />
        <simulation.pcbnoiseeye channel="victim"
          timing={{ kind: "known_ui", unitInterval: "2ns", epoch: "0ns", sampleOffset: "1ns" }} />
      </simulation.pcbnoisesimulation>
    </TwoLineBoard>
  )
}
`

const sha256 = (bytes: string | Uint8Array) => createHash("sha256").update(bytes).digest("hex")
const object = (value: unknown, label: string): Record<string, unknown> => {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`${label} must be an object`)
  return value as Record<string, unknown>
}
const positive = (value: unknown, label: string) => {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) throw new Error(`${label} must be a positive finite number`)
}

/** Validate explicit materials without limiting the solver's geometry decisions. */
function validateStackup(value: unknown) {
  const stackup = object(value, "stackup")
  if (stackup.source !== "specified") throw new Error('stackup.source must be "specified"')
  if (!Array.isArray(stackup.layers) || !stackup.layers.length) throw new Error("stackup.layers must be a nonempty array")
  for (const [index, value] of stackup.layers.entries()) {
    const layer = object(value, `stackup.layers[${index}]`)
    positive(layer.thickness_mm, `stackup.layers[${index}].thickness_mm`)
    if (layer.type === "copper") {
      if (typeof layer.layer !== "string" || !layer.layer.trim()) throw new Error(`stackup.layers[${index}].layer must name a copper layer`)
      positive(layer.conductivity_s_per_m, `stackup.layers[${index}].conductivity_s_per_m`)
    } else if (layer.type === "dielectric") {
      positive(layer.dielectric_constant, `stackup.layers[${index}].dielectric_constant`)
      positive(layer.dielectric_constant_frequency_hz, `stackup.layers[${index}].dielectric_constant_frequency_hz`)
      positive(layer.dielectric_loss_tangent_frequency_hz, `stackup.layers[${index}].dielectric_loss_tangent_frequency_hz`)
      if (typeof layer.dielectric_loss_tangent !== "number" || !Number.isFinite(layer.dielectric_loss_tangent) || layer.dielectric_loss_tangent < 0)
        throw new Error(`stackup.layers[${index}].dielectric_loss_tangent must be a nonnegative finite number`)
    } else throw new Error(`stackup.layers[${index}].type must be copper or dielectric`)
  }
  return stackup
}

/** Trace IDs come from authored connectivity, never a predetermined trace index. */
export function mapChannels(circuitJson: readonly unknown[], configuration: SimulationPcbNoiseConfiguration) {
  const records = circuitJson.map((record) => object(record, "Circuit JSON record"))
  return configuration.sources.map((source) => {
    const contact = configuration.ports.find((port) => port.name === source.port_name)!.signal_contact
    const pcbPort = contact.contact_type === "pcb_port"
      ? records.find((record) => record.type === "pcb_port" && record.pcb_port_id === contact.pcb_port_id)
      : undefined
    const sourceTraceIds = new Set(records.filter((record) => record.type === "source_trace"
      && typeof pcbPort?.source_port_id === "string" && Array.isArray(record.connected_source_port_ids)
      && record.connected_source_port_ids.includes(pcbPort.source_port_id)).map((record) => record.source_trace_id)
      .filter((id): id is string => typeof id === "string"))
    const traces = records.filter((record) => record.type === "pcb_trace" && (
      (typeof record.source_trace_id === "string" && sourceTraceIds.has(record.source_trace_id)) || (contact.contact_type === "pcb_port"
        && Array.isArray(record.route) && record.route.some((point) => {
          const routePoint = object(point, "Trace route point")
          return routePoint.start_pcb_port_id === contact.pcb_port_id || routePoint.end_pcb_port_id === contact.pcb_port_id
        }))
    ))
    return {
      channel: source.name.replace(/_source$/, ""), role: source.role,
      source_name: source.name, source_port_name: source.port_name,
      pcb_trace_ids: traces.flatMap((trace) => typeof trace.pcb_trace_id === "string" ? [trace.pcb_trace_id] : []),
    }
  })
}

export async function authorSource(runDir: string) {
  const directory = resolve(runDir)
  const sourcePath = resolve(directory, "source.tsx")
  const [source, stackupBytes, helper] = await Promise.all([
    readFile(sourcePath), readFile(resolve(directory, "stackup.json")),
    readFile(new URL("../TwoLineBoard.tsx", import.meta.url)),
  ])
  const sourceSha256 = sha256(source)
  const stackup = validateStackup(JSON.parse(stackupBytes.toString("utf8")))
  await writeFile(resolve(directory, "TwoLineBoard.tsx"), helper)
  const sourceModule = await import(`${pathToFileURL(sourcePath).href}?sha256=${sourceSha256}`)
  const exported = sourceModule.default
  const element = typeof exported === "function" ? React.createElement(exported) : exported
  if (!React.isValidElement(element)) throw new Error("source.tsx must default-export a board element or component")
  const circuit = new Circuit({ platform: { drcChecksDisabled: true } })
  circuit.add(element)
  await circuit.renderUntilSettled()
  const circuitJson = circuit.getCircuitJson()
  const errors = circuitJson.filter((record) => record.type.endsWith("_error"))
  if (errors.length) throw new Error(`Core authoring returned ${errors.length} error(s): ${JSON.stringify(errors.slice(0, 5))}`)
  const boards = circuitJson.filter((record) => record.type === "pcb_board")
  const experiments = circuitJson.filter((record) => record.type === "simulation_experiment")
    .filter((record) => record.experiment_type === "pcb_noise")
  const configurations = circuitJson.filter((record) => record.type === "simulation_pcb_noise_configuration")
  if (boards.length !== 1) throw new Error(`Author exactly one PCB board; found ${boards.length}`)
  if (experiments.length !== 1 || configurations.length !== 1)
    throw new Error(`Author exactly one PCB-noise experiment and configuration; found ${experiments.length} and ${configurations.length}`)
  if (circuitJson.some((record) => record.type.startsWith("simulation_") && record.type.endsWith("_result")))
    throw new Error("Source must author pending definitions, without simulation results")
  Object.assign(boards[0]!, { stackup })
  const configuration = simulation_pcb_noise_configuration.parse(configurations[0])
  validatePcbNoiseCircuitJson(circuitJson)
  if (configuration.simulation_experiment_id !== experiments[0]!.simulation_experiment_id)
    throw new Error("Noise configuration does not reference the authored experiment")
  const input = JSON.stringify(circuitJson, null, 2) + "\n"
  const receipt = {
    experiment_id: configuration.simulation_experiment_id,
    configuration_id: configuration.simulation_pcb_noise_configuration_id,
    pcb_board_id: boards[0]!.pcb_board_id,
    source_sha256: sourceSha256,
    board_helper_sha256: sha256(helper),
    stackup_sha256: sha256(stackupBytes),
    input_circuit_json_sha256: sha256(input),
    record_count: circuitJson.length,
    checks: {
      render_errors: 0, pending_definition_only: true, simulation_run: false,
      material_stackup_supplied_after_authoring: true,
      physical_ports: configuration.ports.length, sources: configuration.sources.length,
      terminations: configuration.terminations.length, observations: configuration.observations.length,
      eyes: configuration.eyes?.length ?? 0,
    },
    fabrication_stackup: stackup,
    channelTraces: mapChannels(circuitJson, configuration),
    timing: configuration.eyes?.map((eye) => ({ observation: eye.observation_name, timing: eye.timing })) ?? [],
  }
  await writeFile(resolve(directory, "input.circuit.json"), input)
  await writeFile(resolve(directory, "authoring-validation.json"), JSON.stringify(receipt, null, 2) + "\n")
  return receipt
}

if (import.meta.main) {
  try {
    if (!process.argv[2]) throw new Error("Usage: bun interactive/author.ts RUN_DIRECTORY")
    console.log(JSON.stringify(await authorSource(process.argv[2])))
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  }
}
