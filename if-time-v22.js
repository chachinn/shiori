(function(){
  const data=window.SHioriIfTimeData;
  if(!data)return;
  labels.iftime='If We Have Time';
  function readDone(){try{return JSON.parse(localStorage.getItem('shioriIfTimeDone')||'{}')||{}}catch(e){return {}}}
  const checked=readDone();
  function saveDone(){localStorage.setItem('shioriIfTimeDone',JSON.stringify(checked))}
  function norm(v){return String(v??'').normalize('NFKC').trim().replace(/\s+/g,' ').toLowerCase()}
  function keyFor(r){return `iftime|${norm(r[0])}|${norm(r[1])}|${norm(r[3])}`}
  function esc(v){return String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]))}
  function view(){
    const heads=['✓',...data.headers];
    return `<main><section class="section-title"><h1>✨ ${esc(data.title)}</h1><p class="section-sub">${esc(data.note)}</p></section><section class="paper-card iftime-table"><div class="iftime-head">${heads.map(h=>`<div>${esc(h)}</div>`).join('')}</div>${data.rows.map(r=>{const k=keyFor(r),on=!!checked[k];return `<div class="iftime-row ${on?'done':''}"><div class="iftime-check" data-label="Done"><button type="button" class="check-btn ${on?'on':''}" data-iftime-tick="${encodeURIComponent(k)}" aria-label="${on?'Mark not visited':'Mark visited'}: ${esc(r[3])}">${on?'✓':''}</button></div>${r.map((v,i)=>`<div data-label="${esc(data.headers[i])}" class="${i===3?'iftime-place':''}">${esc(v)||'—'}</div>`).join('')}</div>`}).join('')}</section><p class="schedule-note">Checked places are crossed off and saved on this device. This list is optional only — fixed bookings and protected itinerary blocks always win.</p></main>`;
  }
  function bind(){
    document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{state.view=b.dataset.view;if(typeof save==='function')save();render();scrollTo(0,0)});
    document.querySelectorAll('[data-iftime-tick]').forEach(b=>b.onclick=()=>{const k=decodeURIComponent(b.dataset.iftimeTick);checked[k]=!checked[k];saveDone();render()});
  }
  const baseRender=render;
  render=function(){
    if(state.view!=='iftime'){baseRender();return}
    document.getElementById('app').innerHTML=topbar()+view()+bottom();
    bind();
    if(typeof save==='function')save();
  };
  render();
})();