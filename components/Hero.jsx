import LocalTime from './LocalTime';
import { person, roles } from '@/lib/content';

/** First screen: name, both roles, one sentence, portrait. Dark band so it reads in two seconds. */
export default function Hero() {
  return (
    <header className="bg-ink text-cream">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <nav aria-label="Primary" className="flex items-center justify-between pt-6 text-[15px]">
          <a href="#top" className="font-serif text-2xl tracking-[.06em] text-goldl no-underline" aria-label="Top of page">ZYN</a>
          <ul className="flex gap-6 text-[#cdd8c9]">
            <li><a className="underline-offset-4 hover:underline" href="#systems">Systems</a></li>
            <li><a className="underline-offset-4 hover:underline" href="#principles">Principles</a></li>
            <li><a className="underline-offset-4 hover:underline" href="#contact">Contact</a></li>
          </ul>
        </nav>

        <div id="top" className="grid items-end gap-10 pb-14 pt-12 md:grid-cols-[1.3fr_.7fr] md:gap-14 md:pb-20 md:pt-16">
          <div className="rise">
            <p className="mb-4 text-[15px] text-[#b9c7b6]"><LocalTime place={person.location} /></p>
            <h1 className="mb-7 font-serif text-[clamp(2.6rem,9.5vw,5.2rem)] font-light leading-[1.02] tracking-tight text-white">
              {person.name}
            </h1>
            <p className="mb-9 max-w-xl text-lg text-[#d9e2d5] md:text-xl">{person.sentence}</p>

            {/* Dual mandate: two links, each a role. Gold rule on the enterprise side keeps the two tracks distinct. */}
            <ul className="grid max-w-xl gap-px overflow-hidden rounded-sm border border-[#34503f] bg-[#34503f] sm:grid-cols-2">
              {roles.map((r, i) => (
                <li key={r.id} className="bg-ink">
                  <a href={r.href} className={`group block h-full border-t-2 p-4 transition-colors hover:bg-forest ${i === 0 ? 'border-cream/70' : 'border-gold'}`}>
                    <span className="block font-serif text-xl leading-snug text-white">{r.title}</span>
                    <span className="mt-1 block text-sm text-[#b9c7b6]">{r.sub}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rise rise-2 relative w-[72%] max-w-[300px] md:ml-auto md:w-full">
            <div aria-hidden className="absolute inset-0 -translate-y-2.5 translate-x-2.5 rounded-b-md rounded-t-[999px] border border-gold" />
            {/* Plain <img>: the file is already sized. No re-compression of the portrait. */}
            <img src="/zulqarnain.jpg" width="380" height="473" alt="Portrait of Ambassador Zulqarnain Yusuf Nadabo"
                 className="relative aspect-[380/473] w-full rounded-b-md rounded-t-[999px] bg-forest object-cover" />
          </div>
        </div>
      </div>
      <div className="zig" aria-hidden />
    </header>
  );
}
