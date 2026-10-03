# Matrice SEO / conversion prioritaire CODE-V

Document de travail — 3 octobre 2026. **Aucune page, route, redirection ou publication modifiée à cette étape.**

## Décision et méthode

Retenir **20 opportunités : 14 money pages et 6 supporting contents**. Une money page expose une prestation et génère directement une demande ; un support répond à une question précise et conduit vers la prestation pertinente. Ne pas créer deux pages commerciales essentiellement identiques.

Priorités qualitatives fondées sur l’intention, la proximité de l’offre, la conversion possible, la couverture actuelle et les preuves disponibles. Aucun volume, classement, difficulté SEO ou nombre de leads inventé. Les requêtes sont des hypothèses de ciblage : ni Search Console ni étude exhaustive des SERP n’ont été fournis. Vérifier les résultats de recherche et les données disponibles avant chaque brief. Le catalogue comporte des périmètres commerciaux à confirmer au devis.

Sources internes : `src/data/services.ts`, `projects.ts`, `resources.ts`, `navigation.ts`, les routes analysées et `docs/seo-content-system.md`. Les URL futures sont **des propositions non publiées**. Les cheminements de conversion décrits ci-dessous sont des parcours recommandés, pas des comportements mesurés.

## Les vingt pages, dans l’ordre recommandé

| Rang | Vague | Opportunité | Type | URL cible | État |
| --- | --- | --- | --- | --- | --- |
| 01 | A | Création, site vitrine et refonte commerciale | Money | `/creation-site` | Renforcer |
| 02 | A | Référencement naturel | Money | `/referencement` | Renforcer |
| 03 | A | SEO local et optimisation initiale GBP | Money | `/services/seo-local-google-business-profile` | Créer |
| 04 | A | Gestion Google Ads | Money | `/services/google-ads` | Créer |
| 05 | A | Automatisation et IA pour entreprise | Money | `/solutions/automatisation-ia` | Renforcer |
| 06 | A | Maintenance de site | Money | `/services/website-care` | Créer |
| 07 | A | Stratégie digitale | Money | `/services/digital-strategy` | Créer |
| 08 | A | Motion design et vidéo | Money | `/services/video-motion-design` | Créer |
| 09 | B | Comprendre le coût d’un site | Support | `/ressources/prix-site-internet` | Créer un guide |
| 10 | B | Préparer une refonte | Support | `/ressources/preparer-refonte-site` | Brief draft, texte à créer |
| 11 | B | Site web ou fiche Google | Support | `/ressources/site-ou-fiche-google` | Brief draft, texte à créer |
| 12 | B | Choisir une première automatisation | Support | `/ressources/choisir-premiere-automatisation` | Brief draft, texte à créer |
| 13 | B | Entretenir Google Business Profile | Support | `/ressources/entretenir-fiche-google-business-profile` | Créer un guide |
| 14 | B | Gestion des réseaux sociaux | Money | `/services/social-management` | Créer |
| 15 | C | Création e-commerce | Money | `/services/ecommerce` | Créer après cadrage |
| 16 | C | Développement d’application web | Money | `/services/applications-web` | Créer après cadrage |
| 17 | C | Agent IA et assistant métier | Money | `/services/agents-ia-assistants-metier` | Créer si intention distincte |
| 18 | C | Logiciel métier et CRM sur mesure | Money | `/services/outils-metier-dashboards` | Créer après cadrage |
| 19 | C | Publicité Meta | Money | `/services/facebook-instagram-ads` | Créer |
| 20 | C | Google Ads ou Local Services Ads | Support | `/ressources/google-ads-ou-local-services` | Créer un comparatif conditionnel |

Vague A : 8 money pages. Vague B : 5 supports et 1 money page. Vague C : 5 money pages et 1 support. **3 pages existantes à renforcer et 17 pages/contenus à créer**, dont trois possèdent seulement un brief draft. Les travaux sur les hubs et la conversion accompagnent la matrice sans ajouter d’opportunités au décompte.

Les vingt axes demandés sont couverts sans vingt money pages concurrentes : création/vitrine/refonte dans 01, préparation de refonte en 10 ; automatisation/IA entreprise en 05 ; logiciel/CRM en 18 ; GBP en 03 et 13 ; Local Services en 04 et 20. Ces deux derniers regroupements respectent `services.ts`, qui rattache `gbp-management` à `local-seo` et `local-services` à `google-ads`.

