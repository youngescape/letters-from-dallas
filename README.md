# Letters from Dallas

A dark, bookish static site for the Johns family letters. Public home: [letters.kellyjohns.org](https://letters.kellyjohns.org).

Letters on Jesus, the Bible, and life with God now.

## Add a letter

Adding a letter is one markdown file.

1. Create `src/content/letters/your-slug.md`.
2. Fill the frontmatter, then write the letter in ordinary markdown. Keep the sign-off as the last two paragraphs.

```md
---
title: "A Letter to Andrew: The Title"
subtitle: "The line under the title."
date: "November 4, 2026"
slug: "your-slug"
tag: "Letters"
readMinutes: 12
signoff: {"closing": "With love,", "name": "Dallas"}
footerNote: "A short source note that sits above the rule at the end."
---

Dear Andrew,

The letter begins here. Use `##` and `###` for headings, lists, and pull quotes like this:

> “The quotation.”
>
> — The Source

With love,

Dallas
```

The filename and `slug` should match. The index, letter page, RSS feed, sitemap, and Open Graph image are generated from that file on the next build.

Imported originals live under `content-import/letters/` only as export notes. The live collection is `src/content/letters/`.

## Local

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

## Deploy

The site is static Astro. `wrangler.jsonc` points Cloudflare Workers static assets at `dist/`. Do not deploy from this repository unless you mean to publish.

```bash
npm run build
npx wrangler deploy
```

Point `letters.kellyjohns.org` at the Worker after the first deploy.
