const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
function load(file) { const exports = {}; new Function('exports', 'require', 'URL', 'Uint8Array', ts.transpileModule(fs.readFileSync(file, 'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText)(exports, require, URL, Uint8Array); return exports; }
const {extractAudit} = load('src/lib/performance/audit.ts');
const {createAuditPdf} = load('src/lib/performance/report-pdf.ts');
const audits = {title:{title:'Titre absent',description:'Ajouter un [titre](https://example.com) descriptif.',score:0,details:{items:[{node:{snippet:'<title>😀</title>'}}]}},pass:{title:'HTTPS',score:1},manual:{title:'Vérification',score:null,scoreDisplayMode:'manual'},na:{title:'Sans objet',score:null,scoreDisplayMode:'notApplicable'},error:{title:'Non mesuré',score:null,scoreDisplayMode:'error'}};
const report=extractAudit({lighthouseResult:{categories:{seo:{score:.5,auditRefs:Object.keys(audits).map(id=>({id}))}},audits}},'https://example.com','mobile');
assert.equal(report.checks.length,5);
assert.equal(report.checks[0].description,'Ajouter un titre descriptif.');
assert.equal(report.checks[0].examples[0],'<title>😀</title>');
assert.equal(report.checks.map(c=>c.status).join(','),'failed,passed,manual,notApplicable,unavailable');
assert.equal(report.scores.performance,null);
assert.equal(report.field.scope,'unavailable');
(async()=>{ report.checks = Array.from({length:60},(_,i)=>({...report.checks[0],id:String(i),description:'Description longue '.repeat(30)})); const bytes=await createAuditPdf(report); const {PDFDocument}=require('pdf-lib'); const pdf=await PDFDocument.load(bytes); assert(pdf.getPageCount()>5); fs.writeFileSync('/tmp/codev-report-test.pdf',bytes); console.log('Detailed audits, missing metrics, Unicode and multipage PDF export OK'); })().catch(e=>{console.error(e);process.exitCode=1;});
