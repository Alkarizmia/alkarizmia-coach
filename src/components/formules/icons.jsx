/** Icônes SVG légères pour la section Formules */

const size = 20;

export function IconCheck({ className }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.12" />
      <path
        d="M5.5 10.2 8.4 13l6.1-6.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconClose({ className }) {
  return (
    <svg className={className} width={22} height={22} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6 6 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconBack({ className }) {
  return (
    <svg className={className} width={22} height={22} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M15 5 8 12l7 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ICONS = {
  page: (
    <path
      d="M7 3.5h7.5L18 7v13.5H7V3.5Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  ),
  whatsapp: (
    <path
      d="M12 3.5a8 8 0 0 0-6.9 12l-.8 2.9 3-0.8A8 8 0 1 0 12 3.5Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  ),
  reviews: (
    <>
      <path
        d="m12 3.8 1.9 3.9 4.3.6-3.1 3 0.7 4.3L12 13.6 8.2 15.6l.7-4.3-3.1-3 4.3-.6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </>
  ),
  mobile: (
    <rect
      x="7.5"
      y="3.5"
      width="9"
      height="17"
      rx="2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  ),
  domain: (
    <>
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M4.5 12h15M12 4.5c2.2 2.4 2.2 12.6 0 15M12 4.5c-2.2 2.4-2.2 12.6 0 15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </>
  ),
  seo: (
    <path
      d="M4.5 16.5 9 9l3.2 4.5L15 8.5l4.5 8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  report: (
    <path
      d="M6 17V9.5M12 17V6.5M18 17v-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  ),
  edit: (
    <path
      d="m14.5 5.5 4 4M5 19l1.2-4.5L15.8 5 19 8.2 9.5 17.8 5 19Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  ),
  shield: (
    <path
      d="M12 3.5 18.5 6v5.2c0 4.2-2.8 7.4-6.5 8.8-3.7-1.4-6.5-4.6-6.5-8.8V6L12 3.5Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  ),
  /* 40 % pour démarrer — acompte / portefeuille */
  deposit: (
    <>
      <rect
        x="3.5"
        y="7"
        width="17"
        height="12"
        rx="2.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3.5 11h17"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="16" cy="14.5" r="1.4" fill="currentColor" />
    </>
  ),
  /* Je crée votre site — fenêtre / maquette */
  build: (
    <>
      <rect
        x="3.5"
        y="5"
        width="17"
        height="13"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3.5 8.5h17"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="6.2" cy="6.75" r="0.7" fill="currentColor" />
      <circle cx="8.4" cy="6.75" r="0.7" fill="currentColor" />
      <path
        d="M8 14.5h4.5M8 11.5h8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </>
  ),
  /* 60 % à la livraison — validation / clé remise */
  balance: (
    <>
      <circle
        cx="12"
        cy="12"
        r="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m8.2 12.2 2.4 2.4 5.2-5.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
};

export function IconChevron({ dir = "right", className }) {
  const d = dir === "left" ? "M14.5 5 8 12l6.5 7" : "M9.5 5 16 12l-6.5 7";
  return (
    <svg className={className} width={20} height={20} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FormuleIcon({ name, className }) {
  return (
    <svg className={className} width={22} height={22} viewBox="0 0 24 24" aria-hidden="true">
      {ICONS[name] ?? ICONS.page}
    </svg>
  );
}
