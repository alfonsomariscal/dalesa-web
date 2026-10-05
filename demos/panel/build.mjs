// Demo: panel de ventas y previsión de demanda con IA de Montera (distribuidora ficticia).
//   /opt/homebrew/bin/node demos/panel/build.mjs
import { buildDesktop, ic, logo, page } from '../lib.mjs';

const css = `
body { width: 1440px; height: 900px; overflow: hidden; display: grid; grid-template-columns: 68px 1fr; }
.rail { background: #1c1b1f; display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px 0; }
.rail span { width: 42px; height: 42px; border-radius: 12px; display: grid; place-items: center; color: #9b9596; }
.rail .on { background: rgb(255 255 255 / .1); color: #fff; }
.main { padding: 20px 26px; overflow: hidden; }
.h2 { font-size: 15px; font-weight: 800; }
.kpi { padding: 14px 18px; }
.kpi .l { color: var(--muted); font-size: 12.5px; font-weight: 600; }
.kpi .v { font-size: 25px; font-weight: 800; letter-spacing: -.02em; margin: 4px 0 2px; font-variant-numeric: tabular-nums; }
.up { color: var(--green); font-weight: 700; font-size: 12.5px; }
.filter { display: inline-flex; align-items: center; gap: 6px; height: 34px; padding: 0 12px; border-radius: 9px; border: 1px solid var(--line); background: #fff; font-weight: 600; }
.axis { font-size: 11px; fill: #8a8384; font-family: -apple-system, sans-serif; }
.lbl { font-size: 11.5px; font-weight: 700; font-family: -apple-system, sans-serif; fill: #1c1b1f; }
`;

// Ventas semanales en miles de euros: reales (S30–S40), previsión (S41–S44) y año anterior (S30–S44).
const weeks = Array.from({ length: 15 }, (_, i) => 30 + i);
const real = [88.4, 86.1, 84.9, 90.3, 92.8, 95.1, 93.7, 97.4, 99.2, 101.6, 98.8];
const fcst = [98.8, 103.5, 118.2, 104.1, 106.8]; // empieza en el último real (S40)
const last = [84.0, 83.2, 81.5, 85.7, 88.1, 90.2, 89.0, 91.8, 93.5, 95.0, 94.1, 97.0, 108.9, 96.5, 99.0];

