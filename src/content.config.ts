import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const letters = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/letters" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    date: z.string(),
    slug: z.string(),
    tag: z.string(),
    readMinutes: z.number().int().positive(),
    signoff: z.object({
      closing: z.string(),
      name: z.string(),
    }),
    footerNote: z.string(),
  }),
});

export const collections = { letters };
