import Link from 'next/link';
import { notFound } from 'next/navigation';
import { caseStudies, getCaseStudy } from '@/lib/case-studies';

const systemMaps = {
  hubil: {label:'Client delivery architecture',nodes:['FirstLine diagnostic','Client relationship','Scoped project','Delivery tasks','Handover & support'],caption:'One engagement, connected from first signal to completed delivery.'},
  iseyc: {label:'Institutional architecture',nodes:['Presidential Council','Four departments','Programmes & workplans','Shared evidence','Accountability & reporting'],caption:'Department ownership, shared institutional capabilities and human-governed decisions.'},
  mandate: {label:'Public record lifecycle',nodes:['Community report','Human review','Published record','Evidence reuse','Institutional response'],caption:'A report becomes public only after review; a published record is not proof of a completed response.'},
  brain: {label:'Evidence-to-answer architecture',nodes:['Question','Source retrieval','Evidence assessment','Qualified answer'],caption:'The answer layer interprets source records; it does not become the authority for them.'},
  observatory: {label:'Evidence infrastructure',nodes:['Source registry','Observation records','Geographic coverage','Accountability brief'],caption:'Every observation retains its source, period, geography and limitations.'},
  'kaduna-south': {label:'Grassroots coordination model',nodes:['Street representative','Line coordinator','Ward coordinator','Escalation & follow-up'],caption:'A proposed chain of responsibility, pending a field pilot.'},
  'sigma-geo': {label:'Spatial evaluation framework',nodes:['Source provenance','Geographic fit','Confidence calibration','Answer or abstain'],caption:'A spatially competent model must recognise when the evidence does not match the question.'}
};

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
  const map = systemMaps[slug];

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
          <div className="case-study-meta"><span>{study.stage}</span><span>Systems architecture / case study</span></div>
          <p className="case-study-thesis">{study.thesis}</p>
        </header>

        {map && <section className="case-study-system" aria-label={map.label}>
          <div className="case-study-system-heading"><span>THE SYSTEM / 01</span><b>{map.label}</b></div>
          <div className="case-study-system-flow" style={{gridTemplateColumns: `repeat(${map.nodes.length}, minmax(0, 1fr))`}}>
            {map.nodes.map((node,index)=><div className="case-study-system-node" key={node}><span>0{index+1}</span><strong>{node}</strong>{index<map.nodes.length-1&&<i aria-hidden="true">→</i>}</div>)}
          </div>
          <p>{map.caption}</p>
        </section>}

        <section className="case-study-proofline" aria-label="Project evidence summary">
          <div><span>PROJECT STATE</span><strong>{study.stage}</strong></div>
          <div><span>VALIDATION</span><strong>{study.validation.checks[0]}</strong></div>
          <div><span>IMPACT STANDARD</span><strong>{study.impact.measures[0]}</strong></div>
        </section>

        <div className="case-study-body">
          <Section number="01" label="THE PROBLEM" heading={study.problem.heading}>
            <p>{study.problem.body}</p><BulletList items={study.problem.evidence} />
          </Section>
          <Section number="02" label="INVESTIGATION" heading={study.investigation.heading}>
            <p>{study.investigation.body}</p><BulletList items={study.investigation.evidence} />
          </Section>
          <Section number="03" label="WHAT I DISCOVERED" heading={study.discovery.heading}>
            <p>{study.discovery.body}</p><BulletList items={study.discovery.evidence} />
          </Section>
          <Section number="04" label="ARCHITECTURE" heading={study.architecture.heading}>
            <p>{study.architecture.body}</p>
            <div className="case-study-decisions">{study.architecture.decisions.map(([name,reason],index)=><div key={name}><span>0{index+1}</span><div><h3>{name}</h3><p>{reason}</p></div></div>)}</div>
          </Section>
          <Section number="05" label="MY CONTRIBUTION" heading={study.contribution.heading}>
            <p>{study.contribution.body}</p><BulletList items={study.contribution.items} />
          </Section>
          <Section number="06" label="VALIDATION" heading={study.validation.heading}>
            <p>{study.validation.body}</p>
            <div className="case-study-validation-grid"><div><h3>Checks and evidence</h3><BulletList items={study.validation.checks} /></div><div><h3>Limitations</h3><BulletList items={study.validation.limitations} /></div></div>
          </Section>
          <Section number="07" label="IMPACT" heading={study.impact.heading}>
            <p>{study.impact.body}</p>
            <div className="case-study-measures"><h3>What should be measured next</h3><BulletList items={study.impact.measures} /></div>
          </Section>
        </div>

        <footer className="case-study-footer">
          <div><span className="case-study-eyebrow">PROJECT REFERENCES</span><div className="case-study-links">{study.links.map((link)=><a href={link.url} key={link.url} target={link.url.startsWith('mailto:')?'_self':'_blank'} rel="noreferrer">{link.label} <span aria-hidden="true">↗</span></a>)}</div></div>
          <Link href="/#work" className="case-study-next">Back to all systems <span aria-hidden="true">↑</span></Link>
        </footer>
      </article>
    </main>
  );
}
