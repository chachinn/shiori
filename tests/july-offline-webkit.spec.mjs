import {test,expect} from '@playwright/test';

test('July 2027 stays usable after a genuine offline reload',async({page,context})=>{
 await page.goto('/?trip=2027');
 await expect(page.locator('.brand-title')).toContainText('Shiori');
 await expect(page.locator('[data-jday="day:9"]')).toBeVisible();
 await page.evaluate(()=>navigator.serviceWorker.ready);
 await page.reload();
 await page.locator('[data-jday="day:4"]').click();
 await expect(page.getByText('SAKURA SAMURAI',{exact:false}).first()).toBeVisible();
 await context.setOffline(true);
 await page.reload({waitUntil:'domcontentloaded'});
 await expect(page.locator('[data-jday="day:4"]')).toBeVisible();
 await expect(page.getByText('SAKURA SAMURAI',{exact:false}).first()).toBeVisible();
 await page.locator('[data-jday="day:9"]').click();
 await expect(page.getByText('08:55',{exact:false}).first()).toBeVisible();
 await context.setOffline(false);
});

test('July 2027 restores notes and opens safely on iPhone WebKit',async({page})=>{
 await page.goto('/?trip=2027');
 await expect(page.locator('.brand-title')).toContainText('JULY 10–19, 2027');
 await page.locator('[data-jday="day:2"]').click();
 await page.locator('[data-jnote="2"]').fill('Keep summer day relaxed');
 await page.reload();
 await expect(page.locator('[data-jnote="2"]')).toHaveValue('Keep summer day relaxed');
 await expect(page.locator('[data-jday="day:9"]')).toBeVisible();
 await page.locator('[data-shiori-trip="2026"]').click();
 await expect(page.getByText('October 2026 archive')).toBeVisible();
 await page.locator('[data-shiori-trip="2027"]').click();
 await expect(page.locator('[data-jnote="2"]')).toHaveValue('Keep summer day relaxed');
});
