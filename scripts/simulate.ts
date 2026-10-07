import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {simulateReturnCurrent} from '../simulation/lib/index';
const c=JSON.parse(readFileSync('data/board.circuit.json','utf8')),catalog=JSON.parse(readFileSync('data/experiment-manifest.json','utf8'));
const st=new Map(c.filter((e:any)=>e.type==='source_trace').map((e:any)=>[e.source_trace_id,e]));
const traces=new Map(c.filter((e:any)=>e.type==='pcb_trace').map((e:any)=>[(st.get(e.source_trace_id) as any)?.name,e]));
const ports=new Map(c.filter((e:any)=>e.type==='pcb_port').map((e:any)=>[e.pcb_port_id,e]));
const parameters=JSON.parse(readFileSync('data/simulation-parameters.json','utf8'));const base={bounds:parameters.bounds_mm,contactRadius:parameters.contact_radius_mm,viaPlatingThickness:parameters.via_plating_radial_thickness_mm,stackup:parameters.stackup.map((s:any)=>({name:s.layer,z:s.z_mm,copperThickness:s.copper_thickness_mm})),tolerance:parameters.relative_residual_tolerance,maxIterations:parameters.maximum_iterations};mkdirSync('results',{recursive:true});
const shard=Number(process.argv[2]??0),count=Number(process.argv[3]??1),only=process.argv[4];
for(const [i,e] of catalog.entries()){
 if(i%count!==shard||only&&only!==e.name)continue;
 for(let k=0;k<2;k++){
 const file=`results/${e.name}-${k}.json`;if(existsSync(file))continue;
 const contact=e.cases[k].endpoints.map((p:any)=>{const q=ports.get(p.contact) as any;return {x:q.x,y:q.y,layer:'top'}});
 const excitation={type:'simulation_return_current_excitation' as const,simulation_return_current_excitation_id:'isolated',pcb_trace_id:(traces.get(e.name) as any).pcb_trace_id,ground_source_net_id:'source_net_56',current:.01,return_source:contact[1],return_sink:contact[0]};
 console.log('start',e.name,k,Date.now());
 const r=simulateReturnCurrent({...base,circuitJson:c,cellSize:parameters.cell_size_mm,excitations:[excitation]});
 writeFileSync(file,JSON.stringify(r));console.log('done',e.name,k,r.nodes.length,r.diagnostics,Date.now());
 }
}
