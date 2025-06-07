"use client";

import { useEffect } from "react";
import { Roboto } from "next/font/google";
import { Bebas_Neue } from "next/font/google";
import { Chewy } from "next/font/google";
import { Bungee_Spice } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "./globals.css";

const chewy = Chewy({
  weight: "400",
  subsets: ["latin"],
  variable: "--fun",
});

const spice = Bungee_Spice({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--spice",
});

const roboto = Roboto({
  variable: "--txt",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--bebas",
});

export default function RootLayout({ children }) {
  useEffect(() => {
    const favicon = document.querySelector("link[rel~='icon']");
    if (!favicon) return;

    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateFavicon = (e) => {
      if (e.matches) {
        favicon.href = "/favicon-dark.png";
      } else {
        favicon.href = "/favicon-light.png";
      }
    };

    updateFavicon(darkModeMediaQuery);

    darkModeMediaQuery.addEventListener("change", updateFavicon);

    return () => {
      darkModeMediaQuery.removeEventListener("change", updateFavicon);
    };
  }, []);

  return (
    <html lang="fr">
      <body
        className={`${roboto.variable} ${bebas.variable} ${chewy.variable} ${spice.variable}`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}