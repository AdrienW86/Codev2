import type { AuditResult } from "./audit";
import type { FactSection } from "./facts";
import { factStatusLabels } from "./facts";

export const MAX_AUDIT_PDF_PAGES=20;
/** Abbreviations are exclusive to the reading copy; the export keeps original values. */
export function excerpt(value:string,limit:number):string {
  const chars=Array.from(value.replace(/\s+/g," ").trim());
  return chars.length>limit?chars.slice(0,limit-1).join("")+"…":chars.join("");
}
export function summarizeAudit(report:AuditResult,level:number):AuditResult {
  const limit=[280,180,120,80][level];
  const pageLimit=[8,8,4,1][level];
  const sectionNote=(sections:FactSection[])=>sections.map(s=>({
    ...s,note:excerpt(s.note,limit),columns:["État","Lignes","Exemple / observation"],
    rows:[[factStatusLabels[s.status],String(s.rows.length),excerpt(s.rows[0]?.join(" / ")||"Aucun élément détecté",level?65:100)]]
  }));
  const selectedChecks=Object.keys({performance:1,seo:1,accessibility:1,"best-practices":1}).flatMap(category=>{
    const rank={failed:0,manual:1,unavailable:2,passed:3,notApplicable:4};
    return report.checks.filter(c=>c.category===category).sort((a,b)=>rank[a.status]-rank[b.status]).slice(0,level?1:2);
  }).map(c=>({...c,title:excerpt(c.title,100),description:excerpt(c.description,limit),display:excerpt(c.display,100),examples:c.examples.slice(0,level?0:1).map(v=>excerpt(v,120))}));
  const technical=report.technical??[];
  return {
    ...report,checks:selectedChecks,
    opportunities:report.opportunities.slice(0,level?2:3).map(o=>({...o,title:excerpt(o.title,90),description:excerpt(o.description,limit),display:excerpt(o.display,90)})),
    technical:[{id:"technical-summary",title:"Inventaire des diagnostics Lighthouse",status:"unknown",note:`${technical.length} diagnostics et ${technical.reduce((n,s)=>n+s.rows.length,0)} lignes conservés dans le fichier joint. Les premiers diagnostics sont indiqués ci-dessous.`,columns:["Diagnostic","État","Lignes"],rows:technical.slice(0,level?5:10).map(s=>[excerpt(s.title,65),factStatusLabels[s.status],String(s.rows.length)])}],
    crawl:report.crawl?{
      ...report.crawl,notes:report.crawl.notes.slice(0,2).map(n=>excerpt(n,limit)),
      issues:[...report.crawl.issues].sort((a,b)=>({high:0,medium:1,low:2}[a.severity]-{high:0,medium:1,low:2}[b.severity])).slice(0,level?2:4).map(i=>({...i,message:excerpt(i.message,100),url:excerpt(i.url,120)})),
      siteChecks:sectionNote(report.crawl.siteChecks??[]).slice(0,level?2:3),
      pages:report.crawl.pages.slice(0,pageLimit).map(p=>({...p,url:excerpt(p.url,180),title:excerpt(p.title,100),description:excerpt(p.description,limit),canonical:excerpt(p.canonical,180),h1:p.h1.slice(0,2).map(h=>excerpt(h,90)),facts:p.facts?{sections:[{
        id:"page-summary",title:"Inventaires de cette page",status:"unknown",note:"Tous les tableaux, valeurs et exemples restent dans les données jointes. Les champs longs des pages sont abrégés avec ….",columns:["Contrôle","État","Lignes"],rows:p.facts.sections.slice(0,13).map(s=>[excerpt(s.title,50),factStatusLabels[s.status],String(s.rows.length)])
      },...(!level?[{
        id:"page-highlights",title:"Exemples et vocabulaire de la page",status:"unknown" as const,
        note:"Sélection descriptive ; les fréquences ne sont pas des positions Google.",columns:["Élément","Observation"],
        rows:[
          ...p.facts.sections.filter(s=>s.status==="critical"||s.status==="warning").slice(0,2).map(s=>[excerpt(s.title,50),excerpt(s.note,100)]),
          ...p.facts.sections.filter(s=>s.id==="terms").flatMap(s=>s.rows.slice(0,5).map(row=>[excerpt(row[0],40),`${row[1]} occurrences / titre : ${row[2]} / description : ${row[3]}`]))
        ]
      }]:[])]}:undefined}))
    }:undefined
  };
}
