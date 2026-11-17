/** Public tool entry points; add future tools here when their pages exist. */
export const toolsCatalog = [
  {
    id: 'pdf', number: '01', category: 'DOCUMENTS', title: 'Remplir un PDF',
    description: 'Un formulaire à compléter, une case à cocher ou un devis à signer ? Ajoutez vos informations et téléchargez votre document.',
    href: '/outils/remplir-pdf', cta: 'Compléter mon PDF',
    features: ['Texte, coches et dates', 'Signature et tampon', 'Documents traités sur votre appareil'],
  },
  {
    id: 'performance', number: '02', category: 'SITE WEB', title: 'Analyser un site web',
    description: 'Votre site est-il assez rapide ? Mesurez ses performances et repérez les améliorations techniques à prioriser.',
    href: '/outils/analyser-site-web', cta: 'Analyser mon site',
    features: ['Vitesse sur mobile et ordinateur', 'SEO technique et accessibilité', 'Rapport et pistes d’amélioration'],
  },
] as const;
