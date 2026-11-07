import { useEffect, useRef, useState } from "react";
import {
  MOCKUP_MESSAGE,
  PRIMARY_CTA,
  mailtoLink,
  whatsappLink,
} from "../site.config.js";
import { trackEvent } from "../analytics.js";
import { prefersReducedMotion } from "../motion.js";

const COACHES = [
  {
    domain: "lea-coaching.be",
    name: "Léa",
    tag: "Coaching sportif",
    city: "Ixelles",
    accent: "#1F4D3F",
    sessions: ["Force", "Cardio", "Outdoor"],
  },
  {
    domain: "samuel-coachdevie.be",
    name: "Samuel",
    tag: "Coach de vie",
    city: "Uccle",
    accent: "#B5654A",
    sessions: ["Clarté", "Objectifs", "Bilan"],
  },
  {
    domain: "nora-yoga.be",
    name: "Nora",
    tag: "Yoga & bien-être",
    city: "Etterbeek",
    accent: "#4F8A74",
    sessions: ["Hatha", "Vinyasa", "Yin"],
  },
];

const CHAR_MS = 50;
const ERASE_MS = 30;
const LOAD_MS = 350;
const HOLD_MS = 4000;

function WhatsAppGlyph({ size = 14 }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width={size} height={size}>
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3Z"
      />
    </svg>
  );
}

function MockSite({ coach, compact = false }) {
  return (
    <div className={`mock-coach${compact ? " mock-coach--compact" : ""}`}>
      <div
        className="mock-coach__banner"
        style={{ backgroundColor: coach.accent }}
      >
        <p className="mock-coach__name">{coach.name}</p>
        <p className="mock-coach__meta">
          {coach.tag} · {coach.city}
        </p>
      </div>
      <div className="mock-coach__body">
        <p className="mock-coach__rating">
          <span className="mock-coach__stars">★★★★★</span>
          4,9 sur Google
        </p>
        <div className="mock-coach__cards">
          {coach.sessions.map((session) => (
            <span key={session} className="mock-coach__card">
              {session}
            </span>
          ))}
        </div>
        <span className="mock-coach__wa">
          <WhatsAppGlyph size={compact ? 11 : 13} />
          Réserver un essai
        </span>
      </div>
    </div>
  );
}

function MockSkeleton() {
  return (
    <div className="mock-skel" aria-hidden="true">
      <span className="mock-skel__banner" />
      <span className="mock-skel__line" />
      <span className="mock-skel__line mock-skel__line--short" />
      <div className="mock-skel__cards">
        <span />
        <span />
        <span />
      </div>
      <span className="mock-skel__btn" />
    </div>
  );
}

function HeroTitle() {
  return (
    <h1 id="hero-title" className="hero__title">
      <span className="visually-hidden">
        Création de site web pour coach à Bruxelles. Votre site, à la hauteur de
        vos avis.
      </span>
      <span aria-hidden="true">
        Votre site, à la hauteur de vos{" "}
        <span className="hero__avis">
          avis
          <svg
            className="hero__avis-line"
            viewBox="0 0 86 10"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M1.5 6.2 C 18 11.5, 38 1.2, 54 6.4 C 66 10.2, 76 3.8, 84.5 6.1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>
        </span>
        .
      </span>
    </h1>
  );
}

