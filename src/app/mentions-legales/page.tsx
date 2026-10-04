import { getPageBreadcrumb } from "@/data/breadcrumbs";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Mentions légales — Codev",
  description: "Informations relatives au site CODE-V et coordonnées de contact.",
  alternates: { canonical: "https://www.code-v.fr/mentions-legales" },
  robots: { index: false, follow: true },
};

export default function LegalPage() {
  return (
    <>
      <PageHero breadcrumb={getPageBreadcrumb("/mentions-legales")} eyebrow="Informations" title={<>Mentions<br /><span>légales.</span></>} text="Informations relatives au site CODE-V et coordonnées de contact." />
      <section className="section legal-section"><div className="container legal-content"><h2>Contact</h2><p><a href="mailto:contact@code-v.fr">contact@code-v.fr</a><br /><a href="tel:+33666672709">06 66 67 27 09</a></p></div></section>
    </>
  );
}
