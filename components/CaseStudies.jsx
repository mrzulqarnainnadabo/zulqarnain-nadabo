import { projects } from '@/lib/content';

const notes = {
  'civic-infrastructure': { number: '01', type: 'PUBLIC SYSTEMS', question: 'How can community experience become accountable public information?', sequence: ['Community', 'Evidence', 'Response'], mark: 'civic' },
  observatory: { number: '02', type: 'SPATIAL RESEARCH', question: 'How do observations connect to sources, places and limits?', sequence: ['Sources', 'Geography', 'Insight'], mark: 'observatory' },
  firstline: { number: '03', type: 'BUSINESS SYSTEMS', question: 'How can an early conversation reveal what a business needs?', sequence: ['Capture', 'Diagnose', 'Route'], mark: 'firstline' },
  'sigma-geo': { number: '04', type: 'MODEL EVALUATION', question: 'Can a model recognise when geographical evidence fails?', sequence: ['Provenance', 'Spatial fit', 'Confidence'], mark: 'sigma' },
};

function ProjectGlyph({ mark }) {
  if (mark === 'civic') return (
    <svg viewBox="0 0 160 110" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeOpacity=".4" strokeWidth="1">
        <path d="M10 70 Q45 8 80 55 T150 32"/><path d="M10 82 Q45 20 80 67 T150 44"/><path d="M10 94 Q45 32 80 79 T150 56"/>
      </g>
      <path d="M22 74 L62 45 L98 65 L137 28" fill="none" stroke="#ed765e" strokeWidth="2" strokeDasharray="4 4"/>
      {[[22,74],[62,45],[98,65],[137,28]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="5" fill="#ed765e" stroke="currentColor" strokeWidth="1.5"/>)}
    </svg>
  );
  if (mark === 'observatory') return (
    <svg viewBox="0 0 160 110" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeOpacity=".35">
        <ellipse cx="80" cy="55" rx="64" ry="22"/><ellipse cx="80" cy="55" rx="44" ry="40"/><ellipse cx="80" cy="55" rx="20" ry="48"/>
      </g>
      <path d="M20 72 Q80 5 140 48" fill="none" stroke="#4656c8" strokeWidth="2"/>
      <circle cx="20" cy="72" r="4" fill="#ed765e"/><circle cx="140" cy="48" r="4" fill="#ed765e"/><circle cx="80" cy="55" r="5" fill="#4656c8"/>
    </svg>
  );
  if (mark === 'firstline') return (
    <svg viewBox="0 0 160 110" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeOpacity=".45" strokeWidth="1.2">
        <rect x="8" y="34" width="36" height="42" rx="3"/><rect x="62" y="15" width="36" height="42" rx="3"/><rect x="116" y="34" width="36" height="42" rx="3"/>
        <path d="M44 55 H62 M98 36 L116 55"/>
      </g>
      <path d="M44 55 H62 M98 36 L116 55" stroke="#ed765e" strokeWidth="2.5"/>
      <circle cx="26" cy="55" r="5" fill="#4656c8"/><circle cx="80" cy="36" r="5" fill="#ed765e"/><circle cx="134" cy="55" r="5" fill="#4656c8"/>
    </svg>
  );
  return (
    <svg viewBox="0 0 160 110" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeOpacity=".32">
        <path d="M8 82 L42 46 L72 64 L110 22 L150 38"/><path d="M8 94 L42 58 L72 76 L110 34 L150 50"/>
        <path d="M8 70 L42 34 L72 52 L110 10 L150 26"/>
      </g>
      <path d="M8 82 L42 46 L72 64 L110 22 L150 38" fill="none" stroke="#ed765e" strokeWidth="2" strokeDasharray="3 4"/>
      <circle cx="110" cy="22" r="5" fill="#4656c8"/><circle cx="72" cy="64" r="4" fill="#ed765e"/>
    </svg>
  );
}

function SystemStrip({ sequence }) {
  return (
    <div className="system-strip" aria-label={sequence.join(' then ')}>
      <div className="strip-track"><span className="strip-line" /></div>
      {sequence.map((item,i)=><div className="strip-step" key={item}><span className="strip-index">0{i+1}</span><span>{item}</span></div>)}
    </div>
  );
}

export default function CaseStudies() {
  return (
    <section id="work" aria-labelledby="work-heading" className="portfolio-section">
      <div className="work-heading" data-reveal="rise">
        <div><p className="eyebrow">Selected explorations / 2024—26</p><h2 id="work-heading">Ideas made<br/><em>operational.</em></h2></div>
        <p>Different problems. A shared instinct to understand the system underneath.</p>
      </div>
      <div className="work-ledger">
        {projects.map((project)=>{
          const note=notes[project.id];
          return (
            <article className={`work-entry work-entry-${note.mark}`} key={project.id} data-reveal="rise">
              <div className="entry-index"><span>{note.number}</span><ProjectGlyph mark={note.mark}/><i>{note.type}</i></div>
              <div className="entry-main">
                <div className="entry-title-row"><h3>{project.title}</h3><span className="entry-stage">{project.stage}</span></div>
                <p className="entry-question">{note.question}</p>
                <SystemStrip sequence={note.sequence}/>
              </div>
              <div className="entry-side"><p>{project.summary}</p><a href={project.links[0].href} target="_blank" rel="noreferrer" aria-label={`${project.links[0].label}: ${project.title}`}>{project.links[0].label}<span aria-hidden="true"> ↗</span></a></div>
            </article>
          );
        })}
      </div>
      <p className="work-footnote"><span>HONEST STATUS</span> Pilots, prototypes and work in progress are labelled as they are.</p>
    </section>
  );
}
