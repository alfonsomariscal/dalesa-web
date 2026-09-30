// Menú móvil, filtro de casos y envío del formulario de contacto.

// Menú móvil
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('open', open);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
      toggle.focus();
    }
  });
}

// Filtro de casos por servicio
const filters = document.querySelector('.filters');
if (filters) {
  const buttons = filters.querySelectorAll('.filter');
  const cards = document.querySelectorAll('.cases-list .case-feature');
  if (buttons.length > 2) filters.hidden = false;
  buttons.forEach((btn) =>
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      cards.forEach((c) => (c.hidden = f !== 'all' && c.dataset.service !== f));
    }),
  );
}

// Formulario de contacto: envía al endpoint configurado o, si no hay, abre el correo.
const form = document.querySelector('.contact-form');
if (form) {
  const status = form.querySelector('.form-status');
  const { endpoint, email, subject, sending, ok, error } = form.dataset;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    if (data.get('_gotcha')) return;

    if (!endpoint) {
      if (!email) {
        status.textContent = error;
        status.className = 'form-status error';
        return;
      }
      const body = `${data.get('message')}\n\n— ${data.get('name')}${data.get('company') ? ` (${data.get('company')})` : ''}\n${data.get('email')}`;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    status.textContent = sending;
    status.className = 'form-status';
    try {
      const res = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(res.status);
      form.reset();
      status.textContent = ok;
      status.className = 'form-status ok';
    } catch {
      status.textContent = error;
      status.className = 'form-status error';
    } finally {
      btn.disabled = false;
    }
  });
}

// Animación de entrada al hacer scroll y contador de cifras (+14, +40…).
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const countUp = (el) => {
  const m = el.dataset.count.match(/^(\D*)(\d+)(\D*)$/);
  if (!m || reduceMotion) return;
  const [, pre, num, post] = m;
  const end = Number(num);
  const start = performance.now();
  // Seguro: si el navegador pausa la animación (pestaña en segundo plano), deja el valor final.
  setTimeout(() => (el.textContent = el.dataset.count), 1500);
  const tick = (now) => {
    const p = Math.min((now - start) / 1200, 1);
    el.textContent = `${pre}${Math.round(end * (1 - Math.pow(1 - p, 3)))}${post}`;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const revealed = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window && !reduceMotion) {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        e.target.querySelectorAll('[data-count]').forEach(countUp);
        io.unobserve(e.target);
      }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  revealed.forEach((el) => io.observe(el));
} else {
  revealed.forEach((el) => el.classList.add('in'));
}
