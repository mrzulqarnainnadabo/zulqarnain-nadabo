/**
 * Public-facing copy and project records.
 * Keep claims factual, dated where necessary, and explicit about project stage.
 */

export const person = {
  name: 'Zulqarnain Yusuf Nadabo',
  location: 'Nigeria',
  role: 'Institutional Architect & Digital Systems Strategist',
  sentence:
    'I work at the intersection of institutional design, digital systems and evidence-led development.',
  framing:
    'I translate institutional and community problems into structures, workflows and digital systems that can be examined, improved and used.',
  quote: 'Build the institution around the work — not the appearance of the institution.',
  quoteNote: 'A working principle, not a claim of institutional impact.',
  now: 'Current focus: strengthening ISEYC’s civic-intelligence infrastructure and developing practical enterprise systems through Hubil Group.',
  closing:
    'The standard is simple: make the work understandable, make the evidence traceable, and make responsibility clear.',
};

export const roles = [
  {
    id: 'civic',
    title: 'National President, ISEYC',
    sub: 'Initiative for Sustainable Evolution for Youth and Community',
    href: '#leadership',
  },
  {
    id: 'enterprise',
    title: 'Managing Director, Hubil Group',
    sub: 'Enterprise systems and institutional development',
    href: '#enterprise',
  },
];

export const civic = {
  tag: 'Civic systems · ISEYC',
  title: 'ISEYC Civic Intelligence',
  lead: 'A connected set of tools for community records, public evidence and human-reviewed analysis.',
  body: 'Civic Mandate receives and reviews community submissions. The Observatory organises public evidence. Civic Brain helps explore published records and prepare analysis for human review.',
  loop: ['Community record', 'Evidence', 'Analysis', 'Human review'],
  not: 'Not a poll, candidate ranking, endorsement or representative national survey.',
  note: 'Early-stage civic-intelligence infrastructure. Individual products have different levels of readiness.',
  about:
    'ISEYC is a youth-led, non-partisan institution. Its four departments are Education & Capacity Building; Health & Well-being; Software & Technology; and Civic Department.',
  href: 'https://2027-street-mandate.vercel.app',
  cta: 'Explore Civic Mandate',
  problem:
    'Community concerns and public evidence are often fragmented, difficult to trace and easy to misrepresent.',
  approach:
    'Separate community reports from public datasets, preserve source provenance, make limitations visible and require human review before publication.',
};

export const enterprise = {
  tag: 'Enterprise systems · Hubil Group',
  title: 'Hubil FirstLine',
  lead: 'A diagnostic-first business presence and qualification workflow.',
  sectors: ['Business diagnostics', 'Customer access', 'Operational readiness'],
  partnership: '',
  summit: '',
  firstLine: {
    title: 'FirstLine Business Presence Diagnostic',
    body: 'A five-step diagnostic experience designed to structure business context, customer access, operational friction and readiness before a follow-up conversation.',
    href: 'https://github.com/mrzulqarnainnadabo/hubil-firstline-system',
    cta: 'View FirstLine repository',
  },
  note: 'Repository documentation describes optional Notion lead creation. Live production integration and current operational status require verification.',
  problem:
    'Early business conversations can be unstructured, making it difficult to understand a prospect’s context and readiness.',
  approach:
    'Use a focused diagnostic to collect structured information before recommending a customer-facing digital system.',
};

