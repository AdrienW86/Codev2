# CODE-V — Direction artistique et design system V2

Statut : proposition à valider avant implémentation. Date : 3 octobre 2026.

Ce document définit le système visuel. Il ne modifie aucune page, route, feuille de style, dépendance, donnée commerciale ou logique du chatbot. La Home V2 reste le point de départ. Les noms de tokens, APIs et exemples ci-dessous sont des spécifications futures, pas des composants déjà disponibles.

## Analyse de l’existant

Sources examinées : `src/app/globals.css`, `src/app/layout.tsx`, `src/components/home/Home.tsx`, `GrowthCard.tsx`, `Reveal.tsx`, `CaseStudies.tsx`, `home.module.css`, `src/components/Header.tsx`, `header.module.css`, `src/components/RobotAssistant/RobotAssistant.tsx`, `robotAssistant.module.css` et `robot.png`.

| Observation vérifiée dans les fichiers | Décision V2 |
| --- | --- |
| Palette principale déjà identique au brief ; bordure `#dfe7f1` | Conserver les neuf couleurs de marque et cette bordure neutre, centraliser les autres dérivés |
| Space Grotesk et DM Sans chargées par un import Google Fonts dans le CSS | Conserver les familles ; proposer un chargement optimisé lors de l’implémentation |
| Container 1180 px, gouttières desktop 40 px, sections 130 px, rayon 24 px | Garder ces proportions comme référence ; les inscrire dans une échelle responsive |
| Titres massifs, tracking jusqu’à −.055em et interligne .92 ; titres mobile jusqu’à 40 px | Préserver leur présence, relâcher légèrement le tracking/interligne pour les textes longs |
| Hero nuit, carte graphique inclinée, cyan, gradient bleu/cyan, halos et orbites | Conserver la composition et la courbe conceptuelle ; limiter les effets simultanés |
| La courbe annonce explicitement l’absence de données de performance client | Conserver cette distinction entre démonstration et résultats vérifiés |
| Home : flux, expertises alternées, objectifs en lignes, méthode ; pas seulement des cartes | Étendre cette variété, sans remplacer chaque section par une grille |
| Reveal observe le viewport, laisse le contenu visible sans JS, animation .65 s / 12 px | Conserver le principe ; harmoniser les durées et supprimer tout reveal pour reduced motion |
| Tracé 1.8 s ; halos 8 s ; flottements 7 s ; flux répété 5 s | Garder le tracé utile ; rendre les répétitions limitées ou contrôlables |
| Hover global bouton −2 px ; carte historique −8 px | Garder −2 px pour les CTA ; réduire les cartes à −2/−4 px maximum |
| Chatbot : robot 150 × 190 px, zoom 1.06, multiples boucles et teintes propres | Prévoir un déclencheur compact et des états discrets dans la palette commune |
| Couleurs chatbot `#27d980`, `#51d9f0`, `#9fd8e8`, `#e7faff` ; neutres Home `#acb9ca`, `#b4c0d0`, `#c4cfdd` | Remplacer ultérieurement les accents isolés par les tokens cyan/bleu et leurs opacités ; consolider les neutres |
| Hover bleu `#649aff`, teintes pâles `#eef3fb`, `#eef4ff`, `#e9f6f5` | Produire les variations par mélange/opacité des couleurs de marque |
| Header : marque géométrique en CSS et texte, pas un fichier de logo robot | Ne pas présenter ce signe comme le logo original vérifié |
| `robot.png` : personnage métallique souriant dans un décor, image raster inspectée | Référence disponible, mais pas master vectoriel du logo ; conserver avant validation des déclinaisons |
| `public/videos/code-v-final.mp4` : 8 601 434 octets ; pas de poster identifié dans les assets inspectés | Vidéo disponible à qualifier ; ne pas la mettre automatiquement dans le hero. Durée, codec, son et contenu non audités ici |
| Études de cas Home encore provisoires | Le système prévoit des médias et preuves réels, sans fabriquer captures, avis ni chiffres |

Lors de l’analyse initiale, les fichiers vectoriels n’avaient pas été identifiés. Les assets désormais présents dans `public/brand/` sont officiellement la source de vérité visuelle, conformément à la décision utilisateur. Le signe CSS du header et l’ancienne illustration `robot.png` ne constituent plus des références de marque pour les futures intégrations. Leur affichage actuel reste inchangé à cette étape.

## Référentiel officiel des assets de marque

Les fichiers existants sont adoptés tels quels : aucune recréation, conversion, recoloration ou modification de leurs proportions. Tous les chemins publics commencent par `/brand/` ; les fichiers sources se trouvent dans `public/brand/`.

