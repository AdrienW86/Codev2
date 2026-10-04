# Mesure des conversions CODE-V

Implémentation du 4 octobre 2026. Aucune nouvelle page, dépendance, installation GA4 ou modification de l’API Contact. La mesure décrit des actions, pas des prospects qualifiés ni un chiffre d’affaires.

## Architecture

- `src/lib/analytics.ts` : schéma contrôlé, helpers, adaptation Vercel et nettoyage des URL.
- `src/lib/conversion-config.ts` : configuration serveur dérivée du registre de ressources et des identifiants du catalogue. Seuls des chemins et identifiants sont sérialisés ; aucun texte d’article ou catalogue complet côté navigateur.
- `ConversionTracking` : un seul écouteur de clics délégué, nettoyé au démontage. Les liens Next, le clavier et la navigation restent natifs. Les money pages restent Server Components.
- `ContactForm` : événement uniquement après réponse HTTP réussie **et** `success: true` de l’API existante, après envoi accepté côté serveur. Une réponse 200 sans confirmation, une erreur ou un clic sur Envoyer ne suffit pas. Cette confirmation ne prouve pas la livraison finale de l’email ni la qualification du contact.
- `RobotAssistant` : événement à la transition fermé → réellement visible et ouvert. Un intent transmis alors que l’assistant est déjà ouvert ne produit pas une seconde ouverture. Afficher seulement l’icône ne compte pas.

L’adaptateur utilise `track` de `@vercel/analytics` 2.0.1, présent dans le package installé. Analytics conserve un seul montage, maintenant dans ConversionTracking, après initialisation de la configuration. Speed Insights reste inchangé. Les erreurs de mesure sont isolées et ne bloquent jamais une action commerciale.

## Événements et propriétés

| Événement | Déclenchement | Propriétés |
|---|---|---|
| `contact_form_submit` | Confirmation serveur du formulaire | `source_path`, `location: form`, `service` si reconnu ; `cta_source_path` et `cta_location` si le dernier CTA est connu |
| `contact_cta_click` | Lien Contact dans le contenu principal | `source_path`, `destination_path: /contact`, `location`, `service` si reconnu, `cta_label` si libellé approuvé |
| `phone_click` | Activation d’un lien tel | `source_path`, `location`, `service` si reconnu |
| `email_click` | Activation d’un lien mailto | mêmes propriétés, sans adresse |
| `chatbot_open` | Assistant effectivement ouvert | `source_path`, `location: assistant`, `intent` (ou general) |
| `chatbot_intent_selected` | CTA qui demande un intent valide à l’assistant | `source_path`, `location: assistant`, `intent` |
| `realization_click` | Lien Réalisations depuis Home, Solutions, Ressources, un article ou une money page | `source_path`, `destination_path: /realisations`, `location`, `service` si connu, `project_slug` si identifié |
| `article_to_service_click` | Lien d’un article vers une money page associée dans son contenu ou ses solutions | `source_path`, `article_slug`, `destination_path`, `location`, `service`, `destination_service` |
| `external_project_click` | Lien vers un site client connu depuis Réalisations | `source_path`, `location`, `project_slug` ; aucune URL externe transmise |

`location` est une valeur fermée : header, footer, hero, content, final, article, form ou assistant. Les chemins inconnus sont exclus. Les services sont limités aux IDs du catalogue ; l’ancien paramètre `ads` est normalisé en `google-ads`. L’URL Contact et ses paramètres fonctionnels ne sont pas modifiés : seule la copie envoyée à Analytics est nettoyée. L’emplacement est inféré de la structure sémantique ; vérifier cette classification lors d’une évolution du layout.

Les clics sont des interactions et ne prouvent pas qu’un appel a eu lieu, qu’un email a été envoyé ou qu’une réalisation a été lue. Un lien vers la sélection Réalisations n’est pas assimilé à la consultation d’un projet identifié. Les simples liens SEO de sommaire ou de navigation interne aux articles ne produisent aucun événement commercial.

## Pages concernées

Money pages : `/creation-site`, `/referencement`, `/referencement-local`, `/publicite`, `/maintenance-site`, `/solutions/web-applications`, `/solutions/automatisation-ia`, `/strategie-digitale`, `/motion-design`.

