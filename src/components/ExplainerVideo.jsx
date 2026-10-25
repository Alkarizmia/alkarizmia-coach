/**
 * Explainer — vidéo de présentation, placée juste sous le hero.
 *
 * Fichier à placer manuellement :
 *   public/videos/explainer.mp4
 * (copie ton WhatsApp / Desktop .mp4 et renomme-le explainer.mp4)
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
          <video
            className="explainer__video"
            src="/videos/explainer.mp4"
            controls
            playsInline
            preload="metadata"
            aria-label="Vidéo de présentation Alkarizmia"
          >
            Votre navigateur ne prend pas en charge la lecture vidéo.
          </video>
        </div>
      </div>
    </section>
  );
}
