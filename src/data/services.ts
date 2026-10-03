import type { ChatIntent } from "@/components/RobotAssistant/chat";

/**
 * Proposed commercial source of truth. Not yet consumed by the site or chatbot.
 * Existing mentions establish provenance, not a validated contractual scope.
 * All scopes, exclusions and pricing modes below require commercial approval.
 * Slugs are catalog identifiers, not automatically published routes.
 */
export const serviceFamilies = [
  { id: "web", name: "Web & Applications", summary: "Construire des expériences numériques utiles, convaincantes et évolutives.", defaultChatIntent: "website" },
  { id: "acquisition", name: "Acquisition & Publicité", summary: "Attirer des prospects pertinents et mesurer les actions qui génèrent des demandes.", defaultChatIntent: "acquisition" },
  { id: "seo", name: "SEO & Visibilité locale", summary: "SEO & Visibilité locale : périmètre adapté aux objectifs et à l’existant.", defaultChatIntent: "acquisition" },
  { id: "social", name: "Réseaux sociaux & Community management", summary: "Réseaux sociaux & Community management : périmètre adapté aux objectifs et à l’existant.", defaultChatIntent: "strategy" },
  { id: "content", name: "Contenu & Création", summary: "Structurer une présence éditoriale cohérente et régulière.", defaultChatIntent: "strategy" },
  { id: "automation", name: "Automatisation & IA", summary: "Connecter les outils, limiter les tâches manuelles et mieux exploiter les données.", defaultChatIntent: "automation" },
  { id: "software", name: "Logiciels & Solutions métier", summary: "Logiciels & Solutions métier : périmètre adapté aux objectifs et à l’existant.", defaultChatIntent: "automation" },
  { id: "strategy", name: "Stratégie digitale", summary: "Stratégie digitale : périmètre adapté aux objectifs et à l’existant.", defaultChatIntent: "strategy" },
  { id: "maintenance", name: "Maintenance & Accompagnement", summary: "Maintenance & Accompagnement : périmètre adapté aux objectifs et à l’existant.", defaultChatIntent: "strategy" },
] as const satisfies readonly { id: string; name: string; summary: string; defaultChatIntent: ChatIntent }[];

export type ServiceCategory = (typeof serviceFamilies)[number]["id"];
export const serviceIds = [
  "website", "landing-page", "web-application", "business-tool",
  "seo", "local-seo", "google-ads", "local-services", "meta-ads", "conversion-tracking",
  "editorial-social", "content-production", "video-motion",
  "business-workflows", "airtable-workspace", "api-integrations", "ai-agents", "automated-reporting",
"ecommerce", "mobile-app", "web-migration", "ux-conversion", "gbp-management", "social-management", "editorial-strategy", "digital-identity", "digital-strategy", "website-care", "hosting-supervision", "application-support", "automation-supervision", "digital-accompaniment",
] as const;
export type ServiceId = (typeof serviceIds)[number];
export type PricingMode = "fixed" | "quote" | "recurring" | "time-materials";
export type ServiceOrigin = "existing-page" | "home-v2" | "new-proposal";

type ServiceProfile = {
 readonly description: string; readonly useCases: readonly string[]; readonly subservices: readonly string[];
 readonly seo: { readonly primaryKeyword: string; readonly secondaryKeywords: readonly string[]; readonly searchIntents: readonly ("commercial" | "informational")[];
 readonly page: { readonly status: "recommended" | "grouped" | "conditional"; readonly proposedPath: string; readonly reason: string; readonly groupedWith: ServiceId | null };
 readonly supportingContents: readonly string[]; readonly articleIdeas: readonly string[]; readonly videoOpportunities: readonly string[]; readonly caseStudyIdeas: readonly string[]; readonly internalLinks: readonly ServiceId[] };
 readonly recurrence: { readonly potential: "optional" | "core"; readonly billingForms: readonly ("monthly-package" | "subscription" | "quote" | "time-materials")[]; readonly note: string };
 readonly commercialPriority: { readonly level: "high" | "medium"; readonly status: "proposed"; readonly reason: string };
};

export type Service = ServiceProfile & {
  readonly id: ServiceId;
  readonly slug: string;
  readonly name: string;
  readonly category: ServiceCategory;
  readonly summary: string;
  readonly clientProblem: string;
  readonly targetClients: readonly string[];
  /** Proposed scope only, until commercialStatus is validated. */
  readonly included: readonly string[];
  readonly excluded: readonly string[];
  /** Objectives, never guaranteed performance or client case results. */
  readonly desiredOutcomes: readonly string[];
  readonly prerequisites: readonly string[];
  readonly cta: { readonly label: string; readonly href: string };
  readonly chatIntent: ChatIntent;
  /** Conversation prompts, not a mandatory form or ordered questionnaire. */
  readonly qualificationQuestions: readonly string[];
  readonly complementaryServiceIds: readonly ServiceId[];
  readonly pricing: {
    readonly proposedModes: readonly PricingMode[];
    readonly status: "pending-validation";
    readonly note: string;
  };
  readonly provenance: {
    readonly origin: ServiceOrigin;
    readonly sources: readonly string[];
    readonly note: string;
  };
  /** Existing relevant destination; null means no published service page. */
  readonly existingPage: string | null;
  readonly commercialStatus: "draft" | "validated";
  readonly commercialQuestions: readonly string[];
};

type ServiceDraft = Omit<Service, keyof ServiceProfile | "cta" | "chatIntent" | "commercialStatus" | "pricing"> & {
  readonly ctaLabel: string;
  readonly pricingModes: readonly PricingMode[];
  readonly pricingNote: string;
};

function defineService(draft: ServiceDraft): Service {
  const { ctaLabel, pricingModes, pricingNote, ...service } = draft;
  const family = serviceFamilies.find(item => item.id === draft.category)!;
  return {
    ...service,
    ...serviceProfiles[draft.id],
    included: [...service.included, ...serviceProfiles[draft.id].subservices],
    provenance: { ...service.provenance, sources: [...new Set([...service.provenance.sources, "Brief commercial utilisateur — octobre 2026"])] },
    recurrence: {
      ...serviceProfiles[draft.id].recurrence,
      billingForms: pricingModes.includes("recurring")
        ? ["monthly-package", "subscription", "quote", "time-materials"]
        : ["quote", "time-materials"],
    },
    commercialStatus: "draft",
    cta: { label: ctaLabel, href: `/contact?service=${draft.id}` },
    chatIntent: family.defaultChatIntent,
    pricing: { proposedModes: pricingModes, status: "pending-validation", note: pricingNote },
  };
}

const homeSource = "src/components/home/Home.tsx";
// Git reference identifies the pre-V2 wording without presenting it as live copy.
const legacyHomeSource = "git:27fde318c46830c4de61e43cbada368525ad8918:src/app/page.tsx (Home avant V2)";

