# Catalogue des réalisations CODE-V

`src/data/projects.ts` est la source de vérité des dossiers. Ce changement ne publie aucune nouvelle page et ne modifie ni la Home ni le hub Réalisations.

## État initial du catalogue — avant intégration au portfolio

Lors de la première phase : neuf projets, deux réalisations internes existantes et sept références client transmises par le propriétaire de CODE-V. Les références client étaient en `draft`. Voir ci-dessous la décision de publication de la nouvelle demande, qui remplace ce statut initial.

| Projet | Secteur | Source publique | Statut |
| --- | --- | --- | --- |
| Site CODE-V | Studio digital | Dépôt, captures locales | published |
| Film CODE-V — Automatisation & IA | Studio digital | MP4 et documentation du dépôt | published |
| Château de Projan | Hébergement | https://www.chateauprojan.fr/ | draft |
| Le Parc de Goûts | Hébergement | https://www.le-parc-de-gouts.fr/ | draft |
| Les Délices de Saleilles | Restauration | https://www.les-delices-de-saleilles.fr/ | draft |
| Antiquité Canétoise | Antiquités | https://www.antiquitecanetoise.fr/ | draft |
| Peinture Occitane | Peinture et rénovation | https://www.peinture-occitane.fr/ | draft |
| Express Nuisibles | Lutte contre les nuisibles | https://www.express-nuisibles.fr/ | draft |
| Narbonne Toiture | Couverture | https://www.narbonnetoiture.fr/ | draft |

Six secteurs client, sept secteurs au total. Le site CODE-V est le seul `featured`. Aucun dossier n’est actuellement `caseStudyReady` : les objectifs et le cadrage d’une étude détaillée restent à documenter, même pour les projets internes.

## Structure de Project

- Identité : `id`, `slug`, `name`, `publicUrl`, `kind`, `clientName`.
- Classification : `sector: ProjectSector | null`, `projectType: ProjectType`, `serviceFamilies: ServiceCategory[]`, `services: ServiceId[]`.
- Contenu : `summary`, `context`, `objectives[]`, `workCompleted[]`, `features[]`, `stack[]`, `visualStyle`, `location`, `year`.
- Médias : `screenshots: ProjectImage[]`, `videos: ProjectVideo[]`, `logo`, `coverImage`. Images : chemin, alt, dimensions et légende. Vidéos : chemin, poster, titre et description.
- Preuves : `sourceRefs[]`, `observations`, `verifiedResults[]`, `testimonial`, `testimonialAuthor`, `publicationApprovalRef`.
- Publication : `status: draft | published`, `featured`, `caseStudyReady`.
- Relations : `relatedServices[]`, `relatedArticles[]`, `relatedVideos[]`.
- Métadonnées d’une future étude : `seoTitle`, `seoDescription`, null tant que son contenu n’est pas préparé. `observations.publicTitle` conserve séparément le titre du site consulté.

Les champs historiques `title`, `format`, `families`, `intervention`, `technologies`, `visuals`, `video`, `cta` sont conservés pour le hub existant. La normalisation dérive les nouveaux champs des données existantes ; les tests contrôlent les alias. Les valeurs inconnues restent `null`, `[]` ou chaîne vide pour les anciens champs textuels compatibles avec le hub. L’année du copyright ne constitue pas l’année de livraison.

## Observation publique et preuve du travail

Les sept pages d’accueil ont été consultées dans Chromium à 1440 × 900 le 3 octobre 2026. Le navigateur a permis d’accéder aux sites que le lecteur web ne récupérait pas correctement. `observations` précise date, URL, titre et limites. Les styles recensés se limitent au fond et à la police calculés ; ils ne constituent pas une revue esthétique complète.

Les caractéristiques décrivent ce qui est visible : navigation, interface, présentation, formulaire. Un lien Réservation ne prouve pas un moteur de réservation ; un catalogue ne prouve pas un paiement en ligne. Aucun formulaire n’a été soumis. Les parcours secondaires et le responsive des sites clients restent à tester. Les fichiers publics `/_next/` permettent de relever Next.js, sans déduire de version, de backend, d’hébergeur ou d’intégration métier.

`services` contient uniquement des prestations livrées et confirmées. Il reste vide pour les sept clients. `relatedServices: ["website"]` et la famille `web` classent ces références pour la navigation ; ils ne constituent pas une preuve du contrat. Aucune attribution SEO, Ads, stratégie ou maintenance n’est déduite de simples éléments visibles.

Le contenu commercial des sites clients n’est pas une preuve de résultats CODE-V. Les avis affichés sur ces sites ne sont pas des témoignages sur CODE-V. Le comparateur Narbonne Toiture est explicitement illustratif : ne pas en faire une preuve de chantier réel. La vidéo visible sur Antiquité Canétoise reste hors de `videos[]` faute de média local autorisé et documenté.

