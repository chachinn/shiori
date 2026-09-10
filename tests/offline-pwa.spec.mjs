import { test, expect } from '@playwright/test';

test('Shiori reloads from the service worker while offline', async ({page,context})=>{
  await page.goto('/');
  await page.evaluate(()=>localStorage.clear());
  await page.reload();
  await page.waitForFunction(()=>navigator.serviceWorker&&navigator.serviceWorker.ready);
  await page.evaluate(()=>navigator.serviceWorker.ready.then(()=>{}));
  await page.reload();
  await expect(page.locator('.banner-day strong')).toBeVisible();

  await context.setOffline(true);
  await page.reload({waitUntil:'domcontentloaded'});
  await expect(page.locator('.banner-day strong')).toBeVisible();
  await expect(page.locator('#offline-status')).toBeVisible();
  await expect(page.locator('#offline-status')).toContainText('Offline mode');
  await page.locator('.nav button[data-view="schedule"]').click();
  await expect(page.locator('.sched-time')).toHaveCount(96);
  await context.setOffline(false);
});
