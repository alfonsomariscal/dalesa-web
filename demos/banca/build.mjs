// Demo: migración de la app móvil de MyOnBank (banco ficticio) de híbrida a nativa con agentes de IA,
// skills y desarrollo guiado por especificaciones (SDD). Cuatro pantallas del espacio de trabajo.
//   /opt/homebrew/bin/node demos/banca/build.mjs
import { buildDesktop, ic, page } from '../lib.mjs';

const css = `
:root { --red:#12806f; --red-dark:#0b5d50; --red-soft:#e2f3ef; --bg:#f4f6f9; --text:#0f1b2d; --muted:#5f6b7d; --line:#e3e8ef; --navy:#0f2a4a; }
body { width: 1440px; height: 900px; overflow: hidden; display: grid; grid-template-columns: 236px 1fr; }
.side { background: var(--navy); color: #c9d4e3; padding: 18px 14px; display: flex; flex-direction: column; gap: 4px; }
.proj { display: flex; align-items: center; gap: 10px; padding: 4px 6px 18px; color: #fff; }
.proj .lg { width: 36px; height: 36px; border-radius: 11px; display: grid; place-items: center; background: linear-gradient(135deg,#6d5cff,#2fb8ff); color: #fff; font-weight: 800; font-size: 14px; letter-spacing: -.02em; }
.proj small { display: block; color: #8fa3bd; font-size: 12px; font-weight: 500; }
.nav { display: flex; align-items: center; gap: 10px; padding: 10px 10px; border-radius: 10px; font-weight: 600; }
.nav.on { background: rgb(255 255 255 / .1); color: #fff; }
.nav .n { margin-left: auto; font-size: 11px; color: #8fa3bd; }
.side h4 { margin: 18px 10px 6px; font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #8fa3bd; }
.ag { display: flex; align-items: center; gap: 8px; padding: 6px 10px; font-size: 12.5px; }
.dot { width: 8px; height: 8px; border-radius: 50%; flex: none; }
.main { padding: 20px 26px; overflow: hidden; }
.h1 { font-size: 22px; letter-spacing: -.02em; font-weight: 800; }
.h2 { font-size: 15px; font-weight: 800; }
.kpi { padding: 14px 16px; } .kpi .l { color: var(--muted); font-size: 12px; font-weight: 600; } .kpi .v { font-size: 24px; font-weight: 800; letter-spacing: -.02em; margin-top: 2px; }
.mono { font-family: ui-monospace, 'SF Mono', Menlo, monospace; font-size: 12px; }
.src { font-family: ui-monospace, 'SF Mono', Menlo, monospace; font-size: 11.5px; color: #3c5a80; background: #eef3f9; padding: 2px 6px; border-radius: 5px; white-space: nowrap; }
.rule { font-family: ui-monospace, 'SF Mono', Menlo, monospace; font-size: 11.5px; font-weight: 700; color: var(--red-dark); background: var(--red-soft); padding: 2px 6px; border-radius: 5px; white-space: nowrap; }
td, th { padding-top: 10px; padding-bottom: 10px; }
.code { background: #0f1b2d; color: #d6e2f0; border-radius: 12px; padding: 14px 16px; font-family: ui-monospace, 'SF Mono', Menlo, monospace; font-size: 12px; line-height: 1.65; white-space: pre; overflow: hidden; }
.code .k { color: #7cc4ff; } .code .t { color: #8ee6c9; } .code .s { color: #f5c97a; } .code .c { color: #7f93ad; font-style: italic; }
.col { background: #eaeef4; border-radius: 14px; padding: 10px; display: grid; gap: 8px; align-content: start; }
.col h5 { font-size: 12px; font-weight: 800; color: var(--muted); display: flex; justify-content: space-between; padding: 2px 4px; }
.task { background: #fff; border: 1px solid var(--line); border-radius: 12px; padding: 10px 12px; display: grid; gap: 6px; }
.task b { font-size: 13px; }
.bar { height: 6px; border-radius: 3px; background: #e3e8ef; } .bar i { display: block; height: 100%; border-radius: 3px; background: var(--red); }
`;

