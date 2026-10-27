import { useMemo, useState } from "react";
import { BOOKING_MESSAGE, mailtoLink } from "../site.config.js";
import { trackEvent } from "../analytics.js";

const FIXES = [
  {
    id: "avis",
    label: "Afficher les avis Google",
    gain: "Vos clients voient qu'on vous fait confiance.",
  },
  {
    id: "whatsapp",
    label: "Ajouter WhatsApp",
    gain: "On vous joint en un tap.",
  },
  {
    id: "titre",
    label: "Corriger le titre Google",
    gain: "On comprend tout de suite qui vous êtes.",
  },
  {
    id: "domaine",
    label: "Un vrai nom de domaine",
    gain: "Une adresse qui inspire confiance.",
  },
  {
    id: "rdv",
    label: "Bouton de réservation",
    gain: "Le rendez-vous se prend sans friction.",
  },
];

/** Jeu : réparer un site de coach fictif en 5 clics */
export default function Reparer() {
  const [done, setDone] = useState(() => new Set());
  const [lastGain, setLastGain] = useState("");
  const score = done.size;
  const complete = score === FIXES.length;

  const activate = (id) => {
    if (done.has(id)) return;
    const next = new Set(done);
    next.add(id);
    setDone(next);
    const fix = FIXES.find((f) => f.id === id);
    setLastGain(fix?.gain ?? "");
    trackEvent("repair_fix", { fix_id: id, score: next.size });
    if (next.size === FIXES.length) {
      trackEvent("repair_complete");
    }
  };

  const restart = () => {
    setDone(new Set());
    setLastGain("");
    trackEvent("repair_restart");
  };

  const gaugeClass = useMemo(() => {
    if (score >= 4) return "is-good";
    if (score >= 2) return "is-mid";
    return "is-low";
  }, [score]);

  return (
    <section
      id="reparer"
      className="section section-tone reparer"
      aria-labelledby="reparer-title"
    >
      <div className="container">
        <h2 id="reparer-title" className="section__title" data-reveal>
          Réparez ce site en 5 clics
        </h2>

        <div
          className={`reparer__gauge ${gaugeClass}`}
          data-reveal
          aria-live="polite"
        >
          <div className="reparer__gauge-bar" style={{ "--score": score }}>
            <span style={{ width: `${(score / 5) * 100}%` }} />
          </div>
          <p className="reparer__gauge-label">
            Score {score}/5
          </p>
        </div>

        <div className="reparer__layout">
          <div className="reparer__phone-wrap" data-reveal>
            <div
              className={`reparer__phone${complete ? " is-complete" : ""}`}
              aria-hidden="true"
            >
              <div className="reparer__notch" />
              <div className="reparer__screen">
                <div className="reparer__serp">
                  <p className="reparer__serp-url">
                    {done.has("domaine")
                      ? "camille-coach.be"
                      : "camille.netlify.app"}
                  </p>
                  <p className="reparer__serp-title">
                    {done.has("titre")
                      ? "Camille, coach de vie à Ixelles"
                      : "Home"}
                  </p>
                  <p className="reparer__serp-desc">
                    Coaching de vie · Bruxelles
                  </p>
                </div>

                <div className="reparer__site">
                  <p className="reparer__site-name">Camille</p>
                  <p className="reparer__site-tag">Coach de vie</p>

                  {done.has("avis") && (
                    <div className="reparer__reviews is-in">
                      <p className="reparer__stars" aria-hidden="true">
                        ★★★★★
                      </p>
                      <p className="reparer__review">
                        « Claire et concrète. » (avis fictif)
                      </p>
                      <p className="reparer__review">
                        « Je me sens plus alignée. » (avis fictif)
                      </p>
                    </div>
                  )}

                  <div className="reparer__actions-row">
                    {done.has("rdv") && (
                      <span className="reparer__cta-rdv is-pop">
                        Prendre rendez-vous
                      </span>
                    )}
                    {done.has("whatsapp") && (
                      <span className="reparer__cta-wa is-bounce">
                        WhatsApp
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="reparer__panel" data-reveal>
            <ul className="reparer__fixes">
              {FIXES.map((fix) => {
                const active = done.has(fix.id);
                return (
                  <li key={fix.id}>
                    <button
                      type="button"
                      className={`reparer__fix${active ? " is-done" : ""}`}
                      onClick={() => activate(fix.id)}
                      aria-pressed={active}
                      disabled={active}
                    >
                      <span className="reparer__check" aria-hidden="true">
                        {active ? "✓" : ""}
                      </span>
                      <span className="reparer__fix-label">{fix.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {lastGain && !complete && (
              <p className="reparer__gain" aria-live="polite">
                {lastGain}
              </p>
            )}

            {complete && (
              <div className="reparer__success" aria-live="polite">
                <div className="reparer__burst" aria-hidden="true" />
                <p className="reparer__success-msg">
                  C'est exactement ce que je fais pour vous.
                </p>
                <a
                  href={mailtoLink(
                    "Échange gratuit de 15 minutes",
                    BOOKING_MESSAGE
                  )}
                  className="btn btn--primary"
                  onClick={() =>
                    trackEvent("cta_email", { location: "repair_success" })
                  }
                >
                  Échange gratuit · 15 min
                </a>
              </div>
            )}

            <button
              type="button"
              className="reparer__restart"
              onClick={restart}
            >
              Recommencer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
