(function(){
  const attrFor={day:'day',transitDay:'transit-day',scheduleDay:'schedule-day'};
  dayTabs=function(key='day'){
    const attr=attrFor[key]||key.replace(/[A-Z]/g,m=>'-'+m.toLowerCase());
    return `<div class="day-switch">${D.days.map(x=>`<button data-${attr}="${x.day}" class="${x.day===state[key]?'active':''}">Day ${x.day}</button>`).join('')}</div>`;
  };
  render();
})();
