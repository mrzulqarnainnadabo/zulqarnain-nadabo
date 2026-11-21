import LocalTime from './LocalTime';
import ThemeToggle from './ThemeToggle';
import EvidenceField from './EvidenceField';
import { person } from '@/lib/content';

export default function Hero() {
  return (
    <header className="hero-shell">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <nav aria-label="Primary" className="hero-nav">
          <a href="#top" className="hero-wordmark">ZYN<span>.</span></a>
          <div className="hero-nav-right">
            <a href="#work">Work</a>
            <a href="#leadership">Perspective</a>
            <a href="#contact">Contact</a>
            <ThemeToggle />
          </div>
        </nav>
        <div id="top" className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">Institutional architecture <span>·</span> Digital systems <span>·</span> Nigeria</p>
            <p className="hero-name">{person.name}</p>
            <h1>Building the systems behind <em>meaningful work.</em></h1>
            <p className="hero-description">I turn complex institutional problems into clear structures, useful technology and accountable work.</p>
            <div className="hero-bottom">
              <a href="#work" className="hero-cta">Explore selected work <span aria-hidden="true">↓</span></a>
              <span className="hero-time"><LocalTime place={person.location} /></span>
            </div>
          </div>
          <div className="hero-art">
            <EvidenceField />
          </div>
        </div>
        <div className="hero-index">
          <span>01 — Civic leadership / ISEYC</span>
          <span>02 — Enterprise leadership / Hubil Group</span>
          <span>03 — Research / Spatial intelligence</span>
        </div>
      </div>
    </header>
  );
}
