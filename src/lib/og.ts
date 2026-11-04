import path from "node:path";
import { Resvg } from "@resvg/resvg-js";
import { SITE } from "./site";

const WIDTH = 1200;
const HEIGHT = 630;

type OgInput = {
  kicker: string;
  title: string;
  subtitle?: string;
};

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll(" ", "\u00A0\u00A0");
}

function wrapWords(text: string, maxChars: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines;
}

export async function renderOgImage({
  kicker,
  title,
  subtitle,
}: OgInput): Promise<Uint8Array> {
  const fontsDir = path.join(process.cwd(), "src/assets/fonts");
  const titleSize = title.length > 70 ? 48 : 58;
  const titleLines = wrapWords(title, title.length > 70 ? 34 : 28);
  const subtitleLines = subtitle ? wrapWords(subtitle, 52) : [];
  const titleStart = 188;
  const subtitleStart = titleStart + titleLines.length * (titleSize + 10) + 18;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#0E0D0B"/>
  <text xml:space="preserve" x="80" y="118" fill="#C9A961" font-family="Cormorant Garamond" font-size="22" font-weight="500" letter-spacing="6">${escapeXml(kicker.toUpperCase())}</text>
  ${titleLines
    .map(
      (line, index) =>
        `<text xml:space="preserve" x="80" y="${titleStart + index * (titleSize + 10)}" fill="#ECE6DA" font-family="Cormorant Garamond" font-style="italic" font-weight="500" font-size="${titleSize}">${escapeXml(line)}</text>`,
    )
    .join("\n  ")}
  ${subtitleLines
    .map(
      (line, index) =>
        `<text xml:space="preserve" x="80" y="${subtitleStart + index * 40}" fill="#B9B0A0" font-family="EB Garamond" font-size="28">${escapeXml(line)}</text>`,
    )
    .join("\n  ")}
  <line x1="80" y1="534" x2="1120" y2="534" stroke="#2A2620" stroke-width="1"/>
  <text xml:space="preserve" x="80" y="576" fill="#C9A961" font-family="Cormorant Garamond" font-style="italic" font-weight="500" font-size="26">${escapeXml(SITE.title)}</text>
  <text x="1120" y="576" fill="#C9A961" font-family="Cormorant Garamond" font-style="italic" font-weight="500" font-size="26" text-anchor="end">letters.kellyjohns.org</text>
</svg>`;

  return new Resvg(svg, {
    fitTo: { mode: "width", value: WIDTH },
    font: {
      fontFiles: [
        path.join(fontsDir, "cormorant-garamond-500-italic.ttf"),
        path.join(fontsDir, "cormorant-garamond-500-normal.ttf"),
        path.join(fontsDir, "eb-garamond-400-normal.ttf"),
      ],
      loadSystemFonts: false,
    },
  })
    .render()
    .asPng();
}

export function pngResponse(png: Uint8Array): Response {
  return new Response(Buffer.from(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
