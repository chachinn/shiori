(function(){
  const D=window.SHioriData,M=window.SHioriSheetMirror,X=window.SHioriSheetExtra,S=window.SHioriFullSummary;
  if(!D||!M||!X||!S)return;

  function minutes(t){const a=t.split(':').map(Number);return a[0]*60+a[1]}
  function hhmm(n){return String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0')}
  function blocksToSlots(blocks){const out=[];for(const [s,e,label] of blocks){for(let n=minutes(s),z=minutes(e);n<=z;n+=15)out.push([hhmm(n),n===minutes(s)?label:'↳'])}return out}
  const day=n=>D.days.find(d=>d.day===n);
  const replaceNote=(d,needle,note)=>{if(!d||!Array.isArray(d.timeline))return;const r=d.timeline.find(x=>String(x[2]||'').includes(needle));if(r)r[4]=note};
  const replaceActivity=(d,needle,activity,note)=>{if(!d||!Array.isArray(d.timeline))return;const r=d.timeline.find(x=>String(x[2]||'').includes(needle));if(r){r[2]=activity;if(note)r[4]=note}};
  const ensurePriority=(d,text)=>{if(d&&Array.isArray(d.priorities)&&!d.priorities.includes(text))d.priorities.push(text)};
  const compactUpsert=(needle,row)=>{if(!Array.isArray(D.reservations))return;const i=D.reservations.findIndex(r=>r&&String(r[0]).includes(needle));if(i>=0)D.reservations[i]=row;else D.reservations.push(row)};
  const extraUpsert=(needle,row)=>{if(!Array.isArray(X.reservations))return;const i=X.reservations.findIndex(r=>r&&String(r[0]).includes(needle));if(i>=0)X.reservations[i]=row;else X.reservations.push(row)};

  // Day 3: cake remains on the timed plan, but it is no longer allowed to look fully secured.
  const d3=day(3);
  replaceActivity(d3,'Custom cake pickup','Custom cake pickup — 🟡 DECIDE NOW','Only if the custom cake is ordered and prepaid. Final action is ORDER NOW or remove this pickup and its budget line rather than leaving it pending.');
  ensurePriority(d3,'Custom cake — decide now: order/prepay or remove');

  // Day 4: MAPPA is booked, but physical ticket issuance is still a pre-trip action.
  const d4=day(4);
  replaceNote(d4,'MAPPA EXPO 15th Anniversary','✅ BOOKED for Oct 21 at 16:00 for 2 General tickets. Physical ticket issuance is still required: prefer Lawson/Loppi issuance on Oct 18–20 rather than event day. Keep the private pickup details in the Sheet/confirmation, not in the public app.');
  replaceNote(d4,'Kiya knife shopping','Keep the knife fully shop-packaged/sealed with receipt. For the flights home, pack it securely in CHECKED BAGGAGE — never hand-carry it through security.');
  ensurePriority(d4,'Issue MAPPA physical tickets at Lawson/Loppi on Oct 18–20');

  // Day 6: surface the allergy action, realistic locker sizing, and updated Yamato shipment plan.
  const d6=day(6);
  replaceNote(d6,'Hitsumabushi Nagoya Bincho','✅ BOOKED for 2 at 13:30 via EBICA. ⚠️ ALLERGY ACTION BEFORE TRIP: the original reservation did not include the severe shrimp/crab allergy note. Contact the restaurant beforehand and state: エビ・カニに重いアレルギーがあります。 Aim to arrive ~13:15–13:20.');
  replaceNote(d6,'Organize Purchases','For two keyboard boxes, prefer a LARGE Ikebukuro Station locker if available. Standard/theater lockers may not fit both retail boxes. Keep tickets, passports, wallets and phones with you.');
  replaceNote(d6,'Musical','Tickets are PAID and secured. Cousin sends them by Yamato TA-Q-BIN for Sales Office Pickup using an appropriate handwritten waybill. A Japanese phone number is NOT required for this plan; get the tracking/waybill number first and collect only after tracking shows READY. Primary pickup Oct 20, fallback Oct 21, emergency Oct 23. Bring passport/ID + tracking number.');
  ensurePriority(d6,'Contact Hitsumabushi Bincho before trip about severe shrimp/crab allergy');
  ensurePriority(d6,'Use a large Ikebukuro Station locker for two keyboard boxes if needed');

  // Day 8: current Sheet adds shuttle ladders and a deeper hidden-gem Naritasan route.
  const d8=day(8);
  if(d8)Object.assign(d8,{
    subtitle:'Early Tokyo checkout • N’EX • Toyoko bag drop • hidden-gem Narita temple route • deep park loop • airport hotel',
    overview:'Leave Hananosato early, use N’EX 9 to Narita, drop luggage at the paid Toyoko Honkan, then spend a hands-free day through old Narita streets, the quieter Shinshoji halls and a protected deep Naritasan Park loop before returning to the airport hotel.',
    priorities:[
      '⭐ N’EX 9 08:05→09:25',
      '⭐ Toyoko T2 shuttle 09:55 • 10:10/10:25 backups',
      'Toyoko luggage storage — written stay-specific confirmation pending',
      '⭐ Hotel→T2 shuttle 10:45 • 11:15 backup',
      'Yakushido + old Kamicho streets',
      'Shakado → Okuyama → Komyodo',
      'Naritasan Park deep loop — NATURE PRIORITY',
      'primaniacs landside',
      'Toyoko Honkan ✅ BOOKED / PAID'
    ],
    optional:['Small Omotesando browsing only if naturally on route','18:25 / 18:45 Toyoko shuttle backups'],
    timeline:[
      ['05:45–06:20','🌅','Wake + breakfast + final prep','Hananosato','Keep breakfast simple. Most packing should already be finished the night before.'],
      ['06:20–06:50','🧳','Final room sweep + checkout','Hananosato','Chargers • adapters • medicines • passports • tickets • purchases • bathroom / cupboards / under beds. Leave with all luggage.'],
      ['06:50–07:35','🚆','Hananosato → Takadanobaba → Shinjuku N’EX platform','JR Yamanote + walk','Allow generous Shinjuku station-navigation and luggage time.'],
      ['⭐08:05–09:25','🚆','N’EX 9 → Narita Airport Terminal 2・3','Shinjuku → NRT T2・3','Use the return leg of the N’EX TOKYO Round Trip Ticket.'],
      ['⭐09:55 primary • 10:10/10:25 backups','🚌','Toyoko luggage-drop shuttle','Narita T2 bus stop 31-B','Use the next available free shuttle if 09:55 is missed/full; no unnecessary taxi.'],
      ['~10:10–10:35','🧳','Leave luggage before check-in','Toyoko Honkan','Hotel is booked/paid. Official policy supports check-in-day storage, but stay-specific written confirmation is still pending. Keep valuables/refrigerated items with you.'],
      ['⭐10:45 primary • 11:15 backup','🚌','Toyoko Honkan → Narita Airport T2','Hotel shuttle','10:45 is preferred after bag drop; 11:15 is the clean backup if storage takes longer.'],
      ['⭐~11:17–11:24','🚆','Narita Airport T2・3 → Keisei Narita','Keisei Main Line','Use first practical train if timing shifts.'],
      ['~11:30–12:30','🍱','Narita lunch','Narita Omotesando area','Choose a local Japanese meal by queue; no need for another dedicated unagi meal.'],
      ['12:30–13:10','🏮','Narita Omotesando + Yakushido + Old Kamicho Streets','Narita','Historic approach plus Yakushido, the oldest surviving Naritasan hall, and the old Kamicho/Nakacho streets and zodiac-stone details directly on route.'],
      ['13:10–14:00','⛩️','Naritasan Shinshoji — DEEPER / QUIETER ROUTE','Narita','Main Hall first, then prioritize Shakado → Okuyama open space → Komyodo rather than only the front precinct.'],
      ['14:00–16:30','🌲','Naritasan Park deep loop — NATURE PRIORITY','Narita','Go beyond the entrance: wooded paths, Yuhi-no-Taki waterfall area, three ponds and Peace Pagoda side as energy allows.'],
      ['16:30–16:55','🚶','Return toward Keisei Narita','Narita','Walk back through the temple-town area toward the station.'],
      ['~17:00–17:15','🚆','Keisei Narita → Narita Airport T2・3','Keisei Main Line','Take the first practical airport-bound service.'],
      ['~17:15–18:00','🛍️','primaniacs Character Fragrance','Narita T2 pre-security','Planned 2-perfume reserve. Recheck the live airport shop directory on the day in case of store changes.'],
      ['⭐18:05 primary • 18:25/18:45 backups','🚌','Toyoko evening return shuttle','Narita T2 bus stop 31-B','Return to the hotel; luggage is already there.'],
      ['~18:20–18:45','🏨','Check in + retrieve luggage','Toyoko Honkan','Room is booked and paid.'],
      ['19:00–20:00','🍽️','Dinner + buy early breakfast / drinks','Toyoko / nearby','Honkan breakfast starts too late for tomorrow’s flight plan, so buy breakfast/snacks tonight.'],
      ['20:00–21:00','🧳','Final luggage setup + flight prep','Toyoko Honkan','Put passports, boarding passes, liquids, chargers and airport documents where they are easy to reach.'],
      ['~21:00 onward','🌙','Early night','Toyoko Honkan','Tomorrow’s 08:55 flight uses ⭐05:10 shuttle, with 04:50 earlier and 05:30 backup.']
    ]
  });

  // Day 9: add current baggage/knife packing guard.
  const d9=day(9);
  ensurePriority(d9,'Verify checked-baggage PIECE COUNT + weight for two keyboard boxes and shopping');
  ensurePriority(d9,'Kiya knife goes securely in checked baggage only');

  M.transport[8]=[
    ['1','06:50–07:35','Hananosato → Takadanobaba → Shinjuku N’EX platform','Walk + JR Yamanote','Frequent Yamanote service','Leave Hananosato early with all luggage; do not use the full 11:00 checkout allowance.'],
    ['2','⭐08:05–09:25','Shinjuku → Narita Airport Terminal 2・3','JR Narita Express 9','N’EX 9 • Shinjuku 08:05 → T2・3 09:25','Use the RETURN leg of N’EX TOKYO Round Trip Ticket.'],
    ['3','⭐09:55 primary • 10:10 / 10:25 backups','Narita T2 → Toyoko Inn Narita Airport Honkan','Toyoko free shuttle','T2 bus stop 31-B • ⭐09:55 • 10:10 • 10:25','Use the next available hotel shuttle if 09:55 is missed/full; no need for an unnecessary taxi.'],
    ['4','~10:10–10:35','Toyoko Honkan','Luggage storage before check-in','Toyoko policy allows check-in-day storage from morning until check-in','Storage may be limited; contact hotel beforehand. No valuables/refrigerated items.'],
    ['5','⭐10:45 primary • 11:15 backup','Toyoko Honkan → Narita Airport T2','Toyoko free shuttle','⭐10:45 • 11:15','10:45 preferred; 11:15 clean backup if luggage storage takes longer.'],
    ['6','⭐~11:17–~11:24','Narita Airport T2・3 → Keisei Narita','Keisei Main Line Rapid','Sat/Holiday timetable: 11:17 Rapid from T2・3','Short ~7 min ride; use first practical train if timing shifts.'],
    ['7','~11:30–16:30','Narita lunch → Omotesando + Yakushido → Shinshoji (Shakado / Okuyama / Komyodo) → Naritasan Park deep loop','Walk','One continuous sightseeing progression','Naritasan Park is the nature priority; no baggage carried.'],
    ['8','~17:00–17:15','Keisei Narita → Airport Terminal 2・3','Keisei Main Line','First practical airport-bound service','Ride ~6–7 min.'],
    ['9','~17:15–18:00','Narita T2 landside','Walk / shopping','primaniacs pre-security • recheck live shop directory','Stay landside; flight is tomorrow.'],
    ['10','⭐18:05 primary • 18:25 / 18:45 backups','Narita T2 → Toyoko Inn Narita Airport Honkan','Toyoko free shuttle','T2 bus stop 31-B • 18:05 / 18:25 / 18:45','Return to hotel; luggage is already there.']
  ];

  M.schedule[8]=blocksToSlots([
    ['05:45','06:00','🌅 Wake + breakfast / final prep'],
    ['06:15','06:30','🧳 Final room sweep + checkout'],
    ['06:45','07:15','🚆 Hananosato → Takadanobaba → Shinjuku'],
    ['07:30','07:45','🚉 N’EX platform / boarding buffer'],
    ['08:00','09:15','🚆 ⭐ N’EX 9 • 08:05→09:25 NRT T2・3'],
    ['09:30','09:30','🚶 T2 arrivals → Toyoko shuttle stop 31-B'],
    ['09:45','10:00','🚌 ⭐09:55 primary • 10:10/10:25 backups → Toyoko Honkan'],
    ['10:15','10:30','🧳 Toyoko luggage storage before check-in'],
    ['10:45','11:00','🚌 ⭐10:45 primary • 11:15 backup → NRT T2'],
    ['11:15','11:15','🚆 ~11:17 Keisei T2 → Keisei Narita'],
    ['11:30','12:15','🍱 Narita lunch'],
    ['12:30','13:00','🏮 Omotesando + Yakushido + old Kamicho streets'],
    ['13:15','13:45','⛩️ Shinshoji + Shakado / Okuyama / Komyodo'],
    ['14:00','16:15','🌲 Naritasan Park deep loop • NATURE PRIORITY'],
    ['16:30','16:45','🚶 Return toward Keisei Narita'],
    ['17:00','17:00','🚆 Keisei Narita → NRT T2'],
    ['17:15','17:45','🛍️ primaniacs T2 • PRE-SECURITY'],
    ['18:00','18:15','🚌 ⭐18:05 primary • 18:25/18:45 backups → Toyoko'],
    ['18:30','18:45','🏨 Toyoko Honkan check-in / luggage'],
    ['19:00','19:45','🍽️ Dinner + buy early breakfast'],
    ['20:00','20:45','🧳 Final luggage + flight prep'],
    ['21:00','21:00','🌙 Early night']
  ]);

  if(D.transport)D.transport[8]=M.transport[8].map(r=>r[2]+': '+r[4]);

  // Compact booking statuses.
  compactUpsert('MAPPA EXPO',['MAPPA EXPO 15th Anniversary','Oct 21 • 16:00','✅ BOOKED • 🎟 ISSUE PHYSICAL TICKETS']);
  compactUpsert('Hitsumabushi Nagoya Bincho',['Hitsumabushi Nagoya Bincho — Ikebukuro PARCO','Oct 23 • 13:30','✅ BOOKED • 🟠 ALLERGY CONTACT PENDING']);
  compactUpsert('SPY×FAMILY 2',['SPY×FAMILY 2 Musical','Oct 23 • 17:45','🟠 PAID — SHIPPING / PICKUP PENDING']);
  compactUpsert('Miyanoen',['Miyanoen Sayama Tea-Picking','Oct 24 • 10:00','✅ BOOKED']);
  compactUpsert("N'EX",["N'EX TOKYO Round Trip + Reserved Seats",'Oct 18 + Oct 25','🟡 TO BUY / RESERVE NOW']);
  compactUpsert('Romancecar',['Odakyu Romancecar Enoshima No. 6','Oct 19 • 19:39','🟡 TO BUY / RESERVE NOW']);
  compactUpsert('Custom Cake',['夜のケーキ屋さん®️歌舞伎町 — Custom Cake','Oct 21 • ~00:15 pickup','🟡 DECIDE NOW — ORDER OR REMOVE']);
  compactUpsert('Toyoko Inn Narita Airport Honkan',['Toyoko Inn Narita Airport Honkan','Oct 25–26 • 1 night','✅ BOOKED / PAID • 🟠 BAG DROP CONFIRM PENDING']);

  // Detailed booking cards; keep private reservation/pickup identifiers in the Sheet/confirmations.
  extraUpsert('MAPPA EXPO',[
    'MAPPA EXPO 15th Anniversary','Oct 21 • 16:00','Timed event','✅ BOOKED • 🎟 PHYSICAL TICKET ISSUANCE PENDING','No — booked',
    'Reservation is confirmed for 2 General tickets. Issue the physical tickets at a Lawson/Loppi on Oct 18–20; do not leave this until event day.','BOOKED — Sep 19, 2026','¥4,000 couple (2 × ¥2,000 General admission)','BOOKED — Overseas Lawson',
    '✅ BOOKED / CONFIRMED for Oct 21 at 16:00. Physical ticket issuance is still required before entry. Private booking/pickup identifiers remain in the Google Sheet / confirmation and are intentionally not embedded in the public app.'
  ]);
  extraUpsert('Hitsumabushi Nagoya Bincho',[
    'Hitsumabushi Nagoya Bincho — Ikebukuro PARCO','Oct 23 • 13:30','Restaurant / hitsumabushi lunch','✅ BOOKED • 🟠 ALLERGY CONTACT PENDING','No',
    'Reservation confirmed for 2 at 13:30. Contact the restaurant BEFORE the trip about the severe shrimp/crab allergy, then keep the booking confirmation accessible.','BOOKED — Sep 12, 2026','~¥8,000–10,000 couple planning range','BOOKED via EBICA',
    '✅ BOOKED / CONFIRMED via EBICA. The original booking did NOT include the allergy request. Contact the restaurant beforehand and state: エビ・カニに重いアレルギーがあります。 Seat-only reservation; no prepayment shown.'
  ]);
  extraUpsert('SPY×FAMILY 2',[
    'SPY×FAMILY 2 Musical','Oct 23 • 17:45','Physical tickets','🟠 PAID — SHIPPING / PICKUP PENDING','Already bought',
    'Cousin sends the physical tickets by Yamato Sales Office Pickup using an appropriate handwritten waybill. A Japanese phone number is not required for this plan. Get tracking first; collect only when READY and bring passport/ID.','Already purchased • ship target Oct 19 • pickup target Oct 20 ~08:00','¥22,000 PAID — excluded from remaining trip budget','',
    'Do NOT buy again. Destination remains Yamato Transport Shinjuku Hyakunincho Sales Office. Primary pickup Oct 20 if tracking says ready; Oct 21 fallback; Oct 23 emergency. Keep recipient/passport details in the private shipping confirmation, not in the public app.'
  ]);
  extraUpsert('Miyanoen',[
    'Miyanoen Sayama Tea-Picking','Oct 24 • 10:00','Experience','✅ BOOKED','No — booked',
    'Reservation confirmed for 2 adults at 10:00. Chamusume outfit is confirmed. Optional pre-trip follow-up: ask the outfit fee and approximate finish time; booking itself is safe.','BOOKED — Sep 17, 2026','¥4,000+ couple; chamusume outfit fee TBD','BOOKED via email — Miyanoen',
    '✅ BOOKED / CONFIRMED for Oct 24 at 10:00 for 2 adults. Chamusume outfit will be prepared. Outfit fee and exact finish remain TBD. Weather dependent; do not shorten the experience to force one bus.'
  ]);
  extraUpsert("N'EX TOKYO",[
    "N'EX TOKYO Round Trip + Reserved Seats",'Oct 18 arrival + Oct 25 early Narita transfer','Transport / reserved seats','🟡 TO BUY / RESERVE NOW','Yes for preferred direct trains',
    'Buy the N’EX TOKYO Round Trip Ticket and reserve 2 seats for arrival N’EX 50 plus Oct 25 N’EX 9 Shinjuku→NRT T2・3.','NOW','¥10,400 couple (¥5,200/adult round trip)','BOOK — JR EAST / N’EX',
    '14-day validity covers Oct 18→Oct 25. Arrival target N’EX 50 19:53→21:18. Oct 25 target N’EX 9 08:05→09:25, chosen to catch the 09:55 Toyoko shuttle.'
  ]);
  extraUpsert('Odakyu Romancecar',[
    'Odakyu Romancecar Enoshima No. 6','Oct 19 • 19:39 Katase-Enoshima → 20:48 Shinjuku','Transport / reserved-seat limited express','🟡 TO BUY / RESERVE NOW','Recommended for preferred return',
    'Buy 2 seats for Enoshima No. 6. All Romancecar seats are reserved.','Book now','Ticketless limited-express surcharge ¥1,400 couple + base IC fare ~¥1,298 couple','BOOK — Romancecar',
    'Preferred Day 2 return. If unavailable or missed, use the best regular Odakyu connection rather than sacrificing the rest of the day.'
  ]);
  extraUpsert('Custom Cake',[
    '夜のケーキ屋さん®️歌舞伎町 — Custom Cake','Oct 21 • ~00:15 pickup (after Day 3)','Custom cake / preorder','🟡 DECIDE NOW — ORDER OR REMOVE','Required for custom design',
    'Make a final yes/no decision. If yes, order via official LINE and prepay; if no, remove the cake pickup from Day 3 and Budget rather than leaving it pending.','NOW','~¥5,000–7,000 planning range','ORDER — official LINE',
    'Kabukicho shop. Planned pickup is after Shibuya/Donki. Recheck shop acceptance and irregular holidays if ordering.'
  ]);
  extraUpsert('Toyoko Inn Narita Airport Honkan',[
    'Toyoko Inn Narita Airport Honkan','Oct 25–26 • 1 night','Airport hotel','✅ BOOKED / PAID • 🟠 BAG DROP CONFIRM PENDING','No — booked',
    'Already booked. Message the hotel now to confirm pre-check-in luggage storage for 2 adults around 10:10–10:35 Oct 25; save their written reply.','DONE — Oct 4, 2026','PAID — excluded from remaining trip budget','BOOKED via Agoda',
    '✅ BOOKED / PAID. Private booking ID remains in the confirmation and is intentionally not embedded in the public app. Shuttle ladder: T2→hotel ⭐09:55 primary, 10:10/10:25 backups; hotel→T2 ⭐10:45 primary, 11:15 backup; evening T2→hotel ⭐18:05 primary, 18:25/18:45 backups; Oct 26 airport shuttle ⭐05:10 primary.'
  ]);

  // Keep hidden Planning mirror semantically current as well.
  if(Array.isArray(M.planning)){
    const pMap=M.planning.findIndex(r=>r&&String(r[0]).includes('MAPPA EXPO'));
    if(pMap>=0)M.planning[pMap]=['MAPPA EXPO 15th Anniversary — ✅ BOOKED • physical ticket issuance pending','Issue the tickets at Lawson/Loppi on Oct 18–20; keep private pickup identifiers in the Sheet/confirmation.'];
    const pBin=M.planning.findIndex(r=>r&&String(r[0]).includes('Hitsumabushi Nagoya Bincho'));
    if(pBin>=0)M.planning[pBin]=['Hitsumabushi Nagoya Bincho — ✅ BOOKED • 🟠 ALLERGY CONTACT PENDING','BOOKED for 2 via EBICA at 13:30. Contact restaurant before trip about severe shrimp/crab allergy.'];
  }

  // Budget is unchanged, but the baggage reserve now has a piece-count/knife safety check.
  const bag=X.budget.findIndex(r=>r&&String(r[0]).includes('Cebu Pacific additional baggage'));
  if(bag>=0)X.budget[bag]=[
    '✈️ Cebu Pacific additional baggage','¥7,500  |  ≈ ₱3,000',
    'Additional checked-baggage allowance / upgrade reserve with Cebu Pacific → max ₱3,000 planning reserve. IMPORTANT: verify both BAGGAGE PIECE COUNT and total weight for the two keyboard boxes + shopping; adding kilograms does not automatically mean another checked piece. Kiya knife must travel securely in checked baggage.'
  ];

  // Trip Summary Day 8 mirrors the latest hidden-gem route and shuttle ladders.
  if(Array.isArray(S.days)&&S.days[7])S.days[7]=[
    'Oct 25 Sun','Day 8 • Early Narita + Toyoko + Naritasan Nature',
    'Early Hananosato checkout • N’EX 9 to NRT T2 • Toyoko luggage storage • Keisei Narita • lunch • Omotesando + Yakushido / old Kamicho streets • Shinshoji + Shakado / Okuyama / Komyodo • Naritasan Park deep loop • primaniacs • Toyoko',
    '⭐N’EX 9 08:05→09:25 • ⭐Toyoko T2 pickup 09:55 (10:10/10:25 backups) • ⭐hotel→T2 10:45 (11:15 backup) • Toyoko Honkan ✅ BOOKED / PAID',
    '~05:45','~18:20–18:45 Toyoko','¥40,000 • Toyoko hotel already paid/excluded',
    'Yamanote→Shinjuku • ⭐N’EX 9 • ⭐09:55 Toyoko pickup (10:10/10:25 backups) • ⭐10:45 Toyoko→T2 (11:15 backup) • Keisei to/from Narita • ⭐18:05/18:25/18:45 Toyoko shuttle',
    'Stay-specific written bag-drop confirmation is still pending; message Honkan before departure and save the reply. Naritasan Park remains the protected nature block.'
  ];

  window.SHioriSheetSyncVersion='2026-10-06-v29';
})();