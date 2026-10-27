import { useEffect, useRef, useState } from "react";
import { BOOKING_MESSAGE, mailtoLink, whatsappLink } from "../site.config.js";
import { trackEvent } from "../analytics.js";
import { prefersReducedMotion } from "../motion.js";

const HERO_TITLE = "Votre site, à la hauteur de vos avis.";
const HERO_WORDS = HERO_TITLE.split(" ");

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3Z"
      />
    </svg>
  );
}

/** 5 sites fictifs — décoratifs uniquement */
const SITES = [
  {
    domain: "mathis-performance.com",
    accent: "#1F4D3F",
    layout: "sport",
    title: "Coaching sportif",
    text: "Séances personnalisées, en salle ou en extérieur.",
    cta: "Réserver une séance",
  },
  {
    domain: "camille-coachdevie.com",
    accent: "#B5654A",
    layout: "life",
    title: "Coaching de vie",
    text: "Un accompagnement clair pour avancer à votre rythme.",
    cta: "Prendre rendez-vous",
  },
  {
    domain: "atelier-leadership.com",
    accent: "#1D2B4A",
    layout: "business",
    title: "Coaching business",
    text: "Clarifiez votre stratégie, passez à l'action.",
    cta: "Planifier un appel",
  },
  {
    domain: "sarah-yoga-flow.com",
    accent: "#6B8F71",
    layout: "yoga",
    title: "Yoga et bien-être",
    text: "Des cours pour retrouver calme et énergie.",
    cta: "Voir les cours",
  },
  {
    domain: "lea-nutrition-coach.com",
    accent: "#C2852B",
    layout: "nutrition",
    title: "Coaching nutrition",
    text: "Un suivi simple, adapté à votre quotidien.",
    cta: "Premier échange",
  },
];

const CHAR_MS = 55;
const LOAD_MS = 500;
const ENTER_MS = 400;
const HOLD_MS = 2200;
const EXIT_MS = 250;
const STAGGER_MS = 80;

