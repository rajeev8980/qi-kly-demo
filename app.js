// QiKly demo interactions
document.addEventListener('DOMContentLoaded', () => {
  // theme toggle
  const themeBtn = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('qikly-theme');
  if (saved) document.documentElement.classList.toggle('light', saved === 'light');
  themeBtn.addEventListener('click', () => {
    const isLight = document.documentElement.classList.toggle('light');
    localStorage.setItem('qikly-theme', isLight ? 'light' : 'dark');
  });

  // tabs
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const group = tab.closest('.card');
      group.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      group.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      group.querySelector(`[data-panel="${tab.dataset.tab}"]`).classList.add('active');
    });
  });

  // toast
  const toastBtn = document.getElementById('toast-btn');
  const toast = document.getElementById('toast');
  toastBtn.addEventListener('click', () => {
    toast.textContent = 'Changes saved successfully ✓';
    toast.classList.add('show');
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
  });

  // motion cards animate on click
  document.querySelectorAll('.motion-card').forEach(card => {
    card.addEventListener('click', () => {
      const anim = card.dataset.anim;
      card.style.animation = 'none';
      void card.offsetWidth;
      const map = { fade:'fadeUp', slide:'slideUp', pop:'pop', spin:'spin' };
      card.style.animation = `${map[anim]} 400ms var(--ease-out)`;
      setTimeout(() => { card.style.animation = ''; }, 500);
    });
  });

  // chips close
  document.querySelectorAll('.chip-close').forEach(b => {
    b.addEventListener('click', (e) => {
      e.stopPropagation();
      b.closest('.chip').remove();
    });
  });

  // reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.card, .section-head').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 500ms var(--ease), transform 500ms var(--ease)';
    io.observe(el);
  });
  // avoid hiding when reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.card, .section-head').forEach(el => {
      el.style.opacity = '';
      el.style.transform = '';
    });
  }
  // ensure visible after transition
  const style = document.createElement('style');
  style.textContent = '.in { opacity: 1 !important; transform: none !important; }';
  document.head.appendChild(style);
});
