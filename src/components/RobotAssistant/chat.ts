export const chatIntents = {
  acquisition: {
    label: "Acquisition",
    welcome: "Vous souhaitez générer plus de prospects. Quelle est votre activité et dans quelle zone intervenez-vous ? ",
    guidance: "Le visiteur souhaite générer plus de prospects. Explorer naturellement son activité, sa zone géographique, son site existant, ses moyens d’acquisition actuels et son objectif principal.",
  },
  website: {
    label: "Site & applications",
    welcome: "Parlons de votre site. S’agit-il d’une création ou de la refonte d’un site existant ?",
    guidance: "Le visiteur a besoin d’un site. Explorer naturellement l’existant, le type de site, son objectif, les fonctionnalités souhaitées et le besoin de génération de prospects.",
  },
  automation: {
    label: "Automatisation & IA",
    welcome: "Vous souhaitez automatiser votre activité. Quelle tâche répétitive vous prend le plus de temps aujourd’hui ?",
    guidance: "Le visiteur souhaite automatiser son activité. Explorer naturellement les tâches répétitives, les outils utilisés, les données, les processus actuels et l’objectif d’automatisation.",
  },
  strategy: {
    label: "Stratégie digitale",
    welcome: "Prenons un peu de recul sur votre stratégie digitale. Quel est votre objectif prioritaire aujourd’hui ?",
    guidance: "Le visiteur souhaite structurer sa stratégie digitale. Explorer naturellement sa situation actuelle, ses objectifs, les leviers déjà utilisés et ses priorités business.",
  },
} as const;

export type ChatIntent = keyof typeof chatIntents;
export const chatOpenEvent = "codev:open-chat";
export const defaultWelcome = "Bonjour 👋 Vous avez un projet ou un problème digital à résoudre ? Décrivez-moi simplement votre objectif et je vous aiderai à identifier l’approche la plus adaptée.";

export function isChatIntent(value: unknown): value is ChatIntent {
  return typeof value === "string" && Object.prototype.hasOwnProperty.call(chatIntents, value);
}

// Any client component can open the one globally mounted assistant.
export function openChat(options: { intent?: ChatIntent } = {}) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(chatOpenEvent, { detail: options }));
  }
}
