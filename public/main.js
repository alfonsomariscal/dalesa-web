// Menú móvil, selector de casos de uso, formularios de contacto y analítica.

// Analítica sin cookies: cuenta acciones (no personas). Funciona con Plausible, Umami o GoatCounter
// si están configurados en site.config.mjs; si no, no hace nada.
const track = (name) => {
  try {
    if (window.plausible) window.plausible(name);
    else if (window.umami) window.umami.track(name);
    else if (window.goatcounter?.count) window.goatcounter.count({ path: name, title: name, event: true });
  } catch {}
};
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href]');
  if (!a) return;
  const href = a.getAttribute('href');
  if (href.startsWith('https://wa.me/')) track('WhatsApp');
  else if (href.startsWith('tel:')) track('Llamada');
  else if (href.startsWith('mailto:')) track('Correo');
  else if (a.dataset.track) track(a.dataset.track);
});

// Casos de uso: selector de sector. Sin JS se ven todos los sectores seguidos.
// #moda abre ese sector; el id de un caso o de un paso (#talla) abre su sector y baja hasta él.
const procTabs = [...document.querySelectorAll('.process-tabs [role="tab"]')];
if (procTabs.length) {
  const showProcess = (id, focus = false) =>
    procTabs.forEach((t) => {
      const on = t.dataset.process === id;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(`proc-${t.dataset.process}`).hidden = !on;
      if (on && focus) t.focus();
    });
  procTabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      showProcess(tab.dataset.process);
      history.replaceState(null, '', `#${tab.dataset.process}`);
    });
    tab.addEventListener('keydown', (e) => {
      const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (d) showProcess(procTabs[(i + d + procTabs.length) % procTabs.length].dataset.process, true);
    });
  });
  const fromHash = () => {
    const h = decodeURIComponent(location.hash.slice(1));
    const isProcess = procTabs.some((t) => t.dataset.process === h);
    const target = !isProcess && h ? document.getElementById(h) : null;
    showProcess(isProcess ? h : target?.closest('.process')?.id.replace('proc-', '') || procTabs[0].dataset.process);
    // Al ocultar el otro proceso la página cambia de alto: se vuelve a bajar al paso al terminar de cargar.
    if (target) {
      requestAnimationFrame(() => target.scrollIntoView({ behavior: 'instant' }));
      if (document.readyState !== 'complete') window.addEventListener('load', () => target.scrollIntoView({ behavior: 'instant' }), { once: true });
    }
  };
  fromHash();
  window.addEventListener('hashchange', fromHash);
}

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

// Pestañas de contacto: «Escríbenos» / «Te llamamos». Sin JS se ven los dos formularios.
// Con #llamada en la URL se abre directamente «Te llamamos».
const tabs = [...document.querySelectorAll('.contact-tabs [role="tab"]')];
if (tabs.length) {
  const select = (tab, focus = false) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) tab.focus();
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', (e) => {
      const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (d) select(tabs[(i + d + tabs.length) % tabs.length], true);
    });
  });
  select(location.hash === '#llamada' || location.hash === '#call' ? tabs[1] : tabs[0]);
}

// Formularios de contacto y de «Te llamamos»: envían al endpoint configurado
// (FormSubmit o propio) o, si no hay, abren el cliente de correo con el mensaje redactado.
const mailBody = (form, data) => {
  const who = `${data.get('name')}${data.get('company') ? ` (${data.get('company')})` : ''}`;
  if (form.dataset.kind === 'callback') return `${who}\n${data.get('phone')}\n${form.dataset.when} ${data.get('when')}`;
  const chosen = data.getAll('topics').join(', ');
  return `${chosen ? `${form.dataset.topics} ${chosen}\n\n` : ''}${data.get('message')}\n\n— ${who}\n${data.get('email')}`;
};

document.querySelectorAll('.contact-form').forEach((form) => {
  const status = form.querySelector('.form-status');
  const { endpoint, email, subject, sending, ok, error } = form.dataset;
  const show = (text, cls = '') => {
    status.textContent = text;
    status.className = `form-status ${cls}`;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    if (data.get('_gotcha')) return;

    if (!endpoint) {
      if (!email) return show(error, 'error');
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody(form, data))}`;
      return;
    }

    // JSON: lo aceptan tanto FormSubmit como Formspree. En el correo cada dato lleva el texto
    // de su etiqueta («Nombre», «Teléfono»…) y las casillas múltiples van juntas.
    const payload = {};
    for (const key of new Set(data.keys())) {
      if (key === '_gotcha' || key === 'consent') continue;
      const el = form.querySelector(`[name="${key}"]`);
      const label = key.startsWith('_') ? key : el.closest('.field')?.querySelector('.field-label')?.textContent ?? el.closest('fieldset')?.querySelector('legend')?.textContent ?? key;
      payload[label] = data.getAll(key).join(', ');
    }
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    show(sending);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success === 'false' || json.success === false) throw new Error(res.status);
      form.reset();
      show(ok, 'ok');
      track(form.dataset.kind === 'callback' ? 'Petición de llamada' : 'Formulario de contacto');
    } catch {
      show(error, 'error');
    } finally {
      btn.disabled = false;
    }
  });
});

// Botón de copiar el correo
document.querySelectorAll('[data-copy]').forEach((btn) => {
  const label = btn.querySelector('span');
  const text = label.textContent;
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      label.textContent = btn.dataset.copied;
      btn.classList.add('done');
      setTimeout(() => {
        label.textContent = text;
        btn.classList.remove('done');
      }, 1800);
    } catch {
      window.location.href = `mailto:${btn.dataset.copy}`;
    }
  });
});

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
