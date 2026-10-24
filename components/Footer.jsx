import { person } from '@/lib/content';

/** Closing line, then the footer. The line restates the standard instead of adding a slogan. */
export default function Footer() {
  return (
    <footer className="bg-ink text-[#b9c7b6]">
      <div className="zig" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-6 py-14 md:px-10">
        <p className="mb-10 max-w-[22ch] font-serif text-[clamp(1.8rem,5vw,3rem)] font-light leading-tight text-white">{person.closing}</p>
        <p className="font-serif text-lg text-white">Amb. Zulqarnain Yusuf Nadabo</p>
        <p className="mt-1 text-sm">Abuja, Nigeria. Civic work is non-partisan. Enterprise statements reflect Hubil&apos;s own public announcements.</p>
      </div>
    </footer>
  );
}
