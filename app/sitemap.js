export const dynamic = 'force-static';

const siteUrl = 'https://zulqarnain-nadabo.vercel.app';

export default function sitemap() {
  return [
    {
      url: siteUrl,
      lastModified: new Date('2026-11-21T00:00:00.000Z'),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
