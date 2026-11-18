import Section from './Section';
import { research } from '@/lib/content';

export default function Research() {
  return (
    <Section id="research" title="Research & thinking" kicker="Work in progress, not inflated credentials">
      <p className="mb-7 max-w-2xl text-[15px] leading-relaxed text-mute">Current research interests include geospatial evidence integrity, civic data governance and the practical use of public information in institutional decision-making. Items below link to working repositories and documentation; they are not presented as peer-reviewed publications.</p>
      <ul className="divide-y divide-rule border-y border-rule">
        {research.map((item) => <li key={item.title} className="flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
          <div><p className="font-serif text-xl font-medium text-forest">{item.title}</p><p className="mt-1 text-sm text-mute">{item.description}</p></div>
          <div className="flex shrink-0 flex-wrap items-center gap-4"><span className="text-xs text-mute">{item.type}</span><a className="text-sm font-semibold text-forest underline decoration-gold decoration-2 underline-offset-4" href={item.href} target="_blank" rel="noreferrer">View work ↗</a>{item.briefHref && <a className="text-sm font-semibold text-forest underline decoration-gold decoration-2 underline-offset-4" href={item.briefHref} target="_blank" rel="noreferrer">Research brief ↗</a>}</div>
        </li>)}
      </ul>
    </Section>
  );
}
