#!/usr/bin/env bash
# Export web du film /creation-site : master Remotion → MP4 H.264 + AAC (1080p et 720p) + poster WebP.
# Usage : npm run creation-site:export   (depuis video/)
# Voix off : déposer creation-site/audio/voiceover.wav (48 kHz) ; elle est mixée au-dessus de
# l'ambiance, qui s'efface automatiquement sous la voix. Sans ce fichier, seule l'ambiance est mixée.
set -euo pipefail
cd "$(dirname "$0")/../.."

OUT=out/creation-site
SITE=../public/videos
POSTER_FRAME=185
mkdir -p "$OUT" "$SITE"

npx remotion render src/index.ts CreationSite "$OUT/creation-site-master.mp4" --log=error
npx remotion still src/index.ts CreationSite "$OUT/poster.png" --frame=$POSTER_FRAME --log=error
python3 creation-site/audio/generate-ambiance.py "$OUT"

VOICE=creation-site/audio/voiceover.wav
if [ -f "$VOICE" ]; then
  ffmpeg -loglevel error -y -i "$OUT/music.wav" -i "$OUT/sfx.wav" -i "$VOICE" -filter_complex \
    "[0][1]amix=inputs=2:normalize=0[bed];[2]asplit[v1][v2];[bed][v1]sidechaincompress=threshold=0.03:ratio=6:attack=40:release=400[duck];[duck][v2]amix=inputs=2:normalize=0,loudnorm=I=-16:TP=-1.5:LRA=9" \
    -ar 48000 "$OUT/mix.wav"
else
  ffmpeg -loglevel error -y -i "$OUT/music.wav" -i "$OUT/sfx.wav" -filter_complex \
    "amix=inputs=2:normalize=0,loudnorm=I=-20:TP=-2:LRA=9" -ar 48000 "$OUT/mix.wav"
fi

encode() { # $1 hauteur, $2 crf, $3 sortie
  ffmpeg -loglevel error -y -i "$OUT/creation-site-master.mp4" -i "$OUT/mix.wav" \
    -map 0:v -map 1:a -vf "scale=-2:$1:flags=lanczos" \
    -c:v libx264 -preset veryslow -tune animation -crf "$2" -profile:v high -level 4.0 -pix_fmt yuv420p \
    -c:a aac -b:a 128k -ar 48000 -ac 2 -shortest -movflags +faststart "$3"
}
encode 1080 24 "$SITE/creation-site.mp4"
encode 720 25 "$SITE/creation-site-720.mp4"
ffmpeg -loglevel error -y -i "$OUT/poster.png" -vf "scale=1920:-2" -c:v libwebp -quality 82 "$SITE/creation-site-poster.webp"

ls -l "$SITE"/creation-site*
