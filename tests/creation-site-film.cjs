const assert=require('node:assert/strict'),fs=require('node:fs');
// Film /creation-site : fichiers servis, intégration à la page et garde-fous de lecture.
const files={video:'public/videos/creation-site.mp4',small:'public/videos/creation-site-720.mp4',poster:'public/videos/creation-site-poster.webp'};
for(const file of Object.values(files))assert(fs.existsSync(file),file);
assert(fs.statSync(files.video).size<3_000_000,'MP4 1080p sous 3 Mo');assert(fs.statSync(files.small).size<2_000_000,'MP4 720p sous 2 Mo');assert(fs.statSync(files.poster).size<150_000,'poster WebP sous 150 Ko');
const page=fs.readFileSync('src/app/creation-site/page.tsx','utf8');
assert.equal((page.match(/<NarrativeFilm\s/g)||[]).length,1);for(const file of Object.values(files))assert(page.includes(file.replace('public','')),file);
assert(page.indexOf('<NarrativeFilm')>page.indexOf('id="needs-title"')&&page.indexOf('<NarrativeFilm')<page.indexOf('id="formats-title"'),'film entre le constat et les formats');
const film=fs.readFileSync('src/components/media/NarrativeFilm.tsx','utf8');
for(const guard of ['prefers-reduced-motion: reduce','saveData','IntersectionObserver','playsInline','visibilitychange','currentTime = 0','aria-pressed'])assert(film.includes(guard),guard);
assert(!/\scontrols[\s=>]/.test(film),'pas de contrôles natifs');
assert(!film.includes('autoPlay'),'lecture lancée par le script, jamais par l’attribut autoplay');
assert(/muted=\{!sound\}/.test(film),'muet tant que le son n’est pas demandé');
console.log('Film /creation-site : fichiers, emplacement, lecture muette, son au début, mouvement réduit et Save-Data OK');
