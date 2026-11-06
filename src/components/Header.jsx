import { useEffect, useRef, useState } from "react";
import { initHeaderScroll } from "../motion.js";
import { MOCKUP_MESSAGE, PRIMARY_CTA, whatsappLink } from "../site.config.js";
import { trackEvent } from "../analytics.js";
import logoMark from "../assets/logo-mark.svg";

const NAV = [
  { href: "/#offres", label: "Formules" },
  { href: "/#processus", label: "Étapes" },
  { href: "/#realisations", label: "Réalisations" },
  { href: "/#faq", label: "FAQ" },
];

/** Header sticky — marque, navigation (desktop), un seul CTA. */
export default function Header() {
  const ref = useRef(null);
  const [showCta, setShowCta] = useState(false);

  useEffect(() => initHeaderScroll(ref.current), []);

  useEffect(() => {
    const hero = document.getElementById("accueil");
    if (!hero) {
      setShowCta(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => setShowCta(!entry.isIntersecting),
      { threshold: 0.2 }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <header ref={ref} className="site-header">
      <div className="container">
        <a href="/#accueil" className="site-header__brand">
          <img
            src={logoMark}
            alt=""
            width="28"
            height="28"
            className="site-header__mark"
          />
          <span className="site-header__name">Alkarizmia</span>
        </a>
        <nav className="site-nav" aria-label="Sections">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="site-nav__link">
              {item.label}
            </a>
          ))}
        </nav>
        {showCta ? (
          <a
            href={whatsappLink(MOCKUP_MESSAGE)}
            className="btn btn--primary btn--header site-header__cta"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("cta_whatsapp", { location: "header" })}
          >
            {PRIMARY_CTA}
          </a>
        ) : (
          <span className="site-header__cta-slot" aria-hidden="true" />
        )}
      </div>
    </header>
  );
}
