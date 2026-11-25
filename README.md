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
- `components/CaseStudies.jsx` — seven selected systems, each linked to a dedicated evidence-led case study.
- `lib/case-studies.js` — canonical case-study narratives, architecture decisions, validation limits and verification links.
- `components/AtlasExplorer.jsx` and `components/WorldCanvas.jsx` — global-to-local mapping and the interactive Earth experience.
- `components/ISEYCArchitecture.jsx` and `components/ISEYCThreeModel.jsx` — department-led institutional architecture and interactive 3D model.
- `components/HubilArchitecture.jsx` — client-to-delivery operating model.
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

Work is prepared on `feat/unified-personal-operating-system` in draft PR #6. Netlify creates review-only previews; the GitHub Actions workflow builds an artifact and does not publish production. Production deployment and merge require separate explicit approval.
