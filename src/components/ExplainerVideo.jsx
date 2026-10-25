/**
 * Explainer — audio de présentation, placé juste sous le hero.
 */
export default function ExplainerVideo() {
  return (
    <section
      id="explainer"
      className="section explainer"
      aria-labelledby="explainer-title"
    >
      <div className="container explainer__inner">
        <p className="section__eyebrow" data-reveal>
          En écoute
        </p>
        <h2 id="explainer-title" className="section__title" data-reveal>
          Alkarizmia, en un clin d'œil
        </h2>
        <p className="explainer__lead" data-reveal>
          Une présentation courte de l'identité derrière vos sites de coach.
        </p>

        <div className="explainer__player" data-reveal>
          <audio
            className="explainer__audio"
            src="/audio/explainer.mp3"
            controls
            preload="metadata"
            controlsList="nodownload"
            aria-label="Présentation audio Alkarizmia"
          >
            Votre navigateur ne prend pas en charge la lecture audio.
          </audio>
        </div>
      </div>
    </section>
  );
}
