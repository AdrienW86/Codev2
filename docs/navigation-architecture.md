# Architecture de navigation CODE-V

## Standard : fil d’Ariane

Toute nouvelle page interne publique intègre Breadcrumb, sauf exception documentée (Home, page technique ou erreur sans hiérarchie utile). Le fil est placé sous le Header, au début du hero et avant le H1. Il ne remplace pas la navigation principale.

Le composant est rendu côté serveur. Il produit un nav « Fil d’Ariane », une liste ordonnée, des séparateurs aria-hidden, des liens ancêtres et un élément courant non cliquable avec aria-current="page". Les libellés peuvent revenir à la ligne sur mobile, sans masquer la hiérarchie.

```tsx
import Breadcrumb from "@/components/Breadcrumb";

<Breadcrumb
  currentPath="/solutions/automatisation-ia"
  items={[
    { label: "Accueil", href: "/" },
    { label: "Solutions", href: "/solutions" },
    { label: "Automatisation & IA" },
  ]}
/>
```

API : `items: readonly BreadcrumbItem[]`, `currentPath: string`, `tone?: "dark" | "light"`. BreadcrumbItem contient label et href optionnel. Les ancêtres doivent avoir un chemin publié ; le dernier est toujours du texte. currentPath est le chemin canonique local, sans query ni hash ; l’origine du JSON-LD est https://www.code-v.fr.

PageHero requiert la prop breadcrumb. Les héros personnalisés utilisent directement Breadcrumb. getPageBreadcrumb, dans src/data/breadcrumbs.ts, centralise les libellés et ajoute l’ancêtre Solutions aux pages familles publiées sous /solutions/.

## Hiérarchies actuelles

| Route | Fil visible et JSON-LD |
| --- | --- |
| /solutions | Accueil › Solutions |
| /solutions/automatisation-ia | Accueil › Solutions › Automatisation & IA |
| /solutions/web-applications | Accueil › Solutions › Web & Applications |
| /contact | Accueil › Contact |
| /qui-sommes-nous | Accueil › À propos |
| /referencement | Accueil › Référencement naturel |
| /publicite | Accueil › Publicité en ligne |
| /creation-site | Accueil › Création de site |
| /facebook | Accueil › Publications Facebook |
| /mentions-legales | Accueil › Mentions légales |

Le hub /solutions est maintenant publié dans le code et devient l’ancêtre réel des deux pages familles. Les pages legacy gardent leur hiérarchie directe jusqu’à une décision explicite de migration. Ressources et Réalisations ne deviennent des ancêtres qu’après création et validation de leurs hubs. Ne pas déduire de nouveaux niveaux uniquement des slugs du catalogue.

## Destinations des familles

src/data/navigation.ts reste la table partagée par le Header, la Home et le hub. Les noms et intents viennent de serviceFamilies ; la Home conserve sa présentation actuelle. Chaque destination porte un destinationType :

- family : page famille dédiée publiée ; web et automation.
- service : page existante couvrant une expertise ; acquisition vers /publicite, seo vers /referencement.
- contact : cadrage du besoin, sans page famille prétendument disponible.

Le hub ne publie aucun slug futur en lien. Pour activer une nouvelle famille : créer et valider sa page, mettre à jour son href dans destinations et son destinationType, ajouter son libellé à breadcrumbs.ts, puis contrôler HTTP, clavier et JSON-LD. Ne pas changer seulement l’intitulé du CTA.

Le mega-menu conserve le bouton d’ouverture et ajoute « Voir toutes les solutions » vers /solutions, accessible en desktop et mobile.

## JSON-LD

Le BreadcrumbList est généré depuis les mêmes items que le fil visible : positions à partir de 1, noms identiques et URLs absolues des routes publiées. Le dernier item utilise currentPath. Aucun BreadcrumbList sur la Home. La sérialisation échappe les chevrons ouvrants pour éviter qu’un libellé puisse fermer le script.

## Hub Solutions — composition

Hero avec panneaux d’interface superposés, introduction et six leviers reliés, puis trois chapitres : expérience, présence, continuité. Chaque chapitre réunit trois familles dans des lignes éditoriales, avec un visuel spécifique. Pas de grille de neuf cartes. La section présence inverse le split et passe en nuit ; la continuité regroupe ses liens dans un panneau clair. Le CTA final propose un échange direct ou l’assistant stratégie existant.

Sur mobile : assemblage du hero en panneau principal et deux panneaux côte à côte, navigation de parcours verticale, six leviers en deux colonnes, visuels plus courts et ordre des chapitres homogène. Tous les liens des neuf familles restent dans le HTML et accessibles sans changement d’état JavaScript.

Motion : Reveal ponctuel, entrée des panneaux décalée, construction de lignes et anneaux, hover des liens. Aucune boucle, vidéo, bibliothèque ou écouteur de scroll ajouté. Reduced motion garde les états finaux sans animation.

## Validation — 3 octobre 2026

TypeScript, build isolé et navigateur Chromium. Contrôle des dix pages internes × cinq largeurs (320, 375, 768, 1024, 1440) : fil visible, JSON-LD, chemins, position sous le Header et avant le H1, focus et absence de débordement. Home sans breadcrumb. Le hub est aussi contrôlé pour ses neuf familles, ses ancres de parcours, tous ses liens internes, le menu Solutions et reduced motion.

