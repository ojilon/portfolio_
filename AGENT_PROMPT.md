# Build brief: Ojilong Yusuf's portfolio website

You are implementing a small, fast, static personal website. Read this whole file first.
The reference screenshots are in `design/`. If you can see images, match them closely. If you cannot, everything you need is written below.

If you cannot run commands, output every file with its full path in its own code block, in the build order given at the end.

## 1. Who and what

- **Owner:** Ojilong Yusuf, a Ugandan biology and chemistry teacher trainee (Kyambogo University, Soroti Learning Centre, Year 2) who also builds software tools.
- **Idea:** "A teacher in the making who builds the tools education needs."
- **Audience, all equally:** employers/clients, edtech collaborators, and fellow students/teachers in Uganda.
- **Visitors are mostly on phones with slow, costly data.** Keep pages light, ship almost no JavaScript, and make it mobile-first.
- **Goal:** the site must be easy to find in search (clean HTML, good metadata) and easy for the owner to maintain by editing plain text files.

## 2. Environment and rules

- Developer machine: Windows, low-spec Celeron PC. Package manager: **pnpm**. Node 20+.
- Keep the project **small and readable**. Prefer many short files (target under 150 lines each) over big ones.
- **No Tailwind, no UI kit, no CSS-in-JS.** Plain CSS with custom properties.
- TypeScript in strict mode. No `any` unless commented.
- Allowed dependencies (nothing else without a written reason in the README):
  `astro`, `@astrojs/sitemap`, `typescript`, `@fontsource-variable/noto-sans`, `@fontsource/jetbrains-mono`.
- The only client-side JavaScript: theme toggle and the notes filter. Both must be tiny and in their own files. Everything else is static HTML.
- No backend now. Output is static (`pnpm build` produces `dist/`), so it can be hosted anywhere. Keep all content in `src/data/` and `src/content/` so a small Go service could read or write it later. Do not build that service.
- Do not invent facts about the owner. Anything not stated in this file is a clearly marked placeholder: `TODO: replace`.

## 3. Stack decision

**Astro + TypeScript + plain CSS.** Reason: it outputs real pre-rendered HTML per page (good for search engines and slow phones), supports Markdown content natively, and uses little tooling.

## 4. Project structure

```
/
  AGENT_PROMPT.md
  README.md              (commands, structure, how to add a project / note / journal entry)
  design/                (reference screenshots, not served)
  astro.config.mjs       (site from env SITE_URL, fallback https://example.com; sitemap integration)
  package.json           (scripts: dev, build, preview, check)
  tsconfig.json
  .gitignore             (node_modules, dist, .astro, .env*, *.log, .DS_Store)
  public/
    assets/profile.jpg   (owner adds this; do NOT create a fake one)
    favicon.svg          (simple green rounded square with a sprout)
    og-default.png       (placeholder 1200x630 solid colour with name; generate once)
    robots.txt           (allow all, link to /sitemap-index.xml)
  src/
    styles/tokens.css    (colours, spacing, radii, fonts, light + dark)
    styles/global.css    (reset, base typography, layout helpers)
    data/site.ts         (name, tagline, social links, email, university line)
    data/projects.ts     (typed array of projects)
    content/config.ts    (collections: notes, journal)
    content/notes/*.md
    content/journal/*.md
    layouts/BaseLayout.astro   (head, SEO tags, header, footer, theme script)
    components/            (Header, Footer, ThemeToggle, Hero, SectionHeading, ProjectCard,
                            ProjectPreview, StatusBadge, TagChip, NoteCard, JournalCard,
                            LinkList, Gallery, Avatar)
    scripts/theme.ts, scripts/notes-filter.ts
    pages/index.astro, about.astro, teaching/index.astro, teaching/notes/[slug].astro,
          teaching/journal/[slug].astro, projects/index.astro, projects/[slug].astro,
          contact.astro, 404.astro
```

## 5. Design tokens (approximate, sampled from the screenshots)

Light theme:

