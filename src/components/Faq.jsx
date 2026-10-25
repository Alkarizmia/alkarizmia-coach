import { FAQ_ITEMS } from "../content/faq.js";

/** FAQ — accordéon (details / summary, sans JS) */
export default function Faq() {
  return (
    <section
      id="faq"
      className="section section-tone section-tone--sand"
      aria-labelledby="faq-title"
    >
      <div className="container faq__grid">
        <div className="faq__intro">
          <p className="section__eyebrow" data-reveal>
            FAQ
          </p>
          <h2 id="faq-title" className="section__title" data-reveal>
            Questions fréquentes
          </h2>
          <p data-reveal>
            Une autre question ? Écrivez-moi, je réponds personnellement.
          </p>
        </div>

        <div className="faq__list">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.q}
              className="faq__item"
              data-reveal
              data-reveal-group="faq"
            >
              <summary className="faq__q">
                <span>{item.q}</span>
                <span className="faq__icon" aria-hidden="true" />
              </summary>
              <div className="faq__a">
                <p>{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
