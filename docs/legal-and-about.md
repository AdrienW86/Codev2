# Pages institutionnelles CODE-V

Édition du 4 octobre 2026. Identité juridique mise à jour à partir des informations validées par l’éditeur. Les décisions de conservation restent à fournir.

## État et décisions

- /qui-sommes-nous : refonte éditoriale, logique construire → attirer → convertir → automatiser → mesurer → optimiser. Aucun historique, membre d’équipe ou chiffre inventé. Preuve : Château de Projan depuis projects.ts, deux avis exacts depuis reviews.ts, technologies du site depuis package.json. CTA Contact et Réalisations. Index/follow, canonical propre, Open Graph et breadcrumb.
- /mentions-legales : contact public, hébergement Vercel, propriété intellectuelle, responsabilité, liens, données et droit applicable. Noindex/follow conservé ; hors sitemap. Aucun champ vide ou mention de remplissage. Identité validée intégrée ; les points complémentaires sont documentés ci-dessous.
- /politique-confidentialite : page dédiée justifiée par les traitements distincts Contact/Resend, assistant/OpenAI, mesures Vercel et médias tiers. Noindex/follow, hors sitemap, canonical et Open Graph propres, breadcrumb Accueil › Politique de confidentialité. Le responsable est identifié ; les bases juridiques et durées de conservation restent à valider ; aucun chiffre ou garantie de conformité inventé.
- Footer Légal : Mentions légales + Politique de confidentialité. Aucun lien Cookies, aucune bannière, aucune nouvelle money page.

## Informations présentes et sources

Marque CODE-V, domaine www.code-v.fr, contact@code-v.fr, 06 66 67 27 09 : pages Contact/Footer existantes. Hébergeur Vercel Inc. et adresse de contact officielle : 440 N Barranca Avenue #4133, Covina, CA 91723, United States, notice officielle vérifiée le 4 octobre 2026 : https://vercel.com/legal/privacy-notice (Contact Us). Cette adresse est désignée comme adresse de contact publiée, pas comme un siège social vérifié. Support officiel : https://vercel.com/help. Aucun numéro de téléphone hébergeur inventé.

## Informations juridiques à obtenir

Identité désormais validée et intégrée : Adrien Weissenbacher, entrepreneur individuel (EI), nom commercial CODE-V ; SIREN 912 773 447 ; SIRET 912 773 447 00038 ; APE 6201Z — Programmation informatique ; activité principale Programmation informatique ; 142 rue de Rivoli, 75001 Paris, France ; domaine code-v.fr ; directeur de publication Adrien Weissenbacher. Source : informations validées par l’éditeur dans cette demande. Aucun contenu INPI repris publiquement. Aucun capital social ajouté pour l’EI. Email et téléphone conservés depuis le site existant, sans nouvelle coordonnée inventée.

Points complémentaires à confirmer :

1. Immatriculation et registre applicables, sans déduire une inscription RCS ou une ville.
2. Numéro de TVA intracommunautaire ou situation applicable, si nécessaire.
3. Coordonnées téléphoniques officielles de l’hébergeur.
4. Périmètre B2B/B2C et médiateur si les contrats consommateurs le nécessitent.
5. Mentions d’assurance ou d’activité réglementée uniquement si une obligation applicable est confirmée.

Responsable identifié : Adrien Weissenbacher, EI, CODE-V, à l’adresse publiée et joignable via contact@code-v.fr. Informations de confidentialité à décider : base juridique pour chaque finalité (demande commerciale, échanges généraux, assistant, mesures) ; destinataires internes et fournisseur de messagerie ; durées ou critères de conservation effectivement appliqués aux emails, logs, conversations chez le fournisseur, métriques et sauvegardes ; procédure d’effacement ; contrats/DPA acceptés et réglages régionaux ; mécanismes applicables aux transferts ; réglages Resend de suivi d’ouverture/clic et accès internes. Rien de cela n’est présenté comme déjà validé.

