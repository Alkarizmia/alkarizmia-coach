import { useEffect, useRef } from "react";
import { initHeaderScroll } from "../motion.js";
import logoMark from "../assets/logo-mark.svg";

/** Header sticky — marque à gauche, CTA à droite */
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
        <a href="#contact" className="btn btn--primary btn--header">
          Me contacter
        </a>
      </div>
    </header>
  );
}
