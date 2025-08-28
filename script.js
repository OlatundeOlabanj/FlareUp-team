// script.js (shared)
(function(){
  // Active link highlighting (desktop tabs + bottom icons)
  const setActive = () => {
    const path = location.pathname.toLowerCase();
    document.querySelectorAll('.nav-desktop a, .nav-bottom a').forEach(a=>{
      const href = (a.getAttribute('href')||'').toLowerCase();
      const isHome = href.endsWith('index.html');
      const match =
        (href && path.endsWith(href)) ||
        (isHome && (path.endsWith('/') || path.endsWith('/index.html')));
      if(match) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
    });
  };
  setActive();

  // Fake submit for auth pages
  window.fakeSubmit = (form)=>{
    const btn=form.querySelector('button[type="submit"]'); if(!btn) return false;
    btn.disabled=true; const txt=btn.textContent; btn.textContent='Processing…';
    setTimeout(()=>{ btn.disabled=false; btn.textContent=txt; alert('Submitted (demo)'); },800);
    return false;
  };

  // Opportunities search filter
  const search = document.getElementById('jobSearch');
  if(search){
    const items = [...document.querySelectorAll('#jobList .job-card')];
    search.addEventListener('input', ()=>{
      const q = search.value.toLowerCase();
      items.forEach(li=>{
        const t = (li.dataset.title+' '+li.dataset.company).toLowerCase();
        li.style.display = t.includes(q) ? '' : 'none';
      });
    });
  }

  // Chat send (demo)
  window.sendMessage = ()=>{
    const input = document.getElementById('chatField');
    const list = document.getElementById('messages');
    if(!input || !list) return false;
    const val = input.value.trim(); if(!val) return false;
    const div = document.createElement('div'); div.className='msg me'; div.textContent=val;
    list.appendChild(div); input.value=''; list.scrollTop=list.scrollHeight; return false;
  };

  // Settings toggle + save (demo)
  window.saveSettings = ()=>{ alert('Settings saved (demo)'); };
})();
