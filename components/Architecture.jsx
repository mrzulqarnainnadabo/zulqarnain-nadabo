import Section from './Section';
import { architecture } from '@/lib/content';

/** The architecture sentence as a flow, then the repos as scannable link rows. */
export default function Architecture() {
  return (
    <Section id="architecture" title="Systems architecture" kicker="Public on GitHub">
      <ol aria-label="Architecture layers" className="mb-8 flex flex-wrap items-center gap-y-2 font-serif text-[clamp(1.3rem,3.6vw,1.9rem)] font-light text-forest">
        {architecture.flow.map((s, i) => (
          <li key={s} className="flex items-center">
            {s}
            {i < architecture.flow.length - 1 && <span aria-hidden="true" className="mx-3 inline-block h-px w-8 bg-gold" />}
          </li>
        ))}
      </ol>
      <p className="mb-6 max-w-[62ch]">Each layer depends on the one before it.</p>
      <ul className="border-b border-rule">
        {architecture.repos.map((r) => (
          <li key={r.name} className="border-t border-rule">
            <a href={r.href} className="group flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-4 hover:bg-bone">
              <span className="font-semibold text-forest underline decoration-gold decoration-2 underline-offset-4 group-hover:decoration-forest">{r.name} <span aria-hidden="true">↗</span></span>
              <span className="text-[15px] text-mute">{r.for} · {r.group}</span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
