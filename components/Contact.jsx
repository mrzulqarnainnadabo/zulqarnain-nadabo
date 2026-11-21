import { contact } from '@/lib/content';

export default function Contact() {
  const [professional, ...otherLinks] = contact.links;
  return (
    <section id="contact" aria-labelledby="contact-heading" className="contact-panel" data-reveal="rise">
      <div>
        <p className="eyebrow">The next conversation</p>
        <h2 id="contact-heading">Have a meaningful problem to solve?</h2>
        <p className="contact-note">For institutional design, digital systems, research and collaboration.</p>
      </div>
      <div className="contact-actions">
        <a className="contact-primary" href={professional[2]} target="_blank" rel="noreferrer">Connect on LinkedIn <span aria-hidden="true">↗</span></a>
        <a href={`mailto:${contact.email}`}>Institutional correspondence <span aria-hidden="true">↗</span></a>
        <div className="contact-socials">{otherLinks.map(([key,label,href])=><a key={key} href={href} target="_blank" rel="noreferrer">{key} · {label}</a>)}</div>
      </div>
    </section>
  );
}
