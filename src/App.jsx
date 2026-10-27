/**
 * Page unique — assemblage des sections.
 */
import { useEffect } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Reparer from "./components/Reparer.jsx";
import Gains from "./components/Gains.jsx";
import Offres from "./components/Offres.jsx";
import Processus from "./components/Processus.jsx";
import Realisations from "./components/Realisations.jsx";
import APropos from "./components/APropos.jsx";
import Faq from "./components/Faq.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import MobileContactBar from "./components/MobileContactBar.jsx";
import WhatsAppFab from "./components/WhatsAppFab.jsx";
import CookieBanner from "./components/CookieBanner.jsx";
import Seo from "./components/Seo.jsx";
import { initScrollReveal } from "./motion.js";
import { useSectionTracking } from "./hooks/useSectionTracking.js";

export default function App() {
  useEffect(() => initScrollReveal(document), []);
  useSectionTracking();

  return (
    <>
      <div className="page-ambiance" aria-hidden="true">
        <span className="page-ambiance__wash" />
        <span className="page-ambiance__grain" />
        <span className="page-ambiance__arcs" />
      </div>
      <Seo />
      <Header />
      <main>
        <Hero />
        <Reparer />
        <Gains />
        <Offres />
        <Processus />
        <Realisations />
        <APropos />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <MobileContactBar />
      <WhatsAppFab />
      <CookieBanner />
    </>
  );
}
