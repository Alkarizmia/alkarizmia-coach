import { useEffect, useRef, useState } from "react";
import { MOCKUP_MESSAGE, whatsappLink } from "../site.config.js";
import { trackEvent } from "../analytics.js";
import { burstConfetti } from "../confettiBurst.js";
import { prefersReducedMotion } from "../motion.js";

const GAINS = [
  {
    titre: "Du temps",
    texte: "Moins de messages pour répéter tarifs, horaires et adresse.",
  },
  {
    titre: "Des contacts",
    texte: "WhatsApp, appel ou réservation en un clic.",
  },
  {
    titre: "Une image claire",
    texte: "Vrai domaine, titre Google net, avis visibles.",
  },
];

const SITE_PRICE = 350;
const MIN_PRICE = 5;
const MAX_PRICE = 500;
const STEP = 5;
const FREQS = [
  { value: 1, label: "1× / semaine" },
  { value: 2, label: "2× / semaine" },
  { value: 3, label: "3× / semaine" },
];

const euro = new Intl.NumberFormat("fr-BE", {
  maximumFractionDigits: 0,
});

function clampPrice(raw) {
  const n = Math.round(Number(raw));
  if (!Number.isFinite(n)) return MIN_PRICE;
  return Math.min(MAX_PRICE, Math.max(MIN_PRICE, n));
}

function compute(price, freq) {
  const weekly = price * freq;
  return {
    weekly,
    sessions: Math.ceil(SITE_PRICE / price),
    weeks: Math.ceil(SITE_PRICE / weekly),
    yearly: weekly * 52,
  };
}

function useCountTo(target, runId, reduced) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!runId) return undefined;
    if (reduced) {
      setValue(target);
      return undefined;
    }
    setValue(0);
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / 1000);
      const eased = 1 - (1 - t) ** 3;
      setValue(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, runId, reduced]);

  return value;
}

/** Gains + simulateur « un seul client » (pas une promesse de résultat). */
export default function Gains() {
  const goRef = useRef(null);
  const resultRef = useRef(null);
  const [priceInput, setPriceInput] = useState(String(60));
  const [freq, setFreq] = useState(2);
  const [result, setResult] = useState(null);
  const [runId, setRunId] = useState(0);
  const [reduced] = useState(() =>
    typeof window !== "undefined" ? prefersReducedMotion() : false,
  );

  const counted = useCountTo(result?.yearly ?? 0, runId, reduced);

  const bump = (dir) => {
    setPriceInput(String(clampPrice((Number(priceInput) || 0) + dir * STEP)));
  };

  const showResult = (e) => {
    e.preventDefault();
    const price = clampPrice(priceInput);
    setPriceInput(String(price));
    const next = compute(price, freq);
    setResult(next);
    setRunId((n) => n + 1);
    burstConfetti(goRef.current);
    trackEvent("dream_sim_result", {
      price,
      frequency: freq,
      weeks: next.weeks,
      yearly: next.yearly,
    });
    requestAnimationFrame(() => {
      resultRef.current?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "nearest",
      });
    });
  };

  return (
    <section
      id="gains"
      className="section section-tone section-tone--chapter section-tone--arcs"
      aria-labelledby="gains-title"
    >
      <div className="container">
        <h2 id="gains-title" className="section__title" data-reveal>
          Ce que vous y gagnez
        </h2>

        <ul className="gains__grid">
          {GAINS.map((item) => (
            <li
              key={item.titre}
              className="gains__card"
              data-reveal
              data-reveal-group="gains"
            >
              <h3 className="gains__card-title">{item.titre}</h3>
              <p className="gains__card-text">{item.texte}</p>
            </li>
          ))}
        </ul>

        <form className="gains__calc" data-reveal onSubmit={showResult}>
          <p className="gains__calc-kicker">Et si on rêvait un peu ?</p>
          <h3 className="gains__calc-title">Imaginez un seul nouveau client.</h3>
          <p className="gains__calc-note">Juste un. Grâce à votre site.</p>

          <label className="gains-sim__label" htmlFor="gains-price">
            Le prix d'une séance chez vous
          </label>
          <div className="gains-sim__stepper">
            <button
              type="button"
              className="gains-sim__step"
              onClick={() => bump(-1)}
              aria-label="Diminuer de 5 euros"
            >
              −
            </button>
            <div className="gains-sim__amount">
              <input
                id="gains-price"
                className="gains-sim__input"
                type="number"
                inputMode="numeric"
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={STEP}
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
                onBlur={() => setPriceInput(String(clampPrice(priceInput)))}
              />
              <span aria-hidden="true">€</span>
            </div>
            <button
              type="button"
              className="gains-sim__step"
              onClick={() => bump(1)}
              aria-label="Augmenter de 5 euros"
            >
              +
            </button>
          </div>

          <p className="gains-sim__label" id="gains-freq-label">
            Il vient…
          </p>
          <div
            className="gains-sim__chips"
            role="radiogroup"
            aria-labelledby="gains-freq-label"
          >
            {FREQS.map((item) => {
              const active = freq === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  className={`gains-sim__chip${active ? " is-on" : ""}`}
                  onClick={() => setFreq(item.value)}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <p className="gains-sim__site-price">
            Prix du site : {SITE_PRICE} € (formule Essentiel)
          </p>

          <button
            ref={goRef}
            type="submit"
            className="btn btn--primary gains-sim__go"
          >
            Voir le résultat
          </button>

          {result && (
            <div
              ref={resultRef}
              className={`gains-sim__result${reduced ? " is-static" : ""}`}
              aria-live="polite"
            >
              <p className="gains-sim__headline">
                🎉 Votre site est rentabilisé en {result.weeks}{" "}
                {result.weeks === 1 ? "semaine" : "semaines"}.
              </p>
              <p className="gains-sim__line">
                Soit seulement {result.sessions}{" "}
                {result.sessions === 1 ? "séance" : "séances"} avec ce seul
                client.
              </p>
              <p className="gains-sim__year">
                Et sur un an, ce client vous rapporte ≈ {euro.format(counted)} €
              </p>
              <p className="gains-sim__disclaimer">
                Ceci est une simulation, pas une promesse. Mais un seul client
                suffit.
              </p>
              <a
                className="btn btn--primary gains-sim__cta"
                href={whatsappLink(MOCKUP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("cta_whatsapp", { location: "dream_sim" })
                }
              >
                Je veux mon site
              </a>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
