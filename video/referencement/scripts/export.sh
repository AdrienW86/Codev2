#!/usr/bin/env bash
# Export web du film /referencement : master Remotion → MP4 H.264 + AAC (1080p et 720p) + poster WebP.
# Usage : npm run referencement:export   (depuis video/)
# Ambiance et micro-effets synthétisés par audio/generate-ambiance.py, mixés bas (−20 LUFS, crête −2 dBTP).
# Le film se comprend sans son : la page le lance muet et propose « Écouter ».
set -euo pipefail
cd "$(dirname "$0")/../.."

OUT=out/referencement
SITE=../public/videos
POSTER_FRAME=300
mkdir -p "$OUT" "$SITE"

npx remotion render src/index.ts Referencement "$OUT/seo-master.mp4" --log=error
npx remotion still src/index.ts Referencement "$OUT/poster.png" --frame=$POSTER_FRAME --log=error
python3 referencement/audio/generate-ambiance.py "$OUT"
ffmpeg -loglevel error -y -i "$OUT/music.wav" -i "$OUT/sfx.wav" -filter_complex \
  "amix=inputs=2:normalize=0,loudnorm=I=-20:TP=-2:LRA=9" -ar 48000 "$OUT/mix.wav"

encode() { # $1 hauteur, $2 crf, $3 sortie, $4 débit audio
  ffmpeg -loglevel error -y -i "$OUT/seo-master.mp4" -i "$OUT/mix.wav" \
    -map 0:v -map 1:a -vf "scale=-2:$1:flags=lanczos" \
    -c:v libx264 -preset veryslow -tune animation -crf "$2" -profile:v high -level 4.0 -pix_fmt yuv420p \
    -c:a aac -b:a "$4" -ar 48000 -ac 2 -shortest -movflags +faststart "$3"
}
encode 1080 24 "$SITE/seo.mp4" 128k
encode 720 25 "$SITE/seo-720.mp4" 96k
ffmpeg -loglevel error -y -i "$OUT/poster.png" -vf "scale=1920:-2" -c:v libwebp -quality 82 "$SITE/seo-poster.webp"

ls -l "$SITE"/seo*
