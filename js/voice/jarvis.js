
import { Commands } from './commands.js';
import { speak } from './speech.js';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let listening = false;
const WAKE_WORDS = ['jarvis','ok jarvis','hola jarvis'];

export const Jarvis = {
  init(){
    const status = document.getElementById('jarvis-status');
    if(!SpeechRecognition){ status.textContent = 'Jarvis: No compatible (use Chrome)'; return; }
    recognition = new SpeechRecognition();
    recognition.lang = 'es-DO';
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = async (ev)=>{
      const text = ev.results[0][0].transcript.toLowerCase().trim();
      console.log('ASR:', text);
      // wake-word handling
      const isWake = WAKE_WORDS.some(w=> text.startsWith(w));
      const cmdText = isWake ? text.replace(new RegExp('^('+WAKE_WORDS.join('|')+')\s*'), '') : text;
      // if wake-word not detected and not in always-listening - ignore
      const always = false; // toggle via config later
      if(!isWake && !always){ console.log('Ignored (no wake)'); return; }
      const handled = await Commands.dispatch(cmdText);
      if(!handled){
        speak('No entendí el comando. ¿Puedes repetir?');
      }
    };

    recognition.onerror = (e)=>{ console.warn('Recognition error', e); };
    document.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') Jarvis.startOnce(); });
    status.textContent = 'Jarvis: Listo (presiona Enter para hablar)';
  },

  async startOnce(){
    if(!recognition) return;
    try{ recognition.start(); }catch(e){ console.warn(e); }
  }
};