## Preuves associables et limites

| Code | ID dans projects.ts | Destination disponible | Usage autorisé dans la matrice |
| --- | --- | --- | --- |
| P1 | `chateau-de-projan` | `/realisations#selection` | Site hôtelier et captures desktop/mobile ; pas de moteur de réservation ou résultat déduit |
| P2 | `le-parc-de-gouts` | `/realisations#le-parc-de-gouts` | Présentation d’hébergement et capture réelle |
| P3 | `buffalo-snack` | `/realisations#buffalo-snack` | Carte par catégories, contact et capture ; pas de paiement e-commerce prouvé |
| P4 | `antiquite-canetoise` | `/realisations#antiquite-canetoise` | Catalogue visible et capture ; pas de checkout, ventes ou intégrations internes démontrés |
| P5 | `peinture-occitane` | `/realisations#peinture-occitane` | Site d’artisan et capture ; pas de campagne ou classement Google documenté |
| P6 | `express-nuisibles` | `/realisations#express-nuisibles` | Site de service local, formulaire visible, interface d’estimation ; pas de leads ou Ads attribués |
| P7 | `narbonne-toiture` | `/realisations#narbonne-toiture` | Site d’artisan, contenus et capture ; comparateur illustratif, pas de résultat SEO prouvé |
| P8 | `code-v-site` | `/realisations#laboratoire` | Projet interne, code et médias ; interfaces illustratives distinctes d’applications clients |
| P9 | `code-v-motion` | `/realisations#laboratoire` | Film interne réel et poster ; compteurs de démonstration, pas de performance client |

Tous les `verifiedResults` sont vides et les `caseStudyReady` faux. Aucune preuve documentée de performance SEO/Ads, de boutique avec paiement, de CRM client, d’agent déployé ou de maintenance récurrente. Une référence de secteur ne prouve pas une prestation non documentée. Quand une preuve directe manque, le signaler, présenter une méthode et des limites vérifiables, puis réunir un cas réel ; ne pas fabriquer un cas pour publier.

Les CTA contact utilisent des IDs de services existants. Aucun audit/estimation gratuit ni tarif promis sans validation. Les ressources et pages futures citées en maillage ne deviennent des liens qu’après publication. Les intents chatbot restent `website`, `acquisition`, `automation`, `strategy`.

## Vague A — destinations commerciales principales

### 01. Création, vitrine et refonte

- **Requête principale :** création site internet entreprise. **Variantes :** site vitrine professionnel, agence création site web, refonte site internet entreprise.
- **Intention / funnel / type :** commercial / consideration → decision / money page.
- **URL / état :** `/creation-site`, à renforcer. Ne pas dupliquer avec `/services/creation-refonte-site` ou une page vitrine. Sections distinctes nouveau site/refonte, sans attribuer aux clients un historique de refonte non documenté.
- **Services / preuve :** `website`, `web-migration`, `ux-conversion` selon périmètre ; P1/P2/P3/P5, sites réels sans performance promise.
- **CTA principal :** « Parler de votre site » → `/contact?service=website`. **Secondaire :** « Voir des sites réalisés » → `/realisations` ; chatbot `website` possible.
- **Ressources / maillage :** 09 prix, 10 préparation, 11 site/GBP ; `/solutions/web-applications`, P1/P3, 06 maintenance, `/contact`.
- **Priorité / parcours :** A1, offre centrale et nombreuses captures → besoin nouveau site/refonte → réalisation contextualisée → demande cadrée.

### 02. Référencement naturel

- **Requête :** accompagnement référencement naturel entreprise. **Variantes :** agence SEO, prestation SEO site internet, audit SEO entreprise.
- **Intention / funnel / type :** commercial / consideration → decision / money.
- **URL / état :** `/referencement`, enrichir périmètre, prérequis et méthode. Pas de doublon `/services/referencement-naturel`.
- **Service / preuve :** `seo` ; aucune performance SEO client documentée. P7 illustre un site avec contenus, pas une mission ou un classement SEO.
- **CTA principal :** « Faire le point sur mon référencement » → `/contact?service=seo`. **Secondaire :** « Explorer la visibilité locale » → 03 après publication.
- **Ressources / maillage :** 11 ; `/solutions`, 03, `/ressources`, `/contact`. Aucun guide SEO supplémentaire forcé parmi les vingt.
- **Priorité / parcours :** A2, intention directe et couverture sommaire → périmètre/méthode → preuves disponibles et limites explicites → demande de diagnostic.

