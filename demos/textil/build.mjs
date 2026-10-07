// Demo: app de Velarte (cadena de moda ficticia) para encargados de tienda y recomendación de talla.
// Ilustra el caso textil sin usar material del cliente.
//   /opt/homebrew/bin/node demos/textil/build.mjs
// Salida: demos/textil/out/*.html y demos/capturas/textil/*.png
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import lucide from '../../src/icons.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, 'out');
const PNG = resolve(HERE, '../capturas/textil');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
mkdirSync(OUT, { recursive: true });
mkdirSync(PNG, { recursive: true });

const W = 390;
const H = 844;

const ic = (name, size = 20, sw = 2) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" style="flex:none">${lucide[name] ?? ''}</svg>`;

// Prendas dibujadas (planas, sin fotos).
const garment = {
  camisa: (c = '#d9c7a7') =>
    `<path d="M17 8l7-3h0c1 3 7 3 8 0l7 3 7 8-6 4-3-3v27H19V17l-3 3-6-4z" fill="${c}"/><path d="M24 5c1 4 7 4 8 0" fill="none" stroke="#00000022" stroke-width="1.5"/><path d="M28 9v35" stroke="#00000018" stroke-width="1.2"/><circle cx="28" cy="16" r=".9" fill="#0003"/><circle cx="28" cy="23" r=".9" fill="#0003"/><circle cx="28" cy="30" r=".9" fill="#0003"/>`,
  vestido: (c = '#c98b6b') =>
    `<path d="M22 5h12l-1 9 9 30H14l9-30z" fill="${c}"/><path d="M22 5c2 3 10 3 12 0" fill="none" stroke="#0002" stroke-width="1.5"/><path d="M20 22h16" stroke="#0002" stroke-width="1.5"/>`,
  pantalon: (c = '#3d3a36') =>
    `<path d="M17 6h22l2 38h-9l-4-26-4 26h-9z" fill="${c}"/><path d="M17 10h22" stroke="#fff3" stroke-width="1.5"/><path d="M28 12v6" stroke="#fff3" stroke-width="1.2"/>`,
  chaqueta: (c = '#7a8b6f') =>
    `<path d="M18 7l10 4 10-4 8 7-3 30H13l-3-30z" fill="${c}"/><path d="M28 11v33M22 9l6 10 6-10" fill="none" stroke="#0003" stroke-width="1.5"/>`,
};
const pic = (kind, color, size = 48, bg = '#f1ece4') =>
  `<div style="width:${size}px;height:${size}px;border-radius:${Math.round(size / 4)}px;display:grid;place-items:center;flex:none;background:${bg}"><svg width="${size - 6}" height="${size - 6}" viewBox="0 0 56 50">${garment[kind](color)}</svg></div>`;

