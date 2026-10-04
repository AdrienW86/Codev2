import type { ServiceCategory, ServiceId } from "./services";

export type ProjectFormat = "website" | "redesign" | "ecommerce" | "application" | "automation" | "ai-agent" | "ads" | "seo" | "local-visibility" | "social" | "motion" | "business-software";
type ProjectBase = {
  id: string; slug: string; title: string; format: ProjectFormat; families: readonly ServiceCategory[];
  context: string; intervention: string; technologies: readonly string[];
  relatedServices: readonly ServiceId[]; sourceRefs: readonly string[];
  visuals: readonly { src: string; alt: string; width: number; height: number; caption: string }[];
  video: { src: string; poster: string; title: string; description: string } | null;
  cta: { href: string; label: string };
  verifiedResults: readonly { label: string; value: string; sourceRef: string; methodology: string; publicationApprovalRef: string }[];
  testimonial: { quote: string; author: string; publicationApprovalRef: string } | null;
};
/** Drafts cannot be published; a client case needs evidence and publication approval. */
type LegacyProject = ProjectBase & (
  | { kind: "internal"; status: "published"; clientName: null; publicationApprovalRef: null }
  | { kind: "client"; status: "published"; clientName: string; publicationApprovalRef: string }
  | { kind: "internal" | "client"; status: "draft"; clientName: string | null; publicationApprovalRef: string | null }
);

const existingProjects: readonly LegacyProject[] = [
  {
    id: "code-v-site", slug: "code-v-site", kind: "internal", status: "published", clientName: null, publicationApprovalRef: null,
    title: "CODE-V : une présence, plusieurs expériences.", format: "website", families: ["web"],
    context: "Le site du studio réunit la présentation des solutions, les pages pilotes et un assistant conversationnel. C’est un projet interne visible dans ce dépôt.",
    intervention: "Une Home éditoriale, un mega-menu, des hubs et des pages familles, avec des compositions adaptées aux écrans et une navigation par fil d’Ariane.",
    technologies: ["Next.js", "React", "TypeScript", "CSS Modules"], relatedServices: ["website"],
    sourceRefs: ["src/components/home/Home.tsx", "src/app/solutions/page.tsx", "src/app/solutions/web-applications/page.tsx", "docs/home-premium-v2.md"],
    visuals: [
      { src: "/projects/code-v-home.webp", alt: "Capture réelle du hero CODE-V : Le digital. Avec une direction, accompagné de la trajectoire conceptuelle.", width: 1440, height: 946, caption: "Capture du site CODE-V, projet interne. Le graphique est conceptuel, sans données client." },
      { src: "/projects/code-v-web-applications.webp", alt: "Capture réelle de la page Web & Applications CODE-V, avec son titre et sa composition illustrative d’interface.", width: 1440, height: 900, caption: "Page pilote du même site : une composition d’interface distincte de l’univers automatisation." },
    ],
    video: null, cta: { href: "/", label: "Parcourir le site" }, verifiedResults: [], testimonial: null,
  },
  {
    id: "code-v-motion", slug: "code-v-motion", kind: "internal", status: "published", clientName: null, publicationApprovalRef: null,
    title: "Les connexions, rendues visibles.", format: "motion", families: ["content", "automation"],
    context: "Le film de marque CODE-V illustre le passage d’outils isolés à un environnement connecté. Le fichier original est présent dans le dépôt.",
    intervention: "Intégration du film dans la page Automatisation & IA, extraction d’un poster réel et lecture volontaire avec une description textuelle accessible.",
    technologies: ["MP4 / H.264", "Poster WebP", "MotionVideo"], relatedServices: ["video-motion"],
    sourceRefs: ["public/videos/automatisation.mp4", "src/components/media/MotionVideo.tsx", "docs/service-page-pilot-automation-ai.md"], visuals: [],
    video: { src: "/videos/automatisation.mp4", poster: "/videos/automatisation-poster.webp", title: "Automatisation & intelligence artificielle", description: "Le film relie site web, emails, CRM, réseaux sociaux, facturation et automatisations. Il présente ensuite un parcours prospect, site, automatisation et client. Les compteurs visibles sont des données de démonstration, pas des résultats clients." },
    cta: { href: "/solutions/automatisation-ia", label: "Explorer Automatisation & IA" }, verifiedResults: [], testimonial: null,
  },
];

