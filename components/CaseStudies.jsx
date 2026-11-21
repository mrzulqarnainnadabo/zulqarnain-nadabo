import Section from './Section';
import { projects } from '@/lib/content';

function ProjectArtwork({ kind }) {
  if (kind === 'civic') return (
    <svg viewBox="0 0 600 260" className="project-svg" aria-hidden="true">
      <defs><pattern id="civic-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="currentColor" strokeOpacity=".12" /></pattern></defs>
      <rect width="600" height="260" fill="url(#civic-grid)" />
      <g fill="none" stroke="#c9a85e" strokeWidth="1.5"><path d="M80 190L205 95L315 160L430 65L520 120" /><path d="M205 95L205 210M315 160L315 50M430 65L490 215" strokeDasharray="4 7" /></g>
      <g fill="#142b20" stroke="#c9a85e" strokeWidth="2">{[[80,190],[205,95],[315,160],[430,65],[520,120],[205,210],[315,50],[490,215]].map(([x,y])=><circle key={x+'-'+y} cx={x} cy={y} r="7" />)}</g>
      <g fill="currentColor" fontSize="10" letterSpacing="2"><text x="58" y="222">COMMUNITY</text><text x="174" y="72">RECORD</text><text x="283" y="190">REVIEW</text><text x="409" y="42">EVIDENCE</text><text x="474" y="151">INSIGHT</text></g>
    </svg>
  );
  if (kind === 'observatory') return (
    <svg viewBox="0 0 600 260" className="project-svg" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeOpacity=".18" strokeWidth="1.2">{Array.from({length:10},(_,i)=><path key={i} d={`M-30 ${30+i*23} C90 ${-5+i*23} 130 ${100+i*13} 260 ${75+i*16} S430 ${20+i*19} 630 ${90+i*15}`}/>)}</g>
      <g fill="none" stroke="#c9a85e" strokeWidth="1.5"><path d="M90 172L205 122L330 151L435 78L520 105" /><path d="M205 122L225 55M330 151L360 220M435 78L470 30" strokeDasharray="3 6"/></g>
      <g fill="#c9a85e">{[[90,172],[205,122],[330,151],[435,78],[520,105]].map(([x,y])=><circle key={x} cx={x} cy={y} r="5"/>)}</g>
      <g fill="currentColor" fontSize="10" letterSpacing="2"><text x="64" y="202">PLACE</text><text x="184" y="102">SOURCE</text><text x="308" y="180">OBSERVE</text><text x="412" y="58">VERIFY</text></g>
    </svg>
  );
  if (kind === 'firstline') return (
    <svg viewBox="0 0 600 260" className="project-svg" aria-hidden="true">
      <g fill="none" stroke="#c9a85e" strokeWidth="1.5"><path d="M90 130H510" /><path d="M190 130V70M390 130V190" strokeDasharray="4 6"/></g>
      {[[90,'01','ENQUIRY'],[290,'02','DIAGNOSE'],[510,'03','NEXT STEP']].map(([x,n,label])=><g key={n}><rect x={x-62} y="94" width="124" height="72" rx="2" fill="#173528" stroke="#c9a85e"/><text x={x-44} y="119" fill="#c9a85e" fontSize="11">{n}</text><text x={x-44} y="143" fill="#f2eee2" fontSize="11" letterSpacing="1">{label}</text></g>)}
      <circle cx="190" cy="70" r="5" fill="#c9a85e"/><circle cx="390" cy="190" r="5" fill="#c9a85e"/>
    </svg>
  );
  return (
    <svg viewBox="0 0 600 260" className="project-svg" aria-hidden="true">
      <g stroke="currentColor" strokeOpacity=".12" strokeWidth="1">{Array.from({length:9},(_,i)=><path key={i} d={`M60 ${35+i*24}H540`}/>)}{Array.from({length:13},(_,i)=><path key={i} d={`M${70+i*38} 30V230`}/>)}</g>
      <g fill="none" stroke="#c9a85e" strokeWidth="2"><path d="M108 70L184 70L184 118L260 118L260 166L336 166L336 92L412 92L412 190L488 190"/></g>
      <g fill="#173528" stroke="#c9a85e" strokeWidth="2">{[[108,70],[184,70],[184,118],[260,118],[260,166],[336,166],[336,92],[412,92],[412,190],[488,190]].map(([x,y],i)=><rect key={i} x={x-5} y={y-5} width="10" height="10"/>)}</g>
      <circle cx="336" cy="92" r="16" fill="none" stroke="#c9a85e" strokeOpacity=".55"/>
      <g fill="currentColor" fontSize="10" letterSpacing="2"><text x="76" y="45">INPUT</text><text x="237" y="205">EVIDENCE CHECK</text><text x="445" y="220">OUTPUT</text></g>
    </svg>
  );
}

const artwork = {
  'civic-infrastructure': 'civic',
  observatory: 'observatory',
  firstline: 'firstline',
  'sigma-geo': 'sigma',
};

export default function CaseStudies() {
  return (
    <section id="work" aria-labelledby="work-heading" className="portfolio-section">
      <div className="section-intro">
        <div>
          <p className="eyebrow">Selected work / 01—04</p>
          <h2 id="work-heading" className="display-heading">Ideas, made<br className="hidden sm:block" /> operational.</h2>
        </div>
        <p className="section-aside">Civic systems. Enterprise tools. Spatial research.</p>
      </div>
      <div className="portfolio-grid">
        {projects.map((project, index) => (
          <article key={project.id} className={`portfolio-card portfolio-card-${index + 1}`}>
            <div className={`project-art project-art-${artwork[project.id]}`}>
              <div className="project-art-top"><span>{String(index + 1).padStart(2,'0')}</span><span>{project.category}</span></div>
              <ProjectArtwork kind={artwork[project.id]} />
              <span className="project-stage">{project.stage}</span>
            </div>
            <div className="project-copy">
              <div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
              </div>
              <a href={project.links[0].href} target="_blank" rel="noreferrer" aria-label={`Explore ${project.title}`}>Explore <span aria-hidden="true">↗</span></a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
