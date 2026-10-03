# Page pilote — Web & Applications

Date : 3 octobre 2026. Route créée : `/solutions/web-applications`.

## Intention et différence avec Automatisation & IA

Cette page présente une famille de projets : site, boutique, application et expérience produit. Elle partage la palette, les typographies, les espacements et les primitives CODE-V, mais adopte une signature d’interface : fenêtre, navigation latérale, composants et état de confirmation. Aucun SystemFlow, nœud d’agent ou graphe IA.

Le hero comporte une composition illustrative explicitement nommée, sans capture client, données de performance ou faux contrôle interactif. Les petites surfaces servent la lecture d’une interface, pas une grille SaaS publicitaire. Le reste de la page alterne manifeste éditorial, lignes de projets, anatomie d’expérience, couches techniques, média, scénarios et méthode.

Sources : catalogue TypeScript, design system V2, architecture globale, compte rendu phase 1 et QA de la page Automatisation & IA. Ces documents et les composants existants sont utilisés sans reprise des phases précédentes.

## Contenu et catalogue

Cinq projets principaux viennent directement du catalogue : website, ecommerce, web-application, mobile-app et business-tool. Trois besoins ciblés : landing-page, ux-conversion et web-migration. Noms, résumés et CTA sont lus côté serveur ; catalogue inchangé.

SaaS, extranets, administration et portails sont des variantes d’application web ; dashboards et outils internes sont rattachés aux outils métier. Ils ne deviennent pas des prestations dupliquées. Les fonctionnalités, l’accessibilité, les migrations, intégrations et maintenance sont cadrées au devis, sans promesse de résultat ou support implicite.

Structure :

1. Hero et composition de produit.
2. Problème : vitesse, mobile, maintenance, plugins et intégrations.
3. Projets principaux et besoins ciblés, sous forme de liste.
4. Expérience : lecture, action et adaptation aux écrans.
5. Architecture : interface/rendu, données, APIs et exploitation.
6. Emplacement MotionVideo.
7. Trois scénarios génériques : site local, e-commerce et SaaS métier/portail/dashboard.
8. Méthode : comprendre, concevoir, prototyper, développer, tester, lancer, faire évoluer.
9. Qualité : Core Web Vitals, responsive, accessibilité, SEO technique, sécurité et maintenance.
10. CTA website et échange de cadrage.

## Fichiers créés

- `src/app/solutions/web-applications/page.tsx`
- `src/app/solutions/web-applications/page.module.css`
- `src/components/services/ProductCanvas.tsx`
- `src/components/services/productCanvas.module.css`
- Ce document.

Aucun fichier existant de production modifié pour cette page. Pas de nouvelle dépendance, de modification du chatbot, du catalogue, de Header/Footer/Home ou de la page IA.

## Composants et motion

ProductCanvas est un Server Component qui réutilise Reveal. Il représente une anatomie d’interface : fenêtre, rail de navigation, deux modules, fondations et état. Son périmètre est l’illustration produit, pas un dashboard fonctionnel ni un éditeur. Les labels ne simulent pas des boutons.

La primitive Reveal existante déclenche une entrée ponctuelle. Les deux modules s’assemblent en 450 ms avec un décalage de 90 ms, 8 px de déplacement et opacité .7 → 1. Aucune animation infinie. Reduced motion conserve l’état final lisible. Le graphique ne dépend pas de l’hydratation pour présenter le contenu.

Sur mobile, le rail devient une navigation horizontale illustrative, les modules sont des lignes à numéros et le panneau d’état passe dans le flux normal : aucune petite fenêtre desktop simplement réduite. Sur tablette, la composition dispose d’une largeur de lecture plus généreuse.

Réutilisés sans changement : Reveal, MotionVideo, ChatTrigger, tokens et contrôles globaux. ProductCanvas peut illustrer d’autres récits de conception, mais ses textes et sa composition sont propres à cette page ; ne pas en faire le hero universel de toutes les familles.

## Vidéo

MotionVideo en mode feature, 16:9, titre « Du composant au parcours : concevoir une interface ». La séquence future pourra expliquer assemblage de composants, navigation, états et architecture. Aucun src ni faux poster n’est fourni : placeholder neutre et ratio réservé. Aucune source vidéo téléchargée.

Préparer ensuite média validé, poster optimisé, sous-titres, transcription et éventuellement encodage mobile. Le comportement lazy et reduced motion vient du composant existant, pas d’une seconde implémentation.

## SEO et maillage

Title : « Web & Applications : vos produits digitaux | CODE-V ». Description unique, canonical absolu `https://www.code-v.fr/solutions/web-applications`, Open Graph correspondant et H1 unique.

La page aide à choisir un format et explique les responsabilités communes du produit. Les futures pages approfondiront des intentions spécialisées (boutique, mobile, app, etc.) ; aucun clone « Next.js », « SaaS » ou « dashboard » n’est créé. Aucun volume SEO, score, classement ou résultat client inventé. Pas de structured data d’avis ou de prix sans sources validées.

Création de site pointe vers `/creation-site`, destination existante. Autres projets : contact qualifié par ID catalogue, jusqu’à création et validation des routes dédiées. Architecture/intégrations pointe vers `/solutions/automatisation-ia`. Accueil, ancre `#projets` et CTA website complètent le parcours. Aucune route future inexistante n’est publiée comme lien.

Le raccordement des entrées Home/Header à cette page famille reste une décision séparée ; leur contenu n’est pas modifié ici.

## Validation

- TypeScript : `npx.cmd tsc --noEmit --incremental false`, réussi.
- Build : réussi, route statique, 3.58 kB / First Load JS 107 kB selon Next.js. Valeur Resend de validation limitée au processus de build ; `.env` et API inchangés. Ces tailles ne sont pas des mesures Core Web Vitals terrain.
- Les premiers aperçus partageant `.next` avec d’autres serveurs ont renvoyé des réponses incohérentes. La validation finale a été effectuée sur une copie temporaire du build de production, servie indépendamment sur le port 3202, sans modification de next.config ou tsconfig.
- Chromium, 320 / 375 / 768 / 1024 / 1440 px, hauteur 900 : HTTP 200, aucun débordement horizontal, H1 unique et canonical correct.
- CTA au clavier : contexte « Site & applications » ouvert, Escape et restitution du focus au déclencheur ; bouton et focus natifs conservés.
- Reduced motion : zéro animation en cours aux cinq largeurs ; aucun élément vidéo chargé.
- Aucune erreur JavaScript détectée lors des parcours ; captures hero desktop et mobile inspectées.

Les couleurs de lecture reprennent les paires déjà validées du design system : texte principal sur clair, muted sur blanc/fond clair, blanc sur bleu profond et cyan sur nuit. Les éléments décoratifs sont distincts du contenu et le symbole de fenêtre est aria-hidden. L’illustration ne comporte pas de contrôle vide ou trompeur.

## Avant généralisation

Valider le discours auprès de prospects, choisir la vidéo, apporter des projets réels et définir les futurs liens entrants. Compléter avec Safari/Firefox, appareils physiques, zoom et mesures de performance terrain.

Réutiliser les fondations et les primitives ; conserver une signature par famille. Ne pas généraliser le faux cadre de produit comme preuve client, la liste de cinq projets ou les sept étapes sur chaque prochaine page. La composition Web démontre un deuxième langage visuel, elle ne remplace pas celui de l’automatisation.
