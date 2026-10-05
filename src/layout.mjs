// Rutas de cada página por idioma y plantilla común (cabecera, pie, <head>).
import lucide, { brands } from './icons.mjs';

export const routes = {
  home: { es: '/', en: '/en/' },
  services: { es: '/servicios/', en: '/en/services/' },
  cases: { es: '/casos/', en: '/en/case-studies/' },
  about: { es: '/nosotros/', en: '/en/about/' },
  example: { es: '/proceso-completo/', en: '/en/end-to-end/' },
  contact: { es: '/contacto/', en: '/en/contact/' },
  legal: { es: '/aviso-legal/', en: '/en/legal-notice/' },
  privacy: { es: '/privacidad/', en: '/en/privacy/' },
};

const PENDING_RE = /\[(?:PENDIENTE|PENDING)(?::[^\]]*)?\]/g;

// Alias de nombres antiguos → iconos de Lucide.
const alias = { arrow: 'arrow-right', sparkle: 'sparkles', flow: 'workflow', phone: 'smartphone' };

export const icon = (name, cls = 'icon') =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${lucide[alias[name] ?? name] ?? ''}</svg>`;

// Logotipo: luna con lobo y palabra DALESA. Son máscaras (public/brand/) que se pintan
// con los colores del diseño activo (variables --logo-mark y --logo-word de styles.css).
export const logo = (name) =>
  `<span class="brand-mark" aria-hidden="true"></span><span class="brand-word" aria-hidden="true"></span><span class="visually-hidden">${name}</span>`;

// Diseños de color disponibles. El primero es el de por defecto.
export const themes = ['violeta', 'oro', 'mono'];

export const brandIcon = (name, cls = 'icon') =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${brands[name] ?? ''}</svg>`;

// Teléfonos: '687842827' → '687 84 28 27' y enlace tel: con prefijo de España.
export const phoneLabel = (n) => n.replace(/^(\d{3})(\d{2})(\d{2})(\d{2})$/, '$1 $2 $3 $4');
export const phoneHref = (n) => `tel:+34${n}`;
export const whatsappHref = (site, t) => `https://wa.me/34${site.whatsapp}?text=${encodeURIComponent(t.ui.whatsappText)}`;

// Analítica sin cookies (site.analytics). Los eventos los envía main.js con window.dalesaTrack.
const analyticsTag = ({ provider, id } = {}) => {
  if (!id) return '';
  if (provider === 'plausible')
    return `<script defer data-domain="${id}" src="https://plausible.io/js/script.js"></script>
  <script>window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}</script>`;
  if (provider === 'umami') return `<script defer src="https://cloud.umami.is/script.js" data-website-id="${id}"></script>`;
  if (provider === 'goatcounter') return `<script data-goatcounter="https://${id}.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>`;
  return '';
};

// Ficha de empresa para buscadores (schema.org). `pub` es la URL pública con la que se comparte.
const organization = (t, site, pub) =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    ...(pub && { url: `${pub}/`, logo: `${pub}/brand/favicon-oro.png` }),
    description: t.home.description,
    ...(site.email && { email: site.email }),
    ...(site.phones?.length && {
      telephone: `+34${site.phones[0]}`,
      contactPoint: site.phones.map((n) => ({ '@type': 'ContactPoint', telephone: `+34${n}`, contactType: 'customer service', areaServed: 'ES', availableLanguage: ['es', 'en'] })),
    }),
    knowsAbout: t.services.map((s) => s.title),
    ...(site.linkedin && { sameAs: [site.linkedin] }),
  });

export const markPending = (html) => html.replace(PENDING_RE, (m) => `<mark class="pending">${m}</mark>`);
export const pendingIn = (html) => html.match(PENDING_RE) || [];

