import * as React from "react"
import { PcbPane } from "./PcbPane"
import type { Channel, DemoDefaults, Observation, RunState } from "./types"

type View = "eye" | "waveform" | "spectrum"
type CompletedRun = { run: RunState; source: string }

const stageLabels: Record<RunState["stage"], string> = {
  authoring: "Authoring the board",
  solving: "Running the solver",
  validating: "Checking the numerical results",
  rendering: "Rendering the result plots",
}

async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(path, options)
  const text = await response.text()
  let data: unknown
  try {
    data = JSON.parse(text)
  } catch {
    throw new Error(`The server returned an invalid response (${response.status})`)
  }
  if (!response.ok) {
    const error = data && typeof data === "object" && "error" in data ? data.error : undefined
    throw new Error(typeof error === "string" ? error : `Request failed (${response.status})`)
  }
  return data as T
}

function isRunning(run: RunState | null) {
  return run?.status === "queued" || run?.status === "running"
}

function defaultObservation(channel?: Channel): Observation | undefined {
  return channel?.observations.find((o) => o.position === "load" && o.quantity === "voltage")
    ?? channel?.observations[0]
}

function describeRun(run: RunState) {
  if (run.status === "queued") return "Queued"
  if (run.status === "running") return stageLabels[run.stage]
  if (run.status === "cancelled") return "Simulation cancelled"
  if (run.status === "failed") return "Simulation failed"
  return "Simulation complete"
}

