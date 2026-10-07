import type { Point } from "circuit-json"
import {
  cutoutOutline,
  flattenRing,
  pointInPolygon,
  rectangleOutline,
  segmentInCopper,
} from "./geometry"
import { imageCurrentAt } from "./image-current"
import type { SimulationGeometry } from "./types"
import type {
  CopperLayer,
  MultilayerSimulationOptions,
  MultilayerSimulationResult,
  MultilayerSignalSegment,
  MultilayerCopperRegion,
} from "./multilayer-types"

// Geometry conversion is explicit here: source elements remain unmodified.
type Element = Record<string, any>
const names: CopperLayer[] = ["top", "inner1", "inner2", "bottom"]
const positive = (n: number, what: string) => {
  if (!Number.isFinite(n) || n <= 0)
    throw new Error(`${what} must be finite and positive`)
  return n
}
const key = (p: Point, layer: string) =>
  `${layer}:${p.x.toFixed(6)}:${p.y.toFixed(6)}`
const same = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y) < 1e-6
function polygon(e: Element): MultilayerCopperRegion {
  if (e.shape === "rect")
    return { outer: rectangleOutline(e as any), holes: [] }
  if (e.shape === "polygon") return { outer: e.points, holes: [] }
  if (e.shape !== "brep")
    throw new Error(`Unsupported ground pour shape: ${e.shape}`)
  return {
    outer: flattenRing(e.brep_shape.outer_ring.vertices),
    holes: e.brep_shape.inner_rings.map((r: Element) =>
      flattenRing(r.vertices),
    ),
  }
}

/** Connected multilayer extension of the conservative image-current approximation.
 * Ground plane meshes, explicit narrow GND trace edges and plated GND via barrels
 * form ONE graph. This is not a frequency-domain electromagnetic solver.
 */
