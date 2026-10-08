const assert=require('node:assert/strict'),fs=require('node:fs');
// Film /referencement : fichiers servis, intégration dans l'introduction, boucle muette et son à la demande.
const files={video:'public/videos/seo.mp4',small:'public/videos/seo-720.mp4',poster:'public/videos/seo-poster.webp'};
for(const file of Object.values(files))assert(fs.existsSync(file),file);
assert(fs.statSync(files.video).size<3_000_000,'MP4 1080p sous 3 Mo');assert(fs.statSync(files.small).size<2_000_000,'MP4 720p sous 2 Mo');assert(fs.statSync(files.poster).size<150_000,'poster WebP sous 150 Ko');
assert(fs.statSync(files.small).size<fs.statSync(files.video).size,'la version mobile est plus légère');
// faststart : l'atome moov précède mdat pour une lecture sans attendre la fin du fichier.
for(const file of [files.video,files.small]){const head=fs.readFileSync(file).subarray(0,4096).toString('latin1');assert(head.includes('moov'),`${file} : moov en tête (faststart)`);}
const page=fs.readFileSync('src/app/referencement/page.tsx','utf8');
assert.equal((page.match(/<NarrativeFilm\s/g)||[]).length,1);for(const file of Object.values(files))assert(page.includes(file.replace('public','')),file);
const film=page.indexOf('<NarrativeFilm');
assert(film>page.indexOf('id="intro-title"')&&film<page.indexOf('id="diagnostic"'),'film dans l’introduction, avant le diagnostic');
assert(!/<NarrativeFilm[^>]*audio=\{false\}/.test(page),'le film a une ambiance : bouton Écouter conservé');
assert(/<NarrativeFilm[^>]*\sloop[\s/>]/.test(page),'le film boucle tant qu’il est muet');
const component=fs.readFileSync('src/components/media/NarrativeFilm.tsx','utf8');
assert(/\{audio && <button/.test(component),'le bouton son dépend de la prop audio');
assert(/loop=\{loop && !sound\}/.test(component),'pas de boucle quand le son est activé');
// Piste audio AAC présente dans les deux versions.
for(const file of [files.video,files.small])assert(fs.readFileSync(file).includes('mp4a'),`${file} : piste AAC`);
console.log('Film /referencement : fichiers, faststart, audio AAC, emplacement, boucle muette et son à la demande OK');
