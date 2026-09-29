#!/bin/sh
# Publica la web en GitHub Pages: genera en .deploy/ y la sube a la rama gh-pages.
set -e
cd "$(dirname "$0")"
REMOTE=$(git remote get-url origin)
REPO=$(basename -s .git "$REMOTE")

rm -rf .deploy
OUT_DIR=.deploy BASE_PATH="${BASE_PATH-/$REPO}" node build.mjs
touch .deploy/.nojekyll

cd .deploy
git init -q -b gh-pages
git add -A
git -c user.name="$(git -C .. config user.name)" -c user.email="$(git -C .. config user.email)" \
  commit -q -m "Publicación $(date '+%Y-%m-%d %H:%M')"
# Usa las credenciales de gh (no las del llavero), igual que el repo principal.
git -c credential.helper= -c credential.helper='!gh auth git-credential' push -q -f "$REMOTE" gh-pages
cd .. && rm -rf .deploy
echo "✔ Publicado en la rama gh-pages de $REPO"
