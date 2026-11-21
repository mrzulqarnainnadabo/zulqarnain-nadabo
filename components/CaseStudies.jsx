import { projects } from '@/lib/content';

function CivicArtwork() {
  return (
    <svg viewBox="0 0 600 260" className="project-svg civic-diagram" aria-hidden="true">
      <defs>
        <pattern id="civic-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="currentColor" strokeOpacity=".12" />
        </pattern>
      </defs>
      <rect width="600" height="260" fill="url(#civic-grid)" />
      <g className="diagram-lines" fill="none" stroke="#c9a85e" strokeWidth="1.5">
        <path d="M72 128H528" />
        <path d="M165 128V78H268M365 128V180H468" strokeDasharray="4 6" />
      </g>
      {[
        { x: 72, label: 'REPORT', sub: '01' },
        { x: 268, label: 'REVIEW', sub: '02' },
        { x: 528, label: 'PUBLISHED', sub: '03' },
      ].map((node) => (
        <g key={node.label}>
          <circle cx={node.x} cy="128" r="19" fill="#173528" stroke="#c9a85e" strokeWidth="1.5" />
          <circle cx={node.x} cy="128" r="4" fill="#c9a85e" />
          <text x={node.x} y="91" textAnchor="middle" fill="currentColor" fontSize="10" letterSpacing="2">{node.sub}</text>
          <text x={node.x} y="171" textAnchor="middle" fill="currentColor" fontSize="10" letterSpacing="1.5">{node.label}</text>
        </g>
      ))}
      <g fill="#c9a85e" fontSize="9" letterSpacing="1.5">
        <text x="165" y="55" textAnchor="middle">EVIDENCE CHECK</text>
        <text x="416" y="211" textAnchor="middle">PUBLIC RECORD</text>
      </g>
      <g stroke="currentColor" strokeOpacity=".2" fill="none">
        <path d="M30 226H570" />
        <path d="M30 220V232M570 220V232" />
      </g>
    </svg>
  );
}

function ObservatoryArtwork() {
  return (
    <svg viewBox="0 0 600 260" className="project-svg observatory-diagram" aria-hidden="true">
      <defs>
        <pattern id="obs-grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M30 0H0V30" fill="none" stroke="currentColor" strokeOpacity=".12" />
        </pattern>
      </defs>
      <rect width="600" height="260" fill="url(#obs-grid)" />
      <g className="map-contours" fill="none" stroke="#536e5b" strokeWidth="1.2" strokeOpacity=".55">
        <path d="M-20 52C70 4 126 106 214 65S354 15 430 70 542 94 630 35" />
        <path d="M-20 78C70 30 126 132 214 91S354 41 430 96 542 120 630 61" />
        <path d="M-20 104C70 56 126 158 214 117S354 67 430 122 542 146 630 87" />
        <path d="M-20 174C80 126 128 226 238 180S386 140 470 188 558 204 630 160" />
      </g>
      <g className="diagram-lines" fill="none" stroke="#b18a3f" strokeWidth="1.6">
        <path d="M95 160L205 112L318 145L424 82L516 112" />
        <path d="M205 112L226 52M318 145L342 218M424 82L462 35" strokeDasharray="3 6" />
      </g>
      {[[95,160],[205,112],[318,145],[424,82],[516,112]].map(([x,y],i) => (
        <g key={i}><circle cx={x} cy={y} r="7" fill="#b18a3f" /><circle cx={x} cy={y} r="15" fill="none" stroke="#b18a3f" strokeOpacity=".35" /></g>
      ))}
      <g fill="#354c3e" fontSize="9" letterSpacing="1.6">
        <text x="66" y="190">PLACE</text><text x="183" y="91">SOURCE</text>
        <text x="291" y="174">OBSERVE</text><text x="401" y="61">VERIFY</text>
      </g>
      <g transform="translate(452 202)" fill="none" stroke="#b18a3f">
        <circle r="19" /><path d="M-27 0H27M0 -27V27" />
      </g>
    </svg>
  );
}

