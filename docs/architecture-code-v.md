# CODE-V — architecture commerciale, éditoriale, SEO et technique

Document de décision — 3 octobre 2026. Statut : proposition à valider avant implémentation.

## Synthèse et périmètre

Construire une vitrine qui démontre la capacité de CODE-V à concevoir, attirer, convertir, automatiser et mesurer. Le design, les offres, les preuves et la technique doivent raconter le même système.

Cette étape produit uniquement ce document. Aucun changement de route, de design, de comportement du chatbot ou de catalogue applicatif. Les interfaces TypeScript ci-dessous sont des contrats proposés, pas du code déjà intégré.

**Indispensable** : réconcilier les URLs publiques avec le projet, valider les offres, fiabiliser le contact, produire des preuves autorisées et préparer SEO technique/performance avant lancement.

**Recommandé** : développer progressivement les pages de prestations prioritaires, les études de cas et les ressources reliées aux besoins commerciaux.

**Optionnel** : pages techniques Next.js, secteurs et pages vidéo indépendantes, seulement avec un contenu spécifique suffisant.

Le domaine de référence reste `https://www.code-v.fr`. Aucun objectif de position Google, de volume de prospects ou de performance client n’est promis. Les seuils techniques cités plus loin sont des objectifs de validation, pas des résultats mesurés.

## 1. Audit de l’existant

### Méthode et limites

Inspection des routes, composants, catalogue, CSS, assets et configuration Next.js du workspace. Vérification HTTP publique de la Home, de ses liens internes et des pages principales. Consultation des documentations officielles SEO et performance. Aucun accès à Search Console, aux données analytics, aux backlinks ni aux logs de production ; aucun volume de recherche disponible. Pas de mesure Lighthouse ou terrain effectuée dans cette étape.

L’inventaire des URLs publiques ci-dessous est un minimum observé dans la navigation, pas un crawl exhaustif ni un inventaire d’indexation. L’échec du lecteur web sur certaines pages a été compensé par une lecture HTTP publique avec PowerShell. Le dépôt local et le site en ligne sont deux versions distinctes.

### Routes locales

| Route | État constaté | Action à préparer |
| --- | --- | --- |
| `/` | Home V2, H1 et parcours complet, metadata propres et canonical | Conserver la direction et documenter les preuves |
| `/creation-site` | Identité, responsive, conversion ; contenu court et général | Réconcilier avec `/sites` public |
| `/referencement` | Audit, optimisations techniques/éditoriales, suivi | Développer l’offre SEO sans diluer son intention |
| `/publicite` | Google Ads, Facebook Ads, Instagram Ads, suivi | Réconcilier avec `/ads` public ; compléter les limites |
| `/qui-sommes-nous` | Valeurs et positionnement, peu de preuves de personnes/processus | Ajouter uniquement des informations vérifiées |
| `/contact` | Formulaire client vers Resend | Fiabiliser avant toute intensification commerciale |
| `/facebook` | Feed CODE-V chargé côté client | Conserver ; ne pas le présenter comme une page service |
| `/mentions-legales` | Informations explicitement provisoires | Réconcilier avec `/mentions` public et valider les données |
| `/api/chat` | OpenAI Chat Completions, `gpt-4o-mini`, clé serveur | Aucun changement dans cette étape |
| `/api/contact` | Resend ; email serveur | Vérifier traitement et livraison avant lancement |
| `/api/facebook-feed` | Proxy vers le feed Facebook | Prévoir cache, résilience et contrôle des erreurs |

### Écart avec le site actuellement public

Les pages publiques `/sites`, `/ads`, `/referencement`, `/qui-sommes-nous`, `/contact`, `/mentions`, `/confidentialite` et `/conditions-generales` répondent HTTP 200 au contrôle. Le lien `/mobiles` est présent dans la navigation mais répond HTTP 404. `/robots.txt` et `/sitemap.xml` répondent également HTTP 404 au contrôle ; cela ne prouve pas qu’aucun autre sitemap n’existe ailleurs.

