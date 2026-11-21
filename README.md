# Zulqarnain Yusuf Nadabo — Professional Portfolio

A personal portfolio presenting work across systems architecture, research, spatial intelligence, institutional design and digital technology.

Built with **Next.js 15** and Tailwind CSS. The visual direction is editorial and restrained: deep forest green, warm cream, charcoal and restrained gold.

## Run locally

```bash
npm ci
npm run dev
npm run build
```

## Structure

- `lib/content.js` — public-facing copy, project records, links and stages.
- `components/CaseStudies.jsx` — selected work with explicit project stages and evidence limits.
- `components/ImpactProfile.jsx` — working approach and areas of practice.
- `components/EvidenceField.jsx` — original spatial visual in the opening section.
- `components/MotionSystem.jsx` — restrained scroll reveals and progress indicator with reduced-motion support.
- `app/layout.jsx` — metadata, canonical URL and structured profile data.
- `app/robots.js` and `app/sitemap.js` — search discovery.
- `public/og.svg` — social preview image.
- `docs/CLAIMS-TO-VERIFY.md` — editorial checklist for claims that need documentary confirmation.

## Editorial safeguards

- Do not invent metrics, clients, partnerships, qualifications or outcomes.
- Distinguish personal work from organisational work.
- Distinguish pilots, research prototypes, implementations and operational products.
- Do not describe community submissions as representative public opinion.
- Do not describe publication as independent verification.
- Confirm permission before naming private commercial engagements.
- Keep the authoritative ISEYC Digital Operations Centre repository private.

## Review and deployment

Work is prepared on `feat/systems-architect-positioning`. A GitHub Actions workflow builds and uploads a short-lived review artifact only; it does not publish a website or deploy to Vercel. Production deployment requires separate explicit approval after review.
