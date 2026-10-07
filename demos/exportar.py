# Pasa los montajes de las demos (demos/capturas/*/montaje.png) a WebP ligeros para la web,
# en public/proceso-completo/ (y el del caso textil en public/casos/), y guarda sus medidas en src/content/example-images.json. Se ejecuta después de regenerar alguna demo:
#   python3 demos/exportar.py
import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public' / 'proceso-completo'
OUT.mkdir(parents=True, exist_ok=True)

# Imagen de la web → (captura de origen, carpeta). Proceso completo de Montera y de Velarte, y el caso textil.
CAPT = ROOT / 'demos' / 'capturas'
CASOS = ROOT / 'public' / 'casos'
TARGETS = {
    'movil': (CAPT / 'movil' / 'montaje.png', OUT),
    'portal': (CAPT / 'portal' / 'montaje.png', OUT),
    'fiori': (CAPT / 'fiori' / 'montaje.png', OUT),
    'agente': (CAPT / 'agente' / 'montaje.png', OUT),
    'panel': (CAPT / 'panel' / 'montaje.png', OUT),
    'velarte-tienda': (CAPT / 'textil' / 'paso-tienda.png', OUT),
    'velarte-reposicion': (CAPT / 'textil' / 'paso-reposicion.png', OUT),
    'velarte-talla': (CAPT / 'textil' / 'paso-talla.png', OUT),
    'velarte-devoluciones': (CAPT / 'tallas' / 'montaje.png', OUT),
    'myonbank-descubrimiento': (CAPT / 'banca' / 'montaje-1-descubrimiento.png', OUT),
    'myonbank-especificacion': (CAPT / 'banca' / 'montaje-2-especificacion.png', OUT),
    'myonbank-generacion': (CAPT / 'banca' / 'montaje-3-generacion.png', OUT),
    'myonbank-paridad': (CAPT / 'banca' / 'montaje-4-paridad.png', OUT),
    'myonbank-app': (CAPT / 'banca-app' / 'montaje.png', OUT),
    'nordaria-datos': (CAPT / 'seguros' / 'montaje-1-datos.png', OUT),
    'nordaria-modelo': (CAPT / 'seguros' / 'montaje-2-modelo.png', OUT),
    'nordaria-prediccion': (CAPT / 'seguros' / 'montaje-3-prediccion.png', OUT),
    'nordaria-resultados': (CAPT / 'seguros' / 'montaje-4-resultados.png', OUT),
    'textil': (CAPT / 'textil' / 'montaje.png', CASOS),
}

sizes = {}
for name, (src, folder) in TARGETS.items():
    folder.mkdir(parents=True, exist_ok=True)
    im = Image.open(src).convert('RGBA')
    im = im.crop(im.getbbox())  # quita el margen transparente
    if im.width > 1600:
        im = im.resize((1600, round(1600 * im.height / im.width)), Image.LANCZOS)
    dest = folder / f'{name}.webp'
    im.save(dest, 'WEBP', quality=82, method=6)
    sizes[name] = [im.width, im.height]
    print(f'✔ {dest.relative_to(ROOT)} · {im.width}×{im.height} · {dest.stat().st_size // 1024} KB')

# Medidas que usa la web en los atributos width/height de cada imagen.
(ROOT / 'src' / 'content' / 'example-images.json').write_text(json.dumps(sizes, indent=2) + '\n')
