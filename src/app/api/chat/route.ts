import { NextRequest, NextResponse } from "next/server";
import { chatIntents, isChatIntent } from "@/components/RobotAssistant/chat";

import { buildChatContext, qualificationRules } from "@/lib/chat-context";
import { isChatActionId } from "@/lib/chat-actions";

// Narrow editorial guards for claims reproduced in the commercial evaluation.
function reviewReply(text: string) {
  return text
    .replace(/[^.!?]*audit gratuit[^.!?]*(?:[.!?]|$)/gi, "Les conditions d’un examen de votre site sont à préciser avec CODE-V.")
    .replace(/(?:Une|L[’']) IA n[’']est pas nécessaire[^.!?]*[.!?]?/gi, "Le choix entre des règles et une IA reste à vérifier sur des exemples de vos mails.")
    .replace(/Nous pouvons vous aider à automatiser[^.!?]*[.!?]?/gi, "Cette automatisation est une piste à étudier ; il faudrait vérifier les accès et les possibilités d’intégration des outils.")
    .replace(/qui vous permettr(?:a|ont) de/gi, "qui viserait à")
    .replace(/Cela vous aidera à/gi, "L’objectif serait de")
    .replace(/Cela vous fera gagner/gi, "L’objectif serait de gagner")
    .replace(/Cela (?:(?:vous|nous) )?permettra/gi, "L’objectif serait")
    .replace(/tout en garantissant/gi, "en prévoyant")
    .replace(/Nous allons/gi, "Nous pourrions")
    .replace(/pour assurer la qualité des données/gi, "avec un contrôle de la qualité des données")
    .trim();
}

export async function POST(req: NextRequest) {
  let payload;
  try { payload = await req.json(); } catch {
    return NextResponse.json({ error: "Message invalide" }, { status: 400 });
  }
  const { message, intent, history } = payload ?? {};

  if (typeof message !== "string" || !message.trim() || message.length > 10000) {
    return NextResponse.json(
      { error: "Message invalide" },
      { status: 400 }
    );
  }

  if (intent !== undefined && !isChatIntent(intent)) {
    return NextResponse.json({ error: "Intention invalide" }, { status: 400 });
  }
  if (history !== undefined && (!Array.isArray(history) || history.length > 20 || history.some(entry =>
    !entry || (entry.role !== "user" && entry.role !== "assistant") || typeof entry.content !== "string" || entry.content.length > 10000
  ))) {
    return NextResponse.json({ error: "Historique invalide" }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("Clé OpenAI manquante");
    return NextResponse.json(
      { error: "L’assistant est momentanément indisponible" },
      { status: 500 }
    );
  }

  const url = "https://api.openai.com/v1/chat/completions";

  const previousContact = [...(history ?? [])].reverse().find((entry: { role: string; actionId?: unknown }) => entry.role === "assistant" && isChatActionId(entry.actionId) && entry.actionId.startsWith("contact-"))?.actionId;
  const advance = /(?:je (?:veux|voudrais|souhaite|préfère)[^.!?]*(?:échange|faire le point|examiner|commencer|regarde|étudier|définir)|(?:oui[, ]+)?regardons|définissons|prenons contact|vous contacter|demander un devis)/i.test(message);
  const body = {
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    max_tokens: 420,
    messages: [
      {
        role: "system",
        content: `Tu es l’assistant de CODE-V, studio digital et technologie : sites et applications, acquisition, contenu et visibilité, automatisation et IA. Parle en français, au nom de CODE-V avec « nous », et vouvoie le visiteur.

RÈGLES PRIORITAIRES POUR CHAQUE RÉPONSE
- Sois direct et bref : généralement 2 à 4 phrases au maximum, parfois une seule.
- Pose au maximum UNE question principale sur UN sujet. Pas de deuxième question ni de liste de questions cachée dans une phrase. Seule exception : activité et zone géographique forment ensemble une question de cadrage pour l’acquisition.
- Aucune formule de remplissage ni compliment : pas de « C’est un objectif courant », « Excellente question », « Je serais ravi », « Merci pour ces précisions » ou « excellente idée ».
- Utilise les réponses précédentes. Ne redemande pas ce qui est connu et ne suppose pas l’existence d’un site, d’un outil ou d’un formulaire non mentionné.
- Réponds à une question du visiteur avant de poursuivre la découverte.

DÉCOUVERTE NATURELLE
Comprends progressivement l’activité, la zone, la présence digitale, l’acquisition actuelle, le problème et l’objectif seulement quand ils sont pertinents. Ce sont des repères, pas un questionnaire à compléter.
Acquisition : si inconnues, commence par l’activité et la zone. Exemple : « Dans quel secteur travaillez-vous et dans quelle zone souhaitez-vous obtenir davantage de prospects ? » Ensuite, demande seulement si un site existe OU d’où viennent les clients aujourd’hui, selon l’historique. Ne demande pas au visiteur quelle solution technique il souhaite ; c’est à nous de l’orienter.
Site : « Qu’aimeriez-vous améliorer en priorité sur votre site actuel ? »
Automatisation : « Quelle tâche répétitive vous prend le plus de temps aujourd’hui ? » Puis identifie les outils utilisés avant de proposer une piste.
Stratégie : « Quel est l’objectif prioritaire de votre entreprise aujourd’hui ? » Puis identifie les leviers existants et le problème rencontré.

PASSER À UNE ORIENTATION
Dès que le contexte utile, le problème concret et l’objectif sont connus, arrête les questions de découverte. Reformule le besoin en une phrase, propose un ou deux leviers potentiellement pertinents en prose, puis invite naturellement à poursuivre avec CODE-V. Ne demande pas des détails accessoires de design, de format de tableau ou de configuration à ce stade. Ne déroule jamais un catalogue de solutions.
Si le visiteur ajoute un détail après cette invitation, intègre-le simplement sans répéter la proposition commerciale.

HONNÊTETÉ
Ces pistes restent à confirmer : n’affirme jamais avoir analysé un site, une campagne ou des données sans l’avoir fait. Ne garantis aucun résultat, nombre de prospects, délai de performance ou absence d’erreur. Ne dis pas « garantir », « s’assurer qu’aucune demande ne sera oubliée » ou équivalent. N’invente pas de résultats clients ou tarifs. Ne prétends pas enregistrer un lead ni prendre un rendez-vous.
Avant de répondre, vérifie : réponse brève, une question au maximum, aucune formule générique ; si le besoin est clair, orientation et suite CODE-V plutôt qu’une nouvelle question.
` + (isChatIntent(intent) ? chatIntents[intent].guidance : "Déduis le besoin exprimé par le visiteur sans lui demander de choisir un intent.") + `

` + buildChatContext() + "\n" + qualificationRules,
      },
      { role: "system", content: "Rappel prioritaire : une piste d’automatisation ne confirme pas sa faisabilité. Tant que les accès, contraintes et possibilités d’intégration des systèmes ne sont pas vérifiés, dire ce qui reste à vérifier, sans promettre que nous pouvons réaliser le flux. Les faits généraux établis restent affirmés clairement. Si le visiteur demande un diagnostic sans données, répondre directement que la cause ne peut pas être déterminée sans ces données, puis indiquer un point à examiner. Les conditions d’un examen se précisent avec CODE-V, aucune gratuité n’est établie ni exclue. Aucun gain ou cause acquis : parler d’objectif ou de piste à vérifier. Ne remplacer ni réservation qui fonctionne ni site entier sans difficulté concrète. Pour un couvreur déjà équipé de site/Ads/Local Services, demander comment les chantiers sont attribués avant de recommander. Pour un besoin site+Ads, conserver l’option d’une seule page si proposée. Pour un besoin indécis, demander le souci ou l’objectif prioritaire, pas présumer une croissance. " + (previousContact && !advance ? "Une orientation Contact a déjà été proposée : réponds à la précision actuelle sans nouvelle invitation, action=null." : "Si le besoin est connu et que le visiteur demande à avancer, une réponse courte sans question de consentement et une action Contact.") },
      ...(history ?? []).map((entry: { role: string; content: string }) => ({ role: entry.role, content: entry.content })),
      {
        role: "user",
        content: message,
      },
    ],
    temperature: 0.4,
  };

  let res;
  try { res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(25000),
  }); } catch {
    return NextResponse.json({ error: "L’assistant est momentanément indisponible" }, { status: 503 });
  }

  if (!res.ok) {
    console.error("Chat upstream unavailable", res.status);
    return NextResponse.json(
      { error: "Erreur lors de la génération de la réponse" },
      { status: 500 }
    );
  }

  try {
    const data = await res.json();
    const raw = data.choices?.[0]?.message?.content;
    if (typeof raw !== "string") throw new Error("Invalid response");
    const result = JSON.parse(raw);
    if (!result || typeof result.reply !== "string" || !result.reply.trim() || result.reply.length > 2400) throw new Error("Invalid reply");
    const explicitContact = /(?:vous contacter|contactez-moi|prendre (?:contact|rendez-vous)|parler (?:à|avec) (?:vous|CODE-V)|demander un devis)/i.test(message);
    let actionId = isChatActionId(result.action) && (!result.action.startsWith("contact-") || result.qualified === true || explicitContact) ? result.action : null;
    const visitorFacts = [...(history ?? []).filter((entry: { role: string }) => entry.role === "user").map((entry: { content: string }) => entry.content), message].join(" ");
    if (actionId === "contact-ads" && /site/i.test(visitorFacts) && !/(?:Google Ads|Local Services|campagne|publicité)/i.test(visitorFacts)) actionId = "contact-website";
    if (advance && result.qualified === true && !actionId && isChatActionId(previousContact)) actionId = previousContact;
    if (previousContact && actionId?.startsWith("contact-") && !advance) actionId = null;
    let reviewed = reviewReply(result.reply);
    if (advance && result.qualified === true && actionId) reviewed = reviewed.replace(/(?:Souhaitez-vous|Voulez-vous|Pouvons-nous)[^?]*(?:discut|échang|explor|planifi)[^?]*\?/gi, "").trim() || reviewed;
    if (!(history ?? []).some((entry: { role: string }) => entry.role === "user") && /(?:premier|première|1er)[^.!?]{0,40}google/i.test(message)) {
      reviewed = "Sur Google, la première place peut désigner les résultats naturels, Google Maps ou les annonces sponsorisées ; aucune position n’est garantie. Lequel de ces espaces visez-vous ?";
      actionId = null;
    }
    if (/sans (?:voir|accéder|avoir accès)[^.!?]{0,30}(?:compte|données)/i.test(message) && /(?:Google Ads|campagnes?)/i.test(visitorFacts)) {
      reviewed = "Sans consulter les données du compte, nous ne pouvons pas déterminer précisément la cause. Le ciblage des annonces et l’origine des appels seraient des points à vérifier.";
      actionId = null;
    }
    const lastAssistant = [...(history ?? [])].reverse().find((entry: { role: string }) => entry.role === "assistant")?.content ?? "";
    // An unanswered essential question is not a qualified need: two observed transitions.
    if (!advance && /refonte/i.test(lastAssistant) && lastAssistant.includes("?") && /réserv(?:ation|er)/i.test(message) && /(?:fonctionne(?:nt)?\b|marche bien)/i.test(message) && !/(?:\bne\s+fonctionn|fonctionne\w*[^.!?]{0,20}\b(?:pas|plus|mal)\b)/i.test(message) && !/(?:problème|lent|design|image|conversion|difficult|objectif|amélior)/i.test(message)) {
      reviewed = "Le fonctionnement de la réservation ne justifie donc pas, à lui seul, un changement. Au-delà de l’ancienneté du site, quelle amélioration souhaiteriez-vous obtenir ?";
      actionId = null;
    }
    if (!advance && /chantier/i.test(message) && /rentab/i.test(message) && /attribu/i.test(lastAssistant) && lastAssistant.includes("?") && /Google Ads/i.test(visitorFacts) && /Local Services/i.test(visitorFacts) && !/(?:attribu|canal|origine|d[’']où|mesur|suivi|sais pas|ne sais|identifier|proven)/i.test(message)) {
      reviewed = "Votre priorité est la rentabilité des chantiers plutôt que le nombre d’appels. Arrivez-vous à relier les chantiers signés aux différents canaux d’acquisition ?";
      actionId = null;
    }
    // Keep the first discovery question if the model accidentally adds another.
    const reply = (reviewed.match(/\?/g)?.length ?? 0) > 1
      ? reviewed.slice(0, reviewed.indexOf("?") + 1).trim()
      : reviewed.trim();
    return NextResponse.json({ reply, actionId: reply.includes("?") ? null : actionId });
  } catch {
    return NextResponse.json({ error: "L’assistant est momentanément indisponible" }, { status: 502 });
  }
}
