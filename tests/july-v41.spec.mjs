import {test,expect} from '@playwright/test';
test('July is primary and has Day 0–Day 9 including booked flights',async({page})=>{
 await page.goto('/');
 await expect(page.locator('.brand-title')).toContainText('Shiori');
 await expect(page.getByText('JULY 10–19, 2027')).toBeVisible();
 await expect(page.locator('[data-jday="day:0"]')).toBeVisible();
 await expect(page.locator('[data-jday="day:9"]')).toBeVisible();
 await expect(page.getByText('23:40 PHT',{exact:false}).first()).toBeVisible();
 await page.locator('[data-jday="day:9"]').click();
 await expect(page.getByText('08:55',{exact:false}).first()).toBeVisible();
});
test('Salon and shopping use latest Tuesday plan without claiming bookings',async({page})=>{
 await page.goto('/?trip=2027');
 await page.locator('[data-jday="day:3"]').click();
 await expect(page.getByText('LUTIA STRAIGHTENING — TENTATIVE',{exact:false}).first()).toBeVisible();
 await expect(page.getByText('SHIBUYA109',{exact:false}).first()).toBeVisible();
 await page.locator('[data-jview="reservations"]').first().click();
 await expect(page.getByText('Lutia Shinjuku — Kenta stylist')).toBeVisible();
 await expect(page.getByText('TENTATIVE • NOT BOOKED',{exact:false}).first()).toBeVisible();
});
test('July budget and payment allocations reconcile without double counting',async({page})=>{
 await page.goto('/?trip=2027');
 await page.locator('[data-jview="budget"]').first().click();
 await expect(page.getByText('¥533,000',{exact:true}).first()).toBeVisible();
 await expect(page.getByText('¥586,000',{exact:true}).first()).toBeVisible();
 await expect(page.getByText('¥80,000',{exact:true}).first()).toBeVisible();
 await expect(page.getByText('¥423,000',{exact:true}).first()).toBeVisible();
});
test('July saves independent notes and check-offs; October archive remains accessible',async({page})=>{
 await page.goto('/?trip=2027');
 const first=page.locator('[data-jtick]').first();
 await first.click();
 await page.locator('[data-jnote="0"]').fill('July trip note');
 await page.reload();
 await expect(page.locator('[data-jtick].on').first()).toBeVisible();
 await expect(page.locator('[data-jnote="0"]')).toHaveValue('July trip note');
 await page.locator('[data-shiori-trip="2026"]').click();
 await expect(page.getByText('October 2026 archive')).toBeVisible();
 await expect(page.getByText('Oct 18–26, 2026',{exact:false}).first()).toBeVisible();
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('shioriState2027')).notes[0])).toBe('July trip note');
 await page.locator('[data-shiori-trip="2027"]').click();
 await expect(page.locator('[data-jnote="0"]')).toHaveValue('July trip note');
});
test('July extras, packing and outfit views do not reuse October photos',async({page})=>{
 await page.goto('/?trip=2027');
 await page.locator('[data-jview="packing"]').first().click();
 await expect(page.getByText('Severe seafood allergy emergency kit')).toBeVisible();
 await page.locator('[data-jview="lookbook"]').first().click();
 await expect(page.getByText('No new outfit photos assigned',{exact:false})).toBeVisible();
 await expect(page.locator('[data-outfit-photo]')).toHaveCount(0);
 await page.locator('[data-jview="ifTime"]').first().click();
 await expect(page.getByText('Fukagawa Edo Museum',{exact:false}).first()).toBeVisible();
});
