import { defineCollection, z } from 'astro:content';

const updates = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      summary: z.string().optional(),
      cover: image().optional(),
      draft: z.boolean().default(false),
    }),
});

const projects = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      status: z.enum(['active', 'shipped', 'paused', 'archived']).default('active'),
      date: z.date().optional(),
      cover: image().optional(),
      links: z
        .array(
          z.object({
            label: z.string(),
            url: z.string().url(),
          })
        )
        .default([]),
      draft: z.boolean().default(false),
    }),
});

const albums = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      description: z.string().optional(),
      cover: image().optional(),
      photos: z
        .array(
          z.object({
            src: image(),
            alt: z.string(),
            caption: z.string().optional(),
          })
        )
        .default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { updates, projects, albums };
