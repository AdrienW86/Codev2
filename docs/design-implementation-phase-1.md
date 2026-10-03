# CODE-V — Implémentation design V2, phase 1

Date : 3 octobre 2026. Implémentation dans le code de production, à partir de la Home V2, du design system et des assets officiels.

## Périmètre livré

Header et Footer utilisent directement le logo horizontal officiel dark avec ses proportions intrinsèques. Le header reste en haut de page, sans sticky ni nouveau comportement de scroll. Navigation, dropdown et menu mobile gagnent en lisibilité, dimensions tactiles, focus et transitions. Les destinations existantes sont conservées.

La Home conserve son récit, sa courbe conceptuelle et ses leviers connectés. Typographie responsive plus affirmée, interlignes plus ouverts, espaces de section fluides, CTA principal bleu profond à texte blanc, contraste des petits textes renforcé. La carte signature utilise une surface nuit plus nette, sans backdrop-filter. Les pills sont dégagées du contenu du graphique et retirées sur petit écran.

Les expertises alternent texte et média : interface claire pour Web, étapes soulignées pour Acquisition, décalages éditoriaux pour Contenu, modules connectés pour Automatisation. Les objectifs restent des lignes interactives ; méthode et flux restent des sections narratives. La conclusion devient un moment dark. Les couvertures provisoires de cas portent le logo officiel et restent explicitement provisoires ; aucun cas ou résultat n’est inventé.

Le chatbot reçoit un launcher compact, l’avatar officiel, un header identifié CODE-V, des messages lisibles, des champs/contrôles plus confortables et un panneau borné au viewport. Le bouton de masquage est séparé du launcher après correction d’un chevauchement détecté en tablette. Les assets sont statiques : aucune modification ni animation du robot officiel.

Les fonctions de requête, intents, modèle, API, historique, gestion des erreurs, messages de bienvenue, événements d’ouverture et états conversationnels sont conservés. Les modifications TSX du chatbot concernent uniquement ses assets et son rendu de header.

## Fichiers concernés

Modifiés :

- `src/app/globals.css` : tokens officiels avec alias historiques, durées/easing, boutons, focus, logos, footer et reduced motion global.
- `src/components/Header.tsx` et `header.module.css` : logo, finition de navigation et menu.
- `src/components/Footer.tsx` : logo et accès directs aux expertises présentes dans la Home.
- `src/components/home/Home.tsx` et `home.module.css` : compositions, rythme, typographie, emplacement motion et styles différenciés.
- `src/components/home/CaseStudies.tsx` : logo officiel des couvertures provisoires.
- `src/components/home/Reveal.tsx` : réexport compatible de la primitive commune.
- `src/components/RobotAssistant/RobotAssistant.tsx` et `robotAssistant.module.css` : rendu visuel et styles uniquement.

Créés :

- `src/components/motion/Reveal.tsx`
- `src/components/motion/motion.module.css`
- `src/components/media/MotionVideo.tsx`
- `src/components/media/motionVideo.module.css`
- Ce compte rendu.

Aucun changement du catalogue, des assets de marque, des routes historiques ou des APIs dans cette phase. Les changements déjà présents dans ces fichiers avant la phase restent indépendants de cette livraison. Aucune dépendance ajoutée au projet ; outils de contrôle installés dans un dossier temporaire.

## Animation

Tokens : micro-interaction 180 ms, panneau 240 ms, reveal 450 ms, easing `cubic-bezier(.2,0,0,1)`.

Reveal générique via IntersectionObserver : contenu visible sans JavaScript, déplacement 10 px, opacité .7 → 1, une seule apparition. Option stagger 70/140/210 ms. L’ancienne entrée de composant Home reste compatible par réexport. Les changements de préférence reduced motion sont observés.

Tracé de la courbe : 1.3 s, nœuds séquencés ; flux : séquences finies, suppression des boucles infinies. Halo et pills statiques. Boutons : mouvement de hover léger et active discret. Panneau et menu : entrée courte. Reduced motion désactive animations, transitions et smooth scroll, y compris les animations retardées.

## Système vidéo

`MotionVideo` propose `src`, `poster`, `title`, `mode`, `autoplay`, `muted`, `loop`, `controls`, `className`, `aspectRatio`, `captions` et `transcript`.

Modes : feature, inline, explainer, case-study et loop. Ratio réservé 16:9 par défaut, figure/légende sémantiques, poster lazy, fallback neutre en absence de source ou sur erreur, sous-titres VTT et transcription optionnels. Aucune vidéo factice.

