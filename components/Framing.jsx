import Section from './Section';
import { person } from '@/lib/content';

/** "Two fronts, one discipline": a short framing, plus his own public line as a pull quote. */
export default function Framing() {
  return (
    <Section id="fronts" title="Two fronts, one discipline">
      <p className="max-w-[30ch] font-serif text-[clamp(1.6rem,4.6vw,2.4rem)] font-light leading-snug text-forest">{person.framing}</p>
      <blockquote className="mt-8 max-w-[34ch] border-l-2 border-gold pl-5 font-serif text-[1.35rem] font-light italic leading-snug">
        {person.quote}
        <cite className="mt-2 block font-sans text-sm not-italic text-mute">{person.quoteNote}</cite>
      </blockquote>
      <p className="mt-8 inline-block rounded-sm border border-rule bg-bone px-4 py-2 text-sm text-mute">{person.now}</p>
    </Section>
  );
}
