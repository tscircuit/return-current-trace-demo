import json,xml.etree.ElementTree as ET
from pathlib import Path
root=Path(__file__).resolve().parents[2];c=json.load(open(root/'data/board.circuit.json'));st={e['source_trace_id']:e for e in c if e['type']=='source_trace'};ns='http://www.w3.org/2000/svg';ET.register_namespace('',ns);svg=ET.Element('{'+ns+'}svg',{'viewBox':'-52 -42 104 84','role':'img','aria-label':'Latest AM3352 PCB, selected DDR_D8 trace in cyan and two EM crop locations in amber'})
def add(name,attrs):return ET.SubElement(svg,'{'+ns+'}'+name,{k:str(v) for k,v in attrs.items()})
add('rect',{'x':-52,'y':-42,'width':104,'height':84,'fill':'#08211d'});add('rect',{'x':-50,'y':-40,'width':100,'height':80,'fill':'none','stroke':'#96b4a6','stroke-width':.15})
selected=[]
for e in c:
 if e['type']=='pcb_trace':
  d='';previous=None
  for p in e['route']:
   if p['route_type']!='wire':previous=None;continue
   d+=(' L' if previous==p['layer'] else ' M')+f"{p['x']:.4f},{-p['y']:.4f}";previous=p['layer']
  if st.get(e.get('source_trace_id'),{}).get('name')=='DDR_D8':selected.append(d)
  else:add('path',{'d':d,'stroke':'#74968b','stroke-width':.05,'opacity':.4,'fill':'none'})
 elif e['type']=='pcb_smtpad':
  if e['shape']=='circle':add('circle',{'cx':e['x'],'cy':-e['y'],'r':e['radius'],'fill':'#96b4a6','opacity':.25})
  elif e['shape']=='rect':add('rect',{'x':e['x']-e['width']/2,'y':-e['y']-e['height']/2,'width':e['width'],'height':e['height'],'fill':'#96b4a6','opacity':.25})
for d in selected:add('path',{'d':d,'stroke':'#20efff','stroke-width':.2,'fill':'none'})
for name in ['cpu','memory']:
 case=json.load(open(root/f'data/em-latest-ddr-d8-{name}/case-input.json'));x0,y0,x1,y1=case['bounds_mm'];add('rect',{'x':x0,'y':-y1,'width':x1-x0,'height':y1-y0,'stroke':'#ffd16c','stroke-width':.2,'fill':'none'});q=add('text',{'x':x1+1,'y':-(y0+y1)/2,'fill':'#ffd16c','font-family':'system-ui','font-size':1.4});q.text='CPU transition' if name=='cpu' else 'Memory escape'
out=root/'public/em/latest/board-overview.svg';ET.ElementTree(svg).write(out,encoding='unicode');print(out)