## Ajouter et publier un projet

1. Vérifier sa réalité et la relation CODE-V, avec une référence documentaire.
2. Créer un identifiant stable et un slug ASCII en minuscules, séparé par des tirets, unique. Un slug ne crée pas de route.
3. Classer avec les types de `services.ts`, sans recopier les neuf familles. Ajouter uniquement des relations existantes.
4. Séparer les observations publiques du contexte client, des objectifs et du travail effectivement livré. Documenter ces derniers avant de les remplir.
5. Ajouter uniquement des médias réels dont l’usage est autorisé. Pour un client sans capture locale, laisser `screenshots`, `videos` vides et `logo`, `coverImage` null.
6. Garder `draft` tant que le dossier n’est pas prêt à être publié. Une référence client publiée exige `clientName`, des sources et `publicationApprovalRef` non vides ; ne pas inventer cette autorisation.
7. Exécuter `node tests/projects-catalog.cjs` et TypeScript après chaque ajout.

Chaque résultat vérifié exige un libellé, une valeur, une source présente dans `sourceRefs`, une méthodologie et une référence d’autorisation de publication. Aucun chiffre de démonstration ou placeholder. Un témoignage exige citation, auteur et autorisation ; `testimonialAuthor` est dérivé de ce témoignage.

## Featured et études de cas

`featured` sélectionne quelques projets publiés avec nom, résumé, secteur, sources, travail documenté et média réel. Aucun des sept clients n’a de capture locale à ce stade. Château de Projan reste un candidat à examiner après capture autorisée et validation du rendu ; il n’est pas automatiquement mis en avant.

`caseStudyReady` exige au minimum contexte, objectifs, intervention documentée, sources et médias réels, puis une relecture éditoriale. Il n’exige pas de résultat chiffré : une étude peut expliquer un travail sans promettre de performance. Ce champ ne crée aucune page détaillée et ne remplace pas le statut de publication ni les droits.

## Médias, relations et helpers

Utiliser des chemins publics locaux, des dimensions réelles, un alt pertinent et des noms stables. Réutiliser les captures et le film CODE-V déjà présents ; ne pas copier les photos externes sans autorisation. Aucun nouveau média n’est créé ici.

`getPublishedProjects()` préserve les deux références internes du hub. `getFeaturedProjects()` retourne uniquement des projets publiés. `getProjectBySlug()`, `getProjectsByServiceFamily()` et `getProjectsBySector()` incluent les brouillons pour travailler sur le catalogue : un futur rendu public doit filtrer via `getPublishedProjects()`. Les relations articles restent vides tant qu’aucun article réel n’est relié ; les relations vidéos utilisent les chemins de vidéos locales cataloguées. Aucun lien `/realisations/[slug]` n’est généré.

## Informations à réunir

Pour les clients : périmètre exact livré, contexte initial, objectifs confirmés, dates, médias autorisés, autorisation de publication, éventuelles preuves de résultats et témoignages CODE-V. La localisation du Parc de Goûts reste à confirmer. La stack interne reste inconnue. Les pages secondaires, réservations, formulaires, catalogues et responsive nécessitent une vérification manuelle avant toute affirmation fonctionnelle détaillée.

## Validation de cette intégration

- `node tests/projects-catalog.cjs` : neuf dossiers validés, unicité, URLs, familles, services, alias, preuves, médias et sélection publique.
- `node tests/service-catalog.cjs` : catalogue commercial existant inchangé et valide.
- `npx tsc --noEmit --incremental false` : réussi.
- Build Next.js de production dans un dossier temporaire isolé : réussi, 18 pages générées. Clé Resend factice limitée au processus de validation, sans envoi ni modification de `.env`.
- `/realisations` en production : HTTP 200, brouillons client absents de la sélection. Aucune modification de rendu ni nouvelle route.

## Publication des références clients

La demande suivante, jointe sous `cccd663c-14ed-4d97-b8a4-8586869ee5c2/Texte collé.txt`, confirme explicitement que les sept sites sont des réalisations CODE-V et demande de les intégrer à `/realisations`. Elle constitue la référence d’autorisation de présentation de ces sites dans ce portfolio. Les neuf projets sont maintenant `published`, sans que cette décision confirme un périmètre contractuel, des objectifs ou des résultats.

Château de Projan devient l’unique `featured` ; le site interne ne l’est plus. Pour une référence de sélection, les données minimales sont nom, secteur, résumé, URL accessible ou média réel, sources et caractéristiques observées ou travail documenté. `featured` désigne une priorité éditoriale, pas une étude de cas complète. Tous les `caseStudyReady` restent faux.

