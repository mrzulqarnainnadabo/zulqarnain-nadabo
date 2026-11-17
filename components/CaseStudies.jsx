import Section from './Section';
import { projects } from '@/lib/content';

export default function CaseStudies() {
  return (
    <Section id="work" title="Selected work" kicker="Projects, roles and evidence">
      <div className="divide-y divide-rule border-y border-rule">
        {projects.map((project, index) => (
          <article key={project.id} className="py-8 md:py-10">
            <div className="grid gap-5 md:grid-cols-[150px_1fr] md:gap-12">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">{String(index + 1).padStart(2, '0')} / {project.category}</p>
                <p className="mt-3 text-xs leading-relaxed text-mute">{project.stage}</p>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-medium leading-tight text-forest md:text-3xl">{project.title}</h3>
                <p className="mt-3 max-w-3xl font-serif text-lg font-light leading-relaxed text-forest">{project.summary}</p>
                <dl className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                  {[["Problem", project.problem], ["My role", project.role], ["Approach", project.solution], ["Evidence", project.evidence], ["Limitations", project.limitations]].map(([label, value]) => (
                    <div key={label} className={label === 'Limitations' ? 'sm:col-span-2' : ''}>
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">{label}</dt>
                      <dd className="mt-1 text-sm leading-relaxed text-mute">{value}</dd>
                    </div>
                  ))}
                </dl>
                {project.links.length > 0 && <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-rule pt-4 text-sm font-semibold">
                  {project.links.map((link) => <li key={link.href}><a className="text-forest underline decoration-gold decoration-2 underline-offset-4 hover:text-black" href={link.href} target="_blank" rel="noreferrer">{link.label} ↗</a></li>)}
                </ul>}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