function FirstLineArtwork() {
  return (
    <svg viewBox="0 0 600 260" className="project-svg firstline-diagram" aria-hidden="true">
      <g fill="none" stroke="#59735d" strokeWidth="1">
        <path d="M35 42H565M35 218H565" strokeOpacity=".3" />
        <path d="M35 42V218M565 42V218" strokeOpacity=".3" />
        <path d="M120 42V218M300 42V218M480 42V218" strokeDasharray="3 7" strokeOpacity=".35" />
      </g>
      {[
        { x: 120, n: '01', title: 'CAPTURE', detail: 'Context' },
        { x: 300, n: '02', title: 'DIAGNOSE', detail: 'Needs' },
        { x: 480, n: '03', title: 'ROUTE', detail: 'Next step' },
      ].map((item) => (
        <g key={item.n}>
          <rect x={item.x-62} y="77" width="124" height="104" rx="3" fill="#dce3d6" stroke="#59735d" />
          <text x={item.x-43} y="101" fill="#7a6030" fontSize="10" letterSpacing="1.5">{item.n}</text>
          <text x={item.x-43} y="130" fill="#173528" fontSize="13" fontWeight="600" letterSpacing="1">{item.title}</text>
          <path d={`M${item.x-43} 145H${item.x+43}`} stroke="#8c9a89" />
          <text x={item.x-43} y="164" fill="#536157" fontSize="10">{item.detail}</text>
        </g>
      ))}
      <path className="firstline-flow" d="M182 129H238M362 129H418" fill="none" stroke="#a17d38" strokeWidth="2" />
      <g fill="#a17d38"><path d="M232 124L239 129L232 134Z" /><path d="M412 124L419 129L412 134Z" /></g>
      <text x="300" y="205" textAnchor="middle" fill="#536157" fontSize="9" letterSpacing="2">A STRUCTURED FIRST CONVERSATION</text>
    </svg>
  );
}

function SigmaArtwork() {
  return (
    <svg viewBox="0 0 600 260" className="project-svg sigma-diagram" aria-hidden="true">
      <defs>
        <pattern id="sigma-grid" width="22" height="22" patternUnits="userSpaceOnUse">
          <path d="M22 0H0V22" fill="none" stroke="currentColor" strokeOpacity=".12" />
        </pattern>
      </defs>
      <rect width="600" height="260" fill="url(#sigma-grid)" />
      <g transform="translate(58 35)">
        <path d="M0 0H300V178H0Z" fill="none" stroke="#d4b46d" strokeOpacity=".55" />
        {Array.from({length:5},(_,i)=><path key={i} d={`M0 ${i*44}H300`} stroke="currentColor" strokeOpacity=".16" />)}
        {Array.from({length:7},(_,i)=><path key={i} d={`M${i*50} 0V178`} stroke="currentColor" strokeOpacity=".16" />)}
        <path className="sigma-trace" d="M0 140L48 126L96 130L146 72L194 89L244 38L300 50" fill="none" stroke="#d4b46d" strokeWidth="2.5" />
        {[[0,140],[48,126],[96,130],[146,72],[194,89],[244,38],[300,50]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="4" fill="#d4b46d" />)}
        <circle cx="146" cy="72" r="17" fill="none" stroke="#d4b46d" strokeDasharray="3 4" />
      </g>
      <g transform="translate(408 53)">
        <text x="0" y="0" fill="#d4b46d" fontSize="10" letterSpacing="2">EVALUATION</text>
        {['SOURCE','LOCATION','CONSISTENCY','CONFIDENCE'].map((label,i)=>(
          <g key={label} transform={`translate(0 ${30+i*37})`}>
            <text x="0" y="0" fill="#e9e6dc" fontSize="9" letterSpacing="1.2">{label}</text>
            <rect x="0" y="10" width="128" height="4" fill="#e9e6dc" fillOpacity=".16" />
            <rect x="0" y="10" width={[92,68,108,54][i]} height="4" fill="#d4b46d" />
          </g>
        ))}
      </g>
      <text x="58" y="237" fill="#c2c9c0" fontSize="9" letterSpacing="2">SPATIAL EVIDENCE / MODEL TEST</text>
    </svg>
  );
}

function ProjectArtwork({ kind }) {
  if (kind === 'civic') return <CivicArtwork />;
  if (kind === 'observatory') return <ObservatoryArtwork />;
  if (kind === 'firstline') return <FirstLineArtwork />;
  return <SigmaArtwork />;
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
      <div className="section-intro" data-reveal="rise">
        <div>
          <p className="eyebrow">Selected work / 01—04</p>
          <h2 id="work-heading" className="display-heading">Ideas, made<br className="hidden sm:block" /> operational.</h2>
        </div>
        <p className="section-aside">Research, institutional design and digital systems — explored through work in progress.</p>
      </div>
      <div className="portfolio-grid">
        {projects.map((project, index) => (
          <article key={project.id} data-reveal="rise" className={`portfolio-card portfolio-card-${index + 1} portfolio-card-${artwork[project.id]}`}>
            <div className={`project-art project-art-${artwork[project.id]}`}>
              <div className="project-art-top">
                <span>{String(index + 1).padStart(2,'0')}</span>
                <span>{project.category}</span>
              </div>
              <ProjectArtwork kind={artwork[project.id]} />
              <span className="project-stage">{project.stage}</span>
            </div>
            <div className="project-copy">
              <div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
              </div>
              <a href={project.links[0].href} target="_blank" rel="noreferrer" aria-label={`Explore ${project.title}`}>
                Explore <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
