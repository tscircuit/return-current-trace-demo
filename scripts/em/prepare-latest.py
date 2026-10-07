"""Extract isolated DDR_D8 transition cases directly from the pinned board JSON."""
import json,math,hashlib
from pathlib import Path
from shapely.geometry import Polygon,LineString,Point,box
from shapely.ops import unary_union
from shapely import wkt
ROOT=Path(__file__).resolve().parents[2];raw=(ROOT/'data/board.circuit.json').read_bytes();c=json.loads(raw)
st={e['source_trace_id']:e for e in c if e['type']=='source_trace'}
t=next(e for e in c if e['type']=='pcb_trace' and st.get(e.get('source_trace_id'),{}).get('name')=='DDR_D8')
gnet=next(e['source_net_id'] for e in c if e['type']=='source_net' and e.get('name')=='GND')
gst=[e for e in st.values() if gnet in e.get('connected_source_net_ids',[])]
gkeys={e.get('subcircuit_connectivity_map_key') for e in gst};gports={p for e in gst for p in e.get('connected_source_port_ids',[])}
ports={e['pcb_port_id']:e for e in c if e['type']=='pcb_port'}
layers=['top','inner1','inner2','bottom']
def pad(e):
 if e['shape']=='circle':return Point(e['x'],e['y']).buffer(e['radius'],quad_segs=4)
 if e['shape'] in ['rect','rotated_rect']:
  from shapely.affinity import rotate
  return rotate(box(e['x']-e['width']/2,e['y']-e['height']/2,e['x']+e['width']/2,e['y']+e['height']/2),e.get('ccw_rotation',e.get('rotation',0)),origin=(e['x'],e['y']))
 if e['shape']=='polygon':return Polygon([(p['x'],p['y']) for p in e['points']])
 raise ValueError(e['shape'])
pads={e['pcb_port_id']:(e,pad(e)) for e in c if e['type']=='pcb_smtpad' and e.get('pcb_port_id') and e['shape'] in ['circle','rect','rotated_rect','polygon']}
def clipped_run(region,index):
 route=t['route'];left=index;right=index
 while left>0 and region.covers(Point(route[left-1]['x'],route[left-1]['y'])):left-=1
 while right<len(route)-1 and region.covers(Point(route[right+1]['x'],route[right+1]['y'])):right+=1
 selected=route[max(0,left-1):min(len(route),right+2)]
 return selected
