import { useEffect, useRef } from "react";
import { initHeaderScroll } from "../motion.js";

/** Header sticky — marque à gauche, CTA à droite */
export default function Header() {
  const ref = useRef(null);

  useEffect(() => initHeaderScroll(ref.current), []);

  return (
    <header ref={ref} className="site-header">
      <div className="container">
        <a href="#accueil" className="site-header__brand">
          Alkarizmia
        </a>
        <a href="#contact" className="btn btn--primary btn--header">
          Me contacter
        </a>
      </div>
    </header>
  );
}
