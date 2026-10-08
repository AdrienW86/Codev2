# Films motion design CODE-V (Remotion)

Projet Remotion unique pour tous les films du site. Il a ses propres dépendances et n'est ni importé ni compilé par Next.js (dossier exclu du `tsconfig.json` racine) : le site ne reçoit que les fichiers exportés dans `public/videos/`.

```
video/
  src/index.ts, src/Root.tsx     point d'entrée commun (chaque film y enregistre ses compositions)
  src/shared/                    palette et polices du site, logo officiel (public/brand/), formats
  creation-site/                 film pilote de /creation-site
    src/CreationSiteFilm.tsx     plan unique : l'interface traverse tout le film
    src/scenes/                  couches par temps du récit (problème → outro)
    src/components/              cadre navigateur/mobile, blocs du site, texte, flux, formulaire
    src/lib/timing.ts            toute la chronologie (frames à 30 i/s)
    src/lib/layout.ts            états de mise en page 16:9 (désordre, desktop, mobile, système)
    audio/                       ambiance générée, emplacement de la voix off
    scripts/                     frames de contrôle, export web
  referencement/                 film SEO de /referencement (muet)
    src/SeoFilm.tsx              index / arborescence / recherche / trajectoire
    src/components/              espace de recherche, pages, index et résultats, visite, trajectoire, outro
    src/lib/timing.ts            chronologie (frames à 30 i/s), étapes et exploration
    src/lib/layout.ts            mise en page 16:9 (objet Layout, à décliner en 9:16)
    scripts/                     frames de contrôle, export web
```

Les courbes d'animation communes sont dans `src/shared/easing.ts`.

Les logos ne sont jamais recomposés : `BrandLogo` affiche `public/brand/code-v-logo-white.svg` ou `code-v-logo-dark.svg` (`publicDir` = `../public`).

## Utilisation

```bash
cd video
npm ci
npm run studio                      # aperçu interactif
npm run creation-site:stills 60 150 # frames de contrôle dans out/creation-site/stills/
npm run creation-site:export        # master, mix audio, MP4 1080p/720p et poster dans public/videos/
npm run referencement:stills 60 270 # frames de contrôle dans out/referencement/stills/
npm run referencement:export        # MP4 muets 1080p/720p et poster (public/videos/seo*)
```

Dans un conteneur sans téléchargement de navigateur : `REMOTION_BROWSER=/chemin/vers/headless_shell npm run …`.

## Déclinaisons 9:16 et 1:1

`src/shared/formats.ts` décrit les formats. Pour un nouveau ratio, ajouter dans `creation-site/src/lib/layout.ts` les états de ce ratio (mêmes blocs, autres coordonnées) puis une `Composition` dans `creation-site/src/Root.tsx`. La chronologie et les scènes restent communes. Pour /referencement : ajouter un objet `Layout` portrait dans `referencement/src/lib/layout.ts`, puis une `Composition` qui le passe en `layout` dans `referencement/src/Root.tsx`.
