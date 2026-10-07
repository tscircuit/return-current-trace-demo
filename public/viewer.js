'use strict';
let mode='return';let selectedLayer='all';
const notes={return:'Colored copper shows GND return current. Gray DDR traces are routing context.',combined:'Colored DDR traces show prescribed signal current on their actual layers. The bottom pour shows simulated GND return current.'};
function update(){
 document.querySelectorAll('[data-mode]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.mode===mode)));
 document.querySelectorAll('[data-layer]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.layer===selectedLayer)));
 document.querySelector('#maps').classList.toggle('single',selectedLayer!=='all');
 document.querySelector('#view-note').textContent=notes[mode];
 document.querySelectorAll('[data-card]').forEach(card=>{
  const layer=card.dataset.card;card.hidden=selectedLayer!=='all'&&selectedLayer!==layer;
  const path='/assets/'+layer+'-'+mode+'.png';
  card.querySelector('img').src=path;
  card.querySelector('img').alt=layer.toUpperCase()+' layer: '+(mode==='return'?'GND return current':'prescribed DDR signal and GND return current')+' heatmap';
  card.querySelectorAll('.image-link').forEach(link=>link.href=path);
 });
}
document.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>{mode=button.dataset.mode;update()}));
document.querySelectorAll('[data-layer]').forEach(button=>button.addEventListener('click',()=>{selectedLayer=button.dataset.layer;update()}));
