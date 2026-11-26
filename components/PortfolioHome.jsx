import Link from "next/link";
import { work, approach } from "@/lib/portfolio-work";

function SystemDiagram({ items }) {
  return (
    <div className="system-diagram" aria-label={items.join(" → ")}>
      <div className="diagram-track" aria-hidden="true" />
      {items.map((item, index) => (
        <div className="diagram-node" key={item}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{item}</strong>
        </div>
      ))}
    </div>
  );
}

function WorkRow({ item }) {
  return (
    <article className="work-row">
      <div className="work-row-index">
        <span>{item.number}</span>
        <small>{item.category}</small>
      </div>
      <div className="work-row-main">
        <div className="work-row-heading">
          <div>
            <h3><Link href={`/work/${item.slug}`}>{item.title}</Link></h3>
            <p>{item.short}</p>
          </div>
          <span className="work-status">{item.status}</span>
        </div>
        <SystemDiagram items={item.diagram} />
        <div className="work-row-bottom">
          <span>{item.role}</span>
          <Link className="text-link" href={`/work/${item.slug}`}>Read the case study <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </article>
  );
}

export default function PortfolioHome() {
  return (
    <div className="portfolio-site" id="top">
      <header className="portfolio-header">
        <div className="portfolio-container nav-inner">
          <a className="portfolio-wordmark" href="#top" aria-label="Zulqarnain Nadabo home">ZN<span> / </span></a>
          <nav aria-label="Main navigation">
            <a href="#work">Selected work</a>
            <a href="#approach">Approach</a>
            <a href="#about">About</a>
            <a className="nav-contact" href="#contact">Contact <span aria-hidden="true">↗</span></a>
          </nav>
          <details className="portfolio-mobile-menu">
            <summary>Menu <span aria-hidden="true">+</span></summary>
            <div className="portfolio-mobile-panel">
              <a href="/#work">Selected work</a>
              <a href="/#approach">Approach</a>
              <a href="/#about">About</a>
              <a href="/#contact">Contact ↗</a>
            </div>
          </details>
        </div>
      </header>

      <main>
        <section className="portfolio-hero">
          <div className="portfolio-container hero-layout">
            <div className="hero-text">
              <p className="eyebrow">SYSTEMS ARCHITECTURE · STRATEGY · TECHNICAL BUILD</p>
              <p className="hero-person">Zulqarnain Yusuf Nadabo <span>— Nigeria</span></p>
              <h1>I design and build systems for <em>complex, real-world problems.</em></h1>
              <p className="hero-summary">I work across institutional design, spatial research and digital products—turning difficult challenges into clear structures, useful tools and accountable workflows.</p>
              <div className="hero-actions">
                <a className="primary-link" href="#work">Explore selected work <span aria-hidden="true">↓</span></a>
                <a className="secondary-link" href="#contact">Start a conversation <span aria-hidden="true">↗</span></a>
              </div>
            </div>
            <div className="hero-visual" aria-label="A simple model of how I work">
              <div className="visual-topline"><span>FROM PROBLEM TO PRACTICE</span><span>01—04</span></div>
              <div className="visual-stack">
                <div className="stack-orbit orbit-one" />
                <div className="stack-orbit orbit-two" />
                <div className="stack-core"><span>THE SYSTEM</span><strong>People<br/>· Place<br/>· Evidence</strong></div>
                <div className="stack-label label-a"><span>01</span> Understand</div>
                <div className="stack-label label-b"><span>02</span> Structure</div>
                <div className="stack-label label-c"><span>03</span> Build</div>
                <div className="stack-label label-d"><span>04</span> Verify</div>
              </div>
              <p className="visual-caption">A disciplined route from understanding the problem to testing the result.</p>
            </div>
          </div>
          <div className="portfolio-container hero-bottomline">
            <span>INSTITUTIONAL SYSTEMS</span><i />
            <span>SPATIAL INTELLIGENCE</span><i />
            <span>DIGITAL PRODUCTS</span>
          </div>
        </section>

        <section className="work-section portfolio-container" id="work">
          <div className="section-heading">
            <div><p className="eyebrow">SELECTED WORK · 2024—2026</p><h2>Built around<br/><em>real problems.</em></h2></div>
            <p>Each project explains the problem, the system design, the decisions behind it and what has—and has not—been verified.</p>
          </div>
          <div className="work-list">{work.map(item => <WorkRow key={item.slug} item={item} />)}</div>
        </section>

        <section className="approach-section" id="approach">
          <div className="portfolio-container">
            <div className="section-heading approach-heading">
              <div><p className="eyebrow">HOW I WORK</p><h2>Clarity before<br/><em>complexity.</em></h2></div>
              <p>I combine strategic thinking with hands-on building. The method stays simple: understand the context, design the operating logic, build the tools and verify the result.</p>
            </div>
            <div className="approach-grid">
              {approach.map(step => (
                <article className="approach-step" key={step.number}>
                  <span>{step.number}</span><h3>{step.title}</h3><p>{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section portfolio-container" id="about">
          <div className="about-label"><p className="eyebrow">ABOUT</p><span>STRATEGY + BUILD</span></div>
          <div className="about-copy">
            <h2>Think clearly.<br/>Build responsibly.</h2>
            <p>My background in Geography and Sustainability Studies shapes how I work with place, evidence and the systems around people. I bring that perspective into institutional architecture, research and digital product development.</p>
            <p>I am most useful where a challenge needs both a strategic view and someone willing to work through the details of making the solution function.</p>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="portfolio-container contact-layout">
            <div><p className="eyebrow">CONTACT</p><h2>Have a complex problem<br/>worth making clearer?</h2><p>For institutional design, research, digital systems and practical collaboration.</p></div>
            <div className="contact-links">
              <a href="mailto:iseycglobal@gmail.com">iseycglobal@gmail.com <span>↗</span></a>
              <a href="https://www.linkedin.com/in/amb-zulqarnain-yusuf-9b04b0124/" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a>
              <a href="https://github.com/mrzulqarnainnadabo" target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
              <a href="https://x.com/nain_nadabo" target="_blank" rel="noreferrer">X / @nain_nadabo <span>↗</span></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="portfolio-footer">
        <div className="portfolio-container footer-inner">
          <a className="portfolio-wordmark" href="#top">ZN<span> / </span></a>
          <p>Zulqarnain Yusuf Nadabo <span>·</span> Systems Architect &amp; Technical Builder</p>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}
