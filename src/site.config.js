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
  email: "contact@alkarizmia.com",
  whatsappNumber: "32487870477",
  whatsappDisplay: "+32 487 87 04 77",
};

/** Message prérempli pour réserver l'échange de 15 minutes */
export const BOOKING_MESSAGE =
  "Bonjour Bilal, je voudrais réserver un échange gratuit de 15 minutes pour parler de mon site.";

/** Message prérempli depuis le détail d'une formule */
export function formuleInterestMessage(formule) {
  if (!formule) return BOOKING_MESSAGE;

  const priceLabel = `${formule.pricePrefix || ""}${formule.price} €`;
  const lines = [
    "Bonjour Bilal,",
    "",
    `Je suis intéressé(e) par la formule ${formule.name} (${priceLabel}).`,
  ];

  if (formule.deposit != null && formule.balance != null) {
    lines.push(
      `Acompte ${formule.deposit} € pour démarrer, puis ${formule.balance} € à la livraison.`,
    );
  } else if (formule.sizes?.length) {
    lines.push(
      `Tarifs refonte : ${formule.sizes.map((s) => `${s.label} ${s.price} €`).join(", ")}.`,
    );
  }

  lines.push(
    "",
    "On peut prévoir un échange gratuit de 15 minutes ?",
  );

  return lines.join("\n");
}

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

/** Paiement unique — 40 % à la commande, 60 % à la livraison */
export const PAYMENT = {
  depositPercent: 40,
  balancePercent: 60,
  steps: [
    { id: "deposit", label: "40 % pour démarrer" },
    { id: "build", label: "Je crée votre site" },
    { id: "balance", label: "60 % à la livraison" },
  ],
  note: "Aucun paiement mensuel obligatoire.",
  balanceNote:
    "Vous payez le reste seulement quand votre site est prêt et que vous l'avez validé.",
};

/** Options ponctuelles (une fois) */
export const FORMULE_EXTRAS = [
  { id: "reservation", label: "Réservation en ligne", price: 60 },
  { id: "textes", label: "Je rédige vos textes", price: 90 },
];

/**
 * Formules — textes et prix à un seul endroit.
 * deposit = 40 %, balance = 60 % (arrondis à l'euro).
 */
