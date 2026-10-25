import { CONTACT, mailtoLink, whatsappLink } from "../site.config.js";

const WA_MESSAGE =
  "Bonjour Bilal, je suis coach et j'aimerais parler d'un site pour mon activité.";

/** Contact — email + WhatsApp (pas de formulaire), messages pré-remplis */
export default function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact__card" data-reveal>
          <div className="contact__copy">
            <p className="contact__kicker">Prochaine étape</p>
            <h2 id="contact-title" className="contact__title">
              Parlons de votre site.
            </h2>
            <p>
              Un échange de 15 minutes suffit pour voir si un site peut vous être
              utile. Pas d’engagement.
            </p>
            <a href="#estimer" className="contact__estimate">
              Ou estimez d'abord votre prix →
            </a>
          </div>

          <div className="contact__actions">
            <a
              href={whatsappLink(WA_MESSAGE)}
              className="contact__channel"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact__channel-label">WhatsApp</span>
              <span className="contact__channel-value">{CONTACT.whatsappDisplay}</span>
              <span className="contact__channel-arrow" aria-hidden="true">↗</span>
            </a>
            <a
              href={mailtoLink("Mon site de coach", "Bonjour Bilal,\n\n")}
              className="contact__channel"
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
