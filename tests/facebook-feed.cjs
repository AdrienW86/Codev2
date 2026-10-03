const assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),ts=require('typescript');
const env={};let request,fetchCount=0,mode='ok';
const secret='TEST_FACEBOOK_SECRET_DO_NOT_EXPOSE';
const good={id:'123_456',message:'Bonjour\nCODE-V',created_time:'2026-10-01T10:00:00+0000',permalink_url:'https://www.facebook.com/123/posts/456',attachments:{data:[{type:'photo',media:{image:{src:'https://scontent.xx.fbcdn.net/photo.jpg',width:1200,height:800}}}]}};
const output=ts.transpileModule(fs.readFileSync('src/lib/facebook-feed.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const mod={exports:{}};
vm.runInNewContext(output,{exports:mod.exports,require:n=>{assert.equal(n,'server-only');return{}},process:{env},URL,AbortSignal,Date,JSON,fetch:async(url,options)=>{fetchCount++;request={url,options};if(mode==='throw')throw new Error(secret);if(mode==='bad-json')return {ok:true,json:async()=>{throw new Error(secret)}};if(mode==='expired')return {ok:false,json:async()=>({error:{message:secret},paging:{next:secret}})};return {ok:true,json:async()=>mode==='empty'?{data:[]}:mode==='echo'?{data:[{...good,message:secret}]}:mode==='bad-shape'?{data:'bad'}:{data:[good,{...good,id:'123_457',message:'Sans image',attachments:null},{...good,id:'123_458',message:'Album',attachments:{data:[{type:'album',subattachments:{data:[{type:'photo',media:{image:{src:'https://scontent.xx.fbcdn.net/album.jpg',width:600,height:900}}}]}}]}},{...good,id:'123_459',permalink_url:'https://evil.example/'},{...good,id:'123_460',created_time:'invalid'}],paging:{next:'https://graph.facebook.com?access_token='+secret},other:secret}}}});
(async()=>{
const get=mod.exports.getFacebookFeed;
assert.equal((await get()).status,'unavailable');assert.equal(fetchCount,0);
env.FACEBOOK_ID='123';assert.equal((await get()).status,'unavailable');assert.equal(fetchCount,0);
env.FACEBOOK_TOKEN=secret;
let result=await get();assert.equal(result.status,'available');assert.equal(result.posts.length,3);assert(!JSON.stringify(result).includes(secret));assert(!JSON.stringify(result).includes('paging'));assert.equal(result.posts[0].message,good.message);assert(!result.posts[1].media);assert.equal(result.posts[2].media.width,600);
assert(!request.url.includes(secret));assert(!request.url.includes('access_token'));assert.equal(request.options.headers.Authorization,'Bearer '+secret);assert.equal(request.options.next.revalidate,300);assert(request.options.signal);assert(new URL(request.url).searchParams.get('fields').startsWith('id,message'));
for(mode of ['throw','bad-json','expired','bad-shape','echo']){result=await get();assert.equal(result.status,'unavailable');assert.equal(result.posts.length,0);assert(!JSON.stringify(result).includes(secret))}
mode='empty';assert.equal((await get()).status,'empty');console.log('Facebook server: missing variables, success, text-only/album, allowlists, expiry/errors, token guard, cache/timeout OK');
})().catch(e=>{console.error(e);process.exit(1)});
