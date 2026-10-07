// Demo: Nordaria Seguros (aseguradora ficticia). Modelo de IA entrenado con sus datos históricos que
// predice si un siniestro se va a repetir, además del coste final, el riesgo de fraude y la baja del cliente.
//   /opt/homebrew/bin/node demos/seguros/build.mjs
import { buildDesktop, ic, page } from '../lib.mjs';

const css = `
:root { --red:#4f46e5; --red-dark:#3730a3; --red-soft:#eef0ff; --bg:#f5f6fa; --text:#111827; --muted:#6b7280; --line:#e7e9f0; --hot:#e5484d; --hot-soft:#fdecec; }
body { width: 1440px; height: 900px; overflow: hidden; display: grid; grid-template-columns: 236px 1fr; }
.side { background: #0f1222; color: #c3c7d9; padding: 18px 14px; display: flex; flex-direction: column; gap: 4px; }
.proj { display: flex; align-items: center; gap: 10px; padding: 4px 6px 18px; color: #fff; }
.proj .lg { width: 36px; height: 36px; border-radius: 11px; display: grid; place-items: center; background: linear-gradient(135deg,#4f46e5,#06b6d4); color: #fff; font-weight: 800; }
.proj small { display: block; color: #8b90a8; font-size: 12px; font-weight: 500; }
.nav { display: flex; align-items: center; gap: 10px; padding: 10px; border-radius: 10px; font-weight: 600; }
.nav.on { background: rgb(255 255 255 / .09); color: #fff; }
.side h4 { margin: 18px 10px 6px; font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #8b90a8; }
.md { display: flex; align-items: center; gap: 8px; padding: 6px 10px; font-size: 12.5px; }
.dot { width: 8px; height: 8px; border-radius: 50%; flex: none; }
.main { padding: 20px 26px; overflow: hidden; }
.h1 { font-size: 22px; letter-spacing: -.02em; font-weight: 800; }
.h2 { font-size: 15px; font-weight: 800; }
.kpi { padding: 14px 16px; } .kpi .l { color: var(--muted); font-size: 12.5px; font-weight: 600; } .kpi .v { font-size: 25px; font-weight: 800; letter-spacing: -.02em; margin: 4px 0 2px; font-variant-numeric: tabular-nums; }
.good { color: var(--green); font-weight: 700; font-size: 12.5px; }
.chip.hot { color: var(--hot); background: var(--hot-soft); }
td, th { padding-top: 10px; padding-bottom: 10px; }
.bar { height: 10px; border-radius: 4px; background: #eceef5; overflow: hidden; } .bar i { display: block; height: 100%; border-radius: 4px; }
`;
const side = (on) => `
<div class="side">
  <div class="proj"><div class="lg">N</div><div style="font-weight:800">Nordaria · IA<small>Modelos predictivos</small></div></div>
  ${[
    ['database', 'Datos'],
    ['brain-circuit', 'Modelo'],
    ['search', 'Predicciones'],
    ['bar-chart-3', 'Acciones y resultados'],
  ]
    .map(([i, l], k) => `<div class="nav ${k === on ? 'on' : ''}">${ic(i, 17)}${l}</div>`)
    .join('')}
  <h4>Modelos en producción</h4>
  ${[
    ['#22c55e', 'Repetición del siniestro', 'v3'],
    ['#22c55e', 'Coste final', 'v5'],
    ['#22c55e', 'Riesgo de fraude', 'v2'],
    ['#f59e0b', 'Baja del cliente', 'piloto'],
  ]
    .map(([c, n, v]) => `<div class="md"><span class="dot" style="background:${c}"></span>${n}<span style="margin-left:auto;color:#8b90a8">${v}</span></div>`)
    .join('')}
  <h4>Última actualización</h4>
  <div class="md">${ic('calendar-clock', 14)}Reentrenado el 1 de octubre</div>
</div>`;

