import { type ContactEmailData, type EmailTemplate, button, field, layout, panel, subjectText } from "./emailStyles";
export function NewContactEmail(data: ContactEmailData): EmailTemplate {
  const service = data.service;
  const subject = `Nouveau contact${service ? " — "+subjectText(service) : ""} — ${subjectText(data.name)}`;
  const date = new Intl.DateTimeFormat("fr-FR",{dateStyle:"long",timeStyle:"short",timeZone:"Europe/Paris"}).format(data.receivedAt);
  const title = service ? `${data.name} souhaite parler de ${service}` : `${data.name} souhaite échanger avec CODE-V`;
  const phone = data.phone?.replace(/[\s().-]/g,"");
  const call = phone && /^\+?\d{6,15}$/.test(phone) ? button("Téléphoner",`tel:${phone}`) : "";
  const body = `${panel("Contact",field("Nom",data.name)+field("Société",data.company)+field("Email",data.email)+field("Téléphone",data.phone))}<br>${panel("Projet",field("Service",service)+field("Page / source",data.source)+field("Message",data.message))}<br>${panel("Contexte",field("Reçu le",date))}${button("Répondre au prospect",`mailto:${encodeURIComponent(data.email)}`)}${call}`;
  const lines = [["Nom",data.name],["Société",data.company],["Email",data.email],["Téléphone",data.phone],["Service",service],["Page / source",data.source],["Message",data.message],["Reçu le",date]].filter(([,value])=>value).map(([label,value])=>`${label} : ${value}`).join("\n\n");
  return {subject,html:layout(subject,"NOUVELLE DEMANDE",title,body),text:`${title}\n\n${lines}\n\nRépondre au prospect : ${data.email}${call ? "\nTéléphoner : "+data.phone : ""}\n\nCODE-V\nWeb · Acquisition · Automatisation\ncode-v.fr`};
}
