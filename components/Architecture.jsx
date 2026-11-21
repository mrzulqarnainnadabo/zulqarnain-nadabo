import Section from './Section';
import { architecture } from '@/lib/content';

export default function Architecture() {
  return (
    <Section id="architecture" title="Systems architecture" kicker="Selected public repositories">
      {/* Visual flow */}
      <div className="mb-8 overflow-x-auto pb-2">
        <ol
          aria-label="Architecture layers"
          className="grid min-w-0 gap-2 sm:grid-cols-3 font-serif text-lg font-light text-forest md:text-xl"
        >
          {architecture.flow.map((step, i) => (
            <li key={step} className="flex min-w-0 items-center">
              <div className="flex min-h-[112px] min-w-0 flex-col justify-center border border-rule bg-bone px-4 py-4 text-left sm:min-h-[132px] sm:px-5">
                <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">
                  Layer {i + 1}
                </span>
                <span className="leading-snug">{step}</span>
              </div>
              {i < architecture.flow.length - 1 && (
                <div aria-hidden="true" className="hidden">
                  <span className="block h-px w-6 bg-gold md:w-8" />
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>

      <p className="mb-6 max-w-[52ch] text-[15px] leading-relaxed text-mute">
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
