import Section from './Section';

const departments = [
  'Education & Capacity Building',
  'Health & Well-being',
  'Software & Technology',
  'Civic Department',
];

export default function ImpactProfile() {
  return (
    <Section id="leadership" title="Leadership & profile" kicker="Roles, focus and institutional context">
      <div className="space-y-8">
        <p className="max-w-2xl font-serif text-xl font-light leading-relaxed text-forest">
          My work connects institutional leadership with the design of practical operating structures, public-interest information systems and enterprise workflows.
        </p>

        <div className="grid gap-8 border-y border-rule py-7 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold">Institutional leadership</p>
            <h3 className="font-serif text-2xl font-medium text-forest">ISEYC</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-mute">
              National President of the Initiative for Sustainable Evolution for Youth and Community, a youth-led, non-partisan institution.
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-gold">Four departments</p>
            <ul className="mt-2 space-y-2 text-sm text-forest">
              {departments.map((department) => <li key={department} className="border-b border-rule pb-2 last:border-0">{department}</li>)}
            </ul>
          </div>
          <div id="enterprise">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold">Enterprise leadership</p>
            <h3 className="font-serif text-2xl font-medium text-forest">Hubil Group</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-mute">
              Managing Director. Current work includes the development of business diagnostic and digital operating systems.
            </p>
            <div className="mt-6 border-t border-rule pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">Academic background</p>
              <p className="mt-2 text-[15px] leading-relaxed text-forest">Geography and Sustainability Studies</p>
              <p className="mt-1 text-sm leading-relaxed text-mute">Qualification and award details are being verified before a formal degree designation is published.</p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">Professional focus</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {['Institutional architecture', 'Governance and operating models', 'Digital systems strategy', 'Civic intelligence', 'Evidence governance', 'Spatial intelligence'].map((item) => (
              <li key={item} className="border border-rule px-3 py-2 text-sm text-forest">{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
