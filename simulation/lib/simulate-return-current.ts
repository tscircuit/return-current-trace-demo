import { ReturnCurrentSolver } from "./ReturnCurrentSolver"
import type { SimulationOptions, SimulationResult } from "./types"

export function simulateLegacyReturnCurrent(
  options: SimulationOptions,
): SimulationResult {
  const solver = new ReturnCurrentSolver(options)
  solver.solve()
  return solver.getOutput()
}

import { simulateMultilayerReturnCurrent } from "./simulate-multilayer-return-current"
import type {
  MultilayerSimulationOptions,
  MultilayerSimulationResult,
} from "./multilayer-types"

export function simulateReturnCurrent(
  options: MultilayerSimulationOptions,
): MultilayerSimulationResult
export function simulateReturnCurrent(
  options: SimulationOptions,
): SimulationResult
export function simulateReturnCurrent(
  options: SimulationOptions | MultilayerSimulationOptions,
): SimulationResult | MultilayerSimulationResult {
  return "stackup" in options
    ? simulateMultilayerReturnCurrent(options)
    : simulateLegacyReturnCurrent(options)
}
