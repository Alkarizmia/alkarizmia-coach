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

/** Action principale du site (header, hero, barre mobile) */
export const PRIMARY_CTA = "Recevoir ma maquette gratuite";
export const MOCKUP_MESSAGE =
  "Bonjour Bilal, je voudrais recevoir ma maquette gratuite.";

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

/** Coopérative qui émet devis et factures */
export const BILLING = {
  name: "Smart",
  url: "https://smartbe.be",
  label: "coopérative Smart",
};

/**
 * Conditions générales — textes de la page /conditions
 * (list = puces ; paragraphs = paragraphes)
 */
export const CONDITIONS = {
  title: "Conditions générales",
  intro:
    "Ces conditions décrivent comment se déroulent une commande, le paiement, la livraison et l'entretien du site. Elles sont rédigées simplement, pour être claires avant de commencer.",
  updatedLabel: "Dernière mise à jour : novembre 2026",
  privacyLinkLabel: "politique de confidentialité",
  privacyHash: "#confidentialite",
  sections: [
    {
      id: "qui",
      title: "Qui sommes-nous",
      paragraphs: [
        "Alkarizmia est le nom commercial de Bilal El Fahmi, créateur de sites web pour coachs indépendants à Bruxelles. Les prestations sont facturées via la coopérative Smart (smartbe.be), qui émet les devis et les factures.",
        "Contact : contact@alkarizmia.com · WhatsApp +32 487 87 04 77.",
      ],
    },
    {
      id: "prix",
      title: "Prix et paiement",
      list: [
        "Tous les prix affichés sont TVA comprise.",
        "Le client choisit : paiement en une fois à la signature, ou en deux fois (40 % à la signature, 60 % à la livraison).",
        "Paiement par virement, sur la facture reçue.",
      ],
    },
    {
      id: "delais",
      title: "Démarrage et délais",
      list: [
        "Le travail commence après la signature du devis, le paiement de l'acompte (ou du total) et la réception de tous les contenus (photos, textes, logo).",
        "Les délais annoncés (environ 7, 10 ou 14 jours selon la formule) démarrent à partir de cette réception.",
      ],
    },
    {
      id: "corrections",
      title: "Corrections et validation",
      list: [
        "La maquette présentée avant la commande sert de base à la structure du site.",
        "Deux séries de corrections sont incluses après la présentation du site.",
        "Les demandes au-delà, ou qui modifient la structure validée (nouvelles pages, nouvelles fonctionnalités), sont facturées à part (30 € de l'heure) ou incluses dans l'offre Entretien & visibilité.",
        "Sans retour du client dans les 7 jours suivant la livraison, le site est considéré comme validé et le solde est dû.",
      ],
    },
    {
      id: "annulation",
      title: "Annulation",
      list: [
        "L'acompte est remboursé si le client annule avant le début du travail (avant l'envoi de ses contenus).",
        "Une fois le travail commencé, l'acompte n'est plus remboursable, car il couvre le travail déjà réalisé.",
      ],
    },
    {
      id: "propriete",
      title: "Mise en ligne, nom de domaine et propriété",
      list: [
        "Le nom de domaine est enregistré au nom du client. Le domaine et l'hébergement sont inclus la première année.",
        "La mise en ligne définitive sur le nom de domaine du client a lieu après paiement complet.",
        "Le site devient la propriété du client après paiement complet.",
        "Le domaine peut être transféré au client sur simple demande (les éventuels frais du nouveau fournisseur restent à charge du client).",
        "Les années suivantes, le renouvellement du domaine est inclus dans l'offre Entretien & visibilité, ou refacturé au prix coûtant.",
      ],
    },
    {
      id: "entretien",
      title: "Entretien & visibilité (optionnel)",
      list: [
        "39 € par mois, engagement de 6 mois, réglé en une fois pour la période (234 €).",
        "Comprend : ajout des nouveaux avis Google, 2 petites modifications par mois, sauvegardes, renouvellement du domaine.",
        "L'Entretien n'est pas renouvelé automatiquement. Un mois avant la fin des 6 mois, Alkarizmia propose au client de le prolonger.",
      ],
    },
    {
      id: "donnees",
      title: "Données personnelles",
      paragraphs: [
        "Pour savoir comment vos données sont utilisées (contact, facturation via Smart, mesure d'audience), consultez la politique de confidentialité.",
      ],
      linkToPrivacy: true,
    },
  ],
};

/** Textes de la politique de confidentialité (dialogue + renvoi depuis les CG) */
export const PRIVACY = {
  sections: [
    {
      title: "Données collectées",
      paragraphs: [
        "Ce site n'a ni formulaire ni compte. Avec votre accord (bannière cookies), j'utilise Google Analytics (G-LS6R68NH17) pour mesurer l'audience de façon agrégée : pages vues, zone géographique approximative, appareil, et interactions utiles (sections consultées, simulateur de prix, clics WhatsApp ou e-mail). Aucun cookie publicitaire n'est déposé. Sans accord, ces mesures ne sont pas activées. Vous pouvez changer d'avis via le lien Cookies en bas de page. Le simulateur fonctionne dans votre navigateur : vos réponses ne partent nulle part tant que vous n'envoyez pas le message.",
      ],
    },
    {
      title: "Quand vous me contactez",
      paragraphs: [
        "Si vous m'écrivez par e-mail ou WhatsApp, j'utilise votre nom, vos coordonnées et votre message uniquement pour vous répondre et, si nous travaillons ensemble, pour réaliser votre site. Ces échanges sont conservés au maximum 3 ans après le dernier contact, puis supprimés.",
      ],
    },
    {
      title: "Facturation via Smart",
      paragraphs: [
        "Lorsque nous travaillons ensemble, les données nécessaires à la facturation (nom, adresse, e-mail, numéro d'entreprise le cas échéant) sont transmises à la coopérative Smart (smartbe.be) pour établir les devis et les factures. Smart traite ces données en tant que partenaire de facturation. Je ne les utilise pas à d'autres fins.",
      ],
    },
    {
      title: "Vos droits",
      paragraphs: [
        "Conformément au RGPD, vous pouvez demander l'accès, la correction ou la suppression de vos données en écrivant à contact@alkarizmia.com. En cas de désaccord, vous pouvez introduire une plainte auprès de l'Autorité de protection des données (autoriteprotectiondonnees.be).",
      ],
    },
  ],
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
  note: "6 mois, réglés en une fois. Pas de renouvellement automatique : un mois avant la fin, je vous propose de prolonger.",
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
