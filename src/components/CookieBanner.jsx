import { useEffect, useState } from "react";
import { applyConsent, getStoredConsent, trackEvent } from "../analytics.js";

/**
 * Bannière cookies — analytics uniquement après acceptation (RGPD / EEE).
 */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) setVisible(true);

    const reopen = () => {
      try {
        localStorage.removeItem("alkarizmia_cookie_consent");
      } catch {
        /* ignore */
      }
      setVisible(true);
    };

    const onHash = () => {
      if (window.location.hash === "#cookies") reopen();
    };
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const accept = () => {
    applyConsent(true);
    setVisible(false);
    trackEvent("cookie_consent", { consent: "granted" });
    if (window.location.hash === "#cookies") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  };

  const refuse = () => {
    applyConsent(false);
    setVisible(false);
    if (window.location.hash === "#cookies") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  };

  if (!visible) return null;

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
    >
      <div className="cookie-banner__inner">
        <div className="cookie-banner__copy">
          <p id="cookie-banner-title" className="cookie-banner__title">
            Cookies &amp; mesure d'audience
          </p>
          <p id="cookie-banner-desc" className="cookie-banner__text">
            J'utilise Google Analytics pour comprendre d'où viennent les
            visiteurs, quelles sections ils consultent (formules, simulateur…)
            et améliorer le site.{" "}
            <a href="#confidentialite">Confidentialité</a>
          </p>
        </div>
        <div className="cookie-banner__actions">
          <button type="button" className="btn btn--secondary" onClick={refuse}>
            Refuser
          </button>
          <button type="button" className="btn btn--primary" onClick={accept}>
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
