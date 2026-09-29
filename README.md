# Web de DALESA

Web estática bilingüe (ES/EN) sin dependencias: solo hace falta Node.js.

## Editar contenido

| Qué | Dónde |
| --- | --- |
| Textos en español / inglés (servicios, casos, cifras, legal…) | `src/content/es.mjs` / `src/content/en.mjs` |
| Email, LinkedIn, dominio, formulario, datos fiscales | `site.config.mjs` |
| Colores de marca (`--accent`, `--accent-2`) | `public/styles.css` (al principio) |
| Logo y favicon | `public/favicon.svg` y `.brand-mark` en `public/styles.css` |
| Ilustraciones de los casos | `src/visuals.mjs` |

Lo que falta por rellenar aparece como `[PENDIENTE: …]` resaltado en amarillo, y el build dice cuántos quedan.

## Ver en local

```sh
node build.mjs && python3 -m http.server 4321 -d dist
# http://localhost:4321
```

## Publicar

```sh
./deploy.sh
```

Genera la web con la subruta del repo y la sube a la rama `gh-pages`, que es la que sirve GitHub Pages
(https://alfonsomariscal.github.io/dalesa-web/). La rama `main` guarda el código fuente.
También vale Netlify (`netlify.toml`) o cualquier hosting estático sirviendo `dist/`.

Antes de lanzar de verdad:
- `preview: false` y `url` con el dominio en `site.config.mjs` (activa indexación, canonical y sitemap).
- Con dominio propio en GitHub Pages, lanzar `BASE_PATH= ./deploy.sh` (sin subruta) y añadir el fichero `public/CNAME`.
- Configurar `formEndpoint` (p. ej. Formspree); sin él, el formulario abre el cliente de correo.