| Fichier | Rôle officiel | ViewBox / ratio intrinsèque |
| --- | --- | --- |
| `code-v-logo.svg` | Logo principal complet, version pour surface claire | 500 × 300 / 5:3 |
| `code-v-logo-dark.svg` | Logo principal complet sur fond nuit inclus | 500 × 300 / 5:3 |
| `code-v-logo-horizontal.svg` | Logo horizontal, header et espaces allongés sur clair | 520 × 150 / 52:15 |
| `code-v-logo-horizontal-dark.svg` | Logo horizontal sur fond nuit inclus | 520 × 150 / 52:15 |
| `code-v-robot.svg` | Robot officiel autonome sur clair ; sections IA/automatisation | 200 × 210 / 20:21 |
| `code-v-robot-dark.svg` | Robot officiel sur fond nuit inclus | 200 × 210 / 20:21 |
| `code-v-symbol.svg` | Symbole compact sur clair | 200 × 128 / 25:16 |
| `code-v-symbol-dark.svg` | Symbole compact sur fond nuit inclus | 200 × 128 / 25:16 |
| `code-v-favicon.svg` | Adaptation carrée du symbole pour favicon | 128 × 128 / 1:1 |
| `code-v-app-icon.svg` | Icône d’application dédiée | 512 × 512 / 1:1 |
| `code-v-chatbot-avatar.svg` | Avatar dédié du chatbot ; distinguer du logo complet | 256 × 256 / 1:1 |

Deux fichiers supplémentaires sont conservés : `code-v-wordmark.svg` et `code-v-wordmark-dark.svg`, 300 × 90 (10:3), signatures typographiques complémentaires. Ils ne remplacent pas automatiquement le logo complet ou horizontal.

### Usages et préservation

- **Header** : logo horizontal, variante selon surface. Le raccordement futur remplacera le signe CSS par le fichier officiel, sans reproduction en CSS.
- **Footer** : logo complet ou horizontal selon la place disponible, variante adaptée au fond.
- **Chatbot** : avatar dédié pour les petits formats ; robot officiel pour une représentation plus grande. Aucun raccordement ni changement fonctionnel maintenant.
- **Favicon** : `code-v-favicon.svg`, conçu à partir du symbole compact ; ne pas forcer le symbole rectangulaire dans un carré.
- **App icon** : `code-v-app-icon.svg`. Les éventuels exports PNG et variantes nécessaires aux plateformes seront préparés dans une tâche distincte depuis cet asset.
- **IA / automatisation** : robot si sa présence explique ou identifie l’assistant ; pas de répétition décorative dans toutes les sections.
- **Metadata / partage social** : logo officiel dans un visuel dédié respectant ses proportions. Les cartes sociales auront besoin d’un export raster adapté aux plateformes, non fourni à cette étape ; ne pas supposer que le SVG seul sera pris en charge.

Préserver `viewBox`, géométrie, espaces internes, couleurs, opacités et typographie du fichier. Afficher avec dimensions proportionnelles et `height: auto` ou `object-fit: contain` ; jamais `cover`, étirement indépendant, recadrage ou filtre de recoloration. Les variantes `-dark` comprennent effectivement un fond `#07111f` : ce ne sont pas simplement des versions inversées transparentes. Une utilisation sur une autre surface ne justifie pas d’en retirer le fond.

Logo lié à l’accueil : nom accessible « CODE-V — Accueil ». Logo informatif : alternative « CODE-V ». Robot ou symbole redondant avec un texte adjacent : alternative vide ; avatar dans un contrôle : nommer le contrôle. Ne pas faire dépendre le nom accessible du texte interne au SVG.

Les logos complets, horizontaux et wordmarks utilisent deux éléments `<text>` en Arial/Helvetica/sans-serif. Leur rendu dépend donc de la police disponible. Cette dépendance est conservée : ne pas remplacer leur typographie par Space Grotesk ni vectoriser approximativement les lettres. Si un master avec lettres en tracés est fourni ultérieurement, vérifier l’équivalence avant remplacement.

### Vérification de palette

Contrôle des 13 fichiers : XML SVG lisible, namespace SVG, `viewBox` présent, couleurs hexadécimales inspectées sans modification des fichiers. La casse des valeurs hexadécimales est sans effet.

| Couleur du design system | Présence dans les assets |
| --- | --- |
| `#07111f` | Présente dans les 13 fichiers |
| `#0e1c2e` | App icon et avatar chatbot |
| `#4f8cff` | Logos complets/horizontaux, wordmarks et avatar chatbot |
| `#356ee0` | Absente des assets ; couleur d’interface conservée, sans l’ajouter au logo |
| `#50e3c2` | Logos complets/horizontaux, robots, favicon, app icon et avatar |
| `#ffffff` | Présente dans tous les fichiers sauf le wordmark clair |

Aucune couleur hexadécimale extérieure à ces six valeurs n’a été détectée. Chaque déclinaison utilise un sous-ensemble de la palette : il n’est pas nécessaire d’y introduire les six couleurs. Les neutres de lecture et de fond du site restent des tokens d’interface, pas des couleurs à injecter dans les assets.

### Animation et fichiers manquants

