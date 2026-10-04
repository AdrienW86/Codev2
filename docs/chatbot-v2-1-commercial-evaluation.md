# Évaluation commerciale du chatbot CODE-V V2.1

Date : 4 octobre 2026. Correction locale ciblée ; aucun déploiement.

## Verdict de la passe précédente

**Prêt à déployer sur le corpus validé.** Les défauts importants identifiés dans V2 et dans le premier rejeu V2.1 sont corrigés. Aucun défaut critique ni régression importante observé dans le dernier rejeu. Les réserves restantes sont mineures : formulations génériques, quelques relances moins précises et reformulations répétitives. Arrêt de la passe corrective ; aucune V2.2 engagée.

## Méthode et limites

20 scénarios, 60 réponses publiques HTTP 200 après de vrais appels OpenAI. Huit conversations de six échanges : 1, 2, 4, 5, 6, 9, 13 et 16. Les 60 entrées utilisateur sont identiques à celles du rapport V2, comparées automatiquement. Les douze scénarios courts évaluent uniquement le premier tour.

Même modèle gpt-4o-mini, API Chat Completions, température 0,4 et quatre intents. Aucun intent imposé ni accueil ajouté au rejeu, comme dans V2. Les parcours ci-dessous sont inférés : l’API ne renvoie pas un intent détecté structuré.

Le rejeu inclut désormais actionId dans l’historique assistant, conformément au widget réel, afin de tester la déduplication des CTA. Le rejeu V2 n’incluait pas cette métadonnée : la comparaison des nombres de CTA reflète aussi cette différence de méthode. OpenAI reçoit uniquement role/content ; actionId reste une donnée serveur.

Les transcriptions reproduisent les réponses de l’API publique, sans retouche documentaire. Certaines réponses passent par les garde-fous serveur décrits ci-dessous : ce ne sont pas des sorties brutes du modèle. Aucun dialogue simulé n’est présenté comme une réponse fournisseur. Prospects fictifs ; aucun email réel envoyé.

Le dernier rejeu ne comporte aucune tentative interrompue. Après ce rejeu, les conditions des deux garde-fous de qualification ont été restreintes pour éviter des suppositions sur une réservation inexistante ou défaillante et pour respecter une demande explicite de contact. Tests ciblés et vérification des branches sur les 60 entrées : comportement des scénarios enregistrés conservé. Le rejeu complet précède ces restrictions ; les transcriptions ne sont pas présentées comme un second rejeu complet du dernier fichier.

Une exécution ne mesure pas une fréquence statistique. Aucun cas client n’a été cité : sa sélection n’est donc pas validée par ce corpus. La réception analytics dans le dashboard production n’est pas vérifiée ici.

## Corrections et comparaison

| Défaut V2 / premier rejeu V2.1 | Dernier rejeu |
| --- | --- |
| Recommandations trop précoces | Restaurant : objectif demandé avant option esthétique. Couvreur : attribution précisée avant orientation. Site + Ads : qualification avant proposition. |
| Informations redemandées | Airtable, Excel, validation humaine et périmètre réduit conservés. Une question non répondue peut être reprécisée. |
| CTA absents ou incohérents | CTA final présent dans les huit conversations ; website, ads et automation correspondent aux besoins. Un besoin site sans campagne connue ne reçoit plus contact-ads. |
| Invitations systématiques | Boutons supprimés pendant les précisions après orientation ; réapparition lors d’une volonté explicite de poursuivre. Une invitation en prose subsiste en 2/T5, mineure. |
| Google ambigu | Naturel, Maps et sponsorisé distingués avant question ; aucune position garantie. |
| Gain / faisabilité affirmés | Effets formulés comme objectifs ; choix règles/IA à vérifier sur exemples, sans exclure l’IA. |
| Politique d’audit gratuit inventée | Conditions d’examen à préciser avec CODE-V ; aucun refus ni gratuité déclarés. |
| Site + Ads perd l’option réduite | Une seule page reste envisagée à la conclusion. |

## Logique appliquée

Les instructions ciblées conservent le besoin réel, la situation actuelle et les faits déjà donnés. Le drapeau fournisseur qualified limite les CTA Contact, sans prétendre prouver la compréhension. Une demande explicite de contact reste possible. Les questions conservent actionId=null.

La route ajoute un rappel court, utilise le dernier CTA de l’historique pour éviter les répétitions et corrige les formulations précisément observées : audit gratuit, exclusion catégorique d’IA, effets garantis et engagement « Nous allons ». Les garde-fous Google, réservation fonctionnelle et attribution du couvreur répondent aux échecs réellement reproduits. Les expressions ciblées ne constituent pas un validateur sémantique universel.

Le registre chat-actions reste la source des destinations fixes. Contact reconnaît website, seo, local-seo, ads, automation, digital-strategy, website-care, social-management, content-production et business-tool ; ancien business-workflows conservé. Aucun message, nom, email ou téléphone n’est transmis à analytics. Aucun nouvel événement, composant client, appel fournisseur ou paquet ajouté dans cette reprise.

## Gravité et suites

- Critique : aucun défaut observé dans le dernier corpus.
- Important : aucun défaut restant observé ; aucune régression importante détectée.
- Mineur : quelques formules génériques, relances moins précises, répétitions de reformulation et une réponse de garantie sans relance. Voir chaque scénario.

Ne pas reconstruire le widget, changer le modèle/API, ajouter des intents, inventer tarifs ou preuves, installer un agent d’audit ni prolonger en V2.2 pour optimiser ces détails. Le rapport V2 original est conservé.

## Évaluation par scénario

### 1. J’ai besoin de plus de clients

- **Étendue** : 6 échange(s) ; intent technique general.
- **Besoin réel** : Développer les demandes locales ; ensuite comprendre le faible nombre d’appels avant d’engager des prestations.
- **Parcours inféré** : acquisition / SEO local, puis diagnostic du parcours et mesure (inféré ; intent technique general).
- **Questions observées** : T1 — « Dans quel secteur travaillez-vous et dans quelle zone souhaitez-vous obtenir davantage de prospects ? » ; T2 — « Quel aspect de votre site aimeriez-vous améliorer pour attirer davantage de clients ? »
- **Réponse de conclusion observée** : « Nous pouvons organiser un échange pour déterminer les points prioritaires à vérifier sur votre site afin d'optimiser la génération d'appels. L’objectif serait de cibler les améliorations les plus pertinentes. »
- **CTA au dernier tour** : Parler de votre projet → /contact?service=website
- **Points forts** : Qualification retardée à T3 ; site conservé comme option ; CTA website à l’orientation puis à la demande explicite finale, aucun bouton aux précisions T4–T5.
- **Points faibles / gravité** : Mineur : cadrage très centré sur le site dès T2 ; T5 « Il n’est pas nécessaire de tout refaire » gagnerait à être formulé « pas forcément » avant examen.
- **Comparaison / correction restante** : Recommandation T2 et CTA final absent du V2 corrigés ; répétition des boutons corrigée.

### 2. Mon site est vieux mais je sais pas si ça vaut le coup de le refaire

- **Étendue** : 6 échange(s) ; intent technique general.
- **Besoin réel** : Décider si une dépense de refonte est utile ; les fonctions essentielles et la réservation externe satisfont le prospect.
- **Parcours inféré** : website / arbitrage amélioration ciblée versus refonte (inféré ; intent technique general).
- **Questions observées** : T1 — « Quel rôle joue votre site dans votre activité actuelle ? » ; T2 — « Qu'est-ce qui vous pousse à envisager une refonte de votre site, malgré le bon fonctionnement du menu et du téléphone ? » ; T3 — « Au-delà de l’ancienneté du site, quelle amélioration souhaiteriez-vous obtenir ? »
- **Réponse de conclusion observée** : « Nous pouvons faire le point sur votre site actuel et évaluer les améliorations possibles avant de décider d'une refonte. L’objectif serait de mieux cerner les priorités et les investissements nécessaires. »
- **CTA au dernier tour** : Parler de votre projet → /contact?service=website
- **Points forts** : T3 conserve la réservation fonctionnelle et demande l’amélioration recherchée ; orientation à T4 ; option esthétique partielle sans remplacement des fonctions existantes ; CTA final website.
- **Points faibles / gravité** : Mineur : reste enclin au rafraîchissement esthétique plutôt que d’expliciter conserver tel quel après absence de plainte. Une invitation en prose reste à T5, sans bouton répété.
- **Comparaison / correction restante** : Recommandation prématurée et réservation intégrée du V2 supprimées ; CTA final rétabli.

