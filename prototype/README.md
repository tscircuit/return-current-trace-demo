# Circuit JSON simulator and renderer prototypes

These snapshots let this demo run the upstream CLI and selected-simulation SVG renderer without adjacent source checkouts. The tested source revisions and declared licenses are recorded in `sources.json` and each package's `source.json`. Upstream license files are copied when provided. They are development snapshots; no npm release or merge is implied.

Source changes belong in [simulate-return-current #16](https://github.com/tscircuit/simulate-return-current/pull/16) and [circuit-to-svg #818](https://github.com/tscircuit/circuit-to-svg/pull/818). After checking out and committing those changes, refresh with:

```sh
bun scripts/circuit-json/update-prototypes.ts \
  --simulator-dir /path/to/simulate-return-current \
  --renderer-dir /path/to/circuit-to-svg
```

The update script requires clean committed sources, bundles the runtime APIs and CLI, copies the simulator's Python resources, and records source commits. Bundled source contains no session credentials. `@resvg/resvg-js` is the runtime's native image dependency and is installed by this demo's package manifest.
