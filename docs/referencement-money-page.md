# Référencement naturel — money page CODE-V

## Correction éditoriale publique

Le bloc de réalisations présente désormais « Des projets concrets. Une approche mesurable. », le texte commercial validé et le CTA « Voir nos réalisations ». Narbonne Toiture reste un exemple de réalisation web, sans attribution de résultat SEO. Les justifications sur l’absence de preuves, de métriques ou d’audit sont retirées du bloc, des légendes et du diagnostic publics. Les constats internes ci-dessous restent dans cette documentation. Règle globale : [règles éditoriales CODE-V](./editorial-guidelines.md).

## Audit avant modification

Ancienne page : PageHero, H1 « Soyez visible au bon moment. », title « Référencement naturel — Codev », description « Améliorez votre positionnement sur Google et soyez visible au bon moment. ». Aucun canonical propre. Introduction « Pas de magie. Une stratégie. », trois blocs Comprendre / Optimiser / Progresser, puis contact générique.

Conservés : URL, idée d’une stratégie sans magie, ton direct et breadcrumb. Faiblesses : périmètre abstrait, aucune explication du diagnostic ou du suivi, absence de preuve et de FAQ, CTA peu contextualisés. Aucun développement local substantiel à reprendre ; la nouvelle page précise explicitement cette frontière.

## Positionnement et métadonnées

`/referencement` porte l’accompagnement SEO organique du site : architecture, exploration/indexation, technique, performance, intentions de recherche, contenus, maillage et optimisation continue. La future page locale portera Google Business Profile, Maps et les recherches géographiques. Deux mentions pédagogiques brèves cadrent la différence ; aucun lien vers une route locale non publiée.

- Title : **Référencement naturel : accompagnement SEO | CODE-V**
- Description : **Structure, technique, contenus et maillage : CODE-V accompagne le référencement naturel de votre site, du diagnostic aux optimisations et au suivi, sans position garantie.**
- H1 : **Le SEO. Un système à construire.**
- Canonical : `https://www.code-v.fr/referencement`

Parcours : architecture illustrée → fonctionnement des moteurs → problèmes et diagnostic → fondations techniques, éditoriales et maillage → suivi et conversion → réalisation réelle → périmètre/refonte/local → FAQ → contact. Le graphe n’est ni un audit réalisé ni un dashboard de performance. Sur mobile, les branches deviennent un parcours vertical relié, avec les mêmes liens accessibles.

Référence technique : [fonctionnement de Google Search](https://developers.google.com/search/docs/fundamentals/how-search-works), [guide SEO Google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide). Exploration, indexation et affichage sont distingués ; aucune étape ni position n’est garantie.

## Preuves, conversion et maillage

Narbonne Toiture, projet publié dans `src/data/projects.ts`, utilise sa capture réelle existante. Cette preuve concerne la production d’un site, jamais un résultat SEO. Aucun résultat vérifié, chiffre de trafic, classement, témoignage, prix ou délai garanti n’est ajouté. La rédaction, la refonte et les campagnes ne sont pas incluses implicitement.

Les quatre CTA demandés conduisent à `/contact?service=seo` : Parler de votre visibilité ; Faire le point sur votre référencement ; Construire une stratégie SEO ; Parler de votre projet. Les intents existants ne comportent pas SEO : aucun nouvel intent ni changement du chatbot.

Liens éditoriaux : `/solutions`, `/realisations`, `/ressources`, `/creation-site` et `/contact?service=seo`. Ancres : `#diagnostic`, `#fondations`, `#suivi`, `#questions`. Le bloc de ressources utilise `getResourcesByService("seo")` et reste absent tant qu’aucun contenu associé n’est publié.

Breadcrumb visible **Accueil › Référencement naturel**, BreadcrumbList identique. Service JSON-LD minimal : prestation, description, URL et provider CODE-V, sans offre tarifée, résultat, note ou avis. FAQ native de sept questions ; pas de données structurées FAQPage ajoutées.

## QA visuelle et validation

TypeScript et build isolé de production réussis. Contrôle Chromium de la page en production :

- 320, 375, 768, 1024 et 1440 px : aucun overflow horizontal ; inspection des captures desktop et mobile.
- Capture réelle décodée ; Next Image avec dimensions et tailles responsives, chargement différé sous le premier écran.
- FAQ ouverte/fermée avec Entrée ; parcours Tab et outlines visibles vérifiés.
- `prefers-reduced-motion` : aucune animation active dans le contenu ; primitives Reveal existantes, pas de boucle permanente.
- H1 unique, canonical, BreadcrumbList et Service contrôlés ; 19 destinations internes distinctes de la page et de sa navigation répondent sans erreur, ancres vérifiées. Aucun draft de ressource lié.
- Aucune erreur JavaScript observée. CLS local au premier chargement ≈ 0,0125 : mesure de laboratoire, pas une mesure terrain.
- Route statique, code de route 1,28 ko ; JS initial environ 110 ko, socle partagé inclus. Aucun nouveau lecteur, framework ou composant client.

Restent à valider commercialement : périmètre exact du devis, volume de rédaction et fréquence de suivi. Des résultats SEO clients ne pourront être publiés qu’avec des données vérifiées et leur contexte. Les performances terrain et l’indexation réelle nécessiteront des observations après publication.

Fichiers de cette étape : `src/app/referencement/page.tsx`, `src/app/referencement/page.module.css` et ce document. Home, autres pages, catalogue, navigation et logique du chatbot non modifiés.
