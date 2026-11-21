import Section from './Section';
import { projects } from '@/lib/content';

export default function CaseStudies() {
  return (
    <Section id="work" title="Selected work" kicker="Projects, roles and evidence">
      <div className="divide-y divide-rule border-y border-rule">
        {projects.map((project, index) => (
          <article key={project.id} className="py-8 md:py-10">
            <div className="grid gap-5 md:grid-cols-[150px_1fr] md:gap-12">
              <div className="flex flex-wrap items-start justify-between gap-2 md:block">
                <p className="text-xs font-semibold tracking-wide text-gold">{project.category}</p>
                <p className="mt-1 max-w-[22ch] text-xs leading-relaxed text-mute">{project.stage}</p>
              </div>
              <div className="min-w-0">
                <h3 className="font-serif text-2xl font-medium leading-tight text-forest md:text-3xl">{project.title}</h3>
                <p className="mt-3 max-w-3xl font-serif text-lg font-light leading-relaxed text-forest">{project.summary}</p>

                <div className="mt-5 border-l-2 border-gold pl-4">
                  <p className="text-[11px] font-semibold tracking-wide text-mute">My role</p>
                  <p className="mt-1 max-w-3xl text-sm leading-relaxed text-forest">{project.role}</p>
                </div>

                <details className="project-notes mt-5 border-t border-rule pt-4">
                  <summary className="inline-flex cursor-pointer items-center gap-2 py-1 text-sm font-semibold text-forest underline decoration-gold decoration-2 underline-offset-4 hover:text-black">
                    Project notes and evidence
                  </summary>
                  <dl className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                    {[
                      ['Problem', project.problem],
                      ['Approach', project.solution],
                      ['Evidence', project.evidence],
                      ['Limitations', project.limitations],
                    ].map(([label, value]) => (
                      <div key={label} className={label === 'Limitations' ? 'sm:col-span-2' : ''}>
                        <dt className="text-[11px] font-semibold tracking-wide text-gold">{label}</dt>
                        <dd className="mt-1 text-sm leading-relaxed text-mute">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </details>

                {project.links.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                    {project.links.map((link) => (
                      <li key={link.href}>
                        <a className="text-forest underline decoration-gold decoration-2 underline-offset-4 hover:text-black" href={link.href} target="_blank" rel="noreferrer">
                          {link.label} <span aria-hidden="true">↗</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
