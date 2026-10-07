// Utilidades comunes de las demos de escritorio (portal, agente de IA y panel).
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import lucide from '../src/icons.mjs';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
export const ROOT = resolve(import.meta.dirname, '..');

export const ic = (name, size = 18, sw = 2) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" style="flex:none">${lucide[name] ?? ''}</svg>`;

// Logo de Montera, la distribuidora ficticia de las demos.
export const logo = (size = 34) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 64 64" style="flex:none"><rect width="64" height="64" rx="14" fill="#c8102e"/><path d="M14 46V20l18 16 18-16v26" fill="none" stroke="#fff" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/></svg>`;

// Estilos base de escritorio con el rojo de Montera.
export const baseCss = `
:root { --red:#c8102e; --red-dark:#8e0b20; --red-soft:#fdecee; --bg:#f6f4f3; --card:#fff; --text:#1c1b1f; --muted:#6f6a6b; --line:#ebe6e5;
  --green:#1f8a4c; --green-soft:#e7f5ec; --amber:#b86e00; --amber-soft:#fff3df; --blue:#2563eb; --blue-soft:#e8efff; }
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: -apple-system, system-ui, sans-serif; color: var(--text); background: var(--bg); -webkit-font-smoothing: antialiased; font-size: 14px; }
.card { background: var(--card); border: 1px solid var(--line); border-radius: 16px; }
.row { display: flex; align-items: center; gap: 10px; }
.muted { color: var(--muted); }
.chip { display: inline-flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 700; padding: 3px 9px; border-radius: 999px; white-space: nowrap; }
.chip.red { color: var(--red); background: var(--red-soft); } .chip.green { color: var(--green); background: var(--green-soft); }
.chip.amber { color: var(--amber); background: var(--amber-soft); } .chip.grey { color: var(--muted); background: #efebea; } .chip.blue { color: var(--blue); background: var(--blue-soft); }
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 38px; padding: 0 16px; border-radius: 10px; font-weight: 700; color: #fff; background: var(--red); white-space: nowrap; }
.btn.light { background: var(--red-soft); color: var(--red); } .btn.ghost { background: #fff; color: var(--text); border: 1px solid var(--line); }
table { width: 100%; border-collapse: collapse; } th { text-align: left; font-size: 12px; color: var(--muted); font-weight: 600; padding: 10px 14px; border-bottom: 1px solid var(--line); }
td { padding: 12px 14px; border-bottom: 1px solid var(--line); } tr:last-child td { border-bottom: 0; } .num { text-align: right; font-variant-numeric: tabular-nums; }
`;

export const page = (title, css, body) =>
  `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${title}</title><style>${baseCss}${css}</style></head><body>${body}</body></html>`;

export const shot = (url, png, w, h, scale = 2) =>
  execFileSync(CHROME, [
    '--headless=new', '--default-background-color=00000000', '--lang=es-ES', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files',
    `--force-device-scale-factor=${scale}`, `--window-size=${w},${h}`, '--virtual-time-budget=3000',
    `--screenshot=${png}`, url,
  ], { stdio: 'ignore' });

// Genera cada pantalla (HTML + PNG a 1440×900) y una composición en portátil con la primera
// (montaje.png). Con { each: true }, además una por pantalla (montaje-<pantalla>.png).
export function buildDesktop(name, screens, { each = false } = {}) {
  const out = join(ROOT, 'demos', name, 'out');
  const png = join(ROOT, 'demos', 'capturas', name);
  mkdirSync(out, { recursive: true });
  mkdirSync(png, { recursive: true });
  for (const [file, html] of Object.entries(screens)) {
    const f = join(out, `${file}.html`);
    writeFileSync(f, html);
    shot(`file://${f}`, join(png, `${file}.png`), 1440, 900);
    console.log(`✔ ${name}/${file}.png`);
  }
  const laptop = (file, dest) => {
    const montage = `<!doctype html><html><head><meta charset="utf-8"><style>
html,body{margin:0;width:1900px;height:1260px;overflow:hidden;background:transparent}
.laptop{position:absolute;left:140px;top:40px;width:1620px}
.lid{background:linear-gradient(160deg,#2b2b2e,#0d0d0f);border-radius:34px 34px 0 0;padding:26px 26px 30px;box-shadow:0 0 0 2px #4a4a4e inset}
.lid img{display:block;width:100%;border-radius:8px}
.base{height:34px;margin:0 -70px;background:linear-gradient(#d9d9dc,#a9a9ae);border-radius:0 0 26px 26px;position:relative;box-shadow:0 40px 60px -30px rgb(0 0 0 / .5)}
.base::before{content:"";position:absolute;left:50%;top:0;transform:translateX(-50%);width:240px;height:12px;background:#9a9aa0;border-radius:0 0 12px 12px}
</style></head><body><div class="laptop"><div class="lid"><img src="file://${join(png, `${file}.png`)}"></div><div class="base"></div></div></body></html>`;
    const m = join(out, `${dest}.html`);
    writeFileSync(m, montage);
    shot(`file://${m}`, join(png, `${dest}.png`), 1900, 1260, 1);
    console.log(`✔ ${name}/${dest}.png`);
  };
  laptop(Object.keys(screens)[0], 'montaje');
  if (each) for (const file of Object.keys(screens)) laptop(file, `montaje-${file}`);
}

