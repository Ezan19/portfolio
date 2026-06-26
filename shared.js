document.addEventListener('DOMContentLoaded', () => {

  // ── Theme toggle ───────────────────────────────
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('portfolio-theme');
  const initialTheme = savedTheme || 'dark';

  const updateFavicon = theme => {
    const isLight = theme === 'light';
    const faviconNames = {
      'any': isLight ? 'favicon-light.ico' : 'favicon.ico',
      '16x16': isLight ? 'favicon-light-16x16.png' : 'favicon-16x16.png',
      '32x32': isLight ? 'favicon-light-32x32.png' : 'favicon-32x32.png',
      'apple': isLight ? 'apple-touch-icon-light.png' : 'apple-touch-icon.png'
    };

    document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]').forEach(link => {
      const href = link.getAttribute('href') || '';
      const faviconDir = 'sources/favicon/';
      const dirIndex = href.indexOf(faviconDir);

      if (dirIndex === -1) return;

      const prefix = href.slice(0, dirIndex + faviconDir.length);
      const sizeKey = link.rel === 'apple-touch-icon' ? 'apple' : link.getAttribute('sizes') || 'any';
      link.setAttribute('href', `${prefix}${faviconNames[sizeKey] || faviconNames.any}`);
    });
  };

  const setTheme = theme => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('portfolio-theme', theme);
    updateFavicon(theme);

    if (themeToggle) {
      themeToggle.checked = theme === 'dark';
      themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    }
  };

  setTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('change', () => {
      setTheme(themeToggle.checked ? 'dark' : 'light');
    });
  }

  // ── Mobile nav toggle ──────────────────────────
  const toggle = document.getElementById('nav-toggle');
  const nav    = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => nav.classList.remove('open'))
    );
  }

  // ── Live clock in footer ───────────────────────
  const clockEl = document.getElementById('live-clock');
  if (clockEl) {
    const tick = () => {
      const now  = new Date();
      let h      = now.getHours();
      const ampm = h >= 12 ? 'PM' : 'AM';
      if (h > 12) h -= 12;
      if (h === 0) h = 12;
      const pad  = n => String(n).padStart(2, '0');
      const mo   = pad(now.getMonth() + 1);
      const d    = pad(now.getDate());
      clockEl.textContent = `${pad(h)}:${pad(now.getMinutes())}:${pad(now.getSeconds())} ${ampm}  ·  ${mo}/${d}/${now.getFullYear()}`;
    };
    tick();
    setInterval(tick, 1000);
  }

});
