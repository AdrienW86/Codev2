import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RobotAssistant from "@/components/RobotAssistant/RobotAssistant";
import "./globals.css";

export const metadata: Metadata = {
  title: "Codev — Création web, SEO et publicité",
  description: "Codev accompagne les entreprises dans leur visibilité et leur développement digital.",
  openGraph: {
    title: "Codev — Création web, SEO et publicité",
    description: "Des expériences digitales pensées pour faire grandir votre activité.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main>{children}</main>
        <RobotAssistant />
        <Footer />
      </body>
    </html>
  );
}