export type ProjectType = ProjectFormat;
export type ProjectStatus = LegacyProject["status"];
export type ServiceFamily = ServiceCategory;
export const projectSectors = ["digital-studio", "hospitality", "restaurant", "antiques", "painting-renovation", "pest-control", "roofing"] as const;
export type ProjectSector = (typeof projectSectors)[number];
export type ProjectImage = ProjectBase["visuals"][number];
export type ProjectVideo = NonNullable<ProjectBase["video"]>;

/** Public observations describe the site, never the contractual work of CODE-V. */
export type Project = LegacyProject & {
  name: string;
  publicUrl: string | null;
  sector: ProjectSector | null;
  projectType: ProjectType;
  serviceFamilies: readonly ServiceFamily[];
  /** Confirmed delivered services; relatedServices only expresses catalog relevance. */
  services: readonly ServiceId[];
  summary: string;
  objectives: readonly string[];
  workCompleted: readonly string[];
  features: readonly string[];
  stack: readonly string[];
  visualStyle: string | null;
  screenshots: readonly ProjectImage[];
  videos: readonly ProjectVideo[];
  logo: ProjectImage | null;
  coverImage: ProjectImage | null;
  testimonialAuthor: string | null;
  location: string | null;
  year: number | null;
  featured: boolean;
  caseStudyReady: boolean;
  relatedArticles: readonly string[];
  relatedVideos: readonly string[];
  seoTitle: string | null;
  seoDescription: string | null;
  observations: {
    checkedAt: string;
    sourceUrls: readonly string[];
    scope: "homepage-browser";
    publicTitle: string;
    nextAssetsDetected: boolean;
    notes: readonly string[];
  } | null;
};

/** Keep aliases for the current hub, derived from the same data instead of copied. */
function completeProject(project: LegacyProject, details: Partial<Omit<Project, keyof LegacyProject>> = {}): Project {
  return {
    ...project,
    name: project.title, publicUrl: null, sector: "digital-studio",
    projectType: project.format, serviceFamilies: project.families,
    services: project.relatedServices, summary: project.context,
    objectives: [], workCompleted: project.intervention ? [project.intervention] : [],
    features: [], stack: project.technologies, visualStyle: null,
    screenshots: project.visuals, videos: project.video ? [project.video] : [],
    logo: null, coverImage: project.visuals[0] ?? null,
    testimonialAuthor: project.testimonial?.author ?? null,
    location: null, year: null, featured: false, caseStudyReady: false,
    relatedArticles: [], relatedVideos: [], seoTitle: null, seoDescription: null,
    observations: null, ...details,
  };
}

type ClientObservation = {
  slug: string; name: string; publicUrl: string; sector: ProjectSector;
  summary: string; features: readonly string[]; location: string | null;
  visualStyle: string; publicTitle: string;
};