const side = (on) => `
<div class="side">
  <div class="proj"><div class="lg">My</div><div style="font-weight:800">Migración app MyOnBank<small>De híbrida a nativa</small></div></div>
  ${[
    ['search', 'Descubrimiento', '213'],
    ['file-text', 'Especificaciones', '64'],
    ['bot', 'Generación', '41/64'],
    ['git-compare', 'Paridad', '98,6 %'],
  ]
    .map(([i, l, n], k) => `<div class="nav ${k === on ? 'on' : ''}">${ic(i, 17)}${l}<span class="n">${n}</span></div>`)
    .join('')}
  <h4>Agentes</h4>
  ${[
    ['#1db39a', 'Inventario', 'terminado'],
    ['#1db39a', 'Reglas de negocio', 'terminado'],
    ['#1db39a', 'Integraciones', 'terminado'],
    ['#f2b84b', 'Verificador', 'revisando'],
    ['#4aa3f2', 'Generador iOS', 'trabajando'],
    ['#4aa3f2', 'Generador Android', 'trabajando'],
    ['#4aa3f2', 'Pruebas de paridad', 'trabajando'],
  ]
    .map(([c, n, s]) => `<div class="ag"><span class="dot" style="background:${c}"></span>${n}<span style="margin-left:auto;color:#8fa3bd">${s}</span></div>`)
    .join('')}
  <h4>Skills</h4>
  ${['Sistema de diseño MyOnBank', 'Seguridad bancaria (MASVS)', 'Accesibilidad', 'SwiftUI y Compose', 'Cliente API del banco']
    .map((s) => `<div class="ag">${ic('layers', 13)}${s}</div>`)
    .join('')}
</div>`;

// 1 · Descubrimiento ----------------------------------------------------------------
const rules = [
  ['R-041', 'Una transferencia inmediata no puede superar 15.000 € al día por cliente', 'src/transfer/limits.js:88', 'green', 'Verificada'],
  ['R-042', 'Fuera de horario, las transferencias a otra entidad salen el siguiente día hábil', 'src/transfer/schedule.js:23', 'green', 'Verificada'],
  ['R-057', 'Se pide firma con código (OTP) si el importe supera 1.000 € o el destinatario es nuevo', 'src/security/otp.js:141', 'green', 'Verificada'],
  ['R-063', 'El IBAN se valida con su dígito de control antes de llamar al servidor', 'src/common/iban.js:12', 'green', 'Verificada'],
  ['R-071', 'Las tarjetas bloqueadas por robo no se pueden desbloquear desde la app', 'src/cards/status.js:57', 'green', 'Verificada'],
  ['R-090', 'Las cuentas en descubierto no pueden emitir transferencias', 'services/accounts.wsdl', 'amber', 'Confirmar con negocio'],
];
const descubrimiento = page(
  'Descubrimiento',
  css,
  `${side(0)}
<div class="main">
  <div class="row" style="justify-content:space-between">
    <div><h1 class="h1">Descubrimiento de la app antigua</h1><p class="muted">App híbrida (Cordova y AngularJS) de 2014 · 186.000 líneas · analizada por 4 agentes</p></div>
    <span class="btn ghost">${ic('file-text', 15)}Descargar informe</span>
  </div>
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-top:16px">
    ${[
      ['Pantallas', '142', ''],
      ['Casos de uso', '64', ''],
      ['Reglas de negocio', '213', '198 verificadas'],
      ['Servicios del backend', '37', '4 SOAP antiguos'],
      ['Código sin uso', '21 %', 'no se migra'],
    ]
      .map(([l, v, d]) => `<div class="card kpi"><p class="l">${l}</p><p class="v">${v}</p>${d ? `<p class="muted" style="font-size:12px">${d}</p>` : '<p style="font-size:12px">&nbsp;</p>'}</div>`)
      .join('')}
  </div>
  <div style="display:grid;grid-template-columns:1.7fr 1fr;gap:14px;margin-top:14px">
    <div class="card" style="overflow:hidden">
      <div class="row" style="justify-content:space-between;padding:14px 16px 4px"><p class="h2">Reglas de negocio · transferencias y tarjetas</p><span class="muted" style="font-size:12px">Cada regla, con su origen en el código</span></div>
      <table>
        <tr><th style="padding-left:16px">Regla</th><th>Qué dice</th><th>Origen</th><th>Estado</th></tr>
        ${rules.map(([id, t, s, c, e]) => `<tr><td style="padding-left:16px"><span class="rule">${id}</span></td><td style="font-size:13px;line-height:1.35">${t}</td><td><span class="src">${s}</span></td><td><span class="chip ${c}">${e}</span></td></tr>`).join('')}
      </table>
    </div>
    <div style="display:grid;gap:14px;align-content:start">
      <div class="card" style="padding:16px">
        <div class="row" style="gap:8px;margin-bottom:8px"><span style="color:var(--red)">${ic('sparkles', 17)}</span><p class="h2">Resumen del agente</p></div>
        <p style="line-height:1.5;font-size:13.5px">La app tiene <b>64 casos de uso</b>, pero 9 pantallas ya no se usan y el 21 % del código está muerto. Propongo migrar primero <b>acceso, posición global y movimientos</b>: son el 78 % de las sesiones.</p>
      </div>
      <div class="card" style="padding:16px">
        <p class="h2" style="margin-bottom:6px">Integraciones detectadas</p>
        ${[
          ['Cuentas y saldos', 'SOAP', 'amber'],
          ['Transferencias', 'REST', 'green'],
          ['Tarjetas', 'REST', 'green'],
          ['Firma con código (OTP)', 'SDK nativo', 'blue'],
        ]
          .map(([n, t, c], i) => `<div class="row" style="padding:7px 0;${i ? 'border-top:1px solid var(--line)' : ''};font-size:13px"><span style="flex:1">${n}</span><span class="chip ${c}">${t}</span></div>`)
          .join('')}
      </div>
      <div class="card" style="padding:16px">
        <p class="h2" style="margin-bottom:8px">Pendiente de confirmar</p>
        <div class="row" style="align-items:flex-start;gap:10px;font-size:13px;line-height:1.4"><span style="color:#b86e00">${ic('zap', 17)}</span><span><span class="rule">R-090</span> sale del contrato del servicio, no del código de la app. Necesita confirmación de negocio antes de especificarla.</span></div>
      </div>
    </div>
  </div>
</div>`,
);

