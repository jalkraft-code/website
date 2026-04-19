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
