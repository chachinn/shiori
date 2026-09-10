(function(){
  function statusEl(){
    let el=document.getElementById('offline-status');
    if(!el){el=document.createElement('div');el.id='offline-status';el.className='offline-status';el.setAttribute('role','status');el.setAttribute('aria-live','polite');document.body.appendChild(el)}
    return el;
  }
  function updateStatus(){
    const el=statusEl();
    const offline=!navigator.onLine;
    el.hidden=!offline;
    el.textContent=offline?'Offline mode • itinerary, schedules and saved checklists still work. Maps and live links need internet.':'';
    document.documentElement.classList.toggle('is-offline',offline);
  }
  window.addEventListener('online',()=>{updateStatus();if('serviceWorker'in navigator)navigator.serviceWorker.ready.then(r=>r.update()).catch(()=>{})});
  window.addEventListener('offline',updateStatus);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)updateStatus()});
  updateStatus();
})();
