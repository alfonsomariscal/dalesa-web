// Demo: panel de tallas y devoluciones de Velarte (cadena de moda ficticia), para el equipo de producto.
// Cierra el proceso completo de moda: qué prendas tallan pequeño o grande y cuánto bajan las devoluciones.
//   /opt/homebrew/bin/node demos/tallas/build.mjs
import { buildDesktop, ic, page } from '../lib.mjs';

const css = `
:root { --red:#b5562f; --red-dark:#8c3f20; --red-soft:#f7e6dd; --bg:#f7f3ec; --text:#171512; --muted:#7a736a; --line:#ebe5dc; }
body { width: 1440px; height: 900px; overflow: hidden; display: grid; grid-template-columns: 68px 1fr; }
.rail { background: #171512; display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px 0; }
.rail span { width: 42px; height: 42px; border-radius: 12px; display: grid; place-items: center; color: #a39b90; }
.rail .on { background: rgb(255 255 255 / .1); color: #fff; }
.logo { width: 40px; height: 40px; border-radius: 12px; display: grid; place-items: center; background: #f7f3ec; color: #171512; font: 700 20px Georgia, serif; }
.main { padding: 20px 26px; overflow: hidden; }
.h2 { font-size: 15px; font-weight: 800; }
.kpi { padding: 14px 18px; }
.kpi .l { color: var(--muted); font-size: 12.5px; font-weight: 600; }
.kpi .v { font-size: 25px; font-weight: 800; letter-spacing: -.02em; margin: 4px 0 2px; font-variant-numeric: tabular-nums; }
.good { color: var(--green); font-weight: 700; font-size: 12.5px; }
.filter { display: inline-flex; align-items: center; gap: 6px; height: 34px; padding: 0 12px; border-radius: 9px; border: 1px solid var(--line); background: #fff; font-weight: 600; }
.axis { font-size: 11px; fill: #8a8384; font-family: -apple-system, sans-serif; }
.lbl { font-size: 11.5px; font-weight: 700; font-family: -apple-system, sans-serif; fill: #171512; }
td, th { padding-top: 11px; padding-bottom: 11px; }
`;

// % de pedidos online devueltos por la talla, por semana. El recomendador se activa en la S36.
const weeks = Array.from({ length: 13 }, (_, i) => 28 + i);
const rate = [16.4, 16.1, 16.6, 16.3, 16.0, 16.5, 16.2, 16.4, 15.1, 13.6, 12.7, 12.1, 11.8];
const W = 820, H = 300, L = 40, R = 16, T = 18, B = 26;
const x = (i) => L + (i * (W - L - R)) / (weeks.length - 1);
const y = (v) => T + ((18 - v) * (H - T - B)) / (18 - 10);
const chart = `
<svg width="100%" viewBox="0 0 ${W} ${H}">
  ${[10, 12, 14, 16, 18].map((v) => `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" stroke="#efeae2"/><text x="${L - 8}" y="${y(v) + 4}" class="axis" text-anchor="end">${v} %</text>`).join('')}
  ${weeks.map((w, i) => (i % 2 === 0 ? `<text x="${x(i)}" y="${H - 6}" class="axis" text-anchor="middle">S${w}</text>` : '')).join('')}
  <line x1="${x(8)}" x2="${x(8)}" y1="${T}" y2="${H - B}" stroke="#171512" stroke-dasharray="4 4" opacity=".45"/>
  <text x="${x(8) + 8}" y="${T + 12}" class="lbl">Talla recomendada activada</text>
  <path d="${rate.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ')}" fill="none" stroke="#b5562f" stroke-width="2.6" stroke-linejoin="round"/>
  <circle cx="${x(12)}" cy="${y(11.8)}" r="4.5" fill="#b5562f" stroke="#fff" stroke-width="2"/>
  <text x="${x(12) - 8}" y="${y(11.8) - 12}" class="lbl" text-anchor="end">11,8 %</text>
  <circle cx="${x(7)}" cy="${y(16.4)}" r="4.5" fill="#b5562f" stroke="#fff" stroke-width="2"/>
  <text x="${x(7) - 8}" y="${y(16.4) - 12}" class="lbl" text-anchor="end">16,4 %</text>
