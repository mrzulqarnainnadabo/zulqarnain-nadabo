import { work } from "@/lib/portfolio-work";

export const dynamic = "force-static";

const siteUrl = "https://zulqarnain-nadabo.vercel.app";

export default function sitemap() {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    ...work.map(item => ({
      url: `${siteUrl}/work/${item.slug}`,
      changeFrequency: "monthly",
      priority: 0.75
    }))
  ];
}
