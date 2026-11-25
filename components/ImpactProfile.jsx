const stages = [
  ['01','Investigate','Define the real problem and who it affects.','⌖'],
  ['02','Trace','Inspect sources, evidence and constraints.','↗'],
  ['03','Discover','Find the relationships, gaps and leverage.','◇'],
  ['04','Architect','Choose the structure and explain the trade-offs.','⌘'],
  ['05','Build & test','Implement the critical path and test it.','↻'],
  ['06','Measure','Compare outcomes with a baseline—or state what is missing.','∿'],
];

export default function ImpactProfile() {
  return (
    <section id="approach" aria-labelledby="profile-heading" className="profile-band atlas-method">
      <div className="atlas-method-heading" data-reveal="rise">
        <p className="eyebrow">How I approach complex work</p>
        <h2 id="profile-heading">Evidence first.<br/><em>Systems that hold up.</em></h2>
      </div>
      <div className="atlas-process" data-reveal="rise">
        <svg className="atlas-process-line" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M35 60 C180 60 180 60 220 60 S380 60 420 60 S580 60 620 60 S780 60 820 60 S920 60 965 60" fill="none" stroke="currentColor" strokeOpacity=".25" strokeWidth="1.5"/>
          <path className="atlas-process-dash" d="M35 60 C180 60 180 60 220 60 S380 60 420 60 S580 60 620 60 S780 60 820 60 S920 60 965 60" fill="none" stroke="#b9964d" strokeWidth="2" strokeDasharray="7 10"/>
        </svg>
        {stages.map(([number,title,description,symbol],index)=>(
          <div className={`atlas-process-step atlas-process-step-${index+1}`} key={number}>
            <span className="atlas-process-number">{number}</span>
            <span className="atlas-process-dot" aria-hidden="true">{symbol}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        ))}
      </div>
      <p className="atlas-method-note">No invented metrics. No hidden assumptions. If the evidence is incomplete, the work says so.</p>
    </section>
  );
}
