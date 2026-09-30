// Genera la web estática en dist/. Sin dependencias: `node build.mjs`.
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import site from './site.config.mjs';
import es from './src/content/es.mjs';
import en from './src/content/en.mjs';
import { layout, routes, pendingIn } from './src/layout.mjs';
import { pages, notFound } from './src/pages.mjs';

const OUT = process.env.OUT_DIR || 'dist';
const langs = { es, en };

// Datos de site.config.mjs que usan los textos. Los datos legales que falten se omiten
// en la web (sin frases a medias) y el build avisa al final.
const legal = site.legal;
const missingLegal = Object.entries({ 'razón social': legal.razonSocial, NIF: legal.nif, domicilio: legal.domicilio, 'datos registrales': legal.registro })
  .filter(([, v]) => !v)
  .map(([k]) => k);
const dataFor = (lang) => {
  const es = lang === 'es';
  const titular = legal.razonSocial || site.name;
  const ident = [
    `<strong>${titular}</strong>`,
    legal.nif && (es ? `con NIF ${legal.nif}` : `tax ID ${legal.nif}`),
    legal.domicilio && (es ? `con domicilio en ${legal.domicilio}` : `registered address ${legal.domicilio}`),
  ]
    .filter(Boolean)
    .join(', ');
  return {
    name: site.name,
    email: site.email || (es ? '[PENDIENTE: email]' : '[PENDING: email]'),
    titular,
    // "<strong>Titular</strong>, con NIF X, con domicilio en Y. Registro…"
    ident: `${ident}.${legal.registro ? ` ${legal.registro}` : ''}`,
  };
};

rmSync(OUT, { recursive: true, force: true });
cpSync('public', OUT, { recursive: true });

// Prefija las rutas absolutas internas con la subruta de publicación (GitHub Pages).
const base = (site.base || '').replace(/\/$/, '');
// Huella de versión en CSS y JS: cada publicación obliga al navegador a descargar la versión nueva.
const version = (f) => createHash('sha1').update(readFileSync(join('public', f))).digest('hex').slice(0, 8);
const assets = { '/styles.css': version('styles.css'), '/main.js': version('main.js') };
const withVersion = (html) => html.replace(/(href|src)="(\/styles\.css|\/main\.js)"/g, (_, a, f) => `${a}="${f}?v=${assets[f]}"`);
const withBase = (html) => {
  html = withVersion(html);
  return base ? html.replace(/(href|src|action)="\/(?!\/)/g, `$1="${base}/`) : html;
};

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
if (missingLegal.length) console.warn(`⚠ Faltan datos legales en site.config.mjs (obligatorios antes de lanzar): ${missingLegal.join(', ')}.`);
if (site.preview) console.warn('⚠ Modo preview: la web pide a los buscadores que no la indexen.');
if (!site.url && !site.preview) console.warn('⚠ Falta `url` en site.config.mjs: no se generan canonical, sitemap.xml ni robots.txt.');
