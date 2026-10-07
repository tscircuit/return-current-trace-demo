"""Render the latest solved ROI over PCB geometry from the identical board snapshot."""
import json,sys,math,os,xml.etree.ElementTree as ET
from pathlib import Path
import numpy as np
os.environ.setdefault('MPLCONFIGDIR',str(Path.cwd()/'.em-mpl-cache'))
os.environ.setdefault('XDG_CACHE_HOME','/tmp/em-font-cache')
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.collections import PolyCollection,LineCollection
from matplotlib.colors import LogNorm,LinearSegmentedColormap
from shapely import wkt
ROOT=Path(__file__).resolve().parents[2];folder=Path(sys.argv[1]);out=Path(sys.argv[2]);out.mkdir(parents=True,exist_ok=True)
c=json.load(open(ROOT/'data/board.circuit.json'));case=json.load(open(folder/'case-input.json'));data=json.load(open(folder/'surface-triangles.json'));report=json.load(open(folder/'normalized-report.json'));vias=json.load(open(folder/'via-currents.json'));x0,y0,x1,y1=case['bounds_mm'];view=[x0-.5,-y1-.5,x1-x0+1,y1-y0+1]
freq=report['frequency_hz'];frequency_label=f'{freq/1e9:g} GHz' if freq>=1e9 else f'{freq/1e6:g} MHz'
ns='http://www.w3.org/2000/svg';ET.register_namespace('',ns)
def node(parent,name,attrs):return ET.SubElement(parent,'{'+ns+'}'+name,{k:str(v) for k,v in attrs.items()})
def path(xy):return 'M'+' L'.join(f'{x:.6f},{-y:.6f}' for x,y in xy)
def color(v):
 t=max(0,min(1,(math.log10(max(v,.01))+2)/4));s=[(12,42,72),(29,118,170),(61,208,182),(255,199,52),(255,77,35)];k=min(3,int(t*4));f=t*4-k;return '#'+''.join(f'{round(a*(1-f)+b*f):02x}' for a,b in zip(s[k],s[k+1]))
context=[];pads=[]
for e in c:
 if e['type']=='pcb_trace':
  for a,b in zip(e['route'],e['route'][1:]):
   if a['route_type']==b['route_type']=='wire' and a['layer']==b['layer'] and min(a['x'],b['x'])<=x1 and max(a['x'],b['x'])>=x0 and min(a['y'],b['y'])<=y1 and max(a['y'],b['y'])>=y0:context.append([(a['x'],-a['y']),(b['x'],-b['y'])])
 elif e['type']=='pcb_smtpad' and x0<=e.get('x',float('inf'))<=x1 and y0<=e.get('y',float('inf'))<=y1:pads.append(e)
