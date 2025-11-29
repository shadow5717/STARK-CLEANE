
import { save, all } from '../db/db.js';
export function renderCarwash(){
  const el = document.createElement('div');
  el.innerHTML = `
    <div class="card"><h2>Car Wash</h2>
      <div id="car-list"></div>
      <div style="margin-top:1rem;">
        <input id="car-placa" placeholder="Placa" />
        <input id="car-price" placeholder="Precio" type="number" />
        <button id="car-save" class="btn">Registrar lavado</button>
      </div>
    </div>
  `;
  setTimeout(()=> bind(el), 50);
  return el;
}
function bind(root){
  root.querySelector('#car-save').addEventListener('click', async ()=>{
    const placa = root.querySelector('#car-placa').value || 'SINPLACA';
    const price = Number(root.querySelector('#car-price').value || 250);
    await save('vehiculos',{id:'lav-'+Date.now(), placa, price, date:new Date().toISOString()});
    window.notify('Lavado registrado para '+placa);
  });
  load(root);
}
async function load(root){
  const list = await all('vehiculos');
  root.querySelector('#car-list').innerHTML = '<h3>Vehículos</h3>' + (list.map(v=>`<div>${v.placa} - ${v.price}</div>`).join('') || '<div>No hay registros</div>');
}
