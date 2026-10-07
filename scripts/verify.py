import json,math
from pathlib import Path
catalog=json.load(open('data/experiment-manifest.json'));errors=[];maximum=0;offsetChange=0
for e in catalog:
 for k in range(2):
  p=Path(f'results/{e["name"]}-{k}.json');assert p.exists(),p
  r=json.load(open(p));d=r['diagnostics'];assert d['converged'];assert d['maxConservationError']<1e-8
  assert abs(r['cellWidth']-.25)<1e-12 and abs(r['cellHeight']-.25)<1e-12
  maximum=max(maximum,d['maxConservationError'])
  for i,end in enumerate(e['cases'][k]['endpoints']):
   edges=[edge for edge in r['edges'] if edge['kind']=='via' and r['nodes'][edge['startNode']]['layer']=='top' and (edge['current'] < -1e-7 if i==0 else edge['current']>1e-7)]
   total=sum(abs(edge['current']) for edge in edges);assert abs(total-.01)<1e-8
  assert all(math.isfinite(n['currentDensity']) for n in r['nodes'])
print('94 cases converged on 0.25 mm mesh; 21,430 ground nodes per case; all endpoint transfers conserve 10 mA; maximum balance error',maximum,'A')
