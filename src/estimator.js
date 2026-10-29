/**
 * Simulateur de prix — questions et calcul.
 * Prix alignés sur site.config.js (FORMULES / FORMULE_EXTRAS / ENTRETIEN).
 */

import { ENTRETIEN, FORMULE_EXTRAS, FORMULES } from "./site.config.js";

const byName = Object.fromEntries(FORMULES.map((f) => [f.name, f]));
const extraPrice = Object.fromEntries(FORMULE_EXTRAS.map((e) => [e.id, e.price]));

export const QUESTIONS = [
  {
    id: "activite",
    title: "Quelle est votre activité ?",
    options: [
      { value: "sport", label: "Coaching sportif" },
      { value: "vie", label: "Coaching de vie" },
      { value: "business", label: "Coaching business" },
      { value: "yoga", label: "Yoga, bien-être" },
      { value: "nutrition", label: "Nutrition" },
      { value: "salle", label: "Salle ou studio" },
      { value: "autre", label: "Autre" },
    ],
  },
  {
    id: "situation",
    title: "Vous avez déjà un site ?",
    options: [
      { value: "nouveau", label: "Non, ce sera le premier", short: "premier site" },
      { value: "refonte", label: "Oui, il faut le refaire", short: "site existant à refaire" },
    ],
  },
  {
    id: "taille",
    title: "De quoi avez-vous besoin ?",
    options: [
      { value: "1", label: "Une page qui dit l'essentiel", short: "une page", hint: "Présentation, séances, tarifs, contact" },
      { value: "4", label: "2 à 4 pages", hint: "Galerie, témoignages, plus de détails" },
      { value: "5+", label: "5 pages ou plus", hint: "Blog, programmes, plusieurs services" },
    ],
  },
  {
    id: "domaine",
    title: "Vous avez un nom de domaine ?",
    options: [
      { value: "oui", label: "Oui, j'en ai un", hint: "ex. votre-nom.be", short: "déjà acheté" },
      { value: "non", label: "Pas encore", short: "pas encore" },
      { value: "nsp", label: "Je ne sais pas ce que c'est", short: "à expliquer" },
    ],
  },
  {
    id: "options",
    title: "Un petit plus ?",
    multiple: true,
    options: [
      {
        value: "reservation",
        label: "Réservation en ligne",
        hint: `≈ +${extraPrice.reservation} €`,
      },
      {
        value: "textes",
        label: "J'aimerais qu'on rédige mes textes",
        hint: `≈ +${extraPrice.textes} €`,
        short: "rédaction des textes",
      },
      {
        value: "suivi",
        label: "Entretien & visibilité",
        hint: `${ENTRETIEN.price} €/mois · mises à jour, 2 modifications/mois · 6 mois min.`,
      },
    ],
  },
];

const PRICES = {
  nouveau: {
    1: byName.Essentiel.price,
    4: byName.Signature.price,
    "5+": byName["Signature +"].price,
  },
  refonte: {
    1: byName.Refonte.sizes[0].price,
    4: byName.Refonte.sizes[1].price,
    "5+": byName.Refonte.sizes[2].price,
  },
  reservation: extraPrice.reservation,
  textes: extraPrice.textes,
  suivi: ENTRETIEN.price,
  domaine: 10,
};

const DELAYS = {
  1: byName.Essentiel.days,
  4: byName.Signature.days,
  "5+": byName["Signature +"].days,
};

/** Libellé d'une réponse (version courte pour le message si elle existe) */
export function labelOf(questionId, value, { short = false } = {}) {
  const q = QUESTIONS.find((item) => item.id === questionId);
  const option = q?.options.find((o) => o.value === value);
  return (short && option?.short) || option?.label || "";
}

/** Calcule l'estimation à partir des réponses */
export function estimate(answers) {
  const situation = answers.situation ?? "nouveau";
  const taille = answers.taille ?? "1";
  const options = answers.options ?? [];

  const base = PRICES[situation][taille];
  const formule =
    situation === "refonte"
      ? "Refonte"
      : taille === "1"
        ? "Essentiel"
        : taille === "4"
          ? "Signature"
          : "Signature +";

  const lines = [{ label: `Formule ${formule}`, amount: base }];
  if (options.includes("reservation")) {
    lines.push({ label: "Réservation en ligne", amount: PRICES.reservation });
  }
  if (options.includes("textes")) {
    lines.push({ label: "Rédaction des textes", amount: PRICES.textes });
  }

  const total = lines.reduce((sum, line) => sum + line.amount, 0);
  const days = DELAYS[taille] + (options.includes("textes") ? 3 : 0);

  return {
    formule,
    total,
    lines,
    days,
    monthly: options.includes("suivi") ? PRICES.suivi : 0,
    yearly: answers.domaine === "oui" ? 0 : PRICES.domaine,
  };
}

/** Message prêt à envoyer (WhatsApp ou e-mail) */
export function buildMessage(answers, result, { name = "", business = "" } = {}) {
  const options = (answers.options ?? []).map((v) => labelOf("options", v, { short: true }));
  const extras = [];
  if (result.yearly) extras.push(`+ domaine ≈ ${result.yearly} €/an`);
  if (result.monthly) extras.push(`+ suivi ${result.monthly} €/mois`);

  return [
    "Bonjour Bilal,",
    "",
    "Je viens de faire l'estimation sur le site Alkarizmia :",
    `• Activité : ${labelOf("activite", answers.activite)}${business ? ` (${business})` : ""}`,
    `• Site actuel : ${labelOf("situation", answers.situation, { short: true })}`,
    `• Besoin : ${labelOf("taille", answers.taille, { short: true })}`,
    `• Nom de domaine : ${labelOf("domaine", answers.domaine, { short: true })}`,
    `• Options : ${options.length ? options.join(", ") : "aucune"}`,
    "",
    `Estimation : ≈ ${result.total} € (formule ${result.formule})${extras.length ? ` ${extras.join(" ")}` : ""}`,
    `Délai annoncé : environ ${result.days} jours`,
    "",
    "On peut prévoir l'échange de 15 minutes ?",
    name ? `\n${name}` : "",
  ]
    .join("\n")
    .trim();
}