### 03. SEO local et GBP initial

- **Requête :** prestation SEO local entreprise. **Variantes :** référencement local artisan, optimisation fiche Google Business Profile, visibilité Google Maps entreprise.
- **Intention / funnel / type :** commercial / consideration → decision / money.
- **URL / état :** `/services/seo-local-google-business-profile`, créer sans pages ville à ce stade.
- **Services / preuve :** `local-seo`, `gbp-management` dans une section de suivi récurrent ; P5/P6/P7 illustrent des activités locales, sans fiche gérée ou visibilité obtenue documentée.
- **CTA principal :** « Étudier ma visibilité locale » → `/contact?service=local-seo`. **Secondaire :** « Comprendre le rôle du site et de la fiche » → 11 publiée.
- **Ressources / maillage :** 11/13 ; `/referencement`, `/solutions`, P6/P7 contextualisés, `/contact`.
- **Priorité / parcours :** A3, proximité des secteurs représentés → diagnostic site/fiche/cohérence → exemples web sans fausse attribution → qualification activité/zone/existant.

### 04. Google Ads

- **Requête :** gestion campagne Google Ads entreprise. **Variantes :** agence Google Ads, accompagnement Google Ads, publicité Google artisan.
- **Intention / funnel / type :** commercial / consideration → decision / money.
- **URL / état :** `/services/google-ads`, créer ; `/publicite` conserve le panorama des canaux.
- **Services / preuve :** `google-ads`, `conversion-tracking`, `local-services` après contrôle d’éligibilité. Aucune campagne réelle documentée ; P6 peut montrer une destination web, jamais des leads générés.
- **CTA principal :** « Cadrer mes campagnes et leur mesure » → `/contact?service=google-ads`. **Secondaire :** « Comparer Google Ads et Local Services » → 20 publiée ; chatbot `acquisition` possible.
- **Ressources / maillage :** 20 ; `/publicite`, `/creation-site`, `/contact`.
- **Priorité / parcours :** A4, intention de gestion non couverte en détail → budget média/tracking/responsabilités → transparence sur preuves → qualification. Cadrage commercial préalable requis.

### 05. Automatisation et IA entreprise

- **Requête :** automatisation des processus entreprise. **Variantes :** automatiser tâches répétitives, IA pour entreprise, connecter outils entreprise.
- **Intention / funnel / type :** commercial / consideration → decision / money de famille.
- **URL / état :** `/solutions/automatisation-ia`, renforcer ; différer une page générique IA entreprise ou `/services/automatisation-processus` concurrente.
- **Services / preuve :** `business-workflows`, `api-integrations`, `airtable-workspace`, `automated-reporting` ; P9 est une démonstration interne, SystemFlow un scénario générique, pas une livraison client.
- **CTA principal :** « Décrire la tâche à automatiser » → chatbot `automation`. **Secondaire :** « Cadrer mon processus » → `/contact?service=business-workflows`.
- **Ressources / maillage :** 12 ; `/ressources`, 17/18 après publication, `/contact`.
- **Priorité / parcours :** A5, page et film disponibles → fonctionnement et contrôle humain → démonstration explicite → qualification outils/données/tâche, sans ROI inventé.

### 06. Maintenance de site

- **Requête :** maintenance site internet entreprise. **Variantes :** contrat maintenance site web, suivi technique site, accompagnement évolutions site.
- **Intention / funnel / type :** commercial / decision / money.
- **URL / état :** `/services/website-care`, créer.
- **Services / preuve :** `website-care`, `hosting-supervision` si confirmé ; aucune maintenance cliente documentée. P8 montre un projet interne, pas un SLA.
- **CTA principal :** « Définir la maintenance de mon site » → `/contact?service=website-care`. **Secondaire :** « Préparer une refonte » → 10 publiée si une correction ponctuelle ne suffit pas.
- **Ressources / maillage :** 10 ; `/creation-site`, `/solutions/web-applications`, `/contact`.
- **Priorité / parcours :** A6, demande de prise en charge concrète → technologies/accessibilité des accès/exclusions/délais réels → périmètre vérifiable → demande de cadrage.

### 07. Stratégie digitale

