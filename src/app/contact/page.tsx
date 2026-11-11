import { getPageBreadcrumb } from "@/data/breadcrumbs";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { defaultShareImages } from "@/lib/seo";

export const metadata = {
  title: "Demande de devis — CODE-V",
  description: "Demandez un devis à CODE-V pour votre site web, votre visibilité Google ou l’automatisation de certaines tâches.",
  alternates: { canonical: "https://www.code-v.fr/contact" },
  openGraph: { title: "Demande de devis — CODE-V", description: "Site web, visibilité Google ou automatisation : expliquez votre besoin en quelques informations.", url: "https://www.code-v.fr/contact", type: "website", locale: "fr_FR", images: defaultShareImages },
};

export default function ContactPage() {
  return (
    <>
      <PageHero breadcrumb={getPageBreadcrumb("/contact")}
        eyebrow="Demande de devis"
        title={
          <>
            Dites-nous ce que vous voulez<br />
            <span>améliorer.</span>
          </>
        }
        text="Un site à refaire, plus de demandes grâce à Google ou trop de tâches manuelles : quelques informations suffisent pour commencer."
      />
      <section className="section contact-section">
        <div className="container contact-layout">
          <div className="contact-details">
            <span className="eyebrow">
              <i />
              Restons en contact
            </span>
            <h2>
              Un échange simple.<br />
              <span>Un devis clair.</span>
            </h2>
            <p>
              Vous n’avez pas besoin de connaître la bonne solution technique. Expliquez simplement votre objectif ; nous vous répondrons avec un périmètre compréhensible.
            </p>
            <div className="contact-links">
              <Link href="mailto:contact@code-v.fr">
                <small>Email</small>
                contact@code-v.fr <span aria-hidden="true">↗</span>
              </Link>
              <Link href="tel:+33666672709">
                <small>Téléphone</small>
                06 66 67 27 09 <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          <div className="contact-form-wrap">
            <div className="form-note">
              <span className="note-dot" />
              Formulaire de prise de contact
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
