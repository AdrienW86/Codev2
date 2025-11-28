import HomeBanner from "@/components/HomeBanner/HomeBanner";
import ServicesComponent from '@/components/ServicesComponent/ServicesComponent'
import HomeComponent from "@/components/HomeComponent/HomeComponent";

export const metadata = {
  title: "Codev | Accueil",
  description: "Contactez-nous pour discuter de votre projet web.",
};

export default function Home() {
  return (
  <>
    <HomeBanner />
    <ServicesComponent />
    <HomeComponent />
   </>
  );
}