const siteUrl = 'https://zulqarnain-nadabo.vercel.app';

export default function sitemap() {
  return [{
    url: siteUrl,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
  }];
}
