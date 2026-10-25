import LocalTime from './LocalTime';
import { person, roles } from '@/lib/content';

/**
 * Image-free editorial hero. The portrait slot is removed entirely; typography,
 * generous spacing and a restrained gold rule carry the opening screen.
 */
export default function Hero() {
  return (
    <header className="relative overflow-hidden bg-ink text-cream">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <nav aria-label="Primary" className="flex items-center justify-between gap-4 border-b border-white/10 py-6 text-sm">
          <a href="#top" className="font-serif text-2xl tracking-[.08em] text-goldl no-underline" aria-label="Top of page">ZYN</a>
          <ul className="flex flex-wrap justify-end gap-x-5 gap-y-2 text-[#cdd8c9] sm:gap-x-7">
            <li><a className="underline-offset-4 hover:text-white hover:underline" href="#systems">Systems</a></li>
            <li><a className="underline-offset-4 hover:text-white hover:underline" href="#principles">Principles</a></li>
            <li><a className="underline-offset-4 hover:text-white hover:underline" href="#contact">Contact</a></li>
          </ul>
        </nav>

        <div id="top" className="max-w-5xl pb-16 pt-14 md:pb-24 md:pt-20">
          <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-[.18em] text-[#b9c7b6]">
            <span>Public systems</span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold" />
            <span>Civic responsibility</span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold" />
            <span>Enterprise operations</span>
          </div>

          <p className="mb-5 text-sm text-[#b9c7b6]"><LocalTime place={person.location} /></p>
          <h1 className="max-w-4xl font-serif text-[clamp(2.8rem,8.5vw,6.5rem)] font-light leading-[.98] tracking-[-.045em] text-white">
            {person.name}
          </h1>
          <div className="mt-8 h-px w-20 bg-gold" />
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#d9e2d5] md:text-2xl md:leading-relaxed">
            {person.sentence}
          </p>

          <ul className="mt-12 grid max-w-4xl gap-3 sm:grid-cols-2">
            {roles.map((r, i) => (
              <li key={r.id}>
                <a href={r.href} className="group flex h-full min-h-32 flex-col justify-between border border-white/15 bg-white/[.03] p-5 transition-colors hover:border-gold/70 hover:bg-white/[.06] md:p-6">
                  <span className="mb-5 block text-xs font-semibold uppercase tracking-[.16em] text-goldl">
                    {i === 0 ? 'Civic leadership' : 'Enterprise leadership'}
                  </span>
                  <span className="block font-serif text-xl leading-snug text-white md:text-2xl">{r.title}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-[#b9c7b6]">{r.sub}</span>
                </a>
              </li>
            ))}
          </ul>
          <a href="#systems" className="mt-9 inline-flex items-center gap-3 text-sm font-semibold text-white underline decoration-gold decoration-2 underline-offset-8 hover:text-goldl">
            Explore the work <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
      <div className="zig" aria-hidden="true" />
    </header>
  );
}
