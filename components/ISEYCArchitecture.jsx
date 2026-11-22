export default function ISEYCArchitecture() {
  const departments = [
    { id: 'education', number: '01', name: 'Education & Capacity Building', note: 'Learning, skills and capacity-building programmes.' },
    { id: 'health', number: '02', name: 'Health & Well-being', note: 'Health and well-being programmes and community support.' },
    { id: 'technology', number: '03', name: 'Software & Technology', note: 'Digital systems, technology and practical tools.' },
    { id: 'civic', number: '04', name: 'Civic Department', note: 'Civic participation and the Civic Mandate review and publish workflow.' },
  ];

  return (
    <section id="iseyc" className="iseyc-architecture" aria-labelledby="iseyc-title">
      <div className="iseyc-heading">
        <div>
          <p className="iseyc-kicker">Institutional architecture · 02</p>
          <h2 id="iseyc-title">ISEYC, <em>in structure.</em></h2>
        </div>
        <p className="iseyc-intro">A youth-led public intelligence institution. Four departments work through shared evidence, programmes and accountable operations.</p>
      </div>

      <div className="iseyc-model">
        <div className="iseyc-institution">
          <span className="iseyc-overline">THE INSTITUTION</span>
          <strong>Initiative for Sustainable Evolution for Youth & Community</strong>
          <span className="iseyc-tagline">Empowering Youth, Shaping Communities</span>
        </div>

        <svg className="iseyc-connectors" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M500 0V32H125 M375 32V100 M625 32V100 M875 32V100 M125 32V100" />
        </svg>

        <div className="iseyc-departments">
          {departments.map((department) => (
            <details className="iseyc-department" key={department.id}>
              <summary>
                <span className="iseyc-dept-number">{department.number}</span>
                <span className="iseyc-dept-name">{department.name}</span>
                <span className="iseyc-dept-toggle" aria-hidden="true">+</span>
              </summary>
              <p>{department.note}</p>
            </details>
          ))}
        </div>

        <div className="iseyc-shared">
          <div className="iseyc-shared-heading">
            <span className="iseyc-overline">SHARED INTELLIGENCE & OPERATIONS</span>
            <p>Enabling systems that support the departments — not additional departments.</p>
          </div>
          <div className="iseyc-capabilities">
            <div><b>Observatory</b><span>Source-led evidence for all departments</span></div>
            <div><b>Civic Brain</b><span>Evidence-grounded interpretation and advisory support</span></div>
            <div><b>Digital operations</b><span>Coordination, records and accountable workflows</span></div>
          </div>
        </div>
      </div>

      <p className="iseyc-footnote">Structural overview, not a live staff directory or an approved organogram. Public information only; restricted institutional records remain private.</p>
    </section>
  );
}
