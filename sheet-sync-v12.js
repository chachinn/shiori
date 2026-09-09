(function(){
  const D=window.SHioriData;
  const M=window.SHioriSheetMirror;
  if(!D||!M) return;

  const day1=D.days.find(d=>d.day===1);
  if(day1&&day1.timeline&&day1.timeline[2]){
    day1.timeline[2][0]="04:45–07:45";
    day1.timeline[2][4]="Bag drop, security, light breakfast, then wait airside until boarding. Keep passports, boarding passes and Manila T2→T3 transfer details accessible. Treat the full airport block as occupied.";
  }

  D.transport[1]=[
    "04:15–04:45 Hometown → Iloilo International Airport • Grab / car",
    "07:50–09:10 5J 448 • Iloilo → Manila T2",
    "09:10–12:15 Manila T2 → T3 • airport transfer + international departure process",
    "12:15–18:00 5J 5056 • Manila T3 → Narita T2",
    "N’EX 48 19:20→20:40 • ⭐ N’EX 50 19:53→21:18 • N’EX 52 20:47→22:09 • N’EX 54 21:47→23:12",
    "After N’EX arrival: Shinjuku → Takadanobaba • JR Yamanote • 2 stops",
    "Takadanobaba → Hananosato • Waseda Exit • ~5–8 min walk"
  ];

  M.transport[1]=[
    ["1","04:15–04:45","Hometown → Iloilo International Airport","Grab / car","Leave ~04:15 • target airport arrival ~04:45","Airport target is ~3h05 before the 07:50 flight."],
    ["2","07:50–09:10","Iloilo → Manila T2","Cebu Pacific 5J 448","Confirmed flight","Airport check-in / gate-wait block before departure is occupied time, not free time."],
    ["3","09:10–12:15","Manila T2 → Manila T3","Airport transfer + international departure process","Follow Cebu Pacific / NAIA baggage and transfer instructions","Do not treat the layover as free time; protect T2→T3 transfer, check-in/security and boarding buffer."],
    ["4","12:15–18:00","Manila T3 → Narita T2","Cebu Pacific 5J 5056","Confirmed flight","Arrive Narita Terminal 2 at 18:00."],
    ["5","~19:20–21:18 target","Narita Airport T2・3 → Shinjuku","JR Narita Express (N’EX)","N’EX 48 19:20→20:40 • ⭐ N’EX 50 19:53→21:18 • N’EX 52 20:47→22:09 • N’EX 54 21:47→23:12","Aim ⭐ N’EX 50. If not fully ready in JR area by ~19:30–19:35, take N’EX 52. N’EX 54 only if ticket/seat already secured before 21:45 cutoff."],
    ["6","After N’EX arrival","Shinjuku → Takadanobaba","JR Yamanote Line","Toward Ikebukuro / Ueno • 2 stops","Allow ~10–15 min to navigate from N’EX platform with luggage; take first suitable train."],
    ["7","~21:40–23:50 depending N’EX","Takadanobaba → Hananosato","Walk","Waseda Exit → Hananosato • ~5–8 min","Self check-in. Keep hotel address + entry instructions offline on both phones."]
  ];
})();