const css = `
:root { --ink:#171512; --cream:#f7f3ec; --card:#fff; --muted:#7a736a; --line:#ebe5dc; --accent:#b5562f; --accent-soft:#f7e6dd; --green:#2f7d4f; --green-soft:#e5f2e9; --amber:#a86a12; --amber-soft:#fbf0dc; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: ${W}px; height: ${H}px; overflow: hidden; }
body { font-family: -apple-system, system-ui, sans-serif; color: var(--ink); background: var(--cream); -webkit-font-smoothing: antialiased; font-size: 15px; position: relative; }
.status { position: relative; z-index: 2; height: 54px; display: flex; align-items: center; justify-content: space-between; padding: 14px 30px 0 34px; font-weight: 600; font-size: 16px; }
.status .sys { display: flex; gap: 6px; align-items: center; }
.battery { width: 26px; height: 12px; border: 1.5px solid currentColor; border-radius: 4px; padding: 1.5px; position: relative; }
.battery i { display: block; height: 100%; width: 70%; background: currentColor; border-radius: 1.5px; }
.screen { padding: 0 18px; }
.nav { display: flex; align-items: center; gap: 4px; padding: 6px 10px 6px 8px; font-size: 17px; }
.nav .back { color: var(--accent); display: flex; align-items: center; }
.nav-title { flex: 1; text-align: center; font-weight: 600; }
.brand { font-family: Georgia, 'Times New Roman', serif; letter-spacing: .32em; font-size: 15px; font-weight: 600; }
.h-small { color: var(--muted); font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: .05em; }
.h-big { font-size: 29px; font-weight: 800; letter-spacing: -.02em; }
.row { display: flex; align-items: center; gap: 12px; } .row > div { min-width: 0; }
.card { background: var(--card); border-radius: 18px; padding: 14px 16px; box-shadow: 0 1px 2px rgb(0 0 0 / .04), 0 8px 20px -12px rgb(0 0 0 / .14); }
.section-title { font-size: 18px; font-weight: 700; margin: 18px 2px 10px; display: flex; justify-content: space-between; align-items: baseline; }
.section-title small { font-size: 14px; color: var(--accent); font-weight: 600; }
.chip { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 700; padding: 3px 9px; border-radius: 999px; white-space: nowrap; }
.chip.accent { color: var(--accent); background: var(--accent-soft); } .chip.green { color: var(--green); background: var(--green-soft); } .chip.amber { color: var(--amber); background: var(--amber-soft); } .chip.grey { color: var(--muted); background: #efeae2; }
.muted { color: var(--muted); }
.btn { display: flex; align-items: center; justify-content: center; gap: 8px; height: 52px; border-radius: 16px; font-weight: 700; font-size: 17px; color: #fff; background: var(--ink); }
.btn.accent { background: var(--accent); }
.btn.light { background: var(--accent-soft); color: var(--accent); }
.tabbar { position: absolute; left: 0; right: 0; bottom: 0; height: 84px; background: rgb(255 255 255 / .94); border-top: 1px solid var(--line); display: flex; justify-content: space-around; padding-top: 8px; }
.tabbar div { display: grid; justify-items: center; gap: 3px; font-size: 10.5px; font-weight: 600; color: #a39b90; width: 70px; }
.tabbar .on { color: var(--ink); }
.home-ind { position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); width: 134px; height: 5px; border-radius: 3px; background: var(--ink); }
.size { display: grid; justify-items: center; gap: 3px; padding: 10px 0; border-radius: 12px; background: var(--cream); font-weight: 700; }
.size b { font-size: 20px; } .size span { font-size: 11px; color: var(--muted); font-weight: 600; }
`;

const status = () => `
<div class="status"><span>9:41</span><span class="sys">
  <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>
  <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor"><path d="M8.5 2.6c2.3 0 4.4.9 6 2.4l1.2-1.2A10.2 10.2 0 0 0 8.5.9 10.2 10.2 0 0 0 1.3 3.8L2.5 5a8.5 8.5 0 0 1 6-2.4Zm0 3.4c1.4 0 2.6.5 3.6 1.4l1.2-1.2a6.8 6.8 0 0 0-9.6 0l1.2 1.2c1-.9 2.2-1.4 3.6-1.4Zm0 3.4c.5 0 1 .2 1.3.5L8.5 11.2 7.2 9.9c.3-.3.8-.5 1.3-.5Z"/></svg>
  <span class="battery"><i></i></span></span></div>`;

const tabbar = (on) => `
<div class="tabbar">${[
  ['bar-chart-3', 'Hoy'],
  ['layers', 'Stock'],
  ['truck', 'Pedidos'],
  ['users', 'Equipo'],
]
  .map(([i, l], k) => `<div class="${k === on ? 'on' : ''}">${ic(i, 24, 1.9)}${l}</div>`)
  .join('')}<span class="home-ind"></span></div>`;

const back = (label) => `<span class="back">${ic('chevron-right', 22).replace('<svg', '<svg style="transform:scaleX(-1);flex:none"')}${label}</span>`;

const page = (title, body) =>
  `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${title}</title><style>${css}</style></head><body>${body}</body></html>`;

