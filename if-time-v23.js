(function(){
  const headers=['Date / Day','Area','Type','Place','Hours / Timing','When to Use','Why It Fits','Priority','Notes'];
  const groups=[
    {title:'🌸 NEAR HOTEL / EASY ANY-DAY BONUSES',tone:'hotel',rows:[
      ['ANY suitable Tokyo day','Mejiro • 1 stop from Takadanobaba','Garden / quiet local','Mejiro Garden (目白庭園)','~9:00–17:00 autumn planning; recheck closure calendar','Daytime gap near hotel / Ikebukuro','Small pond garden, waterfall, teahouse and strolling path — very close to your April-trip vibe.','⭐ HIGH','Free; ~5 min walk from Mejiro Station.'],
      ['ANY early-return evening','Takadanobaba','Essentials / snacks','Don Quijote Takadanobaba Ekimae','24 hours','Forgotten items / snacks / luggage extras','Zero-planning backup near hotel.','BACKUP','Do not replace Day 3 MEGA Donki unless plans change.'],
      ['ANY early-return evening','Takadanobaba','Karaoke','Takadanobaba Station karaoke cluster','Many branches open late; recheck same day','Only when you return early and still have energy','Easy spontaneous activity with no sightseeing detour.','MEDIUM','Pick a major chain by live wait and pricing.'],
      ['ANY easy Tokyo day','Takadanobaba / Waseda','Park / greenery','Toyama Park + Hakoneyama','Open park; free','Morning or unexpectedly early return','Quiet local greenery near home base.','LOW','No need to force it.']
    ]},
    {title:'🍜 RESTAURANTS / FOOD BACKUPS',tone:'food',rows:[
      ['ANY lunch / dinner near hotel','Takadanobaba','Ramen / izakaya','Hakata Ramen Debu Chan Takadanobaba Honten','Recheck trip week','Strong casual meal close to hotel','Well-regarded Hakata ramen, about 4 min from Takadanobaba Station.','⭐ HIGH food backup','Tabelog ~3.70 in Sep 2026; casual, no cross-city detour.'],
      ['ANY lunch / dinner near hotel','Takadanobaba','Curry','Curry Rice Senmon Ten Brother','Recheck trip week','Quick local meal around Takadanobaba','Highly regarded local curry and an easy home-base option.','⭐ HIGH food backup','Tabelog Curry TOKYO 100 selection; use only if queue is reasonable.'],
      ['ANY meal near Mejiro','Mejiro','Japanese set meal','AEN Mejiro','Recheck trip week','If Mejiro Garden becomes a spontaneous stop','Seasonal Japanese food almost beside Mejiro Station; practical garden pairing.','MEDIUM food backup','Convenient rather than a destination meal.'],
      ['ANY meal near Mejiro','Mejiro','Japanese home-style','OOTOYA Mejiro','~11:00–22:00 current listing; recheck','Easy meal after Mejiro Garden','Reliable grilled fish, meat and set meals close to Mejiro Station.','BACKUP','Chain; prioritize more distinctive options when convenient.'],
      ['Oct 24 • Day 7','Kichijoji','Casual dinner zone','Harmonica Yokocho — choose appealing open stall','Mostly evening; varies by stall','Already planned dinner zone','Flexible tiny local stalls if the first choice is full.','PLANNED','No need to lock one restaurant unless you later want certainty.']
    ]},
    {title:'🛍️ SHOPPING / ANIME / FRAGRANCE',tone:'shopping',rows:[
      ['Oct 20 • Day 3','Shinjuku','Electronics / camera','Bic Camera Shinjuku West','Recheck trip week','Only if salon timing runs early','Cameras, electronics and travel gear close to Shinjuku Station.','MEDIUM','Do not risk Lutia.'],
      ['Oct 20 • Day 3','Omotesando / Harajuku','Anime / hobby','SOOTANG HOBBY OMOTESANDO','Tue ~12:00–20:00; recheck','Only if Dr.STONE finishes early and Shibuya is comfortably ahead','Figures and collectibles directly between Omotesando and Shibuya.','⭐ HIGH if ahead','Never cut MODI or SHIBUYA109.'],
      ['Oct 20 • Day 3','Shibuya','Perfume','NOSE SHOP Shibuya','~11:00–21:00; recheck','If already near Miyashita Park','Strong niche-fragrance selection on existing Shibuya route.','MEDIUM','RAYARD MIYASHITA PARK South 2F.'],
      ['Oct 20 • Day 3','Shibuya','Shoes','ABC-MART GRAND STAGE Shibuya / atmos Shibuya','~11:00–21:00 planning reference',"Only if Onitsuka does not cover Martin's shoe target",'Backup brands and sizes in the same shopping zone.','MEDIUM','Onitsuka Tiger SHIBUYA2 remains primary.'],
      ['Oct 20 / ANY suitable Tokyo day','Nakano','Anime / collectibles','Nakano Broadway','Best treated ~12:00–19:30; shops vary','Only with a genuine 2+ hour open window','Mandarake, secondhand anime goods and rare collectibles.','STANDBY','Never force by cutting a priority stop.'],
      ['Oct 21 • Day 4','Yurakucho','Electronics / camera','Bic Camera Yurakucho','Recheck trip week','Existing 13:30–14:45 flex before MAPPA','Best geographic-fit electronics bonus in current itinerary.','⭐ HIGH optional','Beside Yurakucho / Tokyo International Forum.'],
      ['Oct 21 • Day 4','Yurakucho / Ginza','Perfume','NOSE SHOP Yurakucho / Ginza','~11:00–20:00/21:00; recheck branch','Only during real flex around MAPPA / Ginza','Niche fragrance without creating another district.','MEDIUM','Choose branch matching route.'],
      ['Oct 23 • Day 6','Ikebukuro','Keyboard / electronics','Bic Camera Ikebukuro Main + Camera & PC','Recheck trip week','Inside protected keyboard-shopping block','Useful for keyboards, computer gear and camera browsing in exact planned area.','⭐ HIGH optional','Do not shorten keyboard block or SPY buffer.'],
      ['Oct 23 • Day 6','Ikebukuro','Anime / fragrance','Animate / Otome Road / NOSE SHOP Ikebukuro','Recheck trip week','Only if keyboard shopping ends early','Strong bonus shopping cluster near theater.','LOW–MEDIUM','Protect 16:45 theater-area target.'],
      ['Oct 24 • Day 7','Kichijoji','Perfume / snacks','AUX PARADIS Atre + Sunroad food shops','Mall/shop hours; recheck','During existing Kichijoji browse','Easy fragrance and snack browsing without a detour.','MEDIUM','Use only if museum transfer is smooth.']
    ]},
    {title:'🌿 QUIET / SCENIC / ARCHITECTURE',tone:'scenic',rows:[
      ['Oct 20 • Day 3','Nishi-Shinjuku','Park / skyline','Shinjuku Central Park','Free; open daily','Only if Can★Do / Lutia morning runs ahead','Easy 15–30 min greenery break on salon side of Shinjuku.','MEDIUM','No cross-town detour.'],
      ['Oct 20 • Day 3','Shibuya','Rooftop park / city view','MIYASHITA PARK rooftop','Free; recheck park hours','If near NOSE SHOP and ahead','Compact elevated park with urban views and seating.','⭐ HIGH optional','Very easy add if already in complex.'],
      ['Oct 21 • Day 4','Yurakucho / Ginza','Park / architecture','Hibiya Park OR Tokyo International Forum glass atrium','Free; recheck building access','During pre-MAPPA flex','Choose greenery or striking architecture with almost no detour.','⭐ HIGH optional','Do one, not both, unless genuinely ahead.'],
      ['Oct 23 • Day 6','Zoshigaya / Ikebukuro','Temple / old neighborhood','Zoshigaya Kishimojindo (鬼子母神堂)','Visitor guide ~9:00–17:00; recheck','Only if a real Ikebukuro-area gap appears','Old temple, huge trees and residential lanes — nearby match to Yanaka/Nezu/Jindaiji energy.','⭐ HIGH vibe','Never threaten keyboard shopping or SPY.'],
      ['Oct 23 • Day 6','Nishi-Ikebukuro','Historic architecture','Jiyugakuen Myonichikan (自由学園明日館)','Typically Tue–Fri ~10:00–16:00; recheck visit calendar','Only with genuine 45–60 min gap before 16:00','1921 Frank Lloyd Wright-designed Important Cultural Property with peaceful lawn.','MEDIUM–HIGH','~5 min from Ikebukuro Station; ~¥500 planning reference.'],
      ['Oct 24 • Day 7','Kichijoji','Park / pond','Inokashira Park','Main park free','If you reach Kichijoji early','Pond, forested paths and relaxed local scenery minutes from station.','⭐ HIGH optional','Skip zoo/boat unless intentionally chosen.'],
      ['Oct 22 • Day 5 if Yokohama remains','Yokohama waterfront','Harbor view','Zou-no-hana Park','Public waterfront park; free','Between Osanbashi and Red Brick if ahead','Open harbor views and skyline angles with almost no detour.','HIGH if Yokohama','Remove/rework if Day 5 changes.']
    ]}
  ];
  const rows=groups.flatMap(g=>g.rows);
  window.SHioriIfTime={headers,groups,rows};
  labels.ifTime='If We Have Time';
  function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
  function read(){try{return JSON.parse(localStorage.getItem('shioriIfTimeDone')||'{}')||{}}catch(e){return {}}}
  const done=read();
  function key(r){return `ift|${r[0]}|${r[1]}|${r[3]}`}
  function save(){localStorage.setItem('shioriIfTimeDone',JSON.stringify(done))}
  function rowHtml(r){const k=key(r),on=!!done[k];return `<div class="iftime-row ${on?'done':''}"><div class="iftime-check"><button type="button" class="check-btn ${on?'on':''}" data-iftime-v23-tick="${encodeURIComponent(k)}" aria-label="${on?'Mark not visited':'Mark visited'}: ${esc(r[3])}">${on?'✓':''}</button></div>${r.map((v,i)=>`<div data-label="${esc(headers[i])}">${esc(v)}</div>`).join('')}</div>`}
  function groupHtml(g){return `<section class="iftime-group iftime-${g.tone}"><h2>${esc(g.title)}</h2><div class="iftime-table"><div class="iftime-head"><div>✓</div>${headers.map(h=>`<div>${esc(h)}</div>`).join('')}</div>${g.rows.map(rowHtml).join('')}</div></section>`}
  function view(){return `<main><section class="iftime-sheet-title"><h1>✨ IF WE HAVE TIME — NEARBY OPTIONS</h1><p>Use only when genuinely ahead or already nearby. Never sacrifice fixed bookings or protected itinerary blocks. Hours are planning references — recheck close to travel.</p></section><div class="iftime-groups">${groups.map(groupHtml).join('')}</div></main>`}
  const previousRender=render;
  render=function(){
    if(state.view!=='ifTime'){previousRender();return;}
    document.getElementById('app').innerHTML=topbar()+view()+bottom();
    document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{state.view=b.dataset.view;render();scrollTo(0,0)});
    document.querySelectorAll('[data-iftime-v23-tick]').forEach(b=>b.onclick=()=>{const k=decodeURIComponent(b.dataset.iftimeV23Tick);done[k]=!done[k];save();render()});
  };
  render();
})();