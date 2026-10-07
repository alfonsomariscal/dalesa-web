// Demo: la app nativa nueva de MyOnBank (banco ficticio), resultado de la migración con agentes y SDD.
// Estilo de banco digital moderno: oscuro, saldo grande, degradados y acciones redondas.
//   /opt/homebrew/bin/node demos/banca-app/build.mjs
// Salida: demos/banca-app/out/*.html y demos/capturas/banca-app/*.png
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import lucide from '../../src/icons.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, 'out');
const PNG = resolve(HERE, '../capturas/banca-app');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
mkdirSync(OUT, { recursive: true });
mkdirSync(PNG, { recursive: true });
const W = 390;
const H = 844;

const ic = (name, size = 20, sw = 2) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" style="flex:none">${lucide[name] ?? ''}</svg>`;
// Iconos simples que no están en la web.
const glyph = {
  plus: '<path d="M12 5v14M5 12h14"/>',
  dots: '<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',
  snow: '<path d="M12 2v20M4.9 6l14.2 12M19.1 6 4.9 18M9 4l3 3 3-3M9 20l3-3 3 3"/>',
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  back: '<path d="M15 18l-6-6 6-6"/>',
  del: '<path d="M21 5H9l-6 7 6 7h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1Z"/><path d="m16 9-5 6M11 9l5 6"/>',
  stats: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  card: '<rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20"/>',
};
const g = (k, size = 20, sw = 2) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" style="flex:none">${glyph[k]}</svg>`;

const css = `
:root { --bg:#09090c; --panel:#16161b; --panel2:#1f1f26; --text:#f5f5f7; --muted:#8e8e99; --line:#26262e; --accent:#7b6cff; --green:#36d399; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: ${W}px; height: ${H}px; overflow: hidden; }
body { font-family: -apple-system, system-ui, sans-serif; color: var(--text); background: var(--bg); -webkit-font-smoothing: antialiased; font-size: 15px; position: relative; letter-spacing: -.01em; }
.status { position: relative; z-index: 3; height: 54px; display: flex; align-items: center; justify-content: space-between; padding: 14px 30px 0 34px; font-weight: 600; font-size: 16px; }
.status .sys { display: flex; gap: 6px; align-items: center; }
.battery { width: 26px; height: 12px; border: 1.5px solid currentColor; border-radius: 4px; padding: 1.5px; } .battery i { display: block; height: 100%; width: 74%; background: currentColor; border-radius: 1.5px; }
.screen { position: relative; z-index: 2; padding: 0 18px; }
.row { display: flex; align-items: center; gap: 12px; } .row > div { min-width: 0; }
.muted { color: var(--muted); }
.glow { position: absolute; inset: 0 0 auto 0; height: 470px; z-index: 0;
  background: radial-gradient(120% 70% at 20% 10%, #5b3cff 0%, transparent 60%), radial-gradient(90% 70% at 90% 30%, #00a6ff 0%, transparent 60%), radial-gradient(80% 60% at 50% 90%, #ff3d9a55 0%, transparent 70%), #0d0b2a; }
.glow::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 55%, var(--bg)); }
.pill { display: inline-flex; align-items: center; gap: 6px; height: 34px; padding: 0 14px; border-radius: 999px; background: rgb(255 255 255 / .14); font-weight: 600; font-size: 14px; }
.act { display: grid; justify-items: center; gap: 8px; font-size: 12.5px; font-weight: 600; }
.act span { width: 52px; height: 52px; border-radius: 50%; display: grid; place-items: center; background: rgb(255 255 255 / .16); }
.panel { background: var(--panel); border-radius: 24px; padding: 6px 16px; }
.tx { display: flex; align-items: center; gap: 12px; padding: 11px 0; }
.tx + .tx { border-top: 1px solid var(--line); }
.av { width: 42px; height: 42px; border-radius: 50%; display: grid; place-items: center; flex: none; font-weight: 800; font-size: 15px; color: #fff; }
.tabbar { position: absolute; left: 0; right: 0; bottom: 0; height: 84px; z-index: 3; background: rgb(14 14 18 / .94); border-top: 1px solid var(--line); display: flex; justify-content: space-around; padding-top: 9px; }
.tabbar div { display: grid; justify-items: center; gap: 4px; font-size: 10.5px; font-weight: 600; color: #6c6c76; width: 70px; }
.tabbar .on { color: #fff; }
.home-ind { position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); width: 134px; height: 5px; border-radius: 3px; background: #fff; z-index: 4; }
.top { display: flex; align-items: center; gap: 10px; padding: 6px 0 0; }
.circle { width: 38px; height: 38px; border-radius: 50%; display: grid; place-items: center; background: rgb(255 255 255 / .14); flex: none; }
.btn { display: flex; align-items: center; justify-content: center; gap: 8px; height: 54px; border-radius: 999px; font-weight: 700; font-size: 17px; background: #fff; color: #0b0b0f; }
.key { height: 56px; display: grid; place-items: center; font-size: 28px; font-weight: 500; }
`;
const status = () => `<div class="status"><span>9:41</span><span class="sys">
  <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>
  <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor"><path d="M8.5 2.6c2.3 0 4.4.9 6 2.4l1.2-1.2A10.2 10.2 0 0 0 8.5.9 10.2 10.2 0 0 0 1.3 3.8L2.5 5a8.5 8.5 0 0 1 6-2.4Zm0 3.4c1.4 0 2.6.5 3.6 1.4l1.2-1.2a6.8 6.8 0 0 0-9.6 0l1.2 1.2c1-.9 2.2-1.4 3.6-1.4Zm0 3.4c.5 0 1 .2 1.3.5L8.5 11.2 7.2 9.9c.3-.3.8-.5 1.3-.5Z"/></svg>
  <span class="battery"><i></i></span></span></div>`;
