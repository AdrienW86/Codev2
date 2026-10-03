# Publicité — money page acquisition CODE-V

## Audit initial

PageHero, H1 « Accélérez votre croissance. », title « Publicité en ligne — Codev », description « Atteignez une audience ciblée avec des campagnes publicitaires pensées pour générer des prospects. ». Pas de canonical propre. Structure : introduction, panneau de campagne décoratif, liste Google/Facebook/Instagram/tracking, CTA final.

À conserver : URL, intention de cibler les demandes utiles et lecture du parcours complet. Faiblesses : positionnement abstrait, absence de cadrage Search, budget, destination, mesure et FAQ ; CTA génériques. Le panneau affichait des métriques sans preuve et un état « Campagne active » : il est supprimé.

## Positionnement final

`/publicite` est la page commerciale principale d’acquisition payante, avec Google Ads Search comme levier principal. Local Services Ads reste un dispositif distinct, conditionné à la disponibilité et à l’éligibilité. Meta Ads est un complément pour découverte d’offre, notoriété, demandes et retargeting selon le contexte.

Une future page spécialisée ne devra pas répéter cette intention globale : elle devra approfondir un besoin distinct. Aucune route Google Ads, LSA ou Meta fictive n’est créée ni liée.

- Title : **Google Ads & acquisition payante | CODE-V**.
- Description : **CODE-V accompagne vos campagnes Google Ads : ciblage Search, pages de destination, suivi des conversions et pilotage du budget. Parlons de votre acquisition.**
- H1 : **Le bon clic. La suite compte.**
- Canonical / Open Graph : `https://www.code-v.fr/publicite`.

Parcours : intention → annonce → page → action → mesure → optimisation. Hero avec trajectoire éditoriale, problème de dépenses sans compréhension, Search, landing pages et tracking, pilotage, compléments LSA/Meta, méthode, articulation SEO/site, FAQ de huit questions et CTA final. Aucun dashboard simulé, état de campagne réelle ou indicateur numérique de performance.

Budget média et honoraires distincts ; pages d’atterrissage, production de créations et tracking se cadrent selon le devis. Pas de nombre de leads, ROAS ou coût par prospect garanti. Aucune preuve Ads documentée disponible dans les données examinées : aucun bloc de résultats n’est publié et aucune justification de cette absence n’apparaît publiquement. Le lien Réalisations désigne explicitement les productions web.

## Conversion et maillage

Quatre CTA vers `/contact?service=ads` : Parler de votre acquisition ; Étudier une campagne ; Faire le point sur votre dispositif ; Parler de votre projet.

Liens éditoriaux : `/creation-site`, `/referencement`, `/referencement-local`, `/solutions`, `/realisations`, `/ressources`. Ancres : `#search`, `#conversion`, `#pilotage`, `#questions`. Aucun changement de Header, Footer, Home, catalogue ou chatbot.

Breadcrumb visible **Accueil › Publicité en ligne**, BreadcrumbList identique. Service minimal : prestation, URL, description et provider CODE-V ; aucun tarif, avis ou rating. FAQ native, sans FAQPage ajouté.

Vérification factuelle : [budgets Google Ads](https://support.google.com/google-ads/answer/2375454), [conditions de qualification Local Services](https://support.google.com/localservices/answer/6230381). Le contenu reste pédagogique, sans détailler des paramètres de plateforme qui changeraient inutilement le rôle commercial de la page.

## QA visuelle et validation

TypeScript et build isolé de production réussis. Page statique, 1,16 ko de code de route, environ 105 ko de JS initial socle partagé inclus. Server Component et Reveal existant, aucune dépendance ou composant client supplémentaire. Aucun média ajouté : pas de téléchargement d’image ou vidéo propre à cette page.

Chromium de production local : 320, 375, 768, 1024 et 1440 px sans débordement horizontal. Sur mobile, la trajectoire en escalier devient verticale et la méthode passe à une colonne. Captures desktop/mobile inspectées. FAQ utilisable par Entrée, focus visibles au parcours Tab, reduced motion sans animation active dans le contenu. Aucune erreur JavaScript observée.

H1 unique, canonical, Service et BreadcrumbList contrôlés ; 19 destinations internes distinctes de la page et de la navigation répondent sans erreur, ancres comprises. Anciennes métriques et formulations de publication internes absentes. CLS initial local ≈ 0,0118 ; mesure de laboratoire et non performance terrain.

Fichiers : `src/app/publicite/page.tsx`, `src/app/publicite/page.module.css` et ce compte rendu. Les résultats commerciaux et les performances terrain restent à observer sur des données effectives après publication.