| Token | Value | Use |
|---|---|---|
| `--bg` | `#F6F7F2` | page background |
| `--surface` | `#FDFCF8` | cards |
| `--ink` | `#1B342C` | headings |
| `--text` | `#4A5B54` | body |
| `--muted` | `#7A8882` | small/secondary text |
| `--primary` | `#14524A` | main button, links, active nav text |
| `--sage` | `#E6ECE7` | panels, hero frame |
| `--sage-strong` | `#DCE8E3` | active pill, icon tiles |
| `--sand` | `#EDE9DE` | alternate preview background |
| `--accent` | `#D9784F` | the dot in the eyebrow and after headings, journal dates |
| `--peach` | `#F6E6DC` | chemistry chip, accent tiles |
| `--border` | `#E3E6DE` | 1px borders and dividers |
| `--code-bg` | `#1B342C` | terminal preview |
| `--code-text` | `#CFE3D8` | terminal text |

Status badges: Released = bg `#E0EFE7` text `#1F6B4F`; In progress = bg `#F8E6D9` text `#A5501F`; Idea = bg `#E8E9F5` text `#5A5FA8`. Each has a small dot before the label.

Dark theme (same token names): `--bg #0F1A17`, `--surface #16241F`, `--ink #E8F0EC`, `--text #B5C4BD`, `--muted #86978F`, `--primary #5CC2AC` (button text then `#0F1A17`), `--sage #172A24`, `--sage-strong #1F3A32`, `--sand #1A2622`, `--accent #E58A62`, `--peach #33241D`, `--border #27382F`. Keep contrast at WCAG AA.

Type:
- Body and headings: **Noto Sans Variable** (self-hosted through fontsource, no Google CDN).
- Tiny labels/eyebrows/tags: **JetBrains Mono**, 11px, uppercase, letter-spacing 0.14em.
- Hero H1: about 72px desktop / 44px mobile, weight 700, line-height 1.0, tight letter-spacing (-0.03em). Section H2: about 40px desktop / 30px mobile, weight 700.
- Body 16 to 18px, line-height 1.6.

Shape: page container max-width 1200px with 40px side padding (20px mobile). Cards: radius 20px, 1px border, soft shadow (`0 1px 2px` plus a faint large blur). Big panels: radius 28px. Buttons, chips, nav items: fully rounded (pill). Section spacing about 96px desktop / 64px mobile, separated by a 1px `--border` line where the screenshots show one.

**Eyebrow pattern** (used everywhere): a small `--accent` dot, then uppercase mono text in `--primary`.
**Headline dot:** the owner's name and project names end with an orange full stop in `--accent`.

## 6. Shared elements

**Header** (sticky not required): left, a 40px rounded green square with a sprout icon (inline SVG), next to "Ojilong Yusuf" (bold) and under it tiny mono caps "TEACHER IN THE MAKING". Centre nav: About, Teaching, Projects, Contact. The current page gets a `--sage-strong` pill with `--primary` text. Right: "Dark mode" pill button with a small half-filled circle icon (label becomes "Light mode" in dark theme).
Mobile: first row is logo + a compact icon-only toggle. Second row is the four nav links in a single line, no hamburger menu.

**Footer:** top border. Left: "**Ojilong Yusuf** · Biology & Chemistry teacher trainee" and under it "Made with care in Uganda · © 2026" (year computed at build). Right: links GitHub, "X · @OJI_OJI_00", Email, separated by thin vertical rules. Links: `https://github.com/ojilon`, `https://twitter.com/OJI_OJI_00`, email from `site.ts` (`TODO: replace` placeholder).

**Theme:** follow `prefers-color-scheme` by default, user choice saved in `localStorage` (wrap in try/catch). Apply the theme with a tiny inline script in `<head>` before paint to avoid a flash.

**"Updated on" label:** small text with an accent dot, "Updated on 01 Nov 2026", on the Projects, Project detail and Teaching pages. Read from a `updated` field, never hard-code.

## 7. Pages