export const projects = [
  {
    id: 'civic-infrastructure',
    category: 'Institutional systems',
    title: 'ISEYC Civic Intelligence Infrastructure',
    stage: 'Early-stage multi-product pilot',
    summary:
      'A coordinated civic workflow connecting community submissions, public evidence and human-reviewed analysis.',
    problem:
      'Community concerns and public evidence can be fragmented across channels, while published claims may be mistaken for verified findings.',
    role:
      'Institutional direction, problem framing, governance requirements and product architecture.',
    solution:
      'Civic Mandate provides the community-record workflow; the Observatory organises sourced public evidence; Civic Brain supports evidence-grounded exploration and draft analysis.',
    evidence:
      'Public repositories document the product boundaries, API contracts, publication rules and evidence limitations.',
    limitations:
      'This is not a representative national survey or a national statistics system. Published submissions do not establish prevalence. Production readiness must be assessed product by product.',
    links: [
      { label: 'Civic Mandate', href: 'https://github.com/mrzulqarnainnadabo/2027-street-mandate' },
      { label: 'Civic Brain', href: 'https://github.com/mrzulqarnainnadabo/iseyc-civic-brain' },
      { label: 'Observatory', href: 'https://github.com/mrzulqarnainnadabo/iseyc-civic-intelligence-observatory' },
    ],
  },
  {
    id: 'observatory',
    category: 'Evidence & spatial intelligence',
    title: 'ISEYC Civic Intelligence Observatory',
    stage: 'Early-stage national pilot',
    summary:
      'A public evidence workspace connecting source provenance, observations, geography and institutional accountability.',
    problem:
      'A source catalogue, a dataset, an observation and a verified outcome are different things; civic reporting needs to preserve those distinctions.',
    role:
      'Institutional product direction, evidence-governance requirements and system architecture.',
    solution:
      'A structured evidence workspace with source-readiness documentation, published-only data boundaries, geographic navigation and explicit unavailable, incomplete and demonstration states.',
    evidence:
      'The repository contains source-readiness assessments, evidence contracts, adapter tests and methodology documentation.',
    limitations:
      'The repository describes an early-stage pilot. Some upstream integrations and facility-level evidence remain incomplete. A source being listed does not mean its data have been ingested.',
    links: [
      { label: 'Source repository', href: 'https://github.com/mrzulqarnainnadabo/iseyc-civic-intelligence-observatory' },
    ],
  },
  {
    id: 'firstline',
    category: 'Enterprise systems',
    title: 'Hubil FirstLine',
    stage: 'Implemented product repository · live operations to verify',
    summary:
      'A mobile-first business diagnostic designed to structure prospect information before a service conversation.',
    problem:
      'Businesses often describe customer-access and operational challenges through unstructured enquiries.',
    role:
      'Service framing, product direction and operational requirements.',
    solution:
      'A multi-step diagnostic, typed submission model and optional Notion lead-creation workflow, with contact routes as a secondary path.',
    evidence:
      'The public repository documents the diagnostic flow, API endpoints, data model and setup requirements.',
    limitations:
      'Repository documentation is not proof of current production usage, configured integrations or paying customers.',
    links: [
      { label: 'Source repository', href: 'https://github.com/mrzulqarnainnadabo/hubil-firstline-system' },
    ],
  },
  {
    id: 'sigma-geo',
    category: 'Research & evaluation',
    title: 'SIGMA-GEO',
    stage: 'Hackathon prototype · further validation required',
    summary:
      'A prototype benchmark exploring whether AI systems detect defects in geographical evidence before producing spatial conclusions.',
    problem:
      'AI systems can produce plausible spatial conclusions even when the underlying geographical evidence is outdated, incomplete, conflicting or incorrectly referenced.',
    role:
      'Research framing, benchmark design and prototype development, drawing on Geography and Sustainability training.',
    solution:
      'The hackathon prototype contains 12 synthetic cases across six evidence-defect dimensions, with matched clean controls, a deterministic grader and automated checks. The paired design is intended to test both defect detection and appropriate answering when evidence is adequate.',
    evidence:
      'The micro1 Eval Hackathon ran from 30 October to 7 November 2026. The prototype pipeline and submission checks ran successfully; the public project repository and accompanying research brief document its current scope.',
    limitations:
      'The prototype has not yet been used to establish frontier-model performance. The synthetic cases do not demonstrate real-world generalisation, and the benchmark requires expanded cases, independent geospatial expert review and model testing before performance claims can be made.',
    links: [
      { label: 'Source repository', href: 'https://github.com/mrzulqarnainnadabo/SIGMA-GEO' },
    ],
  },
  {
    id: 'brand-system',
    category: 'Commercial brand & digital systems',
    title: 'Fashion brand identity and digital launch system',
    stage: 'Brand system and launch assets prepared · website preview, not production',
    summary:
      'A coordinated brand identity and launch toolkit designed to make a fashion label more consistent across packaging, social channels and customer enquiries.',
    problem:
      'A new brand needs a coherent identity and usable launch materials before investing heavily in inventory, advertising or custom production.',
    role:
      'Brand strategy, identity direction, visual-system development and digital launch deliverables.',
    solution:
      'A selected visual identity, brand manual, export-ready logo applications, packaging concepts, social launch content and an enquiry-first website preview.',
    evidence:
      'The private handover repository contains the selected identity direction, brand manual, production exports, launch-content kit and website preview source.',
    limitations:
      'The brand name is not legally cleared. The website is not public production or ecommerce; product imagery, pricing, availability and contact routes require owner confirmation.',
    links: [],
  },
];

