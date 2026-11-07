import { motion } from "framer-motion";
import { FORMULES_UI } from "../../site.config.js";
import { IconCheck } from "./icons.jsx";
import { useCountUp } from "./useCountUp.js";

function depositLine(formule) {
  if (formule.deposit == null || formule.balance == null) {
    if (formule.sizes?.length) {
      const low = formule.sizes[0];
      return `1 page ${low.price} € · 2–4 pages ${formule.sizes[1].price} € · 5+ ${formule.sizes[2].price} €`;
    }
    return null;
  }
  return FORMULES_UI.depositLine
    .replace("{deposit}", String(formule.deposit))
    .replace("{balance}", String(formule.balance));
}

export default function FormuleCard({
  formule,
  matched,
  matchTotal,
  visible,
  hidden = false,
  onOpen,
}) {
  const counted = useCountUp(formule.price, visible);
  const showMatch = matched && matchTotal != null;

  return (
    <motion.article
      layoutId={`formule-card-${formule.id}`}
      className={`formule-card${formule.featured ? " formule-card--featured" : ""}${matched ? " formule-card--match" : ""}`}
      role="button"
      tabIndex={hidden ? -1 : 0}
      aria-hidden={hidden || undefined}
      aria-label={`${formule.name}, ${formule.pricePrefix || ""}${formule.price} euros. Voir le détail.`}
      onClick={() => onOpen(formule.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(formule.id);
        }
      }}
      style={{
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? "none" : undefined,
      }}
      transition={{ type: "spring", stiffness: 320, damping: 34 }}
    >
      {matched ? (
        <span className="formule-card__badge formule-card__badge--match">Pour vous</span>
      ) : (
        formule.badge && <span className="formule-card__badge">{formule.badge}</span>
      )}

      <h3 className="formule-card__name">{formule.name}</h3>

      <p className="formule-card__price-row">
        <span className="formule-card__price">
          {formule.pricePrefix}
          {showMatch ? `≈ ${matchTotal}` : counted} €
        </span>
        <span className="formule-card__once">{FORMULES_UI.oncePill}</span>
      </p>

      {depositLine(formule) && (
        <p className="formule-card__split">{depositLine(formule)}</p>
      )}

      <p className="formule-card__desc">{formule.tagline}</p>

      <ul className="formule-card__list">
        {formule.highlights.slice(0, 3).map((item) => (
          <li key={item}>
            <IconCheck className="formule-card__check" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {formule.days != null && (
        <p className="formule-card__days">
          {FORMULES_UI.daysLine.replace("{days}", String(formule.days))}
        </p>
      )}

      <span className="formule-card__cta">{FORMULES_UI.cardCta}</span>
    </motion.article>
  );
}
