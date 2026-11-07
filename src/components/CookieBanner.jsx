import { useEffect, useState } from "react";
import { applyConsent, getStoredConsent, trackEvent } from "../analytics.js";

/**
 * Barre cookies compacte — après 3 s ou au premier scroll.
 * Analytics uniquement après acceptation (RGPD / EEE).
 */
export default function CookieBanner({ onVisibilityChange }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer;
    let shown = false;

    const show = () => {
      if (shown) return;
      shown = true;
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      setVisible(true);
      onVisibilityChange?.(true);
    };

    const onScroll = () => {
      if (window.scrollY > 8) show();
    };

    const reopen = () => {
      shown = false;
      try {
        localStorage.removeItem("alkarizmia_cookie_consent");
      } catch {
        /* ignore */
      }
      window.clearTimeout(timer);
      show();
    };

    const onHash = () => {
      if (window.location.hash === "#cookies") reopen();
    };

    window.addEventListener("hashchange", onHash);

    if (window.location.hash === "#cookies") {
      reopen();
    } else if (!getStoredConsent()) {
      timer = window.setTimeout(show, 3000);
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("scroll", onScroll);
    };
  }, [onVisibilityChange]);

  const close = () => {
    setVisible(false);
    onVisibilityChange?.(false);
    if (window.location.hash === "#cookies") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  };

  const accept = () => {
    applyConsent(true);
    trackEvent("cookie_consent", { consent: "granted" });
    close();
  };

  const refuse = () => {
    applyConsent(false);
    close();
  };

  if (!visible) return null;

  return (
    <div
      className="cookie-banner"
      role="region"
      aria-label="Cookies"
      aria-describedby="cookie-banner-desc"
    >
      <div className="cookie-banner__inner">
        <p id="cookie-banner-desc" className="cookie-banner__text">
          J'utilise des cookies de mesure d'audience pour améliorer le site.{" "}
          <a href="#confidentialite">En savoir plus</a>
        </p>
        <div className="cookie-banner__actions">
          <button type="button" className="cookie-banner__btn" onClick={refuse}>
            Refuser
          </button>
          <button type="button" className="cookie-banner__btn" onClick={accept}>
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
