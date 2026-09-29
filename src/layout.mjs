// Rutas de cada página por idioma y plantilla común (cabecera, pie, <head>).

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

export const icons = {
  sparkle:
    '<path d="M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9z"/><path d="M18.5 16v4M16.5 18h4"/>',
  flow:
    '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 6h7M18 8.5v7M7.8 7.8l8.4 8.4"/>',
  phone: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5L12 13l8.5-6.5"/>',
  linkedin:
    '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V16M8 7.5v.01M12 16v-3.2a2.3 2.3 0 0 1 4.6 0V16M12 10.5V16"/>',
};

export const icon = (name, cls = 'icon') =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;

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
  <link rel="stylesheet" href="/styles.css">
  <script>document.documentElement.classList.add('js')</script>
  <script src="/main.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#main">${t.ui.skip}</a>
  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="${r('home')}" aria-label="${site.name}">
        <span class="brand-mark" aria-hidden="true"></span><span class="brand-name">${site.name}</span>
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
        <a class="brand" href="${r('home')}"><span class="brand-mark" aria-hidden="true"></span><span class="brand-name">${site.name}</span></a>
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
