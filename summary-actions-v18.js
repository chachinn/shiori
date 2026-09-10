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
