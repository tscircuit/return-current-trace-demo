import { expect, test } from "bun:test"
import {
  simulateReturnCurrent,
  renderMultilayerReturnCurrentSvg,
} from "lib/index"
import type { MultilayerSimulationOptions } from "lib/index"
const stackup = [
  { name: "top", z: 0, copperThickness: 0.035 },
  { name: "inner1", z: 0.2, copperThickness: 0.035 },
  { name: "inner2", z: 1.4, copperThickness: 0.035 },
  { name: "bottom", z: 1.6, copperThickness: 0.035 },
] as const
function fixture(): MultilayerSimulationOptions {
  const wire = (x: number, y: number, layer: string) => ({
    route_type: "wire",
    x,
    y,
    layer,
    width: 0.1,
  })
  const via = (x: number, from_layer: string, to_layer: string) => ({
    route_type: "via",
    x,
    y: 0,
    from_layer,
    to_layer,
  })
  return {
    stackup,
    cellSize: 0.5,
    viaPlatingThickness: 0.025,
    circuitJson: [
      {
        type: "pcb_board",
        pcb_board_id: "b",
        center: { x: 0, y: 0 },
        width: 12,
        height: 8,
        thickness: 1.6,
        num_layers: 4,
      },
      {
        type: "pcb_copper_pour",
        pcb_copper_pour_id: "g",
        layer: "bottom",
        source_net_id: "gnd",
        shape: "rect",
        center: { x: 0, y: 0 },
        width: 12,
        height: 8,
      },
      ...[-4, 4].map((x, i) => ({
        type: "pcb_via",
        pcb_via_id: `v${i}`,
        x,
        y: 2,
        from_layer: "top",
        to_layer: "bottom",
        layers: ["top", "inner1", "inner2", "bottom"],
        source_net_id: "gnd",
        hole_diameter: 0.3,
        outer_diameter: 0.6,
      })),
      ...[-4, 4].map((x, i) => ({
        type: "pcb_trace",
        pcb_trace_id: `ground${i}`,
        source_net_id: "gnd",
        route: [wire(x, 1, "top"), wire(x, 2, "top")],
      })),
      {
        type: "pcb_trace",
        pcb_trace_id: "s",
        route: [
          wire(-4, 0, "top"),
          wire(-3, 0, "top"),
          via(-3, "top", "inner1"),
          wire(-3, 0, "inner1"),
          wire(0, 0, "inner1"),
          via(0, "inner1", "inner2"),
          wire(0, 0, "inner2"),
          wire(3, 0, "inner2"),
          via(3, "inner2", "top"),
          wire(3, 0, "top"),
          wire(4, 0, "top"),
        ],
      },
    ] as any,
    excitations: [
      {
        type: "simulation_return_current_excitation",
        simulation_return_current_excitation_id: "e",
        pcb_trace_id: "s",
        ground_source_net_id: "gnd",
        current: 1,
        return_source: { x: 4, y: 1, layer: "top" },
        return_sink: { x: -4, y: 1, layer: "top" },
      },
    ],
  }
}
test("four-layer return traverses real barrels and conserves 1A", () => {
  const r = simulateReturnCurrent(fixture())
  expect(r.diagnostics.maxConservationError).toBeLessThan(1e-7)
  expect(r.diagnostics.groundViaCount).toBe(2)
  expect(r.diagnostics.totalGroundViaEdgeCount).toBe(6)
  for (const e of r.edges.filter((e) => e.kind === "via" || e.kind === "trace"))
    expect(Math.abs(e.current)).toBeCloseTo(1, 6)
  expect(new Set(r.signalSegments.map((s) => s.layer))).toEqual(
    new Set(["top", "inner1", "inner2"]),
  )
  expect(r.signalVias).toHaveLength(3)
  expect(r.groundRegions.inner1).toHaveLength(0)
  expect(
    r.nodes.filter((n) => n.layer === "inner1" && n.kind === "plane"),
  ).toHaveLength(0)
  expect(renderMultilayerReturnCurrentSvg(r)).toContain(
    "No exported horizontal GND copper",
  )
})
test("a missing return via cannot become an inferred connection", () => {
  const o = fixture()
  o.circuitJson = o.circuitJson.filter((e: any) => e.pcb_via_id !== "v0")
  expect(() => simulateReturnCurrent(o)).toThrow("disconnected multilayer")
})
test("parallel reference layers share conserved current without duplicating excitation", () => {
  const o = fixture()
  o.circuitJson = [
    ...o.circuitJson,
    {
      type: "pcb_copper_pour",
      pcb_copper_pour_id: "g1",
      layer: "inner1",
      source_net_id: "gnd",
      shape: "rect",
      center: { x: 0, y: 0 },
      width: 12,
      height: 8,
    } as any,
  ]
  const r = simulateReturnCurrent(o)
  expect(r.diagnostics.maxConservationError).toBeLessThan(1e-7)
  expect(
    r.nodes.some(
      (n) => n.layer === "inner1" && n.kind === "plane" && n.currentDensity > 0,
    ),
  ).toBe(true)
  expect(
    r.nodes.some((n) => n.layer === "bottom" && n.currentDensity > 0),
  ).toBe(true)
  for (const id of ["v0", "v1"]) {
    const top = r.edges.find(
      (e) => e.pcbViaId === id && r.nodes[e.startNode].layer === "top",
    )!
    expect(Math.abs(top.current)).toBeCloseTo(1, 6)
  }
})
test("multilayer fields preserve signed linearity", () => {
  const o = fixture(),
    a = simulateReturnCurrent(o)
  const b = simulateReturnCurrent({
    ...o,
    excitations: o.excitations.map((e) => ({ ...e, current: -2 })),
  })
  for (let i = 0; i < a.edges.length; i++)
    expect(b.edges[i].current).toBeCloseTo(-2 * a.edges[i].current, 6)
})
test("stackup, plating and explicit signal transitions are validated", () => {
  const o = fixture()
  expect(() =>
    simulateReturnCurrent({
      ...o,
      stackup: stackup.map((s) => ({ ...s, z: 0 })),
    }),
  ).toThrow("ordered")
  expect(() =>
    simulateReturnCurrent({ ...o, viaPlatingThickness: undefined }),
  ).toThrow("plating thickness")
  const bad = structuredClone(o) as any
  bad.circuitJson.find((e: any) => e.pcb_trace_id === "s").route = [
    { route_type: "wire", x: -4, y: 0, width: 0.1, layer: "top" },
    { route_type: "wire", x: 4, y: 0, width: 0.1, layer: "inner1" },
  ]
  expect(() => simulateReturnCurrent(bad)).toThrow("explicit vias")
})

