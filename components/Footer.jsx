import { person } from '@/lib/content';

export default function Footer() {
  return (
    <footer className="bg-ink text-[#b9c7b6]">
      <div className="zig" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-6 py-14 md:px-10">
        <p className="mb-10 max-w-[28ch] font-serif text-[clamp(1.8rem,5vw,3rem)] font-light leading-tight text-white">{person.closing}</p>
        <p className="font-serif text-lg text-white">{person.name}</p>
        <p className="mt-1 text-sm">{person.role} · Nigeria</p>
        <p className="mt-4 text-xs text-[#9aaf9f]">Civic and enterprise work are presented separately. Project stages and limitations are stated alongside selected work.</p>
      </div>
    </footer>
  );
}
