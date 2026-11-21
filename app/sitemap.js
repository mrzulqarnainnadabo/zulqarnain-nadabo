export const dynamic = 'force-static';

const siteUrl = 'https://zulqarnain-nadabo.vercel.app';

export default function sitemap() {
  return [
    {
      url: siteUrl,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
