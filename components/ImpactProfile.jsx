import { person } from '@/lib/content';

export default function ImpactProfile() {
  return (
    <section id="approach" aria-labelledby="profile-heading" className="profile-band">
      <div className="profile-statement">
        <p className="eyebrow">Approach / Point of view</p>
        <h2 id="profile-heading">Understand the system. Design what works.</h2>
        <p className="profile-bio">
          My work begins by examining how people, information, institutions and places interact.
          Research and spatial thinking help me understand the problem before shaping a useful structure.
        </p>
        <p className="profile-bio">
          From institutional workflows to digital products, I focus on clear responsibilities,
          grounded evidence and systems that can be used, examined and improved.
        </p>
      </div>
      <div className="profile-facts">
        <div><span>01 / Understand</span><strong>Research & spatial intelligence</strong></div>
        <div><span>02 / Design</span><strong>Institutional architecture</strong></div>
        <div><span>03 / Build</span><strong>Digital systems & products</strong></div>
      </div>
      <p className="profile-footnote">{person.role} <span>·</span> Nigeria</p>
    </section>
  );
}
