
import { Router } from './router.js';
import { initDB } from './db/db.js';
import { Jarvis } from './voice/jarvis.js';
import { setupUI } from './ui.js';
import { Assistant } from './ia/assistant.js';

async function boot(){
  await initDB();
  Router.init(document.getElementById('view'));
  setupUI();
  Jarvis.init();
  // Assistant reads saved key if present
  await Assistant.init();
  console.log('STARK CLEANE ready');
}

window.addEventListener('DOMContentLoaded', boot);
