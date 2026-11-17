# CODE-V PDF

## Routes et fonctionnement

- `/outils/remplir-pdf` : présentation publique, indexable, liée depuis le pied de page et le sitemap.
- `/outils/remplir-pdf/espace/connexion` et `/inscription` : composants Clerk localisés en français.
- `/outils/remplir-pdf/espace/editeur` : vérification serveur de la session et d’au moins une adresse e-mail vérifiée.
- Aucune route d’upload, aucun stockage de PDF. PDF.js et son worker sont auto-hébergés. Les PDF, annotations et images restent en mémoire navigateur.
- Sans les deux clés Clerk, l’espace affiche une indisponibilité et ne rend pas l’éditeur. Aucun mode de contournement d’authentification.

## Configuration avant ouverture

Créer une application Clerk **distincte de CODE-V OS** pour éviter d’ouvrir l’application interne aux inscriptions publiques. Aucun compte Clerk ou abonnement n’a été créé par cette PR.

1. Activer l’inscription par e-mail et rendre sa vérification obligatoire dans Clerk. Activer la gestion/suppression de compte dans UserButton.
2. Mettre `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` et `CLERK_SECRET_KEY` dans les variables Vercel du projet `codev`. Utiliser les clés de développement en Preview et celles de production en Production. Ne jamais mettre la clé secrète dans une variable publique.
3. Configurer le domaine production `www.code-v.fr` dans Clerk, les enregistrements DNS qu’il fournit et les origines de développement/prévisualisation nécessaires. Les routes et redirections sont définies dans le code.
4. Tester une inscription réelle, la vérification e-mail, la connexion/déconnexion et la suppression du compte sur la preview. Les tests automatisés n’envoient aucun e-mail.
5. Valider les informations de confidentialité et les conditions du prestataire avant l’ouverture publique.
6. Fusionner seulement après validation. Aucun domaine supplémentaire ni base de documents nécessaire.

## PDF

Texte multiligne, coches, croix, date, signature dessinée et import PNG/JPEG. Les ajouts se déplacent à la souris, au doigt ou au clavier (flèches, Maj+flèche), se redimensionnent et se suppriment. Annuler/rétablir conserve 30 états. Navigation page par page, zoom et export de toutes les pages.

Les ajouts sont exportés sous forme d’images PNG transparentes à résolution double, ce qui préserve leur rendu (accents, signes et retours à la ligne) ; le texte ajouté n’est donc pas sélectionnable dans le résultat. Les pages d’origine restent vectorielles lorsqu’elles le sont, leurs champs existants sont conservés. L’outil ne remplit pas les valeurs logiques des champs AcroForm : il ajoute une couche visuelle.

Les coordonnées d’export inversent la transformation PDF.js (rotation, CropBox et UserUnit). PDF limités à 25 Mo et 100 pages ; images à 5 Mo, rasterisées et limitées à 1600 pixels. Documents chiffrés, illisibles et signatures numériques existantes refusés. La signature ajoutée est une image, pas une signature certifiée.

Les documents, noms de fichiers, textes, signatures et adresses e-mail ne sont pas transmis aux outils de mesure. Les comptes sont gérés par Clerk. Aucun historique de PDF, collecte de prospects ou envoi de newsletter n’est implémenté.

## Développement / contrôles

Node 22, `npm ci`, `npx tsc --noEmit`, `node --test tests/*.cjs`, `npm run build`. Le postinstall et le prebuild copient worker, CMaps, polices et WASM PDF.js dans `public/pdf-assets` (généré et ignoré par Git).

React et React DOM passent de 19.1.0 à 19.1.4 pour satisfaire les versions corrigées exigées par Clerk. Next.js reste à la version du projet.

Les tests couvrent l’e-mail vérifié, les transformations des quatre rotations et les offsets de recadrage, l’export réel, la conservation des pages/champs existants, et les refus de documents invalides, trop lourds, trop longs et signés. Compléter avec la recette navigateur sur la preview Vercel : ajout, déplacement, redimensionnement, suppression, annuler/rétablir, signature tactile, téléchargement et inspection visuelle du résultat, mobile et session expirée.