</svg>`;

const garments = [
  ['Camisa de lino · arena', '31 %', 'De S a M', 'amber', 'Talla pequeño', 'green', 'Aviso publicado'],
  ['Pantalón recto · negro', '24 %', 'De 40 a 38', 'blue', 'Talla grande', 'green', 'Aviso publicado'],
  ['Vestido midi de lino · teja', '19 %', 'De M a L', 'amber', 'Estrecho de cadera', 'amber', 'Revisar con proveedor'],
  ['Sobrecamisa de algodón · salvia', '6 %', '—', 'grey', 'Talla bien', 'grey', 'Sin aviso'],
];

const panel = page(
  'Tallas y devoluciones',
  css,
  `
<div class="rail"><div class="logo">V</div><div style="height:12px"></div>
  ${['bar-chart-3', 'layers', 'repeat', 'users', 'sparkles'].map((i, k) => `<span class="${k === 2 ? 'on' : ''}">${ic(i, 21)}</span>`).join('')}
</div>
<div class="main">
  <div class="row" style="justify-content:space-between">
    <div><h1 style="font-size:22px;letter-spacing:-.02em">Tallas y devoluciones</h1><p class="muted">Venta online · actualizado hoy a las 07:00</p></div>
    <div class="row" style="gap:8px"><span class="filter">${ic('calendar-clock', 15)}Septiembre 2026</span><span class="filter">Mujer y hombre</span><span class="btn ghost" style="height:34px">${ic('file-text', 15)}Exportar</span></div>
  </div>

  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:16px">
    <div class="card kpi"><p class="l">Devueltos por la talla</p><p class="v">11,8 %</p><p class="good">▼ 4,6 puntos desde la semana 36</p></div>
    <div class="card kpi"><p class="l">Pedidos con talla recomendada</p><p class="v">63 %</p><p class="muted" style="font-size:12.5px">de los pedidos online</p></div>
    <div class="card kpi"><p class="l">Cambios de talla evitados</p><p class="v">3.240</p><p class="muted" style="font-size:12.5px">estimados en septiembre</p></div>
    <div class="card kpi"><p class="l">Prendas con aviso de talla</p><p class="v">27</p><p class="muted" style="font-size:12.5px">en la web y en la app</p></div>
  </div>

  <div style="display:grid;grid-template-columns:1.62fr 1fr;gap:14px;margin-top:14px">
    <div class="card" style="padding:16px 18px 8px">
      <p class="h2">Pedidos devueltos por la talla</p><p class="muted" style="font-size:12.5px">Porcentaje semanal de pedidos online</p>
      ${chart}
    </div>
    <div class="card" style="padding:16px 18px">
      <div class="row" style="justify-content:space-between;margin-bottom:10px"><p class="h2">Propuesta del asistente</p><span class="chip red">${ic('sparkles', 12)}Nueva</span></div>
      <p style="line-height:1.5">La <b>camisa de lino</b> talla pequeño en S y M en los tres colores: el 38 % de quienes usan S la devuelven y se quedan con la M.</p>
      <div style="margin-top:12px;padding:12px 14px;border-radius:12px;background:var(--bg);display:grid;gap:8px;font-size:13.5px">
        <div class="row" style="gap:8px">${ic('check', 15)}El aviso «talla pequeño» ya está en la ficha</div>
        <div class="row" style="gap:8px">${ic('check', 15)}La talla recomendada sube una talla</div>
        <div class="row" style="gap:8px;color:var(--red);font-weight:700">${ic('arrow-right', 15)}Pedir al proveedor ajustar el patrón</div>
      </div>
      <div class="row" style="margin-top:14px;gap:8px"><span class="btn">${ic('send', 15)}Preparar correo</span><span class="btn ghost">Ver prenda</span></div>
    </div>
  </div>

  <div class="card" style="margin-top:14px;overflow:hidden">
    <div class="row" style="justify-content:space-between;padding:14px 18px 4px"><p class="h2">Prendas que no tallan como su talla</p><span class="muted" style="font-size:12px">Ordenadas por devoluciones</span></div>
    <table>
      <tr><th style="padding-left:18px">Prenda</th><th class="num">Devueltas por la talla</th><th>Cambio más habitual</th><th>Cómo talla</th><th>Estado</th></tr>
      ${garments
        .map(
          ([n, r, c, k1, t, k2, s]) => `<tr><td style="padding-left:18px;font-weight:700">${n}</td><td class="num"><b>${r}</b></td><td>${c}</td><td><span class="chip ${k1}">${t}</span></td><td><span class="chip ${k2}">${s}</span></td></tr>`,
        )
        .join('')}
    </table>
  </div>
</div>`,
);

buildDesktop('tallas', { '1-devoluciones': panel });
