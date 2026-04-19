import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const updates = (await getCollection('updates', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );
  return rss({
    title: 'Jake — Updates',
    description: 'Life updates from Jake.',
    site: context.site,
    items: updates.map((u) => ({
      title: u.data.title,
      pubDate: u.data.date,
      description: u.data.summary ?? '',
      link: `/updates/${u.slug}/`,
    })),
    customData: '<language>en-us</language>',
  });
}
