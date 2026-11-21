import Section from './Section';
import { research } from '@/lib/content';

export default function Research() {
  return (
    <Section id="research" title="Research" kicker="Questions under examination">
      <div className="border-t border-rule">
        {research.map((item, index) => (
          <article key={item.title} className="research-row scroll-reveal">
            <span className="font-mono text-xs text-gold">0{index + 1}</span>
            <div className="min-w-0">
              <h3 className="font-serif text-2xl text-forest">{item.title}</h3>
              <p className="mt-1 text-sm text-mute">{item.description}</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
              <span className="uppercase tracking-[.12em] text-mute">{item.type}</span>
              <a className="font-semibold text-forest underline decoration-gold underline-offset-4" href={item.href} target="_blank" rel="noreferrer">Open ↗</a>
              {item.briefHref && <a className="font-semibold text-forest underline decoration-gold underline-offset-4" href={item.briefHref} target="_blank" rel="noreferrer">Brief ↗</a>}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
