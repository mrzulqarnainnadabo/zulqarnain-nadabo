import Section from './Section';
import { civic, enterprise } from '@/lib/content';

export default function Method() {
  const tracks = [
    {
      name: 'Civic · ISEYC',
      accent: 'border-forest',
      problem: civic.problem,
      approach: civic.approach,
      system: 'Civic Mandate Nigeria',
    },
    {
      name: 'Enterprise · Hubil Group',
      accent: 'border-gold',
      problem: enterprise.problem,
      approach: enterprise.approach,
      system: 'Hubil FirstLine + sector systems',
    },
  ];

  return (
    <Section id="method" title="Problem → Approach → System" kicker="How the work is framed">
      <div className="grid gap-6 md:grid-cols-2">
        {tracks.map((t) => (
          <article key={t.name} className={`card-lift border border-t-[3px] border-rule bg-bone p-6 ${t.accent}`}>
            <h3 className="mb-5 font-serif text-xl font-medium text-forest">{t.name}</h3>
            <dl className="space-y-5">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">Problem</dt>
                <dd className="mt-1 text-[15px] leading-relaxed text-forest">{t.problem}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">Approach</dt>
                <dd className="mt-1 text-[15px] leading-relaxed text-forest">{t.approach}</dd>
              </div>
              <div className="border-t border-rule pt-4">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">System</dt>
                <dd className="mt-1 font-serif text-lg font-medium text-forest">{t.system}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </Section>
  );
}
