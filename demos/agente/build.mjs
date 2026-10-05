// Demo: agente de IA de Montera (distribuidora ficticia) que revisa facturas de proveedores
// contra el pedido de compra y el albarán en SAP.
//   /opt/homebrew/bin/node demos/agente/build.mjs
import { buildDesktop, ic, logo, page } from '../lib.mjs';

const css = `
body { width: 1440px; height: 900px; overflow: hidden; display: grid; grid-template-columns: 68px 300px 1fr 470px; }
.rail { background: #1c1b1f; display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px 0; }
.rail span { width: 42px; height: 42px; border-radius: 12px; display: grid; place-items: center; color: #9b9596; }
.rail .on { background: rgb(255 255 255 / .1); color: #fff; }
.col { border-right: 1px solid var(--line); background: #fff; overflow: hidden; }
.h { padding: 18px 18px 12px; }
.h2 { font-size: 16px; font-weight: 800; }
.inv { padding: 12px 18px; border-top: 1px solid var(--line); }
.inv.on { background: var(--red-soft); box-shadow: inset 3px 0 0 var(--red); }
.paper { background: #fff; border-radius: 6px; box-shadow: 0 2px 6px rgb(0 0 0 / .06), 0 18px 40px -18px rgb(0 0 0 / .25); padding: 28px 30px; font-size: 11.5px; color: #333; position: relative; }
.paper table th { font-size: 10.5px; padding: 6px 6px; color: #666; border-bottom: 1.5px solid #333; }
.paper table td { padding: 7px 6px; border-bottom: 1px solid #eee; }
.hl { position: relative; outline: 2px solid var(--red); outline-offset: 4px; border-radius: 3px; background: rgb(200 16 46 / .05); }
.hl::after { content: attr(data-tag); position: absolute; top: -17px; right: -6px; font-size: 9.5px; font-weight: 800; color: #fff; background: var(--red); border-radius: 5px; padding: 1px 6px; white-space: nowrap; }
.hl.warn { outline-color: #e07b00; background: rgb(224 123 0 / .1); } .hl.warn::after { background: #e07b00; }
tr.hl { outline-offset: 0; } tr.hl::after { display: none; }
.inl { display: inline-block; margin-left: 8px; font-size: 9.5px; font-weight: 800; color: #fff; background: #e07b00; border-radius: 5px; padding: 1px 6px; vertical-align: 1px; }
.field { display: grid; gap: 2px; padding: 9px 12px; border-radius: 10px; background: var(--bg); }
.field span { font-size: 11.5px; color: var(--muted); font-weight: 600; }
.field b { font-size: 14px; }
.check { display: flex; gap: 10px; align-items: flex-start; padding: 8px 0; }
.bubble { padding: 12px 14px; border-radius: 14px; line-height: 1.45; }
`;

const inbox = [
  ['Dehesa Los Arenales, S.L.', 'FAC-DLA-2026-1182', '13.833,60 €', 'amber', 'Requiere revisión', true],
  ['Quesería Valle del Jerte', 'A-2026-0961', '3.536,94 €', 'green', 'Lista para registrar'],
  ['Transportes Frío Ibérico', '2026/0457', '2.964,50 €', 'blue', 'Leyendo…'],
  ['Conservas Atlántico, S.A.', 'CA-26-10233', '6.492,31 €', 'grey', 'Registrada en SAP'],
  ['Envases y Embalajes del Sur', 'EES-1877', '1.535,37 €', 'grey', 'Registrada en SAP'],
  ['Aceites Tierra de Barros', 'ATB-26-0398', '4.818,00 €', 'grey', 'Registrada en SAP'],
  ['Embutidos Sierra de Gata', '26-FV-0712', '9.614,00 €', 'grey', 'Registrada en SAP'],
];

const lines = [
  ['Jamón de cebo ibérico 50 %', '320 kg', '15,90', '5.088,00', true],
  ['Paleta de cebo ibérica 50 %', '260 kg', '12,80', '3.328,00'],
  ['Lomo de cebo ibérico', '80 kg', '21,50', '1.720,00'],
  ['Chorizo ibérico de vela 250 g', '600 ud.', '2,40', '1.440,00'],
  ['Loncheado de jamón de cebo 100 g', '500 ud.', '2,00', '1.000,00'],
];

