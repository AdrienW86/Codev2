# Catalogue commercial CODE-V — version 2

Source de vérité : `src/data/services.ts`. **32 prestations, 9 familles, 18 identifiants et slugs historiques conservés, 14 nouvelles fiches.** Mise à jour du 3 octobre 2026 à partir du brief commercial utilisateur, des anciennes pages création de site/référencement/publicité et des mentions Home avant V2 et Home V2 déjà référencées dans le catalogue.

Le brief établit les capacités à couvrir. Le conditionnement des offres, les exclusions contractuelles, les tarifs, les engagements et les priorités restent proposés : toutes les fiches sont en statut `draft`, les modes de tarification en `pending-validation`. Aucun prix, volume SEO, résultat client fictif ou garantie de performance.

Cette mise à jour ne connecte pas le catalogue au site ni au chatbot. Aucune page, route, interface ou modification du design. Les anciennes descriptions de taxonomie à quatre familles dans d’autres documents ne sont plus la référence commerciale ; ce document et le fichier TypeScript font foi pour la taxonomie proposée.

## Taxonomie complète

**Origines** : historique = mentions des pages existantes ; Home V2 = offre déjà mentionnée dans la Home ; ajout = nouvelle fiche issue du brief. Toute fiche peut avoir un périmètre enrichi par le nouveau brief, sans transformer les détails en engagements validés.

### Web & Applications

| ID stable | Nom public | Origine de la fiche |
| --- | --- | --- |
| `website` | Création & refonte de sites professionnels | Historique |
| `landing-page` | Landing pages orientées conversion | Home V2 |
| `web-application` | Applications web sur mesure | Historique |
| `ecommerce` | Sites e-commerce & boutiques en ligne | Ajout |
| `mobile-app` | Applications mobiles & PWA | Ajout |
| `web-migration` | Migration de sites | Ajout |
| `ux-conversion` | Optimisation UX/UI & conversion | Ajout |

### Acquisition & Publicité

| ID stable | Nom public | Origine de la fiche |
| --- | --- | --- |
| `google-ads` | Campagnes Google Ads | Historique |
| `local-services` | Google Local Services | Home V2 |
| `meta-ads` | Publicité Facebook & Instagram | Historique |
| `conversion-tracking` | Tracking & mesure des conversions | Historique |

### SEO & Visibilité locale

| ID stable | Nom public | Origine de la fiche |
| --- | --- | --- |
| `seo` | Référencement naturel | Historique |
| `local-seo` | SEO local & Google Business Profile | Historique |
| `gbp-management` | Gestion Google Business Profile | Ajout |

### Réseaux sociaux & Community management

| ID stable | Nom public | Origine de la fiche |
| --- | --- | --- |
| `editorial-social` | Stratégie social media | Home V2 |
| `social-management` | Gestion des réseaux sociaux & community management | Ajout |

### Contenu & Création

| ID stable | Nom public | Origine de la fiche |
| --- | --- | --- |
| `content-production` | Création de contenus | Home V2 |
| `video-motion` | Vidéo & motion design | Home V2 |
| `editorial-strategy` | Stratégie éditoriale | Ajout |
| `digital-identity` | Identité graphique digitale | Ajout |

### Automatisation & IA

| ID stable | Nom public | Origine de la fiche |
| --- | --- | --- |
| `business-workflows` | Automatisation des processus métier | Home V2 |
| `airtable-workspace` | Structuration des données & Airtable | Home V2 |
| `api-integrations` | Intégrations API sur mesure | Home V2 |
| `ai-agents` | Agents IA & assistants métier | Home V2 |
| `automated-reporting` | Reporting automatisé | Home V2 |

### Logiciels & Solutions métier

| ID stable | Nom public | Origine de la fiche |
| --- | --- | --- |
| `business-tool` | Logiciels métier & interfaces sur mesure | Home V2 |

### Stratégie digitale

| ID stable | Nom public | Origine de la fiche |
| --- | --- | --- |
| `digital-strategy` | Stratégie digitale & feuille de route | Ajout |

### Maintenance & Accompagnement

| ID stable | Nom public | Origine de la fiche |
| --- | --- | --- |
| `website-care` | Maintenance de sites | Ajout |
| `hosting-supervision` | Hébergement & supervision | Ajout |
| `application-support` | Maintenance applicative & support SaaS | Ajout |
| `automation-supervision` | Supervision des automatisations & agents IA | Ajout |
| `digital-accompaniment` | Accompagnement digital continu | Ajout |

