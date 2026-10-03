# Avis Google — intégration CODE-V

## Source et données

Huit avis transmis explicitement par l’utilisateur le 4 octobre 2026. Source de vérité : `src/data/reviews.ts`. Les textes, auteurs, notes et mois de visite sont conservés tels que fournis, ponctuation comprise. Les mois de visite ne sont pas convertis en dates de publication ni complétés par un jour inventé.

Catégories : web, seo, ads, maintenance, strategy. Les sélections par identifiants préservent l’ordre éditorial ; un helper de catégorie prépare notamment les usages de stratégie. Aucun projet client, contrat de maintenance, résultat chiffré ou association à une réalisation n’est inféré.

Pas d’URL publique Google Reviews trouvée dans les fichiers examinés : mention « Avis Google » sans lien. Aucun lien fabriqué, avatar, photo ou note globale calculée. Aucun Review/AggregateRating JSON-LD ajouté.

## Composant

`ReviewsSection` est un composant serveur commun : reviews, heading, eyebrow, variant, maxItems, compact. Variantes featured (grande citation et secondaires), compact (bloc réduit), inline (citation dans le parcours). Pas de carrousel, interaction, animation, requête externe ou nouvelle dépendance.

Structure sémantique : section nommée, figure, blockquote et figcaption. Les étoiles visuelles sont masquées aux lecteurs d’écran ; le libellé « 5 sur 5 étoiles » est disponible. Auteur, source et visite restent en texte. Pas d’information transmise uniquement par la couleur.

## Sélections et emplacements

| Page | Avis | Placement |
| --- | --- | --- |
| Home | Gaston Barreau, Pierre Louis, Olivier Garnier | Après les réalisations, avant la méthode |
| `/creation-site` | Gaston Barreau, Jérémie Lagrange, Pierre Louis | Après les réalisations, format condensé |
| `/referencement` | Stéphane Sivan | Après la réalisation web, citation inline |
| `/publicite` | Olivier Garnier | Après les leviers complémentaires, citation inline |
| `/maintenance-site` | André Picard, Pierre Louis | Après la réalisation web, avant FAQ, format compact |

René Rivière et Philippe Voisin sont enregistrés pour une future page Stratégie ; aucune page créée ici. Les citations SEO et Ads sont des retours attribués aux clients, sans extrapoler classement, ROAS, CPL ou volume. Les citations maintenance ne constituent pas une déclaration de contrat.

## Validation

`node tests/reviews.cjs` : huit identifiants uniques, auteurs/textes renseignés, notes entières de 1 à 5, catégories et mois valides, sélection et citations clés contrôlées. TypeScript et build isolé de production réussis.

Chromium : les cinq pages aux largeurs 320, 375, 768, 1024 et 1440, sans débordement horizontal. Textes comparés exactement aux données, auteurs et dates contrôlés. Clavier, focus visibles et reduced motion vérifiés ; aucune animation ajoutée au composant. Aucun Review/AggregateRating dans les JSON-LD, aucune erreur JavaScript. Quarante destinations internes de page vérifiées, ancres comprises, sans lien cassé. Captures des blocs desktop/mobile inspectées. Les styles du composant sont protégés des titres génériques des pages pour conserver les formats compacts.

## Fichiers

- Créés : `src/data/reviews.ts`, `src/components/ReviewsSection.tsx`, `src/components/reviews.module.css`, `tests/reviews.cjs`, ce document.
- Modifiés : `src/components/home/Home.tsx`, `src/app/creation-site/page.tsx`, `src/app/referencement/page.tsx`, `src/app/publicite/page.tsx`, `src/app/maintenance-site/page.tsx`.

Les seules modifications des cinq pages sont les imports et l’insertion du composant contextuel. Pas de changement de Header, Footer, catalogue, chatbot ou données Facebook.
