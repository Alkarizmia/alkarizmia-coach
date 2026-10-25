/**
 * Page unique — assemblage des sections.
 */
import { useEffect } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Offres from "./components/Offres.jsx";
import Processus from "./components/Processus.jsx";
import Realisations from "./components/Realisations.jsx";
import APropos from "./components/APropos.jsx";
import Faq from "./components/Faq.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import MobileContactBar from "./components/MobileContactBar.jsx";
import Seo from "./components/Seo.jsx";
import { initScrollReveal } from "./motion.js";

export default function App() {
  useEffect(() => initScrollReveal(document), []);

  return (
    <>
      <div className="page-ambiance" aria-hidden="true">
        <span className="page-ambiance__blob page-ambiance__blob--a" />
        <span className="page-ambiance__blob page-ambiance__blob--b" />
        <span className="page-ambiance__blob page-ambiance__blob--c" />
        <span className="page-ambiance__grain" />
      </div>
      <Seo />
      <Header />
      <main>
        <Hero />
        <Offres />
        <Processus />
        <Realisations />
        <APropos />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <MobileContactBar />
    </>
  );
}
