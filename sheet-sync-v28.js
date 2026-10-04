(function(){
  const D=window.SHioriData,M=window.SHioriSheetMirror,X=window.SHioriSheetExtra,S=window.SHioriFullSummary;
  if(!D||!M||!X||!S)return;

  function minutes(t){const a=t.split(':').map(Number);return a[0]*60+a[1]}
  function hhmm(n){return String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0')}
  function blocksToSlots(blocks){const out=[];for(const [s,e,label] of blocks){for(let n=minutes(s),z=minutes(e);n<=z;n+=15)out.push([hhmm(n),n===minutes(s)?label:'↳'])}return out}

  D.trip.title='Japan • Oct 18–26, 2026';
  D.trip.budget='¥703,500';

  // Day 1: Cebu Pacific rebooking now keeps the Manila connection in NAIA T3.
  const day1=D.days.find(d=>d.day===1);
  if(day1)Object.assign(day1,{
    start:'02:45',
    overview:'Full pre-airport prep in Iloilo, same-terminal NAIA T3 connection, Narita arrival processing, N’EX to Shinjuku and Hananosato self check-in.',
    priorities:['02:45 wake + full travel prep','~04:45 Iloilo Airport target','NAIA T3 same-terminal connection','Immigration + baggage without rushing','Cash + Suica','⭐ N’EX 50 if comfortable','Self check-in instructions saved offline'],
    timeline:[
      ['02:45–04:15','🌅','Wake up + full travel prep','Home / Iloilo','Shower/get ready; final bag count; passports, visa/IO documents, tickets, wallets, chargers, powerbanks and medicines.'],
      ['04:15–04:45','🚕','Travel to Iloilo International Airport','Iloilo','Protect the ~04:45 airport-arrival target.'],
      ['04:45–07:45','🛄','Check-in + security + breakfast / gate wait','Iloilo Airport','Treat the full airport block as occupied time.'],
      ['07:50–09:10','✈️','5J 448 Iloilo → Manila T3','ILO → MNL','Latest rebooking confirmation shows NAIA Terminal 3 arrival.'],
      ['09:10–12:15','🛄','NAIA T3 same-terminal international connection + buffer','Manila T3','No T2→T3 transfer. Follow Cebu Pacific baggage/connection instructions and protect departure formalities.'],
      ['12:15–18:00','✈️','5J 5056 Manila T3 → Narita T2','MNL → NRT','Confirmed flight; arrive Terminal 2.'],
      ['18:00–19:00','🛄','Immigration + baggage','Narita T2','Move steadily; airport processing is the variable.'],
      ['~19:00 onward','💴','Cash + Suica + Japanese-number eSIM setup','Narita T2','Withdraw ¥88,000 planned cash; initial Suica load ~¥5,000/person; total trip plan ¥15,000/person.'],
      ['⭐19:53–21:18','🚆','N’EX 50 → Shinjuku','Narita T2・3 → Shinjuku','Use N’EX 52 at 20:47 if not fully ready in the JR area by ~19:30–19:35.'],
      ['~21:18 onward','🚆','Yamanote → Takadanobaba','Shinjuku → Takadanobaba','Allow ~10–15 min inside Shinjuku with luggage; then 2 stops.'],
      ['~21:40–21:55','🏠','Hananosato self check-in','Takadanobaba','If N’EX 50 works; later N’EX options shift arrival accordingly.'],
      ['After check-in','🍱','Light dinner + groceries','Near hotel','If arrival is late, default to convenience-store food.']
    ]
  });

  // Day 4 / 6 / 7 live-timetable refinements.
  const day4=D.days.find(d=>d.day===4);
  if(day4&&Array.isArray(day4.timeline)){
    const r=day4.timeline.find(x=>String(x[2]||'').includes('Kokubunji → Yurakucho'));
    if(r){r[0]='12:45–~13:40';r[2]='Kokubunji → Yurakucho / Tokyo Station area';r[4]='⭐ 12:57 Chuo Special Rapid → Tokyo 13:32, then walk / short local connection toward Yurakucho. The old 12:53 target is not in the Oct 2026 weekday timetable.';}
  }

  const day6=D.days.find(d=>d.day===6);
  if(day6&&Array.isArray(day6.timeline)){
    const a=day6.timeline.find(x=>String(x[2]||'').includes('Gotokuji → Nihon Minka-en'));
    if(a){a[0]='09:05–~09:55';a[4]='⭐ 09:20 Odakyu LOCAL → Mukogaoka-Yuen 09:41; 09:31→09:49 is the clean backup, then ~13 min walk.';}
    const b=day6.timeline.find(x=>String(x[2]||'').includes('Minka-en → Ikebukuro'));
    if(b){b[0]='12:05–~13:20';b[4]='Leave museum ~12:05 → walk to Mukogaoka-Yuen → ⭐12:27 Odakyu Express DIRECT to Shinjuku 12:52 → Yamanote to Ikebukuro; aim PARCO ~13:15–13:20.';}
  }

  const day7=D.days.find(d=>d.day===7);
  if(day7&&Array.isArray(day7.timeline)){
    const r=day7.timeline.find(x=>String(x[2]||'').includes('Miyanoen → Sayamashi'));
    if(r){r[0]='~11:50/12:15–~13:25';r[4]='Return-bus ladder 11:43 / ⭐12:03 / 12:22 / 12:42. Preferred matching train ⭐12:26 Express → Hana-Koganei 12:53, then walk to 花小金井駅入口 stop #4 and use ~13:05 / 13:09 / 13:16 bus to 小金井公園西口.';}
  }

  // Day 8 is now a Narita sightseeing + airport-hotel day.
  const day8=D.days.find(d=>d.day===8);
  if(day8)Object.assign(day8,{
    date:'Sun, Oct 25',
    title:'Early Narita + Toyoko + Naritasan Nature',
    jp:'成田・成田山',
    subtitle:'Early Tokyo checkout • N’EX • luggage drop • old town • temple • park • airport hotel',
    budget:'¥40,000',start:'05:45',end:'~21:00',
    overview:'Leave Hananosato early, use N’EX 9 to Narita, drop luggage at the paid Toyoko Honkan, then spend a hands-free nature-focused day around Naritasan before returning to the airport hotel.',
    priorities:['⭐ N’EX 9 08:05→09:25','⭐ Toyoko T2 shuttle 09:55','Toyoko luggage storage before check-in','Naritasan Shinshoji','Naritasan Park — NATURE PRIORITY','primaniacs landside','Toyoko Honkan ✅ BOOKED / PAID'],
    optional:['Small Narita Omotesando browsing','18:25 Toyoko shuttle backup'],
    timeline:[
      ['05:45–06:20','🌅','Wake + breakfast + final prep','Hananosato','Most packing should already be finished the night before.'],
      ['06:20–06:50','🧳','Final room sweep + checkout','Hananosato','Leave with all luggage; checkout deadline is later, but today intentionally starts early.'],
      ['06:50–07:35','🚆','Hananosato → Takadanobaba → Shinjuku N’EX platform','JR Yamanote + walk','Allow generous Shinjuku station-navigation and luggage time.'],
      ['⭐08:05–09:25','🚆','N’EX 9 → Narita Airport Terminal 2・3','Shinjuku → NRT T2・3','Use the Oct 25 return leg of the N’EX TOKYO Round Trip Ticket.'],
      ['⭐09:55','🚌','Toyoko luggage-drop shuttle','Narita T2 bus stop 31-B','Narita T2 → Toyoko Inn Narita Airport Honkan • official free hotel shuttle.'],
      ['~10:10–10:35','🧳','Leave luggage before check-in','Toyoko Honkan','Hotel is booked/paid. Morning luggage storage is allowed subject to capacity; keep valuables with you.'],
      ['⭐10:45','🚌','Toyoko Honkan → Narita Airport T2','Hotel shuttle','Return to the airport transport hub hands-free.'],
      ['⭐~11:17–11:24','🚆','Narita Airport T2・3 → Keisei Narita','Keisei Main Line','Use first practical train if the shuttle timing shifts.'],
      ['~11:30–12:30','🍱','Narita lunch','Narita Omotesando area','Choose a local Japanese meal by queue; no need for another dedicated unagi meal.'],
      ['12:30–13:10','🏮','Narita Omotesando','Narita','Walk the temple-town approach slowly.'],
      ['13:10–14:00','⛩️','Naritasan Shinshoji','Narita','Main temple complex + quiet architectural wandering.'],
      ['14:00–16:30','🌲','Naritasan Park — NATURE PRIORITY','Narita','Protected wooded park block with ponds, waterfall and long walking paths.'],
      ['16:30–16:55','🚶','Return toward Keisei Narita','Narita','Walk back through the temple-town area.'],
      ['~17:00–17:15','🚆','Keisei Narita → Narita Airport T2・3','Keisei Main Line','Take the first practical airport-bound train.'],
      ['~17:15–18:00','🛍️','primaniacs Character Fragrance','Narita T2 pre-security','Keep the planned 2-perfume reserve here; remain landside because the flight is tomorrow.'],
      ['⭐18:05 / 18:25 backup','🚌','Toyoko evening return shuttle','Narita T2 bus stop 31-B','Narita T2 → Toyoko Inn Narita Airport Honkan • luggage is already there.'],
      ['~18:20–18:45','🏨','Check in + retrieve luggage','Toyoko Honkan','Room is booked and paid.'],
      ['19:00–20:00','🍽️','Dinner + buy early breakfast / drinks','Toyoko / nearby','Hotel breakfast starts too late for tomorrow’s flight plan, so buy breakfast/snacks tonight.'],
      ['20:00–21:00','🧳','Final luggage setup + flight prep','Toyoko Honkan','Put passports, boarding passes, liquids, chargers and airport documents where they are easy to reach.'],
      ['~21:00 onward','🌙','Early night','Toyoko Honkan','Tomorrow uses ⭐05:10 shuttle; 04:50 is earlier and 05:30 is backup.']
    ]
  });

  // New Day 9: actual flight home is Oct 26 via Cebu.
  let day9=D.days.find(d=>d.day===9);
  const day9Data={
    day:9,date:'Mon, Oct 26',title:'Departure via Cebu',jp:'帰国',subtitle:'Toyoko • Narita T2 • Cebu T2→T1 • Iloilo',
    budget:'¥12,000',start:'04:20',end:'17:15',
    overview:'Very early Toyoko checkout, free shuttle to Narita Terminal 2, then Cebu Pacific to Cebu with a protected T2→T1 connection before the final flight to Iloilo.',
    priorities:['⭐ Toyoko 05:10 shuttle','5J 5063 NRT T2 08:55→CEB T2 13:35','Protect full Cebu T2→T1 connection','5J 4080 CEB T1 16:20→ILO 17:15'],
    optional:['04:50 shuttle as early bonus','05:30 shuttle as backup'],
    timeline:[
      ['04:20–04:40','🌅','Wake + final prep','Toyoko Honkan','Quick wash/get ready; eat the breakfast/snack bought the night before if wanted.'],
      ['04:40–04:55','🧳','Check out + go to shuttle queue','Toyoko Honkan','Be downstairs by ~04:55; buses are first-come-first-served and may leave early when full.'],
      ['⭐05:10','🚌','Toyoko Honkan → Narita Airport Terminal 2','Toyoko free shuttle','Primary. 04:50 early bonus • 05:30 backup. Terminal 2 is the first airport stop.'],
      ['~05:25 onward','🛄','Airline check-in / bag drop / immigration / security','Narita T2','Follow actual Cebu Pacific counter opening and airport instructions.'],
      ['After security','🍱','Breakfast / airside shopping','Narita T2','Eat once formalities are complete; keep gate/boarding status visible.'],
      ['08:55–13:35','✈️','5J 5063 Narita T2 → Cebu T2','NRT → CEB','Confirmed international flight.'],
      ['13:35–16:20','🛄','Cebu T2 → T1 connection','Mactan-Cebu','Protect the full 2h45 for immigration, customs, baggage and terminal transfer as instructed.'],
      ['16:20–17:15','✈️','5J 4080 Cebu T1 → Iloilo','CEB → ILO','Confirmed Cebgo-operated domestic sector.'],
      ['17:15','🏠','Arrive Iloilo International Airport','Iloilo','Trip complete.']
    ]
  };
  if(day9)Object.assign(day9,day9Data);else D.days.push(day9Data);
  D.days.sort((a,b)=>a.day-b.day);

  // Detailed live-Sheet transportation.
  M.transport[1]=[
    ['1','04:15–04:45','Hometown → Iloilo International Airport','Grab / car','Leave ~04:15 • target airport arrival ~04:45','Airport target is ~3h05 before the 07:50 flight.'],
    ['2','07:50–09:10','Iloilo → Manila T3','Cebu Pacific 5J 448','Confirmed flight','Latest Cebu Pacific rebooking confirmation shows NAIA Terminal 3 arrival.'],
    ['3','09:10–12:15','Manila T3 same-terminal connection','International departure process / buffer','No T2→T3 transfer • remain in Terminal 3','Follow Cebu Pacific baggage/connection instructions; protect check-in/security/boarding buffer.'],
    ['4','12:15–18:00','Manila T3 → Narita T2','Cebu Pacific 5J 5056','Confirmed flight','Arrive Narita Terminal 2 at 18:00.'],
    ['5','~19:20–21:18 target','Narita Airport T2・3 → Shinjuku','JR Narita Express (N’EX)','N’EX 48 19:20→20:40 • ⭐ N’EX 50 19:53→21:18 • N’EX 52 20:47→22:09 • N’EX 54 21:47→23:12','Aim ⭐ N’EX 50. If not fully ready in JR area by ~19:30–19:35, take N’EX 52.'],
    ['6','After N’EX arrival','Shinjuku → Takadanobaba','JR Yamanote Line','Toward Ikebukuro / Ueno • 2 stops','Allow ~10–15 min to navigate from N’EX platform with luggage; take first suitable train.'],
    ['7','~21:40–23:50 depending N’EX','Takadanobaba → Hananosato','Walk','Waseda Exit → Hananosato • ~5–8 min','Self check-in. Keep hotel address + entry instructions offline on both phones.']
  ];
  M.transport[4]=[
    ['1','08:00–08:45','Takadanobaba → Shinjuku → Kokubunji','JR Yamanote + JR Chuo Rapid','Shinjuku useful trains: 08:09 • 08:12 • ⭐08:14 • 08:19 • 08:22','Use a Chuo train continuing past Musashi-Koganei.'],
    ['2','08:45–09:00','Kokubunji Station → Tonogayato Garden','Walk','South Exit • ~2 min','Garden opens 09:00.'],
    ['3','10:00–10:25','Tonogayato → Otaka-no-Michi / spring garden','Walk','~20–25 min through south-side Kokubunji','Keep it relaxed.'],
    ['4','12:20–12:45','Hōnenya → Kokubunji Station','Walk','~20–25 min','Bathroom / IC top-up if needed.'],
    ['5','12:45–~13:40','Kokubunji → Tokyo / Yurakucho','JR Chuo Line (Rapid)','⭐12:57 Chuo Special Rapid → Tokyo 13:32 • 12:51 Rapid is earlier but slower','The old ⭐12:53 departure is not in the Oct 2026 weekday timetable.'],
    ['6','17:30–17:45','MAPPA EXPO → CHA・GINZA','Walk','Tokyo International Forum / Yurakucho → Ginza','Short evening walk.'],
    ['7','17:45–20:30','CHA・GINZA → Kiya Ginza Mitsukoshi → Bar Lupin','Walk','All within Ginza','Keep knife packaged and receipt with you.'],
    ['8','20:30–21:15','Ginza → Nihombashi → Takadanobaba','Tokyo Metro Ginza Line + Tozai Line','Ginza → Nihombashi → transfer → Takadanobaba','Frequent service.']
  ];
  M.transport[6]=[
    ['1','~07:00–07:20','Takadanobaba → Shinjuku','JR Yamanote Line','~07:05 • 07:09 • ⭐07:13 • 07:17 • 07:21','Allow ~10–15 min inside Shinjuku to reach Odakyu platforms.'],
    ['2','⭐ ~07:21','Shinjuku → Gotokuji','Odakyu LOCAL only','07:04 • 07:13 • ⭐07:21 • 07:31 • 07:38','Gotokuji is LOCAL-only.'],
    ['3','~07:40–08:00','Gotokuji Station → Gotokuji Temple','Walk','~10–15 min','Temple office opens 08:00.'],
    ['4','09:05–~09:20','Gotokuji Temple → Gotokuji Station','Walk','~10–15 min','Leave grounds by ~09:05.'],
    ['5','⭐09:20–09:41','Gotokuji → Mukogaoka-Yuen','Odakyu LOCAL','⭐09:20→09:41 • 09:31→09:49 backup • 09:41→10:01 second backup','Aim 09:20; 09:31 is the clean backup.'],
    ['6','~09:41–09:55','Mukogaoka-Yuen → Nihon Minka-en','Walk','~13 min','With the preferred train, museum arrival is about 09:55.'],
    ['7','12:05–~12:18','Nihon Minka-en → Mukogaoka-Yuen','Walk','~13 min','Leave around 12:05 after ~2h10 in the museum.'],
    ['8','⭐12:27–~13:15','Mukogaoka-Yuen → Shinjuku → Ikebukuro','Odakyu Express + JR Yamanote','⭐12:27 Express → Shinjuku 12:52 DIRECT • then Yamanote northbound','Protect the 13:30 Bincho booking.'],
    ['9','~13:10–13:25','Ikebukuro Station → Ikebukuro PARCO Main Building 8F','Walk / station complex','East Exit / PARCO side','Aim PARCO by ~13:15–13:20.'],
    ['10','14:10–14:20','Ikebukuro PARCO → East Exit keyboard cluster','Walk','Already on East Exit side','Use buffer for elevator/station navigation.'],
    ['11','16:20–17:05','Keyboard cluster → lockers / Brillia HALL','Walk','Organize purchases, snack, bathroom, then theater','Prefer station locker for bulky keyboard boxes.'],
    ['12','~22:30–22:50','Ikebukuro → Takadanobaba','JR Yamanote Line','2 stops via Mejiro','Frequent service.']
  ];
  M.transport[7]=[
    ['1','06:50–07:59','Takadanobaba → Sayamashi','Seibu Shinjuku Line','06:45→07:31 • 06:54→07:42 • ⭐07:13 Express→07:59','Take ⭐07:13. Go straight to East Exit / bus stop #2.'],
    ['2','⭐08:22 onward','Sayamashi East Exit → Sayamadai-minami','Seibu Bus 狭山31','⭐08:22 • 08:49 • 09:14 • 09:36 • 09:53','08:22 preferred • 08:49 comfortable backup • 09:14 last resort.'],
    ['3','After bus arrival','Sayamadai-minami → Miyanoen','Walk','~10 min','Miyanoen: 25-2 Kitairiso.'],
    ['4','~11:30 onward','Miyanoen → Sayamadai-minami','Walk','~10 min','Do not rush the tea experience.'],
    ['5','~11:43–12:42','Sayamadai-minami → Sayamashi East Exit','Seibu Bus','11:43 • ⭐12:03 • 12:22 • 12:42','Take the next safe bus based on actual finish time.'],
    ['6','~12:16–13:33','Sayamashi → Hana-Koganei','Seibu Shinjuku Line','12:16→12:48 • ⭐12:26 Exp→12:53 • 12:36→13:08 • 12:46 Exp→13:13 • 12:56→13:28 • 13:06 Exp→13:33','Take whichever fits the actual return bus.'],
    ['7','After Hana-Koganei arrival','Hana-Koganei Station → Hana-Koganei Station Entrance stop #4','Walk','~5 min','Use 花小金井駅入口 stop #4.'],
    ['8','~13:05–13:20 target','Hana-Koganei Station Entrance #4 → Koganei Park West Exit','Seibu Bus toward 武蔵小金井駅','Aim 13:05 • backups 13:09 / 13:16 • routes 武12 / 武13 / 武14 / 武15 / 武21 / 武21-1','Get off 小金井公園西口, then walk ~5 min to museum. Oct 1 timetable revision checked.'],
    ['9','~13:15–13:25','Koganei Park West Exit → Edo-Tokyo Open Air Museum','Walk','~5 min','Preferred flow leaves time for a quick lunch.'],
    ['10','~16:30 onward','Koganei Park West Exit → Musashi-Koganei Station','Seibu Bus / taxi fallback','Take first practical bus toward 武蔵小金井駅','Taxi remains fallback if event crowds cost >15–20 min.'],
    ['11','~16:50–17:15','Musashi-Koganei → Kichijoji','JR Chuo Line','Frequent service','Expected Kichijoji arrival ~17:10–17:15.'],
    ['12','~18:00–18:25','Kichijoji → Shimokitazawa','Keio Inokashira Line direct','Take next direct train; express ~12 min','Kichijoji is FLEX; skip neighborhood if more Shimokitazawa time is preferred.'],
    ['13','~21:30–22:10','Shimokitazawa → Takadanobaba','Odakyu → JR Yamanote','Shimokitazawa → Shinjuku → Takadanobaba','Simple default after dinner/shopping.'],
    ['B1','~07:00–08:15','Hananosato / Takadanobaba → Shinjuku → Takahatafudo','JR Yamanote + Keio Line','Fast Keio service to 高幡不動; temple ~4–5 min walk','BACKUP ONLY if Miyanoen cancels.'],
    ['B2','~10:30–11:40/12:00','Takahatafudo → Musashi-Koganei → Edo-Tokyo Open Air Museum','Tama Monorail + JR Chuo + Seibu Bus','高幡不動 → 立川南 → JR 立川 → 武蔵小金井 → bus to 小金井公園西口','Resume normal museum → Kichijoji → Shimokitazawa flow afterward.']
  ];
  M.transport[8]=[
    ['1','06:50–07:35','Hananosato → Takadanobaba → Shinjuku N’EX platform','Walk + JR Yamanote','Frequent Yamanote service','Leave Hananosato early with all luggage.'],
    ['2','⭐08:05–09:25','Shinjuku → Narita Airport Terminal 2・3','JR Narita Express 9','N’EX 9 • Shinjuku 08:05 → T2・3 09:25','Use the Oct 25 return leg of the N’EX TOKYO Round Trip Ticket.'],
    ['3','⭐09:55 onward','Narita T2 → Toyoko Inn Narita Airport Honkan','Toyoko free shuttle','T2 bus stop 31-B • ⭐09:55','Official current airport→hotel schedule.'],
    ['4','~10:10–10:35','Toyoko Honkan','Luggage storage before check-in','Morning storage until check-in','Storage may be limited; keep valuables/refrigerated items with you.'],
    ['5','⭐10:45 onward','Toyoko Honkan → Narita Airport T2','Toyoko free shuttle','⭐10:45 hotel departure','Return to airport transport hub hands-free.'],
    ['6','⭐~11:17–~11:24','Narita Airport T2・3 → Keisei Narita','Keisei Main Line Rapid','11:17 Rapid planning anchor','Short ~7 min ride; use first practical train if timing shifts.'],
    ['7','~11:30–16:30','Narita lunch → Omotesando → Shinshoji → Naritasan Park','Walk','One continuous sightseeing progression','Naritasan Park is the nature priority; no baggage carried.'],
    ['8','~17:00–17:15','Keisei Narita → Airport Terminal 2・3','Keisei Main Line','First practical airport-bound service','Ride ~6–7 min.'],
    ['9','~17:15–18:00','Narita T2 landside','Walk / shopping','primaniacs pre-security','Stay landside; flight is tomorrow.'],
    ['10','⭐18:05 / 18:25 backup','Narita T2 → Toyoko Inn Narita Airport Honkan','Toyoko free shuttle','T2 bus stop 31-B','Return to hotel; luggage is already there.']
  ];
  M.transport[9]=[
    ['1','04:40–04:55','Toyoko Honkan room → shuttle queue','Walk / checkout','Be downstairs by ~04:55','Buses are first-come-first-served and can leave early when full.'],
    ['2','⭐05:10 onward','Toyoko Honkan → Narita Airport Terminal 2','Toyoko free shuttle','04:50 early bonus • ⭐05:10 primary • 05:30 backup','Terminal 2 is the first airport stop.'],
    ['3','08:55–13:35','Narita T2 → Cebu T2','Cebu Pacific 5J 5063','Confirmed flight','Use actual check-in/gate information on the day.'],
    ['4','13:35–16:20','Cebu Terminal 2 → Terminal 1 connection','Airport connection / terminal transfer','International arrival T2 → domestic departure T1','Protect the full 2h45 for immigration/customs/baggage/terminal transfer.'],
    ['5','16:20–17:15','Cebu T1 → Iloilo','Cebgo 5J 4080','Confirmed flight','Arrive Iloilo 17:15.']
  ];

  // 15-minute mirror updates for all changed days.
  M.schedule[1]=blocksToSlots([
    ['02:45','04:00','🌅 Wake + prep • bags + documents'],['04:15','04:30','🚕 Travel to Iloilo Airport'],['04:45','07:30','🛄 ILO airport • check-in + security + breakfast/wait'],['07:45','09:00','✈️ 5J 448 • ILO → MNL T3'],['09:15','12:00','🛄 MNL T3 same-terminal international connection + buffer'],['12:15','17:45','✈️ 5J 5056 • MNL T3 → NRT T2'],['18:00','18:45','🛄 Narita • immigration + baggage'],['19:00','19:30','💴 Cash + Suica + eSIM setup'],['19:45','21:15','🚆 N’EX 50 • 19:53→21:18 NRT → Shinjuku'],['21:30','21:45','🚆 Shinjuku → Takadanobaba + walk'],['22:00','22:15','🏠 Hananosato self check-in'],['22:30','22:45','🍱 Light dinner + groceries']
  ]);
  M.schedule[4]=blocksToSlots([
    ['07:15','07:45','🌅 Prep + breakfast'],['08:00','08:30','🚆 Takadanobaba → Kokubunji'],['08:45','08:45','🌿 Quiet arrival / orientation'],['09:00','09:45','🌳 Tonogayato Garden'],['10:00','10:00','🚶 Tonogayato → Otaka-no-Michi / spring area'],['10:15','11:00','💧 Otaka-no-Michi + Masugata Pond'],['11:15','11:15','⛩️ Musashi Kokubunji historic area'],['11:30','12:15','🍜 Hōnenya soba lunch'],['12:30','12:30','🚶 Walk to Kokubunji Station'],['12:45','13:30','🚆 Chuo → Tokyo/Yurakucho • ⭐12:57→13:32 + walk'],['13:45','15:00','☕ Yurakucho/Ginza flex'],['15:15','15:45','🎟️ MAPPA entry buffer • 16:00 BOOKED'],['16:00','17:15','🎌 MAPPA EXPO • ✅ BOOKED 16:00'],['17:30','17:30','🚶 MAPPA → CHA・GINZA'],['17:45','18:00','🫖 CHA・GINZA'],['18:15','18:45','🔪 Kiya knife shopping'],['19:00','19:00','🟢 Ginza FLEX buffer'],['19:15','20:15','📚 Bar Lupin + light dinner'],['20:30','21:00','🚆 Ginza → Takadanobaba']
  ]);
  M.schedule[6]=blocksToSlots([
    ['06:30','06:45','🌅 Prep'],['07:00','07:45','🚆 Takadanobaba → Gotokuji'],['08:00','09:00','🐱 Gotokuji Temple'],['09:15','09:45','🚆 ⭐09:20 Local Gotokuji → Mukogaoka-Yuen + walk'],['10:00','12:00','🏘️ Nihon Minka-en • PROTECTED'],['12:15','13:15','🚆 Minka-en → ⭐12:27 direct Express → Shinjuku → Ikebukuro'],['13:30','14:00','🍱 Hitsumabushi Bincho • ✅ BOOKED 13:30'],['14:15','16:15','⌨️ Keyboard shopping • PROTECTED'],['16:30','16:30','🧳 Locker + snack + bathroom'],['16:45','17:15','🚶 Brillia HALL + theater entry prep'],['17:30','17:30','🎟️ Seated / pre-show buffer'],['17:45','20:45','🎭 SPY×FAMILY 2 Musical'],['21:00','21:00','🎭 Exit theater / regroup'],['21:15','22:15','🍽️ Dinner / optional final keyboard purchase'],['22:30','22:30','🚆 Ikebukuro → Takadanobaba • ~22:30 departure']
  ]);
  M.schedule[7]=blocksToSlots([
    ['06:30','06:45','🌅 Prep + quick breakfast'],['07:00','07:45','🚆 Takadanobaba → Sayamashi'],['08:00','08:00','🚏 Sayamashi East Exit • bus buffer'],['08:15','09:00','🚌 ⭐08:22 bus → Miyanoen area + walk'],['09:15','09:15','🍵 Miyanoen arrival / check-in buffer'],['10:00','11:15','🍵 Miyanoen tea-picking • ✅ BOOKED • outfit confirmed'],['11:30','11:30','🫖 Tea shop + walk to bus'],['12:00','13:15','🚌🚆 Miyanoen → Sayamashi → Hana-Koganei → museum'],['13:30','13:45','🍜 Quick lunch'],['14:00','16:15','🏛️ Edo-Tokyo Open Air Museum'],['16:30','17:00','🚆 Museum → Kichijoji'],['17:15','17:45','🏮 Kichijoji FLEX • skip for earlier Shimokitazawa'],['18:00','18:15','🚆 Kichijoji → Shimokitazawa'],['18:30','20:15','🛍️ Shimokitazawa clothes • PRIMARY'],['20:30','21:15','🍽️ Shimokitazawa dinner'],['21:30','22:00','🚆 Shimokitazawa → Takadanobaba'],['22:15','22:15','🧳 Final-night packing']
  ]);
  M.schedule[8]=blocksToSlots([
    ['05:45','06:00','🌅 Wake + breakfast / final prep'],['06:15','06:30','🧳 Final room sweep + checkout'],['06:45','07:15','🚆 Hananosato → Takadanobaba → Shinjuku'],['07:30','07:45','🚉 N’EX platform / boarding buffer'],['08:00','09:15','🚆 ⭐N’EX 9 • 08:05→09:25 NRT T2・3'],['09:30','09:30','🚶 T2 arrivals → Toyoko shuttle stop 31-B'],['09:45','10:00','🚌 ⭐09:55 Toyoko shuttle → hotel'],['10:15','10:30','🧳 Toyoko luggage storage before check-in'],['10:45','11:00','🚌 ⭐10:45 Toyoko → NRT T2'],['11:15','11:15','🚆 ~11:17 Keisei T2 → Keisei Narita'],['11:30','12:15','🍱 Narita lunch'],['12:30','13:00','🏮 Narita Omotesando'],['13:15','13:45','⛩️ Naritasan Shinshoji'],['14:00','16:15','🌲 Naritasan Park • NATURE PRIORITY'],['16:30','16:45','🚶 Return toward Keisei Narita'],['17:00','17:00','🚆 Keisei Narita → NRT T2'],['17:15','17:45','🛍️ primaniacs T2 • PRE-SECURITY'],['18:00','18:15','🚌 ⭐18:05 Toyoko shuttle • 18:25 backup'],['18:30','18:45','🏨 Toyoko Honkan check-in / luggage'],['19:00','19:45','🍽️ Dinner + buy early breakfast'],['20:00','20:45','🧳 Final luggage + flight prep'],['21:00','21:00','🌙 Early night']
  ]);
  M.schedule[9]=blocksToSlots([
    ['04:15','04:30','🌅 Wake + final prep'],['04:45','04:45','🧳 Checkout + Toyoko shuttle queue'],['05:00','05:15','🚌 ⭐05:10 Toyoko → NRT T2 • 04:50 early / 05:30 backup'],['05:30','07:30','🛄 NRT T2 check-in / bag drop / immigration / security'],['07:45','08:30','✈️ Gate / boarding buffer'],['08:45','13:30','✈️ 5J 5063 • NRT T2 → CEB T2 • 08:55–13:35'],['13:30','16:00','🛄 Cebu T2 → T1 connection • protect full 2h45'],['16:15','17:00','✈️ 5J 4080 • CEB T1 → ILO • 16:20–17:15'],['17:15','17:15','🏠 Arrive Iloilo • 17:15']
  ]);

  // Keep the simple transport fallback in sync with the detailed mirror.
  [1,4,6,7,8,9].forEach(day=>{
    if(D.transport&&Array.isArray(M.transport[day]))D.transport[day]=M.transport[day].map(r=>r[2]+': '+r[4]);
  });

  // Compact reservation list.
  if(Array.isArray(D.reservations)){
    const upsertContains=(needle,row)=>{const i=D.reservations.findIndex(r=>r&&String(r[0]).includes(needle));if(i>=0)D.reservations[i]=row;else D.reservations.push(row)};
    upsertContains("N'EX",["N'EX TOKYO Round Trip + Reserved Seats",'Oct 18 arrival + Oct 25 Narita transfer','🟡 TO BUY / RESERVE']);
    upsertContains('Toyoko Inn Narita Airport Honkan',['Toyoko Inn Narita Airport Honkan','Oct 25–26 • 1 night','✅ BOOKED / PAID']);
  }

  // Detailed reservations: never embed private booking IDs / pickup codes in the public app.
  if(Array.isArray(X.reservations)){
    const nex=X.reservations.findIndex(r=>r&&String(r[0]).includes("N'EX TOKYO"));
    if(nex>=0)X.reservations[nex]=[
      "N'EX TOKYO Round Trip + Reserved Seats",'Oct 18 arrival + Oct 25 early Narita transfer','Transport / reserved seats','🟡 TO BUY / RESERVE SEATS','Yes for preferred direct trains',
      'Buy the N’EX TOKYO Round Trip Ticket and reserve 2 seats for arrival N’EX 50 plus Oct 25 N’EX 9 Shinjuku→NRT T2・3.','NOW','¥10,400 couple (¥5,200/adult round trip)','BOOK — JR EAST / N’EX',
      '14-day validity covers Oct 18→Oct 25. Arrival target N’EX 50 19:53→21:18. Oct 25 target N’EX 9: Shinjuku 08:05→NRT T2・3 09:25, chosen to catch Toyoko’s 09:55 T2→hotel shuttle.'
    ];
    if(!X.reservations.some(r=>r&&r[0]==='Toyoko Inn Narita Airport Honkan'))X.reservations.push([
      'Toyoko Inn Narita Airport Honkan','Oct 25–26 • 1 night','Airport hotel','✅ BOOKED / PAID','No — booked',
      'Already booked. Save/print confirmation and keep the shuttle plan accessible.','DONE — Oct 4, 2026','PAID — excluded from remaining trip budget','BOOKED via Agoda',
      'Booked and paid for Oct 25–26 at Toyoko Inn Narita Airport Honkan, 560 Tokko, Narita. Twin Room Non-Smoking for 2 adults. Check-in after 15:00; checkout before 10:00. The private Agoda booking ID stays in the Sheet/confirmation and is intentionally not embedded in this public app. Morning luggage storage is allowed subject to capacity. Oct 25 plan: 09:55 T2 shuttle → bag drop → 10:45 hotel shuttle back to T2. Oct 26 primary shuttle: ⭐05:10.'
    ]);
  }

  X.budget=[
    ['💰 JAPAN TRIP BUDGET – COUPLE','Budget','Main spending breakdown'],
    ["Day 1 – Arrival + N'EX",'¥30,000  |  ≈ ₱12,000','N’EX TOKYO Round Trip tickets ¥10,400 couple (Oct 18 arrival + Oct 25 airport-hotel transfer) + dinner/snacks + local transport/arrival expenses → safe Day 1 cap remains ~¥30,000.'],
    ['Day 2 – Kamakura + Enoshima','¥45,000  |  ≈ ₱18,000','Kamakura/Enoshima transport + Enoden pass ¥1,600 + Romancecar surcharge + attractions + meals/snacks + small shopping → conservative cap remains ~¥45,000.'],
    ['Day 3 – Lutia + 100-Yen + Dr.STONE Omotesando + Shibuya + Donki + Custom Cake','¥225,000  |  ≈ ₱90,000','Lutia + 100-yen shopping + Dr.STONE reserved menu + SHIBUYA109 + MODI/Onitsuka + Martin shoe reserve + Donki + custom cake + late-night taxi + meals/transport. Safe Day 3 cap remains ¥225,000.'],
    ['Day 4 – Kokubunji + MAPPA + Ginza','¥129,000  |  ≈ ₱51,600','Kokubunji + Hōnenya + MAPPA merchandise + Ginza knife reserve + CHA・GINZA + Bar Lupin + contingency. MAPPA admission tickets are already booked and excluded from the remaining trip budget.'],
    ['Day 5 – Yokohama + BSD Pilgrimage + Animate','¥40,000  |  ≈ ₱16,000','Yamate + BSD museum collaboration + Chinatown + waterfront + Red Brick + Noge + Animate Yokohama goods.'],
    ['Day 6 – Gotokuji + Minka-en + Hitsumabushi Bincho + Ikebukuro Keyboards + SPY×FAMILY 2','¥150,000  |  ≈ ₱60,000','SPY tickets already paid/excluded + Minka-en + Hitsumabushi Bincho 13:30 booked + ¥80,000 two-keyboard reserve + accessories + theater merch + meals/transport.'],
    ['Day 7 – Sayama Tea + Open Air Museum + Kichijoji FLEX + Shimokitazawa','¥25,000  |  ≈ ₱10,000','Miyanoen booked + Sayama/Koganei transport + free museum admission Oct 24 + Kichijoji flex + Shimokitazawa evening + meals/tea. Clothing purchases remain variable and outside the operating cap.'],
    ['Day 8 – Early Narita + Toyoko Bag Drop + Naritasan Nature','¥40,000  |  ≈ ₱16,000','N’EX return leg covered by round-trip ticket + Toyoko shuttles ¥0 + Keisei local rail + Narita meals + Naritasan nature day + 2 primaniacs fragrances reserve ¥16,000 + small souvenirs/contingency. Toyoko hotel is already paid/excluded.'],
    ['Day 9 – Departure via Cebu','¥12,000  |  ≈ ₱4,800','Toyoko→NRT shuttle ¥0 + airport breakfast/meal + Cebu connection meal/snacks + small final contingency. No N’EX on departure day.'],
    ['✈️ Cebu Pacific additional baggage','¥7,500  |  ≈ ₱3,000','Additional checked-baggage allowance / baggage upgrade reserve with Cebu Pacific → max ₱3,000.'],
    ['TOTAL TRIP BUDGET','¥703,500  |  ≈ ₱281,400','Remaining conservative trip budget after the Oct 26 flight change: Days 1–9 + Cebu Pacific baggage reserve. Toyoko Inn Narita Airport Honkan is already booked/paid and excluded.'],
    ['💴 Physical cash to withdraw','¥88,000  |  ≈ ₱35,200',''],
    ['📱 Suica – Cha','¥15,000  |  ≈ ₱6,000',''],
    ['📱 Suica – Martin','¥15,000  |  ≈ ₱6,000',''],
    ['📱 Suica total','¥30,000  |  ≈ ₱12,000','']
  ];

  S.meta=[
    ['Hotel','Hananosato Takadanobaba Oct 18–25 • Toyoko Inn Narita Airport Honkan Oct 25–26 ✅ BOOKED / PAID'],
    ['Trip cap','¥703,500 couple ≈ ₱281,400 • paid hotels excluded from remaining budget'],
    ['Cash plan','¥88,000 withdrawal + ¥15,000 Suica each'],
    ['N’EX','Oct 18 arrival N’EX 50 + Oct 25 transfer N’EX 9 to Narita'],
    ['Arrival','Oct 18 • ILO 07:50 → MNL T3 09:10 → MNL T3 12:15 → NRT T2 18:00'],
    ['Departure','Oct 26 • NRT T2 08:55 → CEB T2 13:35 → CEB T1 16:20 → ILO 17:15'],
    ['Separate reserve','Baggage ¥7,500'],
    ['Planning rate','¥1 ≈ ₱0.40']
  ];
  S.days=[
    ['Oct 18 Sun','Day 1 • Flight + Arrival','Wake/prep • travel to ILO airport • ILO → MNL → Narita T2 → Shinjuku → Takadanobaba • self-check-in • light dinner/groceries','02:45 wake/prep • airport target ~04:45 • 5J 448 07:50–09:10 • 5J 5056 12:15–18:00 • ⭐ N’EX 50 preferred','02:45 wake/prep','~22:00 hotel if N’EX 50','¥30,000','04:15 travel to Iloilo Airport • 5J 448 ILO→MNL T3 • SAME-TERMINAL T3 connection • 5J 5056 MNL T3→NRT T2 • N’EX 50 19:53→21:18','Latest rebooking puts both Manila sectors in T3. If not fully ready in JR area by ~19:30–19:35, use N’EX 52 instead of rushing.'],
    ['Oct 19 Mon','Day 2 • Kamakura + Enoshima','Renbai • Great Buddha • Goryo/Joju-in/Gokurakuji • Inamuragasaki • Koshigoe • Enoshima Iwaya • sunset','Great Buddha protected • sunset ~17:03','05:45','~21:45 hotel','¥45,000','Takadanobaba → Shinagawa → Kamakura • ⭐ 19:39 Romancecar Enoshima No. 6 → Shinjuku 20:48 if reserved','Cut Inamuragasaki time / optional Shonan Candle first if behind'],
    ['Oct 20 Tue','Day 3 • Shinjuku + Omotesando + Shibuya + Custom Cake','Yamato ticket pickup • Can★Do • Lutia • Dr.STONE PARTY vol.2 • Shibuya MODI BSD × h.NAOTO + Onitsuka • SHIBUYA109 • MEGA Donki • custom cake • Nakano standby only','Lutia 11:00–13:30 ✅ • Dr.STONE 14:50–16:00 ✅ BOOKED • MODI before 20:00 • custom cake TO ORDER','07:35','~00:50 hotel','¥225,000','Lutia → Omotesando • Metro to Shibuya • late Yamanote to Shinjuku • taxi after cake','Protect Dr.STONE, MODI and ≥2h SHIBUYA109. Nakano is standby-only.'],
    ['Oct 21 Wed','Day 4 • Kokubunji + MAPPA + Ginza','Tonogayato • Otaka-no-Michi • Musashi Kokubunji • Hōnenya • MAPPA • CHA Ginza • Kiya • Bar Lupin','MAPPA 16:00 ✅ BOOKED for 2 • arrive ~15:30–15:45','~08:00 leave hotel','~21:15–21:30 hotel','¥129,000','Yamanote→Shinjuku • ⭐08:14 Chuo Rapid→Kokubunji • ⭐12:57 Chuo Special Rapid→Tokyo 13:32→Yurakucho','Protect Tonogayato opening + Kokubunji lunch.'],
    ['Oct 22 Thu','Day 5 • Yokohama BSD','Yamate • Diplomat House • France-yama • BSD museum • Motomachi • Chinatown • Yamashita • Osanbashi • Red Brick • night views • Noge • Animate','BSD museum 11:00–12:10 • sunset 16:58 • Animate closes 21:00','~06:30 prep • ~07:03 train target','~22:15 hotel','¥40,000','Takadanobaba→Shinagawa→Ishikawacho • ⭐ Yokohama 21:26→Shinjuku return','Protect museum + sunset/blue hour + Animate.'],
    ['Oct 23 Fri','Day 6 • Gotokuji + Minka-en + Unagi + Ikebukuro + SPY','Gotokuji • Nihon Minka-en • Hitsumabushi Nagoya Bincho • keyboard stores • SPY×FAMILY 2 musical','SPY 17:45 ✅ paid • Bincho 13:30 ✅ BOOKED • keyboards 14:20–16:20 PROTECTED','~07:00','~23:00 hotel','¥150,000','⭐07:21 Odakyu LOCAL • ⭐09:20 Local→Mukogaoka-Yuen • ⭐12:27 Express DIRECT→Shinjuku→Ikebukuro','Bincho is booked; keyboards before show remain primary.'],
    ['Oct 24 Sat','Day 7 • Sayama + Koganei + Kichijoji FLEX + Shimokitazawa','Miyanoen tea • Edo-Tokyo Open Air Museum • Kichijoji FLEX • Shimokitazawa vintage/clothes • dinner','Miyanoen 10:00 ✅ BOOKED • museum closes 16:30 • admission FREE Oct 24','~06:50','~22:10–22:20 hotel','¥25,000','⭐07:13 Seibu→Sayamashi • ⭐08:22 bus • ⭐12:26 Express→Hana-Koganei 12:53 • stop #4 buses ~13:05/13:09/13:16 • Inokashira to Shimokitazawa','Do not shorten Miyanoen or museum. Kichijoji is FLEX.'],
    ['Oct 25 Sun','Day 8 • Early Narita + Toyoko + Naritasan Nature','Early Hananosato checkout • N’EX 9 • Toyoko luggage storage • Narita lunch • Omotesando • Shinshoji • Naritasan Park • primaniacs • Toyoko','⭐N’EX 9 08:05→09:25 • ⭐Toyoko T2 pickup 09:55 • ⭐hotel→T2 10:45 • Toyoko Honkan ✅ BOOKED / PAID','~05:45','~18:20–18:45 Toyoko','¥40,000 • Toyoko paid/excluded','Yamanote→Shinjuku • ⭐N’EX 9 • Toyoko shuttles • Keisei to/from Narita','Naritasan Park is the protected nature block. Morning luggage storage is subject to capacity.'],
    ['Oct 26 Mon','Day 9 • Departure via Cebu','Toyoko checkout • 05:10 shuttle • Narita T2 departure • Cebu T2→T1 connection • Iloilo','⭐05:10 Toyoko shuttle • 5J 5063 08:55→13:35 • 5J 4080 16:20→17:15','~04:20 wake','17:15 Iloilo','¥12,000','⭐05:10 Toyoko shuttle→NRT T2 • Cebu connection requires T2→T1 transfer','Be downstairs ~04:55. Buy breakfast the night before and protect the Cebu connection.']
  ];
  S.budget=[
    ['Daily itinerary caps','¥696,000','≈ ₱278,400','Days 1–9 combined • paid hotels excluded from remaining budget'],
    ['Cebu Pacific baggage reserve','¥7,500','≈ ₱3,000',''],
    ['TOTAL CONSERVATIVE TRIP CAP','¥703,500','≈ ₱281,400','Suica preload is cash-flow, not double-counted • paid hotels are excluded from remaining trip budget']
  ];

  window.SHioriSheetSyncVersion='2026-10-04-v28';
})();