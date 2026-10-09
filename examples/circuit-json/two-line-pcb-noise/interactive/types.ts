import type { AnyCircuitElement } from "circuit-json"

export type PlotFiles = { svg: string; png: string }
export type EyeMetrics = {
  windows: number
  crossings: number
  jitterStdDevPs: number
  baselineJitterStdDevPs?: number
  timingLabel: string
}
export type Observation = {
  name: string
  label: string
  position: "source" | "load"
  quantity: "voltage" | "current"
  plots: { eye?: PlotFiles; waveform?: PlotFiles; spectrum?: PlotFiles }
  eyeMetrics?: EyeMetrics
  eyeUnavailableReason?: string
}
export type Channel = {
  name: string
  role: "aggressor" | "victim"
  pcbTraceIds: string[]
  observations: Observation[]
}
export type DemoDefaults = {
  source: string
  settings: Record<string, unknown>
  stackup: Record<string, unknown>
  circuitJson: AnyCircuitElement[]
  channels: Channel[]
}
export type RunArtifacts = {
  inputCircuitJson: AnyCircuitElement[]
  channels: Channel[]
  inputHash?: string
  resultUrl: string
  manifestUrl?: string
  validation: { status: string; passed: number; total: number }
  capture?: { durationS: number; sampleIntervalS: number }
}
export type RunState = {
  id: string
  status: "queued" | "running" | "completed" | "failed" | "cancelled"
  stage: "authoring" | "solving" | "validating" | "rendering"
  elapsedMs: number
  logs: string[]
  error?: string
  artifacts?: RunArtifacts
}
