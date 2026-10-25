import { mailtoLink, whatsappLink } from "../site.config.js";

/**
 * Barre de contact collée en bas — mobile uniquement.
 * Accessible au pouce (email + WhatsApp).
 */
export default function MobileContactBar() {
  return (
    <div className="mobile-contact-bar" role="navigation" aria-label="Contact rapide">
      <a href={mailtoLink("Mon site de coach", "Bonjour Bilal,\n\n")} className="btn btn--secondary">
        E-mail
      </a>
      <a
        href={whatsappLink("Bonjour Bilal, je suis coach et j'aimerais parler d'un site pour mon activité.")}
        className="btn btn--primary"
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp
      </a>
    </div>
  );
}
