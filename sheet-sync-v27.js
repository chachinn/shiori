(function(){
  const D=window.SHioriData,M=window.SHioriSheetMirror,X=window.SHioriSheetExtra,S=window.SHioriFullSummary;
  if(!D||!M||!X||!S)return;

  function minutes(t){const a=t.split(':').map(Number);return a[0]*60+a[1]}
  function hhmm(n){return String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0')}
  function blocksToSlots(blocks){const out=[];for(const [s,e,label] of blocks){for(let n=minutes(s),z=minutes(e);n<=z;n+=15)out.push([hhmm(n),n===minutes(s)?label:'↳'])}return out}

  // Day 1 now includes the full Iloilo pre-airport block from the live Sheet.
  const day1=D.days&&D.days.find(d=>d.day===1);
  if(day1)Object.assign(day1,{
    start:'02:45',
    overview:'Full pre-airport prep in Iloilo, protected airport and Manila transfer buffers, then Narita arrival processing, N’EX to Shinjuku and self check-in.',
    priorities:['02:45 wake + full travel prep','~04:45 Iloilo Airport target','Manila T2 → T3 transfer buffer','Immigration + baggage without rushing','Cash + Suica','⭐ N’EX 50 if comfortable','Self check-in instructions saved offline'],
    timeline:[
      ['02:45–04:15','🌅','Wake up + full travel prep','Home / Iloilo','Shower/get ready; final bag count; passports, visa/IO documents, tickets, wallets, chargers, powerbanks and medicines.'],
      ['04:15–04:45','🚕','Travel to Iloilo International Airport','Iloilo','Protect the ~04:45 airport-arrival target.'],
      ['04:45–07:45','🛄','Check-in + security + breakfast / gate wait','Iloilo Airport','Treat the full airport block as occupied time.'],
      ['07:50–09:10','✈️','5J 448 Iloilo → Manila T2','ILO → MNL','Confirmed flight.'],
      ['09:10–12:15','🚍','NAIA T2 → T3 transfer + international buffer','Manila','Follow Cebu Pacific / NAIA baggage and transfer instructions; not free time.'],
      ['12:15–18:00','✈️','5J 5056 Manila T3 → Narita T2','MNL → NRT','Confirmed flight; arrive Terminal 2.'],
      ['18:00–19:00','🛄','Immigration + baggage','Narita T2','Move steadily; airport processing is the variable.'],
      ['~19:00 onward','💴','Cash + Suica + Japanese-number eSIM setup','Narita T2','Withdraw ¥88,000 planned cash; initial Suica load ~¥5,000/person; total trip plan ¥15,000/person.'],
      ['⭐19:53–21:18','🚆','N’EX 50 → Shinjuku','Narita T2・3 → Shinjuku','Use N’EX 52 at 20:47 if not fully ready in the JR area by ~19:30–19:35.'],
      ['~21:18 onward','🚆','Yamanote → Takadanobaba','Shinjuku → Takadanobaba','Allow ~10–15 min inside Shinjuku with luggage; then 2 stops.'],
      ['~21:40–21:55','🏠','Hananosato self check-in','Takadanobaba','If N’EX 50 works; later N’EX options shift arrival accordingly.'],
      ['After check-in','🍱','Light dinner + groceries','Near hotel','If arrival is late, default to convenience-store food.']
    ]
  });
  if(M.transport)M.transport[1]=[
    ['1','04:15–04:45','Hometown → Iloilo International Airport','Grab / car','Leave ~04:15 • target airport arrival ~04:45','Airport target is ~3h05 before the 07:50 flight.'],
    ['2','07:50–09:10','Iloilo → Manila T2','Cebu Pacific 5J 448','Confirmed flight','Airport check-in / gate-wait block before departure is occupied time, not free time.'],
    ['3','09:10–12:15','Manila T2 → Manila T3','Airport transfer + international departure process','Follow Cebu Pacific / NAIA baggage and transfer instructions','Do not treat the layover as free time; protect T2→T3 transfer, check-in/security and boarding buffer.'],
    ['4','12:15–18:00','Manila T3 → Narita T2','Cebu Pacific 5J 5056','Confirmed flight','Arrive Narita Terminal 2 at 18:00.'],
    ['5','~19:20–21:18 target','Narita Airport T2・3 → Shinjuku','JR Narita Express (N’EX)','N’EX 48 19:20→20:40 • ⭐ N’EX 50 19:53→21:18 • N’EX 52 20:47→22:09 • N’EX 54 21:47→23:12','Aim ⭐ N’EX 50. If not fully ready in JR area by ~19:30–19:35, take N’EX 52. N’EX 54 only if ticket/seat already secured before 21:45 cutoff.'],
    ['6','After N’EX arrival','Shinjuku → Takadanobaba','JR Yamanote Line','Toward Ikebukuro / Ueno • 2 stops','Allow ~10–15 min to navigate from N’EX platform with luggage; take first suitable train.'],
    ['7','~21:40–23:50 depending N’EX','Takadanobaba → Hananosato','Walk','Waseda Exit → Hananosato • ~5–8 min','Self check-in. Keep hotel address + entry instructions offline on both phones.']
  ];
  if(M.schedule)M.schedule[1]=blocksToSlots([
    ['02:45','04:00','🌅 Wake + prep • bags + documents'],['04:15','04:30','🚕 Travel to Iloilo Airport'],['04:45','07:30','🛄 ILO airport • check-in + security + breakfast/wait'],['07:45','09:00','✈️ 5J 448 • ILO → MNL T2'],['09:15','12:00','🚍 NAIA T2→T3 transfer + international buffer'],['12:15','17:45','✈️ 5J 5056 • MNL T3 → NRT T2'],['18:00','18:45','🛄 Narita • immigration + baggage'],['19:00','19:30','💴 Cash + Suica + eSIM setup'],['19:45','21:15','🚆 N’EX 50 • 19:53→21:18 NRT → Shinjuku'],['21:30','21:45','🚆 Shinjuku → Takadanobaba + walk'],['22:00','22:15','🏠 Hananosato self check-in'],['22:30','22:45','🍱 Light dinner + groceries']
  ]);

  // Day 3: the live Sheet replaced fixed Nakano with the booked Dr.STONE Omotesando session.
  const day3=D.days&&D.days.find(d=>d.day===3);
  if(day3)Object.assign(day3,{
    title:'Shinjuku + Omotesando + Shibuya + Custom Cake',
    jp:'新宿・表参道・渋谷',
    subtitle:'Hair • 100-yen finds • Dr.STONE • fashion • Donki • custom cake',
    budget:'¥225,000',start:'07:15',end:'~00:50',
    overview:'Salon morning, booked Dr.STONE PARTY vol.2 at NATSLIVE CAFE Omotesando, then protected Shibuya shopping and a planned late-night custom-cake pickup. Nakano is standby-only.',
    priorities:['Can★Do Nishi-Shinjuku','Lutia 11:00 ✅ BOOKED','Dr.STONE PARTY vol.2 14:50 ✅ BOOKED','BSD × h.NAOTO + Onitsuka','SHIBUYA109 ≥2h','MEGA Donki','Custom cake pickup after Donki — TO ORDER'],
    optional:['Yamato SPY-ticket pickup only if tracking is READY','Nakano Broadway only if a genuine ~2+ hour free window appears elsewhere','Extra shoe/perfume stops only if ahead'],
    timeline:[
      ['07:15–07:35','🌅','Morning prep + light breakfast','Hananosato','Keep breakfast simple.'],
      ['07:35–08:00','📦','Hananosato → Yamato Shinjuku Hyakunincho','Walk','Only if tracking shows the SPY tickets ready for customer pickup.'],
      ['08:00–08:15','📦','Pick up SPY×FAMILY physical tickets','Yamato Hyakunincho','Skip if tracking is not ready; bring passport + tracking number.'],
      ['08:15–08:50','🚶','Yamato → Nishi-Shinjuku / Can★Do','Shinjuku','If Yamato is skipped, use the extra time for breakfast / relaxed arrival.'],
      ['09:00–10:15','🛍️','Can★Do Nishi-Shinjuku','Nishi-Shinjuku','Primary 100-yen shopping block.'],
      ['10:15–10:45','🚶','Can★Do → Lutia + salon buffer','Shinjuku','Arrive 10–15 minutes early.'],
      ['11:00–13:30','💇‍♀️','Lutia appointment — ✅ BOOKED','Shinjuku','Cut + straightening + treatment.'],
      ['13:30–14:15','🚆','Lutia / Shinjuku → NATSLIVE CAFE Omotesando','Metro + walk','Allow ~30–40 min door-to-door; target café arrival ~14:30–14:35.'],
      ['14:50–16:00','🧪','Dr.STONE PARTY vol.2 — ✅ BOOKED 14:50','NATSLIVE CAFE Omotesando','Booked for 2. Reserved menu total ¥7,700 is NOT YET PAID; merch additional/TBD. Keep the confirmation accessible.'],
      ['16:00–16:25','🚆','Omotesando → Shibuya / MODI','Tokyo Metro Ginza Line + walk','Do not route via Nakano; continue into Shibuya.'],
      ['16:25–17:40','🐯','BSD × h.NAOTO + Onitsuka Tiger SHIBUYA2','Shibuya MODI','Prioritize both before the 20:00 close.'],
      ['17:40–17:55','🚶','MODI → SHIBUYA109','Shibuya','Allow crowd / crossing buffer.'],
      ['17:55–20:45','👗','SHIBUYA109 — PROTECTED','Shibuya','2 hr 50 min planned; do not shorten below ~2 hours.'],
      ['20:45–21:30','🍽️','Dinner / rest','Shibuya','Dr.STONE was the late lunch; eat based on appetite.'],
      ['21:30–23:45','🛒','MEGA Don Quijote','Shibuya','Leave by 23:45 for cake pickup.'],
      ['23:45–~00:15','🚆','Shibuya → Shinjuku / Kabukicho','JR Yamanote + walk','Custom cake is NOT YET ORDERED; this is the planned pickup window only.'],
      ['~00:15–00:30','🎂','夜のケーキ屋さん®️歌舞伎町 — custom cake pickup','Kabukicho','TO ORDER via official LINE. Approved design: 19 August / 14 September / 10 October, dates only.'],
      ['~00:30–00:50','🚕','Kabukicho → Hananosato','Taxi','Primary after pickup because of the fragile cake + Donki bags.'],
      ['~00:50','🏠','Back at Hananosato','Takadanobaba','End of Day 3.']
    ]
  });

  // Day 5 prep now begins at 06:30 in the Sheet.
  const day5=D.days&&D.days.find(d=>d.day===5);
  if(day5){day5.start='06:30';if(Array.isArray(day5.timeline)&&day5.timeline.length)day5.timeline[0]=['06:30–07:00','🌅','Prep + breakfast + early start','Takadanobaba','Keep breakfast simple so the Yokohama departure block stays clear.'];}

  // Day 8 now contains the perfume reserve inside the day cap.
  const day8=D.days&&D.days.find(d=>d.day===8);
  if(day8)Object.assign(day8,{budget:'¥37,000',overview:'Early airport run with time for primaniacs before security and anime shopping airside. The ¥37,000 cap already includes the ¥16,000 reserve for two primaniacs character fragrances.'});

  // Compact booking list used by older views/data consumers.
  if(Array.isArray(D.reservations)){
    const upsert=(name,row)=>{const i=D.reservations.findIndex(r=>r&&r[0]===name);if(i>=0)D.reservations[i]=row;else D.reservations.push(row)};
    upsert('Dr.STONE PARTY vol.2 — NATSLIVE CAFE Omotesando',['Dr.STONE PARTY vol.2 — NATSLIVE CAFE Omotesando','Oct 20 • 14:50','✅ BOOKED']);
    upsert('夜のケーキ屋さん®️歌舞伎町 — Custom Cake',['夜のケーキ屋さん®️歌舞伎町 — Custom Cake','Oct 21 • ~00:15','🟡 TO ORDER']);
  }

  // v24 mirrored a private Dr.STONE reservation identifier. Keep the booking status, but redact the identifier from the public app source/runtime.
  if(Array.isArray(M.planning)){
    const i=M.planning.findIndex(r=>r&&String(r[0]).includes('Dr.STONE PARTY vol.2'));
    if(i>=0)M.planning[i]=['Dr.STONE PARTY vol.2 — NATSLIVE CAFE Omotesando ✅ BOOKED DAY 3','Oct 20 14:50–16:00 BOOKED for 2 • reserved menu ¥7,700 NOT YET PAID • replaces fixed Nakano afternoon; Nakano standby-only.'];
  }
  if(Array.isArray(X.reservations)){
    const i=X.reservations.findIndex(r=>r&&r[0]==='Dr.STONE PARTY vol.2 — NATSLIVE CAFE Omotesando');
    if(i>=0)X.reservations[i]=[
      'Dr.STONE PARTY vol.2 — NATSLIVE CAFE Omotesando','Oct 20 • 14:50–16:00 CONFIRMED','Collaboration café / anime event','✅ BOOKED','REQUIRED — all dates reservation-only',
      'BOOKED for 2 people — Oct 20, 14:50 session. Keep the confirmation email accessible.','DONE — Sep 11, 2026','¥7,700 reserved menu couple — NOT YET PAID • merch additional/TBD','RESERVE — Dr.STONE PARTY vol.2',
      'CONFIRMED: Oct 20, 2026 at 14:50 for 2 people. NATSLIVE CAFE Omotesando, Ao Bldg 3F. Treat as late lunch. Reserved menu total ¥7,700 is NOT YET PAID; merch additional/TBD. The private reservation identifier remains in the Google Sheet / confirmation and is intentionally not embedded in this public app. Nakano remains standby-only.'
    ];
  }

  // Budget tab has the newest calculation: ¥681,000 daily caps + ¥7,500 baggage = ¥688,500.
  D.trip.budget='¥688,500';
  if(Array.isArray(S.meta)){
    const trip=S.meta.find(r=>r&&r[0]==='Trip cap');if(trip)trip[1]='¥688,500 couple ≈ ₱275,400';
    const sep=S.meta.find(r=>r&&String(r[0]).startsWith('Separate reserve'));if(sep){sep[0]='Separate reserve';sep[1]='Baggage ¥7,500';}
  }
  S.budget=[
    ['Daily itinerary caps','¥681,000','≈ ₱272,400','Days 1–8 combined • Day 3 already includes Martin’s shoe reserve and Day 8 already includes 2 primaniacs perfumes'],
    ['Cebu Pacific baggage reserve','¥7,500','≈ ₱3,000',''],
    ['TOTAL CONSERVATIVE TRIP CAP','¥688,500','≈ ₱275,400','Booked MAPPA admission is excluded from the remaining trip budget; Suica preload is cash-flow, not double-counted']
  ];

  window.SHioriSheetSyncVersion='2026-09-23-v27';
})();