import { projects } from '@/lib/content';

const notes = {
  'civic-infrastructure': { number: '01', type: 'PUBLIC INFORMATION SYSTEM', question: 'How can community experience become accountable public information?', sequence: ['Community record', 'Evidence review', 'Published insight'], mark: 'civic' },
  observatory: { number: '02', type: 'RESEARCH & SPATIAL INTELLIGENCE', question: 'How do we connect observations to their sources, places and limits?', sequence: ['Source registry', 'Geographic context', 'Evidence brief'], mark: 'observatory' },
  firstline: { number: '03', type: 'BUSINESS OPERATING SYSTEM', question: 'How can an early conversation reveal what a business actually needs?', sequence: ['Capture', 'Diagnose', 'Route'], mark: 'firstline' },
  'sigma-geo': { number: '04', type: 'AI EVALUATION RESEARCH', question: 'Can a model recognise when geographical evidence does not hold together?', sequence: ['Provenance', 'Spatial fit', 'Confidence'], mark: 'sigma' },
};

function SystemStrip({ sequence, mark }) {
  return (
    <div className={`system-strip system-strip-${mark}`} aria-label={sequence.join(' then ')}>
      <div className="strip-track"><span className="strip-line" /></div>
      {sequence.map((item, i) => <div className="strip-step" key={item}><span className="strip-index">0{i + 1}</span><span>{item}</span></div>)}
    </div>
  );
}

export default function CaseStudies() {
  return (
    <section id="work" aria-labelledby="work-heading" className="portfolio-section">
      <div className="work-heading" data-reveal="rise">
        <div><p className="eyebrow">A selection / 2024—26</p><h2 id="work-heading">Work in<br/><em>formation.</em></h2></div>
        <p>Different contexts. One recurring question: what would make this system work better?</p>
      </div>
      <div className="work-ledger">
        {projects.map((project) => {
          const note = notes[project.id];
          return (
            <article className={`work-entry work-entry-${note.mark}`} key={project.id} data-reveal="rise">
              <div className="entry-index"><span>{note.number}</span><i>{note.type}</i></div>
              <div className="entry-main">
                <div className="entry-title-row"><h3>{project.title}</h3><span className="entry-stage">{project.stage}</span></div>
                <p className="entry-question">{note.question}</p>
                <SystemStrip sequence={note.sequence} mark={note.mark}/>
              </div>
              <div className="entry-side"><p>{project.summary}</p><a href={project.links[0].href} target="_blank" rel="noreferrer" aria-label={`${project.links[0].label}: ${project.title}`}>{project.links[0].label}<span aria-hidden="true"> ↗</span></a></div>
            </article>
          );
        })}
      </div>
      <p className="work-footnote"><span>NOTE</span> Project stages are stated as they are. Prototypes and pilots are not presented as completed outcomes.</p>
    </section>
  );
}
