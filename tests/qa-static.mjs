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
for(const file of ['data.js','sheet-mirror.js','sheet-extra.js','summary-full.js','sheet-sync.js','sheet-sync-v12.js','sheet-sync-v24.js','sheet-sync-v25.js','sheet-sync-v26.js','sheet-sync-v27.js','sheet-sync-v28.js','sheet-sync-v29.js','sheet-sync-v30.js','sheet-sync-v32.js','sheet-sync-v33.js','sheet-sync-v34.js'])vm.runInContext(read(file),context,{filename:file});
const D=context.window.SHioriData,M=context.window.SHioriSheetMirror,X=context.window.SHioriSheetExtra,S=context.window.SHioriFullSummary;
assert(D&&M&&X&&S,'One or more runtime data mirrors failed to initialize');
assert(context.window.SHioriSheetSyncVersion==='2026-10-14-v34','Latest Sheet sync patch did not execute');
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
assert(D.days.find(d=>d.day===7).timeline.some(r=>String(r[2]).includes('Mabashi Inari')),'Mabashi Inari optional stop missing');
assert(!D.days.find(d=>d.day===7).timeline.some(r=>String(r[2]).includes('Kichijoji')),'Kichijoji wrongly on Day7');
assert(D.days.find(d=>d.day===8).timeline.some(r=>String(r[2]).includes('FUDŌ NO ŌIDO')),'Narita sacred well missing');
assert(D.days.find(d=>d.day===8).timeline.some(r=>String(r[2]).includes('CALLIGRAPHY')),'Narita Calligraphy museum missing');
assert(D.days.find(d=>d.day===3).timeline.every(r=>!String(r[2]).toLowerCase().includes('cake')),'No cake should be scheduled');
assert(D.days.find(d=>d.day===3).priorities.some(r=>r.includes('Tetsugakudo')),'Day3 alternate Tetsugakudo option missing');
assert(D.days.find(d=>d.day===1).timeline.some(r=>String(r[2]).includes('Lawson')),'Day1 conditional Lawson pickup missing');
assert(X.reservations.some(r=>String(r[0]).includes('Enoden Suica')),'Enoden Suica/no day pass update missing');
assert(X.reservations.some(r=>String(r[0]).includes('Romancecar')&&String(r[3]).includes('OPTIONAL')),'Romancecar should remain unbooked optional');
assert(X.budget.some(r=>r[0]==='TOTAL TRIP BUDGET'&&String(r[1]).includes('703,500')),'Budget safe cap changed');
assert(Array.isArray(X.day8Breakdown)&&X.day8Breakdown.some(r=>r[0].includes('ESTIMATED DAY 8')),'Day8 cost breakdown missing');
assert(X.docs.immigration.includes('PH eTravel — outbound + return'),'eTravel docs missing');
assert(S.readiness?.length===15,'15 readiness checks missing');
assert(S.readiness.some(r=>r[1].includes('Travel insurance')&&r[3].includes('OPEN')),'Insurance warning not open');
assert(S.days[5][1].includes('Masugata'),'Day6 summary stale');
assert(S.days[7][2].includes('Fudō'),'Day8 summary missing sacred well');
assert(S.budget[0][1]==='¥696,000'&&S.budget.at(-1)[1]==='¥703,500','Summary budget caps stale');
assert(D.days.find(d=>d.day===9).end==='20:30 Iloilo','Day9 return arrival stale');
assert(M.transport[9].some(r=>String(r[2]).includes('Cebu Terminal 2 → Terminal 1')),'Cebu airport terminal routing missing');
assert(S.days[8][5]==='20:30 Iloilo','Day9 arrival summary wrong');
assert(X.reservations.some(r=>r[0]==='MAPPA EXPO 15th Anniversary'&&r[3].includes('BOOKED')),'MAPPA booking missing');
assert(X.reservations.some(r=>r[0]==='Hitsumabushi Nagoya Bincho — Ikebukuro PARCO'&&r[3].includes('ALLERGY CONTACT')),'Bincho pending action missing');
assert(X.reservations.some(r=>String(r[0]).includes('Custom Cake')&&r[1].includes('UNDECIDED')),'Cake must be undecided');
assert(X.reservations.some(r=>r[0]==='Toyoko Inn Narita Airport Honkan'&&r[3].includes('BAG DROP CONFIRM')),'Toyoko bag drop unresolved');
assert(context.window.SHioriIfTimeSourceV34?.reduce((n,g)=>n+g.rows.length,0)===65,'IfTime 65 options incomplete');
assert(read('index.html').includes('ui-extras-v34.js'),'Readiness and detail UX layer not loaded');
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
