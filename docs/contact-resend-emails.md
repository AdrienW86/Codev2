# Emails de contact CODE-V

Deux templates dédiés : `src/emails/ContactConfirmationEmail.ts` et `NewContactEmail.ts`, avec structure, palette et helpers dans `emailStyles.ts`. HTML en tableaux, styles inline, largeur maximale 640 px, police Arial/Helvetica, boutons en tableaux ; pas de JS, animation, police distante ou vidéo. Corps clair, header sombre et signature sombre. Versions text/plain complètes pour chaque template.

Logo : conversion fidèle du SVG officiel blanc en `public/brand/code-v-logo-email.png`, 240 × 240, 7 184 octets. Fond #07111f intégré au PNG pour préserver le logo blanc même si le client force les couleurs. Affichage 96 × 96 sans déformation ; URL absolue `https://www.code-v.fr/brand/code-v-logo-email.png`. Le fichier doit être déployé à cette URL avant l’envoi de production. Il a été vérifié localement dans les previews, sans prétendre qu’un asset non déployé est déjà disponible publiquement.

Palette : #07111f, #0e1c2e, #356ee0, #50e3c2, #f7f9fc, #64748b, #ffffff et #dfe7f1. Pas de logo reconstruit en texte ni de robot utilisé comme logo.

## Envoi et configuration

Route conservée `/api/contact`. Elle valide les champs, échappe toutes les valeurs dans le HTML, retire les contrôles des objets et utilise Resend batch en validation stricte (défaut SDK) pour soumettre les deux emails. Les erreurs retournées par le SDK comme les exceptions produisent une réponse publique générique, sans logs sensibles. Resend est instancié seulement à la requête avec la clé serveur.

Variables serveur nécessaires :

- `RESEND_API_KEY` : clé Resend.
- `CONTACT_EMAIL` : adresse destinataire interne, également Reply-To de la confirmation.
- `RESEND_FROM` : identité d’expéditeur validée dans Resend, par exemple `CODE-V <adresse@domaine-verifie>` avec une adresse réellement autorisée. Aucun fallback onboarding@resend.dev en production.

From : `RESEND_FROM` pour les deux. Interne Reply-To : adresse du prospect. Confirmation Reply-To : `CONTACT_EMAIL`.

Objet client : « Votre demande a bien été reçue — CODE-V ». Objet interne : « Nouveau contact — [service] — [nom] », avec omission du service absent. Prénom client : premier élément du nom fourni. Pas de délai de réponse promis.

Le formulaire transmet le service de l’URL et sa page source, en plus des champs existants. Les codes connus sont traduits en libellés commerciaux ; sinon le type de projet saisi est utilisé. Le téléphone est accepté par l’API s’il est fourni ; aucun champ téléphone ajouté à l’interface dans cette tâche. Source limitée au chemin CODE-V, sans query ni fragment. Les lignes vides sont omises, jamais remplacées par une mention interne.

## Previews et vérification

Previews HTML, PNG et texte brut dans `docs/email-previews/` : confirmation, nouveau-contact et leurs variantes minimales. Données de démonstration uniquement, sans prospect réel. Tests `node tests/contact-emails.cjs` : prénom, service présent/absent, champs optionnels, message long, échappement, mailto/tel, From, Reply-To, deux envois simulés, validation et erreurs sécurisées.

Chromium local : logo net et chargé, largeur naturelle 240 px, rendu à 96 px, aucun overflow aux largeurs 320/375/640 pour les quatre previews. TypeScript et build isolé validés. Ce contrôle navigateur n’est pas une certification de rendu dans les applications Gmail, Outlook ou Apple Mail : une vérification dans ces clients reste à faire après configuration et déploiement. La structure est volontairement compatible avec les contraintes courantes des emails ; le dark mode forcé reste à vérifier dans les clients réels.

Configuration chargée lors de la tâche : ni RESEND_API_KEY ni CONTACT_EMAIL disponibles. Aucun envoi réel effectué. Il faudra configurer les trois variables, vérifier le domaine expéditeur et déployer le PNG, puis envoyer les deux templates à une adresse de test autorisée. Aucun secret dans les templates, previews, JS client ou réponses API.

Fichiers : trois fichiers `src/emails/`, route API contact, `src/components/ContactForm.tsx`, PNG officiel, `tests/contact-emails.cjs`, previews locales et ce document. .env non modifié.