## Traitements réellement observés dans le code

| Fonction | Données / flux | Conservation observée |
|---|---|---|
| Contact | Nom, email, message obligatoires ; société et type de projet facultatifs ; service et chemin source ; API accepte aussi phone lorsqu’il est envoyé, mais aucun champ téléphone dans le formulaire actuel | Aucune base Contact dans le repo ; copie email chez CODE-V, le destinataire et Resend. Durée interne non définie |
| Resend | Email interne + confirmation ; contenu et métadonnées transmis au prestataire | Paramétrage compte/messagerie non audité ; pas de durée inventée |
| Chatbot | Message et jusqu’à 20 entrées d’historique envoyés à OpenAI ; réponses et fils en mémoire React | Rechargement perd la mémoire locale ; ce n’est pas une suppression des données chez le prestataire. Aucune base conversation ou stockage navigateur dans le repo |
| Analytics | Pages et neuf événements comportementaux ; propriétés contrôlées sans contenu personnel ; nettoyage des URL avant envoi | Pas d’identifiant ou stockage d’attribution ajouté par CODE-V. Mesures et durée fournisseur distinctes de la mémoire locale |
| Speed Insights | Web Vitals, route, navigateur, appareil et réseau ; ne pas confondre absence d’IP dans les statistiques avec absence de traitement technique réseau | Paramétrage compte non audité |
| Facebook | Récupération serveur des posts publics, cache 300 s ; images directement chargées par le navigateur depuis fbcdn/fbsbx ; referrerPolicy no-referrer | Les serveurs médias reçoivent les informations réseau nécessaires. Aucun compte visiteur demandé, pas d’iframe |
| Avis Google | Avis fournis dans reviews.ts, rendus localement, aucun widget Google embarqué | Texte public du registre ; ne pas prétendre avoir interrogé Google en direct |
| Polices | DM Sans et Space Grotesk auto-hébergées par `next/font` (téléchargées au build, servies par le site) | Plus de connexion navigateur vers fonts.googleapis.com / fonts.gstatic.com depuis l’audit performance du 2026-10-08 |
| Hébergement | Requêtes servies par Vercel, données réseau et logs possibles | Durées/région des logs à vérifier dans le compte |

Aucun GA4 ou pixel publicitaire identifié dans le code. Le fournisseur présente Analytics comme sans cookies tiers, avec statistiques agrégées et mécanisme de hash ; ne pas en déduire une absence de données sur l’ensemble du site, ni une exemption générale validée de consentement. Aucune bannière ajoutée comme demandé.

## Sources primaires et portée

- Information des personnes, finalités, base, destinataires, conservation, droits : https://www.cnil.fr/fr/conformite-rgpd-information-des-personnes-et-transparence
- Mentions obligatoires selon statut : https://entreprendre.service-public.gouv.fr/vosdroits/F31228 et https://www.economie.gouv.fr/entreprises/developper-son-entreprise/innover-et-numeriser-son-entreprise/mentions-sur-votre-site-internet-les-obligations-respecter
- Vercel Analytics : https://vercel.com/docs/analytics/privacy-policy
- Speed Insights : https://vercel.com/docs/speed-insights/privacy-policy
- Hébergement et transferts Vercel : https://vercel.com/legal/privacy-notice et https://vercel.com/legal/dpa
- Resend : https://resend.com/legal/dpa et https://resend.com/legal/privacy-policy
- OpenAI : https://openai.com/policies/privacy-policy/

Les documents fournisseurs décrivent leurs services, pas la conformité de CODE-V. Leur signature/acceptation et les réglages réels ne sont pas établis par le repo. Le contact email est un moyen de demande de droits, pas la preuve qu’une procédure complète a déjà été mise en place. Les bases légales et durées manquantes empêchent de présenter la politique comme une information RGPD complète. Les manques restent ici, jamais sous forme de placeholders publics.

## Validation

