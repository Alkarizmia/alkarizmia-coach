/** Contact — email + WhatsApp uniquement (pas de formulaire) */
const EMAIL = "elfahmi.bilal18@gmail.com";
const WHATSAPP_URL = "https://wa.me/32487870477";
const WHATSAPP_DISPLAY = "+32 487 87 04 77";

export default function Contact() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <h2 id="contact-title">Me contacter</h2>
        <p>
          Un échange de 15 minutes suffit pour voir si un site peut vous être
          utile. Pas d’engagement.
        </p>

        <div className="contact-actions">
          <a
            href={`mailto:${EMAIL}`}
            className="btn btn--primary"
          >
            Envoyer un e-mail
          </a>
          <a
            href={WHATSAPP_URL}
            className="btn btn--secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp — {WHATSAPP_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
}
