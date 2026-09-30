// Rutas de cada página por idioma y plantilla común (cabecera, pie, <head>).
import lucide from './icons.mjs';

export const routes = {
  home: { es: '/', en: '/en/' },
  services: { es: '/servicios/', en: '/en/services/' },
  cases: { es: '/casos/', en: '/en/case-studies/' },
  about: { es: '/nosotros/', en: '/en/about/' },
  contact: { es: '/contacto/', en: '/en/contact/' },
  legal: { es: '/aviso-legal/', en: '/en/legal-notice/' },
  privacy: { es: '/privacidad/', en: '/en/privacy/' },
};

const PENDING_RE = /\[(?:PENDIENTE|PENDING)(?::[^\]]*)?\]/g;

// Alias de nombres antiguos → iconos de Lucide.
const alias = { arrow: 'arrow-right', sparkle: 'sparkles', flow: 'workflow', phone: 'smartphone' };

export const icon = (name, cls = 'icon') =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${lucide[alias[name] ?? name] ?? ''}</svg>`;

// Logotipo provisional: cuadrado con degradado y una "D" con un punto de "chispa".
let logoCount = 0;
export const logo = () => {
  const id = `lg${logoCount++}`;
  return `<svg class="brand-mark" viewBox="0 0 32 32" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="var(--accent)"/><stop offset="1" stop-color="var(--accent-2)"/></linearGradient></defs><rect width="32" height="32" rx="9" fill="url(#${id})"/><path d="M10 8.5h6.2a7.5 7.5 0 0 1 0 15H10z" fill="none" stroke="#fff" stroke-width="2.6" stroke-linejoin="round"/><circle cx="22.6" cy="9.4" r="2.2" fill="#fff"/></svg>`;
};

export const markPending = (html) => html.replace(PENDING_RE, (m) => `<mark class="pending">${m}</mark>`);
export const pendingIn = (html) => html.match(PENDING_RE) || [];

export function layout({ t, site, key, title, description, body, noindex = false }) {
  const lang = t.lang;
  const other = lang === 'es' ? 'en' : 'es';
  const base = site.url.replace(/\/$/, '');
  const abs = (p) => (base ? base + p : p);
  const r = (k) => routes[k][lang];
  const path = routes[key]?.[lang] ?? r('home');
  const altPath = routes[key]?.[other] ?? routes.home[other];

  const navItems = ['services', 'cases', 'about', 'contact']
    .map((k) => `<li><a href="${r(k)}"${k === key ? ' aria-current="page"' : ''}>${t.nav[k]}</a></li>`)
    .join('');

  const alternates = routes[key]
    ? `<link rel="alternate" hreflang="es" href="${abs(routes[key].es)}">
  <link rel="alternate" hreflang="en" href="${abs(routes[key].en)}">
  <link rel="alternate" hreflang="x-default" href="${abs(routes[key].es)}">`
    : '';

  const socials = [
    site.email ? `<a href="mailto:${site.email}">${icon('mail')}<span>${site.email}</span></a>` : '',
    site.linkedin ? `<a href="${site.linkedin}" rel="noopener">${icon('linkedin')}<span>LinkedIn</span></a>` : '',
  ].join('');

  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  ${noindex || site.preview ? '<meta name="robots" content="noindex, nofollow">' : ''}
  ${base ? `<link rel="canonical" href="${abs(path)}">` : ''}
  ${alternates}
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${site.name}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:locale" content="${t.locale}">
  ${base ? `<meta property="og:url" content="${abs(path)}">` : ''}
  <meta name="theme-color" content="#0b0d17" media="(prefers-color-scheme: dark)">
  <meta name="theme-color" content="#fbfbfd" media="(prefers-color-scheme: light)">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="preload" href="/fonts/manrope-latin-wght.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/styles.css">
  <script>document.documentElement.classList.add('js')</script>
  <script src="/main.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#main">${t.ui.skip}</a>
  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="${r('home')}" aria-label="${site.name}">
        ${logo()}<span class="brand-name">${site.name}</span>
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
        <span class="nav-toggle-bars" aria-hidden="true"></span><span class="visually-hidden">${t.ui.menu}</span>
      </button>
      <nav id="site-nav" class="site-nav" aria-label="${t.ui.menu}">
        <ul>${navItems}</ul>
        <a class="lang-switch" href="${altPath}" hreflang="${other}" lang="${other}" title="${t.ui.switchTo}">${t.ui.switchShort}</a>
        <a class="btn btn-primary btn-sm" href="${r('contact')}">${t.ui.cta}</a>
      </nav>
    </div>
  </header>

  <main id="main">
${markPending(body)}
  </main>

  <footer class="site-footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <a class="brand" href="${r('home')}">${logo()}<span class="brand-name">${site.name}</span></a>
        <p>${t.home.note}</p>
        <div class="footer-social">${socials}</div>
      </div>
      <nav class="footer-nav" aria-label="Footer">
        <ul>
          ${['services', 'cases', 'about', 'contact'].map((k) => `<li><a href="${r(k)}">${t.nav[k]}</a></li>`).join('')}
        </ul>
        <ul>
          <li><a href="${r('legal')}">${t.nav.legal}</a></li>
          <li><a href="${r('privacy')}">${t.nav.privacy}</a></li>
          <li><a href="${altPath}" hreflang="${other}" lang="${other}">${t.ui.switchTo}</a></li>
        </ul>
      </nav>
    </div>
    <div class="container footer-bottom">© ${new Date().getFullYear()} ${site.name}. ${t.ui.rights}</div>
  </footer>
</body>
</html>
`;
}
