/* feed.js — interactions for the pre-FXNAV feed */
(function(){
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

  document.querySelectorAll('.post').forEach((post, i)=>{
    const likeBtn = post.querySelector('[data-action="like"]');
    const cmtBtn  = post.querySelector('[data-action="comment"]');
    const shareBtn= post.querySelector('[data-action="share"]');
    const comments= post.querySelector('.comments');

    likeBtn?.addEventListener('click', ()=>{
      const countEl = likeBtn.querySelector('span:last-child');
      let n = parseInt((countEl?.textContent||'0').replace(/\D/g,''),10) || 0;
      const active = likeBtn.classList.toggle('active');
      n = active ? n+1 : Math.max(0,n-1);
      if (countEl) countEl.textContent = String(n);
      likeBtn.style.borderColor = active ? 'var(--accent)' : 'transparent';
    });

    cmtBtn?.addEventListener('click', ()=>{
      if (!comments) return;
      comments.hidden = !comments.hidden;
      if (!comments.hidden) comments.querySelector('.comment-input')?.focus();
    });

    shareBtn?.addEventListener('click', async ()=>{
      const url = location.origin + location.pathname + '#'+(post.id || ('post-'+(i+1)));
      try{
        if(navigator.share){ await navigator.share({title:document.title,url}); }
        else if(navigator.clipboard){ await navigator.clipboard.writeText(url); }
        else { const ta=document.createElement('textarea'); ta.value=url; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); }
      }catch{}
    });

    // comment form
    post.querySelector('.comment-form .btn')?.addEventListener('click', ()=>{
      const wrap = post.querySelector('.comments-wrap');
      const input= post.querySelector('.comment-input');
      const text = input.value.trim(); if(!text) return;
      const row = document.createElement('div');
      row.className='comment';
      row.innerHTML = `<div class="avatar small"></div><div class="bubble">${text}</div>`;
      wrap.insertBefore(row, post.querySelector('.comment-form'));
      input.value='';
    });
  });
})();
