const chapters = { fronts: '01', work: '02', leadership: '03', principles: '04', research: '05', architecture: '06', contact: '07' };

export default function Section({ id, title, kicker, children, last }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={`page-section ${last ? 'page-section-last' : ''}`}>
      <div className="grid gap-6 md:grid-cols-[220px_1fr] md:gap-12">
        <div className="section-heading">
          <span className="mb-4 block font-mono text-xs text-gold">{chapters[id] || '—'} / 07</span>
          <h2 id={`${id}-h`} className="font-serif text-3xl font-normal leading-tight tracking-[-.02em] text-forest md:text-4xl">
            {title}
          </h2>
          {kicker && <p className="mt-3 max-w-[24ch] text-sm leading-relaxed text-mute">{kicker}</p>}
        </div>
        <div className="section-content scroll-reveal">{children}</div>
      </div>
    </section>
  );
}
