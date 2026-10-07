# Return-current trace demo

[Live public viewer](https://am3352-ddr-heatmaps.seveibar.chatgpt.site) for individual DDR traces on [astra/am3352-sbc](https://tscircuit.com/astra/am3352-sbc).

## Latest PCB snapshot

[data/board.circuit.json](data/board.circuit.json) now contains the latest upstream export: 47 DDR traces routed on **top and bottom**, with **inner1 and inner2 GND pours**. GND is now `source_net_0`. The export specifies a 1.6 mm board but does not specify internal dielectric thicknesses. [Snapshot provenance](data/board-snapshot.json) records the download endpoint, timestamp and content hash.

Refresh with `python scripts/update-board.py`. This validates the layer assignment before replacing the input. **Existing heatmaps and cached Palace cases belong to the previous PCB and have not been rerun.** Their old trace geometry, package contacts and load fixtures need regeneration; the historical graph runner now rejects a mismatched input instead of using obsolete contacts or reusing stale results. The EM reproduction commands below reproduce the historical cases only.

The earlier approximation viewer highlights the selected trace on the PCB, overlays modeled GND return density and direction, and zooms into processor and memory dogbones. Labels and arrows remain a fixed screen size. It contains 47 traces × two package-ground contact assumptions, including hypothetical reset and isolated differential-leg cases.

## 400 MHz electromagnetic pilot

The default page now shows real Palace v0.14.0 frequency-domain Maxwell results for the processor and memory dogbones of DDR_D8. Both use a 1 V normalized input phasor and 50 Ω source-reference/load fixtures. Four layer images combine PCB context, the cyan target trace, surface-current density in A/m and GND via transfer in mA. Labels in the interactive viewer remain a fixed screen size.

**These are provisional EM results.** Order/mesh checks changed reactance substantially, so local densities and a “bad loop” verdict are not yet validated. The stackup, material properties and package fixtures are assumptions; other signal/power copper and decoupling are omitted. The earlier 94 graph cases remain separately accessible at `/approximation.html` and have not been relabeled as EM runs.

See [EM reproduction instructions](scripts/em/README.md). Cached PCB-derived case geometry, exact solver configurations, raw SI port CSV files, converged solver logs and convergence comparisons are in `data/em-ddr-d8-cpu/` and `data/em-ddr-d8-memory/`. Raw board input is not required to reproduce these two EM cases.

## Run the viewer

```sh
bun install --ignore-scripts --frozen-lockfile
bun start
```

Install skips dependency lifecycle scripts because this static viewer and solver do not require native image-rendering dependencies.

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
