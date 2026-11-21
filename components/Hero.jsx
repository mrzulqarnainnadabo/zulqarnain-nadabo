import LocalTime from './LocalTime';
import ThemeToggle from './ThemeToggle';
import { person } from '@/lib/content';

export default function Hero() {
  return (
    <header className="hero-shell">
      <div className="hero-frame">
        <nav aria-label="Primary" className="hero-nav">
          <a href="#top" className="hero-brand">
            <img src="/iseyc-seal.svg" alt="ISEYC official seal" />
            <span>ISEYC</span>
            <i aria-hidden="true" />
            <small>{person.role}</small>
          </a>
          <div className="hero-nav-right">
            <a href="#work">Work</a>
            <a href="#approach">About</a>
            <a href="#journal">Journal</a>
            <a href="#contact">Contact</a>
            <ThemeToggle />
          </div>
        </nav>
        <div id="top" className="hero-grid">
          <div className="hero-copy">
            <p className="hero-indexline"><span>INDEPENDENT PRACTICE</span><span>BASED IN NIGERIA</span></p>
            <h1>Systems<br /><em>Architect</em></h1>
            <p className="hero-description">Designing solutions at the intersection of people, data and possibility.</p>
            <div className="hero-bottom">
              <a href="#work" className="hero-cta"><span className="hero-cta-mark" aria-hidden="true">↗</span><span>Explore my work</span></a>
              <span className="hero-time"><LocalTime place={person.location} /></span>
            </div>
          </div>
          <div className="hero-art" data-reveal="fade-left">
            <img className="hero-portrait" src="/hero-office.svg" alt="Zulqarnain seated at his desk in a professional office" />
            <div className="hero-affiliation"><span>ISEYC</span><small>Youth-led public intelligence institution for Nigeria</small></div>
          </div>
        </div>
        <div className="hero-index">
          <span>Empowering Youth.<br />Shaping Communities.</span>
          <span className="hero-scroll">Scroll to explore <b aria-hidden="true">↓</b></span>
          <span className="hero-count">01 / 04</span>
        </div>
      </div>
    </header>
  );
}
