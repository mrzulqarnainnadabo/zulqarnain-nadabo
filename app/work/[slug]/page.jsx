import Link from "next/link";
import { notFound } from "next/navigation";
import { work } from "@/lib/portfolio-work";

export function generateStaticParams() {
  return work.map(item => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = work.find(entry => entry.slug === slug);
  if (!item) return { title: "Work not found" };
  return {
    title: item.title,
    description: item.short,
    openGraph: { title: item.title, description: item.short, type: "article" }
  };
}

export default async function WorkDetail({ params }) {
  const { slug } = await params;
  const item = work.find(entry => entry.slug === slug);
  if (!item) notFound();

  return (
    <div className="portfolio-site case-page">
      <header className="case-header">
        <div className="portfolio-container nav-inner">
          <Link className="portfolio-wordmark" href="/">ZN<span> / </span></Link>
          <nav aria-label="Case study navigation">
            <Link href="/#work">Selected work</Link>
            <Link href="/#approach">Approach</Link>
            <Link className="nav-contact" href="/#contact">Contact ↗</Link>
          </nav>
          <details className="portfolio-mobile-menu">
            <summary>Menu <span aria-hidden="true">+</span></summary>
            <div className="portfolio-mobile-panel">
              <Link href="/#work">Selected work</Link>
              <Link href="/#approach">Approach</Link>
              <Link href="/#about">About</Link>
              <Link href="/#contact">Contact ↗</Link>
            </div>
          </details>
        </div>
      </header>
      <main id="main" className="case-article portfolio-container">
        <Link className="case-back" href="/#work">← Back to selected work</Link>
        <p className="eyebrow case-category">{item.category} <span>·</span> {item.number}</p>
        <h1>{item.title}</h1>
        <p className="case-lede">{item.thesis}</p>
        <div className="case-meta">
          <div><span>PROJECT STATUS</span><strong>{item.status}</strong></div>
          <div><span>MY CONTRIBUTION</span><strong>{item.role}</strong></div>
        </div>
        <div className="case-diagram">
          <div className="case-diagram-line" />
          {item.diagram.map((step,index) => <div className="case-diagram-step" key={step}><span>{String(index+1).padStart(2,"0")}</span><strong>{step}</strong></div>)}
        </div>
        <div className="case-content">
          {item.sections.map((section,index) => (
            <section className="case-section" key={section.heading}>
              <span className="case-section-index">{String(index+1).padStart(2,"0")}</span>
              <div><h2>{section.heading}</h2>{section.body && <p>{section.body}</p>}{section.bullets && <ul>{section.bullets.map(line=><li key={line}>{line}</li>)}</ul>}</div>
            </section>
          ))}
          <section className="case-section case-limits">
            <span className="case-section-index">!</span>
            <div><h2>Evidence &amp; limits</h2><ul>{item.limits.map(line=><li key={line}>{line}</li>)}</ul></div>
          </section>
        </div>
        <div className="case-references">
          <div><p className="eyebrow">PROJECT REFERENCES</p><h2>Explore the work</h2></div>
          <div className="case-reference-links">{item.links.map(link=><a href={link.href} target="_blank" rel="noreferrer" key={link.href}>{link.label} <span>↗</span></a>)}</div>
        </div>
      </main>
      <footer className="portfolio-footer"><div className="portfolio-container footer-inner"><Link className="portfolio-wordmark" href="/">ZN<span> / </span></Link><p>Zulqarnain Yusuf Nadabo · Systems Architect &amp; Technical Builder</p><Link href="/#work">More work ↑</Link></div></footer>
    </div>
  );
}
