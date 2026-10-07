"""Reuse each U1 mesh for independent second-order Maxwell solves at 1 and 4 GHz."""
import json,subprocess,shutil,sys,hashlib
from pathlib import Path
root=Path(__file__).resolve().parents[2];py=sys.executable;board_hash=hashlib.sha256((root/'data/board.circuit.json').read_bytes()).hexdigest()
for name in ['ddr-d13','ddr-d8']:
 for ghz in [1,4]:
  source=root/f'data/em-u1-{name}';provenance=json.loads((source/'provenance.json').read_text());assert provenance['board_snapshot_sha256']==board_hash,'Rebuild U1 cases for the current board before sweeping';folder=root/f'data/em-u1-{name}-{ghz}ghz';folder.mkdir(exist_ok=True)
  for f in ['mesh.msh','geometry.json','mesh-summary.json']:shutil.copyfile(source/f,folder/f)
  case=json.loads((source/'case-input.json').read_text());case['frequency_ghz']=ghz;(folder/'case-input.json').write_text(json.dumps(case,indent=2))
  prov=dict(provenance);prov['fixture']=prov['fixture'].replace('400 MHz',f'{ghz} GHz');prov['accuracy']='Provisional; local-density, frequency-specific mesh, crop and fixture convergence not established';(folder/'provenance.json').write_text(json.dumps(prov,indent=2))
  config=json.loads((source/'palace-order2.json').read_text());config['Solver']['Driven']['Samples'][0]['Freq']=[ghz];(folder/'palace-order2.json').write_text(json.dumps(config,indent=2))
  (folder/'convergence.json').write_text(json.dumps({'summary':'Independent second-order Maxwell solve on the same mesh as the 400 MHz run. Element-order and mesh convergence have not been checked at this frequency. Absolute values apply to the assumed 1 V peak / 50 Ω fixtures; these are provisional results.'},indent=2))
  def run(args,log):
   with open(folder/log,'w') as f:subprocess.run(args,cwd=root,stdout=f,stderr=subprocess.STDOUT,check=True)
  print(name,ghz,'GHz starting',flush=True)
  run(['bash','scripts/em/run.sh',str(folder),'palace-order2.json'],'palace-order2.log')
  run([py,'scripts/em/export.py',str(folder),'postpro-order2'],'export-order2.log')
  run([py,'scripts/em/vias.py',str(folder),'postpro-order2'],'vias-order2.log')
  for file in ['port-I.csv','port-V.csv','port-S.csv']:shutil.copyfile(folder/'postpro-order2'/file,folder/file)
  run([py,'scripts/em/render-latest.py',str(folder),str(root/f'public/em/latest/processor-{name}-{ghz}ghz')],'render.log')
  print(name,ghz,'GHz complete',flush=True)
