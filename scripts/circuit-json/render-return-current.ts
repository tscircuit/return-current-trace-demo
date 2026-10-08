import { readFile, writeFile } from "node:fs/promises"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { parseArgs } from "node:util"
import type { AnyCircuitElement, Asset, LayerRef } from "circuit-json"

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    "simulation-result-id": { type: "string" },
    layer: { type: "string", default: "inner1" },
    output: { type: "string", short: "o" },
    vectors: { type: "boolean", default: false },
    opacity: { type: "string", default: "0.65" },
    viewport: { type: "string" },
    "density-range": { type: "string" },
    help: { type: "boolean", short: "h" },
  },
})

if (values.help) {
  console.log(`Usage: bun scripts/circuit-json/render-return-current.ts INPUT.circuit.json --simulation-result-id ID --layer inner1 --output overlay.svg [--vectors] [--viewport minX,minY,maxX,maxY] [--density-range min,max]

Renders the real PCB with one selected simulation result. Embedded plain/gzip
field assets are supported. External assets resolve locally relative to INPUT;
HTTP assets require an explicit local copy and are never fetched implicitly.`)
  process.exit(0)
}
if (
  positionals.length !== 1 ||
  !values["simulation-result-id"] ||
  !values.output
) {
  throw new Error(
    "Provide INPUT.circuit.json, --simulation-result-id and --output; see --help",
  )
}
if (!/^(top|bottom|inner\d+)$/.test(values.layer!))
  throw new Error("Invalid PCB layer")
const inputPath = resolve(positionals[0]!)
const circuitJson = JSON.parse(
  await readFile(inputPath, "utf8"),
) as AnyCircuitElement[]
const rendererUrl = new URL(
  "../../prototype/circuit-to-svg/index.js",
  import.meta.url,
)
const { convertCircuitJsonToPcbSimulationSvg } = await import(rendererUrl.href)
let viewport:
  | { minX: number; minY: number; maxX: number; maxY: number }
  | undefined
if (values.viewport) {
  const numbers = values.viewport.split(",").map(Number)
  if (
    numbers.length !== 4 ||
    numbers.some((number) => !Number.isFinite(number)) ||
    numbers[2]! <= numbers[0]! ||
    numbers[3]! <= numbers[1]!
  )
    throw new Error(
      "--viewport requires minX,minY,maxX,maxY with positive width/height",
    )
  viewport = {
    minX: numbers[0]!,
    minY: numbers[1]!,
    maxX: numbers[2]!,
    maxY: numbers[3]!,
  }
}
let densityRange: { min: number; max: number } | undefined
if (values["density-range"]) {
  const range = values["density-range"].split(",").map(Number)
  if (
    range.length !== 2 ||
    range.some((number) => !Number.isFinite(number)) ||
    range[0]! < 0 ||
    range[1]! <= range[0]!
  )
    throw new Error("--density-range requires 0 <= min < max in A/mm²")
  densityRange = { min: range[0]!, max: range[1]! }
}
const svg = await convertCircuitJsonToPcbSimulationSvg(circuitJson, {
  simulationResultId: values["simulation-result-id"],
  layer: values.layer as LayerRef,
  width: 1200,
  height: 900,
  viewport,
  returnCurrent: {
    showVectors: values.vectors,
    opacity: Number(values.opacity),
    densityRange,
  },
  resolveAsset: async (asset: Asset) => {
    const path = asset.url.startsWith("file:")
      ? fileURLToPath(asset.url)
      : resolve(dirname(inputPath), asset.project_relative_path)
    return new Uint8Array(await readFile(path))
  },
})
await writeFile(resolve(values.output), svg)
console.log(
  `Rendered ${values["simulation-result-id"]} on ${values.layer} to ${values.output}`,
)
