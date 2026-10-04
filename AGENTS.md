# Travail sur CODE-V

- Partir de master et utiliser une branche codex/<tache>. Livrer une PR vers master.
- Ne pas pousser directement sur master, fusionner une PR ou déployer en production sans instruction explicite.
- Installer avec npm ci (Node.js 22).
- Vérifier avec npx tsc --noEmit, les tests tests/*.cjs et npm run build.
- Ne jamais committer de secrets, de fichiers .env, de jetons ou de données clients. Ne jamais exposer une clé privée avec NEXT_PUBLIC_.
- Utiliser des mocks pour les tests ; ne pas envoyer de vrais e-mails ou requêtes commerciales.
- Utiliser la preview Vercel de la branche pour la revue visuelle. Signaler si la preview ou un contrôle n'a pas pu être vérifié.
- Dans la PR, expliquer le changement, les contrôles exécutés et leurs résultats.