Les logos officiels restent statiques et intacts. Une animation du robot nécessitera une **variante animable dédiée**, distincte des fichiers officiels, dérivée d’un master validé et conservant sa silhouette. Pas de morphing, modification des proportions, animation de parties du logo complet ou altération du symbole. Reduced motion affiche la variante statique ; la logique d’attente doit correspondre à un traitement réel.

Les **11 fichiers demandés sont présents** ; aucun ne manque. Ne sont pas fournis dans ce jeu : variante robot dédiée à l’animation, logo à lettres entièrement converties en tracés, favicon ICO/PNG de compatibilité, exports raster app icons et visuel social dédié. Ce sont des compléments futurs, pas des fichiers recréés à cette étape. Aucun changement de metadata, manifest ou favicon actif n’est effectué maintenant.

## 1. Philosophie visuelle

**Une ingénierie visible, portée par une composition de studio.** CODE-V combine une typographie expressive, des interfaces précises, des mouvements explicatifs et des preuves concrètes. La technologie se lit dans la structure et les interactions, pas dans une accumulation de néons.

Trois signatures : une grande proposition typographique ; un système graphique connecté bleu/cyan sur nuit ; une mise en scène de réalisations et de médias avec beaucoup d’espace. Le dark marque les moments structurants, les surfaces claires servent la lecture et la preuve. Éviter le tout-dark et l’alternance mécanique clair/sombre à chaque section.

Le hero Home conserve sa courbe, sa carte légèrement inclinée et ses leviers connectés. Sa typographie domine, le graphique accompagne. Toute autre grande page choisit une idée signature adaptée au sujet, pas une copie de cette carte.

## 2. Palette et harmonisation

| Token futur | Valeur | Rôle |
| --- | --- | --- |
| `--brand-dark` | `#07111f` | Hero, fonds structurants, texte sur cyan |
| `--brand-dark-soft` | `#0e1c2e` | Surfaces techniques, panneaux dark |
| `--brand-blue` | `#4f8cff` | Courbes, accents, surfaces interactives avec texte dark |
| `--brand-blue-deep` | `#356ee0` | CTA à texte blanc, liens sur blanc |
| `--brand-cyan` | `#50e3c2` | Signal, nœuds, accents sur nuit, surface à texte dark |
| `--brand-background` | `#f7f9fc` | Fond général clair |
| `--brand-white` | `#ffffff` | Surfaces et texte sur dark |
| `--brand-text` | `#122033` | Lecture principale sur clair |
| `--brand-muted` | `#64748b` | Texte secondaire sur blanc, à vérifier ailleurs |
| `--border-light` | `#dfe7f1` | Séparation décorative claire existante |

Les variables historiques `--dark`, `--blue`, etc. deviendront des alias de `--brand-*` pendant une migration progressive. Aucun renommage global brutal. Tokens sémantiques à ajouter ensuite : `--surface`, `--surface-raised`, `--text-primary`, `--text-secondary`, `--action`, `--focus`, `--border-interactive`.

Sur dark : texte principal blanc ; texte secondaire blanc à 72–80 % ; bordures décoratives blanc à 12–18 %. Sur clair : texte principal `brand-text`, secondaire `brand-muted`, liens `brand-blue-deep`. Les petites mentions ne descendent pas à 30–45 % d’opacité comme certains éléments historiques.

Surfaces teintées : mélange 4–8 % bleu/blanc ou cyan/blanc. Gradient signature : cyan → bleu, réservé à quelques mots du hero, tracés et médias. Le texte en gradient doit rester lisible sur toute sa longueur ; fournir une couleur unie de secours. Halo : bleu ou cyan à 8–16 %, un seul grand halo par composition, statique de préférence. Aucun nouveau hue par famille.

Attention : blanc sur `#4f8cff` ne convient pas au petit texte. Primary utilisera blanc sur `brand-blue-deep`, ou dark sur `brand-blue`. Cyan ne sert pas de petit texte sur blanc. Les états d’erreur, succès et attente utilisent libellé + symbole + contraste dans cette palette ; un indicateur vert ne doit pas laisser croire à une disponibilité humaine permanente.

## 3. Typographie

Titres : Space Grotesk, poids 500, ponctuellement 600. Texte : DM Sans, 400/500, labels 600/700. Fallbacks : Arial, sans-serif. Tailles en rem, base utilisateur conservée ; `clamp()` borne une progression fluide.

| Rôle | Taille proposée | Interligne | Tracking | Mesure maximale |
| --- | --- | --- | --- | --- |
| Display XL | `clamp(3rem, 1.8rem + 5vw, 6.5rem)` | 1.00 | −.045em | 11–13ch |
| Display | `clamp(2.75rem, 1.6rem + 4vw, 5.5rem)` | 1.02 | −.04em | 14ch |
| H1 | `clamp(2.5rem, 1.5rem + 3vw, 4.75rem)` | 1.06 | −.035em | 16ch |
| H2 | `clamp(2rem, 1.3rem + 2.5vw, 4rem)` | 1.10 | −.035em | 20ch |
| H3 | `clamp(1.5rem, 1.2rem + 1vw, 2rem)` | 1.20 | −.025em | 28ch |
| H4 | `clamp(1.125rem, 1rem + .5vw, 1.375rem)` | 1.30 | −.015em | 35ch |
| Body Large | `clamp(1.125rem, 1rem + .4vw, 1.25rem)` | 1.65 | 0 | 55ch |
| Body | `clamp(1rem, .96rem + .15vw, 1.0625rem)` | 1.70 | 0 | 65ch |
| Small | `.875rem` | 1.55 | 0 | 65ch |
| Eyebrow | `.75rem` | 1.4 | .10em | 35ch |
| Label | `.875rem` | 1.35 | .01em | Selon contrôle |

