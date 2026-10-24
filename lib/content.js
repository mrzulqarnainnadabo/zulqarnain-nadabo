/**
 * All site copy lives here. Edit text in this file; components only lay it out.
 * Rule for this file: only facts that are publicly stated. No metrics, no invented partners.
 */

export const person = {
  name: 'Ambassador Zulqarnain Yusuf Nadabo',
  location: 'Abuja, Nigeria',
  sentence:
    'Building civic information systems and enterprise systems, each held to its own standard.',
  framing: 'Business and community impact are built in parallel, not as slogans.',
  quote: 'Business and community impact must grow together.',
  quoteNote: 'His public framing. Hubil for enterprise, ISEYC for youth and civic work.',
  now: 'Current focus: Civic Mandate Nigeria (pilot-grade public record) and First Line at Hubil Group.',
  closing: 'Say what the system does. Say what it does not.',
};

export const roles = [
  {
    id: 'civic',
    title: 'National President, ISEYC',
    sub: 'Initiative for Sustainable Evolution for Youth and Community',
    href: '#systems',
  },
  {
    id: 'enterprise',
    title: 'Managing Director, Hubil Group',
    sub: 'Hubil Global Services Ltd',
    href: '#systems',
  },
];

export const civic = {
  tag: 'Civic · ISEYC',
  title: 'Civic Mandate Nigeria',
  lead: 'A non-partisan public record of concrete public-service demands.',
  body: 'Citizens submit. A person reviews. Only published records are public. Each is organised by place and by the office responsible.',
  loop: ['Submit', 'Human review', 'Published', 'Intelligence'],
  not: 'It is not a poll. It does not rank candidates. It is not a campaign platform.',
  note: 'Pilot-grade public record. It is not a finished national survey system.',
  about:
    'ISEYC is a youth-led, non-partisan governance institution based in Abuja, working on accountable leadership, youth capacity and civic systems.',
  href: 'https://2027-street-mandate.vercel.app',
  cta: 'Open the live product',
  problem:
    'Public memory of what citizens ask government to deliver is weak. Concrete demands get lost in noise.',
  approach:
    'Human review. A published-only boundary. Place and responsibility on every record. Honest methodology.',
};

export const enterprise = {
  tag: 'Enterprise · Hubil Group',
  title: 'Hubil Group',
  lead: 'Hubil Global Services Ltd, evolving as Hubil Group.',
  sectors: ['Oil & Gas', 'Mining', 'Real Estate', 'Trade & Logistics'],
  partnership:
    'Hubil Group has publicly announced a partnership with MMB Import & Export (China). The announced scope covers sourcing, procurement, quality inspection and export coordination. The Nigerian import and customs side runs through a licensed entity.',
  summit:
    'He has represented ISEYC and Hubil Group at the Northern Nigeria Investment & Industrialisation Summit in Abuja.',
  firstLine: {
    title: 'First Line',
    body: 'An operational systems product under Hubil Group. The source is public on GitHub.',
    href: 'https://github.com/mrzulqarnainnadabo/hubil-firstline-system',
    cta: 'View First Line on GitHub',
  },
  note: 'Only what Hubil has stated publicly appears here.',
  problem:
    'Trade, sourcing and project work depend on coordination across many parties. Weak coordination costs time and trust.',
  approach: 'Operational responsibility. Named partners. Long-term systems over hype.',
};

export const principles = {
  civic: [
    ['Non-partisan', 'No party framing, no scores, no endorsements.'],
    ['Human review before public', 'Nothing is published unreviewed.'],
    ['Traceable claims', 'Every record can be followed to its source.'],
    ['Privacy-conscious', 'Collect and show only what the record needs.'],
    ['Evidence over hype', 'Say what the system does and what it does not.'],
  ],
  enterprise: [
    ['Operational responsibility', 'Commitments are owned by named people.'],
    ['Long-term systems', 'Build what lasts, not what trends.'],
  ],
};

const gh = 'https://github.com/mrzulqarnainnadabo/';
export const architecture = {
  flow: ['Public record', 'Civic intelligence', 'Human-governed insight'],
  repos: [
    { name: '2027-street-mandate', for: 'Civic Mandate Nigeria', group: 'Civic' },
    { name: 'iseyc-civic-brain', for: 'ISEYC', group: 'Civic' },
    { name: 'iseyc-digital-operations-centre', for: 'ISEYC', group: 'Civic' },
    { name: 'iseyc-field-register-desk', for: 'ISEYC', group: 'Civic' },
    { name: 'ai-platform', for: 'Governed AI runtime', group: 'Platform' },
    { name: 'hubil-firstline-system', for: 'Hubil Group', group: 'Enterprise' },
  ].map((r) => ({ ...r, href: gh + r.name })),
};

export const contact = {
  email: 'iseycglobal@gmail.com',
  links: [
    ['Civic Mandate', '2027-street-mandate.vercel.app', 'https://2027-street-mandate.vercel.app'],
    ['LinkedIn', 'Zulqarnain Yusuf Nadabo', 'https://www.linkedin.com/in/amb-zulqarnain-yusuf-9b04b0124/'],
    ['GitHub', 'mrzulqarnainnadabo', 'https://github.com/mrzulqarnainnadabo'],
    ['X', '@nain_nadabo', 'https://x.com/nain_nadabo'],
    ['Instagram', '@nain_nadabo', 'https://www.instagram.com/nain_nadabo'],
  ],
  plain: [
    ['Facebook', 'Zulqarnain Nadabo (public posts)'],
    ['Crowwe', 'Identity-verified institutional presence'],
    ['Also', 'First Brand Ambassador of Blush by Lamims (public announcement)'],
  ],
};