// 1 · Hoy en tienda ------------------------------------------------------------
const hoy = page(
  'Hoy en tienda',
  `${status()}
<div class="screen">
  <div class="row" style="justify-content:space-between;margin-top:4px">
    <div><p class="brand">VELARTE</p><p class="muted" style="font-size:13px;margin-top:2px">Tienda C/ Santiago · Valladolid</p></div>
    <div style="width:40px;height:40px;border-radius:50%;display:grid;place-items:center;background:var(--ink);color:#fff;font-weight:700">LM</div>
  </div>
  <h1 class="h-big" style="margin-top:14px">Hoy, jueves</h1>
  <div class="card" style="margin-top:12px;background:var(--ink);color:#fff">
    <div class="row" style="justify-content:space-between"><p style="font-size:13px;opacity:.75;font-weight:600">Ventas de hoy</p><span class="chip" style="background:rgb(255 255 255 / .12);color:#fff">80 % del objetivo</span></div>
    <p style="font-size:34px;font-weight:800;letter-spacing:-.02em;margin-top:2px">4.820 €</p>
    <div style="height:6px;border-radius:3px;background:rgb(255 255 255 / .2);margin:10px 0 8px"><div style="width:80%;height:100%;border-radius:3px;background:#e8a582"></div></div>
    <div class="row" style="justify-content:space-between;font-size:13px;opacity:.85"><span>Objetivo 6.000 €</span><span>112 tickets · 43 € de media</span></div>
  </div>
  <div class="card row" style="margin-top:12px;border:1.5px solid #f0c9b4;gap:12px">
    <span style="color:var(--accent)">${ic('zap', 22)}</span>
    <div style="flex:1"><p style="font-weight:700">Talla M a punto de agotarse</p><p class="muted" style="font-size:13px">Camisa de lino arena: quedan 2 y se venden 3 al día</p></div>
    <span class="chip accent">Reponer</span>
  </div>
  <h2 class="section-title">Lo más vendido hoy <small>Ver todo</small></h2>
  <div class="card" style="padding:4px 14px">
    ${[
      ['camisa', '#d9c7a7', 'Camisa de lino', 'Arena · 39,95 €', 23],
      ['vestido', '#c98b6b', 'Vestido midi de lino', 'Teja · 59,95 €', 17],
      ['pantalon', '#3d3a36', 'Pantalón recto', 'Negro · 45,95 €', 14],
      ['chaqueta', '#7a8b6f', 'Sobrecamisa de algodón', 'Salvia · 49,95 €', 9],
    ]
      .map(
        ([k, c, n, d, u], i) => `<div class="row" style="padding:10px 0;${i ? 'border-top:1px solid var(--line)' : ''}">${pic(k, c, 46)}<div style="flex:1"><p style="font-weight:700;font-size:14.5px">${n}</p><p class="muted" style="font-size:12.5px">${d}</p></div><b>${u} uds.</b></div>`,
      )
      .join('')}
  </div>
</div>
${tabbar(0)}`,
);

// 2 · Stock por talla -------------------------------------------------------------
const sizes = ['XS', 'S', 'M', 'L', 'XL'];
const tienda = [3, 4, 2, 6, 3];
const ventas = [2, 9, 21, 12, 4];
const stock = page(
  'Stock por talla',
  `${status()}
<div class="nav">${back('Hoy')}<span class="nav-title">Stock por talla</span><span style="width:60px"></span></div>
<div class="screen">
  <div class="row" style="gap:14px;margin-top:4px">
    ${pic('camisa', '#d9c7a7', 84)}
    <div><p style="font-size:20px;font-weight:800;letter-spacing:-.01em">Camisa de lino</p><p class="muted" style="font-size:13px">Arena · Ref. 1847/203</p><p style="font-weight:700;margin-top:4px">39,95 €</p></div>
  </div>
  <h2 class="section-title">En esta tienda</h2>
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px">
    ${sizes.map((s, i) => `<div class="size" style="${s === 'M' ? 'background:var(--accent-soft);color:var(--accent);outline:2px solid var(--accent)' : 'background:#fff'}"><span>${s}</span><b>${tienda[i]}</b></div>`).join('')}
  </div>
  <div class="card" style="margin-top:12px;padding:6px 16px">
    ${[
      ['Almacén central', 'M: 140 uds. · llega mañana', 'green', 'Disponible'],
      ['Tienda Zorrilla (1,2 km)', 'M: 5 uds.', 'grey', 'Traspaso'],
      ['Tienda Río Shopping (6 km)', 'M: 8 uds.', 'grey', 'Traspaso'],
    ]
      .map(([n, d, c, t], i) => `<div class="row" style="padding:10px 0;${i ? 'border-top:1px solid var(--line)' : ''}"><div style="flex:1"><p style="font-weight:700;font-size:14.5px">${n}</p><p class="muted" style="font-size:12.5px">${d}</p></div><span class="chip ${c}">${t}</span></div>`)
      .join('')}
  </div>
  <h2 class="section-title">Vendidas esta semana <small>58 uds.</small></h2>
  <div class="card" style="padding:14px 16px 10px">
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;align-items:end;height:92px">
      ${ventas.map((v, i) => `<div style="display:grid;justify-items:center;gap:4px"><span style="font-size:12px;font-weight:700">${v}</span><div style="width:100%;height:${Math.round((v / 21) * 64)}px;border-radius:6px 6px 2px 2px;background:${sizes[i] === 'M' ? 'var(--accent)' : '#ddd3c6'}"></div></div>`).join('')}
    </div>
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-top:6px;text-align:center;font-size:12px;font-weight:700;color:var(--muted)">${sizes.map((s) => `<span>${s}</span>`).join('')}</div>
  </div>
  <div class="btn accent" style="margin-top:16px">${ic('truck', 20)}Pedir 6 en talla M</div>
</div>
${tabbar(1)}`,
);