### Home (`/`), see `design/01-home-desktop.png` and `02-home-mobile.png`

1. **Hero**, two columns on desktop (text left, visual right), stacked on mobile (text first).
   - Eyebrow: `LEARNING SCIENCE · BUILDING USEFUL THINGS`
   - H1: `Ojilong Yusuf` (two lines on desktop: "Ojilong" / "Yusuf") + orange dot.
   - Bold green line: `Biology & Chemistry teacher trainee · Builder of practical tools`
   - Paragraph: `I’m working toward a classroom where curiosity has room to grow—and building small, thoughtful tools that make learning a little easier.`
   - Buttons: filled `Explore teaching ↗` (links to `/teaching`), outline `See my projects ↗` (links to `/projects`).
   - Small line with a sage round icon (asterisk): `**Kyambogo University** · Soroti Learning Centre · Year 2`.
   - Visual: a sage rounded panel (radius 28) with a thin inner frame line and soft decorative arc shapes. In it, a large circular photo (about 220px) with a thick white ring. The image is `/assets/profile.jpg`. If the file is missing, show the placeholder: a pale green circle with a person silhouette and the initials "OY". A peach rounded square with an asterisk sits at the top-right. A white floating card sits at the bottom-right: bold `Learning science, building tools`, small grey `Kyambogo University · Soroti`. **Keep the floating card fully inside the panel** (the concept screenshot clips it).
   - Do not show the "assets/profile.jpg" label pill from the screenshot; it only marks the placeholder in the concept.
2. **Featured projects:** eyebrow `A FEW THINGS TAKING SHAPE`, H2 `Built to be useful.`, sub `Practical tools, shaped by the small frictions people meet every day.`, right-aligned link `All projects →`. Three `ProjectCard`s: Wayer, zlanpiko, releaseforge (flag `featured: true` in data).
3. **Notes teaser:** a sage panel (radius 28), two columns. Left: eyebrow `MADE FOR LEARNING`, H2 `Notes to make a concept click.`, text `Short biology and chemistry explainers, one idea at a time.`, link `Browse revision notes →`. Right: a 2×2 grid of small white cards, each with a square letter chip (`B` on sage for biology, `C` on peach for chemistry), the note title and `Subject · Topic` in small grey. Use the first four notes.

### Projects (`/projects`), see `03-projects.png`

- Eyebrow `A GROWING TOOLKIT`. H1 `Software with a practical purpose.` Sub `Small tools, experiments and ideas—built around the parts of work and learning that could be simpler.` "Updated on" label right-aligned under the sub.
- 3-column grid of `ProjectCard`s (2 columns tablet, 1 on mobile), all six projects.
- Do **not** include the "Portfolio draft" note box from the screenshot.

**ProjectCard:** preview area on top (about 16:9, tinted `--sage`, `--sand` or a pale lavender, with a faint decorative arc in the corner), then name (bold, 20px) with a `StatusBadge` on the right, a short description, and `TagChip`s (small bordered pills). The whole card links to `/projects/<slug>`.
**Preview area:** if the project has a `screenshot` path, show that image (`<img>` with width/height, `loading="lazy"`, `alt` text). If not, show `ProjectPreview`, an inline-SVG/CSS illustration chosen by `previewKind`: `phone-pc` (phone outline ↔ window), `browser` (window with sidebar and three blocks), `terminal` (dark panel with 4 mono lines: `$ releaseforge check`, `✓ tests passed`, `✓ version tagged`, `› ready to publish_`), `code` (editor lines with a `{}` tile), `shortcut` (editor lines with a `⌘` tile). The tiny mono caption "CONCEPT PREVIEW · SCREENSHOT PLACEHOLDER" shows only on placeholders.

### Project detail (`/projects/[slug]`), see `04-project-detail.png`

