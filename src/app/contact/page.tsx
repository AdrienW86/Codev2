import { getPageBreadcrumb } from "@/data/breadcrumbs";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { defaultShareImages } from "@/lib/seo";

export const metadata = {
  title: "Contact — CODE-V",
  description: "Parlez à CODE-V de votre besoin : construire votre présence, générer des demandes, automatiser votre activité ou mieux piloter votre digital.",
  alternates: { canonical: "https://www.code-v.fr/contact" },
  openGraph: { title: "Contact — CODE-V", description: "Un besoin concret : construire, attirer, automatiser ou piloter ? Parlons du bon point d’entrée.", url: "https://www.code-v.fr/contact", type: "website", locale: "fr_FR", images: defaultShareImages },
};

export default function ContactPage() {
  return (
    <>
      <PageHero breadcrumb={getPageBreadcrumb("/contact")}
        eyebrow="Contact"
        title={
          <>
            Un besoin concret ?<br />
            <span>Trouvons le bon levier.</span>
          </>
        }
        text="Créer ou refondre un site, obtenir plus de demandes, automatiser des tâches ou structurer votre digital : décrivez la situation, nous cadrerons la suite."
      />
      <section className="section contact-section">
        <div className="container contact-layout">
          <div className="contact-details">
            <span className="eyebrow">
              <i />
              Restons en contact
            </span>
            <h2>
              Partons du<br />
              <span>problème à résoudre.</span>
            </h2>
            <p>
              Vous n’avez pas à connaître le nom de la prestation. Expliquez ce qui vous freine ou ce que vous voulez obtenir ; nous identifierons le bon point d’entrée.
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
