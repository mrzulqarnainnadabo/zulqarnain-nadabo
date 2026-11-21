import LocalTime from './LocalTime';
import ThemeToggle from './ThemeToggle';
import { person, roles } from '@/lib/content';

const disciplines = [
  ['Institutional design', 'Mandates, governance and operating structures'],
  ['Digital systems', 'Products, workflows and connected information'],
  ['Evidence & delivery', 'Traceable claims, clear limits and accountable execution'],
];

export default function Hero() {
  return (
    <header className="hero-shell relative overflow-hidden bg-ink text-cream">
      <div aria-hidden="true" className="hero-grid-mark" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gold/70" />
      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <nav aria-label="Primary" className="flex min-h-[76px] items-center justify-between gap-5 border-b border-white/10 py-4">
          <a href="#top" className="font-serif text-2xl tracking-[.08em] text-goldl no-underline" aria-label="Zulqarnain Yusuf Nadabo — top">ZYN</a>
          <div className="flex min-w-0 items-center gap-3 sm:gap-6">
            <ul className="nav-links flex items-center gap-3 overflow-x-auto text-xs text-[#cdd8c9] sm:gap-6 sm:text-sm">
              <li><a className="whitespace-nowrap underline-offset-4 hover:text-white hover:underline" href="#work">Work</a></li>
              <li><a className="whitespace-nowrap underline-offset-4 hover:text-white hover:underline" href="#leadership">Profile</a></li>
              <li><a className="whitespace-nowrap underline-offset-4 hover:text-white hover:underline" href="#research">Research</a></li>
              <li><a className="whitespace-nowrap underline-offset-4 hover:text-white hover:underline" href="#contact">Contact</a></li>
            </ul>
            <ThemeToggle />
          </div>
        </nav>

        <div id="top" className="pb-16 pt-14 md:pb-24 md:pt-20">
          <p className="mb-8 max-w-xl text-sm leading-relaxed text-[#b9c7b6]">
            A practice across civic institutions, enterprise systems and applied research.
          </p>

          <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1.55fr)_minmax(230px,.65fr)] lg:gap-16">
            <div className="min-w-0">
              <p className="mb-4 text-sm font-semibold tracking-wide text-goldl">{person.role}</p>
              <p className="mb-5 text-sm text-[#b9c7b6]"><LocalTime place={person.location} /></p>
              <h1 className="max-w-4xl font-sans text-[clamp(3rem,8.2vw,6.8rem)] font-semibold leading-[.94] tracking-[-.065em] text-white">
                {person.name}
              </h1>
              <div className="mt-8 h-px w-20 bg-gold" />
              <p className="mt-7 max-w-2xl font-serif text-xl font-light leading-relaxed text-[#d9e2d5] md:text-2xl">
                {person.sentence}
              </p>
              <a href="#work" className="mt-9 inline-flex items-center gap-3 text-sm font-semibold text-white underline decoration-gold decoration-2 underline-offset-8 transition-colors hover:text-goldl">
                Explore selected work <span aria-hidden="true">↓</span>
              </a>
            </div>

            <aside aria-label="Areas of work" className="hero-index border-y border-white/15 py-2 lg:mb-2">
              <p className="mb-3 pt-3 text-sm font-medium text-goldl">How the work is organised</p>
              <ul className="divide-y divide-white/10">
                {disciplines.map(([title, detail]) => (
                  <li key={title} className="grid grid-cols-[8px_1fr] gap-4 py-4">
                    <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-gold" />
                    <div>
                      <p className="font-serif text-lg text-white">{title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-[#aebdaf]">{detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          <div className="mt-14 grid gap-3 sm:grid-cols-2">
            {roles.map((r, i) => (
              <a key={r.id} href={r.href} className="group flex min-h-[112px] flex-col justify-between border border-white/15 bg-white/[.025] p-5 transition-colors duration-300 hover:border-gold/60 hover:bg-white/[.055] md:p-6">
                <span className="text-[10px] font-semibold tracking-wide text-goldl">
                  {i === 0 ? 'Institutional leadership' : 'Enterprise leadership'}
                </span>
                <span className="mt-5 block font-serif text-xl leading-snug text-white md:text-2xl">{r.title}</span>
                <span className="mt-2 block text-sm leading-relaxed text-[#b9c7b6]">{r.sub}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="zig" aria-hidden="true" />
    </header>
  );
}
