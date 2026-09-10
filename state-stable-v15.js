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

  function applyStableKeys(){
    const d=D.days.find(x=>x.day===state.day);
    if(d){
      document.querySelectorAll('[data-tick]').forEach((b,i)=>{
        const row=d.timeline[i];if(!row)return;
        const k=itineraryKey(d.day,row),on=!!done[k];
        b.dataset.tick=k;b.classList.toggle('on',on);b.textContent=on?'✓':'';
        const host=b.closest('.t-row');if(host)host.classList.toggle('done',on);
      });
    }
    const items=(M.packing&&M.packing[state.pack])||[];
    document.querySelectorAll('[data-packtick]').forEach((b,i)=>{
      const item=items[i];if(item==null)return;
      const k=packingKey(state.pack,item),on=!!packDone[k];
      b.dataset.packtick=k;b.classList.toggle('on',on);b.textContent=on?'✓':'';
      const host=b.closest('.pack-row');if(host)host.classList.toggle('done',on);
    });
  }

  const baseRender=render;
  render=function(){baseRender();applyStableKeys()};
  render();
})();
