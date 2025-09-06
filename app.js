document.addEventListener('DOMContentLoaded', () => {
  // Year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Mobile nav
  const nav = document.getElementById('siteNav');
  const toggle = document.getElementById('navToggle');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('show'));
  }

  // Collab: active members + count
  const members = [
    { name: 'Ari', initials: 'AR' },
    { name: 'Eman', initials: 'EM' },
    { name: 'Joy', initials: 'JY' },
    { name: 'Kola', initials: 'KO' },
    { name: 'Tina', initials: 'TN' },
  ];
  const list = document.getElementById('activeMembers');
  const count = document.getElementById('activeCount');
  if (list && count) {
    members.forEach(m => {
      const li = document.createElement('li');
      li.className = 'member';
      li.innerHTML = \`
        <div class="status"></div>
        <div class="avatar small">\${m.initials}</div>
        <span>\${m.name}</span>
      \`;
      list.appendChild(li);
    });
    count.textContent = members.length;
  }

  // Chat composer (local only)
  const form = document.getElementById('composer');
  const input = document.getElementById('messageInput');
  const messages = document.getElementById('messageList');
  if (form && input && messages) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      const li = document.createElement('li');
      li.className = 'msg';
      li.innerHTML = \`
        <div class="avatar small">YOU</div>
        <div class="bubble">
          <div class="meta"><strong>You</strong> <time>\${new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</time></div>
          <p>\${text}</p>
        </div>
      \`;
      messages.appendChild(li);
      messages.scrollTop = messages.scrollHeight;
      input.value = '';
    });
  }

  // Fake auth
  const auth = document.getElementById('authForm');
  if (auth) {
    auth.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Signed in! (demo)');
      window.location.href = 'index.html';
    });
  }
});