const serviceProfiles: Readonly<Record<ServiceId, ServiceProfile>> = {
  "website": {
    "description": "Sites corporate, institutionnels, professionnels et catalogues ; création et refonte. Livrables et responsabilités à préciser au devis.",
    "useCases": [
      "Sites corporate",
      "institutionnels",
      "professionnels et catalogues ; création et refonte"
    ],
    "subservices": [
      "Sites corporate",
      "institutionnels",
      "professionnels et catalogues ; création et refonte"
    ],
    "seo": {
      "primaryKeyword": "site vitrine professionnel",
      "secondaryKeywords": [
        "site vitrine professionnel sur mesure",
        "Sites corporate"
      ],
      "searchIntents": [
        "commercial",
        "informational"
      ],
      "page": {
        "status": "recommended",
        "proposedPath": "/services/creation-refonte-site",
        "reason": "Besoin commercial distinct : page dédiée recommandée.",
        "groupedWith": null
      },
      "supportingContents": [
        "Guide de préparation : site vitrine professionnel",
        "Périmètre et livrables : site vitrine professionnel"
      ],
      "articleIdeas": [
        "Comment préparer un projet de site vitrine professionnel ?",
        "Quels indicateurs suivre pour site vitrine professionnel ?"
      ],
      "videoOpportunities": [
        "Démonstration commentée : site vitrine professionnel"
      ],
      "caseStudyIdeas": [
        "Cas à documenter avec accord : site vitrine professionnel ; contexte, actions, limites et indicateurs réels"
      ],
      "internalLinks": [
        "digital-strategy"
      ]
    },
    "recurrence": {
      "potential": "optional",
      "billingForms": [
        "quote",
        "time-materials"
      ],
      "note": "Évolutions ou suivi possibles, sans abonnement inclus automatiquement."
    },
    "commercialPriority": {
      "level": "high",
      "status": "proposed",
      "reason": "Priorité de présentation proposée selon la distinction du besoin, à valider commercialement."
    }
  },
  "landing-page": {
    "description": "Landing pages publicitaires et tunnels de conversion. Livrables et responsabilités à préciser au devis.",
    "useCases": [
      "Landing pages publicitaires et tunnels de conversion"
    ],
    "subservices": [
      "Landing pages publicitaires et tunnels de conversion"
    ],
    "seo": {
      "primaryKeyword": "création landing page",
      "secondaryKeywords": [
        "création landing page sur mesure",
        "Landing pages publicitaires et tunnels de conversion"
      ],
      "searchIntents": [
        "commercial",
        "informational"
      ],
      "page": {
        "status": "recommended",
        "proposedPath": "/services/landing-pages",
        "reason": "Besoin commercial distinct : page dédiée recommandée.",
        "groupedWith": null
      },
      "supportingContents": [
        "Guide de préparation : création landing page",
        "Périmètre et livrables : création landing page"
      ],
      "articleIdeas": [
        "Comment préparer un projet de création landing page ?",
        "Quels indicateurs suivre pour création landing page ?"
      ],
      "videoOpportunities": [
        "Démonstration commentée : création landing page"
      ],
      "caseStudyIdeas": [
        "Cas à documenter avec accord : création landing page ; contexte, actions, limites et indicateurs réels"
      ],
      "internalLinks": [
        "digital-strategy"
      ]
    },
    "recurrence": {
      "potential": "optional",
      "billingForms": [
        "quote",
        "time-materials"
      ],
      "note": "évolutions ou suivi possibles, sans abonnement inclus automatiquement."
    },
    "commercialPriority": {
      "level": "high",
      "status": "proposed",
      "reason": "Priorité de présentation proposée selon la distinction du besoin, à valider commercialement."
    }
  },
  "web-application": {
    "description": "SaaS, plateformes, extranets, portails clients, administration ; Next.js sur mesure, front/back. Livrables et responsabilités à préciser au devis.",
    "useCases": [
      "SaaS",
      "plateformes",
      "extranets",
      "portails clients",
      "administration ; Next.js sur mesure",
      "front/back"
    ],
    "subservices": [
      "SaaS",
      "plateformes",
      "extranets",
      "portails clients",
      "administration ; Next.js sur mesure",
      "front/back"
    ],
    "seo": {
      "primaryKeyword": "développement application web",
      "secondaryKeywords": [
        "développement application web sur mesure",
        "SaaS"
      ],
      "searchIntents": [
        "commercial",
        "informational"
      ],
      "page": {
        "status": "recommended",
        "proposedPath": "/services/applications-web",
        "reason": "Besoin commercial distinct : page dédiée recommandée.",
        "groupedWith": null
      },
      "supportingContents": [
        "Guide de préparation : développement application web",
        "Périmètre et livrables : développement application web"
      ],
      "articleIdeas": [
        "Comment préparer un projet de développement application web ?",
        "Quels indicateurs suivre pour développement application web ?"
      ],
      "videoOpportunities": [
        "Démonstration commentée : développement application web"
      ],
      "caseStudyIdeas": [
        "Cas à documenter avec accord : développement application web ; contexte, actions, limites et indicateurs réels"
      ],
      "internalLinks": [
        "digital-strategy"
      ]
    },
    "recurrence": {
      "potential": "optional",
      "billingForms": [
        "quote",
        "time-materials"
      ],
      "note": "évolutions ou suivi possibles, sans abonnement inclus automatiquement."
    },
    "commercialPriority": {
      "level": "high",
      "status": "proposed",
      "reason": "Priorité de présentation proposée selon la distinction du besoin, à valider commercialement."
    }
  },
  "business-tool": {
    "description": "CRM sur mesure, ERP léger, facturation, planning, gestion documentaire, back-office multi-utilisateurs, dashboards et APIs. Livrables et responsabilités à préciser au devis.",
    "useCases": [
      "CRM sur mesure",
      "ERP léger",
      "facturation",
      "planning",
      "gestion documentaire",
      "back-office multi-utilisateurs",
      "dashboards et APIs"
    ],
    "subservices": [
      "CRM sur mesure",
      "ERP léger",
      "facturation",
      "planning",
      "gestion documentaire",
      "back-office multi-utilisateurs",
      "dashboards et APIs"
    ],
    "seo": {
      "primaryKeyword": "logiciel métier sur mesure",
      "secondaryKeywords": [
        "logiciel métier sur mesure sur mesure",
        "CRM sur mesure"
      ],
      "searchIntents": [
        "commercial",
        "informational"
      ],
      "page": {
        "status": "recommended",
        "proposedPath": "/services/outils-metier-dashboards",
        "reason": "Besoin commercial distinct : page dédiée recommandée.",
        "groupedWith": null
      },
      "supportingContents": [
        "Guide de préparation : logiciel métier sur mesure",
        "Périmètre et livrables : logiciel métier sur mesure"
      ],
      "articleIdeas": [
        "Comment préparer un projet de logiciel métier sur mesure ?",
        "Quels indicateurs suivre pour logiciel métier sur mesure ?"
      ],
      "videoOpportunities": [
        "Démonstration commentée : logiciel métier sur mesure"
      ],
      "caseStudyIdeas": [
        "Cas à documenter avec accord : logiciel métier sur mesure ; contexte, actions, limites et indicateurs réels"
      ],
      "internalLinks": [
        "digital-strategy"
      ]
    },
    "recurrence": {
      "potential": "optional",
      "billingForms": [
        "quote",
        "time-materials"
      ],
      "note": "évolutions ou suivi possibles, sans abonnement inclus automatiquement."
    },
    "commercialPriority": {
      "level": "high",
      "status": "proposed",
      "reason": "Priorité de présentation proposée selon la distinction du besoin, à valider commercialement."
    }
  },
  "seo": {
    "description": "Audit SEO, technique, on-page, mots-clés, optimisation de contenu, maillage interne, positions et reporting. Livrables et responsabilités à préciser au devis.",
    "useCases": [
      "Audit SEO",
      "technique",
      "on-page",
      "mots-clés",
      "optimisation de contenu",
      "maillage interne",
      "positions et reporting"
    ],
    "subservices": [
      "Audit SEO",
      "technique",
      "on-page",
      "mots-clés",
      "optimisation de contenu",
      "maillage interne",
      "positions et reporting"
    ],
    "seo": {
      "primaryKeyword": "référencement naturel",
      "secondaryKeywords": [
        "référencement naturel sur mesure",
        "Audit SEO"
      ],
      "searchIntents": [
        "commercial",
        "informational"
      ],
      "page": {
        "status": "recommended",
        "proposedPath": "/services/referencement-naturel",
        "reason": "Besoin commercial distinct : page dédiée recommandée.",
        "groupedWith": null
      },
      "supportingContents": [
        "Guide de préparation : référencement naturel",
        "Périmètre et livrables : référencement naturel"
      ],
      "articleIdeas": [
        "Comment préparer un projet de référencement naturel ?",
        "Quels indicateurs suivre pour référencement naturel ?"
      ],
      "videoOpportunities": [
        "Démonstration commentée : référencement naturel"
      ],
      "caseStudyIdeas": [
        "Cas à documenter avec accord : référencement naturel ; contexte, actions, limites et indicateurs réels"
      ],
      "internalLinks": [
        "digital-strategy"
      ]
    },
    "recurrence": {
      "potential": "optional",
      "billingForms": [
        "quote",
        "time-materials"
      ],
      "note": "évolutions ou suivi possibles, sans abonnement inclus automatiquement."
    },
    "commercialPriority": {
      "level": "high",
      "status": "proposed",
      "reason": "Priorité de présentation proposée selon la distinction du besoin, à valider commercialement."
    }
  },
  "local-seo": {
    "description": "Google Maps, pages locales, création et optimisation initiale Google Business Profile, catégories, services, zones et stratégie d’avis. Livrables et responsabilités à préciser au devis.",
    "useCases": [
      "Google Maps",
      "pages locales",
      "création et optimisation initiale Google Business Profile",
      "catégories",
      "services",
      "zones et stratégie d’avis"
    ],
    "subservices": [
      "Google Maps",
      "pages locales",
      "création et optimisation initiale Google Business Profile",
      "catégories",
      "services",
      "zones et stratégie d’avis"
    ],
    "seo": {
      "primaryKeyword": "référencement local",
      "secondaryKeywords": [
        "référencement local sur mesure",
        "Google Maps"
      ],
      "searchIntents": [
        "commercial",
        "informational"
      ],
      "page": {
        "status": "recommended",
        "proposedPath": "/services/seo-local-google-business-profile",
        "reason": "Besoin commercial distinct : page dédiée recommandée.",
        "groupedWith": null
      },
      "supportingContents": [
        "Guide de préparation : référencement local",
        "Périmètre et livrables : référencement local"
      ],
      "articleIdeas": [
        "Comment préparer un projet de référencement local ?",
        "Quels indicateurs suivre pour référencement local ?"
      ],
      "videoOpportunities": [
        "Démonstration commentée : référencement local"
      ],
      "caseStudyIdeas": [
        "Cas à documenter avec accord : référencement local ; contexte, actions, limites et indicateurs réels"
      ],
      "internalLinks": [
        "digital-strategy"
      ]
    },
    "recurrence": {
      "potential": "optional",
      "billingForms": [
        "quote",
        "time-materials"
      ],
      "note": "évolutions ou suivi possibles, sans abonnement inclus automatiquement."
    },
    "commercialPriority": {
      "level": "high",
      "status": "proposed",
      "reason": "Priorité de présentation proposée selon la distinction du besoin, à valider commercialement."
    }
  },
  "google-ads": {
    "description": "Search Ads, Performance Max si pertinent, leads, retargeting, remarketing, optimisation des campagnes et coûts, reporting. Livrables et responsabilités à préciser au devis.",
    "useCases": [
      "Search Ads",
      "Performance Max si pertinent",
      "leads",
      "retargeting",
      "remarketing",
      "optimisation des campagnes et coûts",
      "reporting"
    ],
    "subservices": [
      "Search Ads",
      "Performance Max si pertinent",
      "leads",
      "retargeting",
      "remarketing",
      "optimisation des campagnes et coûts",
      "reporting"
    ],
    "seo": {
      "primaryKeyword": "gestion Google Ads",
      "secondaryKeywords": [
        "gestion Google Ads sur mesure",
        "Search Ads"
      ],
      "searchIntents": [
        "commercial",
        "informational"
      ],
      "page": {
        "status": "recommended",
        "proposedPath": "/services/google-ads",
        "reason": "Besoin commercial distinct : page dédiée recommandée.",
        "groupedWith": null
      },
      "supportingContents": [
        "Guide de préparation : gestion Google Ads",
        "Périmètre et livrables : gestion Google Ads"
      ],
      "articleIdeas": [
        "Comment préparer un projet de gestion Google Ads ?",
        "Quels indicateurs suivre pour gestion Google Ads ?"
      ],
      "videoOpportunities": [
        "Démonstration commentée : gestion Google Ads"
      ],
      "caseStudyIdeas": [
        "Cas à documenter avec accord : gestion Google Ads ; contexte, actions, limites et indicateurs réels"
      ],
      "internalLinks": [
        "digital-strategy"
      ]
    },
    "recurrence": {
      "potential": "optional",
      "billingForms": [
        "quote",
        "time-materials"
      ],
      "note": "évolutions ou suivi possibles, sans abonnement inclus automatiquement."
    },
    "commercialPriority": {
      "level": "high",
      "status": "proposed",
      "reason": "Priorité de présentation proposée selon la distinction du besoin, à valider commercialement."
    }
  },
  "local-services": {
    "description": "Campagnes Local Services selon éligibilité. Livrables et responsabilités à préciser au devis.",
    "useCases": [
      "Campagnes Local Services selon éligibilité"
    ],
    "subservices": [
      "Campagnes Local Services selon éligibilité"
    ],
    "seo": {
      "primaryKeyword": "Google Local Services",
      "secondaryKeywords": [
        "Google Local Services sur mesure",
        "Campagnes Local Services selon éligibilité"
      ],
      "searchIntents": [
        "commercial",
        "informational"
      ],
      "page": {
        "status": "grouped",
        "proposedPath": "/services/google-local-services",
        "reason": "Section de la page principale recommandée pour limiter les recouvrements.",
        "groupedWith": "google-ads"
      },
      "supportingContents": [
        "Guide de préparation : Google Local Services",
        "Périmètre et livrables : Google Local Services"
      ],
      "articleIdeas": [
        "Comment préparer un projet de Google Local Services ?",
        "Quels indicateurs suivre pour Google Local Services ?"
      ],
      "videoOpportunities": [
        "Démonstration commentée : Google Local Services"
      ],
      "caseStudyIdeas": [
        "Cas à documenter avec accord : Google Local Services ; contexte, actions, limites et indicateurs réels"
      ],
      "internalLinks": [
        "google-ads"
      ]
    },
    "recurrence": {
      "potential": "optional",
      "billingForms": [
        "quote",
        "time-materials"
      ],
      "note": "évolutions ou suivi possibles, sans abonnement inclus automatiquement."
    },
    "commercialPriority": {
      "level": "medium",
      "status": "proposed",
      "reason": "Priorité de présentation proposée selon la distinction du besoin, à valider commercialement."
    }
  },
  "meta-ads": {
    "description": "Facebook et Instagram Ads, leads, notoriété, retargeting et remarketing. Livrables et responsabilités à préciser au devis.",
    "useCases": [
      "Facebook et Instagram Ads",
      "leads",
      "notoriété",
      "retargeting et remarketing"
    ],
    "subservices": [
      "Facebook et Instagram Ads",
      "leads",
      "notoriété",
      "retargeting et remarketing"
    ],
    "seo": {
      "primaryKeyword": "agence Meta Ads",
      "secondaryKeywords": [
        "agence Meta Ads sur mesure",
        "Facebook et Instagram Ads"
      ],
      "searchIntents": [
        "commercial",
        "informational"
      ],
      "page": {
        "status": "recommended",
        "proposedPath": "/services/facebook-instagram-ads",
        "reason": "Besoin commercial distinct : page dédiée recommandée.",
        "groupedWith": null
      },
      "supportingContents": [
        "Guide de préparation : agence Meta Ads",
        "Périmètre et livrables : agence Meta Ads"
      ],
      "articleIdeas": [
        "Comment préparer un projet de agence Meta Ads ?",
        "Quels indicateurs suivre pour agence Meta Ads ?"
      ],
      "videoOpportunities": [
        "Démonstration commentée : agence Meta Ads"
      ],
      "caseStudyIdeas": [
        "Cas à documenter avec accord : agence Meta Ads ; contexte, actions, limites et indicateurs réels"
      ],
      "internalLinks": [
        "digital-strategy"
      ]
    },
    "recurrence": {
      "potential": "optional",
      "billingForms": [
        "quote",
        "time-materials"
      ],
      "note": "évolutions ou suivi possibles, sans abonnement inclus automatiquement."
    },
    "commercialPriority": {
      "level": "high",
      "status": "proposed",
      "reason": "Priorité de présentation proposée selon la distinction du besoin, à valider commercialement."
    }
  },
  "conversion-tracking": {
    "description": "GA4, Tag Manager, suivi des conversions, attribution et reporting publicitaire. Livrables et responsabilités à préciser au devis.",
    "useCases": [
      "GA4",
      "Tag Manager",
      "suivi des conversions",
      "attribution et reporting publicitaire"
    ],
    "subservices": [
      "GA4",
      "Tag Manager",
      "suivi des conversions",
      "attribution et reporting publicitaire"
    ],
    "seo": {
      "primaryKeyword": "tracking conversions GA4",
      "secondaryKeywords": [
        "tracking conversions GA4 sur mesure",
        "GA4"
      ],
      "searchIntents": [
        "commercial",
        "informational"
      ],
      "page": {
        "status": "grouped",
        "proposedPath": "/services/tracking-mesure-conversions",
        "reason": "Section de la page principale recommandée pour limiter les recouvrements.",
        "groupedWith": "google-ads"
      },
      "supportingContents": [
        "Guide de préparation : tracking conversions GA4",
        "Périmètre et livrables : tracking conversions GA4"
      ],
      "articleIdeas": [
        "Comment préparer un projet de tracking conversions GA4 ?",
        "Quels indicateurs suivre pour tracking conversions GA4 ?"
      ],
      "videoOpportunities": [
        "Démonstration commentée : tracking conversions GA4"
      ],
      "caseStudyIdeas": [
        "Cas à documenter avec accord : tracking conversions GA4 ; contexte, actions, limites et indicateurs réels"
      ],
      "internalLinks": [
        "google-ads"
      ]
    },
    "recurrence": {
      "potential": "optional",
      "billingForms": [
        "quote",
        "time-materials"
      ],
      "note": "évolutions ou suivi possibles, sans abonnement inclus automatiquement."
    },
    "commercialPriority": {
      "level": "medium",
      "status": "proposed",
      "reason": "Priorité de présentation proposée selon la distinction du besoin, à valider commercialement."
    }
  },
  "editorial-social": {
    "description": "Stratégie réseaux sociaux, calendrier éditorial, choix des plateformes et coordination contenu + ads. Livrables et responsabilités à préciser au devis.",
    "useCases": [
      "Stratégie réseaux sociaux",
      "calendrier éditorial",
      "choix des plateformes et coordination contenu + ads"
    ],
    "subservices": [
      "Stratégie réseaux sociaux",
      "calendrier éditorial",
      "choix des plateformes et coordination contenu + ads"
    ],
    "seo": {
      "primaryKeyword": "stratégie social media",
      "secondaryKeywords": [
        "stratégie social media sur mesure",
        "Stratégie réseaux sociaux"
      ],
      "searchIntents": [
        "commercial",
        "informational"
      ],
      "page": {
        "status": "grouped",
        "proposedPath": "/services/strategie-editoriale-reseaux-sociaux",
        "reason": "Section de la page principale recommandée pour limiter les recouvrements.",
        "groupedWith": "social-management"
      },
      "supportingContents": [
        "Guide de préparation : stratégie social media",
        "Périmètre et livrables : stratégie social media"
      ],
      "articleIdeas": [
        "Comment préparer un projet de stratégie social media ?",
        "Quels indicateurs suivre pour stratégie social media ?"
      ],
      "videoOpportunities": [
        "Démonstration commentée : stratégie social media"
      ],
      "caseStudyIdeas": [
        "Cas à documenter avec accord : stratégie social media ; contexte, actions, limites et indicateurs réels"
      ],
      "internalLinks": [
        "social-management"
      ]
    },
    "recurrence": {
      "potential": "optional",
      "billingForms": [
        "quote",
        "time-materials"
      ],
      "note": "évolutions ou suivi possibles, sans abonnement inclus automatiquement."
    },
    "commercialPriority": {
      "level": "medium",
      "status": "proposed",
      "reason": "Priorité de présentation proposée selon la distinction du besoin, à valider commercialement."
    }
  },
  "content-production": {
    "description": "Copywriting de site, contenus SEO, posts, visuels, carrousels, contenus Google Business Profile et campagnes, déclinaisons créatives. Livrables et responsabilités à préciser au devis.",
    "useCases": [
      "Copywriting de site",
      "contenus SEO",
      "posts",
      "visuels",
      "carrousels",
      "contenus Google Business Profile et campagnes",
      "déclinaisons créatives"
    ],
    "subservices": [
      "Copywriting de site",
      "contenus SEO",
      "posts",
      "visuels",
      "carrousels",
      "contenus Google Business Profile et campagnes",
      "déclinaisons créatives"
    ],
    "seo": {
      "primaryKeyword": "création contenu digital",
      "secondaryKeywords": [
        "création contenu digital sur mesure",
        "Copywriting de site"
      ],
      "searchIntents": [
        "commercial",
        "informational"
      ],
      "page": {
        "status": "recommended",
        "proposedPath": "/services/creation-contenus",
        "reason": "Besoin commercial distinct : page dédiée recommandée.",
        "groupedWith": null
      },
      "supportingContents": [
        "Guide de préparation : création contenu digital",
        "Périmètre et livrables : création contenu digital"
      ],
      "articleIdeas": [
        "Comment préparer un projet de création contenu digital ?",
        "Quels indicateurs suivre pour création contenu digital ?"
      ],
      "videoOpportunities": [
        "Démonstration commentée : création contenu digital"
      ],
      "caseStudyIdeas": [
        "Cas à documenter avec accord : création contenu digital ; contexte, actions, limites et indicateurs réels"
      ],
      "internalLinks": [
        "digital-strategy"
      ]
    },
    "recurrence": {
      "potential": "optional",
      "billingForms": [
        "quote",
        "time-materials"
      ],
      "note": "évolutions ou suivi possibles, sans abonnement inclus automatiquement."
    },
    "commercialPriority": {
      "level": "high",
      "status": "proposed",
      "reason": "Priorité de présentation proposée selon la distinction du besoin, à valider commercialement."
    }
  },
  "video-motion": {
    "description": "Montage, habillage graphique, publicités, vidéos explicatives, présentation, marque, démonstration, animation de logo, reels, stories, shorts et formats verticaux. Livrables et responsabilités à préciser au devis.",
    "useCases": [
      "Montage",
      "habillage graphique",
      "publicités",
      "vidéos explicatives",
      "présentation",
      "marque",
      "démonstration",
      "animation de logo",
      "reels",
      "stories",
      "shorts et formats verticaux"
    ],
    "subservices": [
      "Montage",
      "habillage graphique",
      "publicités",
      "vidéos explicatives",
      "présentation",
      "marque",
      "démonstration",
      "animation de logo",
      "reels",
      "stories",
      "shorts et formats verticaux"
    ],
    "seo": {
      "primaryKeyword": "motion design vidéo entreprise",
      "secondaryKeywords": [
        "motion design vidéo entreprise sur mesure",
        "Montage"
      ],
      "searchIntents": [
        "commercial",
        "informational"
      ],
      "page": {
        "status": "recommended",
        "proposedPath": "/services/video-motion-design",
        "reason": "Besoin commercial distinct : page dédiée recommandée.",
        "groupedWith": null
      },
      "supportingContents": [
        "Guide de préparation : motion design vidéo entreprise",
        "Périmètre et livrables : motion design vidéo entreprise"
      ],
      "articleIdeas": [
        "Comment préparer un projet de motion design vidéo entreprise ?",
        "Quels indicateurs suivre pour motion design vidéo entreprise ?"
      ],
      "videoOpportunities": [
        "Démonstration commentée : motion design vidéo entreprise"
      ],
      "caseStudyIdeas": [
        "Cas à documenter avec accord : motion design vidéo entreprise ; contexte, actions, limites et indicateurs réels"
      ],
      "internalLinks": [
        "digital-strategy"
      ]
    },
    "recurrence": {
      "potential": "optional",
      "billingForms": [
        "quote",
        "time-materials"
      ],
      "note": "évolutions ou suivi possibles, sans abonnement inclus automatiquement."
    },
    "commercialPriority": {
      "level": "high",
      "status": "proposed",
      "reason": "Priorité de présentation proposée selon la distinction du besoin, à valider commercialement."
    }
  },
  "business-workflows": {
    "description": "Workflows Make, CRM, qualification de leads, automatisation commerciale, marketing et SAV si pertinent, contenus, publications, documents et orchestration. Livrables et responsabilités à préciser au devis.",
    "useCases": [
      "Workflows Make",
      "CRM",
      "qualification de leads",
      "automatisation commerciale",
      "marketing et SAV si pertinent",
      "contenus",
      "publications",
      "documents et orchestration"
    ],
    "subservices": [
      "Workflows Make",
      "CRM",
      "qualification de leads",
      "automatisation commerciale",
      "marketing et SAV si pertinent",
      "contenus",
      "publications",
      "documents et orchestration"
    ],
    "seo": {
      "primaryKeyword": "automatisation métier Make",
      "secondaryKeywords": [
        "automatisation métier Make sur mesure",
        "Workflows Make"
      ],
      "searchIntents": [
        "commercial",
        "informational"
      ],
      "page": {
        "status": "recommended",
        "proposedPath": "/services/automatisation-processus",
        "reason": "Besoin commercial distinct : page dédiée recommandée.",
        "groupedWith": null
      },
      "supportingContents": [
        "Guide de préparation : automatisation métier Make",
        "Périmètre et livrables : automatisation métier Make"
      ],
      "articleIdeas": [
        "Comment préparer un projet de automatisation métier Make ?",
        "Quels indicateurs suivre pour automatisation métier Make ?"
      ],
      "videoOpportunities": [
        "Démonstration commentée : automatisation métier Make"
      ],
      "caseStudyIdeas": [
        "Cas à documenter avec accord : automatisation métier Make ; contexte, actions, limites et indicateurs réels"
      ],
      "internalLinks": [
        "digital-strategy"
      ]
    },
    "recurrence": {
      "potential": "optional",
      "billingForms": [
        "quote",
        "time-materials"
      ],
      "note": "évolutions ou suivi possibles, sans abonnement inclus automatiquement."
    },
    "commercialPriority": {
      "level": "high",
      "status": "proposed",
      "reason": "Priorité de présentation proposée selon la distinction du besoin, à valider commercialement."
    }
  },
  "airtable-workspace": {
    "description": "Bases Airtable et organisation des données métier. Livrables et responsabilités à préciser au devis.",
    "useCases": [
      "Bases Airtable et organisation des données métier"
    ],
    "subservices": [
      "Bases Airtable et organisation des données métier"
    ],
    "seo": {
      "primaryKeyword": "structuration Airtable",
      "secondaryKeywords": [
        "structuration Airtable sur mesure",
        "Bases Airtable et organisation des données métier"
      ],
      "searchIntents": [
        "commercial",
        "informational"
      ],
      "page": {
        "status": "grouped",
        "proposedPath": "/services/structuration-airtable",
        "reason": "Section de la page principale recommandée pour limiter les recouvrements.",
        "groupedWith": "business-workflows"
      },
      "supportingContents": [
        "Guide de préparation : structuration Airtable",
        "Périmètre et livrables : structuration Airtable"
      ],
      "articleIdeas": [
        "Comment préparer un projet de structuration Airtable ?",
        "Quels indicateurs suivre pour structuration Airtable ?"
      ],
      "videoOpportunities": [
        "Démonstration commentée : structuration Airtable"
      ],
      "caseStudyIdeas": [
        "Cas à documenter avec accord : structuration Airtable ; contexte, actions, limites et indicateurs réels"
      ],
      "internalLinks": [
        "business-workflows"
      ]
    },
    "recurrence": {
      "potential": "optional",
      "billingForms": [
        "quote",
        "time-materials"
      ],
      "note": "évolutions ou suivi possibles, sans abonnement inclus automatiquement."
    },
    "commercialPriority": {
      "level": "medium",
      "status": "proposed",
      "reason": "Priorité de présentation proposée selon la distinction du besoin, à valider commercialement."
    }
  },
  "api-integrations": {
    "description": "API, webhooks et synchronisation d’outils. Livrables et responsabilités à préciser au devis.",
    "useCases": [
      "API",
      "webhooks et synchronisation d’outils"
    ],
    "subservices": [
      "API",
      "webhooks et synchronisation d’outils"
    ],
    "seo": {
      "primaryKeyword": "intégration API outils",
      "secondaryKeywords": [
        "intégration API outils sur mesure",
        "API"
      ],
      "searchIntents": [
        "commercial",
        "informational"
      ],
      "page": {
        "status": "grouped",
        "proposedPath": "/services/integrations-api",
        "reason": "Section de la page principale recommandée pour limiter les recouvrements.",
        "groupedWith": "business-workflows"
      },
      "supportingContents": [
        "Guide de préparation : intégration API outils",
        "Périmètre et livrables : intégration API outils"
      ],
      "articleIdeas": [
        "Comment préparer un projet de intégration API outils ?",
        "Quels indicateurs suivre pour intégration API outils ?"
      ],
      "videoOpportunities": [
        "Démonstration commentée : intégration API outils"
      ],
      "caseStudyIdeas": [
        "Cas à documenter avec accord : intégration API outils ; contexte, actions, limites et indicateurs réels"
      ],
      "internalLinks": [
        "business-workflows"
      ]
    },
    "recurrence": {
      "potential": "optional",
      "billingForms": [
        "quote",
        "time-materials"
      ],
      "note": "évolutions ou suivi possibles, sans abonnement inclus automatiquement."
    },
    "commercialPriority": {
      "level": "medium",
      "status": "proposed",
      "reason": "Priorité de présentation proposée selon la distinction du besoin, à valider commercialement."
    }
  },
  "ai-agents": {
    "description": "Assistants IA, chatbot, agents spécialisés et d’analyse, génération de documents et contenus, classification, résumé et extraction avec contrôle humain. Livrables et responsabilités à préciser au devis.",
    "useCases": [
      "Assistants IA",
      "chatbot",
      "agents spécialisés et d’analyse",
      "génération de documents et contenus",
      "classification",
      "résumé et extraction avec contrôle humain"
    ],
    "subservices": [
      "Assistants IA",
      "chatbot",
      "agents spécialisés et d’analyse",
      "génération de documents et contenus",
      "classification",
      "résumé et extraction avec contrôle humain"
    ],
    "seo": {
      "primaryKeyword": "agents IA entreprise",
      "secondaryKeywords": [
        "agents IA entreprise sur mesure",
        "Assistants IA"
      ],
      "searchIntents": [
        "commercial",
        "informational"
      ],
      "page": {
        "status": "recommended",
        "proposedPath": "/services/agents-ia-assistants-metier",
        "reason": "Besoin commercial distinct : page dédiée recommandée.",
        "groupedWith": null
      },
      "supportingContents": [
        "Guide de préparation : agents IA entreprise",
        "Périmètre et livrables : agents IA entreprise"
      ],
      "articleIdeas": [
        "Comment préparer un projet de agents IA entreprise ?",
        "Quels indicateurs suivre pour agents IA entreprise ?"
      ],
      "videoOpportunities": [
        "Démonstration commentée : agents IA entreprise"
      ],
      "caseStudyIdeas": [
        "Cas à documenter avec accord : agents IA entreprise ; contexte, actions, limites et indicateurs réels"
      ],
      "internalLinks": [
        "digital-strategy"
      ]
    },
    "recurrence": {
      "potential": "optional",
      "billingForms": [
        "quote",
        "time-materials"
      ],
      "note": "évolutions ou suivi possibles, sans abonnement inclus automatiquement."
    },
    "commercialPriority": {
      "level": "high",
      "status": "proposed",
      "reason": "Priorité de présentation proposée selon la distinction du besoin, à valider commercialement."
    }
  },
  "automated-reporting": {
    "description": "Reporting métier, SEO, Ads et social, monitoring et alertes intelligentes. Livrables et responsabilités à préciser au devis.",
    "useCases": [
      "Reporting métier",
      "SEO",
      "Ads et social",
      "monitoring et alertes intelligentes"
    ],
    "subservices": [
      "Reporting métier",
      "SEO",
      "Ads et social",
      "monitoring et alertes intelligentes"
    ],
    "seo": {
      "primaryKeyword": "reporting automatis?",
      "secondaryKeywords": [
        "reporting automatis? sur mesure",
        "Reporting métier"
      ],
      "searchIntents": [
        "commercial",
        "informational"
      ],
      "page": {
        "status": "grouped",
        "proposedPath": "/services/reporting-automatise",
        "reason": "Section de la page principale recommandée pour limiter les recouvrements.",
        "groupedWith": "business-workflows"
      },
      "supportingContents": [
        "Guide de préparation : reporting automatis?",
        "Périmètre et livrables : reporting automatis?"
      ],
      "articleIdeas": [
        "Comment préparer un projet de reporting automatis? ?",
        "Quels indicateurs suivre pour reporting automatis? ?"
      ],
      "videoOpportunities": [
        "Démonstration commentée : reporting automatis?"
      ],
      "caseStudyIdeas": [
        "Cas à documenter avec accord : reporting automatis? ; contexte, actions, limites et indicateurs réels"
      ],
      "internalLinks": [
        "business-workflows"
      ]
    },
    "recurrence": {
      "potential": "optional",
      "billingForms": [
        "quote",
        "time-materials"
      ],
      "note": "évolutions ou suivi possibles, sans abonnement inclus automatiquement."
    },
    "commercialPriority": {
      "level": "medium",
      "status": "proposed",
      "reason": "Priorité de présentation proposée selon la distinction du besoin, à valider commercialement."
    }
  },
  "ecommerce": {
    "description": "Boutiques en ligne, catalogue, panier, paiement, commandes et connexions stocks. Livrables et responsabilités à préciser au devis.",
    "useCases": [
      "Boutiques en ligne",
      "catalogue",
      "panier",
      "paiement",
      "commandes et connexions stocks"
    ],
    "subservices": [
      "Boutiques en ligne",
      "catalogue",
      "panier",
      "paiement",
      "commandes et connexions stocks"
    ],
    "seo": {
      "primaryKeyword": "création site e-commerce",
      "secondaryKeywords": [
        "création site e-commerce sur mesure",
        "Boutiques en ligne"
      ],
      "searchIntents": [
        "commercial",
        "informational"
      ],
      "page": {
        "status": "recommended",
        "proposedPath": "/services/ecommerce",
        "reason": "Besoin commercial distinct : page dédiée recommandée.",
        "groupedWith": null
      },
      "supportingContents": [
        "Guide de préparation : création site e-commerce",
        "Périmètre et livrables : création site e-commerce"
      ],
      "articleIdeas": [
        "Comment préparer un projet de création site e-commerce ?",
        "Quels indicateurs suivre pour création site e-commerce ?"
      ],
      "videoOpportunities": [
        "Démonstration commentée : création site e-commerce"
      ],
      "caseStudyIdeas": [
        "Cas à documenter avec accord : création site e-commerce ; contexte, actions, limites et indicateurs réels"
      ],
      "internalLinks": [
        "digital-strategy"
      ]
    },
    "recurrence": {
      "potential": "optional",
      "billingForms": [
        "quote",
        "time-materials"
      ],
      "note": "évolutions ou suivi possibles, sans abonnement inclus automatiquement."
    },
    "commercialPriority": {
      "level": "high",
      "status": "proposed",
      "reason": "Priorité de présentation proposée selon la distinction du besoin, à valider commercialement."
    }
  },
  "mobile-app": {
    "description": "Applications mobiles, Progressive Web Apps et applications natives si pertinentes. Livrables et responsabilités à préciser au devis.",
    "useCases": [
      "Applications mobiles",
      "Progressive Web Apps et applications natives si pertinentes"
    ],
    "subservices": [
      "Applications mobiles",
      "Progressive Web Apps et applications natives si pertinentes"
    ],
    "seo": {
      "primaryKeyword": "développement application mobile",
      "secondaryKeywords": [
        "développement application mobile sur mesure",
        "Applications mobiles"
      ],
      "searchIntents": [
        "commercial",
        "informational"
      ],
      "page": {
        "status": "conditional",
        "proposedPath": "/services/mobile-app",
        "reason": "Page dédiée conditionnée à la demande, aux références et à la capacité de livraison.",
        "groupedWith": "web-application"
      },
      "supportingContents": [
        "Guide de préparation : développement application mobile",
        "Périmètre et livrables : développement application mobile"
      ],
      "articleIdeas": [
        "Comment préparer un projet de développement application mobile ?",
        "Quels indicateurs suivre pour développement application mobile ?"
      ],
      "videoOpportunities": [
        "Démonstration commentée : développement application mobile"
      ],
      "caseStudyIdeas": [
        "Cas à documenter avec accord : développement application mobile ; contexte, actions, limites et indicateurs réels"
      ],
      "internalLinks": [
        "web-application"
      ]
    },
    "recurrence": {
      "potential": "optional",
      "billingForms": [
        "quote",
        "time-materials"
      ],
      "note": "évolutions ou suivi possibles, sans abonnement inclus automatiquement."
    },
    "commercialPriority": {
      "level": "medium",
      "status": "proposed",
      "reason": "Priorité de présentation proposée selon la distinction du besoin, à valider commercialement."
    }
  },
  "web-migration": {
    "description": "Migration technique, reprise des contenus et plan de redirections. Livrables et responsabilités à préciser au devis.",
    "useCases": [
      "Migration technique",
      "reprise des contenus et plan de redirections"
    ],
    "subservices": [
      "Migration technique",
      "reprise des contenus et plan de redirections"
    ],
    "seo": {
      "primaryKeyword": "migration site web",
      "secondaryKeywords": [
        "migration site web sur mesure",
        "Migration technique"
      ],
      "searchIntents": [
        "commercial",
        "informational"
      ],
      "page": {
        "status": "grouped",
        "proposedPath": "/services/web-migration",
        "reason": "Section de la page principale recommandée pour limiter les recouvrements.",
        "groupedWith": "website"
      },
      "supportingContents": [
        "Guide de préparation : migration site web",
        "Périmètre et livrables : migration site web"
      ],
      "articleIdeas": [
        "Comment préparer un projet de migration site web ?",
        "Quels indicateurs suivre pour migration site web ?"
      ],
      "videoOpportunities": [
        "Démonstration commentée : migration site web"
      ],
      "caseStudyIdeas": [
        "Cas à documenter avec accord : migration site web ; contexte, actions, limites et indicateurs réels"
      ],
      "internalLinks": [
        "website"
      ]
    },
    "recurrence": {
      "potential": "optional",
      "billingForms": [
        "quote",
        "time-materials"
      ],
      "note": "évolutions ou suivi possibles, sans abonnement inclus automatiquement."
    },
    "commercialPriority": {
      "level": "medium",
      "status": "proposed",
      "reason": "Priorité de présentation proposée selon la distinction du besoin, à valider commercialement."
    }
  },
  "ux-conversion": {
    "description": "UX/UI, CRO, optimisation de landing pages, accessibilit? et performance. Livrables et responsabilités à préciser au devis.",
    "useCases": [
      "UX/UI",
      "CRO",
      "optimisation de landing pages",
      "accessibilit? et performance"
    ],
    "subservices": [
      "UX/UI",
      "CRO",
      "optimisation de landing pages",
      "accessibilit? et performance"
    ],
    "seo": {
      "primaryKeyword": "optimisation UX conversion",
      "secondaryKeywords": [
        "optimisation UX conversion sur mesure",
        "UX/UI"
      ],
      "searchIntents": [
        "commercial",
        "informational"
      ],
      "page": {
        "status": "grouped",
        "proposedPath": "/services/ux-conversion",
        "reason": "Section de la page principale recommandée pour limiter les recouvrements.",
        "groupedWith": "landing-page"
      },
      "supportingContents": [
        "Guide de préparation : optimisation UX conversion",
        "Périmètre et livrables : optimisation UX conversion"
      ],
      "articleIdeas": [
        "Comment préparer un projet de optimisation UX conversion ?",
        "Quels indicateurs suivre pour optimisation UX conversion ?"
      ],
      "videoOpportunities": [
        "Démonstration commentée : optimisation UX conversion"
      ],
      "caseStudyIdeas": [
        "Cas à documenter avec accord : optimisation UX conversion ; contexte, actions, limites et indicateurs réels"
      ],
      "internalLinks": [
        "landing-page"
      ]
    },
    "recurrence": {
      "potential": "optional",
      "billingForms": [
        "quote",
        "time-materials"
      ],
      "note": "évolutions ou suivi possibles, sans abonnement inclus automatiquement."
    },
    "commercialPriority": {
      "level": "medium",
      "status": "proposed",
      "reason": "Priorité de présentation proposée selon la distinction du besoin, à valider commercialement."
    }
  },
  "gbp-management": {
    "description": "Publications, actualités, photos, réponses aux avis et reporting local. Livrables et responsabilités à préciser au devis.",
    "useCases": [
      "Publications",
      "actualités",
      "photos",
      "réponses aux avis et reporting local"
    ],
    "subservices": [
      "Publications",
      "actualités",
      "photos",
      "réponses aux avis et reporting local"
    ],
    "seo": {
      "primaryKeyword": "gestion Google Business Profile",
      "secondaryKeywords": [
        "gestion Google Business Profile sur mesure",
        "Publications"
      ],
      "searchIntents": [
        "commercial",
        "informational"
      ],
      "page": {
        "status": "grouped",
        "proposedPath": "/services/gbp-management",
        "reason": "Section de la page principale recommandée pour limiter les recouvrements.",
        "groupedWith": "local-seo"
      },
      "supportingContents": [
        "Guide de préparation : gestion Google Business Profile",
        "Périmètre et livrables : gestion Google Business Profile"
      ],
      "articleIdeas": [
        "Comment préparer un projet de gestion Google Business Profile ?",
        "Quels indicateurs suivre pour gestion Google Business Profile ?"
      ],
      "videoOpportunities": [
        "Démonstration commentée : gestion Google Business Profile"
      ],
      "caseStudyIdeas": [
        "Cas à documenter avec accord : gestion Google Business Profile ; contexte, actions, limites et indicateurs réels"
      ],
      "internalLinks": [
        "local-seo"
      ]
    },
    "recurrence": {
      "potential": "core",
      "billingForms": [
        "monthly-package",
        "subscription",
        "quote",
        "time-materials"
      ],
      "note": "Suivi régulier à contractualiser : fréquence, volume, support et responsabilités."
    },
    "commercialPriority": {
      "level": "medium",
      "status": "proposed",
      "reason": "Priorité de présentation proposée selon la distinction du besoin, à valider commercialement."
    }
  },
  "social-management": {
    "description": "Community management, gestion de comptes, rédaction, visuels, planification, publication Facebook Instagram, LinkedIn TikTok si pertinents, modération commentaires et messages selon mandat, gestion de communauté et présence de marque, reporting, analyse, optimisation éditoriale et croissance organique. Livrables et responsabilités à préciser au devis.",
    "useCases": [
      "Community management",
      "gestion de comptes",
      "rédaction",
      "visuels",
      "planification",
      "publication Facebook Instagram",
      "LinkedIn TikTok si pertinents",
      "modération commentaires et messages selon mandat",
      "gestion de communauté et présence de marque",
      "reporting",
      "analyse",
      "optimisation éditoriale et croissance organique"
    ],
    "subservices": [
      "Community management",
      "gestion de comptes",
      "rédaction",
      "visuels",
      "planification",
      "publication Facebook Instagram",
      "LinkedIn TikTok si pertinents",
      "modération commentaires et messages selon mandat",
      "gestion de communauté et présence de marque",
      "reporting",
      "analyse",
      "optimisation éditoriale et croissance organique"
    ],
    "seo": {
      "primaryKeyword": "gestion réseaux sociaux",
      "secondaryKeywords": [
        "gestion réseaux sociaux sur mesure",
        "Community management"
      ],
      "searchIntents": [
        "commercial",
        "informational"
      ],
      "page": {
        "status": "recommended",
        "proposedPath": "/services/social-management",
        "reason": "Besoin commercial distinct : page dédiée recommandée.",
        "groupedWith": null
      },
      "supportingContents": [
        "Guide de préparation : gestion réseaux sociaux",
        "Périmètre et livrables : gestion réseaux sociaux"
      ],
      "articleIdeas": [
        "Comment préparer un projet de gestion réseaux sociaux ?",
        "Quels indicateurs suivre pour gestion réseaux sociaux ?"
      ],
      "videoOpportunities": [
        "Démonstration commentée : gestion réseaux sociaux"
      ],
      "caseStudyIdeas": [
        "Cas à documenter avec accord : gestion réseaux sociaux ; contexte, actions, limites et indicateurs réels"
      ],
      "internalLinks": [
        "digital-strategy"
      ]
    },
    "recurrence": {
      "potential": "core",
      "billingForms": [
        "monthly-package",
        "subscription",
        "quote",
        "time-materials"
      ],
      "note": "Suivi régulier à contractualiser : fréquence, volume, support et responsabilités."
    },
    "commercialPriority": {
      "level": "high",
      "status": "proposed",
      "reason": "Priorité de présentation proposée selon la distinction du besoin, à valider commercialement."
    }
  },
  "editorial-strategy": {
    "description": "Messages, thèmes, formats et calendrier pour site, SEO et campagnes. Livrables et responsabilités à préciser au devis.",
    "useCases": [
      "Messages",
      "thèmes",
      "formats et calendrier pour site",
      "SEO et campagnes"
    ],
    "subservices": [
      "Messages",
      "thèmes",
      "formats et calendrier pour site",
      "SEO et campagnes"
    ],
    "seo": {
      "primaryKeyword": "stratégie éditoriale",
      "secondaryKeywords": [
        "stratégie éditoriale sur mesure",
        "Messages"
      ],
      "searchIntents": [
        "commercial",
        "informational"
      ],
      "page": {
        "status": "grouped",
        "proposedPath": "/services/editorial-strategy",
        "reason": "Section de la page principale recommandée pour limiter les recouvrements.",
        "groupedWith": "content-production"
      },
      "supportingContents": [
        "Guide de préparation : stratégie éditoriale",
        "Périmètre et livrables : stratégie éditoriale"
      ],
      "articleIdeas": [
        "Comment préparer un projet de stratégie éditoriale ?",
        "Quels indicateurs suivre pour stratégie éditoriale ?"
      ],
      "videoOpportunities": [
        "Démonstration commentée : stratégie éditoriale"
      ],
      "caseStudyIdeas": [
        "Cas à documenter avec accord : stratégie éditoriale ; contexte, actions, limites et indicateurs réels"
      ],
      "internalLinks": [
        "content-production"
      ]
    },
    "recurrence": {
      "potential": "optional",
      "billingForms": [
        "quote",
        "time-materials"
      ],
      "note": "évolutions ou suivi possibles, sans abonnement inclus automatiquement."
    },
    "commercialPriority": {
      "level": "medium",
      "status": "proposed",
      "reason": "Priorité de présentation proposée selon la distinction du besoin, à valider commercialement."
    }
  },
  "digital-identity": {
    "description": "Identité graphique appliquée au digital, charte, templates et déclinaisons de marque. Livrables et responsabilités à préciser au devis.",
    "useCases": [
      "Identité graphique appliquée au digital",
      "charte",
      "templates et déclinaisons de marque"
    ],
    "subservices": [
      "Identité graphique appliquée au digital",
      "charte",
      "templates et déclinaisons de marque"
    ],
    "seo": {
      "primaryKeyword": "identité graphique digitale",
      "secondaryKeywords": [
        "identité graphique digitale sur mesure",
        "Identité graphique appliquée au digital"
      ],
      "searchIntents": [
        "commercial",
        "informational"
      ],
      "page": {
        "status": "grouped",
        "proposedPath": "/services/digital-identity",
        "reason": "Section de la page principale recommandée pour limiter les recouvrements.",
        "groupedWith": "content-production"
      },
      "supportingContents": [
        "Guide de préparation : identité graphique digitale",
        "Périmètre et livrables : identité graphique digitale"
      ],
      "articleIdeas": [
        "Comment préparer un projet de identité graphique digitale ?",
        "Quels indicateurs suivre pour identité graphique digitale ?"
      ],
      "videoOpportunities": [
        "Démonstration commentée : identité graphique digitale"
      ],
      "caseStudyIdeas": [
        "Cas à documenter avec accord : identité graphique digitale ; contexte, actions, limites et indicateurs réels"
      ],
      "internalLinks": [
        "content-production"
      ]
    },
    "recurrence": {
      "potential": "optional",
      "billingForms": [
        "quote",
        "time-materials"
      ],
      "note": "évolutions ou suivi possibles, sans abonnement inclus automatiquement."
    },
    "commercialPriority": {
      "level": "medium",
      "status": "proposed",
      "reason": "Priorité de présentation proposée selon la distinction du besoin, à valider commercialement."
    }
  },
  "digital-strategy": {
    "description": "Audit global, diagnostic, feuille de route, priorisation, plan d’action, acquisition multicanal et coordination site SEO social contenu publicit? automatisation IA logiciels métier. Livrables et responsabilités à préciser au devis.",
    "useCases": [
      "Audit global",
      "diagnostic",
      "feuille de route",
      "priorisation",
      "plan d’action",
      "acquisition multicanal et coordination site SEO social contenu publicit? automatisation IA logiciels métier"
    ],
    "subservices": [
      "Audit global",
      "diagnostic",
      "feuille de route",
      "priorisation",
      "plan d’action",
      "acquisition multicanal et coordination site SEO social contenu publicit? automatisation IA logiciels métier"
    ],
    "seo": {
      "primaryKeyword": "stratégie digitale entreprise",
      "secondaryKeywords": [
        "stratégie digitale entreprise sur mesure",
        "Audit global"
      ],
      "searchIntents": [
        "commercial",
        "informational"
      ],
      "page": {
        "status": "recommended",
        "proposedPath": "/services/digital-strategy",
        "reason": "Besoin commercial distinct : page dédiée recommandée.",
        "groupedWith": null
      },
      "supportingContents": [
        "Guide de préparation : stratégie digitale entreprise",
        "Périmètre et livrables : stratégie digitale entreprise"
      ],
      "articleIdeas": [
        "Comment préparer un projet de stratégie digitale entreprise ?",
        "Quels indicateurs suivre pour stratégie digitale entreprise ?"
      ],
      "videoOpportunities": [
        "Démonstration commentée : stratégie digitale entreprise"
      ],
      "caseStudyIdeas": [
        "Cas à documenter avec accord : stratégie digitale entreprise ; contexte, actions, limites et indicateurs réels"
      ],
      "internalLinks": [
        "digital-accompaniment"
      ]
    },
    "recurrence": {
      "potential": "optional",
      "billingForms": [
        "quote",
        "time-materials"
      ],
      "note": "évolutions ou suivi possibles, sans abonnement inclus automatiquement."
    },
    "commercialPriority": {
      "level": "high",
      "status": "proposed",
      "reason": "Priorité de présentation proposée selon la distinction du besoin, à valider commercialement."
    }
  },
  "website-care": {
    "description": "Mises à jour, sécurité, sauvegardes, petites évolutions et support. Livrables et responsabilités à préciser au devis.",
    "useCases": [
      "Mises à jour",
      "sécurité",
      "sauvegardes",
      "petites évolutions et support"
    ],
    "subservices": [
      "Mises à jour",
      "sécurité",
      "sauvegardes",
      "petites évolutions et support"
    ],
    "seo": {
      "primaryKeyword": "maintenance site web",
      "secondaryKeywords": [
        "maintenance site web sur mesure",
        "Mises à jour"
      ],
      "searchIntents": [
        "commercial",
        "informational"
      ],
      "page": {
        "status": "recommended",
        "proposedPath": "/services/website-care",
        "reason": "Besoin commercial distinct : page dédiée recommandée.",
        "groupedWith": null
      },
      "supportingContents": [
        "Guide de préparation : maintenance site web",
        "Périmètre et livrables : maintenance site web"
      ],
      "articleIdeas": [
        "Comment préparer un projet de maintenance site web ?",
        "Quels indicateurs suivre pour maintenance site web ?"
      ],
      "videoOpportunities": [
        "Démonstration commentée : maintenance site web"
      ],
      "caseStudyIdeas": [
        "Cas à documenter avec accord : maintenance site web ; contexte, actions, limites et indicateurs réels"
      ],
      "internalLinks": [
        "digital-strategy"
      ]
    },
    "recurrence": {
      "potential": "core",
      "billingForms": [
        "monthly-package",
        "subscription",
        "quote",
        "time-materials"
      ],
      "note": "Suivi régulier à contractualiser : fréquence, volume, support et responsabilités."
    },
    "commercialPriority": {
      "level": "high",
      "status": "proposed",
      "reason": "Priorité de présentation proposée selon la distinction du besoin, à valider commercialement."
    }
  },
  "hosting-supervision": {
    "description": "Hébergement, supervision, alertes, sauvegardes et restauration. Livrables et responsabilités à préciser au devis.",
    "useCases": [
      "Hébergement",
      "supervision",
      "alertes",
      "sauvegardes et restauration"
    ],
    "subservices": [
      "Hébergement",
      "supervision",
      "alertes",
      "sauvegardes et restauration"
    ],
    "seo": {
      "primaryKeyword": "hébergement supervision site",
      "secondaryKeywords": [
        "hébergement supervision site sur mesure",
        "Hébergement"
      ],
      "searchIntents": [
        "commercial",
        "informational"
      ],
      "page": {
        "status": "grouped",
        "proposedPath": "/services/hosting-supervision",
        "reason": "Section de la page principale recommandée pour limiter les recouvrements.",
        "groupedWith": "website-care"
      },
      "supportingContents": [
        "Guide de préparation : hébergement supervision site",
        "Périmètre et livrables : hébergement supervision site"
      ],
      "articleIdeas": [
        "Comment préparer un projet de hébergement supervision site ?",
        "Quels indicateurs suivre pour hébergement supervision site ?"
      ],
      "videoOpportunities": [
        "Démonstration commentée : hébergement supervision site"
      ],
      "caseStudyIdeas": [
        "Cas à documenter avec accord : hébergement supervision site ; contexte, actions, limites et indicateurs réels"
      ],
      "internalLinks": [
        "website-care"
      ]
    },
    "recurrence": {
      "potential": "core",
      "billingForms": [
        "monthly-package",
        "subscription",
        "quote",
        "time-materials"
      ],
      "note": "Suivi régulier à contractualiser : fréquence, volume, support et responsabilités."
    },
    "commercialPriority": {
      "level": "medium",
      "status": "proposed",
      "reason": "Priorité de présentation proposée selon la distinction du besoin, à valider commercialement."
    }
  },
  "application-support": {
    "description": "Maintenance d’applications, correctifs, évolutions et support SaaS. Livrables et responsabilités à préciser au devis.",
    "useCases": [
      "Maintenance d’applications",
      "correctifs",
      "évolutions et support SaaS"
    ],
    "subservices": [
      "Maintenance d’applications",
      "correctifs",
      "évolutions et support SaaS"
    ],
    "seo": {
      "primaryKeyword": "maintenance applicative",
      "secondaryKeywords": [
        "maintenance applicative sur mesure",
        "Maintenance d’applications"
      ],
      "searchIntents": [
        "commercial",
        "informational"
      ],
      "page": {
        "status": "grouped",
        "proposedPath": "/services/application-support",
        "reason": "Section de la page principale recommandée pour limiter les recouvrements.",
        "groupedWith": "business-tool"
      },
      "supportingContents": [
        "Guide de préparation : maintenance applicative",
        "Périmètre et livrables : maintenance applicative"
      ],
      "articleIdeas": [
        "Comment préparer un projet de maintenance applicative ?",
        "Quels indicateurs suivre pour maintenance applicative ?"
      ],
      "videoOpportunities": [
        "Démonstration commentée : maintenance applicative"
      ],
      "caseStudyIdeas": [
        "Cas à documenter avec accord : maintenance applicative ; contexte, actions, limites et indicateurs réels"
      ],
      "internalLinks": [
        "business-tool"
      ]
    },
    "recurrence": {
      "potential": "core",
      "billingForms": [
        "monthly-package",
        "subscription",
        "quote",
        "time-materials"
      ],
      "note": "Suivi régulier à contractualiser : fréquence, volume, support et responsabilités."
    },
    "commercialPriority": {
      "level": "medium",
      "status": "proposed",
      "reason": "Priorité de présentation proposée selon la distinction du besoin, à valider commercialement."
    }
  },
  "automation-supervision": {
    "description": "Support automatisations, supervision workflows et agents IA, alertes, incidents et évaluations. Livrables et responsabilités à préciser au devis.",
    "useCases": [
      "Support automatisations",
      "supervision workflows et agents IA",
      "alertes",
      "incidents et évaluations"
    ],
    "subservices": [
      "Support automatisations",
      "supervision workflows et agents IA",
      "alertes",
      "incidents et évaluations"
    ],
    "seo": {
      "primaryKeyword": "maintenance automatisations IA",
      "secondaryKeywords": [
        "maintenance automatisations IA sur mesure",
        "Support automatisations"
      ],
      "searchIntents": [
        "commercial",
        "informational"
      ],
      "page": {
        "status": "grouped",
        "proposedPath": "/services/automation-supervision",
        "reason": "Section de la page principale recommandée pour limiter les recouvrements.",
        "groupedWith": "business-workflows"
      },
      "supportingContents": [
        "Guide de préparation : maintenance automatisations IA",
        "Périmètre et livrables : maintenance automatisations IA"
      ],
      "articleIdeas": [
        "Comment préparer un projet de maintenance automatisations IA ?",
        "Quels indicateurs suivre pour maintenance automatisations IA ?"
      ],
      "videoOpportunities": [
        "Démonstration commentée : maintenance automatisations IA"
      ],
      "caseStudyIdeas": [
        "Cas à documenter avec accord : maintenance automatisations IA ; contexte, actions, limites et indicateurs réels"
      ],
      "internalLinks": [
        "business-workflows"
      ]
    },
    "recurrence": {
      "potential": "core",
      "billingForms": [
        "monthly-package",
        "subscription",
        "quote",
        "time-materials"
      ],
      "note": "Suivi régulier à contractualiser : fréquence, volume, support et responsabilités."
    },
    "commercialPriority": {
      "level": "medium",
      "status": "proposed",
      "reason": "Priorité de présentation proposée selon la distinction du besoin, à valider commercialement."
    }
  },
  "digital-accompaniment": {
    "description": "Reporting mensuel, accompagnement SEO Ads réseaux sociaux et coordination globale. Livrables et responsabilités à préciser au devis.",
    "useCases": [
      "Reporting mensuel",
      "accompagnement SEO Ads réseaux sociaux et coordination globale"
    ],
    "subservices": [
      "Reporting mensuel",
      "accompagnement SEO Ads réseaux sociaux et coordination globale"
    ],
    "seo": {
      "primaryKeyword": "accompagnement digital mensuel",
      "secondaryKeywords": [
        "accompagnement digital mensuel sur mesure",
        "Reporting mensuel"
      ],
      "searchIntents": [
        "commercial",
        "informational"
      ],
      "page": {
        "status": "recommended",
        "proposedPath": "/services/digital-accompaniment",
        "reason": "Besoin commercial distinct : page dédiée recommandée.",
        "groupedWith": null
      },
      "supportingContents": [
        "Guide de préparation : accompagnement digital mensuel",
        "Périmètre et livrables : accompagnement digital mensuel"
      ],
      "articleIdeas": [
        "Comment préparer un projet de accompagnement digital mensuel ?",
        "Quels indicateurs suivre pour accompagnement digital mensuel ?"
      ],
      "videoOpportunities": [
        "Démonstration commentée : accompagnement digital mensuel"
      ],
      "caseStudyIdeas": [
        "Cas à documenter avec accord : accompagnement digital mensuel ; contexte, actions, limites et indicateurs réels"
      ],
      "internalLinks": [
        "digital-strategy"
      ]
    },
    "recurrence": {
      "potential": "core",
      "billingForms": [
        "monthly-package",
        "subscription",
        "quote",
        "time-materials"
      ],
      "note": "Suivi régulier à contractualiser : fréquence, volume, support et responsabilités."
    },
    "commercialPriority": {
      "level": "high",
      "status": "proposed",
      "reason": "Priorité de présentation proposée selon la distinction du besoin, à valider commercialement."
    }
  }
};

