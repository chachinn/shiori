(function(){
  const D=window.SHioriData,M=window.SHioriSheetMirror,X=window.SHioriSheetExtra,S=window.SHioriFullSummary;
  if(!D||!M||!X||!S)return;
  const day3=D.days.find(d=>d.day===3);
  if(day3){Object.assign(day3,{
    title:'Shinjuku + Omotesando + Shibuya + Custom Cake',
    subtitle:'Hair • 100-yen • Dr.STONE • fashion • Donki • custom cake',
    budget:'¥225,000',end:'~00:50',
    overview:'Salon morning in west Shinjuku, then Dr.STONE PARTY vol.2 at NATSLIVE CAFE Omotesando, Shibuya shopping, late-night Donki, custom cake pickup in Kabukicho and taxi home. Nakano is standby only, not part of the fixed Day 3 route.',
    priorities:['Can★Do Nishi-Shinjuku','Lutia 11:00 ✅','Dr.STONE PARTY vol.2 — reserve online','BSD × h.NAOTO + Onitsuka','SHIBUYA109 ≥2h','MEGA Donki','Custom cake pickup 24:15–24:30'],
    optional:['Yamato pickup if tracking READY','NOSE SHOP / Bic Camera only if genuinely ahead','Nakano Broadway only with a genuine ~2+ hour open window elsewhere in the trip'],
    timeline:[
      ['07:15–07:35','🌅','Morning prep + light breakfast','Hananosato','Keep breakfast simple so optional Yamato pickup and the 09:00 Can★Do opening stay easy.'],
      ['07:35–08:00','🚶','Hananosato → Yamato Shinjuku Hyakunincho','Takadanobaba → Hyakunincho','Only if tracking shows the SPY tickets are waiting for customer pickup. Bring passport + tracking number.'],
      ['08:00–08:15','📦','Pick up SPY×FAMILY physical tickets','Yamato Shinjuku Hyakunincho','Confirm both tickets are present and store them securely. Skip this stop if tracking is not ready.'],
      ['08:15–08:50','🚶','Yamato → Nishi-Shinjuku / Can★Do','Shinjuku','If Yamato is skipped, use the extra time for breakfast / a relaxed arrival.'],
      ['08:50–09:00','🟢','Can★Do arrival buffer','Nishi-Shinjuku','Be near the store before opening.'],
      ['09:00–10:15','🛍️','Can★Do Nishi-Shinjuku — PRIMARY 100-yen shopping','Nishi-Shinjuku 7-21-1','Stationery, travel organizers, accessories, household/lifestyle finds and souvenirs.'],
      ['10:15–10:45','🚶','Can★Do → Lutia + salon buffer','Shinjuku','Arrive 10–15 minutes early.'],
      ['11:00–13:30','💇‍♀️','Lutia appointment ✅','Shinjuku','Booked. Allow the full appointment and slight overrun.'],
      ['13:30–14:15','🚆','Lutia / Shinjuku → NATSLIVE CAFE Omotesando','Shinjuku → Omotesando','Allow ~30–40 minutes door-to-door including station navigation and the walk to Ao Building 3F.'],
      ['14:15–14:50','🟢','Cafe arrival / reservation buffer','Omotesando','Target the closest safe reservation session after Lutia. All dates are web-reservation only.'],
      ['14:50–16:00','🧪','Dr.STONE PARTY vol.2 — RESERVATION TARGET','NATSLIVE CAFE Omotesando','Use this as the afternoon meal. Planning allowance ~¥5,000–10,000 couple for food/drinks + moderate merch.'],
      ['16:00–16:25','🚆','Omotesando → Shibuya / MODI','Tokyo Metro Ginza Line + walk','One subway stop, but allow 20–25 minutes door-to-door for Shibuya station navigation and walking.'],
      ['16:25–17:40','🐯','Shibuya MODI — BSD × h.NAOTO + Onitsuka Tiger SHIBUYA2','Shibuya MODI','Do BSD + Onitsuka together before the 20:00 close.'],
      ['17:40–17:55','🚶','MODI → SHIBUYA109','Shibuya','Short station-area walk / buffer.'],
      ['17:55–20:45','👗','SHIBUYA109 — PROTECTED','Shibuya','Protect at least ~2 hours; current plan gives ~2h50.'],
      ['20:45–21:30','🍽️','Dinner / rest','Shibuya','Keep flexible because Dr.STONE was the afternoon meal.'],
      ['21:30–23:45','🛒','MEGA Don Quijote Shibuya Honten','Shibuya','Main bulk snack/skincare/souvenir stop.'],
      ['23:45–~00:15','🚆','Shibuya → Shinjuku / Kabukicho','JR Yamanote + walk','Leave Donki by 23:45; use East Exit/Kabukicho side.'],
      ['~00:15–00:30','🎂','夜のケーキ屋さん® 歌舞伎町 — CUSTOM CAKE PICKUP','Kabukicho','Design: pink “19 August” • pink→lilac “14 September” • lilac “10 October”; dates only.'],
      ['~00:30–00:50','🚕','Taxi back to Hananosato','Kabukicho → Takadanobaba','PRIMARY after cake pickup: protects fragile cake + Donki bags and avoids last-train dependence.'],
      ['~00:50','🏠','Cake unload + settle in','Hananosato','Store/refrigerate cake as appropriate, organize purchases and rest.']
    ]
  })}

  M.transport[3]=[
    ['1','07:35–08:00','Hananosato → Yamato Shinjuku Hyakunincho','Walk','To 1-18-3 Hyakunincho','Only if tracking shows SPY tickets ready for customer pickup.'],
    ['2','08:15–08:50','Yamato → Nishi-Shinjuku / Can★Do','Walk / local navigation','Stay on west side of Shinjuku','If Yamato is skipped, use extra time for breakfast / relaxed arrival.'],
    ['3','10:15–10:45','Can★Do Nishi-Shinjuku → Lutia','Walk','Nishi-Shinjuku 7-chome → Lutia • arrive 10–15 min early','Keep the full salon buffer.'],
    ['4','13:30–14:15','Lutia / Shinjuku → NATSLIVE CAFE Omotesando','JR/Metro + walk','Allow ~30–40 min door-to-door • Ao Bldg 3F, 3-11-7 Kita-Aoyama','Target the closest safe Dr.STONE reservation session after Lutia; preserve buffer if salon runs slightly over.'],
    ['5','16:00–16:25','Omotesando → Shibuya / MODI','Tokyo Metro Ginza Line + walk','Omotesando → Shibuya • 1 stop, then station exit + walk','Allow ~20–25 min door-to-door despite the short subway ride.'],
    ['6','16:25–23:45','Shibuya MODI → SHIBUYA109 → dinner → MEGA Donki','Walk','MODI first → 109 17:55–20:45 → dinner → Donki 21:30–23:45','Protect SHIBUYA109 ≥2h.'],
    ['7','23:45–~00:50','Shibuya → Shinjuku/Kabukicho cake pickup → Takadanobaba','JR Yamanote + walk + taxi','Late Yamanote to Shinjuku; cake pickup ~00:15–00:30','After pickup, taxi is PRIMARY: fragile cake + Donki bags + avoids last-train dependence.']
  ];

  function mins(t){const [h,m]=t.split(':').map(Number);return h*60+m}
  function hhmm(n){return String(Math.floor(n/60)%24).padStart(2,'0')+':'+String(n%60).padStart(2,'0')}
  function blocksToSlots(blocks){const out=[];blocks.forEach(([start,end,label])=>{for(let n=mins(start),stop=mins(end);n<=stop;n+=15)out.push([hhmm(n),n===mins(start)?label:'↳'])});return out}
  M.schedule[3]=blocksToSlots([
    ['07:15','07:30','🌅 Prep'],['07:45','08:00','🚶 Hotel → Yamato'],['08:00','08:15','📦 SPY ticket pickup if tracking READY'],['08:15','08:45','🚶 Yamato → Can★Do'],['08:45','08:45','🟢 Arrival buffer'],['09:00','10:00','🛍️ Can★Do Nishi-Shinjuku'],['10:15','10:45','🚶 Can★Do → Lutia + salon buffer'],['11:00','13:15','💇 Lutia Shinjuku • BOOKED'],['13:30','14:15','🚆 Lutia → Omotesando'],['14:30','15:45','🧪 Dr.STONE PARTY vol.2 • RESERVE'],['15:45','16:15','🚆 Omotesando → Shibuya'],['16:15','17:30','🐯 MODI • BSD × h.NAOTO + Onitsuka'],['17:45','20:30','🛍️ SHIBUYA109 • PROTECTED'],['20:30','21:15','🍽️ Dinner / rest'],['21:30','23:30','🛒 MEGA Don Quijote'],['23:45','23:45','🚆 Shibuya → Shinjuku / Kabukicho']
  ]);

  X.reservations=[
    ['Reservation / Booking','Date / Time','Type','Status','Needs booking?','What to do','Recommended reserve date','Cost','Link','Notes'],
    ['Hananosato Takadanobaba','Oct 18–25','Hotel','✅ DONE','Required','Already booked','Done','Already booked — see confirmation','','Keep booking confirmation and self-check-in instructions accessible on arrival.'],
    ['Lutia Shinjuku','Oct 20 • 11:00','Hair appointment','✅ DONE','Required','Already reserved; arrive 10–15 minutes early.','Done','~¥18,000','','Cut + straightening + treatment. Arrive 10–15 minutes early; do not move this booking casually.'],
    ['MAPPA EXPO 15th Anniversary','Oct 21 • 15:30 target','Timed event','🟡 TO BUY / NOT YET SECURED','Required if attending','Buy 2 × JJK Goods-Set C tickets for 15:30. Use 16:00 only if 15:30 is unavailable.','NOW — Sep 10, 2026','¥8,000 couple (2 × ¥4,000 JJK Goods-Set C)','BOOK — MAPPA / Lawson','15:30 is the target; use 16:00 only if 15:30 is unavailable. JJK Goods-Set C is the planned ticket.'],
    ['Unagi-to-jizake Manmaru Honten — Ikebukuro','Oct 23 • ~13:30','Restaurant / unagi lunch','🟡 TO RESERVE','Recommended','Reserve a table for 2 around 13:30 so lunch does not eat into the protected keyboard block.','NOW — Sep 10, 2026 • Oct 23 is already selectable; submit the 13:30 request now','~¥5,000–8,000 couple','RESERVE — Manmaru','Reservation is confirmed only after the restaurant accepts it.'],
    ['Nihon Minka-en / Japan Open-Air Folk House Museum','Oct 23 • ~10:00–12:15','Open-air museum / old-Japan experience','🟢 NO RESERVATION NEEDED','No','Buy admission on arrival after Gotokuji.','Oct 23 — day of','¥1,100 couple (¥550/adult)','INFO — Nihon Minka-en','No reservation required. Protected stop.'],
    ['SPY×FAMILY 2 Musical','Oct 23 • 17:45','Physical tickets','🟠 PAID — SHIPPING / PICKUP PENDING','Already bought','Cousin sends physical tickets by Yamato Sales Office Pickup. Track before collection; bring passport + tracking number.','Already purchased • ship target Oct 19 • pickup target Oct 20 ~08:00','¥22,000 PAID — excluded from remaining trip budget','','Do NOT buy again. Primary pickup Oct 20 if tracking says ready.'],
    ['Miyanoen Sayama Tea-Picking','Oct 24 • 10:00','Experience','🔴 TO RESERVE','REQUIRED','Request 10:00 for 2 adults + chamusume outfits. Ask for outfit availability/fee and exact finish time.','NOW — Sep 10, 2026','¥4,000+ couple; chamusume outfit fee TBD','RESERVE — Miyanoen','Weather dependent; do not shorten the experience to force one bus.'],
    ['Edo-Tokyo Open Air Architectural Museum — Tokyo Grand Tea Ceremony','Oct 24 • ~13:45/14:00','Museum + optional tea ceremony','🟢 NO ADVANCE MUSEUM TICKET NEEDED','No museum booking; tea ceremony same-day only','Museum admission is free Oct 24. Optional tea ceremony tickets are same-day, first-come-first-served.','Oct 24 — same day only if you want a tea ceremony','Museum ¥0; optional tea ceremony ¥800/person','INFO — Tokyo Grand Tea Ceremony','Architecture time remains the priority.'],
    ["N'EX TOKYO Round Trip + Reserved Seats",'Oct 18 arrival + Oct 25 departure','Transport','🟡 TO BUY / RESERVE SEATS','Yes for reserved seats','Buy the round-trip ticket and reserve arrival N’EX 50. Reserve return N’EX 7 separately when its one-month window opens.','Sep 18, 10:00 JST — Oct 18 seat • Sep 25, 10:00 JST — Oct 25 seat','¥10,400 couple (¥5,200/adult round trip)','BOOK — JR EAST / N’EX','Arrival target N’EX 50; return target N’EX 7.'],
    ['Enoden Noriorikun 1-Day Pass','Oct 19','Transport','🟢 BUY SAME DAY','No reservation','Buy from the Enoden ticket machine at Kamakura Station.','Oct 19 — day of','¥1,600 couple (¥800/adult)','INFO — Noriorikun','No advance reservation needed.'],
    ['Odakyu Romancecar Enoshima No. 6','Oct 19 • 19:39 Katase-Enoshima → 20:48 Shinjuku','Transport / reserved-seat limited express','🟡 TO BUY / RESERVE','Recommended for preferred return','Buy 2 seats for Enoshima No. 6. All Romancecar seats are reserved.','Sep 19, 2026 at 10:00 JST — book when sales open','Ticketless limited-express surcharge ¥1,400 couple + base IC fare ~¥1,298 couple','BOOK — Romancecar','Preferred Day 2 return.'],
    ['Sayama / Koganei local buses','Oct 24','Transport','🟢 NO RESERVATION','No','Use the current Saturday timetable; taxi is the no-drama fallback if a connection slips.','Oct 24 — day of','Local IC/bus fares included in Day 7 transport budget','','No reservation.'],
    ['Hōnenya / 豊年屋 — Kokubunji','Oct 21 • 11:30','Local soba lunch','🟢 WALK-IN','No reservation planned','Arrive around 11:30 after the Kokubunji spring/temple area.','Oct 21 — walk in','~¥2,000–4,000 couple','','Walk-in.'],
    ['Bar Lupin','Oct 21 • ~19:15','Bar / BSD pilgrimage','🟢 WALK-IN','No','Walk in after CHA・GINZA + Kiya knife shopping.','Oct 21 — walk in','~¥6,000–10,000 couple','','Small venue; keep the purchased knife packaged/sealed with receipt.'],
    ['Dr.STONE PARTY vol.2 — NATSLIVE CAFE Omotesando','Oct 20 • 14:50–16:00 target','Collaboration café / anime event','🔴 TO RESERVE','REQUIRED — all dates reservation-only','Reserve 2 online for Oct 20. Target ~14:30 after Lutia; choose the closest safe fixed session if the portal uses preset times.','NOW — reservations opened Sep 10, 2026 at 12:00 JST','~¥5,000–10,000 couple planning allowance incl. food/drinks + moderate merch','RESERVE — Dr.STONE PARTY vol.2','Oct 2–31 at NATSLIVE CAFE Omotesando, Ao Bldg 3F. Nakano removed from fixed Day 3 plan.']
  ];

  X.budget=[
    ['💰 JAPAN TRIP BUDGET – COUPLE','Budget','Main spending breakdown'],
    ['Day 1 – Arrival + N\'EX','¥30,000 | ≈ ₱12,000',"N'EX round-trip tickets ¥10,400 + dinner/snacks + local transport/arrival expenses → ~¥30,000"],
    ['Day 2 – Kamakura + Enoshima','¥45,000 | ≈ ₱18,000','Kamakura/Enoshima transport + Enoden pass + Romancecar + attractions + meals/snacks + small shopping.'],
    ['Day 3 – Lutia + 100-Yen + Dr.STONE Omotesando + Shibuya + Donki + Custom Cake','¥225,000 | ≈ ₱90,000',"Lutia ¥18,000 + 100-yen shopping + Dr.STONE PARTY vol.2 ~¥5,000–10,000 + SHIBUYA109 ¥30,000 + MODI/Onitsuka + Martin's 3-pair shoe reserve ¥70,000 + Donki ¥50,000 + cake ¥5,000–7,000 + late-night taxi + meals/transport. Nakano is standby only. Safe cap remains ¥225,000."],
    ['Day 4 – Kokubunji + MAPPA + Ginza','¥133,000 | ≈ ₱53,200','Kokubunji + MAPPA + Ginza spending; safe cap remains ¥133,000.'],
    ['Day 5 – Yokohama + BSD Pilgrimage + Animate','¥40,000 | ≈ ₱16,000','Yamate/BSD museum + waterfront + Noge + Animate.'],
    ['Day 6 – Gotokuji + Minka-en + Manmaru Unagi + Ikebukuro Keyboards + SPY×FAMILY 2','¥150,000 | ≈ ₱60,000','SPY tickets paid/excluded + Minka-en + unagi + ¥80,000 keyboard reserve + accessories/theater merch/meals/transport.'],
    ['Day 7 – Sayama Tea + Open Air Museum + Kichijoji + Kagurazaka','¥25,000 | ≈ ₱10,000','Miyanoen + transport + museum + Kichijoji/Kagurazaka + meals/small shopping.'],
    ['Day 8 – Departure','¥37,000 | ≈ ₱14,800','Departure spend + 2 primaniacs fragrances ¥15,840 rounded reserve ¥16,000.'],
    ['✈️ Cebu Pacific additional baggage','¥7,500 | ≈ ₱3,000','Additional checked-baggage allowance / baggage upgrade reserve.'],
    ['TOTAL TRIP BUDGET','¥692,500 | ≈ ₱277,000','Day 3 includes shoes; Day 8 includes perfumes; baggage reserve included.'],
    ['💴 Physical cash to withdraw','¥88,000 | ≈ ₱35,200',''],['📱 Suica – Cha','¥15,000 | ≈ ₱6,000',''],['📱 Suica – Martin','¥15,000 | ≈ ₱6,000',''],['📱 Suica total','¥30,000 | ≈ ₱12,000','']
  ];

  const s3=S.days.findIndex(r=>String(r[1]).startsWith('Day 3'));
  if(s3>=0)S.days[s3]=['Oct 20 Tue','Day 3 • Shinjuku + Omotesando + Shibuya + Custom Cake','Yamato ticket pickup • Can★Do Nishi-Shinjuku • Lutia • Dr.STONE PARTY vol.2 NATSLIVE CAFE Omotesando • Shibuya MODI BSD × h.NAOTO + Onitsuka • SHIBUYA109 ≥2h • MEGA Donki • 夜のケーキ屋さん custom cake pickup • Nakano standby only','Lutia 11:00–13:30 ✅ booked • Dr.STONE café 14:50–16:00 🔴 reserve online • BSD × h.NAOTO before 20:00 • custom cake 🔴 order via LINE','07:35','~00:50 hotel','¥225,000','JR/local morning • Lutia → Omotesando • Metro Omotesando→Shibuya • late Yamanote Shibuya→Shinjuku • taxi after cake','Nakano is removed from the fixed Day 3 plan. Protect Dr.STONE, MODI, SHIBUYA109, Donki and cake pickup.'];

  window.SHioriIfTimeData={
    title:'If We Have Time',
    note:'Only use these when genuinely ahead / nearby. Never sacrifice fixed bookings or protected itinerary blocks. Hours are planning references — recheck close to travel.',
    headers:['Date / Day','Area','Category','Place','Typical / Current Hours','Best Time to Use','Why It Fits','Priority','Notes'],
    rows:[
['Oct 18 Sun • Day 1','Takadanobaba','Discount / essentials','Don Quijote Takadanobaba Ekimae','24 hours','After hotel check-in only if still awake / need essentials','Near hotel and station; easy emergency groceries, toiletries, snacks','LOW / backup','Do not replace Day 3 MEGA Donki unless Day 3 changes.'],
['Oct 19 Mon • Day 2','Kamakura / Enoshima','Snack / local food','Komachi / Kamakura Station local snack shops','Varies; many daytime only','Only if Renbai / morning route runs ahead','Local sweets, senbei, Kamakura snacks without creating a detour','LOW','Do not delay Great Buddha / Iwaya / sunset.'],
['Oct 20 Tue • Day 3','Shinjuku','Electronics / camera','Bic Camera Shinjuku West','Recheck trip week','Only if salon ends early / before leaving Shinjuku','Very close to Shinjuku Station; cameras, electronics, travel gear','MEDIUM','1-5-1 Nishi-Shinjuku, Shinjuku West HALC 2F–6F.'],
['Oct 20 Tue • Day 3','Shinjuku','Electronics / camera','Bic Camera Shinjuku East','Recheck trip week','Bonus only if east-side routing happens naturally','Large electronics stop; also convenient with central/east Shinjuku','LOW','3-29-1 Shinjuku.'],
['Oct 20 Tue • Day 3','Omotesando / Harajuku','Perfume','Etat Libre d\'Orange Harajuku / NOSE SHOP family','Recheck trip week','Only if Dr.STONE café finishes early','Fits Omotesando/Harajuku perfume browsing without crossing Tokyo','LOW','Dr.STONE reservation and Shibuya remain higher priority.'],
['Oct 20 Tue • Day 3','Shibuya','Perfume','NOSE SHOP Shibuya','11:00–21:00','While already near Miyashita Park','Excellent niche fragrance selection; already on Day 3 Shibuya route','MEDIUM','RAYARD MIYASHITA PARK South 2F.'],
['Oct 20 Tue • Day 3','Shibuya','Perfume','SHOLAYERED Shibuya','10:00–21:00','If passing Shibuya Scramble Square before 21:00','Japanese fragrance option, directly in Shibuya','LOW / fun','Shibuya Scramble Square 5F.'],
['Oct 20 Tue • Day 3','Shibuya','Electronics / camera','Bic Camera Shibuya Hachiko Exit','11:00–22:00','After SHIBUYA109 only if genuinely ahead','Very close to Hachiko / 109; camera and electronics without detour','MEDIUM','2-5-9 Dogenzaka.'],
['Oct 20 Tue • Day 3','Shibuya','Electronics / camera','Bic Camera Shibuya East','Recheck trip week','Only if on east side of Shibuya','Alternative Bic branch near Shibuya Station','LOW','Main building 1-24-12 Shibuya.'],
['Oct 20 Tue • Day 3','Shibuya','Shoes','Onitsuka Tiger SHIBUYA2','11:00–20:00 planning reference','Already paired with BSD at MODI','Primary Martin shoe stop; no detour','HIGH if shoes still needed','Shibuya MODI 1F–2F.'],
['Oct 20 Tue • Day 3','Shibuya','Shoes','ABC-MART GRAND STAGE Shibuya','~11:00–21:00 planning reference','If Onitsuka does not cover Martin\'s 3-pair target','Broad brands / sizes in same Shibuya zone','MEDIUM','23-8 Udagawacho.'],
['Oct 20 Tue • Day 3','Shibuya','Shoes / streetwear','atmos Shibuya','~11:00–21:00 planning reference','Only if shoe hunt needs another option','Sneaker/streetwear backup near existing route','LOW–MEDIUM','31-8 Udagawacho.'],
['Oct 20 Tue • Day 3','Shibuya','Karaoke','Karaoke Kan Shibuya','Late-night branch; recheck full hours','ONLY if dinner/Donki plan changes or you unexpectedly have late spare time','Easy spontaneous Tokyo karaoke in same nightlife area','LOW / spontaneous','Do not cut protected 109 or cake pickup.'],
['Oct 20 Tue • Day 3','Shibuya','Snacks','MEGA Don Quijote Shibuya Honten','Late / 24h-style; recheck','Already planned 21:20–23:45','Main bulk snack/skincare/souvenir stop','PLANNED','Use this before adding extra snack-store detours.'],
['Oct 20 Tue • Day 3 / ANY suitable Tokyo day','Nakano','Anime / collectibles','Nakano Broadway','Best treated ~12:00–19:30; individual shops vary','Only with a genuine ~2+ hour open window','Mandarake, secondhand anime goods, rare collectibles','STANDBY','Never force it by cutting a priority stop.'],
['Oct 21 Wed • Day 4','Yurakucho','Electronics / camera','Bic Camera Yurakucho','Recheck trip week','Best use: existing 13:30–14:45 flex before MAPPA','Excellent geographic fit beside Yurakucho / Tokyo International Forum','HIGH optional','Best Bic Camera bonus stop in current itinerary.'],
['Oct 21 Wed • Day 4','Yurakucho','Perfume','NOSE SHOP Yurakucho','11:00–21:00','During pre-MAPPA flex if Bic is not needed','LUMINE Yurakucho; directly in the day\'s area','MEDIUM','LUMINE 1 3F.'],
['Oct 21 Wed • Day 4','Ginza','Perfume','NOSE SHOP Ginza','Mon–Sat 11:00–20:00; Sun/holiday 11:00–19:30','Only if CHA Ginza / Kiya sequence runs early','Strong niche fragrance selection in Matsuya Ginza','MEDIUM','Matsuya Ginza 1F.'],
['Oct 21 Wed • Day 4','Ginza','Perfume / home fragrance','ESTEBAN GINZA','~11:00–19:00 planning reference','Only if nearby before closing','Different fragrance/home-scent option in Ginza','LOW','4-9-1 Ginza.'],
['Oct 22 Thu • Day 5 if Yokohama remains','Yokohama','Shopping / anime','Yokohama VIVRE / Animate area extras','Mall hours; recheck','Only if Animate finishes early','Already at final Yokohama stop; browse without extra transit','LOW','Day 5 is still under reconsideration; rework if Nikko replaces Yokohama.'],
['Oct 23 Fri • Day 6','Ikebukuro','Electronics / camera','Bic Camera Ikebukuro Main','Recheck trip week','During keyboard block only if useful','Huge electronics selection in the exact area already planned','HIGH optional','1-41-5 Higashi-Ikebukuro.'],
['Oct 23 Fri • Day 6','Ikebukuro','Computers / camera','Bic Camera Ikebukuro Camera & PC','Recheck trip week','During protected keyboard shopping block','Best Bic branch for computer/camera gear','HIGH optional','1-6-7 Higashi-Ikebukuro.'],
['Oct 23 Fri • Day 6','Ikebukuro','Perfume','NOSE SHOP Ikebukuro','Recheck trip week','Only if keyboard shopping finishes early','Fragrance option without leaving Ikebukuro','LOW','Keep SPY theater buffer protected.'],
['Oct 23 Fri • Day 6','Ikebukuro','Anime / character goods','Animate Ikebukuro / Otome Road area','Day/evening; recheck','Only if keyboard block ends early AND before theater buffer','Very strong anime-shopping cluster near Brillia Hall','MEDIUM','Do not compromise keyboard shopping or theater target.'],
['Oct 24 Sat • Day 7','Kichijoji','Perfume','AUX PARADIS Atre Kichijoji','Mall hours; recheck','During Kichijoji browse if ahead','Easy Japanese fragrance stop already in current optional notes','MEDIUM','Atre Kichijoji B1F.'],
['Oct 24 Sat • Day 7','Kichijoji','Snacks / food','Kichijoji Sunroad food & snack shops','Varies','17:15–18:30 browse if museum transfer is smooth','Many compact food/sweet options directly on planned route','MEDIUM','Use for snacks/pastries rather than adding a separate district.'],
['Oct 24 Sat • Day 7','Kichijoji','Restaurant / casual dinner','Harmonica Yokocho — choose appealing open stall','Mostly evening; varies by stall','Already planned dinner zone','Flexible local dinner; many tiny choices if first pick is full','PLANNED / flexible','No need to reserve one specific restaurant unless you later want certainty.'],
['ANY night • Oct 18–24','Takadanobaba','Karaoke','Takadanobaba Station karaoke cluster','Many branches open late; recheck live','Best spontaneous use after returning early to hotel','Zero sightseeing detour; easiest karaoke fallback near home base','HIGH for spontaneous karaoke','Choose a major chain near station based on live wait/pricing that night.'],
['🌿 FREE PARKS / SCENIC STOPS — ALSO ONLY IF WE HAVE TIME','Takadanobaba','Snacks / essentials','Don Quijote Takadanobaba Ekimae','24 hours','Any early-return night','Closest no-planning-required backup shopping','HIGH backup','Useful for forgotten items, drinks, snacks, luggage extras.'],
['Oct 18 Sun / ANY easy Tokyo day','Takadanobaba / Waseda','Free park / view','Toyama Park + Hakoneyama','Open park; no admission','Morning or an unexpectedly early return','Quiet greenery near home base; local break from city streets.','LOW / relaxing','Use only if energy is good; no need to force it after arrival.'],
['Oct 20 Tue • Day 3','Nishi-Shinjuku','Free park / skyline','Shinjuku Central Park','Open daily; free','If Can★Do / Lutia morning runs ahead','Large green park close to the salon side of the city; easy 15–30 min decompression stop.','MEDIUM','Best free nature option before Lutia without crossing town.'],
['Oct 20 Tue • Day 3','Nishi-Shinjuku','Free observatory / skyline','Tokyo Metropolitan Government Building Observatories','Free; hours / closures vary — recheck','Only if there is a real 45–60 min spare window before salon','High Tokyo skyline views for ¥0.','MEDIUM','Allow security/elevator queue. Skip if it risks Lutia.'],
['Oct 20 Tue • Day 3','Harajuku / Omotesando','Free park / scenery','Yoyogi Park','No fixed closing hours; free','Only if Dr.STONE / Shibuya timing leaves genuine slack','Big open green space beside Harajuku.','LOW / weather-dependent','Use only if routing naturally puts you near Harajuku.'],
['Oct 20 Tue • Day 3','Shibuya','Free rooftop park / city view','MIYASHITA PARK rooftop','Mall / park hours; free to enter rooftop park','If near NOSE SHOP / Miyashita and ahead of schedule','Compact elevated park with urban views and seating.','HIGH optional','Easy add because NOSE SHOP Shibuya is in the same complex.'],
['Oct 21 Wed • Day 4','Yurakucho / Ginza','Free park / rest','Hibiya Park','Open daily; free','During 13:30–14:45 flex only if you want greenery instead of shopping','Historic central Tokyo park with ponds, trees and benches.','HIGH optional','Excellent free alternative during MAPPA buffer.'],
['Oct 21 Wed • Day 4','Yurakucho','Free architecture / scenery','Tokyo International Forum glass atrium','Public areas free; building hours vary','Before MAPPA while already at the venue area','Striking glass architecture and elevated walkways; practically zero detour.','HIGH optional','Best 10–20 min free architectural stop on Day 4.'],
['Oct 22 Thu • Day 5 if Yokohama remains','Yokohama waterfront','Free harbor view','Zou-no-hana Park / Elephant Nose Park','Public waterfront park; free','Between Osanbashi and Red Brick if ahead','Open harbor views, lawns and skyline angles with almost no detour.','HIGH optional','Already close to current path.'],
['Oct 23 Fri • Day 6','Ikebukuro','Free park / rest','Minami-Ikebukuro Park','Public park; free','Only if lunch / keyboard shopping finishes early','Modern lawn park near Ikebukuro Station; easy reset before musical.','MEDIUM','Keep SPY theater buffer protected.'],
['Oct 24 Sat • Day 7','Kichijoji','Free park / pond','Inokashira Park','Park access free','If museum transfer is smooth and you reach Kichijoji early','Large pond, forested paths and relaxed local scenery.','HIGH optional','Natural add before Sunroad / Harmonica Yokocho.'],
['ANY evening • Oct 18–24','Shinjuku','Free night skyline','Tokyo Metropolitan Government Building night view','Free; exact closing / closed days vary','Only on an unexpectedly early-return evening','One of the easiest free night-view options in central Tokyo.','LOW / spontaneous','Check same-day opening and last-entry time first.']
    ]
  };
})();