/**
 * Public-facing copy and project records.
 * Keep claims factual, concise and explicit about project stage.
 */
export const person = {
  name: 'Zulqarnain Yusuf Nadabo',
  location: 'Nigeria',
  role: 'Institutional Architect & Digital Systems Strategist',
  sentence: 'I design institutions, digital systems and evidence-led ways of working.',
  framing: 'I turn complex institutional problems into clear structures, useful systems and accountable work.',
  quote: 'Build the institution around the work — not the appearance of the institution.',
  quoteNote: 'A working principle.',
  now: 'Current focus: civic intelligence, spatial evaluation and practical enterprise systems.',
  closing: 'Make the work clear. Make the evidence traceable. Make responsibility visible.',
};

export const roles = [
  { id: 'civic', title: 'National President, ISEYC', sub: 'Youth-led civic and community institution', href: '#leadership' },
  { id: 'enterprise', title: 'Managing Director, Hubil Group', sub: 'Enterprise systems and institutional development', href: '#enterprise' },
];

export const projects = [
  {
    id: 'civic-infrastructure',
    category: 'Institutional systems',
    title: 'ISEYC Civic Intelligence',
    stage: 'Multi-product pilot',
    summary: 'A connected system for community records, public evidence and human-reviewed insight.',
    problem: 'Community concerns and public evidence are fragmented, difficult to trace and easy to misrepresent.',
    role: 'Institutional direction, governance requirements and product architecture.',
    solution: 'Civic Mandate manages community records; the Observatory organises public evidence; Civic Brain supports evidence-grounded exploration and draft analysis.',
    evidence: 'Public repositories document product boundaries, API contracts, publication rules and evidence limitations.',
    limitations: 'Not a representative national survey or national statistics system. Published submissions do not establish prevalence. Readiness varies by product.',
    links: [{ label: 'Open public pilot', href: 'https://2027-street-mandate.vercel.app' }],
  },
  {
    id: 'observatory',
    category: 'Evidence & spatial intelligence',
    title: 'Civic Intelligence Observatory',
    stage: 'Early-stage national pilot',
    summary: 'A public evidence workspace for sources, observations, geography and accountability.',
    problem: 'A source, dataset, observation and verified outcome are different things; civic reporting must preserve those distinctions.',
    role: 'Institutional product direction, evidence governance and system architecture.',
    solution: 'A structured workspace with source-readiness records, published-only boundaries, geographic navigation and explicit evidence gaps.',
    evidence: 'The repository contains source-readiness assessments, evidence contracts, adapter tests and methodology documentation.',
    limitations: 'Some upstream integrations and facility-level evidence remain incomplete. A listed source does not mean its data have been ingested.',
    links: [{ label: 'View repository', href: 'https://github.com/mrzulqarnainnadabo/iseyc-civic-intelligence-observatory' }],
  },
  {
    id: 'firstline',
    category: 'Enterprise systems',
    title: 'Hubil FirstLine',
    stage: 'Implemented repository · live operations to verify',
    summary: 'A mobile-first business diagnostic that structures prospect information before a service conversation.',
    problem: 'Customer-access and operational challenges often arrive as unstructured enquiries.',
    role: 'Service framing, product direction and operational requirements.',
    solution: 'A focused diagnostic, typed submission model and optional Notion lead-creation workflow.',
    evidence: 'The public repository documents the diagnostic flow, API endpoints, data model and setup requirements.',
    limitations: 'Repository documentation does not prove current production usage, configured integrations or paying customers.',
    links: [{ label: 'View repository', href: 'https://github.com/mrzulqarnainnadabo/hubil-firstline-system' }],
  },
  {
    id: 'sigma-geo',
    category: 'Research & evaluation',
    title: 'SIGMA-GEO',
    stage: 'Hackathon prototype · validation pending',
    summary: 'A prototype exploring whether AI systems detect defects in geographical evidence before making spatial conclusions.',
    problem: 'AI can produce plausible spatial conclusions from outdated, incomplete, conflicting or incorrectly referenced evidence.',
    role: 'Research framing, benchmark design and prototype development, drawing on Geography and Sustainability training.',
    solution: 'Twelve synthetic cases across six evidence-defect dimensions, matched clean controls, a deterministic grader and automated checks.',
    evidence: 'The micro1 Eval Hackathon ran from 30 October to 7 November 2026. Prototype pipeline and submission checks ran successfully.',
    limitations: 'No frontier-model performance has been established. Real-world generalisation, independent expert review and model testing remain outstanding.',
    links: [{ label: 'View repository', href: 'https://github.com/mrzulqarnainnadabo/SIGMA-GEO' }],
  },
];

export const research = [
  {
    title: 'SIGMA-GEO',
    type: 'Prototype',
    description: 'Geospatial evidence integrity and AI evaluation.',
    href: 'https://github.com/mrzulqarnainnadabo/SIGMA-GEO',
    briefHref: 'https://github.com/mrzulqarnainnadabo/zulqarnain-nadabo/blob/main/docs/SIGMA-GEO-RESEARCH-BRIEF.md',
  },
  {
    title: 'Civic evidence governance',
    type: 'Methodology',
    description: 'Source provenance, publication boundaries and evidence limitations.',
    href: 'https://github.com/mrzulqarnainnadabo/iseyc-civic-intelligence-observatory',
  },
  {
    title: 'Community accountability workflow',
    type: 'Product design',
    description: 'Human review, published records and mandate-to-response.',
    href: 'https://github.com/mrzulqarnainnadabo/2027-street-mandate',
  },
];

export const principles = {
  civic: [
    ['Non-partisan', 'No party framing, candidate scores or endorsements.'],
    ['Human review', 'AI-assisted analysis remains a draft until reviewed.'],
    ['Traceable claims', 'Evidence retains its source and context.'],
    ['Clear limitations', 'A report, observation and verified outcome are not interchangeable.'],
  ],
  enterprise: [
    ['Operational responsibility', 'Workflows make ownership and next steps clear.'],
    ['Useful before impressive', 'Technology solves a defined organisational problem.'],
  ],
};

const gh = 'https://github.com/mrzulqarnainnadabo/';
export const architecture = {
  flow: ['Community records', 'Public evidence', 'Reviewed insight'],
  repos: [
    { name: '2027-street-mandate', for: 'Community records', group: 'ISEYC' },
    { name: 'iseyc-civic-intelligence-observatory', for: 'Public evidence', group: 'ISEYC' },
    { name: 'iseyc-civic-brain', for: 'Evidence-grounded analysis', group: 'ISEYC' },
    { name: 'hubil-firstline-system', for: 'Business diagnostics', group: 'Hubil' },
    { name: 'SIGMA-GEO', for: 'Geospatial evaluation', group: 'Research' },
  ].map((r) => ({ ...r, href: gh + r.name })),
};

export const contact = {
  email: 'iseycglobal@gmail.com',
  links: [
    ['LinkedIn', 'Profile', 'https://www.linkedin.com/in/amb-zulqarnain-yusuf-9b04b0124/'],
    ['GitHub', 'Repositories', 'https://github.com/mrzulqarnainnadabo'],
    ['X', '@nain_nadabo', 'https://x.com/nain_nadabo'],
  ],
};
