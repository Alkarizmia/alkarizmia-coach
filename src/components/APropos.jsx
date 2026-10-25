import { OWNER } from "../site.config.js";

/* Photo automatique : déposer src/assets/photo-bilal.jpg (ou .png / .webp) */
const PHOTOS = import.meta.glob("../assets/photo-bilal.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});
const PHOTO = Object.values(PHOTOS)[0];

const FACTS = [
  { value: "1", label: "seul interlocuteur, du premier appel à la mise en ligne" },
  { value: "15 min", label: "pour faire le point, sans engagement" },
  { value: "100 %", label: "à votre nom : domaine, hébergement, accès" },
];

/** À propos — portrait + texte + chiffres clés */
export default function APropos() {
  return (
    <section
      id="a-propos"
      className="section about section-tone section-tone--surface"
      aria-labelledby="apropos-title"
    >
      <div className="container about__grid">
        <div className="about__portrait" data-reveal>
          {PHOTO ? (
            <img src={PHOTO} alt={`${OWNER.firstName}, fondateur d'Alkarizmia`} />
          ) : (
            <div className="about__monogram" aria-hidden="true">
              <span className="about__initial">{OWNER.firstName[0]}</span>
              <span className="about__sign">
                {OWNER.firstName} · {OWNER.city}
              </span>
            </div>
          )}
        </div>

        <div className="about__copy">
          <p className="section__eyebrow" data-reveal>
            À propos
          </p>
          <h2 id="apropos-title" className="section__title" data-reveal>
            Un site pensé par quelqu'un qui connaît la salle.
          </h2>
          <p data-reveal data-reveal-group="about">
            Je m’appelle {OWNER.firstName}. Je suis étudiant et je crée des sites
            web pour les coachs sportifs et les petites salles.
          </p>
          <p data-reveal data-reveal-group="about">
            Je pratique moi-même la musculation : je connais cet univers et ce
            dont vous avez besoin pour être trouvé et contacté.
          </p>
          <p data-reveal data-reveal-group="about">
            Vous parlez toujours à la même personne. Je vous explique chaque
            étape simplement, je respecte le délai annoncé, et à la fin tout est
            à votre nom : vous restez libre.
          </p>

          <dl className="about__facts">
            {FACTS.map((fact) => (
              <div key={fact.value} data-reveal data-reveal-group="facts">
                <dt>{fact.value}</dt>
                <dd>{fact.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
