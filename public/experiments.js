'use strict';
const $=s=>document.querySelector(s);
const traceSelect=$('#trace-select'),contactSelect=$('#contact-select');
let catalog=[],views=[],activeSVG=null,currentView=null,focus='ddr',loadId=0;
const boxes={ddr:[-24,-10,36,50],board:[-52,-42,104,84]};
function box(){return activeSVG.viewBox.baseVal}
function setBox(values){if(activeSVG){activeSVG.setAttribute('viewBox',values.join(' '));updateScreenElements()}}
let screenLabels=[],screenVectors=[],screenCircles=[];
function prepareScreenElements(){
 const overlay=document.createElement('div');overlay.className='annotation-layer';const leaders=document.createElementNS('http://www.w3.org/2000/svg','svg');leaders.classList.add('annotation-leaders');overlay.append(leaders);$('#pcb-stage').append(overlay);
 screenLabels=[...activeSVG.querySelectorAll('text[data-label-x]')].map(t=>{
  const label=document.createElement('span');label.className='pcb-label';label.textContent=t.textContent;label.style.color=t.getAttribute('fill');overlay.append(label);
  const leader=document.createElementNS('http://www.w3.org/2000/svg','line');leader.setAttribute('stroke',t.getAttribute('fill'));leaders.append(leader);
  const item={label,leader,x:Number(t.dataset.labelX),y:Number(t.dataset.labelY),dx:Number(t.dataset.offsetX),dy:Number(t.dataset.offsetY)};t.remove();return item;
 });
 screenVectors=[...activeSVG.querySelectorAll('[data-vector-x]')].sort((a,b)=>Number(b.dataset.vectorDensity)-Number(a.dataset.vectorDensity));
 screenCircles=[...activeSVG.querySelectorAll('circle')];screenCircles.forEach(c=>{c.dataset.screenRadius=c.getAttribute('r')>.3?'6':'4';c.setAttribute('vector-effect','non-scaling-stroke');c.setAttribute('stroke-width','1.2')});
 updateScreenElements();
}
function updateScreenElements(){
 if(!activeSVG)return;const matrix=activeSVG.getScreenCTM();if(!matrix)return;
 const rect=$('#pcb-stage').getBoundingClientRect(),scale=Math.hypot(matrix.a,matrix.b),occupied=[];
 screenLabels.forEach(p=>{
  const anchorX=matrix.a*p.x+matrix.c*p.y+matrix.e-rect.left,anchorY=matrix.b*p.x+matrix.d*p.y+matrix.f-rect.top;
  if(anchorX<0||anchorY<0||anchorX>rect.width||anchorY>rect.height){p.label.hidden=true;p.leader.style.display='none';return;}
  p.label.hidden=false;let x=anchorX+p.dx,y=anchorY+p.dy;const w=p.label.offsetWidth,h=p.label.offsetHeight;
  x=Math.max(4,Math.min(rect.width-w-4,x));y=Math.max(4,Math.min(rect.height-h-4,y));
  for(let tries=0;tries<10&&occupied.some(b=>x<b.x+b.w+4&&x+w+4>b.x&&y<b.y+b.h+3&&y+h+3>b.y);tries++)y+=h+4;
  if(y+h>rect.height){p.label.hidden=true;p.leader.style.display='none';return;}occupied.push({x,y,w,h});p.label.style.transform='translate('+x+'px,'+y+'px)';p.leader.style.display='';p.leader.setAttribute('x1',anchorX);p.leader.setAttribute('y1',anchorY);p.leader.setAttribute('x2',Math.max(x,Math.min(x+w,anchorX)));p.leader.setAttribute('y2',Math.max(y,Math.min(y+h,anchorY)));
 });
 const seen=new Set();screenVectors.forEach(g=>{
  const x=Number(g.dataset.vectorX),y=Number(g.dataset.vectorY),sx=matrix.a*x+matrix.e-rect.left,sy=matrix.d*y+matrix.f-rect.top,key=Math.floor(sx/28)+':'+Math.floor(sy/28);
  const visible=$('#show-flow').checked&&sx>=0&&sy>=0&&sx<=rect.width&&sy<=rect.height&&!seen.has(key);g.style.display=visible?'':'none';if(visible)seen.add(key);
  g.setAttribute('transform','translate('+x+' '+y+') rotate('+g.dataset.vectorAngle+') scale('+(1/scale)+')');
 });
 screenCircles.forEach(c=>c.setAttribute('r',Number(c.dataset.screenRadius)/scale));
}
new ResizeObserver(()=>updateScreenElements()).observe($('#pcb-stage'));
function updateHeat(){
 if(!activeSVG)return;const layer=$('#heat-layer').value,show=$('#show-return').checked;
 activeSVG.querySelectorAll('[data-heat-layer]').forEach(g=>{g.style.display=show&&(layer==='all'||g.dataset.heatLayer===layer)?'':'none'});
}
function focusView(kind){
 focus=kind;setBox(boxes[kind]??currentView[kind]);
 const title={cpu:'① Processor dogbone',memory:'② Memory dogbone',ddr:'Entire DDR route',board:'Whole PCB'}[kind];$('#focus-label').textContent=title;
 document.querySelectorAll('[data-focus]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.focus===kind)));
 const entry=catalog.find(e=>e.name===traceSelect.value),c=entry.cases[Number(contactSelect.value)];
 if(kind==='cpu'||kind==='memory'){
  const p=c.endpoints[kind==='cpu'?0:1];$('#focus-summary').textContent=p.end+': '+p.dominantReturnViaGap.toFixed(2)+' mm from signal via to modeled return via. The closest physical GND via is '+p.nearestGroundViaGap.toFixed(2)+' mm away.';
 }else $('#focus-summary').textContent='Follow the cyan route from U1 (processor) to U3 (DDR memory). Orange shows where the modeled ground return flows.';
}
function zoom(factor){if(!activeSVG)return;const b=box();setBox([b.x+b.width*(1-factor)/2,b.y+b.height*(1-factor)/2,b.width*factor,b.height*factor])}
function interactions(svg){
 let drag=null;
 svg.addEventListener('pointerdown',e=>{if(e.button!==0)return;const b=box();drag={x:e.clientX,y:e.clientY,values:[b.x,b.y,b.width,b.height]};svg.setPointerCapture(e.pointerId)});
 svg.addEventListener('pointermove',e=>{if(!drag)return;const rect=svg.getBoundingClientRect(),scale=Math.min(rect.width/drag.values[2],rect.height/drag.values[3]);setBox([drag.values[0]-(e.clientX-drag.x)/scale,drag.values[1]-(e.clientY-drag.y)/scale,drag.values[2],drag.values[3]])});
 ['pointerup','pointercancel'].forEach(event=>svg.addEventListener(event,()=>drag=null));
 svg.addEventListener('wheel',e=>{e.preventDefault();zoom(e.deltaY>0?1.15:1/1.15)},{passive:false});
 svg.setAttribute('tabindex','0');svg.addEventListener('keydown',e=>{if(e.key==='+'||e.key==='='){e.preventDefault();zoom(.8)}if(e.key==='-'){e.preventDefault();zoom(1.25)}});
}
async function selectTrace(){
 const id=++loadId,name=traceSelect.value,index=Number(contactSelect.value);currentView=views.find(e=>e.name===name).views[index];
 $('#selected-trace').textContent=name;
 const entry=catalog.find(e=>e.name===name);$('#trace-note').textContent=entry.differential?'This is an isolated leg of a differential pair.':entry.static?'Reset shown with a hypothetical 10 mA excitation.':'';
 try{
  const response=await fetch(currentView.image);if(!response.ok)throw Error('PCB overlay unavailable');const text=await response.text();if(id!==loadId)return;
  $('#pcb-stage').innerHTML=text;activeSVG=$('#pcb-stage svg');prepareScreenElements();interactions(activeSVG);updateHeat();focusView(focus);
  $('#board-overview').innerHTML=text;const overview=$('#board-overview svg');overview.setAttribute('viewBox',boxes.board.join(' '));overview.querySelectorAll('[data-heat-layer]').forEach(g=>g.style.display='none');overview.querySelectorAll('text').forEach(t=>t.remove());
 }catch(e){$('#pcb-stage').textContent=e.message}
}
Promise.all([fetch('/experiments/catalog.json').then(r=>r.json()),fetch('/pcb/index.json').then(r=>r.json())]).then(([c,v])=>{
 catalog=c;views=v;catalog.sort((a,b)=>a.name.localeCompare(b.name,undefined,{numeric:true}));
 catalog.forEach(e=>{const option=document.createElement('option');option.value=e.name;option.textContent=e.name;traceSelect.append(option)});traceSelect.value='DDR_D8';
 catalog.forEach(e=>{const tr=document.createElement('tr'),td=document.createElement('td'),button=document.createElement('button');button.textContent=e.name;button.addEventListener('click',()=>{traceSelect.value=e.name;selectTrace();$('.pcb-workspace').scrollIntoView({behavior:'smooth'})});td.append(button);tr.append(td);e.cases[0].endpoints.forEach(p=>{const td=document.createElement('td');td.textContent=p.dominantReturnViaGap.toFixed(2)+' mm';tr.append(td)});$('#ranked-traces').append(tr)});
 selectTrace();
}).catch(e=>$('#pcb-stage').textContent='Unable to load PCB: '+e.message);
[traceSelect,contactSelect].forEach(el=>el.addEventListener('change',selectTrace));
[$('#heat-layer'),$('#show-return')].forEach(el=>el.addEventListener('change',updateHeat));
document.querySelectorAll('[data-focus]').forEach(b=>b.addEventListener('click',()=>{if(currentView)focusView(b.dataset.focus)}));
$('#zoom-in').addEventListener('click',()=>zoom(.8));$('#zoom-out').addEventListener('click',()=>zoom(1.25));

$('#show-flow').addEventListener('change',updateScreenElements);