Le display est un rôle visuel, pas un niveau HTML supplémentaire. Un H1 par page, hiérarchie H2/H3 cohérente. Titres longs : mesure plus large ou taille H1, jamais réduction arbitraire sur mobile. Pas de saut de ligne forcé identique sur tous les écrans. Souligner un seul fragment stratégique, pas chaque mot. Métriques : chiffres tabulaires, unité et contexte lisibles.

## 4. Espacement et rythme

Échelle en px de référence, implémentable en rem : 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128, 160. Les valeurs servent des rôles, pas du remplissage.

| Usage | Mobile | Tablette | Desktop |
| --- | --- | --- | --- |
| Gouttière | 20 px, 16 à très petite largeur | 32 px | 40 px |
| Section majeure | 64–80 px | 96 px | 128 px |
| Moment signature | 80–96 px | 128 px | 160 px si nécessaire |
| Padding carte | 24 px | 24–32 px | 32 px |
| Titre → texte | 24 px | 24 px | 32 px |
| Texte → action | 24 px | 32 px | 32–40 px |
| Groupe → groupe | 40 px | 48 px | 64 px |

Container courant 1180 px conservé ; composition média large jusqu’à 1320 px ; lecture article 65ch, environ 720 px selon taille. Un contenu dense ne justifie pas de comprimer tous les espaces. Rayon principal 24 px, panneau secondaire 16 px, contrôle 12 px, pill 999 px.

## 5. Grilles et compositions

Grille desktop 12 colonnes, tablette 8, mobile 4 ; gaps 24/24/16 px. Ce sont des outils de composition, pas des colonnes imposées à tout contenu. Hero 6/6 ou éditorial 7/5 ; alternance texte/média 5/7 ; étude de cas 8/4 ; article : lecture centrale + sommaire latéral à partir de la largeur disponible.

Patterns : manifeste typographique ; texte/média asymétrique ; flux pleine largeur ; timeline ; capture commentée ; comparaison avant/après ; démonstration vidéo ; étude de cas à grande couverture ; liste éditoriale indexée ; CTA bref avec une action principale.

Chaque page majeure sélectionne une signature et trois à cinq patterns complémentaires. Deux sections consécutives ne doivent pas reproduire la même composition sans raison éditoriale. Les comparaisons privilégient les éléments mesurables et les limites réelles. Les compositions flottantes restent dans un parent aux dimensions réservées.

## 6. Boutons et liens

Pill conservée ; hauteur minimale 44 px, cible recommandée 48 px ; padding horizontal 24 px, gap 12 px. Un CTA principal par groupe, libellé décrivant l’action. Flèche SVG commune, pas de symbole différent à chaque endroit.

| Variante | Base | Hover |
| --- | --- | --- |
| Primary | Bleu profond, texte blanc | Même teinte légèrement assombrie, shadow bleu 12 % |
| Secondary | Surface claire, texte dark, bordure contrastée | Fond bleu 6 %, bordure bleu profond |
| Ghost | Transparent sur dark, texte blanc, bordure blanc 40 % | Blanc 8 %, bordure blanc 65 % |
| Dark | Nuit, texte blanc | Nuit douce, ombre discrète |
| Text link | Bleu profond sur clair ; cyan sur dark ; soulignement | Soulignement renforcé, flèche +2 px |

États communs : hover translateY −2 px maximum ; active translateY 0, scale .99 ; focus-visible anneau externe 2 px, offset 4 px, bleu profond sur clair/cyan sur dark ; disabled sans transformation, libellé identifiable, attribut natif pour les boutons. Les liens ne reçoivent pas une fausse désactivation ; supprimer l’action ou proposer un état explicite. Loading conserve la largeur, annonce l’attente sans cacher le libellé. Focus n’est jamais uniquement une animation.

## 7. Cards

| Variante | Fonction et composition |
| --- | --- |
| Service | Offre synthétique, problème/résumé et action ; illustration seulement si utile |
| Case study | Couverture dominante, contexte, intervention, preuve documentée ; ratio 16:10 |
| Article | Sujet, titre, date et temps de lecture seulement s’il est calculé ; média optionnel |
| Metric | Valeur, unité, période, source ; pas de chiffre inventé pour décorer |
| Dashboard | Vue explicative de données avec légende et alternative textuelle |
| Video | Poster au ratio réservé, titre, lecture explicite, durée si connue |
| Testimonial | Citation autorisée, personne/fonction/source ; pas de carrousel automatique |

