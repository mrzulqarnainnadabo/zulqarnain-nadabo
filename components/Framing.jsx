import Section from './Section';
import { person } from '@/lib/content';

export default function Framing() {
  return (
    <Section id="fronts" title="The approach" kicker="From problem to working system">
      <div className="grid gap-8 md:grid-cols-[1.15fr_.85fr] md:items-end">
        <p className="max-w-[23ch] font-serif text-[clamp(2rem,5.4vw,3.6rem)] font-light leading-[1.08] tracking-[-.03em] text-forest">{person.framing}</p>
        <div className="border-l border-gold pl-5">
          <p className="font-serif text-xl italic leading-snug text-forest">{person.quote}</p>
          <p className="mt-2 text-xs text-mute">{person.quoteNote}</p>
          <p className="mt-6 text-sm leading-relaxed text-mute">{person.now}</p>
        </div>
      </div>
    </Section>
  );
}
