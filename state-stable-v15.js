(function(){
  function norm(v){return String(v??'').normalize('NFKC').trim().replace(/\s+/g,' ').toLowerCase()}
  function itineraryKey(day,row){return `it|${day}|${norm(row[2])}|${norm(row[3])}`}
  function packingKey(group,item){return `pack|${norm(group)}|${norm(item)}`}
  window.SHioriStableKeys={itineraryKey,packingKey};

  let migrated=false;
  D.days.forEach(d=>d.timeline.forEach((row,i)=>{
    const old=`d${d.day}-${i}`,next=itineraryKey(d.day,row);
    if(Object.prototype.hasOwnProperty.call(done,old)){
      if(done[old]&&!Object.prototype.hasOwnProperty.call(done,next))done[next]=true;
      delete done[old];migrated=true;
    }
  }));
  Object.entries(M.packing||{}).forEach(([group,items])=>items.forEach((item,i)=>{
    const old=`${group}-${i}`,next=packingKey(group,item);
    if(Object.prototype.hasOwnProperty.call(packDone,old)){
      if(packDone[old]&&!Object.prototype.hasOwnProperty.call(packDone,next))packDone[next]=true;
      delete packDone[old];migrated=true;
    }
  }));
  if(migrated)save();

  dayView=function(){
    const d=D.days.find(x=>x.day===state.day),route=routeFor(d);
    return `<main>${dayTabs('day')}${banner(d)}<div class="sheet-layout"><section class="paper-card timetable"><div class="t-head"><div>Time</div><div>✓</div><div></div><div>Plan / Activity</div><div>Location</div><div>Notes</div></div>${d.timeline.map(x=>{const k=itineraryKey(d.day,x),on=!!done[k];return `<div class="t-row ${on?'done':''}"><div class="time">${x[0]}</div><div class="check-wrap"><button data-tick="${k}" class="check-btn ${on?'on':''}">${on?'✓':''}</button></div><div class="emoji">${x[1]}</div><div class="activity">${x[2]}</div><div class="location">📍 ${x[3]}</div><div class="note">${x[4]}</div></div>`}).join('')}</section><aside class="side-stack"><section class="paper-card side mint"><h2>☀️ Day Overview</h2><p>${d.overview}</p></section><section class="paper-card side blush"><h2>⭐ Priority</h2>${d.priorities.map(x=>`<p>☑ ${x}</p>`).join('')}${d.optional.map(x=>`<p>☐ ${x}</p>`).join('')}</section><section class="paper-card side"><h2>¥ Budget Estimate</h2><div class="budget-line"><span>Day allocation</span><b>${d.budget}</b></div><div class="budget-line"><span>Start</span><b>${d.start}</b></div><div class="budget-line"><span>End</span><b>${d.end}</b></div></section><section class="paper-card side"><h2>✎ Notes</h2><textarea data-note="${d.day}" placeholder="Anything to remember…">${notes[d.day]||''}</textarea></section></aside></div><section class="paper-card route-card"><b>📍 Today’s Route</b><div class="route-line">${route.map((r,i)=>`<span>${r}</span>${i<route.length-1?'<i>→</i>':''}`).join('')}</div></section><section class="paper-card photo-highlights"><div class="photo-highlights-head"><h2>♥ Highlights</h2><span>Destination photos • loads when online</span></div><div class="photo-strip">${photoCards(d.day)}</div></section></main>`;
  };

  packingView=function(){const groups=M.packing;return `<main><section class="section-title"><h1>Packing Checklist</h1><p class="section-sub">Mirrors Cha • Martin • Both • Medicine from the packing sheet</p></section><div class="day-switch">${Object.keys(groups).map(x=>`<button data-pack="${x}" class="${x===state.pack?'active':''}">${x}</button>`).join('')}</div><section class="paper-card list-card">${groups[state.pack].map(x=>{const k=packingKey(state.pack,x),on=!!packDone[k];return `<div class="list-row pack-row ${on?'done':''}"><button class="check-btn ${on?'on':''}" data-packtick="${k}">${on?'✓':''}</button><b>${x}</b></div>`}).join('')}</section></main>`};

  render();
})();