Un seul traitement principal de surface par section. Bordure fine et rayon 24 px ; ombre de profondeur réservée aux éléments réellement flottants. Hover −2 px, exceptionnellement −4 px pour une couverture ; aucune carte non interactive ne simule une interaction. Un lien principal accessible ; ne pas imbriquer liens et boutons dans un lien englobant. Les détails longs relèvent d’une section éditoriale, pas d’une carte géante.

## 8. Iconographie

SVG sur grille 24 × 24, stroke 1.5–1.75, extrémités et jonctions arrondies, pas de dégradé ni d’ombre à cette taille. Variantes 16/20/24/32 px ; conserver la lisibilité du trait. Une seule famille géométrique, reprise ou dessinée avec les mêmes règles. Pas de nouvelle bibliothèque nécessaire pour quelques pictogrammes.

Dark sur clair, cyan/bleu sur dark selon contraste. Icône décorative masquée aux technologies d’assistance ; bouton icon-only nommé explicitement. Succès/erreur/attente distincts par forme et texte, jamais uniquement par couleur.

## 9. Illustrations et signatures graphiques

| Élément | Règle CODE-V |
| --- | --- |
| Graphique | Tracé cyan, repères bleu, remplissage faible ; courbe conceptuelle signalée ou données sourcées |
| Flux | Sens de circulation, étapes nommées, une liaison active à la fois |
| Nœud | Centre 8–12 px, anneau léger ; pas de constellation sans signification |
| Orbite | Une ou deux ellipses ; relation/coordination, pas rotation décorative permanente |
| Ligne | Sépare ou connecte ; alignement sur grille ; jamais parasite le texte |
| Interface | Capture réelle ou maquette explicitement illustrative, annotations courtes |
| Dashboard | Hiérarchie, unités, légendes, états ; pas de métriques factices crédibles |
| Tag | Taxonomie, statut ou levier ; bordure discrète, pas une action implicite |
| Halo | Accent de profondeur statique, limité derrière un média principal |

Privilégier SVG et CSS pour les schémas. Les captures montrent le travail réel et sont nettoyées des données privées. Varier orientation, densité, cadrage et narration selon la famille ; réutiliser les primitives, pas toute la Home. Aucun nouvel asset généré à cette étape.

## 10. Motion language

### A. Micro-motion

Confirmer un changement d’état : bouton, navigation, lien, panneau, focus, assistant. Durées 120 ms pour active, 180 ms hover, 240 ms ouverture/fermeture. Déplacement 2–4 px ; panneau 8 px maximum. Pas de bounce. Focus immédiat. `cubic-bezier(.2, 0, 0, 1)` pour entrée/changement ; sortie `cubic-bezier(.4, 0, 1, 1)`.

### B. Motion narratif

Expliquer une relation : acquisition → contact ; demande → workflow → résultat ; source → agent → validation ; mesure → décision. Tracé 900–1400 ms, révélation d’étape 300–450 ms, stagger 60–90 ms plafonné à 360 ms. Une séquence 2–4 s jouée une fois à l’entrée, avec relance explicite si utile. Ne pas utiliser une boucle pour prétendre que des données live arrivent.

### C. Motion vidéo

Présenter une réalisation, expliquer un procédé, démontrer un produit. Lecture choisie par l’utilisateur avec titre et poster. Les formats et contraintes sont définis dans la section suivante.

### Standards communs

| Paramètre | Standard |
| --- | --- |
| Scroll reveal | 400–500 ms ; 8–12 px ; une fois ; seuil indicatif .1 |
| Opacité | Contenu lisible par défaut ; effet discret .7 → 1 si JS activé ; pas de contenu caché en attendant le script |
| Scale | Micro .99 → 1 ; média 1 → 1.01 maximum ; pas de zoom de texte |
| Blur | Aucun blur animé sur texte ; grand halo statique, éviter d’animer le filtre |
| Stagger | 60–90 ms ; pas de longue attente avant le dernier item |
| Hover | Transform/opacité ; pas de resize, marge ou padding animés |
| Transition de page | Aucun blocage de navigation ; pas de rideau plein écran systématique |

CSS en premier ; SVG pour tracés ; Web Animations API pour séquences pilotables seulement si nécessaire. Aucun ajout de bibliothèque lourde prévu. Éviter `transition: all`, `will-change` permanent, animations de layout, grands filtres mouvants et scroll hijacking.

`prefers-reduced-motion` : aucun déplacement, dessin progressif, flottement, pulsation, smooth scroll ou loop autoplay. Afficher directement l’état final ; laisser les vidéos volontaires accessibles. Prévoir un contrôle de pause pour toute animation automatique prolongée ; politique CODE-V : limiter les séquences automatiques à 4 s ou fournir pause dès le départ. Les animations hors viewport et en onglet masqué s’arrêtent. Le contenu ne dépend jamais de leur fin.