## Ce qui change

Les 18 offres existantes restent présentes avec leurs identifiants et slugs : aucune suppression ni fusion de leurs identités techniques. `website` est élargie aux sites professionnels/corporate/institutionnels/catalogues ; `business-tool` devient « Logiciels métier & interfaces sur mesure » dans Logiciels & Solutions métier ; `editorial-social` devient « Stratégie social media » dans le pôle social. SEO et SEO local rejoignent leur famille distincte. Les variantes demandées sont intégrées aux périmètres et descriptions.

Les 14 nouvelles fiches sont : `ecommerce`, `mobile-app`, `web-migration`, `ux-conversion`, `gbp-management`, `social-management`, `editorial-strategy`, `digital-identity`, `digital-strategy`, `website-care`, `hosting-supervision`, `application-support`, `automation-supervision`, `digital-accompaniment`.

La fiche `digital-strategy` formalise l’offre diagnostic/feuille de route/priorisation/coordination. `solutionPaths` conserve le parcours existant et référence cette fiche : ce parcours ne constitue pas une seconde prestation facturable.

## Recouvrements et regroupements

| Recouvrement détecté | Offre propriétaire et frontière |
| --- | --- |
| Vitrine, corporate, institutionnel, professionnel, catalogue, refonte | Variantes de website ; pas six offres ni six pages. Une boutique transactionnelle relève d’ecommerce. |
| Landing publicitaire et tunnel | landing-page conçoit les pages/étapes ; ux-conversion optimise un parcours existant ; google-ads/meta-ads gèrent la diffusion. |
| Next.js, front/back, SaaS, plateforme, extranet | Variantes de web-application ; la technologie seule ne devient pas une prestation dupliquée. |
| Application web et logiciel métier | web-application cible un produit/service numérique ; business-tool cible les opérations, CRM, ERP léger, facturation, planning, documents et back-office. Un portail se classe selon son objectif principal, avec une seule fiche de devis. |
| Community management et gestion des réseaux sociaux | Une seule offre social-management ; animation, modération et réponses aux messages sont des variantes avec mandat explicite. |
| Stratégie social media et stratégie éditoriale | editorial-social définit la stratégie des comptes sociaux ; editorial-strategy coordonne les contenus des différents supports. Aucun livrable facturé deux fois. |
| Production de contenu et production sociale | content-production possède le copywriting et les visuels sociaux ; vidéo/motion relève de video-motion. social-management possède la publication et les interactions, avec production incluse uniquement selon le volume convenu. |
| Reels, shorts, stories, animation de logo, vidéo publicitaire | Formats/variantes de video-motion ; pas une offre ou une page par format. |
| SEO local et gestion GBP | local-seo : diagnostic et optimisation initiale, pages locales, catégories/services/zones et stratégie d’avis ; gbp-management : exploitation régulière, actualités, photos, publications et réponses aux avis. |
| Acquisition payante, Search, PMax, Facebook, Instagram, retargeting | Google Ads et Meta Ads sont les offres propriétaires par plateforme ; formats et objectifs restent des variantes. Acquisition multicanal relève de digital-strategy. |
| Automatisation métier et workflows | business-workflows est l’offre principale ; Make, marketing, commercial, CRM, contenu, publication et SAV sont des variantes. |
| API, Airtable, dashboards et reporting | api-integrations connecte, airtable-workspace structure, automated-reporting consolide/diffuse ; business-tool développe une interface métier. Pas quatre copies d’une même réalisation. |
| Reporting Ads/SEO/social et reporting automatisé | Analyse métier incluse selon le mandat de suivi ; automated-reporting construit le système automatisé de collecte et diffusion. |
| Accompagnement global et exécution SEO/Ads/social | digital-accompaniment coordonne et suit ; les travaux des pôles sont inclus uniquement s’ils sont explicitement contractualisés. |
| Maintenance, hébergement et supervision IA | website-care traite le site, hosting-supervision l’infrastructure, application-support le logiciel, automation-supervision les workflows/agents. Les sauvegardes et responsabilités communes se définissent une seule fois au contrat. |

Il s’agit de regroupements sémantiques de variantes, pas de suppressions d’anciennes prestations. Aucune fiche autonome « community management », « Facebook Ads », « création de contenu social », « workflows métier », « CRM » ou « Next.js » ne double son offre principale.