- Two columns at the top. Left: eyebrow `PROJECT DETAIL · <STATUS>`, H1 project name + orange dot, description, tag chips, buttons `Explore release links ↓` (scrolls to the links card) and `Back to projects ↗`, "Updated on" label. Right: large preview panel (screenshot or placeholder).
- Section: eyebrow `A CLOSER LOOK`, H2 `Screens & details.`, a 3-tile gallery (captions Overview / Workflow / Detail view). Render only the images that exist; fall back to placeholders if there are none.
- Section: eyebrow `THE REASON BEHIND IT`. Two-line heading, first line in `--ink`, second in `--primary`. Body paragraphs below (from data). Right column: a `Project links` card listing Release page, Documentation, Source code (GitHub). Each row: label on the left, link `Open ↗` on the right, or muted `add URL` when empty.
- Generate one page per project with `getStaticPaths`.

### Teaching (`/teaching`), see `05-teaching.png`

- Eyebrow `TEACHING & LEARNING`. H1 `Science is better when it makes sense.` Sub `Revision resources, reflections from the teaching journey and a growing vision for technology that serves learning.` "Updated on" label.
- A pill-shaped in-page tab bar with anchor links: `Revision notes`, `Practice journal`, `Tech & education`.
- **Revision notes** (`#notes`): eyebrow `EXPLORE A CONCEPT`, H2 `Revision notes`, sub `Quick starting points for biology and chemistry topics. Choose a subject, then narrow by topic.` Subject pills (`All subjects`, `Biology`, `Chemistry`, active one filled `--primary`) and a "Filter by topic" `<select>` on the right. 3-column `NoteCard`s: small mono subject label, topic chip on the right, bold title, one-line summary. The filter must work with plain `<a>`/`<button>` and a tiny script, and all notes must be visible when JavaScript is off. Each card links to `/teaching/notes/<slug>`.
- **Practice journal** (`#journal`): eyebrow `REFLECTING ON THE CRAFT`, H2 `Teaching practice journal`, sub `Small observations, questions and lesson ideas from the road to the classroom.` 3 `JournalCard`s: orange mono date, bold title, excerpt. Draft entries show a small line `Sample entry · replace with your journal`.
- **Tech & education** (`#vision`): eyebrow `A POINT OF VIEW IN PROGRESS`, H2 `Technology should meet learning where it is.` A sage panel with a white rounded icon tile (asterisk) on the left and three paragraphs on the right:
  1. `I’m interested in tools that start with the realities of a learner’s day: a phone shared with family, a connection that comes and goes, a teacher balancing many needs, a difficult idea that needs a clearer explanation.`
  2. `Technology in education should feel practical before it feels impressive. It should help a teacher make a concept visible, help a student keep track of progress, or give a class another way into a question. The best tool is not the most complicated one—it is the one that fits the people using it.`
  3. `As I learn to teach biology and chemistry, I want to keep building with that in mind: listen first, make something small, learn from the people using it, and improve it together.`

### About (`/about`), not in the screenshots; reuse the same style

- Eyebrow `ABOUT`. H1 `From curious learner to teacher who builds.`
- Short intro paragraph (placeholder text marked `TODO: replace`): studying biology and education at Kyambogo University (Soroti Learning Centre), teacher-trainee in Year 2, learning to code on his own and wanting to bridge technology and education in Uganda.
- **Journey timeline:** a vertical line with dots and cards. Seed items, each editable in `src/data/timeline.ts`:
  - `2021`, Joined GitHub and started building small tools.
  - `Along the way`, Went deeper into Go, C/C++, then Zig and Odin through small daily practice projects.
  - `2026`, Year 2 at Kyambogo University; building study tools (zlanpiko, a biostatistics study site) and tools for moving files between phone and PC (Wayer).
- A short "What I care about" row of three cards: `Local-first tools`, `Learning by building small`, `Technology that fits the learner`.
- Button to `/contact` and `/projects`.

### Contact (`/contact`)

- Eyebrow `CONTACT`. H1 `Let’s talk.` One sentence inviting collaboration on education technology, teaching resources or software projects. Three large link rows: Email (from `site.ts`), GitHub, X. **No form** (no backend yet).

