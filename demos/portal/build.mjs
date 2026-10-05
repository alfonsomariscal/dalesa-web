// Demo: portal web de clientes de Montera (distribuidora ficticia).
//   /opt/homebrew/bin/node demos/portal/build.mjs
import { art, buildDesktop, ic, logo, page, thumb } from '../lib.mjs';

const css = `
body { width: 1440px; height: 900px; overflow: hidden; }
.top { height: 64px; background: #fff; border-bottom: 1px solid var(--line); display: flex; align-items: center; gap: 28px; padding: 0 32px; }
.brand { display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 17px; }
.brand small { display: block; font-size: 11.5px; font-weight: 600; color: var(--muted); }
.menu { display: flex; gap: 4px; }
.menu span { padding: 8px 14px; border-radius: 10px; font-weight: 600; color: var(--muted); }
.menu .on { color: var(--red); background: var(--red-soft); }
.search { flex: 1; max-width: 340px; margin-left: auto; height: 38px; border-radius: 10px; background: var(--bg); display: flex; align-items: center; gap: 8px; padding: 0 12px; color: #9b9596; }
.iconbtn { position: relative; width: 38px; height: 38px; border-radius: 10px; display: grid; place-items: center; border: 1px solid var(--line); background: #fff; }
.badge { position: absolute; top: -6px; right: -6px; min-width: 18px; height: 18px; border-radius: 9px; background: var(--red); color: #fff; font-size: 11px; font-weight: 800; display: grid; place-items: center; padding: 0 4px; }
.user { display: flex; align-items: center; gap: 10px; font-weight: 700; }
.av { width: 36px; height: 36px; border-radius: 50%; display: grid; place-items: center; color: #fff; font-weight: 800; background: linear-gradient(135deg, var(--red), var(--red-dark)); }
.wrap { padding: 26px 32px; }
h1 { font-size: 26px; letter-spacing: -.02em; }
.kpi { padding: 18px 20px; }
.kpi p.l { color: var(--muted); font-size: 13px; font-weight: 600; display: flex; align-items: center; gap: 6px; }
.kpi p.v { font-size: 26px; font-weight: 800; letter-spacing: -.02em; margin: 6px 0 2px; }
.h2 { font-size: 16px; font-weight: 800; }
.step { display: grid; grid-template-columns: 34px 1fr; gap: 12px; position: relative; padding-bottom: 18px; }
.step::before { content: ""; position: absolute; left: 16px; top: 34px; bottom: 0; width: 2px; background: var(--line); }
.step:last-child::before { display: none; }
.step.done::before { background: var(--green); }
.dot { width: 34px; height: 34px; border-radius: 50%; display: grid; place-items: center; background: #f2eeed; color: #9b9596; z-index: 1; }
.step.done .dot { background: var(--green); color: #fff; }
.step.now .dot { background: var(--red); color: #fff; box-shadow: 0 0 0 6px var(--red-soft); }
`;

const top = (on) => `
<div class="top">
  <div class="brand">${logo(36)}<div>Montera<small>Portal de clientes</small></div></div>
  <div class="menu">${['Inicio', 'Catálogo', 'Pedidos', 'Facturas', 'Mi cuenta'].map((m, i) => `<span class="${i === on ? 'on' : ''}">${m}</span>`).join('')}</div>
  <div class="search">${ic('search', 17)}Buscar productos, pedidos o facturas</div>
  <div class="iconbtn">${ic('shopping-cart', 18)}${on === 1 ? '<span class="badge">4</span>' : ''}</div>
  <div class="user"><div class="av">TR</div><div>La Tasca de Rosa<p class="muted" style="font-size:12px;font-weight:500">Cliente 300418</p></div></div>
</div>`;

