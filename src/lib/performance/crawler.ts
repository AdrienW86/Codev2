
import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { normalizePublicUrl } from "./audit";

export type CrawlIssue = { code: string; severity: "high" | "medium" | "low"; message: string; url: string };
export type CrawlPage = {
 url: string; title: string; description: string; canonical: string; h1: string[];
 words: number; internal: number; external: number; images: number; missingAlt: number; noindex: boolean; incoming: number;
};
export type CrawlReport = { status: "complete" | "partial" | "unavailable"; scanned: number; limit: number; discovered: number; pages: CrawlPage[]; issues: CrawlIssue[]; notes: string[] };
const MAX_PAGES=8, MAX_BYTES=500000, TIME_BUDGET=24000;
const ua="CODEV-SEO-Audit/1.0 (+https://www.code-v.fr/outils/analyser-site-web)";
function decode(s:string) { const entities: Record<string,string>={amp:"&",quot:'"',apos:"'",lt:"<",gt:">",nbsp:" "}; return s.replace(/&(?:amp|quot|apos|lt|gt|nbsp);/gi,m=>entities[m.slice(1,-1).toLowerCase()]||m); }
function strip(s:string){return decode(s.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi," ").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim());}
function attr(tag:string,name:string) {
 const re=new RegExp("(?:\\s|^)"+name+"\\s*=\\s*(?:\\\"([^\\\"]*)\\\"|'([^']*)'|([^\\s>]+))","i");
 const m=tag.match(re);return decode(m?.[1]??m?.[2]??m?.[3]??"");
}
function tags(s:string,n:string){return [...s.matchAll(new RegExp("<"+n+"\\b[^>]*>","gi"))].map(m=>m[0]);}
function textTag(s:string,n:string){return strip(s.match(new RegExp("<"+n+"\\b[^>]*>([\\s\\S]*?)<\\/"+n+">","i"))?.[1]??"");}
function hostname(s:string){return new URL(s).hostname.toLowerCase().replace(/^www\./,"");}
function link(v:string,base:string) {try {const u=new URL(v,base);u.search="";u.hash="";return normalizePublicUrl(u.toString());}catch{return null;}}
function blocked(ip:string){
 const k=ip.toLowerCase();
 if(isIP(ip)===6)return k==="::1"||k==="::"||k.startsWith("fe80:")||k.startsWith("fc")||k.startsWith("fd")||k.startsWith("ff")||k.startsWith("2001:db8:")||k.startsWith("::ffff:");
 const n=ip.split(".").map(Number);
 return n.length!==4||n[0]===0||n[0]===10||n[0]===127||n[0]>=224||(n[0]===169&&n[1]===254)||(n[0]===172&&n[1]>=16&&n[1]<=31)||(n[0]===192&&n[1]===168)||(n[0]===100&&n[1]>=64&&n[1]<=127)||(n[0]===198&&[18,19].includes(n[1]))||(n[0]===192&&n[1]===0);
}
async function safeHost(url:string){
 const addresses=await lookup(new URL(normalizePublicUrl(url)).hostname,{all:true,verbatim:true});
 if(!addresses.length||addresses.some(x=>blocked(x.address)))throw Error("Adresse non publique.");
}
async function getHtml(start:string,root:string,signal:AbortSignal){
 let url=start;
 for(let i=0;i<3;i++){
  if(hostname(url)!==root)throw Error("Redirection hors du domaine.");
  await safeHost(url);
  const res=await fetch(url,{redirect:"manual",signal,cache:"no-store",headers:{"User-Agent":ua,"Accept":"text/html"}});
  if([301,302,303,307,308].includes(res.status)){
   const target=res.headers.get("location");if(!target)throw Error("Redirection invalide.");
   url=normalizePublicUrl(new URL(target,url).toString());continue;
  }
  if(!res.ok)throw Error("HTTP "+res.status);
  if(!/text\/html/i.test(res.headers.get("content-type")||""))throw Error("Contenu non HTML.");
  if(Number(res.headers.get("content-length")||0)>MAX_BYTES)throw Error("HTML trop volumineux.");
  const reader=res.body?.getReader();if(!reader)throw Error("Page vide.");
  const chunks:Uint8Array[]=[];let size=0;
  try {for(;;){const r=await reader.read();if(r.done)break;size+=r.value.byteLength;if(size>MAX_BYTES)throw Error("HTML trop volumineux.");chunks.push(r.value);}}
  finally{await reader.cancel().catch(()=>{});}
  const bytes=new Uint8Array(size);let offset=0;for(const x of chunks){bytes.set(x,offset);offset+=x.byteLength;}
  return {url,html:new TextDecoder().decode(bytes),robots:res.headers.get("x-robots-tag")||""};
 }
 throw Error("Trop de redirections.");
}
export function parseSeoPage(html:string,url:string,robots=""){
 const title=textTag(html,"title");
 const description=attr(tags(html,"meta").find(t=>attr(t,"name").toLowerCase()==="description")||"","content");
 const canonicalTag=tags(html,"link").find(t=>attr(t,"rel").toLowerCase().split(/\s+/).includes("canonical"));
 const canonical=canonicalTag?(link(attr(canonicalTag,"href"),url)||""):"";
 const h1=[...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(x=>strip(x[1])).filter(Boolean).slice(0,8);
 const links=tags(html,"a").map(t=>link(attr(t,"href"),url)).filter((v):v is string=>Boolean(v));
 const internal=[...new Set(links.filter(v=>hostname(v)===hostname(url)))];
 const external=[...new Set(links.filter(v=>hostname(v)!==hostname(url)))];
 const imgs=tags(html,"img");
 const noindex=/\bnoindex\b/i.test(attr(tags(html,"meta").find(t=>attr(t,"name").toLowerCase()==="robots")||"","content")+","+robots);
 const text=strip(html.replace(/<(nav|footer|header)\b[^>]*>[\s\S]*?<\/\1>/gi," "));
 return {title,description,canonical,h1,internal,external,images:imgs.length,missingAlt:imgs.filter(t=>!/\s+alt\s*=/i.test(t)).length,words:text.split(/\s+/).filter(Boolean).length,noindex};
}
function finding(code:string,severity:CrawlIssue["severity"],message:string,url:string):CrawlIssue{return{code,severity,message,url};}
/** Respect de robots.txt : contrôle conservateur des directives User-agent: *.
 * Si robots.txt est indisponible (hors 404), l'exploration est interrompue.
 */
async function robotRules(start:string): Promise<{ allow: (url:string)=>boolean; notes: string[] }> {
 const u=new URL("/robots.txt",start);
 await safeHost(u.toString());
 const c=new AbortController(), timer=setTimeout(()=>c.abort(),3000);
 try {
  const res=await fetch(u,{redirect:"manual",signal:c.signal,cache:"no-store",headers:{"User-Agent":ua}});
  if(res.status===404)return {allow:()=>true,notes:["robots.txt absent (404)."]};
  if(!res.ok)throw Error("robots.txt non accessible.");
  if(Number(res.headers.get("content-length")||0)>100000)throw Error("robots.txt trop volumineux.");
  const source=(await res.text()).slice(0,100000);
  const lines=source.split(/\r?\n/);
  let applies=false, groupStarted=false;const rules:{allow:boolean;path:string}[]=[];
  for(const line of lines){
   const clean=line.split("#")[0].trim(), parts=clean.match(/^([a-z-]+)\s*:\s*(.*)$/i);
   if(!parts)continue;
   const directive=parts[1].toLowerCase(),value=parts[2].trim();
   if(directive==="user-agent"){
    if(groupStarted){applies=false;groupStarted=false;}
    if(value==="*"||value.toLowerCase()==="codev-seo-audit")applies=true;
   } else if(directive==="allow"||directive==="disallow"){
    groupStarted=true;
    if(applies&&value.startsWith("/"))rules.push({allow:directive==="allow",path:value.split("*")[0].replace(/\$/,"")});
   }
  }
  return {allow:(url:string)=>{
   const path=new URL(url).pathname;
   const matching=rules.filter(r=>path.startsWith(r.path)).sort((a,b)=>b.path.length-a.path.length);
   return !matching.length||matching[0].allow;
  },notes:["Directives robots.txt prises en compte pour les chemins explorés (règles simples)."]};
 } finally {clearTimeout(timer);}
}

export async function crawlSite(input:string):Promise<CrawlReport>{
 const start=normalizePublicUrl(input),root=hostname(start),queue=[start],visited=new Set<string>(),pages:CrawlPage[]=[],issues:CrawlIssue[]=[];
 const incoming=new Map<string,number>(),stop=Date.now()+TIME_BUDGET;
 let robots: Awaited<ReturnType<typeof robotRules>>;
 try { robots=await robotRules(start); } catch { return {status:"unavailable",scanned:0,limit:MAX_PAGES,discovered:0,pages:[],issues:[],notes:["Exploration interrompue : impossible de vérifier robots.txt."]}; }
 while(queue.length&&pages.length<MAX_PAGES&&visited.size<20&&Date.now()<stop){
  const url=queue.shift()!;if(visited.has(url))continue;visited.add(url);
  if(!robots.allow(url))continue;
  const ctl=new AbortController();const timer=setTimeout(()=>ctl.abort(),Math.min(4500,Math.max(500,stop-Date.now())));
  try{
   const doc=await getHtml(url,root,ctl.signal);const p=parseSeoPage(doc.html,doc.url,doc.robots);
   const page:CrawlPage={url:doc.url,title:p.title,description:p.description,canonical:p.canonical,h1:p.h1,words:p.words,internal:p.internal.length,external:p.external.length,images:p.images,missingAlt:p.missingAlt,noindex:p.noindex,incoming:0};
   pages.push(page);
   if(!p.title)issues.push(finding("title","high","Balise title absente.",url));
   if(!p.description)issues.push(finding("description","medium","Méta description absente.",url));
   if(!p.h1.length)issues.push(finding("h1","medium","H1 absent.",url));
   if(p.h1.length>1)issues.push(finding("multi-h1","low","Plusieurs H1 : vérifier la structure.",url));
   if(!p.canonical)issues.push(finding("canonical","medium","Canonical absente.",url));
   if(p.noindex)issues.push(finding("noindex","medium","Directive noindex (potentiellement volontaire).",url));
   if(p.missingAlt)issues.push(finding("alt","low",p.missingAlt+" image(s) sans attribut alt.",url));
   if(p.words<120)issues.push(finding("content","low","Contenu texte limité dans le HTML initial.",url));
   for(const target of p.internal){
    if(!visited.has(target)&&!queue.includes(target)&&queue.length<32)queue.push(target);
    incoming.set(target,(incoming.get(target)||0)+1);
   }
  }catch(err){issues.push(finding("fetch","low",err instanceof Error?err.message:"Page inaccessible.",url));}
  finally{clearTimeout(timer);}
 }
 for(const page of pages)page.incoming=incoming.get(page.url)||0;
 const grouped=new Map<string,CrawlPage[]>();
 for(const page of pages)if(page.title){const key=page.title.toLowerCase();grouped.set(key,[...(grouped.get(key)||[]),page]);}
 for(const group of grouped.values())if(group.length>1)for(const page of group)issues.push(finding("duplicate-title","medium","Title dupliqué dans l'échantillon.",page.url));
 return {status:pages.length===0?"unavailable":issues.some(i=>i.code==="fetch")?"partial":"complete",scanned:pages.length,limit:MAX_PAGES,discovered:visited.size+queue.length,pages,issues,notes:[...robots.notes,"Échantillon de 8 pages maximum, HTML sans exécution JavaScript ; le maillage concerne les pages explorées uniquement.","Cette collecte ne fournit ni backlinks externes, ni positions Google, ni citations IA."]};
}
