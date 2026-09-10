import { test, expect } from '@playwright/test';

test('Transport cards expose Maps and Copy actions on mobile', async ({page})=>{
  await page.goto('/');
  await page.evaluate(()=>localStorage.clear());
  await page.reload();
  await page.locator('.nav button[data-view="transport"]').click();
  const first=page.locator('.transport-leg').first();
  await expect(first.locator('.travel-action-btn')).toHaveCount(2);
  const map=first.locator('a.travel-action-btn');
  await expect(map).toHaveAttribute('href',/maps\.apple\.com/);
  const copy=first.locator('button.travel-action-btn');
  await expect(copy).toHaveAttribute('data-copy-route',/.+/);
  await expect(copy).toHaveText(/Copy/);
});
