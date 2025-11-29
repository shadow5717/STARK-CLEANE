
import { save, all } from '../db/db.js';
export function renderBillar(){
  const el = document.createElement('div');
  el.innerHTML = `
    <div class="card"><h2>Billar</h2>
      <div id="mesas-list"></div>
      <div style="margin-top:1rem;">
        <input id="mesa-num" placeholder="Número de mesa" />
        <button id="mesa-start" class="btn">Iniciar mesa</button>
      </div>
    </div>
  `;
  setTimeout(()=> bind(el),50);
  return el;
}
function bind(root){
  root.querySelector('#mesa-start').addEventListener('click', async ()=>{
    const num = root.querySelector('#mesa-num').value || '1';
    await save('mesas',{id:'mesa-'+num, mesa:num, inicio:new Date().toISOString(), estado:'ocupada'});
    window.notify('Mesa '+num+' iniciada');
  });
  load(root);
}
async function load(root){
  const list = await all('mesas');
  root.querySelector('#mesas-list').innerHTML = '<h3>Mesas</h3>' + (list.map(m=>`<div>${m.mesa} - ${m.estado}</div>`).join('') || '<div>No hay mesas</div>');
}