const tabbar = (on) => `<div class="tabbar">${[
  ['landmark', 'Inicio', ic],
  ['stats', 'Inversión', g],
  ['send', 'Pagos', ic],
  ['card', 'Tarjetas', g],
  ['user', 'Perfil', ic],
]
  .map(([i, l, f], k) => `<div class="${k === on ? 'on' : ''}">${f(i, 23, 1.9)}${l}</div>`)
  .join('')}</div><span class="home-ind"></span>`;
const page = (t, b) => `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${t}</title><style>${css}</style></head><body>${b}</body></html>`;

// La tarjeta MyOnBank (dibujada).
const cardArt = (w = 320) => `
<div style="width:${w}px;height:${Math.round(w * 0.63)}px;border-radius:22px;position:relative;overflow:hidden;color:#fff;
  background:radial-gradient(120% 120% at 0% 0%,#8a6bff 0%,transparent 55%),radial-gradient(120% 120% at 100% 100%,#00b4ff 0%,transparent 55%),linear-gradient(135deg,#3b22c9,#0c6fd6);
  box-shadow:0 24px 50px -20px rgb(91 60 255 / .7)">
  <div style="position:absolute;inset:0;background:repeating-linear-gradient(115deg,rgb(255 255 255 / .05) 0 2px,transparent 2px 9px)"></div>
  <p style="position:absolute;left:20px;top:18px;font-weight:800;font-size:20px;letter-spacing:-.03em">MyOn<span style="opacity:.75">Bank</span></p>
  <div style="position:absolute;left:20px;top:${Math.round(w * 0.24)}px;width:40px;height:30px;border-radius:7px;background:linear-gradient(135deg,#e9d8a6,#b89a52)"></div>
  <p style="position:absolute;left:20px;bottom:18px;font-size:15px;letter-spacing:.12em;opacity:.9">•••• 0912</p>
  <p style="position:absolute;right:20px;bottom:16px;font-weight:800;font-style:italic;font-size:20px;opacity:.95">VISA</p>
</div>`;

// 1 · Inicio
const inicio = page(
  'Inicio',
  `<div class="glow"></div>
${status()}
<div class="screen">
  <div class="top">
    <div class="circle" style="background:linear-gradient(135deg,#ffb36b,#ff5c8a);font-weight:800">M</div>
    <div class="pill" style="flex:1">${ic('search', 16)}<span style="opacity:.8">Buscar</span></div>
    <div class="circle">${g('stats', 19)}</div>
    <div class="circle">${g('card', 19)}</div>
  </div>
  <div style="text-align:center;margin-top:46px">
    <p style="font-size:14px;font-weight:600;opacity:.8">Personal · EUR</p>
    <p style="font-size:52px;font-weight:800;letter-spacing:-.04em;margin-top:2px">12.486<span style="font-size:30px">,30 €</span></p>
    <span class="pill" style="margin-top:10px">Cuentas</span>
  </div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);margin-top:30px">
    ${[
      [g('plus', 22, 2.2), 'Añadir'],
      [ic('send', 20), 'Enviar'],
      [ic('repeat', 20), 'Cambiar'],
      [g('dots', 22), 'Más'],
    ]
      .map(([i, l]) => `<div class="act"><span>${i}</span>${l}</div>`)
      .join('')}
  </div>
  <div class="panel" style="margin-top:28px">
    ${[
      ['#ff7a45', 'S', 'Supermercado', 'Hoy, 9:12', '−64,18 €'],
      ['#36d399', 'N', 'Nómina octubre', 'Ayer', '+2.140,00 €'],
      ['#7b6cff', 'P', 'Pablo Ruiz', 'Ayer · Inmediata', '−80,00 €'],
    ]
      .map(([c, l, n, d, a]) => `<div class="tx"><div class="av" style="background:${c}">${l}</div><div style="flex:1"><p style="font-weight:700">${n}</p><p class="muted" style="font-size:13px">${d}</p></div><b style="${a.startsWith('+') ? 'color:var(--green)' : ''}">${a}</b></div>`)
      .join('')}
    <p style="text-align:center;color:var(--accent);font-weight:700;font-size:14px;padding:10px 0 8px">Ver todo</p>
  </div>
</div>
${tabbar(0)}`,
);