- **Requête :** accompagnement stratégie digitale entreprise. **Variantes :** conseil stratégie digitale PME, structurer stratégie numérique, audit stratégie digitale.
- **Intention / funnel / type :** commercial / consideration → decision / money.
- **URL / état :** `/services/digital-strategy`, créer.
- **Service / preuve :** `digital-strategy` ; aucune mission cliente documentée. P8 peut illustrer l’organisation du site interne, pas une stratégie ayant produit des résultats.
- **CTA principal :** « Expliquer ma situation et mes priorités » → `/contact?service=digital-strategy`. **Secondaire :** « Explorer les leviers » → `/solutions`, ou chatbot `strategy`.
- **Ressources / maillage :** 09/11/12 selon le besoin, pas les trois systématiquement ; `/solutions`, `/ressources`, `/contact`.
- **Priorité / parcours :** A7, qualification des prospects indécis → cadre et méthode → éléments vérifiables/limites → priorités et existant à examiner.

### 08. Motion design et vidéo

- **Requête :** création vidéo motion design entreprise. **Variantes :** vidéo explicative entreprise, animation présentation service, studio motion design.
- **Intention / funnel / type :** commercial / consideration → decision / money.
- **URL / état :** `/services/video-motion-design`, créer.
- **Service / preuve :** `video-motion` ; P9, film réel interne. L’intégration et le poster sont documentés ; confirmer le périmètre exact de production avant d’attribuer tous les travaux graphiques à CODE-V.
- **CTA principal :** « Cadrer ma vidéo explicative » → `/contact?service=video-motion`. **Secondaire :** « Voir le film CODE-V » → `/realisations#laboratoire`.
- **Ressources / maillage :** aucun guide pertinent parmi les vingt ; film dans `/ressources#en-images`, `/realisations#laboratoire`, `/solutions`, `/contact`.
- **Priorité / parcours :** A8, média réel mobilisable → formats et périmètre → film clairement interne → message/public/diffusion à qualifier.

## Vague B — soutien et qualification

### 09. Prix d’un site

- **Requête :** combien coûte un site internet professionnel. **Variantes :** budget site vitrine entreprise, coût refonte site, estimation création site.
- **Intention / funnel / type :** commercial / consideration / support guide.
- **URL / état :** `/ressources/prix-site-internet`, créer ; expliquer les facteurs de coût sans prix/fourchette non validés.
- **Services / preuve :** `website`, `ecommerce` pour distinguer les périmètres ; P1/P3 montrent des fonctions visibles différentes, jamais leur coût.
- **CTA principal :** « Demander une estimation de mon projet » → `/contact?service=website`. **Secondaire :** « Comprendre la prestation de création » → `/creation-site`.
- **Ressources / maillage :** 10 ; `/solutions/web-applications`, `/creation-site`, P1/P3, `/contact`.
- **Priorité / parcours :** B1, qualification commerciale → facteurs de coût → prestation → réalisation → estimation cadrée.

### 10. Préparer une refonte

- **Requête :** comment préparer une refonte de site internet. **Variantes :** cahier des charges refonte, étapes avant refonte, conserver SEO refonte.
- **Intention / funnel / type :** informational à portée commerciale / consideration / support guide.
- **URL / état :** `/ressources/preparer-refonte-site`, brief `website-brief` existant, texte à rédiger. « Agence refonte site » appartient à 01.
- **Services / preuve :** `website`, `web-migration`, `ux-conversion` selon besoin ; P8 interne, pas d’historique avant/après client permettant de revendiquer une refonte.
- **CTA principal :** « Cadrer la refonte de mon site » → `/contact?service=website`. **Secondaire :** « Comprendre création et refonte » → `/creation-site`.
- **Ressources / maillage :** 09 ; `/creation-site`, `/referencement` pour les risques de migration, 06, `/contact`.
- **Priorité / parcours :** B2, réduction des demandes imprécises → checklist documentée → périmètre commercial → échange sur site et contenus existants.

### 11. Site ou fiche Google

- **Requête :** site internet ou fiche Google Business Profile. **Variantes :** fiche Google suffit-elle, différence site web Google Maps, site entreprise locale.
- **Intention / funnel / type :** informational / discovery → consideration / support comparatif.
- **URL / état :** `/ressources/site-ou-fiche-google`, brief `local-visibility-brief`, texte à rédiger.
- **Services / preuve :** `website`, `local-seo`, `gbp-management` ; P5/P6/P7 montrent des sites locaux, aucune fiche gérée par CODE-V documentée.
- **CTA principal :** « Étudier ma visibilité locale » → `/contact?service=local-seo`. **Secondaire :** « Comprendre le rôle d’un site » → `/creation-site`.
- **Ressources / maillage :** 13, 09 pour le budget ; 03, `/creation-site`, P6/P7, `/contact`.
- **Priorité / parcours :** B3, choix distinct de la prestation → rôles/limites → solution locale → site réel → état des lieux.

