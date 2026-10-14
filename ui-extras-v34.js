(function(){
 const X=window.SHioriSheetExtra,S=window.SHioriFullSummary;
 if(!X||!S)return;
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const insert=(html,fragment)=>html.replace('</main>',fragment+'</main>');
 const oldSummary=summaryView;
 summaryView=function(){
   const html=oldSummary();
   const r=S.readiness||[];
   if(!r.length)return html;
   const body=r.map(x=>'<article style="padding:12px 0;border-top:1px solid rgba(120,120,120,.14)"><strong>'+esc(x[1])+'</strong><small style="display:block;margin:4px 0">'+esc(x[0])+' • '+esc(x[3])+' • '+esc(x[2])+'</small><p style="margin:5px 0">'+esc(x[4])+'</p><small>'+esc(x[5])+'</small></article>').join('');
   return insert(html,'<section class="paper-card" style="padding:16px;margin-top:16px"><h2>✅ Trip Readiness — 15 items to verify</h2><p class="section-sub">October 14 cross-sheet checklist. Booking statuses are not assumed complete.</p>'+body+'</section>');
 };
 const oldBudget=budgetView;
 budgetView=function(){
   const html=oldBudget(),rows=X.day8Breakdown||[];
   if(!rows.length)return html;
   const body=rows.map(r=>'<div style="padding:8px 0;border-top:1px solid rgba(120,120,120,.12)"><b>'+esc(r[0])+'</b><p style="margin:3px 0">'+esc(r[1])+' '+esc(r[2])+'</p>'+(r[3]?'<small>'+esc(r[3])+'</small>':'')+'</div>').join('');
   return insert(html,'<section class="paper-card" style="padding:16px;margin-top:16px"><details><summary style="cursor:pointer;font-weight:700">🧾 Day 8 itemized cost — already included in ¥40,000 cap</summary><div style="margin-top:10px">'+body+'</div></details></section>');
 };
 const oldDocs=docsView;
 docsView=function(){
  const html=oldDocs(),items=X.docs?.statuses||[],rows=X.docs?.immigration||[];
  if(!items.length)return html;
  const body=items.map((r,i)=>'<div style="padding:8px 0;border-top:1px solid rgba(120,120,120,.12)"><b>'+esc(rows[i])+'</b><small style="display:block">Cha: '+esc(r.cha||'—')+' • Martin: '+esc(r.martin||'—')+'</small>'+(r.note?'<p style="margin:3px 0">'+esc(r.note)+'</p>':'')+'</div>').join('');
  return insert(html,'<section class="paper-card" style="padding:16px;margin-top:16px"><h2>📋 Document completion statuses</h2>'+body+'</section>');
 };
 render();
})();