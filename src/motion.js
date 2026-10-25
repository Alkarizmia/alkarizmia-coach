/**
 * Animations légères : reveal au scroll + parallaxe hero.
 * Respecte prefers-reduced-motion. Pas de librairie.
 */

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion() {
  return window.matchMedia(REDUCE_QUERY).matches;
}

/**
 * Apparition au scroll — une seule fois, stagger 80 ms.
 * Marque via l'attribut data-revealed (et non une classe) : React réécrit
 * className à chaque mise à jour et effacerait une classe ajoutée ici.
 */
export function initScrollReveal(root = document) {
  if (prefersReducedMotion()) {
    root.querySelectorAll("[data-reveal]").forEach((el) => {
      el.dataset.revealed = "";
    });
    return () => {};
  }

  const groups = new Map();

  root.querySelectorAll("[data-reveal]").forEach((el) => {
    const group = el.getAttribute("data-reveal-group") || el.parentElement;
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push(el);
  });

  groups.forEach((els) => {
    els.forEach((el, i) => {
      el.style.setProperty("--reveal-delay", `${i * 80}ms`);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.dataset.revealed = "";
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );

  root.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}

/** Header : classe .is-scrolled dès le scroll */
export function initHeaderScroll(header) {
  if (!header) return () => {};

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}

/**
 * Parallaxe des formes du hero (desktop uniquement).
 * transform via rAF + listener passif.
 */
export function initHeroParallax(layer) {
  if (!layer || prefersReducedMotion()) return () => {};
  if (window.matchMedia("(max-width: 767px)").matches) return () => {};

  let ticking = false;
  let latestY = 0;

  const update = () => {
    const y = latestY * 0.12;
    layer.style.transform = `translate3d(0, ${y}px, 0)`;
    ticking = false;
  };

  const onScroll = () => {
    latestY = window.scrollY;
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}
