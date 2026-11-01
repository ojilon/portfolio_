# Ojilong Yusuf — Portfolio

A small, fast static portfolio for Ojilong Yusuf, a biology and chemistry teacher trainee at Kyambogo University who also builds practical software tools.

> A teacher in the making who builds the tools education needs.

## Stack

- Astro 5 static site, TypeScript strict mode, and plain CSS custom properties.
- No Tailwind, UI kit, CSS-in-JS, or client framework.
- Self-hosted Noto Sans Variable and JetBrains Mono; no Google Fonts requests.
- Content is maintained in `src/data/` and `src/content/` as TypeScript and Markdown.

The only extra development dependency is `@astrojs/check`, which powers the `pnpm check` validation script. Astro’s built-in content collections handle Markdown; `@astrojs/sitemap` generates the sitemap.

## Requirements and commands

Use Node 20.3+ and pnpm.

- `pnpm install` — install dependencies
- `pnpm dev` — start the local development server
- `pnpm check` — validate Astro and TypeScript files
- `pnpm build` — generate the static site in `dist/`
- `pnpm preview` — serve the generated site locally

## Folder map

```
AGENT_PROMPT.md       build brief and visual reference
README.md             this guide
design/               reference screenshots
astro.config.mjs      site URL, sitemap and static output
package.json
pnpm-workspace.yaml  allowlisted esbuild/sharp scripts for fresh pnpm installs
tsconfig.json
public/
  favicon.svg         sprout mark
  og-default.png      default social-sharing image
  robots.txt
  assets/profile.jpg  optional owner photo (add it yourself)
src/
  data/site.ts        name, social links, email and university line
  data/projects.ts    typed project records and detail-page content
  data/timeline.ts    editable About page timeline
  content.config.ts   validated Markdown collection schemas
  content/notes/      Biology and Chemistry revision notes
  content/journal/    teaching-practice journal entries
  components/         shared, static Astro components
  layouts/BaseLayout.astro   document metadata, theme bootstrap, header and footer
  pages/              Home, About, Teaching, Projects, Contact and 404 routes
  scripts/            small theme toggle and notes filter
  styles/             light/dark tokens and global CSS
```

## Add a project

1. Add an object to `src/data/projects.ts` using the `Project` type.
2. Set its `slug`, summary, tags, status, preview kind, repository URL, reason copy and ISO `updated` date. Use `featured: true` to show it on Home. Add screenshot/gallery paths or release/documentation URLs only when they exist.
3. Run `pnpm build`; Astro generates `/projects/<slug>/` and its detail page.

## Add a revision note

Create `src/content/notes/<slug>.md`:

```md
---
title: My note title
subject: Biology
topic: Cell biology
summary: A short, accurate description.
updated: 2026-11-01
draft: true
---

Write the note here.
```

The note appears on `/teaching#notes` and gets a detail page. Draft notes remain visible but show a “coming soon” message on the detail page, use `noindex`, and are left out of the sitemap. Set `draft: false` when the note is ready to publish.

## Add a journal entry

Create `src/content/journal/<slug>.md` with `title`, `date`, `excerpt`, and `draft` frontmatter, followed by the entry text. It appears on `/teaching#journal`. Draft entries carry a sample label and are not indexed.

## Deploy

Run `pnpm build` and publish `dist/` to any static host. Set the `SITE_URL` environment variable for canonical URLs, Open Graph links, and the sitemap; the development fallback is `https://example.com`.

## Placeholders

The owner’s profile photo is not included. Add `public/assets/profile.jpg`; until then the Home hero renders a simple “OY” silhouette placeholder rather than a broken image. Replace the email placeholder in `src/data/site.ts` before launch. Project status comments marked `TODO: verify` should also be checked by the owner.
