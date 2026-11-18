import LocalTime from './LocalTime';
import ThemeToggle from './ThemeToggle';
import EvidenceField from './EvidenceField';
import { person, roles } from '@/lib/content';

export default function Hero() {
  return (
    <header className="hero-shell relative overflow-hidden bg-ink text-cream">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <nav aria-label="Primary" className="hero-nav flex items-center justify-between gap-4 border-b border-white/15 py-5 text-sm">
          <a href="#top" className="font-serif text-xl tracking-[.08em] text-goldl no-underline" aria-label="Top of page">ZYN<span className="text-white">.</span></a>
          <div className="flex items-center gap-4 sm:gap-7">
            <ul className="flex flex-wrap justify-end gap-x-4 gap-y-2 text-xs uppercase tracking-[.12em] text-[#cdd8c9] sm:gap-x-6">
              <li><a className="nav-link" href="#work">Work</a></li>
              <li><a className="nav-link" href="#leadership">Profile</a></li>
              <li><a className="nav-link" href="#research">Research</a></li>
              <li><a className="nav-link" href="#contact">Contact</a></li>
            </ul>
            <ThemeToggle />
          </div>
        </nav>

        <div id="top" className="grid min-h-[76svh] gap-10 py-14 md:grid-cols-[1.08fr_.92fr] md:items-center md:py-20">
          <div className="relative z-10">
            <p className="rise mb-6 text-[11px] font-semibold uppercase tracking-[.2em] text-goldl">Institutional architecture / Nigeria</p>
            <p className="rise-2 mb-3 text-sm text-[#b9c7b6]">{person.role}</p>
            <h1 className="rise-2 max-w-[10ch] font-serif text-[clamp(3.5rem,9vw,7.6rem)] font-light leading-[.88] tracking-[-.055em] text-white">{person.name}</h1>
            <p className="rise-3 mt-7 max-w-[38ch] text-lg leading-relaxed text-[#d9e2d5] md:text-xl">{person.sentence}</p>
            <div className="rise-3 mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href="#work" className="hero-cta">Explore the work <span aria-hidden="true">↓</span></a>
              <span className="text-xs text-[#9aaf9f]"><LocalTime place={person.location} /></span>
            </div>
          </div>

          <div className="rise-3 md:pl-2">
            <EvidenceField />
          </div>
        </div>

        <div className="hero-roles grid gap-0 border-t border-white/15 sm:grid-cols-2">
          {roles.map((role, index) => (
            <a key={role.id} href={role.href} className="role-line group flex items-center justify-between gap-4 py-5">
              <span>
                <span className="block text-[10px] uppercase tracking-[.16em] text-goldl">{index === 0 ? 'Civic leadership' : 'Enterprise leadership'}</span>
                <span className="mt-1 block font-serif text-lg text-white">{role.title}</span>
              </span>
              <span aria-hidden="true" className="text-goldl transition-transform group-hover:translate-x-1">↗</span>
            </a>
          ))}
        </div>
      </div>
      <div className="zig" aria-hidden="true" />
    </header>
  );
}
