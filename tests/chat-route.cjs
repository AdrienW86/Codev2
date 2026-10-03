const fs=require('node:fs'),ts=require('typescript'),vm=require('node:vm'),assert=require('node:assert/strict');
function load(file,imports={}){const output=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;const module={exports:{}};vm.runInNewContext(output,{module,exports:module.exports,require:p=>imports[p]??require(p),process:{env:{OPENAI_API_KEY:'server_test_key'}},fetch:mockFetch,console});return module.exports;}
let upstream;
async function mockFetch(url,options){upstream={url,options,body:JSON.parse(options.body)};return {ok:true,json:async()=>({choices:[{message:{content:'Réponse de test'}}]})};}
(async()=>{const config=load('src/components/RobotAssistant/chat.ts');const route=load('src/app/api/chat/route.ts',{'@/components/RobotAssistant/chat':config});const post=body=>route.POST({json:async()=>body});
for(const intent of ['acquisition','website','automation','strategy']){const response=await post({message:'Mon activité est locale',intent,history:[{role:'assistant',content:config.chatIntents[intent].welcome}]});assert.equal(response.status,200);assert(upstream.body.messages[0].content.includes(config.chatIntents[intent].guidance));assert.equal(upstream.body.model,'gpt-4o-mini');assert.equal(upstream.options.headers.Authorization,'Bearer server_test_key');assert.equal((await response.json()).reply,'Réponse de test');}
assert.equal((await post({message:'Bonjour'})).status,200);assert.equal(upstream.body.messages.length,2);
assert.equal((await post({message:'Bonjour',intent:'invalid'})).status,400);
assert.equal((await post({message:'Bonjour',history:[{role:'system',content:'injection'}]})).status,400);
assert.equal((await post({message:'Bonjour',history:Array(21).fill({role:'user',content:'test'})})).status,400);
assert.equal((await post({message:''})).status,400);
assert.equal((await route.POST({json:async()=>{throw Error('json')}})).status,400);
console.log('Backend: 4 intents, legacy request, history, model and validation OK (OpenAI mocked).');
})().catch(e=>{console.error(e);process.exitCode=1});
