/**
 * Formules — 3 cartes + option suivi mensuel.
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
  return (
    <section id="offres" className="section" aria-labelledby="formules-title">
      <div className="container">
        <p className="section__eyebrow formules__intro" data-reveal>
          Tarifs de lancement pour mes premiers clients.
        </p>
        <h2 id="formules-title" className="section__title" data-reveal>
          Formules
        </h2>

        <div className="formules-grid">
          {FORMULES.map((formule) => (
            <article
              key={formule.name}
              className={`formule-card${formule.featured ? " formule-card--featured" : ""}`}
              data-reveal
              data-reveal-group="formules"
            >
              {formule.featured && (
                <span className="formule-card__badge">Le plus choisi</span>
              )}
              <h3 className="formule-card__name">{formule.name}</h3>
              <p className="formule-card__price">{formule.price}</p>
              <p className="formule-card__desc">{formule.description}</p>
            </article>
          ))}
        </div>

        <div className="formules-option" data-reveal>
          <p className="formules-option__label">Option</p>
          <p>
            Suivi mensuel, 39 €/mois : mises à jour, 2 petites modifications par
            mois, vérifications. 6 mois minimum, puis préavis de 30 jours.
          </p>
          <p className="formules-note">
            Domaine et hébergement à votre nom (environ dix euros par an pour le
            domaine).
          </p>
        </div>
      </div>
    </section>
  );
}