### 3. Je veux être premier sur Google

- **Étendue** : 1 échange(s) ; intent technique general.
- **Besoin réel** : Comprendre une demande de première position, à traduire en besoin commercial encore inconnu.
- **Parcours inféré** : acquisition / SEO à qualifier (inféré ; intent technique general).
- **Questions observées** : T1 — « Lequel de ces espaces visez-vous ? »
- **Réponse de conclusion observée** : « Sur Google, la première place peut désigner les résultats naturels, Google Maps ou les annonces sponsorisées ; aucune position n’est garantie. Lequel de ces espaces visez-vous ? » Premier tour seulement, pas une recommandation finale qualifiée.
- **CTA au dernier tour** : Aucun CTA ; conclusion non évaluée sur un seul tour.
- **Points forts** : Naturel, Maps et sponsorisé distingués ; absence de garantie explicite ; une question sur le résultat visé.
- **Points faibles / gravité** : Aucun problème important sur le premier tour ; convergence non évaluée.
- **Comparaison / correction restante** : Cadrage demandé corrigé par garde-fou serveur.

### 4. Je dépense déjà en Google Ads mais ça marche moyen

- **Étendue** : 6 échange(s) ; intent technique general.
- **Besoin réel** : Améliorer la pertinence des appels de campagnes existantes avant d’augmenter le budget.
- **Parcours inféré** : acquisition / Google Ads et mesure (inféré ; intent technique general).
- **Questions observées** : T1 — « Que signifie concrètement "marche moyen" pour vous ? » ; T2 — « D'où viennent vos clients aujourd'hui ? »
- **Réponse de conclusion observée** : « Nous pourrions examiner votre compte Google Ads pour identifier les optimisations possibles avant d'envisager une augmentation de budget. L’objectif serait de mieux cibler vos annonces et d'améliorer la qualité des appels. »
- **CTA au dernier tour** : Étudier votre acquisition → /contact?service=ads
- **Points forts** : Première question sur le symptôme ; aucun audit effectué annoncé ; examen hypothétique et objectif conditionnel ; CTA ads T3 et T6 seulement.
- **Points faibles / gravité** : Mineur : T2 origine des clients moins précis qu’une question sur les campagnes ; T5 ne répond pas explicitement qu’un diagnostic précis nécessite les données du compte. La réponse présente un examen à organiser, sans prétendre l’avoir fait.
- **Comparaison / correction restante** : Cause certaine et invitations/boutons systématiques du V2 atténués ; CTA cohérent conservé.

### 5. Je veux automatiser mon entreprise avec une IA

- **Étendue** : 6 échange(s) ; intent technique general.
- **Besoin réel** : Réduire le travail de comptes rendus dans Notion avec validation humaine ; pas déléguer toute l’entreprise à un agent.
- **Parcours inféré** : automation (inféré ; intent technique general).
- **Questions observées** : T1 — « Quelle tâche répétitive vous prend le plus de temps aujourd'hui ? » ; T2 — « Quelles sont les tâches spécifiques que vous aimeriez déléguer à l'IA ? » ; T3 — « À quelle fréquence réalisez-vous cette tâche de rédaction et de recopie des comptes rendus ? »
- **Réponse de conclusion observée** : « Nous pouvons cadrer une aide à la saisie des comptes rendus dans Notion tout en intégrant votre processus de validation. Je vous invite à nous contacter pour définir précisément ce périmètre. »
- **CTA au dernier tour** : Identifier ce que vous pouvez automatiser → /contact?service=automation
- **Points forts** : Notion, notes et contrôle humain conservés ; T5 répond aide à la saisie plutôt qu’autonomie sans redemander la validation ; aucun gain certain ; CTA automation final.
- **Points faibles / gravité** : Mineur : « il est important » à T2 reste du remplissage ; pas de problème important dans cette conversation.
- **Comparaison / correction restante** : Promesse de gain, question d’autonomie déjà renseignée et CTA absent du V2 corrigés.

### 6. Je passe ma vie à recopier des infos entre mes mails et Airtable

- **Étendue** : 6 échange(s) ; intent technique general.
- **Besoin réel** : Préparer les demandes de Gmail dans Airtable, avec relecture, sans changer Airtable ; déterminer si IA utile.
- **Parcours inféré** : automation (inféré ; intent technique general).
- **Questions observées** : T1 — « À quelle fréquence faites-vous cette recopie ? » ; T2 — « Quelle est la fréquence des demandes de devis que vous recevez ? »
- **Réponse de conclusion observée** : « Nous pouvons examiner spécifiquement le flux de transfert des informations de vos emails vers Airtable sans modifier votre base actuelle. L’objectif serait de définir une solution adaptée à votre besoin. »
- **CTA au dernier tour** : Identifier ce que vous pouvez automatiser → /contact?service=automation
- **Points forts** : Ne redemande pas Airtable ; fréquence et demande de relecture prises en compte ; IA/règles à vérifier sur exemples ; base conservée ; CTA automation sans répétition intermédiaire.
- **Points faibles / gravité** : Mineur : fréquence demandée T1 puis T2 car le prospect ne l’avait pas donnée à T2 ; information jamais déjà répondue. Une relecture des formulations techniques reste utile hors corpus.
- **Comparaison / correction restante** : Exclusion certaine de l’IA, outils redemandés et CTA final absent du V2 corrigés.

### 7. Je lance ma boîte dans 2 mois et j’ai rien du tout

- **Étendue** : 1 échange(s) ; intent technique general.
- **Besoin réel** : Lancement dans deux mois sans dispositif ; activité et priorité à établir.
- **Parcours inféré** : strategy, éventuellement website/acquisition après cadrage (inféré ; intent technique general).
- **Questions observées** : T1 — « Dans quel secteur allez-vous travailler et dans quelle zone souhaitez-vous vous implanter ? »
- **Réponse de conclusion observée** : « Dans quel secteur allez-vous travailler et dans quelle zone souhaitez-vous vous implanter ? » Premier tour seulement, pas une recommandation finale qualifiée.
- **CTA au dernier tour** : Aucun CTA ; conclusion non évaluée sur un seul tour.
- **Points forts** : Activité/zone demandées, sans livraison en deux mois promise.
- **Points faibles / gravité** : Aucun problème important sur le seul premier tour ; conclusion non évaluée.
- **Comparaison / correction restante** : Découverte utile conservée.

### 8. Vous prenez combien pour un site ?

- **Étendue** : 1 échange(s) ; intent technique general.
- **Besoin réel** : Obtenir un cadrage budgétaire pour un site ; type de projet inconnu.
- **Parcours inféré** : website (inféré ; intent technique general).
- **Questions observées** : T1 — « Quel est le rôle principal que vous souhaitez pour votre site ? »
- **Réponse de conclusion observée** : « Le prix d'un site dépend de plusieurs facteurs, comme son rôle (présentation ou vente), le nombre de pages et les fonctionnalités souhaitées. Quel est le rôle principal que vous souhaitez pour votre site ? » Premier tour seulement, pas une recommandation finale qualifiée.
- **CTA au dernier tour** : Aucun CTA ; conclusion non évaluée sur un seul tour.
- **Points forts** : Prix lié au périmètre et rôle du site ; une question concrète, aucun chiffre inventé.
- **Points faibles / gravité** : Aucun problème important au premier tour ; conclusion non évaluée.
- **Comparaison / correction restante** : Relance FAQ remplacée par une qualification utile.

### 9. Je suis couvreur à Lyon, j’ai un site, Google Ads, Local Services mais je veux vraiment accélérer

- **Étendue** : 6 échange(s) ; intent technique general.
- **Besoin réel** : Plus de chantiers rentables avec capacité limitée, pas simplement plus d’appels ; attribution des canaux absente.
- **Parcours inféré** : acquisition / mesure et qualité des demandes (inféré ; intent technique general).
- **Questions observées** : T1 — « Comment attribuez-vous actuellement les chantiers générés par vos différentes sources d'acquisition ? » ; T2 — « Arrivez-vous à relier les chantiers signés aux différents canaux d’acquisition ? »
- **Réponse de conclusion observée** : « Nous pouvons examiner vos canaux d'acquisition actuels et mettre en place des outils de mesure pour mieux comprendre la rentabilité de chaque source. L’objectif serait de prendre des décisions éclairées avant d'investir davantage. »
- **CTA au dernier tour** : Étudier votre acquisition → /contact?service=ads
- **Points forts** : Attribution précisée avant orientation ; rentabilité et capacité conservées ; CTA Ads final.
- **Points faibles / gravité** : Mineur : formulations « essentiel » et « judicieux », jargon d’attribution.
- **Comparaison / correction restante** : Orientation prématurée T2 supprimée ; une question utile plutôt qu’une recommandation.

