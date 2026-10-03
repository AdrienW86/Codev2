# Home et navigation — Passe premium V2

Date : 3 octobre 2026.

## Compositions transformées

| Avant | Après | Raison du layout |
| --- | --- | --- |
| Hero long, carte inclinée et pastilles | Trois lignes typographiques masquées, grande trajectoire SVG, module d’interface au premier plan | Donner une direction forte dès l’entrée, avec une profondeur lisible |
| Bande et leviers numérotés | Manifeste typographique, deux colonnes décalées et ligne de passage | Poser le problème avant de présenter les solutions |
| Quatre étapes de système alignées | Diagramme circulaire autour de l’activité, en split avec le récit | Montrer la complémentarité sans une nouvelle liste |
| Quatre expertises successives, toutes construites de la même façon | Explorateur interactif des neuf familles et visuel contextuel | Donner un accès réel aux solutions sans afficher les 32 prestations |
| Vidéo et texte en deux cartes | Scène grand format, bande de régie, titre éditorial et chevauchement avec la section suivante | Faire du média une articulation de page |
| Deux dossiers clients provisoires en cartes | Grand texte de preuve et demande explicite de références | Éviter d’habiller des contenus non documentés comme des cas clients |
| Méthode numérotée | Timeline reliée et récit fixe sur desktop | Garder la progression, retirer la mécanique de liste |
| Objectifs numérotés et second CTA final | Grand bloc de conversation, choix courts et contact direct | Donner plusieurs points d’entrée sans refaire une liste de prestations |

Aucune numérotation décorative conservée sur la Home. Les Server Components portent le contenu ; l’explorateur est un petit Client Component à état local. Aucun changement d’API ou d’intent chatbot. Aucune page service créée ou modifiée.

## Navigation et destinations

`src/data/navigation.ts` est la table partagée par Header et explorateur. Les noms et intents viennent des neuf familles du catalogue ; seuls descriptions de navigation et chemins publiés sont définis dans cette table. Les slugs proposés du catalogue ne deviennent pas des routes implicitement.

Anciennes ancres retirées du Header : `/#realisations`, `/#methode`, `/#acquisition`, `/#contenu`, `/#automatisation`. L’ancre locale `#approche` de l’ancien hero a aussi disparu. Deux liens de Footer ont été corrigés à cause de la disparition des sections visées ; son design est conservé.

| Entrée | Destination réelle |
| --- | --- |
| Logo | `/` |
| Web & Applications | `/solutions/web-applications` |
| Acquisition & Publicité | `/publicite` |
| SEO & Visibilité locale | `/referencement` |
| Réseaux sociaux & Community management | `/contact?service=social-management` |
| Contenu & Création | `/contact?service=content-production` |
| Automatisation & IA | `/solutions/automatisation-ia` |
| Logiciels & Solutions métier | `/contact?service=business-tool` |
| Stratégie digitale | `/contact?service=digital-strategy` |
| Maintenance & Accompagnement | `/contact?service=website-care` |
| Réalisations | `/contact?objectif=realisations` — demande de références |
| Ressources | `/facebook` — publications et actualités existantes |
| À propos | `/qui-sommes-nous` |
| Contact / CTA principal | `/contact` |

**Limite éditoriale explicite :** il n’existe pas de page portfolio ni de centre de ressources. Le title du lien Réalisations annonce la demande de références ; celui de Ressources annonce le fil Facebook. Les familles sans page dédiée sont signalées « Échange de cadrage » dans le menu et « Échanger sur ce besoin » dans l’explorateur. Aucun contenu client, média ou résultat fictif. Les paramètres contact existent dans l’URL mais le formulaire actuel ne les préremplit pas : son comportement n’est pas modifié ici.

## Motion

- Hero : révélation par masque des trois lignes, 950 ms et décalage de 130 ms ; contenu et actions arrivent par plans.
- Trajectoire SVG : tracé en 2,2 s, points puis libellés ; aucun indicateur de performance inventé.
- Surface graphique : entrée en profondeur, 1,2 s ; hover de quelques degrés et déplacement de 6 px.
- Halo et atmosphère : entrée limitée à 3–4 s, aucun mouvement permanent.
- Diagramme système : anneaux construits et libellés décalés à l’entrée dans le viewport.
- Ligne de continuité : tracé ponctuel entre manifeste et système.
- Explorateur : transition courte du contenu, assemblage d’interface ou construction des anneaux selon l’univers choisi.
- Méthode : repères lumineux ponctuels sur une ligne continue ; titre fixe seulement lorsque la largeur le permet.
- Menu : déploiement par masque, chevron d’état, hover et focus natifs.
- CTA : déplacement court, variation de surface et focus visible.

