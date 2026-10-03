# Page service pilote — Automatisation & IA

Livraison du 3 octobre 2026. URL : `/solutions/automatisation-ia`.

## Sources et périmètre

Sources utilisées : `src/data/services.ts`, `docs/design-system-v2.md`, `docs/architecture-code-v.md` et `docs/design-implementation-phase-1.md`.

Le chemin suit l’arborescence de l’architecture. Il s’agit de la page famille Automatisation & IA, et non d’une seconde fiche commerciale du catalogue. Les chemins `/services/...` du catalogue restent des propositions pour les futures pages détaillées ; aucune de ces routes n’est créée ici.

Six offres existantes alimentent la page : business-workflows, airtable-workspace, api-integrations, ai-agents, automated-reporting et automation-supervision. Cette dernière relève de Maintenance & Accompagnement et complète les offres de mise en place. Noms, résumés, prérequis, limites et CTA de contact sont lus dans le catalogue côté serveur, sans copie des fiches dans une nouvelle source de données.

La page ne publie aucun prix ou forfait contractuel. Les périmètres restent à cadrer au devis ; aucune autonomie totale, exactitude absolue ou performance client n’est annoncée. La Home, Header/Footer, assistant, design system, catalogue, assets et APIs restent inchangés pendant cette phase.

## Structure et choix visuels

1. Hero dark : proposition courte, CTA automation et ancre vers le système, schéma compact à trois étapes.
2. Problème : composition éditoriale asymétrique, doubles saisies, outils isolés, reporting manuel et suivi irrégulier.
3. Système : séquence nommée de six étapes, du formulaire au reporting, avec validation humaine explicite.
4. Offres : liste indexée issue du catalogue, détails natifs dépliables pour prérequis et limites, contact par prestation.
5. Agents : robot officiel statique et explication comparative du workflow, chatbot, assistant et agent.
6. Usages : deux exemples génériques, suivi commercial et synthèse/reporting, séparés des réalisations clients.
7. Motion : emplacement vidéo important et contextualisé, sans faux média.
8. Technologies : Make, Airtable, APIs/webhooks, IA et interfaces, présentés par rôle plutôt qu’un mur de logos.
9. Méthode : analyser, cartographier, automatiser, sécuriser, mesurer et améliorer.
10. Maîtrise : permissions, données, validation humaine, journalisation, reprise et supervision.
11. Conclusion : expliquer son processus à l’assistant existant ou demander un échange.

Palette et typographies officielles, titres fluides, espaces amples, alternance dark/clair et variations de composition. Aucun dashboard fictif. Le robot garde son ratio et n’est pas animé. Le hero a sa propre signature de processus, sans copier la courbe Home ni remplacer celle-ci.

## Composants et fichiers

Créés uniquement :

- `src/app/solutions/automatisation-ia/page.tsx` : Server Component, données et metadata de la page.
- `src/app/solutions/automatisation-ia/page.module.css` : composition et responsive isolés.
- `src/components/services/SystemFlow.tsx` : séquence sémantique réutilisable, paramètre `steps` et variante `compact`.
- `src/components/services/systemFlow.module.css` : étapes, lignes, nœuds et adaptation mobile.
- Ce document.

Réutilisés sans modification : `Reveal`, `ChatTrigger`, `MotionVideo`, Header/Footer et tokens globaux. `SystemFlow` accepte titre, explication et indicateur de validation humaine ; il convient à d’autres récits de service sans les transformer en clones de cette page.

Le contenu commercial et les listes restent rendus côté serveur. Les seuls îlots interactifs sont les composants existants de reveal, vidéo et déclenchement du chat. Les détails d’offre utilisent HTML natif.

## Motion et mobile

Reveal et stagger existants ; lignes CSS dessinées une fois en 900 ms, décalages 160/320 ms, nœuds statiques. Aucune boucle permanente ni bibliothèque ajoutée. La narration reste compréhensible une fois l’animation terminée et sans JavaScript ; ce ne sont pas des exécutions live.

Desktop : schéma complet en deux rangées de trois étapes. Mobile : séquence verticale avec numéros et ligne de continuité, plutôt qu’un schéma desktop miniaturisé. Hero et sections passent à une composition simple, robot plus petit, offres en lignes et actions empilées. Reduced motion affiche directement le système sans tracés animés.

## Emplacement vidéo

`MotionVideo` en mode `explainer`, ratio 16:9 réservé, titre « Du formulaire au suivi : anatomie d’un workflow ». Placeholder neutre, légende et explication adjacente. Aucun `src` n’est connecté ; aucune vidéo ne se télécharge sur cette page.

