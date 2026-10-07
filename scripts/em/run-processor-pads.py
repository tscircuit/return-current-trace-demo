import json,subprocess,shutil,time,math,sys
from pathlib import Path
root=Path(__file__).resolve().parents[2];py=sys.executable
def run(args,log):
 with open(log,'w') as f:subprocess.run(args,cwd=root,stdout=f,stderr=subprocess.STDOUT,check=True)
for name in ['ddr-d13','ddr-d8']:
 folder=root/f'data/em-u1-pad-{name}'
 run([py,'scripts/em/build.py',str(folder)],folder/'mesh.log')
 config=json.load(open(folder/'palace.json'));config['Solver']['Linear']['EstimatorMG']=True;(folder/'palace.json').write_text(json.dumps(config,indent=2))
 run(['bash','scripts/em/run.sh',str(folder)],folder/'palace-order1.log')
 run([py,'scripts/em/export.py',str(folder)],folder/'export-order1.log')
 run([py,'scripts/em/vias.py',str(folder)],folder/'vias-order1.log')
 shutil.copy(folder/'normalized-report.json',folder/'report-order1.json');shutil.copy(folder/'palace.json',folder/'palace-order1.json');shutil.copy(folder/'surface-triangles.json',folder/'surface-triangles-order1.json')
 config['Solver']['Order']=2;config['Problem']['Output']='postpro-order2';(folder/'palace-order2.json').write_text(json.dumps(config,indent=2))
 print(name,'first-order solve complete; starting second-order',flush=True)
 run(['bash','scripts/em/run.sh',str(folder),'palace-order2.json'],folder/'palace-order2.log')
 run([py,'scripts/em/export.py',str(folder),'postpro-order2'],folder/'export-order2.log')
 run([py,'scripts/em/vias.py',str(folder),'postpro-order2'],folder/'vias-order2.log')
 a=json.load(open(folder/'report-order1.json'));b=json.load(open(folder/'normalized-report.json'));change=100*abs(b['input_current_A']['magnitude']-a['input_current_A']['magnitude'])/b['input_current_A']['magnitude'];x1=a['input_impedance_ohm']['imag'];x2=b['input_impedance_ohm']['imag'];xc=100*abs(x2-x1)/abs(x2) if x2 else None
 comparison={'input_current_change_percent':change,'reactance_change_percent':xc,'first_order':a['input_impedance_ohm'],'second_order':b['input_impedance_ohm'],'summary':f'First → second element order on the same mesh: input-current magnitude changed {change:.1f}%; reactance changed {xc:.1f}%. This does not validate local-density peaks, crop extent or test fixtures. These are provisional normalized EM results.'}
 (folder/'convergence.json').write_text(json.dumps(comparison,indent=2))
 run([py,'scripts/em/render-latest.py',str(folder),str(root/f'public/em/latest/processor-pad-{name}')],folder/'render.log')
 for file in ['port-I.csv','port-V.csv','port-S.csv']:shutil.copyfile(folder/'postpro-order2'/file,folder/file)
 print(name,'second-order solve and four layer maps complete',flush=True)
 for ghz in [1,4]:
  target=root/f'data/em-u1-pad-{name}-{ghz}ghz';target.mkdir(exist_ok=True)
  for f in ['mesh.msh','geometry.json','mesh-summary.json']:shutil.copyfile(folder/f,target/f)
  case=json.loads((folder/'case-input.json').read_text());case['frequency_ghz']=ghz;(target/'case-input.json').write_text(json.dumps(case,indent=2))
  prov=json.loads((folder/'provenance.json').read_text());prov['fixture']=prov['fixture'].replace('400 MHz',f'{ghz} GHz');(target/'provenance.json').write_text(json.dumps(prov,indent=2))
  config['Solver']['Driven']['Samples'][0]['Freq']=[ghz];(target/'palace-order2.json').write_text(json.dumps(config,indent=2))
  (target/'convergence.json').write_text(json.dumps({'summary':'Independent second-order Maxwell solve using the actual selected U1 GND pad as source return. Frequency-specific mesh/order and crop convergence have not been established. The selected return pad and 50 Ω source/load fixtures remain assumptions, not a package/driver model.'},indent=2))
  print(name,ghz,'GHz actual-pad solve starting',flush=True)
  run(['bash','scripts/em/run.sh',str(target),'palace-order2.json'],target/'palace-order2.log')
  run([py,'scripts/em/export.py',str(target),'postpro-order2'],target/'export-order2.log')
  run([py,'scripts/em/vias.py',str(target),'postpro-order2'],target/'vias-order2.log')
  for file in ['port-I.csv','port-V.csv','port-S.csv']:shutil.copyfile(target/'postpro-order2'/file,target/file)
  run([py,'scripts/em/render-latest.py',str(target),str(root/f'public/em/latest/processor-pad-{name}-{ghz}ghz')],target/'render.log')
  print(name,ghz,'GHz actual-pad maps complete',flush=True)