cmap=LinearSegmentedColormap.from_list('sheet',['#0c2a48','#1d76aa','#3dd0b6','#ffc734','#ff4d23']);norm=LogNorm(.01,100,clip=True)
selected=[[(x,-y) for x,y in s['xy']] for s in case['trace_segments']]
marks=[[*case['source_xy'],'Input fixture'],[*case['load_xy'],'50 Ω load'],*[ [v['x'],v['y'],'Signal via: top ↔ bottom'] for v in case['signal_vias']]]
if case.get('package_ground_xy'):marks.append([*case['package_ground_xy'],'Assumed package GND'])
for layer,items in data.items():
 root=ET.Element('{'+ns+'}svg',{'viewBox':' '.join(map(str,view)),'role':'img','aria-label':f"{case.get('trace_name','DDR_D8')} {case.get('region_title',folder.name.split('-')[-1])} {layer}, {frequency_label}, latest PCB"})
 node(root,'rect',{'x':view[0],'y':view[1],'width':view[2],'height':view[3],'fill':'#08211d'})
 for xy in context:node(root,'path',{'d':'M'+' L'.join(f'{x},{y}' for x,y in xy),'fill':'none','stroke':'#a0bdb3','stroke-width':.025,'opacity':.22})
 for p in pads:
  if p['shape']=='circle':node(root,'circle',{'cx':p['x'],'cy':-p['y'],'r':p['radius'],'fill':'#a0bdb3','opacity':.22})
 for t in items:
  n=node(root,'polygon',{'points':' '.join(f'{x:.6f},{y:.6f}' for x,y in t['xy']),'fill':color(t['density'])});node(n,'title',{}).text=f"|K| {t['density']:.5g} A/m"
 for s in case['trace_segments']:node(root,'path',{'d':path(s['xy']),'stroke':'#20efff','stroke-width':2.2,'vector-effect':'non-scaling-stroke','fill':'none'})
 cells={}
 for t in items:
  x,y=np.array(t['xy']).mean(axis=0);key=(int((x-x0)/.45),int((y+y1)/.45));v=np.array(t['real_xy']);m=np.linalg.norm(v)
  if m>.01 and (key not in cells or t['density']>cells[key][3]):cells[key]=(x,y,v/m,t['density'])
 for x,y,d,_ in cells.values():
  start=np.array([x,y])-.10*d;end=np.array([x,y])+.10*d;p=np.array([-d[1],d[0]]);a=end-.07*d+.04*p;b=end-.07*d-.04*p
  node(root,'path',{'d':f'M{start[0]},{start[1]} L{end[0]},{end[1]} M{a[0]},{a[1]} L{end[0]},{end[1]} L{b[0]},{b[1]}','stroke':'#fff6de','stroke-width':1,'vector-effect':'non-scaling-stroke','fill':'none','opacity':.8,'data-flow':'true'})
 for v in case['signal_vias']:node(root,'circle',{'cx':v['x'],'cy':-v['y'],'r':.15,'fill':'#20efff','stroke':'white','stroke-width':1,'vector-effect':'non-scaling-stroke'})
 for v in [v for v in vias[layer] if v.get('barrel_present_at_sample',True)]:
  q=node(root,'circle',{'cx':v['x'],'cy':-v['y'],'r':.12,'fill':'#d996ff','stroke':'white','stroke-width':1,'vector-effect':'non-scaling-stroke'});node(q,'title',{}).text=f"GND barrel: {v['magnitude_mA']:.4g} mA at z={v['z_sample_mm']} mm"
 for x,y,label in marks:node(root,'circle',{'cx':x,'cy':-y,'r':.09,'fill':'white','stroke':'#e0c8ff','stroke-width':1,'vector-effect':'non-scaling-stroke'})
 ET.ElementTree(root).write(out/f'{layer}.svg',encoding='unicode')
 fig,ax=plt.subplots(figsize=(9,8),dpi=180);ax.set_facecolor('#08211d');ax.add_collection(LineCollection(context,colors='#a0bdb3',linewidths=.4,alpha=.22))
 for p in pads:
  if p['shape']=='circle':ax.add_patch(plt.Circle((p['x'],-p['y']),p['radius'],color='#a0bdb3',alpha=.22))
 if items:ax.add_collection(PolyCollection([t['xy'] for t in items],array=np.array([t['density'] for t in items]),cmap=cmap,norm=norm,edgecolors='none'))
 else:ax.text((x0+x1)/2,-(y0+y1)/2,'No horizontal GND face in this crop',color='white',ha='center',fontsize=10)
 ax.add_collection(LineCollection(selected,colors='#20efff',linewidths=2))
 for x,y,d,_ in cells.values():ax.arrow(x-.10*d[0],y-.10*d[1],.20*d[0],.20*d[1],width=.005,head_width=.08,head_length=.07,length_includes_head=True,color='#fff6de',alpha=.8)
 for v in [v for v in vias[layer] if v.get('barrel_present_at_sample',True)]:ax.plot(v['x'],-v['y'],'o',color='#d996ff',markersize=5,markeredgecolor='white')
 for x,y,label in marks:ax.annotate(label,xy=(x,-y),xytext=((-100,-28) if label=='Input fixture' else (12,10)),textcoords='offset points',color='white',fontsize=8,arrowprops={'arrowstyle':'->','color':'white'},bbox={'facecolor':'#08211d','alpha':.85,'edgecolor':'none'})
 ax.set_xlim(view[0],view[0]+view[2]);ax.set_ylim(view[1]+view[3],view[1]);ax.set_aspect('equal');ax.set_xlabel('x (mm)');ax.set_ylabel('−y (mm)');ax.set_title(f"{case.get('trace_name','DDR_D8')} {case.get('region_title',folder.name.split('-')[-1])} · {layer}\n{frequency_label} · 1 V normalized · 50 Ω test fixtures",fontsize=12);fig.colorbar(matplotlib.cm.ScalarMappable(norm=norm,cmap=cmap),ax=ax,label='GND surface current |K| (A/m)',fraction=.046,pad=.04);fig.text(.08,.015,'Cyan: selected signal. White arrows: return direction at phase 0°. Purple: GND vias. Provisional EM.',fontsize=8);fig.tight_layout(rect=(0,.03,1,1));fig.savefig(out/f'{layer}.png');plt.close(fig)
for name in ['normalized-report.json','mesh-summary.json','via-currents.json','convergence.json','provenance.json']:
 if (folder/name).exists():(out/('report.json' if name=='normalized-report.json' else name)).write_bytes((folder/name).read_bytes())
(out/'palace.json').write_bytes((folder/report['config_file']).read_bytes())
(out/'view-data.json').write_text(json.dumps({'viewBox':view,'marks':[[x,-y,label] for x,y,label in marks],'case':folder.name.split('-')[-1],'bounds_mm':case['bounds_mm'],'source_xy':case['source_xy'],'source_return_xy':case.get('package_ground_xy',case['source_xy']),'source_return_layer':'inner1' if case.get('source_points') else 'top','source_return_z_mm':1.4175 if case.get('source_points') else 1.6,'source_return_kind':'assumed plane terminal directly beneath signal pad' if case.get('source_points') else 'package GND pad'}))
print('Rendered four layers from latest board',report['board_snapshot_sha256'])
