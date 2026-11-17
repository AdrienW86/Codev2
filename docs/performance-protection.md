# Protection des analyses publiques

- Sans inscription : 2 demandes admises par adresse IP et par date civile Europe/Paris. Un réseau partagé partage la limite. Changer de réseau peut la contourner : ce n’est pas une identité utilisateur.
- 50 nouveaux appels PageSpeed publics par jour, 500 par mois. Les tentatives échouées ne sont pas remboursées. Mobile et ordinateur sont deux demandes distinctes.
- Résultats mis en cache 24 h par URL et appareil. Une lecture du cache compte dans les deux demandes personnelles mais ne consomme aucun appel PageSpeed ni plafond global. Date d’analyse conservée. URL avec paramètres : pas de conservation du rapport.
- Réservation atomique Redis (EVAL) des compteurs : pas de dépassement concurrent. Verrou de 70 s contre les analyses simultanées d’une même URL/appareil ; appel PageSpeed limité à 55 s.
- Empreinte HMAC de l’IP avec sel quotidien ; pas d’IP brute dans Redis. Compteurs personnels expirés après 25 h maximum, globaux mensuels après 32 jours maximum.
- Corps limité à 2 500 octets, y compris sans Content-Length. URL validée avant réservation. Requêtes navigateur cross-site refusées (ce n’est pas une protection contre les robots).
- Téléchargements PDF entièrement locaux : aucune demande de quota.
- Appels internes authentifiés CODE-V OS préservés, hors quotas publics. Ne jamais exposer leur clé au client.

## Activation — ne pas activer le flag avant ces contrôles

1. Connecter un Redis REST compatible Upstash au projet Vercel codev : `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` (secrets serveur).
2. `PERFORMANCE_QUOTA_SECRET` (24 caractères minimum) ; à défaut la clé serveur existante `CODEV_PERFORMANCE_SERVICE_KEY` sert de clé HMAC. Ne pas partager avec le navigateur.
3. Conserver `PAGESPEED_API_KEY` en production. Laisser `PERFORMANCE_PUBLIC_ENABLED=false` tant que le stockage et la protection en amont ne sont pas testés.
4. Configurer une limitation de rafales et une vérification anti-robot en amont de `/api/performance` via le pare-feu Vercel. Tester aussi l’intégration interne CODE-V OS avant publication. L’accès au pare-feu est actuellement refusé par la connexion Vercel disponible ; reconnexion nécessaire.
5. Tester en environnement connecté : deux demandes autorisées, troisième refusée, minuit Paris, concurrents, cache, panne Redis, plafonds globaux, quota Google. Activer ensuite le flag et redéployer.

Les plafonds applicatifs bornent les appels PageSpeed publics, pas l’ensemble de la facture Vercel : même une requête refusée dans une fonction a déjà atteint Vercel. Le filtrage en amont et les réglages budgétaires restent nécessaires. Aucune règle WAF ou protection budgétaire n’a été activée par cette PR.

Validation locale : tests Node, TypeScript et build ; exécution du script Lua dans un interpréteur Lua avec commandes Redis simulées pour vérifier les limites, le cache et les verrous. Pas de Redis distant connecté, donc pas de validation de production.
