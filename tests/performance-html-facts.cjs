const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),ts=require('typescript');
function load(file){const exports={};new Function('exports','require',ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText)(exports,id=>id.startsWith('./')?load(path.join(path.dirname(file),id+'.ts')):require(id));return exports;}
const {inspectHtml}=load('src/lib/performance/html-facts.ts');
const many=Array.from({length:40},(_,i)=>`<a href="/contact?service=${i}" rel="nofollow">Service ${i}</a><img src="/image-${i}.png" ${i%2?"alt=''":""}>`).join('');
const report=inspectHtml(`<html lang="fr"><head><title>Artisan &amp; métier</title><meta name="description" content="La description complète"><meta property="og:title" content="Partage"><meta name="viewport" content="width=device-width"><link rel="canonical" href="/?source=canonical"><link rel="alternate" hreflang="en" href="/en"><script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Organization","name":"CODE-V"}]}</script></head><body><nav>Navigation cachée</nav><h1>Artisan</h1><h3></h3><p>Artisan professionnel.</p>${many}<a href="https://www.linkedin.com/company/example">LinkedIn</a><a href="javascript:alert(1)">À inspecter sans exécuter</a><script>gtag('config','G-TEST')</script></body></html>`,'https://example.com/');
const section=id=>report.sections.find(s=>s.id===id);
assert(section('serp').rows.some(row=>row[1]==='Artisan & métier'));
assert.equal(section('headings').status,'warning');
assert(section('headings').rows.some(row=>row[1]==='H3'&&row[2]===''));
assert.equal(section('images').rows.length,40);assert.equal(section('images').rows.filter(row=>row[1]==='ABSENT').length,20);
assert.equal(section('links').rows.length,42);assert(section('links').rows.some(row=>row[0]==='https://example.com/contact?service=39'));
assert(section('links').rows.some(row=>row[0]==='javascript:alert(1)'&&row[2]==='Autre protocole'));
assert(section('alternates').rows.some(row=>row[2].endsWith('?source=canonical')));
assert(section('schema').rows.some(row=>row[1]==='Organization'&&row[3].includes('CODE-V')));
assert.equal(section('social').rows.length,1);
assert(section('tracking').rows.some(row=>row[0].includes('Google Analytics')&&row[1]==='Signature trouvée'));
assert(!section('terms').rows.some(row=>row[0]==='navigation'));
assert(inspectHtml('<h1>Test</h1><script type="application/ld+json">{invalid}</script>','https://example.com').sections.find(s=>s.id==='schema').status==='warning');
console.log('HTML inventories: every link/image, query strings, empty headings, structured data, tracking, vocabulary and safe text rendering OK');
