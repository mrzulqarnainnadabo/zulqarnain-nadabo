# Zulqarnain Yusuf Nadabo — Professional Portfolio

Personal portfolio for **Zulqarnain Yusuf Nadabo**, positioned around institutional architecture, digital systems strategy and evidence-led development.

The site uses Next.js 14 App Router and Tailwind CSS. The visual direction is editorial and restrained: deep forest green, warm cream, charcoal and restrained gold.

## Run locally

```bash
npm install
npm run dev
npm run build
```

## Content and structure

- `lib/content.js` — public-facing copy, project records, links and stages.
- `components/CaseStudies.jsx` — selected work with role, evidence and limitations.
- `components/ImpactProfile.jsx` — leadership, institutional departments and academic background.
- `components/Research.jsx` — working research and methodology links.
- `app/layout.jsx` — SEO, canonical URL and social metadata.
- `app/robots.js` and `app/sitemap.js` — search discovery.
- `public/og.svg` — social preview image.
- `docs/CLAIMS-TO-VERIFY.md` — claims requiring documentary confirmation.
- `docs/GITHUB-PROFILE-README-DRAFT.md` — draft for the dedicated GitHub profile README repository.

## Editorial rules

- Do not invent metrics, clients, partnerships, qualifications or outcomes.
- Distinguish personal work from organisational work.
- Distinguish pilots, research scaffolds, implementations and operational products.
- Do not describe community submissions as representative public opinion.
- Do not describe publication as independent verification.
- Keep the authoritative ISEYC Digital Operations Centre repository private.
- Confirm permission before naming private commercial engagements.
- Keep the official ISEYC department names exact.

## Deployment

The project is configured for Vercel. Changes are being prepared on a feature branch; production deployment requires a separate explicit approval after preview and build verification.
