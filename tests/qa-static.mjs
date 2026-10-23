import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const fail=msg=>{throw new Error(msg)};
const assert=(cond,msg)=>{if(!cond)fail(msg)};
const norm=v=>String(v??'').normalize('NFKC').trim().replace(/\s+/g,' ').toLowerCase();
const itineraryKey=(day,row)=>`it|${day}|${norm(row[2])}|${norm(row[3])}`;
const packingKey=(group,item)=>`pack|${norm(group)}|${norm(item)}`;

const index=read('index.html');
const sw=read('sw.js');
const versions=[...index.matchAll(/\?v=(\d+)/g)].map(m=>m[1]);
assert(versions.length>0,'index.html has no cache-busted assets');
assert(new Set(versions).size===1,`index.html mixes asset versions: ${[...new Set(versions)].join(', ')}`);
const release=versions[0];
assert(sw.includes(`const CACHE='shiori-v${release}'`),`sw.js cache version does not match index v${release}`);

const refs=[...index.matchAll(/(?:src|href)="([^"?#]+)(?:\?[^"#]*)?"/g)].map(m=>m[1]).filter(p=>!p.startsWith('http')&&!p.startsWith('data:')&&!p.startsWith('#'));
for(const ref of refs)assert(fs.existsSync(path.join(root,ref)),`Missing index asset: ${ref}`);
const coreMatch=sw.match(/const CORE=\[(.*?)\];/s);assert(coreMatch,'Could not read service-worker CORE');
const core=[...coreMatch[1].matchAll(/'([^']+)'/g)].map(m=>m[1]);
for(const ref of core){if(ref!=='./')assert(fs.existsSync(path.join(root,ref)),`Missing service-worker CORE asset: ${ref}`)}

// Keep static integrity checks limited to data-only layers. Browser-coupled sync/UI
// layers are covered by Playwright below in the QA workflow.
const context=vm.createContext({window:{},console});
for(const file of ['data.js','sheet-mirror.js','sheet-extra.js','summary-full.js','sheet-sync.js','sheet-sync-v12.js','sheet-sync-v24.js','sheet-sync-v25.js','sheet-sync-v26.js','sheet-sync-v27.js','sheet-sync-v28.js','sheet-sync-v29.js','sheet-sync-v30.js','sheet-sync-v32.js','sheet-sync-v33.js','sheet-sync-v34.js','sheet-sync-v36.js','sheet-sync-v37.js','sheet-sync-v38.js','sheet-sync-v39.js','sheet-sync-v40.js'])vm.runInContext(read(file),context,{filename:file});
const D=context.window.SHioriData,M=context.window.SHioriSheetMirror,X=context.window.SHioriSheetExtra,S=context.window.SHioriFullSummary;
assert(D&&M&&X&&S,'One or more runtime data mirrors failed to initialize');
assert(context.window.SHioriSheetSyncVersion==='2026-10-24-v40','Latest Sheet sync patch did not execute');
assert(Array.isArray(D.days)&&D.days.length===9,`Expected 9 itinerary days, got ${D.days?.length}`);
assert(new Set(D.days.map(d=>d.day)).size===9,'Itinerary day numbers are duplicated');

const itineraryKeys=new Set();
for(let day=1;day<=9;day++){
  const d=D.days.find(x=>x.day===day);assert(d,`Missing itinerary Day ${day}`);
  for(const key of ['date','title','budget','start','end'])assert(String(d[key]??'').trim(),`Day ${day} missing ${key}`);
  assert(Array.isArray(d.timeline)&&d.timeline.length>0,`Day ${day} has no timeline`);
  d.timeline.forEach((row,i)=>{
    assert(Array.isArray(row)&&row.length>=5,`Day ${day} timeline row ${i+1} is malformed`);
    const k=itineraryKey(day,row);assert(!itineraryKeys.has(k),`Stable itinerary key collision: ${k}`);itineraryKeys.add(k);
  });
  const transport=M.transport?.[day];assert(Array.isArray(transport)&&transport.length>0,`Day ${day} has no transport rows`);
  transport.forEach((row,i)=>assert(Array.isArray(row)&&row.length>=6,`Day ${day} transport row ${i+1} is malformed`));
  const schedule=M.schedule?.[day];assert(Array.isArray(schedule),`Day ${day} has no 15-Min schedule array`);
  const seen=new Set();
  for(const [time,label] of schedule){
    assert(/^([01]\d|2[0-3]):(?:00|15|30|45)$/.test(time),`Day ${day} invalid 15-Min time: ${time}`);
    assert(!seen.has(time),`Day ${day} duplicate 15-Min time: ${time}`);seen.add(time);
    assert(typeof label==='string',`Day ${day} schedule label at ${time} is not text`);
  }
}

const packingKeys=new Set();
Object.entries(M.packing||{}).forEach(([group,items])=>items.forEach(item=>{const k=packingKey(group,item);assert(!packingKeys.has(k),`Stable packing key collision: ${k}`);packingKeys.add(k)}));
assert(Array.isArray(X.reservations)&&X.reservations.length>1,'Reservations mirror is empty');
assert(Array.isArray(X.budget)&&X.budget.length>1,'Budget mirror is empty');
assert(X.docs?.visa?.length>0&&X.docs?.immigration?.length>0,'IO Docs mirror is incomplete');
assert(M.packing&&Object.keys(M.packing).length>=3,'Packing groups are incomplete');
assert(M.pasalubong&&Object.keys(M.pasalubong).length>=3,'Pasalubong groups are incomplete');
assert(Array.isArray(S.days)&&S.days.length===9,`Summary expected 9 day rows, got ${S.days?.length}`);

// v34 reconciliation guards against the October 14 live Google Sheet.
assert(M.transport[2].length===15,'Day 2 transport 15 legs missing');
assert(M.transport[5].length===14,'Day 5 transport 14 legs missing');
assert(M.transport[6].length===12,'Day 6 12 legs missing');
assert(M.transport[7].length===15,'Day 7 13 primary + 2 weather backups missing');
assert(M.transport[8].length===10,'Day 8 ten transport legs missing');
assert(M.transport[6].some(r=>String(r[2]).includes('Masugata Tenjinsha')),'Masugata shrine transit missing');
assert(!M.transport[6].some(r=>String(r[2]).includes('Gotokuji')),'Gotokuji still routed on Day6');
assert(M.transport[7].some(r=>String(r[1]).includes('08:49')),'Day7 08:49 bus missing');
assert(M.transport[7].some(r=>String(r[1]).includes('12:03')),'Day7 12:03 bus missing');
assert(M.transport[8].some(r=>String(r[1]).includes('11:38')),'Day8 Sunday Keisei 11:38 missing');
assert(D.days.find(d=>d.day===6).title.includes('Masugata'),'Day6 title stale');
assert(!D.days.find(d=>d.day===6).timeline.some(r=>String(r[2]).includes('Gotokuji')),'Day6 itinerary still has Gotokuji');
assert(D.days.find(d=>d.day===6).timeline.some(r=>String(r[2]).includes('Minka-en')&&String(r[0]).includes('09:30')),'Minka-en full 09:30–11:30 missing');
assert(D.days.find(d=>d.day===7).timeline.some(r=>String(r[2]).includes('Nakano Broadway')),'Nakano Broadway missing');
assert(!D.days.find(d=>d.day===7).timeline.some(r=>String(r[2]).includes('Kichijoji')),'Kichijoji wrongly on Day7');
assert(D.days.find(d=>d.day===8).timeline.some(r=>String(r[2]).includes('FUDŌ NO ŌIDO')),'Narita sacred well missing');
assert(D.days.find(d=>d.day===8).timeline.some(r=>String(r[2]).includes('CALLIGRAPHY')),'Narita Calligraphy museum missing');
assert(D.days.find(d=>d.day===3).timeline.every(r=>!String(r[2]).toLowerCase().includes('cake')),'No cake should be scheduled');
assert(D.days.find(d=>d.day===3).priorities.some(r=>r.includes('Tetsugakudo')),'Day3 alternate Tetsugakudo option missing');
assert(D.days.find(d=>d.day===1).timeline.some(r=>String(r[2]).includes('✅ MAPPA physical tickets collected')),'Day1 ticket collection not updated');
assert(X.reservations.some(r=>String(r[0]).includes('Enoden Suica')&&String(r[0]).includes('4 rides')),'Day2 Enoden 4 ride update missing');
assert(X.reservations.some(r=>String(r[0]).includes('Romancecar')&&String(r[3]).includes('OPTIONAL')),'Romancecar should remain unbooked optional');
assert(X.budget.some(r=>r[0]==='TOTAL TRIP BUDGET'&&String(r[1]).includes('703,500')),'Budget safe cap changed');
assert(Array.isArray(X.day8Breakdown)&&X.day8Breakdown.some(r=>r[0].includes('ESTIMATED DAY 8')),'Day8 cost breakdown missing');
assert(X.docs.immigration.includes('PH eTravel — outbound + return'),'eTravel docs missing');
assert(S.readiness?.length===15,'15 readiness checks missing');
assert(S.readiness.some(r=>r[1].includes('Travel insurance')&&r[3].includes('OPEN')),'Insurance warning not open');
assert(S.days[5][1].includes('Masugata'),'Day6 summary stale');
assert(S.days[7][2].includes('Fudō'),'Day8 summary missing sacred well');
assert(S.days[1][2].includes('Renbai SKIPPED')&&S.days[1][2].includes('Slam Dunk'),'Day2 live route stale');
assert(D.days.find(d=>d.day===2).timeline.some(r=>String(r[2]).includes('Slam Dunk')),'Slam Dunk visit missing');
assert(!D.days.find(d=>d.day===2).timeline.some(r=>String(r[2]).includes('Renbai')),'Skipped market still in timeline');
assert(M.transport[2].some(r=>String(r[2]).includes('Kamakurakōkō-mae')),'Slam Dunk transport missing');
assert(S.readiness.find(r=>r[1]==='MAPPA EXPO physical Lawson tickets')[0]==='✅ DONE','Ticket collection status not complete');
assert(S.budget[0][1]==='¥696,000'&&S.budget.at(-1)[1]==='¥703,500','Summary budget caps stale');
assert(D.days.find(d=>d.day===9).end==='20:30 Iloilo','Day9 return arrival stale');
assert(M.transport[9].some(r=>String(r[2]).includes('Cebu Terminal 2 → Terminal 1')),'Cebu airport terminal routing missing');
assert(S.days[8][5]==='20:30 Iloilo','Day9 arrival summary wrong');
assert(X.reservations.some(r=>r[0]==='MAPPA EXPO 15th Anniversary'&&r[3].includes('COLLECTED OCT 18')),'MAPPA tickets not collected');
assert(X.reservations.some(r=>r[0]==='Hitsumabushi Nagoya Bincho — Ikebukuro PARCO'&&r[3].includes('ALLERGY CONTACT')),'Bincho pending action missing');
assert(X.reservations.some(r=>String(r[0]).includes('Custom Cake')&&r[1].includes('UNDECIDED')),'Cake must be undecided');
assert(X.reservations.some(r=>r[0]==='Toyoko Inn Narita Airport Honkan'&&r[3].includes('BAG DROP CONFIRM')),'Toyoko bag drop unresolved');
assert(context.window.SHioriIfTimeSourceV34?.reduce((n,g)=>n+g.rows.length,0)===65,'IfTime 65 options incomplete');
assert(read('index.html').includes('ui-extras-v34.js'),'Readiness and detail UX layer not loaded');
assert(D.days.find(d=>d.day===4).title.includes('Koganei Park'),'Day4 title must be Koganei, not Kokubunji');
assert(!D.days.find(d=>d.day===4).timeline.some(r=>/Tonogayato|Otaka-no-Michi|Kokubunji/.test(String(r[2]))),'Removed Kokubunji stops still in Day4 timeline');
assert(D.days.find(d=>d.day===4).timeline.some(r=>String(r[0]).includes('09:30–11:30')&&String(r[2]).includes('Edo-Tokyo')),'Two-hour 09:30 museum visit missing');
assert(D.days.find(d=>d.day===4).timeline.some(r=>String(r[2]).includes('SHIBUYA109')),'109 goods pickup missing');
assert(D.days.find(d=>d.day===4).timeline.some(r=>String(r[2]).includes('New Otani')),'Optional garden A missing');
assert(D.days.find(d=>d.day===4).timeline.some(r=>String(r[2]).includes('Hibiya Park')),'Optional garden B missing');
assert(D.days.find(d=>d.day===4).priorities.some(r=>r.includes('ONE')),'Garden exclusivity not clear');
assert(M.transport[4].some(r=>String(r[2]).includes('Shibuya')),'Shibuya transit missing');
assert(M.transport[4].some(r=>String(r[0])==='5A')&&M.transport[4].some(r=>String(r[0])==='5B'),'Both alternative branch routes missing');
assert(M.schedule[4].some(r=>r[0]==='09:30'&&r[1].includes('TWO HOURS')),'Early museum 15-min schedule missing');
assert(M.schedule[4].some(r=>r[0]==='12:45'&&r[1].includes('SHIBUYA109')),'109 schedule missing');
assert(S.days[3][2].includes('SHIBUYA109'),'Summary Day4 was not refreshed');
assert(X.budget.some(r=>r[0].startsWith('Day 4 – Koganei')&&r[1].includes('129,000')),'Day4 budget label or preserved cap stale');
assert(X.reservations.some(r=>String(r[0]).startsWith('Edo-Tokyo Open Air')&&String(r[1]).includes('09:30–11:30')),'Museum reservation date still old');
assert(context.window.SHioriIfTimeSourceV37?.some(g=>g.title.includes('KOGANEI PARK')),'Optional grouping did not sync');
assert(read('lookbook-v30.js').includes('Koganei Park • museum 09:30–11:30'),'Lookbook itinerary caption not updated');
assert(D.days.find(d=>d.day===4).timeline.some(r=>String(r[2]).includes('Yusha Kobo')&&String(r[2]).includes('PURCHASED')),'Keyboard actual missing Oct21');
assert(!D.days.find(d=>d.day===4).timeline.some(r=>String(r[2]).includes('Bar Lupin')),'Bar Lupin still scheduled Wednesday');
assert(D.days.find(d=>d.day===6).timeline.some(r=>String(r[2]).includes('Bar Lupin')),'Bar Lupin Friday missing');
assert(D.days.find(d=>d.day===6).timeline.some(r=>String(r[2]).includes('RELAX')),'Relaxed Friday afternoon missing');
assert(!D.days.find(d=>d.day===6).timeline.some(r=>/Yusha Kobo|Bic Camera|Yodobashi|KEYBOARD SHOPPING/i.test(String(r[2]))),'Friday keyboard errand still scheduled');
assert(D.days.find(d=>d.day===7).timeline.some(r=>String(r[2]).includes('Weather Shrine')),'Koenji shrine missing');
assert(!D.days.find(d=>d.day===7).timeline.some(r=>/Tsukimasa|Shimokitazawa|Kichijoji/i.test(String(r[2]))),'Old route restored');
assert(D.days.find(d=>d.day===8).timeline.some(r=>String(r[2]).includes('YAMANOAKARI')),'Narita tea stop missing');
assert(M.transport[6].some(r=>String(r[2]).includes('Bar Lupin')),'Friday late route missing');
assert(M.transport[7].some(r=>String(r[2]).includes('Koenji JR → Nakano JR ONE stop EAST')),'Nakano transit missing');
assert(M.transport[8].some(r=>String(r[2]).includes('YAMANOAKARI')),'Narita tea transit missing');
assert(M.schedule[4].some(r=>String(r[1]).includes('Yusha Kobo')),'Day4 actual purchase missing from schedule');
assert(M.schedule[6].some(r=>String(r[1]).includes('Bar Lupin')),'Friday Bar Lupin missing schedule');
assert(S.days[3][2].includes('Yusha Kobo'),'Day4 trip summary not updated');
assert(S.days[5][2].includes('Bar Lupin'),'Day6 summary not updated');
assert(X.budget.some(r=>r[0].startsWith('Day 4 –')&&r[2].includes('¥30,000')),'Actual keyboard cost not in budget');
assert(X.budget.some(r=>r[0].startsWith('Day 6 –')&&r[2].includes('¥50,000')),'50k flexible shopping reserve not preserved');
assert(X.reservations.some(r=>r[0]==='Bar Lupin'&&r[1].includes('Oct 23')),'Bar Lupin booking day wrong');
assert(context.window.SHioriIfTimeSourceV38?.reduce((n,g)=>n+g.rows.length,0)===68,'68 optional places incomplete');
assert(D.days.find(d=>d.day===5).timeline.some(r=>String(r[2]).includes('Tsubaki Sōzen')),'Day5 Japanese tea main stop missing');
assert(!D.days.find(d=>d.day===5).timeline.some(r=>String(r[2]).includes('Ten Ren')),'Skipped Chinatown tea still timed');
assert(!D.days.find(d=>d.day===5).timeline.some(r=>String(r[2]).includes('Yato Bridge')),'Old timed Yato Bridge stop not removed');
assert(D.days.find(d=>d.day===5).timeline.some(r=>r[0]==='11:00–12:10'&&String(r[2]).includes('Kanagawa Museum')),'BSD museum protected 11am missing');
assert(D.days.find(d=>d.day===5).timeline.some(r=>r[0]==='15:45–16:20'&&String(r[2]).includes('Osanbashi')),'Osanbashi protected rooftop missing');
assert(D.days.find(d=>d.day===5).timeline.some(r=>r[0]==='20:05–20:45'&&String(r[2]).includes('Animate')),'Animate protected ending missing');
assert(M.transport[5].length===14&&M.transport[5].some(r=>String(r[2]).includes('Tsubaki Sōzen')),'Day5 live transit missing tea route');
assert(M.schedule[5].length>=60&&M.schedule[5].some(r=>String(r[1]).includes('Tsubaki Sōzen')),'Day5 15-minute schedule missing tea');
assert(S.days[4][2].includes('Tsubaki'),'Day5 trip summary not updated');
assert(X.budget.some(r=>r[0].startsWith('Day 5 –')&&String(r[2]).includes('40,000')&&String(r[2]).includes('tea')),'Day5 unchanged budget and new tea not described');
assert(context.window.SHioriIfTimeSourceV39?.reduce((n,g)=>n+g.rows.length,0)===71,'71 live optional rows not present');
assert(context.window.SHioriIfTimeSourceV39.some(g=>g.title.includes('YOKOHAMA / BSD + OPTIONAL TEA')&&g.rows.some(r=>r[3].includes('Tsubaki Sōzen'))),'Yokohama optional tea shops not mirrored');
assert(read('lookbook-v30.js').includes('Nakano Broadway anime/retro shopping'),'Day7 Lookbook caption not updated');
assert(D.days.find(d=>d.day===5).timeline.some(r=>r[0]==='15:15–15:30'&&String(r[2]).includes('Information Culture')),'Yokohama late update missing');
assert(D.days.find(d=>d.day===6).timeline.some(r=>String(r[2]).includes('3COINS+plus')),'Bag stop missing');
assert(D.days.find(d=>d.day===7).budget==='¥40,000','Day7 cap stale');
assert(S.days[6][2].includes('Nakano Broadway'),'Day7 summary stale');
assert(M.schedule[7].some(r=>String(r[1]).includes('Nakano Broadway')),'Day7 schedule stale');
assert(context.window.SHioriIfTimeSourceV40?.reduce((n,g)=>n+g.rows.length,0)===71,'Optional list lost');
const latestData=JSON.stringify({days:D.days,transport:M.transport,schedule:M.schedule,planning:M.planning,reservations:X.reservations,budget:X.budget,summary:S});
assert(!latestData.includes('Manmaru Honten'),'Superseded Manmaru data leaked through the final Sheet sync');
assert(!latestData.includes('1781870115'),'Private Toyoko/Agoda booking ID leaked into public app data');
assert(!latestData.includes('R202609111253-S474iC'),'Private Dr.STONE reservation ID leaked into public app data');
assert(!latestData.includes('8894163455'),'Private MAPPA booking number leaked into public app data');
assert(!latestData.includes('639778444281'),'Private MAPPA pickup phone leaked into public app data');
assert(!latestData.includes('CM14'),'Private MAPPA pickup code leaked into public app data');
assert(!latestData.includes('Cha 11C')&&!latestData.includes('Martin 11B')&&!latestData.includes('Cha 16B')&&!latestData.includes('Martin 16C'),'Private seat assignments leaked into public app data');

const ifTime=read('if-time-v23.js');
for(const name of ['DAY 2 • OCT 19','DAY 3 • OCT 20','OGIKUBO THREE GARDENS','FLEXIBLE OTHER-DAY'])assert(context.window.SHioriIfTimeSourceV34.some(g=>g.title.includes(name)),'New IfTime group missing '+name);
for(const place of ['Gotokuji Temple (豪徳寺)','Tetsugakudo Park (哲学堂公園)','Mabashi Inari Shrine (馬橋稲荷神社) — DRAGON TORII'])assert(context.window.SHioriIfTimeSourceV34.some(g=>g.rows.some(r=>r[3]===place)),'Missing optional place '+place);
const lookbook=read('lookbook-v30.js');
assert(index.includes('lookbook-v30.js')&&index.includes('lookbook-v30.css'),'Outfit Lookbook assets are not loaded');
assert(sw.includes("'lookbook-v30.js'")&&sw.includes("'lookbook-v30.css'"),'Outfit Lookbook assets are not cached');
for(const place of ['Otomeyama Park (おとめ山公園)','Fashion Center Shimamura Takadanobaba'])assert(lookbook.includes(place),`Latest If We Have Time patch is missing ${place}`);
for(let d=1;d<=9;d++)assert(lookbook.includes(`day:${d},`),`Outfit Lookbook is missing Day ${d}`);
assert(lookbook.includes("martin:'Not added to the Sheet yet'"),'Outfit Lookbook should preserve the blank Martin Day 9 source state');
assert(lookbook.includes('PHOTO_PARTS')&&lookbook.includes('data-outfit-photo'),'Outfit Lookbook photo loader is missing');
for(let i=1;i<=7;i++){
  const p=`assets/outfits/lookbook-${i}.txt`;
  assert(fs.existsSync(path.join(root,p)),`Missing outfit photo chunk ${i}`);
  assert(sw.includes(`'${p}'`),`Outfit photo chunk ${i} is not cached for offline use`);
}
const app=read('app.js');
assert(app.includes('["days","🗓️","Days"]')&&app.includes('["summary","♡","Summary"]')&&app.includes('["transport","🚆","Transit"]')&&app.includes('["reservations","🎟️","Book"]')&&app.includes('["budget","¥","Budget"]'),'Bottom-nav contract changed unexpectedly');
const cleanup=read('ui-cleanup-v13.js');assert(cleanup.includes('delete labels.planning'),'Planning removal guard is missing');
const fix=read('ui-fix-v14.js');assert(fix.includes("scheduleDay:'schedule-day'")&&fix.includes("transitDay:'transit-day'"),'Day-switch attribute regression guard is missing');
const stateRuntime=read('state-runtime-v21.js');
assert(index.includes('state-runtime-v21.js')&&sw.includes("'state-runtime-v21.js'"),'Consolidated state runtime is not loaded and cached');
assert(stateRuntime.includes('delete done[old]')&&stateRuntime.includes('delete packDone[old]'),'Legacy positional-key cleanup is missing');
assert(index.includes('interaction-tools-v21.js')&&index.includes('interaction-tools-v21.css'),'Consolidated interaction assets are not loaded');
assert(sw.includes("'interaction-tools-v21.js'")&&sw.includes("'interaction-tools-v21.css'"),'Consolidated interaction assets are not cached');
for(const old of ['state-stable-v15.js','state-persist-v16.js','schedule-tools-v17.js','schedule-tools-v17.css','summary-actions-v18.js','summary-actions-v18.css','travel-actions-v19.js','travel-actions-v19.css','pwa-status-v20.js','pwa-status-v20.css','ui-v2.js','visual-v2.css'])assert(!fs.existsSync(path.join(root,old)),`Superseded/orphaned file still present: ${old}`);

console.log(`✓ Shiori static QA passed for v${release}`);
console.log(`✓ ${itineraryKeys.size} itinerary keys and ${packingKeys.size} packing keys are stable and collision-free`);
console.log('✓ Latest Sheet reconciliation, runtime consolidation and legacy-file cleanup validated');
