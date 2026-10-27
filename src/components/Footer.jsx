import logoMark from "../assets/logo-mark.svg";
import { CONTACT, OWNER, telLink, whatsappLink } from "../site.config.js";
import LegalDialog from "./LegalDialog.jsx";

const YEAR = new Date().getFullYear();

/** Pied de page — marque, liens, contact, mentions légales */
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <a href="#accueil" className="site-header__brand">
            <img
              src={logoMark}
              alt=""
              width="28"
              height="28"
              className="site-header__mark"
            />
            {OWNER.brand}
          </a>
          <p>
            Sites web pour coachs indépendants, à {OWNER.city} et alentours.
          </p>
        </div>

        <nav className="site-footer__col" aria-label="Navigation">
          <p className="site-footer__heading">Navigation</p>
          <a href="#offres">Formules</a>
          <a href="#estimer">Estimer mon site</a>
          <a href="#realisations">Réalisations</a>
          <a href="#faq">FAQ</a>
          <a href="/creation-site-web-coach-bruxelles/">Site coach Bruxelles</a>
          <a href="/prix-site-internet-coach/">Prix</a>
        </nav>

        <div className="site-footer__col">
          <p className="site-footer__heading">Contact</p>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <a href={telLink()}>{CONTACT.whatsappDisplay}</a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <div className="container site-footer__legal">
        <p>
          © {YEAR} {OWNER.brand} · {OWNER.name}
        </p>
        <p className="site-footer__legal-links">
          <a href="#mentions-legales">Mentions légales</a>
          <a href="#confidentialite">Confidentialité</a>
          <a href="#cookies">Cookies</a>
        </p>
      </div>

      <LegalDialog />
    </footer>
  );
}