export function App() {
  const [defaults, setDefaults] = React.useState<DemoDefaults | null>(null)
  const [source, setSource] = React.useState("")
  const [run, setRun] = React.useState<RunState | null>(null)
  const [completed, setCompleted] = React.useState<CompletedRun | null>(null)
  const [selectedTraceIds, setSelectedTraceIds] = React.useState<string[]>([])
  const [observationName, setObservationName] = React.useState("")
  const [view, setView] = React.useState<View>("eye")
  const [requestError, setRequestError] = React.useState<string | null>(null)
  const [posting, setPosting] = React.useState(false)
  const [cancelling, setCancelling] = React.useState(false)
  const submitted = React.useRef<{ id: string; source: string } | null>(null)

  React.useEffect(() => {
    const controller = new AbortController()
    api<DemoDefaults>("/api/defaults", { signal: controller.signal })
      .then((value) => {
        if (controller.signal.aborted) return
        setDefaults(value)
        setSource(value.source)
        const victim = value.channels.find((channel) => channel.role === "victim") ?? value.channels[0]
        setSelectedTraceIds(victim?.pcbTraceIds ?? [])
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted) setRequestError(error instanceof Error ? error.message : String(error))
      })
    return () => controller.abort()
  }, [])

  React.useEffect(() => {
    if (!run || !isRunning(run)) return
    const controller = new AbortController()
    let timer: ReturnType<typeof setTimeout> | undefined
    const id = run.id
    async function poll() {
      try {
        const next = await api<RunState>(`/api/runs/${encodeURIComponent(id)}`, { signal: controller.signal })
        if (controller.signal.aborted) return
        setRun(next)
        setRequestError(null)
        if (next.status === "completed" && !next.artifacts) {
          setRequestError("The run completed without numerical result assets.")
        }
        if (next.status === "completed" && next.artifacts) {
          setCompleted({ run: next, source: submitted.current?.id === id ? submitted.current.source : "" })
          setSelectedTraceIds((selected) => {
            const channels = next.artifacts!.channels
            const valid = selected.filter((traceId) => channels.some((channel) => channel.pcbTraceIds.includes(traceId)))
            return valid.length ? valid : (channels.find((channel) => channel.role === "victim") ?? channels[0])?.pcbTraceIds ?? []
          })
        }
        if (!isRunning(next)) setCancelling(false)
        else timer = setTimeout(poll, 900)
      } catch (error: unknown) {
        if (controller.signal.aborted) return
        setRequestError(error instanceof Error ? error.message : String(error))
        timer = setTimeout(poll, 1500)
      }
    }
    timer = setTimeout(poll, 100)
    return () => {
      controller.abort()
      if (timer !== undefined) clearTimeout(timer)
    }
  }, [run?.id, run?.status])

  async function startRun() {
    if (!defaults || posting || isRunning(run)) return
    const submittedSource = source
    setPosting(true)
    setRequestError(null)
    try {
      const { id } = await api<{ id: string }>("/api/runs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: submittedSource, settings: defaults.settings, stackup: defaults.stackup }),
      })
      submitted.current = { id, source: submittedSource }
      setRun({ id, status: "queued", stage: "authoring", elapsedMs: 0, logs: [] })
      setCancelling(false)
    } catch (error: unknown) {
      setRequestError(error instanceof Error ? error.message : String(error))
    } finally {
      setPosting(false)
    }
  }

  async function cancelRun() {
    if (!run || !isRunning(run) || cancelling) return
    setCancelling(true)
    try {
      await api<unknown>(`/api/runs/${encodeURIComponent(run.id)}/cancel`, { method: "POST" })
    } catch (error: unknown) {
      setCancelling(false)
      setRequestError(error instanceof Error ? error.message : String(error))
    }
  }

  if (!defaults) {
    return <main className="app"><div className="loading-screen">
      {requestError
        ? <div className="error"><strong>Could not load the example</strong><pre>{requestError}</pre></div>
        : <><span className="spinner" /><span>Loading the authored PCB example…</span></>}
    </div></main>
  }

  const artifacts = completed?.run.artifacts
  const channels = artifacts?.channels ?? defaults.channels
  const selectedChannel = selectedTraceIds.map((id) => channels.find((channel) => channel.pcbTraceIds.includes(id))).find(Boolean)
  const observation = selectedChannel?.observations.find((o) => o.name === observationName) ?? defaultObservation(selectedChannel)
  const plot = observation?.plots[view]
  const busy = posting || isRunning(run)
  const stale = Boolean(completed && completed.source !== source)
  const boardStale = source !== (completed?.source ?? defaults.source)
  const failure = requestError ?? (run?.status === "failed" ? run.error ?? "The simulation failed. Inspect the run log for details." : null)
  const stateClass = busy ? "running" : failure ? "failed" : run?.status === "cancelled" ? "" : boardStale ? "stale" : artifacts ? "completed" : ""
  const stateLabel = busy ? "Simulation running" : failure ? "Run needs attention" : run?.status === "cancelled" ? "Run cancelled" : boardStale ? "Source changed" : artifacts ? "Simulation complete" : "Ready to run"
  const eyeMetrics = observation?.eyeMetrics
  const endpointLabel = observation?.position === "load" ? "Receiver" : "Source endpoint"

  return <main className="app">
    <header className="app-header">
      <div>
        <p className="eyebrow">Interactive PCB simulation</p>
        <h1>PCB crosstalk lab</h1>
        <p className="subtitle">Edit the circuit. Run the simulation. Inspect the receiver eye.</p>
      </div>
      <div className={`status ${stateClass}`} role="status" aria-live="polite">{stateLabel}</div>
    </header>

    {failure && <div className="error" role="alert"><strong>Simulation could not complete</strong><pre>{failure}</pre></div>}

    <section className="workspace" aria-label="PCB and circuit source">
      <div className="left-column">
      <div className="panel">
        <div className="panel-header">
          <div><h2>Physical PCB</h2><p className="panel-meta">{selectedChannel ? selectedChannel.role === "victim" ? "Victim receiver" : "Aggressor trace" : "Select a signal trace"}</p></div>
          <span className="panel-meta">Official PCB viewer</span>
        </div>
        {boardStale && !completed && <div className="stale-notice">Original example — run your edited source to update the PCB view.</div>}
        <div className="viewer-shell">
          <PcbPane circuitJson={artifacts?.inputCircuitJson ?? defaults.circuitJson}
            selectedTraceIds={selectedTraceIds} onSelectedTraceIdsChange={setSelectedTraceIds} />
        </div>
        <div className="trace-picker" aria-label="Signal trace selection">
          {channels.map((channel) => <button key={channel.name} type="button" className="trace-button"
            aria-pressed={selectedChannel?.name === channel.name} onClick={() => setSelectedTraceIds(channel.pcbTraceIds)}>
            {channel.name}
          </button>)}
          <span className="trace-hint">Select a trace to inspect its endpoint results</span>
        </div>
      </div>


    <section className="panel results-panel" aria-label="Selected trace results">
      <div className="panel-header">
        <div className="results-heading"><h2>{selectedChannel ? `${selectedChannel.name} results` : "Simulation results"}</h2>
          {artifacts && <span className={`status ${stale ? "stale" : "completed"}`}>{stale ? "Previous source" : "Completed run"}</span>}
        </div>
        {artifacts && <div className="result-links">
          <a href={artifacts.resultUrl} target="_blank" rel="noreferrer">Result JSON ↗</a>
          {artifacts.manifestUrl && <a href={artifacts.manifestUrl} target="_blank" rel="noreferrer">Validation manifest ↗</a>}
        </div>}
      </div>
      {stale && <div className="stale-notice">Source changed — these plots and the PCB view belong to the previous completed run. Run again to update them.</div>}
      {artifacts && selectedChannel && <div className="results-toolbar">
        <div className="tabs" role="tablist" aria-label="Result view">
          {(["eye", "waveform", "spectrum"] as const).map((value) => <button key={value} type="button" className="tab"
            role="tab" aria-selected={view === value} aria-controls="selected-plot" onClick={() => setView(value)}>
            {value === "eye" ? "Eye diagram" : value === "waveform" ? "Waveform" : "Spectrum"}
          </button>)}
        </div>
        <select className="observation-select" aria-label="Endpoint observation" value={observation?.name ?? ""}
          onChange={(event) => setObservationName(event.target.value)}>
          {selectedChannel.observations.map((o) => <option key={o.name} value={o.name}>{o.label}</option>)}
        </select>
      </div>}
      <div id="selected-plot" role="tabpanel">
        {!artifacts
          ? <div className="empty"><h3>Your receiver eye will appear here</h3><p>Run the TSX above to compute fresh waveforms and an eye diagram. The default example drives the victim with PRBS data.</p></div>
          : !selectedChannel
            ? <div className="empty"><h3>Select a signal trace</h3><p>Choose the aggressor or victim trace in the PCB view to inspect its actual endpoint results.</p></div>
            : plot
              ? <figure className="plot"><img src={plot.svg} alt={`${selectedChannel.name} ${observation?.label} ${view}`} />
                <figcaption><span>{endpointLabel} · {observation?.name}{view === "eye" && eyeMetrics ? ` · ${eyeMetrics.timingLabel}` : ""}</span>
                  <span><a href={plot.svg} target="_blank" rel="noreferrer">Open SVG ↗</a> · <a href={plot.png} target="_blank" rel="noreferrer">Open PNG ↗</a></span>
                </figcaption>
              </figure>
              : <div className="empty"><h3>{view === "eye" ? "No eye diagram for this observation" : "No plot for this observation"}</h3>
                <p>{view === "eye" ? observation?.eyeUnavailableReason ?? "This experiment did not request an eye for the selected endpoint." : "The completed run did not produce this plot."}</p>
              </div>}
      </div>
      {artifacts && <div className="metrics">
        <div className="metric"><span>{stale ? "Previous numerical checks" : "Numerical checks"}</span><strong>{artifacts.validation.passed}/{artifacts.validation.total}</strong></div>
        <div className="metric"><span>{stale ? "Previous run validation" : "Validation"}</span><strong>{artifacts.validation.status}</strong></div>
        {view === "eye" && eyeMetrics && <>
          <div className="metric"><span>Crossing σ</span><strong>{eyeMetrics.jitterStdDevPs.toFixed(3)} ps</strong></div>
          {eyeMetrics.baselineJitterStdDevPs !== undefined && <div className="metric"><span>Quiet-aggressor σ</span><strong>{eyeMetrics.baselineJitterStdDevPs.toFixed(3)} ps</strong></div>}
          <div className="metric"><span>Eye windows / crossings</span><strong>{eyeMetrics.windows} / {eyeMetrics.crossings}</strong></div>
        </>}
        {artifacts.capture && <div className="metric"><span>Capture / sample interval</span><strong>{(artifacts.capture.durationS * 1e9).toFixed(0)} ns / {(artifacts.capture.sampleIntervalS * 1e12).toFixed(1)} ps</strong></div>}
      </div>}
    </section>
      </div>
      <div className="panel editor-panel">
        <div className="panel-header">
          <div><h2>Circuit TSX</h2><p className="panel-meta">This exact source is submitted to the authoring process</p></div>
          <button type="button" className="text-button" onClick={() => setSource(defaults.source)}>Reset example</button>
        </div>
        <textarea className="source-editor" aria-label="Circuit TSX source" spellCheck={false} wrap="off"
          autoCapitalize="off" autoCorrect="off" value={source} onChange={(event) => setSource(event.target.value)} />
        <div className="editor-actions">
          <span className="editor-caption">{boardStale ? "Source changed · run again to update results" : "Change a load, source seed or eye timing"}</span>
          <button type="button" className="run-button" onClick={startRun} disabled={busy || !source.trim()}>
            {posting ? "Submitting…" : isRunning(run) ? "Simulation running…" : "Run simulation"}
          </button>
        </div>
        {run && <div className="progress" role="status" aria-live="polite">
          {busy && <span className="spinner" />}
          <span>{cancelling ? "Cancellation requested" : describeRun(run)} · {(run.elapsedMs / 1000).toFixed(1)} s</span>
          {isRunning(run) && <button type="button" className="text-button" onClick={cancelRun} disabled={cancelling} style={{ marginLeft: "auto" }}>
            {cancelling ? "Stopping…" : "Cancel"}
          </button>}
        </div>}
      </div>
    </section>

    <details className="model-details"><summary>Model, fabrication settings and run details</summary>
      <p>Two straight parallel traces over ideal continuous ground. Colors mark selected channels, not a spatial voltage field. The receiver eye folds the computed endpoint waveform; an authored symbol clock is a nominal reference. Numerical checks apply to this model and capture.</p>
      <p>Fabrication properties and numerical settings are supplied separately from the compact simulation TSX.</p>
      <details><summary>Fabrication stackup</summary><pre>{JSON.stringify(defaults.stackup, null, 2)}</pre></details>
      <details><summary>Solver settings</summary><pre>{JSON.stringify(defaults.settings, null, 2)}</pre></details>
      {completed && <p>Completed run: <code>{completed.run.id}</code>{artifacts?.inputHash ? <> · input hash: <code>{artifacts.inputHash}</code></> : null}</p>}
      {run?.logs.length ? <details><summary>Actual run log</summary><pre>{run.logs.slice(-80).join("\n")}</pre></details> : null}
    </details>
  </main>
}
