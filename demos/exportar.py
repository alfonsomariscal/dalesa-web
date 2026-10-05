# Pasa los montajes de las demos (demos/capturas/*/montaje.png) a WebP ligeros para la web,
# en public/proceso-completo/, y guarda sus medidas en src/content/example-images.json. Se ejecuta después de regenerar alguna demo:
#   python3 demos/exportar.py
import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public' / 'proceso-completo'
OUT.mkdir(parents=True, exist_ok=True)

sizes = {}
for name in ['movil', 'portal', 'fiori', 'agente', 'panel']:
    im = Image.open(ROOT / 'demos' / 'capturas' / name / 'montaje.png').convert('RGBA')
    im = im.crop(im.getbbox())  # quita el margen transparente
    if im.width > 1600:
        im = im.resize((1600, round(1600 * im.height / im.width)), Image.LANCZOS)
    dest = OUT / f'{name}.webp'
    im.save(dest, 'WEBP', quality=82, method=6)
    sizes[name] = [im.width, im.height]
    print(f'✔ {dest.relative_to(ROOT)} · {im.width}×{im.height} · {dest.stat().st_size // 1024} KB')

# Medidas que usa la web en los atributos width/height de cada imagen.
(ROOT / 'src' / 'content' / 'example-images.json').write_text(json.dumps(sizes, indent=2) + '\n')
