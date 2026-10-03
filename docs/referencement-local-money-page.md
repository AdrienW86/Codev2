# Référencement local — page commerciale CODE-V

## Positionnement

Route implémentée : `/referencement-local`. Elle remplace, dans le plan de création, l’ancienne proposition `/services/seo-local-google-business-profile` ; aucune seconde page ciblant cette intention n’est créée.

`/referencement` conserve le SEO organique général : architecture, technique, contenus et maillage du site. La page locale couvre la présence géographique, Google Business Profile, Maps, les informations de l’activité et la relation avec le site. Pas de pages ville produites en série, de classement garanti ou d’attribution de résultats clients.

- Title : **Référencement local & Google Business Profile | CODE-V**.
- Description : **CODE-V accompagne votre visibilité locale : fiche Google Business Profile, cohérence des informations, site et suivi. Parlons de votre activité et de votre zone.**
- H1 : **Votre activité. Au bon endroit.**
- Canonical et Open Graph : `https://www.code-v.fr/referencement-local`.

## Composition et conversion

Hero avec réseau géographique stylisé, problème de présence, Google Business Profile, articulation site/zone, avis et contenus, suivi, trois réalisations web, sept questions commerciales, CTA final. Le schéma ne reproduit pas une interface Google et ne représente aucun classement ; sur mobile la relation fiche/site/zone devient verticale. Reveal existant, sans animation permanente ni nouvelle dépendance.

Les CTA « Parler de votre visibilité locale », « Faire le point sur votre fiche Google », « Travailler votre présence locale » et « Parler de votre projet » pointent tous vers `/contact?service=seo`. Aucun nouvel intent chatbot.

Les trois captures existantes de `projects.ts` sont Peinture Occitane, Express Nuisibles et Narbonne Toiture. Elles illustrent des sites réalisés et des métiers de proximité. Aucun résultat de référencement local ni optimisation de leur fiche n’est attribué. Les limitations de preuve restent dans cette documentation, jamais dans le texte marketing.

Maillage sortant : `/referencement`, `/creation-site`, `/realisations`, `/ressources` et contact qualifié. Maillage entrant ajouté depuis le paragraphe local de `/referencement` et la famille SEO de `/solutions`. Header, footer et autres familles non modifiés.

## Fondements factuels

Vérification des recommandations officielles : [classement local Google](https://support.google.com/business/answer/7091?hl=fr), [représentation des établissements](https://support.google.com/business/answer/3038177?hl=fr). La page distingue pertinence, distance et notoriété, informations réelles et zone desservie. Les publications sont présentées comme un moyen d’informer, sans leur attribuer un effet garanti sur le classement. L’éligibilité et les accès sont examinés avant intervention.

Les avis sont traités comme des retours authentiques : pas de contrepartie ni sélection des seuls clients satisfaits. Aucun exemple d’avis inventé. La création de pages locales repose sur une zone réelle et un contenu utile distinct.

## QA visuelle et validation

TypeScript et build isolé de production réussis. Page statique, 1,16 ko de code de route, environ 110 ko de JS initial socle partagé inclus. Aucun composant client ajouté ; seul Reveal existant est réutilisé. Les captures utilisent Next Image avec dimensions, tailles responsives et chargement différé.

Chromium de production local : 320, 375, 768, 1024 et 1440 px sans overflow ; captures desktop/mobile inspectées. Trois images décodées. FAQ ouverte et fermée au clavier, parcours Tab et focus visibles contrôlés. Reduced motion désactive les animations de la page. Aucune erreur JavaScript observée.

H1 unique, canonical et deux JSON-LD contrôlés : Service minimal (provider CODE-V, sans prix ni avis) et BreadcrumbList **Accueil › Référencement local**, conforme au breadcrumb visible. 18 destinations internes distinctes de la page et de sa navigation répondent sans erreur, ancres vérifiées. Les liens entrants depuis SEO et Solutions et leur absence d’overflow aux cinq largeurs sont également contrôlés.

CLS initial local ≈ 0,00064 : mesure de laboratoire, pas une mesure terrain. L’indexation et les performances en recherche ne seront observables qu’après déploiement et collecte effective.

Fichiers : `src/app/referencement-local/page.tsx`, `page.module.css`, `src/data/breadcrumbs.ts`, `src/app/referencement/page.tsx`, `src/app/solutions/page.tsx` et ce document. Aucun contenu publié sur un service externe par cette étape.