### Passe finale avant déploiement — 4 octobre 2026

Correction publique limitée : retrait de la phrase « Ils ne constituent pas une garantie générale de conformité du site. » dans la politique de confidentialité. Cette réserve interne reste dans la section Sources primaires et portée de ce document. Aucun champ juridique ni page ajouté.

Vérification du build local isolé actuel : TypeScript, build et neuf suites de tests Node réussis, sans envoi réel ni accès aux secrets. Les trois routes répondent HTTP 200 ; 15 cas responsive (320/375/768/1024/1440), 75 passages clavier avec focus visible, reduced motion, contrastes, breadcrumbs visibles et JSON-LD, canonicals, métadonnées et 17 destinations internes vérifiés. Aucun overflow, placeholder, contenu INPI parasite ou erreur JavaScript détecté. Email contact@code-v.fr et téléphone 06 66 67 27 09 identiques au reste du site. Header et Footer cohérents. À propos index/follow dans le sitemap ; pages légales noindex/follow hors sitemap. Les informations juridiques restant à confirmer sont uniquement consignées dans la section Informations juridiques à obtenir ci-dessus. Aucun commit, push ou déploiement effectué pendant cette passe.

### Finalisation de la page À propos — 4 octobre 2026

Title : À propos de CODE-V | Studio digital. Description : Découvrez l’approche CODE-V : relier design, technique, acquisition et automatisation aux besoins de votre activité, puis accompagner les évolutions. H1 unique : Relier le digital. À votre activité.

Structure finale : hero et manifeste ; pourquoi relier les outils ; parcours connecté Comprendre → Construire → Attirer → Convertir → Automatiser → Mesurer → Améliorer (sans chiffres) ; identité d’Adrien Weissenbacher ; sept univers de compétences ; fondations techniques et accompagnement ; réalisation Château de Projan depuis projects.ts ; citations exactes de Philippe Voisin et René Rivière depuis reviews.ts ; CTA final Contact et Réalisations. Aucun CV, portrait, historique, nombre de clients ou résultat ajouté.

Liens : /contact, /solutions, /maintenance-site, /realisations#selection et /realisations. Header et Footer : À propos → /qui-sommes-nous. Canonical https://www.code-v.fr/qui-sommes-nous ; index/follow ; breadcrumb visible Accueil › À propos et BreadcrumbList cohérent.

Build et TypeScript validés après finalisation dans la copie temporaire isolée. Chromium aux largeurs 320/375/768/1024/1440 : aucun overflow ; clavier et focus visibles ; reduced motion ; contrastes ; un H1 ; métadonnées et breadcrumb ; liens internes HTTP 200 ; aucune erreur JavaScript ou placeholder. Captures desktop et mobile inspectées. Aucun nouveau composant client ni dépendance ajouté. Les pages légales et le reste du site ne sont pas modifiés par cette finalisation.

TypeScript et build réussis dans une copie temporaire isolée sans .env, pour préserver le serveur dev utilisateur ; 38 sorties pré-rendues. Neuf suites Node existantes réussies. Chromium : les trois pages répondent HTTP 200, un H1 par page, title/description/canonical/Open Graph présents, breadcrumbs visibles et JSON-LD à deux niveaux cohérents. Quinze contrôles responsive aux cinq largeurs 320/375/768/1024/1440 sans overflow ; 75 passages clavier avec focus ; reduced motion sans animation dans main ; zéro erreur JavaScript et zéro placeholder public. Les 17 liens internes examinés répondent HTTP 200. Contrast ratios des textes significatifs passent selon taille/poids ; captures À propos desktop et mobile inspectées. Aucun média fictif créé. Les deux pages légales restent hors sitemap ; À propos y figure. Aucune dépendance ajoutée ; trois pages Server Components. Aucun test d’email, aucune modification des API, secrets ou services externes. Livraison locale, non déployée pendant cette tâche ; complétude juridique suspendue aux informations listées ci-dessus.