// 3 · Pedido de reposición ----------------------------------------------------------
const pedido = page(
  'Pedido de reposición',
  `${status()}
<div class="nav">${back('Stock')}<span class="nav-title">Reposición</span><span style="width:60px"></span></div>
<div class="screen">
  <div class="card" style="margin-top:6px;border:1.5px solid #f0c9b4;background:linear-gradient(135deg,#fff,#fdf4ef)">
    <div class="row" style="gap:8px;color:var(--accent);font-weight:700;font-size:14px">${ic('sparkles', 18)}Sugerencia del asistente</div>
    <p style="margin-top:8px;line-height:1.45">Por las ventas de esta semana y el fin de semana que viene, te propongo reponer <b>4 modelos</b>. Sin esto, la camisa de lino en M se agota el sábado.</p>
  </div>
  <h2 class="section-title">Líneas del pedido <small>Editar</small></h2>
  <div class="card" style="padding:4px 14px">
    ${[
      ['camisa', '#d9c7a7', 'Camisa de lino · arena', 'Talla M', 6],
      ['vestido', '#c98b6b', 'Vestido midi de lino · teja', 'Tallas S y M', 5],
      ['pantalon', '#3d3a36', 'Pantalón recto · negro', 'Talla 38', 4],
      ['chaqueta', '#7a8b6f', 'Sobrecamisa · salvia', 'Talla L', 2],
    ]
      .map(
        ([k, c, n, d, q], i) => `<div class="row" style="padding:10px 0;${i ? 'border-top:1px solid var(--line)' : ''}">${pic(k, c, 44)}<div style="flex:1"><p style="font-weight:700;font-size:14.5px">${n}</p><p class="muted" style="font-size:12.5px">${d}</p></div><div class="row" style="gap:0;height:32px;border-radius:10px;background:var(--cream)"><span style="width:26px;text-align:center;color:var(--accent);font-weight:700">−</span><b style="min-width:22px;text-align:center">${q}</b><span style="width:26px;text-align:center;color:var(--accent);font-weight:700">+</span></div></div>`,
      )
      .join('')}
  </div>
  <div class="card row" style="margin-top:12px;gap:12px">
    <span style="color:var(--green)">${ic('truck', 22)}</span>
    <div style="flex:1"><p style="font-weight:700">Llega mañana</p><p class="muted" style="font-size:13px">En el camión de las 7:00 · 17 prendas</p></div>
  </div>
  <div class="btn" style="margin-top:16px">${ic('send', 19)}Enviar pedido</div>
</div>
<span class="home-ind"></span>`,
);

