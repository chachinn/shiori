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

const context=vm.createContext({window:{},console});
for(const file of ['data.js','sheet-mirror.js','sheet-extra.js','summary-full.js','sheet-sync.js','sheet-sync-v12.js'])vm.runInContext(read(file),context,{filename:file});
const D=context.window.SHioriData,M=context.window.SHioriSheetMirror,X=context.window.SHioriSheetExtra,S=context.window.SHioriFullSummary;
assert(D&&M&&X&&S,'One or more runtime data mirrors failed to initialize');
assert(Array.isArray(D.days)&&D.days.length===8,`Expected 8 itinerary days, got ${D.days?.length}`);
assert(new Set(D.days.map(d=>d.day)).size===8,'Itinerary day numbers are duplicated');

const itineraryKeys=new Set();
for(let day=1;day<=8;day++){
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
assert(Array.isArray(S.days)&&S.days.length===8,`Summary expected 8 day rows, got ${S.days?.length}`);

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
console.log('✓ Runtime consolidation and legacy-file cleanup validated');