// 2 · Especificación (SDD) ----------------------------------------------------------
const especificacion = page(
  'Especificación',
  css,
  `${side(1)}
<div class="main" style="display:grid;grid-template-columns:250px 1fr 300px;gap:16px;padding-right:20px">
  <div>
    <p class="h2" style="margin:4px 0 10px">Casos de uso</p>
    ${[
      ['CU-01', 'Acceso con biometría', 'green', 'Aprobada'],
      ['CU-03', 'Posición global', 'green', 'Aprobada'],
      ['CU-05', 'Movimientos', 'green', 'Aprobada'],
      ['CU-08', 'Bloqueo de tarjetas', 'green', 'Aprobada'],
      ['CU-12', 'Transferencia inmediata', 'amber', 'En revisión'],
      ['CU-14', 'Pagos entre particulares', 'grey', 'Borrador'],
      ['CU-19', 'Domiciliaciones', 'grey', 'Borrador'],
    ]
      .map(([id, n, c, e]) => `<div class="card" style="padding:10px 12px;margin-bottom:8px;${id === 'CU-12' ? 'border-color:var(--red);box-shadow:0 0 0 1px var(--red)' : ''}"><div class="row" style="justify-content:space-between"><span class="rule">${id}</span><span class="chip ${c}">${e}</span></div><p style="font-weight:700;font-size:13.5px;margin-top:6px">${n}</p></div>`)
      .join('')}
  </div>
  <div class="card" style="padding:20px 22px;overflow:hidden">
    <div class="row" style="justify-content:space-between"><span class="rule">CU-12</span><span class="muted" style="font-size:12px">spec/transferencia-inmediata.md · versión 3</span></div>
    <h1 class="h1" style="margin:8px 0 4px">Transferencia inmediata</h1>
    <p class="muted" style="font-size:13.5px">El cliente envía dinero a cualquier IBAN y llega en segundos.</p>
    <p class="h2" style="margin:16px 0 6px">Reglas que cumple</p>
    <div style="display:grid;gap:6px;font-size:13px">
      <div class="row" style="gap:8px"><span class="rule">R-041</span>Máximo 15.000 € al día por cliente</div>
      <div class="row" style="gap:8px"><span class="rule">R-057</span>Firma con código si supera 1.000 € o el destinatario es nuevo</div>
      <div class="row" style="gap:8px"><span class="rule">R-063</span>IBAN validado antes de enviar</div>
    </div>
    <p class="h2" style="margin:16px 0 6px">Criterios de aceptación</p>
    <div class="mono" style="display:grid;gap:8px;background:#f6f8fb;border-radius:10px;padding:12px 14px;line-height:1.55">
      <div><b style="color:var(--red-dark)">Dado</b> un cliente que hoy ya ha enviado 14.500 €<br><b style="color:var(--red-dark)">Cuando</b> intenta enviar 800 €<br><b style="color:var(--red-dark)">Entonces</b> ve «Superas tu límite diario de 15.000 €» y no se envía</div>
      <div><b style="color:var(--red-dark)">Dado</b> un destinatario nuevo <b style="color:var(--red-dark)">Cuando</b> envía 50 €<br><b style="color:var(--red-dark)">Entonces</b> se pide firma con código antes de enviar</div>
    </div>
    <p class="h2" style="margin:16px 0 6px">Contrato de la API</p>
    <div class="code" style="padding:10px 14px"><span class="k">POST</span> /v2/transferencias/inmediatas  { <span class="s">"iban"</span>, <span class="s">"importe"</span>, <span class="s">"concepto"</span>, <span class="s">"firma"</span> }
<span class="t">201</span> enviada · <span class="t">409</span> supera el límite diario · <span class="t">428</span> requiere firma</div>
    <p class="h2" style="margin:16px 0 8px">Pantallas</p>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">
      ${['Formulario', 'Firma con código', 'Resultado'].map((n, i) => `<div style="border:1px solid var(--line);border-radius:10px;padding:10px;display:grid;gap:6px"><div style="height:64px;border-radius:8px;background:#f1f4f8;display:grid;gap:5px;padding:9px;align-content:start"><i style="height:6px;width:${[70, 40, 55][i]}%;background:#cfd8e3;border-radius:3px;display:block"></i><i style="height:6px;width:${[90, 75, 80][i]}%;background:#dfe5ed;border-radius:3px;display:block"></i><i style="height:12px;width:50%;background:${i === 1 ? 'var(--red)' : '#cfd8e3'};border-radius:4px;display:block;margin-top:6px"></i></div><span style="font-size:12.5px;font-weight:700">${n}</span></div>`).join('')}
    </div>
    <p class="h2" style="margin:16px 0 6px">Fuera de alcance</p>
    <p style="font-size:13px" class="muted">Transferencias periódicas (CU-21) y a otras divisas (CU-23): tienen su propia especificación.</p>
  </div>
  <div style="display:grid;gap:14px;align-content:start">
    <div class="card" style="padding:16px">
      <p class="h2" style="margin-bottom:10px">Aprobación</p>
      ${[
        ['Negocio', 'Lucía R. · Producto', 'green', 'Aprobada'],
        ['Seguridad', 'Equipo de ciberseguridad', 'green', 'Aprobada'],
        ['Arquitectura', 'Plataforma móvil', 'amber', 'Pendiente'],
      ]
        .map(([a, b, c, e], i) => `<div class="row" style="padding:9px 0;${i ? 'border-top:1px solid var(--line)' : ''}"><div style="flex:1"><p style="font-weight:700;font-size:13.5px">${a}</p><p class="muted" style="font-size:12px">${b}</p></div><span class="chip ${c}">${e}</span></div>`)
        .join('')}
      <span class="btn" style="width:100%;margin-top:10px">${ic('check', 15)}Aprobar especificación</span>
    </div>
    <div class="card" style="padding:16px">
      <div class="row" style="gap:8px;margin-bottom:8px"><span style="color:var(--red)">${ic('sparkles', 16)}</span><p class="h2">Agente verificador</p></div>
      <p style="font-size:13px;line-height:1.5">Todas las reglas de la especificación existen en la app antigua y tienen origen. Falta un criterio para <b>fuera de horario</b> (<span class="rule">R-042</span>): ¿lo añado?</p>
      <div class="row" style="gap:8px;margin-top:10px"><span class="btn light" style="height:32px;padding:0 12px">Añadir criterio</span></div>
    </div>
  </div>
</div>`,
);

