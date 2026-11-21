import LocalTime from './LocalTime';
import ThemeToggle from './ThemeToggle';
import { person } from '@/lib/content';

function SystemDrawing() {
  return (
    <div className="system-drawing" aria-label="Abstract system architecture drawing">
      <div className="drawing-meta"><span>FIELD NOTES / 001</span><span>STRUCTURE STUDY</span></div>
      <svg viewBox="0 0 620 520" role="img" aria-labelledby="drawing-title drawing-desc">
        <title id="drawing-title">A system taking shape</title>
        <desc id="drawing-desc">An abstract architectural drawing showing connected layers, decision points and pathways.</desc>
        <defs>
          <pattern id="draft-grid" width="26" height="26" patternUnits="userSpaceOnUse"><path d="M26 0H0V26" fill="none" stroke="currentColor" strokeOpacity=".12" strokeWidth=".7"/></pattern>
          <linearGradient id="draft-line" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#d8b66f"/><stop offset="1" stopColor="#8fa397"/></linearGradient>
        </defs>
        <rect width="620" height="520" fill="url(#draft-grid)"/>
        <g className="drawing-contours" fill="none" stroke="currentColor" strokeOpacity=".22">
          <path d="M-30 105C90 15 174 26 245 96s130 76 206 10 122-76 214-34"/>
          <path d="M-30 125C90 35 174 46 245 116s130 76 206 10 122-76 214-34"/>
          <path d="M-30 145C90 55 174 66 245 136s130 76 206 10 122-76 214-34"/>
          <path d="M-30 165C90 75 174 86 245 156s130 76 206 10 122-76 214-34"/>
          <path d="M-30 355C80 275 165 280 230 335s145 82 224 20 115-68 196-25"/>
          <path d="M-30 375C80 295 165 300 230 355s145 82 224 20 115-68 196-25"/>
        </g>
        <g fill="none" stroke="url(#draft-line)" strokeWidth="1.7">
          <path className="drawing-route" d="M76 372L174 292L270 326L362 204L470 238L548 112"/>
          <path d="M174 292L168 174L270 126L362 204" strokeDasharray="4 7"/>
          <path d="M270 326L276 430L414 430L470 238" strokeDasharray="4 7"/>
          <path d="M362 204L430 92L548 112" strokeDasharray="4 7"/>
        </g>
        <g className="drawing-nodes">
          {[[76,372],[174,292],[270,326],[362,204],[470,238],[548,112],[168,174],[270,126],[276,430],[414,430],[430,92]].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r={i<6?7:4} fill="#14291f" stroke="#d8b66f" strokeWidth="1.8"/>{i===3&&<circle cx={x} cy={y} r="22" fill="none" stroke="#d8b66f" strokeDasharray="2 5"/>}</g>)}
        </g>
        <g className="drawing-labels" fill="currentColor" fontSize="10" letterSpacing="1.8">
          <text x="45" y="399">INPUT</text><text x="143" y="319">CONTEXT</text><text x="245" y="353">EVIDENCE</text><text x="335" y="180">DECISION</text><text x="445" y="266">ACTION</text><text x="516" y="88">OUTCOME</text>
        </g>
        <path d="M38 470H582" stroke="currentColor" strokeOpacity=".3"/>
        <text x="40" y="493" fill="currentColor" fontSize="9" letterSpacing="2">RELATIONSHIPS BEFORE INTERFACES</text>
        <text x="580" y="493" textAnchor="end" fill="currentColor" fontSize="9" letterSpacing="2">Nº 01</text>
      </svg>
      <div className="drawing-caption"><span>Observe the parts.</span><span>Design the relationships.</span></div>
    </div>
  );
}

export default function Hero() {
  return (
    <header className="hero-shell">
      <div className="hero-frame">
        <nav aria-label="Primary" className="hero-nav">
          <a href="#top" className="hero-wordmark">Z<span className="wordmark-slash">/</span>N</a>
          <div className="hero-nav-right">
            <a href="#work">Selected work <span>01</span></a>
            <a href="#approach">Method <span>02</span></a>
            <a href="#contact">Contact</a>
            <ThemeToggle />
          </div>
        </nav>
        <div id="top" className="hero-grid">
          <div className="hero-copy">
            <p className="hero-indexline"><span>INDEPENDENT PRACTICE</span><span>BASED IN NIGERIA · {person.role.toUpperCase()}</span></p>
            <p className="hero-name">{person.name}</p>
            <h1>Making sense<br/>of <em>complexity.</em></h1>
            <p className="hero-description">I study how systems behave, where they break, and how to redesign them so people can act with greater clarity.</p>
            <div className="hero-bottom">
              <a href="#work" className="hero-cta"><span>Explore the work</span><span aria-hidden="true">↘</span></a>
              <span className="hero-time"><LocalTime place={person.location} /></span>
            </div>
          </div>
          <div className="hero-art" data-reveal="fade-left"><SystemDrawing /></div>
        </div>
        <div className="hero-index">
          <span><b>01</b> Research & spatial intelligence</span>
          <span><b>02</b> Institutional architecture</span>
          <span><b>03</b> Digital systems & products</span>
        </div>
      </div>
    </header>
  );
}
