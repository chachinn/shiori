import { test, expect } from '@playwright/test';

async function openClean(page){
  await page.goto('/');
  await page.evaluate(()=>localStorage.clear());
  await page.reload();
}

test('mobile navigation and all itinerary days work', async ({page})=>{
  const pageErrors=[];
  page.on('pageerror',e=>pageErrors.push(e.message));
  await openClean(page);

  await expect(page.locator('.bottom-nav button')).toHaveCount(5);
  await expect(page.locator('.nav')).not.toContainText('Planning');
  await expect(page.locator('button[data-day]')).toHaveCount(8);

  for(let day=1;day<=8;day++){
    await page.locator(`button[data-day="${day}"]`).click();
    await expect(page.locator('.banner-day strong')).toHaveText(`Day ${day}`);
  }

  await expect(page.locator('.photo-highlights')).toHaveCount(1);
  expect(pageErrors).toEqual([]);
});

test('15-Min schedule has 96 rows and switches all days', async ({page})=>{
  const pageErrors=[];
  page.on('pageerror',e=>pageErrors.push(e.message));
  await openClean(page);
  await page.locator('.nav button[data-view="schedule"]').click();

  await expect(page.locator('.sched-time')).toHaveCount(96);
  await expect(page.locator('.sched-plan.occupied.merged').first()).toBeVisible();
  await expect(page.locator('button[data-schedule-day]')).toHaveCount(8);

  for(let day=1;day<=8;day++){
    await page.locator(`button[data-schedule-day="${day}"]`).click();
    await expect(page.locator(`button[data-schedule-day="${day}"]`)).toHaveClass(/active/);
    await expect(page.locator('.sched-time')).toHaveCount(96);
  }

  expect(pageErrors).toEqual([]);
});

test('Transport switches all days and keeps card layout', async ({page})=>{
  const pageErrors=[];
  page.on('pageerror',e=>pageErrors.push(e.message));
  await openClean(page);
  await page.locator('.nav button[data-view="transport"]').click();
  await expect(page.locator('button[data-transit-day]')).toHaveCount(8);

  for(let day=1;day<=8;day++){
    await page.locator(`button[data-transit-day="${day}"]`).click();
    await expect(page.locator(`button[data-transit-day="${day}"]`)).toHaveClass(/active/);
    await expect(page.locator('.transport-leg').first()).toBeVisible();
  }

  expect(pageErrors).toEqual([]);
});

test('Packing group switching remains functional', async ({page})=>{
  await openClean(page);
  await page.locator('.nav button[data-view="packing"]').click();
  await expect(page.locator('button[data-pack]')).toHaveCount(4);
  await page.locator('button[data-pack="Martin"]').click();
  await expect(page.locator('button[data-pack="Martin"]')).toHaveClass(/active/);
  await expect(page.locator('button[data-packtick]').first()).toBeVisible();
});

test('IO Docs checklist persists after reload', async ({page})=>{
  await openClean(page);
  await page.locator('.nav button[data-view="docs"]').click();
  const first=page.locator('button[data-doc-tick]').first();
  await expect(first).toBeVisible();
  await first.click();
  await expect(first).toHaveClass(/on/);

  await page.reload();
  await page.locator('.nav button[data-view="docs"]').click();
  await expect(page.locator('button[data-doc-tick]').first()).toHaveClass(/on/);
});

test('Pasalubong checklist persists after reload', async ({page})=>{
  await openClean(page);
  await page.locator('.nav button[data-view="pasalubong"]').click();
  const first=page.locator('button[data-gift-tick]').first();
  await expect(first).toBeVisible();
  await first.click();
  await expect(first).toHaveClass(/on/);

  await page.reload();
  await page.locator('.nav button[data-view="pasalubong"]').click();
  await expect(page.locator('button[data-gift-tick]').first()).toHaveClass(/on/);
});

test('Summary, Bookings and Budget render on mobile', async ({page})=>{
  await openClean(page);
  for(const [view,heading] of [['summary','Trip Summary'],['reservations','Bookings & Tickets'],['budget','Trip Budget']]){
    await page.locator(`.nav button[data-view="${view}"]`).click();
    await expect(page.locator('main')).toContainText(heading);
  }
});
