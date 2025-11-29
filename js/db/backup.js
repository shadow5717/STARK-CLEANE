
import { all, save } from './db.js';
export async function exportDB(){
  const stores = ['users','ventas','productos','servicios','mesas','vehiculos','reportes','settings'];
  const data = {};
  for(const s of stores) data[s] = await all(s);
  const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'starkcleane_backup.json'; a.click();
  URL.revokeObjectURL(url);
}

export async function importDB(json){
  const obj = typeof json === 'string' ? JSON.parse(json) : json;
  for(const k of Object.keys(obj)){
    for(const item of obj[k]) await save(k, item);
  }
  return true;
}
