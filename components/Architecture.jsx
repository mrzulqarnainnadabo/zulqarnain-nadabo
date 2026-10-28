import Section from './Section';
import { architecture } from '@/lib/content';

export default function Architecture() {
  return (
    <Section id="architecture" title="Systems architecture" kicker="Public on GitHub">
      {/* Visual flow */}
      <div className="mb-10 overflow-x-auto">
        <ol
          aria-label="Architecture layers"
          className="flex min-w-max items-stretch gap-0 font-serif text-lg font-light text-forest md:text-xl"
        >
          {architecture.flow.map((step, i) => (
            <li key={step} className="flex items-center">
              <div className="flex h-full min-w-[140px] flex-col justify-center border border-rule bg-bone px-5 py-4 text-center md:min-w-[160px]">
                <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">
                  Layer {i + 1}
                </span>
                <span className="leading-snug">{step}</span>
              </div>
              {i < architecture.flow.length - 1 && (
                <div aria-hidden="true" className="flex h-full items-center px-1">
                  <span className="block h-px w-6 bg-gold md:w-8" />
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>

      <p className="mb-6 max-w-[52ch] text-[15px] text-mute">
        Each layer depends on the one before it. Human review remains required before publication.
      </p>

      {/* Public repositories */}
      <ul className="border border-rule bg-bone">
        {architecture.repos.map((r) => (
          <li key={r.name} className="border-b border-rule last:border-b-0">
            <a
              href={r.href}
              className="group flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-5 py-4 transition-colors hover:bg-cream"
            >
              <span className="font-semibold text-forest underline decoration-gold decoration-2 underline-offset-4 group-hover:decoration-forest">
                {r.name} <span aria-hidden="true">↗</span>
              </span>
              <span className="text-[14px] text-mute">
                {r.for} · {r.group}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