function observedClient(data: ClientObservation): Project {
  const screenshots: readonly ProjectImage[] = [
    { src: `/projects/${data.slug}/home.webp`, alt: `Page d’accueil du site ${data.name}, capture réelle sur ordinateur.`, width: 1440, height: 1000, caption: "Capture du site public, 3 octobre 2026." },
    ...(data.slug === "chateau-de-projan" ? [{ src: `/projects/${data.slug}/mobile.webp`, alt: "Page d’accueil du Château de Projan sur mobile, capture réelle.", width: 375, height: 812, caption: "Capture mobile du site public, 3 octobre 2026." }] : []),
  ];
  return completeProject({
    id: data.slug, slug: data.slug, title: data.name,
    kind: "client", status: "published", clientName: data.name, publicationApprovalRef: "docs/projects-catalog.md#publication-des-références-clients",
    format: "website", families: ["web"], context: "", intervention: "",
    technologies: ["Next.js (assets publics /_next/)"],
    relatedServices: ["website"], sourceRefs: [data.publicUrl, "docs/projects-catalog.md"],
    visuals: screenshots, video: null, cta: { href: data.publicUrl, label: "Visiter le site" },
    verifiedResults: [], testimonial: null,
  }, {
    name: data.name, publicUrl: data.publicUrl, sector: data.sector,
    featured: data.slug === "chateau-de-projan",
    services: [], summary: data.summary, features: data.features,
    location: data.location, visualStyle: data.visualStyle,
    observations: {
      checkedAt: "2026-10-03", sourceUrls: [data.publicUrl], scope: "homepage-browser",
      publicTitle: data.publicTitle, nextAssetsDetected: true,
      notes: [
        "Référence CODE-V fournie par le propriétaire du projet ; périmètre livré non documenté.",
        "Navigation et interface observées sur la page d’accueil ; les liens ne prouvent pas un parcours fonctionnel.",
        "Formulaires non soumis, réservations et paiements non testés. Responsive non audité.",
        "Assets Next.js détectés : aucune version, infrastructure ou stack interne déduite.",
      ],
    },
  });
}

function acquisitionCase(slug: "protection-nuisibles" | "nuisibles-toulon"): Project {
  const protection = slug === "protection-nuisibles";
  const name = protection ? "Protection Nuisibles" : "Nuisibles Toulon";
  const services: ServiceId[] = protection ? ["website", "local-seo", "local-services", "google-ads"] : ["website", "google-ads"];
  const families: ServiceCategory[] = protection ? ["web", "seo", "acquisition"] : ["web", "acquisition"];
  const visuals: ProjectImage[] = [
    { src: `/projects/${slug}/home.webp`, alt: `Page d’accueil réelle de ${name} sur ordinateur.`, width: 1440, height: 1000, caption: "Capture du site public, 4 octobre 2026." },
    { src: `/projects/${slug}/mobile.webp`, alt: `Page d’accueil réelle de ${name} sur mobile.`, width: 375, height: 812, caption: "Capture mobile du site public, 4 octobre 2026." },
  ];
  const proof: ProjectImage = protection
    ? { src: '/projects/protection-nuisibles/google-local-pack.webp', alt: 'Recherche Google nuisibles perpignan : Protection Nuisibles troisième dans le pack local, note 5,0 sur 5 et 427 avis visibles.', width: 995, height: 837, caption: 'Recherche Google « nuisibles perpignan » — Protection Nuisibles visible dans le top 3 local au moment de la capture.' }
    : { src: '/projects/nuisibles-toulon/google-ads-first-position.webp', alt: 'Capture mobile Google : nuisibles-toulon.fr premier résultat sponsorisé affiché.', width: 750, height: 1334, caption: 'Résultats sponsorisés Google — nuisibles-toulon.fr visible en première position sponsorisée au moment de la capture.' };
  visuals.push(proof);
  const verifiedResults: Project['verifiedResults'] = [{ label: protection ? 'Visibilité locale observée' : 'Visibilité sponsorisée observée', value: protection ? 'Protection Nuisibles apparaît dans le top 3 local Google sur la requête « nuisibles perpignan » au moment de la capture.' : 'Sur la recherche observée à Toulon, nuisibles-toulon.fr apparaît en première position sponsorisée au moment de la capture.', sourceRef: 'public' + proof.src, methodology: protection ? 'Capture fournie, troisième entrée du pack local ; 5,0/5 et 427 avis visibles. Classement variable selon localisation, appareil et moment. Date de capture non fournie.' : 'Capture mobile fournie, premier résultat sponsorisé affiché. Position variable selon requête, enchère, concurrence et contexte. Requête et date de capture non fournies.', publicationApprovalRef: 'docs/case-studies-local-acquisition.md' }];
  const context = protection ? "Entreprise nouvellement créée à Perpignan et alentours, sans site, fiche Google Business Profile, campagne d’acquisition ni client au démarrage." : "Besoin d’acquisition locale à Toulon et environs, avec création du site et mise en place d’une campagne Google Ads.";
  const workCompleted = protection ? ["Création complète du site", "Création de la fiche Google Business Profile", "Mise en place Google Local Services et création des annonces", "Mise en place Google Ads", "Gestion et suivi de la présence digitale dans la durée, depuis environ deux ans"] : ["Création du site", "Mise en place d’une campagne Google Ads pour l’acquisition locale"];
  return completeProject({ id: slug, slug, title: name, kind: "client", status: "published", clientName: name, publicationApprovalRef: "docs/case-studies-local-acquisition.md", format: "website", families, context, intervention: workCompleted.join(" ; "), technologies: [], relatedServices: services, sourceRefs: ["docs/case-studies-local-acquisition.md", `https://www.${slug}.fr/`, "public" + proof.src], visuals, video: null, cta: { href: `/realisations/${slug}`, label: "Lire l’étude de cas" }, verifiedResults, testimonial: null }, { name, publicUrl: `https://www.${slug}.fr/`, sector: "pest-control", services, summary: protection ? "Du lancement de l’entreprise à une présence locale structurée : site, fiche Google, Local Services et Google Ads." : "Création du site et mise en place de Google Ads pour l’acquisition locale à Toulon.", objectives: ["Construire une présence web et une acquisition locale"], workCompleted, location: protection ? "Perpignan et alentours" : "Toulon et environs", caseStudyReady: true, seoTitle: protection ? "Protection Nuisibles : site, SEO local & acquisition | CODE-V" : "Nuisibles Toulon : site web & Google Ads local | CODE-V" });
}

