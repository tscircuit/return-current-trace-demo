# Frequency-domain EM pilot

This directory adds a real Palace v0.14.0 Maxwell workflow. The original 94 graph experiments remain frequency independent and are not EM results.

The processor case isolates DDR_D8's processor escape in x [-5, 5], y [-10, 0] mm. Its pad, top dogbone, signal via, inner-2 outgoing route, exported ground copper and twelve GND vias, including three on the crop boundary are preserved. The 50 Ω load fixture terminates the cut inner-2 trace against the bottom ground pour at (3.5, -10) mm. The input fixture joins the signal pad to the selected package GND pad. These fixtures are assumptions, not package models.

## Reproduce

Requires Python 3.11, Docker, libGLU, and a machine with several GB of RAM.

```sh
python -m venv .venv-em
.venv-em/bin/pip install -r scripts/em/requirements.txt
.venv-em/bin/python scripts/em/build.py data/em-ddr-d8-cpu
scripts/em/run.sh data/em-ddr-d8-cpu > data/em-ddr-d8-cpu/palace.log 2>&1
.venv-em/bin/python scripts/em/export.py data/em-ddr-d8-cpu
```

The case uses 400 MHz, finite copper conductivity 5.8e7 S/m, εr=4.3, tanδ=.02, 35 µm copper, 25 µm plating, 5 mm air padding and a first-order absorbing boundary. Layer depths from bottom: 0, .2 (inner2), 1.4 (inner1), 1.6 mm (top). Vias use octagonal barrel cross-sections. Other signal/power copper, package internals and decoupling are omitted. Signal vias follow the exported top-to-inner2 extent; fabrication stubs are unknown. No inner GND planes were exported.

## Units and normalization

Palace's port CSV files contain SI phasors. The importer divides all phasors by the computed complex source-port voltage, setting that terminal to 1+j0 V in the physical signal-to-GND convention. Source current entering the board is `2*I_inc - I_port_termination`, not the CSV termination current alone. The native fixture directions define GND-to-signal voltage. Physical port axes and the excitation are both reversed during normalization: port CSV values use `1/V_native`, while fields use `-1/V_native`. Boundary `J_s` is nondimensional; multiply by `1/sqrt(Z0*Lc_m²)` and by the physical field normalization. It is surface current in A/m, not bulk current in A/mm². The heatmap uses its complex vector magnitude. Palace's documentation describes these as peak phasors with exp(+jωt).

Only conductor boundary attribute 11 is included. Horizontal GND faces are selected by their z coordinate and the exported ground polygons; signal copper and vertical barrels are excluded from planar maps. Empty inner GND maps indicate absent exported copper, not zero EM fields.

A successful linear solve is not a mesh-accuracy certificate. This first board pilot requires mesh/order, air-padding and crop convergence before its current-density peaks or extracted impedance can support an engineering signoff. Copper-edge peaks can be singular and should not be compared as unqualified mesh maxima.

The memory case isolates x [-8, -3], y [-35.5, -32] mm, one GND via, and the other DDR_D8 signal via. Its artificial load joins the cut inner-2 trace to bottom GND at (-3.85, -32) mm. Substitute `data/em-ddr-d8-memory` in the commands above; its cached settings select second-order elements and a complex direct coarse solve. The processor reference run uses second-order elements and AMS. The processor case can take approximately 25 minutes on four cores.

After solving and exporting, also integrate barrel currents and refresh the images:

```sh
.venv-em/bin/python scripts/em/vias.py data/em-ddr-d8-cpu
.venv-em/bin/python scripts/em/render_cpu.py data/em-ddr-d8-cpu public/em
.venv-em/bin/python scripts/em/render_png_cpu.py data/em-ddr-d8-cpu public/em
```

For the memory case use `render_memory.py`, `render_png_memory.py`, and output directory `public/em/memory`. Via integration samples the copper-barrel surface current at z=1.55, 1.4, .2 and .05 mm. Its units are A before display conversion to mA; it is separate from horizontal surface-current density.

The reference convergence checks compare first-order and second-order solutions on the same mesh. The processor also has a first-order run with a .05 mm mesh target. Current magnitude changed 6.7% with element order for the processor and 2.8% for memory; reactance changed approximately 51% and 59%. These checks show why the first coarse result must not be treated as accurate absolute density or a layout signoff. Further mesh, crop, air-padding and material/fixture validation is required.
