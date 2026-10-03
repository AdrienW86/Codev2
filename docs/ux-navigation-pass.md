# Passe UX et navigation CODE-V

## Audit

Le hero exprime une direction mais ne donne qu’un accès secondaire à Web & Applications. Le visiteur cherchant un site ou le SEO doit ouvrir le mega-menu ou sélectionner une famille dans SolutionExplorer, puis suivre son CTA. Le menu présente neuf familles de poids égal. Le mobile ouvre d’abord une liste générale ; les services sont dans un second niveau. Le footer n’offre ni entrée Réalisations ni Ressources, et mélange légal, actualités et présentation du studio.

La Home expose également des justifications internes sur des études de cas et un emplacement motion sans source. Ces mentions sont retirées, conformément aux règles éditoriales globales.

## Structure finale

Header desktop : logo officiel → Solutions → Réalisations → Ressources → À propos → Contact ; CTA principal « Parler de votre projet ».

Mega-menu : quatre portes d’entrée principales, puis cinq familles complémentaires visibles et « Voir toutes les solutions ».

| Besoin | Famille | Destination |
| --- | --- | --- |
| CRÉER | Web & Applications | `/solutions/web-applications` |
| ÊTRE TROUVÉ | SEO & Visibilité locale | `/referencement` |
| ACQUÉRIR | Acquisition & Publicité | `/publicite` |
| AUTOMATISER | Automatisation & IA | `/solutions/automatisation-ia` |
| Complémentaire | Réseaux sociaux & Community management | `/contact?service=social-management` |
| Complémentaire | Contenu & Création | `/contact?service=content-production` |
| Complémentaire | Logiciels & Solutions métier | `/contact?service=business-tool` |
| Complémentaire | Stratégie digitale | `/contact?service=digital-strategy` |
| Complémentaire | Maintenance & Accompagnement | `/contact?service=website-care` |

La famille SEO conserve la taxonomie du catalogue ; sa destination publiée porte le SEO général. Aucune future route locale n’est créée ou liée.

Rail Home, immédiatement après le hero : Création de site → `/creation-site` ; Référencement SEO → `/referencement` ; Publicité → `/publicite` ; Automatisation & IA → `/solutions/automatisation-ia` ; Réseaux sociaux → contact qualifié existant. « Voir toutes les solutions » → `/solutions`. Le lien secondaire du hero devient « Découvrir la création de site ».

Le rail utilise de grands liens séparés par des lignes, sans cards. Sur mobile les liens sont verticaux, tous visibles sans défilement horizontal. SolutionExplorer reste disponible plus bas pour explorer les neuf familles ; les raccourcis rendent ce détour facultatif.

Footer : marque et coordonnées réelles, CTA principal, puis quatre rubriques :

- Solutions : les cinq raccourcis et Toutes les solutions.
- CODE-V : Réalisations, À propos (`/qui-sommes-nous`), Contact.
- Ressources : `/ressources`, sans guides draft.
- Légal : `/mentions-legales`, sans page légale fictive.

Mobile : six liens immédiats dans le menu, en deux colonnes : site, SEO, publicité, automatisation, réalisations, contact. Puis Solutions, Ressources, À propos et CTA principal. Les doublons de Réalisations/Contact du menu desktop sont masqués. Les neuf familles restent accessibles dans Solutions ; la hauteur du panneau est limitée au viewport avec défilement interne. Échap ferme le sous-menu puis le menu avec restitution du focus. Le footer passe à deux colonnes, sa rubrique Solutions occupant toute la largeur à 320/375 px.

## Contenu et périmètre

Les textes internes de la Home et de GrowthCard deviennent des descriptions factuelles. Le bloc MotionVideo sans source est retiré de la Home ; le composant et la vraie vidéo de la page Automatisation & IA restent inchangés. Le bloc de preuves mène aux réalisations effectivement publiées sans attribuer de résultats. Aucune money page, route, offre ou intent ajouté.

Source commune des raccourcis : `src/data/navigation.ts`. Footer serveur, rail serveur ; composants de navigation et primitives motion existants réutilisés, aucune dépendance ajoutée.

## Validation

TypeScript et build isolé de production réussis. Chromium : 320, 375, 768, 1024 et 1440 px sans overflow horizontal, menu ouvert inclus. Six accès mobiles visibles et zones de clic d’au moins 44 px ; neuf familles et lien hub présents. Navigation Tab, focus visible et fermeture Échap vérifiés. Reduced motion : aucune animation active dans Header, Home et Footer. 17 destinations internes distinctes, ancres comprises, répondent sans erreur. Aucune erreur JavaScript observée.

Inspection des captures : Home desktop, menu mobile, rail et footer à 375 px. Contrôle automatisé de l’absence des anciennes justifications internes dans la Home. Ces vérifications concernent un rendu de production local, sans mesure de conversion terrain.

Fichiers : `src/data/navigation.ts`, `src/components/Header.tsx`, `header.module.css`, `Footer.tsx`, `footer.module.css`, `src/components/home/Home.tsx`, `GrowthCard.tsx`, `home.module.css`, `docs/editorial-guidelines.md` et ce compte rendu.
