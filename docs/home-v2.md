# Home V2 — périmètre et suite

## Base conservée

Next.js 15.4.10, React 19.1.0, TypeScript 5.8.3. Aucun ajout de dépendance.
`globals.css` conserve les tokens, Space Grotesk / DM Sans, les primitives et les styles des pages secondaires. Les nouveaux styles sont dans des CSS Modules.
La courbe SVG du hero, son remplissage, le verre léger, les pills, le glow et les orbites sont conservés. Les chiffres de démonstration ont été retirés.

Composants partagés : Header, Footer, PageHero, ServiceCard, ContactForm et RobotAssistant. Seuls Header et Footer évoluent pour la navigation ; le formulaire et les pages secondaires restent inchangés.

## Inventaire des routes

| Route conservée | Rôle |
| --- | --- |
| `/` | Home V2 |
| `/creation-site` | Web existant |
| `/referencement` | SEO existant |
| `/publicite` | Publicité existante |
| `/facebook` | Actualités Facebook |
| `/qui-sommes-nous` | Studio |
| `/contact` | Formulaire existant |
| `/mentions-legales` | Mentions légales |
| `/api/chat` | Assistant |
| `/api/contact` | Envoi du formulaire |
| `/api/facebook-feed` | Feed Facebook |

Aucune suppression ni redirection. La Home possède ses propres metadata, Open Graph et canonical `https://www.code-v.fr/`. Les metadata des autres pages sont inchangées. Aucun sitemap ni robots dédié n'était présent dans cette base.

Avant production : inventorier les URLs actuellement indexées du domaine et faire leur correspondance avec les routes. Toute URL remplacée devra recevoir une redirection permanente vers une destination pertinente ; compléter sitemap et robots lors de cette migration.

## Contenus provisoires

- Les deux réalisations sont des placeholders éditoriaux explicites, sans client ni résultat annoncé. `CaseStudy` prévoit secteur, problème, intervention, leviers, captures, lien et résultats accompagnés d'une source.
- Les expertises Contenu et Automatisation pointent vers le contact en attendant leurs pages dédiées. Acquisition renvoie à la publicité et au SEO existants.
- Les quatre choix par objectif ouvrent désormais le chatbot avec les intentions `acquisition`, `website`, `automation` et `strategy` (voir `chatbot-integration.md`). Les liens de contact des expertises Contenu et Automatisation conservent leurs paramètres ; le formulaire actuel ne les lit pas encore.
- Le graphique est conceptuel : aucune performance client.

## Validation et environnement

Typecheck : `node node_modules/typescript/bin/tsc --noEmit`.
Build : `npm.cmd run build`. La route contact existante nécessite `RESEND_API_KEY` dès son chargement. La génération a été vérifiée avec une valeur locale factice, sans envoi de message. Une vraie configuration reste nécessaire pour utiliser le formulaire.
Pas de script ou configuration ESLint autonome dans le projet.
Les animations sont CSS/SVG ; les reveals utilisent IntersectionObserver et laissent le contenu visible sans JavaScript. Le mode réduit désactive les animations de la Home et le défilement doux.
