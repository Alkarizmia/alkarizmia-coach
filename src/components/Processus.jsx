import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../motion.js";

const TOTAL_DAYS = 10;

/** Étapes : jours de début et de fin sur les 10 jours de la promesse */
const STEPS = [
  {
    title: "Échange de 15 min",
    from: 1,
    to: 1,
    text: "On parle de votre activité, de vos clients et de ce que le site doit faire pour vous.",
  },
  {
    title: "Création",
    from: 2,
    to: 9,
    text: "Je conçois et construis votre site. Vous validez les grandes lignes en cours de route.",
  },
  {
    title: "Livraison",
    from: 10,
    to: 10,
    text: "Vous recevez le site avec un accès complet.",
  },
];

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

function dayLabel(step) {
  return step.from === step.to ? `Jour ${step.from}` : `Jours ${step.from} à ${step.to}`;
}

/**
 * Comment ça se passe — les 10 jours défilent avec le scroll :
 * compteur, ligne de progression et étape active.
 */
export default function Processus() {
  const listRef = useRef(null);
  const reducedRef = useRef(false);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    reducedRef.current = prefersReducedMotion();
    if (reducedRef.current) return undefined;

    const list = listRef.current;
    if (!list) return undefined;

    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = list.getBoundingClientRect();
      const focus = window.innerHeight * 0.55;
      setProgress(clamp((focus - rect.top) / rect.height, 0, 1));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const day = clamp(Math.round(1 + progress * (TOTAL_DAYS - 1)), 1, TOTAL_DAYS);

  return (
    <section id="processus" className="section" aria-labelledby="processus-title">
      <div className="container">
        <h2 id="processus-title" data-reveal>
          Comment ça se passe
        </h2>

        <div className="timeline">
          <div className="timeline__clock" aria-hidden="true">
            <p className="timeline__label">Votre site, jour après jour</p>
            <p className="timeline__day">
              <span className="timeline__num" key={day}>
                {String(day).padStart(2, "0")}
              </span>
              <span className="timeline__of">/ {TOTAL_DAYS}</span>
            </p>
            <div className="timeline__ticks">
              {Array.from({ length: TOTAL_DAYS }, (_, i) => (
                <span
                  key={i}
                  className={`timeline__tick${i + 1 <= day ? " is-on" : ""}`}
                />
              ))}
            </div>
          </div>

          <ol className="timeline__steps" ref={listRef}>
            <span className="timeline__rail" aria-hidden="true">
              <span
                className="timeline__fill"
                style={{ transform: `scaleY(${progress})` }}
              />
            </span>
            {STEPS.map((step) => {
              const active = day >= step.from && day <= step.to;
              const done = day > step.to;
              return (
                <li
                  key={step.title}
                  className={`timeline__step${active ? " is-active" : ""}${done ? " is-done" : ""}`}
                >
                  <span className="timeline__dot" aria-hidden="true" />
                  <span className="timeline__when">{dayLabel(step)}</span>
                  <strong>{step.title}</strong>
                  <p>{step.text}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
