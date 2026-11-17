const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),ts=require('typescript');
const exportsObject={};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/app/outils/remplir-pdf/espace/editeur/page.tsx','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX}}).outputText,{
 exports:exportsObject,
 require(name){
  if(name==='../../PdfEditor')return {default:'PdfEditor'};
  if(name.endsWith('.css'))return {default:{notice:'notice'}};
  return require(name);
 }
});
(async()=>{
 assert.equal((await exportsObject.default()).type,'PdfEditor');
 console.log('PDF server route: editor available without session or authentication configuration');
})().catch(e=>{console.error(e);process.exitCode=1});
