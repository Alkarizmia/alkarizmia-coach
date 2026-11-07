import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../../motion.js";

/** Compte de 0 à target en 0,6 s la première fois. Respecte prefers-reduced-motion. */
export function useCountUp(target, active) {
  const [value, setValue] = useState(0);
  const played = useRef(false);

  useEffect(() => {
    if (!active || played.current) return undefined;

    if (prefersReducedMotion()) {
      setValue(target);
      played.current = true;
      return undefined;
    }

    played.current = true;
    let frame;
    const start = performance.now();
    const duration = 600;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      setValue(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active]);

  return value;
}