Reveal reste inchangé : IntersectionObserver, entrée unique, contenu accessible sans JS. Pas de bibliothèque d’animation, de boucle requestAnimationFrame, d’écouteur de scroll ou de vidéo en autoplay. `prefers-reduced-motion` supprime animations et transitions, laisse la trajectoire complète et conserve tous les contrôles.

## Mobile

Le menu devient un panneau dans la largeur disponible, scrollable verticalement ; les familles sont une colonne sur petit écran, deux sur tablette. Le focus suit l’ordre du DOM. Escape ferme Solutions puis, si nécessaire, le menu mobile et rend le focus au déclencheur.

L’explorateur devient une bande de sélection horizontale, scrollable au clavier et au toucher ; le texte du besoin passe avant le visuel à 480 px et moins. Les neuf boutons restent nommés, avec `aria-pressed`, et un lien réel suit chaque sélection. Le graphique hero est redimensionné et simplifié dans sa disposition ; la timeline abandonne le sticky. Les cadres vidéo gardent leur ratio.

## Validation

- TypeScript : `npx.cmd tsc --noEmit --incremental false` réussi.
- Build : `npm.cmd run build` réussi. Route Home statique, 4,59 kB / First Load JS 108 kB ; ancien build Home 8,84 kB / 112 kB. Ce sont les tailles rapportées par Next.js, pas des mesures Lighthouse ou terrain.
- Une valeur Resend de validation est injectée uniquement dans le processus de build pour l’API Contact existante. Aucun envoi, aucune modification de `.env`.
- Tests catalogue : 32 services, neuf familles, liens complémentaires et prix validés absents ; réussis.
- Tests backend chatbot : quatre intents, historique et validation ; réussis avec OpenAI simulé. Aucun appel commercial réel pour ces contrôles.
- Chromium sur copie temporaire du build de production : 320 / 375 / 768 / 1024 / 1440 px, hauteur 900.
- HTTP 200, aucun débordement horizontal de document, avec menu ouvert comme fermé et après toutes les sélections.
- Les neuf familles peuvent être sélectionnées ; leurs liens, ceux du Header et les autres liens internes de la Home sont contrôlés par requêtes HTTP.
- Menu et explorateur : Enter et Tab, Escape, focus restitué. CTA chatbot automation : ouverture, fermeture et focus restitué, sans changer sa logique.
- Animations d’entrée détectées en mode normal ; aucune animation active en reduced motion. Aucune erreur JavaScript pendant le parcours.
- Contrastes principaux : muted sur fond clair 4,51:1 ; muted sur blanc 4,76:1 ; texte secondaire sur nuit 10,41:1 ; cyan sur nuit 11,82:1 ; blanc sur bouton bleu profond 4,71:1. Les petits textes bleus sur fond clair sont légèrement assombris par mélange avec la nuit pour dépasser 4,5:1.
- Un H1, titres de section explicites, SVG conceptuel nommé, décorations masquées aux lecteurs d’écran, contrôles natifs. Pas de faux boutons dans les illustrations.

Captures de validation :

- [Home desktop complète](qa/home-premium-v2-desktop.png)
- [Home mobile complète](qa/home-premium-v2-mobile.png)
- [Menu Solutions desktop](qa/home-premium-v2-menu.png)

## Points restant à décider

Valider la direction artistique visuellement. Fournir une séquence motion approuvée, puis poster, sous-titres et transcription. Décider séparément du portfolio et du centre de ressources, puis remplacer leurs destinations de transition. Ajouter des études de cas sourcées et vérifier Safari/Firefox, appareils physiques et performances terrain avant publication.

## Fichiers de cette passe

Modifiés : Header.tsx, header.module.css, Home.tsx, GrowthCard.tsx, home.module.css. Footer.tsx : seulement deux destinations de navigation.

Créés : src/data/navigation.ts, src/components/home/SolutionExplorer.tsx, ce document et trois captures QA.

Réutilisables : navigation des familles, explorateur à données, Reveal, MotionVideo, ChatTrigger. Spécifiques : trajectoire du hero, manifeste, diagramme circulaire, composition vidéo et textes éditoriaux. Ne pas recopier ce langage graphique sur chaque famille service.