### 12. Première automatisation

- **Requête :** quelle tâche automatiser en premier dans une entreprise. **Variantes :** checklist automatisation PME, choisir premier workflow, prioriser tâches répétitives.
- **Intention / funnel / type :** commercial exploratoire / consideration / support checklist.
- **URL / état :** `/ressources/choisir-premiere-automatisation`, brief `automation-brief`, texte à rédiger.
- **Services / preuve :** `business-workflows`, `api-integrations` ; P9 illustre des connexions possibles, pas un gain de temps mesuré.
- **CTA principal :** « Décrire une tâche répétitive » → chatbot `automation`. **Secondaire :** « Explorer l’automatisation » → `/solutions/automatisation-ia`.
- **Ressources / maillage :** aucune ressource connexe nécessaire par défaut ; 05, 18 si besoin métier, `/contact?service=business-workflows`.
- **Priorité / parcours :** B4, qualification d’une intention vague → fréquence/données/validation → démonstration explicite → qualification.

### 13. Entretenir GBP

- **Requête :** comment gérer sa fiche Google Business Profile régulièrement. **Variantes :** mettre à jour fiche Google entreprise, photos horaires fiche Google, gestion avis Google.
- **Intention / funnel / type :** informational avec délégation possible / consideration / support guide.
- **URL / état :** `/ressources/entretenir-fiche-google-business-profile`, créer ; différer une money page `/services/gbp-management` contraire au regroupement actuel.
- **Services / preuve :** `gbp-management`, `local-seo` ; aucune fiche cliente gérée documentée. Utiliser les sources Google, pas une fausse fiche ou des avis inventés.
- **CTA principal :** « Cadrer le suivi de ma fiche » → `/contact?service=gbp-management`. **Secondaire :** « Comprendre l’accompagnement local » → 03 publiée.
- **Ressources / maillage :** 11 ; 03, `/referencement`, `/contact`.
- **Priorité / parcours :** B5, rôle opérationnel distinct de la vente SEO local → responsabilités/accès/entretien → sources officielles → suivi récurrent à cadrer.

### 14. Gestion des réseaux sociaux

- **Requête :** gestion réseaux sociaux entreprise. **Variantes :** community management PME, gestion Instagram entreprise, accompagnement publications.
- **Intention / funnel / type :** commercial / consideration → decision / money.
- **URL / état :** `/services/social-management`, créer. `/facebook` reste une page de publications, pas une page de vente.
- **Services / preuve :** `social-management`, `editorial-social` ; aucune mission cliente ou croissance d’audience documentée. Le flux Facebook peut montrer des publications internes réellement disponibles, jamais une performance client.
- **CTA principal :** « Cadrer ma présence sociale » → `/contact?service=social-management`. **Secondaire :** « Voir les publications du studio » → `/facebook`, disponibilité du flux à vérifier.
- **Ressources / maillage :** aucun guide social pertinent parmi les vingt ; `/solutions`, `/facebook`, 19 pour distinguer organique et publicité, `/contact`.
- **Priorité / parcours :** B6, offre identifiable mais preuves limitées → périmètre/validation → exemples internes vérifiés → canaux/fréquence/responsabilités.

## Vague C — spécialisation conditionnelle

### 15. E-commerce

- **Requête :** création site e-commerce entreprise. **Variantes :** développement boutique en ligne, agence e-commerce, site marchand sur mesure.
- **Intention / funnel / type :** commercial / consideration → decision / money.
- **URL / état :** `/services/ecommerce`, créer après cadrage plateformes, paiements, livraison et responsabilités.
- **Service / preuve :** `ecommerce` ; aucune boutique avec transaction documentée. P4 est un catalogue, P3 une carte : ne pas les présenter comme boutiques avec paiement réalisées.
- **CTA principal :** « Cadrer ma boutique en ligne » → `/contact?service=ecommerce`. **Secondaire :** « Explorer les formats web » → `/solutions/web-applications`.
- **Ressources / maillage :** 09 si elle distingue ces périmètres sans faux prix ; `/solutions/web-applications`, 06, `/contact`.
- **Priorité / parcours :** C1, intention forte mais preuve manquante → fonctions/contraintes → limites et preuve réellement disponible → catalogue/paiement/logistique. Remonter si un dossier vérifiable apparaît.

