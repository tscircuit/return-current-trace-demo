"""Package native converter/solver triangles for the 3D viewer, without decimating."""
import json,sys,gzip,hashlib
from pathlib import Path
import numpy as np
from shapely import wkt
from shapely.geometry import Point
ROOT=Path(__file__).resolve().parents[2]
out=ROOT/'public/em/latest/mesh';out.mkdir(exist_ok=True)
def pack(name,groups,metadata):
 chunks=[];offset=0;desc=[];total=0
 for key,positions,indices in groups:
  p=np.asarray(positions,dtype='<f4').reshape(-1,3);i=np.asarray(indices,dtype='<u4').reshape(-1)
  assert len(i)%3==0 and np.isfinite(p).all() and (not len(i) or i.max()<len(p))
  pb=p.tobytes();ib=i.tobytes();desc.append(dict(key,position_offset=offset,position_count=p.size,index_offset=offset+len(pb),index_count=len(i)));chunks.extend([pb,ib]);offset+=len(pb)+len(ib);total+=len(i)//3
 raw=b''.join(chunks)
 (out/(name+'.bin.gz')).write_bytes(gzip.compress(raw,compresslevel=9,mtime=0))
 (out/(name+'.json')).write_text(json.dumps(dict(metadata,groups=desc,triangles=total,binary=name+'.bin.gz',bytes=offset),indent=2))
 print(name,total,'triangles',len(raw),'uncompressed bytes')
def solver(name):
 folder=ROOT/('data/em-u1-pad-'+name.lower().replace('_','-'));case=json.loads((folder/'case-input.json').read_text());text=(folder/'mesh.msh').read_text().splitlines()
 n=text.index('$Nodes');count=int(text[n+1]);nodes={int(v[0]):list(map(float,v[1:])) for v in (line.split() for line in text[n+2:n+2+count])}
 n=text.index('$Elements');count=int(text[n+1]);groups={};triangles=0
 shapes={(role,layer):wkt.loads(value) for role in ['ground','signal'] for layer,value in case[role].items()};z={'top':1.6,'inner1':1.4,'inner2':.2,'bottom':0}
 for line in text[n+2:n+2+count]:
  e=list(map(int,line.split()));nt=e[2];physical=e[3]
  if e[1]!=2 or physical not in [11,21,22]:continue
  xyz=np.array([nodes[tag] for tag in e[3+nt:]])
  center=xyz.mean(axis=0)
  if physical in [21,22]:role='port';layer='source' if physical==21 else 'load'
  elif np.ptp(xyz[:,2])>.08:
   via=min([dict(v,role=role) for role,key in [('signal','signal_vias'),('ground','ground_vias')] for v in case[key]],key=lambda v:(v['x']-center[0])**2+(v['y']-center[1])**2);role=via['role'];layer='barrel'
  else:
   layer=min(z,key=lambda layer:abs(z[layer]-center[2]));point=Point(*center[:2]);role=min(['signal','ground'],key=lambda role:shapes[role,layer].distance(point) if (role,layer) in shapes else float('inf'))
  key=(role,layer);g=groups.setdefault(key,{'map':{},'p':[],'i':[]})
  for node in e[3+nt:]:
   if node not in g['map']:g['map'][node]=len(g['p']);g['p'].append(nodes[node])
   g['i'].append(g['map'][node])
  triangles+=1
 pack('solver-'+name.lower().replace('_','-'),[({'role':r,'layer':l},g['p'],g['i']) for (r,l),g in groups.items()],{'generator':'Exact Gmsh boundary triangles used by Palace','mesh_sha256':hashlib.sha256((folder/'mesh.msh').read_bytes()).hexdigest(),'board_sha256':case['board_snapshot_sha256'] if 'board_snapshot_sha256' in case else hashlib.sha256((ROOT/'data/board.circuit.json').read_bytes()).hexdigest(),'bounds_mm':case['bounds_mm'],'volume_mesh':json.loads((folder/'mesh-summary.json').read_text()),'connection':name,'source_xy':case['source_xy'],'source_return_xy':case['package_ground_xy'],'kind':'Solver conductor boundary mesh and port apertures. Air and FR4 hidden.','substrate_visible':False})
for name in ['DDR_D8','DDR_D13']:solver(name)
if (ROOT/'data/mesh-pcb-processor/preview.json').exists():
 preview=json.loads((ROOT/'data/mesh-pcb-processor/preview.json').read_text());provenance=json.loads((ROOT/'data/mesh-pcb-processor/viewer-provenance.json').read_text())
 provenance['source_contacts']={}
 for name in ['DDR_D8','DDR_D13']:
  case=json.loads((ROOT/('data/em-u1-pad-'+name.lower().replace('_','-'))/'case-input.json').read_text());provenance['source_contacts'][name]={'signal':case['source_xy'],'ground':case['package_ground_xy']}
 if isinstance(preview,dict):preview=preview['solids']
 pack('pcb-processor',[({'net':s.get('netId'),'layer':s.get('layer','barrel'),'role':'copper'},s['positions'],s['indices']) for s in preview if s['material']=='copper'],provenance)
