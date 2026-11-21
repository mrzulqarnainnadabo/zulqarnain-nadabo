import { person } from '@/lib/content';

export default function ImpactProfile() {
  return (
    <section id="leadership" aria-labelledby="profile-heading" className="profile-band">
      <div className="profile-statement">
        <p className="eyebrow">The point of view</p>
        <h2 id="profile-heading">Build the system around the work.</h2>
      </div>
      <div className="profile-facts">
        <div><span>01 / Civic</span><strong>National President, ISEYC</strong></div>
        <div><span>02 / Enterprise</span><strong>Managing Director, Hubil Group</strong></div>
        <div><span>03 / Foundation</span><strong>Geography & Sustainability Studies</strong></div>
      </div>
      <p className="profile-footnote">{person.role} <span>·</span> Nigeria</p>
    </section>
  );
}