### 16. Application web

- **Requête :** développement application web sur mesure. **Variantes :** agence application web, plateforme web entreprise, création application web.
- **Intention / funnel / type :** commercial / consideration → decision / money.
- **URL / état :** `/services/applications-web`, créer ; la page famille garde le rôle de choix entre formats.
- **Service / preuve :** `web-application` ; aucune application cliente documentée. P8 est un site interne ; les interfaces illustratives ne sont pas des captures d’applications clients.
- **CTA principal :** « Décrire les usages de mon application » → `/contact?service=web-application`. **Secondaire :** « Comparer les formats web » → `/solutions/web-applications`.
- **Ressources / maillage :** aucun guide applicatif retenu ; `/solutions/web-applications`, 18 pour les opérations internes, `/contact`.
- **Priorité / parcours :** C2, périmètre et preuve à réunir → rôles/fonctions/intégrations → éléments vérifiables → expression de besoin.

### 17. Agent IA

- **Requête :** création agent IA entreprise. **Variantes :** assistant IA métier, agent IA sur mesure, agent connecté aux outils.
- **Intention / funnel / type :** commercial / consideration → decision / money spécialisée.
- **URL / état :** `/services/agents-ia-assistants-metier`, créer seulement si le brief est distinct de 05 : sources, évaluations, droits d’action et supervision.
- **Service / preuve :** `ai-agents` ; aucune livraison cliente documentée. Le chatbot CODE-V est une démonstration conversationnelle interne, pas un agent autonome ; P9 ne prouve pas un agent fonctionnel.
- **CTA principal :** « Cadrer l’usage et les limites de mon assistant » → `/contact?service=ai-agents`. **Secondaire :** « Comprendre automatisation et IA » → 05.
- **Ressources / maillage :** 12 pour prérequis et alternatives sans IA ; 05, 18, `/contact`.
- **Priorité / parcours :** C3, spécialisation possible mais preuves incomplètes → capacités/erreurs/supervision → démonstration honnête → sources/actions à qualifier.

### 18. Logiciel métier et CRM

- **Requête :** développement logiciel métier sur mesure. **Variantes :** CRM sur mesure entreprise, outil métier PME, dashboard opérationnel. CRM est un cas d’usage à cadrer, pas un service séparé validé.
- **Intention / funnel / type :** commercial / consideration → decision / money.
- **URL / état :** `/services/outils-metier-dashboards`, créer ; différer une page CRM presque identique.
- **Services / preuve :** `business-tool`, `application-support` pour la continuité ; aucun CRM/logiciel client documenté. SystemFlow reste un scénario, sans faux screenshot.
- **CTA principal :** « Décrire mes processus et mes utilisateurs » → `/contact?service=business-tool`. **Secondaire :** « Relier mes outils existants » → 05.
- **Ressources / maillage :** 12 si choix entre automatisation et développement ; 16, 05, `/solutions`, `/contact`.
- **Priorité / parcours :** C4, intention forte, cadrage et preuve incomplets → usages/données/accès/intégrations → limites → besoin métier.

### 19. Meta Ads

- **Requête :** gestion publicité Facebook Instagram entreprise. **Variantes :** agence Meta Ads, campagnes Instagram Ads, prestation Facebook Ads.
- **Intention / funnel / type :** commercial / consideration → decision / money.
- **URL / état :** `/services/facebook-instagram-ads`, créer ; différencier audiences/créations/mesure de Google Ads et du community management.
- **Service / preuve :** `meta-ads` ; aucune campagne cliente documentée. Un site ou le flux Facebook ne prouvent pas une diffusion payante.
- **CTA principal :** « Cadrer mes campagnes Meta » → `/contact?service=meta-ads`. **Secondaire :** « Comparer les canaux publicitaires » → `/publicite`.
- **Ressources / maillage :** aucun support pertinent parmi les vingt, pas de lien artificiel Google/Local Services ; `/publicite`, 14, `/creation-site`, `/contact`.
- **Priorité / parcours :** C5, sans campagne montrable → offre/audience/créations/mesure → limites explicites → budget et assets à qualifier.

