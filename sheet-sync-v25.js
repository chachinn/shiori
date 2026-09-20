(function(){
  const D=window.SHioriData,M=window.SHioriSheetMirror,X=window.SHioriSheetExtra,S=window.SHioriFullSummary;
  if(!D||!M||!X||!S)return;

  const day4=D.days&&D.days.find(d=>d.day===4);
  if(day4)Object.assign(day4,{
    budget:'¥129,000',
    timeline:[
      ['07:15–07:55','🌅','Morning prep + breakfast','Hananosato','Gentler start after the long Day 3.'],
      ['08:00–08:45','🚆','Takadanobaba → Kokubunji','via Shinjuku','Allow ~40–45 min door-to-door.'],
      ['08:45–09:00','🌿','Quiet Kokubunji arrival / orientation','Kokubunji','Tonogayato opens at 09:00.'],
      ['09:00–10:00','🌳','Tonogayato Garden','Kokubunji','Protected 1-hour garden block.'],
      ['10:00–10:25','🚶','Tonogayato → Otaka-no-Michi / spring area','Kokubunji','Relaxed neighborhood walk.'],
      ['10:25–11:15','💧','Otaka-no-Michi + Masugata Pond + spring garden','Kokubunji','Slow spring-water / old-Kokubunji atmosphere.'],
      ['11:15–11:30','⛩️','Musashi Kokubunji historic area','Kokubunji','Atmospheric pass-through.'],
      ['11:30–12:20','🍜','Hōnenya / 豊年屋 soba lunch','Higashimotomachi','Local lunch; cash only based on current planning.'],
      ['12:20–12:45','🚶','Hōnenya → Kokubunji Station','Kokubunji','Bathroom / IC top-up if needed.'],
      ['12:45–13:30','🚆','Kokubunji → Yurakucho / Tokyo Station area','JR Chuo','Allow ~45 min door-to-door.'],
      ['13:30–15:15','☕','Yurakucho / Ginza flex + rest','Yurakucho / Ginza','Breathing room; café, bathroom, light browsing or rest.'],
      ['15:15–15:45','🎟️','Move to YURAKUCHO MUSEUM + entry buffer','Tokyo International Forum B1F','Aim to be settled by ~15:45 for the booked 16:00 entry.'],
      ['16:00–17:30','🎌','MAPPA EXPO 15th Anniversary — ✅ BOOKED','Yurakucho','Confirmed for 2 × General admission. JJK is the priority; preserve merchandise time before the 18:00 close. Ticket pickup/issuance is required before entry; keep private pickup details in the Sheet/confirmation rather than the public app source.'],
      ['17:30–17:45','🚶','MAPPA → CHA・GINZA','Yurakucho → Ginza','Short evening walk.'],
      ['17:45–18:15','🫖','CHA・GINZA / 茶・銀座','Ginza','Proper loose-leaf Japanese tea stop.'],
      ['18:15–18:50','🔪','Kiya knife shopping at Ginza Mitsukoshi','Ginza','Keep knife packaged/sealed with receipt.'],
      ['18:50–19:15','🛍️','Ginza flex','Ginza','Optional primaniacs only if clearly ahead.'],
      ['19:15–20:30','📚','Bar Lupin — BSD pilgrimage + light dinner/drinks','Ginza','Enjoy rather than rush.'],
      ['20:30–21:15','🚆','Ginza → Takadanobaba','via Nihombashi','Simple Metro return.'],
      ['~21:15–21:30','🏠','Back at Hananosato','Takadanobaba','End of Day 4.']
    ]
  });

  function mins(t){const [h,m]=t.split(':').map(Number);return h*60+m}
  function hhmm(n){return String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0')}
  function blocksToSlots(blocks){const out=[];for(const [s,e,label] of blocks){for(let n=mins(s),z=mins(e);n<=z;n+=15)out.push([hhmm(n),n===mins(s)?label:'↳'])}return out}
  if(M.schedule)M.schedule[4]=blocksToSlots([
    ['07:15','07:45','🌅 Prep + breakfast'],
    ['08:00','08:30','🚆 Takadanobaba → Kokubunji'],
    ['08:45','08:45','🌿 Quiet arrival / orientation'],
    ['09:00','09:45','🌳 Tonogayato Garden'],
    ['10:00','10:00','🚶 Tonogayato → Otaka-no-Michi / spring area'],
    ['10:15','11:00','💧 Otaka-no-Michi + Masugata Pond'],
    ['11:15','11:15','⛩️ Musashi Kokubunji historic area'],
    ['11:30','12:15','🍜 Hōnenya soba lunch'],
    ['12:30','12:30','🚶 Walk to Kokubunji Station'],
    ['12:45','13:15','🚆 Kokubunji → Yurakucho'],
    ['13:30','15:00','☕ Yurakucho/Ginza flex'],
    ['15:15','15:45','🎟️ MAPPA entry buffer • 16:00 BOOKED'],
    ['16:00','17:15','🎌 MAPPA EXPO • ✅ BOOKED 16:00'],
    ['17:30','17:30','🚶 MAPPA → CHA・GINZA'],
    ['17:45','18:00','🫖 CHA・GINZA'],
    ['18:15','18:45','🔪 Kiya knife shopping'],
    ['19:00','19:00','🟢 Ginza FLEX buffer'],
    ['19:15','20:15','📚 Bar Lupin + light dinner'],
    ['20:30','21:00','🚆 Ginza → Takadanobaba']
  ]);

  if(Array.isArray(D.reservations)){
    const i=D.reservations.findIndex(r=>r&&r[0]==='MAPPA EXPO 15th Anniversary');
    if(i>=0)D.reservations[i]=['MAPPA EXPO 15th Anniversary','Oct 21 • 16:00','✅ BOOKED'];
  }

  if(Array.isArray(X.reservations)){
    const i=X.reservations.findIndex(r=>r&&r[0]==='MAPPA EXPO 15th Anniversary');
    if(i>=0)X.reservations[i]=[
      'MAPPA EXPO 15th Anniversary','Oct 21 • 16:00','Timed event','✅ BOOKED','No — booked',
      'Reservation confirmed for 2 × General admission at 16:00. Ticket pickup/issuance is still required before entry; keep the booking details accessible.',
      'BOOKED — Sep 19, 2026','¥4,000 couple (2 × ¥2,000 General admission)','BOOKED — Overseas Lawson',
      '✅ BOOKED / CONFIRMED — Oct 21, 2026 at 16:00 for 2 × General admission. Ticket pickup/issuance is required before the 16:00 entry. Private booking number, pickup telephone and pickup-detail code remain in the Google Sheet / confirmation and are intentionally not embedded in this public GitHub Pages app.'
    ];
  }

  if(Array.isArray(X.budget)){
    const d4=X.budget.findIndex(r=>r&&String(r[0]).startsWith('Day 4 – Kokubunji + MAPPA + Ginza'));
    if(d4>=0)X.budget[d4]=[
      'Day 4 – Kokubunji + MAPPA + Ginza','¥129,000  |  ≈ ₱51,600',
      'Kokubunji transport + Tonogayato/Otaka admissions + Hōnenya / 豊年屋 soba lunch + MAPPA merchandise reserve + Ginza knife reserve ¥20,000–35,000 + CHA・GINZA tea + Bar Lupin food/drinks + contingency → safe remaining Day 4 cap is ¥129,000. MAPPA admission tickets are already booked and excluded from the remaining trip budget. Asakusa/Maekawa/rakugo are removed.'
    ];
    const total=X.budget.findIndex(r=>r&&r[0]==='TOTAL TRIP BUDGET');
    if(total>=0)X.budget[total]=[
      'TOTAL TRIP BUDGET','¥688,500  |  ≈ ₱275,400',
      'Remaining trip budget after excluding the already-booked MAPPA admission tickets. Planned purchases remain assigned to their travel days: Day 3 includes Martin\'s ¥70,000 three-pair shoe reserve; Day 8 includes the ¥16,000 reserve for 2 primaniacs perfumes. Also includes up to ₱3,000 for additional Cebu Pacific baggage.'
    ];
  }

  if(Array.isArray(S.days)){
    const i=S.days.findIndex(r=>r&&r[0]==='Oct 21 Wed');
    if(i>=0)S.days[i]=[
      'Oct 21 Wed','Day 4 • Kokubunji + MAPPA + Ginza',
      'Tonogayato Garden • Otaka-no-Michi springs • Musashi Kokubunji • Hōnenya / 豊年屋 soba • MAPPA • CHA Ginza • Kiya • Bar Lupin',
      'MAPPA 16:00 ✅ BOOKED for 2 General tickets • ticket pickup required before entry • arrive ~15:30–15:45',
      '~08:00 leave hotel','~21:15–21:30 hotel','¥129,000',
      'Yamanote→Shinjuku • ⭐ ~08:14 Chuo Rapid target→Kokubunji • ⭐ ~12:53 Chuo eastbound target→Tokyo/Yurakucho • Metro return',
      'Asakusa fully removed. Protect Tonogayato 09:00 opening + Kokubunji lunch; unagi remains on Day 6 at Hitsumabushi Nagoya Bincho Ikebukuro PARCO.'
    ];
  }
})();