### 10. J’ai une fiche Google mais elle apparaît pas bien

- **Étendue** : 1 échange(s) ; intent technique general.
- **Besoin réel** : Clarifier un défaut de visibilité d’une fiche Google existante.
- **Parcours inféré** : acquisition / SEO local et Google Business Profile (inféré ; intent technique general).
- **Questions observées** : T1 — « Dans quelle zone géographique votre entreprise est-elle située ? »
- **Réponse de conclusion observée** : « Dans quelle zone géographique votre entreprise est-elle située ? Cela nous aidera à comprendre votre visibilité locale. » Premier tour seulement, pas une recommandation finale qualifiée.
- **CTA au dernier tour** : Aucun CTA ; conclusion non évaluée sur un seul tour.
- **Points forts** : Zone demandée sans diagnostic de fiche ni promesse.
- **Points faibles / gravité** : Mineur : phrase d’accompagnement générique.
- **Comparaison / correction restante** : Qualification conservée ; conclusion non testée.

### 11. Je veux faire des vidéos pour les réseaux

- **Étendue** : 1 échange(s) ; intent technique general.
- **Besoin réel** : Définir l’objectif de vidéos sociales avant le format ou la prestation.
- **Parcours inféré** : content / social (inféré ; intent technique general).
- **Questions observées** : T1 — « Quel type de vidéos souhaitez-vous créer pour vos réseaux sociaux ? »
- **Réponse de conclusion observée** : « Quel type de vidéos souhaitez-vous créer pour vos réseaux sociaux ? » Premier tour seulement, pas une recommandation finale qualifiée.
- **CTA au dernier tour** : Aucun CTA ; conclusion non évaluée sur un seul tour.
- **Points forts** : Une question sur les vidéos, sans catalogue.
- **Points faibles / gravité** : Mineur : format demandé avant objectif commercial.
- **Comparaison / correction restante** : Faiblesse mineure conservée ; pas de correction supplémentaire nécessaire.

### 12. Je veux un CRM sur mesure

- **Étendue** : 1 échange(s) ; intent technique general.
- **Besoin réel** : Déterminer le processus qui motive le CRM avant d’envisager du sur-mesure.
- **Parcours inféré** : business-tool, rattaché au parcours automation (inféré ; intent technique general).
- **Questions observées** : T1 — « Pour quel type d'opération ou de processus souhaitez-vous un CRM sur mesure ? »
- **Réponse de conclusion observée** : « Pour quel type d'opération ou de processus souhaitez-vous un CRM sur mesure ? » Premier tour seulement, pas une recommandation finale qualifiée.
- **CTA au dernier tour** : Aucun CTA ; conclusion non évaluée sur un seul tour.
- **Points forts** : Processus à gérer demandé avant solution CRM.
- **Points faibles / gravité** : Mineur : vocabulaire métier abstrait.
- **Comparaison / correction restante** : Pas de technologie ni équipe présumée.

### 13. Je veux refaire mon site et lancer Google Ads en même temps

- **Étendue** : 6 échange(s) ; intent technique general.
- **Besoin réel** : Construire un parcours ciblé aménagement paysager avant Ads ; une page et des corrections peuvent suffire à la refonte totale.
- **Parcours inféré** : website + acquisition ; arbitrage strategy (inféré ; intent technique general).
- **Questions observées** : T1 — « Quel est le rôle principal de votre site dans votre activité ? » ; T2 — « Pour mieux comprendre votre besoin, comment attribuez-vous actuellement les demandes d'aménagement que vous recevez ? »
- **Réponse de conclusion observée** : « Nous pouvons définir ensemble un périmètre commun pour la création de votre page dédiée à l'aménagement et le lancement de votre campagne Google Ads. L’objectif serait d'optimiser vos efforts d'acquisition en prévoyant une expérience utilisateur fluide. »
- **CTA au dernier tour** : Parler de votre projet → /contact?service=website
- **Points forts** : Site et Ads conservés ; option d’une seule page reprise jusqu’au CTA final website.
- **Points faibles / gravité** : Mineur : question d’attribution T2 moins utile que connaître les campagnes déjà actives.
- **Comparaison / correction restante** : Recommandation prématurée, périmètre final et CTA corrigés.

### 14. Je veux juste quelqu’un qui s’occupe de tout

- **Étendue** : 1 échange(s) ; intent technique general.
- **Besoin réel** : Déléguer un ensemble d’actions dont le périmètre est inconnu.
- **Parcours inféré** : strategy / accompagnement (inféré ; intent technique general).
- **Questions observées** : T1 — « Quel est le principal souci que vous souhaitez déléguer ? »
- **Réponse de conclusion observée** : « Quel est le principal souci que vous souhaitez déléguer ? » Premier tour seulement, pas une recommandation finale qualifiée.
- **CTA au dernier tour** : Aucun CTA ; conclusion non évaluée sur un seul tour.
- **Points forts** : Blocage à déléguer recherché avant proposition.
- **Points faibles / gravité** : Aucun problème important au premier tour ; conclusion non testée.
- **Comparaison / correction restante** : Catalogue initial supprimé.

### 15. Je veux plus de leads mais je veux pas dépenser beaucoup

- **Étendue** : 1 échange(s) ; intent technique general.
- **Besoin réel** : Développer les leads avec une dépense contrainte ; périmètre et contrainte réelle encore inconnus.
- **Parcours inféré** : acquisition (inféré ; intent technique general).
- **Questions observées** : T1 — « Dans quel secteur travaillez-vous et dans quelle zone souhaitez-vous obtenir davantage de prospects ? »
- **Réponse de conclusion observée** : « Dans quel secteur travaillez-vous et dans quelle zone souhaitez-vous obtenir davantage de prospects ? » Premier tour seulement, pas une recommandation finale qualifiée.
- **CTA au dernier tour** : Aucun CTA ; conclusion non évaluée sur un seul tour.
- **Points forts** : Activité et zone demandées sans promettre des leads à bas prix.
- **Points faibles / gravité** : Aucun problème important au premier tour ; conclusion non testée.
- **Comparaison / correction restante** : Questions simultanées site/acquisition supprimées.

### 16. Je suis déjà bien référencé mais je veux automatiser mes demandes clients

- **Étendue** : 6 échange(s) ; intent technique general.
- **Besoin réel** : Automatiser formulaire/Outlook → Excel, éviter doublons et double saisie, conserver la vérification humaine ; SEO satisfaisant.
- **Parcours inféré** : automation (inféré ; intent technique general).
- **Questions observées** : T1 — « Quelle tâche répétitive vous prend le plus de temps actuellement dans la gestion de vos demandes clients ? » ; T2 — « À quelle fréquence faites-vous cette recopie dans Excel ? »
- **Réponse de conclusion observée** : « Nous pourrions examiner comment automatiser la collecte des demandes depuis Outlook et le formulaire vers Excel, tout en intégrant une vérification humaine pour éviter les doublons. Contactons-nous pour définir les détails de cette automatisation. »
- **CTA au dernier tour** : Identifier ce que vous pouvez automatiser → /contact?service=automation
- **Points forts** : Outlook, formulaire, Excel et validation humaine conservés ; ne bifurque pas vers SEO ; CTA automation final.
- **Points faibles / gravité** : Mineur : reformulations répétitives et « Contactons-nous ».
- **Comparaison / correction restante** : Outil redemandé et boutons répétés corrigés.

### 17. Mon concurrent est devant moi sur Google

- **Étendue** : 1 échange(s) ; intent technique general.
- **Besoin réel** : Transformer une comparaison concurrentielle en objectif de visibilité utile, encore inconnu.
- **Parcours inféré** : acquisition / SEO à qualifier (inféré ; intent technique general).
- **Questions observées** : T1 — « Quel type de résultat voyez-vous devant vous sur Google ? »
- **Réponse de conclusion observée** : « Quel type de résultat voyez-vous devant vous sur Google ? » Premier tour seulement, pas une recommandation finale qualifiée.
- **CTA au dernier tour** : Aucun CTA ; conclusion non évaluée sur un seul tour.
- **Points forts** : Type de résultats Google clarifié avant diagnostic.
- **Points faibles / gravité** : Aucun problème important au premier tour ; conclusion non testée.
- **Comparaison / correction restante** : Question utile présente.

