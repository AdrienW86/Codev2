# CODE-V Performance — moteur d'audit partagé (V1)

## Interfaces
- Public : /outils/analyser-site-web (le formulaire est remplacé par un avis d’indisponibilité tant que PERFORMANCE_PUBLIC_ENABLED n’est pas true).
- HTTP : POST /api/performance avec JSON { "url": "https://example.org", "strategy": "mobile"|"desktop" }.
- CODE-V OS : envoie la même requête avec x-codev-service-key depuis son serveur (jamais le navigateur).

## Fonctionnement
L'API Google PageSpeed Insights v5 fournit les scores Lighthouse mobile ou desktop, métriques de laboratoire et audits d'optimisation. Les métriques réelles CrUX sont facultatives et pourraient ne plus être incluses dans PageSpeed ; il faudra alors une intégration CrUX API séparée. LCP/CLS de laboratoire sont distincts des métriques terrain. INP n'est affiché que s'il est disponible dans CrUX. Le téléchargement PDF est généré dans le navigateur avec pdf-lib ; aucun service PDF payant ou serveur d’export.

## Variables Vercel (site vitrine)
- PAGESPEED_API_KEY : clé Google PageSpeed Insights (quota API et autorisations à vérifier ; optionnelle pour les essais, recommandée en production).
- CODEV_PERFORMANCE_SERVICE_KEY : secret aléatoire d'au moins 24 caractères, partagé uniquement avec le serveur CODE-V OS.
- PERFORMANCE_PUBLIC_ENABLED=true : ouvre l'API aux visiteurs uniquement après configuration anti-abus.
- UPSTASH_REDIS_REST_URL et UPSTASH_REDIS_REST_TOKEN, ou KV_REST_API_URL et KV_REST_API_TOKEN fournis par la Marketplace : instance Redis REST pour quota distribué (5 demandes / IP / heure calendaire). Sans une paire complète, conserver PERFORMANCE_PUBLIC_ENABLED=false.

Sans le secret, l'OS ne peut pas utiliser le moteur avec le privilège de service. Sans Redis, le public est bloqué (« fail closed »), même si PERFORMANCE_PUBLIC_ENABLED=true. Les clés restent côté serveur et ne doivent jamais utiliser NEXT_PUBLIC_.

## Sécurité / limites
- Pas de cible locale, IP directe, authentification HTTP, port personnalisé ou schéma autre que HTTP(S).
- Limitation distribuée par IP, aucune conservation de l'IP en clair dans Redis (empreinte SHA-256) ; expiration ~1 h.
- La limite anti-abus doit être complétée par le WAF Vercel, alertes sur consommation et une vérification de la politique de confidentialité avant ouverture publique.
- L'analyse d'une URL publique ne confère pas le droit de crawler massivement le domaine.
- L'API actuelle n'exécute pas Chrome hébergé : waterfall réseau, vidéo de chargement, tests multi-régions et PDF serveur ne sont pas compris dans V1.
- Les rapports côté public ne sont pas conservés. CODE-V OS gère l'historique de ses propres audits.

## Vérifications avant merge
1. npm ci && npm run build (Next.js).
2. Requêtes API valides mobile et desktop sur site public, vérification scores non factices et erreurs de quota.
3. Vérification que localhost, 127.0.0.1, IP IPv6 et ports non standard sont refusés.
4. Test anti-abus (6e appel/heure en erreur, clés non exposées).
5. Test responsive + téléchargement PDF depuis le navigateur.

## Rapport enrichi
- Les descriptions Lighthouse, opportunités, actions, constats d’exploration et exemples ne sont plus tronqués par nombre de lignes ou de caractères.
- Les tableaux techniques Lighthouse sont conservés dans `technical` : champs, lignes et objets imbriqués. Les captures binaires internes à Lighthouse sont exclues des tableaux textuels, ce qui est signalé dans le rapport.
- Chaque page explorée contient `facts.sections`, un modèle commun à l’écran et au PDF : identité, métadonnées complètes, H1–H6, canonical/hreflang, images/ALT/srcset, liens avec paramètres et rel, réseaux sociaux liés, JSON-LD complet, signatures d’outils de mesure, scripts/iframes et vocabulaire.
- Les en-têtes HTTP utiles sont collectés via une liste autorisée ; pas de cookies ou d’en-têtes d’authentification. La durée HTML n’est pas un temps de chargement utilisateur, et HTTP/1.1 du client de collecte ne prouve pas une absence de HTTP/2 côté site.
- Robots.txt peut suivre au maximum 3 redirections sur le même site, avec DNS revérifié et épinglé à chaque connexion. Les callbacks DNS prennent en charge le format `all:true` demandé par Node 22. Aucun assouplissement du blocage des adresses privées.
- Collecte bornée : 8 pages, 500 Ko par page, 20 tentatives, file de 32 URL et budget d’exploration de 24 secondes. Un état `partial` indique notamment qu’il reste des URL dans la file. Le contenu déjà collecté n’est pas coupé pour raccourcir l’affichage.
- Les fichiers robots, sitemap et llms.txt sont inventoriés séparément, avec leur statut ou motif d’échec (jusqu’à 5 fichiers complémentaires, 150 Ko chacun, délai de 3 secondes). Leur présence ne constitue ni preuve d’indexation ni mesure de visibilité IA.
- Les termes sont descriptifs : pas de volume de recherche, pas de positions, pas de seuil magique de mots. Les backlinks et classements nécessitent une source externe ; aucune donnée n’est fabriquée et aucun abonnement n’est ajouté.

## Présentation et PDF
Sommaire de chapitres, index cliquable des pages, sections dépliables, légende textuelle et couleurs : rouge pour priorité élevée, orange pour actions modérées/faibles, vert pour contrôle mesuré réussi, gris pour information/non mesuré. Les informations complètes restent dans le PDF, y compris les listes longues ; les tableaux étroits se répètent avec leur en-tête et les inventaires larges deviennent des fiches qui se poursuivent sur plusieurs pages.

Le logo existant de CODE-V et les polices Noto Sans sont chargés uniquement lors de l’export. Les polices sont distribuées sous SIL OFL (`public/report-assets/OFL.txt`). Les caractères non couverts par la police sont représentés de façon réversible `[U+XXXX]`. Pour un audit de plusieurs pages avec tous les termes et liens, le PDF complet peut être long : le sommaire et l’index permettent d’aller directement à la partie souhaitée.