// Ilustraciones planas de producto (las mismas que la app móvil).
export const art = {
  jamon: `<path d="M9 33c-3-11 5-23 17-23 10 0 15 8 13 16-2 7-8 10-16 11l-8 4c-3 1-6-1-6-8Z" fill="#a8253a"/><path d="M15 31c-1-8 5-15 12-15 6 0 9 5 8 10-1 5-6 7-12 8l-6 2c-1 0-2-2-2-5Z" fill="#d9707c"/><path d="M20 27c3-4 8-6 11-4" stroke="#f6d6d0" stroke-width="2" fill="none" stroke-linecap="round"/><rect x="5" y="36" width="10" height="5" rx="2.5" transform="rotate(-28 10 38)" fill="#efe2cf"/>`,
  paleta: `<path d="M11 32c-2-9 5-19 15-19 8 0 12 6 11 13-1 6-7 9-13 9l-7 4c-3 1-5-1-6-7Z" fill="#9b2234"/><path d="M16 30c-1-6 4-12 10-12 5 0 7 4 6 8s-5 6-10 6l-4 2c-1 0-2-1-2-4Z" fill="#d46a77"/><rect x="7" y="36" width="9" height="5" rx="2.5" transform="rotate(-28 11 38)" fill="#efe2cf"/>`,
  lomo: `<rect x="6" y="17" width="30" height="15" rx="7.5" fill="#8f1f2f"/><ellipse cx="36" cy="24.5" rx="6" ry="7.5" fill="#c74656"/><path d="M33 21c2 1 3 3 2 6M37 20c1 2 1 4 0 7" stroke="#f3cfd3" stroke-width="1.4" fill="none" stroke-linecap="round"/><path d="M12 17v15M18 17v15M24 17v15" stroke="#6e1623" stroke-width="1.2" opacity=".6"/>`,
  chorizo: `<path d="M10 32c4-15 24-18 29-6" stroke="#a3202d" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M14 27c5-8 15-10 20-5" stroke="#d0525f" stroke-width="2" fill="none" stroke-linecap="round" opacity=".8"/><path d="M8 35l-3 4M41 29l4 3" stroke="#b9a07d" stroke-width="2" stroke-linecap="round"/>`,
  queso: `<path d="M7 34l30-15 5 6v11H7z" fill="#e9b949"/><path d="M7 34l30-15 5 6z" fill="#f6d77c"/><path d="M7 34h35v2H7z" fill="#c9952c"/><circle cx="22" cy="31" r="2.2" fill="#d19e33"/><circle cx="33" cy="30" r="1.6" fill="#d19e33"/><circle cx="28" cy="27" r="1.3" fill="#e2ad3c"/>`,
  loncheado: `<rect x="6" y="12" width="36" height="26" rx="5" fill="#f1ece6" stroke="#ddd3c8"/><ellipse cx="18" cy="25" rx="9" ry="8" fill="#c94a5b"/><ellipse cx="25" cy="24" rx="9" ry="8" fill="#d8677a"/><ellipse cx="32" cy="25" rx="8.5" ry="7.5" fill="#c23e50"/><path d="M27 21c3 0 6 2 7 5M20 21c2 1 3 3 3 5" stroke="#f7d9dc" stroke-width="1.6" fill="none" stroke-linecap="round"/>`,
};
export const thumb = (kind, size = 48) =>
  `<div style="width:${size}px;height:${size}px;border-radius:${Math.round(size / 4)}px;display:grid;place-items:center;flex:none;background:linear-gradient(135deg,#fbf6f1,#f2e9df)"><svg width="${size - 8}" height="${size - 8}" viewBox="0 0 48 48">${art[kind]}</svg></div>`;
