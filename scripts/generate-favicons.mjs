/**
 * Génère les favicons carrés depuis public/logo-symbole.png.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.resolve(__dirname, "../public");
const SRC = path.join(PUBLIC, "logo-symbole.png");
const BG = { r: 247, g: 244, b: 238 };

function pngToIco(pngBuf, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size, 0);
  entry.writeUInt8(size, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(pngBuf.length, 8);
  entry.writeUInt32LE(22, 12);
  return Buffer.concat([header, entry, pngBuf]);
}

async function squarePng(size) {
  return sharp(SRC)
    .resize(size, size, {
      fit: "contain",
      background: BG,
    })
    .flatten({ background: BG })
    .png()
    .toBuffer();
}

export async function generateFavicons() {
  if (!fs.existsSync(SRC)) {
    throw new Error("public/logo-symbole.png introuvable");
  }

  const png48 = await squarePng(48);
  const png96 = await squarePng(96);
  const png180 = await squarePng(180);
  const png192 = await squarePng(192);
  const png512 = await squarePng(512);

  fs.writeFileSync(path.join(PUBLIC, "favicon.ico"), pngToIco(png48, 48));
  fs.writeFileSync(path.join(PUBLIC, "favicon-96x96.png"), png96);
  fs.writeFileSync(path.join(PUBLIC, "favicon-192x192.png"), png192);
  fs.writeFileSync(path.join(PUBLIC, "favicon-512x512.png"), png512);
  fs.writeFileSync(path.join(PUBLIC, "apple-touch-icon.png"), png180);

  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="#F7F4EE"/>
  <rect x="12" y="12" width="45.5" height="45.5" fill="#1F4D3F"/>
  <rect x="60.1" y="12" width="27.9" height="45.5" fill="#4F8A74"/>
  <rect x="12" y="60.1" width="45.5" height="27.9" fill="#4F8A74"/>
  <rect x="60.1" y="60.1" width="27.9" height="27.9" fill="#B5654A"/>
</svg>
`;
  fs.writeFileSync(path.join(PUBLIC, "favicon.svg"), faviconSvg, "utf8");

  const manifest = {
    name: "Alkarizmia",
    short_name: "Alkarizmia",
    icons: [
      {
        src: "/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: "#1F4D3F",
    background_color: "#F7F4EE",
    display: "browser",
  };
  fs.writeFileSync(
    path.join(PUBLIC, "site.webmanifest"),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8",
  );
}
