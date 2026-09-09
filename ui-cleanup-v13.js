(function(){
  delete labels.planning;
  if(state.view==='planning')state.view='days';

  function readStore(key){
    try{return JSON.parse(localStorage.getItem(key)||'{}')||{}}catch(e){return {}}
  }
  const docDone=readStore('shioriDocDone');
  const giftDone=readStore('shioriGiftDone');
  function saveStore(key,value){localStorage.setItem(key,JSON.stringify(value))}
  function attrKey(v){return encodeURIComponent(v)}
  function rawKey(v){try{return decodeURIComponent(v)}catch(e){return v}}

  function checkRow(key,on,title,detail,attr){
    return `<div class="checklist-row ${on?'done':''}"><button class="check-btn ${on?'on':''}" ${attr}="${attrKey(key)}">${on?'✓':''}</button><div class="checklist-copy"><span class="checklist-title">${title}</span>${detail?`<small>${detail}</small>`:''}</div></div>`;
  }

  docsView=function(){
    const visa=(X.docs&&X.docs.visa)||[],imm=(X.docs&&X.docs.immigration)||[];
    return `<main><section class="section-title"><h1>Documents & Requirements</h1><p class="section-sub">Tap each item as you prepare it. Your checks stay saved on this device.</p></section><section class="paper-card checklist-card"><h2>Visa / application</h2>${visa.map(r=>{const key=`visa|${r[0]}|${r[1]||''}`;return checkRow(key,!!docDone[key],r[0],r[1]||'','data-doc-tick')}).join('')}</section><section class="paper-card checklist-card"><h2>Immigration / travel</h2>${imm.map(x=>{const key=`immigration|${x}`;return checkRow(key,!!docDone[key],x,'','data-doc-tick')}).join('')}</section></main>`;
  };

  pasalubongView=function(){
    return `<main><section class="section-title"><h1>Pasalubong List</h1><p class="section-sub">Tap items as you buy or pack them. Your checks stay saved on this device.</p></section>${Object.entries(M.pasalubong||{}).map(([group,rows])=>`<section class="paper-card checklist-card gift-checklist"><h2>${group}</h2>${rows.map(r=>{const key=`${group}|${r[0]}|${r[1]||''}`;return checkRow(key,!!giftDone[key],r[0],r[1]||'','data-gift-tick')}).join('')}</section>`).join('')}</main>`;
  };

  const baseRender=render;
  render=function(){
    baseRender();
    document.querySelectorAll('[data-doc-tick]').forEach(b=>b.onclick=()=>{const k=rawKey(b.dataset.docTick);docDone[k]=!docDone[k];saveStore('shioriDocDone',docDone);render()});
    document.querySelectorAll('[data-gift-tick]').forEach(b=>b.onclick=()=>{const k=rawKey(b.dataset.giftTick);giftDone[k]=!giftDone[k];saveStore('shioriGiftDone',giftDone);render()});
  };

  render();
})();