SEO : title et description propres au hub, H1 unique, canonical https://www.code-v.fr/solutions, Open Graph et BreadcrumbList. Aucun résultat, prix, média client ou données structurées commerciales inventés.

La Home, le catalogue et la logique chatbot ne sont pas refaits. Les pages familles changent uniquement de hiérarchie grâce aux données partagées du breadcrumb. Les API et not-found restent hors de cette hiérarchie.

### Destinations utilisées et résultat QA

| Famille | Destination |
| --- | --- |
| Web & Applications | /solutions/web-applications |
| Acquisition & Publicité | /publicite |
| SEO & Visibilité locale | /referencement |
| Réseaux sociaux & Community management | /contact?service=social-management |
| Contenu & Création | /contact?service=content-production |
| Automatisation & IA | /solutions/automatisation-ia |
| Logiciels & Solutions métier | /contact?service=business-tool |
| Stratégie digitale | /contact?service=digital-strategy |
| Maintenance & Accompagnement | /contact?service=website-care |

Les liens de contexte existants sont également contrôlés : /, /solutions, /contact, /contact?objectif=realisations, /facebook, /qui-sommes-nous, /creation-site, /mentions-legales. Les trois ancres #experiences, #presence et #operations correspondent à des sections du hub.

Résultats : 50 combinaisons page/largeur réussies, hiérarchies visibles et JSON-LD identiques, dernier élément non cliquable, focus visible et aucun débordement. Neuf familles présentes une seule fois sur le hub. Tous les liens internes contrôlés en HTTP 200, zéro route cassée. Accès clavier aux ancres et au lien « Voir toutes les solutions », ouverture du chatbot stratégie et focus restitué ; zéro animation active avec reduced motion. Captures complètes 375 et 1440 px inspectées. Les petits accents bleus sur surface pâle utilisent un mélange légèrement assombri pour le contraste.

Build : route /solutions statique, 2,34 kB / First Load JS 106 kB selon Next.js ; aucune nouvelle dépendance. Le test catalogue confirme les 32 prestations et neuf familles. Le build isolé utilise une valeur Resend de validation limitée au processus, sans changement de .env ni envoi de message.

Fichiers créés : src/app/solutions/page.tsx, src/app/solutions/page.module.css.
Fichiers modifiés : src/data/navigation.ts, src/data/breadcrumbs.ts, src/components/Header.tsx, src/components/header.module.css, ce document. Les deux pages familles reçoivent le nouveau niveau via getPageBreadcrumb, sans modification de leur contenu.

## Hub Réalisations publié dans le code

La navigation principale Réalisations pointe désormais vers /realisations. Son fil et son JSON-LD utilisent Accueil › Réalisations. La page expose les réalisations internes documentées dans src/data/projects.ts ; aucun lien /realisations/[slug] n’est fabriqué depuis les slugs. Pour un futur détail réellement publié, ajouter son libellé et sa hiérarchie Accueil › Réalisations › Projet. Voir docs/realisations-hub.md pour les critères de preuve, les sources et les contrôles.

## Articles et navigation éditoriale

Le Footer conserve ses autres colonnes. Sa colonne Ressources expose directement Ressources → /ressources, Articles → /articles et Publications Facebook → /facebook, sans sous-menu mobile. Le Header reste inchangé.

/ressources est le hub global (formats, thématiques, vidéo et projets). /articles est la sélection du seul format article publié depuis src/data/resources.ts, sans second registre. Fil visible et JSON-LD : Accueil › Articles.

Les détails restent exclusivement sous /ressources/[slug], avec Accueil › Ressources › Titre. Aucun /articles/[slug] ni doublon indexable. Le hub Articles possède sa propre canonical /articles. Sans article substantiel indexable, il reste noindex, follow ; la première publication article validée et indexable active son indexation automatiquement.

## Livraison autonome — stratégie et motion

/strategie-digitale et /motion-design sont des pages de services publiées, avec Accueil › Stratégie digitale et Accueil › Motion design, visibles et JSON-LD identiques. La destination strategy de navigation.ts pointe désormais vers /strategie-digitale (destinationType service). Le catalogue conserve 32 prestations ; leurs champs existingPage sont renseignés pour digital-strategy et video-motion. Motion design est accessible depuis le laboratoire de /realisations, sans transformer toute la famille Contenu en une seule prestation.

Le Footer et la Home conservent leur composition. Aucun changement des URLs historiques, aucune redirection. Les ressources détaillées restent uniquement sous /ressources/[slug]. Les articles possèdent un sommaire natif à ancres stables dans le rendu, sans JS supplémentaire.

Inventaire technique src/data/public-routes.ts ; sitemap.ts reprend les routes publiées et les ressources indexables du registre. Aucun brouillon, /articles/[slug] dupliqué ou date de modification artificielle. Mentions légales reste accessible et noindex, follow en attendant les informations légales validées. robots.txt autorise les pages publiques et référence le sitemap ; l’exclusion /api/ n’est pas une mesure de sécurité.