### 20. Google Ads ou Local Services

- **Requête :** Google Ads ou Local Services Ads. **Variantes :** éligibilité Local Services France, Google Local Services artisan, différence Search Ads Local Services.
- **Intention / funnel / type :** commercial comparatif / consideration / support.
- **URL / état :** `/ressources/google-ads-ou-local-services`, créer après vérification actuelle des activités/zones/exigences. `local-services` reste regroupé sous `google-ads`.
- **Services / preuve :** `local-services`, `google-ads` ; aucune campagne documentée. P5/P6/P7 ne prouvent ni l’éligibilité ni une diffusion : documentation officielle et contrôle individuel.
- **CTA principal :** « Vérifier si Local Services convient à mon activité » → `/contact?service=local-services`. **Secondaire :** « Comprendre l’accompagnement Google Ads » → 04 publiée.
- **Ressources / maillage :** 11/13 si le rôle de la fiche est pertinent ; 04, `/publicite`, 03, `/contact`.
- **Priorité / parcours :** C6, sujet soumis à éligibilité → comparaison/conditions sourcées → accompagnement → vérification activité/zone/existant. Remonter si des demandes réelles le justifient.

## Routes existantes et cannibalisation potentielle

Un chevauchement de thèmes ne prouve pas une cannibalisation dans Google. Confirmer ultérieurement avec requêtes, impressions et URL Search Console. **Aucune suppression ou redirection maintenant.**

| Route | Rôle retenu | Risque | Décision future |
| --- | --- | --- | --- |
| `/` | Marque et orientation | Répète les familles | Garder la Home ; orienter vers les propriétaires des intentions |
| `/solutions` | Hub commercial | Pages familles et spécialistes | Vocabulaire de choix, pas neuf argumentaires transactionnels complets |
| `/solutions/web-applications` | Choisir un format | Création/e-commerce/application/métier | Renforcer le maillage ; laisser le détail commercial aux spécialistes |
| `/solutions/automatisation-ia` | Demande générique automation/IA | Future automatisation-processus et agent IA | Garder le générique ici ; différencier strictement 17, différer le doublon workflows |
| `/creation-site` | Création/vitrine/refonte commerciale | Services creation-refonte-site, vitrine/refonte séparés | Conserver/enrichir ; 10 cible la préparation, pas l’achat de la prestation |
| `/referencement` | SEO de site et accompagnement global | Services referencement-naturel, 03 local | Conserver/enrichir ; local = fiche/zone/Maps, pas copie du SEO général |
| `/publicite` | Panorama des canaux | 04 et 19 | Conserver, orienter vers les spécialistes ; éviter de copier leurs textes |
| `/facebook` | Publications internes | Vente social-management | Conserver comme actualités, sans cible community management ni faux cas client |
| `/realisations` | Portfolio réel | Argumentaires des services | Garder captures/contextes ; pas d’études de cas ou résultats inventés |
| `/ressources` | Hub éditorial | Guides détaillés | Introductions courtes, pas reproduction intégrale des guides |
| `/contact` | Conversion et marque | Audits/estimations | Un formulaire, service contextualisé ; pas vingt pages contact identiques |

Canonicals explicites présents dans les modules Home, hubs et pages familles. Les anciennes routes `/creation-site`, `/referencement`, `/publicite`, `/facebook` et `/contact` n’en déclarent pas dans leurs modules : contrôle et enrichissement à prévoir, sans intervention ici. Ne pas utiliser une canonical croisée comme substitut à la différenciation des intentions ; discuter une migration seulement dans une autre phase.

**Crédibilité :** `/publicite` contient une composition décorative avec `24.8k`, `1,284`, `86` et des pourcentages. Ces chiffres ne sont pas des résultats du catalogue. Ne pas les reprendre comme preuve ; prévoir ultérieurement une mention visible de démonstration ou une composition sans compteurs. Les pages pilotes doivent conserver leurs mentions d’illustration.

Frontières à respecter :

- Création/refonte/vitrine : un propriétaire commercial initial ; prix et préparation sont des intentions de lecture distinctes. Séparer seulement si SERP, besoins et dossiers le justifient.
- SEO local/GBP : une money page locale et un guide d’entretien, avec CTA initial/récurrent différents.
- Google Ads/Local Services : gestion et comparatif conditionnel, conformément au catalogue.
- Application web/logiciel métier : parcours applicatifs contre opérations internes ; fusionner si les futurs briefs sont identiques.
- Automation/agent IA : processus général contre sources, évaluations et droits d’action spécifiques.
- Social/Meta : organique et communauté contre achat média et mesure.
- Stratégie : diagnostic des priorités, pas un clone du hub Solutions ou des guides de choix.

