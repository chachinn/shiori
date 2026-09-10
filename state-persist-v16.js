(function(){
  function readSaved(){try{return JSON.parse(localStorage.getItem('shioriState')||'{}')||{}}catch(e){return {}}}
  function validDay(v){return Number.isInteger(+v)&&D.days.some(d=>d.day===+v)}
  const stored=readSaved(),ui=stored.ui||{};
  if(ui.view&&Object.prototype.hasOwnProperty.call(labels,ui.view))state.view=ui.view;
  if(validDay(ui.day))state.day=+ui.day;
  if(validDay(ui.transitDay))state.transitDay=+ui.transitDay;
  if(validDay(ui.scheduleDay))state.scheduleDay=+ui.scheduleDay;
  if(ui.pack&&M.packing&&Object.prototype.hasOwnProperty.call(M.packing,ui.pack))state.pack=ui.pack;

  function uiSnapshot(){return {view:state.view,day:state.day,transitDay:state.transitDay,scheduleDay:state.scheduleDay,pack:state.pack}}
  save=function(){localStorage.setItem('shioriState',JSON.stringify({done,packDone,notes,ui:uiSnapshot()}))};

  const baseRender=render;
  render=function(){baseRender();save()};
  render();
})();
