# Return-current trace demo

[Live public viewer](https://am3352-ddr-heatmaps.seveibar.chatgpt.site) for individual DDR traces on [astra/am3352-sbc](https://tscircuit.com/astra/am3352-sbc).

## Circuit JSON CLI and renderer prototype

The [CLI and SVG prototype](scripts/circuit-json/README.md) ([simulator draft PR](https://github.com/tscircuit/simulate-return-current/pull/16), [renderer draft PR](https://github.com/tscircuit/circuit-to-svg/pull/818)) reads a pending return-current experiment from Circuit JSON or creates one from command-line flags, runs Palace, and writes the PCB plus official result/field/heatmap/marker elements. The SVG renderer selects one stored result and overlays it on PCB content. Fields and heatmaps are embedded, so the result JSON is portable. See [the small-board end-to-end fixture](examples/circuit-json/) and [upstream snapshot provenance](prototype/sources.json).

```sh
bun run simulate:circuit-json --help
bun run render:simulation --help
```

## Latest PCB snapshot

[data/board.circuit.json](data/board.circuit.json) now contains the latest upstream export: 47 DDR traces routed on **top and bottom**, with **inner1 and inner2 GND pours**. GND is now `source_net_0`. The export specifies a 1.6 mm board but does not specify internal dielectric thicknesses. [Snapshot provenance](data/board-snapshot.json) records the download endpoint, timestamp and content hash.

Refresh with `python scripts/update-board.py`. This validates the layer assignment before replacing the input. **The 94 graph cases and `data/em-ddr-d8-*` Palace cases are historical.** Updated DDR_D8 processor-side and memory-side transition runs are in `data/em-latest-ddr-d8-*`, with four-layer maps at `/em/latest/`. The historical graph runner rejects mismatched input rather than using obsolete contacts or stale results.

The earlier approximation viewer highlights the selected trace on the PCB, overlays modeled GND return density and direction, and zooms into processor and memory dogbones. Labels and arrows remain a fixed screen size. It contains 47 traces × two package-ground contact assumptions, including hypothetical reset and isolated differential-leg cases.

## Frequency-domain electromagnetic pilot

The homepage shows the actual U1 processor escape, defaulting to DDR_D13. DDR_D8 and DDR_D13 have independent 400 MHz, 1 GHz and 4 GHz Palace v0.14.0 Maxwell runs covering their processor pads, with four-layer heatmaps, 1 V peak normalized excitation and assumed 50 Ω fixtures. DDR_D13 includes its processor dogbone via approximately 0.57 mm from the pad; DDR_D8 stays on top within this U1 crop. Source fixtures connect the actual signal pad to a separate actual U1 GND pad at (2.0, −3.6) mm. That pad’s exported top-layer dogbone connects to the GND via at (2.4, −4.0) mm and then inner1. The load joins the clipped trace to its adjacent GND plane. These are test fixtures, not package/driver models. See `data/em-u1-pad-*` and [reproduction instructions](scripts/em/README.md#u1-processor-heatmaps).

The viewer loads the correct dataset for each connection and region, keeps the EM toggle enabled for solved U1 views, and outlines the simulated area. It draws PCB content using `circuit-to-canvas`, fades other copper, highlights the selected trace in cyan and shows clearances directly in the PCB copper. The frequency selector retains the camera and uses a common colour scale. Numeric current/impedance, configuration, assumptions and four-layer images update per case. A comparison table shows all three frequencies. A checkbox highlights actual GND pads/vias/traces and specifically marks the selected return pad and its dogbone/via. The Signal & GND pads view fits both distinct source contacts. The selected GND pad is still an assumed driver-return contact, not a processor package model. Earlier under-pad plane-reference fixtures are retained in `data/em-u1-ddr-*` for history; they are not used in the primary U1 viewer. All 47 connections are selectable for PCB inspection; unsolved connections have no EM overlay. Labels stay a fixed screen size. Rebuild with `bun run build:pcb` and `python scripts/em/build-latest-page.py`.

The separate downstream DDR_D8 processor-side crop isolates the signal via near (−1, −18) mm rather than the package pad. Its source fixture connects the cut top signal to inner1 GND. The memory source fixture uses actual signal/GND pads. Both load the cut bottom signal against inner2 GND. The input and load fixture locations therefore differ from the historical cases; do not interpret impedance differences as a controlled before/after board comparison.

**These are provisional EM results.** First/second element-order checks do not establish local-density or crop convergence, so no “bad loop” verdict is validated. Layer depths, materials and test fixtures remain assumptions. Other signal/power copper, package internals and decoupling are omitted. Exported GND vias span top→inner1; signal vias span top↔bottom. The model preserves those spans and does not infer GND connections to inner2. Fabrication spans/stubs and any connections outside the local crop need confirmation. Cropping the inner planes can materially change interplane coupling and the input impedance.

See [EM reproduction instructions](scripts/em/README.md). Latest input geometry, exact solver configurations, raw SI port CSV files, solver logs and order comparisons are in `data/em-latest-ddr-d8-cpu/` and `data/em-latest-ddr-d8-memory/`. Historical EM remains at `/em/`; the old 94 graph cases remain at `/approximation.html` and have not been relabeled as EM runs.

## Run the viewer

```sh
bun install --ignore-scripts --frozen-lockfile
bun start
```

These commands run the static viewer. The Circuit JSON CLI and renderer use the dependencies described in [their setup instructions](scripts/circuit-json/README.md).

Open http://localhost:3000. `public/` is also a complete static site that can be hosted directly. The checked-in visual assets require no simulation to view.

## Earlier frequency-independent model

**No frequency was specified for the earlier graph experiments.** This is a frequency-independent image-current approximation with conservative projection onto a connected multilayer ground sheet/trace/plated-via graph. It is neither a 0 Hz DC solve nor a frequency-domain electromagnetic simulation. Do not interpret these pictures as a result at the DDR clock frequency.

Each trace is driven separately at 10 mA, with return injected at an assumed memory GND contact and withdrawn at an assumed processor GND contact. The two cases use the nearest and second-nearest package GND pins to the signal pads. Actual package return-current distribution is unknown.

Parameters: 0.25 mm mesh; assumed layer depths 0 / 0.2 / 1.4 / 1.6 mm; 35 µm copper; 25 µm radial via plating; 0.6 mm contact-search radius; x ∈ [−23,11] mm, y ∈ [−39.5,3.5] mm; relative residual tolerance 10⁻⁸; up to 15,000 iterations. All 94 cases converged; maximum graph current-balance error was 8.18 × 10⁻¹¹ A. The insulating region boundary is artificial.

The exported GND pour is on the bottom layer; no inner-layer GND planes are inferred. The model omits frequency-dependent impedance, skin/proximity effects, propagation, switching waveforms, package impedance, power-plane displacement return through capacitors, and magnetic coupling of signal-via barrels. Numerical conservation does not establish electromagnetic accuracy or DDR timing margin. A large via offset is an inspection candidate, not a formal bad-loop verdict.

Density colors saturate above 0.15 A/mm² and are bilinearly interpolated between computed samples for display. Interpolation does not add simulation resolution. Earlier combined-current maps use the original 0.5 mm mesh and their separately labeled scales.

Full settings: [simulation-parameters.json](data/simulation-parameters.json).

## Reproduce the experiments

1. Obtain the Circuit JSON export for the linked AM3352 board and save it as `data/board.circuit.json` (a JSON array of Circuit JSON elements). The checked-in manifest references the original snapshot's trace, port and component IDs; use that snapshot to reproduce identical contacts. Board input and large solver results are intentionally not checked in.
2. Run a selected trace, or omit the last argument for all traces:

```sh
bun run simulate 0 1 DDR_D8
# All 94 cases:
bun run simulate
```

The first two arguments are worker index and worker count; for parallel runs use distinct indices from 0 to count−1. Existing result files are reused; remove them to rerun with changed inputs or parameters.

3. Install Python Pillow, verify complete results and regenerate visuals:

```sh
python -m pip install Pillow
bun run verify
bun run render
```

`verify` requires all 94 result files. `render` updates views with available results; run it after all cases finish for a complete catalog. Remove `results/render-cache` after changing inputs, parameters or the renderer.

## Source and validation

`simulation/lib` contains the local four-layer extension of [tscircuit/return-current-simulation](https://github.com/tscircuit/return-current-simulation), based on upstream commit `3f093725e16514652197eccfb22906c4f61a45ba`. It is included here for reproducibility; it does not imply the extension has merged upstream. Preserve the MIT license.

```sh
bun test
bun run typecheck
```

The multilayer tests check real barrel transport, disconnected return paths, conserved current sharing, signed linearity, input validation and agreement with the legacy two-layer limit.
