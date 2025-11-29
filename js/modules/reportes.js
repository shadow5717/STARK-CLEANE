
import { all } from '../db/db.js';
export function renderReportes(){
  const el = document.createElement('div');
  el.innerHTML = `
    <div class="card"><h2>Reportes</h2>
      <div id="reportes-body"></div>
      <div style="margin-top:1rem;"><button id="read-report" class="btn">Leer ventas hoy (Jarvis)</button></div>
    </div>
  `;
  setTimeout(()=> bind(el),50);
  return el;
}
async function bind(root){
  root.querySelector('#read-report').addEventListener('click', async ()=>{
    const ventas = await all('ventas');
    const hoy = new Date().toISOString().slice(0,10);
    const hoyVentas = ventas.filter(v=> v.date && v.date.startsWith(hoy));
    const total = hoyVentas.reduce((s,v)=>s + (v.total||0),0);
    // Speak via Jarvis TTS (global speak)
    if(window.speechSynthesis){ const msg = new SpeechSynthesisUtterance(`Ventas de hoy: ${hoyVentas.length}. Total: ${total} pesos.`); msg.lang='es-DO'; window.speechSynthesis.speak(msg); }
    window.notify(`Ventas: ${hoyVentas.length} - Total ${total}`);
    root.querySelector('#reportes-body').innerHTML = '<pre>'+JSON.stringify({count:hoyVentas.length,total},null,2)+'</pre>';
  });
}
