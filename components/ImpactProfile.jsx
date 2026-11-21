import { person } from '@/lib/content';

export default function ImpactProfile() {
  return (
    <section id="approach" aria-labelledby="profile-heading" className="profile-band">
      <div className="profile-statement" data-reveal="rise">
        <p className="eyebrow profile-kicker">Approach / Point of view</p>
        <div className="profile-copy">
          <h2 id="profile-heading">Understand the system. Design what works.</h2>
          <p className="profile-bio">
            I begin with the evidence, context and incentives around a problem. Then I shape the roles, workflows and digital tools that make action easier to understand, carry out and improve.
          </p>
        </div>
      </div>
      <div className="profile-facts" data-reveal="rise">
        <div><span>01 / Investigate</span><strong>Research & spatial intelligence</strong></div>
        <div><span>02 / Architect</span><strong>Institutions & operating systems</strong></div>
        <div><span>03 / Realise</span><strong>Digital products & technology</strong></div>
      </div>
      <p className="profile-footnote">{person.role} <span>·</span> Nigeria</p>
    </section>
  );
}
