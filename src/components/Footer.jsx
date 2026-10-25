import logoMark from "../assets/logo-mark.svg";
import { CONTACT, OWNER } from "../site.config.js";
import LegalDialog from "./LegalDialog.jsx";

const YEAR = new Date().getFullYear();

/** Pied de page — marque, liens, contact, mentions légales */
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <a href="#accueil" className="site-header__brand">
            <img src={logoMark} alt="" width="28" height="28" className="site-header__mark" />
            {OWNER.brand}
          </a>
          <p>Sites web pour coachs indépendants, à {OWNER.city} et alentours.</p>
        </div>

        <nav className="site-footer__col" aria-label="Pied de page">
          <a href="#offres">Formules</a>
          <a href="#estimer">Estimer mon site</a>
          <a href="#realisations">Réalisations</a>
          <a href="#faq">FAQ</a>
        </nav>

        <div className="site-footer__col">
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <span>{CONTACT.whatsappDisplay}</span>
        </div>
      </div>

      <div className="container site-footer__legal">
        <p>© {YEAR} {OWNER.brand} · {OWNER.name}</p>
        <p>
          <a href="#mentions-legales">Mentions légales</a>
          <span aria-hidden="true"> · </span>
          <a href="#confidentialite">Confidentialité</a>
        </p>
      </div>

      <LegalDialog />
    </footer>
  );
}
