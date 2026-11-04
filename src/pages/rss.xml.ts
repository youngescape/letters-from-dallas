import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getLettersNewestFirst, parseLetterDate } from "../lib/letters";
import { SITE } from "../lib/site";

export async function GET(context: APIContext) {
  const letters = await getLettersNewestFirst();

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: letters.map((letter) => ({
      title: letter.data.title,
      description: letter.data.subtitle,
      pubDate: parseLetterDate(letter.data.date),
      link: `/letters/${letter.data.slug}/`,
    })),
  });
}
