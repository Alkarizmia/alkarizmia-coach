import { ENTRETIEN } from "../../site.config.js";
import { FormuleIcon } from "./icons.jsx";

/** Bande distincte — option après livraison (pas « abonnement ») */
export default function Entretien() {
  return (
    <aside className="formules-entretien" data-reveal aria-labelledby="entretien-title">
      <p className="formules-entretien__label">{ENTRETIEN.label}</p>
      <h3 id="entretien-title" className="formules-entretien__title">
        {ENTRETIEN.title}
      </h3>
      <ul className="formules-entretien__list">
        {ENTRETIEN.points.map((point) => (
          <li key={point.text}>
            <FormuleIcon name={point.icon} className="formules-entretien__icon" />
            <span>{point.text}</span>
          </li>
        ))}
      </ul>
      <p className="formules-entretien__note">{ENTRETIEN.note}</p>
    </aside>
  );
}