Le hero conserve une entrée courte du texte et un tracé vivant joué une fois ; le glow reste subtil et statique. Les flottements historiques sont à rendre ponctuels, sans changer la composition.

## 11. Système vidéo

| Mode | Usage | Ratio et comportement |
| --- | --- | --- |
| `feature` | Grand moment CODE-V | 16:9 ; lecture volontaire ; poster soigné |
| `inline` | Illustration dans le récit | 16:9 ou 4:3 ; contrôle de lecture, largeur contenue |
| `case-study` | Démonstration d’un projet | Ratio réel réservé ; titre, contexte, légende |
| `explainer` | Service/processus complexe | 16:9 ; lecture volontaire, sous-titres et transcription |
| `loop` | Micro-processus visuel pertinent | 1:1, 16:9 ou vertical adapté ; 2–4 s ; léger et muet ; pause accessible |

API conceptuelle, non implémentée :

```tsx
<MotionVideo
  src="/videos/exemple.mp4"
  poster="/images/exemple-poster.webp"
  title="Comment une demande devient un workflow"
  mode="explainer"
  aspectRatio="16 / 9"
  captions="/videos/exemple-fr.vtt"
  transcript="..."
/>
```

Les chemins sont fictifs, à remplacer par les assets validés. `src`, `poster`, `title`, `mode` sont requis. Prévoir sources alternatives mobile/webm/mp4, dimensions, texte alternatif du poster et description du contenu visuel. Le mode ne déclenche pas automatiquement l’autoplay ; choix distinct soumis aux règles ci-dessous.

Contrat de comportement : conteneur `aspect-ratio` réservé ; poster responsive optimisé ; hors écran, source différée jusqu’à proximité du viewport ou au clic, `preload="none"` par défaut. `metadata` seulement pour une vidéo proche et pertinente, sans supposer qu’il n’y aura aucun téléchargement. Ne pas dépendre d’un attribut de lazy loading vidéo pour garantir ce comportement.

Si lecture volontaire : controls accessibles, aucune piste audio démarrée automatiquement, VTT et transcription pour la parole ; description/transcription pour l’information visuelle essentielle. Si autoplay exceptionnel : muted + playsInline, court, utile, refus possible du navigateur traité sans erreur ; pas d’autoplay avec reduced motion ou préférence économie de données détectable. Fournir lecture manuelle et fallback poster dans tous les cas.

Pause hors viewport et onglet masqué. Ne pas reprendre automatiquement une vidéo que l’utilisateur a mise en pause ; mémoriser qui a interrompu la lecture. Mobile : même vidéo disponible, source plus légère ou poster puis lecture, sans recadrage qui coupe des informations. Pas de téléchargement initial simultané de plusieurs vidéos.

Budgets internes proposés : poster ≤ 120 Ko mobile / 200 Ko desktop ; loop ≤ 500 Ko mobile / 1 Mo desktop et 720p généralement suffisant. Une vidéo feature longue est diffusée à la demande avec encodage adapté ; le budget s’évalue selon durée et qualité, pas un forfait de poids irréaliste. H.264 MP4 de compatibilité, WebM alternatif selon support ; streaming seulement si volume/durée le justifient.

La vidéo existante de 8.6 Mo doit être visionnée et caractérisée avant affectation à un mode, avec poster, durée, piste son, encodage et version mobile. Elle ne constitue pas aujourd’hui une loop légère prête pour le hero.

## 12. Chatbot et robot officiel

L’identité de référence est désormais le robot officiel `public/brand/code-v-robot.svg`, sa variante dark et l’avatar `code-v-chatbot-avatar.svg`. L’ancienne illustration raster avec décor n’est plus la référence à décliner. Utiliser les assets officiels existants sans redessiner la marque ; toute simplification ou animation supplémentaire nécessite un fichier dédié validé, sans modifier les logos sources.

| Niveau | Emplacement | Traitement |
| --- | --- | --- |
| Mini icon | Déclencheur et avatars | Tête/silhouette simplifiée fidèle ; avatar 24–32 px ; bouton 48–56 px |
| Standard | Header chatbot | Robot 40–48 px, nom CODE-V, statut textuel exact |
| Illustration | Empty state, IA/automatisation | 160–280 px, cadrage propre, sans décor générique imposé |

Métal/neutres, visage nuit, accents cyan/bleu ; géométrie fidèle, expression retenue. Clignement des yeux ponctuel à l’activation, 100–160 ms ; glow de focus 180 ms ; état de réflexion par trois points/texte, cadence discrète, pas de rebond du corps. Aucun mouvement permanent pour attirer l’attention ni « surprise » systématique. Ne pas afficher un état de réflexion sans requête réelle.

Panneau sur dark-soft ou blanc selon contexte, même typographie et contrôles que le site. Messages lisibles à 16 px ; bulle utilisateur bleu profond/blanc, assistant surface sobre ; erreurs accompagnées de texte et action. Sur mobile, panneau borné au viewport dynamique, clavier et safe areas pris en compte, fermeture toujours accessible. Préserver focus, retour au déclencheur, Escape et annonces existantes en les vérifiant avant migration. Aucun changement des intents, du modèle ou du comportement conversationnel dans ce document.

