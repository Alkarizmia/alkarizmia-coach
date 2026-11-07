/** Google Analytics 4 — chargé uniquement après acceptation des cookies. */

export const GA_ID = "G-LS6R68NH17";
export const CONSENT_KEY = "alkarizmia_cookie_consent";

let gaRequested = false;

export function getStoredConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
  }
}

/** Injecte gtag.js + config. Aucun appel réseau avant acceptation. */
export function loadGoogleAnalytics() {
  if (gaRequested || typeof window === "undefined") return;
  gaRequested = true;
  ensureGtag();
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { anonymize_ip: true });
}

export function applyConsent(granted) {
  const value = granted ? "granted" : "denied";
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* ignore */
  }
  if (granted) {
    loadGoogleAnalytics();
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

/** Au chargement : n'active GA que si un accord est déjà enregistré. */
export function initAnalyticsFromConsent() {
  if (getStoredConsent() === "granted") loadGoogleAnalytics();
}

/** Envoie un événement GA4 (ignoré tant que le consentement n'est pas accordé). */
export function trackEvent(name, params = {}) {
  if (typeof window.gtag !== "function") return;
  if (getStoredConsent() !== "granted") return;
  window.gtag("event", name, params);
}
