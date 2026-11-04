import { pngResponse, renderOgImage } from "../../lib/og";
import { SITE } from "../../lib/site";

export async function GET() {
  const png = await renderOgImage({
    kicker: SITE.kicker,
    title: SITE.title,
    subtitle: SITE.tagline,
  });
  return pngResponse(png);
}
