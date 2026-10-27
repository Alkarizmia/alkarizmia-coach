import { useEffect, useRef, useState } from "react";
import { QUESTIONS, buildMessage, estimate } from "../estimator.js";
import { mailtoLink, whatsappLink } from "../site.config.js";
import { prefersReducedMotion } from "../motion.js";
import { trackEvent } from "../analytics.js";

/** Compteur animé du prix (respecte prefers-reduced-motion) */
function useCountUp(target, active) {
  const [value, setValue] = useState(target);
  const animate = active && !prefersReducedMotion();

  useEffect(() => {
    if (!animate) return undefined;
    let frame;
    const start = performance.now();
    const duration = 900;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, animate]);

  return animate ? value : target;
}

/**
 * Simulateur — 5 questions courtes, une estimation ≈,
 * puis un message pré-rempli pour WhatsApp ou e-mail.
 */
export default function Estimator({ onResult }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ options: [] });
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const headingRef = useRef(null);
  const panelRef = useRef(null);
  const completeTracked = useRef(false);

  const done = step >= QUESTIONS.length;
  const question = QUESTIONS[step];
  const result = done ? estimate(answers) : null;
  const shown = useCountUp(result?.total ?? 0, done);

  const formule = result?.formule ?? null;
  const total = result?.total ?? null;

  useEffect(() => {
    onResult?.(formule != null ? { formule, total } : null);
  }, [formule, total, onResult]);

  useEffect(() => {
    if (!done || !result) {
      completeTracked.current = false;
      return;
    }
    if (completeTracked.current) return;
    completeTracked.current = true;
    trackEvent("estimator_complete", {
      formule: result.formule,
      value: result.total,
      currency: "EUR",
      days: result.days,
    });
  }, [done, result]);

  useEffect(() => {
    if (open) headingRef.current?.focus({ preventScroll: true });
  }, [step, open]);

  /* Les liens vers #estimer ouvrent directement le simulateur */
  useEffect(() => {
    const sync = () => {
      if (window.location.hash === "#estimer") setOpen(true);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const start = () => {
    setOpen(true);
    trackEvent("estimator_open");
    requestAnimationFrame(() => {
      panelRef.current?.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "center",
      });
    });
  };

  const choose = (value) => {
    if (question.multiple) {
      setAnswers((prev) => {
        const list = prev[question.id] ?? [];
        return {
          ...prev,
          [question.id]: list.includes(value)
            ? list.filter((v) => v !== value)
            : [...list, value],
        };
      });
      return;
    }
    trackEvent("estimator_answer", {
      question_id: question.id,
      answer: value,
      step: step + 1,
    });
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
    window.setTimeout(() => setStep((s) => s + 1), 220);
  };

  const restart = () => {
    trackEvent("estimator_restart");
    setAnswers({ options: [] });
    setStep(0);
  };

  const message = result ? buildMessage(answers, result, { name, business }) : "";
  const subject = result
    ? `Mon site de coach — estimation ≈ ${result.total} €`
    : "";

  return (
    <div
      id="estimer"
      className={`estimator${open ? " is-open" : ""}`}
      data-reveal
    >
      <div
        className="estimator__teaser"
        onClick={!open ? start : undefined}
        onKeyDown={
          !open
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  start();
                }
              }
            : undefined
        }
        role={!open ? "button" : undefined}
        tabIndex={!open ? 0 : undefined}
        aria-label={!open ? "Estimer mon site" : undefined}
      >
        <div className="estimator__teaser-copy">
          <p className="estimator__kicker">Pas sûr de la formule ?</p>
          <p className="estimator__headline">
            Votre prix en 30 secondes, sans engagement.
          </p>
        </div>
        {!open && (
          <button
            type="button"
            className="btn btn--on-dark"
            onClick={(e) => {
              e.stopPropagation();
              start();
            }}
          >
            Estimer mon site
            <span aria-hidden="true">→</span>
          </button>
        )}
      </div>

      <div className="estimator__panel" ref={panelRef} hidden={!open}>
        <div className="estimator__progress" aria-hidden="true">
          {QUESTIONS.map((q, i) => (
            <span
              key={q.id}
              className={`estimator__seg${i < step || done ? " is-done" : ""}${i === step ? " is-current" : ""}`}
            />
          ))}
        </div>

        {!done && (
          <div className="estimator__step" key={question.id}>
            <p className="estimator__count">
              Question {step + 1} sur {QUESTIONS.length}
            </p>
            <h3
              className="estimator__question"
              tabIndex={-1}
              ref={headingRef}
              aria-live="polite"
            >
              {question.title}
            </h3>

            <div
              className={`estimator__choices${question.options.length > 4 ? " estimator__choices--many" : ""}`}
            >
              {question.options.map((opt) => {
                const selected = question.multiple
                  ? (answers[question.id] ?? []).includes(opt.value)
                  : answers[question.id] === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    className={`estimator__choice${selected ? " is-selected" : ""}`}
                    aria-pressed={selected}
                    onClick={() => choose(opt.value)}
                  >
                    <span className="estimator__choice-label">{opt.label}</span>
                    {opt.hint && (
                      <span className="estimator__choice-hint">{opt.hint}</span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="estimator__nav">
              {step > 0 ? (
                <button
                  type="button"
                  className="estimator__back"
                  onClick={() => setStep((s) => s - 1)}
                >
                  ← Retour
                </button>
              ) : (
                <span />
              )}
              {question.multiple && (
                <button
                  type="button"
                  className="btn btn--on-dark"
                  onClick={() => {
                    trackEvent("estimator_answer", {
                      question_id: question.id,
                      answer: (answers[question.id] ?? []).join(",") || "none",
                      step: step + 1,
                    });
                    setStep((s) => s + 1);
                  }}
                >
                  {(answers[question.id] ?? []).length
                    ? "Voir mon estimation"
                    : "Non merci, voir mon estimation"}
                </button>
              )}
            </div>
          </div>
        )}

        {done && result && (
          <div className="estimator__result">
            <div className="estimator__price-block">
              <p className="estimator__count">Votre estimation</p>
              <h3
                className="estimator__price"
                tabIndex={-1}
                ref={headingRef}
                aria-live="polite"
              >
                <span className="estimator__approx" aria-hidden="true">≈</span>
                <span className="estimator__amount">{shown}</span>
                <span className="estimator__currency">€</span>
                <span className="visually-hidden">
                  Environ {result.total} euros
                </span>
              </h3>
              <p className="estimator__formule">
                Formule <strong>{result.formule}</strong> · prêt en environ{" "}
                {result.days} jours
              </p>

              <ul className="estimator__lines">
                {result.lines.map((line) => (
                  <li key={line.label}>
                    <span>{line.label}</span>
                    <span>{line.amount} €</span>
                  </li>
                ))}
                {result.yearly > 0 && (
                  <li className="is-recurring">
                    <span>Nom de domaine, à votre nom</span>
                    <span>≈ {result.yearly} €/an</span>
                  </li>
                )}
                {result.monthly > 0 && (
                  <li className="is-recurring">
                    <span>Suivi mensuel</span>
                    <span>{result.monthly} €/mois</span>
                  </li>
                )}
              </ul>
              <p className="estimator__note">
                Prix indicatif. Il est confirmé pendant l'échange de 15 minutes,
                avant de commencer.
              </p>
            </div>

            <div className="estimator__send">
              <p className="estimator__send-title">
                Envoyez-moi votre estimation
              </p>
              <p className="estimator__send-text">
                Le message est déjà rédigé avec vos réponses. Ajoutez votre
                prénom si vous voulez.
              </p>
              <div className="estimator__fields">
                <label className="estimator__field">
                  <span>Votre prénom</span>
                  <input
                    id="estimator-name"
                    type="text"
                    autoComplete="given-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Facultatif"
                  />
                </label>
                <label className="estimator__field">
                  <span>Nom de votre activité</span>
                  <input
                    id="estimator-business"
                    type="text"
                    autoComplete="organization"
                    value={business}
                    onChange={(e) => setBusiness(e.target.value)}
                    placeholder="Facultatif"
                  />
                </label>
              </div>
              <div className="estimator__actions">
                <a
                  className="btn estimator__wa"
                  href={whatsappLink(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("cta_whatsapp", {
                      location: "estimator",
                      formule: result.formule,
                      value: result.total,
                    })
                  }
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20">
                    <path
                      fill="currentColor"
                      d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3Z"
                    />
                  </svg>
                  Envoyer sur WhatsApp
                </a>
                <a
                  className="btn btn--ghost-dark"
                  href={mailtoLink(subject, message)}
                  onClick={() =>
                    trackEvent("cta_email", {
                      location: "estimator",
                      formule: result.formule,
                      value: result.total,
                    })
                  }
                >
                  Envoyer par e-mail
                </a>
              </div>
              <button type="button" className="estimator__back" onClick={restart}>
                ↺ Recommencer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
