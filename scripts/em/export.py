import csv,json,math,sys
from pathlib import Path
import numpy as np
import vtk
from vtk.util.numpy_support import vtk_to_numpy
from shapely.geometry import Point
from shapely import wkt
from shapely.prepared import prep
folder=Path(sys.argv[1]) if len(sys.argv)>1 else Path('work/em-ddr-d8-cpu')
postpro=folder/(sys.argv[2] if len(sys.argv)>2 else 'postpro')
def row(name):
 with open(postpro/name) as f:return np.array([float(x) for x in list(csv.reader(f))[1]])
v=row('port-V.csv');i=row('port-I.csv');sc=row('port-S.csv')
v1=complex(v[2],v[3]);scale=1/v1
vin=complex(v[1]);iin=complex(i[1]);i1=(2*iin-complex(i[2],i[3]))*scale;i2=complex(i[4],i[5])*scale;v2=complex(v[4],v[5])*scale
config_path=folder/('palace.json' if postpro.name=='postpro' else postpro.name.replace('postpro','palace')+'.json');config=json.load(open(config_path));lc=config['Model']['L0']*config['Model']['Lc'];hc=1/math.sqrt(376.730313668*lc*lc)
def phasor(z):return {'real':z.real,'imag':z.imag,'magnitude':abs(z),'phase_deg':math.degrees(math.atan2(z.imag,z.real))}
report={'finite_element_order':config['Solver']['Order'],'solver':'Palace v0.14.0','frequency_hz':float(v[0])*1e9,'config_file':config_path.name,'postprocessing_folder':postpro.name,'input_voltage_V':phasor(1+0j),'input_current_A':phasor(i1),'load_voltage_V':phasor(v2),'load_current_A':phasor(i2),'input_impedance_ohm':phasor(1/i1),'source_reference_ohm':50,'load_ohm':50,'port_csv_normalization_factor':phasor(scale),'field_normalization_factor':phasor(-scale),'native_port_voltage_axis':'GND minus signal','displayed_input_voltage_axis':'signal minus GND','surface_current_units':'A/m','surface_current_SI_scale':hc,'phasor_convention':'exp(+j omega t), terminal phasor magnitude 1 V; Palace documentation describes peak phasors','s11_db':sc[1],'s21_db':sc[3]}
(folder/'normalized-report.json').write_text(json.dumps(report,indent=2))
geometry=json.load(open(folder/'geometry.json'));ground={k:prep(wkt.loads(v).buffer(1e-6)) for k,v in geometry['ground'].items()}
triangles={k:[] for k in ['top','inner1','inner2','bottom']};case=json.load(open(folder/'case-input.json'));zfaces=case.get('display_ground_faces_mm',{'top':1.635,'inner1':1.4175,'inner2':.2175,'bottom':-.035})
if (folder/'provenance.json').exists():
 report.update(json.load(open(folder/'provenance.json')))
 report['display_ground_faces_mm']=zfaces
 (folder/'normalized-report.json').write_text(json.dumps(report,indent=2))
for path in sorted((postpro/'paraview/driven_boundary/Cycle000001').glob('proc*.vtu')):
 r=vtk.vtkXMLUnstructuredGridReader();r.SetFileName(str(path));r.Update();surface=vtk.vtkDataSetSurfaceFilter();surface.SetInputData(r.GetOutput());surface.SetNonlinearSubdivisionLevel(1);surface.Update();tri=vtk.vtkTriangleFilter();tri.SetInputConnection(surface.GetOutputPort());tri.Update();g=tri.GetOutput();pts=vtk_to_numpy(g.GetPoints().GetData());pd=g.GetPointData();j=(vtk_to_numpy(pd.GetArray('J_s_real'))+1j*vtk_to_numpy(pd.GetArray('J_s_imag')))*hc*(-scale);attrs=vtk_to_numpy(g.GetCellData().GetArray('attribute'))
 for n in np.flatnonzero(attrs==11):
  cell=g.GetCell(int(n));ids=[cell.GetPointId(q) for q in range(cell.GetNumberOfPoints())];p=pts[ids]*config['Model']['Lc'];cent=p.mean(axis=0)
  for layer,z in zfaces.items():
   if np.max(np.abs(p[:,2]-z))<1e-5 and layer in ground and ground[layer].covers(Point(*cent[:2])):
    js=j[ids].mean(axis=0);density=float(np.linalg.norm(js));triangles[layer].append({'xy':[[float(x),float(-y)] for x,y in p[:,:2]],'density':density,'real_xy':[float(js[0].real),float(-js[1].real)]})
(folder/'surface-triangles.json').write_text(json.dumps(triangles,separators=(',',':')))
print(json.dumps(report,indent=2));print('Ground face triangles:',{k:len(v) for k,v in triangles.items()})
