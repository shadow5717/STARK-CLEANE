
import { all, save } from '../db/db.js';
export function renderPOS(){
  const el = document.createElement('div');
  el.innerHTML = `
    <div class="card"><h2>POS</h2>
      <div id="pos-products"></div>
      <div style="margin-top:1rem;">
        <input id="pos-product" placeholder="Nombre producto" />
        <input id="pos-price" placeholder="Precio" type="number" />
        <button id="pos-add" class="btn">Agregar producto</button>
        <button id="pos-sell" class="btn">Vender (ejemplo rápido)</button>
      </div>
    </div>
  `;
  setTimeout(()=> bind(el),50);
  return el;
}
function bind(root){
  root.querySelector('#pos-add').addEventListener('click', async ()=>{
    const name = root.querySelector('#pos-product').value || 'Producto';
    const price = Number(root.querySelector('#pos-price').value || 50);
    await save('productos',{id:'prd-'+Date.now(), name, price});
    window.notify('Producto guardado');
    load(root);
  });
  root.querySelector('#pos-sell').addEventListener('click', async ()=>{
    // quick sale example
    const id = 'venta-'+Date.now();
    await save('ventas',{id,module:'pos', items:[{name:'Refresco', qty:2, price:50}], total:100, date:new Date().toISOString()});
    window.notify('Venta registrada (100)');
    load(root);
  });
  load(root);
}
async function load(root){
  const list = await all('productos');
  root.querySelector('#pos-products').innerHTML = '<h3>Productos</h3>' + (list.map(p=>`<div>${p.name} - ${p.price}</div>`).join('') || '<div>No hay productos</div>');
}