Source chargée au clic ; `preload="none"`, `playsInline`. Autoplay limité au mode loop explicitement demandé et muet, sous conditions de viewport, document visible, mouvement autorisé et absence d’économie de données détectable. Pause hors viewport/onglet masqué et prise en compte de la pause utilisateur. Bouton de lecture/pause si les contrôles natifs sont retirés.

La Home présente un seul emplacement feature neutre pour une future séquence système CODE-V. Le même composant permet ensuite signature, acquisition, automatisation/IA et démonstration de cas, sans multiplier aujourd’hui les lecteurs. Aucune source vidéo chargée dans la Home et aucune vidéo dans le hero. La vidéo existante est utilisée uniquement dans le banc de test local, pas raccordée arbitrairement au site.

## Validation réalisée

### Compilation et régressions

- `npx.cmd tsc --noEmit --incremental false` : réussi ; vérification TypeScript également réalisée par le build.
- `npm.cmd run build` : compilation, types et génération des 14 sorties réussis. Home : environ 8.8 kB de route et 112 kB de First Load JS selon Next.js ; ces valeurs ne constituent pas des mesures Core Web Vitals.
- Le build initial sans variable Resend a échoué à la collecte de `/api/contact` : cette route initialise Resend sans clé disponible. Validation réalisée ensuite avec `RESEND_API_KEY=re_build_validation_only` dans le processus de build uniquement. Aucun email envoyé, aucun `.env` ni code API modifié ; cette valeur n’est pas une clé d’exploitation.
- `node.exe tests/chat-route.cjs` : réussi, API OpenAI simulée, quatre intents, historique, requête historique, modèle et validation.
- `node.exe tests/service-catalog.cjs` : réussi, 32 prestations et neuf familles.

### Contrôles navigateur réels

Chromium via Playwright, serveur de production local, largeurs 320, 375, 768, 1024 et 1440 px, hauteur de référence 900 px :

| Contrôle | Résultat |
| --- | --- |
| Débordement horizontal du document | Aucun aux cinq largeurs |
| Panneau chatbot dans le viewport | Oui aux cinq largeurs |
| Ouverture assistant et fermeture Escape | Fonctionnelles, focus rendu au launcher |
| Menu mobile au clavier, Enter/Tab/Escape | Fonctionnel aux largeurs mobiles/tablette testées, focus rendu au bouton |
| Reduced motion | Zéro animation en cours après activation aux cinq largeurs |
| Vidéo chargée initialement dans la Home | Aucune |
| Erreurs JavaScript sur le premier parcours responsive | Aucune détectée |

Captures hero, chatbot, expertise et footer examinées. Les contrôles ont révélé puis permis de corriger le chevauchement du bouton de masquage, les pills devant les libellés et les animations retardées encore présentes en reduced motion. L’alternance des expertises a été adaptée au réexport de Reveal.

Test isolé du composant vidéo avec le média existant : absence de vidéo avant clic, lecture volontaire réelle, preload none, autoplay bloqué avec reduced motion, lecture lorsque autorisée et pause après sortie du viewport. Le banc n’ajoute aucune route ni fixture au site.

Ces contrôles ne constituent pas un audit exhaustif d’accessibilité, de compatibilité multi-navigateurs ou des performances terrain.

## Dette et recommandations

1. Choisir les séquences motion définitives, produire posters et versions mobiles, sous-titres/transcriptions, puis les raccorder aux emplacements utiles. Ne pas mettre la vidéo de 8.6 Mo dans le hero par défaut.
2. Préparer une variante robot animable dédiée si un mouvement est souhaité ; garder les fichiers officiels inchangés.
3. Optimiser le chargement des deux polices : l’import Google Fonts historique est conservé. Évaluer `next/font` ou fonts locales dans une étape distincte.
4. Consolidation CSS à poursuivre : tokens V2 et overrides gardent la compatibilité avec les pages historiques ; supprimer leurs règles héritées seulement au fur et à mesure d’une migration vérifiée.
5. Mettre en cohérence éditorialement les quatre grands blocs actuels de la Home et les neuf familles du catalogue lors de la prochaine phase, sans transformer cette page en liste de 32 prestations.
6. Remplacer les dossiers de cas provisoires par des captures et résultats documentés, avec autorisations.
7. Compléter la recette par Safari/Firefox, appareils physiques, zoom et clavier virtuel, audit de contrastes composités et mesures terrain. Le contrôle actuel porte sur Chromium et les dimensions indiquées.
8. Configurer une véritable clé Resend avant exploitation du formulaire ; aucun changement de configuration n’a été fait dans cette phase.
