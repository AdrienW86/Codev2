const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
function load(file) { const exports = {}; new Function('exports', 'require', 'URL', 'Uint8Array', ts.transpileModule(fs.readFileSync(file, 'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,esModuleInterop:true}}).outputText)(exports, (id) => id.startsWith('./') ? load(require('node:path').join(require('node:path').dirname(file),id+'.ts')) : require(id), URL, Uint8Array); return exports; }
const {extractAudit} = load('src/lib/performance/audit.ts');
const {createAuditPdf} = load('src/lib/performance/report-pdf.ts');
const {buildInsights, buildActionPlan} = load('src/lib/performance/insights.ts');
const audits = {title:{title:'Titre absent',description:'Ajouter un [titre](https://example.com) descriptif.',score:0,details:{items:[{node:{snippet:'<title>😀</title>'}}]}},pass:{title:'HTTPS',score:1},manual:{title:'Vérification',score:null,scoreDisplayMode:'manual'},na:{title:'Sans objet',score:null,scoreDisplayMode:'notApplicable'},error:{title:'Non mesuré',score:null,scoreDisplayMode:'error'}};
const report=extractAudit({lighthouseResult:{categories:{seo:{score:.5,auditRefs:Object.keys(audits).map(id=>({id}))}},audits}},'https://example.com','mobile');
assert.equal(report.checks.length,5);
assert.equal(report.checks[0].description,'Ajouter un titre descriptif.');
assert.equal(report.checks[0].examples[0],'<title>😀</title>');
assert.equal(report.checks.map(c=>c.status).join(','),'failed,passed,manual,notApplicable,unavailable');
assert.equal(report.scores.performance,null);
assert.equal(report.field.scope,'unavailable');
assert.equal(buildInsights(report).find(x=>x.id==='backlinks').status,'unknown');
assert.equal(buildInsights(report).find(x=>x.id==='positions').status,'unknown');
assert(buildActionPlan(report).some(x=>x.title==='Titre absent'));

// Lighthouse detail types do not always expose a table of items.
for (const items of [{type:'debugdata'}, 'not-a-table', 42, null, undefined]) {
  const result = extractAudit({lighthouseResult:{categories:{seo:{score:1,auditRefs:[{id:'detail'}]}},audits:{detail:{title:'Detail',score:1,details:{items}}}}},'https://example.com','mobile');
  assert.equal(result.checks.length,1);
  assert.deepEqual(result.checks[0].examples,[]);
  assert.equal(result.scores.seo,100);
}
const mixed = extractAudit({lighthouseResult:{categories:{seo:{auditRefs:[{id:'detail'}]}},audits:{detail:{title:'Detail',score:0,details:{items:[null,42,{url:'https://example.com/asset'},{node:{snippet:'<img>'}}]}}}}},'https://example.com','mobile');
assert.deepEqual(mixed.checks[0].examples,['https://example.com/asset','<img>']);

const longDescription='Description complète. '.repeat(160)+'FIN-DESCRIPTION';
const longItems=Array.from({length:32},(_,i)=>({url:'https://example.com/'+i+'/'+('a'.repeat(600))}));
const retained=extractAudit({lighthouseResult:{categories:{seo:{auditRefs:[{id:'all'}]}},audits:{all:{title:'Toutes les données',description:longDescription,score:0,details:{items:longItems}}}}},'https://example.com','mobile');
assert.equal(retained.checks[0].description,longDescription);
assert.equal(retained.checks[0].examples.length,32);
assert.equal(retained.checks[0].examples.at(-1),longItems.at(-1).url);
assert(retained.technical[0].rows.some(row=>row[1].includes(longItems.at(-1).url)));
assert.equal(buildActionPlan({...report,checks:Array.from({length:25},(_,i)=>({...report.checks[0],id:'action-'+i,status:'failed'}))}).length,25);

(async()=>{ report.checks = Array.from({length:60},(_,i)=>({...report.checks[0],id:String(i),description:'Description longue '.repeat(30)}));
 const assets={regular:fs.readFileSync('public/report-assets/NotoSans-Regular.ttf'),bold:fs.readFileSync('public/report-assets/NotoSans-Bold.ttf'),logo:fs.readFileSync('public/brand/code-v-logo-email.png')};
 const bytes=await createAuditPdf(report,assets); const {PDFDocument}=require('pdf-lib'); const pdf=await PDFDocument.load(bytes); assert(pdf.getPageCount()>5); assert.equal(pdf.getTitle(),'Audit SEO et performances - example.com - CODE-V');
 fs.writeFileSync(require('node:path').join(require('node:os').tmpdir(),'codev-report-test.pdf'),bytes); console.log('Full descriptions, all examples/actions, Unicode font, logo, linked contents and multipage PDF export OK'); })().catch(e=>{console.error(e);process.exitCode=1;});
