import type { Point } from "circuit-json"
import type {
  ReturnCurrentCircuitJson,
  SimulationReturnCurrentExcitation,
} from "./types"

export type CopperLayer = "top" | "inner1" | "inner2" | "bottom"
export interface StackupLayer {
  name: CopperLayer
  /** Depth below top copper, in mm. Must be strictly increasing. */
  z: number
  copperThickness: number
}
export interface MultilayerExcitation
  extends SimulationReturnCurrentExcitation {
  return_source: Point & { layer: CopperLayer }
  return_sink: Point & { layer: CopperLayer }
}
export interface MultilayerSimulationOptions {
  circuitJson: ReturnCurrentCircuitJson
  /** Explicit physical stackup; no inner-layer positions are inferred. */
  stackup: readonly StackupLayer[]
  excitations: readonly MultilayerExcitation[]
  cellSize?: number
  bounds?: { minX: number; maxX: number; minY: number; maxY: number }
  /** Radial via barrel plating thickness, in mm; mandatory when GND vias exist. */
  viaPlatingThickness?: number
  contactRadius?: number
  tolerance?: number
  maxIterations?: number
}
export interface MultilayerNode extends Point {
  layer: CopperLayer
  kind: "plane" | "anchor"
  injection: number
  sheetCurrentX: number
  sheetCurrentY: number
  /** 2D plane-cell density only; narrow trace density is stored on edges. */
  currentDensity: number
}
export interface MultilayerEdge {
  startNode: number
  endNode: number
  kind: "plane" | "trace" | "attachment" | "via"
  conductance: number
  preferredCurrent: number
  current: number
  /** Horizontal trace/face density in A/mm²; absent for via barrels. */
  currentDensity?: number
  /** Ground conductor width or mesh face length, mm. */
  width?: number
  pcbViaId?: string
}
export interface MultilayerSignalSegment {
  start: Point
  end: Point
  layer: CopperLayer
  width: number
  current: number
  pcbTraceId: string
}
export interface MultilayerSignalVia extends Point {
  fromLayer: CopperLayer
  toLayer: CopperLayer
  current: number
  pcbTraceId: string
}
export interface MultilayerCopperRegion {
  outer: Point[]
  holes: Point[][]
}
export interface MultilayerSimulationResult {
  stackup: readonly StackupLayer[]
  bounds: { minX: number; maxX: number; minY: number; maxY: number }
  boardOutline: Point[]
  cellWidth: number
  cellHeight: number
  nodes: MultilayerNode[]
  edges: MultilayerEdge[]
  signalSegments: MultilayerSignalSegment[]
  signalVias: MultilayerSignalVia[]
  groundRegions: Record<CopperLayer, MultilayerCopperRegion[]>
  groundTraceSegments: MultilayerSignalSegment[]
  diagnostics: {
    converged: boolean
    iterations: number
    relativeResidual: number
    maxConservationError: number
    connectedGroundComponents: number
    groundViaCount: number
    totalGroundViaEdgeCount: number
    cropped: boolean
    unconnectedAnchors: number
    signalCurrentConvention: string
    model: string
  }
}