// 1 · Inicio ------------------------------------------------------------------
const inicio = page(
  'Portal de clientes · Inicio',
  css,
  `${top(0)}
<div class="wrap">
  <div class="row" style="justify-content:space-between;align-items:flex-end">
    <div><p class="muted" style="font-weight:600">Jueves, 8 de octubre</p><h1>Hola, Rosa. Tu pedido llega hoy entre las 10:00 y las 11:00</h1></div>
    <div class="row"><span class="btn ghost">${ic('file-text', 17)}Descargar albaranes</span><span class="btn">${ic('repeat', 17)}Repetir último pedido</span></div>
  </div>

  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:20px">
    <div class="card kpi"><p class="l">${ic('truck', 15)}Pedido en curso</p><p class="v">613,03 €</p><span class="chip red">En reparto · llega 10:30</span></div>
    <div class="card kpi"><p class="l">${ic('file-text', 15)}Pendiente de pago</p><p class="v" style="color:var(--amber)">212,40 €</p><p class="muted" style="font-size:12.5px">1 factura · vence el 15 de octubre</p></div>
    <div class="card kpi"><p class="l">${ic('bar-chart-3', 15)}Compras de octubre</p><p class="v">1.284,60 €</p><p style="font-size:12.5px;color:var(--green);font-weight:700">+8 % respecto a septiembre</p></div>
    <div class="card kpi"><p class="l">${ic('badge-check', 15)}Ahorro en promociones</p><p class="v">96,20 €</p><p class="muted" style="font-size:12.5px">en lo que va de año</p></div>
  </div>

  <div style="display:grid;grid-template-columns:1.05fr 1fr 1fr;gap:16px;margin-top:16px">
    <div class="card" style="padding:20px">
      <div class="row" style="justify-content:space-between;margin-bottom:16px"><p class="h2">Seguimiento del pedido</p><span class="muted" style="font-size:12.5px">PV-2026-08812</span></div>
      ${[
        ['check', 'Pedido recibido', 'Miércoles 7, 18:42 · 6 productos', 'done'],
        ['check', 'Preparado en almacén', 'Jueves 8, 06:15 · Almacén Cáceres', 'done'],
        ['truck', 'En reparto', 'Javier M. · eres la siguiente parada', 'now'],
        ['circle-check', 'Entregado', 'Previsto entre 10:00 y 11:00', ''],
      ]
        .map(([i, t, d, st]) => `<div class="step ${st}"><div class="dot">${ic(i, 17, 2.4)}</div><div><p style="font-weight:700">${t}</p><p class="muted" style="font-size:12.5px">${d}</p></div></div>`)
        .join('')}
    </div>

    <div class="card" style="padding:20px">
      <div class="row" style="justify-content:space-between;margin-bottom:6px"><p class="h2">Tus habituales</p><span class="chip red">${ic('sparkles', 12)}Sugerido para ti</span></div>
      <p class="muted" style="font-size:12.5px;margin-bottom:8px">Según lo que pides normalmente, te quedarás sin estos productos esta semana.</p>
      ${[
        ['jamon', 'Jamón de cebo 50 %', '24,90 €/kg', 'Cada 2 semanas'],
        ['chorizo', 'Chorizo ibérico de vela', '3,95 €/ud.', 'Agotado en sept.'],
        ['loncheado', 'Loncheado de jamón 100 g', '4,20 €/ud.', 'Semanal'],
      ]
        .map(
          ([k, n, p, f], i) => `<div class="row" style="padding:10px 0;${i ? 'border-top:1px solid var(--line)' : ''}">${thumb(k, 44)}<div style="flex:1"><p style="font-weight:700">${n}</p><p class="muted" style="font-size:12.5px">${p} · ${f}</p></div><span class="btn light" style="height:32px;padding:0 12px">${ic('shopping-cart', 15)}Añadir</span></div>`,
        )
        .join('')}
    </div>

    <div class="card" style="padding:20px">
      <div class="row" style="justify-content:space-between;margin-bottom:12px"><p class="h2">Facturas</p><span style="color:var(--red);font-weight:700;font-size:13px">Ver todas</span></div>
      ${[
        ['F-2026-04417', '24 sep', '486,20 €', 'amber', 'Pendiente'],
        ['F-2026-04102', '10 sep', '512,75 €', 'green', 'Pagada'],
        ['F-2026-03866', '27 ago', '398,40 €', 'green', 'Pagada'],
        ['F-2026-03591', '13 ago', '455,10 €', 'green', 'Pagada'],
      ]
        .map(
          ([n, d, a, c, s], i) => `<div class="row" style="padding:10px 0;${i ? 'border-top:1px solid var(--line)' : ''}"><div style="width:34px;height:34px;border-radius:9px;display:grid;place-items:center;background:var(--bg);color:var(--muted)">${ic('file-text', 17)}</div><div style="flex:1"><p style="font-weight:700">${n}</p><p class="muted" style="font-size:12.5px">${d}</p></div><b class="num">${a}</b><span class="chip ${c}" style="width:82px;justify-content:center">${s}</span></div>`,
        )
        .join('')}
      <span class="btn" style="width:100%;margin-top:10px">Pagar 212,40 €</span>
    </div>
  </div>

  <div class="card" style="margin-top:16px;overflow:hidden">
    <div class="row" style="justify-content:space-between;padding:16px 20px 6px"><p class="h2">Últimos pedidos</p><span style="color:var(--red);font-weight:700;font-size:13px">Ver todos</span></div>
    <table>
      <tr><th>Pedido</th><th>Fecha</th><th>Productos</th><th>Entregado por</th><th class="num">Importe</th><th>Estado</th><th></th></tr>
      ${[
        ['PV-2026-08812', '7 oct', 'Jamón de cebo, paleta, lomo y 3 más', 'Javier M.', '613,03 €', 'red', 'En reparto'],
        ['PV-2026-08455', '24 sep', 'Jamón de cebo, queso curado y 5 más', 'Javier M.', '534,82 €', 'green', 'Entregado'],
        ['PV-2026-08102', '10 sep', 'Loncheados, chorizo de vela y 4 más', 'Ana P.', '564,03 €', 'green', 'Entregado'],
      ]
        .map(
          ([n, d, pr, w, a, c, st]) => `<tr><td><b>${n}</b></td><td class="muted">${d}</td><td>${pr}</td><td class="muted">${w}</td><td class="num"><b>${a}</b></td><td><span class="chip ${c}">${st}</span></td><td class="num" style="color:var(--red);font-weight:700">${ic('repeat', 15)} Repetir</td></tr>`,
        )
        .join('')}
    </table>
  </div>
</div>`,
);

