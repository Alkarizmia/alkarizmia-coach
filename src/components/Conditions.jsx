import { useEffect } from "react";
import {
  CONDITIONS,
  CONTACT,
  OWNER,
  telLink,
  whatsappLink,
} from "../site.config.js";

/**
 * Page Conditions générales — /conditions
 * Contenu entièrement piloté par site.config.js.
 */
export default function Conditions() {
  useEffect(() => {
    document.title = `${CONDITIONS.title} | ${OWNER.brand}`;
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="legal-page" id="conditions">
      <div className="container legal-page__wrap">
        <a className="legal-page__back" href="/">
          ← Retour à l'accueil
        </a>

        <header className="legal-page__header">
          <h1 className="legal-page__title">{CONDITIONS.title}</h1>
          <p className="legal-page__intro">{CONDITIONS.intro}</p>
        </header>

        {CONDITIONS.sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="legal-page__section"
            aria-labelledby={`cg-${section.id}`}
          >
            <h2 id={`cg-${section.id}`} className="legal-page__h">
              {section.title}
            </h2>

            {section.paragraphs?.map((text) => (
              <p key={text}>{text}</p>
            ))}

            {section.list && (
              <ul>
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}

            {section.linkToPrivacy && (
              <p>
                <a href={`/${CONDITIONS.privacyHash}`}>{CONDITIONS.privacyLinkLabel}</a>
              </p>
            )}
          </section>
        ))}

        <p className="legal-page__updated">{CONDITIONS.updatedLabel}</p>

        <p className="legal-page__contact">
          Une question ?{" "}
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          {" · "}
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            WhatsApp {CONTACT.whatsappDisplay}
          </a>
          {" · "}
          <a href={telLink()}>Appeler</a>
        </p>
      </div>
    </main>
  );
}