export const services: readonly Service[] = [
  defineService({
    id: "website", slug: "creation-refonte-site", name: "Création & refonte de sites professionnels", category: "web",
    summary: "Un site professionnel qui présente votre activité et facilite la prise de contact.",
    clientProblem: "Un site absent, vieillissant ou peu clair qui ne met pas en valeur l’entreprise et ses réalisations.",
    targetClients: ["Artisans et entreprises de services", "TPE et PME", "Entreprises avec un site à moderniser"],
    included: ["Cadrage des objectifs et de l’arborescence", "Conception visuelle et parcours de contact", "Développement responsive", "Intégration des contenus convenus", "Vérification technique et préparation à la mise en ligne"],
    excluded: ["Nombre de pages et de révisions à définir au devis", "E-commerce couvert par ecommerce, sur devis distinct", "SEO continu, campagnes et tracking avancé distincts", "Hébergement, maintenance et rédaction non inclus automatiquement"],
    desiredOutcomes: ["Présenter une image cohérente et crédible", "Faciliter la navigation mobile et les demandes de contact", "Disposer d’une base technique évolutive"],
    prerequisites: ["Objectifs et interlocuteur de validation", "Accès au site existant si refonte", "Identité et contenus disponibles ou production à prévoir séparément"],
    ctaLabel: "Étudier mon site", qualificationQuestions: ["Qu’aimeriez-vous améliorer en priorité ?", "Quel est le rôle du site dans votre activité ?", "Quels contenus et accès sont disponibles ?"],
    complementaryServiceIds: ["content-production", "local-seo", "conversion-tracking", "business-workflows"],
    pricingModes: ["quote"], pricingNote: "Périmètre sur devis ; aucun forfait ni prix validé.",
    provenance: { origin: "existing-page", sources: ["src/app/creation-site/page.tsx", "src/components/ContactForm.tsx", homeSource], note: "Création, refonte, identité, navigation et responsive présents ; livrables détaillés proposés ici." },
    existingPage: "/creation-site", commercialQuestions: ["Combien de pages et d’allers-retours ?", "Qui fournit les contenus ?", "Quelles conditions de livraison, de garantie et de maintenance ?"],
  }),
  defineService({
    id: "landing-page", slug: "landing-pages", name: "Landing pages orientées conversion", category: "web",
    summary: "Une page dédiée à une offre ou une campagne avec une action de contact claire.",
    clientProblem: "Des visiteurs publicitaires ou SEO arrivent sur une page peu adaptée à leur recherche.",
    targetClients: ["Entreprises lançant une campagne", "Activités avec une offre ou une zone à cibler"],
    included: ["Cadrage de l’offre et de l’action attendue", "Structure et design de la page", "Développement mobile", "Formulaire ou appel à l’action défini au devis"],
    excluded: ["Budget et gestion publicitaires", "Création de plusieurs variantes ou tests A/B non systématiques", "Tracking avancé et production de contenus distincts"],
    desiredOutcomes: ["Aligner le message avec la campagne", "Faciliter la demande de contact"],
    prerequisites: ["Offre et audience identifiées", "Destination des demandes définie", "Contenus disponibles ou à produire"],
    ctaLabel: "Préparer ma landing page", qualificationQuestions: ["Quelle offre voulez-vous présenter ?", "D’où viendront les visiteurs ?", "Quelle action attendez-vous d’eux ?"],
    complementaryServiceIds: ["google-ads", "meta-ads", "conversion-tracking", "content-production"],
    pricingModes: ["quote"], pricingNote: "Chiffrage par périmètre ; variantes et tests à préciser.",
    provenance: { origin: "home-v2", sources: [homeSource], note: "Mentionnée dans Web et Acquisition ; prestation rattachée une seule fois à Web pour éviter les doublons." },
    existingPage: null, commercialQuestions: ["Page autonome ou intégrée au site ?", "Copywriting et tests inclus ou en option ?"],
  }),
  defineService({
    id: "web-application", slug: "applications-web", name: "Applications web sur mesure", category: "web",
    summary: "Une application web construite autour de vos utilisateurs et de leurs usages.",
    clientProblem: "Un besoin fonctionnel ne peut pas être couvert par un simple site vitrine.",
    targetClients: ["PME avec un produit ou un service numérique", "Entreprises créant un portail pour leurs clients ou partenaires"],
    included: ["Cadrage fonctionnel", "Conception des interfaces", "Développement des fonctionnalités convenues", "Tests et préparation au déploiement"],
    excluded: ["Applications mobiles couvertes par mobile-app, sur devis distinct", "Fonctionnalités, authentification et intégrations à cadrer", "Exploitation, maintenance et support non inclus automatiquement"],
    desiredOutcomes: ["Proposer une expérience adaptée aux usages", "Disposer d’une base fonctionnelle évolutive"],
    prerequisites: ["Utilisateurs et cas d’usage identifiés", "Priorités fonctionnelles", "Contraintes de données et d’accès définies"],
    ctaLabel: "Cadrer mon application", qualificationQuestions: ["Qui utilisera l’application ?", "Quel usage prioritaire doit-elle permettre ?", "Avec quels systèmes doit-elle fonctionner ?"],
    complementaryServiceIds: ["api-integrations", "business-workflows", "ai-agents"],
    pricingModes: ["quote"], pricingNote: "Cadrage et développement sur devis ; modalités des évolutions à valider.",
    provenance: { origin: "existing-page", sources: [legacyHomeSource, homeSource], note: "Applications web déjà citées dans l’ancienne Home, sans page ni périmètre dédiés." },
    existingPage: "/creation-site", commercialQuestions: ["Cadrage payé séparément ?", "Quelle propriété des livrables et quel support après livraison ?"],
  }),
  defineService({
    id: "business-tool", slug: "outils-metier-dashboards", name: "Logiciels métier & interfaces sur mesure", category: "software",
    summary: "Des interfaces internes adaptées à vos équipes et à leurs opérations.",
    clientProblem: "Des équipes travaillent avec des outils dispersés ou des interfaces peu adaptées à leurs tâches.",
    targetClients: ["PME avec des opérations internes spécifiques", "Équipes ayant besoin d’un portail ou d’un dashboard métier"],
    included: ["Analyse des usages internes", "Conception des interfaces métier", "Développement des fonctions convenues", "Gestion des accès selon le périmètre"],
    excluded: ["Remplacement complet d’un ERP non systématique", "Automatisations, migrations et reporting distincts sauf devis commun", "Formation et support à préciser"],
    desiredOutcomes: ["Simplifier les opérations courantes", "Rendre l’information utile plus accessible"],
    prerequisites: ["Référent métier", "Exemples de processus et de données", "Accès techniques nécessaires"],
    ctaLabel: "Étudier mon outil métier", qualificationQuestions: ["Quelle opération vos équipes doivent-elles simplifier ?", "Qui utilisera cet outil ?", "Où se trouvent les données ?"],
    complementaryServiceIds: ["airtable-workspace", "api-integrations", "business-workflows", "automated-reporting"],
    pricingModes: ["quote"], pricingNote: "Projet sur devis, sans licence ou support implicitement inclus.",
    provenance: { origin: "home-v2", sources: [homeSource], note: "Outils métier et dashboards explicitement mentionnés ; séparation des applications publiques proposée." },
    existingPage: null, commercialQuestions: ["Offre autonome ou sous-type d’application web ?", "Formation, migration et support dans quel périmètre ?"],
  }),
  defineService({
    id: "seo", slug: "referencement-naturel", name: "Référencement naturel", category: "seo",
    summary: "Améliorer la visibilité de votre site sur les recherches pertinentes pour votre activité.",
    clientProblem: "Les futurs clients ne trouvent pas le site sur les recherches utiles à l’entreprise.",
    targetClients: ["Entreprises disposant d’un site", "Activités visant une visibilité au-delà d’une seule zone locale"],
    included: ["Audit de l’existant et des recherches cibles", "Priorisation des actions techniques et éditoriales", "Optimisations convenues", "Suivi des indicateurs selon le périmètre"],
    excluded: ["Aucune position Google ou quantité de trafic garantie", "Refonte complète et volume de rédaction non inclus automatiquement", "Achat de liens et budget média non définis"],
    desiredOutcomes: ["Rendre le site plus lisible et pertinent", "Développer une visibilité sur des recherches qualifiées"],
    prerequisites: ["Site et accès de gestion", "Marché et objectifs identifiés", "Accès aux données existantes si disponibles"],
    ctaLabel: "Faire le point sur mon SEO", qualificationQuestions: ["Sur quelles recherches souhaitez-vous être trouvé ?", "Quel site utilisez-vous aujourd’hui ?", "Que savez-vous de votre trafic actuel ?"],
    complementaryServiceIds: ["website", "content-production", "conversion-tracking", "local-seo"],
    pricingModes: ["quote", "recurring"], pricingNote: "Audit ponctuel et suivi récurrent possibles, à valider ; pas de durée ou tarif annoncés.",
    provenance: { origin: "existing-page", sources: ["src/app/referencement/page.tsx", legacyHomeSource, homeSource], note: "Audit, optimisation technique/éditoriale et suivi déjà décrits." },
    existingPage: "/referencement", commercialQuestions: ["Audit indépendant ou intégré ?", "Quel volume d’actions, de rédaction et de suivi ?"],
  }),
  defineService({
    id: "local-seo", slug: "seo-local-google-business-profile", name: "SEO local & Google Business Profile", category: "seo",
    summary: "Structurer votre visibilité sur les recherches locales et votre fiche d’établissement.",
    clientProblem: "L’entreprise est peu visible sur sa zone ou présente des informations locales incohérentes.",
    targetClients: ["Artisans et services de proximité", "Établissements locaux", "Entreprises intervenant sur une zone définie"],
    included: ["Analyse de la présence locale", "Optimisation de la fiche Google Business Profile selon les accès", "Cohérence des informations locales", "Recommandations ou optimisations locales convenues sur le site"],
    excluded: ["Aucune position locale ou publication de fiche garantie", "Avis fictifs ou promesse d’avis", "Production éditoriale régulière et multi-établissements à chiffrer séparément"],
    desiredOutcomes: ["Rendre l’entreprise identifiable localement", "Faciliter les appels et prises de contact"],
    prerequisites: ["Zone et établissements identifiés", "Accès à la fiche ou création à étudier", "Informations d’entreprise cohérentes"],
    ctaLabel: "Étudier ma visibilité locale", qualificationQuestions: ["Dans quelle zone intervenez-vous ?", "Disposez-vous d’une fiche Google Business Profile ?", "Combien d’établissements doivent être accompagnés ?"],
    complementaryServiceIds: ["website", "google-ads", "local-services", "editorial-social"],
    pricingModes: ["quote", "recurring"], pricingNote: "Mise en place et accompagnement récurrent proposés ; nombre de fiches à définir.",
    provenance: { origin: "existing-page", sources: [legacyHomeSource, homeSource], note: "SEO local déjà cité avant V2 ; Google Business Profile explicité en V2." },
    existingPage: "/referencement", commercialQuestions: ["Quel périmètre de gestion récurrente de la fiche ?", "Suivi par fiche, établissement ou entreprise ?"],
  }),
  defineService({
    id: "google-ads", slug: "google-ads", name: "Campagnes Google Ads", category: "acquisition",
    summary: "Concevoir et piloter des campagnes adaptées à vos objectifs de contact.",
    clientProblem: "L’entreprise veut capter une demande active ou mieux maîtriser ses campagnes actuelles.",
    targetClients: ["Entreprises avec une offre claire et un budget média", "Activités cherchant des demandes mesurables"],
    included: ["Cadrage des objectifs et du ciblage", "Structure des campagnes et annonces convenues", "Pilotage et ajustements", "Lecture des indicateurs disponibles"],
    excluded: ["Budget publicitaire distinct des honoraires", "Aucun coût par prospect ou volume garanti", "Landing pages et tracking à cadrer séparément", "Types de campagnes non tous inclus par défaut"],
    desiredOutcomes: ["Capter des recherches pertinentes", "Mieux comprendre les contacts liés aux campagnes"],
    prerequisites: ["Offre, zone et budget média définis", "Compte publicitaire accessible", "Page de destination et mesure à vérifier"],
    ctaLabel: "Étudier mes campagnes Google", qualificationQuestions: ["Quelle offre souhaitez-vous promouvoir ?", "Avez-vous déjà des campagnes actives ?", "Quel budget média envisagez-vous ?"],
    complementaryServiceIds: ["landing-page", "conversion-tracking", "local-seo", "automated-reporting"],
    pricingModes: ["quote", "recurring"], pricingNote: "Mise en place et pilotage récurrent proposés ; budget média séparé, sans montant validé.",
    provenance: { origin: "existing-page", sources: ["src/app/publicite/page.tsx", homeSource], note: "Google Ads et suivi des conversions déjà présents ; périmètre de pilotage à contractualiser." },
    existingPage: "/publicite", commercialQuestions: ["Search seulement ou autres campagnes ?", "Honoraires de lancement, de gestion et engagement ?"],
  }),
  defineService({
    id: "local-services", slug: "google-local-services", name: "Google Local Services", category: "acquisition",
    summary: "Étudier puis accompagner un canal d’acquisition locale lorsqu’il est adapté et accessible.",
    clientProblem: "Une entreprise locale souhaite diversifier les sources de demandes dans sa zone.",
    targetClients: ["Entreprises de services locales dont l’activité peut être éligible"],
    included: ["Vérification préalable de la disponibilité et de l’éligibilité", "Accompagnement à la configuration du compte", "Cadrage des zones et services", "Suivi des demandes et ajustements convenus"],
    excluded: ["Validation et disponibilité dépendantes de la plateforme", "Budget plateforme distinct", "Aucun volume de demandes garanti", "Traitement commercial des demandes non inclus"],
    desiredOutcomes: ["Explorer un canal local complémentaire", "Organiser le suivi des demandes associées"],
    prerequisites: ["Activité et zone à vérifier auprès de la plateforme", "Pièces et accès nécessaires selon le dossier", "Capacité à traiter les demandes"],
    ctaLabel: "Étudier Local Services pour mon activité", qualificationQuestions: ["Quelle activité exercez-vous et dans quelle zone ?", "Utilisez-vous déjà Local Services ?", "Comment traitez-vous les demandes entrantes ?"],
    complementaryServiceIds: ["local-seo", "google-ads", "business-workflows", "automated-reporting"],
    pricingModes: ["quote", "recurring"], pricingNote: "Accompagnement proposé sur devis ; honoraires et budget plateforme séparés.",
    provenance: { origin: "home-v2", sources: [homeSource], note: "Canal explicitement ajouté en V2 ; aucune offre dédiée documentée auparavant." },
    existingPage: null, commercialQuestions: ["Quelles activités accompagnées ?", "Quel accompagnement des dossiers et litiges de demandes ?"],
  }),
  defineService({
    id: "meta-ads", slug: "facebook-instagram-ads", name: "Publicité Facebook & Instagram", category: "acquisition",
    summary: "Des campagnes sociales payantes construites autour d’une audience et d’une offre.",
    clientProblem: "L’entreprise veut faire connaître une offre auprès d’une audience ciblée et suivre les réponses.",
    targetClients: ["Entreprises avec une offre et des contenus publicitaires", "Marques ou services souhaitant tester l’acquisition sociale"],
    included: ["Cadrage de l’audience et des objectifs", "Configuration des campagnes convenues", "Intégration des éléments publicitaires disponibles", "Pilotage et lecture des indicateurs"],
    excluded: ["Budget média distinct", "Animation organique des comptes non incluse", "Production photo, vidéo et créations additionnelles à chiffrer", "Aucune performance garantie"],
    desiredOutcomes: ["Exposer une offre à une audience pertinente", "Identifier les messages qui suscitent des contacts"],
    prerequisites: ["Accès aux comptes et pages", "Offre et budget média définis", "Créations disponibles ou à produire", "Mesure des contacts à vérifier"],
    ctaLabel: "Étudier ma publicité sociale", qualificationQuestions: ["Quelle offre voulez-vous mettre en avant ?", "Quels contenus pouvez-vous utiliser ?", "Avez-vous déjà testé des campagnes ?"],
    complementaryServiceIds: ["landing-page", "content-production", "video-motion", "conversion-tracking"],
    pricingModes: ["quote", "recurring"], pricingNote: "Mise en place et gestion proposées ; budgets et créations séparés au devis.",
    provenance: { origin: "existing-page", sources: ["src/app/publicite/page.tsx", legacyHomeSource], note: "Facebook Ads et Instagram Ads explicitement présents dans la page historique, bien que moins visibles dans la Home V2." },
    existingPage: "/publicite", commercialQuestions: ["Création publicitaire incluse dans quel volume ?", "Gestion des demandes natives ou seulement des campagnes ?"],
  }),
  defineService({
    id: "conversion-tracking", slug: "tracking-mesure-conversions", name: "Tracking & mesure des conversions", category: "acquisition",
    summary: "Mettre en place une mesure exploitable des actions de contact et de leur provenance.",
    clientProblem: "L’entreprise investit dans le digital sans savoir quels leviers génèrent des demandes.",
    targetClients: ["Entreprises avec un site ou des campagnes", "Équipes souhaitant fiabiliser leur mesure"],
    included: ["Définition des actions à mesurer", "Configuration GA4 et événements convenus", "Vérification technique du déclenchement", "Documentation des indicateurs et limites"],
    excluded: ["Attribution exhaustive non garantie", "Mesure des appels ou hors ligne à cadrer", "Dashboard consolidé et reporting récurrent distincts", "Conseil juridique et dispositif de consentement à préciser séparément"],
    desiredOutcomes: ["Distinguer les actions utiles des simples visites", "Disposer d’une base de mesure pour décider"],
    prerequisites: ["Accès au site et aux outils de mesure", "Définition des conversions", "Cadre de consentement défini par le client et intégration à vérifier"],
    ctaLabel: "Clarifier ma mesure des conversions", qualificationQuestions: ["Quelle action représente un prospect pour vous ?", "Quels outils de mesure utilisez-vous ?", "Où les contacts sont-ils traités ?"],
    complementaryServiceIds: ["google-ads", "meta-ads", "seo", "automated-reporting"],
    pricingModes: ["quote"], pricingNote: "Configuration sur devis ; maintenance de la mesure non incluse automatiquement.",
    provenance: { origin: "existing-page", sources: ["src/app/publicite/page.tsx", homeSource], note: "Suivi des conversions historique ; GA4 et tracking explicités en V2. Offre indépendante proposée." },
    existingPage: "/publicite", commercialQuestions: ["Outils de tags et consentement pris en charge ?", "Mesure des appels et des contacts hors ligne proposée ?"],
  }),
  defineService({
    id: "editorial-social", slug: "strategie-editoriale-reseaux-sociaux", name: "Stratégie social media", category: "social",
    summary: "Organiser les messages, les canaux et la régularité de votre présence éditoriale.",
    clientProblem: "Les publications sont irrégulières, dispersées ou sans lien clair avec les objectifs de l’entreprise.",
    targetClients: ["TPE et PME souhaitant structurer leur présence", "Entreprises présentes sur Facebook, Instagram ou Google Business Profile"],
    included: ["Cadrage des audiences et messages", "Ligne éditoriale", "Calendrier de publications convenu", "Recommandations de diffusion ; publication déléguée dans social-management"],
    excluded: ["Publicité payante distincte", "Production des contenus à répartir au devis", "Modération et réponses aux messages non incluses par défaut", "Optimisation technique de Google Business Profile rattachée au SEO local"],
    desiredOutcomes: ["Renforcer la cohérence de marque", "Installer une présence régulière et utile"],
    prerequisites: ["Identité et objectifs de communication", "Accès aux comptes si publication déléguée", "Disponibilité pour valider les contenus"],
    ctaLabel: "Structurer ma présence éditoriale", qualificationQuestions: ["Quel public voulez-vous toucher ?", "Sur quels canaux publiez-vous aujourd’hui ?", "Qui produit et valide les contenus ?"],
    complementaryServiceIds: ["content-production", "video-motion", "meta-ads", "local-seo", "social-management"],
    pricingModes: ["quote", "recurring"], pricingNote: "Cadrage et accompagnement récurrent proposés ; fréquence et canaux à valider.",
    provenance: { origin: "home-v2", sources: [homeSource], note: "Stratégie éditoriale, publications, Facebook, Instagram et Google Business Profile mentionnés en V2. /facebook est un feed CODE-V, pas une page de vente de cette prestation." },
    existingPage: null, commercialQuestions: ["Quels livrables de stratégie et quelle gestion opérationnelle séparée ?", "Quels canaux, volumes et délais de validation ?"],
  }),
  defineService({
    id: "content-production", slug: "creation-contenus", name: "Création de contenus", category: "content",
    summary: "Produire des contenus adaptés au site, aux campagnes et aux publications de votre entreprise.",
    clientProblem: "L’entreprise manque de contenus clairs et cohérents pour présenter son offre régulièrement.",
    targetClients: ["Entreprises avec un site ou une présence sociale", "Équipes ayant besoin d’un soutien éditorial"],
    included: ["Brief éditorial", "Production de textes et formats visuels convenus", "Adaptation aux canaux sélectionnés", "Relecture humaine des contenus assistés par IA si utilisés"],
    excluded: ["Volumes, formats et révisions à préciser", "Tournage et motion design distincts", "Publication et stratégie éditoriale non incluses automatiquement", "Aucune publication automatique sans validation convenue"],
    desiredOutcomes: ["Clarifier le message de l’entreprise", "Disposer de contenus adaptés aux usages prévus"],
    prerequisites: ["Informations métier et identité de marque", "Sources et droits sur les éléments fournis", "Référent de validation"],
    ctaLabel: "Préparer mes contenus", qualificationQuestions: ["Quels contenus vous manquent aujourd’hui ?", "Où seront-ils diffusés ?", "Quelles informations et ressources pouvez-vous fournir ?"],
    complementaryServiceIds: ["website", "landing-page", "editorial-social", "seo"],
    pricingModes: ["quote", "recurring"], pricingNote: "Production ponctuelle ou récurrente proposée ; volumes à chiffrer sans prix inventé.",
    provenance: { origin: "home-v2", sources: [homeSource], note: "Contenus et contenu assisté sont mentionnés ; validation humaine et périmètre de production proposés." },
    existingPage: null, commercialQuestions: ["Quels formats réellement produits en interne ?", "Photographie, rédaction spécialisée et usage de l’IA dans quel périmètre ?"],
  }),
  defineService({
    id: "video-motion", slug: "video-motion-design", name: "Vidéo & motion design", category: "content",
    summary: "Des formats animés et vidéo pour expliquer une offre ou présenter votre activité.",
    clientProblem: "Un message est difficile à transmettre avec les seuls textes ou visuels statiques.",
    targetClients: ["Entreprises avec un besoin de présentation ou de campagne", "Marques souhaitant enrichir leurs publications"],
    included: ["Brief et intention narrative", "Montage ou animation selon le périmètre", "Déclinaisons aux formats convenus", "Validation avant livraison"],
    excluded: ["Tournage sur place, déplacements et casting non confirmés", "Voix off, musiques et licences à préciser", "Budget de diffusion et publicité distincts"],
    desiredOutcomes: ["Rendre un message plus compréhensible", "Disposer de supports adaptés à la diffusion"],
    prerequisites: ["Message et supports de diffusion définis", "Matière visuelle disponible ou production à cadrer", "Droits d’utilisation des éléments"],
    ctaLabel: "Étudier mon format vidéo", qualificationQuestions: ["Quel message souhaitez-vous transmettre ?", "Disposez-vous de séquences ou de visuels ?", "Sur quels supports sera diffusée la vidéo ?"],
    complementaryServiceIds: ["editorial-social", "meta-ads", "content-production"],
    pricingModes: ["quote"], pricingNote: "Durée, complexité, formats et moyens de production à chiffrer.",
    provenance: { origin: "home-v2", sources: [homeSource], note: "Vidéo et motion design cités ; capacité de tournage et modalités non documentées." },
    existingPage: null, commercialQuestions: ["Montage seul ou production complète ?", "Quels partenaires, licences et droits de cession ?"],
  }),
  defineService({
    id: "business-workflows", slug: "automatisation-processus", name: "Automatisation des processus métier", category: "automation",
    summary: "Relier les étapes d’un processus pour réduire les tâches répétitives et les ressaisies.",
    clientProblem: "Les demandes et informations sont recopiées manuellement entre plusieurs outils.",
    targetClients: ["TPE et PME avec des tâches répétitives", "Équipes qui traitent des demandes ou dossiers récurrents"],
    included: ["Cartographie du processus ciblé", "Conception et mise en place des workflows convenus", "Intégrations accessibles, notamment via Make", "Tests, contrôle des erreurs et documentation du flux"],
    excluded: ["Aucun fonctionnement sans erreur garanti", "Abonnements aux outils distincts", "Supervision continue et reprise de données à cadrer", "Refonte complète des opérations non systématique"],
    desiredOutcomes: ["Réduire la double saisie", "Limiter les oublis et faciliter le suivi"],
    prerequisites: ["Processus et règles métier décrits", "Accès aux outils concernés", "Exemples de données et référent de test"],
    ctaLabel: "Étudier mon processus", qualificationQuestions: ["Quelle tâche répétitive prend le plus de temps ?", "Quels outils interviennent dans ce processus ?", "Quels contrôles humains doivent rester en place ?"],
    complementaryServiceIds: ["airtable-workspace", "api-integrations", "ai-agents", "automated-reporting"],
    pricingModes: ["quote", "recurring"], pricingNote: "Implémentation sur devis ; supervision récurrente éventuelle à valider séparément.",
    provenance: { origin: "home-v2", sources: [homeSource], note: "Workflows et Make explicitement cités ; modalités de supervision proposées." },
    existingPage: null, commercialQuestions: ["Qui surveille et corrige les incidents ?", "Quel périmètre de maintenance et quels abonnements ?"],
  }),
  defineService({
    id: "airtable-workspace", slug: "structuration-airtable", name: "Structuration des données & Airtable", category: "automation",
    summary: "Organiser les informations métier dans un espace cohérent et exploitable.",
    clientProblem: "Des tableaux et fichiers dispersés rendent le suivi des données difficile.",
    targetClients: ["Petites équipes centralisant leurs opérations", "Entreprises utilisant ou envisageant Airtable"],
    included: ["Modélisation des données", "Configuration de la base et des vues convenues", "Organisation des accès selon les possibilités de l’outil", "Import des données prévues et transmission des usages"],
    excluded: ["Licences Airtable distinctes", "Nettoyage massif et migration complète à cadrer", "CRM complet non inclus par défaut", "Automatisations et interfaces sur mesure distinctes"],
    desiredOutcomes: ["Centraliser l’information utile", "Faciliter un suivi partagé"],
    prerequisites: ["Données sources identifiées", "Règles de gestion et responsables définis", "Accès et abonnement adaptés au périmètre"],
    ctaLabel: "Organiser mes données métier", qualificationQuestions: ["Où sont vos données aujourd’hui ?", "Qui doit les consulter ou les modifier ?", "Quel suivi est difficile actuellement ?"],
    complementaryServiceIds: ["business-workflows", "business-tool", "api-integrations", "automated-reporting"],
    pricingModes: ["quote"], pricingNote: "Structuration et migration limitée sur devis ; licence et support distincts.",
    provenance: { origin: "home-v2", sources: [homeSource], note: "Airtable explicitement mentionné ; en faire une prestation de structuration autonome est une proposition." },
    existingPage: null, commercialQuestions: ["Quel volume de migration et de formation ?", "Airtable seul ou autres solutions de centralisation ?"],
  }),
  defineService({
    id: "api-integrations", slug: "integrations-api", name: "Intégrations API sur mesure", category: "automation",
    summary: "Faire communiquer vos applications lorsque les connexions standards ne suffisent pas.",
    clientProblem: "Des outils utiles fonctionnent séparément et obligent à transférer les données manuellement.",
    targetClients: ["Entreprises disposant de plusieurs logiciels", "Équipes avec un besoin de connexion spécifique"],
    included: ["Étude de faisabilité des connexions", "Développement des échanges convenus", "Tests de transmission et gestion des erreurs", "Documentation des accès et flux"],
    excluded: ["Accès ou capacités non disponibles chez un fournisseur", "Licences et frais des APIs distincts", "Changements d’API et supervision à prévoir au contrat", "Aucune compatibilité universelle garantie"],
    desiredOutcomes: ["Réduire les transferts manuels", "Améliorer la cohérence entre les outils"],
    prerequisites: ["Documentation et accès API", "Règles de synchronisation définies", "Environnement ou données de test"],
    ctaLabel: "Connecter mes outils", qualificationQuestions: ["Quels outils doivent communiquer ?", "Quelles informations doivent circuler ?", "Disposez-vous d’accès API ?"],
    complementaryServiceIds: ["web-application", "business-tool", "business-workflows", "automated-reporting"],
    pricingModes: ["quote", "recurring"], pricingNote: "Développement sur devis ; maintenance éventuelle distincte à valider.",
    provenance: { origin: "home-v2", sources: [homeSource], note: "APIs et intégrations explicitement présentes en V2." },
    existingPage: null, commercialQuestions: ["Qui maintient la connexion après changement fournisseur ?", "Quels engagements de disponibilité et quelles limites ?"],
  }),
  defineService({
    id: "ai-agents", slug: "agents-ia-assistants-metier", name: "Agents IA & assistants métier", category: "automation",
    summary: "Une assistance IA ciblée sur un usage métier, avec des contrôles adaptés.",
    clientProblem: "Des tâches de tri, de synthèse ou d’assistance mobilisent du temps sans outil adapté.",
    targetClients: ["Équipes avec un cas d’usage précis", "Entreprises disposant de connaissances ou données exploitables"],
    included: ["Cadrage du cas d’usage et des limites", "Configuration des instructions et sources convenues", "Intégration de l’assistance dans le processus ciblé", "Évaluation sur des exemples et définition des contrôles humains"],
    excluded: ["Aucune exactitude ou autonomie totale garantie", "Coûts modèles et services tiers distincts", "Entraînement d’un modèle propriétaire non inclus", "Actions sensibles sans validation non proposées par défaut"],
    desiredOutcomes: ["Faciliter le traitement de l’information", "Réduire certaines tâches manuelles avec contrôle"],
    prerequisites: ["Cas d’usage limité et exemples représentatifs", "Données autorisées et sources identifiées", "Responsable de validation et budget d’usage"],
    ctaLabel: "Étudier un usage IA", qualificationQuestions: ["Quelle tâche souhaitez-vous assister ?", "Quelles informations l’assistant pourrait-il utiliser ?", "Quelles réponses ou actions doivent être validées par une personne ?"],
    complementaryServiceIds: ["business-workflows", "api-integrations", "business-tool", "content-production"],
    pricingModes: ["quote", "recurring"], pricingNote: "Mise en place sur devis ; suivi éventuel et consommation des modèles à distinguer.",
    provenance: { origin: "home-v2", sources: [homeSource], note: "Agents IA et outils intelligents cités ; le chatbot du site ne constitue pas une preuve de livrable client standard." },
    existingPage: null, commercialQuestions: ["Quels cas d’usage vendables et quels niveaux d’autonomie ?", "Quelles sources, évaluations et conditions d’exploitation ?"],
  }),
  defineService({
    id: "automated-reporting", slug: "reporting-automatise", name: "Reporting automatisé", category: "automation",
    summary: "Rassembler les indicateurs de vos outils dans un suivi lisible et régulier.",
    clientProblem: "Les données sont éparpillées et les rapports doivent être assemblés manuellement.",
    targetClients: ["Entreprises avec plusieurs sources de données", "Équipes souhaitant suivre leurs opérations ou leur acquisition"],
    included: ["Définition des indicateurs et sources", "Connexion des sources accessibles", "Consolidation et restitution convenues", "Automatisation de la mise à jour ou de la diffusion prévue"],
    excluded: ["Données manquantes ou incorrectes non reconstituées automatiquement", "Installation du tracking distincte", "Analyse stratégique continue non incluse par défaut", "Licences et interfaces métier spécifiques à cadrer"],
    desiredOutcomes: ["Réduire le temps de préparation des rapports", "Faciliter les décisions à partir d’indicateurs partagés"],
    prerequisites: ["Sources accessibles et indicateurs définis", "Qualité des données suffisante", "Destinataires et fréquence à convenir"],
    ctaLabel: "Simplifier mon reporting", qualificationQuestions: ["Quel rapport préparez-vous manuellement ?", "Quelles sources faut-il réunir ?", "Quelle décision ce suivi doit-il faciliter ?"],
    complementaryServiceIds: ["conversion-tracking", "airtable-workspace", "api-integrations", "business-tool"],
    pricingModes: ["quote", "recurring"], pricingNote: "Mise en place sur devis ; entretien des connexions ou restitution récurrente à valider.",
    provenance: { origin: "home-v2", sources: [homeSource], note: "Reporting et données présents dans le système V2 ; séparation tracking/reporting proposée pour clarifier les responsabilités." },
    existingPage: null, commercialQuestions: ["Quels formats de restitution et quelle fréquence ?", "Suivi technique seul ou analyse des résultats incluse ?"],
  }),
  defineService({
 id: "ecommerce", slug: "ecommerce", name: "Sites e-commerce & boutiques en ligne", category: "web", summary: "Vendre en ligne avec un parcours de commande et une gestion du catalogue adaptés.",
 clientProblem: "Un catalogue visible mais sans parcours d’achat exploitable.", targetClients: ["Commerçants","Marques et PME vendant des produits"],
 included: ["Cadrage de l’existant, des objectifs et des responsabilités", "Livrables, vérifications et restitution convenus"],
 excluded: ["Marketplace multi-vendeurs et ERP complet distincts","Paiement, transporteurs, taxes et connexions stocks à cadrer"],
 desiredOutcomes: ["Disposer de sites e-commerce & boutiques en ligne adapté aux usages", "Améliorer l’efficacité du périmètre concerné"],
 prerequisites: ["Produits, variantes, paiement, livraison et règles de commande à cadrer","Droits et qualité des données catalogue"],
 ctaLabel: "Étudier mon projet : Sites e-commerce & boutiques en ligne", qualificationQuestions: ["Quels produits et quel volume de catalogue ?","Comment gérez-vous stock, paiement et livraison ?"],
 complementaryServiceIds: ["website-care","conversion-tracking","content-production","api-integrations"], pricingModes: ["quote","fixed","time-materials"], pricingNote: "Modes proposés sans prix validé ; devis et contrat précisent les coûts tiers.",
 provenance: { origin: "new-proposal", sources: ["Brief commercial utilisateur — octobre 2026"], note: "Capacité demandée dans le brief ; conditionnement et niveau de service à valider." },
 existingPage: null, commercialQuestions: ["Quels livrables, volumes et exclusions contractuels ?", "Quel engagement et quel niveau de support ?"]
 }),
  defineService({
 id: "mobile-app", slug: "mobile-app", name: "Applications mobiles & PWA", category: "web", summary: "Concevoir une expérience mobile, PWA ou native selon les usages.",
 clientProblem: "Un usage terrain ou mobile mal couvert par le site existant.", targetClients: ["Équipes terrain","Entreprises lançant un service mobile"],
 included: ["Cadrage de l’existant, des objectifs et des responsabilités", "Livrables, vérifications et restitution convenus"],
 excluded: ["Native, PWA et publication en stores à choisir au cadrage","Compatibilité et maintenance des versions non illimitées"],
 desiredOutcomes: ["Disposer de applications mobiles & pwa adapté aux usages", "Améliorer l’efficacité du périmètre concerné"],
 prerequisites: ["Usages, appareils, hors-ligne et distribution à définir"],
 ctaLabel: "étudier mon projet : Applications mobiles & PWA", qualificationQuestions: ["Quel usage nécessite une application mobile ?","Faut-il fonctionner hors connexion ou accéder aux fonctions du téléphone ?"],
 complementaryServiceIds: ["web-application","api-integrations","application-support"], pricingModes: ["quote","fixed","time-materials"], pricingNote: "Modes proposés sans prix validé ; devis et contrat précisent les coûts tiers.",
 provenance: { origin: "new-proposal", sources: ["Brief commercial utilisateur — octobre 2026"], note: "Capacité demandée dans le brief ; conditionnement et niveau de service à valider." },
 existingPage: null, commercialQuestions: ["Quels livrables, volumes et exclusions contractuels ?", "Quel engagement et quel niveau de support ?"]
 }),
  defineService({
 id: "web-migration", slug: "web-migration", name: "Migration de sites", category: "web", summary: "Migrer un site avec reprise des contenus et continuité des parcours.",
 clientProblem: "Un changement de plateforme risque de perdre contenus, liens ou demandes.", targetClients: ["Entreprises changeant de CMS ou d’hébergement"],
 included: ["Cadrage de l’existant, des objectifs et des responsabilités", "Livrables, vérifications et restitution convenus"],
 excluded: ["Positions SEO et absence totale d’interruption non garanties","Refonte et réécriture des contenus distinctes"],
 desiredOutcomes: ["Disposer de migration de sites adapté aux usages", "Améliorer l’efficacité du périmètre concerné"],
 prerequisites: ["Accès source et destination","Inventaire des URL et sauvegarde exploitable"],
 ctaLabel: "étudier mon projet : Migration de sites", qualificationQuestions: ["Quelle plateforme quittez-vous et pour quelle destination ?","Quels contenus, URL et données faut-il préserver ?"],
 complementaryServiceIds: ["website","seo","hosting-supervision"], pricingModes: ["quote","fixed","time-materials"], pricingNote: "Modes proposés sans prix validé ; devis et contrat précisent les coûts tiers.",
 provenance: { origin: "new-proposal", sources: ["Brief commercial utilisateur — octobre 2026"], note: "Capacité demandée dans le brief ; conditionnement et niveau de service à valider." },
 existingPage: null, commercialQuestions: ["Quels livrables, volumes et exclusions contractuels ?", "Quel engagement et quel niveau de support ?"]
 }),
  defineService({
 id: "ux-conversion", slug: "ux-conversion", name: "Optimisation UX/UI & conversion", category: "web", summary: "Améliorer les parcours, l’accessibilité et la performance d’un site existant.",
 clientProblem: "Des frictions de navigation ou de conversion empêchent les utilisateurs d’agir.", targetClients: ["Entreprises avec un site et un parcours à optimiser"],
 included: ["Cadrage de l’existant, des objectifs et des responsabilités", "Livrables, vérifications et restitution convenus"],
 excluded: ["Certification de conformité non incluse","Tests A/B conditionnés au trafic et au mandat","Hausse de conversion non garantie"],
 desiredOutcomes: ["Disposer de optimisation ux/ui & conversion adapté aux usages", "Améliorer l’efficacité du périmètre concerné"],
 prerequisites: ["Accès au site et aux mesures disponibles","Trafic suffisant si tests A/B envisagés"],
 ctaLabel: "étudier mon projet : Optimisation UX/UI & conversion", qualificationQuestions: ["Où constatez-vous des abandons ?","Quelles données permettent d’observer les parcours ?"],
 complementaryServiceIds: ["landing-page","conversion-tracking","website"], pricingModes: ["quote","fixed","time-materials"], pricingNote: "Modes proposés sans prix validé ; devis et contrat précisent les coûts tiers.",
 provenance: { origin: "new-proposal", sources: ["Brief commercial utilisateur — octobre 2026"], note: "Capacité demandée dans le brief ; conditionnement et niveau de service à valider." },
 existingPage: null, commercialQuestions: ["Quels livrables, volumes et exclusions contractuels ?", "Quel engagement et quel niveau de support ?"]
 }),
  defineService({
 id: "gbp-management", slug: "gbp-management", name: "Gestion Google Business Profile", category: "seo", summary: "Entretenir les fiches Google et leur présence locale dans la durée.",
 clientProblem: "Les fiches, actualités, photos et avis restent sans suivi régulier.", targetClients: ["Entreprises locales","Réseaux multi-établissements selon devis"],
 included: ["Cadrage de l’existant, des objectifs et des responsabilités", "Livrables, vérifications et restitution convenus"],
 excluded: ["Optimisation initiale rattachée à local-seo","Faux avis et suppression garantie des avis exclus"],
 desiredOutcomes: ["Disposer de gestion google business profile adapté aux usages", "Améliorer l’efficacité du périmètre concerné"],
 prerequisites: ["Accès autorisé aux fiches","Validation des réponses et photos","Établissements et fréquence définis"],
 ctaLabel: "étudier mon projet : Gestion Google Business Profile", qualificationQuestions: ["Combien de fiches faut-il gérer ?","Qui valide les publications et réponses aux avis ?"],
 complementaryServiceIds: ["local-seo","content-production","video-motion"], pricingModes: ["quote","recurring","time-materials"], pricingNote: "Modes proposés sans prix validé ; devis et contrat précisent les coûts tiers.",
 provenance: { origin: "new-proposal", sources: ["Brief commercial utilisateur — octobre 2026"], note: "Capacité demandée dans le brief ; conditionnement et niveau de service à valider." },
 existingPage: null, commercialQuestions: ["Quels livrables, volumes et exclusions contractuels ?", "Quel engagement et quel niveau de support ?"]
 }),
  defineService({
 id: "social-management", slug: "social-management", name: "Gestion des réseaux sociaux & community management", category: "social", summary: "Animer vos comptes et votre communauté avec un périmètre éditorial défini.",
 clientProblem: "Les comptes manquent de régularité et les interactions restent sans réponse.", targetClients: ["Entreprises avec une présence sociale à développer"],
 included: ["Cadrage de l’existant, des objectifs et des responsabilités", "Livrables, vérifications et restitution convenus"],
 excluded: ["Gestion de crise et disponibilité permanente non incluses","Production vidéo et tournage à chiffrer","Budget publicitaire distinct"],
 desiredOutcomes: ["Disposer de gestion des réseaux sociaux & community management adapté aux usages", "Améliorer l’efficacité du périmètre concerné"],
 prerequisites: ["Accès aux comptes","Plateformes, volumes et circuit de validation","Mandat de modération et réponses aux messages"],
 ctaLabel: "étudier mon projet : Gestion des réseaux sociaux & community management", qualificationQuestions: ["Sur quelles plateformes vos clients interagissent-ils ?","Quels volumes et quelles interactions devons-nous prendre en charge ?"],
 complementaryServiceIds: ["editorial-social","content-production","video-motion","meta-ads"], pricingModes: ["quote","recurring","time-materials"], pricingNote: "Modes proposés sans prix validé ; devis et contrat précisent les coûts tiers.",
 provenance: { origin: "new-proposal", sources: ["Brief commercial utilisateur — octobre 2026"], note: "Capacité demandée dans le brief ; conditionnement et niveau de service à valider." },
 existingPage: null, commercialQuestions: ["Quels livrables, volumes et exclusions contractuels ?", "Quel engagement et quel niveau de support ?"]
 }),
  defineService({
 id: "editorial-strategy", slug: "editorial-strategy", name: "Stratégie éditoriale", category: "content", summary: "Définir les messages, thèmes et formats d’un dispositif de contenu cohérent.",
 clientProblem: "Les contenus sont produits sans priorités ni cohérence entre supports.", targetClients: ["Entreprises publiant sur plusieurs supports"],
 included: ["Cadrage de l’existant, des objectifs et des responsabilités", "Livrables, vérifications et restitution convenus"],
 excluded: ["Stratégie social media détaillée rattachée à editorial-social","Production et publication distinctes"],
 desiredOutcomes: ["Disposer de stratégie éditoriale adapté aux usages", "Améliorer l’efficacité du périmètre concerné"],
 prerequisites: ["Positionnement, audiences et offres accessibles"],
 ctaLabel: "étudier mon projet : Stratégie éditoriale", qualificationQuestions: ["À quelles audiences les contenus doivent-ils parler ?","Quels supports et messages sont prioritaires ?"],
 complementaryServiceIds: ["content-production","seo","editorial-social"], pricingModes: ["quote","fixed","time-materials"], pricingNote: "Modes proposés sans prix validé ; devis et contrat précisent les coûts tiers.",
 provenance: { origin: "new-proposal", sources: ["Brief commercial utilisateur — octobre 2026"], note: "Capacité demandée dans le brief ; conditionnement et niveau de service à valider." },
 existingPage: null, commercialQuestions: ["Quels livrables, volumes et exclusions contractuels ?", "Quel engagement et quel niveau de support ?"]
 }),
  defineService({
 id: "digital-identity", slug: "digital-identity", name: "Identité graphique digitale", category: "content", summary: "Décliner une identité de marque cohérente sur les supports numériques.",
 clientProblem: "Les visuels du site, des réseaux et des campagnes manquent de cohérence.", targetClients: ["Entreprises créant ou harmonisant leur identité digitale"],
 included: ["Cadrage de l’existant, des objectifs et des responsabilités", "Livrables, vérifications et restitution convenus"],
 excluded: ["Naming, dépôt de marque et impression non inclus","Refonte complète du positionnement à cadrer"],
 desiredOutcomes: ["Disposer de identité graphique digitale adapté aux usages", "Améliorer l’efficacité du périmètre concerné"],
 prerequisites: ["Éléments de marque existants et droits d’utilisation"],
 ctaLabel: "étudier mon projet : Identité graphique digitale", qualificationQuestions: ["Quels éléments de marque souhaitez-vous conserver ?","Sur quels supports doit-on décliner l’identité ?"],
 complementaryServiceIds: ["website","content-production","video-motion"], pricingModes: ["quote","fixed","time-materials"], pricingNote: "Modes proposés sans prix validé ; devis et contrat précisent les coûts tiers.",
 provenance: { origin: "new-proposal", sources: ["Brief commercial utilisateur — octobre 2026"], note: "Capacité demandée dans le brief ; conditionnement et niveau de service à valider." },
 existingPage: null, commercialQuestions: ["Quels livrables, volumes et exclusions contractuels ?", "Quel engagement et quel niveau de support ?"]
 }),
  defineService({
 id: "digital-strategy", slug: "digital-strategy", name: "Stratégie digitale & feuille de route", category: "strategy", summary: "Transformer un diagnostic global en feuille de route priorisée et coordonnée.",
 clientProblem: "Les initiatives digitales se multiplient sans objectifs ni arbitrages partagés.", targetClients: ["Dirigeants de TPE et PME","Organisations combinant plusieurs leviers"],
 included: ["Cadrage de l’existant, des objectifs et des responsabilités", "Livrables, vérifications et restitution convenus"],
 excluded: ["Diagnostic fondé uniquement sur les accès et données réellement examinés","Exécution des actions vendue séparément"],
 desiredOutcomes: ["Disposer de stratégie digitale & feuille de route adapté aux usages", "Améliorer l’efficacité du périmètre concerné"],
 prerequisites: ["Objectifs métier","Accès aux données disponibles","Interlocuteurs décisionnaires"],
 ctaLabel: "étudier mon projet : Stratégie digitale & feuille de route", qualificationQuestions: ["Quel objectif métier guide votre transformation ?","Quels leviers utilisez-vous déjà et lesquels posent problème ?"],
 complementaryServiceIds: ["website","seo","google-ads","social-management","business-workflows","business-tool","digital-accompaniment"], pricingModes: ["quote","fixed","time-materials"], pricingNote: "Modes proposés sans prix validé ; devis et contrat précisent les coûts tiers.",
 provenance: { origin: "new-proposal", sources: ["Brief commercial utilisateur — octobre 2026"], note: "Capacité demandée dans le brief ; conditionnement et niveau de service à valider." },
 existingPage: null, commercialQuestions: ["Quels livrables, volumes et exclusions contractuels ?", "Quel engagement et quel niveau de support ?"]
 }),
  defineService({
 id: "website-care", slug: "website-care", name: "Maintenance de sites", category: "maintenance", summary: "Maintenir un site et traiter ses petites évolutions dans un cadre convenu.",
 clientProblem: "Les mises à jour, corrections et demandes ponctuelles n’ont pas de responsable.", targetClients: ["Entreprises avec un site en exploitation"],
 included: ["Cadrage de l’existant, des objectifs et des responsabilités", "Livrables, vérifications et restitution convenus"],
 excluded: ["Refonte et fonctionnalités importantes distinctes","Sécurité absolue et assistance permanente non garanties","Hébergement distinct sauf devis commun"],
 desiredOutcomes: ["Disposer de maintenance de sites adapté aux usages", "Améliorer l’efficacité du périmètre concerné"],
 prerequisites: ["Audit de reprise","Accès techniques et sauvegardes","Périmètre, horaires et engagement définis"],
 ctaLabel: "étudier mon projet : Maintenance de sites", qualificationQuestions: ["Quelle technologie utilise le site ?","Quels incidents ou évolutions faut-il prendre en charge ?"],
 complementaryServiceIds: ["hosting-supervision","website","ux-conversion"], pricingModes: ["quote","recurring","time-materials"], pricingNote: "Modes proposés sans prix validé ; devis et contrat précisent les coûts tiers.",
 provenance: { origin: "new-proposal", sources: ["Brief commercial utilisateur — octobre 2026"], note: "Capacité demandée dans le brief ; conditionnement et niveau de service à valider." },
 existingPage: null, commercialQuestions: ["Quels livrables, volumes et exclusions contractuels ?", "Quel engagement et quel niveau de support ?"]
 }),
  defineService({
 id: "hosting-supervision", slug: "hosting-supervision", name: "Hébergement & supervision", category: "maintenance", summary: "Organiser l’hébergement, les sauvegardes et la supervision technique.",
 clientProblem: "Les incidents d’exploitation ne sont pas détectés ou traités clairement.", targetClients: ["Entreprises exploitant un site ou une application"],
 included: ["Cadrage de l’existant, des objectifs et des responsabilités", "Livrables, vérifications et restitution convenus"],
 excluded: ["Disponibilité absolue non garantie","Frais infrastructure distincts","Fréquence des sauvegardes et tests de restauration à contractualiser"],
 desiredOutcomes: ["Disposer de hébergement & supervision adapté aux usages", "Améliorer l’efficacité du périmètre concerné"],
 prerequisites: ["Accès infrastructure","Volumes, environnements et objectifs de reprise"],
 ctaLabel: "étudier mon projet : Hébergement & supervision", qualificationQuestions: ["Où la solution est-elle hébergée ?","Quelles interruptions et pertes de données sont acceptables ?"],
 complementaryServiceIds: ["website-care","application-support"], pricingModes: ["quote","recurring","time-materials"], pricingNote: "Modes proposés sans prix validé ; devis et contrat précisent les coûts tiers.",
 provenance: { origin: "new-proposal", sources: ["Brief commercial utilisateur — octobre 2026"], note: "Capacité demandée dans le brief ; conditionnement et niveau de service à valider." },
 existingPage: null, commercialQuestions: ["Quels livrables, volumes et exclusions contractuels ?", "Quel engagement et quel niveau de support ?"]
 }),
  defineService({
 id: "application-support", slug: "application-support", name: "Maintenance applicative & support SaaS", category: "maintenance", summary: "Entretenir une application et organiser son support après livraison.",
 clientProblem: "Les incidents, versions et évolutions d’un logiciel ne sont pas suivis.", targetClients: ["Entreprises utilisant une application métier","Éditeurs SaaS"],
 included: ["Cadrage de l’existant, des objectifs et des responsabilités", "Livrables, vérifications et restitution convenus"],
 excluded: ["Refonte importante et nouvelles fonctions hors forfait","Support utilisateurs et horaires à préciser"],
 desiredOutcomes: ["Disposer de maintenance applicative & support saas adapté aux usages", "Améliorer l’efficacité du périmètre concerné"],
 prerequisites: ["Accès au code et documentation","Audit de reprise et liste des dépendances"],
 ctaLabel: "étudier mon projet : Maintenance applicative & support SaaS", qualificationQuestions: ["Qui maintient actuellement l’application ?","Quel volume d’incidents et quel niveau de support attendez-vous ?"],
 complementaryServiceIds: ["business-tool","web-application","api-integrations"], pricingModes: ["quote","recurring","time-materials"], pricingNote: "Modes proposés sans prix validé ; devis et contrat précisent les coûts tiers.",
 provenance: { origin: "new-proposal", sources: ["Brief commercial utilisateur — octobre 2026"], note: "Capacité demandée dans le brief ; conditionnement et niveau de service à valider." },
 existingPage: null, commercialQuestions: ["Quels livrables, volumes et exclusions contractuels ?", "Quel engagement et quel niveau de support ?"]
 }),
  defineService({
 id: "automation-supervision", slug: "automation-supervision", name: "Supervision des automatisations & agents IA", category: "maintenance", summary: "Superviser les workflows et agents IA et traiter leurs incidents.",
 clientProblem: "Les automatisations ou agents fonctionnent sans suivi ni contrôle de qualité.", targetClients: ["Équipes exploitant des workflows ou agents IA"],
 included: ["Cadrage de l’existant, des objectifs et des responsabilités", "Livrables, vérifications et restitution convenus"],
 excluded: ["Consommations Make, Airtable et modèles distinctes","Autonomie et exactitude totales non garanties","Nouveaux workflows hors maintenance"],
 desiredOutcomes: ["Disposer de supervision des automatisations & agents ia adapté aux usages", "Améliorer l’efficacité du périmètre concerné"],
 prerequisites: ["Accès, journaux et jeux d’évaluation","Responsable des alertes et seuils d’intervention"],
 ctaLabel: "étudier mon projet : Supervision des automatisations & agents IA", qualificationQuestions: ["Quels workflows et agents doivent être suivis ?","Quels incidents doivent déclencher une intervention humaine ?"],
 complementaryServiceIds: ["business-workflows","ai-agents","automated-reporting"], pricingModes: ["quote","recurring","time-materials"], pricingNote: "Modes proposés sans prix validé ; devis et contrat précisent les coûts tiers.",
 provenance: { origin: "new-proposal", sources: ["Brief commercial utilisateur — octobre 2026"], note: "Capacité demandée dans le brief ; conditionnement et niveau de service à valider." },
 existingPage: null, commercialQuestions: ["Quels livrables, volumes et exclusions contractuels ?", "Quel engagement et quel niveau de support ?"]
 }),
  defineService({
 id: "digital-accompaniment", slug: "digital-accompaniment", name: "Accompagnement digital continu", category: "maintenance", summary: "Piloter vos actions digitales avec un suivi mensuel et des priorités partagées.",
 clientProblem: "Les différents intervenants et leviers avancent sans coordination ni suivi commun.", targetClients: ["Entreprises combinant SEO, Ads, social et projets digitaux"],
 included: ["Cadrage de l’existant, des objectifs et des responsabilités", "Livrables, vérifications et restitution convenus"],
 excluded: ["Exécution SEO, Ads et social non automatiquement incluse","Budgets médias et développements distincts","Résultats commerciaux non garantis"],
 desiredOutcomes: ["Disposer de accompagnement digital continu adapté aux usages", "Améliorer l’efficacité du périmètre concerné"],
 prerequisites: ["Objectifs et indicateurs","Accès aux rapports","Mandats des intervenants"],
 ctaLabel: "étudier mon projet : Accompagnement digital continu", qualificationQuestions: ["Quels leviers faut-il coordonner ?","Quel rythme de décision et de reporting souhaitez-vous ?"],
 complementaryServiceIds: ["digital-strategy","seo","google-ads","social-management","automated-reporting"], pricingModes: ["quote","recurring","time-materials"], pricingNote: "Modes proposés sans prix validé ; devis et contrat précisent les coûts tiers.",
 provenance: { origin: "new-proposal", sources: ["Brief commercial utilisateur — octobre 2026"], note: "Capacité demandée dans le brief ; conditionnement et niveau de service à valider." },
 existingPage: null, commercialQuestions: ["Quels livrables, volumes et exclusions contractuels ?", "Quel engagement et quel niveau de support ?"]
 }),
];

