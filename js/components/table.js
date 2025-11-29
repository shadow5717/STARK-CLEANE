export function renderTable(rows){ const t=document.createElement('div'); t.textContent = JSON.stringify(rows); return t; }
