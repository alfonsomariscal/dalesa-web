# Web de DALESA

Web estática bilingüe (ES/EN) sin dependencias: solo hace falta Node.js.

## Editar contenido

| Qué | Dónde |
| --- | --- |
| Textos en español / inglés (servicios, casos, cifras, legal…) | `src/content/es.mjs` / `src/content/en.mjs` |
| Empresas con las que ha trabajado el equipo (logos en `public/logos/`) | `src/content/clients.mjs` |
| Email, teléfonos, WhatsApp, LinkedIn, dominio, datos fiscales | `site.config.mjs` |
| Correos que reciben los formularios (contacto y «Te llamamos») | `notify` en `site.config.mjs` |
| IA responsable y preguntas frecuentes de la portada | `home.responsible` y `home.faq` en `src/content/es.mjs` / `en.mjs` |
| Imagen al compartir en WhatsApp/LinkedIn | `public/brand/og-es.png` y `og-en.png` (1200×630) |
| Colores de los tres diseños (violeta, dorado, blanco y negro) | `public/styles.css` (al principio: `:root`, `[data-theme="oro"]`, `[data-theme="mono"]`) |
| Logo (máscaras que se pintan con el color del diseño) y favicons | `public/brand/` y `.brand-mark` / `.brand-word` en `public/styles.css` |
| Ilustraciones (casos, servicios, hero) | `src/visuals.mjs` |
| Iconos (Lucide, ISC) | `src/icons.mjs`; para añadir uno, copiar su SVG de lucide.dev |
| Tipografía (Manrope, OFL) | `public/fonts/` |

Lo que falta por rellenar aparece como `[PENDIENTE: …]` resaltado en amarillo, y el build dice cuántos quedan.

## Diseños de color

El selector de arriba a la derecha cambia entre los tres diseños y recuerda la elección en el navegador.
Se puede enlazar uno directamente con `?diseno=violeta`, `?diseno=oro` o `?diseno=mono`.

## Demos (capturas de proyectos de ejemplo)

Cinco demos de Montera (las usa la página «Proceso completo»), una distribuidora alimentaria **ficticia**, para enseñar el tipo de trabajo sin usar
material de clientes. Cada una tiene su código en `demos/<nombre>/build.mjs` y genera sus capturas en
`public/demos/<nombre>/` (incluido `montaje.png`, con la pantalla dentro de un móvil o un portátil):

| Demo | Carpeta |
| --- | --- |
| App móvil del comercial en ruta | `demos/movil` |
| App SAP Fiori de aprobación de pedidos (OpenUI5, tema Horizon en rojo) | `demos/fiori` |
| Portal web de clientes | `demos/portal` |
| Agente de IA que revisa facturas de proveedores | `demos/agente` |
| Panel de ventas y previsión de demanda | `demos/panel` |

Para regenerar una tras cambiar textos o datos: `node demos/<nombre>/build.mjs` (Node 20+, con Chrome
instalado; la de Fiori necesita conexión para cargar OpenUI5).

## Ver en local

```sh
node build.mjs && python3 -m http.server 4321 -d dist
# http://localhost:4321
```

## Publicar

Cada push a `main` genera y publica la web en GitHub Pages con GitHub Actions
(`.github/workflows/deploy.yml`): https://alfonsomariscal.github.io/dalesa-web/
El progreso se ve en la pestaña *Actions* del repo.
También vale Netlify (`netlify.toml`) o cualquier hosting estático sirviendo `dist/`.

Antes de lanzar de verdad:
- `preview: false` y `url` con el dominio en `site.config.mjs` (activa indexación, canonical y sitemap).
- Con dominio propio en GitHub Pages, poner `BASE_PATH: ''` en el workflow y configurar el dominio en *Settings → Pages*.
- Configurar `formEndpoint` (p. ej. Formspree); sin él, el formulario abre el cliente de correo.
