import { useEffect, useRef, useState } from "react";

const YOUTUBE_ID = "R8QUA1m6yS0";
const THUMB = `https://i.ytimg.com/vi/${YOUTUBE_ID}/hqdefault.jpg`;

let apiPromise;

function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve(window.YT);
    };
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);
    }
  });

  return apiPromise;
}

/**
 * Explainer — YouTube sans chrome, play/pause custom.
 * Le mount YouTube est hors du reconciler React (sinon l’iframe disparaît au play).
 */
export default function ExplainerVideo() {
  const mountRef = useRef(null);
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const shell = mountRef.current;
    if (!shell) return undefined;

    let cancelled = false;
    let player;

    /* Conteneur impératif : React ne le recrée jamais */
    const mount = document.createElement("div");
    mount.className = "explainer__host";
    shell.appendChild(mount);

    loadYouTubeApi().then((YT) => {
      if (cancelled) return;

      player = new YT.Player(mount, {
        videoId: YOUTUBE_ID,
        width: "100%",
        height: "100%",
        host: "https://www.youtube.com",
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            playerRef.current = event.target;
            const iframe = event.target.getIframe?.();
            if (iframe) {
              iframe.classList.add("explainer__iframe");
              iframe.setAttribute("allow", "accelerometer; autoplay; encrypted-media; picture-in-picture");
            }
            try {
              event.target.setPlaybackQuality?.("hd720");
            } catch {
              /* ignore */
            }
            setReady(true);
          },
          onStateChange: (event) => {
            const state = event.data;
            if (state === YT.PlayerState.PLAYING) {
              setPlaying(true);
            } else if (
              state === YT.PlayerState.PAUSED ||
              state === YT.PlayerState.ENDED ||
              state === YT.PlayerState.CUED
            ) {
              setPlaying(false);
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      try {
        player?.destroy?.();
      } catch {
        /* ignore */
      }
      playerRef.current = null;
      shell.replaceChildren();
    };
  }, []);

  const toggle = () => {
    const player = playerRef.current;
    if (!player || !ready) return;
    if (playing) player.pauseVideo();
    else player.playVideo();
  };

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

        <div
          className={`explainer__frame${playing ? " is-playing" : ""}`}
          data-reveal
        >
          <div ref={mountRef} className="explainer__embed" />

          <img
            className={`explainer__poster${playing ? " is-hidden" : ""}`}
            src={THUMB}
            alt=""
            decoding="async"
          />

          <button
            type="button"
            className="explainer__toggle"
            onClick={toggle}
            disabled={!ready}
            aria-label={playing ? "Mettre en pause" : "Lire la vidéo"}
          >
            <span className="explainer__icon" aria-hidden="true">
              {playing ? (
                <svg viewBox="0 0 24 24" width="28" height="28">
                  <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
                  <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="28" height="28">
                  <path d="M8 5.5v13l11-6.5L8 5.5z" fill="currentColor" />
                </svg>
              )}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
