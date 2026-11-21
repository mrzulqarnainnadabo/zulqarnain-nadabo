const stages = [
  ['01','Observe','Start with the real world.'],
  ['02','Connect','Find the relationships.'],
  ['03','Design','Shape a workable system.'],
  ['04','Test','Learn what holds up.'],
];

export default function ImpactProfile() {
  return (
    <section id="approach" aria-labelledby="profile-heading" className="profile-band atlas-method">
      <div className="atlas-method-heading" data-reveal="rise">
        <p className="eyebrow">A way of working</p>
        <h2 id="profile-heading">See the whole.<br/><em>Then change a part.</em></h2>
      </div>
      <div className="atlas-process" data-reveal="rise">
        <svg className="atlas-process-line" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M40 60 C190 60 190 60 330 60 S470 60 550 60 S760 60 960 60" fill="none" stroke="currentColor" strokeOpacity=".25" strokeWidth="1.5"/>
          <path className="atlas-process-dash" d="M40 60 C190 60 190 60 330 60 S470 60 550 60 S760 60 960 60" fill="none" stroke="#ed765e" strokeWidth="2" strokeDasharray="7 10"/>
        </svg>
        {stages.map(([number,title,description],index)=>(
          <div className={`atlas-process-step atlas-process-step-${index+1}`} key={number}>
            <span className="atlas-process-number">{number}</span>
            <span className="atlas-process-dot" aria-hidden="true">{index===0?'⌖':index===1?'↗':index===2?'◇':'↻'}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        ))}
      </div>
      <p className="atlas-method-note">Research informs the design. Testing keeps it honest.</p>
    </section>
  );
}