La Home publique annonce site e-commerce, maintenance, offres tarifées, audit gratuit et certifications. Ces mentions ne prouvent pas leur validité commerciale actuelle. Les montants ne sont pas importés dans le catalogue proposé et les certifications ne seront pas reprises sans preuve. Il faut décider de la continuité de ces offres et vérifier les obligations liées aux offres déjà vendues. Source : [Home publique CODE-V](https://www.code-v.fr/).

La conclusion précédente « aucun tarif dans le projet » reste vraie pour le code local examiné ; elle ne signifie pas « aucun tarif sur le domaine public ». Cette distinction doit accompagner les futures décisions.

### Home V2 et conversion

- Progression pertinente : promesse → problème → système → expertises → preuves → qualification → méthode → CTA.
- Graphique signature SVG, verre léger, cyan, pills et glow conservés. Les chiffres non sourcés du hero ont été retirés.
- Quatre choix ouvrent le chatbot avec `acquisition`, `website`, `automation`, `strategy`. Les autres CTA vont au contact ou aux offres existantes.
- Les deux réalisations sont des placeholders explicites, sans résultat client. Elles ne doivent pas devenir des pages indexables comme si elles décrivaient des projets réels.
- Le catalogue `src/data/services.ts` décrit 18 prestations en draft mais n’alimente pas encore les textes, la navigation ou le chatbot. Les copies divergent encore : c’est une dette à résoudre après validation commerciale.
- La section Contenu n’a pas d’intent propre ; son orientation provisoire utilise `strategy`. Ne pas inventer un nouvel intent dans cette étape.

### Pages, preuves et qualité éditoriale

Les trois pages historiques locales sont trop générales pour répondre à toutes les attentes d’un prospect : périmètre, exclusions, processus, prérequis, exemples et preuves restent à détailler. Elles constituent une base, pas une architecture éditoriale complète.

Le dashboard décoratif de `/publicite` contient encore des métriques de portée, clics et leads sans source client. À corriger avant lancement en visualisation conceptuelle explicitement identifiée, comme le hero. Ne reprendre aucune de ces métriques dans les études de cas ou données structurées.

Studio : renforcer l’identité humaine, les compétences réellement démontrées et la manière de travailler. Contact : le frontend collecte aussi entreprise/type de projet, mais le backend ne reprend actuellement que nom/email/message ; ce décalage est à corriger dans une future passe autorisée. Le backend ne vérifie pas explicitement l’erreur retournée dans le résultat Resend et insère les champs dans du HTML sans échappement dédié : revoir la confirmation d’envoi et le traitement avant production. Aucun correctif ici.

### SEO technique actuel

- Titles et descriptions existent sur les huit pages. La Home possède un canonical absolu et des propriétés Open Graph propres.
- Le layout porte encore un positionnement historique « Création web, SEO et publicité ». Les pages secondaires héritent d’Open Graph générique.
- Pas de `metadataBase`, canonical propre à chaque page secondaire, Twitter cards ou image Open Graph dédiée constatés dans les sources.
- Pas de fichier sitemap/robots dans le projet, pas de JSON-LD, pas de fil d’Ariane partagé.
- Liens internes fonctionnels mais centrés sur les anciennes offres. Les ancres de Home ne remplacent pas des pages détaillées répondant à des recherches distinctes.
- Les mentions légales locales restent provisoires. Le contenu public de confidentialité/CGV devra être relu et adapté à la nouvelle configuration ; aucune réécriture juridique automatique.

### Architecture technique, composants, assets et CSS

Next.js 15.4.10, React 19.1.0, TypeScript 5.8.3, Resend. Aucun Tailwind ou moteur d’animation lourd. Pages/layout/Home majoritairement Server Components ; clients limités à Header, ContactForm, FacebookFeed, RobotAssistant, ChatTrigger et Reveal.

Composants partagés : Header/Footer, PageHero, ServiceCard, ContactForm, RobotAssistant. Home : GrowthCard, CaseStudies, Reveal et `home.module.css`. Les noms de pages/offres sont encore dispersés entre Home, navigation, footer, chatbot et catalogue.

`globals.css` : environ 31,6 ko de texte source non compressé, reset, tokens, typographie, composants historiques et styles Facebook. CSS Modules pour Home, Header et robot. Les deux polices viennent actuellement d’un `@import` Google Fonts avec plusieurs graisses. Conserver les tokens et les styles validés, puis déplacer progressivement les styles complexes dans leurs modules si nécessaire.

Asset local réel identifié : `robot.png`, environ 47,9 ko, rendu via une balise img dans un widget global. `public/` ne contient que `.gitkeep`. Aucun fichier vidéo local, poster, cover d’article ou capture client trouvé. Les images Facebook viennent de la plateforme et sont affichées en img avec `alt=""`. Les valeurs ci-dessus sont des tailles de fichiers source, pas des poids transférés en production.

Risques évidents : polices externes découvertes via CSS, images sans traitement Next/Image, coût global du widget, animations continues et flous/backdrop-filter, plusieurs observers Reveal, contenu Facebook absent du HTML initial puis inséré après requête. Ces points justifient des mesures, sans conclure à un mauvais score non mesuré.

## 2. Architecture cible

### Une navigation par besoin, des pages avec une responsabilité claire

La Home porte le positionnement transversal. Les quatre familles sont des portes d’entrée ; elles ne remplacent pas les prestations détaillées. Les pages historiques publiques restent les destinations principales lorsqu’elles correspondent au sujet.

```text
/
├── solutions/                           hub d’orientation
│   ├── web-applications/                hub Web
│   │   ├── refonte-site/                spécialisation éventuelle
│   │   ├── landing-pages/
│   │   ├── applications-web/
│   │   └── outils-metier/
│   ├── acquisition/                     organique + payant + mesure
│   │   ├── seo-local/
│   │   ├── google-ads/
│   │   ├── google-local-services/
│   │   ├── facebook-instagram-ads/
│   │   └── tracking-conversions/
│   ├── contenu-visibilite/
│   │   ├── strategie-editoriale-reseaux-sociaux/
│   │   ├── creation-contenus/
│   │   └── video-motion-design/
│   └── automatisation-ia/
│       ├── automatisation-processus/
│       ├── airtable/
│       ├── integrations-api/
│       ├── agents-ia/
│       └── reporting-automatise/
├── sites/                               offre Web historique publique
├── referencement/                       offre SEO historique
├── ads/                                 hub publicité historique publique
├── realisations/                        preuves, pas un catalogue de promesses
│   └── [slug]/
├── ressources/                          savoir-faire et réponses utiles
│   └── [slug]/
├── videos/                              seulement quand un corpus existe
│   └── [slug]/
├── qui-sommes-nous/
├── contact/
├── facebook/                            route locale conservée
├── mentions/
├── confidentialite/
└── conditions-generales/

Optionnels après validation :
/expertises/nextjs/
/secteurs/[slug]/
/solutions/strategie-digitale/           seulement si mission distincte validée
```

Ce diagramme décrit la cible, pas un lot à construire immédiatement. Un hub n’est publié que s’il aide réellement à choisir et contient une synthèse utile. Les catégories éditoriales restent d’abord des filtres non indexables, sans multiplication de pages d’archives vides.

Les URLs locales `/creation-site`, `/publicite` et `/mentions-legales` restent inchangées à cette étape. Leur consolidation future éventuelle est décrite dans le mapping, soumise à la validation SEO ; pas de double contenu permanent sur deux routes équivalentes.

### Responsabilités et parcours

| Type de page | Intention principale | Prochaine action utile |
| --- | --- | --- |
| Home | Comprendre CODE-V et son approche globale | Choisir une famille ou un objectif |
| Famille | Choisir un ensemble de leviers | Identifier une prestation pertinente |
| Prestation | Comprendre périmètre, adéquation et méthode | Étudier le besoin avec CODE-V |
| Réalisation | Vérifier un savoir-faire sur un cas documenté | Découvrir les prestations réellement utilisées |
| Ressource | Résoudre une question précise | Lire un exemple ou une prestation liée |
| Vidéo | Comprendre ou observer une démonstration | Lire la transcription et le contexte |
| Studio | Identifier l’équipe et sa façon de travailler | Engager un échange |
| Contact | Transmettre une demande clairement | Confirmation fiable, sans friction |

CTA principal unique par page commerciale. Chatbot comme aide facultative ; le contact reste accessible sans conversation, sans animation et sans JavaScript lorsque le parcours le permet. Aucun contenu SEO essentiel réservé au chatbot.

## 3. Mapping des URLs historiques

**Proposition principale : conserver les slugs réellement publics `/sites`, `/ads` et `/mentions`.** Changer uniquement pour uniformiser une arborescence n’apporte pas une justification suffisante. L’éventuelle consolidation des variantes locales doit être décidée après inventaire Search Console et logs.

| Ancienne URL / origine | Cible proposée | Conservation ou évolution future | Raison |
| --- | --- | --- | --- |
| `/` — public et local | `/` | Conservation 200 | Positionnement global |
| `/sites` — public 200 | `/sites` | Conservation 200, à intégrer au nouveau projet | Sujet Web existant |
| `/creation-site` — local | `/sites` | Aucun changement maintenant ; 301 possible seulement après validation | Variante de la même offre ; éviter un doublon |
| `/referencement` — public et local | `/referencement` | Conservation 200 | Intention SEO existante ; relier les anciens sujets payants aux nouvelles pages |
| `/ads` — public 200 | `/ads` | Conservation 200, à intégrer | Publicité historique, hub des canaux payants |
| `/publicite` — local | `/ads` | Aucun changement maintenant ; 301 possible après validation | Variante de la même offre publicitaire |
| `/qui-sommes-nous` — public et local | Même URL | Conservation 200 | Studio et identité |
| `/contact` — public et local | Même URL | Conservation 200 | Tunnel existant ; rendez-vous public versus formulaire local à réconcilier |
| `/facebook` — local | Même URL | Conservation 200 | Actualités, pas substitut à une page service |
| `/mentions` — public 200 | `/mentions` | Conservation 200, à intégrer | Page publique existante |
| `/mentions-legales` — local | `/mentions` | Aucun changement maintenant ; 301 possible après validation | Réunir les deux versions légales validées |
| `/confidentialite` — public 200 | Même URL | Conservation 200, à intégrer | Contenu public absent du projet local |
| `/conditions-generales` — public 200 | Même URL | Conservation 200, à intégrer | Conditions publiques à réconcilier avec l’offre |
| `/mobiles` — lien public, HTTP 404 | `/mobiles` si offre native confirmée | Décision ouverte ; pas de 301 vers des applications web non équivalentes | Ne pas masquer une offre distincte sous un autre sujet |
| `/sites#tarif`, `/ads#tarif`, `/referencement#tarif` | Même page et ancre utile | Maintenir l’ancre même si tarifs retirés, avec information honnête | Les fragments ne sont pas des routes et ne déclenchent pas une règle 301 serveur |
| `/api/chat`, `/api/contact`, `/api/facebook-feed` | Identiques | Conservation des endpoints | Intégrations existantes |

`/mobiles` : confirmer si une page a existé et reçu trafic/backlinks. Si l’offre est maintenue, produire un contenu substantiel sur la même URL ; si abandonnée sans destination équivalente, conserver un vrai statut d’absence approprié plutôt qu’un transfert trompeur à la Home. Aucun changement effectué ici.

Avant migration, compléter ce tableau avec Search Console, exports analytics, crawl des URLs et assets publics, variantes HTTP/www, backlinks importants et liens externes. Conserver une preuve du contenu original. Tester les destinations et mettre à jour les liens internes. Google recommande une préparation, un mapping et une migration surveillée ; les fluctuations éventuelles ne peuvent pas être exclues. [Guide de migration](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes).

Si une 301 est retenue, la vérifier réellement en HTTP, sans chaîne ou boucle. Dans `redirects()` de Next.js, `permanent: true` utilise 308 ; pour respecter une décision explicite de 301, prévoir le mécanisme serveur ou plateforme adapté et tester le statut. Aucune redirection globale vers `/`. [Redirections et Google Search](https://developers.google.com/search/docs/crawling-indexing/301-redirects), [redirects Next.js](https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects).

## 4. Taxonomie commerciale et source de vérité

### Base existante à conserver

`src/data/services.ts` contient déjà les champs commerciaux demandés : ID, slug, nom, catégorie, résumé, problème, cibles, inclusions/exclusions, objectifs, prérequis, compléments, CTA, intent, questions et modes de tarification proposés. Les 18 fiches sont en draft ; aucune validation de périmètre ou de prix n’est supposée. [Analyse détaillée du catalogue](service-catalog.md).

Ne pas créer un second catalogue parallèle. Après validation de cette architecture, ajouter un bloc `seo` et un registre explicite de pages au catalogue existant. Un service peut justifier plusieurs angles éditoriaux, mais chaque page doit avoir une intention unique et un contenu distinct.

| Famille | Service ID | Nom / périmètre | Origine | Page principale proposée |
| --- | --- | --- | --- | --- |
| Web | `website` | Sites vitrines : création et refonte | Historique | `/sites` ; refonte spécialisée seulement si contenu distinct |
| Web | `landing-page` | Landing pages et parcours de conversion | Home V2 | `/solutions/web-applications/landing-pages` |
| Web | `web-application` | Applications web sur mesure | Home historique + V2 | `/solutions/web-applications/applications-web` |
| Web | `business-tool` | Outils internes, interfaces et dashboards métier | Home V2 | `/solutions/web-applications/outils-metier` |
| Acquisition | `seo` | SEO technique, éditorial, suivi | Historique | `/referencement` |
| Acquisition | `local-seo` | SEO local et configuration Google Business Profile | SEO local historique + GBP V2 | `/solutions/acquisition/seo-local` |
| Acquisition | `google-ads` | Campagnes Google Ads | Historique | `/solutions/acquisition/google-ads` |
| Acquisition | `local-services` | Google Local Services selon dossier | Public actuel + V2 | `/solutions/acquisition/google-local-services` |
| Acquisition | `meta-ads` | Publicité Facebook/Instagram | Historique | `/solutions/acquisition/facebook-instagram-ads` |
| Acquisition | `conversion-tracking` | Tracking, GA4 et mesure des conversions | Suivi historique + GA4 V2 | `/solutions/acquisition/tracking-conversions` |
| Contenu | `editorial-social` | Ligne éditoriale, réseaux sociaux, publication selon périmètre | Home V2 | `/solutions/contenu-visibilite/strategie-editoriale-reseaux-sociaux` |
| Contenu | `content-production` | Textes et contenus visuels, assistance IA avec validation | Home V2 | `/solutions/contenu-visibilite/creation-contenus` |
| Contenu | `video-motion` | Vidéo et motion, moyens de production à confirmer | Home V2 | `/solutions/contenu-visibilite/video-motion-design` |
| Automatisation | `business-workflows` | Processus et workflows, notamment Make | Home V2 | `/solutions/automatisation-ia/automatisation-processus` |
| Automatisation | `airtable-workspace` | Structuration de données, Airtable | Home V2 | `/solutions/automatisation-ia/airtable` |
| Automatisation | `api-integrations` | Intégrations API spécifiques | Home V2 | `/solutions/automatisation-ia/integrations-api` |
| Automatisation | `ai-agents` | Agents IA et assistants métier contrôlés | Home V2 | `/solutions/automatisation-ia/agents-ia` |
| Automatisation | `automated-reporting` | Consolidation et restitution automatisées | Home V2 | `/solutions/automatisation-ia/reporting-automatise` |

### Sujets à ne pas multiplier artificiellement

- « Site orienté conversion » : attribut central de l’offre Web, pas automatiquement une prestation/page en plus.
- « Landing pages publicitaires » : usage de `landing-page`, lié à Acquisition, pas une seconde offre identique.
- « Dashboard » : variante d’outil métier quand interface opérationnelle ; restitution dans reporting quand rapport d’indicateurs.
- « GA4 » et « mesure des conversions » : angles de `conversion-tracking`, pas trois offres interchangeables.
- « Make » : technologie des workflows ; une page technique dédiée est optionnelle si expertise démontrée.
- « Instagram », « Facebook », « contenus Google Business Profile » : canaux éditoriaux ; une page par réseau uniquement avec enjeux et exemples distincts. La publicité payante reste dans Acquisition.
- « Assistants métiers », « outils internes intelligents », « agents IA » : ne pas multiplier les synonymes en pages vides. Distinguer assistance IA et interface métier.
- « Génération de contenu assistée » : production finale dans Contenu ; workflow de production dans Automatisation, avec responsables de validation explicites.

### Nouvelles propositions à arbitrer

| Sujet | Proposition | Conditions |
| --- | --- | --- |
| Refonte de site | Angle/page distincte sous Web, même service initialement | Migration, reprise de contenu, contraintes et preuve dédiées |
| Développement Next.js | Page technique d’expertise optionnelle | Démonstrations réelles, maintien des acquis SEO, performance mesurée |
| Développement sur mesure | Couvert par applications/outils/API | Pas de page synonyme de tout le catalogue |
| Optimisation de conversion | Mission possible, non validée comme service autonome | Audit, hypothèses, instrumentation et modalités d’expérimentation à définir |
| Stratégie digitale | Parcours transversal déjà proposé | Mission payante uniquement si livrables et responsabilité validés |
| Maintenance/hébergement | Offre publique à réconcilier | Périmètre, support, engagements, renouvellement et abonnements |
| E-commerce | Offre mentionnée publiquement mais non définie localement | Valider capacité, plateformes, paiements, migration et exploitation |
| Mobile natif | Lien public en 404, continuité inconnue | Décider du maintien ; ne pas l’assimiler à une application web |

### Extension SEO du modèle — proposition de contrat

```ts
type SearchIntent = 'transactional' | 'commercial' | 'informational' | 'navigational' | 'local';
type ServiceSEO = {
  primaryKeywords: readonly string[];
  secondaryKeywords: readonly string[];
  searchIntents: readonly SearchIntent[];
  editorialTopics: readonly string[];
  proposedPrimaryPath: string;        // pas une URL déjà publiée
  internalLinks: readonly {
    kind: 'service' | 'resource' | 'caseStudy' | 'video';
    targetId: string;
    reason: string;
  }[];
  researchStatus: 'hypothesis' | 'serp-reviewed' | 'validated';
  evidenceUrls: readonly string[];
  // Aucun volume, aucune difficulté numérique inventée.
};
// Extension future : Service & { seo: ServiceSEO }.
// Les références de contenus doivent être validées avant génération de liens.
```

Site, navigation, pages et chatbot devront consommer les mêmes IDs et données validées. Pour le chatbot futur, exposer une projection commerciale légère (résumé, adéquation, limites, questions), pas l’intégralité des briefs SEO. Ne pas embarquer le catalogue complet dans tous les bundles clients. Aucun branchement dans cette étape.

## 5. Proposition de nouvelles pages et critères de publication

| Lot | Pages envisagées | Priorité | Critère de publication |
| --- | --- | --- | --- |
| Continuité publique | `/sites`, `/ads`, `/mentions`, `/confidentialite`, `/conditions-generales` | Indispensable avant bascule | Contenu public réconcilié et validé |
| Positionnement complet | Hubs Contenu & Visibilité et Automatisation & IA | Indispensable pour représenter les quatre piliers | Offres et limites réellement définies |
| Navigation de solutions | `/solutions`, hubs Web et Acquisition | Recommandé | Comparaison utile, pas duplication des pages historiques |
| Offres prioritaires | SEO local, Google Ads, tracking, automatisation métier | Recommandé, ordre commercial à confirmer | Périmètre validé, exemples, questions pertinentes |
| Preuves | `/realisations` et premiers cas individuels | Recommandé | Autorisations et éléments vérifiables |
| Ressources | `/ressources` et premiers guides ciblés | Recommandé | Expertise propre, auteur réel, service lié |
| Autres prestations | Applications, outils, landing pages, contenu, vidéo, API, Airtable, IA, reporting | Recommandé par vagues | Pas de page sans contenu réellement différenciant |
| Refonte, Next.js, conversion | Angles spécialisés | Optionnel | Intention distincte et capacité commerciale confirmée |
| Vidéos et secteurs | Archives et pages spécifiques | Optionnel | Corpus ou expertise spécifique suffisants |

Le gabarit prestation combine problème, client adapté/non adapté, livrables, prérequis, méthode, limites, exemples autorisés, questions fréquentes, complément pertinent et CTA. Une FAQ doit répondre à de vraies questions ; aucune obligation de balisage enrichi ou de nombre d’items.

## 6. Carte des intentions SEO et concurrence qualitative

### Méthode

Première carte sémantique par adéquation offre/intention. Pas de volumes, CPC, difficulté chiffrée ni potentiel de trafic inventés. La priorité proposée dépend de la précision du besoin, de la proximité d’une offre validable et de la disponibilité de preuves.

La concurrence est **observée seulement sur un petit échantillon** de recherches Next.js et automatisation ; elle n’est pas un audit SERP complet. Une page dédiée Next.js existe chez [Polara Studio](https://www.polarastudio.fr/techno/agence-next-js). Des acteurs affichent un positionnement spécialisé en automatisation et IA, dont [Codesia](https://codesia.fr/) et [GOLIUP](https://goliup.com/agence-automatisation). Cela suggère qu’une simple liste de technologies ne suffira pas : démonstrations, cas d’usage et limites feront la différence. Aucune affirmation de supériorité de CODE-V n’est tirée de cet échantillon.

Pour les autres groupes, concurrence qualitative à confirmer par des SERP France et locales : types de résultats, agences spécialisées, annuaires, documentation éditeur, packs locaux, vidéos et comparaison des contenus. « Prioritaire » ne signifie pas « facile à positionner ».

### Requêtes commerciales : un propriétaire par intention

| Service / destination | Requêtes et variantes proposées | Intention principale | Potentiel commercial qualitatif / priorité | Sujet éditorial connexe et maillage |
| --- | --- | --- | --- | --- |
| Home `/` | CODE-V, studio digital CODE-V ; agence digitale en contexte de marque | Navigationnel + découverte commerciale | Porte d’entrée de marque ; ne pas y concentrer tous les mots-clés | Approche globale → familles, Studio, cas |
| `/sites` / `website` | création site internet, site web professionnel, création site vitrine | Commercial | Demande liée à une offre historique ; prioritaire | Cahier des charges → Web, contenu, cas site |
| Refonte, page spécialisée possible | refonte site internet, refonte site sans perdre le SEO | Commercial | Besoin distinct, proche de l’offre ; recommandé avec matière | Checklist de migration → sites, SEO |
| `landing-page` | création landing page, landing page publicitaire, page de conversion | Commercial | Proche des campagnes ; prioriser avec Ads | Page dédiée ou page d’accueil ? → Ads, tracking |
| `web-application` | développement application web, application web sur mesure | Commercial | Projet à qualifier ; preuve technique nécessaire | Définir un MVP → outils métier, intégrations |
| `business-tool` | outil métier sur mesure, dashboard métier, outil interne entreprise | Commercial | Besoin précis et transversal | Tableau ou application métier ? → Airtable, reporting |
| Expertise Next.js | agence développement Next.js, développeur Next.js entreprise | Commercial + technique | Acteurs spécialisés observés ; optionnel sans preuve | Rendu serveur et SEO → app, cas technique |
| `/referencement` / `seo` | agence SEO, référencement naturel site internet | Commercial | Offre historique ; concurrence à auditer | Audit SEO utile → contenu, tracking, sites |
| `local-seo` | SEO local, référencement local, optimisation Google Business Profile | Commercial + local | Besoin concret pour entreprises de proximité | Fiche et site : rôles différents → sites, Local Services |
| `/ads` | agence publicité en ligne, gestion campagnes publicitaires | Commercial | Hub payant, ne concurrence pas la Home | Choisir un canal → Google Ads, Meta, tracking |
| `google-ads` | gestion Google Ads, agence Google Ads, campagne Google Ads entreprise | Commercial | Offre historique ; preuve et budget à qualifier | Ce que mesure une conversion → landing, tracking |
| `local-services` | Google Local Services, gestion annonces Local Services | Commercial + informationnel | Canal cité publiquement ; éligibilité par dossier | Ads ou Local Services ? → local SEO, Ads |
| `meta-ads` | publicité Facebook entreprise, agence Instagram Ads | Commercial | Offre historique maintenue | Création publicitaire vs publication → vidéo, contenu |
| `conversion-tracking` | tracking conversions, configuration GA4, mesure prospects site | Commercial + technique | Forte proximité d’un problème de décision | Pourquoi les visites ne sont pas des leads → Ads, reporting |
| `editorial-social` | stratégie réseaux sociaux entreprise, stratégie éditoriale | Commercial | À clarifier sur les canaux et volumes | Préparer un calendrier utile → contenus, vidéo |
| `content-production` | création contenu entreprise, rédaction site professionnel | Commercial | Complément concret de Web et SEO | Brief de contenu → sites, SEO, éditorial |
| `video-motion` | création vidéo motion design, vidéo présentation entreprise | Commercial | Moyens de production à valider | Vidéo courte : quel message ? → Meta, cas vidéo |
| `business-workflows` | automatisation entreprise, workflow automatisé, automatisation métier Make | Commercial | Acteurs spécialisés observés ; besoin très concret | Choisir la première tâche → API, Airtable |
| `airtable-workspace` | consultant Airtable, structuration base Airtable entreprise | Commercial + technique | Besoin précis ; prouver la modélisation | Tableur ou base structurée ? → workflow, outils |
| `api-integrations` | intégration API sur mesure, connecter logiciels entreprise | Commercial + technique | Demande spécifique, faisabilité importante | Décrire un flux entre logiciels → apps, workflows |
| `ai-agents` | agent IA entreprise, assistant IA métier, automatisation IA | Commercial | Concurrence spécialisée observée ; cadrage et contrôle différenciants | Agent ou workflow ? → API, cas de démo |
| `automated-reporting` | reporting automatisé, automatiser rapport activité | Commercial | Problème métier précis | Choisir ses indicateurs → tracking, outils métier |
| Parcours stratégie | stratégie digitale entreprise, agence digitale, audit stratégie digitale | Commercial exploratoire | Fort risque de généralité ; parcours d’abord, offre à valider | Faire l’état des lieux → quatre familles, mesure |

### Autres intentions à couvrir

| Classe | Exemples sans volume | Destination et règle |
| --- | --- | --- |
| Transactionnel | devis création site vitrine, devis refonte site, devis automatisation | Page prestation avec CTA contact ; pas de pages « devis » clonées |
| Informationnel | comment mesurer les demandes de devis, quelles tâches automatiser, préparer une refonte | Ressource répondant à la question avant de proposer un service |
| Navigationnel | CODE-V contact, CODE-V réalisations, CODE-V studio | Contact, Réalisations, Studio ; cohérence du nom et des profils |
| Local | agence web Perpignan, création site Perpignan, SEO local Pyrénées-Orientales | Région à confirmer commercialement ; contenu local réel sur sites/Studio d’abord |
| Métier / longue traîne | site vitrine artisan avec demande de devis, automatiser emails vers tableau, mesurer appels issus des campagnes | Page adaptée ou ressource spécifique, selon intention |
| Technique informationnel | Next.js et référencement, GA4 événements formulaire, gérer une erreur de workflow | Tutoriel ou analyse avec démo vérifiable |

Ne pas présenter CODE-V comme possédant une agence dans chaque ville. Le footer local mentionne Perpignan ; c’est un indice, pas une preuve de présence dans toutes les zones. L’ambition nationale peut être portée par les offres à distance sans créer des adresses fictives.

### Gestion de la cannibalisation

Un propriétaire par groupe principal ; variantes regroupées. `/referencement` couvre le SEO général, SEO local la proximité ; `/ads` couvre le choix d’un canal payant, Google Ads son pilotage spécifique. Les ressources expliquent, les prestations proposent un accompagnement. Revue des requêtes et pages dans Search Console après lancement ; fusionner des contenus redondants plutôt que créer un nouveau slug pour chaque synonyme.

## 7. Stratégie articles et modèle éditorial

### Ligne éditoriale

Montrer comment CODE-V comprend et résout des problèmes concrets : guides de décision, analyses documentées, tutoriels avec exemples reproductibles et retours d’expérience vérifiables. Ne pas publier des synthèses génériques en masse uniquement pour multiplier les requêtes. Google recommande du contenu utile à son audience, avec expertise et sources explicites. [Contenus utiles](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).

### Première série proposée, à rédiger progressivement

| Sujet / slug proposé sous `/ressources` | Format et intention | Service lié | Matière indispensable |
| --- | --- | --- | --- |
| `preparer-creation-site-vitrine` | Guide de décision commercial/informationnel | `website` | Checklist expliquée, contraintes et exemple de brief |
| `refonte-site-preserver-referencement` | Guide de migration | `website`, `seo` | Mapping démonstratif et protocole de vérification |
| `site-visites-peu-demandes` | Analyse de conversion | `landing-page`, `conversion-tracking` | Hypothèses distinctes, limites d’un diagnostic sans accès |
| `seo-local-site-fiche-etablissement` | Guide local | `local-seo` | Exemple de cohérence et sources éditeur actualisées |
| `google-ads-local-services-differences` | Comparatif | `google-ads`, `local-services` | Éligibilité à vérifier, différences, budgets non inventés |
| `mesurer-demandes-devis-ga4` | Tutoriel | `conversion-tracking` | Démo testée, événements, limites d’attribution |
| `premier-processus-a-automatiser` | Guide métier | `business-workflows` | Cartographie, contrôles, critères de choix |
| `centraliser-demandes-email-tableau` | Tutoriel de démo | `business-workflows`, `api-integrations` | Jeu de données fictif explicite et erreurs traitées |
| `tableur-airtable-outil-metier` | Comparatif de choix | `airtable-workspace`, `business-tool` | Limites concrètes et usages distincts |
| `agent-ia-workflow-quand-choisir` | Analyse | `ai-agents`, `business-workflows` | Cas d’usage, évaluations et validation humaine |
| `brief-video-motion-design` | Guide pratique | `video-motion` | Brief réel ou démonstratif clairement identifié |
| `strategie-digitale-indicateurs-utiles` | Guide de décision | Parcours stratégie, `automated-reporting` | Relier indicateur et décision, sans métrique de vanité |

Pas de cadence imposée avant d’avoir une capacité éditoriale. Prioriser quelques ressources liées aux offres de la première vague ; relire les contenus techniques à chaque évolution utile et les contenus de plateformes quand leurs règles changent.

### Contrat de données proposé

```ts
type ArticleKind = 'guide' | 'article' | 'analysis' | 'tutorial' | 'study' | 'comparison' | 'experience';
type SEOContent = {
  title: string; description: string; canonicalPath: string;
  ogImageId?: string; twitterCard: 'summary' | 'summary_large_image';
  indexable: boolean;
};
type Article = {
  id: string; title: string; slug: string; excerpt: string;
  authorId: string; reviewerId?: string;
  status: 'draft' | 'review' | 'published';
  datePublished: string | null; dateModified: string | null;
  coverAssetId: string | null;
  category: ServiceCategory; kind: ArticleKind; tags: readonly string[];
  relatedServices: readonly ServiceId[];
  relatedArticles: readonly string[];
  relatedVideos: readonly string[]; relatedCaseStudies: readonly string[];
  bodyFile: string; sources: readonly string[];
  seo: SEOContent;
  schemaType: 'Article' | 'BlogPosting';
};
```

Registres proposés : `src/data/resources.ts`, `authors.ts`, contenus versionnés Markdown/MDX côté serveur ; ajouter MDX seulement si nécessaire et après examen des outils existants. Un contenu draft conserve dates/covers absents, n’est ni rendu ni mis au sitemap. Publication exige auteur réel, texte relu, dates ISO valides, liens résolus et sources adaptées. Date de modification mise à jour pour une révision réelle, pas à chaque build.

Article/BlogPosting doivent décrire le contenu visible, avec auteur, dates et image réellement associés. Le choix du balisage dépend du format publié ; il ne garantit pas un affichage enrichi. [Documentation Article](https://developers.google.com/search/docs/appearance/structured-data/article).

## 8. Stratégie vidéos et motion

### Une vidéo par usage utile

| Usage | Placement proposé | Chargement | État |
| --- | --- | --- | --- |
| Motion explicatif du système CODE-V | Section système ou page famille | Poster, lecture à l’action | Recommandé si valeur supplémentaire au SVG |
| Démonstration d’application | Page application ou cas | Aperçu puis lecteur | Recommandé avec projet documenté |
| Démo d’un workflow | Ressource ou cas d’automatisation | Lecture explicite, texte associé | Recommandé ; données de démo identifiées |
| Présentation de service | Prestation vidéo ou automatisation | Chargement différé | Optionnel selon contenu disponible |
| Étude de cas vidéo | Cas et page vidéo dédiée | Lecteur dominant sur page dédiée | Optionnel, autorisations indispensables |

Le hero conserve le graphique signature ; aucune vidéo lourde autoplay en remplacement. Les courtes animations décoratives existantes restent CSS/SVG lorsque cela suffit.

### Contrat vidéo proposé

```ts
type Video = {
  id: string; slug: string; title: string; description: string;
  status: 'draft' | 'review' | 'published';
  thumbnailAssetId: string | null;
  durationSeconds: number | null;
  datePublished: string | null; dateModified: string | null;
  transcriptFile: string | null; textSummary: string;
  captions: readonly { language: string; assetId: string }[];
  relatedServices: readonly ServiceId[];
  relatedResources: readonly string[]; relatedCaseStudies: readonly string[];
  source: { kind: 'file'; assetId: string } | { kind: 'embed'; embedUrl: string };
  dedicatedPage: boolean;
  rightsStatus: 'pending' | 'approved';
  seo: SEOContent;
};
```

Une fiche publiée exige titre unique, description fidèle, vignette disponible, durée et date réelles, texte accessible et droits confirmés. Un simple motion décoratif n’exige pas une page `/videos/[slug]`.

Pour une page vidéo dédiée, le lecteur et son contexte doivent être centraux ; éviter une page créée uniquement pour obtenir VideoObject. Le texte reste lisible sans lecture. VideoObject reprend les métadonnées réelles, notamment `name`, `thumbnailUrl`, `uploadDate`, puis durée et contentUrl/embedUrl selon le média disponible. Ne pas inventer des statistiques de vues. [SEO vidéo](https://developers.google.com/search/docs/appearance/video), [VideoObject](https://developers.google.com/search/docs/appearance/structured-data/video).

### Performance et accessibilité vidéo

Poster dimensionné, lecteurs non essentiels initialisés près du viewport ou à l’action, `preload="none"` ou `metadata` selon le besoin, aucun iframe tiers lourd avant activation. Utiliser des formats web compatibles, variantes adaptées au débit et hébergement/CDN à choisir selon le corpus. Lecture, pause et son contrôlables ; sous-titres et transcription selon le contenu ; absence de son automatique. Les paramètres retenus seront mesurés sur mobile. [Chargement différé des vidéos](https://web.dev/articles/lazy-loading-video).

## 9. Réalisations et études de cas

Passer des placeholders à un dossier prouvé : contexte, problème, démarche, périmètre réel, technologies, livrables et limites. Une étude intéressante peut ne comporter aucun résultat chiffré si les sources manquent.

JRENOV, Peinture Catalane et Protection Nuisibles sont des pistes citées dans le brief initial, pas des dossiers de preuves disponibles dans le dépôt. Ne créer aucun contenu client ou témoignage sans informations et autorisation.

```ts
type CaseStudy = {
  id: string; slug: string; title: string;
  status: 'draft' | 'review' | 'published';
  clientName: string | null; sector: string;
  context: string; problem: string; strategy: string;
  deployedSolutions: readonly string[];
  technologies: readonly string[];
  visuals: readonly { assetId: string; alt: string; caption?: string }[];
  videoIds: readonly string[]; relatedServices: readonly ServiceId[];
  verifiedResults: readonly {
    label: string; value: string; period: string;
    sourceRef: string; methodology: string; limitations: string;
    approvedForPublication: boolean;
  }[];
  testimonial: { quote: string; author: string; role?: string; approvalRef: string } | null;
  publicationApprovalRef: string | null;
  datePublished: string | null; dateModified: string | null;
  seo: SEOContent;
};
```

Décliner `/realisations/[slug]` uniquement avec contenu réel. Remplacer à terme le type local de `CaseStudies.tsx` par une projection du registre partagé, sans maintenir deux listes clients. Une source de résultat peut être privée : référence interne vérifiable, autorisation publique et méthode lisible ; ne pas exposer les données sensibles ou captures brutes de comptes.

Ne pas ajouter AggregateRating, avis ou chiffres de performance inventés. Baliser une étude éditoriale comme Article uniquement si cela correspond à son contenu, avec BreadcrumbList pour son emplacement. Démonstrations internes clairement nommées « démonstration », séparées des références clients.

## 10. Maillage interne, local et secteurs

### Relations utiles

| Départ | Liens utiles | Motif |
| --- | --- | --- |
| Home | Familles, pages historiques, cas validés, Studio, Contact | Découverte et confiance |
| Famille | Prestations réellement pertinentes et un cas/guide représentatif | Aider au choix |
| Prestation | Cas associé, ressource utile, un ou deux compléments, contact | Montrer le périmètre et la suite |
| Ressource | Prestation qui répond au besoin, autre lecture réellement liée | Passer de compréhension à action |
| Cas | Services utilisés, technologies démontrées, vidéo associée | Vérifier le savoir-faire |
| Vidéo | Texte/transcription, page source et services associés | Conserver le contexte sans lecture |
| Studio | Méthode, compétences, cas, contact | Relier identité et preuves |

Ancres descriptives naturelles, liens HTML crawlables, pas de bloc systématique de tous les services sur chaque page. Les relations reposent sur les IDs et sont validées ; les drafts ne génèrent pas de liens morts. Breadcrumb visible cohérent avec l’arborescence, même pour une page historique `/sites` située sémantiquement dans Web. [BreadcrumbList](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb).

### Secteurs : intérêt à tester, pas un chantier automatique

| Segment | Angle spécifique potentiel | Preuve et matière exigées |
| --- | --- | --- |
| Artisans | Réalisations, devis, photos de chantier, zone d’intervention | Cas et parcours de demande documentés |
| Couvreurs | Qualification des demandes, contraintes de zone et disponibilité | Expertise spécifique, jamais une page artisan recopiée |
| Services à domicile | Gestion des appels/demandes et éligibilité des canaux | Processus réel et besoins distincts |
| Entreprises locales | Fiche, site, appels et suivi | Exemples locaux autorisés |
| PME | Outils métier, processus, reporting et accès | Démonstration opérationnelle |
| Indépendants | Offre claire, contenus, simplicité d’exploitation | Matière suffisante pour éviter un guide générique |

Commencer par intégrer les usages sectoriels dans les prestations et les cas. Une page secteur n’est créée que si elle apporte problèmes, processus, contraintes, exemples et réponses réellement spécifiques. Pas de combinaison automatique service × métier × ville. Les pages proches qui servent seulement à attirer une requête puis renvoient vers une même destination peuvent relever des doorway pages. [Règles antispam Google](https://developers.google.com/search/docs/essentials/spam-policies).

## 11. SEO technique cible

### Indispensable avant mise en production

1. Registre des routes canoniques réconcilié avec le domaine public ; protocole, hostname et trailing slash cohérents. Pas de canonical global vers la Home pour les pages secondaires.
2. Metadata uniques par page : title, description, canonical absolu, Open Graph correspondant au contenu, Twitter card et image disponible. `metadataBase` au domaine final. H1 unique et hiérarchie H2/H3 lisible ; pas de longueur de titre traitée comme garantie de classement.
3. Sitemap généré depuis les contenus publiés, indexables, canoniques, répondant 200. Dates de modification authentiques. Pas de drafts, alias redirigés, paramètres de contact ou endpoints API dans la liste. Un sitemap aide à découvrir les URLs mais ne garantit pas leur indexation. [Sitemaps Google](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [sitemap Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap).
4. Robots production explicite et sitemap déclaré. Ne pas bloquer les assets nécessaires au rendu. Préproduction protégée par authentification et stratégie noindex ; robots.txt n’est ni une protection des données ni un moyen fiable de retirer une URL de l’index. [Guide robots](https://developers.google.com/search/docs/crawling-indexing/robots/intro), [robots Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).
5. Vérifier statuts HTTP et contenu des 404 ; ni faux 200 sur pages vides ni redirections de masse. Tester mapping et liens après génération.
6. Contrôler HTML initial, contenus lisibles sans interactions, liens, dimensions des images et alternatives adaptées. Canonical et liens internes doivent raconter la même destination. [Canonicalisation](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

### Données structurées : uniquement sur des faits disponibles

| Type | Page / condition | Éléments à fournir | Priorité |
| --- | --- | --- | --- |
| Organization | Identité CODE-V validée | Nom, URL, logo publié, profils officiels vérifiés | Recommandé avant lancement |
| WebSite | Home | Nom et URL de référence | Recommandé |
| BreadcrumbList | Prestations, ressources, cas et vidéos | Chemin réel et visible | Recommandé |
| Article / BlogPosting | Ressource ou étude éditoriale publiée | Auteur, dates, titre, image cohérents | Recommandé dès les premiers articles |
| VideoObject | Vidéo visible et correctement décrite | Vignette, date, nom, source réelle | Recommandé quand une vidéo existe |
| Service | Offre validée réellement présentée | Service et fournisseur, sans prix fabriqué | Optionnel, sans promesse de rich result |
| LocalBusiness | Établissement réel et données validées | Informations publiques fiables | Optionnel selon identité réelle |

Ne pas inventer adresse, certifications, avis, tarifs ou profils. Organization doit refléter l’identité réelle ; WebSite le nom choisi. Ne pas ajouter SearchAction sans recherche interne fonctionnelle. Les données structurées doivent rester cohérentes avec le contenu visible et respecter les règles Google, sans garantir un affichage enrichi. [Organization](https://developers.google.com/search/docs/appearance/structured-data/organization), [nom du site](https://developers.google.com/search/docs/appearance/site-names), [règles de données structurées](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

Validation : Rich Results Test, inspection d’URL Search Console et vérification de l’HTML généré. JSON-LD sérialisé et échappé correctement. Aucun schéma sur un placeholder traité comme un projet ou une vidéo réels.

## 12. Performance et robustesse comme critères de livraison

### Mesures à établir

Mesurer en production-like sur mobile/desktop : Home, page historique, prestation détaillée, ressource, cas et vidéo lorsque présents. Conserver conditions de test, version, réseau, appareil, médiane des essais de laboratoire et données terrain disponibles. Un score Lighthouse local ne prouve pas les Core Web Vitals des visiteurs.

Objectifs terrain au 75e percentile, séparés mobile/desktop : **LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1**. Ce sont les seuils de bonne expérience documentés, pas les résultats actuels de CODE-V. [Web Vitals](https://web.dev/articles/vitals).

### Indispensable

- Garder pages, données et SEO côté serveur ; client seulement pour interactions. Éviter une frontière client englobant toute la Home ou le catalogue.
- Préserver le contenu textuel du hero comme candidat LCP rapide. Aucun embed vidéo/tiers lourd en chemin critique.
- Réserver les dimensions des médias et zones dynamiques ; images adaptées aux tailles d’affichage, formats pertinents et chargement différé hors écran. Remplacer les img nécessaires par une stratégie d’optimisation mesurée, avec domaines externes contrôlés pour Facebook.
- Examiner le chargement des polices : conserver Space Grotesk / DM Sans, limiter les graisses utiles, préférer `next/font` ou polices locales autorisées. Prévoir fallback et vérifier les changements de lignes. [Polices Next.js](https://nextjs.org/docs/app/getting-started/fonts).
- Mesurer l’ouverture du menu/chat et l’envoi des formulaires ; empêcher les animations de bloquer la saisie. Prévoir états de chargement/erreur et confirmation fiable.
- Limiter le coût tiers : pas de pixels, chat externe ou vidéo injectés sans besoin. Les mesures futures doivent respecter le cadre de consentement choisi, sans logique juridique inventée ici.
- Vérifier les flux API : validation, délais, erreurs, limites d’usage et protection contre l’abus avant production. Aucun secret client et aucun log exposant une credential.

### Recommandé

- Charger les parties coûteuses du chat à l’ouverture si la mesure montre un bénéfice, en conservant le déclenchement par CTA et l’accessibilité ; aucun changement de comportement maintenant.
- Cache et rendu robuste du feed Facebook ; ne pas bloquer le contenu essentiel sur ce service tiers.
- Mesurer avant de mutualiser les IntersectionObserver Reveal. Animations sur transform/opacity plutôt que recalculs de layout ; réduire les boucles quand hors viewport.
- Limiter flous, surfaces de backdrop-filter et glow ; tester sur appareils modestes. `prefers-reduced-motion` pour tout nouveau composant.
- Établir un budget d’assets et de JS à partir du build de référence, puis vérifier chaque ajout. Pas de nombre arbitraire présenté comme une mesure actuelle.
- Vérifier typecheck, tests de cohérence de données, build et pages rendues après chaque lot. Tests utiles : références, drafts non publiés, canonicals et mapping HTTP.

### Optionnel

Suivi terrain instrumenté, tableaux de performance et scénarios automatisés dans la CI après choix de l’hébergement. Ne pas installer une grande bibliothèque ou une plateforme de monitoring uniquement pour produire un score.

## 13. Design premium à développer

Conserver fond `#f7f9fc`, dark `#07111f` / `#0e1c2e`, bleu `#4f8cff` / `#356ee0`, cyan `#50e3c2`, bordure `#dfe7f1`, rayons autour de 24 px, Space Grotesk et DM Sans. Les éléments validés restent la référence, pas un point de départ à remplacer.

| Zone | Idée visuelle à développer | Preuve / contrainte | Priorité |
| --- | --- | --- | --- |
| Hero | Courbe signature comme système de leviers | Démonstrative, lisible, sans faux indicateurs | Indispensable : conserver |
| Système | Circulation visibilité → conversion → opérations → données | Flux vertical clair sur mobile | Recommandé : affiner |
| Prestation | Un visuel lié au livrable : page, parcours, flux, interface | Pas le même dashboard générique partout | Recommandé |
| Réalisation | Captures annotées et décisions expliquées | Visuels autorisés, données masquées si besoin | Recommandé prioritaire |
| Ressource | Mise en page de lecture, schémas précis et étapes testables | Contraste et confort mobile | Recommandé |
| Vidéo | Poster éditorial utile, transcription à proximité | Pas d’autoplay décoratif lourd | Recommandé selon médias |
| Studio | Identité humaine et détails de méthode | Personnes et parcours vérifiés | Recommandé |
| Contact | Orientation claire et une action principale | Ne pas dépendre du chatbot | Indispensable |

Micro-interactions discrètes, focus visible, cibles tactiles adaptées, clavier, réduction des mouvements, texte visible même si effet indisponible. Les transitions n’ont pas à être identiques partout. Pas de WebGL ou grille de cartes répétitive sans fonction concrète. La démonstration de compétence vient aussi des preuves, de la lisibilité et de la fiabilité.

## 14. Ordre de développement et décisions de validation

| Étape | Niveau | Travail après validation | Condition de sortie |
| --- | --- | --- | --- |
| 0 — Arbitrer | Indispensable | Slugs publics/local, offres à conserver, périmètres, stratégie payante ou non | Architecture et offre approuvées ; aucun tarif supposé |
| 1 — Sécuriser la continuité | Indispensable | Inventaire complet, mapping, pages publiques absentes et données légales à valider | Pas d’URL publique oubliée ; destinations testables |
| 2 — Source de vérité | Indispensable | Ajouter SEO/page registry au catalogue ; projections site/nav/chat préparées | IDs, intents, liens et statuts cohérents |
| 3 — Fondations techniques | Indispensable | Metadata, canonicals, robots, sitemap, médias/polices, contact fiable | Build, HTTP, rendu et budget de référence vérifiés |
| 4 — Quatre piliers lisibles | Indispensable | Enrichir historiques + hubs Contenu/Automatisation ; mise à jour de navigation | Offre complète et compréhensible sans nouvelles pages vides |
| 5 — Première vague commerciale | Recommandé | Pages prioritaires SEO local, Ads, tracking, workflows selon arbitrage | Périmètres et exemples propres à chaque page |
| 6 — Preuves et ressources | Recommandé | Premiers cas autorisés et guides liés ; templates réutilisables | Sources, droits, auteurs, dates et liens valides |
| 7 — Démonstrations vidéo | Recommandé / optionnel | Intégrations vidéo puis pages dédiées si justifiées | Accessibilité et performance vérifiées |
| 8 — Spécialisations | Optionnel | Autres services, Next.js, secteurs, angles locaux | Intention distincte, contenu spécifique et preuve réelle |
| 9 — Chatbot et mesure | Recommandé, passe séparée | Consommer les offres validées, améliorer orientation et suivi de conversion | Comportement approuvé, aucun catalogue draft vendu comme engagement |

L’architecture proposée permet un développement par vagues ; le nombre de pages final dépendra de l’offre et de la matière disponible. Ne pas lancer tous les slugs du diagramme en une fois.

### Décisions attendues pour valider cette proposition

1. Conserver les slugs publics `/sites`, `/ads`, `/mentions` comme références ou choisir explicitement une migration vers les variantes locales après étude de leurs acquis.
2. Confirmer maintenance, e-commerce, mobile natif, forfaits publics et rendez-vous/audit gratuit. Les anciennes annonces ne deviennent pas automatiquement la nouvelle offre.
3. Valider les périmètres des 18 prestations et le statut du diagnostic de stratégie ; confirmer publication/modération, tournage et supervision des automatismes.
4. Choisir les premières offres à détailler selon la priorité commerciale et les projets prouvables.
5. Identifier les personnes, clients et médias autorisés ; rassembler les sources de résultats et témoignages.
6. Fournir ensuite les données Search Console/crawl/analytics pour compléter l’inventaire et hiérarchiser les requêtes sans inventer de volumes.

Ce document laisse volontairement ces décisions ouvertes. L’étape suivante commence après validation de l’architecture, sans modification préalable du chatbot ni création massive de pages.
