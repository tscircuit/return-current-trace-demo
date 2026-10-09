import { useMemo, useState } from "react"
import { PCBViewer, usePcbViewerController } from "@tscircuit/pcb-viewer"
import type {
  AnyCircuitElement, PcbNotePath, PcbNoteRect, PcbTrace, PcbTraceRoutePointWire,
  SimulationPcbNoiseConfiguration,
} from "circuit-json"

export type PcbPaneProps = {
  circuitJson: AnyCircuitElement[]
  selectedTraceIds: string[]
  onSelectedTraceIdsChange: (ids: string[]) => void
}

type Contact = SimulationPcbNoiseConfiguration["ports"][number]["signal_contact"]
type Bounds = { minX: number; minY: number; maxX: number; maxY: number }
const colors = { aggressor: "#ffb454", victim: "#5edbe5", other: "#c5b8ff" }
const wire = (point: PcbTrace["route"][number]): point is PcbTraceRoutePointWire => point.route_type === "wire"

function touches(trace: PcbTrace, contact: Contact) {
  return trace.route.some((point) => wire(point) && point.layer === contact.layer && (
    ("pcb_port_id" in contact && (point.start_pcb_port_id === contact.pcb_port_id || point.end_pcb_port_id === contact.pcb_port_id)) ||
    (Math.abs(point.x - contact.x) < 1e-8 && Math.abs(point.y - contact.y) < 1e-8)
  ))
}

function contactComponent(circuitJson: AnyCircuitElement[], contact?: Contact) {
  const physicalContact = contact && circuitJson.find((record) =>
    (record.type === "pcb_port" && "pcb_port_id" in contact && record.pcb_port_id === contact.pcb_port_id) ||
    (record.type === "pcb_smtpad" && "pcb_smtpad_id" in contact && record.pcb_smtpad_id === contact.pcb_smtpad_id),
  )
  const id = physicalContact && "pcb_component_id" in physicalContact ? physicalContact.pcb_component_id : undefined
  const component = circuitJson.find((record) => record.type === "pcb_component" && record.pcb_component_id === id)
  const source = component?.type === "pcb_component" && circuitJson.find((record) =>
    record.type === "source_component" && record.source_component_id === component.source_component_id,
  )
  return { id, name: source && "name" in source && typeof source.name === "string" ? source.name : undefined }
}

/** Segment/rectangle intersection in the exact board coordinates supplied by PCBViewer. */
function crossesBounds(a: PcbTraceRoutePointWire, b: PcbTraceRoutePointWire, bounds: Bounds) {
  const padding = Math.max(a.width, b.width) / 2
  let enter = 0, exit = 1
  for (const [origin, delta, lower, upper] of [
    [a.x, b.x - a.x, bounds.minX - padding, bounds.maxX + padding],
    [a.y, b.y - a.y, bounds.minY - padding, bounds.maxY + padding],
  ]) {
    if (delta === 0) {
      if (origin < lower || origin > upper) return false
    } else {
      const start = (lower - origin) / delta, end = (upper - origin) / delta
      enter = Math.max(enter, Math.min(start, end))
      exit = Math.min(exit, Math.max(start, end))
      if (enter > exit) return false
    }
  }
  return true
}

