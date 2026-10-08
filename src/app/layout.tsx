import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConversionTracking from "@/components/ConversionTracking";
import { getTrackingConfig } from "@/lib/conversion-config";
import { siteOrigin } from "@/data/public-routes";
import { SpeedInsights } from "@vercel/speed-insights/next";
import RobotAssistant from "@/components/RobotAssistant/RobotAssistant";
import "./globals.css";

// Self-hosted by Next at build time: no browser request to Google Fonts, metric-matched fallbacks against layout shift.
// Same request as the former @import (variable files, one per family and subset); only the latin subset is preloaded.
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap", variable: "--font-dm-sans" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap", variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: "CODE-V — Création web, SEO et publicité",
  description: "CODE-V accompagne les entreprises dans leur visibilité et leur développement digital.",
  openGraph: {
    title: "CODE-V — Création web, SEO et publicité",
    description: "Des expériences digitales pensées pour faire grandir votre activité.",
    siteName: "CODE-V",
    type: "website",
    locale: "fr_FR",
  },
  // Title, description and image are inherited from each page's Open Graph data.
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${spaceGrotesk.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <RobotAssistant />
        <Footer />
        <ConversionTracking config={getTrackingConfig()} />
        <SpeedInsights />
      </body>
    </html>
  );
}
