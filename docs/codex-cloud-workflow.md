# Codex Cloud — Codev2

## État vérifié

Dépôt : AdrienW86/Codev2. Branche de référence : master.
Le statut GitHub Vercel du commit 82de9ceb922e1b9ede997ed02c43cec01f6b405e indique un déploiement réussi sur le projet adrienw86s-projects/codev.
La branche master n'était pas protégée lors de la préparation.
Ces fichiers préparent le workflow ; ils ne créent pas un environnement dans le tableau de bord Codex et n'activent pas des protections GitHub.

## Environnement à créer dans Codex

Dans https://chatgpt.com/codex, ouvrir les paramètres des environnements et créer un environnement pour AdrienW86/Codev2, branche master.
Autoriser l'application GitHub uniquement sur les dépôts nécessaires.
Choisir Node.js 22 et le script d'installation npm ci.
Ne pas ajouter de secrets de production. Les tests existants utilisent des mocks.
Limiter l'accès réseau de l'agent aux besoins de la tâche ; l'installation doit pouvoir accéder au registre npm.
Les consignes du dépôt sont dans AGENTS.md et s'appliqueront après fusion.

## Cycle de travail

1. Créer une branche codex/<tache> à partir de master.
2. Modifier le code et exécuter les commandes de CI.
3. Ouvrir une PR vers master et conserver les contrôles et l'URL de preview dans sa description.
4. Vérifier CI / validate et le statut Vercel du dernier commit.
5. Examiner la preview, puis faire valider et fusionner la PR.

## Preview Vercel

Utiliser l'intégration GitHub déjà présente, sans ajouter de jeton Vercel aux GitHub Actions.
Dans le projet Vercel codev, vérifier que le dépôt connecté est AdrienW86/Codev2, que la branche de production est master et que les previews des autres branches sont activées.
Confirmer la preview de chaque PR via le commentaire ou le statut Vercel.
Si aucune preview n'apparaît, vérifier l'accès de l'application Vercel au dépôt et les paramètres Git du projet.
Séparer les variables Preview des variables Production : utiliser des services de test, aucune donnée client ni clé de production. Les fonctions de contact et de chatbot peuvent nécessiter des variables de test pour être examinées.
Activer une protection d'accès aux previews si disponible sur le compte.

## Protections à activer sur GitHub

Dans Settings > Rules > Rulesets (ou Branches), cibler master :
- exiger une PR et au moins une approbation d'une autre personne habilitée ;
- exiger le contrôle validate de la CI et le statut Vercel après leur première exécution ;
- exiger la résolution des conversations et une branche à jour ;
- bloquer les force-push et les suppressions de master ; limiter les exceptions aux personnes nécessaires.

Si le dépôt n'a qu'un seul mainteneur, l'exigence d'une approbation externe nécessite un second relecteur. Ne pas confondre une case cochée dans la PR avec une protection serveur effectivement activée.
La PR initiale ajoute le workflow ; les futures tâches doivent partir de master après sa fusion.