## 13. Responsive

Points de composition : 600 px et 900 px, cohérents avec la Home ; 1050 px pour ajustements intermédiaires. Desktop au-delà de 1050 : compositions asymétriques et média plein. Tablette : deux colonnes uniquement si chaque contenu reste lisible. Mobile : composition réécrite, ordre du récit conservé dans le DOM, actions prioritaires accessibles.

À 320–390 px : titre sans débordement, boutons empilables, labels sur plusieurs lignes, tags wrap, média width 100 %, `min-width: 0` sur enfants de grille. Aucun scroll horizontal de page. Les visualisations complexes deviennent étapes verticales ou détails progressifs, pas une miniature illisible. Les tableaux de données peuvent disposer d’un défilement local nommé et annoncé, avec résumé ; éviter cette solution pour le parcours principal.

Le hero mobile conserve courbe, typographie, CTA et signal cyan ; retirer d’abord les pills secondaires et le flottement si nécessaire. Vidéo avec poster conservée ; pas de suppression de preuves importantes. Moins de mouvement, mêmes exigences de composition. Tester zoom 200 %, largeur 320 px, portrait/paysage et clavier virtuel.

## 14. Accessibilité

Objectifs internes : contraste texte courant ≥ 4.5:1 ; grands textes ≥ 3:1 ; contrôles, frontières utiles et focus ≥ 3:1 contre le voisinage pertinent. Vérifier les couleurs compositées et gradients, pas uniquement les hex de base. Ces objectifs ne constituent pas un audit ni une déclaration de conformité.

Navigation clavier complète, ordre logique, skip link futur, focus visible non masqué, menu/dialogue ouverts et fermés au clavier avec retour du focus. Cible tactile 44 × 44 px minimum comme règle CODE-V, 48 px recommandés. États annoncés textuellement ; formulaires avec labels, erreurs liées au champ et instructions.

Images avec alt descriptif lorsqu’elles apportent une information ; alt vide pour décoration. SVG utile nommé, description textuelle ou tableau pour données significatives. Vidéo : sous-titres, transcription et description appropriée. Reduced motion dès le premier rendu lorsque possible ; pas de clignotement rapide. Ajouter `scroll-margin-top` pour ancres/sommaire sous header. Sémantique native avant ARIA.

## 15. Performance

Budgets internes proposés à valider par mesure, pas résultats annoncés : contenu initial hors vidéos volontaires ≤ 1 Mo transféré sur une page éditoriale ; JS initial compressé cible ≤ 150 Ko, avec revue des coûts du framework ; image LCP ≤ 200 Ko selon qualité ; pas de média vidéo dans la requête critique par défaut. Cibles de suivi : LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ .1, à évaluer sur données terrain lorsque disponibles et en laboratoire pour diagnostic. Aucun score actuel n’est revendiqué.

Composants serveur par défaut ; îlots clients limités à navigation, assistant, lecture et animation utile. Garder le reveal léger plutôt qu’une bibliothèque d’animation. Réserver dimensions images/vidéos, charger seulement l’image LCP en priorité, tailles responsive et formats adaptés. Les sources vidéo longues attendent l’action.

Proposer `next/font` ou fonts locales autorisées plutôt que l’import CSS externe ; conserver les deux familles, limiter graisses, ajuster fallback pour réduire le décalage. Aucun changement immédiat de dépendance. Un observer partagé si les médias deviennent nombreux ; nettoyage des listeners/observations. Éviter halos multiples, backdrop-filter sur grandes zones et calques GPU permanents.

Validation future : navigation sur mobile modeste, réseau limité, Lighthouse/DevTools, poids réseau réel, lecture/pause vidéos, JS désactivé et reduced motion. Une mesure laboratoire ne prouve pas seule la performance réelle des visiteurs.

## 16. Traitement des neuf familles

| Famille | Signature | Composition et motion | Média pertinent |
| --- | --- | --- | --- |
| Web & Applications | Interface en construction et architecture | Capture dominante + annotations ; apparition de composants une fois | Démonstration UI |
| Acquisition & Publicité | Trajectoire campagne → conversion | Graphique lisible + parcours ; tracé et étapes | Explainer ou cas campagne |
| SEO & Visibilité locale | Recherche et carte de présence | SERP illustrative nommée, carte/localisation ; repères progressifs | Cas local, capture annotée |
| Réseaux sociaux & Community management | Calendrier et formats publiés | Grand format vertical + séquence éditoriale ; cadence de publication expliquée | Reels et vidéos de réalisation |
| Contenu & Création | Composition en mouvement | Vidéo feature, grande typographie, storyboard ; motion montré dans le média | Motion design validé |
| Automatisation & IA | Flux source → traitement → validation | Nœuds et connexions orientés ; une donnée traverse une fois | Démonstration de workflow |
| Logiciels & Solutions métier | Dashboard et opération réelle | Interface métier + scénario utilisateur ; changement d’état utile | Démo produit, données anonymisées |
| Stratégie digitale | Roadmap et vue d’ensemble | Grande carte de priorités + étapes ; révélation de la hiérarchie | Présentation de démarche |
| Maintenance & Accompagnement | Monitoring et cycle de suivi | Timeline d’intervention + interface de supervision ; état documenté | Démonstration de suivi |

