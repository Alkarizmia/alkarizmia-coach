import { useEffect } from "react";
import { trackEvent } from "../analytics.js";

const SECTION_IDS = [
  "accueil",
  "reparer",
  "gains",
  "offres",
  "estimer",
  "processus",
  "realisations",
  "a-propos",
  "faq",
  "contact",
];

/** Envoie un événement quand une section entre clairement dans le viewport. */
export function useSectionTracking() {
  useEffect(() => {
    const seen = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          if (!id || seen.has(id)) continue;
          seen.add(id);
          trackEvent("section_view", { section_id: id });
        }
      },
      { threshold: 0.35 }
    );

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);
}
