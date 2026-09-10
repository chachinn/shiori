import { test, expect } from '@playwright/test';

async function clean(page){await page.goto('/');await page.evaluate(()=>localStorage.clear());await page.reload()}

test('current screen and day selections survive reloads', async ({page})=>{
  await clean(page);

  await page.locator('button[data-day="5"]').click();
  await page.reload();
  await expect(page.locator('.banner-day strong')).toHaveText('Day 5');

  await page.locator('.nav button[data-view="schedule"]').click();
  await page.locator('button[data-schedule-day="7"]').click();
  await page.reload();
  await expect(page.locator('.nav button[data-view="schedule"]')).toHaveClass(/active/);
  await expect(page.locator('button[data-schedule-day="7"]')).toHaveClass(/active/);
  await expect(page.locator('.sched-time')).toHaveCount(96);

  await page.locator('.nav button[data-view="transport"]').click();
  await page.locator('button[data-transit-day="3"]').click();
  await page.reload();
  await expect(page.locator('.nav button[data-view="transport"]')).toHaveClass(/active/);
  await expect(page.locator('button[data-transit-day="3"]')).toHaveClass(/active/);

  await page.locator('.nav button[data-view="packing"]').click();
  await page.locator('button[data-pack="Martin"]').click();
  await page.reload();
  await expect(page.locator('.nav button[data-view="packing"]')).toHaveClass(/active/);
  await expect(page.locator('button[data-pack="Martin"]')).toHaveClass(/active/);

  const ui=await page.evaluate(()=>JSON.parse(localStorage.getItem('shioriState')).ui);
  expect(ui).toMatchObject({view:'packing',day:5,scheduleDay:7,transitDay:3,pack:'Martin'});
});
