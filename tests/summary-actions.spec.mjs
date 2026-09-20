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
  await expect(panel).toContainText('4 open');
  await expect(panel).toContainText("N'EX TOKYO Round Trip + Reserved Seats");
  await expect(panel).toContainText('Odakyu Romancecar Enoshima No. 6');
  await expect(panel).toContainText('SPY×FAMILY 2 Musical');
  await expect(panel).toContainText('Custom Cake');
  await expect(panel).not.toContainText('MAPPA');
  await expect(panel).not.toContainText('Hitsumabushi Nagoya Bincho');
  await expect(panel).not.toContainText('Miyanoen Sayama Tea-Picking');
  await expect(panel).not.toContainText('Hananosato Takadanobaba');
});
