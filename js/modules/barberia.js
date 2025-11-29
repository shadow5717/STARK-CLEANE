
import { all, save } from '../db/db.js';
export function renderBarberia(){
  const el = document.createElement('div');
  el.innerHTML = `
    <div class="card"><h2>Barbería</h2>
      <div id="barberia-list"></div>
      <div style="margin-top:1rem;">
        <input id="barberia-cliente" placeholder="Nombre cliente" />
        <input id="barberia-price" placeholder="Precio" type="number" />
        <button id="barberia-save" class="btn">Registrar corte</button>
      </div>
    </div>
  `;
  setTimeout(()=> bind(el), 50);
  return el;
}
function bind(root){
  root.querySelector('#barberia-save').addEventListener('click', async ()=>{
    const cliente = root.querySelector('#barberia-cliente').value || 'cliente';
    const price = Number(root.querySelector('#barberia-price').value || 300);
    const id = 'venta-'+Date.now();
    await save('ventas',{id,module:'barberia',client:cliente,items:[{name:'Corte',price}],total:price,date:new Date().toISOString()});
    window.notify('Corte registrado');
  });
  loadList(root);
}
async function loadList(root){
  const list = await all('ventas');
  const el = root.querySelector('#barberia-list');
  el.innerHTML = '<h3>Historial reciente</h3>' + (list.filter(v=>v.module==='barberia').slice(-10).map(v=>`<div>${v.client} - ${v.total} - ${new Date(v.date).toLocaleString()}</div>`).join('') || '<div>No hay ventas</div>');
}
