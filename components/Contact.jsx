import Section from './Section';
import { contact } from '@/lib/content';

export default function Contact() {
  return (
    <Section id="contact" title="Contact and presence" last>
      <a href={`mailto:${contact.email}`} className="mb-8 inline-block break-all font-serif text-[clamp(1.6rem,6vw,2.7rem)] font-light text-forest underline decoration-gold underline-offset-8 hover:text-black">
        {contact.email}
      </a>
      <dl className="grid grid-cols-[110px_1fr] border-b border-rule md:grid-cols-[150px_1fr]">
        {contact.links.map(([k, label, href]) => (
          <div key={k} className="contents">
            <dt className="border-t border-rule py-3 text-[15px] text-mute">{k}</dt>
            <dd className="border-t border-rule py-3 [overflow-wrap:anywhere]">
              <a href={href} className="font-medium text-forest underline decoration-gold underline-offset-4 hover:text-black">{label}</a>
            </dd>
          </div>
        ))}
        {contact.plain.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="border-t border-rule py-3 text-[15px] text-mute">{k}</dt>
            <dd className="border-t border-rule py-3">{v}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
