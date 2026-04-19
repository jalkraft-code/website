// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

function rehypeImageGallery() {
  return (tree) => {
    const newChildren = [];
    let currentGallery = null;
    const isImgParagraph = (node) =>
      node &&
      node.type === 'element' &&
      node.tagName === 'p' &&
      Array.isArray(node.children) &&
      node.children.length === 1 &&
      node.children[0].type === 'element' &&
      node.children[0].tagName === 'img';

    for (const child of tree.children) {
      if (isImgParagraph(child)) {
        const img = child.children[0];
        const src = img.properties && img.properties.src;
        const anchor = {
          type: 'element',
          tagName: 'a',
          properties: {
            href: src,
            target: '_blank',
            rel: 'noopener noreferrer',
            className: ['post-photo-link'],
          },
          children: [img],
        };
        if (!currentGallery) {
          currentGallery = {
            type: 'element',
            tagName: 'div',
            properties: { className: ['post-gallery'] },
            children: [],
          };
          newChildren.push(currentGallery);
        }
        currentGallery.children.push(anchor);
      } else {
        currentGallery = null;
        newChildren.push(child);
      }
    }
    tree.children = newChildren;
  };
}

export default defineConfig({
  site: 'https://website.jacob-l-kraft.workers.dev',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
    rehypePlugins: [rehypeImageGallery],
  },
});
