
/*
 Lightweight IndexedDB wrapper for STARK CLEANE
 Stores: users, ventas, productos, servicios, mesas, vehiculos, reportes, settings
*/
const DB_VERSION = 1;
let db = null;
export async function initDB(){
  return new Promise((resolve, reject)=>{
    const req = indexedDB.open('starkcleane_v1', DB_VERSION);
    req.onupgradeneeded = (e)=>{
      db = e.target.result;
      if(!db.objectStoreNames.contains('users')) db.createObjectStore('users',{keyPath:'id'});
      if(!db.objectStoreNames.contains('ventas')) db.createObjectStore('ventas',{keyPath:'id'});
      if(!db.objectStoreNames.contains('productos')) db.createObjectStore('productos',{keyPath:'id'});
      if(!db.objectStoreNames.contains('servicios')) db.createObjectStore('servicios',{keyPath:'id'});
      if(!db.objectStoreNames.contains('mesas')) db.createObjectStore('mesas',{keyPath:'id'});
      if(!db.objectStoreNames.contains('vehiculos')) db.createObjectStore('vehiculos',{keyPath:'id'});
      if(!db.objectStoreNames.contains('reportes')) db.createObjectStore('reportes',{keyPath:'id'});
      if(!db.objectStoreNames.contains('settings')) db.createObjectStore('settings',{keyPath:'key'});
    };
    req.onsuccess = (e)=>{ db = e.target.result; seedIfEmpty().then(()=>resolve()); };
    req.onerror = (e)=> reject(e);
  });
}

function tx(storeName, mode='readonly'){ return db.transaction(storeName, mode).objectStore(storeName); }

async function seedIfEmpty(){
  const p = await count('users');
  if(p===0){
    await save('users',{id:'admin',name:'ANTONI',role:'admin'});
    await save('settings',{key:'currency',value:'DOP'});
    await save('servicios',{id:'svc-barber-corte',name:'Corte',price:300});
    await save('productos',{id:'prd-refresco',name:'Refresco',price:50});
  }
}

export function save(store, item){
  return new Promise((resolve,reject)=>{
    const t = db.transaction(store,'readwrite');
    const s = t.objectStore(store);
    s.put(item);
    t.oncomplete = ()=> resolve(item);
    t.onerror = (e)=> reject(e);
  });
}

export function get(store, id){
  return new Promise((resolve,reject)=>{
    const s = tx(store);
    const req = s.get(id);
    req.onsuccess = ()=> resolve(req.result);
    req.onerror = (e)=> reject(e);
  });
}

export function all(store){
  return new Promise((resolve,reject)=>{
    const s = tx(store);
    const req = s.getAll();
    req.onsuccess = ()=> resolve(req.result);
    req.onerror = (e)=> reject(e);
  });
}

export function count(store){
  return new Promise((resolve,reject)=>{
    const s = tx(store);
    const req = s.count();
    req.onsuccess = ()=> resolve(req.result);
    req.onerror = (e)=> reject(e);
  });
}

export function remove(store, id){
  return new Promise((resolve,reject)=>{
    const t = db.transaction(store,'readwrite');
    const s = t.objectStore(store);
    s.delete(id);
    t.oncomplete = ()=> resolve();
    t.onerror = (e)=> reject(e);
  });
}
