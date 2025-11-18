import Banner from "@/components/Banner/Banner";
import Intro from "@/components/Intro/Intro";
import Description from "@/components/Description/Description";
import Instagram from "@/components/Instragram/Inbstagram";
import HomeComponent from "@/components/HomeComponent/HomeComponent";
import FacebookWidget from "@/components/Facebook/Facebook";
import styles from "./page.module.css";

export const metadata = {
  title: "Codev | Accueil",
  description: "Contactez-nous pour discuter de votre projet web.",
};

export default function Home() {
  return (
  <>
    <HomeComponent /> 
    {/* <Banner />
    <Intro />
    <Description />
    <Instagram /> */}
  

 

   </>
  );
}
