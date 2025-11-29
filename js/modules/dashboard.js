
export function renderDashboard(){
  const el = document.createElement('div');
  el.innerHTML = `
    <div class="card">
      <h2>Detailing STARK CLEANE</h2>
      <p>Panel de control rápido. Estado: <strong>En línea (modo local)</strong></p>
      <div style="display:flex;gap:1rem;margin-top:1rem;">
        <div class="card" style="padding:0.75rem;">Indicadores rápidos<br/><strong id="dash-ventas">Ventas hoy: 0</strong></div>
        <div class="card" style="padding:0.75rem;">Servicios activos<br/><strong id="dash-serv">-</strong></div>
      </div>
    </div>
  `;
  return el;
}
