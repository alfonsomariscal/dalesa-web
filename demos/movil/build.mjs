// Demo: app móvil de Montera (distribuidora alimentaria ficticia) para el comercial en ruta.
// Genera las pantallas en HTML y sus capturas en PNG con Chrome sin interfaz.
//   /opt/homebrew/bin/node demos/movil/build.mjs
// Salida: demos/movil/out/*.html y demos/capturas/movil/*.png
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import lucide from '../../src/icons.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, 'out');
const PNG = resolve(HERE, '../capturas/movil');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
mkdirSync(OUT, { recursive: true });
mkdirSync(PNG, { recursive: true });

const W = 390;
const H = 844;

const ic = (name, size = 20, sw = 2) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${lucide[name] ?? ''}</svg>`;

const css = `
:root {
  --red: #c8102e; --red-dark: #8e0b20; --red-soft: #fdecee; --bg: #f6f4f3; --card: #fff;
  --text: #1c1b1f; --muted: #6f6a6b; --line: #ebe6e5; --green: #1f8a4c; --green-soft: #e7f5ec; --amber: #b86e00; --amber-soft: #fff3df;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: ${W}px; height: ${H}px; overflow: hidden; }
body { font-family: -apple-system, system-ui, sans-serif; color: var(--text); background: var(--bg); -webkit-font-smoothing: antialiased; font-size: 15px; position: relative; }
.status { height: 54px; display: flex; align-items: center; justify-content: space-between; padding: 14px 30px 0 34px; font-weight: 600; font-size: 16px; }
.status .sys { display: flex; gap: 6px; align-items: center; }
.battery { width: 26px; height: 12px; border: 1.5px solid currentColor; border-radius: 4px; padding: 1.5px; opacity: .9; position: relative; }
.battery::after { content: ""; position: absolute; right: -4px; top: 3px; width: 2px; height: 4px; border-radius: 1px; background: currentColor; }
.battery i { display: block; height: 100%; width: 78%; background: currentColor; border-radius: 1.5px; }
.screen { padding: 0 18px; }
.nav { display: flex; align-items: center; gap: 4px; padding: 6px 10px 6px 8px; color: var(--red); font-size: 17px; }
.nav .grow { flex: 1; }
.nav-title { text-align: center; color: var(--text); font-weight: 600; }
.h-small { color: var(--muted); font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: .04em; }
.h-big { font-size: 30px; font-weight: 800; letter-spacing: -.02em; margin-top: 2px; }
.row { display: flex; align-items: center; gap: 12px; }
.card { background: var(--card); border-radius: 18px; padding: 14px 16px; box-shadow: 0 1px 2px rgb(0 0 0 / .04), 0 6px 18px -10px rgb(0 0 0 / .12); }
.section-title { font-size: 19px; font-weight: 700; margin: 20px 2px 10px; display: flex; justify-content: space-between; align-items: baseline; }
.section-title small { font-size: 14px; color: var(--red); font-weight: 600; }
.chip { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 700; padding: 3px 9px; border-radius: 999px; }
.chip.red { color: var(--red); background: var(--red-soft); }
.chip.green { color: var(--green); background: var(--green-soft); }
.chip.amber { color: var(--amber); background: var(--amber-soft); }
.chip.grey { color: var(--muted); background: #efebea; }
.avatar { width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; font-weight: 700; color: #fff; background: linear-gradient(135deg, var(--red), var(--red-dark)); flex: none; }
.muted { color: var(--muted); }
.tabbar { position: absolute; left: 0; right: 0; bottom: 0; height: 84px; background: rgb(255 255 255 / .92); backdrop-filter: blur(20px); border-top: 1px solid var(--line); display: flex; justify-content: space-around; padding-top: 8px; }
.tabbar div { display: grid; justify-items: center; gap: 3px; font-size: 10.5px; font-weight: 600; color: #9b9596; width: 70px; }
.tabbar .on { color: var(--red); }
.home-ind { position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); width: 134px; height: 5px; border-radius: 3px; background: #1c1b1f; }
.btn { display: flex; align-items: center; justify-content: center; gap: 8px; height: 52px; border-radius: 16px; font-weight: 700; font-size: 17px; color: #fff; background: var(--red); box-shadow: 0 10px 22px -10px rgb(200 16 46 / .7); }
.btn.light { background: var(--red-soft); color: var(--red); box-shadow: none; }
.thumb { width: 48px; height: 48px; border-radius: 12px; display: grid; place-items: center; flex: none; background: linear-gradient(135deg, #fbf6f1, #f2e9df); }
.card.row > div, .row > div { min-width: 0; }
.stepper { display: flex; align-items: center; gap: 0; border-radius: 10px; background: #f2eeed; height: 32px; flex: none; }
.stepper span { width: 26px; display: grid; place-items: center; color: var(--red); }
.stepper b { min-width: 26px; text-align: center; font-size: 15px; }
`;

const status = (dark = false) => `
<div class="status" style="${dark ? 'color:#fff' : ''}">
  <span>9:41</span>
  <span class="sys">
    <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>
    <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor"><path d="M8.5 2.6c2.3 0 4.4.9 6 2.4l1.2-1.2A10.2 10.2 0 0 0 8.5.9 10.2 10.2 0 0 0 1.3 3.8L2.5 5a8.5 8.5 0 0 1 6-2.4Zm0 3.4c1.4 0 2.6.5 3.6 1.4l1.2-1.2a6.8 6.8 0 0 0-9.6 0l1.2 1.2c1-.9 2.2-1.4 3.6-1.4Zm0 3.4c.5 0 1 .2 1.3.5L8.5 11.2 7.2 9.9c.3-.3.8-.5 1.3-.5Z"/></svg>
    <span class="battery"><i></i></span>
  </span>
</div>`;

const tabbar = (on) => `
<div class="tabbar">
  ${[
    ['map', 'Ruta'],
    ['users', 'Clientes'],
    ['file-text', 'Pedidos'],
    ['user', 'Perfil'],
  ]
    .map(([i, l], k) => `<div class="${k === on ? 'on' : ''}">${ic(i === 'map' ? 'globe' : i, 24, 1.9)}${l}</div>`)
    .join('')}
  <span class="home-ind"></span>
</div>`;

// Ilustraciones planas de producto (en lugar de iconos genéricos).
const art = {
  jamon: `<path d="M9 33c-3-11 5-23 17-23 10 0 15 8 13 16-2 7-8 10-16 11l-8 4c-3 1-6-1-6-8Z" fill="#a8253a"/><path d="M15 31c-1-8 5-15 12-15 6 0 9 5 8 10-1 5-6 7-12 8l-6 2c-1 0-2-2-2-5Z" fill="#d9707c"/><path d="M20 27c3-4 8-6 11-4" stroke="#f6d6d0" stroke-width="2" fill="none" stroke-linecap="round"/><rect x="5" y="36" width="10" height="5" rx="2.5" transform="rotate(-28 10 38)" fill="#efe2cf"/>`,
  paleta: `<path d="M11 32c-2-9 5-19 15-19 8 0 12 6 11 13-1 6-7 9-13 9l-7 4c-3 1-5-1-6-7Z" fill="#9b2234"/><path d="M16 30c-1-6 4-12 10-12 5 0 7 4 6 8s-5 6-10 6l-4 2c-1 0-2-1-2-4Z" fill="#d46a77"/><rect x="7" y="36" width="9" height="5" rx="2.5" transform="rotate(-28 11 38)" fill="#efe2cf"/>`,
  lomo: `<rect x="6" y="17" width="30" height="15" rx="7.5" fill="#8f1f2f"/><ellipse cx="36" cy="24.5" rx="6" ry="7.5" fill="#c74656"/><path d="M33 21c2 1 3 3 2 6M37 20c1 2 1 4 0 7" stroke="#f3cfd3" stroke-width="1.4" fill="none" stroke-linecap="round"/><path d="M12 17v15M18 17v15M24 17v15" stroke="#6e1623" stroke-width="1.2" opacity=".6"/>`,
  chorizo: `<path d="M10 32c4-15 24-18 29-6" stroke="#a3202d" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M14 27c5-8 15-10 20-5" stroke="#d0525f" stroke-width="2" fill="none" stroke-linecap="round" opacity=".8"/><path d="M8 35l-3 4M41 29l4 3" stroke="#b9a07d" stroke-width="2" stroke-linecap="round"/>`,
  queso: `<path d="M7 34l30-15 5 6v11H7z" fill="#e9b949"/><path d="M7 34l30-15 5 6z" fill="#f6d77c"/><path d="M7 34h35v2H7z" fill="#c9952c"/><circle cx="22" cy="31" r="2.2" fill="#d19e33"/><circle cx="33" cy="30" r="1.6" fill="#d19e33"/><circle cx="28" cy="27" r="1.3" fill="#e2ad3c"/>`,
  loncheado: `<rect x="6" y="12" width="36" height="26" rx="5" fill="#f1ece6" stroke="#ddd3c8"/><ellipse cx="18" cy="25" rx="9" ry="8" fill="#c94a5b"/><ellipse cx="25" cy="24" rx="9" ry="8" fill="#d8677a"/><ellipse cx="32" cy="25" rx="8.5" ry="7.5" fill="#c23e50"/><path d="M27 21c3 0 6 2 7 5M20 21c2 1 3 3 3 5" stroke="#f7d9dc" stroke-width="1.6" fill="none" stroke-linecap="round"/>`,
};
const thumb = (kind, size = 48) =>
  `<div class="thumb" style="width:${size}px;height:${size}px;border-radius:${size > 40 ? 12 : 10}px"><svg width="${size - 8}" height="${size - 8}" viewBox="0 0 48 48">${art[kind]}</svg></div>`;

const page = (title, body) => `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${title}</title><style>${css}</style></head><body>${body}</body></html>`;

// 1 · Ruta de hoy -------------------------------------------------------------
const stops = [
  ['09:15', 'Mercado San Juan · puesto 14', 'Tienda', 'green', 'Entregado'],
  ['10:30', 'La Tasca de Rosa', 'Bar · C/ Pizarro, 12', 'red', 'Siguiente'],
  ['11:15', 'Restaurante El Olivar', 'Restaurante · Av. España, 40', 'grey', 'Visita'],
  ['12:00', 'Ultramarinos Paredes', 'Tienda · Pl. Mayor, 3', 'amber', 'Cobro'],
];
const mapSvg = `
<svg width="100%" height="150" viewBox="0 0 354 150" preserveAspectRatio="xMidYMid slice" style="display:block;border-radius:14px">
  <rect width="354" height="150" fill="#efe9e4"/>
  <path d="M-10 40 C80 30 120 70 200 60 S320 20 370 34" stroke="#fff" stroke-width="10" fill="none"/>
  <path d="M40 -10 L70 160 M180 -10 C170 60 200 110 190 160 M290 -10 L270 160 M-10 110 C100 100 220 130 370 112" stroke="#fff" stroke-width="7" fill="none"/>
  <path d="M0 80 C60 76 90 90 140 84" stroke="#fff" stroke-width="4" fill="none"/>
  <rect x="210" y="74" width="56" height="30" rx="4" fill="#dfe8d6"/><rect x="98" y="16" width="44" height="24" rx="4" fill="#dfe8d6"/>
  <path d="M52 118 C80 96 108 70 150 66 S220 58 238 40 S300 70 318 96" stroke="#c8102e" stroke-width="4" fill="none" stroke-linecap="round" stroke-dasharray="1 0"/>
  ${[
    [52, 118, '1', '#1f8a4c'],
    [150, 66, '2', '#c8102e'],
    [238, 40, '3', '#8a8384'],
    [318, 96, '4', '#8a8384'],
  ]
    .map(([x, y, n, c]) => `<circle cx="${x}" cy="${y}" r="12" fill="${c}" stroke="#fff" stroke-width="3"/><text x="${x}" y="${y + 4.5}" font-size="12" font-weight="800" fill="#fff" text-anchor="middle" font-family="-apple-system">${n}</text>`)
    .join('')}
  <circle cx="150" cy="66" r="22" fill="#c8102e" opacity=".15"/>
</svg>`;

const screen1 = page(
  'Ruta de hoy',
  `${status()}
<div class="screen">
  <div class="row" style="justify-content:space-between;margin-top:6px">
    <div><p class="h-small">Jueves, 8 de octubre</p><h1 class="h-big">Buenos días, Javier</h1></div>
    <div class="avatar">JM</div>
  </div>
  <div class="card" style="margin-top:16px;background:linear-gradient(135deg,#c8102e,#8e0b20);color:#fff;box-shadow:0 14px 30px -14px rgb(142 11 32 / .8)">
    <div class="row" style="justify-content:space-between">
      <div><p style="font-size:13px;opacity:.85;font-weight:600">Ruta de hoy</p><p style="font-size:24px;font-weight:800;letter-spacing:-.01em">8 visitas · 62 km</p></div>
      <div style="width:44px;height:44px;border-radius:14px;background:rgb(255 255 255 / .16);display:grid;place-items:center">${ic('truck', 24)}</div>
    </div>
    <div style="height:6px;border-radius:3px;background:rgb(255 255 255 / .25);margin:14px 0 8px"><div style="width:25%;height:100%;border-radius:3px;background:#fff"></div></div>
    <p style="font-size:13px;opacity:.9">2 de 8 completadas · llegada estimada 14:20</p>
  </div>
  <div class="card" style="margin-top:12px;padding:8px">${mapSvg}</div>
  <h2 class="section-title">Próximas visitas <small>Ver todas</small></h2>
  <div style="display:grid;grid-template-columns:minmax(0,1fr);gap:10px">
    ${stops
      .map(
        ([h, n, d, c, s], i) => `<div class="card row" style="padding:12px 14px;${i === 1 ? 'outline:2px solid #c8102e;outline-offset:-2px' : ''}">
      <div style="width:46px;text-align:center"><b style="font-size:15px">${h}</b></div>
      <div style="flex:1;min-width:0"><p style="font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${n}</p><p class="muted" style="font-size:13px">${d}</p></div>
      <span class="chip ${c}">${s}</span>
    </div>`,
      )
      .join('')}
  </div>
</div>
${tabbar(0)}`,
);

// 2 · Ficha del cliente ---------------------------------------------------------
const screen2 = page(
  'Cliente',
  `${status()}
<div class="nav">${ic('chevron-right', 22).replace('<svg', '<svg style="transform:scaleX(-1)"')}<span>Ruta</span><span class="grow"></span>${ic('send', 20)}</div>
<div class="screen">
  <div class="row" style="margin-top:4px">
    <div class="avatar" style="width:56px;height:56px;border-radius:18px;font-size:20px">TR</div>
    <div><h1 style="font-size:26px;font-weight:800;letter-spacing:-.02em">La Tasca de Rosa</h1><p class="muted">Bar · C/ Pizarro, 12 · Cáceres</p></div>
  </div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:16px">
    ${[
      ['telephone', 'Llamar'],
      ['globe', 'Cómo llegar'],
      ['file-text', 'Historial'],
    ]
      .map(([i, l]) => `<div class="card" style="display:grid;justify-items:center;gap:6px;padding:12px 6px;color:#c8102e">${ic(i, 22)}<span style="font-size:13px;font-weight:600;color:#1c1b1f">${l}</span></div>`)
      .join('')}
  </div>
  <div class="card" style="margin-top:14px;border:1.5px solid #f3c3ca;background:linear-gradient(135deg,#fff,#fff5f6)">
    <div class="row" style="gap:8px;color:#c8102e;font-weight:700;font-size:14px">${ic('sparkles', 18)}Sugerencia del asistente</div>
    <p style="margin:8px 0 12px;line-height:1.4">Suele pedir <b>jamón de cebo</b> cada dos semanas y su último pedido fue hace 15 días. Además, el chorizo de vela se le agotó en septiembre.</p>
    <div class="btn light" style="height:42px;font-size:15px">${ic('check', 18)}Añadir al pedido</div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px">
    <div class="card"><p class="muted" style="font-size:13px">Último pedido</p><p style="font-size:20px;font-weight:800">486,20 €</p><p class="muted" style="font-size:12.5px">24 sep · 7 productos</p></div>
    <div class="card"><p class="muted" style="font-size:13px">Pendiente de cobro</p><p style="font-size:20px;font-weight:800;color:#b86e00">212,40 €</p><p class="muted" style="font-size:12.5px">1 factura · vence 15 oct</p></div>
  </div>
  <h2 class="section-title">Lo que más pide</h2>
  <div class="card" style="padding:4px 16px">
    ${[
      ['jamon', 'Jamón de cebo ibérico 50 %', 'Cada 2 semanas'],
      ['queso', 'Queso curado de oveja', 'Mensual'],
      ['loncheado', 'Loncheado de jamón 100 g', 'Semanal'],
    ]
      .map(
        ([i, n, f], k) => `<div class="row" style="padding:10px 0;${k ? 'border-top:1px solid #ebe6e5' : ''}">${thumb(i, 38)}<p style="flex:1;font-weight:600;font-size:14.5px">${n}</p><span class="muted" style="font-size:13px">${f}</span></div>`,
      )
      .join('')}
  </div>
  <div class="btn" style="margin-top:16px">${ic('file-text', 20)}Nuevo pedido</div>
</div>
${tabbar(1)}`,
);

// 3 · Nuevo pedido ---------------------------------------------------------------
const products = [
  ['jamon', 'Jamón de cebo 50 %', '8 kg aprox. · 24,90 €/kg', 1],
  ['paleta', 'Paleta de cebo 50 %', '5 kg aprox. · 21,50 €/kg', 1],
  ['lomo', 'Lomo de cebo ibérico', '1 kg · 32,00 €/kg', 2],
  ['chorizo', 'Chorizo ibérico de vela', '250 g · 3,95 €/ud.', 12],
  ['queso', 'Queso curado de oveja', '3 kg · 18,40 €/kg', 1],
  ['loncheado', 'Loncheado de jamón', 'Sobre 100 g · 4,20 €', 20],
];
const screen3 = page(
  'Nuevo pedido',
  `${status()}
<div class="nav">${ic('chevron-right', 22).replace('<svg', '<svg style="transform:scaleX(-1)"')}<span>Cliente</span><span class="grow nav-title">Nuevo pedido</span><span style="width:70px"></span></div>
<div class="screen">
  <p class="muted" style="text-align:center;font-size:13px;margin-top:-2px">La Tasca de Rosa</p>
  <div class="row" style="margin-top:12px;height:40px;border-radius:12px;background:#ebe6e5;padding:0 12px;gap:8px;color:#8a8384">${ic('search', 18)}<span>Buscar producto o código</span></div>
  <div class="row" style="gap:8px;margin:12px 0 4px;overflow:hidden">
    ${['Todo', 'Jamones', 'Embutidos', 'Quesos', 'Conservas'].map((c, i) => `<span class="chip ${i ? 'grey' : ''}" style="font-size:13.5px;padding:7px 13px;${i ? '' : 'background:#c8102e;color:#fff'}">${c}</span>`).join('')}
  </div>
  <div class="card" style="padding:2px 14px;margin-top:10px">
    ${products
      .map(
        ([i, n, d, q], k) => `<div class="row" style="padding:11px 0;${k ? 'border-top:1px solid #ebe6e5' : ''}">
      ${thumb(i)}
      <div style="flex:1;min-width:0"><p style="font-weight:700;font-size:14.5px;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${n}</p><p class="muted" style="font-size:12.5px;margin-top:2px">${d}</p></div>
      <div class="stepper"><span>−</span><b>${q}</b><span>+</span></div>
    </div>`,
      )
      .join('')}
  </div>
</div>
<div style="position:absolute;left:0;right:0;bottom:0;background:#fff;border-radius:24px 24px 0 0;box-shadow:0 -10px 30px -12px rgb(0 0 0 / .18);padding:16px 18px 34px">
  <div class="row" style="justify-content:space-between;margin-bottom:12px">
    <div><p class="muted" style="font-size:13px">6 productos · 37 unidades</p><p style="font-size:24px;font-weight:800">557,30 €</p></div>
    <span class="chip green">${ic('check', 13, 3)}Stock disponible</span>
  </div>
  <div class="btn">Revisar pedido ${ic('arrow-right', 20)}</div>
  <span class="home-ind"></span>
</div>`,
);

// 4 · Entrega y firma --------------------------------------------------------------
const screen4 = page(
  'Entrega',
  `${status()}
<div class="nav">${ic('chevron-right', 22).replace('<svg', '<svg style="transform:scaleX(-1)"')}<span>Pedido</span><span class="grow nav-title">Confirmar entrega</span><span style="width:70px"></span></div>
<div class="screen">
  <div class="card row" style="margin-top:8px;background:#e7f5ec;box-shadow:none;color:#1f8a4c;gap:10px">
    ${ic('circle-check', 22)}<div><p style="font-weight:700">Pedido enviado a SAP</p><p style="font-size:13px;opacity:.85">Nº 4500012873 · hace un momento</p></div>
  </div>
  <div class="card" style="margin-top:12px">
    <div class="row" style="justify-content:space-between"><p style="font-weight:700">Albarán A-2026-1847</p><span class="chip red">6 líneas</span></div>
    <div style="display:grid;gap:7px;margin-top:10px;font-size:14px">
      ${[
        ['Jamón cebo 50 %', '1 × 8,00 kg', '199,20 €'],
        ['Paleta cebo 50 %', '1 × 5,00 kg', '107,50 €'],
        ['Lomo de cebo', '2 × 1,00 kg', '64,00 €'],
        ['Otros 3 productos', '33 uds.', '186,60 €'],
      ]
        .map(([n, q, p]) => `<div class="row" style="gap:8px"><span style="flex:1">${n}</span><span class="muted" style="font-size:13px">${q}</span><b style="width:72px;text-align:right">${p}</b></div>`)
        .join('')}
      <div class="row" style="border-top:1px solid #ebe6e5;padding-top:9px;margin-top:2px"><b style="flex:1">Total (IVA incl.)</b><b style="font-size:18px">613,03 €</b></div>
    </div>
  </div>
  <h2 class="section-title" style="margin-top:16px">Firma del cliente <small>Borrar</small></h2>
  <div class="card" style="height:150px;position:relative;padding:0">
    <svg width="100%" height="150" viewBox="0 0 354 150"><path d="M46 104 C58 64 70 56 76 76 S84 116 98 92 S116 46 128 62 S130 108 146 96 C160 86 166 70 180 74 S196 104 214 96 S240 70 262 78 C280 84 292 94 312 86" fill="none" stroke="#1c1b1f" stroke-width="2.6" stroke-linecap="round"/><line x1="30" y1="118" x2="324" y2="118" stroke="#ebe6e5" stroke-width="1.5" stroke-dasharray="5 5"/></svg>
    <p class="muted" style="position:absolute;left:30px;bottom:10px;font-size:12.5px">Rosa Martín · encargada</p>
  </div>
  <div class="card row" style="margin-top:12px;gap:12px">
    <div class="thumb" style="background:linear-gradient(135deg,#e9e3dc,#d8cfc6);color:#6f6a6b">${ic('file-text', 22)}</div>
    <div style="flex:1"><p style="font-weight:700">Foto del albarán sellado</p><p class="muted" style="font-size:13px">Adjuntada · 1,2 MB</p></div>
    <span style="color:#1f8a4c">${ic('circle-check', 22)}</span>
  </div>
  <div class="btn" style="margin-top:16px">${ic('check', 20)}Confirmar entrega</div>
  <div class="card row" style="margin-top:14px;gap:12px;background:#fff">
    <div style="width:40px;height:40px;border-radius:12px;display:grid;place-items:center;background:#fdecee;color:#c8102e;flex:none">${ic('truck', 20)}</div>
    <div style="flex:1"><p class="muted" style="font-size:12.5px">Siguiente visita · 11:15</p><p style="font-weight:700">Restaurante El Olivar</p></div>
    <span class="chip grey">6 min</span>
  </div>
</div>
<span class="home-ind"></span>`,
);

// Capturas -------------------------------------------------------------------------------
const screens = { '1-ruta': screen1, '2-cliente': screen2, '3-pedido': screen3, '4-entrega': screen4 };
const shot = (html, png, w, h, scale) => {
  execFileSync(CHROME, [
    '--headless=new', '--default-background-color=00000000', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files',
    `--force-device-scale-factor=${scale}`, `--window-size=${w},${h}`, '--virtual-time-budget=1500',
    `--screenshot=${png}`, `file://${html}`,
  ], { stdio: 'ignore' });
};
for (const [name, html] of Object.entries(screens)) {
  const file = join(OUT, `${name}.html`);
  writeFileSync(file, html);
  shot(file, join(PNG, `${name}.png`), W, H, 3);
  console.log(`✔ ${name}.png`);
}

// Composición: las cuatro pantallas en marcos de iPhone, para la web.
const frame = (src, i) => `
<div class="phone" style="transform:translateY(${[0, 36, 0, 36][i]}px)">
  <div class="glass"><img src="${src}"><span class="island"></span></div>
</div>`;
const montage = `<!doctype html><html><head><meta charset="utf-8"><style>
html,body{margin:0;width:1900px;height:1100px;overflow:hidden;background:transparent}
.wrap{display:flex;gap:40px;justify-content:center;align-items:center;height:100%}
.phone{width:390px;height:844px;padding:14px;border-radius:66px;background:linear-gradient(145deg,#3a3a3c,#111 40%,#2c2c2e);box-shadow:0 0 0 2px #59595c inset,0 40px 80px -30px rgb(0 0 0 / .55)}
.glass{position:relative;width:100%;height:100%;border-radius:54px;overflow:hidden;background:#000}
.glass img{display:block;width:100%;height:100%;object-fit:cover}
.island{position:absolute;top:11px;left:50%;transform:translateX(-50%);width:110px;height:32px;border-radius:20px;background:#000}
</style></head><body><div class="wrap">${Object.keys(screens)
  .map((n, i) => frame(`file://${join(PNG, `${n}.png`)}`, i))
  .join('')}</div></body></html>`;
const mfile = join(OUT, 'montaje.html');
writeFileSync(mfile, montage);
shot(mfile, join(PNG, 'montaje.png'), 1900, 1100, 1);
console.log('✔ montaje.png');
