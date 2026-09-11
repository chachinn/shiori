import {test,expect} from '@playwright/test';

test('latest Sheet updates and If We Have Time checklist render and persist',async({page})=>{
  await page.goto('./');
  await page.getByRole('button',{name:'Day 3'}).click();
  await expect(page.getByText('Dr.STONE PARTY vol.2 — RESERVATION TARGET')).toBeVisible();
  await expect(page.getByText('Nakano Broadway',{exact:false})).toBeVisible();
  await expect(page.getByText('Nakano Broadway',{exact:false}).first()).toContainText('Nakano Broadway');

  await page.getByRole('button',{name:'If We Have Time'}).click();
  await expect(page.getByRole('heading',{name:/If We Have Time/})).toBeVisible();
  await expect(page.locator('.iftime-row')).toHaveCount(40);
  await expect(page.getByText('Bic Camera Yurakucho')).toBeVisible();
  await expect(page.getByText('Inokashira Park')).toBeVisible();
  const first=page.locator('[data-iftime-tick]').first();
  await first.click();
  await expect(page.locator('.iftime-row').first()).toHaveClass(/done/);
  await page.reload();
  await page.getByRole('button',{name:'If We Have Time'}).click();
  await expect(page.locator('.iftime-row').first()).toHaveClass(/done/);
});

test('Day 3 schedule uses Omotesando and no fixed Nakano block',async({page})=>{
  await page.goto('./');
  await page.getByRole('button',{name:'15-Min'}).click();
  await page.getByRole('button',{name:'Day 3'}).click();
  await expect(page.getByText(/Dr.STONE PARTY vol.2/)).toBeVisible();
  await expect(page.getByText(/Lutia → Omotesando/)).toBeVisible();
  await expect(page.getByText(/Nakano Broadway/)).toHaveCount(0);
  await expect(page.locator('.sched-time')).toHaveCount(96);
});