export const projects: readonly Project[] = [
  acquisitionCase("protection-nuisibles"),
  acquisitionCase("nuisibles-toulon"),
  ...existingProjects.map(project => completeProject(project, {
    name: project.id === "code-v-site" ? "Site CODE-V" : "Film CODE-V — Automatisation & IA",
    featured: false,
  })),
  observedClient({
    slug: "chateau-de-projan", name: "Château de Projan", publicUrl: "https://www.chateauprojan.fr/",
    sector: "hospitality", location: "Projan, Gers",
    summary: "Site de présentation d’un domaine hôtelier associant hébergement, restauration et art contemporain.",
    features: ["Navigation chambres, galerie, table, domaine et contact", "Liens vers une demande de séjour", "Présentation photographique des espaces et expériences"],
    visualStyle: "Fond crème et typographie de corps Inter, observés dans le navigateur.",
    publicTitle: "Château de Projan | Hôtel, Restaurant & Art Contemporain dans le Gers",
  }),
  observedClient({
    slug: "le-parc-de-gouts", name: "Le Parc de Goûts", publicUrl: "https://www.le-parc-de-gouts.fr/",
    sector: "hospitality", location: null,
    summary: "Site de présentation d’un gîte et de son domaine privé, avec espaces, équipements et informations de séjour.",
    features: ["Navigation domaine, photos, réservations et contact", "Présentation des espaces et équipements", "Contenu de présentation des séjours"],
    visualStyle: "Fond de page blanc et typographie de corps Inter, observés dans le navigateur.",
    publicTitle: "Le Parc de Goûts | Domaine d'Exception",
  }),
  observedClient({
    slug: "buffalo-snack", name: "Buffalo Snack", publicUrl: "https://buffalo-snack.vercel.app/",
    sector: "restaurant", location: null,
    summary: "Site de restauration rapide présentant une carte de burgers, sandwichs et snacks, son concept et ses informations de contact.",
    features: ["Navigation carte, concept et contact", "Carte organisée par catégories avec tarifs visibles", "Horaires d’ouverture", "Formulaire de contact visible"],
    visualStyle: "Fond de page sombre et typographie de corps système sans empattement, observés dans le navigateur.",
    publicTitle: "Buffalo Snack | Restauration Rapide & Burgers Maison",
  }),
  observedClient({
    slug: "antiquite-canetoise", name: "Antiquité Canétoise", publicUrl: "https://www.antiquitecanetoise.fr/",
    sector: "antiques", location: "Canet-en-Roussillon, Pyrénées-Orientales",
    summary: "Site de présentation d’antiquités, de restauration et d’estimation, avec un aperçu de pièces proposées.",
    features: ["Navigation catalogue, restaurations, estimations, entreprise et contact", "Aperçu de produits avec prix sur demande", "Vidéo présente dans la page d’accueil"],
    visualStyle: "Fond de page blanc et typographie de corps Arial, observés dans le navigateur.",
    publicTitle: "Restauration et Expertise",
  }),
  observedClient({
    slug: "peinture-occitane", name: "Peinture Occitane", publicUrl: "https://www.peinture-occitane.fr/",
    sector: "painting-renovation", location: "Perpignan, Pyrénées-Orientales",
    summary: "Site d’une entreprise de peinture et rénovation présentant ses prestations et son approche.",
    features: ["Navigation prestations, réalisations, avis et contact", "Appels à demander un devis", "Présentation de la méthode et des finitions"],
    visualStyle: "Fond de page sombre et typographie de corps Inter, observés dans le navigateur.",
    publicTitle: "Entreprise de peinture à Perpignan | Peinture Occitane",
  }),
  observedClient({
    slug: "express-nuisibles", name: "Express Nuisibles", publicUrl: "https://www.express-nuisibles.fr/",
    sector: "pest-control", location: "Perpignan, Pyrénées-Orientales",
    summary: "Site d’une entreprise de lutte contre les nuisibles présentant traitements, zones et demande de devis.",
    features: ["Présentation des traitements et zones d’intervention", "Interface d’estimation en étapes", "Formulaire de devis visible", "Liens d’appel téléphonique"],
    visualStyle: "Fond de page gris clair et typographie de corps système sans empattement, observés dans le navigateur.",
    publicTitle: "Express Nuisibles | Dératisation & Punaises de lit Perpignan",
  }),
  observedClient({
    slug: "narbonne-toiture", name: "Narbonne Toiture", publicUrl: "https://www.narbonnetoiture.fr/",
    sector: "roofing", location: "Narbonne, Aude",
    summary: "Site d’une entreprise de couverture présentant entretien, réparations et travaux de toiture.",
    features: ["Navigation services, réalisations, conseils et contact", "Comparateur avant/après explicitement présenté comme illustration", "Liens vers des prestations de toiture", "Appels à demander un devis"],
    visualStyle: "Fond de page blanc et typographie de corps Geist, observés dans le navigateur.",
    publicTitle: "Couvreur à Narbonne | Narbonne Toiture",
  }),
];

export function getPublishedProjects() {
  return projects.filter(project => project.status === "published" && project.sourceRefs.length > 0 && (project.kind === "internal" || Boolean(project.publicationApprovalRef && project.clientName)));
}
/** Public selection only. Other helpers include drafts for catalog work. */
export function getFeaturedProjects() {
  return getPublishedProjects().filter(project => project.featured);
}
export function getProjectBySlug(slug: string) {
  return projects.find(project => project.slug === slug);
}
export function getProjectsByServiceFamily(family: ServiceFamily) {
  return projects.filter(project => project.serviceFamilies.includes(family));
}
export function getProjectsBySector(sector: ProjectSector) {
  return projects.filter(project => project.sector === sector);
}
// A slug identifies a dossier, never an automatically published route.