### 18. Je sais pas du tout ce qu’il me faut

- **Étendue** : 1 échange(s) ; intent technique general.
- **Besoin réel** : Clarifier la priorité d’un prospect indécis.
- **Parcours inféré** : strategy (inféré ; intent technique general).
- **Questions observées** : T1 — « Quel est votre objectif principal pour votre activité aujourd'hui ? »
- **Réponse de conclusion observée** : « Quel est votre objectif principal pour votre activité aujourd'hui ? Cela nous aidera à mieux comprendre vos besoins. » Premier tour seulement, pas une recommandation finale qualifiée.
- **CTA au dernier tour** : Aucun CTA ; conclusion non évaluée sur un seul tour.
- **Points forts** : Objectif principal recherché sans catalogue.
- **Points faibles / gravité** : Mineur : phrase générique d’accompagnement.
- **Comparaison / correction restante** : Ne présume plus un projet de développement.

### 19. Faites-moi un audit gratuit de mon site

- **Étendue** : 1 échange(s) ; intent technique general.
- **Besoin réel** : Obtenir un examen du site et connaître ses conditions, notamment gratuité.
- **Parcours inféré** : website / examen à cadrer (inféré ; intent technique general).
- **Questions observées** : T1 — « Quel est l'objectif principal de votre site ? »
- **Réponse de conclusion observée** : « Les conditions d’un examen de votre site sont à préciser avec CODE-V. Quel est l'objectif principal de votre site ? » Premier tour seulement, pas une recommandation finale qualifiée.
- **CTA au dernier tour** : Aucun CTA ; conclusion non évaluée sur un seul tour.
- **Points forts** : Conditions d’examen à préciser, sans politique de gratuité inventée ; objectif du site demandé.
- **Points faibles / gravité** : Aucun problème important au premier tour ; conclusion non testée.
- **Comparaison / correction restante** : Refus commercial inventé supprimé par garde-fou.

### 20. Est-ce que vous pouvez me garantir des résultats ?

- **Étendue** : 1 échange(s) ; intent technique general.
- **Besoin réel** : Comprendre l’existence de garanties de performance avant d’aller plus loin.
- **Parcours inféré** : strategy / objection commerciale transversale (inféré ; intent technique general).
- **Questions observées** : Aucune question interrogative dans les réponses observées.
- **Réponse de conclusion observée** : « Nous ne garantissons aucun résultat spécifique, car les performances dépendent de nombreux facteurs, tels que le marché et la concurrence. Nous pouvons cependant travailler ensemble pour définir des objectifs clairs et des actions adaptées à votre situation. » Premier tour seulement, pas une recommandation finale qualifiée.
- **CTA au dernier tour** : Aucun CTA ; conclusion non évaluée sur un seul tour.
- **Points forts** : Refuse la garantie et explique les facteurs externes sans chiffre ni résultat inventé.
- **Points faibles / gravité** : Mineur : réponse explicative sans question de suivi.
- **Comparaison / correction restante** : Prudence conservée.

## Validation technique

- TypeScript --noEmit et build Next.js validés dans une copie temporaire isolée : 44 pages, JS partagé affiché 100 kB. Aucun ajout de JS client dans cette reprise.
- Neuf suites CJS : chat-route, contact-emails, conversion-tracking, facebook-feed, navigation-seo, projects-catalog, resources-catalog, reviews et service-catalog. Fournisseurs simulés dans les tests unitaires ; les 60 appels commerciaux sont réels.
- 23 destinations distinctes du registre contrôlées HTTP 200, paramètres Contact compris.
- Widget testé à 320, 375, 768, 1024 et 1440 px : pas de débordement du dialogue, focus initial, Escape et retour de focus, conversation conservée à la réouverture. Mode reduced motion émulé.
- Clavier Enter : ouverture, envoi et activation du CTA ; service=automation conservé sur Contact. Réponse API simulée uniquement pour ces tests d’interface.
- Empreintes widget et configuration chat identiques au V2. Analytics testé par ses allowlists et alias ; réception production non testée. Aucun email réel, commit, push ni déploiement.

## Fichiers modifiés dans cette reprise

- src/app/api/chat/route.ts
- tests/chat-route.cjs
- docs/chatbot-v2-1-commercial-evaluation.md

La première passe V2.1 avait aussi ajusté chat-context, chat-actions, la route Contact, analytics et leurs tests. Ces changements sont conservés ; ils ne sont pas recréés dans cette reprise.

## Transcriptions complètes

Réponses publiques réelles, incluant le post-traitement serveur. Documentation interne ; aucune preuve client déduite des prospects fictifs.

### Conversation 1 — J’ai besoin de plus de clients

**Échange 1 — Utilisateur**

J’ai besoin de plus de clients

**Assistant — HTTP 200**

Dans quel secteur travaillez-vous et dans quelle zone souhaitez-vous obtenir davantage de prospects ?

Action retournée : null.

**Échange 2 — Utilisateur**

Je suis plombier à Albi. J’ai un site mais les clients viennent surtout du bouche-à-oreille.

**Assistant — HTTP 200**

Quel aspect de votre site aimeriez-vous améliorer pour attirer davantage de clients ?

Action retournée : null.

**Échange 3 — Utilisateur**

J’aimerais plus de demandes de dépannage, mais je ne sais pas d’où viennent les visites du site.

**Assistant — HTTP 200**

Votre objectif est d'augmenter les demandes de dépannage via votre site. Nous pouvons examiner votre visibilité actuelle et mettre en place des actions pour mieux mesurer et optimiser l'acquisition de clients.

Action retournée : contact-website → /contact?service=website.

**Échange 4 — Utilisateur**

Je veux d’abord comprendre pourquoi le site ne donne presque aucun appel. Je ne cherche pas forcément à acheter de la pub.

**Assistant — HTTP 200**

Il semble que vous souhaitiez analyser la performance de votre site pour comprendre pourquoi il ne génère pas d'appels. Nous pouvons examiner les éléments de votre site et les parcours des utilisateurs pour identifier les points à améliorer.

Action retournée : null.

**Échange 5 — Utilisateur**

Est-ce que vous pensez qu’il faut tout refaire ?

**Assistant — HTTP 200**

Il n'est pas nécessaire de tout refaire ; nous pouvons d'abord analyser votre site pour identifier les améliorations possibles. Cela peut inclure des ajustements sur le contenu ou l'ergonomie pour mieux convertir les visiteurs en appels.

Action retournée : null.

**Échange 6 — Utilisateur**

Je préfère un échange pour savoir quoi vérifier en premier, pas lancer trois prestations.

**Assistant — HTTP 200**

Nous pouvons organiser un échange pour déterminer les points prioritaires à vérifier sur votre site afin d'optimiser la génération d'appels. L’objectif serait de cibler les améliorations les plus pertinentes.

Action retournée : contact-website → /contact?service=website.

### Conversation 2 — Mon site est vieux mais je sais pas si ça vaut le coup de le refaire

**Échange 1 — Utilisateur**

Mon site est vieux mais je sais pas si ça vaut le coup de le refaire

**Assistant — HTTP 200**

Quel rôle joue votre site dans votre activité actuelle ?

Action retournée : null.

**Échange 2 — Utilisateur**

Je tiens un restaurant à Nantes. Le site date de 8 ans mais le menu et le téléphone marchent.

**Assistant — HTTP 200**

Qu'est-ce qui vous pousse à envisager une refonte de votre site, malgré le bon fonctionnement du menu et du téléphone ?

Action retournée : null.

**Échange 3 — Utilisateur**

Les clients trouvent bien les horaires. Pour réserver ils passent sur une plateforme externe, et ça fonctionne.

**Assistant — HTTP 200**

Le fonctionnement de la réservation ne justifie donc pas, à lui seul, un changement. Au-delà de l’ancienneté du site, quelle amélioration souhaiteriez-vous obtenir ?

Action retournée : null.

**Échange 4 — Utilisateur**

Je pensais surtout changer parce que le design fait vieux, je n’ai pas de plainte particulière.

**Assistant — HTTP 200**

Un design moderne peut effectivement améliorer l'image de votre restaurant sans changer les fonctionnalités existantes. Nous pouvons étudier une refonte qui se concentre sur l'esthétique tout en conservant les éléments qui fonctionnent.

