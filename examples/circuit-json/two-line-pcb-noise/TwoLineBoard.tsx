/** @jsxImportSource react */
import * as React from "react"

/** Two straight 20 mm × 0.3 mm top traces, 0.3 mm edge gap. */
export function TwoLineBoard({ children }: { children?: React.ReactNode }) {
  return (
    <board width={24} height={5} layers={2} thickness={0.27} schematicDisabled>
      <net name="GND" />
      {[[-10, "A", -0.3], [10, "B", -0.3], [-10, "C", 0.3], [10, "D", 0.3]].map(
        ([x, name, y]) => (
          <chip
            key={name}
            name={name as string}
            pcbX={`${x}mm`}
            pcbY={`${y}mm`}
            pinLabels={{ pin1: "SIGNAL", pin2: "GND" }}
            footprint={
              <footprint>
                <smtpad portHints={["pin1"]} width={0.3} height={0.3} shape="rect" />
                <smtpad portHints={["pin2"]} pcbY={1} width={0.3} height={0.3} shape="rect" layer="bottom" />
              </footprint>
            }
          />
        ),
      )}
      {[["A", "B"], ["C", "D"]].map(([near, far]) => (
        <trace
          key={near}
          from={`.${near} > .SIGNAL`}
          to={`.${far} > .SIGNAL`}
          thickness={0.3}
          pcbPathRelativeTo={`.${near} > .SIGNAL`}
          pcbPath={[{ x: 0, y: 0 }, { x: 20, y: 0 }]}
        />
      ))}
      {["A", "B", "C", "D"].map((name) => (
        <trace key={name} from={`.${name} > .GND`} to="net.GND" />
      ))}
      <copperpour layer="bottom" connectsTo="net.GND" boardEdgeMargin={0} padMargin={0} traceMargin={0} />
      {children}
    </board>
  )
}
