import { useState } from "react";

const YOUTUBE_ID = "R8QUA1m6yS0";
const POSTER = `https://i.ytimg.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`;
const EMBED_SRC = `https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1&color=white`;

/**
 * Explainer — iframe YouTube classique au clic.
 * Pas d’API JS : évite l’écran blanc + son seul (fréquent en localhost avec overlay custom).
 */
export default function ExplainerVideo() {
  const [started, setStarted] = useState(false);

  return (
    <section
      id="explainer"
      className="section explainer"
      aria-labelledby="explainer-title"
    >
      <div className="container explainer__inner">
        <h2 id="explainer-title" className="section__title" data-reveal>
          Alkarizmia, en un clin d'œil
        </h2>
        <p className="explainer__lead" data-reveal>
          Une présentation courte de l'identité derrière vos sites de coach.
        </p>

        <div
          className={`explainer__frame${started ? " is-playing" : ""}`}
          data-reveal
        >
          {started ? (
            <iframe
              className="explainer__iframe"
              src={EMBED_SRC}
              title="Présentation Alkarizmia"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="eager"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <>
              <img
                className="explainer__poster"
                src={POSTER}
                alt=""
                decoding="async"
              />
              <button
                type="button"
                className="explainer__toggle"
                onClick={() => setStarted(true)}
                aria-label="Lire la vidéo"
              >
                <span className="explainer__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="28" height="28">
                    <path d="M8 5.5v13l11-6.5L8 5.5z" fill="currentColor" />
                  </svg>
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
