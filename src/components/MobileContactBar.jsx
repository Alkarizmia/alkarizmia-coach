import { BOOKING_MESSAGE, mailtoLink, whatsappLink } from "../site.config.js";
import { trackEvent } from "../analytics.js";

/**
 * Barre de contact collée en bas — mobile uniquement.
 * Accessible au pouce (email + WhatsApp).
 */
export default function MobileContactBar() {
  return (
    <div className="mobile-contact-bar" role="navigation" aria-label="Contact rapide">
      <a
        href={mailtoLink("Échange gratuit de 15 minutes", BOOKING_MESSAGE)}
        className="btn btn--secondary"
        onClick={() => trackEvent("cta_email", { location: "mobile_bar" })}
      >
        E-mail
      </a>
      <a
        href={whatsappLink(BOOKING_MESSAGE)}
        className="btn btn--primary"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("cta_whatsapp", { location: "mobile_bar" })}
      >
        WhatsApp
      </a>
    </div>
  );
}
