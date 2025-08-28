// script.js — active states + login modal (no external deps)
(function(){
  // Set active states for desktop & bottom nav based on current page
  const setActive = () => {
    const path = location.pathname.toLowerCase();
    document.querySelectorAll('.nav-desktop a, .nav-bottom a').forEach(a=>{
      const href = a.getAttribute('href') || '';
      if (!href) return;
      const match = path.endsWith(href.toLowerCase()) || (href === 'index.html' && (path.endsWith('/') || path.endsWith('/index.html')));
      if(match) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
    });
  };
  setActive();

  // Modal controls
  const modal = document.getElementById('loginModal');
  window.openLoginModal = () => { modal?.removeAttribute('hidden'); modal?.setAttribute('aria-hidden','false'); };
  window.closeLoginModal = () => { modal?.setAttribute('hidden',''); modal?.setAttribute('aria-hidden','true'); };
  document.addEventListener('keydown', e => { if(e.key==='Escape') window.closeLoginModal(); });

  // Fake submit for demo
  window.fakeSubmit = (form) => {
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true; btn.textContent = 'Signing in…';
    setTimeout(()=>{ btn.disabled = false; btn.textContent = 'Log In'; window.closeLoginModal(); }, 900);
    return false;
  };
})();
