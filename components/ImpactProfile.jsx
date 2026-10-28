import Section from './Section';

/**
 * Institutional Impact Profile section.
 * Provides a clear, serious place for credentials, dual-track summary,
 * and a path to the formal profile document.
 */
export default function ImpactProfile() {
  return (
    <Section id="profile" title="Impact Profile" kicker="Credentials and systems summary">
      <div className="space-y-8">
        <p className="max-w-2xl font-serif text-xl font-light leading-relaxed text-forest">
          A concise institutional record of the systems built, the dual operating tracks, and the credentials that support them.
        </p>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="card-lift rounded-sm border border-rule bg-bone p-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold">Civic</p>
            <h3 className="font-serif text-xl font-medium text-forest">ISEYC</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-mute">
              National President. CAC-registered youth-led governance institution. Civic Mandate, Civic Brain, four-tier grassroots structure, IDCC.
            </p>
          </div>

          <div className="card-lift rounded-sm border border-rule bg-bone p-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold">Enterprise</p>
            <h3 className="font-serif text-xl font-medium text-forest">Hubil Group</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-mute">
              Managing Director. Oil & Gas, Mining, Real Estate, Trade & Logistics. FirstLine diagnostic. Nigeria–China corridor work.
            </p>
          </div>
        </div>

        <div className="rounded-sm border border-rule bg-bone p-6 md:p-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-gold">Core competencies</p>
          <ul className="flex flex-wrap gap-2">
            {[
              'Institutional design',
              'Governance frameworks',
              'AI-assisted systems',
              'Organisational diagnostics',
              'Civic-tech product design',
              'Evidence discipline',
              'Partnership development',
              'Strategic operations',
            ].map((item) => (
              <li
                key={item}
                className="rounded-full border border-rule px-3 py-1 text-sm text-forest"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-rule pt-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">Education</p>
              <p className="mt-1 text-[15px] text-forest">B.Sc. Geography and Sustainability Studies</p>
              <p className="text-sm text-mute">Public record also references Geology / geoscience final-year work.</p>
            </div>
            <div className="hidden h-10 w-px bg-rule sm:block" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">Certification</p>
              <p className="mt-1 text-[15px] text-forest">AI Fluency for Nonprofits · Anthropic × GivingTuesday</p>
              <p className="text-sm text-mute">AI Fundamentals · DataCamp</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="mailto:iseycglobal@gmail.com?subject=Request%20for%20Impact%20Profile%20PDF"
            className="inline-flex items-center gap-2 rounded-sm bg-forest px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-ink"
          >
            Request Impact Profile PDF
          </a>
          <a
            href="#contact"
            className="cta-underline text-sm font-semibold text-forest"
          >
            Direct contact
          </a>
        </div>
      </div>
    </Section>
  );
}
