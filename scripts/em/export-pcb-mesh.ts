// Usage: bun scripts/em/export-pcb-mesh.ts /path/to/circuit-json-to-gmsh
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
const converter=resolve(process.argv[2]);
const {createGeometryModel,exportGmsh}=await import(pathToFileURL(converter+'/lib/index.ts').href);
const {copperConnectivity}=await import(pathToFileURL(converter+'/lib/copper-connectivity.ts').href);
const raw=await Bun.file('data/board.circuit.json').text(),c=JSON.parse(raw);
// Match the assumed layer elevations of the existing EM fixture, not a fabrication stackup.
const stackup={layers:[{name:'top',copperThicknessMm:.035},{material:'FR4',dielectricThicknessMm:.1825,dielectricConstant:4.3},{name:'inner1',copperThicknessMm:.035},{material:'FR4',dielectricThicknessMm:1.165,dielectricConstant:4.3},{name:'inner2',copperThicknessMm:.035},{material:'FR4',dielectricThicknessMm:.1825,dielectricConstant:4.3},{name:'bottom',copperThicknessMm:.035}]};
const model=createGeometryModel({circuitJson:c,stackup});
const connections=copperConnectivity(c);
const nets=Object.fromEntries(c.filter((e:any)=>e.type==='source_trace'&&e.name?.startsWith('DDR_')).map((st:any)=>[st.name,connections.owner(st.source_trace_id)]));
const boundsMm:[number,number,number,number]=[-3,-10,4,-2];
const outputDirectory='data/mesh-pcb-processor';
console.log('Exporting native converter CAD surface mesh for processor crop');
const result=await exportGmsh({model,outputDirectory,python:process.env.GMSH_PYTHON??'python3',meshSizeMm:.15,boundsMm,threads:4});
const commit=Bun.spawnSync(['git','-C',converter,'rev-parse','HEAD']).stdout.toString().trim();
await Bun.write(outputDirectory+'/viewer-provenance.json',JSON.stringify({generator:'tscircuit/circuit-json-to-gmsh',converter_commit:commit,board_sha256:createHash('sha256').update(raw).digest('hex'),bounds_mm:boundsMm,signal_nets:nets,ground_net:'source_net_0',kind:'native Gmsh CAD surface triangulation; not the EM tetrahedral mesh',stackup,report:result.report},null,2));
console.log('Converter mesh exported',result.report.volumeCount,'solids');
