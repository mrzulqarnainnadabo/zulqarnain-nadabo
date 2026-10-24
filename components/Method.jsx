import Section from './Section';
import { civic, enterprise } from '@/lib/content';

/** Problem / approach, once per track. Kept short: this is the "how he thinks" block. */
export default function Method() {
  const tracks = [
    { name: 'Civic: ISEYC', bar: 'border-forest', problem: civic.problem, approach: civic.approach, system: 'Civic Mandate Nigeria.' },
    { name: 'Enterprise: Hubil Group', bar: 'border-gold', problem: enterprise.problem, approach: enterprise.approach, system: 'Hubil Group sector work, and First Line, an operational systems product.' },
  ];
  return (
    <Section id="method" title="Problem, approach, system">
      <div className="grid gap-10 md:grid-cols-2 md:gap-12">
        {tracks.map((t) => (
          <div key={t.name} className={`border-t-[3px] pt-5 ${t.bar}`}>
            <h3 className="mb-4 font-serif text-2xl font-medium text-forest">{t.name}</h3>
            <dl className="space-y-4">
              {[['Problem', t.problem], ['Approach', t.approach], ['System', t.system]].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-sm font-semibold text-mute">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </Section>
  );
}