### 404

Short friendly message with links back to Home and Projects.

## 8. Content and data

`src/data/projects.ts` exports a typed array. Fields: `slug`, `name`, `summary` (one line), `tags[]`, `status` (`"released" | "in-progress" | "idea"`), `previewKind`, `screenshot?`, `gallery?[]`, `releaseUrl?`, `docsUrl?`, `repoUrl`, `reasonTitle[]` (two lines), `reasonBody[]` (paragraphs), `featured?`, `updated` (ISO date).

Seed projects (GitHub org/user is `ojilon`; set `repoUrl` as `https://github.com/ojilon/<Repo>`):

| slug | Name | Summary | Tags | Status | previewKind | Repo |
|---|---|---|---|---|---|---|
| wayer | Wayer | Move files between a phone and a PC without the cable dance. | Android, Local network, File transfer | released (TODO verify) | phone-pc | Wayer |
| zlanpiko | zlanpiko | An offline academic manager for the everyday work of studying. | Offline-first, Academic tools, Student workflow | in-progress | browser | zlanpiko |
| conductino | Conductino | A browser concept tuned for focused, study-oriented browsing. | Browser, Study workflow, Focus | in-progress | browser | Conductino |
| android-scaffold-studio | Android-Scaffold-Studio | Generate a clean Android project scaffold and get to the useful part sooner. | Android, Code generation, Developer tools | in-progress | code | Android-Scaffold-Studio |
| releaseforge | releaseforge | A terminal workspace for building and shipping releases with confidence. | Terminal, Build tooling, Release workflow | released (TODO verify) | terminal | releaseforge |
| perspecta-see | perspecta_see | Visualize how browser code fits together while you explore a page. | Browser, Code visualization, Learning tools | in-progress | shortcut | perspecta_see |

Note: the concept screenshots label Conductino and perspecta_see as "Idea". They both already exist as repositories, so use "in-progress". The owner can change any status in this one file.

For Wayer's detail page use this "reason" copy (write similar short, honest copy for the others; keep it modest and never claim features that are not stated):
- reasonTitle: `A little less friction.` / `A little more room to focus.`
- reasonBody: `Moving a document should not interrupt the work. Wayer is shaped around a small promise: make the phone-to-PC handoff feel obvious, fast and calm, even when the connection is local.` / `Move files between a phone and a PC without the cable dance. That is the practical question this project is here to explore.`
- The screenshot copy calls Wayer an "idea". Write it as a working tool.

`src/content/notes/*.md` frontmatter: `title`, `subject` (`Biology | Chemistry`), `topic`, `summary`, `updated`, `draft` (boolean). Six seed notes, all `draft: true` with a body of "This note is coming soon.":

| Title | Subject | Topic | Summary |
|---|---|---|---|
| Cell structure & function | Biology | Cell biology | A concise tour of organelles, their roles and how structure supports life. |
| Inheritance & variation | Biology | Genetics | Key terms and a guided path through how traits are passed on. |
| Transport in plants | Biology | Plant biology | Trace water and sugars through xylem and phloem with a simple model. |
| Acids, bases & indicators | Chemistry | Acids & bases | Compare everyday examples, indicator colour changes and pH. |
| The mole concept | Chemistry | Moles & equations | Connect particles, amount of substance and balanced equations. |
| The periodic table | Chemistry | Atomic structure | Read groups and periods as patterns in atomic structure. |

`src/content/journal/*.md` frontmatter: `title`, `date`, `excerpt`, `draft`. Three seed entries (all `draft: true`, dates are placeholders):
- 2026-10-24, `Making an abstract idea visible`, `Thinking through how a simple drawing or classroom model can help learners explain what they understand, not only memorize a definition.`
- 2026-10-12, `A practical starts before the lab`, `A good lesson gives learners a question to carry into the activity. I am reflecting on how instructions, materials and safety can support that curiosity.`
- 2026-09-30, `Small checks, better feedback`, `A short question at the right moment can show where a learner is stuck and make the next teaching step more useful.`

