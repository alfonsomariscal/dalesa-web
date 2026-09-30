// Ilustraciones SVG de los casos. Usan las variables de color de styles.css,
// así que se adaptan solas a la marca y al modo oscuro. `l` son los textos traducidos.

const svg = (label, inner) =>
  `<svg class="case-visual" viewBox="0 0 400 260" role="img" aria-label="${label}">${inner}</svg>`;
const text = (x, y, s, cls = 'v-label', anchor = 'middle') =>
  `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${s}</text>`;
const arrow = (x, y) =>
  `<path d="M${x} ${y}h36M${x + 26} ${y - 8}l10 8-10 8" class="v-arrow"/>`;

export const visuals = {
  // Aplicación antigua → aplicación moderna (móvil y web)
  modernize: (l) =>
    svg(
      l.alt,
      `
    <rect x="34" y="30" width="112" height="196" rx="10" class="v-old"/>
    <rect x="46" y="46" width="88" height="14" class="v-old-bar"/>
    ${[72, 92, 112, 132, 152].map((y) => `<rect x="46" y="${y}" width="88" height="12" class="v-old-row"/>`).join('')}
    <rect x="46" y="180" width="40" height="16" class="v-old-bar"/>
    ${text(90, 248, l.before)}
    ${arrow(172, 128)}
    <rect x="234" y="40" width="150" height="104" rx="8" class="v-card"/>
    <rect x="234" y="40" width="150" height="16" rx="8" class="v-soft"/>
    <circle cx="244" cy="48" r="2.5" class="v-accent"/><circle cx="252" cy="48" r="2.5" class="v-accent2"/>
    <rect x="246" y="66" width="70" height="8" rx="4" class="v-line"/>
    <rect x="246" y="82" width="120" height="44" rx="6" class="v-soft"/>
    <path d="M254 116l16-12 14 6 18-16 16 8 18-12 18 6" class="v-stroke"/>
    <rect x="224" y="92" width="80" height="140" rx="16" class="v-phone"/>
    <rect x="234" y="108" width="60" height="30" rx="8" class="v-grad"/>
    <rect x="234" y="146" width="60" height="10" rx="5" class="v-line"/>
    <rect x="234" y="162" width="44" height="10" rx="5" class="v-line"/>
    <rect x="234" y="186" width="60" height="22" rx="11" class="v-accent"/>
    ${text(304, 252, l.after)}`,
    ),

  // Documento → datos extraídos y validados
  extract: (l) =>
    svg(
      l.alt,
      `
    <path d="M40 30h92l28 28v168H40z" class="v-card"/>
    <path d="M132 30v28h28" class="v-fold"/>
    ${[72, 88, 104, 128, 144, 160, 184].map((y, i) => `<rect x="56" y="${y}" width="${[88, 70, 80, 88, 60, 76, 50][i]}" height="7" rx="3.5" class="v-line"/>`).join('')}
    <rect x="52" y="122" width="96" height="46" rx="6" class="v-highlight"/>
    ${text(100, 248, l.before)}
    ${arrow(178, 128)}
    ${l.fields
      .map(
        (f, i) => `
    <rect x="232" y="${40 + i * 48}" width="148" height="38" rx="10" class="v-card"/>
    <circle cx="252" cy="${59 + i * 48}" r="9" class="${i === l.fields.length - 1 ? 'v-accent2' : 'v-accent'}"/>
    <path d="M247.5 ${59 + i * 48}l3 3 6-6" class="v-check"/>
    ${text(270, 63 + i * 48, f, 'v-field', 'start')}`,
      )
      .join('')}
    ${text(306, 248, l.after)}`,
    ),

  // App de cliente (declarar siniestro con fotos) → app del perito en campo
  claim: (l) =>
    svg(
      l.alt,
      `
    <rect x="44" y="24" width="108" height="206" rx="18" class="v-phone"/>
    <rect x="56" y="40" width="84" height="10" rx="5" class="v-line"/>
    ${[[56, 58], [100, 58], [56, 102], [100, 102]]
      .map(
        ([x, y], i) => `<rect x="${x}" y="${y}" width="40" height="38" rx="6" class="${i === 3 ? 'v-highlight' : 'v-soft'}"/>
    ${i < 3 ? `<path d="M${x + 8} ${y + 28}l9-10 7 7 5-5 6 8" class="v-stroke" style="stroke-width:1.5"/><circle cx="${x + 29}" cy="${y + 11}" r="3" class="v-accent2"/>` : `<path d="M${x + 20} ${y + 12}v14M${x + 13} ${y + 19}h14" class="v-stroke"/>`}`,
      )
      .join('')}
    <rect x="56" y="152" width="84" height="8" rx="4" class="v-line"/>
    <rect x="56" y="166" width="60" height="8" rx="4" class="v-line"/>
    <rect x="56" y="188" width="84" height="26" rx="13" class="v-accent"/>
    ${text(98, 205, l.button, 'v-btn')}
    ${text(98, 250, l.before)}
    ${arrow(172, 126)}
    <rect x="230" y="36" width="150" height="180" rx="16" class="v-card"/>
    <circle cx="252" cy="60" r="10" class="v-soft"/>
    <path d="M247 60h10M252 55v10" class="v-stroke" style="stroke-width:1.5"/>
    ${text(270, 64, l.visit, 'v-field', 'start')}
    ${l.items
      .map(
        (s, i) => `
    <circle cx="252" cy="${100 + i * 36}" r="9" class="${i === l.items.length - 1 ? 'v-accent2' : 'v-accent'}"/>
    <path d="M247.5 ${100 + i * 36}l3 3 6-6" class="v-check"/>
    ${text(270, 104 + i * 36, s, 'v-field', 'start')}`,
      )
      .join('')}
    ${text(305, 250, l.after)}`,
    ),

  // Curva de curación por lote con objetivo
  curve: (l) =>
    svg(
      l.alt,
      `
    <defs><linearGradient id="v-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="v-stop-a"/><stop offset="1" class="v-stop-b"/></linearGradient></defs>
    <path d="M56 28v184h320" class="v-axis"/>
    ${[68, 108, 148].map((y) => `<path d="M56 ${y}h320" class="v-grid"/>`).join('')}
    <path d="M60 50C120 60 150 110 200 132S300 168 370 174V212H60z" fill="url(#v-area)"/>
    <path d="M60 50C120 60 150 110 200 132S300 168 370 174" class="v-stroke v-stroke-lg"/>
    <path d="M60 64C130 80 160 130 210 150S300 186 370 192" class="v-stroke v-stroke-2"/>
    <path d="M56 162h320" class="v-target"/>
    ${text(372, 156, l.target, 'v-small', 'end')}
    ${[[60, 50], [120, 66], [200, 132], [290, 162], [370, 174]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.5" class="v-dot"/>`).join('')}
    <rect x="236" y="36" width="130" height="50" rx="10" class="v-card"/>
    ${text(250, 56, l.chipTitle, 'v-small', 'start')}
    <rect x="250" y="66" width="100" height="8" rx="4" class="v-soft"/>
    <rect x="250" y="66" width="72" height="8" rx="4" class="v-accent2"/>
    ${text(46, 36, l.y, 'v-small', 'end')}
    ${text(376, 234, l.x, 'v-small', 'end')}`,
    ),

  // Características del usuario → talla recomendada + informe
  sizes: (l) =>
    svg(
      l.alt,
      `
    ${l.inputs
      .map(
        (s, i) => `
    <rect x="28" y="${44 + i * 46}" width="132" height="34" rx="17" class="v-card"/>
    <circle cx="46" cy="${61 + i * 46}" r="6" class="v-accent"/>
    ${text(60, 65 + i * 46, s, 'v-field', 'start')}`,
      )
      .join('')}
    ${text(94, 248, l.before)}
    ${arrow(174, 110)}
    <rect x="226" y="30" width="150" height="160" rx="14" class="v-card"/>
    ${text(301, 56, l.result, 'v-small')}
    <text x="301" y="112" class="v-big" text-anchor="middle">M</text>
    ${['S', 'M', 'L', 'XL']
      .map((s, i) => {
        const h = [18, 40, 24, 10][i];
        return `<rect x="${246 + i * 30}" y="${172 - h}" width="20" height="${h}" rx="4" class="${s === 'M' ? 'v-grad' : 'v-soft'}"/>`;
      })
      .join('')}
    ${text(301, 214, l.confidence, 'v-small')}
    ${text(301, 248, l.after)}`,
    ),
};

// Ilustraciones de cabecera de cada servicio (sin texto, valen para los dos idiomas).
const art = (inner) => `<svg class="service-art" viewBox="0 0 320 170" aria-hidden="true">${inner}</svg>`;

export const serviceArt = {
  // Agente de IA: conversación + documentos procesados
  ia: art(`
    <rect x="22" y="22" width="150" height="40" rx="14" class="v-card"/>
    <rect x="36" y="36" width="96" height="6" rx="3" class="v-line"/><rect x="36" y="47" width="64" height="6" rx="3" class="v-line"/>
    <rect x="96" y="74" width="178" height="52" rx="14" class="v-grad-fill"/>
    <rect x="112" y="89" width="120" height="6" rx="3" class="v-white"/><rect x="112" y="101" width="140" height="6" rx="3" class="v-white" opacity=".7"/><rect x="112" y="113" width="84" height="6" rx="3" class="v-white" opacity=".7"/>
    <circle cx="286" cy="70" r="16" class="v-card"/>
    <path d="M280 70h12M286 64v12" class="v-stroke" style="stroke-width:2"/>
    <g class="v-float">
      <rect x="30" y="112" width="44" height="52" rx="8" class="v-card"/>
      <rect x="38" y="124" width="28" height="4" rx="2" class="v-line"/><rect x="38" y="133" width="22" height="4" rx="2" class="v-line"/><rect x="38" y="142" width="26" height="4" rx="2" class="v-line"/>
      <circle cx="70" cy="114" r="8" class="v-accent2"/><path d="M66.5 114l2.5 2.5 4.5-4.5" class="v-check"/>
    </g>
    <path d="M262 22l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" class="v-accent2 v-twinkle"/>
    <path d="M232 138l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" class="v-accent v-twinkle" style="animation-delay:.8s"/>`),

  // Proceso: pasos conectados, uno eliminado y otro automatizado
  procesos: art(`
    <path d="M62 50h56M150 50h28M210 50c24 0 24 60 48 60M62 110h120" class="v-link"/>
    <path d="M62 50h56M150 50h28M210 50c24 0 24 60 48 60M62 110h120" class="v-link-flow"/>
    <rect x="22" y="32" width="40" height="36" rx="10" class="v-card"/><circle cx="42" cy="50" r="6" class="v-accent"/>
    <rect x="118" y="32" width="32" height="36" rx="10" class="v-dashed"/><path d="M128 44l12 12M140 44l-12 12" class="v-x"/>
    <rect x="178" y="32" width="32" height="36" rx="10" class="v-card"/><circle cx="194" cy="50" r="6" class="v-accent"/>
    <rect x="22" y="92" width="40" height="36" rx="10" class="v-card"/><circle cx="42" cy="110" r="6" class="v-accent"/>
    <rect x="182" y="90" width="120" height="40" rx="12" class="v-grad-fill"/>
    <path d="M204 101l-6 10h7l-4 9 11-13h-7l4-6z" class="v-white"/>
    <rect x="224" y="104" width="62" height="6" rx="3" class="v-white"/><rect x="224" y="114" width="40" height="6" rx="3" class="v-white" opacity=".7"/>
    <rect x="236" y="36" width="66" height="28" rx="14" class="v-soft"/>
    <path d="M250 50h38" class="v-stroke" style="stroke-width:3"/><circle cx="276" cy="50" r="5" class="v-accent2"/>`),

  // Modernización: web + móvil renovados
  modernizacion: art(`
    <rect x="22" y="20" width="200" height="130" rx="12" class="v-card"/>
    <rect x="22" y="20" width="200" height="20" rx="12" class="v-soft"/>
    <circle cx="36" cy="30" r="3" class="v-accent"/><circle cx="46" cy="30" r="3" class="v-accent2"/><circle cx="56" cy="30" r="3" class="v-line"/>
    <rect x="36" y="52" width="70" height="8" rx="4" class="v-line"/>
    <rect x="36" y="68" width="112" height="66" rx="8" class="v-soft"/>
    <path d="M46 120l18-16 16 8 18-22 16 10 22-20" class="v-stroke v-draw"/>
    <rect x="158" y="68" width="50" height="30" rx="6" class="v-soft"/><rect x="158" y="104" width="50" height="30" rx="6" class="v-soft"/>
    <rect x="232" y="38" width="72" height="124" rx="16" class="v-phone"/>
    <rect x="244" y="54" width="48" height="26" rx="8" class="v-grad-fill"/>
    <rect x="244" y="88" width="48" height="8" rx="4" class="v-line"/><rect x="244" y="102" width="36" height="8" rx="4" class="v-line"/>
    <rect x="244" y="130" width="48" height="18" rx="9" class="v-accent"/>
    <g class="v-spin"><path d="M281 18a12 12 0 1 1-12-6" class="v-stroke" style="stroke-width:2.5"/><path d="M266 8l4 4-5 3" class="v-stroke" style="stroke-width:2.5"/></g>`),
};

// Gráfico del hero: horas en tareas manuales antes y después (ilustrativo).
export const heroChart = (l) => {
  const bars = [62, 58, 64, 60, 34, 26, 20, 16];
  return `<svg class="hero-chart" viewBox="0 0 200 84" role="img" aria-label="${l.title}">
    ${bars
      .map(
        (h, i) =>
          `<rect x="${6 + i * 24}" y="${72 - h}" width="14" height="${h}" rx="4" class="${i < 4 ? 'v-bar-old' : 'v-bar-new'}" style="--i:${i}"/>`,
      )
      .join('')}
    <path d="M100 4v70" class="v-divider"/>
  </svg>`;
};

// Red de nodos decorativa detrás del hero.
export const heroNetwork = () => {
  const n = [[40, 60], [150, 30], [260, 90], [360, 40], [90, 170], [210, 200], [330, 180], [440, 120], [470, 230], [120, 280], [280, 300], [400, 300]];
  const e = [[0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [5, 2], [5, 6], [6, 3], [6, 7], [7, 3], [7, 8], [4, 9], [9, 10], [10, 5], [10, 11], [11, 8], [6, 11]];
  return `<svg class="hero-network" viewBox="0 0 500 340" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    ${e.map(([a, b]) => `<line x1="${n[a][0]}" y1="${n[a][1]}" x2="${n[b][0]}" y2="${n[b][1]}"/>`).join('')}
    ${n.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i % 3 ? 3 : 4.5}" style="--i:${i}"/>`).join('')}
  </svg>`;
};
