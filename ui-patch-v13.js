(function(){
  const PHOTO_SETS={
    1:[
      {title:'Narita International Airport',caption:'Narita Airport T2'},
      {title:'Narita Express',caption:"N’EX to Shinjuku"},
      {title:'Shinjuku Station',caption:'Shinjuku Station'},
      {title:'Takadanobaba',caption:'Takadanobaba'}
    ],
    2:[
      {title:'Kōtoku-in',caption:'Kamakura Daibutsu'},
      {title:'Enoshima Electric Railway',caption:'Enoden'},
      {title:'Enoshima',caption:'Enoshima'},
      {title:'Kamakura',caption:'Old Kamakura'}
    ],
    3:[
      {title:'Nakano Broadway',caption:'Nakano Broadway'},
      {title:'Shibuya 109',caption:'SHIBUYA109'},
      {title:'Shibuya',caption:'Shibuya'},
      {title:'Shinjuku',caption:'Shinjuku / Kabukicho'}
    ],
    4:[
      {title:'Tonogayato Garden',caption:'Tonogayato Garden'},
      {title:'Kokubunji, Tokyo',caption:'Kokubunji'},
      {title:'Tokyo International Forum',caption:'Tokyo International Forum'},
      {title:'Ginza',caption:'Ginza'}
    ],
    5:[
      {title:'Yokohama Red Brick Warehouse',caption:'Red Brick Warehouse'},
      {title:'Yokohama Chinatown',caption:'Yokohama Chinatown'},
      {title:'Yamashita Park',caption:'Yamashita Park'},
      {title:'Ōsanbashi Pier',caption:'Ōsanbashi Pier'}
    ],
    6:[
      {title:'Gōtoku-ji',caption:'Gotokuji Temple'},
      {title:'Nihon Minka-en',caption:'Nihon Minka-en'},
      {title:'Ikebukuro',caption:'Ikebukuro'},
      {title:'Odakyu Odawara Line',caption:'Odakyu Line'}
    ],
    7:[
      {title:'Sayama tea',caption:'Sayama tea fields'},
      {title:'Edo-Tokyo Open Air Architectural Museum',caption:'Edo-Tokyo Open Air Museum'},
      {title:'Kichijōji',caption:'Kichijoji'},
      {title:'Kagurazaka',caption:'Kagurazaka'}
    ],
    8:[
      {title:'Narita International Airport',caption:'Narita Airport T2'},
      {title:'Narita Express',caption:"N’EX 7"},
      {title:'Cebu Pacific',caption:'Cebu Pacific'},
      {title:'Iloilo International Airport',caption:'Back in Iloilo'}
    ]
  };

  const photoCache=new Map();
  function photoCards(day){
    return (PHOTO_SETS[day]||[]).map(p=>`<figure class="photo-card wiki-photo" data-wiki-title="${encodeURIComponent(p.title)}" data-wiki-caption="${encodeURIComponent(p.caption)}"><div class="photo-frame"><div class="photo-placeholder">写真</div><img alt="${p.caption}" loading="lazy" hidden></div><figcaption><b>${p.caption}</b><small class="photo-credit">Wikipedia / Wikimedia</small><a class="photo-source" target="_blank" rel="noopener noreferrer" hidden>Source</a></figcaption></figure>`).join('');
  }

  dayView=function(){
    const d=D.days.find(x=>x.day===state.day),route=routeFor(d);
    return `<main>${dayTabs('day')}${banner(d)}<div class="sheet-layout"><section class="paper-card timetable"><div class="t-head"><div>Time</div><div>✓</div><div></div><div>Plan / Activity</div><div>Location</div><div>Notes</div></div>${d.timeline.map((x,i)=>{const k=`d${d.day}-${i}`,on=!!done[k];return `<div class="t-row ${on?'done':''}"><div class="time">${x[0]}</div><div class="check-wrap"><button data-tick="${k}" class="check-btn ${on?'on':''}">${on?'✓':''}</button></div><div class="emoji">${x[1]}</div><div class="activity">${x[2]}</div><div class="location">📍 ${x[3]}</div><div class="note">${x[4]}</div></div>`}).join('')}</section><aside class="side-stack"><section class="paper-card side mint"><h2>☀️ Day Overview</h2><p>${d.overview}</p></section><section class="paper-card side blush"><h2>⭐ Priority</h2>${d.priorities.map(x=>`<p>☑ ${x}</p>`).join('')}${d.optional.map(x=>`<p>☐ ${x}</p>`).join('')}</section><section class="paper-card side"><h2>¥ Budget Estimate</h2><div class="budget-line"><span>Day allocation</span><b>${d.budget}</b></div><div class="budget-line"><span>Start</span><b>${d.start}</b></div><div class="budget-line"><span>End</span><b>${d.end}</b></div></section><section class="paper-card side"><h2>✎ Notes</h2><textarea data-note="${d.day}" placeholder="Anything to remember…">${notes[d.day]||''}</textarea></section></aside></div><section class="paper-card route-card"><b>📍 Today’s Route</b><div class="route-line">${route.map((r,i)=>`<span>${r}</span>${i<route.length-1?'<i>→</i>':''}`).join('')}</div></section><section class="paper-card photo-highlights"><div class="photo-highlights-head"><h2>♥ Highlights</h2><span>Destination photos • loads when online</span></div><div class="photo-strip">${photoCards(d.day)}</div></section></main>`;
  };

  function scheduleMarkup(src){
    const map={};
    src.forEach(r=>map[r[0]]=r[1]);
    const timeCells=[],planCells=[];
    for(let i=0;i<96;i++){
      const n=i*15,key=minsTo24(n),v=map[key]||'';
      timeCells.push(`<time class="sched-time ${v?'occupied-time':''}" style="grid-column:1;grid-row:${i+1}">${minsTo12(n)}</time>`);
    }
    for(let i=0;i<96;){
      const key=minsTo24(i*15),v=map[key]||'';
      if(!v){
        planCells.push(`<div class="sched-plan open" style="grid-column:2;grid-row:${i+1}"><span class="free-label">Open / buffer</span></div>`);
        i++;
        continue;
      }
      let span=1,label=v==='↳'?'Planned':v;
      if(v!=='↳'){
        while(i+span<96&&map[minsTo24((i+span)*15)]==='↳')span++;
      }
      planCells.push(`<div class="sched-plan occupied merged" style="grid-column:2;grid-row:${i+1}/span ${span}"><div class="merged-plan-label">${label}</div></div>`);
      i+=span;
    }
    return `<div class="sched-grid">${timeCells.join('')}${planCells.join('')}</div>`;
  }

  scheduleView=function(){
    const d=D.days.find(x=>x.day===state.scheduleDay),src=(M.schedule&&M.schedule[d.day])||SCHEDULE[d.day]||[];
    return `<main>${dayTabs('scheduleDay')}<section class="section-title"><h1>15-Min Schedule</h1><p class="section-sub">${d.date} • ${d.title}</p></section><div class="schedule-legend"><span>Pink merged block = one planned activity</span><span>White = open / buffer time</span></div><section class="paper-card full-day-schedule merged-schedule"><div class="sched-head"><div>Time</div><div>Plan</div></div>${scheduleMarkup(src)}</section><p class="schedule-note">Every 15-minute time row is still present. Consecutive occupied rows are visually merged into one activity block, matching the way the Sheet groups cells.</p></main>`;
  };

  function stripHtml(s){
    const el=document.createElement('div');
    el.innerHTML=s||'';
    return (el.textContent||'').replace(/\s+/g,' ').trim();
  }

  async function getWikiPhoto(title){
    if(photoCache.has(title))return photoCache.get(title);
    const task=(async()=>{
      const qs=new URLSearchParams({action:'query',format:'json',origin:'*',prop:'pageimages|info',inprop:'url',piprop:'thumbnail|name|original',pithumbsize:'900',titles:title});
      const res=await fetch(`https://en.wikipedia.org/w/api.php?${qs}`);
      if(!res.ok)throw new Error('Wikipedia image lookup failed');
      const data=await res.json(),page=Object.values((data.query&&data.query.pages)||{})[0];
      if(!page||!page.thumbnail||!page.thumbnail.source)throw new Error('No image');
      const out={src:page.thumbnail.source,pageUrl:page.fullurl||'',credit:'Wikipedia / Wikimedia'};
      if(page.pageimage){
        try{
          const cqs=new URLSearchParams({action:'query',format:'json',origin:'*',prop:'imageinfo',iiprop:'extmetadata',titles:`File:${page.pageimage}`});
          const cres=await fetch(`https://commons.wikimedia.org/w/api.php?${cqs}`);
          if(cres.ok){
            const cd=await cres.json(),cp=Object.values((cd.query&&cd.query.pages)||{})[0],meta=cp&&cp.imageinfo&&cp.imageinfo[0]&&cp.imageinfo[0].extmetadata;
            if(meta){
              const artist=stripHtml(meta.Artist&&meta.Artist.value),license=stripHtml(meta.LicenseShortName&&meta.LicenseShortName.value);
              out.credit=[artist,license].filter(Boolean).join(' • ')||out.credit;
            }
          }
        }catch(e){}
      }
      return out;
    })();
    photoCache.set(title,task);
    return task;
  }

  function tidyPhotoSection(){
    document.querySelectorAll('.photo-highlights').forEach(sec=>{
      if(!sec.querySelector('.wiki-photo'))sec.hidden=true;
    });
  }

  function hydrateDayPhotos(){
    document.querySelectorAll('.wiki-photo:not([data-loaded])').forEach(card=>{
      card.dataset.loaded='1';
      const title=decodeURIComponent(card.dataset.wikiTitle||'');
      getWikiPhoto(title).then(photo=>{
        if(!card.isConnected)return;
        const img=card.querySelector('img'),ph=card.querySelector('.photo-placeholder'),credit=card.querySelector('.photo-credit'),source=card.querySelector('.photo-source');
        img.src=photo.src;img.hidden=false;ph.hidden=true;
        credit.textContent=photo.credit;
        if(photo.pageUrl){source.href=photo.pageUrl;source.hidden=false;}
      }).catch(()=>{card.remove();tidyPhotoSection();});
    });
  }

  const root=document.getElementById('app');
  if(root)new MutationObserver(()=>hydrateDayPhotos()).observe(root,{childList:true,subtree:true});
  render();
  hydrateDayPhotos();
})();
