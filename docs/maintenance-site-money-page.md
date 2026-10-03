# Maintenance de site — page commerciale CODE-V

## Positionnement et périmètre

Route : `/maintenance-site`. La page répond à « Que se passe-t-il après la mise en ligne ? » : continuité d’usage, entretien et interlocuteur identifié. Elle développe la prestation `website-care` existante sans créer une nouvelle offre.

- Title : **Maintenance de site internet & support | CODE-V**.
- Description : **Après la mise en ligne, CODE-V accompagne l’entretien de votre site : vérifications, mises à jour, corrections et petites évolutions, dans un périmètre convenu.**
- H1 : **En ligne. Et bien accompagné.**
- Canonical / Open Graph : `https://www.code-v.fr/maintenance-site`.

Parcours : hero avec cycle de maintenance → continuité après livraison → supervision des fonctions utiles → mises à jour, sauvegardes, sécurité et corrections → petites évolutions/refonte → hébergement et responsabilités → réalisation web → FAQ → contact.

Supervision, sauvegardes, tests de restauration, assistance et évolutions sont présentés comme des blocs possibles, à préciser dans un périmètre convenu. Pas de tarif, de SLA, de délai d’intervention ni de sécurité absolue promis. Hébergement distinct sauf devis commun ; refonte et fonctionnalités importantes à cadrer séparément. Reprise de site soumise à examen des accès, de la technologie, des licences et des sauvegardes.

WordPress et Next.js sont évoqués avec des modalités adaptées, sans affirmer une prise en charge universelle. Références techniques : [administration et sauvegardes WordPress](https://developer.wordpress.org/advanced-administration/security/backup/), [exploitation Next.js](https://nextjs.org/docs/app/guides/self-hosting). Aucun changement de version ou d’infrastructure effectué.

## Design, preuves et conversion

Cycle Observer → Préparer → Intervenir → Vérifier autour du site. Il décrit la démarche, pas un état de supervision en direct. Sur mobile, les étapes passent dans une liste ordonnée en deux colonnes sous le centre du cycle. Pas de dashboard, métriques ni boucle animée. Reveal existant uniquement.

Capture réelle Château de Projan depuis `projects.ts`, utilisée comme réalisation web. Aucun contrat de maintenance ou résultat d’exploitation n’est attribué au client. L’absence de preuve de maintenance documentée reste un constat interne ; pas de disclaimer commercial.

CTA vers `/contact?service=website-care` : Faire le point sur votre site ; Confier la maintenance ; Parler de vos besoins ; Parler de votre site.

Liens sortants : `/creation-site`, `/solutions/web-applications`, `/realisations`, `/ressources`. Ancres : `#supervision`, `#entretien`, `#evolutions`, `#questions`. Un lien entrant naturel est ajouté au bloc de périmètre de `/creation-site`. Header, Footer, Home, chatbot et catalogue inchangés.

## QA visuelle et validation

TypeScript et build isolé de production réussis. Route statique, 1,13 ko de code de route et environ 110 ko de JS initial, socle partagé inclus. Server Component avec Reveal existant ; aucun composant client ni dépendance ajouté. Next Image, dimensions et tailles responsives explicites, chargement différé de la capture.

Chromium de production local : aucun overflow aux largeurs 320, 375, 768, 1024 et 1440 ; captures desktop/mobile inspectées. Image décodée, FAQ ouverte/fermée avec Entrée, parcours Tab et focus visibles contrôlés, reduced motion sans animation active dans le contenu. Aucune erreur JavaScript observée.

H1 unique, canonical et schémas Service/BreadcrumbList contrôlés. Breadcrumb visible **Accueil › Maintenance de site**, identique au JSON-LD. Service minimal, sans offre tarifée ni rating. 17 destinations internes distinctes de la page et de sa navigation répondent sans erreur, ancres comprises. Lien entrant de Création de site confirmé ; responsive de cette page recontrôlé aux cinq largeurs.

CLS initial local ≈ 0,0128 : mesure de laboratoire, pas une mesure terrain. Les fréquences, responsabilités, volumes, horaires et conditions d’intervention restent à convenir au devis. Aucun engagement non validé publié.

Fichiers : `src/app/maintenance-site/page.tsx`, `page.module.css`, `src/data/breadcrumbs.ts`, `src/app/creation-site/page.tsx` et ce compte rendu.
