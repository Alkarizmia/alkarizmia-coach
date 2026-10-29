import { useEffect, useRef, useState } from "react";
import { PAYMENT } from "../../site.config.js";
import { prefersReducedMotion } from "../../motion.js";
import { FormuleIcon } from "./icons.jsx";

const STEP_ICONS = ["deposit", "build", "balance"];

/**
 * Bandeau 3 étapes — la ligne se remplit au scroll.
 */
export default function PaymentSteps() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (prefersReducedMotion()) {
      setProgress(1);
      return undefined;
    }

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Remplit quand le bandeau traverse le milieu de l'écran
      const start = vh * 0.85;
      const end = vh * 0.35;
      const t = (start - rect.top) / (start - end);
      setProgress(Math.min(1, Math.max(0, t)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="formules-pay" ref={ref} data-reveal>
      <ol className="formules-pay__steps">
        {PAYMENT.steps.map((step, i) => {
          const active = progress >= (i + 0.35) / PAYMENT.steps.length;
          return (
            <li
              key={step.id}
              className={`formules-pay__step${active ? " is-active" : ""}`}
            >
              <span className="formules-pay__icon" aria-hidden="true">
                <FormuleIcon name={STEP_ICONS[i]} />
              </span>
              <span className="formules-pay__label">
                <span className="formules-pay__num" aria-hidden="true">
                  {i + 1}
                </span>
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
      <div className="formules-pay__track" aria-hidden="true">
        <div
          className="formules-pay__fill"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
      <p className="formules-pay__note">{PAYMENT.note}</p>
    </div>
  );
}