Les onze articles publiés sous `/ressources/[slug]` sont associés automatiquement à leurs destinations commerciales réelles. Les nouveaux articles publiés reprendront la même logique. Les liens Contact du contenu des autres pages publiques sont également couverts. Les liens tel/mailto et le chatbot sont couverts sur les chemins publics connus, y compris Contact, Header et Footer. Les clics Contact dans le Header/Footer ne font pas partie des CTA de contenu mesurés ici.

## Confidentialité et périmètre

Aucun nom, société, numéro, adresse email, contenu de message, texte libre de lien, URL complète, paramètre libre, referrer, identifiant utilisateur ou de session n’est ajouté aux événements custom. Aucun champ FormData n’est transmis à Analytics. Le service vient uniquement d’une liste d’identifiants. cta_label est choisi dans une liste de libellés commerciaux fixes, jamais copié librement. article_slug et project_slug sont limités aux articles et projets publiés du registre. form_variant vaut contact_main pour le seul formulaire actuel. Les propriétés inconnues sont supprimées même si un appelant en fournit. Les URL des pageviews et événements Vercel sont limitées aux chemins connus, sans query string ni fragment, via beforeSend.

Aucun cookie, identifiant ou stockage navigateur ajouté. Le dernier CTA Contact est gardé uniquement en mémoire durant la navigation Next, avec chemin, service et emplacement nettoyés. Après succès, ce contexte est effacé. `source_path` du formulaire reste `/contact` ; `cta_source_path` et `cta_location` relient le succès à ce dernier CTA si le service correspond. Ce contexte disparaît au rechargement, dans un autre onglet ou lors d’une navigation complète. Les événements permettent une lecture agrégée des parcours, **pas** une attribution individuelle ou entre sessions. Un navigateur qui bloque Analytics peut envoyer le formulaire sans produire d’événement : ne pas utiliser ce compteur comme registre comptable des demandes reçues.

## Future intégration GA4

L’interface AnalyticsAdapter reçoit le nom d’événement et les seules propriétés nettoyées. Un futur adaptateur pourra mapper ces valeurs vers GA4, sans modifier les pages. Aucun gtag, dataLayer, ID de mesure ou SDK GA4 ajouté. L’activation de cet éventuel fournisseur et son cadre de consentement devront être traités lors de cette intégration.

Vercel documente les événements custom via track ; leur disponibilité dans le tableau de bord dépend du plan et des réglages du projet. Vérifier l’onglet Events après déploiement, sans changer d’abonnement automatiquement : https://vercel.com/docs/analytics/custom-events et https://vercel.com/docs/analytics/quickstart.

## Méthode de test

1. `node tests/conversion-tracking.cjs` : valeurs non autorisées, propriétés personnelles, URL avec paramètres, alias, erreurs d’adaptateur.
2. Exécuter les suites existantes, TypeScript et `npm.cmd run build`.
3. Sur le build local, intercepter le fournisseur pour observer les événements **sans les envoyer à Vercel**. Activer les liens par souris et clavier ; vérifier source, destination, emplacement et nombre d’événements.
4. Intercepter `/api/contact` : tester erreur 503, HTTP 200 sans confirmation, réponse réussie. Vérifier zéro événement avant confirmation et un seul après succès. Aucun email réel nécessaire.
5. Ouvrir, fermer et rouvrir le chatbot ; envoyer de nouveau le même intent pendant qu’il est ouvert. Vérifier une ouverture par transition, sans doublon.
6. Tester les onze liens article → money page, les liens tel/mailto et les CTA des neuf money pages. Vérifier que les propriétés ne contiennent aucune donnée de formulaire ou query string libre.
7. Après publication, vérifier les requêtes custom et les Events du projet Vercel. Les scripts peuvent utiliser des chemins obfusqués ; ne pas filtrer uniquement `/_vercel/`. Le bilan local ne confirme pas la collecte dans le compte Production.

## Validation initiale de livraison

TypeScript, neuf suites Node et build final réussis. Chromium : neuf money pages, sept liens Réalisations disponibles, onze articles, cinq largeurs 320/375/768/1024/1440 et activation au clavier validés. Aucune erreur JavaScript. Formulaire : zéro événement avant réponse, sur 503 et sur HTTP 200 sans confirmation ; un événement après success true. Chatbot : pas de doublon pour un nouvel intent alors qu’il est ouvert ; fermeture puis réouverture mesurée. Parcours réel Next Création → Contact → succès : cta_source_path=/creation-site, cta_location=hero, service=website. Fournisseur et API Contact interceptés, aucun email réel ni événement envoyé au compte Vercel pendant les tests.

