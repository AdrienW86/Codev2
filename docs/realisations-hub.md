# Hub Réalisations CODE-V

Date : 3 octobre 2026. Route : /realisations.

## Sources réelles et publication

La sélection publique actuelle contient deux dossiers internes :

- Le site CODE-V, avec Home Premium V2, navigation, hubs et pages pilotes. Sources : Home.tsx, /solutions, /solutions/web-applications et leurs documents de validation. La capture de la page pilote appartient au même dossier, pas à un second client.
- Le film motion CODE-V, déjà présent dans public/videos/automatisation.mp4. La page décrit son contenu et son intégration dans le site, sans attribuer un outil de production ou un auteur inconnu. Les compteurs restent explicitement des données de démonstration.

Aucun cas client, résultat, témoignage ou autorisation n’a été inventé. JRENOV, Peinture Catalane et Protection Nuisibles sont seulement des pistes nommées dans docs/architecture-code-v.md : contexte précis, intervention, médias autorisés et accord de publication manquent. Elles ne sont pas publiées comme clients. Les deux placeholders historiques de CaseStudies.tsx ne sont pas repris.

## Registre et routes futures

src/data/projects.ts contient la source de vérité de cette page : id, slug, format, familles, contexte, intervention, technologies vérifiables, sources, visuels avec alt/dimensions/légende, vidéo, CTA, résultats sourcés, témoignage et statut.

Les formats acceptés couvrent sites, refontes, e-commerce, applications, automatisations, agents IA, Ads, SEO, visibilité locale, réseaux sociaux, motion et logiciels métier. Aucun filtre pour deux dossiers : il serait artificiel. Le registre permet un filtrage par familles lorsqu’une sélection plus riche le justifiera.

Le type sépare projet interne publié, dossier client publié avec clientName et publicationApprovalRef obligatoires, et brouillon. getPublishedProjects exclut les brouillons et exige des références de sources. Le statut published signifie ici visible dans le hub ; il ne crée ni page de détail ni preuve d’un déploiement externe. Les sources et autorisations restent à examiner humainement.

Pour /realisations/[slug] : résoudre un slug dans les projets publiés, vérifier un contexte, un périmètre, une démarche et des visuels documentés suffisants, puis créer explicitement la route, sa metadata et son breadcrumb Accueil › Réalisations › Projet. Ne pas construire un href à partir du seul slug. Aucun lien de détail et aucune page détaillée créés dans cette passe.

## Visuels authentiques

Captures Chromium des pages réelles, le 3 octobre, à 1440 px de largeur, en reduced motion pour un état final stable :

- public/projects/code-v-home.webp : 1440 × 946, 55 186 octets.
- public/projects/code-v-web-applications.webp : 1440 × 900, 61 286 octets.

Export WebP qualité 84 %, sans mockup, retouche graphique ou contenu généré. La capture Home inclut son vrai Header et son graphique explicitement conceptuel ; la page pilote montre une illustration d’interface, pas un produit client. Les dimensions réservées et sizes de next/image limitent les transferts. Le film et son poster existants sont réutilisés sans duplication ni modification.

## Composition

Hero éditorial et déclaration claire sur la sélection interne. Projet mis en avant avec grand média, puis deux colonnes contexte/intervention et technologies. Une section asymétrique montre une seconde interface du même site et propose de consulter les pages réelles. Le film occupe une scène dark grand format, accompagnée de son contexte, de l’intégration réalisée et d’une description textuelle. Une section explique les exigences de preuve des futurs cas clients ; CTA final Contact.

Sur mobile : titre et contexte respirent séparément, médias sans inclinaison et avec un encadrement plus fin, annotations regroupées par sujet, scène vidéo compacte, CTA pleine largeur. Pas de grille répétée, de logos clients ni d’avant/après sans sources. Reveal et hover media restent ponctuels ; pas de boucle JS ou de bibliothèque nouvelle.

## Navigation, SEO et accessibilité

Le Header pointe désormais Réalisations vers /realisations, via siteNavigation. Breadcrumb partagé Accueil › Réalisations et BreadcrumbList correspondant, H1 unique, title et description propres, canonical https://www.code-v.fr/realisations. Pas de VideoObject, Review, AggregateRating ou résultat commercial structuré.

Captures avec alt informatif et légendes explicites. Poster vidéo décoratif, titre accessible et description textuelle. Lecture volontaire et contrôles natifs ; aucune source MP4 avant activation. Focus visible, parcours clavier naturel et reduced motion.

## Validation

TypeScript et build isolé. Chromium à 320 / 375 / 768 / 1024 / 1440 : layout, images décodées, alt, vidéo, lecture/pause clavier, menu, breadcrumb visible et JSON-LD, canonical, H1, liens et reduced motion. Captures desktop et mobile de la page inspectées. Vérification HTTP de tous les liens internes présents, y compris menu et Footer. Les ancres ont une cible réelle. Pas de route /realisations/[slug] publiée implicitement.

Les validations navigateur ne remplacent pas les essais Safari/iOS et appareils physiques. Aucun score de performance terrain annoncé. .env et API inchangés ; le build isolé utilise une valeur Resend de validation limitée au processus, aucun message envoyé.

## Fichiers

Créés : src/app/realisations/page.tsx, src/app/realisations/page.module.css, src/data/projects.ts, public/projects/code-v-home.webp, public/projects/code-v-web-applications.webp et ce document.

Modifiés : src/data/navigation.ts (destination Header), src/data/breadcrumbs.ts (hub), docs/navigation-architecture.md. Home, pages familles, catalogue, lecteur MotionVideo et logique chatbot inchangés.

Résultats finaux : TypeScript et build réussis. La route reste statique, 7,63 kB / First Load JS 111 kB selon Next.js (pas une mesure terrain). Les cinq largeurs passent sans débordement ni erreur JavaScript. Deux images informatives décodées ; zéro requête MP4 avant activation, lecture et pause au clavier réussies. Breadcrumb visible et JSON-LD : Accueil › Réalisations. Les 17 destinations internes présentes répondent en HTTP 200 ; zéro lien cassé. Reduced motion : zéro animation active. Les captures complètes 375 et 1440 px ont été inspectées.

Pour ajouter un dossier publié au registre, prévoir aussi une composition éditoriale dans le hub adaptée à ses médias : le registre ne génère volontairement pas une grille automatique. Les captures de site sont des archives de la version du 3 octobre ; les renouveler après une évolution visuelle importante. Les liens directs permettent de consulter la version courante.
