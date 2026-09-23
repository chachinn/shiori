(function(){
  const D=window.SHioriData,M=window.SHioriSheetMirror,X=window.SHioriSheetExtra;
  if(!D||!M||!X)return;

  // Reconcile the current live Sheet planning row with the already-booked Day 6 lunch.
  if(Array.isArray(M.planning)){
    const i=M.planning.findIndex(r=>r&&String(r[0]).includes('Hitsumabushi Nagoya Bincho'));
    if(i>=0)M.planning[i]=[
      'Hitsumabushi Nagoya Bincho — Ikebukuro PARCO ✅ ADDED DAY 6 • ✅ BOOKED',
      '13:30 lunch before keyboard shopping; BOOKED for 2 via EBICA. PARCO/East Exit location improves routing and preserves the protected 14:20–16:20 keyboard block.'
    ];
  }

  // Keep the visible Day 6 priority/status aligned with the Sheet.
  const day6=D.days&&D.days.find(d=>d.day===6);
  if(day6&&Array.isArray(day6.priorities)){
    day6.priorities=day6.priorities.map(p=>
      String(p).includes('Hitsumabushi Nagoya Bincho')
        ? 'Hitsumabushi Nagoya Bincho 13:30 ✅ BOOKED'
        : p
    );
  }

  // Preserve the latest reservation notes from the live Sheet.
  if(Array.isArray(X.reservations)){
    const hi=X.reservations.findIndex(r=>r&&r[0]==='Hitsumabushi Nagoya Bincho — Ikebukuro PARCO');
    if(hi>=0)X.reservations[hi][9]=
      "✅ BOOKED / CONFIRMED — Oct 23 at 13:30 for 2 people. Seat-only reservation; no set course and no prepayment shown. Ikebukuro PARCO Main Building 8F, 1-28-2 Minamiikebukuro. Booked through the restaurant's EBICA reservation site. The booking confirmation showed Other Requests as unanswered, so the shrimp/crab allergy note was not attached to this reservation.";

    const mi=X.reservations.findIndex(r=>r&&r[0]==='Miyanoen Sayama Tea-Picking');
    if(mi>=0)X.reservations[mi][9]=
      '✅ BOOKED / CONFIRMED — Oct 24, 2026 at 10:00 for 2 adults. Miyanoen replied 「かしこまりました。衣装もご用意します。」 confirming the request and that the chamusume outfit will be prepared. Outfit fee and exact finish time were not provided and remain TBD. Outdoor agricultural experience; if cancelled due to rain/weather, Miyanoen will contact by 22:00 the previous day. Do not shorten the experience to force one bus.';
  }

  window.SHioriSheetSyncVersion='2026-09-23-v26';
})();