import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { ContactConfirmationEmail } from "@/emails/ContactConfirmationEmail";
import { NewContactEmail } from "@/emails/NewContactEmail";
import type { ContactEmailData } from "@/emails/emailStyles";
import {
  clientIp, detectSpamContent, isAllowedOrigin, isDuplicate, isJsonContentType, isRateLimited, isTooFast,
  isValidEmail, logSpam, maxBodyBytes, parseContactPayload, rememberDelivery, type SpamCode,
} from "@/lib/contact-security";

const serviceLabels: Record<string,string> = { website:"Création ou refonte de site",seo:"Référencement", "local-seo":"SEO local & Google Business Profile", "business-workflows":"Automatisation & IA", "content-production":"Création de contenus", "business-tool":"Logiciels métier & interfaces sur mesure",ads:"Publicité", "website-care":"Maintenance de site", "social-management":"Réseaux sociaux", automation:"Automatisation & IA", "digital-strategy":"Stratégie digitale" };
const unavailable = () => NextResponse.json({ error: "L’envoi est momentanément indisponible. Merci de réessayer plus tard." }, { status: 503 });
const invalid = "Le formulaire n’a pas pu être envoyé. Merci de recharger la page puis de réessayer.";

function reject(code: SpamCode, error: string, status: number) {
  logSpam(code);
  return NextResponse.json({ error }, { status });
}
/** Spam is answered like a success so bots learn nothing; `delivered` is absent so no conversion is tracked. */
function silentlyDrop(code: SpamCode) {
  logSpam(code);
  return NextResponse.json({ success: true });
}

export async function POST(req: NextRequest) {
  if (!isJsonContentType(req.headers)) return reject("spam_invalid_payload", invalid, 415);
  if (Number(req.headers.get("content-length") ?? 0) > maxBodyBytes) return reject("spam_invalid_payload", invalid, 413);
  if (!isAllowedOrigin(req.headers)) return reject("spam_origin", invalid, 403);
  if (isRateLimited(clientIp(req.headers))) return reject("spam_rate_limit", "Trop de demandes envoyées. Merci de réessayer dans quelques minutes.", 429);

  let raw: string;
  try { raw = await req.text(); } catch { return reject("spam_invalid_payload", invalid, 400); }
  if (new TextEncoder().encode(raw).length > maxBodyBytes) return reject("spam_invalid_payload", invalid, 413);
  let parsed: unknown;
  try { parsed = JSON.parse(raw); } catch { return reject("spam_invalid_payload", invalid, 400); }
  const input = parseContactPayload(parsed);
  if (!input) return reject("spam_invalid_payload", "Merci de renseigner votre nom, une adresse email valide et votre message.", 400);

  if (input.trap) return silentlyDrop("spam_honeypot");
  if (isTooFast(input)) return reject("spam_too_fast", "Merci de patienter quelques secondes avant de renvoyer le formulaire.", 400);
  if (!isValidEmail(input.email)) return reject("spam_invalid_email", "Merci de renseigner votre nom, une adresse email valide et votre message.", 400);
  const content = detectSpamContent(input);
  if (content) return silentlyDrop(content);
  if (isDuplicate(input)) return silentlyDrop("spam_duplicate");

  const apiKey=process.env.RESEND_API_KEY,recipient=process.env.CONTACT_EMAIL?.trim(),from=process.env.RESEND_FROM?.trim();
  if(!apiKey||!recipient||!isValidEmail(recipient)||!from||/[\r\n]/.test(from)) return unavailable();
  const { name, email, message } = input;
  let source: string | undefined;
  try {if(input.source){const url=new URL(input.source,"https://www.code-v.fr");if(url.origin==="https://www.code-v.fr"&&!url.username&&!url.password)source=url.pathname;}}catch{}
  const data: ContactEmailData={name,email,message,company:input.company,phone:input.phone,service:serviceLabels[input.service ?? ""]||input.project,source,receivedAt:new Date()};
  try {
    const internal=NewContactEmail(data),confirmation=ContactConfirmationEmail(data);
    const result=await new Resend(apiKey).batch.send([
      {from,to:[recipient],replyTo:email,...internal},
      {from,to:[email],replyTo:recipient,...confirmation},
    ]);
    if(result.error) return unavailable();
    rememberDelivery(input);
    return NextResponse.json({success:true,delivered:true});
  }catch {return unavailable();}
}
