const assert = require("node:assert/strict");
const fs = require("node:fs");
const ts = require("typescript");
const realRequire = require;
function load(path) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(path, "utf8"), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
  new Function("exports","require",code)(exports,id => id === "./audit" ? {normalizePublicUrl: v => new URL(v).toString()} : realRequire(id));
  return exports;
}
const {parseSeoPage} = load("src/lib/performance/crawler.ts");
const url = "https://www.example.com/";
const html = "<html><head><title>Un artisan et son service</title><meta name='description' content='Toiture et couverture'><meta name='robots' content='index,follow'><link rel='canonical' href='https://www.example.com/'></head><body><h1>Mon titre</h1><p>Un contenu de test</p><a href='/contact'>Contact</a><a href='https://other.com/'>Autre</a><img src='/a.png'><img src='/b.png' alt=''></body></html>";
const p = parseSeoPage(html,url);
assert.equal(p.title,"Un artisan et son service");
assert.equal(p.description,"Toiture et couverture");
assert.equal(p.canonical,url);
assert.deepEqual(p.h1,["Mon titre"]);
assert.deepEqual(p.internal,["https://www.example.com/contact"]);
assert.deepEqual(p.external,["https://other.com/"]);
assert.equal(p.missingAlt,1);
assert.equal(p.noindex,false);
assert.equal(parseSeoPage(html.replace("index,follow","noindex,follow"),url).noindex,true);
assert.equal(parseSeoPage(html,url,"noindex").noindex,true);
console.log("Crawler: titles, meta, canonical, H1, links, alt, robots validated");
