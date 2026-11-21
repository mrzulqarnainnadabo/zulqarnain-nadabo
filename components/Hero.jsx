import LocalTime from './LocalTime';
import ThemeToggle from './ThemeToggle';
import { person } from '@/lib/content';

function FieldGraphic() {
  return (
    <div className="field-graphic" aria-label="An abstract spatial systems study">
      <div className="field-topline"><span>FIELD STUDY / 001</span><span>PEOPLE · PLACE · SYSTEMS</span></div>
      <svg viewBox="0 0 680 570" role="img" aria-label="Layered topographic contours and connected evidence points">
        <defs>
          <linearGradient id="fieldWash" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#e8e3d6"/><stop offset="1" stopColor="#c7c8b4"/></linearGradient>
          <clipPath id="fieldClip"><rect x="18" y="18" width="644" height="534" rx="3"/></clipPath>
        </defs>
        <g clipPath="url(#fieldClip)">
          <rect x="18" y="18" width="644" height="534" fill="url(#fieldWash)"/>
          <g fill="none" stroke="#65766a" strokeWidth="1.15" opacity=".48">
            <path d="M-20 95 C80 20 148 35 218 94 S350 180 430 110 560 14 710 68"/>
            <path d="M-20 125 C78 51 154 63 220 120 S354 205 440 140 570 47 710 98"/>
            <path d="M-20 158 C82 82 158 95 224 150 S358 237 448 172 580 79 710 130"/>
            <path d="M-20 193 C86 116 164 129 230 185 S364 272 456 206 590 114 710 164"/>
            <path d="M-20 228 C90 151 170 166 236 220 S370 308 464 242 600 149 710 199"/>
            <path d="M-20 265 C94 187 176 202 242 257 S376 345 472 278 610 185 710 236"/>
            <path d="M-20 304 C98 226 182 241 248 296 S382 384 480 316 620 224 710 274"/>
            <path d="M-20 345 C102 266 188 282 254 336 S388 425 488 355 630 263 710 314"/>
            <path d="M-20 386 C106 307 194 323 260 377 S394 466 496 396 640 303 710 354"/>
            <path d="M-20 430 C110 350 200 367 266 420 S400 510 504 438 650 346 710 396"/>
            <path d="M-20 474 C114 393 206 411 272 463 S406 554 512 481 660 390 710 440"/>
            <path d="M-20 518 C118 437 212 455 278 506 S412 596 520 523 670 432 710 482"/>
          </g>
          <g fill="none" stroke="#a67b4d" strokeWidth="1.6" opacity=".8">
            <path d="M90 480 C160 420 190 350 280 326 S410 340 465 250 520 155 610 112"/>
            <path d="M78 492 C152 434 182 364 274 340 S402 354 452 266 512 170 596 126"/>
          </g>
          <path d="M95 422 L218 338 L318 366 L425 246 L550 190" fill="none" stroke="#253e32" strokeWidth="2.2" strokeDasharray="5 7"/>
          <g fill="#253e32" stroke="#f4f0e5" strokeWidth="4">
            <circle cx="95" cy="422" r="8"/><circle cx="218" cy="338" r="8"/><circle cx="318" cy="366" r="8"/><circle cx="425" cy="246" r="8"/><circle cx="550" cy="190" r="8"/>
          </g>
          <g fontFamily="Arial, sans-serif" fontSize="10" letterSpacing="1.5" fill="#334b3c">
            <text x="42" y="454">COMMUNITY</text><text x="176" y="310">SIGNAL</text><text x="286" y="397">EVIDENCE</text><text x="393" y="220">PATTERN</text><text x="526" y="164">RESPONSE</text>
          </g>
          <g transform="translate(486 370)">
            <circle r="73" fill="#f1eee4" fillOpacity=".7" stroke="#8e9b83" strokeWidth="1"/>
            <circle r="53" fill="none" stroke="#8e9b83" strokeWidth="1" strokeDasharray="3 5"/>
            <circle r="31" fill="none" stroke="#8e9b83" strokeWidth="1"/>
            <path d="M-80 0H80 M0 -80V80" stroke="#8e9b83" strokeWidth=".8" opacity=".6"/>
            <circle r="5" fill="#a67b4d"/>
          </g>
          <g fill="#253e32" opacity=".78"><rect x="42" y="42" width="84" height="3"/><rect x="42" y="50" width="46" height="2"/></g>
        </g>
      </svg>
      <div className="field-caption"><span>Reading the conditions beneath the surface.</span><span>01 — 04</span></div>
      <div className="field-note"><span className="field-note-mark">↗</span><div><b>From observation</b><small>to systems that can be understood, tested and improved.</small></div></div>
    </div>
  );
}

export default function Hero() {
  return (
    <header className="hero-shell">
      <div className="hero-frame">
        <nav aria-label="Primary" className="hero-nav">
          <a href="#top" className="personal-wordmark"><span className="wordmark-initials">ZN</span><span className="wordmark-name">{person.name}</span><i>Independent practice</i></a>
          <div className="hero-nav-right">
            <a href="#work">Selected work</a><a href="#approach">Approach</a><a href="#contact">Contact</a><ThemeToggle />
          </div>
        </nav>
        <div id="top" className="hero-grid">
          <div className="hero-copy">
            <p className="hero-indexline"><span>RESEARCH · SPATIAL INTELLIGENCE</span><span>BASED IN NIGERIA</span></p>
            <p className="hero-name">{person.name}</p>
            <h1>Making sense<br/>of <em>complexity.</em></h1>
            <p className="hero-description">I work across research, institutional architecture and digital technology to turn complex challenges into practical, well-structured systems.</p>
            <div className="hero-bottom">
              <a href="#work" className="hero-cta"><span className="hero-cta-mark" aria-hidden="true">↗</span><span>Explore selected work</span></a>
              <span className="hero-time"><LocalTime place={person.location} /></span>
            </div>
            <div className="hero-disciplines"><span>01 / Research</span><span>02 / Institutional design</span><span>03 / Digital systems</span></div>
          </div>
          <div className="hero-art" data-reveal="fade-left"><FieldGraphic /></div>
        </div>
        <div className="hero-index"><span>Independent systems practice<br/>Grounded in people, place and evidence.</span><span className="hero-scroll">Scroll to explore <b aria-hidden="true">↓</b></span><span className="hero-count">PORTFOLIO / 2026</span></div>
      </div>
    </header>
  );
}
