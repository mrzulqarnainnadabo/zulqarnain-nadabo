import Section from './Section';
import { projects } from '@/lib/content';

export default function CaseStudies() {
  return (
    <Section id="work" title="Selected work" kicker="Four projects · distinct stages">
      <div className="work-grid">
        {projects.map((project, index) => (
          <article key={project.id} className={`work-item scroll-reveal work-item-${index + 1}`}>
            <div className="flex items-center justify-between gap-4 border-b border-rule pb-4">
              <span className="text-[11px] font-semibold uppercase tracking-[.16em] text-gold">{project.category}</span>
              <span className="font-mono text-xs text-mute">{String(index + 1).padStart(2, '0')}</span>
            </div>
            <div className="pt-5">
              <p className="mb-3 text-[11px] uppercase tracking-[.14em] text-mute">{project.stage}</p>
              <h3 className="max-w-[18ch] font-serif text-3xl font-normal leading-[1.04] tracking-[-.025em] text-forest md:text-4xl">{project.title}</h3>
              <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-mute">{project.summary}</p>
              <div className="mt-7 flex items-center justify-between gap-4 border-t border-rule pt-4">
                <a className="text-sm font-semibold text-forest underline decoration-gold decoration-2 underline-offset-4 hover:text-black" href={project.links[0].href} target="_blank" rel="noreferrer">
                  {project.links[0].label} <span aria-hidden="true">↗</span>
                </a>
                <details className="project-notes">
                  <summary className="cursor-pointer list-none text-xs font-semibold text-mute underline underline-offset-4 hover:text-forest">Project notes +</summary>
                  <dl className="mt-5 grid gap-4 border-t border-rule pt-4">
                    {[['Problem', project.problem], ['My role', project.role], ['Approach', project.solution], ['Evidence', project.evidence], ['Limits', project.limitations]].map(([label, value]) => (
                      <div key={label}>
                        <dt className="text-[10px] font-semibold uppercase tracking-[.15em] text-gold">{label}</dt>
                        <dd className="mt-1 text-sm leading-relaxed text-mute">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </details>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
