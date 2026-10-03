import { type ContactEmailData, type EmailTemplate, button, field, layout, origin, panel } from "./emailStyles";
export function ContactConfirmationEmail(data: ContactEmailData): EmailTemplate {
  const firstName = data.name.trim().split(/\s+/)[0];
  const subject = "Votre demande a bien été reçue — CODE-V";
  const body = `<p style="margin:0 0 8px;">Votre demande a bien été transmise à CODE-V.</p><p style="margin:0 0 28px;color:#64748b;">Nous allons prendre connaissance de votre message et revenir vers vous.</p>${panel("Votre demande",field("Service",data.service)+field("Société",data.company)+field("Téléphone",data.phone)+field("Message",data.message))}${button("Découvrir CODE-V",origin+"/")}`;
  const details = [["Service",data.service],["Société",data.company],["Téléphone",data.phone],["Message",data.message]].filter(([,value])=>value).map(([label,value])=>`${label} : ${value}`).join("\n\n");
  return { subject, html: layout("Votre demande a bien été transmise à CODE-V.","Message bien reçu",`Merci ${firstName}.`,body), text: `Merci ${firstName}.\n\nVotre demande a bien été transmise à CODE-V.\nNous allons prendre connaissance de votre message et revenir vers vous.\n\nVotre demande\n${details}\n\nDécouvrir CODE-V : ${origin}/\n\nCODE-V\nWeb · Acquisition · Automatisation\ncode-v.fr` };
}
