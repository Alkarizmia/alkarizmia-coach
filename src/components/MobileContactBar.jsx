/**
 * Barre de contact collée en bas — mobile uniquement.
 * Accessible au pouce (email + WhatsApp).
 */
const EMAIL = "elfahmi.bilal18@gmail.com";
const WHATSAPP_URL = "https://wa.me/32487870477";

export default function MobileContactBar() {
  return (
    <div className="mobile-contact-bar" role="navigation" aria-label="Contact rapide">
      <a href={`mailto:${EMAIL}`} className="btn btn--secondary">
        E-mail
      </a>
      <a
        href={WHATSAPP_URL}
        className="btn btn--primary"
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp
      </a>
    </div>
  );
}
