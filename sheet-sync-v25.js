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


  // Reconcile reservation/status and Day 6–7 changes already present in the live Sheet.
  const day6=D.days&&D.days.find(d=>d.day===6);
  if(day6&&Array.isArray(day6.timeline)){
    const hit=day6.timeline.find(row=>row&&String(row[2]||'').includes('Hitsumabushi Nagoya Bincho'));
    if(hit){
      hit[0]='13:30–14:10';
      hit[2]='Hitsumabushi Nagoya Bincho — ✅ BOOKED 13:30';
      hit[3]='Ikebukuro PARCO Main Building 8F';
      hit[4]='Booked for 2 via EBICA; seat-only reservation. Aim to arrive around 13:15–13:20.';
    }
  }

  const day7=D.days&&D.days.find(d=>d.day===7);
  if(day7)Object.assign(day7,{
    title:'Sayama + Koganei + Kichijoji FLEX + Shimokitazawa',
    jp:'狭山・小金井・吉祥寺・下北沢',
    subtitle:'Sayama tea • historic architecture • flexible Kichijoji • vintage fashion',
    budget:'¥25,000',start:'06:30',end:'~22:10–22:20',
    overview:'Booked Sayama tea-picking with chamusume outfit, protected architecture time at Edo-Tokyo Open Air Museum, then a flexible Kichijoji stop before primary clothes shopping in Shimokitazawa.',
    priorities:['Miyanoen 10:00 ✅ BOOKED','Edo-Tokyo Open Air Museum','Shimokitazawa clothes shopping — PRIMARY'],
    optional:['Kichijoji FLEX / AUX PARADIS only if wanted','Tokyo Grand Tea Ceremony same-day tea ceremony if practical','Weather backup: Takahata Fudoson if Miyanoen cancels'],
    timeline:[
      ['06:30–06:50','🌅','Morning prep + quick breakfast','Hananosato','Keep breakfast simple and protect the 08:22 bus connection.'],
      ['06:50–08:10','🚆','Takadanobaba → Sayamashi','Seibu Shinjuku Line','⭐ 07:13 Express → 07:59 preferred; earlier backups remain available.'],
      ['08:10–09:10','🚌','Sayamashi East Exit → Miyanoen area','Seibu Bus 狭山31 + walk','⭐08:22 preferred; 08:49 comfortable backup; 09:14 last resort.'],
      ['10:00–~11:30','🍵','Miyanoen tea-picking — ✅ BOOKED','Sayama','2 adults confirmed; chamusume outfit confirmed/prepared. Exact finish and outfit fee remain TBD.'],
      ['After experience','🫖','Miyanoen tea shop / small purchase','Miyanoen','Browse briefly; do not cut the confirmed experience to force one bus.'],
      ['~11:50/12:15–13:35','🚌','Miyanoen → Sayamashi → Hana-Koganei → Koganei Park','Bus + Seibu + local bus','Take the next safe return based on actual finish; do not rush.'],
      ['~13:20–13:45','🍜','Quick lunch on arrival','Museum / event area','Use the shortest-queue option; no detour.'],
      ['~13:45/14:00–16:30','🏛️','Edo-Tokyo Open Air Museum + Tokyo Grand Tea Ceremony atmosphere','Koganei','Museum admission is FREE Oct 24; architecture remains priority.'],
      ['16:30–17:15','🚆','Koganei Park → Musashi-Koganei → Kichijoji','Bus + JR Chuo','Taxi to Musashi-Koganei is the no-drama fallback if delayed/confusing.'],
      ['17:15–18:00','🏮','Kichijoji FLEX / quick browse','Kichijoji','Optional only; skip and transfer straight through if clothes shopping is the priority.'],
      ['~18:00–18:25','🚆','Kichijoji → Shimokitazawa','Keio Inokashira Line','Direct; if skipping Kichijoji, use it only as the transfer point.'],
      ['~18:25–20:30','🛍️','Shimokitazawa vintage + clothes shopping — PRIMARY','Shimokitazawa','Shop first, eat later. Skipping Kichijoji gives roughly 30–45 min more here.'],
      ['~20:30–21:30','🍽️','Shimokitazawa dinner','South Exit / Ichibangai area','Choose by queue and appetite; no fixed restaurant needed.'],
      ['~21:30–22:10','🚆','Shimokitazawa → Takadanobaba + final-night packing','via Shinjuku','Simple default: Odakyu to Shinjuku → JR Yamanote.']
    ]
  });

  if(M.transport)M.transport[7]=[
    ['1','06:50–07:59','Takadanobaba → Sayamashi','Seibu Shinjuku Line','06:45→07:31 • 06:54→07:42 • ⭐07:13 Express→07:59','Take ⭐07:13. Go straight to East Exit / 狭山市駅東口 and bus stop #2.'],
    ['2','⭐08:22 onward','Sayamashi East Exit → Sayamadai-minami','Seibu Bus 狭山31','⭐08:22 • 08:49 • 09:14 • 09:36 • 09:53','08:22 preferred • 08:49 comfortable backup • 09:14 last resort for 10:00 Miyanoen.'],
    ['3','After bus arrival','Sayamadai-minami → Miyanoen','Walk','~10 min','Miyanoen: 25-2 Kitairiso.'],
    ['4','~11:30 onward','Miyanoen → Sayamadai-minami','Walk','~10 min','Do NOT rush the tea experience just to catch one bus.'],
    ['5','~11:43–12:42','Sayamadai-minami → Sayamashi East Exit','Seibu Bus','11:43 • ⭐12:03 • 12:22 • 12:42','Take the next safe bus based on actual Miyanoen finish time.'],
    ['6','~12:16–13:33','Sayamashi → Hana-Koganei','Seibu Shinjuku Line','12:16→12:48 • ⭐12:26 Exp→12:53 • 12:36→13:08 • 12:46 Exp→13:13 • 12:56→13:28 • 13:06 Exp→13:33','Take whichever fits the actual return bus.'],
    ['7','After Hana-Koganei arrival','Hana-Koganei South Exit → Minami-Hanakoganei bus stop','Walk','~3–5 min','Look for 南花小金井.'],
    ['8','~13:00–13:35','Minami-Hanakoganei → Koganei Park West Exit','Seibu / local bus','武12 • 武13 • 武14 • 武15 • 武21 toward 武蔵小金井駅','Get off 小金井公園西口 → ~5 min walk to museum. ⚠️ DO NOT TAKE 武17.'],
    ['9','~13:35–14:00','Koganei Park West Exit → Edo-Tokyo Open Air Museum','Walk','~5 min','Museum is inside Koganei Park.'],
    ['10','16:30 onward','Koganei Park West Exit → Musashi-Koganei Station','Bus / taxi fallback','Take next suitable bus toward 武蔵小金井駅','If confusing or >15–20 min behind, short taxi to station is the no-drama fallback.'],
    ['11','~16:45–17:15','Musashi-Koganei → Kichijoji','JR Chuo Line','Frequent service','Take first suitable train after reaching station.'],
    ['12','~18:00–18:25','Kichijoji → Shimokitazawa','Keio Inokashira Line direct','Take next direct train; express ride is about 12 min, allow ~20–25 min door-to-door.','Kichijoji is FLEX: if skipping it, use the station only to transfer from JR to Keio and continue straight to Shimokitazawa.'],
    ['13','~21:30–22:10','Shimokitazawa → Takadanobaba','Odakyu → JR Yamanote','Shimokitazawa → Shinjuku on Odakyu; transfer to JR Yamanote → Takadanobaba.','Simple default after dinner/shopping; allow station-transfer + walk buffer and recheck the fastest route on the day.']
  ];

  if(M.schedule)M.schedule[7]=blocksToSlots([
    ['06:30','06:45','🌅 Prep + quick breakfast'],
    ['07:00','07:45','🚆 Takadanobaba → Sayamashi'],
    ['08:00','08:00','🚏 Sayamashi East Exit • bus buffer'],
    ['08:15','09:00','🚌 ⭐08:22 bus → Miyanoen area + walk'],
    ['09:15','09:15','🍵 Miyanoen arrival / check-in buffer'],
    ['10:00','11:15','🍵 Miyanoen tea-picking • ✅ BOOKED • outfit confirmed'],
    ['11:30','11:30','🫖 Tea shop + walk to bus'],
    ['12:00','13:15','🚌🚆 Miyanoen → Koganei area'],
    ['13:30','13:45','🍜 Quick lunch'],
    ['14:00','16:15','🏛️ Edo-Tokyo Open Air Museum'],
    ['16:30','17:00','🚆 Museum → Kichijoji'],
    ['17:15','17:45','🏮 Kichijoji FLEX • skip for earlier Shimokitazawa'],
    ['18:00','18:15','🚆 Kichijoji → Shimokitazawa'],
    ['18:30','20:15','🛍️ Shimokitazawa clothes • PRIMARY'],
    ['20:30','21:15','🍽️ Shimokitazawa dinner'],
    ['21:30','22:00','🚆 Shimokitazawa → Takadanobaba'],
    ['22:15','22:15','🧳 Final-night packing']
  ]);

  if(Array.isArray(D.reservations)){
    const hi=D.reservations.findIndex(r=>r&&(String(r[0]).includes('Manmaru')||String(r[0]).includes('Hitsumabushi Nagoya Bincho')));
    if(hi>=0)D.reservations[hi]=['Hitsumabushi Nagoya Bincho — Ikebukuro PARCO','Oct 23 • 13:30','✅ BOOKED'];
    const mi=D.reservations.findIndex(r=>r&&String(r[0]).includes('Miyanoen'));
    if(mi>=0)D.reservations[mi]=['Miyanoen Sayama Tea-Picking','Oct 24 • 10:00','✅ BOOKED'];
  }

  if(Array.isArray(X.reservations)){
    const hi=X.reservations.findIndex(r=>r&&String(r[0]).includes('Hitsumabushi Nagoya Bincho'));
    if(hi>=0)X.reservations[hi]=[
      'Hitsumabushi Nagoya Bincho — Ikebukuro PARCO','Oct 23 • 13:30','Restaurant / hitsumabushi lunch','✅ BOOKED','No',
      'Reservation confirmed for 2 at 13:30. Keep the confirmation accessible and aim to arrive around 13:15–13:20.',
      'BOOKED — Sep 12, 2026','~¥8,000–10,000 couple planning range','BOOKED via EBICA',
      '✅ BOOKED / CONFIRMED — Oct 23 at 13:30 for 2 people. Seat-only reservation; no set course and no prepayment shown. The shrimp/crab allergy note was not attached to this reservation.'
    ];
    const mi=X.reservations.findIndex(r=>r&&String(r[0]).includes('Miyanoen'));
    if(mi>=0)X.reservations[mi]=[
      'Miyanoen Sayama Tea-Picking','Oct 24 • 10:00','Experience','✅ BOOKED','No — booked',
      'Reservation confirmed for 2 adults at 10:00. Chamusume outfit also confirmed; Miyanoen will prepare it. Keep email confirmation accessible. Outfit fee and exact finish time still TBD.',
      'BOOKED — Sep 17, 2026','¥4,000+ couple; chamusume outfit fee TBD','BOOKED via email — Miyanoen',
      '✅ BOOKED / CONFIRMED — Oct 24, 2026 at 10:00 for 2 adults. Chamusume outfit will be prepared. Outdoor agricultural experience; if cancelled due to rain/weather, Miyanoen will contact by 22:00 the previous day.'
    ];
  }

  if(Array.isArray(X.budget)){
    const d6=X.budget.findIndex(r=>r&&String(r[0]).startsWith('Day 6 – Gotokuji'));
    if(d6>=0)X.budget[d6]=[
      'Day 6 – Gotokuji + Minka-en + Hitsumabushi Bincho + Ikebukuro Keyboards + SPY×FAMILY 2','¥150,000  |  ≈ ₱60,000',
      'SPY tickets already PAID/excluded + Nihon Minka-en admission ¥1,100 couple + Gotokuji + Hitsumabushi Nagoya Bincho lunch 13:30 ✅ BOOKED (~¥8,000–10,000 couple planning range) + ¥80,000 reserve for two prebuilt gaming keyboards + accessories + theater merch + meals/transport → safe cap remains ¥150,000. Overall trip cap unchanged.'
    ];
    const d7=X.budget.findIndex(r=>r&&String(r[0]).startsWith('Day 7 – Sayama'));
    if(d7>=0)X.budget[d7]=[
      'Day 7 – Sayama Tea + Open Air Museum + Kichijoji FLEX + Shimokitazawa','¥25,000  |  ≈ ₱10,000',
      'Miyanoen tea picking ✅ BOOKED + chamusume outfit confirmed (outfit fee TBD) + Sayama/Koganei transport + Edo-Tokyo Open Air Museum (FREE admission Oct 24 during Tokyo Grand Tea Ceremony 2026) + optional/flexible Kichijoji + Shimokitazawa evening transport + dinner + tea/small shopping + optional AUX PARADIS browse → conservative operating cap remains ~¥25,000. Optional tea-ceremony participation, if chosen same-day, is covered by the existing cushion. Shimokitazawa clothing purchases are VARIABLE and are not automatically added to this day cap. The planned 2 primaniacs perfumes are budgeted on Day 8, not here.'
    ];
  }

  if(Array.isArray(S.days)){
    const d6=S.days.findIndex(r=>r&&r[0]==='Oct 23 Fri');
    if(d6>=0)S.days[d6]=[
      'Oct 23 Fri','Day 6 • Gotokuji + Minka-en + Unagi + Ikebukuro + SPY',
      'Gotokuji • Nihon Minka-en • Hitsumabushi Nagoya Bincho unagi • Ikebukuro keyboard stores • SPY×FAMILY 2 musical • optional post-show keyboard return',
      'SPY musical 17:45 ✅ paid • Bincho 13:30 ✅ BOOKED • keyboards ~14:20–16:20 PROTECTED • theater buffer from ~16:45',
      '~07:00','~23:00 hotel','¥150,000',
      '⭐ 07:21 Odakyu LOCAL Shinjuku→Gotokuji • ⭐ 09:32 Local Gotokuji→Mukogaoka-Yuen • ⭐ 12:38 Express Mukogaoka-Yuen→Shinjuku→Yamanote Ikebukuro • PARCO/East Exit → keyboard cluster',
      'Hitsumabushi Bincho is ✅ BOOKED for 13:30; keyboards BEFORE show remain primary and protected.'
    ];
    const d7=S.days.findIndex(r=>r&&r[0]==='Oct 24 Sat');
    if(d7>=0)S.days[d7]=[
      'Oct 24 Sat','Day 7 • Sayama + Koganei + Kichijoji FLEX + Shimokitazawa',
      'Miyanoen tea picking • Edo-Tokyo Open Air Museum + Tokyo Grand Tea Ceremony atmosphere • Kichijoji FLEX • Shimokitazawa vintage/clothes shopping • dinner',
      'Miyanoen 10:00 ✅ BOOKED for 2 • chamusume outfit confirmed • outfit fee/exact finish TBD • museum closes 16:30 • Oct 24 museum admission FREE during Tokyo Grand Tea Ceremony',
      '~06:50','~22:10–22:20 hotel','¥25,000',
      '⭐ 07:13 Seibu→Sayamashi 07:59 • ⭐ 08:22 bus • post-tea bus/train ladder • Kichijoji→Shimokitazawa direct Inokashira • return via Shinjuku',
      'Do not shorten Miyanoen or the museum. Kichijoji is a DAY-OF FLEX stop: keep a quick browse if wanted, or skip and transfer straight to Shimokitazawa for more clothes-shopping time. Kagurazaka removed.'
    ];
  }

})();