import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { request as httpRequest } from "node:http";
import { request as httpsRequest } from "node:https";

/**
 * Fetch HTTP with verified DNS address pinned to the actual TCP request.
 * Prevents a DNS-rebinding gap between preflight validation and connection.
 * No cookies, authorization, proxy, user-defined headers, or automatic redirect.
 */
function blocked(ip: string) {
 const k=ip.toLowerCase();
 if(isIP(ip)===6){
  if(k.startsWith("::ffff:"))return true;
  if(!(k.startsWith("2")||k.startsWith("3")))return true;
  return k.startsWith("2001:db8:")||k.startsWith("2001:0:")||k.startsWith("2001:10:")||k.startsWith("2001:20:");
 }
 const n=ip.split(".").map(Number);
 if(n.length!==4||n.some(x=>x<0||x>255||!Number.isInteger(x)))return true;
 return n[0]===0||n[0]===10||n[0]===127||n[0]>=224||
  (n[0]===169&&n[1]===254)||(n[0]===172&&n[1]>=16&&n[1]<=31)||
  (n[0]===192&&(n[1]===168||n[1]===0||n[1]===2))||
  (n[0]===100&&n[1]>=64&&n[1]<=127)||
  (n[0]===198&&(n[1]===18||n[1]===19||n[1]===51))||
  (n[0]===203&&n[1]===0&&n[2]===113);
}

export async function safeRead(url: string, signal: AbortSignal, accept: string, maxBytes: number) {
 const target=new URL(url);
 if(!["http:","https:"].includes(target.protocol)||target.username||target.password)throw Error("URL interdite.");
 if(target.port&&!["80","443"].includes(target.port))throw Error("Port interdit.");
 const addresses=await lookup(target.hostname,{all:true,verbatim:true});
 if(!addresses.length||addresses.some(a=>blocked(a.address)))throw Error("Adresse IP non publique.");
 const selected=addresses.find(a=>a.family===4)||addresses[0];
 return new Promise<{status:number; contentType:string; location:string; xRobots:string; text:string}>((resolve,reject)=>{
  const req=(target.protocol==="https:"?httpsRequest:httpRequest)(target,{
   signal,timeout:4500,
   headers:{"User-Agent":"CODEV-SEO-Audit/1.0 (+https://www.code-v.fr/outils/analyser-site-web)","Accept":accept},
   lookup:(_host,_options,callback)=>callback(null,selected.address,selected.family),
  },res=>{
   const status=res.statusCode||0,declared=Number(res.headers["content-length"]||0);
   if(declared>maxBytes){res.destroy(Error("Ressource trop volumineuse."));return;}
   const chunks:Buffer[]=[];let bytes=0;
   res.on("data",(part:Buffer)=>{
    bytes+=part.length;
    if(bytes>maxBytes){res.destroy(Error("Ressource trop volumineuse."));return;}
    chunks.push(part);
   });
   res.on("error",reject);
   res.on("end",()=>resolve({
    status,contentType:String(res.headers["content-type"]||""),
    location:String(res.headers.location||""),
    xRobots:String(res.headers["x-robots-tag"]||""),
    text:Buffer.concat(chunks).toString("utf8"),
   }));
  });
  req.on("timeout",()=>req.destroy(Error("Délai réseau dépassé.")));
  req.on("error",reject);req.end();
 });
}
