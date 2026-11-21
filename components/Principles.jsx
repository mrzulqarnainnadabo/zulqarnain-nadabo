import Section from './Section';
import { principles } from '@/lib/content';

function PrincipleRows({ items, label }) {
  return (
    <div>
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[.16em] text-gold">{label}</p>
      <div className="border-t border-rule">
        {items.map(([name, line], index) => (
          <div key={name} className="principle-row">
            <span className="font-mono text-xs text-mute">0{index + 1}</span>
            <h3 className="font-serif text-xl text-forest">{name}</h3>
            <p className="text-sm leading-relaxed text-mute">{line}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Principles() {
  return (
    <Section id="principles" title="Working principles" kicker="Standards behind the work">
      <div className="space-y-10">
        <PrincipleRows label="Civic systems" items={principles.civic} />
        <PrincipleRows label="Enterprise systems" items={principles.enterprise} />
      </div>
    </Section>
  );
}
