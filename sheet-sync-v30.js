(function(){
  const D=window.SHioriData,M=window.SHioriSheetMirror,X=window.SHioriSheetExtra,S=window.SHioriFullSummary;
  if(!D||!M||!X||!S)return;
  function minutes(t){const a=t.split(':').map(Number);return a[0]*60+a[1]}
  function hhmm(n){return String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0')}
  function blocksToSlots(blocks){const out=[];for(const [s,e,label] of blocks){for(let n=minutes(s),z=minutes(e);n<=z;n+=15)out.push([hhmm(n),n===minutes(s)?label:'↳'])}return out}
  const d9=D.days.find(d=>d.day===9);
  if(d9)Object.assign(d9,{
    end:'20:30',
    overview:'Very early Toyoko checkout and free shuttle to Narita Terminal 2, then Cebu Pacific to Cebu. The updated itinerary now has a 6h20 scheduled Cebu connection: finish arrival formalities, baggage and the T2→T1 transfer first, then use the remaining time for a proper meal/rest before the 19:35 flight to Iloilo.',
    priorities:['⭐ Toyoko 05:10 shuttle','5J 5063 NRT T2 08:55→CEB T2 13:15','Cebu connection — 6h20 scheduled • finish T2→T1 transfer first','5J 4084 CEB T1 19:35→ILO 20:30','Verify checked-baggage piece count + weight for two keyboard boxes and shopping'],
    optional:['04:50 shuttle as early bonus','05:30 shuttle as backup','Narita T2 airside breakfast after formalities'],
    timeline:[
      ['04:20–04:40','🌅','Wake + final prep','Toyoko Honkan','Quick wash/get ready, eat the breakfast/snack bought the night before if wanted, and do a final room sweep.'],
      ['04:40–04:55','🧳','Check out + go to shuttle queue','Toyoko Honkan','Be downstairs by ~04:55. Toyoko buses are first-come-first-served and may leave early when full.'],
      ['⭐05:10','🚌','Toyoko Honkan → Narita Airport Terminal 2','Toyoko free shuttle','Primary for the 08:55 flight. 04:50 early bonus • ⭐05:10 primary • 05:30 backup.'],
      ['~05:25 onward','🛄','Airline check-in / bag drop / immigration / security','Narita T2','Follow the actual Cebu Pacific counter opening and airport instructions. Recheck purchased baggage piece count as well as weight.'],
      ['After security','🍱','Breakfast / airside shopping','Narita T2','Eat once formalities are complete and keep gate status visible.'],
      ['08:55–13:15','✈️','5J 5063 Narita T2 → Cebu T2','NRT → CEB','Confirmed updated international flight. Seat assignments remain in the private booking confirmation rather than the public app.'],
      ['13:15–19:35','🛄','Cebu connection • Terminal 2 → Terminal 1','Mactan-Cebu','6h20 scheduled connection. Complete immigration, customs, checked-baggage handling and the T2→T1 transfer first. Then use remaining time for a meal/rest.'],
      ['19:35–20:30','✈️','5J 4084 Cebu T1 → Iloilo','CEB → ILO','Confirmed updated domestic sector. Seat assignments remain in the private booking confirmation rather than the public app.'],
      ['20:30','🏠','Arrive Iloilo International Airport','Iloilo','Trip complete.']
    ]
  });
  M.transport[9]=[
    ['1','04:40–04:55','Toyoko room → lobby / checkout','Walk','Be downstairs ~04:55','Use breakfast bought the night before if needed.'],
    ['2','⭐05:10 onward','Toyoko Honkan → Narita Airport Terminal 2','Toyoko free shuttle','04:50 early bonus • ⭐05:10 primary • 05:30 backup','Terminal 2 is the first airport stop.'],
    ['3','08:55–13:15','Narita T2 → Cebu T2','Cebu Pacific 5J 5063','Confirmed updated flight','Latest itinerary: arrival Cebu T2 13:15.'],
    ['4','13:15–19:35','Cebu Terminal 2 → Terminal 1 connection','Airport connection / terminal transfer','International arrival T2 → domestic departure T1','6h20 scheduled connection. Complete formalities and transfer first; use remaining time for a meal/rest.'],
    ['5','19:35–20:30','Cebu T1 → Iloilo','Cebu Pacific 5J 4084','Confirmed updated flight','Arrive Iloilo 20:30.']
  ];
  M.schedule[9]=blocksToSlots([
    ['04:15','04:30','🌅 Wake + final prep'],['04:45','04:45','🧳 Checkout + Toyoko shuttle queue'],['05:00','05:15','🚌 ⭐05:10 Toyoko → NRT T2 • 04:50 early / 05:30 backup'],['05:30','07:30','🛄 NRT T2 check-in / bag drop / immigration / security'],['07:45','08:30','✈️ Gate / boarding buffer'],['08:45','13:00','✈️ 5J 5063 • NRT T2 → CEB T2 • dep 08:55 / arr 13:15'],['13:15','13:15','🛬 Arrive Cebu T2 • 13:15'],['13:30','16:00','🛄 Cebu arrival formalities + baggage/customs + T2→T1 transfer'],['16:15','19:15','🍽️ Cebu T1 layover • meal/rest • monitor gate for 5J 4084'],['19:30','20:15','✈️ 5J 4084 • CEB T1 → ILO • dep 19:35 / arr 20:30'],['20:30','20:30','🏠 Arrive Iloilo • 20:30']
  ]);
  if(D.transport)D.transport[9]=M.transport[9].map(r=>r[2]+': '+r[4]);
  if(Array.isArray(X.budget)){const i=X.budget.findIndex(r=>r&&String(r[0]).startsWith('Day 9 – Departure via Cebu'));if(i>=0)X.budget[i]=['Day 9 – Departure via Cebu','¥12,000  |  ≈ ₱4,800','Toyoko→NRT shuttle ¥0 + airport breakfast/meal + longer Cebu connection meal/snacks + small final contingency. Latest flights: 5J 5063 NRT T2 08:55→CEB T2 13:15, then 5J 4084 CEB T1 19:35→ILO 20:30.'];}
  if(Array.isArray(S.meta)){const dep=S.meta.find(r=>r&&r[0]==='Departure');if(dep)dep[1]='Oct 26 • NRT T2 08:55 → CEB T2 13:15 → CEB T1 19:35 → ILO 20:30';}
  if(Array.isArray(S.days)&&S.days[8])S.days[8]=['Oct 26 Mon','Day 9 • Departure via Cebu','Toyoko Honkan checkout • 05:10 free shuttle • Narita T2 departure • Cebu T2→T1 connection • Iloilo','⭐ Toyoko 05:10 shuttle • 5J 5063 NRT T2 08:55→CEB T2 13:15 • 5J 4084 CEB T1 19:35→ILO 20:30','~04:20 wake','20:30 Iloilo','¥12,000','⭐05:10 Toyoko shuttle→NRT T2 • Cebu arrival T2 → domestic departure T1 • 6h20 scheduled connection','Complete Cebu arrival formalities + T2→T1 transfer first, then use remaining layover time for a meal/rest and monitor the gate.'];
  window.SHioriSheetSyncVersion='2026-10-12-v30';
})();