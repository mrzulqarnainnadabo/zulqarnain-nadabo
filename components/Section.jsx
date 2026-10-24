/** Shared layout: title column on the left, content on the right (stacked on phones). */
export default function Section({ id, title, kicker, children, last }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={`py-16 md:py-24 ${last ? '' : 'border-b border-rule'}`}>
      <div className="grid gap-5 md:grid-cols-[240px_1fr] md:gap-12">
        <h2 id={`${id}-h`} className="font-serif text-3xl font-normal leading-tight text-forest">
          {title}
          {kicker && <small className="mt-2 block font-sans text-sm font-medium text-mute">{kicker}</small>}
        </h2>
        <div>{children}</div>
      </div>
    </section>
  );
}