// 3 · Generación con agentes y skills -------------------------------------------------
const generacion = page(
  'Generación',
  css,
  `${side(2)}
<div class="main">
  <div class="row" style="justify-content:space-between">
    <div><h1 class="h1">Generación de la app nativa</h1><p class="muted">Cada caso de uso aprobado lo generan los agentes de iOS y Android siguiendo las skills del banco</p></div>
    <div class="row" style="gap:10px"><span class="chip green" style="font-size:13px;padding:6px 12px">41 de 64 casos de uso hechos</span></div>
  </div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:16px">
    <div class="col"><h5>Especificación aprobada <span>3</span></h5>
      ${['CU-14 · Pagos entre particulares', 'CU-19 · Domiciliaciones', 'CU-22 · Recibos'].map((t) => `<div class="task"><b>${t}</b><span class="muted" style="font-size:12px">En cola</span></div>`).join('')}
    </div>
    <div class="col"><h5>Generando <span>2</span></h5>
      <div class="task" style="border-color:var(--red)"><b>CU-12 · Transferencia inmediata</b>
        <div class="row" style="gap:8px;font-size:12px"><span style="width:58px">iOS</span><div class="bar" style="flex:1"><i style="width:72%"></i></div><span>72 %</span></div>
        <div class="row" style="gap:8px;font-size:12px"><span style="width:58px">Android</span><div class="bar" style="flex:1"><i style="width:65%"></i></div><span>65 %</span></div>
      </div>
      <div class="task"><b>CU-15 · Cambio de PIN</b><div class="row" style="gap:8px;font-size:12px"><span style="width:58px">iOS</span><div class="bar" style="flex:1"><i style="width:30%"></i></div><span>30 %</span></div></div>
    </div>
    <div class="col"><h5>Revisión humana <span>2</span></h5>
      <div class="task"><b>CU-08 · Bloqueo de tarjetas</b><span class="muted" style="font-size:12px">2 PR · 1 comentario</span></div>
      <div class="task"><b>CU-09 · Límites de tarjeta</b><span class="muted" style="font-size:12px">2 PR · aprobado iOS</span></div>
    </div>
    <div class="col"><h5>Hecho <span>41</span></h5>
      ${['CU-01 · Acceso con biometría', 'CU-03 · Posición global', 'CU-05 · Movimientos'].map((t) => `<div class="task"><b>${t}</b><span class="chip green" style="justify-self:start">Paridad 100 %</span></div>`).join('')}
    </div>
  </div>
  <div style="display:grid;grid-template-columns:1.45fr 1fr;gap:14px;margin-top:14px">
    <div>
      <div class="row" style="justify-content:space-between;margin-bottom:8px"><p class="h2">TransferenciaView.swift · generado para CU-12</p><span class="muted" style="font-size:12px">rama cu-12-transferencia</span></div>
      <div class="code"><span class="k">struct</span> <span class="t">TransferenciaView</span>: <span class="t">View</span> {
    @<span class="t">State</span> <span class="k">private var</span> modelo = <span class="t">TransferenciaModelo</span>()

    <span class="k">var</span> body: <span class="k">some</span> <span class="t">View</span> {
        <span class="t">MyOnFormulario</span>(titulo: <span class="s">"Transferencia inmediata"</span>) {   <span class="c">// skill: sistema de diseño</span>
            <span class="t">CampoIBAN</span>(texto: $modelo.iban)                 <span class="c">// R-063: valida el dígito de control</span>
            <span class="t">CampoImporte</span>(valor: $modelo.importe, limite: modelo.restanteHoy)  <span class="c">// R-041</span>
        }
        .<span class="t">firmaSiHaceFalta</span>(modelo.requiereFirma)          <span class="c">// R-057: OTP si &gt; 1.000 € o destinatario nuevo</span>
        .<span class="t">accesible</span>(<span class="s">"Enviar transferencia"</span>)                <span class="c">// skill: accesibilidad</span>
    }
}</div>
    </div>
    <div class="card" style="padding:16px">
      <p class="h2" style="margin-bottom:10px">Comprobaciones del PR</p>
      ${[
        ['Compila en iOS 17+ y Android 10+', 'green', 'OK'],
        ['Reglas R-041, R-057 y R-063 cubiertas', 'green', 'OK'],
        ['Skill de seguridad: sin datos en registros', 'green', 'OK'],
        ['Skill de accesibilidad: VoiceOver y TalkBack', 'green', 'OK'],
        ['Pruebas de paridad del CU-12', 'amber', '35 de 40'],
      ]
        .map(([t, c, e], i) => `<div class="row" style="padding:8px 0;${i ? 'border-top:1px solid var(--line)' : ''};font-size:13px"><span style="flex:1">${t}</span><span class="chip ${c}">${e}</span></div>`)
        .join('')}
      <p class="muted" style="font-size:12px;margin-top:8px">Nada llega a producción sin la revisión de una persona.</p>
    </div>
  </div>
  <div class="card" style="margin-top:14px;padding:12px 18px">
    <p class="h2" style="margin-bottom:6px">Actividad reciente</p>
    ${[
      ['09:42', 'bot', 'Generador iOS', 'Abre el PR «CU-12 · formulario y firma» con 14 ficheros y 22 pruebas'],
      ['09:31', 'search', 'Verificador', 'Confirma que CU-09 respeta R-071: las tarjetas robadas no se desbloquean desde la app'],
      ['09:10', 'users', 'Ana G. (iOS)', 'Aprueba el PR de CU-09 tras pedir un cambio de texto en el aviso de límite'],
    ]
      .map(([h, i, w, t], k) => `<div class="row" style="padding:7px 0;${k ? 'border-top:1px solid var(--line)' : ''};font-size:13px"><span class="muted mono" style="width:44px">${h}</span><span style="color:var(--red)">${ic(i, 15)}</span><b style="width:150px">${w}</b><span style="flex:1">${t}</span></div>`)
      .join('')}
  </div>
</div>`,
);

