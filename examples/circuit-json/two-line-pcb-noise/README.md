# Two-line PCB crosstalk and victim noise

This compact example authors two channels with four physical signal/reference port pairs in TSX, emits a pending PCB noise experiment, and runs a separate `simulate-pcb-noise` CLI. The selected result supplies full-resolution total, paired baseline and induced-difference waveforms, spectra, PCB contacts, and active-NRZ eyes with both known UI and a nominal authored symbol clock.

The two 20 mm × 0.3 mm top traces have a 0.3 mm edge gap. A 24 mm × 5 mm bottom GND pour connects four actual bottom reference pads. The fabrication stackup is explicitly supplied after core authors the copper: 35 µm copper, 0.2 mm dielectric with εᵣ = 4.2 and zero dielectric loss, then 35 µm copper. The authoring receipt records this material annotation. DRC is disabled for this intentional board-edge-plane test fixture.

The four cases share geometry and a seeded 500 Mbaud, 1 V PRBS7 aggressor with 600 ps 10–90% edges. Sources have 50 Ω resistance. `quiet` holds the victim at 0 V with a 50 Ω load; `active` drives a different seeded PRBS7 victim using an explicit known UI; `active-clock` repeats that physical experiment using the nominal authored victim symbol clock; `quiet-100ohm` changes only the victim load to 100 Ω. Every baseline holds the aggressor at 0 V while preserving victim, load and timing. Quiet victims have no eye.

The `explicit_clock` eye uses authored symbol epochs as a **nominal reference**, not a sampled receiver clock or clock recovery. A 1 V Thevenin source with a matched 50 Ω load produces approximately 0.5 V receiver levels, so the explicit data-slicing threshold in [settings.json](settings.json) is 0.25 V. Source clock threshold and receiver slicing threshold describe different quantities.

## Reproduce

Use Bun and Node ≥20.11 on PATH. Choose a fresh output directory for every run; the CLI preserves existing completed and failed receipts. The noise APIs require the unreleased package previews pinned in this folder. Preview availability and stable npm publication are separate checks. Install here, then run from this folder:

```sh
bun install --frozen-lockfile
bun run typecheck
bun run demo ./work/two-line-pcb-noise
```

To inspect authoring without a solver run:

```sh
bun run generate ./work/two-line-pcb-noise
```

[run-demo.ts](run-demo.ts) executes the CLI as a separate Node process for each input, checks exact preservation of authored records and official cross-record schemas, verifies encoded/decoded/canonical asset hashes and ownership, confirms the requested full-resolution count and interval, checks `total − baseline = difference`, and confirms the termination change alters the response while the bare PCB network and immutable extraction cache stay identical. It requires at least 64 complete windows for each active eye, checks matching timing produces identical density bins, rejects quiet eyes, renders selected SVG/PNG plots, and checks stale geometry/configuration rejection. CLI settings explicitly record mesh/domain, convergence tolerances, FFT padding/wrap checks, reference impedance, spectrum window and eye slicers. Set `PCB_NOISE_NODE` to select a Node executable outside PATH.

Each active case also writes `baseline-eye.json`: supplementary production eye analysis of the validated paired baseline waveform, on the total eye's exact time and voltage bins. Its waveform and timing hashes identify the inputs; the selected result's eye asset remains the total-voltage eye.

Generated files include each case's `input.circuit.json`, `authoring-validation.json`, `result.circuit.json`, `integration-validation.json`, `cli.log`, the exact solver assets in `run/`, and selected waveform, PSD, eye and PCB-contact SVG/PNG plots. `demo-validation.json` compares the cases and records immutable package URLs and the package versions actually used.

## Physical scope

The provider extracts a quasi-TEM cross-section over ideal continuous ground and explicitly lossless dielectric. The transmission-line model uses complex finite-slab copper impedance with a declared one-sided current distribution, including skin loss and internal inductance. It evaluates independent numerical convergence gates. Its recorded assumptions exclude finite-ground resistance, pad launches, lateral proximity effects, roughness, dielectric dispersion, arbitrary routing, package models and PCB-derived power/ground noise. Numerical solver completion and a passing schema receipt do not establish accuracy for those excluded effects.

The earlier 200 ps source profile failed strict sampling refinement; the final example uses 600 ps edges without changing the numerical tolerances. Its failed diagnostics remain separate from these passing receipts.

The locally verified quiet victim peaks at 8.473 mV near end and 4.143 mV far end. Changing the far load from 50 Ω to 100 Ω changes its waveform by up to 1.442 mV. Both active timing choices fold 94 complete windows and 45 transitions into identical density bins; total threshold-crossing jitter σ is 3.782 ps versus 0.239 ps in the paired baseline. These figures describe the stated finite capture and model.

All visualizations describe the finite 192 ns capture at 5 ps full resolution. Eye density is a count of complete windows; it is not a BER prediction or a receiver-compliance result. No preview is presented as a stable release or a published website.