// 1 · Datos
const datos = page(
  'Datos',
  css,
  `${side(0)}
<div class="main">
  <div class="row" style="justify-content:space-between">
    <div><h1 class="h1">Datos para entrenar el modelo</h1><p class="muted">Diez años de historia de la aseguradora, unidos y limpios en un mismo sitio</p></div>
    <span class="chip green" style="font-size:13px;padding:6px 12px">${ic('check', 13, 3)}Listos para entrenar</span>
  </div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:16px">
    <div class="card kpi"><p class="l">Pólizas de hogar</p><p class="v">2,1 M</p><p class="muted" style="font-size:12.5px">2016–2026</p></div>
    <div class="card kpi"><p class="l">Siniestros con su peritación</p><p class="v">1,2 M</p><p class="muted" style="font-size:12.5px">con coste final</p></div>
    <div class="card kpi"><p class="l">Variables por póliza</p><p class="v">184</p><p class="muted" style="font-size:12.5px">propias y externas</p></div>
    <div class="card kpi"><p class="l">Calidad de los datos</p><p class="v">97,4 %</p><p class="muted" style="font-size:12.5px">registros completos</p></div>
  </div>
  <div style="display:grid;grid-template-columns:1.35fr 1fr;gap:14px;margin-top:14px">
    <div class="card" style="overflow:hidden">
      <div class="row" style="justify-content:space-between;padding:14px 18px 4px"><p class="h2">Fuentes</p><span class="muted" style="font-size:12px">Se actualizan cada noche</span></div>
      <table>
        <tr><th style="padding-left:18px">Fuente</th><th>Qué aporta</th><th class="num">Registros</th><th>Estado</th></tr>
        ${[
          ['Pólizas', 'Coberturas, capitales, antigüedad del cliente', '2,1 M', 'green', 'Conectada'],
          ['Siniestros', 'Tipo, causa, fechas y coste final', '1,2 M', 'green', 'Conectada'],
          ['Informes de peritos', 'Origen del daño y estado de la instalación', '940.000', 'green', 'Conectada'],
          ['Catastro', 'Año de construcción y superficie', '1,8 M', 'green', 'Conectada'],
          ['Meteorología', 'Lluvias, heladas y temperaturas por código postal', '10 años', 'green', 'Conectada'],
          ['Atención al cliente', 'Quejas y llamadas', '3,4 M', 'amber', 'Anonimizada'],
        ]
          .map(([n, d, r, c, e]) => `<tr><td style="padding-left:18px;font-weight:700">${n}</td><td style="font-size:13px">${d}</td><td class="num">${r}</td><td><span class="chip ${c}">${e}</span></td></tr>`)
          .join('')}
      </table>
    </div>
    <div style="display:grid;gap:14px;align-content:start">
      <div class="card" style="padding:16px">
        <p class="h2" style="margin-bottom:10px">Siniestros de agua por año de construcción</p>
        ${[
          ['Antes de 1970', 92],
          ['1970–1989', 71],
          ['1990–2009', 44],
          ['Desde 2010', 23],
        ]
          .map(([l, v]) => `<div style="display:grid;grid-template-columns:110px 1fr 54px;gap:10px;align-items:center;padding:6px 0;font-size:13px"><span>${l}</span><div class="bar"><i style="width:${v}%;background:var(--red)"></i></div><b class="num">${v} ‰</b></div>`)
          .join('')}
        <p class="muted" style="font-size:12px;margin-top:6px">Siniestros al año por cada 1.000 pólizas</p>
      </div>
      <div class="card" style="padding:16px">
        <p class="h2" style="margin-bottom:8px">Privacidad</p>
        ${['Datos personales seudonimizados antes de entrenar', 'Sin datos de salud ni categorías especiales', 'Acceso registrado y limitado al equipo del proyecto']
          .map((x) => `<div class="row" style="gap:8px;padding:5px 0;font-size:13px"><span style="color:var(--green)">${ic('shield-check', 15)}</span>${x}</div>`)
          .join('')}
      </div>
    </div>
  </div>
  <div class="card" style="margin-top:14px;padding:16px 18px">
    <p class="h2" style="margin-bottom:12px">Preparación de los datos</p>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
      ${[
        ['1', 'Unir', 'Póliza, siniestros, peritos, catastro y clima en una sola tabla por vivienda'],
        ['2', 'Limpiar', '61.000 duplicados eliminados y fechas corregidas'],
        ['3', 'Crear variables', 'Antigüedad de la fontanería, siniestros previos, heladas por zona…'],
        ['4', 'Separar en el tiempo', 'Entrenar con 2016–2024 y probar con 2025, como en la vida real'],
      ]
        .map(([n, t, d]) => `<div class="row" style="align-items:flex-start;gap:12px;padding:12px;border-radius:12px;background:var(--bg)"><span style="width:30px;height:30px;border-radius:50%;display:grid;place-items:center;background:var(--red);color:#fff;font-weight:800;flex:none">${n}</span><div><p style="font-weight:700;font-size:13.5px">${t}</p><p class="muted" style="font-size:12.5px;line-height:1.4;margin-top:2px">${d}</p></div></div>`)
        .join('')}
    </div>
  </div>
</div>`,
);

