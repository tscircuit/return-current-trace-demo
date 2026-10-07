import json,subprocess,shutil,time,math,sys
from pathlib import Path
root=Path(__file__).resolve().parents[2];py=sys.executable
def run(args,log):
 with open(log,'w') as f:subprocess.run(args,cwd=root,stdout=f,stderr=subprocess.STDOUT,check=True)
run([py,'scripts/em/prepare-latest.py'],root/'data/prepare-latest.log')
run([py,'scripts/em/render-overview.py'],root/'data/render-overview.log')
for name in ['memory','cpu']:
 folder=root/f'data/em-latest-ddr-d8-{name}'
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
 run([py,'scripts/em/render-latest.py',str(folder),str(root/f'public/em/latest/{name}')],folder/'render.log')
 print(name,'second-order solve and four layer maps complete',flush=True)
run([py,'scripts/em/build-latest-page.py'],root/'data/build-latest-page.log')
print('Both cases and pages complete',flush=True)
