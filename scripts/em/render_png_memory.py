import os
os.environ.setdefault('MPLCONFIGDIR',str(__import__('pathlib').Path.cwd()/'.em-mpl-cache'))
import json,re,sys,xml.etree.ElementTree as ET
from pathlib import Path
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.collections import PolyCollection,LineCollection,PatchCollection
from matplotlib.patches import Rectangle,Circle
from matplotlib.colors import LinearSegmentedColormap,LogNorm
repo=Path(__file__).resolve().parents[2];folder=Path(sys.argv[1]);out=Path(sys.argv[2]);data=json.load(open(folder/'surface-triangles.json'));via_data=json.load(open(folder/'via-currents.json'));board=ET.parse(repo/'public/pcb/board.svg').getroot();signal=ET.parse(out/'bottom.svg').getroot()
lines=[];patches=[]
for e in board:
 tag=e.tag.split('}')[-1]
 if tag=='path':
  v=[(float(x),float(y)) for x,y in re.findall(r'[ML]([-\d.]+),([-\d.]+)',e.get('d',''))]
  if len(v)>1 and any(-8.5<x<-2.5 and 31.5<y<36 for x,y in v):lines.append(v)
 elif tag=='circle':
  x=float(e.get('cx'));y=float(e.get('cy'));r=float(e.get('r'))
  if -8.5<x<-2.5 and 31.5<y<36:patches.append(Circle((x,y),r))
 elif tag=='rect':
  x=float(e.get('x'));y=float(e.get('y'));w=float(e.get('width'));h=float(e.get('height'))
  if x+w>-8.5 and x<-2.5 and y+h>31.5 and y<36:patches.append(Rectangle((x,y),w,h))
trace=[]
for e in signal:
 if e.tag.endswith('path') and e.get('stroke')=='#20efff':trace.append([(float(x),float(y)) for x,y in re.findall(r'[ML]([-\d.]+),([-\d.]+)',e.get('d',''))])
cmap=LinearSegmentedColormap.from_list('sheet',['#0c2a48','#1d76aa','#3dd0b6','#ffc734','#ff4d23']);norm=LogNorm(.01,100,clip=True)
for layer,items in data.items():
 fig,ax=plt.subplots(figsize=(8,8),dpi=160);ax.set_facecolor('#08211d');ax.add_collection(PatchCollection(patches,facecolors='#adbbab',edgecolors='#9fb8ac',linewidths=.4,alpha=.2));ax.add_collection(LineCollection(lines,colors='#afc9bf',linewidths=.5,alpha=.25))
 if items:
  coll=PolyCollection([t['xy'] for t in items],array=np.array([t['density'] for t in items]),cmap=cmap,norm=norm,edgecolors='none');ax.add_collection(coll)
 else:ax.text(-5.5,34.8,'No horizontal GND copper\nin the board export',ha='center',color='white',fontsize=12)
 tc=LineCollection(trace,colors='#20efff',linewidths=2);tc.set_clip_path(Rectangle((-8,32),5,3.5,transform=ax.transData));ax.add_collection(tc);
 if layer in ['top','bottom']:
  cells={}
  for t in items:
   x,y=np.array(t['xy']).mean(axis=0);key=(int((x+5)/.75),int(y/.75));v=np.array(t['real_xy']);m=np.linalg.norm(v)
   if m>.05 and (key not in cells or t['density']>cells[key][3]):cells[key]=(x,y,v/m,t['density'])
  for x,y,d,_ in cells.values():ax.arrow(x-.12*d[0],y-.12*d[1],.24*d[0],.24*d[1],width=.008,head_width=.10,head_length=.10,length_includes_head=True,color='#fff6de',alpha=.8)
 ax.annotate('Memory signal pad',xy=(-6.400185,33.599946),xytext=(-8.2,33),color='white',fontsize=9,arrowprops={'arrowstyle':'->','color':'#20efff'},bbox={'facecolor':'#08211d','alpha':.85,'edgecolor':'none'});ax.annotate('Signal via → inner 2',xy=(-6,34),xytext=(-4.8,35.8),color='white',fontsize=9,arrowprops={'arrowstyle':'->','color':'#20efff'},bbox={'facecolor':'#08211d','alpha':.85,'edgecolor':'none'});ax.annotate('Assumed GND pin',xy=(-6.4002,34.4),xytext=(-8.2,35.3),color='#e0c8ff',fontsize=9,arrowprops={'arrowstyle':'->','color':'#e0c8ff'},bbox={'facecolor':'#08211d','alpha':.85,'edgecolor':'none'});
 ax.add_patch(Rectangle((-8,32),5,3.5,fill=False,edgecolor='#deeadd',linestyle='--',linewidth=1));ax.plot(-3.85,32,'o',color='#d4a9ff',markersize=7);ax.set_xlim(-8.5,-2.5);ax.set_ylim(36,31.5);ax.set_aspect('equal');ax.set_xlabel('x (mm)');ax.set_ylabel('−y (mm)');ax.set_title(f'DDR_D8 memory escape · {layer}\n400 MHz · 1 V input · 50 Ω test load',fontsize=13)
 for v in via_data[layer]:
  t=min(1,v['magnitude_mA']/20);c=np.array([52,64,212])*(1-t)+np.array([252,119,199])*t;ax.add_patch(Circle((v['x'],-v['y']),.14,facecolor=c/255,edgecolor='white',linewidth=.7))
 fig.text(.08,.012,'Via markers: 0–20 mA (blue–pink). White arrows: current direction at phase 0°.',fontsize=8)
 fig.colorbar(matplotlib.cm.ScalarMappable(norm=norm,cmap=cmap),ax=ax,label='GND surface-current phasor magnitude |K| (A/m)',fraction=.046,pad=.03);fig.tight_layout();fig.savefig(out/f'{layer}.png');plt.close(fig)
print('Four PNG maps exported')
