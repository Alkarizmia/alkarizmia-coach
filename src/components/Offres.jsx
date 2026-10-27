import { useState } from "react";
import Estimator from "./Estimator.jsx";

/**
 * Formules — 3 cartes + simulateur de prix (le suivi mensuel y est proposé).
 * (Fichier conservé : Offres.jsx — arborescence inchangée.)
 */
const FORMULES = [
  {
    name: "Essentiel",
    price: "350 €",
    description:
      "Une page claire : votre histoire, vos séances et tarifs, et un contact direct.",
    featured: false,
  },
  {
    name: "Signature",
    price: "590 €",
    description:
      "Jusqu'à 4 pages, galerie, témoignages et bases du référencement.",
    featured: true,
  },
  {
    name: "Refonte",
    price: "dès 290 €",
    description:
      "Votre site actuel est lent ou difficile à utiliser ? Je le refais en gardant vos contenus.",
    featured: false,
  },
];

export default function Offres() {
  const [match, setMatch] = useState(null);
  const matched = match?.formule?.replace(" +", "");

  return (
    <section
      id="offres"
      className="section section-tone section-tone--surface"
      aria-labelledby="formules-title"
    >
      <div className="container">
        <p className="section__eyebrow formules__intro" data-reveal>
          Tarifs de lancement pour mes premiers clients.
        </p>
        <h2 id="formules-title" className="section__title" data-reveal>
          Formules
        </h2>
        <p className="formules__lead" data-reveal>
          Paiement unique. Le site et le domaine sont à votre nom. Acompte de
          40&nbsp;% à la commande, 60&nbsp;% à la livraison. Suivi mensuel en
          option.
        </p>

        <div className="formules-grid">
          {FORMULES.map((formule) => {
            const isMatch = matched === formule.name;
            return (
              <article
                key={formule.name}
                className={`formule-card${formule.featured ? " formule-card--featured" : ""}${isMatch ? " formule-card--match" : ""}`}
                data-reveal
                data-reveal-group="formules"
              >
                {isMatch ? (
                  <span className="formule-card__badge formule-card__badge--match">
                    Pour vous
                  </span>
                ) : (
                  formule.featured && (
                    <span className="formule-card__badge">Le plus choisi</span>
                  )
                )}
                <h3 className="formule-card__name">{formule.name}</h3>
                <p className="formule-card__price">
                  {isMatch ? `≈ ${match.total} €` : formule.price}
                </p>
                <p className="formule-card__desc">{formule.description}</p>
              </article>
            );
          })}
        </div>

        <ul className="formules-terms" data-reveal>
          <li>Paiement unique, pas d'abonnement obligatoire pour le site.</li>
          <li>Domaine, hébergement et accès enregistrés à votre nom.</li>
          <li>40&nbsp;% à la commande, 60&nbsp;% à la livraison.</li>
          <li>Suivi mensuel optionnel (mises à jour et petites modifications).</li>
        </ul>

        <Estimator onResult={setMatch} />

      </div>
    </section>
  );
}
