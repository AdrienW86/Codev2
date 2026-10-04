import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { ContactConfirmationEmail } from "@/emails/ContactConfirmationEmail";
import { NewContactEmail } from "@/emails/NewContactEmail";
import type { ContactEmailData } from "@/emails/emailStyles";

const serviceLabels: Record<string,string> = { website:"Création ou refonte de site",seo:"Référencement", "local-seo":"SEO local & Google Business Profile", "business-workflows":"Automatisation & IA", "content-production":"Création de contenus", "business-tool":"Logiciels métier & interfaces sur mesure",ads:"Publicité", "website-care":"Maintenance de site", "social-management":"Réseaux sociaux", automation:"Automatisation & IA", "digital-strategy":"Stratégie digitale" };
const mailbox = (value: string) => /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9-]+(?:\.[A-Z0-9-]+)+$/i.test(value) && value.length <= 254;
const unavailable = () => NextResponse.json({ error: "L’envoi est momentanément indisponible. Merci de réessayer plus tard." }, { status: 503 });

export async function POST(req: NextRequest) {
  let body: Record<string,unknown>;
  try { const value = await req.json(); if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(); body=value; }
  catch { return NextResponse.json({ error:"Format invalide." },{status:400}); }
  const read = (key: string,max: number) => typeof body[key] === "string" && (body[key] as string).length <= max ? (body[key] as string).trim() : "";
  const name=read("name",150),email=read("email",254),message=read("message",15000);
  if(!name||!mailbox(email)||!message||/[\r\n]/.test(name)) return NextResponse.json({error:"Merci de renseigner votre nom, une adresse email valide et votre message."},{status:400});
  for(const [key,max] of [["company",200],["phone",40],["project",200],["service",100],["source",500]] as const) {
    if(body[key] !== undefined && (typeof body[key] !== "string" || body[key].length>max)) return NextResponse.json({error:"Format invalide."},{status:400});
  }
  const apiKey=process.env.RESEND_API_KEY,recipient=process.env.CONTACT_EMAIL?.trim(),from=process.env.RESEND_FROM?.trim();
  if(!apiKey||!recipient||!mailbox(recipient)||!from||/[\r\n]/.test(from)) return unavailable();
  const selected=read("service",100);
  let source: string | undefined;
  try {const value=read("source",500);if(value){const url=new URL(value,"https://www.code-v.fr");if(url.origin==="https://www.code-v.fr"&&!url.username&&!url.password)source=url.pathname;}}catch{}
  const data: ContactEmailData={name,email,message,company:read("company",200)||undefined,phone:read("phone",40)||undefined,service:serviceLabels[selected]||read("project",200)||undefined,source,receivedAt:new Date()};
  try {
    const internal=NewContactEmail(data),confirmation=ContactConfirmationEmail(data);
    const result=await new Resend(apiKey).batch.send([
      {from,to:[recipient],replyTo:email,...internal},
      {from,to:[email],replyTo:recipient,...confirmation},
    ]);
    if(result.error) return unavailable();
    return NextResponse.json({success:true});
  }catch {return unavailable();}
}
