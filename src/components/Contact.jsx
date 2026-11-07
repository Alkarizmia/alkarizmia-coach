import {
  BOOKING_MESSAGE,
  CONTACT,
  mailtoLink,
  whatsappLink,
} from "../site.config.js";
import { trackEvent } from "../analytics.js";

/** Contact — email + WhatsApp (pas de formulaire), messages pré-remplis */
export default function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact__card" data-reveal>
          <div className="contact__copy">
            <p className="contact__kicker">Prochaine étape</p>
            <h2 id="contact-title" className="contact__title">
              Réservez un échange gratuit de 15 minutes.
            </h2>
            <p>
              Sans engagement. On regarde votre situation et on voit si un site
              peut vous être utile.
            </p>
            <a
              href="#estimer"
              className="contact__estimate"
              onClick={() =>
                trackEvent("nav_estimer", { location: "contact" })
              }
            >
              Ou estimez d'abord votre prix →
            </a>
          </div>

          <div className="contact__actions">
            <a
              href={whatsappLink(BOOKING_MESSAGE)}
              className="contact__channel"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("cta_whatsapp", { location: "contact" })
              }
            >
              <span className="contact__channel-label">WhatsApp</span>
              <span className="contact__channel-value">{CONTACT.whatsappDisplay}</span>
              <span className="contact__channel-arrow" aria-hidden="true">↗</span>
            </a>
            <a
              href={mailtoLink(
                "Échange gratuit de 15 minutes",
                BOOKING_MESSAGE
              )}
              className="contact__channel"
              onClick={() => trackEvent("cta_email", { location: "contact" })}
            >
              <span className="contact__channel-label">E-mail</span>
              <span className="contact__channel-value">{CONTACT.email}</span>
              <span className="contact__channel-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
