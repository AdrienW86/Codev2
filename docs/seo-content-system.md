# Système de contenu et acquisition CODE-V

## Architecture initiale

`/ressources` est un hub éditorial Server Component : questions de départ, film existant CODE-V, neuf thématiques, sujets en préparation et portfolio réel. Il ne simule pas un blog déjà rempli. Le film est une démonstration de marque, pas une étude de performance. Les captures viennent du catalogue des réalisations.

`src/data/resources.ts` est le registre éditorial. Il relie l’intention de recherche, la ressource, la famille commerciale, les prestations et les projets. Les identifiants de familles et services proviennent de `services.ts` ; aucun second catalogue commercial n’est créé. Les routes disponibles viennent de `navigation.ts`.

`/ressources/[slug]` est préparée avec rendu de blocs texte, listes, média, métadonnées, fil d’Ariane et recommandations. Aucune ressource n’est publiée à cette étape. Les trois sujets préparatoires ont `status: draft`, `content: null`, auteur et dates null, `indexable: false`. Leur slug connu comme un slug inconnu renvoie 404, sans corps de brouillon ni données structurées d’article. Le hub présente seulement leur sujet avec la mention « En préparation », sans lien vers une page indisponible.

La Home, le fonctionnement du chatbot, les solutions et les réalisations ne sont pas modifiés. Le lien Ressources partagé par le Header desktop et mobile pointe vers `/ressources`. `/facebook` reste une page d’actualités distincte, sans servir de fallback.

## Clusters

Les neuf clusters réutilisent les neuf familles existantes :

| Identifiant | Cluster |
| --- | --- |
| web | Web & Applications |
| seo | SEO & Visibilité locale |
| acquisition | Acquisition & Publicité |
| social | Réseaux sociaux & Community management |
| content | Contenu & Création |
| automation | Automatisation & IA |
| software | Logiciels & Solutions métier |
| strategy | Stratégie digitale |
| maintenance | Maintenance & Accompagnement |

Une ressource possède un `topic` principal et plusieurs `serviceFamilies` possibles, dont sa thématique principale. Le hub groupe ces sujets en trois parcours de lecture, sans changer la taxonomie commerciale.

## Modèle et formats

`Resource` : identité (`id`, `slug`, titre et description), format, statut, auteur réel, dates, sujet, relations, mots clés, intention, étape de décision, sélection, couverture, vidéo, durée de lecture, métadonnées, canonical, indexation, blocs de contenu et CTA.

Formats : `article`, `guide`, `comparison`, `checklist`, `tutorial`, `analysis`, `video`, `case-study`. Les contenus sont des blocs typés, sans HTML arbitraire ni nouveau moteur CMS. Les auteurs peuvent être une personne réelle ou l’organisation éditrice lorsque ce choix correspond à la publication effective. Ne pas attribuer automatiquement tous les futurs contenus à une personne fictive.

Les relations `relatedServices`, `relatedProjects`, `relatedResources` utilisent les IDs des catalogues, pas des chemins supposés. Les mots clés des trois briefs sont des pistes éditoriales ; aucun volume de recherche, classement ou potentiel commercial n’est affirmé. La stratégie sémantique reste à construire.

## Intentions, parcours et conversion

| Intention | Étape habituelle | Rôle du contenu | CTA possible |
| --- | --- | --- | --- |
| informational | discovery | Expliquer une question précise | Solution utile ou lecture connexe |
| commercial | consideration | Comparer et cadrer un choix | Solution, réalisation ou qualification |
| transactional | decision | Préparer un passage à l’action | Demande d’audit, explication de projet ou contact |
| navigational | discovery / decision | Trouver une information sur CODE-V | Réalisation ou destination demandée |

Ces correspondances guident la rédaction sans imposer un CTA automatique. Le rédacteur choisit le CTA dans chaque brief selon la question réellement traitée. `funnelStage` distingue `discovery`, `consideration`, `decision`, indépendamment de l’intention.

`ResourceCta` prépare six actions : solution par famille, réalisation par ID, demande d’audit par prestation, explication de projet, chatbot avec intent existant, contact. `getResourceCtaHref` résout uniquement une destination réelle. Une demande d’audit passe par le contact et ne promet ni audit gratuit, ni résultat, ni prestation contractuelle non validée. Le chatbot utilise `ChatTrigger` existant, sans nouvel intent.

## Maillage

Le parcours cible est requête → ressource → solution utile → réalisation pertinente → prochaine action. Ne pas forcer toutes les étapes si le besoin ne s’y prête pas.

- `getRelatedResources` exclut les brouillons.
- `getRelatedSolutions` utilise les destinations actuelles : page famille, page service existante ou échange de cadrage explicitement nommé.
- `getRelatedProjects` ne propose que des références publiées, via les ancres du hub Réalisations. Aucune page détaillée projet fictive.
- `getResourcesByServiceFamily`, `getResourcesByService` et `getResourcesByProject` permettent de rendre les ressources utiles depuis les futures pages solutions et réalisations. Ces helpers sont prêts ; les pages existantes n’affichent pas de faux contenus pour remplir leurs blocs.