export function simulateMultilayerReturnCurrent(
  options: MultilayerSimulationOptions,
): MultilayerSimulationResult {
  const c = options.circuitJson as readonly Element[]
  const boards = c.filter((e) => e.type === "pcb_board")
  if (boards.length !== 1) throw new Error("Exactly one PCB board is required")
  const board = boards[0]
  if (![2, 4].includes(board.num_layers))
    throw new Error("Only two- or four-layer boards are supported")
  const required = board.num_layers === 4 ? names : ["top", "bottom"]
  if (
    options.stackup.length !== required.length ||
    options.stackup.some((s, i) => s.name !== required[i])
  )
    throw new Error(
      "Stackup must contain every board layer in physical top-to-bottom order",
    )
  const thickness = positive(board.thickness, "Board thickness")
  for (let i = 0; i < options.stackup.length; i++) {
    const s = options.stackup[i]
    positive(s.copperThickness, "Copper thickness")
    if (
      !Number.isFinite(s.z) ||
      s.z < 0 ||
      s.z > thickness ||
      (i > 0 && s.z <= options.stackup[i - 1].z)
    )
      throw new Error(
        "Stackup depths must be finite, ordered, and within board thickness",
      )
  }
  if (
    Math.abs(options.stackup[0].z) > 1e-9 ||
    Math.abs(options.stackup.at(-1)!.z - thickness) > 1e-9
  )
    throw new Error("Stackup must span z=0 to board.thickness")
  if (!options.excitations.length)
    throw new Error(
      "Specify explicit multilayer excitations and layer-aware return contacts",
    )
  const groundIds = new Set(
    options.excitations.map((e) => e.ground_source_net_id),
  )
  if (groundIds.size !== 1)
    throw new Error("All excitations must share one ground net")
  const groundId = [...groundIds][0]
  const pitch = positive(options.cellSize ?? 0.5, "Cell size")
  const radius = positive(options.contactRadius ?? pitch, "Contact radius")
  const tolerance = positive(options.tolerance ?? 1e-8, "Tolerance")
  const maxIterations = positive(
    options.maxIterations ?? 10000,
    "Maximum iterations",
  )
  if (!Number.isInteger(maxIterations))
    throw new Error("Maximum iterations must be an integer")
  const stack = new Map(options.stackup.map((s) => [s.name, s]))
  const layer = (s: string): CopperLayer => {
    if (!stack.has(s as CopperLayer))
      throw new Error(`Layer ${s} is absent from the stackup`)
    return s as CopperLayer
  }
  const outline = board.outline?.length
    ? board.outline
    : rectangleOutline(board as any)
  const originalBounds = {
    minX: Math.min(...outline.map((p: Point) => p.x)),
    maxX: Math.max(...outline.map((p: Point) => p.x)),
    minY: Math.min(...outline.map((p: Point) => p.y)),
    maxY: Math.max(...outline.map((p: Point) => p.y)),
  }
  const bounds = options.bounds ?? originalBounds
  if (
    !Object.values(bounds).every(Number.isFinite) ||
    bounds.maxX <= bounds.minX ||
    bounds.maxY <= bounds.minY ||
    bounds.minX < originalBounds.minX ||
    bounds.maxX > originalBounds.maxX ||
    bounds.minY < originalBounds.minY ||
    bounds.maxY > originalBounds.maxY
  )
    throw new Error(
      "Simulation bounds must be finite and inside the board bounds",
    )
  const inBounds = (p: Point) =>
    p.x >= bounds.minX &&
    p.x <= bounds.maxX &&
    p.y >= bounds.minY &&
    p.y <= bounds.maxY
  const cutouts = c
    .filter((e) => e.type === "pcb_cutout")
    .map((e) => cutoutOutline(e as any))
  for (const e of c.filter(
    (e) => e.type === "pcb_hole" || e.type === "pcb_plated_hole",
  )) {
    const shape = e.hole_shape ?? e.shape
    const cx = e.x + (e.hole_offset_x ?? 0),
      cy = e.y + (e.hole_offset_y ?? 0)
    const diameter = e.hole_diameter
    if (shape === "circle" || shape === "circular_hole_with_rect_pad") {
      positive(diameter, "Drill diameter")
      cutouts.push(
        Array.from({ length: 32 }, (_, i) => ({
          x: cx + (diameter / 2) * Math.cos((i * Math.PI) / 16),
          y: cy + (diameter / 2) * Math.sin((i * Math.PI) / 16),
        })),
      )
    } else if (shape === "pill") {
      const w = positive(e.hole_width, "Slot width"),
        h = positive(e.hole_height, "Slot height")
      const radius = Math.min(w, h) / 2,
        shift = Math.abs(w - h) / 2
      const angle =
        ((e.ccw_rotation ?? e.rect_ccw_rotation ?? 0) * Math.PI) / 180
      cutouts.push(
        Array.from({ length: 64 }, (_, i) => {
          const t = (i * Math.PI) / 32
          const x =
            radius * Math.cos(t) +
            (w >= h ? (Math.cos(t) >= 0 ? shift : -shift) : 0)
          const y =
            radius * Math.sin(t) +
            (h > w ? (Math.sin(t) >= 0 ? shift : -shift) : 0)
          return {
            x: cx + x * Math.cos(angle) - y * Math.sin(angle),
            y: cy + x * Math.sin(angle) + y * Math.cos(angle),
          }
        }),
      )
    } else throw new Error(`Unsupported multilayer drilled cutout: ${shape}`)
  }
  const material = (p: Point) =>
    inBounds(p) &&
    pointInPolygon(p, outline) &&
    !cutouts.some((o) => pointInPolygon(p, o))
  const intersects = (o: Point[]) =>
    Math.max(...o.map((p) => p.x)) >= bounds.minX &&
    Math.min(...o.map((p) => p.x)) <= bounds.maxX &&
    Math.max(...o.map((p) => p.y)) >= bounds.minY &&
    Math.min(...o.map((p) => p.y)) <= bounds.maxY
  const regions: Record<CopperLayer, MultilayerCopperRegion[]> = {
    top: [],
    inner1: [],
    inner2: [],
    bottom: [],
  }
  for (const e of c.filter(
    (e) => e.type === "pcb_copper_pour" && e.source_net_id === groundId,
  )) {
    const r = polygon(e)
    if (intersects(r.outer))
      regions[layer(e.layer)].push({
        outer: r.outer,
        holes: r.holes.filter(intersects),
      })
  }
  const planeIds = new Set(
    c
      .filter(
        (e) => e.type === "pcb_ground_plane" && e.source_net_id === groundId,
      )
      .map((e) => e.pcb_ground_plane_id),
  )
  for (const e of c.filter(
    (e) =>
      e.type === "pcb_ground_plane_region" &&
      planeIds.has(e.pcb_ground_plane_id),
  ))
    if (intersects(e.points))
      regions[layer(e.layer)].push({ outer: e.points, holes: [] })
  const geometries = new Map(
    options.stackup.map((s) => [
      s.name,
      {
        board,
        boardOutline: outline,
        cutouts,
        groundRegions: regions[s.name],
        signals: [],
        segments: [],
        excitations: [],
      } as unknown as SimulationGeometry,
    ]),
  )
  const sourceTraces = new Map(
    c
      .filter((e) => e.type === "source_trace")
      .map((e) => [e.source_trace_id, e]),
  )
  const groundSourcePorts = new Set(
    c
      .filter(
        (e) =>
          e.type === "source_trace" &&
          e.connected_source_net_ids?.includes(groundId),
      )
      .flatMap((e) => e.connected_source_port_ids),
  )
  const groundPorts = c.filter(
    (e) =>
      e.type === "pcb_port" &&
      (groundSourcePorts.has(e.source_port_id) || e.source_net_id === groundId),
  )
  const groundPortIds = new Set(groundPorts.map((e) => e.pcb_port_id))
  const groundTraces = c.filter(
    (e) =>
      e.type === "pcb_trace" &&
      (e.source_net_id === groundId ||
        sourceTraces
          .get(e.source_trace_id)
          ?.connected_source_net_ids?.includes(groundId)),
  )
  const groundVias = c.filter(
    (e) =>
      e.type === "pcb_via" &&
      e.source_net_id === groundId &&
      material(e as any),
  )
  if (groundVias.length)
    positive(
      options.viaPlatingThickness ?? NaN,
      "Explicit via plating thickness",
    )
  const signalSegments: MultilayerSignalSegment[] = []
  const signalVias: MultilayerSimulationResult["signalVias"] = []
  for (const excitation of options.excitations) {
    if (!Number.isFinite(excitation.current))
      throw new Error("Excitation current must be finite")
    for (const p of [excitation.return_source, excitation.return_sink]) {
      layer(p.layer)
      if (![p.x, p.y].every(Number.isFinite) || !material(p))
        throw new Error(
          "Return contacts must be finite and inside the simulated board material",
        )
    }
    const e = c.find(
      (e) =>
        e.type === "pcb_trace" && e.pcb_trace_id === excitation.pcb_trace_id,
    )
    if (!e) throw new Error("Excitation references a missing signal trace")
    let previous: Element | undefined
    let pendingVia: Element | undefined
    for (const p of e.route) {
      if (![p.x, p.y].every(Number.isFinite) || !material(p as Point))
        throw new Error(
          "An excited route leaves simulated board material; enlarge the region",
        )
      if (p.route_type === "via") {
        if (
          !previous ||
          !same(previous as Point, p as Point) ||
          layer(p.from_layer) !== previous.layer ||
          pendingVia
        )
          throw new Error(
            "A signal via must join explicit, coincident wire endpoints",
          )
        layer(p.to_layer)
        signalVias.push({
          x: p.x,
          y: p.y,
          fromLayer: p.from_layer,
          toLayer: p.to_layer,
          current: excitation.current,
          pcbTraceId: e.pcb_trace_id,
        })
        pendingVia = p
        continue
      }
      if (p.route_type !== "wire")
        throw new Error("Unsupported signal route point")
      layer(p.layer)
      positive(p.width, "Signal width")
      if (pendingVia) {
        if (
          !same(p as Point, pendingVia as Point) ||
          p.layer !== pendingVia.to_layer
        )
          throw new Error("Signal layer transition does not match its via")
        pendingVia = undefined
      } else if (previous && previous.layer !== p.layer)
        throw new Error("Signal layer changes require explicit vias")
      if (
        previous &&
        previous.layer === p.layer &&
        !same(previous as Point, p as Point)
      ) {
        const emptyMaterial = {
          ...geometries.get(layer(p.layer))!,
          groundRegions: [{ outer: outline, holes: [] }],
        }
        if (
          !segmentInCopper(
            { start: previous as Point, end: p as Point },
            emptyMaterial,
          )
        )
          throw new Error("Signal crosses a physical cutout")
        signalSegments.push({
          start: { x: previous.x, y: previous.y },
          end: { x: p.x, y: p.y },
          layer: p.layer,
          width: previous.width,
          current: excitation.current,
          pcbTraceId: e.pcb_trace_id,
        })
      }
      previous = p
    }
    if (pendingVia) throw new Error("Signal route ends with an unconnected via")
  }
  const cols = Math.max(2, Math.ceil((bounds.maxX - bounds.minX) / pitch))
  const rows = Math.max(2, Math.ceil((bounds.maxY - bounds.minY) / pitch))
  if (cols * rows * options.stackup.length > 400000)
    throw new Error("Multilayer mesh exceeds 400,000 candidate cells")
  const dx = (bounds.maxX - bounds.minX) / cols,
    dy = (bounds.maxY - bounds.minY) / rows
  const nodes: MultilayerSimulationResult["nodes"] = []
  const edges: MultilayerSimulationResult["edges"] = []
  const grids = new Map<CopperLayer, Int32Array>()
  const anchors = new Map<string, number>()
  const addNode = (p: Point, s: CopperLayer, kind: "plane" | "anchor") => {
    nodes.push({
      x: p.x,
      y: p.y,
      layer: s,
      kind,
      injection: 0,
      sheetCurrentX: 0,
      sheetCurrentY: 0,
      currentDensity: 0,
    })
    return nodes.length - 1
  }
  const anchor = (p: Point, s: CopperLayer) => {
    const k = key(p, s)
    if (!anchors.has(k)) anchors.set(k, addNode(p, s, "anchor"))
    return anchors.get(k)!
  }
  const addEdge = (
    a: number,
    b: number,
    kind: MultilayerSimulationResult["edges"][number]["kind"],
    g: number,
    preferred = 0,
    width?: number,
    viaId?: string,
  ) => {
    if (a === b) return
    edges.push({
      startNode: a,
      endNode: b,
      kind,
      conductance: positive(g, "Edge conductance"),
      preferredCurrent: preferred,
      current: preferred,
      width,
      pcbViaId: viaId,
    })
  }
  // Only actual exported pours produce 2D meshes. Narrow GND wires are graph edges.
  const planeLayers = options.stackup
    .filter((s) => regions[s.name].length > 0)
    .map((s) => s.name)
  const preferredByPlane = new Map<
    CopperLayer,
    Map<number, MultilayerSignalSegment[]>
  >()
  for (const s of planeLayers) {
    const bySpacing = new Map<number, MultilayerSignalSegment[]>()
    for (const segment of signalSegments) {
      const h = Math.abs(stack.get(s)!.z - stack.get(segment.layer)!.z)
      if (h === 0) continue // Coplanar coupling is not an image-plane model.
      const sum = planeLayers.reduce((v, t) => {
        const d = Math.abs(stack.get(t)!.z - stack.get(segment.layer)!.z)
        return v + (d > 0 ? 1 / d : 0)
      }, 0)
      const fraction = 1 / h / sum
      const list = bySpacing.get(h) ?? []
      list.push({ ...segment, current: segment.current * fraction })
      bySpacing.set(h, list)
    }
    preferredByPlane.set(s, bySpacing)
  }
  const field = (p: Point, s: CopperLayer) => {
    let x = 0,
      y = 0
    for (const [h, segments] of preferredByPlane.get(s) ?? []) {
      const k = imageCurrentAt(p, { segments, layerSeparation: h })
      x += k.x
      y += k.y
    }
    return { x, y }
  }
  for (const s of planeLayers) {
    const geometry = geometries.get(s)!
    const grid = new Int32Array(cols * rows).fill(-1)
    grids.set(s, grid)
    for (let row = 0; row < rows; row++)
      for (let col = 0; col < cols; col++) {
        const p = {
          x: bounds.minX + (col + 0.5) * dx,
          y: bounds.minY + (row + 0.5) * dy,
        }
        if (
          material(p) &&
          geometry.groundRegions.some(
            (r) =>
              pointInPolygon(p, r.outer) &&
              !r.holes.some((h) => pointInPolygon(p, h)),
          )
        )
          grid[row * cols + col] = addNode(p, s, "plane")
      }
    for (let row = 0; row < rows; row++)
      for (let col = 0; col < cols; col++) {
        const a = grid[row * cols + col]
        if (a < 0) continue
        for (const axis of ["x", "y"] as const) {
          const cc = col + (axis === "x" ? 1 : 0),
            rr = row + (axis === "y" ? 1 : 0)
          if (cc >= cols || rr >= rows) continue
          const b = grid[rr * cols + cc]
          if (
            b < 0 ||
            !segmentInCopper({ start: nodes[a], end: nodes[b] }, geometry)
          )
            continue
          const width = axis === "x" ? dy : dx
          let pref = 0
          const samples = [-Math.sqrt(3 / 5) / 2, 0, Math.sqrt(3 / 5) / 2]
          const weights = [5 / 18, 4 / 9, 5 / 18]
          for (let j = 0; j < 3; j++) {
            const p = {
              x:
                (nodes[a].x + nodes[b].x) / 2 +
                (axis === "y" ? samples[j] * width : 0),
              y:
                (nodes[a].y + nodes[b].y) / 2 +
                (axis === "x" ? samples[j] * width : 0),
            }
            pref += field(p, s)[axis] * width * weights[j]
          }
          addEdge(
            a,
            b,
            "plane",
            (width / (axis === "x" ? dx : dy)) * stack.get(s)!.copperThickness,
            pref,
            width,
          )
        }
      }
  }
  const groundTraceSegments: MultilayerSignalSegment[] = []
  for (const e of groundTraces) {
    let previous: Element | undefined
    for (const p of e.route) {
      if (p.route_type === "via") {
        previous = undefined
        continue
      }
      if (p.route_type !== "wire")
        throw new Error("Unsupported ground trace route point")
      const s = layer(p.layer)
      if (
        previous &&
        previous.layer === s &&
        material(previous as Point) &&
        material(p as Point) &&
        !same(previous as Point, p as Point)
      ) {
        const boardMaterial = {
          ...geometries.get(s)!,
          groundRegions: [{ outer: outline, holes: [] }],
        }
        if (
          !segmentInCopper(
            { start: previous as Point, end: p as Point },
            boardMaterial,
          )
        )
          throw new Error("Ground trace crosses a physical cutout")
        const w = positive(previous.width, "Ground trace width")
        const length = Math.hypot(p.x - previous.x, p.y - previous.y)
        addEdge(
          anchor(previous as Point, s),
          anchor(p as Point, s),
          "trace",
          (w * stack.get(s)!.copperThickness) / length,
          0,
          w,
        )
        groundTraceSegments.push({
          start: { x: previous.x, y: previous.y },
          end: { x: p.x, y: p.y },
          layer: s,
          width: w,
          current: 0,
          pcbTraceId: e.pcb_trace_id,
        })
      }
      previous = p
    }
  }
  for (const p of groundPorts)
    if (material(p as Point)) {
      for (const s of p.layers ?? []) anchor(p as Point, layer(s))
    }
  // Pads are represented by contacts/anchors; sub-grid wires remain explicit.
  const groundPads = c.filter(
    (e) => e.type === "pcb_smtpad" && groundPortIds.has(e.pcb_port_id),
  )
  for (const pad of groundPads)
    if (material(pad as Point)) anchor(pad as Point, layer(pad.layer))
  for (const via of groundVias) {
    const from = layer(via.from_layer ?? via.layers?.[0]),
      to = layer(via.to_layer ?? via.layers?.at(-1))
    const fi = options.stackup.findIndex((s) => s.name === from),
      ti = options.stackup.findIndex((s) => s.name === to)
    if (fi >= ti)
      throw new Error("Ground via span must be ordered top to bottom")
    const hole = positive(via.hole_diameter, "Via drill diameter")
    const plating = options.viaPlatingThickness!
    if (hole + 2 * plating > positive(via.outer_diameter, "Via outer diameter"))
      throw new Error("Via barrel plating exceeds via pad diameter")
    const area = Math.PI * ((hole / 2 + plating) ** 2 - (hole / 2) ** 2)
    for (let i = fi; i < ti; i++) {
      const a = options.stackup[i],
        b = options.stackup[i + 1]
      addEdge(
        anchor(via as Point, a.name),
        anchor(via as Point, b.name),
        "via",
        area / (b.z - a.z),
        0,
        undefined,
        via.pcb_via_id,
      )
    }
  }
  // A radial attachment must be visible entirely through that layer's copper.
  // Via pad centers are virtual barrel nodes, not invented inner-layer planes.
  for (const [k, i] of anchors) {
    const n = nodes[i],
      grid = grids.get(n.layer)
    if (!grid) continue
    const col = Math.floor((n.x - bounds.minX) / dx),
      row = Math.floor((n.y - bounds.minY) / dy)
    const searchRadius = Math.max(radius, Math.hypot(dx, dy))
    const reach = Math.ceil(searchRadius / Math.min(dx, dy))
    const candidates: { id: number; distance: number }[] = []
    for (
      let r = Math.max(0, row - reach);
      r <= Math.min(rows - 1, row + reach);
      r++
    )
      for (
        let cc = Math.max(0, col - reach);
        cc <= Math.min(cols - 1, col + reach);
        cc++
      ) {
        const j = grid[r * cols + cc]
        if (j < 0) continue
        const d = Math.hypot(n.x - nodes[j].x, n.y - nodes[j].y)
        if (
          d <= searchRadius &&
          segmentInCopper({ start: n, end: nodes[j] }, geometries.get(n.layer)!)
        )
          candidates.push({ id: j, distance: d })
      }
    candidates.sort((a, b) => a.distance - b.distance)
    // Up to four local attachments avoid a single-cell point contact bias.
    for (const q of candidates.slice(0, 4)) {
      const w = Math.min(dx, dy) / Math.max(1, Math.min(candidates.length, 4))
      addEdge(
        i,
        q.id,
        "attachment",
        (w * stack.get(n.layer)!.copperThickness) /
          Math.max(q.distance, pitch / 4),
        0,
        w,
      )
    }
  }
  if (!nodes.length)
    throw new Error("The selected net contains no ground conductor geometry")
  const adjacent: number[][] = nodes.map(() => [])
  for (const e of edges) {
    adjacent[e.startNode].push(e.endNode)
    adjacent[e.endNode].push(e.startNode)
  }
  const labels = new Int32Array(nodes.length).fill(-1),
    pinned = new Uint8Array(nodes.length)
  let components = 0
  for (let i = 0; i < nodes.length; i++) {
    if (labels[i] >= 0) continue
    pinned[i] = 1
    labels[i] = components
    const queue = [i]
    for (let q = 0; q < queue.length; q++)
      for (const j of adjacent[queue[q]])
        if (labels[j] < 0) {
          labels[j] = components
          queue.push(j)
        }
    components++
  }
  const findContact = (p: Point & { layer: CopperLayer }) => {
    const exact = anchors.get(key(p, p.layer))
    if (exact !== undefined && adjacent[exact].length) return [exact]
    const visible = nodes
      .map((n, i) => ({ n, i, d: Math.hypot(n.x - p.x, n.y - p.y) }))
      .filter(
        (a) =>
          a.n.kind === "plane" &&
          a.n.layer === p.layer &&
          a.d <= radius &&
          segmentInCopper({ start: p, end: a.n }, geometries.get(p.layer)!),
      )
      .sort((a, b) => a.d - b.d)
    if (!visible.length)
      throw new Error(
        "A return contact has no connected copper on its specified layer",
      )
    return visible
      .filter((a) => labels[a.i] === labels[visible[0].i])
      .map((a) => a.i)
  }
  for (const e of options.excitations) {
    const source = findContact(e.return_source),
      sink = findContact(e.return_sink)
    if (e.current !== 0 && labels[source[0]] !== labels[sink[0]])
      throw new Error(
        "Return contacts are on disconnected multilayer ground components",
      )
    for (const i of source) nodes[i].injection += e.current / source.length
    for (const i of sink) nodes[i].injection -= e.current / sink.length
  }
  const diagonal = new Float64Array(nodes.length),
    rhs = Float64Array.from(nodes.map((n) => n.injection))
  for (const e of edges) {
    diagonal[e.startNode] += e.conductance
    diagonal[e.endNode] += e.conductance
    rhs[e.startNode] -= e.preferredCurrent
    rhs[e.endNode] += e.preferredCurrent
  }
  for (let i = 0; i < nodes.length; i++)
    if (pinned[i]) {
      diagonal[i] = 1
      rhs[i] = 0
    }
  const multiply = (p: Float64Array) => {
    const out = new Float64Array(p.length)
    for (const e of edges) {
      const v =
        e.conductance *
        ((pinned[e.startNode] ? 0 : p[e.startNode]) -
          (pinned[e.endNode] ? 0 : p[e.endNode]))
      if (!pinned[e.startNode]) out[e.startNode] += v
      if (!pinned[e.endNode]) out[e.endNode] -= v
    }
    for (let i = 0; i < p.length; i++) if (pinned[i]) out[i] = p[i]
    return out
  }
  const dot = (a: Float64Array, b: Float64Array) =>
    a.reduce((v, n, i) => v + n * b[i], 0)
  const potential = new Float64Array(nodes.length)
  let residual = rhs.slice(),
    direction = residual.map((v, i) => v / diagonal[i])
  let product = dot(residual, direction),
    initial = Math.sqrt(dot(residual, residual)),
    relative = initial ? 1 : 0,
    iteration = 0
  for (; relative > tolerance && iteration < maxIterations; iteration++) {
    const applied = multiply(direction),
      denominator = dot(direction, applied)
    if (!(denominator > 0) || !Number.isFinite(denominator))
      throw new Error("Degenerate multilayer conservation system")
    const alpha = product / denominator
    for (let i = 0; i < nodes.length; i++) {
      potential[i] += alpha * direction[i]
      residual[i] -= alpha * applied[i]
    }
    relative = Math.sqrt(dot(residual, residual)) / initial
    if (relative <= tolerance) {
      const truth = multiply(potential)
      residual = rhs.map((v, i) => v - truth[i])
      relative = Math.sqrt(dot(residual, residual)) / initial
      if (relative <= tolerance) break
      direction = residual.map((v, i) => v / diagonal[i])
      product = dot(residual, direction)
      continue
    }
    const preconditioned = residual.map((v, i) => v / diagonal[i]),
      next = dot(residual, preconditioned),
      beta = next / product
    direction = preconditioned.map((v, i) => v + beta * direction[i])
    product = next
  }
  if (relative > tolerance)
    throw new Error(
      `Multilayer conservation solve did not converge after ${maxIterations} iterations`,
    )
  const divergence = new Float64Array(nodes.length)
  for (const e of edges) {
    e.current =
      e.preferredCurrent +
      e.conductance * (potential[e.startNode] - potential[e.endNode])
    if (e.width) {
      e.currentDensity =
        Math.abs(e.current) /
        (e.width * stack.get(nodes[e.startNode].layer)!.copperThickness)
    }
    divergence[e.startNode] += e.current
    divergence[e.endNode] -= e.current
    if (e.kind !== "plane") continue
    const a = nodes[e.startNode],
      b = nodes[e.endNode],
      length = Math.hypot(b.x - a.x, b.y - a.y)
    const k = e.current / e.width!
    for (const i of [e.startNode, e.endNode]) {
      nodes[i].sheetCurrentX += ((k / 2) * (b.x - a.x)) / length
      nodes[i].sheetCurrentY += ((k / 2) * (b.y - a.y)) / length
    }
  }
  let error = 0
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].currentDensity =
      Math.hypot(nodes[i].sheetCurrentX, nodes[i].sheetCurrentY) /
      stack.get(nodes[i].layer)!.copperThickness
    error = Math.max(error, Math.abs(divergence[i] - nodes[i].injection))
  }
  return {
    stackup: options.stackup,
    bounds,
    boardOutline: outline,
    cellWidth: dx,
    cellHeight: dy,
    nodes,
    edges,
    signalSegments,
    signalVias,
    groundRegions: regions,
    groundTraceSegments,
    diagnostics: {
      converged: true,
      iterations: iteration + (initial ? 1 : 0),
      relativeResidual: relative,
      maxConservationError: error,
      connectedGroundComponents: components,
      groundViaCount: groundVias.length,
      totalGroundViaEdgeCount: edges.filter((e) => e.kind === "via").length,
      cropped: options.bounds !== undefined,
      unconnectedAnchors: nodes.filter(
        (n, i) => n.kind === "anchor" && adjacent[i].length === 0,
      ).length,
      signalCurrentConvention:
        "Signed instantaneous/in-phase excitations following ordered signal routes",
      model:
        "Image-current preferred fields (inverse-spacing reference split) projected onto a connected sheet/trace/plated-via graph; frequency, coplanar coupling, power-plane displacement current, and wave effects omitted",
    },
  }
}
