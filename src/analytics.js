/** Google Analytics 4 — consentement + événements personnalisés */

export const GA_ID = "G-LS6R68NH17";
export const CONSENT_KEY = "alkarizmia_cookie_consent";

export function getStoredConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

export function applyConsent(granted) {
  const value = granted ? "granted" : "denied";
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* ignore */
  }
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: value,
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }
}

/** Envoie un événement GA4 (ignoré tant que le consentement n'est pas accordé). */
export function trackEvent(name, params = {}) {
  if (typeof window.gtag !== "function") return;
  if (getStoredConsent() !== "granted") return;
  window.gtag("event", name, params);
}
