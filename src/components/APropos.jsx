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
            <img
              src={PHOTO}
              alt={`${OWNER.name}, fondateur d'Alkarizmia à ${OWNER.city}`}
              width="1024"
              height="1024"
              loading="lazy"
              decoding="async"
            />
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
            Confiance
          </p>
          <h2 id="apropos-title" className="section__title" data-reveal>
            Qui est derrière Alkarizmia
          </h2>
          <p data-reveal data-reveal-group="about">
            Je m'appelle {OWNER.name}. J'ai 18 ans, je suis basé à {OWNER.city}.
            Alkarizmia crée des sites web pour coachs indépendants à Bruxelles :
            coachs sportifs, coachs de vie et bien-être.
          </p>
          <p data-reveal data-reveal-group="about">
            Je pratique la musculation. Je connais cet univers et ce qu'il faut
            pour être trouvé, compris et contacté sans friction. Les rendez-vous
            se font en visio, pour Bruxelles et la Belgique.
          </p>
          <p data-reveal data-reveal-group="about">
            Vous parlez toujours à la même personne. Inclus : le site, le
            domaine à votre nom, les accès. Le délai annoncé est respecté.
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
