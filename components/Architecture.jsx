import Section from './Section';
import { architecture } from '@/lib/content';

export default function Architecture() {
  return (
    <Section id="architecture" title="How systems connect" kicker="A simple operating logic">
      <div className="architecture-flow" aria-label="Community records lead to public evidence and reviewed insight">
        {architecture.flow.map((step, i) => (
          <div className="architecture-step" key={step}>
            <span className="font-mono text-[11px] text-gold">0{i + 1}</span>
            <span className="mt-4 block max-w-[12ch] font-serif text-2xl leading-tight text-forest md:text-3xl">{step}</span>
            {i < architecture.flow.length - 1 && <span className="architecture-connector" aria-hidden="true">→</span>}
          </div>
        ))}
      </div>
      <div className="mt-12 border-t border-rule">
        {architecture.repos.map((r) => (
          <a key={r.name} href={r.href} target="_blank" rel="noreferrer" className="repository-row group">
            <span className="min-w-0">
              <span className="block truncate font-medium text-forest group-hover:underline group-hover:decoration-gold group-hover:underline-offset-4">{r.name}</span>
              <span className="mt-1 block text-xs text-mute">{r.for}</span>
            </span>
            <span className="flex shrink-0 items-center gap-3">
              <span className="text-[10px] uppercase tracking-[.14em] text-gold">{r.group}</span>
              <span aria-hidden="true" className="text-sm text-mute transition-transform group-hover:translate-x-1">↗</span>
            </span>
          </a>
        ))}
      </div>
    </Section>
  );
}
