/**
 * Génère les pages HTML SEO en UTF-8 sans BOM.
 * Source unique pour titles, meta, JSON-LD et textes visibles.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FAQ_ITEMS } from "../src/content/faq.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const SITE = "https://alkarizmia.com";
const LASTMOD = "2026-11-07";

export const SHORT_DESCRIPTION =
  "Alkarizmia crée des sites web pour coachs indépendants à Bruxelles.";

const SOCIAL = {
  linkedin: "https://www.linkedin.com/in/bilal-el-fahmi",
  instagram: "https://www.instagram.com/alkarizmia.web/",
};

const OG_IMAGE = `${SITE}/og-image.png`;

function assertLen(label, value, min, max) {
  const n = [...value].length;
  if (n < min || n > max) {
    throw new Error(`${label} (${n} car.) hors plage ${min}–${max} : ${value}`);
  }
}

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function jsonLd(data) {
  return JSON.stringify(data, null, 2).replace(/</g, "\\u003c");
}

function breadcrumbs(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function crumbNav(items) {
  return `<nav class="crumbs" aria-label="Fil d'Ariane">
        ${items
          .map((item, i) => {
            const last = i === items.length - 1;
            if (last) {
              return `<span aria-current="page">${esc(item.name)}</span>`;
            }
            return `<a href="${esc(item.path)}">${esc(item.name)}</a><span aria-hidden="true"> / </span>`;
          })
          .join("")}
      </nav>`;
}

const professionalService = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE}/#business`,
  name: "Alkarizmia",
  url: `${SITE}/`,
  logo: `${SITE}/logo-symbole.png`,
  image: OG_IMAGE,
  description: SHORT_DESCRIPTION,
  email: "contact@alkarizmia.com",
  telephone: "+32487870477",
  priceRange: "€€",
  knowsLanguage: "fr",
  areaServed: [
    { "@type": "City", name: "Bruxelles" },
    { "@type": "Country", name: "Belgique" },
  ],
  founder: {
    "@type": "Person",
    name: "Bilal El Fahmi",
    knowsLanguage: "fr",
  },
  sameAs: [SOCIAL.linkedin, SOCIAL.instagram],
};

const webSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  name: "Alkarizmia",
  url: `${SITE}/`,
  inLanguage: "fr-BE",
  description: SHORT_DESCRIPTION,
  publisher: { "@id": `${SITE}/#business` },
};

const PAGES = [
  {
    dir: "creation-site-web-coach-bruxelles",
    path: "/creation-site-web-coach-bruxelles/",
    title: "Création site web coach Bruxelles, prêt en 10 jours",
    description:
      "Création site web coach Bruxelles : présentation, séances, avis et WhatsApp. Alkarizmia livre en 10 jours, domaine à votre nom. Réservez 15 min.",
    ogType: "article",
    h1: "Création site web coach Bruxelles",
    lead:
      "Alkarizmia crée des sites web pour coachs à Bruxelles, pensés pour être trouvés et contactés. Présentation, séances, tarifs et bouton WhatsApp, livrés en environ 10 jours.",
    crumbName: "Création de site coach",
    extraLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Création site web coach Bruxelles",
        url: `${SITE}/creation-site-web-coach-bruxelles/`,
        description: SHORT_DESCRIPTION,
        inLanguage: "fr-BE",
        isPartOf: { "@id": `${SITE}/#website` },
        about: { "@id": `${SITE}/#business` },
      },
    ],
    body: `
      <h2>Pour qui</h2>
      <ul>
        <li>Coachs sportifs et préparateurs physiques</li>
        <li>Coachs de vie et accompagnement</li>
        <li>Coachs business et leadership</li>
        <li>Yoga, bien-être, nutrition</li>
        <li>Petites salles et indépendants à Bruxelles</li>
      </ul>

      <h2>Ce que contient un site coach</h2>
      <ul>
        <li>Votre histoire et votre méthode</li>
        <li>Séances et tarifs lisibles</li>
        <li>Galerie et témoignages (selon formule)</li>
        <li>Contact direct (e-mail / WhatsApp)</li>
        <li>Version mobile d'abord</li>
      </ul>

      <h2>Comment ça se passe</h2>
      <ol>
        <li>Échange de 15 minutes — on parle de votre activité.</li>
        <li>Création — je réalise le site, vous validez avant mise en ligne.</li>
        <li>Livraison — site en ligne, à votre nom, accès complets.</li>
      </ol>

      <p>
        <a class="cta cta--primary" href="/#contact">Me contacter</a>
        <a class="cta cta--secondary" href="/#offres">Voir les formules</a>
      </p>
    `,
  },
  {
    dir: "prix-site-internet-coach",
    path: "/prix-site-internet-coach/",
    title: "Prix site internet coach à Bruxelles : TVA incluse",
    description:
      "Prix d'un site internet coach chez Alkarizmia : 290 € à 740 € TVA incluse. Essentiel 350 €, Signature 590 €. Demandez un devis fixe en 15 minutes.",
    ogType: "article",
    h1: "Prix site internet coach à Bruxelles",
    lead:
      "Un site internet pour coach coûte chez Alkarizmia entre 290 € et 740 € TVA incluse, selon la formule. Essentiel 350 €, Signature 590 €, Refonte dès 290 €. Prix fixe, annoncé avant de commencer.",
    crumbName: "Prix",
    extraLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Création de site internet pour coach",
        serviceType: "Création de site web",
        provider: { "@id": `${SITE}/#business`, name: "Alkarizmia" },
        areaServed: [
          { "@type": "City", name: "Bruxelles" },
          { "@type": "Country", name: "Belgique" },
        ],
        offers: [
          {
            "@type": "Offer",
            name: "Essentiel",
            price: "350",
            priceCurrency: "EUR",
            description: "Une page claire. TVA incluse.",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "350",
              priceCurrency: "EUR",
              valueAddedTaxIncluded: true,
            },
          },
          {
            "@type": "Offer",
            name: "Signature",
            price: "590",
            priceCurrency: "EUR",
            description: "Jusqu'à 4 pages. TVA incluse.",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "590",
              priceCurrency: "EUR",
              valueAddedTaxIncluded: true,
            },
          },
          {
            "@type": "Offer",
            name: "Refonte",
            price: "290",
            priceCurrency: "EUR",
            description: "Refonte dès 290 €. TVA incluse.",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              minPrice: "290",
              priceCurrency: "EUR",
              valueAddedTaxIncluded: true,
            },
          },
        ],
      },
    ],
    body: `
      <div class="card">
        <h2>Essentiel</h2>
        <p class="price">350 €</p>
        <p>Une page claire : votre histoire, vos séances et tarifs, et un contact direct.</p>
      </div>
      <div class="card">
        <h2>Signature</h2>
        <p class="price">590 €</p>
        <p>Jusqu'à 4 pages, galerie, témoignages et bases du référencement.</p>
      </div>
      <div class="card">
        <h2>Refonte</h2>
        <p class="price">dès 290 €</p>
        <p>Votre site actuel est lent ou difficile ? Je le refais en gardant vos contenus.</p>
      </div>

      <h2>Option suivi</h2>
      <p>
        Suivi mensuel à 39 €/mois : mises à jour, 2 petites modifications par
        mois, vérifications. 6 mois réglés en une fois, sans renouvellement automatique.
      </p>
      <p>
        Domaine et hébergement à votre nom (environ dix euros par an pour le
        domaine). Tous les prix sont TVA incluse.
      </p>

      <h2>Questions sur les prix</h2>
      <details open>
        <summary>Le prix peut-il augmenter en cours de route ?</summary>
        <p>Non, sauf si vous demandez des pages ou fonctions supplémentaires. Tout est confirmé à l'avance.</p>
      </details>
      <details>
        <summary>Comment payer ?</summary>
        <p>40 % à la signature, 60 % à la livraison.</p>
      </details>

      <p>
        <a class="cta cta--primary" href="/#contact">Demander un devis</a>
        <a class="cta cta--secondary" href="/#offres">Voir le simulateur</a>
      </p>
    `,
  },
  {
    dir: "faq-creation-site-coach",
    path: "/faq-creation-site-coach/",
    title: "Créer un site de coach : questions fréquentes | FAQ",
    description:
      "Créer un site de coach : délai, domaine, prix, photos et Google. Réponses claires d'Alkarizmia à Bruxelles. Posez votre question en 15 minutes.",
    ogType: "article",
    h1: "Créer un site de coach : questions fréquentes",
    lead:
      "Vous vous demandez comment créer un site de coach à Bruxelles ? Délai d'environ 10 jours, domaine à votre nom, prix fixes dès 290 €. Voici les réponses aux questions les plus fréquentes.",
    crumbName: "FAQ",
    extraLd: [
      {
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
      },
    ],
    body: `
      ${FAQ_ITEMS.map(
        (item, i) => `<details${i === 0 ? " open" : ""}>
        <summary>${esc(item.q)}</summary>
        <p>${esc(item.a)}</p>
      </details>`,
      ).join("\n      ")}

      <p>
        <a class="cta cta--primary" href="/#contact">Poser une autre question</a>
        <a class="cta cta--secondary" href="/">Retour à l'accueil</a>
      </p>
    `,
  },
  {
    dir: "a-propos",
    path: "/a-propos/",
    title: "À propos d'Alkarizmia, sites pour coachs à Bruxelles",
    description:
      "Alkarizmia, créé à Bruxelles par Bilal El Fahmi, conçoit des sites pour coachs sportifs, de vie et bien-être. Contact visio, WhatsApp ou e-mail.",
    ogType: "profile",
    h1: "À propos d'Alkarizmia",
    lead:
      "Alkarizmia crée des sites web pour coachs indépendants à Bruxelles. Le studio est fondé par Bilal El Fahmi, 18 ans, basé à Bruxelles. Les rendez-vous se font en visio, pour toute la Belgique.",
    crumbName: "À propos",
    extraLd: [
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "À propos d'Alkarizmia",
        url: `${SITE}/a-propos/`,
        description: SHORT_DESCRIPTION,
        inLanguage: "fr-BE",
        mainEntity: { "@id": `${SITE}/#business` },
      },
      {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Bilal El Fahmi",
        jobTitle: "Fondateur",
        worksFor: { "@id": `${SITE}/#business` },
        knowsLanguage: "fr",
        sameAs: [SOCIAL.linkedin],
      },
    ],
    body: `
      <h2>Qui est Alkarizmia</h2>
      <p>
        Alkarizmia crée des sites web pour coachs indépendants à Bruxelles.
        L'objectif est simple : un site clair, adapté au téléphone, pour être
        trouvé, compris et contacté.
      </p>

      <h2>Qui est le fondateur</h2>
      <p>
        Bilal El Fahmi, 18 ans, basé à Bruxelles. Interlocuteur unique, du
        premier échange à la mise en ligne.
      </p>

      <h2>Pour qui</h2>
      <ul>
        <li>Coachs sportifs et préparateurs physiques</li>
        <li>Coachs de vie</li>
        <li>Coachs bien-être, yoga, nutrition</li>
      </ul>

      <h2>Ce qui est inclus</h2>
      <ul>
        <li>Conception et mise en ligne du site</li>
        <li>Nom de domaine et hébergement à votre nom (première année)</li>
        <li>Version mobile, bases pour Google, contact WhatsApp ou e-mail</li>
        <li>Accès complets à la livraison</li>
      </ul>

      <h2>Zone et rendez-vous</h2>
      <p>
        Bruxelles et Belgique. Les rendez-vous se font en visio.
      </p>

      <h2>Contact</h2>
      <p>
        E-mail : <a href="mailto:contact@alkarizmia.com">contact@alkarizmia.com</a><br />
        WhatsApp : <a href="https://wa.me/32487870477">+32 487 87 04 77</a>
      </p>

      <p>
        <a class="cta cta--primary" href="/#contact">Me contacter</a>
        <a class="cta cta--secondary" href="/prix-site-internet-coach/">Voir les prix</a>
      </p>
    `,
  },
];

function head({ title, description, canonical, ogType, jsonBlocks }) {
  return `<!doctype html>
<html lang="fr-BE">
  <head>
    <meta charset="utf-8" />
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      try {
        if (localStorage.getItem('alkarizmia_cookie_consent') === 'granted') {
          var s = document.createElement('script');
          s.async = true;
          s.src = 'https://www.googletagmanager.com/gtag/js?id=G-LS6R68NH17';
          document.head.appendChild(s);
          gtag('js', new Date());
          gtag('config', 'G-LS6R68NH17', { anonymize_ip: true });
        }
      } catch (e) {}
    </script>
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" type="image/png" sizes="48x48" href="/favicon.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${esc(canonical)}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:url" content="${esc(canonical)}" />
    <meta property="og:type" content="${esc(ogType)}" />
    <meta property="og:locale" content="fr_BE" />
    <meta property="og:site_name" content="Alkarizmia" />
    <meta property="og:image" content="${OG_IMAGE}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Alkarizmia — création de sites web pour coachs à Bruxelles" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(description)}" />
    <meta name="twitter:image" content="${OG_IMAGE}" />
    <link rel="stylesheet" href="/seo-pages.css" />
${jsonBlocks
  .map(
    (block) => `    <script type="application/ld+json">
      ${jsonLd(block)}
    </script>`,
  )
  .join("\n")}
  </head>`;
}

function writeUtf8(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, { encoding: "utf8" });
}

function renderPage(page) {
  assertLen(`title ${page.path}`, page.title, 50, 60);
  assertLen(`description ${page.path}`, page.description, 140, 155);

  const crumbItems = [
    { name: "Accueil", url: `${SITE}/`, path: "/" },
    { name: page.crumbName, url: `${SITE}${page.path}`, path: page.path },
  ];

  const jsonBlocks = [
    professionalService,
    webSite,
    breadcrumbs(crumbItems.map(({ name, url }) => ({ name, url }))),
    ...page.extraLd,
  ];

  const html = `${head({
    title: page.title,
    description: page.description,
    canonical: `${SITE}${page.path}`,
    ogType: page.ogType,
    jsonBlocks,
  })}
  <body>
    <main class="wrap">
      <a class="brand" href="/">Alkarizmia</a>
      ${crumbNav(crumbItems)}
      <h1>${esc(page.h1)}</h1>
      <p class="lead">${esc(page.lead)}</p>
      ${page.body.trim()}

      <p class="foot">
        <a href="/">Accueil</a> ·
        <a href="/a-propos/">À propos</a> ·
        <a href="/creation-site-web-coach-bruxelles/">Création de site coach</a> ·
        <a href="/prix-site-internet-coach/">Prix</a> ·
        <a href="/faq-creation-site-coach/">FAQ</a>
      </p>
    </main>
  </body>
</html>
`;

  writeUtf8(path.join(PUBLIC, page.dir, "index.html"), html);
  return { title: page.title, description: page.description, path: page.path };
}

const robots = `# https://alkarizmia.com
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Bingbot
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;

const llms = `# Alkarizmia

> ${SHORT_DESCRIPTION}

Alkarizmia est un studio de création de sites web pour coachs indépendants (sport, vie, bien-être) à Bruxelles, en Belgique. Fondateur : Bilal El Fahmi, 18 ans, basé à Bruxelles. Les rendez-vous se font en visio, pour toute la Belgique.

## Offre
Sites clairs, adaptés au téléphone, avec contact en un clic. Livraison en environ 10 jours. Nom de domaine et accès à votre nom.

## Prix (TVA incluse)
Un site internet pour coach coûte chez Alkarizmia entre 290 € et 740 € TVA incluse, selon la formule.
- Essentiel — 350 € : une page (présentation, séances/tarifs, contact)
- Signature — 590 € : jusqu'à 4 pages, galerie, témoignages, bases SEO
- Signature + — 740 € : 5 pages ou plus
- Refonte — dès 290 € : refaire un site existant en gardant les contenus
- Option Entretien & visibilité — 39 €/mois (6 mois réglés en une fois, sans renouvellement automatique)

## Pages
- Accueil : ${SITE}/
- À propos : ${SITE}/a-propos/
- Création de site web coach Bruxelles : ${SITE}/creation-site-web-coach-bruxelles/
- Prix site internet coach : ${SITE}/prix-site-internet-coach/
- FAQ : ${SITE}/faq-creation-site-coach/
- Conditions générales : ${SITE}/conditions

## Contact
- E-mail : contact@alkarizmia.com
- WhatsApp : +32 487 87 04 77
- LinkedIn : ${SOCIAL.linkedin}
- Instagram : ${SOCIAL.instagram}

## Réalisations
- ScanPlay : https://scanplay.org
- PayPulss : https://paypulss.com
`;

const cfHeaders = `/*
  X-Content-Type-Options: nosniff

/index.html
  Content-Type: text/html; charset=utf-8

/a-propos/
  Content-Type: text/html; charset=utf-8

/a-propos/index.html
  Content-Type: text/html; charset=utf-8

/creation-site-web-coach-bruxelles/
  Content-Type: text/html; charset=utf-8

/creation-site-web-coach-bruxelles/index.html
  Content-Type: text/html; charset=utf-8

/prix-site-internet-coach/
  Content-Type: text/html; charset=utf-8

/prix-site-internet-coach/index.html
  Content-Type: text/html; charset=utf-8

/faq-creation-site-coach/
  Content-Type: text/html; charset=utf-8

/faq-creation-site-coach/index.html
  Content-Type: text/html; charset=utf-8
`;

const homeTitle = "Création de site web pour coach à Bruxelles | Alkarizmia";
const homeDescription =
  "Alkarizmia crée votre site web pour coach à Bruxelles : clair, mobile, contact en un clic. Échange gratuit de 15 min. Demandez votre maquette.";

assertLen("title accueil", homeTitle, 50, 60);
assertLen("description accueil", homeDescription, 140, 155);

const sitemapUrls = [
  { loc: `${SITE}/`, priority: "1.0", changefreq: "weekly" },
  {
    loc: `${SITE}/creation-site-web-coach-bruxelles/`,
    priority: "0.9",
    changefreq: "monthly",
  },
  {
    loc: `${SITE}/prix-site-internet-coach/`,
    priority: "0.8",
    changefreq: "monthly",
  },
  {
    loc: `${SITE}/faq-creation-site-coach/`,
    priority: "0.8",
    changefreq: "monthly",
  },
  { loc: `${SITE}/a-propos/`, priority: "0.7", changefreq: "monthly" },
  { loc: `${SITE}/llms.txt`, priority: "0.3", changefreq: "monthly" },
  { loc: `${SITE}/conditions`, priority: "0.4", changefreq: "yearly" },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const reports = PAGES.map(renderPage);
writeUtf8(path.join(PUBLIC, "robots.txt"), robots);
writeUtf8(path.join(PUBLIC, "llms.txt"), llms);
writeUtf8(path.join(PUBLIC, "sitemap.xml"), sitemap);
writeUtf8(path.join(PUBLIC, "_headers"), cfHeaders);

console.log("Accueil");
console.log(`  title (${[...homeTitle].length}): ${homeTitle}`);
console.log(`  description (${[...homeDescription].length}): ${homeDescription}`);
for (const page of reports) {
  console.log(page.path);
  console.log(`  title (${[...page.title].length}): ${page.title}`);
  console.log(`  description (${[...page.description].length}): ${page.description}`);
}
console.log("UTF-8 sans BOM : pages SEO, robots.txt, sitemap.xml, llms.txt, _headers");
