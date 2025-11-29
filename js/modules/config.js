
import { Assistant } from '../ia/assistant.js';
import { save } from '../db/db.js';

export function renderConfig(){
  const el = document.createElement('div');
  el.innerHTML = `
    <div class="card"><h2>Configuración</h2>
      <div>
        <label>OpenAI API Key (colóquela aquí, se guardará localmente)</label><br/>
        <input id="openai-key" placeholder="sk-..." style="width:60%"/>
        <button id="save-key" class="btn">Guardar clave</button>
      </div>
      <div style="margin-top:1rem;">
        <button id="export-db" class="btn">Exportar backup</button>
      </div>
    </div>
  `;
  setTimeout(()=> bind(el),50);
  return el;
}

function bind(root){
  root.querySelector('#save-key').addEventListener('click', async ()=>{
    const k = root.querySelector('#openai-key').value.trim();
    if(!k){ window.notify('Clave vacía'); return; }
    try{ await Assistant.setKey(k); await save('settings',{key:'openai_key', value:k}); window.notify('Clave guardada localmente'); }catch(e){ console.error(e); window.notify('Error guardando'); }
  });
  root.querySelector('#export-db').addEventListener('click', async ()=>{
    const { exportDB } = await import('../db/backup.js'); exportDB();
  });
}
