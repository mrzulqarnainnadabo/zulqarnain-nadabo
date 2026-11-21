import Section from './Section';
import { contact } from '@/lib/content';

export default function Contact() {
  const [professional, ...otherLinks] = contact.links;

  return (
    <Section id="contact" title="Professional contact" kicker="A clear route for the right conversation" last>
      <div className="grid gap-8 border-y border-rule py-6 sm:grid-cols-2 sm:gap-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">Professional enquiries</p>
          <a href={professional[2]} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-3 font-serif text-2xl text-forest underline decoration-gold decoration-2 underline-offset-8 hover:text-black">
            LinkedIn profile <span aria-hidden="true" className="text-sm">↗</span>
          </a>
          <p className="mt-4 max-w-[32ch] text-sm leading-relaxed text-mute">For professional introductions, research conversations and collaboration enquiries.</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">Institutional correspondence</p>
          <a href={`mailto:${contact.email}`} className="mt-3 inline-block break-all font-serif text-xl text-forest underline decoration-gold underline-offset-8 hover:text-black">
            {contact.email}
          </a>
          <p className="mt-4 max-w-[32ch] text-sm leading-relaxed text-mute">This is the ISEYC institutional email address, not a personal mailbox.</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
        {otherLinks.map(([key, label, href]) => (
          <a key={key} href={href} target="_blank" rel="noreferrer" className="font-medium text-forest underline decoration-gold underline-offset-4 hover:text-black">
            {key}: {label} ↗
          </a>
        ))}
      </div>
    </Section>
  );
}
