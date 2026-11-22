import WorldCanvas from './WorldCanvas';

export default function Hero() {
  return (
    <header className="atlas-hero" id="top">
      <div className="atlas-frame">
        <nav className="atlas-nav" aria-label="Main navigation">
          <a className="atlas-monogram" href="#top" aria-label="Zulqarnain Yusuf Nadabo home">ZN<span>°</span></a>
          <div className="atlas-nav-links">
            <a href="#living-atlas">Atlas</a>
            <a href="#iseyc">ISEYC</a>
            <a href="#work">Work</a>
            <a href="#contact">Connect <span>↗</span></a>
          </div>
        </nav>
        <div className="atlas-hero-grid">
          <div className="atlas-copy">
            <p className="atlas-kicker"><span className="atlas-pulse" /> SYSTEMS ARCHITECTURE / RESEARCH / SPATIAL INTELLIGENCE <span>— 2026</span></p>
            <p className="atlas-name">Zulqarnain Yusuf Nadabo</p>
            <h1>Making<br/>complex<br/>systems work<br/><em>better.</em></h1>
            <p className="atlas-subline">I work across research, institutional architecture and digital technology to turn complex challenges into practical, well-structured systems.</p>
            <a className="atlas-enter" href="#work"><span>Explore the work</span><b>↘</b></a>
          </div>
          <div className="atlas-visual">
            <WorldCanvas />
          </div>
        </div>
        <div className="atlas-footerline">
          <span>INSTITUTIONAL DESIGN / SPATIAL INTELLIGENCE / DIGITAL SYSTEMS</span>
          <span>BASED IN NIGERIA <i>·</i> WORKING ACROSS DISCIPLINES</span>
        </div>
      </div>
    </header>
  );
}
