import {test,expect} from '@playwright/test';

test('latest Sheet updates appear across itinerary, schedule, transport, bookings and budget',async({page})=>{
  await page.goto('/');
  await page.getByRole('button',{name:'Itinerary'}).click();
  await page.getByRole('button',{name:'Day 3'}).click();
  await expect(page.getByText('Dr.STONE PARTY vol.2 — ✅ BOOKED 14:50')).toBeVisible();
  await expect(page.getByText('Nakano Broadway',{exact:false})).toBeVisible();
  await expect(page.getByText('¥225,000',{exact:true}).first()).toBeVisible();

  await page.getByRole('button',{name:'15-Min'}).click();
  await page.getByRole('button',{name:'Day 3'}).click();
  await expect(page.getByText('Dr.STONE PARTY vol.2 • ✅ BOOKED 14:50')).toBeVisible();

  await page.getByRole('button',{name:'Transport'}).click();
  await page.getByRole('button',{name:'Day 3'}).click();
  await expect(page.getByText('Lutia / Shinjuku → NATSLIVE CAFE Omotesando')).toBeVisible();
  await expect(page.getByText('Nakano → Shinjuku → Shibuya')).toHaveCount(0);

  await page.getByRole('button',{name:'Bookings'}).click();
  await expect(page.getByRole('heading',{name:'Dr.STONE PARTY vol.2 — NATSLIVE CAFE Omotesando'})).toBeVisible();
  await expect(page.getByText('R202609111253-S474iC',{exact:false})).toBeVisible();
  await expect(page.getByText('Primary pickup Oct 20 if tracking says ready',{exact:false})).toBeVisible();

  await page.getByRole('button',{name:'Budget'}).click();
  await expect(page.getByRole('heading',{name:'Day 3 – Lutia + 100-Yen + Dr.STONE Omotesando + Shibuya + Donki + Custom Cake'})).toBeVisible();
  await expect(page.getByText('Nakano is removed from the fixed itinerary',{exact:false})).toBeVisible();
});

test('If We Have Time mirrors the new Sheet and persists cross-offs',async({page})=>{
  await page.goto('/');
  await page.getByRole('button',{name:'If We Have Time'}).click();
  await expect(page.getByRole('heading',{name:'If We Have Time'})).toBeVisible();
  await expect(page.getByText('Bic Camera Yurakucho',{exact:true})).toBeVisible();
  await expect(page.getByText('Inokashira Park',{exact:true})).toBeVisible();
  await expect(page.getByText('Mejiro Garden (目白庭園)',{exact:true})).toBeVisible();
  await expect(page.getByText('SOOTANG HOBBY OMOTESANDO',{exact:true})).toBeVisible();
  await expect(page.getByText('Zoshigaya Kishimojindo (鬼子母神堂)',{exact:true})).toBeVisible();
  await expect(page.getByText('Jiyugakuen Myonichikan (自由学園明日館)',{exact:true})).toBeVisible();
  await expect(page.locator('.iftime-row')).toHaveCount(44);

  const row=page.locator('.iftime-row').filter({hasText:'Bic Camera Yurakucho'});
  const check=row.locator('[data-iftime-tick]');
  await check.click();
  await expect(row).toHaveClass(/done/);
  await page.reload();
  await expect(page.getByRole('heading',{name:'If We Have Time'})).toBeVisible();
  await expect(page.locator('.iftime-row').filter({hasText:'Bic Camera Yurakucho'})).toHaveClass(/done/);
});
