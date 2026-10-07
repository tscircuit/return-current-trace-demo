import json,math,html,io,base64,sys
from PIL import Image
from pathlib import Path
c=json.load(open('data/board.circuit.json'));catalog=json.load(open('data/experiment-manifest.json'))
for e in c:
 if 'center' in e: e.setdefault('x',e['center']['x']);e.setdefault('y',e['center']['y'])
st={e['source_trace_id']:e for e in c if e['type']=='source_trace'}
traces={st[e['source_trace_id']]['name']:e for e in c if e['type']=='pcb_trace' and st.get(e.get('source_trace_id'),{}).get('name','').startswith('DDR')}
ports={e['pcb_port_id']:e for e in c if e['type']=='pcb_port'}
sc={e['source_component_id']:e for e in c if e['type']=='source_component'}
out=Path('public/pcb');out.mkdir(exist_ok=True)
def n(v):return f'{v:.4f}'.rstrip('0').rstrip('.') or '0'
def path(points):return ' '.join(('M' if i==0 else 'L')+n(p['x'])+','+n(-p['y']) for i,p in enumerate(points))
def circle(x,y,r,attrs=''):return f'<circle cx="{n(x)}" cy="{n(-y)}" r="{n(r)}" {attrs}/>'
# Render board geometry into a visual asset; do not publish the original circuit JSON.
bg=['<rect x="-50" y="-40" width="100" height="80" rx=".7" fill="#14332e" stroke="#608d76" stroke-width=".25"/>']
for e in c:
 if e['type']=='pcb_component' and e.get('layer')=='top' and not e.get('do_not_place'):
  p=e['center'];w=e['width'];h=e['height']
  bg.append(f'<rect x="{n(p["x"]-w/2)}" y="{n(-p["y"]-h/2)}" width="{n(w)}" height="{n(h)}" fill="#112821" fill-opacity=".55" stroke="#89a59b" stroke-opacity=".5" stroke-width=".08"/>')
for e in c:
 if e['type']=='pcb_trace':
  points=e.get('route',[])
  if points:bg.append(f'<path d="{path(points)}" fill="none" stroke="#8ba59b" stroke-opacity=".22" stroke-width=".07"/>')
for e in c:
 if e['type']=='pcb_smtpad' and e.get('layer')=='top':
  if e.get('shape')=='polygon':bg.append(f'<path d="{path(e["points"])} Z" fill="#b9b48a" fill-opacity=".65"/>')
  elif e.get('shape')=='circle':bg.append(circle(e['x'],e['y'],e['radius'],'fill="#b9b48a" fill-opacity=".65"'))
  else:
   w=e.get('width',.3);h=e.get('height',.3);bg.append(f'<rect x="{n(e["x"]-w/2)}" y="{n(-e["y"]-h/2)}" width="{n(w)}" height="{n(h)}" fill="#b9b48a" fill-opacity=".65"/>')
 elif e['type']=='pcb_via':bg.append(circle(e['x'],e['y'],e.get('hole_diameter',.15)/2,'fill="#071f1a" stroke="#75998a" stroke-width=".05"'))
 elif e['type']=='pcb_hole':bg.append(circle(e['x'],e['y'],e.get('hole_diameter',e.get('diameter',1))/2,'fill="#f0f4f8"'))
for x,y,label in []:
 bg.append(f'<text x="{x}" y="{-y}" text-anchor="middle" font-family="Arial" font-size="1.05" font-weight="bold" fill="#d9eee1" stroke="#14332e" stroke-width=".15" paint-order="stroke">{label}</text>')
(out/'board.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="-52 -42 104 84">'+''.join(bg)+'</svg>')
base='<image opacity=".36" href="/pcb/board.svg" x="-52" y="-42" width="104" height="84"/>'
def label(p,text,dx=.65,dy=-.65,color='white'):
 return f'<text data-label-x="{n(p["x"])}" data-label-y="{n(-p["y"])}" data-offset-x="{round(dx*18)}" data-offset-y="{round(dy*18)}" x="{n(p["x"]+dx)}" y="{n(-p["y"]+dy)}" font-family="Arial" font-size=".65" font-weight="bold" fill="{color}" stroke="#08211d" stroke-width=".18" paint-order="stroke">{html.escape(text)}</text>'
