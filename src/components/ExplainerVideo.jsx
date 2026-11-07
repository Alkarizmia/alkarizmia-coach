import { useEffect, useRef, useState } from "react";
import { trackEvent } from "../analytics.js";

const FILE_SRC = "/video/alkarizmia.mp4";
const FILE_POSTER = "/video/poster.jpg";
const YOUTUBE_ID = "R8QUA1m6yS0";
const YOUTUBE_POSTER = `https://i.ytimg.com/vi/${YOUTUBE_ID}/hqdefault.jpg`;
const YOUTUBE_EMBED = `https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?rel=0&playsinline=1&autoplay=1`;

function PlayButton({ onClick, label }) {
  return (
    <button
      type="button"
      className="explainer__toggle"
      onClick={onClick}
      aria-label={label}
    >
      <span className="explainer__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="30" height="30">
          <path d="M8 5.5v13l11-6.5L8 5.5z" fill="currentColor" />
        </svg>
      </span>
    </button>
  );
}

/**
 * Vidéo — fichier local si présent, sinon façade YouTube (sans cookies avant clic).
 */
export default function ExplainerVideo() {
  const videoRef = useRef(null);
  const [mode, setMode] = useState("youtube");
  const [portrait, setPortrait] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ytStarted, setYtStarted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(FILE_SRC, { method: "HEAD" })
      .then((res) => {
        if (cancelled) return;
        const type = (res.headers.get("content-type") || "").toLowerCase();
        setMode(res.ok && type.includes("video") ? "file" : "youtube");
      })
      .catch(() => {
        if (!cancelled) setMode("youtube");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const onFileMeta = (e) => {
    const el = e.currentTarget;
    if (el.videoHeight > 0 && el.videoWidth > 0) {
      setPortrait(el.videoHeight > el.videoWidth);
    }
  };

  const toggleFile = (e) => {
    const el = videoRef.current;
    if (!el) return;
    if (e?.currentTarget === el) {
      const rect = el.getBoundingClientRect();
      if (e.clientY > rect.bottom - 52) return;
    }
    if (el.paused) {
      el.muted = false;
      el.play().catch(() => {});
      trackEvent("video_play", { source: "file" });
    } else {
      el.pause();
    }
  };

  const startYoutube = () => {
    setYtStarted(true);
    setPlaying(true);
    trackEvent("video_play", { source: "youtube" });
  };

  const frameClass = [
    "explainer__frame",
    portrait ? "explainer__frame--portrait" : "explainer__frame--landscape",
    playing ? "is-playing" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      id="explainer"
      className="section explainer"
      aria-labelledby="explainer-title"
    >
      <div className="container explainer__inner">
        <h2 id="explainer-title" className="explainer__title">
          Comment ça marche, en 30 secondes
        </h2>

        {mode === "file" && (
          <div className={frameClass}>
            <video
              ref={videoRef}
              className="explainer__video"
              src={FILE_SRC}
              poster={FILE_POSTER}
              controls
              playsInline
              preload="metadata"
              onLoadedMetadata={onFileMeta}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
              onClick={toggleFile}
            />
            {!playing && (
              <PlayButton onClick={toggleFile} label="Lire la vidéo" />
            )}
          </div>
        )}

        {mode === "youtube" && (
          <div className={frameClass}>
            {ytStarted ? (
              <iframe
                className="explainer__iframe"
                src={YOUTUBE_EMBED}
                title="Comment ça marche, en 30 secondes"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="eager"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : (
              <>
                <img
                  className="explainer__poster"
                  src={YOUTUBE_POSTER}
                  alt="Vidéo : comment Alkarizmia crée un site web pour coach"
                  width="480"
                  height="360"
                  loading="lazy"
                  decoding="async"
                />
                <PlayButton
                  onClick={startYoutube}
                  label="Lire la vidéo"
                />
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
