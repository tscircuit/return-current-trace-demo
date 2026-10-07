import json,math,sys
from pathlib import Path
import gmsh
from shapely.geometry import Point
from shapely.geometry.polygon import orient
from shapely import wkt
folder=Path(sys.argv[1]);case=json.load(open(folder/'case-input.json'))
layerz={'top':1.6,'inner1':1.4,'inner2':.2,'bottom':0};thick=.035
shapes={(role,layer):wkt.loads(shape) for role in ['ground','signal'] for layer,shape in case[role].items()}
groundvias=case['ground_vias'];sigvias=case['signal_vias'];ports=[wkt.loads(case['source_port_wkt'])];directions=[case['source_direction']]
folder.mkdir(exist_ok=True);(folder/'geometry.json').write_text(json.dumps({'ground':case['ground'],'signal':case['signal']}));gmsh.initialize();gmsh.option.setNumber('General.Terminal',1)
gmsh.model.add('DDR_D8_four_layer');occ=gmsh.model.occ
def polygon(p,z):
 p=orient(p,sign=1.0)
 def ring(coords):
  v=[occ.addPoint(x,y,z) for x,y in list(coords)[:-1]];return occ.addCurveLoop([occ.addLine(v[i],v[(i+1)%len(v)]) for i in range(len(v))])
 tag=occ.addPlaneSurface([ring(p.exterior.coords),*[ring(list(h.coords)[::-1]) for h in p.interiors]])
 if not math.isclose(occ.getMass(2,tag),p.area,rel_tol=1e-6,abs_tol=1e-9):raise ValueError('CAD area differs from polygon, hole orientation invalid')
 return (2,tag)
def pieces(shape):return [shape] if shape.geom_type=='Polygon' else list(shape.geoms)
metal=[]
for (role,layer),shape in shapes.items():
 z=layerz[layer]+(-thick/2 if layer in ['inner1','inner2'] else -thick if layer=='bottom' else 0)
 for p in pieces(shape):
  if p.area<1e-8:continue
  face=polygon(p,z);metal.extend(e for e in occ.extrude([face],0,0,thick) if e[0]==3)
for e in [*groundvias,*sigvias]:
 z1,z2=(0,1.6) if e in groundvias else sorted([layerz[e['from_layer']],layerz[e['to_layer']]])
 hole=e.get('hole_diameter',e.get('via_hole_diameter',.15))/2;outer=hole+.025
 annulus=Point(e['x'],e['y']).buffer(outer,quad_segs=2).difference(Point(e['x'],e['y']).buffer(hole,quad_segs=2))
 face=polygon(annulus,z1);metal.extend(t for t in occ.extrude([face],0,0,z2-z1) if t[0]==3)
print('Copper volumes before union:',len(metal),flush=True)
metal=occ.fuse([metal[0]],metal[1:])[0]
print('Copper volumes after union:',len(metal),flush=True)
# Unite touching copper into physical conductors, then remove interiors from the field domain.
# Fragment all conductors in one pass; matching facets preserve contacts.
substrate=(3,occ.addBox(*case['substrate_box']))
drillvols=[]
for e in [*groundvias,*sigvias]:
 z1,z2=(0,1.6) if e in groundvias else sorted([layerz[e['from_layer']],layerz[e['to_layer']]])
 hole=e.get('hole_diameter',e.get('via_hole_diameter',.15))/2
 face=polygon(Point(e['x'],e['y']).buffer(hole,quad_segs=2),z1);drillvols.extend(t for t in occ.extrude([face],0,0,z2-z1) if t[0]==3)
