import { useEffect } from "react";
import { CONTACT, OWNER, SHORT_DESCRIPTION, SOCIAL } from "../site.config.js";

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
 * Complète le JSON-LD déjà présent dans index.html (sans adresse ni avis).
 */
export default function Seo() {
  useEffect(() => {
    upsertJsonLd("ld-website", {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Alkarizmia",
      url: SITE_URL,
      inLanguage: "fr-BE",
      description: SHORT_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#business` },
    });

    upsertJsonLd("ld-business", {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#business`,
      name: "Alkarizmia",
      description: SHORT_DESCRIPTION,
      url: SITE_URL,
      logo: `${SITE_URL}/logo-symbole.png`,
      image: `${SITE_URL}/og-image.png`,
      email: CONTACT.email,
      telephone: `+${CONTACT.whatsappNumber}`,
      priceRange: "€€",
      knowsLanguage: "fr",
      areaServed: [
        { "@type": "City", name: "Bruxelles" },
        { "@type": "Country", name: "Belgique" },
      ],
      founder: {
        "@type": "Person",
        name: OWNER.name,
        knowsLanguage: "fr",
      },
      sameAs: [SOCIAL.linkedin, SOCIAL.instagram],
    });
  }, []);

  return null;
}
