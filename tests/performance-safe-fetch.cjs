const assert=require('node:assert/strict'),fs=require('node:fs'),ts=require('typescript'),{EventEmitter}=require('node:events');
let addresses=[{address:'8.8.8.8',family:4}],all=true,requests=0,declared=0;
const exportsObject={};
new Function('exports','require','Buffer',ts.transpileModule(fs.readFileSync('src/lib/performance/safe-fetch.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText)(exportsObject,id=>{
 if(id==='node:dns/promises')return {lookup:async()=>addresses};
 if(id==='node:http'||id==='node:https')return {request:(url,options,onResponse)=>{
  requests++;const req=new EventEmitter();req.destroy=e=>{if(e)req.emit('error',e)};
  req.end=()=>{options.lookup(url.hostname,{all},(error,value,family)=>{assert.equal(error,null);if(all)assert.deepEqual(value,[{address:'8.8.8.8',family:4}]);else {assert.equal(value,'8.8.8.8');assert.equal(family,4);}});
   const res=new EventEmitter();Object.assign(res,{statusCode:200,httpVersion:'1.1',headers:{'content-type':'text/plain','content-length':declared,'server':'fixture','set-cookie':'never include this'},destroy:()=>{}});onResponse(res);queueMicrotask(()=>{res.emit('data',Buffer.from('User-agent: *\nAllow: /'));res.emit('end')});};return req;
 }};
 return require(id);
},Buffer);
(async()=>{
 for(const mode of [true,false]){all=mode;const r=await exportsObject.safeRead('https://example.com',new AbortController().signal,'text/plain',100);assert.equal(r.text,'User-agent: *\nAllow: /');assert.equal(r.address,'8.8.8.8');assert.equal(r.headers.server,'fixture');assert.equal(r.headers['set-cookie'],undefined);assert.equal(r.bytes,22);}
 for(const address of ['127.0.0.1','10.0.0.1','169.254.169.254','192.168.1.1','::1','::ffff:127.0.0.1','2001:db8::1']){addresses=[{address,family:address.includes(':')?6:4}];const before=requests;await assert.rejects(exportsObject.safeRead('https://example.com',new AbortController().signal,'text/plain',100),/non publique/);assert.equal(requests,before);}
 addresses=[{address:'8.8.8.8',family:4},{address:'127.0.0.1',family:4}];await assert.rejects(exportsObject.safeRead('https://example.com',new AbortController().signal,'text/plain',100),/non publique/);
 addresses=[{address:'8.8.8.8',family:4}];declared=200;await assert.rejects(exportsObject.safeRead('https://example.com',new AbortController().signal,'text/plain',100),/volumineuse/);
 console.log('Pinned DNS: Node 22 all:true and scalar callbacks, private/mixed addresses, header allowlist and size rejection OK');
})().catch(e=>{console.error(e);process.exitCode=1});
