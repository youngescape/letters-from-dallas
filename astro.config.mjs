import { satteri } from "@astrojs/markdown-satteri";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://letters.kellyjohns.org",
  integrations: [sitemap()],
  markdown: {
    processor: satteri({
      features: { smartPunctuation: false },
    }),
  },
});
