
export function setupUI(){
  // simple toast
  window.notify = (msg, timeout=3500)=>{
    const t = document.getElementById('toast');
    const el = document.createElement('div');
    el.className = 'card';
    el.style.marginTop = '0.5rem';
    el.textContent = msg;
    t.appendChild(el);
    setTimeout(()=> el.remove(), timeout);
  };
}
