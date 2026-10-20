(function(){
  const W=window.SHioriIfTime;
  if(W&&Array.isArray(W.groups)&&Array.isArray(W.rows)){
    const add=(title,row)=>{const g=W.groups.find(x=>x&&x.title===title);if(g&&!g.rows.some(r=>r[3]===row[3]))g.rows.push(row);if(!W.rows.some(r=>r[3]===row[3]))W.rows.push(row)};
    add('🌸 NEAR HOTEL / EASY ANY-DAY BONUSES',['ANY suitable Tokyo day','Shimo-Ochiai / Takadanobaba','Nature / spring woodland','Otomeyama Park (おとめ山公園)','07:00–17:00 in October','Only if a genuine nearby morning gap appears; removed from Day 8','Woodland, spring-fed ponds/streams and preserved Musashino-style greenery.','MEDIUM BONUS','Free; close to Takadanobaba. Day 8 now leaves Tokyo early for Narita.']);
    add('🛍️ SHOPPING / ANIME / FRAGRANCE',['ANY suitable Tokyo day / early-return evening','Takadanobaba • near hotel','Clothing / character collabs','Fashion Center Shimamura Takadanobaba','10:00–20:00 current hours; recheck trip week','Any time you are back near Takadanobaba with 30–60 min free','Very easy budget-fashion stop near home base: clothes, accessories, pajamas, bags and possible character collaborations.','⭐ HIGH easy bonus','Peacock Store Takadanobaba 2F • 1-28-7 Takadanobaba. Do not force into a fixed day because it is close enough to visit spontaneously.']);
  }

  const LOOKBOOK=[
    {day:1,date:'Oct 18 · Sun',route:'Iloilo → Manila → Narita → Takadanobaba',cha:'Brown jacket • black fitted/corset-style top • light gray wide-leg pants',martin:'Gray zip hoodie • gray sweatpants'},
    {day:2,date:'Oct 19 · Mon',route:'Kamakura • Great Buddha • coastal temples • Enoshima • Iwaya • sunset',cha:'Dusty-pink cardigan • white layered/ruffled skirt • sneakers',martin:'Cream/off-white jacket • white top • dark trousers'},
    {day:3,date:'Oct 20 · Tue',route:'Shinjuku • LUTIA • Omotesando • Dr.STONE • Shibuya shopping',cha:'Pink cardigan • pale pink skirt',martin:'Light-pink overshirt • cream top • off-white trousers'},
    {day:4,date:'Oct 21 · Wed',route:'Koganei Park • museum full 09:30–11:30 • Shibuya109 goods • New Otani OR Hibiya • MAPPA • Ginza',cha:'Textured green/brown jacket • black top • brown plaid skirt',martin:'Olive overshirt • tan T-shirt • white trousers'},
    {day:5,date:'Oct 22 · Thu',route:'Yokohama • Yamate • BSD museum • Chinatown • waterfront',cha:'Textured green/brown jacket • black top • light-blue jeans',martin:'Cream jacket • navy patterned shirt • blue jeans'},
    {day:6,date:'Oct 23 · Fri',route:'Masugata Tenjinsha • Nihon Minka-en (full 2h) • Ikebukuro • SPY musical',cha:'Brown jacket • beige top • black corset belt • white skirt • brown boots',martin:'Cream polo/overshirt • dark trousers'},
    {day:7,date:'Oct 24 · Sat',route:'Sayama tea picking • Koenji Yokai Parade • Shimokitazawa vintage/clothes shopping',cha:'Brown jacket • gray ruffled top • brown skirt • dark boots',martin:'Olive overshirt • black shirt • tan trousers'},
    {day:8,date:'Oct 25 · Sun',route:'Narita old town • sacred well garden • chrysanthemums • waterfall / ponds • calligraphy museum',cha:'Textured green/brown jacket • olive/khaki midi dress',martin:'Khaki short-sleeve shirt • white trousers'},
    {day:9,date:'Oct 26 · Mon',route:'Narita → Cebu → Iloilo',cha:'Brown jacket • black graphic top • light-gray pants',martin:'Not added to the Sheet yet'}
  ];
  const PHOTO_PARTS=Array.from({length:7},(_,i)=>`assets/outfits/lookbook-${i+1}.txt`);
  window.SHioriLookbook=LOOKBOOK;
  labels.lookbook='Outfits';

  function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
  async function hydrateLookbookPhoto(){
    const img=document.querySelector('[data-outfit-photo]');
    if(!img||img.dataset.loaded==='1')return;
    const status=document.querySelector('[data-outfit-photo-status]');
    img.dataset.loaded='1';
    try{
      const chunks=await Promise.all(PHOTO_PARTS.map(async p=>{
        const res=await fetch(p,{cache:'force-cache'});
        if(!res.ok)throw new Error(p);
        return (await res.text()).trim();
      }));
      img.src='data:image/webp;base64,'+chunks.join('');
      img.hidden=false;
      if(status)status.hidden=true;
    }catch(e){
      img.dataset.loaded='';
      if(status)status.textContent='Could not load the outfit photos. Reconnect once so Shiori can cache them for offline use.';
    }
  }

  function view(){
    return `<main>
      <section class="lookbook-title"><small>Japan trip</small><h1>Outfit Lookbook</h1><p>Oct 18–26, 2026 • actual outfit photos from the Sheet</p></section>
      <section class="paper-card lookbook-photo-card">
        <div class="lookbook-photo-head"><div><small>ACTUAL SHEET PHOTOS</small><h2>Cha + Martin</h2></div><span>Martin Day 9 is blank in the Sheet</span></div>
        <div class="lookbook-photo-status" data-outfit-photo-status>Loading outfit photos…</div>
        <img class="lookbook-photo-sheet" data-outfit-photo alt="Cha and Martin Japan outfit lookbook for Days 1 to 9" hidden>
      </section>
      <section class="lookbook-grid">${LOOKBOOK.map(d=>`<article class="paper-card lookbook-card"><div class="lookbook-card-head"><div><strong>Day ${d.day}</strong><span>${esc(d.date)}</span></div><p>${esc(d.route)}</p></div><div class="lookbook-person"><small>CHA</small><p>${esc(d.cha)}</p></div><div class="lookbook-person"><small>MARTIN</small><p>${esc(d.martin)}</p></div></article>`).join('')}</section>
    </main>`;
  }

  const previousRender=render;
  render=function(){
    if(state.view!=='lookbook'){previousRender();return;}
    document.getElementById('app').innerHTML=topbar()+view()+bottom();
    document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{state.view=b.dataset.view;render();scrollTo(0,0)});
    hydrateLookbookPhoto();
  };
  render();
})();