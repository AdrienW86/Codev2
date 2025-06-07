import Banner from "@/components/Banner/Banner";
import styles from "./page.module.css";

export const metadata = {
  title: "Codev | Accueil",
  description: "Contactez-nous pour discuter de votre projet web.",
};

export default function Home() {
  return (
   <main>
    <Banner />
   </main>
  );
}
