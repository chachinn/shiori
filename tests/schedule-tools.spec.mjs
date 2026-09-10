import { test, expect } from '@playwright/test';

async function clean(page){await page.goto('/');await page.evaluate(()=>localStorage.clear());await page.reload()}

test('15-Min Now/Next controls render and jump within the full schedule', async ({page})=>{
  await clean(page);
  await page.locator('.nav button[data-view="schedule"]').click();
  await page.locator('button[data-schedule-day="8"]').click();
  await expect(page.locator('[data-schedule-now]')).toBeVisible();
  await expect(page.locator('[data-schedule-next]')).toBeVisible();
  await expect(page.locator('.sched-time')).toHaveCount(96);
  const before=await page.evaluate(()=>scrollY);
  await page.locator('[data-schedule-next]').click();
  await page.waitForTimeout(500);
  expect(await page.evaluate(()=>scrollY)).toBeGreaterThan(before);
});

test('active top-nav and day chips are kept within their horizontal strips', async ({page})=>{
  await clean(page);
  await page.locator('button[data-day="8"]').click();
  await page.waitForTimeout(50);
  const dayVisible=await page.locator('button[data-day="8"]').evaluate(el=>{const a=el.getBoundingClientRect(),p=el.parentElement.getBoundingClientRect();return a.left>=p.left-1&&a.right<=p.right+1});
  expect(dayVisible).toBeTruthy();

  await page.locator('.nav button[data-view="pasalubong"]').click();
  await page.waitForTimeout(50);
  const navVisible=await page.locator('.nav button[data-view="pasalubong"]').evaluate(el=>{const a=el.getBoundingClientRect(),p=el.parentElement.getBoundingClientRect();return a.left>=p.left-1&&a.right<=p.right+1});
  expect(navVisible).toBeTruthy();
});
