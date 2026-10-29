import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Maquette téléphone (+ desktop) — 3 captures qui défilent en boucle.
 */
export default function DeviceShowcase({ screens = [], showDesktop = false }) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const current = screens[index] ?? screens[0];

  useEffect(() => {
    if (reduce || screens.length < 2) return undefined;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % screens.length);
    }, 3200);
    return () => clearInterval(id);
  }, [screens.length, reduce]);

  if (!current) return null;

  return (
    <div className={`formule-devices${showDesktop ? " formule-devices--duo" : ""}`}>
      <div className="formule-devices__stage">
        {showDesktop && (
          <div className="formule-devices__desktop" aria-hidden="true">
            <div className="formule-devices__desktop-bar">
              <span />
              <span />
              <span />
            </div>
            <div className="formule-devices__desktop-screen">
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={`desk-${current}`}
                  src={current}
                  alt=""
                  className="formule-devices__img"
                  draggable={false}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.45 }}
                />
              </AnimatePresence>
            </div>
          </div>
        )}

        <div className="formule-devices__phone">
          <div className="formule-devices__notch" aria-hidden="true" />
          <div className="formule-devices__phone-screen">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={current}
                src={current}
                alt=""
                className="formule-devices__img"
                draggable={false}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.45 }}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
