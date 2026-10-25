import { useEffect, useRef } from "react";

/**
 * Explainer — courte vidéo de marque, placée juste sous le hero.
 * Lecture auto en boucle (muet) dès qu'elle entre dans le viewport.
 */
export default function ExplainerVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 }
    );

    io.observe(video);
    return () => io.disconnect();
  }, []);

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
            ref={videoRef}
            className="explainer__video"
            src="/videos/explainer.mp4"
            poster="/videos/explainer-poster.jpg"
            muted
            loop
            playsInline
            preload="metadata"
            controls
            aria-label="Vidéo de présentation Alkarizmia"
          />
        </div>
      </div>
    </section>
  );
}
