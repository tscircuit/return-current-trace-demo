import sys,json,math,csv
from pathlib import Path
import vtk,numpy as np
from vtk.util.numpy_support import vtk_to_numpy
folder=Path(sys.argv[1]);postpro=folder/(sys.argv[2] if len(sys.argv)>2 else 'postpro');case=json.load(open(folder/'case-input.json'));v=[float(x) for x in list(csv.reader(open(postpro/'port-V.csv')))[1]];factor=-1/complex(v[2],v[3])/math.sqrt(376.730313668*1e-6)
vias=case['ground_vias'];levels={'top':1.55,'inner1':1.4,'inner2':.2,'bottom':.05};totals={l:np.zeros(len(vias),dtype=complex) for l in levels}
for f in (postpro/'paraview/driven_boundary/Cycle000001').glob('proc*.vtu'):
 r=vtk.vtkXMLUnstructuredGridReader();r.SetFileName(str(f));r.Update()
 for layer,z in levels.items():
  plane=vtk.vtkPlane();plane.SetOrigin(0,0,z);plane.SetNormal(0,0,1);cut=vtk.vtkCutter();cut.SetInputData(r.GetOutput());cut.SetCutFunction(plane);cut.Update();g=cut.GetOutput();points=vtk_to_numpy(g.GetPoints().GetData());j=(vtk_to_numpy(g.GetPointData().GetArray('J_s_real'))+1j*vtk_to_numpy(g.GetPointData().GetArray('J_s_imag')))*factor;attr=vtk_to_numpy(g.GetCellData().GetArray('attribute'))
  for n in np.flatnonzero(attr==11):
   cell=g.GetCell(int(n));ids=[cell.GetPointId(i) for i in range(cell.GetNumberOfPoints())]
   for a,b in zip(ids,ids[1:]):
    mid=points[[a,b]].mean(axis=0);dist=[np.linalg.norm(mid[:2]-[v['x'],v['y']]) for v in vias];index=int(np.argmin(dist));outer=vias[index]['hole_diameter']/2+.025
    if dist[index]<outer+1e-5:totals[layer][index]+=(j[a,2]+j[b,2])/2*np.linalg.norm(points[a]-points[b])*.001
result={l:[{'pcb_via_id':v['pcb_via_id'],'x':v['x'],'y':v['y'],'z_sample_mm':levels[l],'real_A':float(i.real),'imag_A':float(i.imag),'magnitude_mA':float(abs(i)*1000)} for v,i in zip(vias,values)] for l,values in totals.items()}
(folder/'via-currents.json').write_text(json.dumps(result,indent=2));print({l:sum(t['real_A'] for t in vs) for l,vs in result.items()})