function DeviceStage({ coach, typed, phase, reduced }) {
  const showSite = phase === "hold";
  const caret = phase === "typing" || phase === "erasing";

  return (
    <div
      className="hero-stage"
      aria-hidden="true"
      style={{ "--coach-accent": coach.accent }}
    >
      <div className={reduced ? undefined : "hero-desk-float"}>
        <div className="hero-desk">
          <div className="hero-desk__chrome">
            <div className="hero-desk__dots">
              <span />
              <span />
              <span />
            </div>
            <div className="hero-desk__url">
              <span className="hero-desk__url-text">{typed}</span>
              {caret ? <span className="hero-desk__caret" /> : null}
            </div>
          </div>
          <div className="hero-desk__screen">
            <div className={`hero-desk__pane${showSite ? "" : " is-on"}`}>
              <MockSkeleton />
            </div>
            <div className={`hero-desk__pane${showSite ? " is-on" : ""}`}>
              <MockSite coach={coach} />
            </div>
          </div>
        </div>
      </div>

      <div className="hero-handset-slot">
        <div className="hero-handset">
          <div className="hero-handset__notch" />
          <div className="hero-handset__screen">
            <div className={`hero-desk__pane${showSite ? "" : " is-on"}`}>
              <MockSkeleton />
            </div>
            <div className={`hero-desk__pane${showSite ? " is-on" : ""}`}>
              <MockSite coach={coach} compact />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Hero — titre animé une fois + maquette ordi/téléphone en boucle. */
export default function Hero() {
  const stageRef = useRef(null);
  const timersRef = useRef([]);
  const activeRef = useRef(true);
  const visibleRef = useRef(true);
  const reducedRef = useRef(false);

  const reducedStart =
    typeof window !== "undefined" && prefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState(reducedStart ? "hold" : "typing");
  const [typed, setTyped] = useState(reducedStart ? COACHES[0].domain : "");

  const coach = COACHES[index];

  const clearTimers = () => {
    timersRef.current.forEach((id) => clearTimeout(id));
    timersRef.current = [];
  };

  const later = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  };

  useEffect(() => {
    reducedRef.current = prefersReducedMotion();
    if (reducedRef.current) {
      setIndex(0);
      setPhase("hold");
      setTyped(COACHES[0].domain);
      return undefined;
    }

    visibleRef.current = true;
    const onVisibility = () => {
      activeRef.current = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);
    onVisibility();

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      clearTimers();
    };
  }, []);

  useEffect(() => {
    if (reducedRef.current) return undefined;

    let cancelled = false;
    clearTimers();

    const canRun = () =>
      !cancelled && activeRef.current && visibleRef.current && !reducedRef.current;

    const waitUntilActive = (next) => {
      const poll = () => {
        if (cancelled) return;
        if (canRun()) next();
        else later(poll, 200);
      };
      poll();
    };

    const runCycle = (siteIndex) => {
      waitUntilActive(() => {
        const current = COACHES[siteIndex];
        setIndex(siteIndex);
        setTyped("");
        setPhase("typing");

        let i = 0;
        const typeNext = () => {
          if (!canRun()) {
            waitUntilActive(() => runCycle(siteIndex));
            return;
          }
          i += 1;
          setTyped(current.domain.slice(0, i));
          if (i < current.domain.length) {
            later(typeNext, CHAR_MS);
          } else {
            later(() => {
              if (!canRun()) {
                waitUntilActive(() => runCycle(siteIndex));
                return;
              }
              setPhase("loading");
              later(() => {
                if (!canRun()) {
                  waitUntilActive(() => runCycle(siteIndex));
                  return;
                }
                setPhase("hold");
                later(() => {
                  if (!canRun()) {
                    waitUntilActive(() => runCycle(siteIndex));
                    return;
                  }
                  setPhase("erasing");
                  let remaining = current.domain;
                  const erase = () => {
                    if (!canRun()) {
                      waitUntilActive(() => runCycle(siteIndex));
                      return;
                    }
                    remaining = remaining.slice(0, -1);
                    setTyped(remaining);
                    if (remaining.length === 0) {
                      later(() => {
                        if (cancelled) return;
                        runCycle((siteIndex + 1) % COACHES.length);
                      }, 80);
                    } else {
                      later(erase, ERASE_MS);
                    }
                  };
                  later(erase, ERASE_MS);
                }, HOLD_MS);
              }, LOAD_MS);
            }, CHAR_MS);
          }
        };
        later(typeNext, CHAR_MS);
      });
    };

    runCycle(0);

    return () => {
      cancelled = true;
      clearTimers();
    };
  }, []);

  const reduced =
    typeof window !== "undefined" && prefersReducedMotion();

  return (
    <section id="accueil" className="section hero" aria-labelledby="hero-title">
      <div className="hero__pattern" aria-hidden="true" />
      <div className="hero__wash" aria-hidden="true" />

      <div className="container hero__grid">
        <div className="hero__copy">
          <HeroTitle />
          <p className="hero__subtitle">
            Sites pour coachs indépendants à Bruxelles.
          </p>
          <div className="hero__actions">
            <a
              href={whatsappLink(MOCKUP_MESSAGE)}
              className="btn btn--primary"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("cta_whatsapp", { location: "hero" })
              }
            >
              {PRIMARY_CTA}
            </a>
            <a
              href={mailtoLink("Maquette gratuite", MOCKUP_MESSAGE)}
              className="hero__mail"
              onClick={() =>
                trackEvent("cta_email", { location: "hero_booking" })
              }
            >
              ou m'écrire par e-mail
            </a>
            <p className="hero__proof">
              <span className="hero__proof-stars" aria-hidden="true">
                ★★★★★
              </span>
              <span>Mis en avant : vos avis Google</span>
            </p>
          </div>
        </div>

        <div className="hero__visual" ref={stageRef}>
          <div className="hero__glow" aria-hidden="true" />
          <DeviceStage
            coach={coach}
            typed={typed}
            phase={reduced ? "hold" : phase}
            reduced={reduced}
          />
        </div>
      </div>
    </section>
  );
}
