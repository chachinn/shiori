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
    {day:4,date:'Oct 21 · Wed',route:'Kokubunji • gardens • temple • MAPPA EXPO • Ginza',cha:'Textured green/brown jacket • black top • brown plaid skirt',martin:'Olive overshirt • tan T-shirt • white trousers'},
    {day:5,date:'Oct 22 · Thu',route:'Yokohama • Yamate • BSD museum • Chinatown • waterfront',cha:'Textured green/brown jacket • black top • light-blue jeans',martin:'Cream jacket • navy patterned shirt • blue jeans'},
    {day:6,date:'Oct 23 · Fri',route:'Gotokuji • Nihon Minka-en • Ikebukuro • SPY musical',cha:'Brown jacket • beige top • black corset belt • white skirt • brown boots',martin:'Cream polo/overshirt • dark trousers'},
    {day:7,date:'Oct 24 · Sat',route:'Sayama tea picking • Edo-Tokyo Open Air Museum • Shimokitazawa',cha:'Brown jacket • gray ruffled top • brown skirt • dark boots',martin:'Olive overshirt • black shirt • tan trousers'},
    {day:8,date:'Oct 25 · Sun',route:'Narita • Omotesando • Shinshoji • Naritasan Park',cha:'Textured green/brown jacket • olive/khaki midi dress',martin:'Khaki short-sleeve shirt • white trousers'},
    {day:9,date:'Oct 26 · Mon',route:'Narita → Cebu → Iloilo',cha:'Brown jacket • black graphic top • light-gray pants',martin:'Not added to the Sheet yet'}
  ];
  window.SHioriLookbook=LOOKBOOK;
  labels.lookbook='Outfits';
  function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
  function view(){return `<main><section class="lookbook-title"><small>Japan trip</small><h1>Outfit Lookbook</h1><p>Oct 18–26, 2026 • mirrored from the Sheet’s new Outfit Lookbook tab</p></section><section class="paper-card lookbook-privacy"><b>🔒 Photo privacy</b><p>The source outfit photos stay in your Google Sheet. Shiori mirrors the outfit choices without copying those photos into the public GitHub Pages repo.</p></section><section class="lookbook-grid">${LOOKBOOK.map(d=>`<article class="paper-card lookbook-card"><div class="lookbook-card-head"><div><strong>Day ${d.day}</strong><span>${esc(d.date)}</span></div><p>${esc(d.route)}</p></div><div class="lookbook-person"><small>CHA</small><p>${esc(d.cha)}</p></div><div class="lookbook-person"><small>MARTIN</small><p>${esc(d.martin)}</p></div></article>`).join('')}</section></main>`}
  const previousRender=render;
  render=function(){if(state.view!=='lookbook'){previousRender();return;}document.getElementById('app').innerHTML=topbar()+view()+bottom();document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{state.view=b.dataset.view;render();scrollTo(0,0)})};
  render();
})();