Une future séquence Remotion sera exportée en média web et fournie au composant existant, sans ajouter le runtime Remotion au site. À fournir : source réelle, poster optimisé, version mobile si nécessaire, sous-titres et transcription. Le composant existant prend en charge lecture volontaire, chargement différé, fallback et reduced motion ; ces comportements ont été vérifiés dans la phase 1, ils ne sont pas réimplémentés ici.

## SEO et liens internes

Title : « Automatisation & IA pour entreprise | CODE-V ». Meta description spécifique, canonical absolu `https://www.code-v.fr/solutions/automatisation-ia`, Open Graph cohérent, un H1 et hiérarchie H2/H3.

Thématiques traitées dans le contenu : automatisation métier/entreprise, workflows, assistants et agents IA, intégration API, qualification et reporting. Aucun volume de recherche inventé ni liste artificielle de mots-clés.

Liens vers l’accueil, `/creation-site`, contact qualifié par ID de service et ancres de page. Les CTA principaux appellent `ChatTrigger` avec l’intent `automation` existant ; le CTA transversal de stratégie utilise l’intent `strategy`. Aucune modification du chat.

Pas de structured data ajoutée : absence de références clients publiées, d’avis ou de prix validés, et la page regroupe plusieurs prestations à cadrer. Aucun balisage de résultats, Review, Product ou FAQ n’est fabriqué. Un balisage Service/Breadcrumb pourra être étudié lors de la consolidation des pages et de l’identité de l’organisation.

Le lien « CODE-V / Solutions » renvoie à l’accueil : aucun hub `/solutions` inexistant n’est utilisé. Raccordement futur de la navigation à cette nouvelle page à traiter séparément ; le Header et la Home restent intacts conformément au périmètre.

## Vérifications

- TypeScript : `npx.cmd tsc --noEmit --incremental false` réussi.
- Build Next.js : réussi, nouvelle page statique. Taille route 3.54 kB, First Load JS 107 kB selon le rapport Next.js ; aucune mesure terrain Core Web Vitals revendiquée.
- Comme en phase 1, variable Resend de validation injectée dans le processus de build uniquement pour permettre la collecte de la route contact existante. Aucun `.env`, secret, API ou configuration d’exploitation modifié.
- Chromium via Playwright : 320, 375, 768, 1024 et 1440 px, hauteur 900 px. Réponse HTTP 200, aucun débordement horizontal ni erreur JavaScript, H1 unique et canonical correct.
- CTA automation au clavier : ouverture du bon contexte, Escape et retour du focus au déclencheur ; focus visible vérifié.
- Détails des prérequis ouverts au clavier ; liens internes vérifiés en HTTP.
- Reduced motion : aucune animation en cours ; aucun élément vidéo ni téléchargement de source média sur cette page.
- Captures hero desktop et système mobile inspectées : ordre et texte lisibles, étape de validation humaine explicite.
- Paires de contraste principales vérifiées numériquement, toutes supérieures à 4.5:1 : texte muted sur fond clair/blanc, blanc sur bleu profond, cyan sur nuit et texte principal sur fond clair. Ce contrôle ne remplace pas un audit exhaustif des surfaces compositées et états.

## Avant généralisation

Valider le positionnement du H1, le niveau de détail commercial et les prérequis/exclusions du catalogue. Choisir le média motion et ses droits, puis préparer poster et transcription. Valider l’URL finale et les futurs liens entrants sans créer de doublons de famille/prestation.

Le modèle réutilisable est le rythme éditorial, la séparation entre bénéfice, mécanisme, usage, preuve et limites, ainsi que les composants de séquence et vidéo. Chaque prochaine famille doit conserver sa propre idée signature ; ne pas recopier mécaniquement les onze sections ou les mêmes schémas.

Compléter la recette sur Firefox/Safari, mobile physique, clavier virtuel, zoom et performances terrain avant généralisation. Les exemples présents restent génériques jusqu’à apport de projets réellement documentés.

## QA visuelle et validation

Revue du 3 octobre 2026 sur le code réellement présent, puis sur un build de production fraîchement relancé. Le premier serveur local utilisait des références CSS périmées après reconstruction de `.next` : ses captures non stylées ont été écartées, et leurs débordements ne sont pas attribués au CSS de la page.

### Diagnostic et corrections

