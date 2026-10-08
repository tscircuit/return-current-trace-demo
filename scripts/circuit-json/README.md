# Circuit JSON CLI and SVG prototypes

This prototype connects the merged [Circuit JSON schemas (#887)](https://github.com/tscircuit/circuit-json/pull/887) to the Palace CLI and a selected-result PCB SVG renderer. Checked runtime snapshots are in `prototype/`; the implementation is prepared for the upstream simulator and renderer pull requests. A clone of this demo needs no sibling source repositories.

```sh
bun install --frozen-lockfile
bun run simulate:circuit-json --help
```

## Run a pending experiment already in Circuit JSON

The checked input contains a PCB plus a `simulation_experiment` with `experiment_type: "pcb_return_current"` and its `simulation_return_current_excitation`. It has no result elements. Its source and load each reference a separate real ground pad and via.

```sh
bun run simulate:circuit-json setup --python python3
bun run simulate:circuit-json \
  examples/circuit-json/explicit-port-1mhz.input.circuit.json \
  --experiment-id simulation_experiment_explicit_port_1mhz \
  --frequency-hz 1000000 --sample-layer bottom \
  --cell-size 0.1 --mesh-size 2 --order 1 --air-padding 2 --processes 4 \
  --output work/explicit-port-1mhz \
  --result-json work/explicit-port-1mhz.result.circuit.json \
  --result-id simulation_pcb_return_current_result_explicit_port_1mhz
```

Palace needs Docker or `--palace-bin`, and Python with the simulator's bundled dependencies. Use `--python /path/to/venv/bin/python` to reuse an existing environment. Multilayer boards additionally require `--stackup-file`; use the actual fabricator stackup, not guessed layer depths.

The current experiment schema records contacts, port resistances and signed peak current, but has no input fields for frequency, solver choice or stackup. Those stay explicit CLI options. Result elements record the solved frequency. Input current is peak amperes; this example uses 5 mA at 1 MHz. This is a small CLI validation board, not a DDR-board simulation or a new 400 MHz AM3352 result.

## Define a new simulation with flags

Start from the same PCB without simulation elements:

```sh
bun run simulate:circuit-json \
  examples/circuit-json/explicit-port-1mhz.board.circuit.json \
  --source U1.OUT --source-reference U1.GND \
  --load U2.IN --load-reference U2.GND \
  --ground GND --current 5mA \
  --source-impedance 25ohm --load-impedance 100ohm \
  --frequency-hz 1000000 --sample-layer bottom \
  --cell-size 0.1 --mesh-size 2 --order 1 --air-padding 2 --processes 4 \
  --output work/from-flags --result-json work/from-flags.circuit.json
```

The CLI creates official experiment/excitation elements and outputs the original PCB with `simulation_pcb_return_current_result`, `simulation_pcb_return_current_field`, `simulation_pcb_return_current_heatmap` and applicable port/via markers. Fields use embedded gzip JSON assets by default (`--field-format json` selects plain JSON); PNG heatmaps are embedded too, so moving the output JSON does not break its assets.

Complex channels are peak phasors with exp(+jωt), row-major from bottom-left, in A/mm. Conductor voids use matching `null` masks in every channel; a finite zero remains a zero-current conductor cell. PNG/vector density is |sheet current| divided by copper thickness, in A/mm². A rerun replaces only the same experiment/frequency's results and descendants, preserving other experiments and frequencies.

`--solver approximation` is an explicit frequency-independent alternative; its result is real and has no `frequency_hz`. It is not a substitute for a Palace solve. `--prepare-only` resolves and validates the definition without producing a result.

## Render one stored result over its PCB

```sh
bun run render:simulation \
  examples/circuit-json/explicit-port-1mhz.result.circuit.json \
  --simulation-result-id simulation_pcb_return_current_result_explicit_port_1mhz \
  --layer bottom --vectors --phase-degrees 0 --density-range 0,0.04 \
  --output work/return-current.svg
```

The renderer draws PCB context, the selected signal route and actual port/via markers with the stored current overlay. `--viewport minX,minY,maxX,maxY` crops the view. `--density-range min,max` uses a common absolute scale in A/mm², rendering decoded cells rather than the producer’s precolored PNG. The normal PCB renderer remains unchanged unless `simulationResultId` is passed. Assets are read only for the selected result. The library's async API decodes embedded JSON/gzip fields; external assets require an explicit `resolveAsset` callback.

```ts
import { convertCircuitJsonToPcbSimulationSvg } from "../../prototype/circuit-to-svg/index.js"

const svg = await convertCircuitJsonToPcbSimulationSvg(circuitJson, {
  simulationResultId: "simulation_pcb_return_current_result_explicit_port_1mhz",
  layer: "bottom",
  returnCurrent: { showVectors: true, phaseDegrees: 0 },
})
```

For synchronous rendering, `convertCircuitJsonToPcbSvg` accepts the same selector and predecoded `returnCurrent.fieldData`; stored PNG heatmaps can be embedded directly without loading fields. The decoded-field path can render an absolute density scale and phase-dependent vectors.

Rebuild snapshots with [update-prototypes.ts](update-prototypes.ts). Upstream source commits and licenses are saved alongside the snapshots. The checked small-board EM result and its validation receipt make the storage/renderer workflow inspectable without running Palace again.