/** Cross-family orchestration, entry point to digital-strategy, not a second commercial offer. */
export const solutionPaths = [{
  id: "digital-strategy",
  name: "Structurer sa stratégie digitale",
  origin: "new-proposal",
  commercialStatus: "draft",
  chatIntent: "strategy",
  summary: "Comprendre la situation, définir les priorités et assembler uniquement les prestations utiles.",
  serviceIds: ["digital-strategy", "social-management", "business-tool", "digital-accompaniment", "website", "seo", "local-seo", "google-ads", "editorial-social", "conversion-tracking", "business-workflows", "automated-reporting"],
  commercialQuestions: ["Simple cadrage commercial ou diagnostic payant ?", "Feuille de route livrée séparément ?", "Qui pilote l’ensemble dans la durée ?"],
}] as const satisfies readonly {
  id: string; name: string; origin: ServiceOrigin; commercialStatus: "draft";
  chatIntent: ChatIntent; summary: string; serviceIds: readonly ServiceId[];
  commercialQuestions: readonly string[];
}[];

export const catalogPolicy = {
  version: 2,
  status: "draft",
  scopesAreProposals: true,
  containsValidatedPrices: false,
  performanceGuarantees: false,
  note: "Valider le périmètre, les exclusions et le mode de facturation avant publication ou connexion au chatbot. Aucun montant n’est défini.",
} as const;

export function getServiceById(id: string): Service | undefined {
  return services.find(service => service.id === id);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(service => service.slug === slug);
}

export function getServicesByCategory(category: ServiceCategory): readonly Service[] {
  return services.filter(service => service.category === category);
}