// The original image-plane field and projection must be recovered when there
// are no layer transfers and only one reference plane.
test("multilayer two-layer limit matches legacy conservative image current", () => {
  const original = fixture()
  const circuitJson = [
    {
      type: "pcb_board",
      pcb_board_id: "b",
      center: { x: 0, y: 0 },
      width: 12,
      height: 8,
      thickness: 1.6,
      num_layers: 2,
    },
    {
      type: "pcb_copper_pour",
      pcb_copper_pour_id: "g",
      layer: "bottom",
      source_net_id: "gnd",
      shape: "rect",
      center: { x: 0, y: 0 },
      width: 12,
      height: 8,
    },
    {
      type: "pcb_trace",
      pcb_trace_id: "s",
      route: [
        { route_type: "wire", x: -4, y: 0, width: 0.1, layer: "top" },
        { route_type: "wire", x: 4, y: 0, width: 0.1, layer: "top" },
      ],
    },
  ] as any
  const base = {
    ...original.excitations[0],
    return_source: { x: 4, y: 2, layer: "bottom" as const },
    return_sink: { x: -4, y: 2, layer: "bottom" as const },
  }
  const legacy = simulateReturnCurrent({
    circuitJson,
    cellSize: 0.5,
    contactRadius: 0.6,
    excitations: [base],
  })
  const multi = simulateReturnCurrent({
    circuitJson,
    cellSize: 0.5,
    contactRadius: 0.6,
    stackup: [stackup[0], stackup[3]],
    excitations: [base],
  })
  expect(multi.nodes.length).toBe(legacy.nodes.length)
  expect(multi.edges.length).toBe(legacy.edges.length)
  for (let i = 0; i < multi.edges.length; i++)
    expect(multi.edges[i].current).toBeCloseTo(legacy.edges[i].current, 6)
})