// 2 · Modelo
const vars = [
  ['Siniestros de agua en los últimos 3 años', 100],
  ['Antigüedad de la instalación de fontanería', 82],
  ['Año de construcción del edificio', 64],
  ['Origen del último siniestro (tubería, bajante…)', 58],
  ['Heladas en el código postal', 37],
  ['Reparación provisional en el último parte', 33],
  ['Vivienda vacía más de 3 meses al año', 21],
];
const deciles = [2.1, 2.6, 3.0, 3.6, 4.4, 5.3, 6.8, 9.1, 13.9, 31.2];
const modelo = page(
  'Modelo',
  css,
  `${side(1)}
<div class="main">
  <div class="row" style="justify-content:space-between">
    <div><h1 class="h1">Repetición del siniestro · versión 3</h1><p class="muted">Predice la probabilidad de que una vivienda tenga otro siniestro de agua en los próximos 12 meses</p></div>
    <span class="chip green" style="font-size:13px;padding:6px 12px">En producción</span>
  </div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:16px">
    <div class="card kpi"><p class="l">Capacidad para distinguir (AUC)</p><p class="v">0,86</p><p class="good">frente a 0,64 de las reglas actuales</p></div>
    <div class="card kpi"><p class="l">Repeticiones en el 10 % de más riesgo</p><p class="v">47 %</p><p class="muted" style="font-size:12.5px">con las reglas actuales: 19 %</p></div>
    <div class="card kpi"><p class="l">Validado con</p><p class="v">Año 2025</p><p class="muted" style="font-size:12.5px">datos que no vio al entrenar</p></div>
    <div class="card kpi"><p class="l">Error de calibración</p><p class="v">1,8 %</p><p class="muted" style="font-size:12.5px">un 30 % predicho es un 30 % real</p></div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:14px">
    <div class="card" style="padding:16px 18px">
      <p class="h2">Repeticiones reales por grupo de riesgo</p><p class="muted" style="font-size:12.5px;margin-bottom:12px">Pólizas de 2025 ordenadas por la predicción, en 10 grupos iguales</p>
      <div style="display:grid;grid-template-columns:repeat(10,1fr);gap:8px;align-items:end;height:190px">
        ${deciles.map((v, i) => `<div style="display:grid;justify-items:center;gap:4px"><span style="font-size:11.5px;font-weight:700">${v.toLocaleString('es-ES', { minimumFractionDigits: 1 })}</span><div style="width:100%;height:${Math.round((v / 31.2) * 150)}px;border-radius:5px 5px 2px 2px;background:${i === 9 ? 'var(--hot)' : i === 8 ? '#f59e9f' : '#c7cbe8'}"></div></div>`).join('')}
      </div>
      <div style="display:grid;grid-template-columns:repeat(10,1fr);gap:8px;text-align:center;font-size:11.5px;color:var(--muted);margin-top:6px">${Array.from({ length: 10 }, (_, i) => `<span>${i + 1}</span>`).join('')}</div>
      <p class="muted" style="font-size:12px;margin-top:8px">% de viviendas con otro siniestro de agua en 12 meses, del grupo de menos riesgo (1) al de más (10)</p>
    </div>
    <div class="card" style="padding:16px 18px">
      <p class="h2">Lo que más pesa en la predicción</p><p class="muted" style="font-size:12.5px;margin-bottom:10px">Importancia relativa de cada variable</p>
      ${vars.map(([n, v]) => `<div style="display:grid;grid-template-columns:1fr 150px;gap:12px;align-items:center;padding:7px 0;font-size:13px"><span>${n}</span><div class="bar"><i style="width:${v}%;background:var(--red)"></i></div></div>`).join('')}
      <div class="row" style="gap:8px;margin-top:10px;font-size:12.5px"><span style="color:var(--green)">${ic('shield-check', 15)}</span><span class="muted">Revisado: no usa edad, nacionalidad ni otras variables que puedan discriminar</span></div>
    </div>
  </div>
  <div class="card" style="margin-top:14px;padding:16px 18px">
    <p class="h2" style="margin-bottom:12px">Cómo se ha entrenado</p>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
      ${[
        ['database', 'Ejemplos', '1,2 M de siniestros de 2016 a 2024'],
        ['brain-circuit', 'Técnica', 'Árboles de decisión potenciados (gradient boosting), comparados con otras 4'],
        ['calendar-clock', 'Validación', 'Entrenado con el pasado y probado con 2025 completo'],
        ['search', 'Explicable', 'Cada predicción dice qué variables la han subido o bajado'],
      ]
        .map(([i, t, d]) => `<div class="row" style="align-items:flex-start;gap:12px;padding:12px;border-radius:12px;background:var(--bg)"><span style="width:36px;height:36px;border-radius:10px;display:grid;place-items:center;background:var(--red-soft);color:var(--red);flex:none">${ic(i, 17)}</span><div><p style="font-weight:700;font-size:13.5px">${t}</p><p class="muted" style="font-size:12.5px;line-height:1.4;margin-top:2px">${d}</p></div></div>`)
        .join('')}
    </div>
  </div>
</div>`,
);

