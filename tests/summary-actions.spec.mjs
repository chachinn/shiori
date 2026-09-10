import { test, expect } from '@playwright/test';

test('Summary shows current open pre-trip actions on mobile', async ({page})=>{
  await page.goto('/');
  await page.evaluate(()=>localStorage.clear());
  await page.reload();
  await page.locator('.nav button[data-view="summary"]').click();
  const panel=page.locator('.action-needed');
  await expect(panel).toBeVisible();
  await expect(panel).toContainText('Action Needed');
  await expect(panel.locator('.action-needed-row').first()).toBeVisible();
  await expect(panel).toContainText('MAPPA');
  await expect(panel).not.toContainText('Hananosato Takadanobaba');
});
