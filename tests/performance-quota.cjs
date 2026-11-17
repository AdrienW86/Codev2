const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const vm = require('node:vm');
const exportsUnderTest = {};
const env = {UPSTASH_REDIS_REST_URL:'https://redis.invalid', UPSTASH_REDIS_REST_TOKEN:'test', CODEV_PERFORMANCE_SERVICE_KEY:'test-secret-with-at-least-24-characters'};
let response = {result:['allowed']}, commands = [];
vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/lib/performance/quota.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,{exports:exportsUnderTest,require,URL,AbortSignal,process:{env},fetch:async (url,options)=>{ commands.push(JSON.parse(options.body));return {ok:true,json:async()=>response}; }});
const {quotaKeys,reserveAudit} = exportsUnderTest;
const url='https://example.com/';
const k=quotaKeys(url,'mobile','192.0.2.1',env.CODEV_PERFORMANCE_SERVICE_KEY,new Date('2026-11-17T22:59:59Z'));
const next=quotaKeys(url,'mobile','192.0.2.1',env.CODEV_PERFORMANCE_SERVICE_KEY,new Date('2026-11-17T23:00:00Z'));
assert(k[1].endsWith('2026-11-17'));assert(next[1].endsWith('2026-11-18'));assert.notEqual(k[0],next[0]);assert(!k.join('').includes('192.0.2.1'));assert.equal(k[3],next[3]);
assert.notEqual(k[3],quotaKeys(url,'desktop','192.0.2.1',env.CODEV_PERFORMANCE_SERVICE_KEY)[3]);
(async()=>{
for(const status of ['personal','daily','monthly','busy']){response={result:[status]};await assert.rejects(()=>reserveAudit(url,'mobile','192.0.2.1',false),e=>e.status===429);}
response={error:'backend failure'};await assert.rejects(()=>reserveAudit(url,'mobile','192.0.2.1',false),e=>e.status===503);
response={result:['unexpected']};await assert.rejects(()=>reserveAudit(url,'mobile','192.0.2.1',false),e=>e.status===503);
response={result:['cached','invalid']};await assert.rejects(()=>reserveAudit(url,'mobile','192.0.2.1',false),e=>e.status===503);
const report={url,strategy:'mobile',checks:[]}; response={result:['cached',JSON.stringify(report)]};const hit=await reserveAudit(url,'mobile','192.0.2.1',false);assert.equal(hit.cached.url,url);
response={result:['allowed']};const reservation=await reserveAudit(url+'?private=1','mobile','192.0.2.1',false);response={result:1};await reservation.finish({...report,url:url+'?private=1'});assert.equal(commands.at(-1).at(-1),'');
delete env.UPSTASH_REDIS_REST_TOKEN; const before=commands.length;await assert.rejects(()=>reserveAudit(url,'mobile','192.0.2.1',false),e=>e.status===503);assert.equal(commands.length,before);
console.log('Quota: Paris midnight, keyed IP digest, all refusal states, cache validation, no query persistence and fail-closed configuration OK');
})().catch(e=>{console.error(e);process.exitCode=1;});
