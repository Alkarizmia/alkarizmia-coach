/**
 * Infos du site, à un seul endroit.
 * Tout ce qui change (contact, liens, prix, mentions légales) se modifie ici.
 */

export const OWNER = {
  name: "Bilal El Fahmi",
  firstName: "Bilal",
  brand: "Alkarizmia",
  city: "Bruxelles",
  country: "Belgique",
  /** Adresse postale complète — à ajouter une fois le statut enregistré */
  address: "",
  /** Numéro d'entreprise BCE — vide tant que le statut n'est pas enregistré */
  bce: "",
  /** Numéro de TVA — vide si franchise ou pas encore attribué */
  vat: "",
};

export const CONTACT = {
  email: "elfahmi.bilal18@gmail.com",
  whatsappNumber: "32487870477",
  whatsappDisplay: "+32 487 87 04 77",
};

/** Liens des réalisations — mettre l'adresse du site en ligne ("" = pas de bouton) */
export const PROJECTS = [
  {
    name: "ScanPlay",
    url: "https://scanplay.org",
    domain: "scanplay.org",
    tag: "Application web",
    text: "Une interface pensée pour le téléphone : on scanne, on joue, sans rien installer.",
    accent: "#1f4d3f",
  },
  {
    name: "PayPulss",
    url: "https://paypulss.com",
    domain: "paypulss.com",
    tag: "Site produit",
    text: "Une page claire qui présente le produit et pousse à l'action en quelques secondes.",
    accent: "#b5654a",
  },
];

export const HOSTING = {
  name: "Vercel Inc.",
  address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
  url: "https://vercel.com",
};

/** Liens prêts à l'emploi */
export function whatsappLink(text = "") {
  const base = `https://wa.me/${CONTACT.whatsappNumber}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function mailtoLink(subject = "", body = "") {
  const params = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${CONTACT.email}${params.length ? `?${params.join("&")}` : ""}`;
}
