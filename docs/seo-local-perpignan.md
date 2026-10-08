# SEO local Perpignan et hygiène des URL — octobre 2026

Optimisation ciblée à partir de Search Console (28 jours), pas une refonte SEO.

## Variantes de domaine

Domaine canonique : `https://www.code-v.fr/` (`siteOrigin`, canonicals, sitemap, robots `Host`). Les redirections de domaine (`http://`, apex `code-v.fr`) relèvent des réglages Domains du projet Vercel, pas du code : aucune règle `has: host` n'est ajoutée dans Next, pour ne pas risquer une boucle avec la configuration Vercel. À contrôler après déploiement :

```
curl -sI http://code-v.fr/ | grep -iE '^(HTTP|location)'
curl -sI https://code-v.fr/ | grep -iE '^(HTTP|location)'
curl -sI http://www.code-v.fr/ | grep -iE '^(HTTP|location)'
```

Attendu : un seul saut 301 (ou 308) vers `https://www.code-v.fr/`. Dans Vercel, l'apex doit être réglé sur « Redirect to www.code-v.fr » avec le code 301.

## Anciennes routes

Ces routes viennent de la version précédente du site (supprimées au commit `cb2d63b`, « mise en ligne »). En ligne, elles répondent toutes 404.

| Ancienne route | Contenu d'origine | Décision |
| --- | --- | --- |
| `/sites` | Types de sites : vitrine, e-commerce, applications web | 301 → `/creation-site` |
| `/ads` | Google Ads, Facebook/Instagram Ads, Local Services Ads | 301 → `/publicite` |
| `/mentions` | Mentions légales | 301 → `/mentions-legales` |
| `/conditions-generales` | CGV de l'ancienne activité | Aucune page équivalente : reste en 404 |

Les redirections utilisent `statusCode: 301` (et non `permanent: true`, qui émet un 308).

## Cluster « développeur web Perpignan »

Page cible : `/creation-site`. La Home porte la marque et l'ensemble des leviers ; la transformer en page locale contredirait le positionnement studio. `/solutions/web-applications` est une page famille large. Les requêtes du cluster (création site internet 66, site internet entreprise/professionnel Perpignan, développeur web Perpignan) expriment surtout le besoin d'un prestataire pour un site professionnel, ce que `/creation-site` couvre déjà.

Faits locaux vérifiables utilisés : réalisations Peinture Occitane et Express Nuisibles (Perpignan, Pyrénées-Orientales, `projects.ts`), mention « Conçu avec attention à Perpignan » du footer. L'adresse légale actuelle est à Paris : aucune adresse, zone d'intervention ou `areaServed` n'est ajoutée.

| | Avant | Après |
| --- | --- | --- |
| Title | Création de site internet professionnel & refonte \| CODE-V | Développeur web à Perpignan : création et refonte de site \| CODE-V |
| Meta | CODE-V conçoit et refond des sites professionnels : contenus clairs, parcours de contact, expérience mobile et bases SEO. Découvrez nos réalisations et parlons de votre projet. | CODE-V crée et refond des sites professionnels à Perpignan et dans les Pyrénées-Orientales : offre claire, contact simple, mobile, bases SEO. Voir nos réalisations. |

Contenu : une phrase dans la section réalisations nomme les deux entreprises de Perpignan déjà présentées. H1, H2 et schémas inchangés.

## Maillage

- `/solutions`, famille Web & Applications → `/creation-site` (même motif que le lien SEO local existant).
- `/realisations`, bloc final → `/creation-site`.
- `/solutions/automatisation-ia` : le lien « Découvrir nos applications web » pointait vers `/creation-site` ; il pointe désormais vers `/solutions/web-applications`.

## `/solutions/web-applications`

Title et meta ne mentionnaient ni « application mobile » ni « application web » alors que la page présente ces offres. Title : « Applications web et mobiles, sites et outils métier | CODE-V ». Meta : « Applications web et mobiles (PWA ou natives), sites, e-commerce et outils métier : CODE-V conçoit des produits utiles et évolutifs, du parcours à l'architecture. » Le contenu n'est pas modifié.