Impact observé sur la somme gzip des scripts Next référencés par le HTML, comparée à la production a3b8f44 : +698 octets sur Création de site, +1 994 octets sur Contact. Cette comparaison inclut le découpage des bundles, pas seulement le fichier layout ; elle ne représente pas le poids total de la page ni un score de performance terrain. First Load JS du build : Création 111 kB, Contact 106 kB ; aucune dépendance ajoutée. L’inventaire et les associations de chemins ajoutent également un petit payload RSC. Aucune animation, requête de données ou écouteur par CTA ajouté.

Le tracking est validé localement, pas encore déployé par cette tâche. L’apparition des événements dans le compte Vercel reste à vérifier après déploiement et selon le plan disponible. La correction éditoriale résiduelle de Réalisations était déjà présente avant cette intervention ; elle reste distincte du tracking.

## Complément du brief de suivi des conversions

Neuf noms d’événements stables, sans migration des noms ou propriétés déjà définis. La convention snake_case correspond aux propriétés demandées : sourcePage → source_path, placement → location, ctaLabel → cta_label, articleSlug → article_slug, projectSlug → project_slug, destinationService → destination_service, formVariant → form_variant. Aucune valeur vide ajoutée.

Les intents restent les quatre existants : website, acquisition, automation, strategy. Les exemples seo/ads ne créent pas de nouveaux intents ; l’acquisition conserve sa qualification existante. Un CTA intent peut produire une sélection et une ouverture : ce sont deux actions distinctes. Un nouveau CTA avec intent alors que le dialogue est ouvert produit seulement la sélection, jamais une seconde ouverture.

Les projets et leurs destinations sont dérivés de projects.ts côté serveur. Le fragment selection est associé au vrai projet client mis en avant ; un lien générique vers Réalisations ou Laboratoire ne reçoit aucun slug supposé. Les sept sites externes publics sont reconnus par leur destination connue, mais seul le slug part en Analytics.

La Home, Solutions, Ressources, Réalisations et Contact sont couverts sans conversion en Client Components ni changement de contenu. Un seul écouteur délégué observe les liens pertinents ; il ne capture pas tous les liens du Footer. Le service du formulaire conserve website, seo, website-care, digital-strategy, etc. ; ads est normalisé vers google-ads. La mesure ne modifie pas les paramètres envoyés à l’API Contact.

Validation complémentaire : voir les tests des neuf événements dans tests/conversion-tracking.cjs et les contrôles navigateur décrits plus haut. Vercel, Contact et les sites externes doivent être interceptés pendant les tests pour éviter toute collecte ou envoi réel.

Résultats du complément : TypeScript et neuf suites Node réussis ; build isolé réussi, 37 sorties pré-rendues. Le serveur de développement utilisateur écrit dans .next : validation effectuée dans une copie temporaire sans .env, sans interrompre ce serveur. Chromium confirme neuf money pages, onze articles, cinq largeurs, clavier, absence de doublons d’ouverture et formulaire uniquement après confirmation. Cinq services testés par formulaire simulé : website, seo, ads → google-ads, website-care, digital-strategy. Les sept liens externes réels sont associés aux sept slugs du registre ; aucune URL externe transmise.

Home et Ressources : liens Réalisations réels validés. Solutions ne propose actuellement aucun lien Réalisations dans main : branche de détection testée avec un lien temporaire injecté uniquement dans le navigateur de test, aucune modification de la page. Sélection d’intent Home validée ; un second CTA pendant l’ouverture produit seulement une sélection supplémentaire. Aucun email ni événement de test envoyé aux services réels.

Impact final estimé par comparaison gzip de tous les scripts Next présents dans le HTML avec la production de référence : +1 698 octets sur Création de site, +3 421 octets sur Contact. Le découpage des bundles et le répertoire de build influencent la comparaison ; il ne s’agit pas d’une mesure de performance terrain. Les petits inventaires publics ajoutent également des propriétés RSC, sans contenu client ou article. Aucune dépendance ajoutée, aucun nouveau lecteur ou composant de page client. Tous les événements demandés sont implémentés ; la collecte dans le tableau de bord Vercel reste à vérifier après déploiement selon le plan du projet.
