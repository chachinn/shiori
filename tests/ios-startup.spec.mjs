import {test,expect} from '@playwright/test';

test('iPhone-style Safari opens, survives saved state and renders the current itinerary',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');
 await expect(page.locator('#app main')).toBeVisible();
 await expect(page.locator('.banner-day strong')).toBeVisible();
 await page.locator('.nav button[data-view="ifTime"]').click();
 await expect(page.locator('.iftime-row')).toHaveCount(71);
 await page.locator('.nav button[data-view="days"]').click();
 await page.locator('button[data-day="2"]').click();
 await expect(page.getByText('Slam Dunk',{exact:false}).first()).toBeVisible();
 await page.locator('button[data-day="4"]').click();
 await expect(page.getByText('SHIBUYA109 — missing-goods retrieval (SHORT)',{exact:true})).toBeVisible();
 await expect(page.getByText('Yusha Kobo — ONE keyboard PURCHASED ¥30,000',{exact:true})).toBeVisible();
 await page.locator('button[data-day="5"]').click();
 await expect(page.getByText('Tsubaki Sōzen (椿宗善 横浜元町店) — MAIN Japanese tea',{exact:true})).toBeVisible();
 await page.locator('button[data-day="6"]').click();
 await expect(page.getByText('3COINS+plus LUMINE Ikebukuro 5F — BAG SHOPPING PRIORITY',{exact:true})).toBeVisible();
 await expect(page.getByText('Bar Lupin after SPY — MOVED from Wednesday, OPTIONAL',{exact:true})).toBeVisible();
 await expect(page.getByText('Masugata Tenjinsha',{exact:false}).first()).toBeVisible();
 await page.locator('button[data-day="7"]').click();
 await expect(page.getByText('Nakano Broadway — anime / retro gaming priority shopping',{exact:true})).toBeVisible();
 await page.reload();
 await expect(page.locator('#app main')).toBeVisible();
 await expect(page.getByText('Nakano Broadway — anime / retro gaming priority shopping',{exact:true})).toBeVisible();
 expect(errors).toEqual([]);
});

test('repair page deletes only app file caches, retaining saved progress and notes',async({page})=>{
 await page.goto('/');
 await page.evaluate(()=>localStorage.setItem('shioriState',JSON.stringify({done:{'preserve-me':true},notes:{sample:'Keep this note'}})));
 await page.goto('/repair.html');
 await expect(page.getByRole('heading',{name:'🌸 Shiori recovery'})).toBeVisible();
 await page.getByRole('button',{name:'Repair app files and reopen Shiori'}).click();
 await page.waitForURL(/repair=35/);
 await expect(page.locator('#app main')).toBeVisible();
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('shioriState')||'{}'));
 expect(saved.done['preserve-me']).toBe(true);
 expect(saved.notes.sample).toBe('Keep this note');
});
