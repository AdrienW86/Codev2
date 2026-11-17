# CODE-V PDF

## Routes et accès libre

- `/outils/remplir-pdf` : présentation publique, indexable, liée depuis le pied de page et le sitemap.
- `/outils/remplir-pdf/espace/editeur` : outil accessible immédiatement, sans compte ni configuration d’authentification.
- Les anciennes routes connexion/inscription redirigent vers l’éditeur.
- Aucune route d’upload, aucun stockage de PDF. PDF.js et son worker sont auto-hébergés. Les PDF, annotations et images restent en mémoire navigateur.
- Aucune dépendance Clerk, clé d’authentification ou base de données nécessaire.

## PDF

Texte multiligne, coches, croix, date, signature dessinée et import PNG/JPEG. Les ajouts se déplacent à la souris, au doigt ou au clavier (flèches, Maj+flèche), se redimensionnent et se suppriment. Annuler/rétablir conserve 30 états. Navigation page par page, zoom et export de toutes les pages.

Les ajouts sont exportés sous forme d’images PNG transparentes à résolution double, ce qui préserve leur rendu (accents, signes et retours à la ligne) ; le texte ajouté n’est donc pas sélectionnable dans le résultat. Les pages d’origine restent vectorielles lorsqu’elles le sont, leurs champs existants sont conservés. L’outil ne remplit pas les valeurs logiques des champs AcroForm : il ajoute une couche visuelle.

Les coordonnées d’export inversent la transformation PDF.js (rotation, CropBox et UserUnit). PDF limités à 25 Mo et 100 pages ; images à 5 Mo, rasterisées et limitées à 1600 pixels. Documents chiffrés, illisibles et signatures numériques existantes refusés. La signature ajoutée est une image, pas une signature certifiée.

Les documents, noms de fichiers, textes, signatures et adresses e-mail ne sont pas transmis aux outils de mesure. Aucun historique de PDF, collecte de prospects ou envoi de newsletter n’est implémenté.

## Développement / contrôles

Node 22, `npm ci`, `npx tsc --noEmit`, `node --test tests/*.cjs`, `npm run build`. Le postinstall et le prebuild copient worker, CMaps, polices et WASM PDF.js dans `public/pdf-assets` (généré et ignoré par Git).

React et React DOM restent sur le correctif 19.1.4. Next.js reste à la version du projet.

Les tests couvrent l’accès sans compte, les transformations des quatre rotations et les offsets de recadrage, l’export réel, la conservation des pages/champs existants, et les refus de documents invalides, trop lourds, trop longs et signés. Compléter avec la recette navigateur sur la preview Vercel : ajout, déplacement, redimensionnement, suppression, annuler/rétablir, signature tactile, téléchargement et inspection visuelle du résultat et mobile.