Action retournée : contact-website → /contact?service=website.

**Échange 5 — Utilisateur**

Donc ce n’est pas forcément nécessaire de refaire tout le site ?

**Assistant — HTTP 200**

Effectivement, il est possible de se concentrer sur une amélioration du design sans refaire l'ensemble du site. Nous pouvons discuter des éléments à moderniser tout en préservant les fonctionnalités qui fonctionnent bien.

Action retournée : null.

**Échange 6 — Utilisateur**

Je voudrais juste faire le point avant de dépenser pour une refonte.

**Assistant — HTTP 200**

Nous pouvons faire le point sur votre site actuel et évaluer les améliorations possibles avant de décider d'une refonte. L’objectif serait de mieux cerner les priorités et les investissements nécessaires.

Action retournée : contact-website → /contact?service=website.

### Conversation 3 — Je veux être premier sur Google

**Échange 1 — Utilisateur**

Je veux être premier sur Google

**Assistant — HTTP 200**

Sur Google, la première place peut désigner les résultats naturels, Google Maps ou les annonces sponsorisées ; aucune position n’est garantie. Lequel de ces espaces visez-vous ?

Action retournée : null.

### Conversation 4 — Je dépense déjà en Google Ads mais ça marche moyen

**Échange 1 — Utilisateur**

Je dépense déjà en Google Ads mais ça marche moyen

**Assistant — HTTP 200**

Que signifie concrètement "marche moyen" pour vous ?

Action retournée : null.

**Échange 2 — Utilisateur**

Je fais du dépannage de chauffage à Lille. Les campagnes tournent déjà depuis plusieurs mois.

**Assistant — HTTP 200**

D'où viennent vos clients aujourd'hui ?

Action retournée : null.

**Échange 3 — Utilisateur**

J’ai des clics mais beaucoup d’appels concernent des choses qu’on ne fait pas. Je ne connais pas mon coût par client.

**Assistant — HTTP 200**

Votre situation indique un besoin d'optimiser vos campagnes Google Ads pour mieux cibler votre audience et réduire les appels non pertinents. Nous pouvons analyser votre stratégie actuelle et définir des ajustements pour améliorer la qualité des leads.

Action retournée : contact-ads → /contact?service=ads.

**Échange 4 — Utilisateur**

J’ai déjà un site. Je voudrais des appels plus pertinents, pas forcément plus de clics.

**Assistant — HTTP 200**

Votre objectif est d'améliorer la pertinence des appels reçus via vos campagnes Google Ads. Nous pouvons examiner votre ciblage et vos annonces pour mieux aligner vos efforts avec les attentes de vos clients.

Action retournée : null.

**Échange 5 — Utilisateur**

Est-ce que vous pouvez dire ce qui cloche sans voir le compte ?

**Assistant — HTTP 200**

Nous pouvons organiser un examen de votre compte Google Ads pour identifier les ajustements nécessaires. L’objectif serait de mieux comprendre les points à améliorer pour atteindre votre objectif de recevoir des appels plus pertinents.

Action retournée : null.

**Échange 6 — Utilisateur**

D’accord, je veux faire examiner l’existant avant d’augmenter le budget.

**Assistant — HTTP 200**

Nous pourrions examiner votre compte Google Ads pour identifier les optimisations possibles avant d'envisager une augmentation de budget. L’objectif serait de mieux cibler vos annonces et d'améliorer la qualité des appels.

Action retournée : contact-ads → /contact?service=ads.

### Conversation 5 — Je veux automatiser mon entreprise avec une IA

**Échange 1 — Utilisateur**

Je veux automatiser mon entreprise avec une IA

**Assistant — HTTP 200**

Quelle tâche répétitive vous prend le plus de temps aujourd'hui ?

Action retournée : null.

**Échange 2 — Utilisateur**

Je fais du conseil aux entreprises. Je pensais qu’un agent IA pourrait tout gérer à ma place.

**Assistant — HTTP 200**

Un agent IA peut assister dans certaines tâches, mais il est important de définir précisément quelles opérations vous souhaitez automatiser. Quelles sont les tâches spécifiques que vous aimeriez déléguer à l'IA ?

Action retournée : null.

**Échange 3 — Utilisateur**

Je refais les comptes rendus après les réunions et je les copie dans mon outil de suivi.

**Assistant — HTTP 200**

À quelle fréquence réalisez-vous cette tâche de rédaction et de recopie des comptes rendus ?

Action retournée : null.

**Échange 4 — Utilisateur**

J’utilise des notes texte et Notion, une dizaine de fois par semaine. Je veux valider les comptes rendus avant de les partager.

**Assistant — HTTP 200**

Votre besoin porte sur l'automatisation de la rédaction des comptes rendus dans Notion, tout en conservant une validation humaine. Nous pouvons explorer comment mettre en place un système qui facilite cette tâche tout en respectant vos contrôles.

Action retournée : contact-automation → /contact?service=automation.

**Échange 5 — Utilisateur**

Mais du coup ça veut dire un agent autonome ou juste une aide à la saisie ?

**Assistant — HTTP 200**

Avec la validation humaine que vous avez indiquée, il s'agirait plutôt d'une aide à la saisie que d'un agent autonome. Le contrôle avant partage ferait partie du périmètre à étudier.

Action retournée : null.

**Échange 6 — Utilisateur**

Je préfère commencer par ce processus, et conserver une validation humaine.

**Assistant — HTTP 200**

Nous pouvons cadrer une aide à la saisie des comptes rendus dans Notion tout en intégrant votre processus de validation. Je vous invite à nous contacter pour définir précisément ce périmètre.

Action retournée : contact-automation → /contact?service=automation.

### Conversation 6 — Je passe ma vie à recopier des infos entre mes mails et Airtable

**Échange 1 — Utilisateur**

Je passe ma vie à recopier des infos entre mes mails et Airtable

**Assistant — HTTP 200**

À quelle fréquence faites-vous cette recopie ?

Action retournée : null.

**Échange 2 — Utilisateur**

Gmail et Airtable, comme je disais. Je recopie les demandes de devis.

**Assistant — HTTP 200**

Quelle est la fréquence des demandes de devis que vous recevez ?

Action retournée : null.

**Échange 3 — Utilisateur**

Je le fais environ 30 fois par semaine. La base contient déjà les champs nécessaires.

**Assistant — HTTP 200**

Nous pouvons étudier une automatisation pour transférer vos demandes de devis de Gmail vers Airtable, ce qui pourrait réduire votre charge de travail. Cela nécessiterait de vérifier les détails de vos outils et le flux de données.

Action retournée : contact-automation → /contact?service=automation.

**Échange 4 — Utilisateur**

Je veux préparer les lignes automatiquement mais relire avant d’envoyer une réponse au client.

**Assistant — HTTP 200**

Votre besoin porte sur la préparation automatique des lignes dans Airtable avec une relecture humaine avant l'envoi. Nous pouvons cadrer cette solution pour vous aider à simplifier le processus tout en gardant le contrôle sur les réponses.

Action retournée : null.

**Échange 5 — Utilisateur**

Il faut forcément une IA ? Les emails ne sont pas tous au même format.

**Assistant — HTTP 200**

Le choix entre des règles et une IA reste à vérifier sur des exemples de vos mails. Nous pouvons envisager une solution qui utilise des règles simples pour structurer les informations, tout en permettant une relecture manuelle avant l'envoi.

Action retournée : null.

**Échange 6 — Utilisateur**

Je veux qu’on regarde ce flux uniquement. Je ne veux pas changer Airtable.

**Assistant — HTTP 200**

Nous pouvons examiner spécifiquement le flux de transfert des informations de vos emails vers Airtable sans modifier votre base actuelle. L’objectif serait de définir une solution adaptée à votre besoin.

Action retournée : contact-automation → /contact?service=automation.

### Conversation 7 — Je lance ma boîte dans 2 mois et j’ai rien du tout

**Échange 1 — Utilisateur**

Je lance ma boîte dans 2 mois et j’ai rien du tout

**Assistant — HTTP 200**

Dans quel secteur allez-vous travailler et dans quelle zone souhaitez-vous vous implanter ?

Action retournée : null.

### Conversation 8 — Vous prenez combien pour un site ?

**Échange 1 — Utilisateur**

Vous prenez combien pour un site ?

**Assistant — HTTP 200**

Le prix d'un site dépend de plusieurs facteurs, comme son rôle (présentation ou vente), le nombre de pages et les fonctionnalités souhaitées. Quel est le rôle principal que vous souhaitez pour votre site ?

