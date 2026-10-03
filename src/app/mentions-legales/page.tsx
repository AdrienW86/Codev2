import { getPageBreadcrumb } from "@/data/breadcrumbs";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Mentions légales — Codev",
  description: "Informations légales du site Codev, à compléter avant publication.",
};

export default function LegalPage() {
  return (
    <>
      <PageHero breadcrumb={getPageBreadcrumb("/mentions-legales")} eyebrow="Informations" title={<>Mentions<br /><span>légales.</span></>} text="Cette page est une base provisoire. Les informations légales devront être complétées et validées avant la mise en ligne publique du site." />
      <section className="section legal-section"><div className="container legal-content"><div className="legal-alert"><span>i</span><div><strong>Page provisoire</strong><p>Les éléments ci-dessous sont volontairement laissés à compléter. Aucune information légale n’a été inventée.</p></div></div><div className="legal-grid"><article><span>01</span><h2>Éditeur du site</h2><p>Raison sociale : à compléter<br />Forme juridique : à compléter<br />SIRET : à compléter<br />Adresse : à compléter</p></article><article><span>02</span><h2>Hébergement</h2><p>Hébergeur : à compléter<br />Adresse de l’hébergeur : à compléter<br />Téléphone : à compléter</p></article><article><span>03</span><h2>Publication</h2><p>Directeur de la publication : à compléter<br />Responsable de la publication : à compléter</p></article><article><span>04</span><h2>Contact</h2><p>Email : codev66000@gmail.com<br />Téléphone : 06 66 67 27 09<br /><br />Coordonnées à vérifier avant publication.</p></article></div></div></section>
    </>
  );
}