// 4 · Paridad -------------------------------------------------------------------------
const cus = [
  ['CU-01 Acceso con biometría', 22, 22],
  ['CU-03 Posición global', 31, 31],
  ['CU-05 Movimientos', 48, 48],
  ['CU-08 Bloqueo de tarjetas', 26, 25],
  ['CU-09 Límites de tarjeta', 18, 18],
  ['CU-12 Transferencia inmediata', 40, 35],
];
const paridad = page(
  'Paridad',
  css,
  `${side(3)}
<div class="main">
  <div class="row" style="justify-content:space-between">
    <div><h1 class="h1">Pruebas de paridad</h1><p class="muted">Los mismos escenarios contra la app antigua y la nueva. Toda diferencia se explica o se corrige.</p></div>
    <span class="btn ghost">${ic('repeat', 15)}Volver a ejecutar</span>
  </div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:16px">
    <div class="card kpi"><p class="l">Escenarios ejecutados</p><p class="v">418</p><p class="muted" style="font-size:12px">en 41 casos de uso</p></div>
    <div class="card kpi"><p class="l">Mismo resultado</p><p class="v" style="color:var(--green)">412</p><p class="muted" style="font-size:12px">98,6 %</p></div>
    <div class="card kpi"><p class="l">Diferencias aprobadas</p><p class="v">5</p><p class="muted" style="font-size:12px">mejoras pedidas por negocio</p></div>
    <div class="card kpi"><p class="l">Diferencias abiertas</p><p class="v" style="color:#b86e00">1</p><p class="muted" style="font-size:12px">en revisión</p></div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1.25fr;gap:14px;margin-top:14px">
    <div class="card" style="padding:16px 18px">
      <p class="h2" style="margin-bottom:12px">Escenarios con el mismo resultado, por caso de uso</p>
      ${cus
        .map(
          ([n, t, ok]) => `<div style="display:grid;grid-template-columns:190px 1fr 56px;gap:10px;align-items:center;padding:7px 0;font-size:13px"><span style="font-weight:600">${n}</span><div style="height:12px;border-radius:4px;background:#e3e8ef;overflow:hidden;display:flex"><i style="width:${(ok / t) * 100}%;background:var(--red)"></i><i style="width:${((t - ok) / t) * 100}%;background:#f2b84b"></i></div><b class="num">${ok}/${t}</b></div>`,
        )
        .join('')}
      <div class="row" style="gap:14px;font-size:12px;margin-top:8px"><span class="row" style="gap:6px"><i style="width:12px;height:12px;border-radius:3px;background:var(--red);display:inline-block"></i>Mismo resultado</span><span class="row" style="gap:6px"><i style="width:12px;height:12px;border-radius:3px;background:#f2b84b;display:inline-block"></i>Diferente</span></div>
    </div>
    <div class="card" style="overflow:hidden">
      <div class="row" style="justify-content:space-between;padding:14px 16px 4px"><p class="h2">Diferencias</p><span class="muted" style="font-size:12px">Cada una, con su decisión</span></div>
      <table>
        <tr><th style="padding-left:16px">Caso</th><th>App antigua</th><th>App nueva</th><th>Decisión</th></tr>
        ${[
          ['CU-12', 'Avisa del límite después de pedir el código', 'Avisa del límite antes', 'green', 'Mejora aprobada'],
          ['CU-12', 'Acepta IBAN con espacios y falla en el servidor', 'Quita los espacios al escribir', 'green', 'Mejora aprobada'],
          ['CU-12', 'Fuera de horario no dice cuándo llega', 'Indica el día de llegada', 'green', 'Mejora aprobada'],
          ['CU-08', 'Desbloqueo tras robo: muestra error genérico', 'Explica que hay que llamar al banco', 'green', 'Mejora aprobada'],
          ['CU-12', 'Redondea a 2 decimales al enviar', 'Redondea al escribir', 'green', 'Mejora aprobada'],
          ['CU-12', 'Concepto de 140 caracteres', 'Concepto de 70 caracteres', 'amber', 'Corregir: debe ser 140'],
        ]
          .map(([c, a, b, k, d]) => `<tr><td style="padding-left:16px"><span class="rule">${c}</span></td><td style="font-size:12.5px">${a}</td><td style="font-size:12.5px">${b}</td><td><span class="chip ${k}">${d}</span></td></tr>`)
          .join('')}
      </table>
    </div>
  </div>
  <div class="card" style="margin-top:14px;padding:14px 18px 6px">
    <div class="row" style="justify-content:space-between"><p class="h2">Casos de uso migrados, acumulado por semana</p><span class="muted" style="font-size:12px">Objetivo: 64 casos de uso en la semana 48</span></div>
    ${(() => {
      const v = [0, 3, 7, 12, 16, 20, 25, 29, 33, 37, 41];
      const W = 1120, H = 150, L = 34, R = 60, T = 14, B = 22;
      const x = (i) => L + (i * (W - L - R)) / 18;
      const y = (n) => T + ((64 - n) * (H - T - B)) / 64;
      return `<svg width="100%" viewBox="0 0 ${W} ${H}">
        ${[0, 32, 64].map((n) => `<line x1="${L}" x2="${W - R}" y1="${y(n)}" y2="${y(n)}" stroke="#e3e8ef"/><text x="${L - 6}" y="${y(n) + 4}" font-size="11" fill="#5f6b7d" text-anchor="end">${n}</text>`).join('')}
        ${Array.from({ length: 19 }, (_, i) => (i % 3 === 0 ? `<text x="${x(i)}" y="${H - 4}" font-size="11" fill="#5f6b7d" text-anchor="middle">S${30 + i}</text>` : '')).join('')}
        <path d="M${x(10)} ${y(41)} L${x(18)} ${y(64)}" stroke="#12806f" stroke-width="2" stroke-dasharray="5 5" fill="none" opacity=".6"/>
        <path d="${v.map((n, i) => `${i ? 'L' : 'M'}${x(i)} ${y(n)}`).join(' ')}" stroke="#12806f" stroke-width="2.6" fill="none" stroke-linejoin="round"/>
        <circle cx="${x(10)}" cy="${y(41)}" r="4.5" fill="#12806f" stroke="#fff" stroke-width="2"/>
        <text x="${x(10)}" y="${y(41) - 12}" font-size="12" font-weight="700" fill="#0f1b2d" text-anchor="middle">41 hoy</text>
        <text x="${x(18) + 8}" y="${y(64) + 4}" font-size="12" font-weight="700" fill="#5f6b7d">64</text>
      </svg>`;
    })()}
  </div>
</div>`,
);

buildDesktop('banca', { '1-descubrimiento': descubrimiento, '2-especificacion': especificacion, '3-generacion': generacion, '4-paridad': paridad }, { each: true });
