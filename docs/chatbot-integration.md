# Chatbot — intégration au tunnel commercial

## Architecture

`RobotAssistant` reste monté une seule fois dans `src/app/layout.tsx`, sur toutes les pages. Il appelle `/api/chat` ; la route conserve OpenAI Chat Completions, `gpt-4o-mini` et `OPENAI_API_KEY` exclusivement côté serveur. Le formulaire et `/api/contact` ne sont pas modifiés.

`chat.ts` centralise les intentions, leurs accueils et les orientations serveur. `openChat({ intent })` émet l'événement navigateur `codev:open-chat`, écouté par l'assistant global. `ChatTrigger` fournit un bouton React réutilisable, sans provider ni dépendance supplémentaire.

```tsx
import ChatTrigger from "@/components/RobotAssistant/ChatTrigger";

<ChatTrigger intent="acquisition">Parlons de vos prospects</ChatTrigger>
```

Un composant client peut aussi appeler directement `openChat({ intent: "automation" })`. `openChat()` ouvre le fil général. Le bouton flottant reprend le fil courant, ou l'accueil général lors de la première ouverture.

## CTA reliés

| Choix de la Home | Intention |
| --- | --- |
| Je veux générer plus de prospects | `acquisition` |
| J’ai besoin d’un nouveau site | `website` |
| Je veux automatiser mon activité | `automation` |
| Je veux structurer toute ma stratégie digitale | `strategy` |

Les autres CTA conservent leurs destinations. Un CTA réaffiche aussi un assistant précédemment masqué.

## Conversations

Les cinq fils (général et quatre objectifs) sont conservés dans l'état React, uniquement pendant la visite. Changer d'objectif conserve le fil précédent et annule une réponse en cours pour éviter de la mélanger au nouveau fil. Fermer et rouvrir reprend le fil courant. Recharger la page efface les conversations.

La requête ajoute une intention facultative et les 20 derniers messages au champ `message` existant. Le serveur valide l'intention, les rôles user/assistant et les bornes de l'historique ; il compose lui-même les instructions système. Une requête historique `{ message }` reste valide. Aucun lead, coordonnée, email, rendez-vous ou stockage durable n'est ajouté.

## Validation

- TypeScript et build Next.js validés. Le build nécessite toujours une configuration Resend pour la route contact préexistante ; la vérification utilise une valeur locale factice sans envoi.
- Tests backend avec OpenAI simulé : quatre intentions, historique, compatibilité sans intention, modèle conservé et rejet d'intentions/historiques invalides.
  Depuis la racine : `node tests/chat-route.cjs`.
- Tests navigateur desktop 1440 px et mobile 390/320 px : bouton flottant, quatre CTA, contenu des requêtes, focus, Échap, fenêtre dans le viewport, conservation des fils et réouverture du widget masqué.
- Pages existantes contrôlées en HTTP 200 ; aucune référence aux variables secrètes dans les composants ou les bundles client générés.

Une réponse OpenAI réelle reste à vérifier avec une clé serveur configurée. Les réponses des tests sont simulées ; aucun appel payant n'a été effectué.
