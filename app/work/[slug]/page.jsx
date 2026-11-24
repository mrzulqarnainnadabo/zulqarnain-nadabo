import Link from 'next/link';
import { notFound } from 'next/navigation';
import { caseStudies, getCaseStudy } from '@/lib/case-studies';

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.thesis,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: { title: study.title, description: study.thesis, type: 'article' }
  };
}

function Section({ number, label, heading, children }) {
  return (
    <section className="case-study-section" aria-labelledby={`case-${number}`}>
      <div className="case-study-section-index"><span>{number}</span><small>{label}</small></div>
      <div className="case-study-section-content">
        <h2 id={`case-${number}`}>{heading}</h2>
        {children}
      </div>
    </section>
  );
}

function BulletList({ items }) {
  return <ul className="case-study-list">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <main className="case-study-page" id="main">
      <header className="case-study-topbar">
        <Link href="/" className="case-study-wordmark">ZN<span>.</span></Link>
        <Link href="/#work" className="case-study-back">Selected systems <span aria-hidden="true">↗</span></Link>
      </header>
      <article>
        <header className="case-study-hero">
          <p className="case-study-eyebrow">{study.number} / {study.category}</p>
          <h1>{study.title}</h1>
          <p className="case-study-subtitle">{study.subtitle}</p>
          <div className="case-study-meta"><span>{study.stage}</span><span>Case study / systems architecture</span></div>
          <p className="case-study-thesis">{study.thesis}</p>
        </header>

        <div className="case-study-body">
          <Section number="01" label="THE PROBLEM" heading={study.problem.heading}>
            <p>{study.problem.body}</p>
            <BulletList items={study.problem.evidence} />
          </Section>
          <Section number="02" label="INVESTIGATION" heading={study.investigation.heading}>
            <p>{study.investigation.body}</p>
            <BulletList items={study.investigation.evidence} />
          </Section>
          <Section number="03" label="WHAT I DISCOVERED" heading={study.discovery.heading}>
            <p>{study.discovery.body}</p>
            <BulletList items={study.discovery.evidence} />
          </Section>
          <Section number="04" label="ARCHITECTURE" heading={study.architecture.heading}>
            <p>{study.architecture.body}</p>
            <div className="case-study-decisions">{study.architecture.decisions.map(([name, reason], index) => <div key={name}><span>0{index + 1}</span><div><h3>{name}</h3><p>{reason}</p></div></div>)}</div>
          </Section>
          <Section number="05" label="MY CONTRIBUTION" heading={study.contribution.heading}>
            <p>{study.contribution.body}</p>
            <BulletList items={study.contribution.items} />
          </Section>
          <Section number="06" label="VALIDATION" heading={study.validation.heading}>
            <p>{study.validation.body}</p>
            <div className="case-study-validation-grid">
              <div><h3>Checks and evidence</h3><BulletList items={study.validation.checks} /></div>
              <div><h3>Limitations</h3><BulletList items={study.validation.limitations} /></div>
            </div>
          </Section>
          <Section number="07" label="IMPACT" heading={study.impact.heading}>
            <p>{study.impact.body}</p>
            <div className="case-study-measures"><h3>What should be measured next</h3><BulletList items={study.impact.measures} /></div>
          </Section>
        </div>

        <footer className="case-study-footer">
          <div><span className="case-study-eyebrow">PROJECT REFERENCES</span><div className="case-study-links">{study.links.map((link) => <a href={link.url} key={link.url} target={link.url.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer">{link.label} <span aria-hidden="true">↗</span></a>)}</div></div>
          <Link href="/#work" className="case-study-next">Back to all systems <span aria-hidden="true">↑</span></Link>
        </footer>
      </article>
    </main>
  );
}
