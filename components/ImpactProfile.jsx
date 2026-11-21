import { person } from '@/lib/content';

const principles = [
  ['01', 'Start with reality', 'Understand the place, people, evidence and constraints before proposing a solution.'],
  ['02', 'Design the whole', 'Make roles, decisions, information and workflows fit together.'],
  ['03', 'Make it usable', 'Turn the architecture into tools and practices people can actually operate.'],
];

export default function ImpactProfile() {
  return (
    <section id="approach" aria-labelledby="profile-heading" className="profile-band">
      <div className="method-intro" data-reveal="rise">
        <p className="eyebrow">Method / Point of view</p>
        <h2 id="profile-heading">Good systems are<br/><em>understood before</em><br/>they are built.</h2>
        <p>I move between research, institutional design and technology because complex problems rarely sit inside one discipline.</p>
      </div>
      <div className="method-list">
        {principles.map(([number, title, body]) => <div className="method-row" key={number} data-reveal="rise"><span>{number}</span><h3>{title}</h3><p>{body}</p></div>)}
      </div>
      <p className="profile-footnote">{person.role} <span>·</span> Nigeria</p>
    </section>
  );
}
