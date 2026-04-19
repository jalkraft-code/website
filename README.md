# Jake's Personal Website

A simple, static personal site — life updates, personal projects, and photos —
built with [Astro](https://astro.build) and deployed to Cloudflare Pages.

## Local development

Prerequisites: [Node.js](https://nodejs.org/) 18 or newer.

```sh
npm install
npm run dev
```

Open http://localhost:4321 in your browser.

Other commands:

- `npm run build` — build the production site into `dist/`
- `npm run preview` — preview the production build locally

## How the site is organized

```
src/
├── content/
│   ├── updates/   # life updates (Markdown)
│   ├── projects/  # personal projects (Markdown)
│   └── albums/    # photo albums (Markdown with image list)
├── assets/photos/ # source images (optimized at build time)
├── components/    # shared layout / header / footer
├── pages/         # site routes
└── styles/        # global CSS
```

Frontmatter schemas live in `src/content/config.ts`. The build will fail
with a clear error if a post's frontmatter doesn't match — that's a feature.

## Adding a life update

Create `src/content/updates/my-update.md`:

```markdown
---
title: "A short, evocative title"
date: 2026-05-01
summary: "One sentence that will appear on index pages and in the RSS feed."
# Optional cover image (path is relative to this file):
# cover: ../../assets/photos/some-album/cover.jpg
---

Write the post body in Markdown. Drop images inline with
![alt text](../../assets/photos/some-album/photo.jpg) — they'll be
optimized automatically.
```

Set `draft: true` in frontmatter to hide a post until it's ready.

## Adding a project

Create `src/content/projects/my-project.md`:

```markdown
---
title: "My project"
summary: "One-line pitch."
status: active   # active | shipped | paused | archived
date: 2026-05-01
links:
  - label: "GitHub"
    url: "https://example.com/"
---

Longer description in Markdown.
```

## Adding a photo album

1. Put the source images in `src/assets/photos/<album-slug>/` (JPEGs or
   PNGs — Astro will resize and convert to WebP/AVIF at build time).
2. Create `src/content/albums/<album-slug>.md`:

```markdown
---
title: "Album title"
date: 2026-05-01
description: "Optional one-liner shown on the album page."
cover: ../../assets/photos/<album-slug>/cover.jpg
photos:
  - src: ../../assets/photos/<album-slug>/photo-1.jpg
    alt: "Short description for screen readers"
    caption: "Optional caption shown under the photo."
  - src: ../../assets/photos/<album-slug>/photo-2.jpg
    alt: "..."
---
```

## Deploying to Cloudflare Pages

1. Push this repo to a non-enterprise Git host (personal GitHub account,
   GitLab, or Bitbucket).
2. In the Cloudflare dashboard: **Workers & Pages** → **Create** →
   **Pages** → **Connect to Git**, and select the repo.
3. Configure the build:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Click **Save and deploy**. Every push to the main branch will auto-deploy.
5. Add a custom domain in the Pages project's **Custom domains** tab.
   Cloudflare handles TLS automatically.

After connecting a custom domain, update `site` in `astro.config.mjs` and
the sitemap URL in `public/robots.txt`.

## Subscribing without social media

The updates feed is available at `/updates/rss.xml` — drop that URL into
any feed reader (NetNewsWire, Feedbin, Reeder, Inoreader, etc.) to get
new posts without checking the site manually.
