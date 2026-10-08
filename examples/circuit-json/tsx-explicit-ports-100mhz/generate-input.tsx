/** @jsxImportSource react */
import * as React from "react"
import { Circuit } from "@tscircuit/core"
import { ExplicitPortBoard } from "./ExplicitPortBoard"
import { mkdir, writeFile } from "node:fs/promises"
import { resolve } from "node:path"
import { strict as assert } from "node:assert"

// Reuse the actual EM fixture's TSX geometry. Only the declaration is new.
const board = ExplicitPortBoard({})
const declaration = (
  <pcbreturncurrentsimulation name="Explicit GND terminals: TSX 5 mA">
    <pcbreturncurrentexcitation
      name="U1 OUT to U2 IN"
      source=".U1 > .OUT"
      load=".U2 > .IN"
      ground="net.GND"
      current="5mA"
      returnSource=".U2 > .GND"
      returnSink=".U1 > .GND"
      sourceImpedance="25ohm"
      loadImpedance="100ohm"
    />
  </pcbreturncurrentsimulation>
)
// This EM fixture intentionally uses via-in-pad ground contacts and a plane
// reaching the board edge. Keep its geometry while bypassing manufacturing DRC.
const circuit = new Circuit({ platform: { drcChecksDisabled: true } })
circuit.add(React.cloneElement(board, { isViaInPadAllowed: true }, board.props.children, declaration))
await circuit.renderUntilSettled()
const circuitJson = circuit.getCircuitJson()
const errors = circuitJson.filter((e) => e.type.endsWith("_error"))
assert.deepEqual(errors, [], "TSX geometry/experiment must render without errors")
const experiment = circuitJson.find((e) => e.type === "simulation_experiment")!
const excitation = circuitJson.find((e) => e.type === "simulation_return_current_excitation")!
assert.equal(experiment.experiment_type, "pcb_return_current")
assert.equal(excitation.simulation_experiment_id, experiment.simulation_experiment_id)
assert.equal(excitation.current, 0.005)
assert.deepEqual(
  [excitation.return_source.x, excitation.return_source.y, excitation.return_source.layer],
  [2, 1.5, "top"],
)
assert.deepEqual(
  [excitation.return_sink.x, excitation.return_sink.y, excitation.return_sink.layer],
  [-2, 1.5, "top"],
)
assert.equal(excitation.source_port!.reference_pcb_port_id, excitation.return_sink.pcb_port_id)
assert.equal(excitation.load_port!.reference_pcb_port_id, excitation.return_source.pcb_port_id)
assert.equal(excitation.source_port!.resistance, 25)
assert.equal(excitation.load_port!.resistance, 100)
assert.notEqual(excitation.source_port!.signal_pcb_port_id, excitation.return_sink.pcb_port_id)
assert.notEqual(excitation.load_port!.signal_pcb_port_id, excitation.return_source.pcb_port_id)
assert.equal(circuitJson.some((e) => e.type === "simulation_pcb_return_current_result"), false)
const outputDir = resolve(process.argv[2] ?? "work/tsx-explicit-ports-100mhz")
await mkdir(outputDir, { recursive: true })
await writeFile(outputDir + "/input.circuit.json", JSON.stringify(circuitJson, null, 2) + "\n")
await writeFile(outputDir + "/authoring-validation.json", JSON.stringify({
  experiment,
  excitation,
  checks: {
    errors: errors.length,
    real_separate_gnd_ports: true,
    return_source_at_load_side: true,
    return_sink_at_driver_side: true,
    current_amperes: excitation.current,
    source_impedance_ohms: excitation.source_port!.resistance,
    load_impedance_ohms: excitation.load_port!.resistance,
    pending_definition_only: true,
  },
}, null, 2) + "\n")
console.log(JSON.stringify({ outputDir, experiment, excitation }, null, 2))
