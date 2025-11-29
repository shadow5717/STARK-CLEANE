
import { renderDashboard } from './modules/dashboard.js';
import { renderBarberia } from './modules/barberia.js';
import { renderBillar } from './modules/billar.js';
import { renderCarwash } from './modules/carwash.js';
import { renderPOS } from './modules/pos.js';
import { renderReportes } from './modules/reportes.js';
import { renderConfig } from './modules/config.js';

export const Router = {
  view: null,
  routes: {
    dashboard: renderDashboard,
    barberia: renderBarberia,
    billar: renderBillar,
    carwash: renderCarwash,
    pos: renderPOS,
    reportes: renderReportes,
    config: renderConfig
  },
  init(viewEl) {
    this.view = viewEl;
    // attach sidebar buttons
    document.querySelectorAll('.sidebar button').forEach(btn=>{
      btn.addEventListener('click', ()=> this.navigate(btn.dataset.route));
    });
    document.getElementById('btn-openai-setup').addEventListener('click', ()=> this.navigate('config'));
    this.navigate('dashboard');
  },
  navigate(route){
    const fn = this.routes[route];
    if(!fn) {
      this.view.innerHTML = '<div class="card">Ruta no encontrada</div>'; return;
    }
    this.view.innerHTML = '';
    this.view.appendChild(fn());
  }
};
