import { useEffect } from "react";
import { FAQ_ITEMS } from "../content/faq.js";
import { CONTACT, OWNER, PROJECTS } from "../site.config.js";

const SITE_URL = "https://alkarizmia.com";

function upsertJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/**
 * Données structurées pour Google + assistants IA.
 * Injectées côté client (complètent les meta de index.html).
 */
export default function Seo() {
  useEffect(() => {
    upsertJsonLd("ld-website", {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Alkarizmia",
      url: SITE_URL,
      inLanguage: "fr-BE",
      description:
        "Création de sites web pour coachs indépendants à Bruxelles : sport, vie, business et bien-être.",
      publisher: {
        "@type": "Organization",
        name: "Alkarizmia",
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logo-symbole.png`,
        },
      },
    });

    upsertJsonLd("ld-organization", {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Alkarizmia",
      url: SITE_URL,
      logo: `${SITE_URL}/logo-symbole.png`,
      image: `${SITE_URL}/og-image.png`,
      email: CONTACT.email,
      founder: {
        "@type": "Person",
        name: OWNER.name,
      },
    });

    upsertJsonLd("ld-localbusiness", {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#business`,
      name: "Alkarizmia",
      description:
        "Création de sites web élégants pour coachs indépendants à Bruxelles. Prêt en environ 10 jours. Domaine et accès à votre nom.",
      url: SITE_URL,
      logo: `${SITE_URL}/logo-symbole.png`,
      image: `${SITE_URL}/og-image.png`,
      email: CONTACT.email,
      telephone: `+${CONTACT.whatsappNumber}`,
      areaServed: [
        { "@type": "City", name: "Bruxelles" },
        { "@type": "AdministrativeArea", name: "Bruxelles-Capitale" },
        { "@type": "Country", name: "Belgique" },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: OWNER.city,
        addressCountry: "BE",
      },
      founder: {
        "@type": "Person",
        name: OWNER.name,
      },
      sameAs: PROJECTS.map((p) => p.url).filter(Boolean),
      priceRange: "€€",
      serviceType: [
        "Création de site vitrine",
        "Refonte de site web",
        "Suivi mensuel de site",
      ],
    });

    upsertJsonLd("ld-faq", {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    });
  }, []);

  return null;
}
