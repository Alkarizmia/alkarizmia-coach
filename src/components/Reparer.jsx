import { useMemo, useState } from "react";
import {
  MOCKUP_MESSAGE,
  PRIMARY_CTA,
  whatsappLink,
} from "../site.config.js";
import { trackEvent } from "../analytics.js";
import { prefersReducedMotion } from "../motion.js";

const FIXES = [
  {
    id: "domaine",
    label: "Nom de domaine",
    gain: "Une adresse qui inspire confiance.",
  },
  {
    id: "titre",
    label: "Titre Google",
    gain: "On comprend tout de suite qui vous êtes.",
  },
  {
    id: "avis",
    label: "Avis Google",
    gain: "Vos clients voient qu'on vous fait confiance.",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    gain: "On vous joint en un tap.",
  },
  {
    id: "rdv",
    label: "Réservation",
    gain: "Le rendez-vous se prend sans friction.",
  },
];

function Spot({ id, done, flash, label, onActivate, children, className }) {
  const on = done.has(id);
  return (
    <div
      className={`reparer__spot${on ? " is-on" : ""}${flash === id ? " is-flash" : ""}${className ? ` ${className}` : ""}`}
    >
      {children}
      {!on && (
        <button
          type="button"
          className="reparer__hotspot"
          onClick={() => onActivate(id)}
          aria-label={label}
        />
      )}
    </div>
  );
}

/** Jeu : réparer un site de coach fictif en 5 clics */
export default function Reparer() {
  const [done, setDone] = useState(() => new Set());
  const [flash, setFlash] = useState(null);
  const score = done.size;
  const complete = score === FIXES.length;

  const activate = (id) => {
    if (done.has(id)) return;
    const next = new Set(done);
    next.add(id);
    setDone(next);
    setFlash(id);
    if (!prefersReducedMotion()) {
      window.setTimeout(() => setFlash((cur) => (cur === id ? null : cur)), 320);
    }
    trackEvent("repair_fix", { fix_id: id, score: next.size });
    if (next.size === FIXES.length) {
      trackEvent("repair_complete");
    }
  };

  const restart = () => {
    setDone(new Set());
    setFlash(null);
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
        <h2 id="reparer-title" className="section__title">
          Réparez ce site en 5 clics
        </h2>

        <div
          className={`reparer__gauge ${gaugeClass}`}
          aria-live="polite"
        >
          <div className="reparer__gauge-bar">
            <span style={{ width: `${(score / 5) * 100}%` }} />
          </div>
          <p className="reparer__gauge-label">
            {score}/5
          </p>
        </div>

        <div className="reparer__layout">
          <div className="reparer__phone-wrap">
            <div
              className={`reparer__phone${complete ? " is-complete" : ""}`}
            >
              <div className="reparer__notch" aria-hidden="true" />
              <div className="reparer__screen">
                <div className="reparer__serp">
                  <Spot
                    id="domaine"
                    done={done}
                    flash={flash}
                    label="Un vrai nom de domaine"
                    onActivate={activate}
                  >
                    <p className="reparer__serp-url">
                      {done.has("domaine")
                        ? "camille-coach.be"
                        : "camille.netlify.app"}
                    </p>
                  </Spot>
                  <Spot
                    id="titre"
                    done={done}
                    flash={flash}
                    label="Corriger le titre Google"
                    onActivate={activate}
                  >
                    <p className="reparer__serp-title">
                      {done.has("titre")
                        ? "Camille, coach de vie à Ixelles"
                        : "Home"}
                    </p>
                  </Spot>
                  <p className="reparer__serp-desc">
                    Coaching de vie · Bruxelles
                  </p>
                </div>

                <div className="reparer__site">
                  <p className="reparer__site-name">Camille</p>
                  <p className="reparer__site-tag">Coach de vie</p>

                  <Spot
                    id="avis"
                    done={done}
                    flash={flash}
                    label="Afficher les avis Google"
                    onActivate={activate}
                    className="reparer__spot--avis"
                  >
                    {done.has("avis") ? (
                      <div className="reparer__reviews is-in">
                        <p className="reparer__stars" aria-hidden="true">
                          ★★★★★
                        </p>
                        <p className="reparer__review">
                          « Claire et concrète. »
                        </p>
                      </div>
                    ) : (
                      <span className="reparer__placeholder">Avis</span>
                    )}
                  </Spot>

                  <div className="reparer__actions-row">
                    <Spot
                      id="rdv"
                      done={done}
                      flash={flash}
                      label="Bouton de réservation"
                      onActivate={activate}
                    >
                      {done.has("rdv") ? (
                        <span className="reparer__cta-rdv is-pop">
                          Prendre rendez-vous
                        </span>
                      ) : (
                        <span className="reparer__placeholder">Réserver</span>
                      )}
                    </Spot>
                    <Spot
                      id="whatsapp"
                      done={done}
                      flash={flash}
                      label="Ajouter WhatsApp"
                      onActivate={activate}
                    >
                      {done.has("whatsapp") ? (
                        <span className="reparer__cta-wa is-bounce">
                          WhatsApp
                        </span>
                      ) : (
                        <span className="reparer__placeholder">WhatsApp</span>
                      )}
                    </Spot>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="reparer__panel">
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

            {complete && (
              <div className="reparer__success" aria-live="polite">
                <p className="reparer__success-msg">
                  Voilà votre site après Alkarizmia
                </p>
                <a
                  href={whatsappLink(MOCKUP_MESSAGE)}
                  className="btn btn--primary"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("cta_whatsapp", { location: "repair_success" })
                  }
                >
                  {PRIMARY_CTA}
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
