const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),ts=require('typescript');
const cache=new Map();function load(file){file=path.resolve(file);if(cache.has(file))return cache.get(file);const exports={};cache.set(file,exports);vm.runInNewContext(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,{exports,URL,require:r=>load(r.startsWith('@/')?'src/'+r.slice(2)+'.ts':path.resolve(path.dirname(file),r+'.ts'))});return exports}
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const sources=walk('src');

// Polices : next/font auto-héberge DM Sans et Space Grotesk ; aucune requête navigateur vers Google Fonts.
const layout=fs.readFileSync('src/app/layout.tsx','utf8');
for(const font of ['DM_Sans','Space_Grotesk'])assert(new RegExp(`${font}\\(\\{[^}]*weight: \\["400", "500", "600", "700"\\]`).test(layout),`${font} : graisses 400 à 700 uniquement`);
assert(layout.includes('${dmSans.variable} ${spaceGrotesk.variable}'),'variables de police posées sur <html>');
for(const file of sources.filter(f=>/\.(css|tsx?)$/.test(f))){const text=fs.readFileSync(file,'utf8');assert(!text.includes('fonts.googleapis.com'),`${file} : pas d’import Google Fonts`);if(file.endsWith('.css'))assert(!/["'](DM Sans|Space Grotesk)["']/.test(text),`${file} : famille via var(--font-…), pas par son nom`)}

// Metadata : metadataBase, Twitter large image, image de partage officielle sur chaque page qui définit son Open Graph.
assert(layout.includes('metadataBase: new URL(siteOrigin)'));assert(layout.includes('card: "summary_large_image"'));
const seo=load('src/lib/seo.ts');const share=seo.defaultShareImages[0];assert.equal(share.width,1200);assert.equal(share.height,630);assert(fs.existsSync('public'+share.url),share.url);
for(const file of sources.filter(f=>f.endsWith('page.tsx'))){const text=fs.readFileSync(file,'utf8');if(/openGraph\s*:/.test(text))assert(/openGraph\s*:\s*\{[^{}]*images: defaultShareImages/.test(text),`${file} : image Open Graph`)}

// Données structurées : uniquement des informations publiées, aucun avis ni recherche interne inventés.
const org=seo.organizationSchema,site=seo.websiteSchema;assert.equal(org['@type'],'Organization');assert.equal(org.name,'CODE-V');assert.equal(org.url,'https://www.code-v.fr');assert(fs.existsSync('public'+new URL(org.logo).pathname),org.logo);
const legal=fs.readFileSync('src/app/mentions-legales/page.tsx','utf8');assert(legal.includes(org.email));assert(legal.includes(org.address.streetAddress)&&legal.includes(org.address.postalCode));
const all=JSON.stringify([org,site]);for(const banned of ['aggregateRating','review','potentialAction','SearchAction','sameAs','telephone'])assert(!all.includes(banned),banned);
const home=fs.readFileSync('src/app/page.tsx','utf8');assert(home.includes('jsonLd(organizationSchema)')&&home.includes('jsonLd(websiteSchema)'));
for(const [page,video] of [['src/app/creation-site/page.tsx','/videos/creation-site.mp4'],['src/app/referencement/page.tsx','/videos/seo.mp4']]){const text=fs.readFileSync(page,'utf8');assert(text.includes('jsonLd(filmSchema)'),page);assert(/uploadDate: "\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+0[12]:00"/.test(text),`${page} : uploadDate datée`);assert(text.includes('duration: "PT20S"'));assert(text.includes(`src: "${video}"`))}
const film=seo.getFilmSchema({name:'n',description:'d',poster:'/videos/seo-poster.webp',src:'/videos/seo.mp4',uploadDate:'2026-10-08T14:57:25+02:00',duration:'PT20S'});assert.equal(film.contentUrl,'https://www.code-v.fr/videos/seo.mp4');assert.equal(film.thumbnailUrl,'https://www.code-v.fr/videos/seo-poster.webp');assert.equal(seo.jsonLd({a:'</script>'}),'{"a":"\\u003c/script>"}');

// Vidéo Home : 1080p allégé + 720p mobile, H.264 faststart, choisis par MotionVideo.
const big=fs.statSync('public/videos/code-v-presentation.mp4').size,small=fs.statSync('public/videos/code-v-presentation-720.mp4').size;
assert(big<3.5e6,`1080p : ${big} octets`);assert(small<big*0.6,`720p : ${small} octets`);
for(const file of ['public/videos/code-v-presentation.mp4','public/videos/code-v-presentation-720.mp4']){const head=fs.readFileSync(file).subarray(0,64*1024);assert(head.includes('avc1'),`${file} : H.264`);assert(head.indexOf('moov')<head.indexOf('mdat')||head.indexOf('mdat')<0,`${file} : faststart`)}
assert(fs.readFileSync('src/components/home/Home.tsx','utf8').includes('srcSmall="/videos/code-v-presentation-720.mp4"'));
const motion=fs.readFileSync('src/components/media/MotionVideo.tsx','utf8');assert(motion.includes('matchMedia("(max-width: 900px)")'));assert(motion.includes('prefers-reduced-motion: reduce')&&motion.includes('saveData'),'reduced motion et Save-Data conservés');
console.log('Performance/SEO: next/font, metadataBase, Open Graph, Organization/WebSite/VideoObject et vidéo Home 1080p/720p OK');