const W = 820, H = 340, L = 40, R = 16, T = 14, B = 26;
const x = (i) => L + (i * (W - L - R)) / (weeks.length - 1);
const y = (v) => T + ((125 - v) * (H - T - B)) / (125 - 75);
const path = (arr, off = 0) => arr.map((v, i) => `${i ? 'L' : 'M'}${x(i + off).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');
const band = (() => {
  const up = fcst.map((v, i) => [x(i + 10), y(v * (1 + 0.012 * i))]);
  const dn = fcst.map((v, i) => [x(i + 10), y(v * (1 - 0.012 * i))]).reverse();
  return `M${[...up, ...dn].map(([a, b]) => `${a.toFixed(1)} ${b.toFixed(1)}`).join(' L')} Z`;
})();
const lineChart = `
<svg width="100%" viewBox="0 0 ${W} ${H}">
  ${[80, 90, 100, 110, 120].map((v) => `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" stroke="#efebea"/><text x="${L - 8}" y="${y(v) + 4}" class="axis" text-anchor="end">${v}</text>`).join('')}
  ${weeks.map((w, i) => (i % 2 === 0 ? `<text x="${x(i)}" y="${H - 6}" class="axis" text-anchor="middle">S${w}</text>` : '')).join('')}
  <rect x="${x(10)}" y="${T}" width="${x(14) - x(10)}" height="${H - T - B}" fill="#fbf7f6"/>
  <text x="${x(10) + 6}" y="${H - B - 8}" class="axis" style="font-weight:700">Previsión</text>
  <path d="${band}" fill="#c8102e" opacity=".12"/>
  <path d="${path(last)}" fill="none" stroke="#b8b1b0" stroke-width="2"/>
  <path d="${path(real)}" fill="none" stroke="#c8102e" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="${path(fcst, 10)}" fill="none" stroke="#c8102e" stroke-width="2.4" stroke-dasharray="5 5"/>
  <circle cx="${x(10)}" cy="${y(98.8)}" r="4.5" fill="#c8102e" stroke="#fff" stroke-width="2"/>
  <circle cx="${x(12)}" cy="${y(118.2)}" r="4.5" fill="#c8102e" stroke="#fff" stroke-width="2"/>
  <text x="${x(12) - 10}" y="${y(118.2) + 4}" class="lbl" text-anchor="end">118,2 k€ · puente del Pilar</text>
  <text x="${x(14) - 2}" y="${y(92)}" class="axis" text-anchor="end">Año anterior</text>
</svg>`;

const families = [
  ['Jamones y paletas', 168400, '40,8 %'],
  ['Embutidos', 92150, '22,3 %'],
  ['Loncheados', 71900, '17,4 %'],
  ['Quesos', 48230, '11,7 %'],
  ['Conservas', 31700, '7,7 %'],
];
const eur = (n) => n.toLocaleString('es-ES') + ' €';

const panel = page(
  'Panel de ventas',
  css,
  `
<div class="rail">${logo(40)}<div style="height:12px"></div>
  ${['bar-chart-3', 'truck', 'users', 'file-text', 'sparkles'].map((i, k) => `<span class="${k === 0 ? 'on' : ''}">${ic(i, 21)}</span>`).join('')}
</div>
<div class="main">
  <div class="row" style="justify-content:space-between">
    <div><h1 style="font-size:22px;letter-spacing:-.02em">Ventas y previsión de demanda</h1><p class="muted">Actualizado hoy a las 07:00 con datos de SAP</p></div>
    <div class="row" style="gap:8px">
      <span class="filter">${ic('calendar-clock', 15)}Septiembre 2026</span><span class="filter">Zona: todas</span><span class="filter">Canal: hostelería y tiendas</span>
      <span class="btn ghost" style="height:34px">${ic('file-text', 15)}Exportar</span>
    </div>
  </div>

  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:16px">
    <div class="card kpi"><p class="l">Ventas de septiembre</p><p class="v">412.380 €</p><p class="up">▲ 6,4 % frente a 2025</p></div>
    <div class="card kpi"><p class="l">Margen bruto</p><p class="v">28,1 %</p><p class="up">▲ 0,8 puntos</p></div>
    <div class="card kpi"><p class="l">Pedidos servidos</p><p class="v">1.846</p><p class="muted" style="font-size:12.5px">223 € de pedido medio</p></div>
    <div class="card kpi"><p class="l">Entregas a tiempo</p><p class="v">96,6 %</p><p class="up">▲ 1,1 puntos</p></div>
  </div>

  <div style="display:grid;grid-template-columns:1.62fr 1fr;gap:14px;margin-top:14px">
    <div class="card" style="padding:16px 18px 10px">
      <div class="row" style="justify-content:space-between">
        <div><p class="h2">Ventas semanales y previsión</p><p class="muted" style="font-size:12.5px">Miles de euros · previsión calculada por IA con histórico, festivos y pedidos abiertos</p></div>
        <div class="row" style="gap:14px;font-size:12px;font-weight:600;white-space:nowrap">
          <span class="row" style="gap:6px"><i style="width:16px;height:2.5px;background:#c8102e;display:inline-block"></i>Real</span>
          <span class="row" style="gap:6px"><i style="width:16px;border-top:2.5px dashed #c8102e;display:inline-block"></i>Previsión</span>
          <span class="row" style="gap:6px"><i style="width:16px;height:2.5px;background:#b8b1b0;display:inline-block"></i>Año anterior</span>
        </div>
      </div>
      ${lineChart}
    </div>

    <div class="card" style="padding:16px 18px">
      <div class="row" style="justify-content:space-between;margin-bottom:6px"><p class="h2">Avisos del asistente</p><span class="chip red">${ic('sparkles', 12)}3 nuevos</span></div>
      ${[
        ['amber', 'zap', 'Falta de stock', 'Chorizo ibérico de vela: quedan existencias para 4 días y la previsión sube un 22 % por el puente.', 'Pedir 900 ud. a Embutidos Sierra de Gata'],
        ['red', 'hourglass', 'Caducidad próxima', '38 sobres de loncheado de jamón caducan en 9 días.', 'Promoción −15 % a 24 clientes que lo compran'],
        ['blue', 'users', 'Cliente en riesgo', 'Restaurante El Olivar ha pedido un 35 % menos en las últimas 6 semanas.', 'Añadir visita a la ruta de Javier M.'],
      ]
        .map(
          ([c, i, t, d, a], k) => `<div style="padding:11px 0;${k ? 'border-top:1px solid var(--line)' : ''}">
        <div class="row" style="gap:8px"><span class="chip ${c}">${ic(i, 12)}${t}</span></div>
        <p style="margin:6px 0 6px;line-height:1.4;font-size:13px">${d}</p>
        <p style="color:var(--red);font-weight:700;font-size:12.5px" class="row">${ic('arrow-right', 14)}${a}</p>
      </div>`,
        )
        .join('')}
    </div>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:14px">
    <div class="card" style="padding:16px 18px">
      <div class="row" style="justify-content:space-between;margin-bottom:10px"><p class="h2">Ventas por familia · septiembre</p><span class="muted" style="font-size:12px">Total 412.380 €</span></div>
      ${families
        .map(
          ([f, v, p]) => `<div style="display:grid;grid-template-columns:130px 1fr 150px;align-items:center;gap:12px;padding:12px 0">
        <span style="font-weight:600">${f}</span>
        <div style="height:14px;background:#f5f1f0;border-radius:4px"><div style="height:100%;width:${((v / 168400) * 100).toFixed(1)}%;background:#c8102e;border-radius:0 4px 4px 0"></div></div>
        <span class="num" style="font-weight:700">${eur(v)} <span class="muted" style="font-weight:500">· ${p}</span></span>
      </div>`,
        )
        .join('')}
    </div>
    <div class="card" style="padding:12px 0 0;overflow:hidden">
      <div class="row" style="justify-content:space-between;padding:4px 18px 4px"><p class="h2">Rutas de reparto</p><span class="muted" style="font-size:12px">Septiembre</span></div>
      <table>
        <tr><th>Ruta</th><th class="num">Entregas</th><th>A tiempo</th><th class="num">Km/día</th></tr>
        ${[
          ['Cáceres centro', 412, 98.9, 54],
          ['Cáceres norte', 386, 97.8, 71],
          ['Plasencia', 344, 96.4, 118],
          ['Trujillo', 297, 95.1, 132],
          ['Navalmoral de la Mata', 188, 96.0, 104],
          ['Mérida', 241, 93.2, 96],
        ]
          .map(
            ([r, e, p, k]) => `<tr><td style="font-weight:600;padding:8px 14px 8px 18px">${r}</td><td class="num" style="padding:8px 14px">${e}</td><td style="padding:8px 14px"><div class="row" style="gap:8px"><div style="flex:1;height:8px;border-radius:4px;background:#f5f1f0"><div style="height:100%;width:${(p - 90) * 10}%;border-radius:4px;background:#c8102e"></div></div><b class="num" style="width:58px;white-space:nowrap">${p.toLocaleString('es-ES', { minimumFractionDigits: 1 })} %</b></div></td><td class="num" style="padding:8px 18px 8px 14px">${k}</td></tr>`,
          )
          .join('')}
      </table>
    </div>
  </div>
</div>`,
);

buildDesktop('panel', { '1-ventas': panel });
