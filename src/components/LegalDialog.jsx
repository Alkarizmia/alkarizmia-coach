import { useEffect, useRef, useState } from "react";
import { CONTACT, HOSTING, OWNER, PRIVACY } from "../site.config.js";

const PENDING = "en cours d'enregistrement";

/** Ouvre la fenêtre quand l'URL se termine par #mentions-legales ou #confidentialite */
const HASHES = { "#mentions-legales": "mentions", "#confidentialite": "confidentialite" };

/**
 * Mentions légales et confidentialité — fenêtre <dialog> native.
 * Les infos d'identité viennent de site.config.js.
 */
export default function LegalDialog() {
  const ref = useRef(null);
  const [tab, setTab] = useState("mentions");

  useEffect(() => {
    const dialog = ref.current;
    const sync = () => {
      const target = HASHES[window.location.hash];
      if (target) {
        setTab(target);
        if (!dialog.open) dialog.showModal();
      }
    };
    const onClose = () => {
      if (HASHES[window.location.hash]) {
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    dialog.addEventListener("close", onClose);
    return () => {
      window.removeEventListener("hashchange", sync);
      dialog.removeEventListener("close", onClose);
    };
  }, []);

  /* Clic sur le fond = fermeture */
  const onBackdrop = (e) => {
    if (e.target === ref.current) ref.current.close();
  };

  return (
    <dialog
      ref={ref}
      className="legal"
      aria-labelledby="legal-title"
      onClick={onBackdrop}
    >
      <div className="legal__inner">
        <div className="legal__head">
          <h2 id="legal-title" className="legal__title">
            {tab === "mentions" ? "Mentions légales" : "Confidentialité"}
          </h2>
          <button
            type="button"
            className="legal__close"
            onClick={() => ref.current.close()}
            aria-label="Fermer"
          >
            ×
          </button>
        </div>

        <div className="legal__tabs" role="tablist" aria-label="Informations légales">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "mentions"}
            className="legal__tab"
            onClick={() => setTab("mentions")}
          >
            Mentions légales
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "confidentialite"}
            className="legal__tab"
            onClick={() => setTab("confidentialite")}
          >
            Confidentialité
          </button>
        </div>

        {tab === "mentions" ? (
          <div className="legal__body" role="tabpanel">
            <h3>Éditeur du site</h3>
            <p>
              {OWNER.brand} — {OWNER.name}, activité de création de sites web.
              <br />
              {OWNER.address || `${OWNER.city}, ${OWNER.country}`}
              <br />
              Numéro d'entreprise (BCE) : {OWNER.bce || PENDING}
              {OWNER.vat && (
                <>
                  <br />
                  TVA : {OWNER.vat}
                </>
              )}
              <br />
              E-mail : {CONTACT.email}
              <br />
              Téléphone / WhatsApp : {CONTACT.whatsappDisplay}
            </p>
            <p>Responsable de la publication : {OWNER.name}.</p>

            <h3>Hébergement</h3>
            <p>
              {HOSTING.name}, {HOSTING.address}.{" "}
              <a href={HOSTING.url} target="_blank" rel="noopener noreferrer">
                vercel.com
              </a>
            </p>

            <h3>Propriété intellectuelle</h3>
            <p>
              Les textes, le logo et la mise en page de ce site appartiennent à{" "}
              {OWNER.brand}. Toute reproduction sans autorisation est interdite.
              Les exemples de sites présentés dans le haut de page sont fictifs.
              Polices : Fraunces et Inter, sous licence SIL Open Font License.
            </p>

            <h3>Responsabilité</h3>
            <p>
              Les prix affichés et ceux du simulateur sont indicatifs. Le prix
              définitif est confirmé par écrit avant le début de chaque projet.
            </p>
          </div>
        ) : (
          <div className="legal__body" role="tabpanel">
            {PRIVACY.sections.map((section) => (
              <div key={section.title}>
                <h3>{section.title}</h3>
                {section.paragraphs.map((text) => (
                  <p key={text.slice(0, 48)}>{text}</p>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </dialog>
  );
}
