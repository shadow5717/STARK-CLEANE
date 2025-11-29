
import { get as dbGet } from '../db/db.js';

export const Assistant = {
  apiKey: null,
  async init(){
    // Try to read api key from config (file won't be available via file:// but we support settings saved in indexeddb)
    try{ const k = await dbGet('settings','openai_key'); if(k && k.value) this.apiKey = k.value; }catch(e){}
  },
  async setKey(key){
    this.apiKey = key;
    // store to indexeddb settings
    try{ const { save } = await import('../db/db.js'); await save('settings',{key:'openai_key', value:key}); }catch(e){}
  },
  async chat(prompt, opts={}){
    if(!this.apiKey) throw new Error('No API key configured');
    // Basic fetch to OpenAI Chat Completions (gpt-4 or gpt-3.5-turbo)
    const body = {
      model: opts.model || 'gpt-4o-mini',
      messages: [{role:'system',content:'Eres Jarvis, asistente para el sistema STARK CLEANE.'},{role:'user',content:prompt}],
      max_tokens: opts.max_tokens || 400,
      temperature: opts.temperature ?? 0.2
    };
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':'Bearer '+this.apiKey},
      body: JSON.stringify(body)
    });
    if(!resp.ok) throw new Error('OpenAI error '+resp.status);
    const j = await resp.json();
    return j.choices && j.choices[0] && j.choices[0].message ? j.choices[0].message.content : JSON.stringify(j);
  }
};
