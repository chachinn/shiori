(function(){
  const D=window.SHioriData;
  const M=window.SHioriSheetMirror;
  const X=window.SHioriSheetExtra;
  const S=window.SHioriFullSummary;
  if(!D||!M||!X||!S) return;

  function day(n){return D.days.find(d=>d.day===n)}
  function patchDay(n,patch){Object.assign(day(n),patch)}
  function mins(t){const [h,m]=t.split(':').map(Number);return h*60+m}
  function hhmm(n){return String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0')}
  function blocksToSlots(blocks){
    const out=[];
    blocks.forEach(([start,end,label])=>{
      for(let n=mins(start),stop=mins(end);n<=stop;n+=15) out.push([hhmm(n),n===mins(start)?label:'↳']);
    });
    return out;
  }

  patchDay(1,{
    start:"02:45",
    subtitle:"Wake/prep • ILO airport • Narita • Suica • N’EX • first night",
    overview:"Protected pre-flight prep and airport time, full Manila transfer buffer, Narita processing, then the next comfortable N’EX to Shinjuku and easy self check-in.",
    priorities:["02:45 wake + full travel prep","~04:45 Iloilo Airport arrival target","Protect the full NAIA T2→T3 transfer","Immigration + baggage without rushing","Cash + Suica + Mobal setup if using","⭐ N’EX 50 only if comfortable","Self check-in instructions saved offline"],
    optional:["Groceries after check-in","Convenience-store dinner if arrival is late"],
    timeline:[
      ["02:45–04:15","🌅","Wake + full travel prep","Home","Shower/get ready; final bag count; passports/visa/IO documents; tickets; wallets; chargers/powerbanks; medicines; checked + hand-carry luggage. Protect this prep block."],
      ["04:15–04:45","🚕","Travel to Iloilo International Airport","Home → ILO Airport","Target airport arrival ~04:45, about 3h05 before 5J 448. Protect airport time if pickup is delayed."],
      ["04:45–07:30","🛄","Check-in + security + light breakfast / wait","Iloilo Airport","Bag drop, security, then wait airside. Keep boarding passes and Manila T2→T3 transfer details accessible."],
      ["07:50–09:10","✈️","5J 448 Iloilo → Manila T2","ILO → MNL T2","Confirmed."],
      ["09:10–12:15","🚍","NAIA T2 → T3 transfer + international-flight buffer","Manila","Collect/handle baggage as instructed, transfer terminals, complete international-departure process. This is not free time."],
      ["12:15–18:00","✈️","5J 5056 Manila T3 → Narita T2","MNL T3 → NRT T2","Confirmed arrival Terminal 2 at 18:00."],
      ["18:00–19:00","🛄","Immigration + baggage claim","Narita T2","Move steadily. Keep passport, hotel details and return-flight details ready."],
      ["~19:00 onward","💴","Cash withdrawal + Suica + Japanese-number eSIM setup","Narita T2","Withdraw ¥88,000 total planned cash. Initial Suica ~¥5,000/person; trip plan ¥15,000/person. If using Mobal, activate before leaving Narita; do not rush N’EX 50."],
      ["~19:20–23:12 options","🚆","Next comfortable N’EX → Shinjuku","Narita T2・3 → Shinjuku","Preferred realistic target ⭐ N’EX 50 19:53→21:18. If not ready by ~19:30–19:35, use N’EX 52 20:47→22:09. N’EX 54 21:47→23:12 only if seat/ticket secured before cutoff."],
      ["After N’EX","🚆","Yamanote → Takadanobaba","Shinjuku → Takadanobaba","Allow ~10–15 min to navigate from N’EX platform with luggage; then 2 stops toward Ikebukuro/Ueno."],
      ["~21:40–23:50","🏠","Hananosato self check-in","Takadanobaba","Waseda Exit then ~5–8 min walk. Use host self-check-in instructions; keep exact address/building/room/entry code/contact saved offline on both phones."],
      ["After check-in","🍱","Light dinner + groceries if needed","Near hotel","If N’EX 52/54, default to convenience-store food rather than hunting for a restaurant. Charge devices and rest as soon as practical."]
    ]
  });

  patchDay(3,{
    title:"Shinjuku + Nakano + Shibuya + Custom Cake",
    subtitle:"Hair • 100-yen • anime • fashion • Donki • custom cake",
    budget:"¥225,000",
    end:"~00:50",
    overview:"Shopping-heavy Tokyo day with west-Shinjuku, Nakano and Shibuya, then the pre-ordered custom celebration cake pickup in Kabukicho after midnight and taxi home.",
    priorities:["Can★Do Nishi-Shinjuku","Lutia 11:00 ✅","Nakano Broadway","BSD × h.NAOTO + Onitsuka","SHIBUYA109 ≥2h","MEGA Donki","Custom cake pickup 24:15–24:30"],
    optional:["Yamato pickup if tracking READY","Quick 100-yen top-up only if needed","Bonus GU/shoe/perfume stops only if genuinely ahead"],
    timeline:[
      ["07:15–07:35","🌅","Morning prep + light breakfast","Hananosato","Keep breakfast simple so the optional Yamato pickup and 09:00 Can★Do opening remain easy."],
      ["07:35–08:15","📦","Optional Yamato SPY ticket pickup","Shinjuku Hyakunincho","Only if tracking shows waiting for customer pickup. Office opens 08:00; bring passport + tracking number. Confirm both physical tickets and store securely."],
      ["08:15–09:00","🚶","Yamato → Can★Do + arrival buffer","Nishi-Shinjuku","If Yamato is skipped, use extra time for breakfast/relaxed start and simply be near Can★Do before opening."],
      ["09:00–10:15","🛍️","Can★Do Nishi-Shinjuku — PRIMARY 100-yen block","Nishi-Shinjuku 7-21-1","Current hours 09:00–22:00. Browse properly here; this is the real 100-yen shopping block."],
      ["10:15–10:45","🚶","Can★Do → Lutia + salon buffer","Shinjuku","Arrive 10–15 minutes early."],
      ["11:00–13:30","💇‍♀️","Lutia appointment ✅","Shinjuku","Booked. Allow full 2–2.5 hours and slight overrun."],
      ["13:30–14:00","🍱","Light lunch / snack","Near Lutia","Fuel only; stay close and finish on time."],
      ["~14:00–14:20","🛍️","OPTIONAL 100-yen buffer only","Shinjuku","Use only if something was missed. Do not turn this into a second full shopping session."],
      ["~14:10–14:42","🚆","Shinjuku → Nakano","JR Chuo-Sobu Local","14:17 / 14:23 / ⭐14:28 / 14:34 / 14:40. Allow realistic walk + station navigation; do not sprint."],
      ["~14:40–16:30","🎌","Nakano Broadway","Nakano","Mandarake, figures, artbooks, retro collectibles, gacha; look for BSD/JJK/Dr. Stone. Check upper floors."],
      ["~16:30–17:05","🚆","Nakano → Shibuya","via Shinjuku","⭐16:37 local target; allow ~30–35 min door-to-door including transfer and exit."],
      ["17:00–18:15","🐯","Shibuya MODI — BSD × h.NAOTO + Onitsuka","Shibuya MODI","Both in same building; BSD event and Onitsuka first before 20:00."],
      ["18:15–18:30","🚶","MODI → SHIBUYA109","Shibuya","Station-area buffer."],
      ["18:30–21:00","👗","SHIBUYA109 — PROTECTED","Shibuya","Protect ~2.5 hours. Start upper floors and work down."],
      ["21:00–21:50","🍽️","Dinner","Shibuya","Rest and recharge before Donki."],
      ["21:50–23:45","🛒","MEGA Don Quijote Shibuya Honten","Shibuya","Snacks, skincare, souvenirs, gifts. Day 3 budget includes the planned shoe reserve and custom cake/taxi."],
      ["23:45–~00:15","🚆","Shibuya → Shinjuku / Kabukicho","JR Yamanote + walk","Late targets include 23:55 / 00:00 / 00:05 to Shinjuku. Use East Exit/Kabukicho side, then allow ~8–12 min walk to cake shop."],
      ["~00:15–00:30","🎂","夜のケーキ屋さん® 歌舞伎町 — CUSTOM CAKE PICKUP","Kabukicho","Order via official LINE. Request Oct 20 24:15–24:30. Design: pink “19 August” • pink→lilac “14 September” • lilac “10 October”; dates only."],
      ["~00:30–00:50","🚕","Taxi back to Hananosato","Kabukicho → Takadanobaba","PRIMARY after cake pickup: protects fragile cake + Donki bags and avoids last-train dependence. Keep ~¥2,000–3,000 late-night taxi reserve."],
      ["~00:50","🏠","Cake unload + settle in","Hananosato","Store/refrigerate cake as appropriate, organize purchases and rest. Omoide Yokocho and locker stop remain removed."]
    ]
  });

  patchDay(5,{
    start:"06:30",
    timeline:[
      ["06:30–07:00","🌅","Prep + breakfast + early start","Takadanobaba","Finish by ~07:00 so departure does not overlap breakfast in the 15-Min planner."],
      ["~07:00–08:10","🚆","Takadanobaba → Shinagawa → Ishikawacho","JR Yamanote + Keihin-Tohoku/Negishi","Detailed backup departures remain in Transport."],
      ["08:25–09:20","🚶","Quiet Yamate morning walk","Yamate","Use the pre-opening time for neighborhood atmosphere/photos; be at Italian Garden for 09:30."],
      ["09:30–10:10","🌿","Yamate Italian Garden + Home of a Diplomat","Yamate","BSD photo stop; current hours 09:30–17:00."],
      ["10:10–10:30","🚶","Walk across Yamate","Yamate","Hilly. Use local bus/short taxi if tired rather than sacrificing museum or sunset."],
      ["10:30–10:50","🌬️","France-yama + Harbor View Park","Yamate","Windmill BSD stop; France-yama October hours 07:00–18:00."],
      ["11:00–12:10","📚","Kanagawa Museum of Modern Literature × BSD","Harbor View Park","Complete collaboration worksheet. KEEP dated ticket stub for Animate Yokohama VIVRE ¥1,100+ BSD purchase mini-card benefit. Admission ¥800/adult."],
      ["12:10–12:30","🚶","Walk down to Motomachi","Yamate → Motomachi","Residential lanes / old Yokohama atmosphere."],
      ["12:30–13:00","🛍️","Motomachi backstreets","Motomachi","Keep compact so waterfront afternoon stays comfortable."],
      ["13:00–13:55","🍱","Lunch","Motomachi / Chinatown edge","Chinese set, yoshoku, ramen or café."],
      ["13:55–14:35","🏮","Yokohama Chinatown","Chinatown","Main gates + side streets; 1–2 snacks rather than a full crawl."],
      ["14:35–15:05","⛲","Yamashita Park + Guardian of Water","Waterfront","BSD fountain stop + Hikawa Maru exterior / harbor views."],
      ["15:05–15:50","🌊","Osanbashi Pier","Waterfront","BSD pilgrimage stop + free rooftop deck."],
      ["15:50–16:15","🚶","Zou-no-hana + Jack’s Tower / Bashamichi pass-through","Waterfront","Built-in slack absorber. If 15–25 min late, absorb delay here instead of rushing protected stops."],
      ["16:15–16:45","🧱","Yokohama Red Brick Warehouse","Red Brick","Quick browse / BSD stop."],
      ["16:45–18:15","🌆","Sunset + blue hour / night views","Red Brick → Unga Park → Kishamichi → Minato Mirai","Protect sunset (~16:58), civil twilight and illuminated skyline without backtracking."],
      ["18:20–19:35","🍶","Noge dinner / local evening","Noge","Dinner BEFORE Animate; leave ~19:35."],
      ["19:35–20:00","🚆","Sakuragicho → Yokohama Station / VIVRE","JR + walk","Animate is the final major stop."],
      ["20:00–20:50","🛍️","Animate Yokohama VIVRE","Yokohama VIVRE 8F","Use nearly the full final hour; present dated museum stub if eligible for BSD mini-card benefit."],
      ["20:50–21:05","🚶","VIVRE → Yokohama Station / bag check","Yokohama","No waterfront backtrack."],
      ["21:05–22:15","🚆","Yokohama → Takadanobaba","JR","⭐21:26 Shonan-Shinjuku is the comfortable anchor; backups in Transport."]
    ]
  });

  patchDay(8,{
    budget:"¥37,000",
    overview:"Early Narita T2 run with pre-security primaniacs, airside anime shopping/meal, then the confirmed Cebu Pacific flights home. The Day 8 cap now includes the two planned primaniacs fragrances.",
    priorities:["⭐ N’EX 7","primaniacs 09:05–09:25 hard-stop window","2 primaniacs perfumes included in Day 8 cap","Be airside by ~10:10 target","Fa-So-La AKIHABARA","Recheck final Cebu Pacific terminal/baggage instructions"],
    timeline:[
      ["06:00–06:20","🌅","Wake + final prep","Hananosato","Quick shower/freshen, final luggage check and full room sweep: chargers, adapters, passport, wallet/Suica."],
      ["06:20–06:35","🧳","Checkout + light breakfast","Hananosato","Keep it simple and focus on timing."],
      ["06:35–07:00","🚆","Hananosato → Takadanobaba → Shinjuku","JR Yamanote","Target ~06:43 if practical. Allow ~20–25 min hotel door → correct N’EX platform area; do not rush one specific Yamanote."],
      ["07:00–07:27","🚉","N’EX platform buffer + board","Shinjuku","Reserved seats; N’EX cost prepaid via round-trip ticket."],
      ["⭐07:27–08:58","🚆","N’EX 7 → Narita Airport T2・3","JR Narita Express","Preferred. N’EX 5 earlier bonus; N’EX 9 comfortable backup. Recheck platform on travel day."],
      ["08:58–09:05","🚶","Station → Terminal 2","Narita","Follow T2 signs directly; no T3 transfer at Narita."],
      ["09:05–09:25","🛍️","primaniacs Character Fragrance","Narita T2 Main Building 4F • pre-security","Current hours 08:00–20:00. Check desired fragrances first. HARD STOP ~09:25; skip/shorten if airline queues are already long."],
      ["09:25–10:10","🛄","Cebu Pacific check-in + baggage + immigration + security","Narita T2","Knife stays checked. Actual queue governs."],
      ["10:10–11:30","🛍️","Airside shopping + meal","Narita T2","Priority Fa-So-La TAX FREE AKIHABARA T2 3F after security (current 07:00–22:00); duty-free cosmetics/perfumery optional."],
      ["11:30–12:10","✈️","Move toward gate + final buffer","Narita T2","Finish shopping, confirm gate/boarding, bathroom/water and settle near gate."],
      ["~12:10–12:50","✈️","Gate / boarding buffer","Narita T2","Follow airline gate announcement."],
      ["12:50–17:30","✈️","5J 5055 Narita T2 → Manila T3","NRT → MNL","Confirmed flight."],
      ["17:30–21:50","🛬","Manila layover","NAIA T3","Current Cebu Pacific 5J policy keeps onward flight at T3, so no T3→T2 transfer is planned. Follow final baggage/connection instructions and recheck assignment before travel."],
      ["21:50–23:15","✈️","5J 2269 Manila T3 → Iloilo","MNL → ILO","Confirmed under current 5J terminal policy; recheck before flight."],
      ["23:15 onward","🏠","Arrive Iloilo + baggage / exit","Iloilo Airport","Home."]
    ]
  });

  D.transport[3]=[
    "Shinjuku→Nakano: 14:17 / 14:23 / ⭐14:28 / 14:34 / 14:40",
    "Nakano→Shinjuku: 16:28 / 16:32 / ⭐16:37 / 16:42 / 16:45",
    "Shibuya→Shinjuku/Kabukicho: 23:55 / 00:00 / 00:05; cake pickup ~00:15–00:30; taxi PRIMARY Kabukicho→Hananosato"
  ];
  D.reservations=[
    ["Hananosato Takadanobaba","Oct 18–25","✅ DONE"],
    ["Lutia Shinjuku","Oct 20 • 11:00","✅ DONE"],
    ["MAPPA EXPO 15th Anniversary","Oct 21 • 15:30 target","🟡 TO BUY / NOT YET SECURED"],
    ["Manmaru Honten","Oct 23 • ~13:30","🟡 TO RESERVE"],
    ["Nihon Minka-en","Oct 23 • 10:00–12:15","🟢 NO RESERVATION NEEDED"],
    ["SPY×FAMILY 2 Musical","Oct 23 • 17:45","🟠 PAID — SHIPPING / PICKUP PENDING"],
    ["Miyanoen Tea-Picking","Oct 24 • 10:00","🔴 TO RESERVE"],
    ["Edo-Tokyo Open Air Museum","Oct 24 • ~13:45/14:00","🟢 NO ADVANCE MUSEUM TICKET NEEDED"],
    ["N’EX TOKYO Round Trip + Reserved Seats","Oct 18 + Oct 25","🟡 TO BUY / RESERVE SEATS"],
    ["Enoden Noriorikun","Oct 19","🟢 BUY SAME DAY"],
    ["Romancecar Enoshima No.6","Oct 19 • 19:39","🟡 TO BUY / RESERVE"],
    ["夜のケーキ屋さん® 歌舞伎町","Oct 20 • 24:15–24:30","🔴 TO ORDER / CUSTOMIZE"]
  ];

  M.transport[3][6]=["7","23:45–~00:50","Shibuya → Shinjuku/Kabukicho cake pickup → Takadanobaba","JR Yamanote + walk + taxi","Shibuya late targets: 23:55 • 00:00 • 00:05 → Shinjuku; cake pickup ~00:15–00:30","夜のケーキ屋さん closes 25:00. After pickup, taxi is PRIMARY: fragile cake + Donki bags + avoids last-train dependence."];

  M.schedule={
    1:blocksToSlots([
      ["02:45","04:00","🌅 Wake + prep • bags + documents"],["04:15","04:30","🚕 Travel to Iloilo Airport"],["04:45","07:30","🛄 ILO airport • check-in + security + breakfast/wait"],["07:45","09:00","✈️ 5J 448 • ILO → MNL T2"],["09:15","12:00","🚍 NAIA T2→T3 transfer + international buffer"],["12:15","17:45","✈️ 5J 5056 • MNL T3 → NRT T2"],["18:00","18:45","🛄 Narita • immigration + baggage"],["19:00","19:30","💴 Cash + Suica + eSIM setup"],["19:45","21:15","🚆 N’EX 50 target • NRT → Shinjuku"],["21:30","21:45","🚆 Shinjuku → Takadanobaba + walk"],["22:00","22:15","🏠 Hananosato self check-in"],["22:30","23:15","🍱 Light dinner + groceries"]
    ]),
    2:blocksToSlots([
      ["05:15","05:30","🌅 Prep + light breakfast"],["05:45","07:15","🚆 Takadanobaba → Kamakura"],["07:30","08:00","🥬 Kamakura Renbai + Enoden pass"],["08:15","08:30","🚋 Enoden to Hase + walk"],["08:45","09:15","🗿 Great Buddha / Kotoku-in"],["09:30","11:00","⛩️ Goryo + Joju-in + Gokurakuji / old lanes"],["11:15","11:30","🌊 Inamuragasaki Park / coast"],["11:45","11:45","🚋 To Koshigoe + walk"],["12:00","12:15","⛩️ Koyurugi Shrine / Cape"],["12:30","13:15","🐟 Koshigoe seafood lunch"],["13:30","14:00","⚓ Port + walk to Enoshima"],["14:15","15:15","⛩️ Enoshima Shrine + old lanes"],["15:30","15:30","🐉 Ryuren no Kane + descend"],["15:45","16:15","🕯️ Iwaya Caves • PROTECTED"],["16:30","17:00","🌅 Chigogafuchi sunset • PROTECTED"],["17:15","17:30","🚶 Walk back toward summit"],["17:45","18:15","🕯️ OPTIONAL Shonan Candle"],["18:30","19:00","🚶 Descend to Katase-Enoshima"],["19:15","19:30","🚉 Station + Romancecar boarding buffer"],["19:45","20:45","🚆 Romancecar Enoshima No. 6 → Shinjuku"],["21:00","21:00","🚆 Shinjuku → Takadanobaba"],["21:15","21:30","🍽️ Simple dinner"]
    ]),
    3:blocksToSlots([
      ["07:15","07:30","🌅 Prep"],["07:45","07:45","🚶 Hotel → Yamato"],["08:00","08:00","📦 SPY ticket pickup if tracking READY"],["08:15","08:30","🚶 Yamato → Can★Do"],["08:45","08:45","🟢 Arrival buffer"],["09:00","10:00","🛍️ Can★Do Nishi-Shinjuku"],["10:15","10:45","🚶 Can★Do → Lutia + salon buffer"],["11:00","13:15","💇 Lutia Shinjuku • BOOKED"],["13:30","13:45","🍱 Light lunch"],["14:00","14:00","🟢 OPTIONAL 100-yen / free buffer"],["14:15","14:30","🚆 Shinjuku → Nakano"],["14:45","16:15","🎌 Nakano Broadway"],["16:30","16:45","🚆 Nakano → Shibuya"],["17:00","18:00","🐯 MODI • BSD × h.NAOTO + Onitsuka"],["18:15","18:15","🚶 MODI → SHIBUYA109"],["18:30","20:45","🛍️ SHIBUYA109 • PROTECTED"],["21:00","21:45","🍽️ Dinner"],["22:00","23:30","🛒 MEGA Don Quijote"],["23:45","23:45","🚆 Shibuya → Shinjuku / Kabukicho"]
    ]),
    4:blocksToSlots([
      ["00:00","00:00","🚆 Day 3 spillover → Kabukicho"],["00:15","00:15","🎂 Custom cake pickup"],["00:30","00:30","🚕 Kabukicho → Hananosato"],["00:45","00:45","🏠 Cake unload / settle in"],["07:15","07:45","🌅 Prep + breakfast"],["08:00","08:30","🚆 Takadanobaba → Kokubunji"],["08:45","08:45","🌿 Quiet arrival / orientation"],["09:00","09:45","🌳 Tonogayato Garden"],["10:00","11:00","💧 Otaka-no-Michi + spring area"],["11:15","11:15","⛩️ Musashi Kokubunji historic area"],["11:30","12:15","🍜 Hōnenya soba lunch"],["12:30","12:30","🚶 Walk to Kokubunji Station"],["12:45","13:15","🚆 Kokubunji → Yurakucho"],["13:30","14:30","🟢 FLEX buffer • Yurakucho"],["14:45","15:15","🎟️ MAPPA arrival + entry buffer"],["15:30","17:15","🎬 MAPPA EXPO • JJK priority"],["17:30","17:30","🚶 MAPPA → CHA・GINZA"],["17:45","18:00","🫖 CHA・GINZA"],["18:15","18:45","🔪 Kiya knife shopping"],["19:00","19:00","🟢 Ginza FLEX buffer"],["19:15","20:15","📚 Bar Lupin + light dinner"],["20:30","21:15","🚆 Ginza → Takadanobaba"]
    ]),
    5:blocksToSlots([
      ["06:30","06:45","🌅 Prep + breakfast"],["07:00","08:15","🚆 Takadanobaba → Ishikawacho"],["08:30","09:15","🏘️ Quiet Yamate morning walk"],["09:30","10:00","🏡 Italian Garden + Home of Diplomat"],["10:15","10:15","🚶 Walk across Yamate"],["10:30","10:45","🌳 France-yama + Harbor View → museum"],["11:00","12:00","📚 Sato Haruo exhibition × BSD"],["12:15","12:15","🚶 Walk down to Motomachi"],["12:30","12:45","🛍️ Motomachi"],["13:00","13:45","🍱 Lunch"],["14:00","14:30","🏮 Chinatown"],["14:45","15:00","⛲ Yamashita Park"],["15:15","15:45","🌊 Osanbashi"],["16:00","16:00","🚶 Zou-no-hana / Bashamichi pass-through"],["16:15","16:30","🧱 Red Brick Warehouse"],["16:45","18:00","🌆 Sunset + blue hour / night views"],["18:15","19:30","🍶 Noge dinner"],["19:45","19:45","🚆 Sakuragicho → Yokohama"],["20:00","20:45","🎌 Animate Yokohama VIVRE"],["21:00","21:15","🚉 Yokohama Station / train buffer"],["21:30","22:00","🚆 Yokohama → Takadanobaba"]
    ]),
    6:blocksToSlots([
      ["06:30","06:45","🌅 Prep"],["07:00","07:45","🚆 Takadanobaba → Gotokuji"],["08:00","09:00","🐱 Gotokuji Temple"],["09:15","09:45","🚆 Gotokuji → Minka-en"],["10:00","12:00","🏘️ Nihon Minka-en • PROTECTED"],["12:15","13:15","🚆 Minka-en → Ikebukuro / Manmaru"],["13:30","14:00","🍱 Manmaru Honten unagi"],["14:15","16:15","⌨️ Keyboard shopping • PROTECTED"],["16:30","16:30","🧳 Locker + snack + bathroom"],["16:45","17:15","🚶 Brillia HALL + theater entry prep"],["17:30","17:30","🎟️ Seated / pre-show buffer"],["17:45","20:45","🎭 SPY×FAMILY 2 Musical"],["21:00","21:00","🎭 Exit theater / regroup"],["21:15","22:00","🍽️ Dinner / optional final keyboard purchase"],["22:15","22:45","🚆 Ikebukuro → Takadanobaba"]
    ]),
    7:blocksToSlots([
      ["06:30","06:45","🌅 Prep + quick breakfast"],["07:00","07:45","🚆 Takadanobaba → Sayamashi"],["08:00","09:00","🚌 Sayamashi → Miyanoen area + walk"],["09:15","09:45","🍵 Miyanoen arrival / check-in buffer"],["10:00","11:15","🍵 Miyanoen tea-picking • RESERVATION TARGET"],["11:30","11:45","🫖 Tea shop + walk to bus"],["12:00","13:15","🚌🚆 Miyanoen → Koganei area"],["13:30","13:45","🍜 Quick lunch"],["14:00","16:15","🏛️ Edo-Tokyo Open Air Museum"],["16:30","17:00","🚆 Museum → Kichijoji"],["17:15","18:15","🏮 Kichijoji Sunroad + backstreets"],["18:30","19:30","🍶 Harmonica Yokocho dinner"],["19:45","20:15","🚆 Kichijoji → Iidabashi"],["20:30","21:15","🏮 Kagurazaka evening • BONUS"],["21:30","21:45","🚇 Kagurazaka → Takadanobaba"],["22:00","22:45","🧳 Final packing"]
    ]),
    8:blocksToSlots([
      ["06:00","06:15","🌅 Wake + final prep"],["06:30","06:45","🧳 Checkout + travel to Shinjuku"],["07:00","07:15","🚉 N’EX platform / boarding buffer"],["07:30","08:45","🚆 N’EX 7 • Shinjuku → NRT T2・3"],["09:00","09:15","🛍️ primaniacs T2 • PRE-SECURITY"],["09:30","10:00","🛄 Check-in + bag drop + immigration/security"],["10:15","11:15","🛍️ Airside shopping + meal"],["11:30","12:00","✈️ Gate / final buffer"],["12:15","12:30","✈️ Boarding / stay at gate"],["12:45","17:15","✈️ 5J 5055 • NRT T2 → MNL T3"],["17:30","21:30","🛄 MNL T3 layover / connection"],["21:45","23:00","✈️ 5J 2269 • MNL T3 → ILO"],["23:15","23:45","🏠 Arrive Iloilo / baggage + exit"]
    ])
  };

  X.reservations=[
    ["Reservation / Booking","Date / Time","Type","Status","Needs booking?","What to do","Recommended reserve date","Cost"],
    ["Hananosato Takadanobaba","Oct 18–25","Hotel","✅ DONE","Required","Already booked","Done","Already booked — see confirmation"],
    ["Lutia Shinjuku","Oct 20 • 11:00","Hair appointment","✅ DONE","Required","Already reserved; arrive 10–15 minutes early.","Done","~¥18,000"],
    ["MAPPA EXPO 15th Anniversary","Oct 21 • 15:30 target","Timed event","🟡 TO BUY / NOT YET SECURED","Required if attending","Buy 2 × JJK Goods-Set C tickets for 15:30. Use 16:00 only if 15:30 is unavailable.","NOW — Sep 10, 2026","¥8,000 couple (2 × ¥4,000 JJK Goods-Set C)"],
    ["Unagi-to-jizake Manmaru Honten — Ikebukuro","Oct 23 • ~13:30","Restaurant / unagi lunch","🟡 TO RESERVE","Recommended","Reserve a table for 2 around 13:30 so lunch does not eat into the protected keyboard block.","NOW — Sep 10, 2026 • Oct 23 is already selectable; submit the 13:30 request now","~¥5,000–8,000 couple"],
    ["Nihon Minka-en / Japan Open-Air Folk House Museum","Oct 23 • ~10:00–12:15","Open-air museum / old-Japan experience","🟢 NO RESERVATION NEEDED","No","Buy admission on arrival after Gotokuji.","Oct 23 — day of","¥1,100 couple (¥550/adult)"],
    ["SPY×FAMILY 2 Musical","Oct 23 • 17:45","Physical tickets","🟠 PAID — SHIPPING / PICKUP PENDING","Already bought","Cousin sends physical tickets by Yamato Sales Office Pickup. Track before collection; bring passport + tracking number.","Already purchased • ship target Oct 19 • pickup target Oct 20 ~08:00","¥22,000 PAID — excluded from remaining trip budget"],
    ["Miyanoen Sayama Tea-Picking","Oct 24 • 10:00","Experience","🔴 TO RESERVE","REQUIRED","Request 10:00 for 2 adults + chamusume outfits. Ask for outfit availability/fee and exact finish time.","NOW — Sep 10, 2026","¥4,000+ couple; chamusume outfit fee TBD"],
    ["Edo-Tokyo Open Air Architectural Museum — Tokyo Grand Tea Ceremony","Oct 24 • ~13:45/14:00","Museum + optional tea ceremony","🟢 NO ADVANCE MUSEUM TICKET NEEDED","No museum booking; tea ceremony same-day only","Museum admission is free Oct 24. Optional tea ceremony tickets are same-day, first-come-first-served.","Oct 24 — same day only if you want a tea ceremony","Museum ¥0; optional tea ceremony ¥800/person"],
    ["N'EX TOKYO Round Trip + Reserved Seats","Oct 18 arrival + Oct 25 departure","Transport","🟡 TO BUY / RESERVE SEATS","Yes for reserved seats","Buy the round-trip ticket and reserve arrival N’EX 50. Reserve return N’EX 7 separately when its one-month window opens.","Sep 18, 10:00 JST — Oct 18 seat • Sep 25, 10:00 JST — Oct 25 seat","¥10,400 couple (¥5,200/adult round trip)"],
    ["Enoden Noriorikun 1-Day Pass","Oct 19","Transport","🟢 BUY SAME DAY","No reservation","Buy from the Enoden ticket machine at Kamakura Station.","Oct 19 — day of","¥1,600 couple (¥800/adult)"],
    ["Odakyu Romancecar Enoshima No. 6","Oct 19 • 19:39 Katase-Enoshima → 20:48 Shinjuku","Transport / reserved-seat limited express","🟡 TO BUY / RESERVE","Recommended for preferred return","Buy 2 seats for Enoshima No. 6. All Romancecar seats are reserved.","Sep 19, 2026 at 10:00 JST — book when sales open","Ticketless limited-express surcharge ¥1,400 couple + base IC fare ~¥1,298 couple"],
    ["Sayama / Koganei local buses","Oct 24","Transport","🟢 NO RESERVATION","No","Use the current Saturday timetable; taxi is the no-drama fallback if a connection slips.","Oct 24 — day of","Local IC/bus fares included in Day 7 transport budget"],
    ["Hōnenya / 豊年屋 — Kokubunji","Oct 21 • 11:30","Local soba lunch","🟢 WALK-IN","No reservation planned","Arrive around 11:30 after the Kokubunji spring/temple area.","Oct 21 — walk in","~¥2,000–4,000 couple"],
    ["Bar Lupin","Oct 21 • ~19:15","Bar / BSD pilgrimage","🟢 WALK-IN","No","Walk in after CHA・GINZA + Kiya knife shopping.","Oct 21 — walk in","~¥6,000–10,000 couple"],
    ["夜のケーキ屋さん® 歌舞伎町 — Custom Celebration Cake","Oct 20 • 24:15–24:30 (technically Oct 21 after midnight)","Custom celebration cake / pickup","🔴 TO ORDER / CUSTOMIZE","Required for exact design","Order via official LINE. Request Oct 20 24:15–24:30 pickup. Design: pink 19 August • pink→lilac 14 September • lilac 10 October; dates only.","Sep 20, 2026 — message on first day of the 1-month order window","Planning reserve ¥5,000–7,000"]
  ];

  X.budget=[
    ["💰 JAPAN TRIP BUDGET – COUPLE","Budget","Main spending breakdown"],
    ["Day 1 – Arrival + N'EX","¥30,000  |  ≈ ₱12,000","N'EX round-trip tickets ¥10,400 + dinner/snacks + local transport/arrival expenses → ~¥30,000"],
    ["Day 2 – Kamakura + Enoshima","¥45,000  |  ≈ ₱18,000","Kamakura/Enoshima transport + Enoden pass ¥1,600 + ⭐ Romancecar Enoshima No. 6 reserved-seat surcharge + attractions + meals/snacks + small shopping → conservative cap remains ~¥45,000"],
    ["Day 3 – Lutia + 100-Yen + Nakano + Shibuya + Donki + Custom Cake","¥225,000  |  ≈ ₱90,000","Lutia hair salon ¥18,000 + protected 100-yen shopping + Nakano anime shopping + PROTECTED 2+ hr SHIBUYA109 block ¥30,000 + Shibuya MODI/Onitsuka + Martin's 3-pair shoe reserve ¥70,000 + Don Quijote ¥50,000 + custom celebration cake ¥5,000–7,000 + late-night taxi after cake + meals/transport + optional NOSE SHOP browsing. Detailed planning range is ~¥201,000–220,000; safe Day 3 cap is ¥225,000. The shoe reserve is now included here instead of a separate trip-budget row."],
    ["Day 4 – Kokubunji + MAPPA + Ginza","¥133,000  |  ≈ ₱53,200","Kokubunji transport + Tonogayato/Otaka admissions + Hōnenya / 豊年屋 soba lunch + MAPPA JJK goods-set ticket plan ¥8,000 couple (regular advance would be ¥4,000 couple) + merch + Ginza knife reserve ¥20,000–35,000 + CHA・GINZA tea + Bar Lupin food/drinks + contingency → safe cap remains ¥133,000. Asakusa/Maekawa/rakugo are removed."],
    ["Day 5 – Yokohama + BSD Pilgrimage + Animate","¥40,000  |  ≈ ₱16,000","Yamate/Diplomat's House + France-yama + Sato Haruo exhibition/BSD collaboration admission ¥1,600 couple + Chinatown + Yamashita/Osanbashi/Zou-no-hana/Jack's Tower + Red Brick + Noge + Animate Yokohama BSD goods → conservative cap remains ~¥40,000"],
    ["Day 6 – Gotokuji + Minka-en + Manmaru Unagi + Ikebukuro Keyboards + SPY×FAMILY 2","¥150,000  |  ≈ ₱60,000","SPY tickets already PAID/excluded + Nihon Minka-en admission ¥1,100 couple + Gotokuji + Manmaru Honten unagi lunch ~13:30 + ¥80,000 reserve for two prebuilt gaming keyboards + accessories + theater merch + meals/transport → safe cap remains ¥150,000. Overall trip cap unchanged."],
    ["Day 7 – Sayama Tea + Open Air Museum + Kichijoji + Kagurazaka","¥25,000  |  ≈ ₱10,000","Miyanoen tea picking + outfit option + Sayama/Koganei transport + Edo-Tokyo Open Air Museum (FREE admission Oct 24 during Tokyo Grand Tea Ceremony 2026) + Kichijoji/Harmonica Yokocho + Kagurazaka evening + meals + tea/small shopping + optional AUX PARADIS browse → conservative cap remains ~¥25,000. Optional tea-ceremony participation, if chosen same-day, is covered by the existing cushion. The planned 2 primaniacs perfumes are budgeted on Day 8, not here."],
    ["Day 8 – Departure","¥37,000  |  ≈ ₱14,800","Final departure-day plan: light breakfast + local train + airport food + last-minute souvenirs + contingency + 2 primaniacs character fragrances ¥15,840 (rounded reserve ¥16,000); N'EX already prepaid. Manila connection currently stays within NAIA T3 for both Cebu Pacific 5J flights, so no T3→T2 transfer is planned. Base Day 8 spend is ~¥12,000–21,000; with the perfume reserve, safe Day 8 cap is ¥37,000."],
    ["✈️ Cebu Pacific additional baggage","¥7,500  |  ≈ ₱3,000","Additional checked-baggage allowance / baggage upgrade reserve with Cebu Pacific → max ₱3,000"],
    ["TOTAL TRIP BUDGET","¥692,500  |  ≈ ₱277,000","All planned purchases are assigned to the day they occur: Day 3 includes Martin's ¥70,000 three-pair shoe reserve; Day 8 includes the ¥16,000 reserve for 2 primaniacs perfumes. Also includes up to ₱3,000 for additional Cebu Pacific baggage. Overall total remains unchanged."],
    ["💴 Physical cash to withdraw","¥88,000  |  ≈ ₱35,200",""],["📱 Suica – Cha","¥15,000  |  ≈ ₱6,000",""],["📱 Suica – Martin","¥15,000  |  ≈ ₱6,000",""],["📱 Suica total","¥30,000  |  ≈ ₱12,000",""]
  ];

  S.days=[
    ["Oct 18 Sun","Day 1 • Flight + Arrival","Wake/prep • travel to ILO airport • ILO → MNL → Narita T2 → Shinjuku → Takadanobaba • self-check-in • light dinner/groceries","02:45 wake/prep • airport target ~04:45 • 5J 448 07:50–09:10 • 5J 5056 12:15–18:00 • ⭐ N’EX 50 preferred","02:45 wake/prep","~22:00 hotel if N’EX 50","¥30,000","04:15 travel to Iloilo Airport • arrive ~04:45 • 5J 448 ILO→MNL T2 • T2→T3 transfer • 5J 5056 MNL T3→NRT T2 • N’EX 50: 19:53→21:18","Wake/prep starts ~02:45 so the airport target is ~04:45, about 3h05 before the 07:50 flight. Manila transfer is T2 arrival → T3 departure. At Narita use Terminal 2. If not fully ready in the JR station area by ~19:30–19:35, use N’EX 52 at 20:47 instead of rushing."],
    ["Oct 19 Mon","Day 2 • Kamakura + Enoshima","Renbai • Great Buddha • Goryo/Joju-in/Gokurakuji • Inamuragasaki • Koshigoe • Enoshima Iwaya • sunset","Great Buddha protected • sunset ~17:03","05:45","~21:45 hotel","¥45,000","Takadanobaba → Shinagawa → Kamakura • ⭐ 19:39 Romancecar Enoshima No. 6 → Shinjuku 20:48 if reserved","Cut Inamuragasaki time / optional Shonan Candle first if behind"],
    ["Oct 20 Tue","Day 3 • Shinjuku + Nakano + Shibuya + Custom Cake","Yamato ticket pickup • Can★Do Nishi-Shinjuku • Lutia • optional 100-yen buffer • Nakano Broadway • Shibuya MODI BSD × h.NAOTO + Onitsuka • SHIBUYA109 ≥2h • MEGA Donki • 夜のケーキ屋さん custom cake pickup","Lutia 11:00–13:30 ✅ booked • BSD × h.NAOTO at Shibuya MODI before 20:00 • custom cake 🔴 order via official LINE; pickup requested as Oct 20 24:15–24:30","07:35","~00:50 hotel","¥225,000","JR local day • morning Can★Do • ⭐ Shinjuku→Nakano 14:28 Chuo-Sobu Local target • ⭐ Nakano 16:37 local→Shinjuku→Yamanote to Shibuya • late Yamanote Shibuya→Shinjuku • taxi Kabukicho→Hananosato after cake","Protect morning 100-yen shopping, ~14:40–16:30 Nakano, ~17:00–18:15 MODI, and ~18:30–21:00 SHIBUYA109. Cake pickup is after Donki; taxi home is primary with the fragile cake."],
    ["Oct 21 Wed","Day 4 • Kokubunji + MAPPA + Ginza","Tonogayato Garden • Otaka-no-Michi springs • Musashi Kokubunji • Hōnenya / 豊年屋 soba • MAPPA • CHA Ginza • Kiya • Bar Lupin","MAPPA target 15:30 • arrival buffer from ~14:45","~08:00 leave hotel","~21:15–21:30 hotel","¥133,000","Yamanote→Shinjuku • ⭐ ~08:14 Chuo Rapid target→Kokubunji • ⭐ ~12:53 Chuo eastbound target→Tokyo/Yurakucho • Metro return","Asakusa fully removed. Protect Tonogayato 09:00 opening + Kokubunji lunch; unagi moved to Day 6 Manmaru Honten."],
    ["Oct 22 Thu","Day 5 • Yokohama BSD","Yamate • Diplomat House • France-yama • BSD museum • Motomachi • Chinatown • Yamashita • Osanbashi • Red Brick • night views • Noge • Animate","BSD museum 11:00–12:10 • sunset 16:58 • Animate closes 21:00","~06:30 prep • ~07:03 train target","~22:15 hotel","¥40,000","Takadanobaba→Shinagawa→Ishikawacho • ⭐ Yokohama 21:26→Shinjuku return","Protect museum + sunset/blue hour + Animate; complete BSD worksheet, keep dated museum ticket stub for Animate ¥1,100+ BSD purchase mini-card benefit; pass-through stops absorb delays"],
    ["Oct 23 Fri","Day 6 • Gotokuji + Minka-en + Unagi + Ikebukuro + SPY","Gotokuji • Nihon Minka-en • Manmaru Honten unagi • Ikebukuro keyboard stores • SPY×FAMILY 2 musical • optional post-show keyboard return","SPY musical 17:45 ✅ paid • Manmaru ~13:30 • keyboards ~14:20–16:20 PROTECTED • theater buffer from ~16:45","~07:00","~23:00 hotel","¥150,000","⭐ 07:21 Odakyu LOCAL Shinjuku→Gotokuji • ⭐ 09:32 Local Gotokuji→Mukogaoka-Yuen • ⭐ 12:38 Express Mukogaoka-Yuen→Shinjuku→Yamanote Ikebukuro • Manmaru west side → East Exit keyboard cluster","Reserve Manmaru lunch if possible to reduce waiting; keyboards BEFORE show remain primary."],
    ["Oct 24 Sat","Day 7 • Sayama + Koganei + Kichijoji + Kagurazaka","Miyanoen tea picking • Edo-Tokyo Open Air Museum + Tokyo Grand Tea Ceremony atmosphere • Kichijoji • Harmonica Yokocho • Kagurazaka","Miyanoen 10:00 reservation target • museum closes 16:30 • Oct 24 museum admission FREE during Tokyo Grand Tea Ceremony","~06:50","~21:45–22:00 hotel","¥25,000","⭐ 07:13 Seibu→Sayamashi 07:59 • ⭐ 08:22 bus • post-tea bus/train ladder • direct Chuo-Sobu to Iidabashi","Do not shorten Miyanoen for one bus. At the museum, protect architecture/JJK time first; Tokyo Grand Tea Ceremony participation is optional. Shorten Kagurazaka first if tired."],
    ["Oct 25 Sun","Day 8 • Departure + Flight Home","Checkout • Takadanobaba → Shinjuku • N’EX → Narita T2 • primaniacs character fragrance • T2 airside Fa-So-La AKIHABARA/anime shopping • 5J 5055 → Manila T3 • 5J 2269 → Iloilo from T3 under current Cebu Pacific 5J terminal policy","⭐ N’EX 7 07:27→08:58 • primaniacs pre-security ~09:05–09:25 • be airside by ~10:10 target • 5J 5055 NRT T2 12:50 • 5J 2269 MNL T3 21:50 under current 5J terminal policy","06:35 leave hotel","23:15 arrive Iloilo","¥37,000","⭐ Yamanote ~06:43 • N’EX 7 preferred • Manila connection currently stays in T3 for both 5J flights; 4h20 layover","Narita departure remains Terminal 2. Cebu Pacific currently assigns Manila 5J flights to T3, so no T3→T2 transfer is planned; still confirm final terminal and baggage/connection procedure before travel."]
  ];
  S.budget=[["Daily itinerary caps","¥599,000","≈ ₱239,600","Days 1–8 combined"],["Cebu Pacific baggage reserve","¥7,500","≈ ₱3,000",""],["2 perfumes reserve","¥16,000","≈ ₱6,400",""],["Martin shoes reserve — 3 pairs","¥70,000","≈ ₱28,000",""],["TOTAL CONSERVATIVE TRIP CAP","¥692,500","≈ ₱277,000","Suica preload is cash-flow, not double-counted"]];
})();