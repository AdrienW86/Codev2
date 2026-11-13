# CODE-V Performance — moteur d'audit partagé (V1)

## Interfaces
- Public : /outils/analyse-site (page masquée et 404 tant que PERFORMANCE_PUBLIC_ENABLED n'est pas true ; lien footer et sitemap également masqués)
- HTTP : POST /api/performance avec JSON { "url": "https://example.org", "strategy": "mobile"|"desktop" }.
- CODE-V OS : envoie la même requête avec x-codev-service-key depuis son serveur (jamais le navigateur).

## Fonctionnement
L'API Google PageSpeed Insights v5 fournit les scores Lighthouse mobile ou desktop, métriques de laboratoire et audits d'optimisation. Les métriques réelles CrUX sont facultatives et pourraient ne plus être incluses dans PageSpeed ; il faudra alors une intégration CrUX API séparée. LCP/CLS de laboratoire sont distincts des métriques terrain. INP n'est affiché que s'il est disponible dans CrUX. Impression navigateur → Enregistrer en PDF, pas de service PDF serveur.

## Variables Vercel (site vitrine)
- PAGESPEED_API_KEY : clé Google PageSpeed Insights (quota API et autorisations à vérifier ; optionnelle pour les essais, recommandée en production).
- CODEV_PERFORMANCE_SERVICE_KEY : secret aléatoire d'au moins 24 caractères, partagé uniquement avec le serveur CODE-V OS.
- PERFORMANCE_PUBLIC_ENABLED=true : ouvre l'API aux visiteurs uniquement après configuration anti-abus.
- UPSTASH_REDIS_REST_URL et UPSTASH_REDIS_REST_TOKEN : instance Redis REST pour quota distribué (5 audits / IP / heure). Sans ces deux variables, conserver PERFORMANCE_PUBLIC_ENABLED=false.

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
5. Test responsive + impression PDF via navigateur.
