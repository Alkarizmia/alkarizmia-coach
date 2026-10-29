import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import Estimator from "./Estimator.jsx";
import Entretien from "./formules/Entretien.jsx";
import FormuleCard from "./formules/FormuleCard.jsx";
import FormuleDetail from "./formules/FormuleDetail.jsx";
import PaymentSteps from "./formules/PaymentSteps.jsx";
import { IconChevron } from "./formules/icons.jsx";
import { FORMULES, FORMULES_UI } from "../site.config.js";

/**
 * Formules — paiement unique clair, 4 cartes, détail en shared layout,
 * entretien optionnel, puis simulateur.
 */
export default function Offres() {
  const [match, setMatch] = useState(null);
  const [openId, setOpenId] = useState(null);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [dot, setDot] = useState(0);
  const [carousel, setCarousel] = useState(false);
  const trackRef = useRef(null);
  const dragRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const openFormule = FORMULES.find((f) => f.id === openId) ?? null;
  const featuredIndex = FORMULES.findIndex((f) => f.featured);

  const syncCarouselMode = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCarousel(track.scrollWidth > track.clientWidth + 8);
  }, []);

  const scrollToIndex = useCallback((index, behavior = "smooth") => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(`[data-formule-index="${index}"]`);
    if (!card) return;
    const left = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
    track.scrollTo({
      left: Math.max(0, left),
      behavior: reduceMotion ? "auto" : behavior,
    });
    setDot(index);
  }, [reduceMotion]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  /* Centrer Signature + détecter mode carrousel */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const boot = () => {
      syncCarouselMode();
      if (featuredIndex >= 0) scrollToIndex(featuredIndex, "auto");
    };

    boot();
    const id = requestAnimationFrame(boot);
    window.addEventListener("resize", syncCarouselMode);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", syncCarouselMode);
    };
  }, [featuredIndex, scrollToIndex, syncCarouselMode]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const onScroll = () => {
      const cards = [...track.querySelectorAll("[data-formule-index]")];
      if (!cards.length) return;
      const mid = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((card, i) => {
        const c = card.offsetLeft + card.clientWidth / 2;
        const d = Math.abs(c - mid);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setDot(best);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  /* Glisser à la souris (PC étroit) sans bloquer le scroll vertical de la page */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    let suppressClick = false;

    const onPointerDown = (e) => {
      if (e.pointerType === "touch") return; /* touch-action: pan-x gère le tactile */
      if (e.button !== 0) return;
      if (track.scrollWidth <= track.clientWidth + 8) return;
      dragRef.current = {
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        scrollLeft: track.scrollLeft,
        axis: null,
        moved: false,
      };
    };

    const onPointerMove = (e) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== e.pointerId) return;

      const dx = e.clientX - drag.startX;
      const dy = e.clientY - drag.startY;

      if (!drag.axis) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        drag.axis = Math.abs(dx) >= Math.abs(dy) ? "x" : "y";
        if (drag.axis === "x") {
          track.setPointerCapture?.(e.pointerId);
          track.classList.add("is-dragging");
        } else {
          dragRef.current = null;
          return;
        }
      }

      if (drag.axis !== "x") return;
      e.preventDefault();
      drag.moved = true;
      track.scrollLeft = drag.scrollLeft - dx;
    };

    const endDrag = (e) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== e.pointerId) return;
      if (drag.moved) suppressClick = true;
      track.releasePointerCapture?.(e.pointerId);
      track.classList.remove("is-dragging");
      dragRef.current = null;
    };

    const onClickCapture = (e) => {
      if (!suppressClick) return;
      e.preventDefault();
      e.stopPropagation();
      suppressClick = false;
    };

    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointercancel", endDrag);
    track.addEventListener("click", onClickCapture, true);
    return () => {
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", endDrag);
      track.removeEventListener("pointercancel", endDrag);
      track.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  const stagger = reduceMotion
    ? {}
    : {
        hidden: {},
        show: {
          transition: { staggerChildren: 0.08 },
        },
      };

  const cardMotion = reduceMotion
    ? {}
    : {
        hidden: { opacity: 0, y: 18 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
        },
      };

  const canPrev = carousel && dot > 0;
  const canNext = carousel && dot < FORMULES.length - 1;

  return (
    <section
      id="offres"
      className="section section-tone section-tone--surface"
      aria-labelledby="formules-title"
    >
      <div className="container">
        <p className="section__eyebrow formules__intro" data-reveal>
          {FORMULES_UI.sectionLabel}
        </p>
        <h2 id="formules-title" className="section__title" data-reveal>
          {FORMULES_UI.sectionTitle}
        </h2>
        <p className="formules__lead" data-reveal>
          {FORMULES_UI.sectionLead}
        </p>

        <PaymentSteps />

        <div className={`formules-carousel${carousel ? " is-carousel" : ""}`}>
          <motion.div
            className="formules-track"
            ref={trackRef}
            variants={stagger}
            initial={reduceMotion ? false : "hidden"}
            animate={cardsVisible || reduceMotion ? "show" : "hidden"}
          >
            {FORMULES.map((formule, index) => {
              const isMatch = match?.formule === formule.name;
              return (
                <motion.div
                  key={formule.id}
                  className="formules-track__item"
                  data-formule-index={index}
                  variants={cardMotion}
                >
                  <FormuleCard
                    formule={formule}
                    matched={isMatch}
                    matchTotal={isMatch ? match.total : null}
                    visible={cardsVisible}
                    hidden={openId === formule.id}
                    onOpen={setOpenId}
                  />
                </motion.div>
              );
            })}
          </motion.div>

          <div className="formules-nav">
            <button
              type="button"
              className="formules-nav__btn"
              aria-label="Formule précédente"
              disabled={!canPrev}
              onClick={() => scrollToIndex(dot - 1)}
            >
              <IconChevron dir="left" />
            </button>
            <div className="formules-dots" role="tablist" aria-label="Formules">
              {FORMULES.map((formule, i) => (
                <button
                  key={formule.id}
                  type="button"
                  role="tab"
                  aria-label={formule.name}
                  aria-selected={dot === i}
                  className={`formules-dots__dot${dot === i ? " is-active" : ""}`}
                  onClick={() => scrollToIndex(i)}
                />
              ))}
            </div>
            <button
              type="button"
              className="formules-nav__btn"
              aria-label="Formule suivante"
              disabled={!canNext}
              onClick={() => scrollToIndex(dot + 1)}
            >
              <IconChevron dir="right" />
            </button>
          </div>
        </div>

        <Entretien />

        <Estimator onResult={setMatch} />
      </div>

      <AnimatePresence>
        {openFormule && (
          <FormuleDetail
            key={openFormule.id}
            formule={openFormule}
            onClose={() => setOpenId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
