import json,math,copy,sys,xml.etree.ElementTree as ET
from pathlib import Path
repo=Path(__file__).resolve().parents[2];folder=Path(sys.argv[1]);out=Path(sys.argv[2]);out.mkdir(exist_ok=True,parents=True)
data=json.load(open(folder/'surface-triangles.json'));via_data=json.load(open(folder/'via-currents.json'));r=json.load(open(folder/'normalized-report.json'))
ET.register_namespace('','http://www.w3.org/2000/svg');ns='{http://www.w3.org/2000/svg}'
base=ET.parse(repo/'public/pcb/DDR_D8-0.svg').getroot()
for e in list(base):
 if e.tag==ns+'image':e.set('opacity','.22');continue
 if e.tag==ns+'path' and e.get('stroke') in ['#052723','#20efff']:continue
 if e.tag==ns+'circle' and (e.get('fill')=='#20efff' or e.get('stroke')=='#20efff'):continue
 base.remove(e)
base.set('viewBox','-8.5 31.5 6 4.5')
base.set('aria-label','DDR_D8 memory escape, 400 MHz EM experiment')
base.attrib.pop('data-mesh-pitch',None)
defs=ET.SubElement(base,ns+'defs');clip=ET.SubElement(defs,ns+'clipPath',{'id':'roi'});ET.SubElement(clip,ns+'rect',{'x':'-8','y':'32','width':'5','height':'3.5'})
for e in list(base):
 if e.tag in [ns+'path',ns+'circle']:e.set('clip-path','url(#roi)')
ET.SubElement(base,ns+'rect',{'x':'-8','y':'32','width':'5','height':'3.5','fill':'none','stroke':'#ddebdc','stroke-width':'1','stroke-dasharray':'5 4','vector-effect':'non-scaling-stroke'})
ET.SubElement(base,ns+'circle',{'cx':'-3.85','cy':'32','r':'.15','fill':'#e0c8ff','stroke':'white','stroke-width':'1','vector-effect':'non-scaling-stroke'})
def color(v):
 t=max(0,min(1,(math.log10(max(v,.01))+2)/4));stops=[(12,42,72),(29,118,170),(61,208,182),(255,199,52),(255,77,35)];k=min(3,int(t*4));f=t*4-k;return '#'+''.join(f'{round(a*(1-f)+b*f):02x}' for a,b in zip(stops[k],stops[k+1]))
import numpy as np
for layer,items in data.items():
 root=copy.deepcopy(base);g=ET.Element(ns+'g',{'data-em-layer':layer});root.insert(1,g)
 for t in items:
  p=ET.SubElement(g,ns+'polygon',{'points':' '.join(f'{x:.5f},{y:.5f}' for x,y in t['xy']),'fill':color(t['density']),'opacity':'.9'});ET.SubElement(p,ns+'title').text=f"|K| = {t['density']:.5g} A/m (400 MHz, 1 V input)"
 cells={}
 for t in items:
  x,y=np.array(t['xy']).mean(axis=0);key=(int((x+5)/.75),int(y/.75));v=np.array(t['real_xy']);m=np.linalg.norm(v)
  if m>.05 and (key not in cells or t['density']>cells[key][3]):cells[key]=(x,y,v/m,t['density'])
 flow=ET.Element(ns+'g',{'data-flow':'true'});root.insert(2,flow)
 for x,y,d,_ in cells.values():
  px,py=-d[1],d[0];end=np.array([x,y])+.12*d;start=np.array([x,y])-.12*d;left=end-.09*d+.045*np.array([px,py]);right=end-.09*d-.045*np.array([px,py]);ET.SubElement(flow,ns+'path',{'d':f'M{start[0]:.5f},{start[1]:.5f} L{end[0]:.5f},{end[1]:.5f} M{left[0]:.5f},{left[1]:.5f} L{end[0]:.5f},{end[1]:.5f} L{right[0]:.5f},{right[1]:.5f}','fill':'none','stroke':'#fff6de','stroke-width':'1','vector-effect':'non-scaling-stroke','opacity':'.8'})
 vg=ET.SubElement(root,ns+'g',{'data-via-current':'true'})
 for v in via_data[layer]:
  t=min(1,v['magnitude_mA']/20);c='#'+''.join(f'{round(a*(1-t)+b*t):02x}' for a,b in zip((52,64,212),(252,119,199)));e=ET.SubElement(vg,ns+'circle',{'cx':str(v['x']),'cy':str(-v['y']),'r':'.14','fill':c,'stroke':'white','stroke-width':'1','vector-effect':'non-scaling-stroke'});ET.SubElement(e,ns+'title').text=f"GND via |I| = {v['magnitude_mA']:.4g} mA; sampled z={v['z_sample_mm']} mm"
 ET.ElementTree(root).write(out/f'{layer}.svg',encoding='unicode')
(out/'report.json').write_text(json.dumps(r,indent=2));(out/'palace.json').write_text((folder/r['config_file']).read_text());(out/'mesh-summary.json').write_text((folder/'mesh-summary.json').read_text())
print({k:len(v) for k,v in data.items()})

(out/'via-currents.json').write_text(json.dumps(via_data,indent=2))
