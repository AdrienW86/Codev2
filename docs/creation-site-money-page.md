# Création de site — vague A, page commerciale

## Audit avant modification

La route `/creation-site` utilisait PageHero, un H1 « Votre site peut faire bien plus », les sections « Attirer. Convaincre. Convertir. », trois avantages génériques et un CTA final. Title : « Création de sites web — Codev ». Description : « Des sites web modernes, rapides et pensés pour transformer vos visiteurs en clients. » Pas de canonical propre dans le module.

À conserver : URL, identité CODE-V, ton direct, importance du parcours et du contact, fil d’Ariane. Faiblesses : proposition abstraite, périmètre non expliqué, absence de réalisations, prérequis, FAQ et distinction création/refonte ; CTA génériques sans service. Les avantages visuels et techniques recoupaient la présentation large de Web & Applications.

## Positionnement retenu

`/creation-site` devient la destination commerciale pour site professionnel, vitrine et refonte. `/solutions/web-applications` conserve la vision large des sites, e-commerce, applications et outils métier ; `/solutions` oriente entre les familles ; `/ressources` héberge les guides. Aucun doublon de money page n’est créé. Ce partage éditorial limite les chevauchements évidents, sans affirmer une absence de cannibalisation mesurée dans Google.

- Title : **Création de site internet professionnel & refonte | CODE-V**.
- Meta description : **CODE-V conçoit et refond des sites professionnels : contenus clairs, parcours de contact, expérience mobile et bases SEO. Découvrez nos réalisations et parlons de votre projet.**
- H1 : **Un site professionnel. Un chemin vers vous.**
- Canonical : `https://www.code-v.fr/creation-site`.

Structure : hero avec proposition et preuve, problèmes fréquents, formats de sites, approche message/UX/SEO/contact, réalisations, méthode, périmètre et technologies, FAQ et CTA final. Aucune promesse de leads ou de classement. Les bases SEO du site sont distinguées d’un accompagnement SEO continu, la présentation d’un catalogue d’une boutique avec paiement.

## Preuves, conversion et maillage

Trois projets publiés de `projects.ts` : Château de Projan dans le hero, Peinture Occitane et Express Nuisibles dans une composition asymétrique. Captures existantes, alt et dimensions du registre, sans nouvelle collecte ni faux résultat. Aucun historique de refonte client n’est attribué à ces sites.

CTA principal et contextuel : `/contact?service=website`. Après les preuves : `/realisations` et ancres réelles `#selection`, `#peinture-occitane`, `#express-nuisibles`. Qualification : ChatTrigger existant, intent `website`.

Autres liens : `/solutions/web-applications`, `/referencement`, `/ressources`. `getResourcesByService("website")` prépare un bloc de guides qui n’apparaît qu’avec de vraies ressources publiées. Les drafts prix/préparation de refonte/comparaison de formats ne créent aucun lien cassé.

Breadcrumb Accueil › Création de site et BreadcrumbList conservés. Service minimal ajouté : prestation décrite, URL et marque CODE-V comme provider, sans prix, zone non validée, Review ou AggregateRating. Référence : [Schema.org Service](https://schema.org/Service). Pas de FAQPage ni de faux témoignages.

## Mise en œuvre et validation

Fichiers : `src/app/creation-site/page.tsx`, `page.module.css` et ce compte rendu. Aucun changement de Home, autres pages commerciales, catalogue ou fonctionnement du chatbot.

Page serveur, Reveal et ChatTrigger réutilisés. Une image de hero optimisée en priorité car visible au premier écran ; les deux autres captures sont différées. Dimensions explicites et tailles de rendu adaptées, aucun nouveau composant client ni dépendance. Animations et inclinaison désactivées avec prefers-reduced-motion.

TypeScript et build isolé de production réussis. Le contrôle navigateur couvre 320/375/768/1024/1440, décodage des captures, FAQ au clavier, focus, ouverture de l’assistant web, reduced motion, canonical, BreadcrumbList/Service et destinations internes. Les constats chiffrés du navigateur sont ajoutés après exécution ; ils ne constituent pas des performances clients.

Résultats : aucune erreur JavaScript ou débordement horizontal aux cinq largeurs, images décodées, FAQ native utilisable au clavier, intent web confirmé, reduced motion respecté, deux schémas cohérents et 22 destinations internes/ancres vérifiées sans lien cassé. Aucun lien de ressource draft. CLS local Chromium au premier chargement ≈ 0,0121 ; ce n’est pas une mesure terrain. Build : page statique, 2,28 ko de code de route, environ 111 ko de JS initial partagé inclus.