for name,bounds,index in [('cpu',(-4,-22,4,-15),next(i for i,p in enumerate(t['route']) if p['route_type']=='via')),('memory',(-1.5,-25.5,4.5,-21.5),max(i for i,p in enumerate(t['route']) if p['route_type']=='via'))]:
 region=box(*bounds);route=clipped_run(region,index)
 if name=='memory':route=route[::-1]
 ground={l:[] for l in layers};signal={l:[] for l in layers};segments=[]
 for a,b in zip(route,route[1:]):
  if a['route_type']!='wire' or b['route_type']!='wire' or a['layer']!=b['layer'] or (a['x'],a['y'])==(b['x'],b['y']):continue
  line=LineString([(a['x'],a['y']),(b['x'],b['y'])]).intersection(region)
  if line.is_empty or line.length<1e-9:continue
  if line.geom_type!='LineString':raise ValueError('Unexpected clipped route')
  signal[a['layer']].append(line.buffer(a.get('width',.1)/2,cap_style='flat',join_style='round'));segments.append({'layer':a['layer'],'xy':list(line.coords),'width':a.get('width',.1)})
 if not segments:raise ValueError('No selected signal')
 source=segments[0]['xy'][0];load=segments[-1]['xy'][-1];assert segments[0]['layer']=='top' and segments[-1]['layer']=='bottom'
 gvs=[e for e in c if e['type']=='pcb_via' and e.get('subcircuit_connectivity_map_key') in gkeys and region.covers(Point(e['x'],e['y']))]
 svs=[e for e in route if e['route_type']=='via' and region.covers(Point(e['x'],e['y']))]
 for e in c:
  if e['type']=='pcb_copper_pour' and e.get('source_net_id')==gnet:
   b=e['brep_shape'];ground[e['layer']].append(Polygon([(p['x'],p['y']) for p in b['outer_ring']['vertices']], [[(p['x'],p['y']) for p in h['vertices']] for h in b['inner_rings']]))
  elif e['type']=='pcb_trace' and (e.get('subcircuit_connectivity_map_key') in gkeys or e.get('source_trace_id') in {g['source_trace_id'] for g in gst}):
   for a,b in zip(e['route'],e['route'][1:]):
    if a['route_type']==b['route_type']=='wire' and a['layer']==b['layer']:ground[a['layer']].append(LineString([(a['x'],a['y']),(b['x'],b['y'])]).buffer(a.get('width',.1)/2))
 for e,p in pads.values():
  if ports[e['pcb_port_id']].get('source_port_id') in gports:ground[e['layer']].append(p)
 for e in gvs:
  for l in e['layers']:ground[l].append(Point(e['x'],e['y']).buffer(e['outer_diameter']/2,quad_segs=4))
 for e in svs:
  for l in [e['from_layer'],e['to_layer']]:signal[l].append(Point(e['x'],e['y']).buffer(e['via_diameter']/2,quad_segs=4))
 for e in route:
  for k in ['start_pcb_port_id','end_pcb_port_id']:
   if e.get(k) in pads:pe,p=pads[e[k]];signal[pe['layer']].append(p)
 drills=unary_union([Point(e['x'],e['y']).buffer(e.get('hole_diameter',e.get('via_hole_diameter',.15))/2,quad_segs=2) for e in [*gvs,*svs]])
 shapes={role:{l:unary_union(parts).intersection(region).difference(drills).buffer(0).simplify(.002,preserve_topology=True).wkt for l,parts in geoms.items() if parts and not unary_union(parts).intersection(region).is_empty} for role,geoms in [('ground',ground),('signal',signal)]}
 def vertical(point,segment,z1,z2):
  a,b=segment['xy'][0],segment['xy'][-1];dx=b[0]-a[0];dy=b[1]-a[1];n=math.hypot(dx,dy);px=-dy/n*.05;py=dx/n*.05;x,y=point
  return [[x-px,y-py,z1],[x+px,y+py,z1],[x+px,y+py,z2],[x-px,y-py,z2]]
 case={'display_ground_faces_mm':{'top':1.635,'inner1':1.4175,'inner2':.1825,'bottom':-.035},'via_sample_levels_mm':{'top':1.55,'inner1':1.45,'inner2':.25,'bottom':.05},'ground':shapes['ground'],'signal':shapes['signal'],'ground_vias':gvs,'signal_vias':svs,'frequency_ghz':.4,'finite_element_order':1,'mesh_size_min_mm':.10,'source_direction':[0,0,1],'source_port_wkt':'POLYGON EMPTY','load_direction':[0,0,-1],'load_points':vertical(load,segments[-1],0,.1825),'substrate_box':[bounds[0],bounds[1],0,bounds[2]-bounds[0],bounds[3]-bounds[1],1.6],'air_box':[bounds[0]-5,bounds[1]-5,-5,bounds[2]-bounds[0]+10,bounds[3]-bounds[1]+10,11.6],'bounds_mm':list(bounds),'trace_segments':segments,'source_xy':source,'load_xy':load,'linear_solver':{'Type':'SuperLU','KSPType':'GMRES','Tol':1e-8,'MaxIts':500,'PCMatShifted':False,'ComplexCoarseSolve':True,'MGSmoothIts':2}}
 if name=='memory':
  sp=ports[t['route'][-1]['end_pcb_port_id']];contacts=[p for p in ports.values() if p.get('source_port_id') in gports and p['pcb_component_id']==sp['pcb_component_id'] and p['pcb_port_id'] in pads];gp=min(contacts,key=lambda p:math.hypot(p['x']-sp['x'],p['y']-sp['y']));dx=sp['x']-gp['x'];dy=sp['y']-gp['y'];n=math.hypot(dx,dy)
  aperture=LineString([(sp['x'],sp['y']),(gp['x'],gp['y'])]).buffer(.05,cap_style='flat').difference(unary_union([wkt.loads(shapes[role]['top']) for role in ['ground','signal']]))
  assert aperture.geom_type=='Polygon';case['source_port_wkt']=aperture.wkt;case['source_direction']=[dx/n,dy/n,0];case['package_ground_xy']=[gp['x'],gp['y']]
 else:case['source_points']=vertical(source,segments[0],1.4175,1.6)
 folder=ROOT/f'data/em-latest-ddr-d8-{name}';folder.mkdir(exist_ok=True);(folder/'case-input.json').write_text(json.dumps(case,indent=2));(folder/'provenance.json').write_text(json.dumps({'board_snapshot_sha256':hashlib.sha256(raw).hexdigest(),'board_url':'https://tscircuit.com/astra/am3352-sbc#pcb','scope':f'Isolated DDR_D8 {name} transition, other signal/power copper omitted','fixture':'400 MHz, 1 V normalized; 50 ohm test ports. CPU input top trace cut to inner1 GND; memory input actual signal/GND pads; bottom cut load to inner2 GND. Crop fixtures are assumed.','via_spans':'GND top-to-inner1; signal top-to-bottom, as exported. No unexported stubs or GND connections to inner2 inferred. Fabrication spans unknown.', 'accuracy':'Provisional; local-density, crop and port-fixture convergence not established'},indent=2));print(name,'segments',len(segments),'GNDvias',len(gvs),'SIGvias',len(svs),'source',source,'load',load)
