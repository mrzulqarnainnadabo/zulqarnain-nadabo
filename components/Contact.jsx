import { contact } from '@/lib/content';

const marks={LinkedIn:'in',GitHub:'⌘',X:'𝕏',Instagram:'◎'};
export default function Contact(){
  return (
    <section id="contact" aria-labelledby="contact-heading" className="contact-panel" data-reveal="rise">
      <div className="contact-intro">
        <p className="eyebrow">The next conversation</p>
        <h2 id="contact-heading">Good work begins<br/><em>with a conversation.</em></h2>
        <p className="contact-note">For research, institutional design, spatial intelligence and digital systems.</p>
      </div>
      <div className="contact-actions">
        <a className="contact-primary" href={`mailto:${contact.email}`}>
          <span>Write an email</span><strong>{contact.email}</strong><span aria-hidden="true">↗</span>
        </a>
        <div className="contact-socials" aria-label="Social and professional profiles">
          {contact.links.map(([name,label,href])=>(
            <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${name}: ${label}`}>
              <span className="social-mark" aria-hidden="true">{marks[name]}</span><span><b>{name}</b><small>{label}</small></span><i aria-hidden="true">↗</i>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