// 3 · Predicción explicada para una póliza
const circ = 2 * Math.PI * 70;
const prediccion = page(
  'Predicción',
  css,
  `${side(2)}
<div class="main">
  <div class="row" style="justify-content:space-between">
    <div><p class="muted" style="font-size:13px">Póliza HG-2208431 · Hogar · Valladolid · edificio de 1968</p><h1 class="h1">Predicciones para esta póliza</h1></div>
    <div class="row" style="gap:8px;height:38px;border-radius:10px;border:1px solid var(--line);padding:0 12px;background:#fff;color:#9ca3af;width:320px">${ic('search', 16)}Buscar póliza o siniestro</div>
  </div>
  <div style="display:grid;grid-template-columns:1.25fr 1fr;gap:14px;margin-top:16px">
    <div class="card" style="padding:20px 22px">
      <p class="h2">¿Volverá a tener un siniestro de agua en 12 meses?</p>
      <div class="row" style="gap:28px;margin-top:14px">
        <div style="position:relative;width:170px;height:170px;flex:none">
          <svg width="170" height="170" viewBox="0 0 170 170"><circle cx="85" cy="85" r="70" fill="none" stroke="#eceef5" stroke-width="16"/><circle cx="85" cy="85" r="70" fill="none" stroke="#e5484d" stroke-width="16" stroke-linecap="round" stroke-dasharray="${(circ * 0.64).toFixed(1)} ${circ.toFixed(1)}" transform="rotate(-90 85 85)"/></svg>
          <div style="position:absolute;inset:0;display:grid;place-items:center;text-align:center"><div><p style="font-size:38px;font-weight:800;letter-spacing:-.03em">64 %</p><p class="muted" style="font-size:12px">probabilidad</p></div></div>
        </div>
        <div style="flex:1">
          <span class="chip hot" style="font-size:13px">Riesgo muy alto · grupo 10 de 10</span>
          <p style="margin-top:10px;line-height:1.5;font-size:14px">Una vivienda media de su zona tiene un <b>7 %</b>. Esta lo multiplica por 9.</p>
          <p class="muted" style="margin-top:6px;font-size:12.5px">Parte del 7 % de su zona y suma lo que aporta cada motivo.</p>
        </div>
      </div>
      <p class="h2" style="margin:18px 0 8px">Por qué</p>
      ${[
        ['+25 puntos', '2 siniestros de agua en los últimos 3 años', 'hot'],
        ['+17 puntos', 'Fontanería original del edificio (1968)', 'hot'],
        ['+10 puntos', 'El último parte se cerró con una reparación provisional', 'hot'],
        ['+8 puntos', 'Tres olas de heladas al año en su código postal', 'hot'],
        ['−3 puntos', 'Cliente desde hace 12 años, sin otros siniestros', 'green'],
      ]
        .map(([v, t, c]) => `<div class="row" style="padding:8px 0;border-top:1px solid var(--line);font-size:13.5px"><span class="chip ${c}" style="width:92px;justify-content:center">${v}</span><span>${t}</span></div>`)
        .join('')}
    </div>
    <div style="display:grid;gap:14px;align-content:start">
      <div class="card" style="padding:16px 18px">
        <p class="h2" style="margin-bottom:6px">Otras predicciones</p>
        ${[
          ['Coste final del siniestro abierto', 'Rango 1.600–2.100 €', 'blue', '1.720 €'],
          ['Riesgo de fraude', 'Bajo', 'green', '3 %'],
          ['Probabilidad de baja en 6 meses', 'Alta tras dos siniestros', 'amber', '41 %'],
        ]
          .map(([n, d, c, v], i) => `<div class="row" style="padding:10px 0;${i ? 'border-top:1px solid var(--line)' : ''}"><div style="flex:1"><p style="font-weight:700;font-size:13.5px">${n}</p><p class="muted" style="font-size:12px">${d}</p></div><span class="chip ${c}" style="font-size:14px;padding:4px 12px">${v}</span></div>`)
          .join('')}
      </div>
      <div class="card" style="padding:16px 18px;border:1.5px solid #c7cbf5">
        <div class="row" style="gap:8px;color:var(--red);font-weight:700">${ic('sparkles', 17)}Recomendación</div>
        <p style="font-size:13.5px;line-height:1.5;margin-top:6px">Ofrecer una <b>revisión preventiva de fontanería</b> y un <b>detector de fugas</b> sin coste. Cuesta 180 €; si se repite el siniestro, el coste esperado es de 1.100 €.</p>
        <p style="font-size:13.5px;line-height:1.5;margin-top:8px">Y una llamada del mediador: el riesgo de baja es alto.</p>
        <div class="row" style="gap:8px;margin-top:12px"><span class="btn" style="height:36px">${ic('check', 15)}Crear acción</span><span class="btn ghost" style="height:36px">Descartar</span></div>
      </div>
    </div>
  </div>
  <div class="card" style="margin-top:14px;overflow:hidden">
    <div class="row" style="justify-content:space-between;padding:14px 18px 4px"><p class="h2">Historial de esta póliza</p><span class="muted" style="font-size:12px">Lo que ha usado el modelo</span></div>
    <table>
      <tr><th style="padding-left:18px">Fecha</th><th>Siniestro</th><th>Origen según el perito</th><th class="num">Coste</th><th>Cierre</th></tr>
      ${[
        ['Oct 2026', 'Fuga en la cocina', 'Rotura de latiguillo', '1.720 €', 'amber', 'Abierto'],
        ['Feb 2025', 'Humedad en el baño', 'Tubería empotrada', '980 €', 'hot', 'Reparación provisional'],
        ['Ene 2024', 'Filtración al vecino', 'Bajante comunitaria', '640 €', 'green', 'Reparado'],
      ]
        .map(([f, n, o, c, k, e]) => `<tr><td style="padding-left:18px" class="muted">${f}</td><td style="font-weight:700">${n}</td><td>${o}</td><td class="num">${c}</td><td><span class="chip ${k}">${e}</span></td></tr>`)
        .join('')}
    </table>
  </div>
</div>`,
);

