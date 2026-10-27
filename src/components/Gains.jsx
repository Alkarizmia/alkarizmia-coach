import { useState } from "react";

const GAINS = [
  {
    titre: "Du temps",
    texte: "Moins de messages pour répéter tarifs, horaires et adresse.",
  },
  {
    titre: "Des contacts",
    texte: "WhatsApp, appel ou réservation en un clic.",
  },
  {
    titre: "Une image claire",
    texte: "Vrai domaine, titre Google net, avis visibles.",
  },
];

/** Gains + petit calculateur d'exemple (pas une promesse de résultat) */
export default function Gains() {
  const [prixSeance, setPrixSeance] = useState(50);
  const [clientsEnPlus, setClientsEnPlus] = useState(2);

  const annuel =
    Math.max(0, Number(prixSeance) || 0) *
    Math.max(0, Number(clientsEnPlus) || 0) *
    12;

  return (
    <section
      id="gains"
      className="section section-tone section-tone--chapter section-tone--arcs"
      aria-labelledby="gains-title"
    >
      <div className="container">
        <h2 id="gains-title" className="section__title" data-reveal>
          Ce que vous y gagnez
        </h2>

        <ul className="gains__grid">
          {GAINS.map((item) => (
            <li
              key={item.titre}
              className="gains__card"
              data-reveal
              data-reveal-group="gains"
            >
              <h3 className="gains__card-title">{item.titre}</h3>
              <p className="gains__card-text">{item.texte}</p>
            </li>
          ))}
        </ul>

        <div className="gains__calc" data-reveal>
          <p className="gains__calc-kicker">Exemple à ajuster</p>
          <h3 className="gains__calc-title">Et si… quelques clients de plus ?</h3>
          <p className="gains__calc-note">Pas une promesse. Juste un calcul.</p>

          <div className="gains__calc-fields">
            <label className="gains__field">
              <span>Prix d'une séance (€)</span>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="5"
                value={prixSeance}
                onChange={(e) => setPrixSeance(e.target.value)}
              />
            </label>
            <label className="gains__field">
              <span>Clients en plus / mois</span>
              <input
                type="number"
                inputMode="numeric"
                min="0"
                step="1"
                value={clientsEnPlus}
                onChange={(e) => setClientsEnPlus(e.target.value)}
              />
            </label>
          </div>

          <p className="gains__calc-result" aria-live="polite">
            Sur un an ≈{" "}
            <strong>
              {new Intl.NumberFormat("fr-BE", {
                style: "currency",
                currency: "EUR",
                maximumFractionDigits: 0,
              }).format(annuel)}
            </strong>
          </p>
        </div>
      </div>
    </section>
  );
}