// 4 · Tu talla (cliente) ----------------------------------------------------------------
const talla = page(
  'Tu talla',
  `${status()}
<div style="height:300px;margin:-54px 0 0;background:linear-gradient(160deg,#efe6d8,#e2d4bf);display:grid;place-items:center;position:relative">
  <svg width="230" height="206" viewBox="0 0 56 50" style="margin-top:40px">${garment.camisa('#d9c7a7')}</svg>
  <p class="brand" style="position:absolute;top:66px;left:0;right:0;text-align:center">VELARTE</p>
</div>
<div style="position:absolute;left:0;right:0;top:268px;bottom:0;background:#fff;border-radius:24px 24px 0 0;padding:20px 20px 0;box-shadow:0 -10px 30px -12px rgb(0 0 0 / .2)">
  <div class="row" style="justify-content:space-between"><div><p style="font-size:20px;font-weight:800">Camisa de lino</p><p class="muted" style="font-size:13px">Arena · 39,95 €</p></div><span class="chip accent">${ic('sparkles', 12)}Tu talla</span></div>
  <div class="row" style="margin-top:14px;gap:14px;padding:14px;border-radius:16px;background:var(--cream)">
    <div style="width:64px;height:64px;border-radius:16px;display:grid;place-items:center;background:var(--ink);color:#fff;font-size:30px;font-weight:800;flex:none">M</div>
    <div><p style="font-weight:800;font-size:17px">Te recomendamos la M</p><p class="muted" style="font-size:13px">Aunque normalmente usas S</p></div>
  </div>
  <div style="display:grid;gap:10px;margin-top:14px;font-size:14px;line-height:1.4">
    <div class="row" style="align-items:flex-start;gap:10px"><span style="color:var(--accent)">${ic('user', 18)}</span><span>Por tus medidas: <b>172 cm y 64 kg</b>.</span></div>
    <div class="row" style="align-items:flex-start;gap:10px"><span style="color:var(--accent)">${ic('repeat', 18)}</span><span>En tus pedidos, las camisas en S te han quedado bien salvo las de lino.</span></div>
    <div class="row" style="align-items:flex-start;gap:10px"><span style="color:var(--accent)">${ic('bar-chart-3', 18)}</span><span><b>Esta prenda talla pequeño:</b> el 38 % de quienes usan S la devolvieron y se quedaron con la M.</span></div>
  </div>
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-top:16px">
    ${sizes.map((s) => `<div style="height:44px;border-radius:12px;display:grid;place-items:center;font-weight:700;${s === 'M' ? 'background:var(--ink);color:#fff' : 'border:1.5px solid var(--line)'}">${s}</div>`).join('')}
  </div>
  <div class="btn accent" style="margin-top:14px">Añadir a la cesta · M</div>
  <span class="home-ind"></span>
</div>`,
);

// Capturas ---------------------------------------------------------------------------------
const screens = { '1-hoy': hoy, '2-stock': stock, '3-pedido': pedido, '4-talla': talla };
const shot = (html, png, w, h, scale) =>
  execFileSync(CHROME, ['--headless=new', '--default-background-color=00000000', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files', `--force-device-scale-factor=${scale}`, `--window-size=${w},${h}`, '--virtual-time-budget=1500', `--screenshot=${png}`, `file://${html}`], { stdio: 'ignore' });
for (const [name, html] of Object.entries(screens)) {
  const file = join(OUT, `${name}.html`);
  writeFileSync(file, html);
  shot(file, join(PNG, `${name}.png`), W, H, 3);
  console.log(`✔ ${name}.png`);
}

// Montajes de 1 o 2 móviles para los pasos del proceso completo de Velarte.
const phones = (names, out) => {
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
html,body{margin:0;width:${names.length * 470 + 60}px;height:1000px;overflow:hidden;background:transparent}
.wrap{display:flex;gap:40px;justify-content:center;align-items:center;height:100%}
.phone{width:390px;height:844px;padding:14px;border-radius:66px;background:linear-gradient(145deg,#3a3a3c,#111 40%,#2c2c2e);box-shadow:0 0 0 2px #59595c inset,0 40px 80px -30px rgb(0 0 0 / .55)}
.glass{position:relative;width:100%;height:100%;border-radius:54px;overflow:hidden;background:#000}
.glass img{display:block;width:100%;height:100%;object-fit:cover}
.island{position:absolute;top:11px;left:50%;transform:translateX(-50%);width:110px;height:32px;border-radius:20px;background:#000}
</style></head><body><div class="wrap">${names.map((n, i) => `<div class="phone" style="transform:translateY(${names.length > 1 ? [0, 36][i] : 0}px)"><div class="glass"><img src="file://${join(PNG, `${n}.png`)}"><span class="island"></span></div></div>`).join('')}</div></body></html>`;
  const f = join(OUT, `${out}.html`);
  writeFileSync(f, html);
  shot(f, join(PNG, `${out}.png`), names.length * 470 + 60, 1000, 2);
  console.log(`✔ ${out}.png`);
};
phones(['1-hoy', '2-stock'], 'paso-tienda');
phones(['3-pedido'], 'paso-reposicion');
phones(['4-talla'], 'paso-talla');

const frame = (src, i) => `<div class="phone" style="transform:translateY(${[0, 36, 0, 36][i]}px)"><div class="glass"><img src="${src}"><span class="island"></span></div></div>`;
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
