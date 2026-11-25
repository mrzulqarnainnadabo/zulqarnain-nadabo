import { contact } from '@/lib/content';

const marks={LinkedIn:'in',GitHub:'⌘',X:'𝕏',Instagram:'◎'};
export default function Contact(){
  const primary=contact.links.find(([name])=>name==='LinkedIn');
  const secondary=contact.links.filter(([name])=>name!=='LinkedIn');
  return (
    <section id="contact" aria-labelledby="contact-heading" className="contact-panel" data-reveal="rise">
      <div className="contact-intro">
        <p className="eyebrow">The next conversation</p>
        <h2 id="contact-heading">Good work begins<br/><em>with a conversation.</em></h2>
        <p className="contact-note">For research, institutional design, spatial intelligence and digital systems.</p>
      </div>
      <div className="contact-actions">
        {primary&&<a className="contact-primary" href={primary[2]} target="_blank" rel="noopener noreferrer">
          <span>PROFESSIONAL CONTACT</span><strong>Connect on LinkedIn</strong><span aria-hidden="true">↗</span>
        </a>}
        <div className="contact-socials" aria-label="Social and professional profiles">
          {secondary.map(([name,label,href])=>(
            <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${name}: ${label}`}>
              <span className="social-mark" aria-hidden="true">{marks[name]}</span><span><b>{name}</b><small>{label}</small></span><i aria-hidden="true">↗</i>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