export const research = [
  {
    title: 'SIGMA-GEO',
    type: 'Hackathon prototype · validation pending',
    description: 'A 12-case synthetic prototype testing whether AI detects defects in geographical evidence and answers when evidence is adequate.',
    href: 'https://github.com/mrzulqarnainnadabo/SIGMA-GEO',
    briefHref: 'https://github.com/mrzulqarnainnadabo/zulqarnain-nadabo/blob/main/docs/SIGMA-GEO-RESEARCH-BRIEF.md',
  },
  {
    title: 'Civic evidence governance',
    type: 'Methodology and technical documentation',
    description: 'Source provenance, publication boundaries and evidence limitations.',
    href: 'https://github.com/mrzulqarnainnadabo/iseyc-civic-intelligence-observatory',
  },
  {
    title: 'Community record and accountability workflow',
    type: 'Product and governance documentation',
    description: 'Human review, published-only records and mandate-to-response design.',
    href: 'https://github.com/mrzulqarnainnadabo/2027-street-mandate',
  },
];

export const principles = {
  civic: [
    ['Non-partisan', 'No party framing, candidate scores or endorsements.'],
    ['Human review', 'AI-assisted analysis remains a draft until reviewed.'],
    ['Traceable claims', 'Evidence should retain its source and context.'],
    ['Clear limitations', 'A report, an observation and a verified outcome are not interchangeable.'],
  ],
  enterprise: [
    ['Operational responsibility', 'Workflows should make ownership and next steps clear.'],
    ['Useful before impressive', 'Technology should solve a defined organisational problem.'],
  ],
};

const gh = 'https://github.com/mrzulqarnainnadabo/';
export const architecture = {
  flow: ['Community records', 'Public evidence', 'Human-reviewed insight'],
  repos: [
    { name: '2027-street-mandate', for: 'Community intake and publication', group: 'ISEYC' },
    { name: 'iseyc-civic-intelligence-observatory', for: 'Public evidence workspace', group: 'ISEYC' },
    { name: 'iseyc-civic-brain', for: 'Evidence-grounded analysis', group: 'ISEYC' },
    { name: 'hubil-firstline-system', for: 'Business diagnostic workflow', group: 'Hubil' },
    { name: 'SIGMA-GEO', for: 'Geospatial evaluation scaffold', group: 'Research' },
  ].map((r) => ({ ...r, href: gh + r.name })),
};

export const contact = {
  email: 'iseycglobal@gmail.com',
  links: [
    ['LinkedIn', 'Zulqarnain Yusuf Nadabo', 'https://www.linkedin.com/in/amb-zulqarnain-yusuf-9b04b0124/'],
    ['GitHub', 'mrzulqarnainnadabo', 'https://github.com/mrzulqarnainnadabo'],
    ['X', '@nain_nadabo', 'https://x.com/nain_nadabo'],
    ['Civic Mandate', 'Public pilot', 'https://2027-street-mandate.vercel.app'],
  ],
};
