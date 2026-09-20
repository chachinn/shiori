import {test,expect} from '@playwright/test';

const topView=(page,view)=>page.locator(`.nav button[data-view="${view}"]`);

test('latest Sheet updates appear across itinerary, schedule, transport, bookings and budget',async({page})=>{
  await page.goto('/');
  await topView(page,'days').click();
  await page.locator('button[data-day="3"]').click();
  await expect(page.getByText('Dr.STONE PARTY vol.2 — ✅ BOOKED 14:50')).toBeVisible();
  await expect(page.getByText('¥225,000',{exact:true}).first()).toBeVisible();

  await page.locator('button[data-day="4"]').click();
  await expect(page.getByText('MAPPA EXPO 15th Anniversary — ✅ BOOKED')).toBeVisible();
  await expect(page.getByText('¥129,000',{exact:true}).first()).toBeVisible();

  await page.locator('button[data-day="6"]').click();
  await expect(page.getByText('Hitsumabushi Nagoya Bincho — ✅ BOOKED 13:30',{exact:true})).toBeVisible();
  await expect(page.getByText('Manmaru Honten',{exact:false})).toHaveCount(0);

  await topView(page,'schedule').click();
  await page.locator('button[data-schedule-day="3"]').click();
  await expect(page.getByText('Dr.STONE PARTY vol.2 • ✅ BOOKED 14:50')).toBeVisible();
  await expect(page.locator('.sched-time')).toHaveCount(96);
  await page.locator('button[data-schedule-day="4"]').click();
  await expect(page.getByText('MAPPA EXPO • ✅ BOOKED 16:00')).toBeVisible();
  await expect(page.locator('.sched-time')).toHaveCount(96);
  await page.locator('button[data-schedule-day="6"]').click();
  await expect(page.getByText('Hitsumabushi Bincho unagi')).toBeVisible();
  await expect(page.locator('.sched-time')).toHaveCount(96);

  await topView(page,'transport').click();
  await page.locator('button[data-transit-day="3"]').click();
  await expect(page.getByText('Lutia / Shinjuku → NATSLIVE CAFE Omotesando')).toBeVisible();
  await expect(page.getByText('Nakano → Shinjuku → Shibuya')).toHaveCount(0);
  await expect(page.locator('.transport-leg')).toHaveCount(12);
  await page.locator('button[data-transit-day="6"]').click();
  await expect(page.getByText('Ikebukuro Station → Ikebukuro PARCO Main Building 8F')).toBeVisible();
  await expect(page.locator('.transport-leg')).toHaveCount(12);
  await page.locator('button[data-transit-day="7"]').click();
  await expect(page.getByText('Kichijoji → Shimokitazawa')).toBeVisible();
  await expect(page.getByText('Kagurazaka',{exact:false})).toHaveCount(0);
  await expect(page.locator('.transport-leg')).toHaveCount(13);

  await topView(page,'reservations').click();
  await expect(page.getByRole('heading',{name:'MAPPA EXPO 15th Anniversary'})).toBeVisible();
  await expect(page.getByText('Oct 21 • 16:00',{exact:true})).toBeVisible();
  await expect(page.getByText('✅ BOOKED',{exact:true}).first()).toBeVisible();
  await expect(page.getByRole('heading',{name:'Dr.STONE PARTY vol.2 — NATSLIVE CAFE Omotesando'})).toBeVisible();
  await expect(page.getByText('R202609111253-S474iC',{exact:false})).toBeVisible();
  await expect(page.getByRole('heading',{name:'Hitsumabushi Nagoya Bincho — Ikebukuro PARCO'})).toBeVisible();
  await expect(page.getByText('BOOKED — Sep 12, 2026',{exact:true})).toBeVisible();
  await expect(page.getByRole('heading',{name:'Miyanoen Sayama Tea-Picking'})).toBeVisible();
  await expect(page.getByText('BOOKED — Sep 17, 2026',{exact:true})).toBeVisible();
  await expect(page.getByRole('heading',{name:'夜のケーキ屋さん®️歌舞伎町 — Custom Cake'})).toBeVisible();
  await expect(page.getByText('Primary pickup Oct 20 if tracking says ready',{exact:false})).toBeVisible();

  await topView(page,'budget').click();
  await expect(page.getByRole('heading',{name:'Day 3 – Lutia + 100-Yen + Dr.STONE Omotesando + Shibuya + Donki + Custom Cake'})).toBeVisible();
  await expect(page.getByRole('heading',{name:'Day 6 – Gotokuji + Minka-en + Hitsumabushi Bincho + Ikebukuro Keyboards + SPY×FAMILY 2'})).toBeVisible();
  await expect(page.getByRole('heading',{name:'Day 7 – Sayama Tea + Open Air Museum + Kichijoji FLEX + Shimokitazawa'})).toBeVisible();
  await expect(page.getByRole('heading',{name:'TOTAL TRIP BUDGET'})).toBeVisible();
  await expect(page.getByText('¥688,500  |  ≈ ₱275,400',{exact:true})).toBeVisible();
});

test('If We Have Time mirrors current grouped Sheet and persists cross-offs',async({page})=>{
  await page.goto('/');
  await topView(page,'ifTime').click();
  await expect(page.getByRole('heading',{name:'✨ IF WE HAVE TIME — NEARBY OPTIONS'})).toBeVisible();
  await expect(page.getByRole('heading',{name:'🌸 NEAR HOTEL / EASY ANY-DAY BONUSES'})).toBeVisible();
  await expect(page.getByRole('heading',{name:'🍜 RESTAURANTS / FOOD BACKUPS'})).toBeVisible();
  await expect(page.getByRole('heading',{name:'🛍️ SHOPPING / ANIME / FRAGRANCE'})).toBeVisible();
  await expect(page.getByRole('heading',{name:'🌿 QUIET / SCENIC / ARCHITECTURE'})).toBeVisible();
  await expect(page.getByText('Bic Camera Yurakucho',{exact:true})).toBeVisible();
  await expect(page.getByText('Inokashira Park',{exact:true})).toBeVisible();
  await expect(page.getByText('Mejiro Garden (目白庭園)',{exact:true})).toBeVisible();
  await expect(page.getByText('SOOTANG HOBBY OMOTESANDO',{exact:true})).toBeVisible();
  await expect(page.getByText('Zoshigaya Kishimojindo (鬼子母神堂)',{exact:true})).toBeVisible();
  await expect(page.getByText('Jiyugakuen Myonichikan (自由学園明日館)',{exact:true})).toBeVisible();
  await expect(page.locator('.iftime-row')).toHaveCount(26);

  const row=page.locator('.iftime-row').filter({hasText:'Bic Camera Yurakucho'});
  const check=row.locator('[data-iftime-v23-tick]');
  await check.click();
  await expect(row).toHaveClass(/done/);
  await page.reload();
  await expect(page.getByRole('heading',{name:'✨ IF WE HAVE TIME — NEARBY OPTIONS'})).toBeVisible();
  await expect(page.locator('.iftime-row').filter({hasText:'Bic Camera Yurakucho'})).toHaveClass(/done/);
});