export function layout({ t, site, key, title, description, body, noindex = false }) {
  const lang = t.lang;
  const other = lang === 'es' ? 'en' : 'es';
  const base = site.url.replace(/\/$/, '');
  // URL pública para la imagen al compartir y la ficha de empresa (dominio, o la de GitHub Pages).
  const pub = base || (site.shareUrl || '').replace(/\/$/, '');
  const abs = (p) => (base ? base + p : p);
  const r = (k) => routes[k][lang];
  const path = routes[key]?.[lang] ?? r('home');
  const altPath = routes[key]?.[other] ?? routes.home[other];

  const navItems = ['services', 'example', 'cases', 'about', 'contact']
    .map((k) => `<li><a href="${r(k)}"${k === key ? ' aria-current="page"' : ''}>${k === 'example' ? t.nav.exampleShort : t.nav[k]}</a></li>`)
    .join('');

  const alternates = routes[key]
    ? `<link rel="alternate" hreflang="es" href="${abs(routes[key].es)}">
  <link rel="alternate" hreflang="en" href="${abs(routes[key].en)}">
  <link rel="alternate" hreflang="x-default" href="${abs(routes[key].es)}">`
    : '';

  const socials = [
    site.email ? `<a href="mailto:${site.email}">${icon('mail')}<span>${site.email}</span></a>` : '',
    ...(site.phones || []).map((n) => `<a href="${phoneHref(n)}">${icon('telephone')}<span>${phoneLabel(n)}</span></a>`),
    site.whatsapp ? `<a href="${whatsappHref(site, t)}" target="_blank" rel="noopener">${brandIcon('whatsapp')}<span>WhatsApp</span></a>` : '',
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
  ${pub ? `<meta property="og:image" content="${pub}/brand/og-${lang}.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${site.name} · ${t.home.description}">
  <meta name="twitter:card" content="summary_large_image">` : ''}
  <script type="application/ld+json">${organization(t, site, pub)}</script>
  <meta name="theme-color" content="#0b0d17" media="(prefers-color-scheme: dark)">
  <meta name="theme-color" content="#fbfbfd" media="(prefers-color-scheme: light)">
  <link rel="icon" href="/brand/favicon-violeta.png" type="image/png">
  <link rel="preload" href="/fonts/manrope-latin-wght.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/styles.css">
  <script>(function(d){d.classList.add('js');try{var q=new URLSearchParams(location.search).get('diseno'),t=q||localStorage.getItem('dalesa-theme');if(q)localStorage.setItem('dalesa-theme',q);if(${JSON.stringify(themes.slice(1))}.indexOf(t)>-1)d.dataset.theme=t}catch(e){}})(document.documentElement)</script>
  <script src="/main.js" defer></script>
  ${analyticsTag(site.analytics)}
</head>
<body>
  <a class="skip-link" href="#main">${t.ui.skip}</a>
  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="${r('home')}" aria-label="${site.name}">
        ${logo(site.name)}
      </a>
      <div class="theme-switch" role="group" aria-label="${t.ui.theme}">
        ${themes
          .map(
            (th, i) =>
              `<button class="theme-opt" type="button" data-theme-set="${th}" aria-pressed="${i === 0}" title="${t.ui.themes[i]}"><span class="swatch swatch-${th}" aria-hidden="true"></span><span class="visually-hidden">${t.ui.themes[i]}</span></button>`,
          )
          .join('')}
      </div>
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
        <a class="brand" href="${r('home')}">${logo(site.name)}</a>
        <p>${t.home.note}</p>
        <div class="footer-social">${socials}</div>
      </div>
      <nav class="footer-nav" aria-label="Footer">
        <ul>
          ${['services', 'example', 'cases', 'about', 'contact'].map((k) => `<li><a href="${r(k)}">${t.nav[k]}</a></li>`).join('')}
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
  ${site.whatsapp ? `<a class="wa-float" href="${whatsappHref(site, t)}" target="_blank" rel="noopener" aria-label="${t.ui.whatsapp}" title="${t.ui.whatsapp}">${brandIcon('whatsapp')}<span>WhatsApp</span></a>` : ''}
</body>
</html>
`;
}
