# Fil Facebook public CODE-V

## Architecture et sécurité

Route conservée : `GET /api/facebook-feed`. La récupération est partagée dans `src/lib/facebook-feed.ts`, protégé par `server-only`. Variables utilisées exclusivement au serveur : `FACEBOOK_ID` et `FACEBOOK_TOKEN`. Les anciens noms FACEBOOK_PAGE_ID / FACEBOOK_ACCESS_TOKEN sont retirés du code. Pas de NEXT_PUBLIC, de token dans l’URL Graph ni de logs de payload ou d’exception.

Le token est envoyé à Graph dans le header Authorization. La version v21.0 déjà utilisée par le projet est conservée et l’appel réel a été vérifié. La requête demande huit publications, avec id, message, date, permalink et les pièces jointes nécessaires aux images, dont les sous-pièces jointes des albums. Pas de réactions, commentaires, compteurs sociaux ou données de profil.

La réponse publique est reconstruite : `{ status, data }`, avec les seules publications normalisées (id, message, date ISO, permalink, média facultatif : src, dimensions, type). Aucun objet Graph brut, paging, URL Graph, erreur upstream ou donnée technique n’est renvoyé. Les permalinks HTTPS sont limités aux domaines Facebook ; les images aux CDN Facebook. Les URL comportant des paramètres token/secret/authorization sont rejetées. Une garde supplémentaire rejette un résultat qui contiendrait littéralement le token.

Token absent, ID absent/invalide, token expiré, réponse malformée, erreur HTTP ou réseau : statut unavailable, tableau vide, HTTP 503 pour l’API. Le site affiche seulement « Les publications sont momentanément indisponibles. ». Une réponse vide valide est distincte, avec une phrase sobre annonçant les prochaines publications.

## Cache et rendu

L’appel Graph utilise le Data Cache Next.js avec `next.revalidate: 300` et un timeout de huit secondes. Page et API utilisent la même requête. Le cache est côté serveur ; l’API ne rajoute pas de cache navigateur/CDN et retourne Cache-Control no-store. Référence : [fetch et revalidation Next.js](https://nextjs.org/docs/app/api-reference/functions/fetch).

La page `/facebook` est rendue côté serveur, après `connection()` : elle ne fige pas un état sans configuration au build. Le composant Facebook est serveur, reçoit uniquement la réponse publique et ne déclenche plus de fetch client. Les variables ne sont pas lues par un composant client.

## Présentation

Hero court, fil vertical avec date en marge, texte, image réelle et « Voir sur Facebook ». Dates en français, fuseau Europe/Paris ; retours à la ligne conservés. Les textes longs se prolongent dans un details natif « Lire la suite ». Aucun iframe ni imitation de Facebook.

Média : dimensions présentes ou valeurs de réserve, cadre avec ratio borné, loading lazy, decoding async, affichage contain. Les vidéos sont représentées uniquement par leur image retournée, avec lecture sur Facebook via le permalink. Sans image, le texte et le lien restent dans le fil. Alt contextuel date/CODE-V, sans inventer une description d’image.

SEO : title « Publications Facebook & actualités | CODE-V », description « Retrouvez les publications récentes de CODE-V : actualités du studio, projets et repères pour votre activité digitale. », canonical `https://www.code-v.fr/facebook`. H1 « Les nouvelles de CODE-V. ». Breadcrumb visible et JSON-LD **Accueil › Publications Facebook**. Liens contextuels Ressources, Réalisations, Solutions et Contact ; Header inchangé.

## Validation

TypeScript et build isolé de production réussis. Route dynamique, 505 octets de code de route, environ 104 ko de JS initial partagé inclus. Aucun composant client ou dépendance supplémentaire pour le fil.

Appel réel avec les variables présentes : huit publications, huit images. Chromium : 320/375/768/1024/1440 sans overflow, images décodées, détails au clavier, focus visibles, reduced motion, breadcrumb et canonical vérifiés. Captures desktop/mobile inspectées. Aucun token réel trouvé dans HTML, réponse API, scripts client chargés ou URL des requêtes navigateur. Aucune requête Graph depuis le navigateur. Aucune erreur JavaScript observée. Dix-sept destinations internes testées sans lien cassé. CLS local observé 0 ; mesure de laboratoire, pas terrain.

Second serveur de test sans variables : API 503 avec réponse générique, message public correct et responsive aux cinq largeurs. Tests isolés dans `tests/facebook-feed.cjs` : variables absentes, succès, publication texte seul, album, filtrage URL/date, token expiré, JSON invalide, exception, payload malformé, vide, token reflété, paramètres cache/timeout. Aucun contenu de test fictif publié sur le site.

Les réponses graphiques restent dépendantes des permissions, de la validité du token et de la disponibilité Facebook. Aucun mécanisme de renouvellement automatique du token ajouté. Les permalinks viennent de l’API et sont filtrés ; les tests de liens portent sur les routes internes, sans prétendre contourner les restrictions d’accès Facebook.

Fichiers : `src/lib/facebook-feed.ts`, `src/app/api/facebook-feed/route.ts`, `src/components/Facebook.tsx`, `facebook.module.css`, `src/app/facebook/page.tsx`, `page.module.css`, `tests/facebook-feed.cjs` et ce document. Aucun changement de .env, Header, Home, catalogue ou chatbot.
