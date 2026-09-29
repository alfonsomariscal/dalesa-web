// Genera la web estática en dist/. Sin dependencias: `node build.mjs`.
import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import site from './site.config.mjs';
import es from './src/content/es.mjs';
import en from './src/content/en.mjs';
import { layout, routes, pendingIn } from './src/layout.mjs';
import { pages, notFound } from './src/pages.mjs';

const OUT = process.env.OUT_DIR || 'dist';
const langs = { es, en };

// Datos de site.config.mjs que usan los textos; si faltan, quedan como [PENDIENTE].
const pendingLabels = {
  es: { email: 'email', razonSocial: 'razón social', nif: 'NIF', domicilio: 'domicilio', registro: 'datos registrales' },
  en: { email: 'email', razonSocial: 'company name', nif: 'tax ID', domicilio: 'address', registro: 'registry details' },
};
const dataFor = (lang) => {
  const p = (w) => (lang === 'es' ? `[PENDIENTE: ${w}]` : `[PENDING: ${w}]`);
  const L = pendingLabels[lang];
  return {
    name: site.name,
    email: site.email || p(L.email),
    razonSocial: site.legal.razonSocial || p(L.razonSocial),
    nif: site.legal.nif || p(L.nif),
    domicilio: site.legal.domicilio || p(L.domicilio),
    registro: site.legal.registro || p(L.registro),
  };
};

rmSync(OUT, { recursive: true, force: true });
cpSync('public', OUT, { recursive: true });

// Prefija las rutas absolutas internas con la subruta de publicación (GitHub Pages).
const base = (site.base || '').replace(/\/$/, '');
const withBase = (html) => (base ? html.replace(/(href|src|action)="\/(?!\/)/g, `$1="${base}/`) : html);

const write = (path, html) => {
  const file = join(OUT, path.endsWith('/') ? path + 'index.html' : path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, path.endsWith('.xml') || path.endsWith('.txt') ? html : withBase(html));
};

const pending = new Set();
const urls = [];

for (const [lang, content] of Object.entries(langs)) {
  const t = content(dataFor(lang));
  for (const key of Object.keys(pages)) {
    const page = pages[key](t, site);
    const html = layout({ t, site, key, ...page });
    write(routes[key][lang], html);
    pendingIn(html).forEach((m) => pending.add(m));
    urls.push(routes[key][lang]);
  }
}

// 404 en español (la mayoría de hostings sirven /404.html).
write('404.html', layout({ t: es(dataFor('es')), site, key: '404', noindex: true, ...notFound(es(dataFor('es'))) }));

if (site.preview) {
  write('robots.txt', 'User-agent: *\nDisallow: /\n');
} else if (site.url) {
  const origin = site.url.replace(/\/$/, '');
  write(
    'sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
      .map((u) => `  <url><loc>${origin}${u}</loc></url>`)
      .join('\n')}\n</urlset>\n`,
  );
  write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
}

console.log(`✔ ${urls.length + 1} páginas generadas en ${OUT}/${base ? ` (subruta ${base})` : ''}`);
if (pending.size) console.warn(`⚠ Quedan ${pending.size} textos [PENDIENTE] distintos, marcados en amarillo en la web.`);
if (site.preview) console.warn('⚠ Modo preview: la web pide a los buscadores que no la indexen.');
if (!site.url && !site.preview) console.warn('⚠ Falta `url` en site.config.mjs: no se generan canonical, sitemap.xml ni robots.txt.');
