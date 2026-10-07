import {readFileSync,writeFileSync} from 'node:fs';
const c=JSON.parse(readFileSync('data/board.circuit.json','utf8'));
const types=new Set(['pcb_board','pcb_trace','pcb_via','pcb_smtpad','pcb_plated_hole','pcb_hole','pcb_copper_pour','pcb_silkscreen_text','pcb_silkscreen_path','pcb_silkscreen_rect','pcb_silkscreen_circle','pcb_cutout']);
const st=new Map(c.filter((e:any)=>e.type==='source_trace').map((e:any)=>[e.source_trace_id,e]));
const connections=c.filter((e:any)=>e.type==='pcb_trace'&&((st.get(e.source_trace_id) as any)?.name??'').startsWith('DDR_')).map((t:any)=>({name:(st.get(t.source_trace_id) as any).name,id:t.pcb_trace_id,source_trace_id:t.source_trace_id,endpoints:[t.route[0],t.route.at(-1)],em:t===undefined?false:(st.get(t.source_trace_id) as any).name==='DDR_D8'})).sort((a:any,b:any)=>a.name.localeCompare(b.name,undefined,{numeric:true}));
const sc=new Map(c.filter((e:any)=>e.type==='source_component').map((e:any)=>[e.source_component_id,e]));
const components=c.filter((e:any)=>e.type==='pcb_component').map((e:any)=>({name:(sc.get(e.source_component_id) as any)?.name??'',center:e.center,width:e.width,height:e.height}));
writeFileSync('public/em/latest/pcb-data.json',JSON.stringify({elements:c.filter((e:any)=>types.has(e.type)),connections,components}));
console.log(`Exported latest PCB context and ${connections.length} selectable connections`);
