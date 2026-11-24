import { caseStudies } from '@/lib/case-studies';

export const dynamic = 'force-static';

const siteUrl = 'https://zulqarnain-nadabo.vercel.app';

export default function sitemap() {
  return [
    {
      url: siteUrl,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...caseStudies.map((study) => ({
      url: `${siteUrl}/work/${study.slug}`,
      changeFrequency: 'monthly',
      priority: 0.75,
    })),
  ];
}