export function PcbPane({ circuitJson, selectedTraceIds, onSelectedTraceIdsChange }: PcbPaneProps) {
  const { controller, focusPcbComponent } = usePcbViewerController()
  const [renderedKey, setRenderedKey] = useState("")
  const traces = useMemo(() => {
    const configuration = circuitJson.find((record) => record.type === "simulation_pcb_noise_configuration")
    return circuitJson.filter((record): record is PcbTrace => record.type === "pcb_trace" && record.route.some((point) => wire(point) && point.layer === "top"))
      .map((trace) => {
        const source = configuration?.sources.find((source) => {
          const port = configuration.ports.find((port) => port.name === source.port_name)
          return port && touches(trace, port.signal_contact)
        })
        const receiver = configuration?.ports.find((port) =>
          port.name !== source?.port_name && touches(trace, port.signal_contact) &&
          configuration.terminations.some((load) => load.port_name === port.name),
        )
        const contact = receiver?.signal_contact
        const sourcePort = configuration?.ports.find((port) => port.name === source?.port_name)
        const near = contactComponent(circuitJson, sourcePort?.signal_contact)
        const far = contactComponent(circuitJson, contact)
        const role = source?.role === "aggressor" ? "aggressor" : source?.role === "victim" ? "victim" : "other"
        return { trace, role, color: colors[role], receiver: contact, componentId: far.id,
          label: role === "other" ? "Trace" : role[0].toUpperCase() + role.slice(1),
          sourceLabel: near.name ?? "Source", receiverLabel: far.name ?? "Receiver" }
      })
  }, [circuitJson])
  const viewerKey = useMemo(() => JSON.stringify(circuitJson), [circuitJson])
  const viewCircuitJson = useMemo(() => {
    // These notes exist only in this viewer. Physical records and solver inputs are never modified.
    const notes: (PcbNotePath | PcbNoteRect)[] = []
    for (const { trace, color, receiver } of traces) {
      const selected = selectedTraceIds.includes(trace.pcb_trace_id)
      for (let index = 1; index < trace.route.length; index++) {
        const a = trace.route[index - 1], b = trace.route[index]
        if (!wire(a) || !wire(b) || a.layer !== "top" || b.layer !== "top") continue
        if (selected) notes.push({ type: "pcb_note_path", pcb_note_path_id: `selection_${trace.pcb_trace_id}_${index}`,
          layer: "top", route: [{ x: a.x, y: a.y }, { x: b.x, y: b.y }], stroke_width: Math.max(a.width, b.width) + 0.12, color: "#ffffff" })
        notes.push({ type: "pcb_note_path", pcb_note_path_id: `channel_${trace.pcb_trace_id}_${index}_${selected}`,
          layer: "top", route: [{ x: a.x, y: a.y }, { x: b.x, y: b.y }], stroke_width: Math.min(a.width, b.width) * 0.7, color })
      }
      if (selected && receiver) notes.push({ type: "pcb_note_rect", pcb_note_rect_id: `receiver_${trace.pcb_trace_id}`,
        layer: "top", center: { x: receiver.x, y: receiver.y }, width: 0.5, height: 0.5,
        stroke_width: 0.07, color, is_filled: false })
    }
    return [...circuitJson, ...notes]
  }, [circuitJson, traces, selectedTraceIds])
  const selectBounds = (bounds: Bounds) => {
    const ids = traces.filter(({ trace }) => trace.route.some((point, index) => {
      const previous = trace.route[index - 1]
      return previous && wire(previous) && wire(point) && previous.layer === "top" && point.layer === "top" && crossesBounds(previous, point, bounds)
    })).map(({ trace }) => trace.pcb_trace_id)
    onSelectedTraceIdsChange(ids)
  }

  return <section className="pcb-pane" aria-label="Authored PCB and trace selection" data-testid="pcb-pane" data-viewer-rendered={renderedKey === viewerKey}>
    <div className="pcb-trace-selectors">
      {traces.map(({ trace, role, color, componentId, label, sourceLabel, receiverLabel }) => <div key={trace.pcb_trace_id} className="pcb-channel-control" data-trace-id={trace.pcb_trace_id}>
        <label className="pcb-trace-chip" data-selected={selectedTraceIds.includes(trace.pcb_trace_id)} data-role={role}>
          <input type="checkbox" aria-label={`Select ${label} trace from ${sourceLabel} to ${receiverLabel}`} checked={selectedTraceIds.includes(trace.pcb_trace_id)}
            onChange={(event) => onSelectedTraceIdsChange(event.target.checked
              ? [trace.pcb_trace_id, ...selectedTraceIds.filter((id) => id !== trace.pcb_trace_id)]
              : selectedTraceIds.filter((id) => id !== trace.pcb_trace_id))} />
          <span aria-hidden="true" className="pcb-channel-dot" style={{ backgroundColor: color }} />
          <span className="pcb-trace-name">{label}</span>
          <span className="pcb-trace-route">{sourceLabel} → {receiverLabel}</span>
        </label>
        {componentId && <button type="button" className="small-button" aria-label={`Focus ${role} receiver`} onClick={() => focusPcbComponent(componentId)}>Focus receiver</button>}
      </div>)}
    </div>
    <div style={{ borderRadius: 12, overflow: "hidden", minHeight: 320 }}>
      <PCBViewer key={viewerKey} circuitJson={viewCircuitJson} renderer="canvas" height={320} allowEditing={false}
        initialState={{ is_showing_pcb_notes: true, is_showing_solder_mask: false, is_showing_rats_nest: false }}
        controller={controller} onBoundsSelected={selectBounds} onRenderComplete={() => setRenderedKey(viewerKey)} />
    </div>
    <p className="muted">Colors identify channels; white outlines and receiver markers show selection. These are view-only annotations, not a noise heatmap. Use the viewer’s Bounds tool to click or box-select traces.</p>
  </section>
}