const agente = page(
  'Agente de facturas',
  css,
  `
<div class="rail">${logo(40)}<div style="height:12px"></div>
  ${['file-text', 'bot', 'users', 'bar-chart-3', 'shield-check'].map((i, k) => `<span class="${k === 0 ? 'on' : ''}">${ic(i, 21)}</span>`).join('')}
</div>

<div class="col">
  <div class="h"><p class="h2">Facturas de proveedores</p><p class="muted" style="font-size:12.5px">Recibidas en compras@montera</p></div>
  <div style="margin:0 18px 12px;padding:12px 14px;border-radius:12px;background:var(--green-soft);color:var(--green)">
    <p style="font-weight:800;font-size:15px">Hoy: 23 facturas</p>
    <p style="font-size:12.5px">19 registradas · 3 listas · 1 a revisar</p>
  </div>
  ${inbox
    .map(
      ([n, f, a, c, st, on]) => `<div class="inv ${on ? 'on' : ''}"><div class="row" style="justify-content:space-between"><b style="font-size:13.5px">${n}</b><b class="num" style="font-size:13px;white-space:nowrap">${a}</b></div>
    <div class="row" style="justify-content:space-between;margin-top:4px"><span class="muted" style="font-size:12px">${f}</span><span class="chip ${c}">${st}</span></div></div>`,
    )
    .join('')}
</div>

<div style="padding:22px 28px;overflow:hidden;background:#eeeae8">
  <div class="row" style="justify-content:space-between;margin-bottom:12px">
    <div class="row" style="gap:8px;font-weight:700">${ic('file-text', 18)}FAC-DLA-2026-1182.pdf<span class="muted" style="font-weight:500;font-size:12.5px">· recibida 08:12</span></div>
    <span class="muted" style="font-size:12.5px">Página 1 de 1</span>
  </div>
  <div class="paper">
    <div class="row" style="justify-content:space-between;align-items:flex-start">
      <div class="hl" data-tag="Proveedor"><p style="font-size:17px;font-weight:800;color:#5b3a1f">DEHESA LOS ARENALES, S.L.</p><p>Ctra. de Trujillo, km 4 · 10195 Cáceres</p><p>NIF B10482731</p></div>
      <div class="hl" data-tag="Nº y fecha" style="text-align:right"><p style="font-size:15px;font-weight:800">FACTURA</p><p>Nº FAC-DLA-2026-1182</p><p>Fecha: 07/10/2026</p></div>
    </div>
    <div style="margin:18px 0 14px;padding:10px 12px;background:#f7f5f3;border-radius:4px;display:flex;justify-content:space-between">
      <div><p style="color:#888;font-size:10px">CLIENTE</p><p style="font-weight:700">Montera Distribución Alimentaria, S.L.</p><p>Pol. Ind. Las Capellanías · Cáceres</p></div>
      <div class="hl" data-tag="Pedido" style="text-align:right"><p style="color:#888;font-size:10px">SU PEDIDO</p><p style="font-weight:700">4500012873</p><p>Albarán AL-5521</p></div>
    </div>
    <table>
      <tr><th>Concepto</th><th class="num">Cantidad</th><th class="num">Precio</th><th class="num">Importe</th></tr>
      ${lines.map(([c, q, p, t, w]) => `<tr${w ? ' class="hl warn"' : ''}><td>${c}${w ? '<span class="inl">Precio distinto</span>' : ''}</td><td class="num">${q}</td><td class="num">${p} €</td><td class="num">${t} €</td></tr>`).join('')}
    </table>
    <div class="hl" data-tag="Importes" style="display:grid;justify-content:end;margin:18px 0 0 auto;width:fit-content;gap:4px;text-align:right">
      <p>Base imponible <b style="display:inline-block;width:90px">12.576,00 €</b></p>
      <p>IVA 10 % <b style="display:inline-block;width:90px">1.257,60 €</b></p>
      <p style="font-size:14px;font-weight:800">TOTAL <span style="display:inline-block;width:110px">13.833,60 €</span></p>
    </div>
    <p style="margin-top:16px;color:#888;font-size:10px">Vencimiento: 30 días fecha factura · IBAN ES12 0000 0000 0000 0000 0000</p>
  </div>
  <p style="font-weight:800;margin:20px 0 10px">Documentos cruzados en SAP</p>
  <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px">
    ${[
      ['file-text', 'Pedido de compra', '4500012873', 'Aprobado · 12.480,00 €', 'green'],
      ['truck', 'Albarán de entrada', 'AL-5521', 'Recibido 07/10 · 5 líneas', 'green'],
      ['bar-chart-3', 'Tarifa del proveedor', 'Tarifa 2026', 'Jamón a 15,60 €/kg', 'amber'],
    ]
      .map(([i, t, n, d, c]) => `<div class="card" style="padding:14px"><div class="row" style="gap:8px;color:var(--muted);font-size:12.5px;font-weight:600">${ic(i, 15)}${t}</div><p style="font-weight:800;font-size:15px;margin:6px 0 2px">${n}</p><span class="chip ${c}">${d}</span></div>`)
      .join('')}
  </div>
</div>

<div style="background:#fff;border-left:1px solid var(--line);display:flex;flex-direction:column;overflow:hidden">
  <div class="row" style="padding:16px 20px;border-bottom:1px solid var(--line)">
    <div style="width:38px;height:38px;border-radius:12px;display:grid;place-items:center;color:#fff;background:linear-gradient(135deg,var(--red),var(--red-dark))">${ic('sparkles', 19)}</div>
    <div style="flex:1"><p class="h2">Agente de facturas</p><p class="muted" style="font-size:12px">Conectado a SAP y al correo de compras</p></div>
    <span class="chip amber">Requiere tu revisión</span>
  </div>
  <div style="padding:16px 20px;display:grid;gap:14px;overflow:hidden">
    <div class="bubble" style="background:var(--bg)">He leído la factura y la he cruzado con el <b>pedido 4500012873</b> y el <b>albarán AL-5521</b>. Todo cuadra salvo el precio del jamón.</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
      <div class="field"><span>Proveedor</span><b>Dehesa Los Arenales</b></div>
      <div class="field"><span>NIF</span><b>B10482731</b></div>
      <div class="field"><span>Base imponible</span><b>12.576,00 €</b></div>
      <div class="field"><span>Total con IVA</span><b>13.833,60 €</b></div>
    </div>
    <div>
      ${[
        ['ok', 'Proveedor y NIF coinciden con SAP'],
        ['ok', 'Pedido 4500012873 aprobado por Marta R.'],
        ['ok', 'Cantidades iguales a las del albarán de entrada'],
        ['warn', '<b>Jamón: 15,90 €/kg en factura y 15,60 €/kg en el pedido.</b> Diferencia de 96,00 € (105,60 € con IVA).'],
      ]
        .map(
          ([t, x]) => `<div class="check"><span style="color:${t === 'ok' ? 'var(--green)' : '#e07b00'}">${ic(t === 'ok' ? 'circle-check' : 'zap', 18)}</span><span style="line-height:1.4">${x}</span></div>`,
        )
        .join('')}
    </div>
    <div class="bubble" style="background:var(--red-soft);border:1px solid #f3c3ca">
      <p style="font-weight:800;color:var(--red);margin-bottom:4px">Te propongo</p>
      Registrarla en SAP reteniendo los 105,60 € y pedir al proveedor un abono. Ya he preparado el correo.
      <div class="row" style="margin-top:12px;flex-wrap:wrap;gap:8px"><span class="btn">${ic('check', 16)}Registrar y reclamar</span><span class="btn ghost">Ver correo</span><span class="btn ghost">Revisar</span></div>
    </div>
    <div style="display:grid;gap:8px">
      <div class="bubble" style="background:#1c1b1f;color:#fff;justify-self:end;max-width:80%;border-bottom-right-radius:4px">¿Nos lo habían cobrado así antes?</div>
      <div class="bubble" style="background:var(--bg);max-width:92%;border-bottom-left-radius:4px">No. Las últimas 6 facturas de este proveedor llevan el jamón a 15,60 €/kg y no hay ninguna tarifa nueva suya en el correo de compras.</div>
    </div>
  </div>
  <div style="margin-top:auto;padding:14px 20px;border-top:1px solid var(--line)">
    <div class="row" style="height:44px;border-radius:12px;border:1px solid var(--line);padding:0 8px 0 14px;color:#9b9596">Pregunta al agente sobre esta factura…<span style="margin-left:auto;width:32px;height:32px;border-radius:9px;display:grid;place-items:center;background:var(--red);color:#fff">${ic('send', 16)}</span></div>
  </div>
</div>`,
);

buildDesktop('agente', { '1-factura': agente });
