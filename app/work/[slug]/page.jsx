import Link from 'next/link';
import { notFound } from 'next/navigation';
import { caseStudies, getCaseStudy } from '@/lib/case-studies';

const systemMaps = {
  iseyc: {
    label:'ISEYC institutional architecture',
    caption:'Departments own programmes and responsibilities. Shared evidence and operations support the institution without replacing human authority.',
    layers:[
      {label:'01 / GOVERNANCE',nodes:['National President','Presidential Council','Presidential Office & Secretariat']},
      {label:'02 / DEPARTMENT OWNERSHIP',nodes:['Education & Capacity Building','Health & Well-being','Software & Technology','Civic Department']},
      {label:'03 / SHARED INFRASTRUCTURE',nodes:['Observatory · evidence','Civic Brain · interpretation','IDCC · operations']},
      {label:'04 / PUBLIC INTERFACE',nodes:['Programmes & services','Published evidence','Dialogue & response']}
    ]
  },
  mandate: {
    label:'Community record lifecycle',
    caption:'A community report is not a verified finding. Publication follows human review; institutional response is tracked as a separate event.',
    layers:[
      {label:'01 / INTAKE',nodes:['Community report']},
      {label:'02 / HUMAN REVIEW',nodes:['Civic Department review','Source & context checks','Publish · flag · reject']},
      {label:'03 / PUBLIC RECORD',nodes:['Published CommunityRecord']},
      {label:'04 / EVIDENCE REUSE',nodes:['Observatory','Civic Brain']},
      {label:'05 / RESPONSE',nodes:['Institutional response · tracked separately']}
    ]
  },
  brain: {
    label:'Evidence-to-answer architecture',
    caption:'The interpretation layer retrieves and qualifies evidence; source systems remain authoritative and human decisions remain outside the model.',
    layers:[
      {label:'01 / QUESTION',nodes:['Citizen or institutional question']},
      {label:'02 / SOURCE RETRIEVAL',nodes:['CommunityRecord','Observatory','Official sources']},
      {label:'03 / EVIDENCE ASSESSMENT',nodes:['Provenance','Geographic & time fit','Coverage & limitations']},
      {label:'04 / RESPONSE',nodes:['Qualified answer','Explain evidence gap','Abstain when unsupported']}
    ]
  },
  observatory: {
    label:'Provenance-first evidence infrastructure',
    caption:'A source becomes an observation only with its period, geography, method and limitations. Unresolved conflicts stay visible.',
    layers:[
      {label:'01 / SOURCE SYSTEMS',nodes:['Official statistics','Budgets & finance','Community records','Research & datasets']},
      {label:'02 / EVIDENCE MODEL',nodes:['Source registry','Observation record','Geography & period']},
      {label:'03 / QUALITY CONTROL',nodes:['Provenance','Coverage','Reconciliation & limits']},
      {label:'04 / PUBLIC OUTPUT',nodes:['Evidence briefs','Accountability questions']}
    ]
  },
  'kaduna-south': {
    label:'Street-to-ward coordination model',
    caption:'A proposed responsibility chain for a Phase 1 pilot. It is a framework, not a claim that a representative network is already operating.',
    layers:[
      {label:'01 / COMMUNITY ENTRY',nodes:['Street Representative']},
      {label:'02 / LOCAL COORDINATION',nodes:['Line Coordinator','Issue consolidation']},
      {label:'03 / WARD COORDINATION',nodes:['Ward Coordinator','Prioritisation & escalation']},
      {label:'04 / FOLLOW-THROUGH',nodes:['Assigned responsibility','Documented action','Feedback to community']}
    ]
  },
  'sigma-geo': {
    label:'Spatial intelligence evaluation',
    caption:'A capable model must recognise when the evidence does not match the requested place, scale or confidence threshold.',
    layers:[
      {label:'01 / EVIDENCE INPUT',nodes:['Source record','Geographic reference','Time period']},
      {label:'02 / EVALUATION DIMENSIONS',nodes:['Source provenance','Spatial fit','Confidence calibration']},
      {label:'03 / MODEL BEHAVIOUR',nodes:['Grounded answer','Qualified answer','Abstain & explain']}
    ]
  }
};

function ArchitectureDiagram({map}) {
  return (
    <section className="case-study-architecture" aria-label={map.label}>
      <div className="case-study-architecture-heading"><span>ARCHITECTURE / SYSTEM MAP</span><b>{map.label}</b></div>
      <div className="case-study-architecture-layers">
        {map.layers.map((layer,index)=>(
          <div className="case-study-architecture-layer" key={layer.label}>
            <span className="case-study-layer-label">{layer.label}</span>
            <div className="case-study-layer-nodes">{layer.nodes.map((node,nodeIndex)=><div className="case-study-architecture-node" key={node}><i>{String(nodeIndex+1).padStart(2,'0')}</i><b>{node}</b></div>)}</div>
            {index!==map.layers.length-1&&<div className="case-study-layer-connector" aria-hidden="true"><i/></div>}
          </div>
        ))}
      </div>
      <p>{map.caption}</p>
    </section>
  );
}

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

        {map && <ArchitectureDiagram map={map}/>}

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
          {study.proof?.length>0&&<section className="case-study-proof" aria-label="Verification references">
            <div><span>VERIFICATION TRAIL</span><h2>Inspect the evidence.</h2></div>
            <div className="case-study-proof-links">{study.proof.map(item=><a href={item.url} key={item.url} target="_blank" rel="noreferrer"><b>{item.label}</b><small>{item.detail}</small><i aria-hidden="true">↗</i></a>)}</div>
          </section>}
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
