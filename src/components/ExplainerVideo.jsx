const YOUTUBE_ID = "R8QUA1m6yS0";

/**
 * Explainer — vidéo YouTube sous le hero.
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
          En images
        </p>
        <h2 id="explainer-title" className="section__title" data-reveal>
          Alkarizmia, en un clin d'œil
        </h2>
        <p className="explainer__lead" data-reveal>
          Une présentation courte de l'identité derrière vos sites de coach.
        </p>

        <div className="explainer__frame" data-reveal>
          <iframe
            className="explainer__video"
            src={`https://www.youtube.com/embed/${YOUTUBE_ID}`}
            title="Vidéo de présentation Alkarizmia"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
