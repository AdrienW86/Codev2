const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),ts=require('typescript');
let configured=false,user=null,reads=0;
const exportsObject={};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/app/outils/remplir-pdf/espace/editeur/page.tsx','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX}}).outputText,{
 exports:exportsObject,
 require(name){
  if(name==='@clerk/nextjs/server')return {currentUser:async()=>{reads++;return user;}};
  if(name==='@clerk/nextjs')return {UserButton:'UserButton'};
  if(name==='next/navigation')return {redirect:location=>{throw new Error('REDIRECT:'+location);}};
  if(name==='@/lib/pdf/access')return {pdfAuthConfigured:()=>configured,hasVerifiedEmail:u=>u?.emailAddresses.some(e=>e.verification?.status==='verified'),PDF_SIGN_IN:'/outils/remplir-pdf/espace/connexion'};
  if(name==='../../PdfEditor')return {default:'PdfEditor'};
  if(name.endsWith('.css'))return {default:{notice:'notice'}};
  return require(name);
 }
});
(async()=>{
 assert.equal(await exportsObject.default(),null);assert.equal(reads,0);
 configured=true;await assert.rejects(exportsObject.default,/REDIRECT:.*connexion/);
 user={emailAddresses:[{verification:{status:'unverified'}}]};assert.equal((await exportsObject.default()).type,'section');
 user={emailAddresses:[{verification:{status:'verified'}}]};assert.equal((await exportsObject.default()).type,'PdfEditor');
 console.log('PDF server route: missing keys, signed-out, unverified and verified users OK');
})().catch(e=>{console.error(e);process.exitCode=1});
