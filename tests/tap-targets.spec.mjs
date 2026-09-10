import { test, expect } from '@playwright/test';

test('itinerary checkbox accepts taps outside the visible 24px square', async ({page})=>{
  await page.goto('/');
  await page.evaluate(()=>localStorage.clear());
  await page.reload();
  const button=page.locator('button[data-tick]').first();
  await expect(button).toBeVisible();
  const box=await button.boundingBox();
  expect(box).not.toBeNull();
  await page.mouse.click(box.x+box.width+7,box.y+box.height/2);
  await expect(button).toHaveClass(/on/);
});

test('packing checkbox keeps a comfortable mobile row target', async ({page})=>{
  await page.goto('/');
  await page.evaluate(()=>localStorage.clear());
  await page.reload();
  await page.locator('.nav button[data-view="packing"]').click();
  const row=page.locator('.pack-row').first();
  const button=row.locator('button[data-packtick]');
  await expect(button).toBeVisible();
  const grid=await row.evaluate(el=>getComputedStyle(el).gridTemplateColumns);
  expect(parseFloat(grid)).toBeGreaterThanOrEqual(44);
});
