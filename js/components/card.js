export function renderCard(title, body){ const d=document.createElement('div'); d.className='card'; d.innerHTML=`<h3>${title}</h3><div>${body}</div>`; return d; }