Draft notes and journal entries: show them (with the "coming soon / sample entry" label) but give their detail pages `<meta name="robots" content="noindex">` and leave them out of the sitemap, so unfinished pages never appear in search. When `draft` is set to `false`, they index normally.

## 9. SEO and metadata (build this in now)

In `BaseLayout.astro`, from props with sensible defaults:
- `<title>`: `Page title | Ojilong Yusuf` (home: `Ojilong Yusuf | Biology & Chemistry Teacher Trainee and Software Builder, Uganda`).
- `<meta name="description">` (unique per page, 120 to 160 characters), canonical URL, `lang="en"`, `viewport`.
- Open Graph + Twitter card tags (`og:title`, `og:description`, `og:type`, `og:url`, `og:image` default `/og-default.png`).
- JSON-LD on the home page: `Person` with `name`, `url`, `jobTitle` ("Biology and Chemistry teacher trainee"), `alumniOf`/`affiliation` Kyambogo University, `address.addressCountry` "UG", `sameAs` (GitHub, X). JSON-LD on each project page: `SoftwareSourceCode` or `SoftwareApplication` with name, description, author, `codeRepository`.
- Sitemap through `@astrojs/sitemap`, `robots.txt`, one `<h1>` per page, a sensible heading order, descriptive `alt` text, descriptive link text.
- Use the words people would actually search for in the real copy ("biology and chemistry teacher trainee", "Kyambogo University", "Uganda", "Android file transfer", "education technology") where it reads naturally. No keyword stuffing.

## 10. Performance and accessibility

- Self-host fonts, `font-display: swap`, preload only the main text font.
- Images: explicit `width`/`height`, `loading="lazy"` except the hero photo. Prefer `.webp`; use Astro's `<Image>` only if it stays simple.
- Total JS per page under 5 KB. No client framework.
- Semantic landmarks (`header`, `nav`, `main`, `footer`), visible focus rings, buttons are real buttons, links are real links, colour contrast at AA in both themes, respects `prefers-reduced-motion`.
- Layout must hold from 320px to 1440px wide. No horizontal scrolling.

## 11. Build order (do it in this order; each step must work before the next)

1. Scaffold Astro with pnpm, `tsconfig` strict, `.gitignore`, `astro.config.mjs`, fonts, `tokens.css`, `global.css`.
2. `BaseLayout`, `Header`, `Footer`, `ThemeToggle` + `scripts/theme.ts`. Verify light/dark with no flash.
3. Data files and content collections with the seed content above.
4. Small components: `SectionHeading`, `StatusBadge`, `TagChip`, `ProjectPreview`, `ProjectCard`, `NoteCard`, `JournalCard`, `Avatar`, `LinkList`, `Gallery`.
5. Pages: Home, Projects, Project detail, Teaching (+ notes filter), About, Contact, 404, note and journal detail pages.
6. SEO pieces: metadata, JSON-LD, sitemap, robots, OG image.
7. `README.md`: install/run/build commands, folder map, and three short how-tos (add a project, add a note, add a journal entry), plus one paragraph "Deploying: run `pnpm build`, publish the `dist/` folder; set `SITE_URL`".
8. Final self-check with the list below.

## 12. Definition of done

- [ ] `pnpm install && pnpm build` succeeds with no errors or warnings.
- [ ] Every page above exists and its layout matches the screenshots in structure, spacing and tone on desktop and mobile.
- [ ] Light and dark themes both look right; toggle persists.
- [ ] With JavaScript disabled, all pages and all notes are still visible and every link works.
- [ ] Missing `public/assets/profile.jpg` shows the placeholder avatar, not a broken image.
- [ ] No file over about 150 lines; no unused dependencies; no leftover `console.log`.
- [ ] Every placeholder fact is marked `TODO: replace`; nothing invented about the owner.
- [ ] Lighthouse mobile estimates: performance, accessibility, best practices and SEO all 95 or higher.
