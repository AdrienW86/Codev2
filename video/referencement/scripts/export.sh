#!/usr/bin/env bash
# Export web du film /referencement : master Remotion → MP4 H.264 muets (1080p et 720p) + poster WebP.
# Usage : npm run referencement:export   (depuis video/)
# Film sans piste audio : il se comprend sans son et la page n'affiche donc pas de bouton « Écouter ».
set -euo pipefail
cd "$(dirname "$0")/../.."

OUT=out/referencement
SITE=../public/videos
POSTER_FRAME=300
mkdir -p "$OUT" "$SITE"

npx remotion render src/index.ts Referencement "$OUT/seo-master.mp4" --log=error
npx remotion still src/index.ts Referencement "$OUT/poster.png" --frame=$POSTER_FRAME --log=error

encode() { # $1 hauteur, $2 crf, $3 sortie
  ffmpeg -loglevel error -y -i "$OUT/seo-master.mp4" -an -vf "scale=-2:$1:flags=lanczos" \
    -c:v libx264 -preset veryslow -tune animation -crf "$2" -profile:v high -level 4.0 -pix_fmt yuv420p \
    -movflags +faststart "$3"
}
encode 1080 24 "$SITE/seo.mp4"
encode 720 25 "$SITE/seo-720.mp4"
ffmpeg -loglevel error -y -i "$OUT/poster.png" -vf "scale=1920:-2" -c:v libwebp -quality 82 "$SITE/seo-poster.webp"

ls -l "$SITE"/seo*