// 2 · Enviar (teclado)
const enviar = page(
  'Enviar',
  `${status()}
<div class="screen">
  <div class="top" style="justify-content:space-between">
    <div class="circle">${g('back', 20, 2.4)}</div>
    <p style="font-weight:700;font-size:17px">Enviar</p>
    <div style="width:38px"></div>
  </div>
  <div class="row" style="justify-content:center;margin-top:20px;gap:10px">
    <div class="av" style="background:linear-gradient(135deg,#ff5c8a,#ffb36b);width:46px;height:46px">LP</div>
    <div><p style="font-weight:700;font-size:16px">Lucía Pardo</p><p class="muted" style="font-size:13px">ES76 •••• 1332 · <span style="color:var(--green)">IBAN válido</span></p></div>
  </div>
  <p style="text-align:center;font-size:64px;font-weight:800;letter-spacing:-.04em;margin-top:28px">1.250<span style="color:var(--muted)"> €</span></p>
  <div style="display:flex;justify-content:center;margin-top:8px"><span class="pill" style="background:var(--panel2);color:var(--muted);font-size:13px">Te quedan 13.750 € de límite hoy</span></div>
  <div class="panel row" style="margin-top:20px;padding:12px 16px;gap:10px">
    ${ic('file-text', 18)}<p style="flex:1;font-size:14px">Alquiler octubre</p><span class="muted" style="font-size:12.5px">Concepto</span>
  </div>
  <div class="row" style="margin-top:12px;gap:10px;padding:0 4px;font-size:13px;color:var(--muted)">${ic('shield-check', 17)}<span>Más de 1.000 €: te pediremos confirmar con Face ID.</span></div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);margin-top:10px">
    ${['1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '0', 'del'].map((k) => `<div class="key">${k === 'del' ? g('del', 26, 1.8) : k}</div>`).join('')}
  </div>
  <div class="btn" style="margin-top:4px">Enviar 1.250 €</div>
</div>
<span class="home-ind"></span>`,
);

// 3 · Tarjeta
const tarjeta = page(
  'Tarjeta',
  `<div class="glow" style="height:420px;opacity:.85"></div>
${status()}
<div class="screen">
  <div class="top" style="justify-content:space-between">
    <p style="font-weight:800;font-size:28px;letter-spacing:-.03em">Tarjetas</p>
    <div class="circle">${g('plus', 20, 2.2)}</div>
  </div>
  <div style="display:grid;place-items:center;margin-top:22px">${cardArt(330)}</div>
  <div style="display:flex;justify-content:center;gap:6px;margin-top:14px"><i style="width:18px;height:6px;border-radius:3px;background:#fff"></i><i style="width:6px;height:6px;border-radius:3px;background:#ffffff55"></i><i style="width:6px;height:6px;border-radius:3px;background:#ffffff55"></i></div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);margin-top:22px">
    ${[
      [g('snow', 21), 'Congelar'],
      [g('eye', 21), 'Ver datos'],
      [ic('lock', 20), 'PIN'],
      [g('dots', 22), 'Ajustes'],
    ]
      .map(([i, l]) => `<div class="act"><span style="background:var(--panel2)">${i}</span>${l}</div>`)
      .join('')}
  </div>
  <div class="panel" style="margin-top:22px;padding:4px 16px">
    ${[
      ['Pagos online', true],
      ['Pagos sin contacto', true],
      ['Retirada en cajeros', true],
      ['Pagos en el extranjero', false],
    ]
      .map(
        ([n, on], i) => `<div class="row" style="padding:13px 0;${i ? 'border-top:1px solid var(--line)' : ''}"><p style="flex:1;font-weight:600">${n}</p><span style="width:46px;height:28px;border-radius:14px;background:${on ? 'var(--accent)' : '#3a3a44'};position:relative;flex:none"><i style="position:absolute;top:3px;${on ? 'right:3px' : 'left:3px'};width:22px;height:22px;border-radius:50%;background:#fff"></i></span></div>`,
      )
      .join('')}
  </div>
  <div class="panel row" style="margin-top:12px;padding:13px 16px">
    <p style="flex:1;font-weight:600">Gastado este mes</p><b>642,18 €</b>
  </div>
</div>
${tabbar(3)}`,
);

