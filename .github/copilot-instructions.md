# Copilot instructions — Jake's personal website

## About this project

This is Jake's personal website — a minimal, ad-free place to share life
updates, personal projects, and photos with friends and family. Built with
**Astro 5** (TypeScript strict), deployed to **Cloudflare Pages** on every
push to `main`.

- **Live URL:** https://website.jacob-l-kraft.workers.dev
- **GitHub:** https://github.com/jalkraft-code/website
- **Stack:** Astro + Content Collections + `@astrojs/sitemap` + `sharp` image optimization
- **Dev server:** `npm run dev` (port 4321)
- **Build:** `npm run build` → outputs to `dist/`

## Jake's context

- Novice with Git and the command line — explain commands briefly, prefer
  short, concrete answers. He commits from VS Code's Source Control sidebar
  (stage → commit message → Sync).
- Writes content in Markdown. Does NOT want a headless CMS.
- Values simplicity: one place to put a photo, one place to write a post.

## Project structure

```
src/
  assets/photos/<slug>/*.jpeg      ← photo files (the single source of truth)
  content/
    updates/<slug>.md              ← life update posts
    projects/<slug>.md             ← project pages
    config.ts                      ← zod schemas for all collections
  lib/
    album-photos.ts                ← auto-discovers photos in src/assets/photos/<slug>/
    snippet.ts                     ← extracts first paragraph from post body
  pages/
    index.astro                    ← homepage (thumbnail grids for latest updates)
    about.astro
    updates/index.astro            ← list of all updates (thumbnail grids)
    updates/[slug].astro           ← single post page (full-size photos, scrollable)
    updates/rss.xml.js             ← RSS feed (NO frontmatter — it's .js)
    projects/{index,[slug]}.astro
    photos/{index,[album]}.astro   ← photo galleries
  styles/global.css
  components/{Layout,Header,Footer}.astro
astro.config.mjs                   ← includes a rehype plugin that wraps consecutive
                                     inline post images into `.post-gallery` with
                                     click-to-open-original anchor tags
```

## How content works (the mental model Jake uses)

**Every photo lives in `src/assets/photos/<post-slug>/`.** That folder is the
single source of truth. Photos in it automatically appear:

1. On `/photos` and the matching `/photos/<slug>` album page
2. As thumbnails on the homepage and `/updates` listing under that post
3. Full-size inline on the single post page, if referenced with `![](...)`

The post slug = the markdown filename (e.g. `home-and-husband.md` →
slug `home-and-husband` → photos folder `src/assets/photos/home-and-husband/`).

**Naming convention Jake uses:** he sometimes prefixes slugs with a year-month,
e.g. `2026-04-winter-photography`. Both the post filename and photo folder must
use the SAME slug for auto-matching to work. Note that the slug becomes both
the URL and the auto-generated album title (dashes → spaces, title-cased), so
keep slugs reasonably readable.

### Post frontmatter (updates)

```markdown
---
title: "Post title"
date: 2026-04-19T15:00:00   # use full timestamp when multiple posts share a day
cover: ../../assets/photos/<slug>/<file>   # OPTIONAL — only if you want a hero
summary: "Optional blurb"   # OPTIONAL — auto-derived from body if absent
---

Body text goes here. First paragraph auto-becomes the listing snippet.

![alt](../../assets/photos/<slug>/one.jpeg)
![alt](../../assets/photos/<slug>/two.jpeg)
```

- `cover:` is optional. If omitted, listings show a thumbnail grid of ALL
  photos in `src/assets/photos/<slug>/`.
- `summary:` is optional. `snippetFromBody()` extracts the first prose
  paragraph (skipping headings and image-only lines).
- Inline `![]()` images on the post page render full-size, stacked vertically,
  wrapped in anchors that open the original file in a new tab.

### Photo paths — common gotchas

- Paths in `.md` are **relative to the `.md` file's folder**, always
  `../../assets/photos/<slug>/<file>`.
- **Case-sensitive** on Cloudflare (Linux). `Apollo.jpeg` ≠ `apollo.jpeg`.
- **Extension-sensitive.** `.jpg` ≠ `.jpeg`.
- Recommend simple, lowercase filenames with no spaces.

## Common operations

- **Add a post:** create `src/content/updates/<slug>.md`, create folder
  `src/assets/photos/<slug>/`, drop photos in it.
- **Add photos to an existing post:** just drop files in the existing folder.
  Listings/albums pick them up. Add `![](...)` lines to the post body if you
  want them inline/full-size in the post itself.
- **Delete an album:** remove both the `.md` file (if one exists) AND the
  photo folder. Run `rm -rf .astro dist` to clear stale image caches if you
  hit `LocalImageUsedWrongly`.
- **Rebuild after weird errors:** `rm -rf .astro dist && npm run build`.

## Schema notes (src/content/config.ts)

- `updates.cover` is `image().optional()`.
- There is no `albums` collection. Photo albums on `/photos` are derived
  automatically from folders in `src/assets/photos/<slug>/`; the display
  title comes from the folder slug (title-cased).
- Images must use the zod `image()` helper for Astro's `<Image>` optimization.

## Git workflow

Jake commits via VS Code's Source Control sidebar. When making changes on his
behalf from this agent, always finish with:

```
git add -A
git commit -m "<clear short message>"
git push
```

Include the Copilot co-author trailer in commits.

## Deployment

- Cloudflare Pages is connected to the GitHub repo. Every push to `main`
  triggers a build using `npm run build`, output dir `dist`. No manual step.
- Production URL: `https://website.jacob-l-kraft.workers.dev`. Domain is on
  `.workers.dev` (not `.pages.dev`).

## Open items / backlog

- **About page:** still has placeholder email `hello@example.com`. Jake has not
  decided on a spam strategy (iCloud Hide My Email alias recommended).
- **Photo resizing:** iPhone photos are 3-5 MB each. For photo-heavy posts,
  recommend resizing via Photos → Export → JPEG Medium (~1600-2000px wide)
  before committing to keep repo + build times reasonable.
- **CMS layer:** no plans to add one. Jake is comfortable with the git-based
  workflow.

## Tone when working with Jake

- Short answers. Avoid essay-length explanations unless asked.
- Show the fix, explain briefly, move on.
- When he asks "how do I…" give numbered steps.
- Don't surprise-refactor unrelated code.
