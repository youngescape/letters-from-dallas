import type { APIRoute } from "astro";
import type { Letter } from "../../lib/letters";
import { getLettersNewestFirst } from "../../lib/letters";
import { pngResponse, renderOgImage } from "../../lib/og";
import { SITE } from "../../lib/site";

export async function getStaticPaths() {
  const letters = await getLettersNewestFirst();
  return letters.map((letter) => ({
    params: { slug: letter.data.slug },
    props: { letter },
  }));
}

export const GET: APIRoute<{ letter: Letter }> = async ({ props }) => {
  const png = await renderOgImage({
    kicker: SITE.kicker,
    title: props.letter.data.title,
    subtitle: props.letter.data.subtitle,
  });
  return pngResponse(png);
};