La direction est cohérente : grande typographie, surfaces nuit, cyan de signal, lecture éditoriale et listes plutôt qu’une accumulation de cards. Le hero a un impact réel ; la section vidéo constitue une respiration différente. La page est une base premium crédible, mais pas encore une démonstration aboutie du savoir-faire motion : le média final et des preuves de réalisations restent absents.

| Problème constaté | Correction |
| --- | --- |
| « Plus de liens utiles » trop abstrait pour un prospect | Hero : « Des outils qui travaillent ensemble » |
| « Voir un système en action » pouvait suggérer une démonstration réelle | CTA : « Comprendre le parcours » |
| Lien « Solutions » renvoyant en réalité à l’accueil | Libellé explicite « Retour à l’accueil » |
| Tracés de SystemFlow joués au chargement, avant que le schéma complet soit visible | Reveal expose son entrée par `data-revealed`, les lignes attendent cette entrée ; une seule séquence, aucune boucle |
| Trois colonnes de schéma à la largeur tablette | Deux colonnes entre 601 et 900 px ; séquence verticale spécifique conservée à 600 px et moins |
| Header/Footer et chatbot utilisaient des variantes différentes des conventions actuelles | Logos sur nuit : `code-v-logo-white.svg` ; assistant : `code-v-robot.svg` |
| Les nouveaux fichiers ont des proportions différentes des anciennes variantes | Attributs intrinsèques corrigés : logo 875 × 875, robot 875 × 660 ; tailles d’emplacement adaptées et object-fit contain, aucune modification des SVG |

Ces conventions actuelles remplacent les choix de variante décrits dans les sections historiques de ce document. Les interventions sur Header/Footer/chatbot sont limitées aux chemins d’assets et à leur dimensionnement ; aucune réimplémentation ni logique conversationnelle modifiée.

Fichiers touchés par la QA : page pilote TSX, SystemFlow CSS, Reveal TSX, Header/Footer TSX, styles Header, styles globaux pour le logo Footer, rendu et styles du robot, et ce document. Catalogue, API, assets et autres pages services inchangés.

### Contrôles réalisés

Chromium, viewport de hauteur 900 px, largeurs **320 / 375 / 768 / 1024 / 1440**. Captures desktop du hero et de la section vidéo et capture mobile du parcours examinées visuellement. Contrôles automatisés réussis aux cinq largeurs :

- CSS et assets du rendu final chargés en HTTP 200 ; aucun débordement horizontal.
- Un H1 unique ; CTA automation activable au clavier ; dialogue ouvert et focus restitué après Escape.
- Reduced motion : zéro animation en cours, y compris après le reveal du schéma.
- Aucun élément vidéo ni source média chargée ; ratio et placeholder conservés.

Le schéma mobile conserve titres, descriptions et badge de validation dans un ordre vertical lisible, plutôt que des nœuds desktop miniaturisés. À très petite largeur, le widget flottant peut couvrir temporairement quelques lignes au bas de l’écran ; le contrôle de masquage reste disponible. Les détails natifs des offres conservent leur comportement clavier.

SEO : title, description, canonical et hiérarchie restent spécifiques à la page. Liens vers routes existantes et contact, aucune nouvelle destination commerciale fictive. Le maillage entrant depuis la Home/Header reste à décider : la page n’a pas encore été raccordée à ces entrées. Pas de données structurées commerciales inventées.

Contrastes principaux conformes aux objectifs internes vérifiés lors de la livraison : muted/fond clair 4.51:1, muted/blanc 4.76:1, blanc/bleu profond 4.71:1 et cyan/nuit 11.82:1. Les schémas utilisent du texte en plus des couleurs ; robot décoratif avec alt vide. Ces contrôles ne constituent pas un audit exhaustif des contrastes composités ou d’un lecteur d’écran.

TypeScript et build réussis. Build réalisé avec une valeur Resend de validation limitée au processus, comme précédemment ; `.env` et API contact non modifiés. La route reste statique, environ 3.56 kB / 107 kB First Load JS d’après Next.js. Pas de nouvelle dépendance, de boucle JS permanente, de média lourd ou de catalogue hydraté côté client. Tests chat et catalogue également exécutés pour vérifier les non-régressions.

### Réutilisation et réserves

Confirmés : SystemFlow pour des séquences explicatives, Reveal pour une entrée ponctuelle, MotionVideo pour un média choisi, ChatTrigger pour les intents existants et détails HTML natifs pour les limites d’offre.

