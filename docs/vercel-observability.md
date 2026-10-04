# Observabilité Vercel

Vérification du 4 octobre 2026 : @vercel/analytics et @vercel/speed-insights sont déjà présents dans package.json. src/app/layout.tsx monte une seule fois Analytics et SpeedInsights. Aucun montage ou événement personnalisé ajouté, aucune clé modifiée.

Vercel Analytics sert à examiner la fréquentation disponible dans le tableau de bord du projet. Speed Insights fournit des observations de performance terrain lorsque la collecte est active sur le déploiement. Leur présence dans le code ne confirme ni l’activation du compte, ni le volume de données, ni une attribution des demandes commerciales.

À vérifier humainement après déploiement : projet Vercel concerné, activation et données des deux onglets, paramètres applicables de confidentialité et information du visiteur. Aucun accès au tableau de bord n’a été utilisé pendant cette mission. Ne pas publier de métriques de conversion déduites d’un simple clic. Le suivi des demandes et leur qualification nécessitent une définition et une configuration distinctes.

Les mesures Chromium locales de la mission sont dans docs/qa/overnight-results.json. Cache, machine, réseau et fonts influencent fortement le LCP ; ces observations ne sont pas un audit terrain ou un score Lighthouse.
