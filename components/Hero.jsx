import WorldCanvas from './WorldCanvas';

export default function Hero() {
  return (
    <header className="atlas-hero" id="top">
      <div className="atlas-frame">
        <nav className="atlas-nav" aria-label="Main navigation">
          <a className="atlas-monogram" href="#top" aria-label="Zulqarnain Yusuf Nadabo home">ZN<span>°</span></a>
          <div className="atlas-nav-links">
            <a href="#work">Selected work</a>
            <a href="#living-atlas">Living Atlas</a>
            <a href="#iseyc">ISEYC</a>
            <a href="#hubil">Hubil</a>
            <a className="atlas-nav-contact" href="#contact">Contact <span aria-hidden="true">↗</span></a>
          </div>
          <details className="atlas-mobile-menu">
            <summary>Explore <span aria-hidden="true">+</span></summary>
            <div className="atlas-mobile-menu-panel">
              <a href="#work">Selected work</a>
              <a href="#living-atlas">Living Atlas</a>
              <a href="#iseyc">ISEYC architecture</a>
              <a href="#hubil">Hubil systems</a>
              <a href="#contact">Contact ↗</a>
            </div>
          </details>
        </nav>
        <div className="atlas-hero-grid">
          <div className="atlas-copy">
            <p className="atlas-kicker"><span className="atlas-pulse" /> INSTITUTIONAL DESIGN / SPATIAL INTELLIGENCE / DIGITAL SYSTEMS</p>
            <p className="atlas-name">Zulqarnain Yusuf Nadabo <span>— Nigeria</span></p>
            <h1>I design the<br/>systems behind<br/><em>change.</em></h1>
            <p className="atlas-subline">I turn complex challenges into practical, evidence-led systems — across institutions, spatial research and digital products.</p>
            <a className="atlas-enter" href="#work"><span>Explore selected work</span><b aria-hidden="true">↘</b></a>
            <p className="atlas-hero-note">STRATEGY / ARCHITECTURE / BUILD / EVIDENCE</p>
          </div>
          <div className="atlas-visual">
            <div className="atlas-visual-label atlas-visual-label-top"><span>01 / SPATIAL INTELLIGENCE</span><span>LIVE MODEL</span></div>
            <WorldCanvas />
            <div className="atlas-visual-label atlas-visual-label-bottom"><span>GLOBAL → LOCAL</span><span>PLACE / SCALE / EVIDENCE</span></div>
          </div>
        </div>
        <div className="atlas-footerline">
          <span>INSTITUTIONAL ARCHITECTURE <i>·</i> SPATIAL RESEARCH <i>·</i> DIGITAL SYSTEMS</span>
          <span>BASED IN NIGERIA <i>·</i> OPEN TO COLLABORATION</span>
        </div>
      </div>
    </header>
  );
}
