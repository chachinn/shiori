(function(){
  const priorRender=render;
  function esc(v){return String(v??'')}
  function mapHref(route){
    const parts=esc(route).split('→').map(s=>s.trim()).filter(Boolean);
    if(parts.length>=2){const start=parts[0],end=parts[parts.length-1];return `https://maps.apple.com/?saddr=${encodeURIComponent(start)}&daddr=${encodeURIComponent(end)}&dirflg=r`}
    return `https://maps.apple.com/?q=${encodeURIComponent(route)}`;
  }
  async function copyText(text,button){
    try{await navigator.clipboard.writeText(text)}catch(e){const ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove()}
    const old=button.textContent;button.textContent='✓ Copied';setTimeout(()=>button.textContent=old,1200);
  }
  function enhanceTransport(){
    if(state.view!=='transport')return;
    const rows=(window.SHioriSheetMirror.transport&&window.SHioriSheetMirror.transport[state.transitDay])||[];
    document.querySelectorAll('.transport-leg').forEach((card,i)=>{
      if(card.querySelector('.travel-actions'))return;
      const r=rows[i];if(!r)return;
      const text=[r[2],r[1],r[3],r[4],r[5]].filter(Boolean).join('\n');
      const wrap=document.createElement('div');wrap.className='travel-actions';
      const map=document.createElement('a');map.className='travel-action-btn';map.href=mapHref(r[2]);map.target='_blank';map.rel='noopener';map.textContent='↗ Maps';map.setAttribute('aria-label',`Open ${r[2]} in Maps`);
      const copy=document.createElement('button');copy.type='button';copy.className='travel-action-btn';copy.textContent='⧉ Copy';copy.dataset.copyRoute=text;copy.onclick=()=>copyText(text,copy);
      wrap.append(map,copy);card.appendChild(wrap);
    });
  }
  render=function(){priorRender();enhanceTransport()};
  render();
})();
