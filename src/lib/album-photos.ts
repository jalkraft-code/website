import type { ImageMetadata } from 'astro';

// Eagerly load every image under src/assets/photos so we can group by album folder.
const allImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/photos/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true }
);

/**
 * Return every image file inside `src/assets/photos/<slug>/`,
 * sorted by filename (case-insensitive).
 */
export function imagesForAlbum(slug: string): ImageMetadata[] {
  const prefix = `/src/assets/photos/${slug}/`;
  return Object.entries(allImages)
    .filter(([path]) => path.startsWith(prefix))
    .sort(([a], [b]) => a.toLowerCase().localeCompare(b.toLowerCase()))
    .map(([, mod]) => mod.default);
}

/**
 * Turn a folder slug like "home-and-husband" into a display title "Home and husband".
 */
export function titleFromSlug(slug: string): string {
  const spaced = slug.replace(/[-_]+/g, ' ').trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

/**
 * List every album folder in src/assets/photos/, each with its slug, title, and image list.
 */
export function listAlbums(): { slug: string; title: string; photos: ImageMetadata[] }[] {
  const slugs = new Set<string>();
  for (const path of Object.keys(allImages)) {
    const match = path.match(/^\/src\/assets\/photos\/([^/]+)\//);
    if (match) slugs.add(match[1]);
  }
  return Array.from(slugs)
    .sort()
    .map((slug) => ({
      slug,
      title: titleFromSlug(slug),
      photos: imagesForAlbum(slug),
    }));
}