// 2 · Catálogo ------------------------------------------------------------------
const catalog = [
  ['jamon', 'Jamón de cebo ibérico 50 %', 'Pieza 8 kg aprox.', '24,90 €/kg', 'Más vendido', 1],
  ['paleta', 'Paleta de cebo ibérica 50 %', 'Pieza 5 kg aprox.', '21,50 €/kg', '', 1],
  ['lomo', 'Lomo de cebo ibérico', 'Pieza 1 kg', '32,00 €/kg', '', 0],
  ['chorizo', 'Chorizo ibérico de vela', 'Unidad 250 g', '3,95 €/ud.', 'Oferta −10 %', 12],
  ['queso', 'Queso curado de oveja', 'Pieza 3 kg', '18,40 €/kg', '', 0],
  ['loncheado', 'Loncheado de jamón de cebo', 'Sobre 100 g', '4,20 €/ud.', '', 20],
  ['jamon', 'Jamón de bellota ibérico 50 %', 'Pieza 8 kg aprox.', '39,50 €/kg', 'Novedad', 0],
  ['queso', 'Queso semicurado de mezcla', 'Pieza 3 kg', '13,90 €/kg', '', 0],
];
const catalogo = page(
  'Portal de clientes · Catálogo',
  css,
  `${top(1)}
<div style="display:grid;grid-template-columns:230px 1fr 340px;height:836px">
  <div style="padding:24px 22px;border-right:1px solid var(--line);background:#fff">
    <p class="h2" style="margin-bottom:12px">Categorías</p>
    ${[['Todo', 128], ['Jamones y paletas', 24], ['Embutidos', 31], ['Loncheados', 18], ['Quesos', 22], ['Conservas', 33]]
      .map(([c, n], i) => `<div class="row" style="justify-content:space-between;padding:9px 10px;border-radius:9px;margin-bottom:2px;${i === 0 ? 'background:var(--red-soft);color:var(--red);font-weight:700' : 'font-weight:600'}"><span>${c}</span><span class="muted" style="font-size:12px">${n}</span></div>`)
      .join('')}
    <p class="h2" style="margin:22px 0 12px">Filtrar</p>
    ${['En oferta', 'Novedades', 'Formato hostelería', 'Lo que ya he pedido']
      .map((f, i) => `<div class="row" style="padding:7px 0;font-weight:600"><span style="width:18px;height:18px;border-radius:5px;display:grid;place-items:center;${i === 3 ? 'background:var(--red);color:#fff' : 'border:1.5px solid #cfc8c6'}">${i === 3 ? ic('check', 13, 3) : ''}</span>${f}</div>`)
      .join('')}
  </div>
  <div style="padding:24px 26px;overflow:hidden">
    <div class="row" style="justify-content:space-between;margin-bottom:16px">
      <div><h1 style="font-size:22px">Catálogo</h1><p class="muted">Precios de tu tarifa · IVA no incluido</p></div>
      <div class="chip green" style="font-size:13px;padding:7px 12px">${ic('truck', 15)}Pide antes de las 20:00 y lo recibes mañana</div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px">
      ${catalog
        .map(
          ([k, n, f, p, tag, q]) => `<div class="card" style="padding:14px;position:relative">
        ${tag ? `<span class="chip ${tag.startsWith('Oferta') ? 'red' : tag === 'Novedad' ? 'blue' : 'amber'}" style="position:absolute;top:12px;left:12px">${tag}</span>` : ''}
        <div style="height:118px;border-radius:12px;display:grid;place-items:center;background:linear-gradient(135deg,#fbf6f1,#f2e9df)"><svg width="92" height="92" viewBox="0 0 48 48">${art[k]}</svg></div>
        <p style="font-weight:700;margin-top:10px;line-height:1.3;height:36px">${n}</p>
        <p class="muted" style="font-size:12.5px">${f}</p>
        <div class="row" style="justify-content:space-between;margin-top:10px;gap:6px"><b style="font-size:15px;white-space:nowrap">${p}</b>${
          q
            ? `<span class="row" style="gap:0;height:32px;border-radius:9px;background:var(--red-soft);color:var(--red);font-weight:800"><span style="width:24px;text-align:center">−</span><span style="min-width:20px;text-align:center;color:var(--text)">${q}</span><span style="width:24px;text-align:center">+</span></span>`
            : `<span class="btn light" style="height:32px;padding:0 10px">Añadir</span>`
        }</div>
      </div>`,
        )
        .join('')}
    </div>
  </div>
  <div style="padding:24px 22px;border-left:1px solid var(--line);background:#fff;display:flex;flex-direction:column">
    <p class="h2">Tu pedido</p><p class="muted" style="font-size:12.5px;margin-bottom:10px">Entrega: viernes 9 de octubre</p>
    ${[
      ['jamon', 'Jamón de cebo 50 %', '1 × 8 kg', '199,20 €'],
      ['paleta', 'Paleta de cebo 50 %', '1 × 5 kg', '107,50 €'],
      ['chorizo', 'Chorizo de vela', '12 uds.', '42,66 €'],
      ['loncheado', 'Loncheado de jamón', '20 uds.', '84,00 €'],
    ]
      .map(([k, n, q, p], i) => `<div class="row" style="padding:10px 0;${i ? 'border-top:1px solid var(--line)' : ''}">${thumb(k, 40)}<div style="flex:1"><p style="font-weight:700;font-size:13.5px">${n}</p><p class="muted" style="font-size:12px">${q}</p></div><b class="num">${p}</b></div>`)
      .join('')}
    <div style="margin-top:18px;padding:14px;border-radius:12px;background:var(--green-soft);color:var(--green)">
      <p class="row" style="font-weight:700;gap:6px">${ic('circle-check', 16)}Pedido mínimo alcanzado</p>
      <div style="height:6px;border-radius:3px;background:#cdebd8;margin:10px 0 6px"><div style="width:100%;height:100%;border-radius:3px;background:var(--green)"></div></div>
      <p style="font-size:12.5px">Envío gratis desde 300 € · llevas 433,36 €</p>
    </div>
    <div style="margin-top:auto;border-top:1px solid var(--line);padding-top:14px;display:grid;gap:6px">
      <div class="row" style="justify-content:space-between"><span class="muted">Subtotal</span><span class="num">433,36 €</span></div>
      <div class="row" style="justify-content:space-between"><span class="muted">Promoción chorizo −10 %</span><span class="num" style="color:var(--green)">incluida</span></div>
      <div class="row" style="justify-content:space-between"><span class="muted">IVA (10 %)</span><span class="num">43,34 €</span></div>
      <div class="row" style="justify-content:space-between;font-size:18px;font-weight:800;margin-top:4px"><span>Total</span><span class="num">476,70 €</span></div>
      <span class="btn" style="width:100%;height:46px;margin-top:10px;font-size:15px">Tramitar pedido ${ic('arrow-right', 17)}</span>
    </div>
  </div>
</div>`,
);

buildDesktop('portal', { '1-inicio': inicio, '2-catalogo': catalogo });
