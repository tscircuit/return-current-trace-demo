import { currentColor } from "./current-color"
import type {
  CopperLayer,
  MultilayerSimulationResult,
} from "./multilayer-types"

export interface MultilayerRenderOptions {
  layer?: CopperLayer
  width?: number
  height?: number
  /** Fixed scale across all layers, in A/mm². */
  maxCurrentDensity?: number
  /** Via barrel-current marker scale in A; separate from horizontal density. */
  maxViaCurrent?: number
  showSignalCurrent?: boolean
  title?: string
  /** Optional endpoint landmarks; letters are explained by the experiment viewer. */
  markers?: {
    x: number
    y: number
    label: string
    layers?: CopperLayer[]
    color?: string
  }[]
}
const esc = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[c]!,
  )
/** Four panels (or one selected layer). Copper without ground return is not filled
 * with an inferred plane. Barrels show transported A, not a fictitious sheet J.
 */
export function renderMultilayerReturnCurrentSvg(
  result: MultilayerSimulationResult,
  options: MultilayerRenderOptions = {},
): string {
  const selected = options.layer
    ? result.stackup.filter((s) => s.name === options.layer)
    : result.stackup
  if (!selected.length)
    throw new Error("Requested layer is absent from the result")
  const width = options.width ?? (options.layer ? 800 : 1600),
    height = options.height ?? (options.layer ? 1100 : 2000)
  const cols = options.layer ? 1 : 2,
    rows = Math.ceil(selected.length / cols)
  const panelW = width / cols,
    panelH = (height - 150) / rows
  const maximum = options.maxCurrentDensity ?? 5,
    viaMaximum = options.maxViaCurrent ?? 0.1
  if (
    ![width, height, maximum, viaMaximum].every(
      (n) => Number.isFinite(n) && n > 0,
    )
  )
    throw new Error("Render dimensions and scales must be finite and positive")
  const spanX = result.bounds.maxX - result.bounds.minX,
    spanY = result.bounds.maxY - result.bounds.minY
  const scale = Math.min((panelW - 100) / spanX, (panelH - 115) / spanY)
  const f = (n: number) => Number(n.toFixed(4))
  const densityColor = (j: number) => currentColor(j / maximum)
  const title = options.title ?? "Multilayer ground return current"
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img"><title>${esc(title)}</title><desc>Layer-specific ground current. Gray signal routes are context; orange-bordered circles show ground via barrel transfer. No unexported ground planes are inferred.</desc><rect width="100%" height="100%" fill="white"/><defs><linearGradient id="multilayer-scale">${Array.from({ length: 6 }, (_, i) => `<stop offset="${i * 20}%" stop-color="${currentColor(i / 5)}"/>`).join("")}</linearGradient></defs><g font-family="Arial,sans-serif"><text x="35" y="36" font-size="26" font-weight="bold">${esc(title)}</text><text x="35" y="62" font-size="16" fill="#475569">${options.showSignalCurrent ? "Horizontal signal + GND current density" : "Horizontal GND return current density"} in A/mm² (saturates above ${maximum}) · assumed stackup · frequency-independent approximation</text><rect x="35" y="78" width="${width - 70}" height="18" fill="url(#multilayer-scale)"/>`
  for (let i = 0; i <= 4; i++)
    svg += `<text x="${35 + (i / 4) * (width - 70)}" y="116" font-size="14" text-anchor="${i === 0 ? "start" : i === 4 ? "end" : "middle"}">${f((i / 4) * maximum)}</text>`
  for (let panel = 0; panel < selected.length; panel++) {
    const layer = selected[panel],
      left = (panel % cols) * panelW,
      top = 135 + Math.floor(panel / cols) * panelH
    const x0 = left + (panelW - spanX * scale) / 2,
      y0 = top + 65
    const screen = (p: { x: number; y: number }) => ({
      x: x0 + (p.x - result.bounds.minX) * scale,
      y: y0 + (result.bounds.maxY - p.y) * scale,
    })
    const path = (ps: { x: number; y: number }[]) =>
      ps
        .map((p, i) => {
          const q = screen(p)
          return `${i ? "L" : "M"}${f(q.x)},${f(q.y)}`
        })
        .join(" ") + " Z"
    const clipId = `ml-${layer.name}`
    const regions = result.groundRegions[layer.name]
    const regionPaths = regions
      .map(
        (r) =>
          `<path d="${path(r.outer)} ${r.holes.map(path).join(" ")}" clip-rule="evenodd"/>`,
      )
      .join("")
    const boxW = spanX * scale,
      boxH = spanY * scale
    svg += `<text x="${left + 35}" y="${top + 22}" font-size="22" font-weight="bold">${layer.name.toUpperCase()} · z = ${layer.z} mm</text><text x="${left + 35}" y="${top + 46}" font-size="14" fill="#475569">${regions.length ? "Exported GND pour + connected vias" : layer.name === "top" ? "GND pads and narrow traces; no GND pour" : "No exported horizontal GND copper; via barrels only"}</text><defs><clipPath id="${clipId}">${regionPaths}</clipPath><clipPath id="box-${clipId}"><rect x="${x0}" y="${y0}" width="${boxW}" height="${boxH}"/></clipPath></defs><rect x="${x0}" y="${y0}" width="${boxW}" height="${boxH}" fill="#f8fafc" stroke="#94a3b8"/><g clip-path="url(#box-${clipId})">`
    if (regions.length) {
      svg += `<g clip-path="url(#${clipId})" shape-rendering="crispEdges">`
      for (const n of result.nodes.filter(
        (n) => n.layer === layer.name && n.kind === "plane",
      )) {
        const p = screen({
          x: n.x - result.cellWidth / 2,
          y: n.y + result.cellHeight / 2,
        })
        svg += `<rect x="${f(p.x)}" y="${f(p.y)}" width="${f(result.cellWidth * scale)}" height="${f(result.cellHeight * scale)}" fill="${densityColor(n.currentDensity)}"/>`
      }
      svg += "</g>"
    }
    // Signal filaments are plotted only on their actual routing layer.
    for (const s of result.signalSegments.filter(
      (s) => s.layer === layer.name,
    )) {
      const a = screen(s.start),
        b = screen(s.end)
      const color = options.showSignalCurrent
        ? densityColor(Math.abs(s.current) / (s.width * layer.copperThickness))
        : "#64748b"
      svg += `<path d="M${f(a.x)},${f(a.y)}L${f(b.x)},${f(b.y)}" fill="none" stroke="${color}" stroke-width="${f(Math.max(0.6, s.width * scale))}" opacity="${options.showSignalCurrent ? 1 : 0.45}"/>`
    }
    for (const e of result.edges.filter(
      (e) =>
        e.kind === "trace" && result.nodes[e.startNode].layer === layer.name,
    )) {
      const a = screen(result.nodes[e.startNode]),
        b = screen(result.nodes[e.endNode])
      svg += `<path d="M${f(a.x)},${f(a.y)}L${f(b.x)},${f(b.y)}" fill="none" stroke="${densityColor(Math.abs(e.current) / (e.width! * layer.copperThickness))}" stroke-width="${f(Math.max(1.5, e.width! * scale))}"/>`
    }
    // One via marker per barrel at this layer. Use max adjacent segment magnitude
    // rather than sum (which would double-count through current on inner layers).
    const viaCurrents = new Map<
      string,
      { x: number; y: number; current: number }
    >()
    for (const e of result.edges.filter(
      (e) =>
        e.kind === "via" &&
        (result.nodes[e.startNode].layer === layer.name ||
          result.nodes[e.endNode].layer === layer.name),
    )) {
      const n = result.nodes[e.startNode],
        id = e.pcbViaId!
      const previous = viaCurrents.get(id)
      if (!previous || Math.abs(e.current) > previous.current)
        viaCurrents.set(id, { x: n.x, y: n.y, current: Math.abs(e.current) })
    }
    for (const [id, via] of viaCurrents) {
      const p = screen(via)
      svg += `<circle cx="${f(p.x)}" cy="${f(p.y)}" r="${f(2.2 + 4.8 * Math.min(1, via.current / viaMaximum))}" fill="${currentColor(via.current / viaMaximum)}" stroke="#c2410c" stroke-width="1"><title>${esc(id)}: ${f(via.current * 1000)} mA barrel current</title></circle>`
    }
    for (const marker of options.markers ?? []) {
      if (marker.layers && !marker.layers.includes(layer.name)) continue
      const p = screen(marker)
      const color = marker.color ?? "#7c3aed"
      svg += `<circle cx="${f(p.x)}" cy="${f(p.y)}" r="9" fill="none" stroke="${esc(color)}" stroke-width="2"/><text x="${f(p.x + 11)}" y="${f(p.y - 9)}" font-size="16" font-weight="bold" fill="${esc(color)}" stroke="white" stroke-width="3" paint-order="stroke">${esc(marker.label)}</text>`
    }
    svg += `</g><text x="${left + 35}" y="${y0 + boxH + 24}" font-size="13" fill="#475569">Via circles: 0–${f(viaMaximum * 1000)} mA (size/color); not horizontal sheet density.</text>`
  }
  svg += `</g></svg>`
  return svg
}