Ne pas généraliser : les onze sections telles quelles, les six étapes de qualification commerciale, la palette dark à chaque moment fort, le robot dans toutes les familles et un placeholder vidéo sur chaque page. La grille en deux rangées nécessite un ordre explicite ; préférer une autre composition si le parcours impose des branches ou retours.

À valider : vidéo réelle avec poster/transcription, références documentées, longueur éditoriale avec des prospects, visibilité du logo carré dans le header, raccordement du maillage entrant, Safari/Firefox, appareils physiques, zoom/clavier virtuel et mesures terrain. Aucun score Lighthouse ou résultat Core Web Vitals n’est revendiqué par cette revue.

## Intégration du motion design réel — 3 octobre 2026

Cette section remplace les réserves historiques sur l’absence de média dans cette page. La Home Premium V2 reste inchangée.

### Média et poster

- MP4 déjà présent : `public/videos/automatisation.mp4`, **8 601 434 octets** (8,60 Mo). Aucun déplacement ni transcodage.
- Durée lue dans Chromium : **25,728 secondes** ; dimensions **1920 × 1080**, ratio 16:9.
- SHA-256 avant/après : `93b2beb330a736bc156c255116166b20fdbce7947d2cea56324d421e8a799b8a`.
- Poster créé : `public/videos/automatisation-poster.webp`, **31 134 octets** (31,1 ko), **1280 × 720**.
- Frame réelle à **6,432 secondes**, montrant CODE-V au centre des connexions entre site, emails, CRM, réseaux sociaux, facturation et automatisations. Export WebP qualité 82 % depuis le décodage du média original, sans image générée ni modification du film.

### Composition et lecteur

Le split éditorial est conservé, avec davantage de place pour le média sur desktop. Une surface nuit, une bande de contexte, une bordure fine et une ombre placent la vidéo dans la composition. Sur mobile, le texte prépare la lecture puis le cadre se déploie sur la largeur disponible. Le ratio est réservé avant le chargement du poster et pendant la lecture.

MotionVideo existant reçoit les chemins réels, le titre **« Automatisation & intelligence artificielle »**, le mode `explainer`, les contrôles natifs et un aspect ratio 16:9. Lecture volontaire, sans autoplay, `playsInline` et `preload="none"`. Le son n’est activé que par cette lecture volontaire et reste contrôlable par les commandes natives. Aucun MP4 demandé avant l’activation du bouton Lire ; le poster est lazy.

Deux améliorations ciblées du composant existant : ne pas superposer les décorations du placeholder à un vrai poster ; donner le focus au lecteur après une lecture volontaire avec contrôles, pour permettre immédiatement la pause au clavier. Un libellé optionnel pour l’équivalent textuel distingue ici une description de la vidéo d’une transcription audio. Les utilisations sans média de la Home conservent leur rendu et leur comportement.

Le texte expose le sens du film et précise que ses compteurs sont des données de démonstration, pas des résultats clients ou des garanties. Une description textuelle dépliable rend le scénario accessible sans lecture du média. Pas de page vidéo ni de VideoObject ajouté ; métadonnées de publication non définies.

### Contrôles

TypeScript et build réussis, aucune dépendance ajoutée. Chromium sur un build de production compilé dans un répertoire temporaire distinct, **320 / 375 / 768 / 1024 / 1440 px** :

- Poster décodé, dimensions 1280 × 720, ratio identique au film.
- Aucune requête MP4 au chargement de page ni en affichant le poster ; chargement seulement après lecture.
- Lecture du média réel, durée 25,728 s, sans erreur média ou JavaScript.
- Contrôles natifs présents, playsInline, preload none et autoplay false confirmés.
- Activation par Enter, focus transmis au lecteur et pause par Espace.
- Aucun débordement horizontal ; différence de hauteur de section avant/après lecture : **0 px**. Ce contrôle de stabilité n’est pas une mesure de Core Web Vitals terrain.
- Reduced motion : aucune animation active ; lecture manuelle conservée, test initial en mode réduit à 375 px.
- Captures de section desktop et mobile inspectées ; petit espacement du titre mobile et contraste de légende corrigés.

Une clé Resend de validation est injectée uniquement dans le processus de build, comme aux étapes précédentes. `.env` et API inchangés ; aucun message envoyé. Safari/iOS et appareils physiques restent à vérifier avant publication.

Fichiers modifiés : page et CSS Automatisation & IA, MotionVideo.tsx, ce document. Fichier créé : automatisation-poster.webp. Le MP4 est réutilisé sans modification. Aucune modification de Home, Header/Footer, catalogue ou logique chatbot.