La page distingue les sept sites clients et le « Laboratoire CODE-V » regroupant les deux démonstrations internes. Les liens clients utilisent leurs URL publiques, un nouvel onglet et `noopener noreferrer`. Aucun slug n’est transformé en route détaillée. Les secteurs sont accessibles par ancres, sans filtre JavaScript supplémentaire.

### Captures autorisées et intégrées

Le propriétaire a ensuite donné une autorisation explicite directement dans la conversation : ouvrir les sept sites publics, capturer desktop et mobile, optimiser en WebP et utiliser les images uniquement pour les réalisations CODE-V. Le blocage automatique est levé. Aucun site externe n’a été modifié et aucun formulaire n’a été soumis.

Huit captures réelles ont été créées le 3 octobre 2026 : sept `public/projects/[slug]/home.webp` en 1440 × 1000 et `public/projects/chateau-de-projan/mobile.webp` en 375 × 812. Les images ont été inspectées ; aucun écran d’authentification ni faux mockup ne remplace les sites. Conversion WebP qualité 80, captures des interfaces publiques sans modification de leur contenu. Chaque fichier est inférieur à 180 ko ; le test du catalogue contrôle ce budget.

`screenshots`, `visuals` et `coverImage` pointent désormais vers ces fichiers. Château de Projan est présenté en grand média accompagné de son aperçu mobile. Les autres captures sont alternées avec le texte, sur surfaces claires et sombres. Next Image fournit des tailles adaptées à la largeur affichée, le chargement différé et des dimensions intrinsèques réservant l’espace. Aucune capture ne fait l’objet d’un préchargement prioritaire dans le hero. Les données de résultats et le périmètre livré restent vides ; les captures ne constituent pas une preuve de performance commerciale.

### Validation de la page

Les tests du catalogue ont été adaptés à la publication des sept clients et à Château de Projan en sélection principale. TypeScript et le build isolé passent. Les vérifications navigateur de la page, décrites dans le compte rendu de livraison, portent sur les cinq largeurs, les liens internes et ancres, le clavier, reduced motion et le breadcrumb visible / JSON-LD. Les anciennes validations ci-dessus décrivent uniquement la première phase.

### Validation après ajout des captures

Responsive vérifié à 320, 375, 768, 1024 et 1440 : aucun débordement horizontal. Les huit captures clients et la capture interne se décodent correctement. Clavier, focus, reduced motion, absence d’autoplay, ancres et 17 destinations internes vérifiés. Breadcrumb Accueil › Réalisations et JSON-LD cohérents. TypeScript, tests du catalogue et build de production isolé réussis.

Mesure locale Chromium de la stabilité au chargement : CLS ≈ 0,0022, sous le seuil de 0,1. Ce contrôle local ne remplace pas les mesures terrain. Les neuf images de projets rendues ont un chargement lazy et des dimensions explicites ; aucune n’est préchargée dans le hero. Aucun nouveau composant client ni bibliothèque d’animation ajouté.

| Capture | Octets |
| --- | ---: |
| Château de Projan — desktop | 65 852 |
| Château de Projan — mobile | 23 272 |
| Le Parc de Goûts | 105 052 |
| Les Délices de Saleilles | 58 056 |
| Antiquité Canétoise | 136 982 |
| Peinture Occitane | 63 210 |
| Express Nuisibles | 77 120 |
| Narbonne Toiture | 87 304 |
| Total des huit fichiers sources | 616 848 |

Ces tailles correspondent aux WebP stockés ; Next Image adapte les fichiers réellement transférés à l’écran et à la densité du terminal.

## Remplacement de la référence restauration

À la demande du propriétaire, Buffalo Snack (`https://buffalo-snack.vercel.app/`, slug `buffalo-snack`) remplace Les Délices de Saleilles dans le catalogue et le portfolio. La page publique a été consultée dans Chromium : carte par catégories, tarifs visibles, concept, horaires et formulaire de contact. Localisation non confirmée : null. Aucun parcours de commande, résultat commercial ou témoignage déduit.

Le propriétaire a ensuite explicitement demandé une capture de Buffalo Snack. Une capture réelle desktop 1440 × 1000 a été créée dans `public/projects/buffalo-snack/home.webp` : WebP qualité 80, 52 572 octets. Elle est utilisée dans `screenshots`, `visuals` et `coverImage`, donc affichée automatiquement dans `/realisations`. La capture de l’ancien restaurant n’est pas réutilisée. Les tableaux historiques ci-dessus décrivent l’état avant ce remplacement.
