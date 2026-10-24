import Section from './Section';
import { principles } from '@/lib/content';

function Group({ title, items }) {
  return (
    <div>
      <h3 className="mb-3 font-serif text-2xl font-medium text-forest">{title}</h3>
      <ul className="border-b border-rule">
        {items.map(([name, line]) => (
          <li key={name} className="border-t border-rule py-3">
            <span className="font-serif text-xl leading-snug">{name}</span>
            <span className="mt-0.5 block text-[15px] text-mute">{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Principles() {
  return (
    <Section id="principles" title="Principles">
      <div className="grid gap-10 md:grid-cols-2 md:gap-12">
        <Group title="Civic products" items={principles.civic} />
        <Group title="Enterprise" items={principles.enterprise} />
      </div>
    </Section>
  );
}