Action retournée : null.

### Conversation 9 — Je suis couvreur à Lyon, j’ai un site, Google Ads, Local Services mais je veux vraiment accélérer

**Échange 1 — Utilisateur**

Je suis couvreur à Lyon, j’ai un site, Google Ads, Local Services mais je veux vraiment accélérer

**Assistant — HTTP 200**

Comment attribuez-vous actuellement les chantiers générés par vos différentes sources d'acquisition ?

Action retournée : null.

**Échange 2 — Utilisateur**

Je veux surtout plus de chantiers rentables. Je reçois déjà des demandes, pas toutes intéressantes.

**Assistant — HTTP 200**

Votre priorité est la rentabilité des chantiers plutôt que le nombre d’appels. Arrivez-vous à relier les chantiers signés aux différents canaux d’acquisition ?

Action retournée : null.

**Échange 3 — Utilisateur**

Je ne sais pas attribuer les chantiers à chaque canal. J’ai juste le nombre d’appels.

**Assistant — HTTP 200**

Il semble essentiel de mettre en place un suivi pour relier les appels aux canaux d'acquisition. Nous pouvons examiner comment optimiser votre stratégie Google Ads et intégrer des outils de suivi pour mieux comprendre la rentabilité de chaque source.

Action retournée : contact-ads → /contact?service=ads.

**Échange 4 — Utilisateur**

Ma capacité est limitée : si les petits dépannages augmentent, ça me complique la vie.

**Assistant — HTTP 200**

Pour gérer la capacité tout en ciblant des chantiers plus rentables, il pourrait être pertinent d'ajuster vos campagnes Google Ads afin de filtrer les demandes. Nous pourrions explorer des solutions pour mieux cibler votre audience et prioriser les chantiers qui correspondent à votre expertise.

Action retournée : null.

**Échange 5 — Utilisateur**

Donc ajouter plus de pub n’est peut-être pas le bon premier pas ?

**Assistant — HTTP 200**

Effectivement, augmenter la publicité sans un ciblage précis pourrait aggraver la situation. Il serait plus judicieux d'analyser vos campagnes actuelles et d'optimiser le ciblage pour attirer des chantiers plus rentables. Nous pouvons vous aider à définir cette stratégie.

Action retournée : null.

**Échange 6 — Utilisateur**

Je voudrais étudier l’acquisition et la mesure avant d’investir plus.

**Assistant — HTTP 200**

Nous pouvons examiner vos canaux d'acquisition actuels et mettre en place des outils de mesure pour mieux comprendre la rentabilité de chaque source. L’objectif serait de prendre des décisions éclairées avant d'investir davantage.

Action retournée : contact-ads → /contact?service=ads.

### Conversation 10 — J’ai une fiche Google mais elle apparaît pas bien

**Échange 1 — Utilisateur**

J’ai une fiche Google mais elle apparaît pas bien

**Assistant — HTTP 200**

Dans quelle zone géographique votre entreprise est-elle située ? Cela nous aidera à comprendre votre visibilité locale.

Action retournée : null.

### Conversation 11 — Je veux faire des vidéos pour les réseaux

**Échange 1 — Utilisateur**

Je veux faire des vidéos pour les réseaux

**Assistant — HTTP 200**

Quel type de vidéos souhaitez-vous créer pour vos réseaux sociaux ?

Action retournée : null.

### Conversation 12 — Je veux un CRM sur mesure

**Échange 1 — Utilisateur**

Je veux un CRM sur mesure

**Assistant — HTTP 200**

Pour quel type d'opération ou de processus souhaitez-vous un CRM sur mesure ?

Action retournée : null.

### Conversation 13 — Je veux refaire mon site et lancer Google Ads en même temps

**Échange 1 — Utilisateur**

Je veux refaire mon site et lancer Google Ads en même temps

**Assistant — HTTP 200**

Quel est le rôle principal de votre site dans votre activité ?

Action retournée : null.

**Échange 2 — Utilisateur**

Je suis paysagiste à Rennes. Le site charge lentement sur mobile et je veux des demandes d’aménagement, pas de tonte.

**Assistant — HTTP 200**

Pour mieux comprendre votre besoin, comment attribuez-vous actuellement les demandes d'aménagement que vous recevez ?

Action retournée : null.

**Échange 3 — Utilisateur**

Je n’ai jamais lancé Ads. Je veux commencer avec une seule offre, après avoir corrigé le parcours de contact.

**Assistant — HTTP 200**

Votre besoin concerne la refonte de votre site pour améliorer le parcours de contact, ainsi que le lancement d'une campagne Google Ads pour promouvoir une offre spécifique. Nous pouvons étudier ces deux aspects ensemble pour optimiser votre visibilité et vos demandes.

Action retournée : contact-website → /contact?service=website.

**Échange 4 — Utilisateur**

Je pensais tout refaire mais une bonne page sur l’aménagement pourrait peut-être suffire.

**Assistant — HTTP 200**

Une page dédiée à l'aménagement pourrait effectivement suffire pour commencer et améliorer votre parcours de contact. Nous pourrions explorer cette option tout en intégrant le lancement de votre campagne Google Ads.

Action retournée : null.

**Échange 5 — Utilisateur**

Vous conseilleriez quel ordre pour éviter de dépenser trop vite ?

**Assistant — HTTP 200**

Il serait judicieux de commencer par améliorer la page dédiée à l'aménagement pour optimiser le parcours de contact, puis de lancer la campagne Google Ads une fois que cette page est opérationnelle. L’objectif serait de s'assurer que les visiteurs ont une expérience fluide avant d'investir dans la publicité.

Action retournée : null.

**Échange 6 — Utilisateur**

Je veux définir un périmètre commun pour le site et la campagne.

**Assistant — HTTP 200**

Nous pouvons définir ensemble un périmètre commun pour la création de votre page dédiée à l'aménagement et le lancement de votre campagne Google Ads. L’objectif serait d'optimiser vos efforts d'acquisition en prévoyant une expérience utilisateur fluide.

Action retournée : contact-website → /contact?service=website.

### Conversation 14 — Je veux juste quelqu’un qui s’occupe de tout

**Échange 1 — Utilisateur**

Je veux juste quelqu’un qui s’occupe de tout

**Assistant — HTTP 200**

Quel est le principal souci que vous souhaitez déléguer ?

Action retournée : null.

### Conversation 15 — Je veux plus de leads mais je veux pas dépenser beaucoup

**Échange 1 — Utilisateur**

Je veux plus de leads mais je veux pas dépenser beaucoup

**Assistant — HTTP 200**

Dans quel secteur travaillez-vous et dans quelle zone souhaitez-vous obtenir davantage de prospects ?

Action retournée : null.

### Conversation 16 — Je suis déjà bien référencé mais je veux automatiser mes demandes clients

**Échange 1 — Utilisateur**

Je suis déjà bien référencé mais je veux automatiser mes demandes clients

**Assistant — HTTP 200**

Quelle tâche répétitive vous prend le plus de temps actuellement dans la gestion de vos demandes clients ?

Action retournée : null.

**Échange 2 — Utilisateur**

Les demandes arrivent par formulaire et par email. Je recopie tout dans un tableau Excel.

**Assistant — HTTP 200**

À quelle fréquence faites-vous cette recopie dans Excel ?

Action retournée : null.

**Échange 3 — Utilisateur**

J’utilise Outlook et Excel. Une quinzaine de demandes par semaine, parfois des doublons.

**Assistant — HTTP 200**

Votre besoin concerne l'automatisation de la collecte des demandes clients depuis Outlook vers Excel, tout en évitant les doublons. Nous pouvons explorer des solutions adaptées pour simplifier ce processus.

Action retournée : contact-automation → /contact?service=automation.

**Échange 4 — Utilisateur**

Je veux un suivi clair et éviter la double saisie, mais pas répondre automatiquement aux clients.

**Assistant — HTTP 200**

Nous pouvons vous aider à automatiser la collecte des demandes depuis Outlook vers Excel, tout en intégrant un suivi clair sans réponse automatique aux clients. L’objectif serait de réduire la double saisie tout en conservant un contrôle humain sur les réponses.

Action retournée : null.

**Échange 5 — Utilisateur**

Vous me proposez du SEO alors que j’ai dit que ça allait bien ? Je veux rester sur l’automatisation.

**Assistant — HTTP 200**

