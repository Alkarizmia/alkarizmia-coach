import { useEffect, useRef } from "react";
import { initHeaderScroll } from "../motion.js";
import logoMark from "../assets/logo-mark.svg";

const NAV = [
  { href: "#offres", label: "Formules" },
  { href: "#processus", label: "Étapes" },
  { href: "#realisations", label: "Réalisations" },
  { href: "#faq", label: "FAQ" },
];

/** Header sticky — marque à gauche, navigation (desktop), CTA à droite */
export default function Header() {
  const ref = useRef(null);

  useEffect(() => initHeaderScroll(ref.current), []);

  return (
    <header ref={ref} className="site-header">
      <div className="container">
        <a href="#accueil" className="site-header__brand">
          <img
            src={logoMark}
            alt=""
            width="28"
            height="28"
            className="site-header__mark"
          />
          Alkarizmia
        </a>
        <nav className="site-nav" aria-label="Sections">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="site-nav__link">
              {item.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn btn--primary btn--header">
          Échange 15 min
        </a>
      </div>
    </header>
  );
}