## Pages dédiées et regroupées

Les chemins ci-dessous sont des **propositions éditoriales**, pas des routes existantes ni des liens publiables. `slug` est l’identifiant catalogue ; `existingPage` indique seulement une destination existante pertinente, qui peut couvrir plusieurs offres. La création ultérieure devra décider conservation/renommage/redirections des trois routes historiques, sans publier simultanément des pages concurrentes.

### Pages dédiées recommandées (17)

| Prestation | Proposition | Mot-clé principal |
| --- | --- | --- |
| Création & refonte de sites professionnels | `/services/creation-refonte-site` | site vitrine professionnel |
| Landing pages orientées conversion | `/services/landing-pages` | création landing page |
| Applications web sur mesure | `/services/applications-web` | développement application web |
| Logiciels métier & interfaces sur mesure | `/services/outils-metier-dashboards` | logiciel métier sur mesure |
| Référencement naturel | `/services/referencement-naturel` | référencement naturel |
| SEO local & Google Business Profile | `/services/seo-local-google-business-profile` | référencement local |
| Campagnes Google Ads | `/services/google-ads` | gestion Google Ads |
| Publicité Facebook & Instagram | `/services/facebook-instagram-ads` | agence Meta Ads |
| Création de contenus | `/services/creation-contenus` | création contenu digital |
| Vidéo & motion design | `/services/video-motion-design` | motion design vidéo entreprise |
| Automatisation des processus métier | `/services/automatisation-processus` | automatisation métier Make |
| Agents IA & assistants métier | `/services/agents-ia-assistants-metier` | agents IA entreprise |
| Sites e-commerce & boutiques en ligne | `/services/ecommerce` | création site e-commerce |
| Gestion des réseaux sociaux & community management | `/services/social-management` | gestion réseaux sociaux |
| Stratégie digitale & feuille de route | `/services/digital-strategy` | stratégie digitale entreprise |
| Maintenance de sites | `/services/website-care` | maintenance site web |
| Accompagnement digital continu | `/services/digital-accompaniment` | accompagnement digital mensuel |

### Prestations regroupées en sections (14)

| Prestation | Proposition | Mot-clé principal |
| --- | --- | --- |
| Google Local Services | Section de `google-ads` | Google Local Services |
| Tracking & mesure des conversions | Section de `google-ads` | tracking conversions GA4 |
| Stratégie social media | Section de `social-management` | stratégie social media |
| Structuration des données & Airtable | Section de `business-workflows` | structuration Airtable |
| Intégrations API sur mesure | Section de `business-workflows` | intégration API outils |
| Reporting automatisé | Section de `business-workflows` | reporting automatis? |
| Migration de sites | Section de `website` | migration site web |
| Optimisation UX/UI & conversion | Section de `landing-page` | optimisation UX conversion |
| Gestion Google Business Profile | Section de `local-seo` | gestion Google Business Profile |
| Stratégie éditoriale | Section de `content-production` | stratégie éditoriale |
| Identité graphique digitale | Section de `content-production` | identité graphique digitale |
| Hébergement & supervision | Section de `website-care` | hébergement supervision site |
| Maintenance applicative & support SaaS | Section de `business-tool` | maintenance applicative |
| Supervision des automatisations & agents IA | Section de `business-workflows` | maintenance automatisations IA |

### Page conditionnelle (1)

| Prestation | Proposition | Mot-clé principal |
| --- | --- | --- |
| Applications mobiles & PWA | Section de `web-application` ; page mobile seulement si justifiée | développement application mobile |

Les mots-clés sont des hypothèses qualitatives, sans volumes ni étude de concurrence revendiquée. Chaque fiche contient mots-clés secondaires, intentions commerciales/informationnelles, contenus de soutien, idées d’articles, vidéos, études de cas à documenter et liens vers des identifiants de prestations. Les idées de cas ne sont ni des références réalisées ni des résultats prouvés. Les contenus proposés sont des amorces de brief à préciser avant production, pas des articles déjà publiés.

## Récurrence et tarification

Sept prestations ont la récurrence comme cœur d’offre : gbp-management, social-management, website-care, hosting-supervision, application-support, automation-supervision et digital-accompaniment. Les autres peuvent recevoir des évolutions ou un suivi optionnel ; cela ne transforme pas automatiquement un projet en abonnement.