// 4 · Enviado
const enviado = page(
  'Enviado',
  `<div class="glow" style="height:520px;background:radial-gradient(90% 60% at 50% 25%,#1fbf8f 0%,transparent 65%),radial-gradient(80% 60% at 10% 0%,#5b3cff 0%,transparent 60%),#0b1420"></div>
${status()}
<div class="screen" style="display:grid;justify-items:center;text-align:center">
  <div style="width:96px;height:96px;border-radius:50%;background:#fff;color:#0b0b0f;display:grid;place-items:center;margin-top:70px">${ic('check', 46, 3)}</div>
  <p style="font-size:34px;font-weight:800;letter-spacing:-.03em;margin-top:24px">1.250 € enviados</p>
  <p style="margin-top:8px;opacity:.85;font-size:16px">Lucía Pardo ya lo tiene en su cuenta</p>
  <div class="panel" style="width:100%;margin-top:40px;text-align:left;padding:4px 18px">
    ${[
      ['Confirmado con', 'Face ID'],
      ['Llegada', 'En segundos'],
      ['Concepto', 'Alquiler octubre'],
      ['Comisión', '0 €'],
    ]
      .map(([a, b], i) => `<div class="row" style="padding:13px 0;justify-content:space-between;${i ? 'border-top:1px solid var(--line)' : ''}"><span class="muted">${a}</span><b>${b}</b></div>`)
      .join('')}
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;width:100%;margin-top:18px">
    <div class="btn" style="background:var(--panel2);color:#fff">Compartir</div>
    <div class="btn">Hecho</div>
  </div>
</div>
<span class="home-ind"></span>`,
);

const screens = { '1-inicio': inicio, '2-enviar': enviar, '3-tarjeta': tarjeta, '4-enviado': enviado };
const shot = (html, png, w, h, scale) =>
  execFileSync(CHROME, ['--headless=new', '--default-background-color=00000000', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files', `--force-device-scale-factor=${scale}`, `--window-size=${w},${h}`, '--virtual-time-budget=1500', `--screenshot=${png}`, `file://${html}`], { stdio: 'ignore' });
for (const [name, html] of Object.entries(screens)) {
  const f = join(OUT, `${name}.html`);
  writeFileSync(f, html);
  shot(f, join(PNG, `${name}.png`), W, H, 3);
  console.log(`✔ ${name}.png`);
}
const names = Object.keys(screens);
const montage = `<!doctype html><html><head><meta charset="utf-8"><style>
html,body{margin:0;width:${names.length * 470 + 60}px;height:1000px;overflow:hidden;background:transparent}
.wrap{display:flex;gap:40px;justify-content:center;align-items:center;height:100%}
.phone{width:390px;height:844px;padding:14px;border-radius:66px;background:linear-gradient(145deg,#3a3a3c,#111 40%,#2c2c2e);box-shadow:0 0 0 2px #59595c inset,0 40px 80px -30px rgb(0 0 0 / .55)}
.glass{position:relative;width:100%;height:100%;border-radius:54px;overflow:hidden;background:#000}
.glass img{display:block;width:100%;height:100%;object-fit:cover}
.island{position:absolute;top:11px;left:50%;transform:translateX(-50%);width:110px;height:32px;border-radius:20px;background:#000}
</style></head><body><div class="wrap">${names.map((n, i) => `<div class="phone" style="transform:translateY(${[0, 36, 0, 36][i]}px)"><div class="glass"><img src="file://${join(PNG, `${n}.png`)}"><span class="island"></span></div></div>`).join('')}</div></body></html>`;
const mf = join(OUT, 'montaje.html');
writeFileSync(mf, montage);
shot(mf, join(PNG, 'montaje.png'), names.length * 470 + 60, 1000, 2);
console.log('✔ montaje.png');
