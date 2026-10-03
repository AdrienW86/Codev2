# Codev — Site vitrine

Site vitrine Next.js/React pour Codev, studio digital indépendant spécialisé dans la création de sites web, le référencement naturel et la publicité en ligne.

Cette version est volontairement autonome : elle présente l’offre, les pages de service et un formulaire de contact visuel, sans connecter de base de données ni de services externes.

## Prérequis

- Node.js 18.18 ou supérieur
- npm 9 ou supérieur

## Installation et lancement

```bash
npm install
npm run dev
```

Le site est ensuite disponible sur [http://localhost:3000](http://localhost:3000).

Pour vérifier le build et lancer le site en production locale :

```bash
npm run build
npm run start
```

## Routes

- `/` — Accueil
- `/creation-site` — Création web
- `/referencement` — Référencement naturel
- `/publicite` — Publicité en ligne
- `/qui-sommes-nous` — Présentation de Codev
- `/contact` — Coordonnées et formulaire visuel
- `/mentions-legales` — Mentions légales provisoires

## Structure

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── [routes]/
└── components/
    ├── Header.tsx
    ├── Footer.tsx
    ├── PageHero.tsx
    └── ServiceCard.tsx
```

## Fonctionnalités non connectées

Cette archive ne branche volontairement pas :

- Prisma, Supabase ou une base de données ;
- Clerk ou une authentification ;
- Resend ou l’envoi d’e-mails ;
- Zod, Turnstile ou une validation serveur ;
- un calendrier, des réservations ou un espace administrateur ;
- le stockage des demandes de contact.

Le formulaire de la page `/contact` est explicitement une maquette visuelle. Il n’envoie aucun message. Les coordonnées affichées (`codev66000@gmail.com` et `06 66 67 27 09`) doivent être vérifiées avant publication.

## Variables d’environnement

Un fichier `.env.example` contient uniquement des placeholders. Ne créez pas de fichier `.env.local` avec des secrets dans le dépôt et ne publiez jamais de clé privée côté client.

## Prochaines étapes suggérées

Après validation du site vitrine, les étapes suivantes pourront être ajoutées séparément : validation serveur du formulaire, protection anti-spam, stockage des demandes, envoi d’e-mails, authentification et prise de rendez-vous.