SEO, SEO local, Google Ads, Local Services, Meta Ads et stratégie social media proposent déjà une gestion récurrente. Les workflows, Airtable, intégrations, agents IA et reporting peuvent aussi nécessiter un entretien récurrent à distinguer de la mise en place. La récurrence de suivi ne doit pas doubler les contrats des prestations de maintenance.

- `fixed` : prestation à prix fixe **à chiffrer**, sans montant inscrit au catalogue.
- `quote` : devis adapté au périmètre ; peut aussi servir à chiffrer un contrat récurrent.
- `recurring` : suivi régulier ; formes proposées forfait mensuel ou abonnement.
- `time-materials` : régie, charge et modalités à définir.

`pricing.proposedModes` indique les modes proposés, `recurrence.billingForms` les formes de suivi envisageables. Licences, hébergement tiers, consommation IA/Make/Airtable, budgets médias et coûts de production externes restent à identifier au devis. Aucun prix validé.

## Modèle de données réutilisable

Le fichier n’a aucun import à l’exécution. Le type `ChatIntent` conserve les quatre intents existants. La famille détermine l’intent par défaut : web → website ; acquisition et SEO → acquisition ; automatisation et logiciel métier → automation ; social, contenu, stratégie et maintenance → strategy. Cette association est une métadonnée ; le chatbot reste inchangé.

Une fiche `Service` contient identité, famille, résumé, description, problème, cibles, cas d’usage, sous-services, inclusions, exclusions, objectifs, prérequis, CTA de contact existant, intent, questions de qualification, compléments, provenance, statut et questions commerciales. Les champs SEO, récurrence et priorité commerciale complètent chaque fiche via un registre exhaustif typé `Record<ServiceId, ServiceProfile>`. Les priorités high/medium sont proposées pour ordonner la présentation, sans prétendre représenter les ventes ou marges réelles.

Les helpers `getServiceById`, `getServiceBySlug` et `getServicesByCategory` restent disponibles. Les relations utilisent les ID stables, pas des liens vers des pages inexistantes. Le CTA reste `/contact?service=<id>` : sa destination existe ; aucune nouvelle logique de formulaire n’est ajoutée.

## Arbitrages commerciaux encore ouverts

1. Livrables, quantités, révisions et conditions de réception pour chaque offre ; distinguer cadrage commercial gratuit et diagnostic/atelier facturé.
2. Niveau réellement livré en mobile natif/PWA, e-commerce, ERP léger, SaaS, accessibilité et performance ; préciser technologies, dépendances et compétences mobilisées.
3. Réseaux sociaux : plateformes, fréquence, formats produits, tournages, temps de modération, traitement des messages et gestion de crise.
4. Google Business Profile : établissements, publications/photos, validation des réponses, séparation optimisation initiale/suivi. Pas de faux avis ni promesse de suppression d’avis.
5. SEO/Ads : cadence, indicateurs, budgets, création, tests, données accessibles, attribution et responsabilité des actions. PMax, Local Services et canaux sont conditionnés au contexte, sans promesse d’éligibilité ou de performance.
6. Maintenance/hébergement : reprise de solutions tierces, mises à jour, sauvegardes, restauration, sécurité, alertes, horaires, délais d’intervention et responsabilité infrastructure/application. Pas de disponibilité ou de sécurité absolue.
7. IA/automatisation : contrôle humain, données autorisées, jeux d’évaluation, consommations, seuils d’alerte, responsabilités des incidents et évolution des API.
8. Logiciels : droits sur code et données, propriété intellectuelle, documentation, migration, formation, support, licences et compatibilité facturation à cadrer.
9. Accompagnement : qui coordonne, quelles exécutions incluses, durée d’engagement, résiliation, régie et fréquence du reporting ; éviter de facturer deux fois un suivi.
10. Valider les priorités commerciales, modalités fixes/récurrentes/régie, prix et calendrier des futures pages. Les mots-clés et contenus nécessitent un travail éditorial ultérieur avant publication.

## Vérifications

- `npx.cmd tsc --noEmit --incremental false` : vérification de types à exécuter après toute modification.
- `node.exe tests/service-catalog.cjs` : 32 fiches, 9 familles, conservation des 18 ID/slugs, champs complets, relations et regroupements valides, intentions et modes autorisés, destinations existantes, absence de prix/volumes inventés et de caractères français altérés.

Fichiers concernés uniquement : `src/data/services.ts`, `docs/service-catalog.md`, `tests/service-catalog.cjs`.