export const FORMULES = [
  {
    id: "essentiel",
    name: "Essentiel",
    price: 350,
    pricePrefix: "",
    pagesLabel: "1 page",
    days: 7,
    deposit: 140,
    balance: 210,
    tagline: "Pour être trouvé sur Google et prendre contact en un clic.",
    featured: false,
    badge: null,
    showDesktop: false,
    highlights: [
      "Votre histoire, séances et tarifs",
      "WhatsApp et appel en un clic",
      "Adapté au téléphone",
    ],
    receives: [
      {
        icon: "page",
        text: "Une page avec votre histoire, vos séances et vos tarifs",
      },
      { icon: "whatsapp", text: "Bouton WhatsApp et appel en un clic" },
      { icon: "reviews", text: "Vos avis Google affichés" },
      { icon: "mobile", text: "Adapté au téléphone" },
      {
        icon: "domain",
        text: "Nom de domaine et hébergement à votre nom",
      },
      { icon: "seo", text: "Bases pour être trouvé sur Google" },
    ],
    screens: [
      "/formules/essentiel-1.svg",
      "/formules/essentiel-2.svg",
      "/formules/essentiel-3.svg",
    ],
    roi: {
      clientPrice: 50,
      period: "semaine",
      monthlyApprox: 200,
      payback: "moins de deux mois",
      template:
        "Exemple : un seul nouveau client à {clientPrice} € par {period}, c'est environ {monthlyApprox} € par mois. Votre site {name} est remboursé en {payback}.",
    },
  },
  {
    id: "signature",
    name: "Signature",
    price: 590,
    pricePrefix: "",
    pagesLabel: "jusqu'à 4 pages",
    days: 10,
    deposit: 236,
    balance: 354,
    tagline: "Pour présenter chaque séance, vos résultats et vos avis.",
    featured: true,
    badge: "Le plus choisi",
    showDesktop: true,
    highlights: [
      "Jusqu'à 4 pages + galerie",
      "Témoignages et résultats",
      "Bases du référencement local",
    ],
    receives: [
      {
        icon: "page",
        text: "Jusqu'à 4 pages : présentation, séances, galerie, contact",
      },
      { icon: "reviews", text: "Témoignages et avis mis en avant" },
      { icon: "whatsapp", text: "Contact direct WhatsApp et appel" },
      { icon: "mobile", text: "Version mobile d'abord" },
      {
        icon: "domain",
        text: "Nom de domaine et hébergement à votre nom",
      },
      { icon: "seo", text: "Bases SEO locales (ex. coach à Bruxelles)" },
    ],
    screens: [
      "/formules/signature-1.svg",
      "/formules/signature-2.svg",
      "/formules/signature-3.svg",
    ],
    roi: {
      clientPrice: 80,
      period: "semaine",
      monthlyApprox: 320,
      payback: "moins de deux mois",
      template:
        "Exemple : un seul nouveau client à {clientPrice} € par {period}, c'est environ {monthlyApprox} € par mois. Votre site {name} est remboursé en {payback}.",
    },
  },
  {
    id: "signature-plus",
    name: "Signature +",
    price: 740,
    pricePrefix: "",
    pagesLabel: "5 pages ou plus",
    days: 14,
    deposit: 296,
    balance: 444,
    tagline: "Pour les coachs avec plusieurs offres, lieux ou programmes.",
    featured: false,
    badge: null,
    showDesktop: true,
    highlights: [
      "5 pages ou plus",
      "Plusieurs offres ou lieux",
      "Structure claire pour vos programmes",
    ],
    receives: [
      {
        icon: "page",
        text: "5 pages ou plus : offres, programmes, lieux, blog si besoin",
      },
      { icon: "reviews", text: "Galerie, avis et preuves de résultats" },
      { icon: "whatsapp", text: "Contact et prise de rendez-vous simplifiés" },
      { icon: "mobile", text: "Expérience fluide sur téléphone" },
      {
        icon: "domain",
        text: "Nom de domaine et hébergement à votre nom",
      },
      { icon: "seo", text: "Structure SEO pour plusieurs mots-clés" },
    ],
    screens: [
      "/formules/signature-plus-1.svg",
      "/formules/signature-plus-2.svg",
      "/formules/signature-plus-3.svg",
    ],
    roi: {
      clientPrice: 100,
      period: "semaine",
      monthlyApprox: 400,
      payback: "moins de deux mois",
      template:
        "Exemple : un seul nouveau client à {clientPrice} € par {period}, c'est environ {monthlyApprox} € par mois. Votre site {name} est remboursé en {payback}.",
    },
  },
  {
    id: "refonte",
    name: "Refonte",
    price: 290,
    pricePrefix: "dès ",
    pagesLabel: "selon la taille",
    days: null,
    deposit: null,
    balance: null,
    tagline:
      "Votre site existe mais il est lent, vieux ou difficile à utiliser ? Je le refais en gardant vos contenus.",
    featured: false,
    badge: null,
    showDesktop: false,
    isRefonte: true,
    highlights: [
      "Je garde vos textes et photos",
      "Site plus rapide et clair",
      "Prix selon le nombre de pages",
    ],
    receives: [
      {
        icon: "page",
        text: "Refonte complète en gardant vos contenus existants",
      },
      { icon: "mobile", text: "Navigation claire, surtout sur téléphone" },
      { icon: "seo", text: "Bases techniques pour Google" },
      {
        icon: "domain",
        text: "Domaine et accès restent à votre nom",
      },
    ],
    sizes: [
      { label: "1 page", price: 290, days: 7, deposit: 116, balance: 174 },
      { label: "2 à 4 pages", price: 490, days: 10, deposit: 196, balance: 294 },
      {
        label: "5 pages ou plus",
        price: 640,
        days: 14,
        deposit: 256,
        balance: 384,
      },
    ],
    beforeAfter: {
      before: "/formules/refonte-avant.svg",
      after: "/formules/refonte-apres.svg",
    },
    roi: {
      clientPrice: 50,
      period: "semaine",
      monthlyApprox: 200,
      payback: "quelques semaines",
      template:
        "Exemple : un seul nouveau client à {clientPrice} € par {period}, c'est environ {monthlyApprox} € par mois. Une refonte peut être remboursée en {payback}.",
    },
  },
];

/** Entretien & visibilité — option après livraison (jamais « abonnement » dans l'UI) */
export const ENTRETIEN = {
  label: "En option, après la livraison",
  title: "Entretien & visibilité, 39 € par mois",
  price: 39,
  points: [
    { icon: "reviews", text: "Vos nouveaux avis Google ajoutés au site" },
    { icon: "report", text: "Un rapport chaque mois" },
    { icon: "edit", text: "2 petites modifications par mois" },
    { icon: "shield", text: "Sauvegardes et vérifications" },
  ],
  note: "6 mois minimum, puis vous arrêtez quand vous voulez avec 30 jours de préavis.",
};

export const FORMULES_UI = {
  sectionLabel: "Tarifs de lancement pour mes premiers clients",
  sectionTitle: "Formules",
  sectionLead: "Vous payez une fois. Le site est à vous, pour toujours.",
  oncePill: "payé une fois",
  depositLine: "soit {deposit} € pour démarrer, {balance} € à la livraison",
  daysLine: "Prêt en environ {days} jours",
  cardCta: "Voir ce que vous recevez →",
  receivesTitle: "Ce que vous recevez",
  concreteTitle: "Concrètement, pour vous",
  paymentTitle: "Comment se passe le paiement",
  extrasTitle: "Options",
  primaryCta: "Échange gratuit · 15 min",
  secondaryCta: "WhatsApp",
  refonteSizesTitle: "Tailles de refonte",
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

export function telLink() {
  return `tel:+${CONTACT.whatsappNumber}`;
}
