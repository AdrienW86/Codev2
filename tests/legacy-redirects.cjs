const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),ts=require('typescript');
// Anciennes routes encore vues dans Search Console : 301 vers la page actuelle équivalente, rien d'arbitraire.
const config={};vm.runInNewContext(ts.transpileModule(fs.readFileSync('next.config.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,{exports:config,require:()=>({})});
(async()=>{const redirects=JSON.parse(JSON.stringify(await config.default.redirects()));
assert.deepEqual(redirects.map(r=>[r.source,r.destination,r.statusCode]),[['/sites','/creation-site',301],['/ads','/publicite',301],['/mentions','/mentions-legales',301]]);
for(const r of redirects){assert(fs.existsSync('src/app'+r.destination+'/page.tsx'),r.destination);assert(!fs.existsSync('src/app'+r.source),r.source);assert.equal(r.permanent,undefined)}
assert(!redirects.some(r=>r.source==='/conditions-generales'),'pas d’équivalent actuel : 404 assumé');
assert(!redirects.some(r=>r.has),'domaine canonique géré par Vercel, pas par Next');
console.log('Redirections : /sites, /ads et /mentions en 301 vers leurs pages actuelles ; /conditions-generales sans redirection OK')})().catch(e=>{console.error(e);process.exit(1)});