// 4 · Acciones y resultados
const meses = ['may', 'jun', 'jul', 'ago', 'sep'];
const control = [5.1, 5.4, 5.0, 5.6, 5.3];
const accion = [4.6, 3.9, 3.3, 3.2, 3.3];
const resultados = page(
  'Resultados',
  css,
  `${side(3)}
<div class="main">
  <div><h1 class="h1">De la predicción a la acción</h1><p class="muted">Programa de prevención para el 5 % de pólizas con más riesgo, desde mayo de 2026</p></div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:16px">
    <div class="card kpi"><p class="l">Viviendas con acción preventiva</p><p class="v">8.420</p><p class="muted" style="font-size:12.5px">revisión y detector de fugas</p></div>
    <div class="card kpi"><p class="l">Siniestros repetidos desde julio</p><p class="v">−38 %</p><p class="good">frente a un grupo de control</p></div>
    <div class="card kpi"><p class="l">Ahorro neto estimado</p><p class="v">1,9 M€</p><p class="muted" style="font-size:12.5px">descontado el coste de las acciones</p></div>
    <div class="card kpi"><p class="l">Bajas en el grupo de riesgo</p><p class="v">−22 %</p><p class="good">con llamada del mediador</p></div>
  </div>
  <div style="display:grid;grid-template-columns:1.25fr 1fr;gap:14px;margin-top:14px">
    <div class="card" style="padding:16px 18px">
      <p class="h2">Siniestros repetidos por cada 100 viviendas de alto riesgo</p><p class="muted" style="font-size:12.5px;margin-bottom:12px">Con acción preventiva, frente a un grupo de control similar sin ella</p>
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:22px;align-items:end;height:200px;padding:0 10px">
        ${meses
          .map(
            (m, i) =>
              `<div style="display:grid;gap:6px;justify-items:center"><div style="display:flex;gap:6px;align-items:end;height:170px">${[
                [control[i], '#c7cbe8'],
                [accion[i], 'var(--red)'],
              ]
                .map(([v, col]) => `<div style="display:grid;justify-items:center;gap:3px"><span style="font-size:11px;font-weight:700">${v.toLocaleString('es-ES', { minimumFractionDigits: 1 })}</span><div style="width:30px;height:${Math.round((v / 6) * 140)}px;border-radius:5px 5px 2px 2px;background:${col}"></div></div>`)
                .join('')}</div><span class="muted" style="font-size:12px">${m}</span></div>`,
          )
          .join('')}
      </div>
      <div class="row" style="gap:16px;font-size:12px;margin-top:10px"><span class="row" style="gap:6px"><i style="width:12px;height:12px;border-radius:3px;background:#c7cbe8;display:inline-block"></i>Sin acción (control)</span><span class="row" style="gap:6px"><i style="width:12px;height:12px;border-radius:3px;background:var(--red);display:inline-block"></i>Con acción preventiva</span></div>
    </div>
    <div style="display:grid;gap:14px;align-content:start">
      <div class="card" style="padding:16px 18px">
        <p class="h2" style="margin-bottom:6px">Vigilancia de los modelos</p>
        ${[
          ['Repetición del siniestro', 'AUC 0,86 → 0,85 en septiembre', 'green', 'Estable'],
          ['Coste final', 'Error medio del 9 %', 'green', 'Estable'],
          ['Riesgo de fraude', 'Nuevo patrón en robos', 'amber', 'Revisar'],
          ['Baja del cliente', 'Piloto en 2 zonas', 'blue', 'En prueba'],
        ]
          .map(([n, d, c, e], i) => `<div class="row" style="padding:9px 0;${i ? 'border-top:1px solid var(--line)' : ''}"><div style="flex:1"><p style="font-weight:700;font-size:13.5px">${n}</p><p class="muted" style="font-size:12px">${d}</p></div><span class="chip ${c}">${e}</span></div>`)
          .join('')}
      </div>
      <div class="card row" style="padding:14px 16px;gap:10px"><span style="color:var(--red)">${ic('repeat', 20)}</span><p style="font-size:13.5px;line-height:1.4">Se reentrenan cada mes con los siniestros nuevos y <b>una persona aprueba</b> cada versión antes de usarla.</p></div>
    </div>
  </div>
  <div class="card" style="margin-top:14px;overflow:hidden">
    <div class="row" style="justify-content:space-between;padding:14px 18px 4px"><p class="h2">Acciones de esta semana</p><span class="muted" style="font-size:12px">Propuestas por los modelos, aprobadas por el equipo</span></div>
    <table>
      <tr><th style="padding-left:18px">Acción</th><th>Para quién</th><th class="num">Pólizas</th><th class="num">Coste</th><th class="num">Ahorro esperado</th><th>Estado</th></tr>
      ${[
        ['Revisión de fontanería y detector de fugas', 'Riesgo de repetición muy alto', '312', '56.160 €', '214.000 €', 'green', 'En marcha'],
        ['Llamada del mediador', 'Riesgo de baja alto', '486', '—', '61.000 € en primas', 'green', 'En marcha'],
        ['Revisión manual antes de pagar', 'Riesgo de fraude alto', '27', '—', '38.000 €', 'amber', 'Pendiente'],
      ]
        .map(([a, q, n, c, ah, k, e]) => `<tr><td style="padding-left:18px;font-weight:700">${a}</td><td>${q}</td><td class="num">${n}</td><td class="num">${c}</td><td class="num"><b>${ah}</b></td><td><span class="chip ${k}">${e}</span></td></tr>`)
        .join('')}
    </table>
  </div>
</div>`,
);

buildDesktop('seguros', { '1-datos': datos, '2-modelo': modelo, '3-prediccion': prediccion, '4-resultados': resultados }, { each: true });
