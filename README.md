# Ojilong Yusuf — Portfolio

A small, fast, static personal website for Ojilong Yusuf, a biology and chemistry teacher trainee (Kyambogo University, Soroti Learning Centre) who also builds software tools.

"A teacher in the making who builds the tools education needs."

## Stack

- **Astro** (static, pre-rendered HTML), TypeScript strict, plain CSS with custom properties.
- No Tailwind, no UI kit, no CSS-in-JS, no client framework.
- Fonts self-hosted via `@fontsource-variable/noto-sans` and `@fontsource/jetbrains-mono` (no Google CDN).
- All content lives in `src/data/` and `src/content/` so it can be read by a small Go service later.

Allowed dependencies: `astro`, `@astrojs/sitemap`, `typescript`, `@fontsource-variable/noto-sans`, `@fontsource/jetbrains-mono`.
Also used: `@astrojs/markdown-satteri` (required to load Markdown content collections).

## Commands

- `pnpm install` — install dependencies
- `pnpm dev` — start dev server
- `pnpm build` — static build into `dist/`
- `pnpm preview` — preview the production build locally
- `pnpm check` — type check (requires a compatible TypeScript version)

## Folder map

```
AGENT_PROMPT.md        build brief (reference)
README.md              this file
astro.config.mjs       site URL (from SITE_URL env), sitemap + markdown integration
package.json
tsconfig.json
.gitignore
public/
  favicon.svg          sprout icon
  og-default.png       default Open Graph image
  robots.txt
  assets/profile.jpg   owner adds this; not created here (placeholder avatar shown if missing)
src/
  data/site.ts         name, social links, email, university line
  data/projects.ts     typed array of projects
  data/timeline.ts     about-page timeline items
  utils/date.ts        date formatting helper
  content.config.ts    content collections (notes, journal) via glob loader
  content/notes/*.md   revision notes (Biology | Chemistry)
  content/journal/*.md practice journal entries
  styles/tokens.css    design tokens (light + dark)
  styles/global.css    reset, base typography, layout helpers
  scripts/theme.ts     inline before-paint theme script
  scripts/theme-toggle.js  theme toggle persistence (localStorage)
  scripts/notes-filter.ts  subject/topic filter for teaching notes
  components/          shared UI components
  layouts/BaseLayout.astro   head, SEO, header, footer, theme
  pages/               all site pages
```

## How to add content

### Add a project
1. Open `src/data/projects.ts`.
2. Add an object to the `projects` array following the `Project` type (`slug`, `name`, `summary`, `tags`, `status`, `previewKind`, `repoUrl`, `reasonTitle`, `reasonBody`, `updated`, optional `screenshot`, `gallery`, `releaseUrl`, `docsUrl`, `featured`).
3. Set `repoUrl` to `https://github.com/ojilon/<Repo>`.
4. Run `pnpm build` — a detail page is generated at `/projects/<slug>`.
5. To feature it on the home page, add `featured: true`.

### Add a revision note
1. Create `src/content/notes/<slug>.md` with frontmatter:
   ```md
   ---
   title: My note title
   subject: Biology   # or Chemistry
   topic: Cell biology
   summary: One-line summary.
   updated: 2026-11-01
   draft: true
   ---
   Body text.
   ```
2. Run `pnpm build`. The note appears on `/teaching#notes` and gets a detail page at `/teaching/notes/<slug>`.
3. Draft notes show a "coming soon" label and are excluded from search (noindex + omitted from the sitemap). Set `draft: false` to index normally.

### Add a journal entry
1. Create `src/content/journal/<slug>.md` with frontmatter:
   ```md
   ---
   title: My entry title
   date: 2026-10-24
   excerpt: Short excerpt.
   draft: true
   ---
   Body text.
   ```
2. Run `pnpm build`. It appears on `/teaching#journal` with a detail page at `/teaching/journal/<slug>`.

## Deploying

Run `pnpm build`, then publish the `dist/` folder to any static host. Set the `SITE_URL` environment variable (used for canonical URLs and the sitemap; falls back to `https://example.com`).

## Notes

- The owner's profile photo is NOT included: add `public/assets/profile.jpg`. Until then, a placeholder avatar with the initials "OY" is shown.
- Placeholder facts (email, etc.) are marked `TODO: replace` in `src/data/site.ts`.
- Nothing is invented about the owner; all biographical details come from the build brief.