Votre besoin porte sur l'automatisation de la collecte des demandes clients depuis Outlook vers Excel, tout en maintenant un suivi clair et un contrôle humain. Nous pouvons cadrer cette automatisation pour éviter la double saisie.

Action retournée : null.

**Échange 6 — Utilisateur**

Oui, regardons seulement Outlook, le formulaire et Excel, avec une vérification humaine.

**Assistant — HTTP 200**

Nous pourrions examiner comment automatiser la collecte des demandes depuis Outlook et le formulaire vers Excel, tout en intégrant une vérification humaine pour éviter les doublons. Contactons-nous pour définir les détails de cette automatisation.

Action retournée : contact-automation → /contact?service=automation.

### Conversation 17 — Mon concurrent est devant moi sur Google

**Échange 1 — Utilisateur**

Mon concurrent est devant moi sur Google

**Assistant — HTTP 200**

Quel type de résultat voyez-vous devant vous sur Google ?

Action retournée : null.

### Conversation 18 — Je sais pas du tout ce qu’il me faut

**Échange 1 — Utilisateur**

Je sais pas du tout ce qu’il me faut

**Assistant — HTTP 200**

Quel est votre objectif principal pour votre activité aujourd'hui ? Cela nous aidera à mieux comprendre vos besoins.

Action retournée : null.

### Conversation 19 — Faites-moi un audit gratuit de mon site

**Échange 1 — Utilisateur**

Faites-moi un audit gratuit de mon site

**Assistant — HTTP 200**

Les conditions d’un examen de votre site sont à préciser avec CODE-V. Quel est l'objectif principal de votre site ?

Action retournée : null.

### Conversation 20 — Est-ce que vous pouvez me garantir des résultats ?

**Échange 1 — Utilisateur**

Est-ce que vous pouvez me garantir des résultats ?

**Assistant — HTTP 200**

Nous ne garantissons aucun résultat spécifique, car les performances dépendent de nombreux facteurs, tels que le marché et la concurrence. Nous pouvons cependant travailler ensemble pour définir des objectifs clairs et des actions adaptées à votre situation.

Action retournée : null.

## Dernière passe ciblée avant déploiement — 4 octobre 2026

Cette section constitue la validation la plus récente. Les 60 transcriptions précédentes sont conservées comme historique, et non comme un nouveau rejeu du dernier build. Le brief évoquait encore un verdict défavorable ; le fichier local comportait déjà les corrections de qualification, CTA, Google et audit gratuit.

### Méthode

Huit scénarios rejoués : 4, 6, 16, 3, 19, 8, 10 et 14. Trois conversations complètes de six échanges et cinq premiers tours, soit 23 réponses API réelles HTTP 200. Les 23 messages sont identiques au corpus V2, comparaison automatisée. L’historique inclut les nouvelles réponses et actionId comme le widget. Aucun intent imposé. Échantillon couvrant Ads, automatisation, site, SEO local et demande stratégique vague.

Une mauvaise copie des dossiers dans l’environnement temporaire a laissé un ancien build actif lors des premiers essais. Ces essais ne sont pas comptés comme validation finale. Synchronisation corrigée et empreintes SHA-256 de la route locale et de la copie contrôlées identiques avant le rejeu ci-dessous. Aucun serveur utilisateur perturbé.

Ce rejeu a confirmé la nécessité de réserves supplémentaires sur le diagnostic sans données et les variantes de gain certain. Après corrections, les huit scénarios ont été rejoués sur la copie synchronisée. Deux variantes supplémentaires de gain apparaissaient encore dans Airtable : « Cela vous aidera » et « qui vous permettront ». Elles ont été corrigées ; seuls les deux tours concernés ont été revérifiés avec leurs messages et historiques exacts sur le dernier build, deux nouveaux appels réels HTTP 200. Les transcriptions avant et après sont distinguées, aucune réponse historique réécrite.

### Défauts importants, corrections et vérifications

| Défaut | Correction actuelle | Vérification / résultat |
| --- | --- | --- |
| Contact répété / remplacé sans raison | Métadonnée du CTA précédent ; précision sans nouveau bouton, reprise lors d’une demande explicite d’avancer. Règle conservée. | 4, 6 et 16 : une orientation puis un CTA final demandé ; pas de changement de service ni bouton aux objections. |
| Faisabilité IA/automatisation non vérifiée | Rappel des accès, contraintes et intégrations ; remplacement de la formulation reproduite « Nous pouvons vous aider à automatiser » par une piste soumise à vérification. | 6 et 16 : examen/envisagement, contrôle humain conservé ; test injecté de l’affirmation reproduite vérifie la réserve sur les accès. Pas de faisabilité garantie observée. |
| Politique d’audit gratuit inventée | Conditions à préciser avec CODE-V ; garde-fou conservé. | 19 : ni gratuité accordée ni audit payant/refus déclaré. Pas d’audit prétendument effectué. |
| Premier sur Google incomplet | Trois surfaces distinguées et aucune position garantie. Règle conservée. | 3 : naturel, Maps et sponsorisé, une seule question, pas de CTA. |
| Diagnostic sans données | Rappel serveur ; réponse ciblée à la demande observée de diagnostic sans voir le compte. | 4/T5 : « Sans consulter les données du compte, nous ne pouvons pas déterminer précisément la cause. » Pas de CTA. |
| Gains trop certains | Variantes observées remplacées par objectif conditionnel : « qui vous permettra/permettront », « Cela vous aidera », effets et engagements déjà corrigés conservés. | Tests injectés passent ; 6/T4 et T5 revérifiés réellement après la dernière correction : aucune promesse de gain ni nécessité/exclusion catégorique de l’IA. |

### Réserves mineures

La question d’origine des clients en 4/T2 reste moins précise qu’une question sur les campagnes. La fréquence est reprécisée en 6/T2 car le prospect ne l’avait pas fournie, sans redemander Airtable. Le dernier 6/T5 associe maladroitement « pas forcément une IA » à la variation des formats ; le choix reste à vérifier, aucune exclusion catégorique. Formules génériques et reformulations restent présentes. Les scénarios courts ne valident pas une convergence finale. Les règles de déduplication testent les besoins stables et les demandes explicites ; ce corpus ne démontre pas un changement réel de besoin en cours de parcours.

Aucun défaut critique ou important reproductible dans les cas de vérification après corrections. Aucune régression importante observée. Les garde-fous textuels sont ciblés sur les formulations reproduites ; cette évaluation ne prétend pas garantir toutes les réponses futures du modèle.

### Validation finale

- TypeScript --noEmit : succès.
- Build : succès, 44 pages, JS partagé affiché 100 kB. Aucun nouvel ajout client ou dépendance.
- Neuf suites CJS : succès, y compris nouveaux tests des réserves de faisabilité, diagnostic et variantes de gain. Fournisseurs simulés dans les tests unitaires.
- API : 23 réponses réelles du rejeu synchronisé, puis deux confirmations ciblées ; aucun appel en erreur dans ces campagnes.
- 23 destinations CTA : HTTP 200 ; Contact conserve service=automation au clavier.
- Widget : 320/375/768/1024/1440 ; focus initial, Escape/retour de focus, conservation du fil à la réouverture et reduced motion vérifiés sur le dernier build.
- Analytics : suite conversion-tracking valide les allowlists et exclusions PII ; aucune collecte supplémentaire. Dashboard production non testé.
- Modèle gpt-4o-mini, API Chat Completions, quatre intents et widget conservés. Aucun email réel, commit, push ni déploiement.

### Fichiers de cette dernière passe

- src/app/api/chat/route.ts : rappel serveur et garde-fous éditoriaux ciblés.
- tests/chat-route.cjs : régressions des formulations observées et présence du rappel fournisseur.
- docs/chatbot-v2-1-commercial-evaluation.md : résultats et transcriptions ajoutés.

### Transcriptions du rejeu ciblé synchronisé


#### Scénario 4

**Tour 1 — Utilisateur**

Je dépense déjà en Google Ads mais ça marche moyen

**Assistant — HTTP 200**

Que signifie concrètement « marche moyen » pour vous ?

Action : null.

**Tour 2 — Utilisateur**

Je fais du dépannage de chauffage à Lille. Les campagnes tournent déjà depuis plusieurs mois.

**Assistant — HTTP 200**

D'où viennent vos clients aujourd'hui ?

Action : null.

**Tour 3 — Utilisateur**

J’ai des clics mais beaucoup d’appels concernent des choses qu’on ne fait pas. Je ne connais pas mon coût par client.

