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
