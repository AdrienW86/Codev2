import { getPageBreadcrumb } from "@/data/breadcrumbs";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact — Codev",
  description: "Parlez-nous de votre projet digital et de vos objectifs.",
  alternates: { canonical: "https://www.code-v.fr/contact" },
  openGraph: { title: "Contact — CODE-V", description: "Parlez-nous de votre projet digital et de vos objectifs.", url: "https://www.code-v.fr/contact", type: "website", locale: "fr_FR" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero breadcrumb={getPageBreadcrumb("/contact")}
        eyebrow="Contact"
        title={
          <>
            Une idée ?<br />
            <span>On l'écoute.</span>
          </>
        }
        text="Un projet de site, une question de visibilité ou simplement l'envie de faire le point ? Écrivez-nous, nous vous répondrons avec plaisir."
      />
      <section className="section contact-section">
        <div className="container contact-layout">
          <div className="contact-details">
            <span className="eyebrow">
              <i />
              Restons en contact
            </span>
            <h2>
              Construisons la<br />
              <span>suite ensemble.</span>
            </h2>
            <p>
              Un premier échange suffit souvent à faire émerger les bonnes questions. Pas de jargon, pas d'engagement : juste une conversation utile.
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