Les relations sont éditoriales, non déduites d’une simple coïncidence de mots clés. Pour chaque ajout, vérifier la pertinence et la réciprocité lorsque cela aide la lecture. Des listes vides sont préférables à un lien artificiel.

## URLs, breadcrumbs et indexation

Slugs ASCII stables : `/ressources/preparer-refonte-site`, par exemple, reste une URL prévue tant que son contenu est brouillon. `generateStaticParams()` fournit uniquement les contenus publiables ; le lookup public exclut les brouillons. Tous les liens publics vers une ressource utilisent le même filtre.

Le canonical est auto-référent sous `https://www.code-v.fr/ressources/[slug]`. Le hub a son propre canonical. Breadcrumb visible et JSON-LD : Accueil › Ressources, puis Accueil › Ressources › Titre pour un contenu publié. Le composant global est réutilisé.

`indexable` est configurable séparément du statut. Une ressource peut être publiée mais `noindex` pour un usage particulier ; une ressource brouillon n’est jamais rendue ni indexable. L’indexation ne garantit pas une visibilité ou un résultat Google. Aucun sitemap supplémentaire n’est créé dans cette phase ; lorsqu’un sitemap global sera ajouté, il devra utiliser les mêmes contenus publiés et indexables.

## Métadonnées et données structurées

`src/lib/resource-seo.ts` prépare les métadonnées Next.js : title, description, canonical, robots, Open Graph et couverture lorsqu’elle existe. Les dates Open Graph sont celles du registre, sans substitution par la date du build. `updatedAt` peut rester null ; ne pas réactualiser une date pour un simple déploiement.

Article ou BlogPosting est émis seulement pour un contenu publié, avec auteur, date réelle et contenu sourcé. L’image est omise lorsqu’aucune couverture réelle n’existe. Pour une vidéo, VideoObject exige le média, la transcription, une date de publication vidéo, une durée et une référence documentaire. Le film actuel n’a pas toutes ces métadonnées dans le registre éditorial : le hub ne génère donc pas de VideoObject. Une durée connue ne permet pas d’inventer une date de publication.

La sérialisation du JSON-LD échappe `<`. Les textes passent par le rendu React ; aucun HTML de contenu injecté. Après publication réelle, vérifier les données structurées avec les outils Google, sans interpréter leur présence comme une garantie de résultat enrichi.

Références techniques : [métadonnées Next.js 15](https://nextjs.org/docs/15/app/getting-started/metadata-and-og-images), [Article — Google Search Central](https://developers.google.com/search/docs/appearance/structured-data/article), [dates de publication](https://developers.google.com/search/docs/appearance/publication-dates).

## Workflow futur

1. Sélectionner une question après analyse sémantique, sans générer des dizaines de variantes.
2. Définir le format, l’intention, l’étape, les familles, les relations utiles et le CTA.
3. Réunir les sources, rédiger et relire le contenu. Documenter les faits, limites et éventuelles preuves client.
4. Confirmer l’auteur, les droits des médias, les dates, le titre SEO et la description. Mesurer la durée de lecture sur le texte réel.
5. Vérifier le fond, la marque, l’accessibilité, les relations et le rendu mobile.
6. Passer à `published` avec des blocs de contenu non vides, une date réelle, un auteur et des sources. Choisir `indexable` selon le rôle de la page.
7. Tester le slug, la canonical, les liens, le breadcrumb et le JSON-LD, puis suivre les données réelles de Search Console et de conversion quand leur collecte sera configurée. Aucun tracking ni cookie supplémentaire n’est ajouté ici.

## Vérification

`node tests/resources-catalog.cjs` contrôle les neuf clusters, IDs/slugs, relations, destinations, absence de publications fictives, filtres de publication, CTA, métadonnées et absence de JSON-LD vidéo incomplet. Les fixtures SEO du test restent uniquement dans le test et ne deviennent jamais des contenus du catalogue.

La validation de livraison comprend TypeScript, build isolé, responsive 320/375/768/1024/1440, clavier, reduced motion, navigation Header desktop/mobile, breadcrumb et absence de liens internes cassés. Les vidéos utilisent MotionVideo existant en lecture volontaire, les captures Next Image avec dimensions connues et chargement différé. Aucun nouveau filtre client lourd.

Résultats de la validation initiale : tous ces contrôles passent. Les 19 destinations internes du hub et leurs ancres sont valides ; les trois slugs de brouillons et un slug inconnu renvoient HTTP 404. Le hub ne produit ni Article, ni BlogPosting, ni VideoObject fictif. Le déclencheur de qualification ouvre l’assistant existant. Aucune requête MP4 n’est émise avant lecture. CLS local Chromium au chargement : environ 0,0083 ; cette mesure ne remplace pas des données terrain. Build : 19 pages statiques générées, hub de 3,6 ko et environ 112 ko de JS initial incluant les composants partagés. Aucun nouveau média ni dépendance ajouté.