**Assistant — HTTP 200**

Votre situation indique un besoin d'optimisation de vos campagnes Google Ads pour mieux cibler les demandes pertinentes. Nous pouvons examiner vos annonces et votre ciblage afin de réduire les appels non qualifiés et mieux comprendre votre coût par client.

Action : contact-ads.

**Tour 4 — Utilisateur**

J’ai déjà un site. Je voudrais des appels plus pertinents, pas forcément plus de clics.

**Assistant — HTTP 200**

Votre objectif est d'améliorer la qualité des appels reçus via vos campagnes Google Ads. Nous pouvons analyser vos annonces et votre ciblage pour mieux répondre aux attentes de vos clients potentiels.

Action : null.

**Tour 5 — Utilisateur**

Est-ce que vous pouvez dire ce qui cloche sans voir le compte ?

**Assistant — HTTP 200**

Sans consulter les données du compte, nous ne pouvons pas déterminer précisément la cause. Le ciblage des annonces et l’origine des appels seraient des points à vérifier.

Action : null.

**Tour 6 — Utilisateur**

D’accord, je veux faire examiner l’existant avant d’augmenter le budget.

**Assistant — HTTP 200**

Nous pouvons examiner vos campagnes Google Ads actuelles pour identifier les axes d'optimisation avant d'envisager une augmentation de budget. L’objectif serait de mieux cibler les demandes pertinentes.

Action : contact-ads.

#### Scénario 6

**Tour 1 — Utilisateur**

Je passe ma vie à recopier des infos entre mes mails et Airtable

**Assistant — HTTP 200**

À quelle fréquence faites-vous cette recopie entre vos mails et Airtable ?

Action : null.

**Tour 2 — Utilisateur**

Gmail et Airtable, comme je disais. Je recopie les demandes de devis.

**Assistant — HTTP 200**

Quel volume de demandes de devis recevez-vous chaque semaine ?

Action : null.

**Tour 3 — Utilisateur**

Je le fais environ 30 fois par semaine. La base contient déjà les champs nécessaires.

**Assistant — HTTP 200**

Pour automatiser ce processus, il serait pertinent d'examiner comment les informations de Gmail peuvent être intégrées directement dans Airtable. Nous pourrions envisager des solutions d'automatisation pour réduire cette saisie manuelle.

Action : null.

**Tour 4 — Utilisateur**

Je veux préparer les lignes automatiquement mais relire avant d’envoyer une réponse au client.

**Assistant — HTTP 200**

Nous pouvons cadrer une solution d'automatisation qui prépare les lignes dans Airtable tout en vous permettant de relire les informations avant d'envoyer les réponses aux clients. Cela vous aidera à gagner du temps tout en maintenant un contrôle sur les communications.

Action : contact-automation.

**Tour 5 — Utilisateur**

Il faut forcément une IA ? Les emails ne sont pas tous au même format.

**Assistant — HTTP 200**

Le choix entre des règles et une IA reste à vérifier sur des exemples de vos mails. Nous pouvons envisager d'autres solutions d'automatisation qui vous permettront de structurer les informations tout en vous laissant la possibilité de les relire avant envoi.

Action : null.

**Tour 6 — Utilisateur**

Je veux qu’on regarde ce flux uniquement. Je ne veux pas changer Airtable.

**Assistant — HTTP 200**

Nous pouvons examiner spécifiquement l'automatisation du flux entre Gmail et Airtable sans modifier votre configuration actuelle. L’objectif serait de définir les étapes nécessaires pour préparer les lignes tout en conservant votre processus de relecture.

Action : contact-automation.

#### Scénario 16

**Tour 1 — Utilisateur**

Je suis déjà bien référencé mais je veux automatiser mes demandes clients

**Assistant — HTTP 200**

Quelle tâche répétitive vous prend le plus de temps aujourd'hui concernant vos demandes clients ?

Action : null.

**Tour 2 — Utilisateur**

Les demandes arrivent par formulaire et par email. Je recopie tout dans un tableau Excel.

**Assistant — HTTP 200**

À quelle fréquence faites-vous cette recopie ? Cela nous aidera à comprendre l'ampleur de la tâche.

Action : null.

**Tour 3 — Utilisateur**

J’utilise Outlook et Excel. Une quinzaine de demandes par semaine, parfois des doublons.

**Assistant — HTTP 200**

Il serait pertinent d'explorer une automatisation pour relier Outlook et Excel afin de réduire la saisie manuelle et gérer les doublons. Nous pourrions envisager des solutions adaptées à votre flux de travail.

Action : null.

**Tour 4 — Utilisateur**

Je veux un suivi clair et éviter la double saisie, mais pas répondre automatiquement aux clients.

**Assistant — HTTP 200**

Nous pouvons examiner comment automatiser la collecte des demandes depuis Outlook vers Excel tout en conservant un suivi manuel des réponses. L’objectif serait d'éviter la double saisie tout en gardant le contrôle sur les interactions avec vos clients.

Action : contact-automation.

**Tour 5 — Utilisateur**

Vous me proposez du SEO alors que j’ai dit que ça allait bien ? Je veux rester sur l’automatisation.

**Assistant — HTTP 200**

Votre besoin porte sur l'automatisation de la collecte des demandes clients depuis Outlook vers Excel, tout en maintenant un suivi manuel. Nous pouvons cadrer une solution pour réduire la double saisie tout en respectant votre souhait de contrôle sur les réponses.

Action : null.

**Tour 6 — Utilisateur**

Oui, regardons seulement Outlook, le formulaire et Excel, avec une vérification humaine.

**Assistant — HTTP 200**

Nous pourrions examiner comment automatiser le transfert des demandes depuis Outlook et le formulaire vers Excel, tout en intégrant une vérification humaine pour assurer un suivi clair. Vous pouvez nous contacter pour définir le périmètre de cette automatisation.

Action : contact-automation.

#### Scénario 3

**Tour 1 — Utilisateur**

Je veux être premier sur Google

**Assistant — HTTP 200**

Sur Google, la première place peut désigner les résultats naturels, Google Maps ou les annonces sponsorisées ; aucune position n’est garantie. Lequel de ces espaces visez-vous ?

Action : null.

#### Scénario 19

**Tour 1 — Utilisateur**

Faites-moi un audit gratuit de mon site

**Assistant — HTTP 200**

Les conditions d’un examen de votre site sont à préciser avec CODE-V. Pour examiner votre site, nous pouvons organiser un échange pour discuter des points à vérifier et définir un périmètre d'analyse.

Action : null.

#### Scénario 8

**Tour 1 — Utilisateur**

Vous prenez combien pour un site ?

**Assistant — HTTP 200**

Le prix d'un site dépend de plusieurs facteurs, tels que son rôle (présentation ou vente), le nombre de pages et les fonctionnalités souhaitées. Quel est le rôle principal que vous souhaitez pour votre site ?

Action : null.

#### Scénario 10

**Tour 1 — Utilisateur**

J’ai une fiche Google mais elle apparaît pas bien

**Assistant — HTTP 200**

Dans quelle zone géographique votre entreprise est-elle située ? Cela nous aidera à comprendre comment améliorer la visibilité de votre fiche Google.

Action : null.

#### Scénario 14

**Tour 1 — Utilisateur**

Je veux juste quelqu’un qui s’occupe de tout

**Assistant — HTTP 200**

Quel est le principal souci que vous souhaitez déléguer ?

Action : null.

### Confirmations après correction des dernières variantes

Même message et même historique des tours précédents, réponse publique réelle du dernier build.

**Scénario 6, tour 4 — Utilisateur**

Je veux préparer les lignes automatiquement mais relire avant d’envoyer une réponse au client.

**Assistant — HTTP 200**

Nous pouvons envisager une automatisation qui prépare les lignes dans Airtable tout en vous permettant de relire les informations avant d'envoyer une réponse au client. Cela pourrait optimiser votre flux de travail tout en maintenant un contrôle sur les communications.

Action : contact-automation.

**Scénario 6, tour 5 — Utilisateur**

Il faut forcément une IA ? Les emails ne sont pas tous au même format.

**Assistant — HTTP 200**

Une solution d'automatisation ne nécessite pas forcément une IA, surtout si les formats d'emails varient. Nous pouvons explorer des options qui utilisent des règles simples pour extraire les informations pertinentes tout en vous laissant le contrôle sur la relecture.

Action : null.

### Verdict final

**PRÊT À DÉPLOYER**
