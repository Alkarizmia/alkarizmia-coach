import fs from "node:fs";
import path from "node:path";

const dir = "public/formules";

function mock(title, subtitle, tone) {
  const bg = tone === "dark" ? "#2a2f38" : tone === "warm" ? "#e8e0d2" : "#f7f4ee";
  const accent = "#1f4d3f";
  const text = tone === "dark" ? "#f7f4ee" : "#14161c";
  const muted = tone === "dark" ? "#b8b4ab" : "#5a5f6b";
  const card = tone === "dark" ? "#3a404a" : "#ffffff";
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="390" height="844" viewBox="0 0 390 844">
  <rect width="390" height="844" fill="${bg}"/>
  <rect x="24" y="48" width="120" height="14" rx="7" fill="${accent}" opacity="0.85"/>
  <text x="24" y="110" font-family="Georgia, serif" font-size="28" fill="${text}">${title}</text>
  <text x="24" y="142" font-family="system-ui, sans-serif" font-size="14" fill="${muted}">${subtitle}</text>
  <rect x="24" y="180" width="342" height="160" rx="18" fill="${accent}" opacity="0.14"/>
  <rect x="24" y="360" width="342" height="56" rx="14" fill="${accent}"/>
  <text x="195" y="394" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" fill="#f7f4ee">Reserver une seance</text>
  <rect x="24" y="440" width="342" height="72" rx="14" fill="${card}"/>
  <rect x="24" y="528" width="342" height="72" rx="14" fill="${card}"/>
  <rect x="24" y="616" width="342" height="72" rx="14" fill="${card}"/>
</svg>
`;
}

const files = {
  "essentiel-1.svg": mock("Alex Coach", "Sport - Bruxelles", "light"),
  "essentiel-2.svg": mock("Seances et tarifs", "Clair et direct", "light"),
  "essentiel-3.svg": mock("Avis clients", "Sur Google", "warm"),
  "signature-1.svg": mock("Studio Nova", "Coaching de vie", "light"),
  "signature-2.svg": mock("Galerie", "Resultats reels", "warm"),
  "signature-3.svg": mock("Programmes", "4 pages soignees", "light"),
  "signature-plus-1.svg": mock("Multi-offres", "Plusieurs lieux", "light"),
  "signature-plus-2.svg": mock("Programmes", "Parcours complets", "warm"),
  "signature-plus-3.svg": mock("Contact", "Prise de RDV", "dark"),
  "refonte-avant.svg": mock("Ancien site", "Lent et confus", "dark"),
  "refonte-apres.svg": mock("Nouveau site", "Clair et rapide", "light"),
};

fs.mkdirSync(dir, { recursive: true });
for (const [name, svg] of Object.entries(files)) {
  fs.writeFileSync(path.join(dir, name), svg, "utf8");
}
console.log("wrote", Object.keys(files).length, "placeholders");
