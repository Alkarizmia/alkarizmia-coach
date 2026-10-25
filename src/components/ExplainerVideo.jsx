import { useState } from "react";

/**
 * Explainer — vidéo sous le hero.
 * Fichier attendu : public/videos/explainer.mp4
 */
export default function ExplainerVideo() {
  const [missing, setMissing] = useState(false);

  return (
    <section
      id="explainer"
      className="section explainer"
      aria-labelledby="explainer-title"
    >
      <div className="container explainer__inner">
        <p className="section__eyebrow" data-reveal>
          En images
        </p>
        <h2 id="explainer-title" className="section__title" data-reveal>
          Alkarizmia, en un clin d'œil
        </h2>
        <p className="explainer__lead" data-reveal>
          Une présentation courte de l'identité derrière vos sites de coach.
        </p>

        <div className="explainer__frame" data-reveal>
          {missing ? (
            <p className="explainer__missing">
              Vidéo manquante : place{" "}
              <code>explainer.mp4</code> dans{" "}
              <code>public/videos/</code>
            </p>
          ) : (
            <video
              className="explainer__video"
              src="/videos/explainer.mp4"
              controls
              playsInline
              preload="metadata"
              aria-label="Vidéo de présentation Alkarizmia"
              onError={() => setMissing(true)}
            >
              Votre navigateur ne prend pas en charge la lecture vidéo.
            </video>
          )}
        </div>
      </div>
    </section>
  );
}
