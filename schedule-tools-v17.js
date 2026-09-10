(function(){
  function revealActive(strip){
    if(!strip)return;
    const active=strip.querySelector('button.active');if(!active)return;
    const left=active.offsetLeft-(strip.clientWidth-active.offsetWidth)/2;
    strip.scrollLeft=Math.max(0,left);
  }
  function keepActiveVisible(){
    requestAnimationFrame(()=>{
      revealActive(document.querySelector('.nav'));
      document.querySelectorAll('.day-switch').forEach(revealActive);
    });
  }
  function blockStart(el){
    const direct=parseInt(el.style.gridRowStart,10);if(Number.isFinite(direct))return direct-1;
    const m=(el.getAttribute('style')||'').match(/grid-row\s*:\s*(\d+)/);return m?+m[1]-1:0;
  }
  function scrollToSlot(slot){
    const cells=document.querySelectorAll('.sched-time');
    const target=cells[Math.max(0,Math.min(95,slot))];
    if(target)target.scrollIntoView({behavior:'smooth',block:'center'});
  }
  function enhanceSchedule(){
    if(state.view!=='schedule'||document.querySelector('.schedule-jump-tools'))return;
    const title=document.querySelector('.section-title');if(!title)return;
    const tools=document.createElement('div');tools.className='schedule-jump-tools';
    tools.innerHTML='<button type="button" data-schedule-now>⌖ Now</button><button type="button" data-schedule-next>→ Next plan</button>';
    title.insertAdjacentElement('afterend',tools);
    const now=new Date(),nowSlot=Math.floor((now.getHours()*60+now.getMinutes())/15);
    const tripDate=new Date(2026,9,17+state.scheduleDay);
    const selectedIsToday=tripDate.getFullYear()===now.getFullYear()&&tripDate.getMonth()===now.getMonth()&&tripDate.getDate()===now.getDate();
    tools.querySelector('[data-schedule-now]').onclick=()=>scrollToSlot(nowSlot);
    tools.querySelector('[data-schedule-next]').onclick=()=>{
      const starts=[...document.querySelectorAll('.sched-plan.occupied.merged')].map(blockStart).sort((a,b)=>a-b);
      if(!starts.length)return;
      const target=selectedIsToday?(starts.find(x=>x>=nowSlot)??starts[starts.length-1]):starts[0];
      scrollToSlot(target);
    };
  }
  const baseRender=render;
  render=function(){baseRender();enhanceSchedule();keepActiveVisible()};
  render();
})();
