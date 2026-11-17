import Section from './Section';
import { contact } from '@/lib/content';

export default function Contact() {
  return (
    <Section id="contact" title="Professional contact" kicker="Institutional and project enquiries" last>
      <p className="mb-5 max-w-xl text-[15px] leading-relaxed text-mute">
        For institutional collaboration and project enquiries, use the channels below.
      </p>
      <a href={`mailto:${contact.email}`} className="mb-8 inline-block break-all font-serif text-[clamp(1.6rem,6vw,2.7rem)] font-light text-forest underline decoration-gold underline-offset-8 hover:text-black">
        {contact.email}
      </a>
      <dl className="grid grid-cols-[110px_1fr] border-b border-rule md:grid-cols-[150px_1fr]">
        {contact.links.map(([key, label, href]) => (
          <div key={key} className="contents">
            <dt className="border-t border-rule py-3 text-[15px] text-mute">{key}</dt>
            <dd className="border-t border-rule py-3 [overflow-wrap:anywhere]">
              <a href={href} target="_blank" rel="noreferrer" className="font-medium text-forest underline decoration-gold underline-offset-4 hover:text-black">{label}</a>
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-xs leading-relaxed text-mute">The email address above is an ISEYC institutional contact, not a personal mailbox.</p>
    </Section>
  );
}
