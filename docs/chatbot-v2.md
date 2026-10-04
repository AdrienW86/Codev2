# Chatbot CODE-V V2

## Audit et architecture conservée

Le widget RobotAssistant reste monté une fois dans layout.tsx. Les CTA Home et Solutions utilisent ChatTrigger/openChat({ intent }) et l’événement codev:open-chat. Conversations par intent conservées dans la mémoire React pendant la visite ; changement d’intent annule la requête précédente et reprend le fil correspondant. Aucun stockage navigateur ou base de conversations ajouté. Fermeture sans effacer le fil, Escape, focus initial et retour à l’ouvreur conservés. Pas de refonte du design.

/api/chat conserve Chat Completions et gpt-4o-mini. JSON structuré simple via response_format json_object ; validation des champs côté serveur, délai réseau 25 s, erreurs publiques sobres. Les détails de réponse fournisseur ne sont plus journalisés. Message limité à 10 000 caractères, historique à 20 entrées user/assistant, sans rôle system accepté. Historique envoyé au prestataire pour la continuité, jamais à Analytics.

Points forts antérieurs : widget unique, conversations indépendantes, suivi anonymisé centralisé, serveur seul détenteur de la clé. Limites corrigées : accueils avec plusieurs sujets, contexte commercial absent, recommandations non cliquables, exemples de prompt encourageant une orientation trop rapide, absence de gestion du timeout et logs fournisseur bruts.

## Intents et qualification

Les quatre intents existants sont conservés : website, acquisition, automation, strategy. Aucun CTA existant migré. Les parcours SEO, Ads, social, content, maintenance et business-tool sont reconnus à partir du besoin exprimé et des familles du catalogue ; ils ne deviennent pas neuf fils concurrents.

| Parcours | Repères utiles, progressivement |
|---|---|
| Website | Création/refonte, activité, site actuel, objectif : présentation, demandes, vente ou application |
| SEO | Activité/zone, site et visibilité actuelle ; local ou national |
| Ads | Activité/zone, offre, campagne actuelle, objectif ; éligibilité Local Services à confirmer |
| Automatisation | Tâche, outils, fréquence/volume, contrôle humain et risque si pertinents |
| Stratégie | Objectif, activité, situation et blocage ; un ou deux axes maximum |
| Social/contenu | Audience, canaux et besoin éditorial ou de création |
| Maintenance | Existant, problème et impact |
| Logiciel métier | Processus, utilisateurs et outils |

Une question principale, sans demander un cahier des charges. Activité et zone sont le seul cadrage combiné pour acquisition. Les données connues ne sont pas redemandées. Si plusieurs points d’interrogation sont générés, le serveur conserve la première question et masque le CTA tant que la réponse reste interrogative. Ce garde-fou ne remplace pas l’évaluation sémantique : une phrase peut encore comporter plusieurs sujets ; les exemples prioritaires guident le modèle.

## Sources de vérité

chat-context.ts dérive le contexte serveur depuis services.ts (32 prestations, 9 familles, questions et limites), projects.ts (travaux livrés et résultats documentés), resources.ts (ressources réellement publiées), reviews.ts (deux citations exactes). Le client ne reçoit pas les catalogues ou notes internes du prompt.

Les périmètres encore marqués draft dans services.ts sont des prestations à cadrer, pas des engagements contractuels. Aucun tarif validé, délai, disponibilité, volume de leads ou résultat extrapolé. Les preuves locales/sponsorisées concernent une capture ponctuelle, jamais une position permanente. Les avis Protection Nuisibles ne sont pas des avis CODE-V.

## Réponses et sécurité

Français, vouvoiement, « nous », deux à quatre phrases généralement. Pas de compliment, remplissage, liste de solutions ou survente. Répondre à la question avant de qualifier. Hors périmètre : réponse sobre, sans forcer une offre. Aucun outil d’audit ou accès à Google Ads/Search Console/GBP ; un audit peut être organisé, jamais prétendu effectué. Refus de divulguer instructions, clés et contexte interne. Le modèle reste probabiliste : ces consignes ne constituent pas une garantie absolue contre toute hallucination ou injection.

## CTA et Contact

chat-actions.ts contient les seules destinations autorisées. Le modèle choisit un identifiant ; aucune URL libre, aucun HTML/Markdown rendu. Un seul CTA par réponse. Contact après qualification du contexte/problème/objectif, ou sur demande explicite ; le serveur bloque Contact au premier tour générique. Une invitation à poursuivre doit porter une action cohérente.

Destinations : création de site, Web & Applications, SEO, SEO local, Publicité, Automatisation & IA, Stratégie digitale, Maintenance, Motion design, Solutions, Réalisations et les deux études de cas. Motion design n’est proposé que pour un besoin pertinent de vidéo, pas tout besoin de contenu.

Contact transmet seulement service : website, seo, ads, business-workflows ou digital-strategy. Aucune adresse, téléphone, nom, résumé libre ou message dans l’URL ; pas de soumission automatique. Le service est lu par le formulaire existant. Pas de résumé personnel persistant ou de nouveau stockage créé.

## Tracking

chatbot_open et chatbot_intent_selected conservés. Le CTA Contact utilise trackContactCta centralisé et l’événement existant contact_cta_click, emplacement assistant, chemin source, intent et service contrôlés. Pas d’événement redondant chatbot_contact_click. Aucun message, réponse, champ personnel ou texte de lien libre envoyé aux analytics. Les requêtes OpenAI utilisent les messages comme avant, distinctement des événements Analytics.

## Tests et validation

Les dix scénarios A–J du brief ont été envoyés via la route locale avec de vrais appels OpenAI et des messages synthétiques uniquement. Résultats : chatbot-v2-scenarios.json. Trois conversations suivies (acquisition, refonte, recopie Gmail/Google Sheets) : chatbot-v2-dialogues.json. Ces fichiers sont des résultats de test, pas des données clients ni une garantie que chaque future réponse sera identique.

Tests API simulés : quatre intents et requête sans intent, maintien du modèle, rôles/historique/tailles invalides, JSON invalide, action hors liste, Contact prématuré bloqué, Contact explicitement demandé accepté, question multiple tronquée sans CTA. Neuf suites Node existantes réussies. TypeScript et build isolés sans secrets validés ; aucune dépendance ajoutée.

Chromium sur le build : 320/375/768/1024/1440, panneau dans le viewport, champ focalisé, CTA contrôlé, Escape avec retour à l’ouvreur, fermeture et reprise de conversation, reduced motion. API simulée pour ces tests UI, afin de distinguer UX et qualité du modèle. Pas de conversion en Client Component des pages serveur ; seules les destinations compactes sont ajoutées au bundle du widget. Aucun nouveau composant de chat ou SDK.

Référence API officielle consultée : https://developers.openai.com/api/docs/guides/structured-outputs (JSON mode, compatible avec Chat Completions). Skill utilisé : openai-docs, C:/Users/Adrien/.codex/skills/.system/openai-docs/SKILL.md. Aucun changement de modèle/API ni déploiement.