Même palette et mêmes composants de base pour toutes. Les graphiques de résultats exigent période, unité et source ; sinon, le schéma est nommé « illustration conceptuelle ». Pas de fausse SERP officielle ni de statut « 100 % disponible » décoratif. Les neuf familles peuvent être organisées éditorialement sans multiplier neuf styles autonomes.

## 17. Articles

Hero éditorial avec titre, chapô et informations réelles ; pas nécessairement dark. Colonne 65ch, Body 17–18 px selon contexte, interligne 1.75, sous-titres espacés. Sommaire sticky seulement sur grand écran, repliable et accessible sur mobile ; aucun recouvrement de lecture.

Images et graphiques avec légendes ; vidéos inline ; callout pour nuance, méthode ou décision, pas pour répéter le contenu. Code utile avec langage et copie accessible, débordement local maîtrisé. CTA discret à un moment pertinent ; services et articles liés sélectionnés selon le sujet, sans grille automatique de neuf offres. La page reste utile sans interaction ni animation.

## 18. Études de cas

Parcours : couverture réelle → contexte/problème → intervention et choix → grandes captures ou démonstration → timeline → stack pertinente → résultats documentés → témoignage autorisé → services liés et contact.

Capture large plutôt que mockup de laptop générique. Images annotées, comparaison clairement datée ; vidéo case-study à lecture volontaire. Mesures : unité, période, méthode/source et limites, séparation entre objectif et résultat. Stack explique les décisions plutôt qu’un mur de logos. Citation et identité seulement avec autorisation.

Les placeholders de la Home restent déclarés provisoires jusqu’à apport de matière réelle. Aucun résultat inventé pour remplir une metric card. Un projet sans mesure chiffrée peut démontrer une amélioration de parcours ou de processus documentée sans prétendre à un gain commercial.

## 19. Patterns à éviter

- Hero suivi de grilles identiques répétées ; tout mettre dans des cards.
- Stock photo technologique, laptop générique ou vidéo lourde remplaçant la courbe signature.
- Nouvelle palette par service, néons partout, glassmorphism sur chaque surface.
- Interface factice avec chiffres crédibles sans indication de démonstration.
- Mascotte infantile, gros robot flottant permanent, variations arbitraires du logo.
- Autoplay sonore, arrière-plan vidéo systématique, carrousel automatique, parallaxe de lecture.
- Contenu invisible avant hydration, navigation retardée par une animation, scroll intercepté.
- Typographie trop serrée, petits textes à faible opacité, focus retiré, composants seulement au hover.
- Menu à neuf familles illisible sur mobile ; palette utilisée comme seul indicateur d’état.

## 20. Ordre d’implémentation après validation

1. **Valider la direction** : palette, échelle typographique, rôle du graphique Home et alternance éditoriale. Les fichiers de `public/brand/` sont les références officielles ; préparer seulement les compléments nécessaires (variante animable dédiée, exports plateformes). Vérifier droits/fonts, vidéos et références disponibles.
2. **Centraliser les fondations** : tokens marque/sémantiques, alias de compatibilité, spacing, containers, typography et focus. Vérifier les anciennes pages avant migration ; pas de refonte globale implicite.
3. **Créer un terrain de revue isolé** : boutons avec tous leurs états, types de cartes, icônes, tags, compositions et schémas. Évaluer clavier, contraste et mobile avant raccordement aux pages.
4. **Harmoniser la Home V2** : conserver texte/composition/graphique comme référence ; mettre à niveau contrastes, motion et tokens progressivement. Ne pas remplacer la signature.
5. **Préparer les médias** : qualifier la vidéo existante, exporter posters et versions adaptées ; implémenter MotionVideo avec contrats de lecture, pause, accessibilité et chargement.
6. **Harmoniser navigation et assistant** : dimensions, couleurs, focus et avatar validé ; aucune modification conversationnelle induite par cette étape visuelle.
7. **Appliquer aux futures pages prioritaires** : une signature par famille, sections adaptées à l’offre ; architecture et routes à traiter dans une tâche distincte.
8. **Décliner articles et cas** : partir de contenus/réalisations réels, puis intégrer preuves, captures et médias.
9. **Recette et mesure** : responsive, clavier, zoom, reduced motion, panne/absence JS, vidéo et budgets réseau. Corriger avant déploiement ; documenter les résultats mesurés.

La validation porte maintenant sur ce document. Aucun fichier de production n’est modifié à cette étape, aucun composant vidéo ni nouvel asset n’est créé.
