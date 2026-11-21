import Section from './Section';
import { civic, enterprise } from '@/lib/content';

/** Small arrow icon, decorative only. */
const Arrow = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" className="inline-block translate-y-[2px] transition-transform group-hover:translate-x-1">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
  </svg>
);

/** Whole card is one link (stretched link pattern) so the target is large and obvious. */
function Card({ accent, tag, title, lead, href, cta, children }) {
  return (
    <article className={`card-lift group relative flex flex-col border border-t-4 border-rule bg-bone p-6 md:p-8 ${accent}`}>
      <p className="mb-3 text-sm font-medium text-mute">{tag}</p>
      <h3 className="font-serif text-3xl font-medium leading-tight text-forest">{title}</h3>
      <p className="mt-3 font-serif text-xl font-light leading-snug text-forest">{lead}</p>
      <div className="mt-5 flex-1 space-y-4 text-[15.5px] leading-relaxed">{children}</div>
      <a href={href} className="mt-6 inline-flex items-center gap-2 font-semibold text-forest underline decoration-gold decoration-2 underline-offset-[6px] after:absolute after:inset-0 after:content-['']">
        {cta} <Arrow />
      </a>
    </article>
  );
}

export default function FeaturedSystems() {
  return (
    <Section id="systems" title="Proof of work" kicker="Live systems, with links">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card accent="!border-t-forest" tag={civic.tag} title={civic.title} lead={civic.lead} href={civic.href} cta={civic.cta}>
          <p>{civic.body}</p>
          {/* The loop, drawn as a simple stepper. */}
          <ol aria-label="Civic Mandate loop" className="flex flex-wrap items-center gap-y-2 text-sm font-semibold text-forest">
            {civic.loop.map((s, i) => (
              <li key={s} className="flex items-center">
                {s}
                {i < civic.loop.length - 1 && <span aria-hidden="true" className="mx-3 inline-block h-px w-5 bg-gold" />}
              </li>
            ))}
          </ol>
          <p>{civic.not}</p>
          <p className="border-t border-rule pt-3 text-sm text-mute">{civic.note}</p>
          <p className="text-sm text-mute">{civic.about}</p>
        </Card>

        <Card accent="!border-t-gold" tag={enterprise.tag} title={enterprise.title} lead={enterprise.lead} href={enterprise.firstLine.href} cta={enterprise.firstLine.cta}>
          <ul aria-label="Sectors stated by Hubil" className="flex flex-wrap gap-2">
            {enterprise.sectors.map((s) => (
              <li key={s} className="rounded-full border border-rule px-3 py-1 text-sm text-forest">{s}</li>
            ))}
          </ul>
          <p>{enterprise.partnership}</p>
          <p>{enterprise.summit}</p>
          <div className="border-t border-rule pt-4">
            <h4 className="font-serif text-xl font-medium text-forest">{enterprise.firstLine.title}</h4>
            <p className="mt-1">{enterprise.firstLine.body}</p>
          </div>
          <p className="text-sm text-mute">{enterprise.note}</p>
        </Card>
      </div>
    </Section>
  );
}
