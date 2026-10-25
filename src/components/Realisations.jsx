import { PROJECTS } from "../site.config.js";
import { prefersReducedMotion } from "../motion.js";

/** Inclinaison 3D au survol (souris uniquement) */
function tilt(e) {
  if (e.pointerType !== "mouse" || prefersReducedMotion()) return;
  const card = e.currentTarget;
  const r = card.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  card.style.setProperty("--ry", `${x * 8}deg`);
  card.style.setProperty("--rx", `${y * -8}deg`);
  card.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
  card.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
}

function untilt(e) {
  const card = e.currentTarget;
  card.style.setProperty("--ry", "0deg");
  card.style.setProperty("--rx", "0deg");
}

/** Réalisations — ScanPlay & PayPulss (liens dans site.config.js) */
export default function Realisations() {
  return (
    <section
      id="realisations"
      className="section"
      aria-labelledby="realisations-title"
    >
      <div className="container">
        <p className="section__eyebrow" data-reveal>
          Projets
        </p>
        <h2 id="realisations-title" className="section__title" data-reveal>
          Réalisations
        </h2>
        <p className="realisations__lead" data-reveal>
          Deux projets construits de A à Z : design, développement et mise en
          ligne.
        </p>

        <div className="realisations-grid">
          {PROJECTS.map((project) => {
            const Tag = project.url ? "a" : "div";
            const linkProps = project.url
              ? {
                  href: project.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "aria-label": `${project.name} — voir le site (nouvel onglet)`,
                }
              : {};
            return (
              <article
                key={project.name}
                className="project"
                data-reveal
                data-reveal-group="projects"
              >
                <Tag
                  className="project__card"
                  style={{ "--project-accent": project.accent }}
                  onPointerMove={tilt}
                  onPointerLeave={untilt}
                  {...linkProps}
                >
                  <div className="project__browser" aria-hidden="true">
                    <div className="project__chrome">
                      <span />
                      <span />
                      <span />
                      <span className="project__url">
                        {project.url
                          ? project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")
                          : `${project.domain}…`}
                      </span>
                    </div>
                    <div className="project__screen">
                      <span className="project__logo">{project.name}</span>
                      <span className="project__bar project__bar--wide" />
                      <span className="project__bar" />
                      <span className="project__pill" />
                      <span className="project__tiles">
                        <span />
                        <span />
                        <span />
                      </span>
                    </div>
                    <span className="project__glare" />
                  </div>

                  <div className="project__body">
                    <p className="project__tag">{project.tag}</p>
                    <h3 className="project__name">{project.name}</h3>
                    <p className="project__text">{project.text}</p>
                    <span className="project__cta">
                      {project.url ? "Voir le site ↗" : "Lien bientôt disponible"}
                    </span>
                  </div>
                </Tag>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
