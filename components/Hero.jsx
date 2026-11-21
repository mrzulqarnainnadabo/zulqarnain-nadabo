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
            <a href="#approach">Approach</a>
            <a href="#contact">Contact</a>
            <ThemeToggle />
          </div>
        </nav>
        <div id="top" className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">Systems architecture <span>·</span> Research <span>·</span> Digital technology</p>
            <p className="hero-name">{person.name}</p>
            <h1>Making complex systems <em>work better.</em></h1>
            <p className="hero-description">I work across research, institutional architecture and digital technology to turn complex challenges into practical, well-structured systems.</p>
            <div className="hero-bottom">
              <a href="#work" className="hero-cta">Explore selected work <span aria-hidden="true">↓</span></a>
              <span className="hero-time"><LocalTime place={person.location} /></span>
            </div>
          </div>
          <div className="hero-art" data-reveal="fade-left">
            <EvidenceField />
          </div>
        </div>
        <div className="hero-index" data-reveal="fade-up">
          <span>01 — Research & spatial intelligence</span>
          <span>02 — Institutional architecture</span>
          <span>03 — Digital systems & products</span>
        </div>
      </div>
    </header>
  );
}
