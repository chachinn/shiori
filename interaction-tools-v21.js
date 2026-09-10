(function(){
  function revealActive(strip){
    if(!strip)return;
    const active=strip.querySelector('button.active');if(!active)return;
    const left=active.offsetLeft-(strip.clientWidth-active.offsetWidth)/2;
    strip.scrollLeft=Math.max(0,left);
  }
  function keepActiveVisible(){
    requestAnimationFrame(()=>{
      revealActive(document.querySelector('.nav'));
      document.querySelectorAll('.day-switch').forEach(revealActive);
    });
  }
  function blockStart(el){
    const direct=parseInt(el.style.gridRowStart,10);if(Number.isFinite(direct))return direct-1;
    const m=(el.getAttribute('style')||'').match(/grid-row\s*:\s*(\d+)/);return m?+m[1]-1:0;
  }
  function scrollToSlot(slot){
    const cells=document.querySelectorAll('.sched-time');
    const target=cells[Math.max(0,Math.min(95,slot))];
    if(target)target.scrollIntoView({behavior:'smooth',block:'center'});
  }
  function enhanceSchedule(){
    if(state.view!=='schedule'||document.querySelector('.schedule-jump-tools'))return;
    const title=document.querySelector('.section-title');if(!title)return;
    const tools=document.createElement('div');tools.className='schedule-jump-tools';
    tools.innerHTML='<button type="button" data-schedule-now>⌖ Now</button><button type="button" data-schedule-next>→ Next plan</button>';
    title.insertAdjacentElement('afterend',tools);
    const now=new Date(),nowSlot=Math.floor((now.getHours()*60+now.getMinutes())/15);
    const tripDate=new Date(2026,9,17+state.scheduleDay);
    const selectedIsToday=tripDate.getFullYear()===now.getFullYear()&&tripDate.getMonth()===now.getMonth()&&tripDate.getDate()===now.getDate();
    tools.querySelector('[data-schedule-now]').onclick=()=>scrollToSlot(nowSlot);
    tools.querySelector('[data-schedule-next]').onclick=()=>{
      const starts=[...document.querySelectorAll('.sched-plan.occupied.merged')].map(blockStart).sort((a,b)=>a-b);
      if(!starts.length)return;
      const target=selectedIsToday?(starts.find(x=>x>=nowSlot)??starts[starts.length-1]):starts[0];
      scrollToSlot(target);
    };
  }
  const baseRender=render;
  render=function(){baseRender();enhanceSchedule();keepActiveVisible()};
  render();
})();

(function(){
  const X=window.SHioriSheetExtra;
  if(!X||!Array.isArray(X.reservations))return;
  const baseSummaryView=summaryView;
  const actionableStatus=/TO BUY|TO RESERVE|PENDING|TO ORDER|RESERVE SEATS/i;
  function escapeHtml(value){return String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]))}
  function actionRows(){
    const [heads,...rows]=X.reservations;
    const statusI=heads.indexOf('Status');
    const nameI=heads.indexOf('Reservation / Booking');
    const dateI=heads.indexOf('Date / Time');
    const todoI=heads.indexOf('What to do');
    const whenI=Math.max(heads.indexOf('Recommended reserve date'),heads.indexOf('When'));
    if([statusI,nameI,dateI,todoI].some(i=>i<0))return [];
    return rows.filter(r=>actionableStatus.test(String(r[statusI]||''))).map(r=>({name:r[nameI],date:r[dateI],status:r[statusI],todo:r[todoI],when:whenI>=0?r[whenI]:''}));
  }
  summaryView=function(){
    const html=baseSummaryView();
    const actions=actionRows();
    if(!actions.length)return html;
    const section=`<section class="paper-card action-needed"><div class="action-needed-head"><div><small>Before the trip</small><h2>⚠️ Action Needed</h2></div><span>${actions.length} open</span></div><div class="action-needed-list">${actions.map(a=>`<article class="action-needed-row"><div class="action-needed-title"><b>${escapeHtml(a.name)}</b><span>${escapeHtml(a.status)}</span></div><p>${escapeHtml(a.todo)}</p><div class="action-needed-meta"><span>📅 ${escapeHtml(a.date)}</span>${a.when?`<span>⏰ ${escapeHtml(a.when)}</span>`:''}</div></article>`).join('')}</div></section>`;
    return html.replace('<section class="paper-card budget-summary">',section+'<section class="paper-card budget-summary">');
  };
  render();
})();

(function(){
  const priorRender=render;
  function esc(v){return String(v??'')}
  function mapHref(route){
    const parts=esc(route).split('→').map(s=>s.trim()).filter(Boolean);
    if(parts.length>=2){const start=parts[0],end=parts[parts.length-1];return `https://maps.apple.com/?saddr=${encodeURIComponent(start)}&daddr=${encodeURIComponent(end)}&dirflg=r`}
    return `https://maps.apple.com/?q=${encodeURIComponent(route)}`;
  }
  async function copyText(text,button){
    try{await navigator.clipboard.writeText(text)}catch(e){const ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove()}
    const old=button.textContent;button.textContent='✓ Copied';setTimeout(()=>button.textContent=old,1200);
  }
  function enhanceTransport(){
    if(state.view!=='transport')return;
    const rows=(window.SHioriSheetMirror.transport&&window.SHioriSheetMirror.transport[state.transitDay])||[];
    document.querySelectorAll('.transport-leg').forEach((card,i)=>{
      if(card.querySelector('.travel-actions'))return;
      const r=rows[i];if(!r)return;
      const text=[r[2],r[1],r[3],r[4],r[5]].filter(Boolean).join('\n');
      const wrap=document.createElement('div');wrap.className='travel-actions';
      const map=document.createElement('a');map.className='travel-action-btn';map.href=mapHref(r[2]);map.target='_blank';map.rel='noopener';map.textContent='↗ Maps';map.setAttribute('aria-label',`Open ${r[2]} in Maps`);
      const copy=document.createElement('button');copy.type='button';copy.className='travel-action-btn';copy.textContent='⧉ Copy';copy.dataset.copyRoute=text;copy.onclick=()=>copyText(text,copy);
      wrap.append(map,copy);card.appendChild(wrap);
    });
  }
  render=function(){priorRender();enhanceTransport()};
  render();
})();

(function(){
  function statusEl(){
    let el=document.getElementById('offline-status');
    if(!el){el=document.createElement('div');el.id='offline-status';el.className='offline-status';el.setAttribute('role','status');el.setAttribute('aria-live','polite');document.body.appendChild(el)}
    return el;
  }
  function updateStatus(){
    const el=statusEl();
    const offline=!navigator.onLine;
    el.hidden=!offline;
    el.textContent=offline?'Offline mode • itinerary, schedules and saved checklists still work. Maps and live links need internet.':'';
    document.documentElement.classList.toggle('is-offline',offline);
  }
  window.addEventListener('online',()=>{updateStatus();if('serviceWorker'in navigator)navigator.serviceWorker.ready.then(r=>r.update()).catch(()=>{})});
  window.addEventListener('offline',updateStatus);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)updateStatus()});
  updateStatus();
})();