index=[]
shard=int(sys.argv[1]) if len(sys.argv)>1 else 0
shards=int(sys.argv[2]) if len(sys.argv)>2 else 1
for entry_index,e in enumerate(catalog):
 if entry_index%shards!=shard:continue
 if any(not Path(f'results/{e["name"]}-{case}.json').exists() for case in range(2)):continue
 t=traces[e['name']];sv=[p for p in t['route'] if p['route_type']=='via'];ends=[t['route'][0],t['route'][-1]]
 record={'name':e['name'],'views':[]}
 cache=Path(f'results/render-cache/{e["name"]}.json')
 cache.parent.mkdir(exist_ok=True)
 if cache.exists():
  index.append(json.load(open(cache)));continue
 for case in range(2):
  r=json.load(open(f'results/{e["name"]}-{case}.json'))
  layers=[]
  for layer in ['top','inner1','inner2','bottom']:
   pieces=[f'<g data-heat-layer="{layer}">']
   if layer=='bottom':
    # Clip the heatmap to the actual exported GND pour, including voids.
    regions=r['groundRegions'][layer];pours=[]
    for region in regions:pours.append(f'<path d="{path(region["outer"])} Z '+ ' '.join(path(h)+' Z' for h in region['holes'])+'" clip-rule="evenodd"/>')
    pieces.append('<defs><clipPath id="copper">'+''.join(pours)+'</clipPath></defs><g clip-path="url(#copper)">')
    width=round((r['bounds']['maxX']-r['bounds']['minX'])/r['cellWidth']);height=round((r['bounds']['maxY']-r['bounds']['minY'])/r['cellHeight'])
    density=Image.new('F',(width,height),0)
    for p in r['nodes']:
     if p['layer']!=layer or p['kind']!='plane':continue
     col=round((p['x']-r['bounds']['minX'])/r['cellWidth']-.5);row=round((r['bounds']['maxY']-p['y'])/r['cellHeight']-.5)
     if 0<=col<width and 0<=row<height:density.putpixel((col,row),p['currentDensity'])
    # Bilinear interpolation is display-only; the solve itself uses 0.25 mm cells.
    density=density.resize((width*6,height*6),Image.Resampling.BILINEAR);rgba=Image.new('RGBA',density.size)
    pixels=[]
    for value in density.getdata():
     v=min(1,max(0,value/.15));v=v**.7
     pixels.append((255,round(220*(1-v)),round(85*(1-v)),round(230*min(1,v*1.8))))
    rgba.putdata(pixels);buffer=io.BytesIO();rgba.save(buffer,format='PNG');encoded=base64.b64encode(buffer.getvalue()).decode()
    pieces.append(f'<image data-density-raster="true" href="data:image/png;base64,{encoded}" x="{n(r["bounds"]["minX"])}" y="{n(-r["bounds"]["maxY"])}" width="{n(width*r["cellWidth"])}" height="{n(height*r["cellHeight"])}"/>')
    pieces.append('</g>')
    # Vector arrows are sampled from the solved sheet-current direction.
    for p in r['nodes']:
     if p['layer']!=layer or p['kind']!='plane' or p['currentDensity']<.012:continue
     if round((p['x']-r['bounds']['minX'])/r['cellWidth']-.5)%2 or round((p['y']-r['bounds']['minY'])/r['cellHeight']-.5)%2:continue
     x,y=p['sheetCurrentX'],p['sheetCurrentY'];length=math.hypot(x,y)
     if not length:continue
     dx,dy=x/length*.45,-y/length*.45
     angle=math.degrees(math.atan2(-y,x))
     pieces.append(f'<g data-vector-x="{n(p["x"])}" data-vector-y="{n(-p["y"])}" data-vector-angle="{n(angle)}" data-vector-density="{n(p["currentDensity"])}"><path d="M-6 0L6 0M2 -3L6 0L2 3" stroke="#fff4d2" stroke-width="1.3" fill="none"/></g>')

   for edge in r['edges']:
    if edge['kind']!='trace' or abs(edge['current'])<1e-7:continue
    a,b=r['nodes'][edge['startNode']],r['nodes'][edge['endNode']]
    if a['layer']==layer:pieces.append(f'<path d="{path([a,b])}" fill="none" stroke="#ffad32" stroke-width="3" vector-effect="non-scaling-stroke"/>')
   via_values={}
   for edge in r['edges']:
    if edge['kind']!='via':continue
    a,b=r['nodes'][edge['startNode']],r['nodes'][edge['endNode']]
    if layer not in [a['layer'],b['layer']]:continue
    if abs(edge['current'])>via_values.get(edge['pcbViaId'],(0,None))[0]:via_values[edge['pcbViaId']]=(abs(edge['current']),a)
   for current,p in via_values.values():
    if current>1e-6:pieces.append(circle(p['x'],p['y'],.2+.1*min(1,current/.01),'fill="#ffb334" stroke="#fff0c9" stroke-width=".09"'))
   pieces.append('</g>');layers+=pieces
  selected=[label({'x':0,'y':2},'U1 · Processor',dx=0,dy=0,color='#d4e4dc'),label({'x':-10,'y':-33},'U3 · DDR memory',dx=0,dy=0,color='#d4e4dc')]
  for segment in r['signalSegments']:
   selected.append(f'<path d="{path([segment["start"],segment["end"]])}" fill="none" stroke="#052723" stroke-width="5" vector-effect="non-scaling-stroke"/><path d="{path([segment["start"],segment["end"]])}" fill="none" stroke="#20efff" stroke-width="2.5" vector-effect="non-scaling-stroke"/>')
  crops=[]
  for i,p in enumerate(ends):
   v=sv[i];g=ports[e['cases'][case]['endpoints'][i]['contact']]
   candidates=[edge for edge in r['edges'] if edge['kind']=='via' and r['nodes'][edge['startNode']]['layer']=='top' and (edge['current']< -1e-7 if i==0 else edge['current']>1e-7)]
   strongest=max(candidates,key=lambda q:abs(q['current']));rv=r['nodes'][strongest['startNode']]
   gap=math.hypot(rv['x']-v['x'],rv['y']-v['y'])
   selected +=[circle(p['x'],p['y'],.28,'fill="#20efff" stroke="white" stroke-width=".08"'),circle(v['x'],v['y'],.28,'fill="#08302a" stroke="#20efff" stroke-width=".12"'),circle(rv['x'],rv['y'],.35,'fill="#ffb334" stroke="white" stroke-width=".1"'),label(p,'Signal pad',dy=.85,color='#5df5ff'),label(v,'Signal via',color='#5df5ff'),label(rv,'Return via',color='#ffd17b'),circle(g['x'],g['y'],.22,'fill="#d2a9ff" stroke="white" stroke-width=".08"'),label(g,'Assumed GND pin',dx=-3,dy=1.2,color='#e0c8ff')]
   mid={'x':(v['x']+rv['x'])/2,'y':(v['y']+rv['y'])/2}
   selected.append(f'<path d="{path([v,rv])}" stroke="#fff6db" stroke-width="1" vector-effect="non-scaling-stroke" stroke-dasharray="5 4" fill="none"/>'+label(mid,f'{gap:.2f} mm separation',dx=-1,dy=-.35,color='#fff6db'))
   ps=[p,v,g,rv];minx=min(p['x'] for p in ps)-2.2;maxx=max(p['x'] for p in ps)+2.2;miny=min(-p['y'] for p in ps)-2.2;maxy=max(-p['y'] for p in ps)+2.2
   crops.append([minx,miny,maxx-minx,maxy-miny])
  svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="-24 -10 36 50" role="img" aria-label="PCB with highlighted '+html.escape(e['name'])+' and simulated return current"><defs><marker id="return-arrow" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L6 3L0 6Z" fill="#ffe1a0"/></marker></defs>'+base+''.join(layers)+''.join(selected)+'</svg>'
  svg=svg.replace('<svg ',f'<svg data-contact-case="{case}" data-mesh-pitch="0.25" ',1)
  filename=f'{e["name"]}-{case}.svg';(out/filename).write_text(svg);record['views'].append({'image':'/pcb/'+filename,'cpu':crops[0],'memory':crops[1]})
 cache.write_text(json.dumps(record))
 index.append(record)
 print(e['name'],flush=True)
json.dump(index,open(Path(f'results/pcb-index-{shard}.json') if shards>1 else out/'index.json','w'))
