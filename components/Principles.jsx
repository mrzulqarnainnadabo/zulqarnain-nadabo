import Section from './Section';
import { principles } from '@/lib/content';

function PrincipleCard({ name, line }) {
  return (
    <div className="card-lift flex flex-col border border-rule bg-bone p-5 md:p-6">
      <p className="font-serif text-xl font-medium leading-snug text-forest">{name}</p>
      <p className="mt-2 text-[15px] leading-relaxed text-mute">{line}</p>
    </div>
  );
}

export default function Principles() {
  return (
    <Section id="principles" title="Principles" kicker="How the work is held">
      <div className="space-y-10">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-gold">Civic products</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {principles.civic.map(([name, line]) => (
              <PrincipleCard key={name} name={name} line={line} />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-gold">Enterprise</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {principles.enterprise.map(([name, line]) => (
              <PrincipleCard key={name} name={name} line={line} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
