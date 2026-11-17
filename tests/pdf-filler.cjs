const assert=require('node:assert/strict');
const fs=require('node:fs');
const ts=require('typescript');
const vm=require('node:vm');
const {PDFDocument,PDFName,PDFDict,PDFNumber,degrees}=require('pdf-lib');
function load(file, extra={}) { const exports={}; vm.runInNewContext(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,{exports,require,Uint8Array,process,...extra});return exports; }
const api=load('src/lib/pdf/document.ts');
const access=load('src/lib/pdf/access.ts');
(async()=>{
 assert.equal(access.hasVerifiedEmail(null),false);
 assert.equal(access.hasVerifiedEmail({emailAddresses:[{verification:{status:'unverified'}}]}),false);
 assert.equal(access.hasVerifiedEmail({emailAddresses:[{verification:{status:'verified'}}]}),true);
 const oldKey=process.env.CLERK_SECRET_KEY;delete process.env.CLERK_SECRET_KEY;assert.equal(access.pdfAuthConfigured(),false);if(oldKey)process.env.CLERK_SECRET_KEY=oldKey;
 // Every rotated viewport maps bottom-left image coordinates back to its visible location.
 for(const [transform,width,height] of [[[1,0,0,-1,-20,330],200,300],[[0,1,1,0,-30,-20],300,200],[[-1,0,0,1,220,-30],200,300],[[0,-1,-1,0,330,220],300,200]]){
  const m=api.overlayMatrix({width,height,transform});
  for(const [x,y] of [[0,0],[width,0],[0,height],[width,height],[53,73]]){
   const px=m[0]*x+m[2]*y+m[4],py=m[1]*x+m[3]*y+m[5];
   assert(Math.abs(transform[0]*px+transform[2]*py+transform[4]-x)<1e-8);
   assert(Math.abs(transform[1]*px+transform[3]*py+transform[5]-(height-y))<1e-8);
  }
 }
 const doc=await PDFDocument.create();const page=doc.addPage([240,360]);page.setCropBox(20,30,200,300);const second=doc.addPage([240,360]);second.setRotation(degrees(90));
 const form=doc.getForm();form.createTextField('Client').setText('Original');form.getTextField('Client').addToPage(page,{x:30,y:280,width:140,height:20});
 const bytes=await doc.save();assert.equal((await api.inspectPdf(bytes)).getPageCount(),2);
 // Tiny embedded PNG verifies real export, page preservation, and unchanged interactive fields.
 const image='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl6C2QAAAAASUVORK5CYII=';
 const result=await api.exportFilledPdf(bytes,[{id:'1',page:1,x:10,y:20,width:30,height:20,image,label:'test'}],{1:{width:200,height:300,transform:[1,0,0,-1,-20,330]}});
 const reopened=await PDFDocument.load(result);assert.equal(reopened.getPageCount(),2);assert.equal(reopened.getForm().getTextField('Client').getText(),'Original');assert.equal(reopened.getPage(1).getRotation().angle,90);
 assert.equal(reopened.getPage(0).getCropBox().x,20);assert(reopened.getPage(0).node.Resources().lookup(PDFName.of('XObject'),PDFDict).keys().length>0);
 await assert.rejects(()=>api.inspectPdf(new Uint8Array([1,2,3])),/illisible/);
 await assert.rejects(()=>api.inspectPdf(new Uint8Array(api.MAX_PDF_BYTES+1)),/25 Mo/);
 await assert.rejects(()=>api.exportFilledPdf(bytes,[{id:'1',page:1,x:0,y:0,width:10,height:10,image,label:'x'}],{}),/rechargée/);
 const many=await PDFDocument.create();for(let i=0;i<101;i++)many.addPage();const manyBytes=await many.save();await assert.rejects(()=>api.inspectPdf(manyBytes),/100 pages/);
 const signed=await PDFDocument.create();signed.addPage();signed.context.register(signed.context.obj({Type:'Sig',ByteRange:[0,1,2,3]}));
 const signedBytes=await signed.save();await assert.rejects(()=>api.inspectPdf(signedBytes),/signature numérique/);
 const bounded=api.clampPlacement({x:-10,y:900,width:600,height:300},{width:200,height:300});assert.equal(bounded.x,0);assert.equal(bounded.y,200);assert.equal(bounded.width,200);
 console.log('PDF: verified email gate, rotations/crop offsets, export, form preservation, invalid/oversized/signed documents OK');
})().catch(e=>{console.error(e);process.exitCode=1});