substrate=occ.cut([substrate],drillvols)[0][0]
print('Fragmenting conductor/air/dielectric interfaces',flush=True)
air=(3,occ.addBox(*case['air_box']))
portfaces=[polygon(p,1.6) for p in ports]
v=[occ.addPoint(*point) for point in case['load_points']];loop=occ.addCurveLoop([occ.addLine(v[i],v[(i+1)%4]) for i in range(4)]);portfaces.append((2,occ.addPlaneSurface([loop])));directions.append(case['load_direction'])
fragments,mapping=occ.fragment([air],[substrate,*metal,*portfaces]);occ.synchronize()
metal_tags={t for desc in mapping[2:2+len(metal)] for d,t in desc if d==3};subtags={t for d,t in mapping[1] if d==3}-metal_tags;airtags={t for d,t in mapping[0] if d==3}-metal_tags-subtags
# Collect the conductor exterior before deleting its volume mesh.
coppersurfaces={abs(t) for d,t in gmsh.model.getBoundary([(3,t) for t in metal_tags],combined=True,oriented=False) if d==2}
occ.remove([(3,t) for t in metal_tags],recursive=False);occ.synchronize()
activevols=subtags|airtags
activefaces={abs(t) for d,t in gmsh.model.getBoundary([(3,t) for t in activevols],combined=False,oriented=False) if d==2};coppersurfaces &=activefaces
outerfaces={abs(t) for d,t in gmsh.model.getBoundary([(3,t) for t in activevols],combined=True,oriented=False) if d==2}-coppersurfaces
porttags=[]
for i,desc in enumerate(mapping[2+len(metal):]):
 tags={t for d,t in desc if d==2}
 print('PORT',i,'mapped',desc,'active',tags,'volumes',len(activevols),flush=True)
 if not tags:raise ValueError('Port aperture not part of dielectric/air interface')
 gmsh.model.addPhysicalGroup(2,sorted(tags),21+i,f'port{i+1}');porttags+=list(tags)
coppersurfaces-=set(porttags);outerfaces-=set(porttags)
gmsh.model.addPhysicalGroup(3,sorted(airtags),1,'air');gmsh.model.addPhysicalGroup(3,sorted(subtags),2,'FR4');gmsh.model.addPhysicalGroup(2,sorted(coppersurfaces),11,'copper-impedance');gmsh.model.addPhysicalGroup(2,sorted(outerfaces),13,'absorbing')
dist=gmsh.model.mesh.field.add('Distance');gmsh.model.mesh.field.setNumbers(dist,'SurfacesList',list(coppersurfaces));gmsh.model.mesh.field.setNumber(dist,'Sampling',30)
f=gmsh.model.mesh.field.add('Threshold');gmsh.model.mesh.field.setNumber(f,'InField',dist);gmsh.model.mesh.field.setNumber(f,'SizeMin',case.get('mesh_size_min_mm',.10));gmsh.model.mesh.field.setNumber(f,'SizeMax',2);gmsh.model.mesh.field.setNumber(f,'DistMin',.08);gmsh.model.mesh.field.setNumber(f,'DistMax',1.2);gmsh.model.mesh.field.setAsBackgroundMesh(f)
gmsh.option.setNumber('Mesh.MeshSizeFromCurvature',8);gmsh.option.setNumber('Mesh.MeshSizeExtendFromBoundary',0);gmsh.option.setNumber('Mesh.MeshSizeFromPoints',0);gmsh.option.setNumber('Mesh.Algorithm3D',10);gmsh.option.setNumber('General.NumThreads',4);gmsh.option.setNumber('Mesh.MshFileVersion',2.2)
gmsh.model.mesh.generate(3);gmsh.write(str(folder/'mesh.msh'));summary={'nodes':len(gmsh.model.mesh.getNodes()[0]),'elements':sum(len(e) for e in gmsh.model.mesh.getElements(3)[1]),'ground_vias':len(groundvias),'signal_vias':len(sigvias),'port_directions':directions};(folder/'mesh-summary.json').write_text(json.dumps(summary,indent=2));gmsh.finalize()
config={'Problem':{'Type':'Driven','Verbose':2,'Output':'postpro'},'Model':{'Mesh':'mesh.msh','L0':.001,'Lc':1.0,'CrackInternalBoundaryElements':False},'Domains':{'Materials':[{'Attributes':[1],'Permittivity':1,'Permeability':1},{'Attributes':[2],'Permittivity':4.3,'Permeability':1,'LossTan':.02}]},'Boundaries':{'Absorbing':{'Attributes':[13],'Order':1},'Conductivity':[{'Attributes':[11],'Conductivity':5.8e7,'Permeability':1,'External':True}],'LumpedPort':[{'Index':i+1,'Attributes':[21+i],'Direction':directions[i],'R':50,**({'Excitation':1} if i==0 else {})} for i in range(2)]},'Solver':{'Order':case.get('finite_element_order',2),'Device':'CPU','Driven':{'Samples':[{'Type':'Point','Freq':[case['frequency_ghz']],'SaveStep':1}]},'Linear':case.get('linear_solver',{'Type':'AMS','KSPType':'GMRES','Tol':1e-8,'MaxIts':500,'PCMatShifted':True})}}
(folder/'palace.json').write_text(json.dumps(config,indent=2));print(summary,flush=True)