## Stratégie locale, séparée des vingt pages

### Réalité connue et informations manquantes

Les références web concernent Projan/Gers (P1), Canet-en-Roussillon (P4), Perpignan/Pyrénées-Orientales (P5/P6), Narbonne/Aude (P7). Ce sont les localisations des activités présentées, pas des bureaux CODE-V ou une zone d’intervention physique. P2/P3 ont une localisation null.

Le code actuel Contact et les mentions légales n’établissent pas d’adresse professionnelle complète ; l’ancienne documentation cite Perpignan comme indice à confirmer. **Aucune liste contractuellement validée des zones servies n’est disponible.** Ne pas inventer une couverture France/Occitanie. À confirmer avec le propriétaire : implantation, accueil physique, déplacements, modalités de travail à distance et zones acceptées. Les références client ne suffisent pas à fixer ces engagements.

### Conditions d’une future page locale

Exiger une prestation réellement proposée dans la zone, une demande identifiable, une connaissance ou référence locale contextualisable, des modalités de contact exactes et un contenu utile distinct. Examiner si une page régionale ou métier répond déjà au besoin. Ne pas recycler une même page en remplaçant seulement le nom de ville et quelques captures.

Les pages satellites ciblant des requêtes similaires pour renvoyer vers une même destination présentent le risque de doorway abuse décrit par [Google Search Central](https://developers.google.com/search/docs/essentials/spam-policies). Une canonical ne dispense pas de justifier l’utilité et la réalité de chaque page locale. Aucune page ville créée dans cette phase.

### Rôle de GBP et éligibilité

Vérifier d’abord l’éligibilité réelle de CODE-V, le contact physique avec les clients et les modalités d’accueil. Une activité uniquement en ligne ne devient pas éligible en déclarant une zone. Pas de fiches dans plusieurs villes sans établissements conformes. Si éligible : coordonnées, horaires, catégories, zones et entretien cohérents avec l’activité, photos autorisées et réponses aux avis. Les règles de [représentation](https://support.google.com/business/answer/3038177) et de [zones de service](https://support.google.com/business/answer/9157481) fixent les conditions ; la clientèle à distance et la zone GBP sont deux notions différentes.

Pour 20, contrôler au moment de rédiger les catégories/territoires et exigences France : [disponibilité Local Services](https://support.google.com/localservices/answer/6224841?co=GENIE.CountryCode%3DFR), [vérifications France](https://support.google.com/localservices/answer/12174778?co=GENIE.CountryCode%3DFR). Ni éligibilité, ni badge, ni volume de demandes garanti.

## Séquencement et critères de passage à la rédaction

1. Confirmer les périmètres et l’attribution des preuves. Désigner un propriétaire d’intention ; conserver les regroupements retenus.
2. Suivre 01–08 ; les destinations commerciales doivent exister avant les liens des guides. Le rang exprime un ordre de travail, pas un potentiel mesuré.
3. Rédiger 09–13, puis 14 quand l’accompagnement social est cadré. La vague B soutient les pages A avec des questions précises.
4. Réunir les preuves et prérequis pour 15–19 ; rédiger 20 après contrôle d’éligibilité. Ne pas publier une page vide pour respecter une vague.
5. Avant publication : vérifier SERP/données, chevauchements, auteur/sources/dates réels, droits médias, CTA, canonical, breadcrumb, clavier et performance. Aucun nouveau prix sans validation.
6. Réutiliser les IDs des trois briefs de `resources.ts`. Ajouter les autres supports en draft au moment de leur brief, pas automatiquement depuis cette matrice. Ne pas ajouter de liens vers des routes futures.
7. Après publication : mesurer impressions, clics, entrées, clics CTA et demandes qualifiées avec les outils réellement configurés. Distinguer contacts et clients ; ne pas attribuer une conversion à un canal sans données.

**Cette phase crée uniquement ce document.** Contrôle de cohérence des vingt opportunités, IDs services/projets, destinations présentes/futures et CTA. Pas de modification de code ni de test TypeScript/build nécessaire pour un fichier Markdown.