function MockContent({ site }) {
  const btnStyle = { backgroundColor: site.accent };

  if (site.layout === "sport") {
    return (
      <div className="mock-site mock-site--sport">
        <div className="mock-site__col">
          <p className="mock-site__title mock-stagger">{site.title}</p>
          <p className="mock-site__text mock-stagger">{site.text}</p>
          <span className="mock-site__btn mock-stagger" style={btnStyle}>
            {site.cta}
          </span>
        </div>
        <div className="mock-site__blocks mock-stagger">
          <span className="mock-site__block" />
          <span className="mock-site__block" />
          <span className="mock-site__block" />
        </div>
      </div>
    );
  }

  if (site.layout === "life") {
    return (
      <div className="mock-site mock-site--life">
        <span className="mock-site__avatar mock-stagger" />
        <p className="mock-site__title mock-stagger">{site.title}</p>
        <p className="mock-site__text mock-stagger">{site.text}</p>
        <span className="mock-site__btn mock-stagger" style={btnStyle}>
          {site.cta}
        </span>
      </div>
    );
  }

  if (site.layout === "business") {
    return (
      <div className="mock-site mock-site--business">
        <div
          className="mock-site__banner mock-stagger"
          style={{ backgroundColor: site.accent }}
        >
          <p className="mock-site__title mock-site__title--on-dark">{site.title}</p>
        </div>
        <div className="mock-site__split mock-stagger">
          <p className="mock-site__text">{site.text}</p>
          <span className="mock-site__btn" style={btnStyle}>
            {site.cta}
          </span>
        </div>
      </div>
    );
  }

  if (site.layout === "yoga") {
    return (
      <div className="mock-site mock-site--yoga">
        <div className="mock-site__media mock-stagger" />
        <div className="mock-site__col mock-stagger">
          <p className="mock-site__title">{site.title}</p>
          <p className="mock-site__text">{site.text}</p>
          <span className="mock-site__btn" style={btnStyle}>
            {site.cta}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="mock-site mock-site--nutrition">
      <p className="mock-site__title mock-stagger">{site.title}</p>
      <p className="mock-site__text mock-stagger">{site.text}</p>
      <div className="mock-site__cards mock-stagger">
        <span className="mock-site__card" />
        <span className="mock-site__card" />
        <span className="mock-site__card" />
      </div>
      <span className="mock-site__btn mock-stagger" style={btnStyle}>
        {site.cta}
      </span>
    </div>
  );
}

/**
 * Hero — trame de points + maquette navigateur animée (5 sites fictifs).
 */
export default function Hero() {
  const mockRef = useRef(null);
  const timersRef = useRef([]);
  const activeRef = useRef(true);
  const visibleRef = useRef(true);
  const reducedRef = useRef(false);

  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState("hold");
  const [typed, setTyped] = useState(SITES[0].domain);
  const [showContent, setShowContent] = useState(true);

  const site = SITES[index];

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
      setTyped(SITES[0].domain);
      setShowContent(true);
      return undefined;
    }

    const mockEl = mockRef.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.2 }
    );
    if (mockEl) io.observe(mockEl);

    const onVisibility = () => {
      activeRef.current = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);
    onVisibility();

    return () => {
      io.disconnect();
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
        const current = SITES[siteIndex];
        setIndex(siteIndex);
        setShowContent(false);
        setTyped("");
        setPhase("clear");

        later(() => {
          if (!canRun()) {
            waitUntilActive(() => runCycle(siteIndex));
            return;
          }
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
                  setPhase("enter");
                  setShowContent(true);
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
                      setPhase("exit");
                      later(() => {
                        if (cancelled) return;
                        setShowContent(false);
                        const next = (siteIndex + 1) % SITES.length;
                        runCycle(next);
                      }, EXIT_MS);
                    }, HOLD_MS);
                  }, ENTER_MS + STAGGER_MS * 4);
                }, LOAD_MS);
              }, CHAR_MS);
            }
          };
          later(typeNext, CHAR_MS);
        }, 120);
      });
    };

    /* Premier cycle : repartir depuis le clear pour animer dès le début */
    runCycle(0);

    return () => {
      cancelled = true;
      clearTimers();
    };
  }, []);

  const contentClass =
    phase === "enter" || phase === "hold"
      ? "mock-stage__content is-in"
      : phase === "exit"
        ? "mock-stage__content is-out"
        : "mock-stage__content";

  const reduceMotion =
    typeof window !== "undefined" && prefersReducedMotion();

  return (
    <section id="accueil" className="section hero" aria-labelledby="hero-title">
      <div className="hero__pattern" aria-hidden="true" />
      <div className="hero__wash" aria-hidden="true" />

      <div className="container hero__grid">
        <div className="hero__copy">
          <h1 id="hero-title" className="hero__title">
            <span className="visually-hidden">{HERO_TITLE}</span>
            {HERO_WORDS.map((word, i) => (
              <span
                key={`${word}-${i}`}
                className={`hero__word${reduceMotion ? " is-in" : ""}`}
                style={{ "--i": i }}
                aria-hidden="true"
              >
                {word}
                {i < HERO_WORDS.length - 1 ? "\u00a0" : ""}
              </span>
            ))}
          </h1>
          <p
            className="hero__subtitle"
            data-reveal
            data-reveal-group="hero-copy"
          >
            Sites pour coachs indépendants à Bruxelles.
          </p>
          <div
            className="hero__actions"
            data-reveal
            data-reveal-group="hero-copy"
          >
            <a
              href={mailtoLink(
                "Échange gratuit de 15 minutes",
                BOOKING_MESSAGE
              )}
              className="btn btn--primary"
              onClick={() =>
                trackEvent("cta_email", { location: "hero_booking" })
              }
            >
              Échange gratuit · 15 min
            </a>
            <a
              href={whatsappLink(BOOKING_MESSAGE)}
              className="btn btn--secondary hero__wa"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("cta_whatsapp", { location: "hero" })
              }
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
          </div>
        </div>

        <div className="hero__visual" data-reveal>
          <div className="hero__glow" aria-hidden="true" />

          <div
            className="browser-mock browser-mock--float"
            ref={mockRef}
            aria-hidden="true"
            style={{ "--mock-accent": site.accent }}
          >
            <div className="browser-mock__chrome">
              <div className="browser-mock__dots">
                <span />
                <span />
                <span />
              </div>
              <div className="browser-mock__url">
                <span className="browser-mock__url-text">{typed}</span>
                {(phase === "typing" || phase === "clear") && (
                  <span className="browser-mock__caret" />
                )}
              </div>
              <div
                className={`browser-mock__load${phase === "loading" ? " is-active" : ""}`}
              />
            </div>

            <div className="mock-stage">
              {showContent && (
                <div key={index} className={contentClass}>
                  <MockContent site={site} />
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
