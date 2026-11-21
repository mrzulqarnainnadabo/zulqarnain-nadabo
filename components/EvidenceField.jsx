export default function EvidenceField() {
  return (
    <figure className="field-panel relative isolate overflow-hidden border border-white/15 bg-[#142b20] px-5 pb-5 pt-4 md:px-6 md:pb-6">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3 text-[10px] font-semibold uppercase tracking-[.18em] text-[#b9c7b6]">
        <span>Evidence framework / 01</span>
        <span className="text-goldl">Conceptual model</span>
      </div>

      <svg className="field-contours mt-2 block w-full" viewBox="0 0 520 350" role="img" aria-labelledby="field-title field-desc">
        <title id="field-title">Evidence framework diagram</title>
        <desc id="field-desc">An abstract topographic field connecting place, source, time, context and review. This is a conceptual illustration, not a geographic dataset or map.</desc>
        <defs>
          <pattern id="field-grid" width="26" height="26" patternUnits="userSpaceOnUse">
            <path d="M26 0H0V26" fill="none" stroke="#d2b365" strokeOpacity=".12" strokeWidth=".7" />
          </pattern>
          <linearGradient id="field-line" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#d2b365" stopOpacity=".9" />
            <stop offset="1" stopColor="#b9c7b6" stopOpacity=".35" />
          </linearGradient>
        </defs>
        <rect width="520" height="350" fill="url(#field-grid)" />
        <g fill="none" stroke="#b9c7b6" strokeOpacity=".24" strokeWidth="1.2">
          <path d="M-30 83C44 18 105 30 154 71s91 49 145 11 111-62 248-2" />
          <path d="M-30 103C44 38 105 50 154 91s91 49 145 11 111-62 248-2" />
          <path d="M-30 123C44 58 105 70 154 111s91 49 145 11 111-62 248-2" />
          <path d="M-30 143C44 78 105 90 154 131s91 49 145 11 111-62 248-2" />
          <path d="M-30 163C44 98 105 110 154 151s91 49 145 11 111-62 248-2" />
          <path d="M-30 183C44 118 105 130 154 171s91 49 145 11 111-62 248-2" />
          <path d="M-30 203C44 138 105 150 154 191s91 49 145 11 111-62 248-2" />
          <path d="M-30 223C44 158 105 170 154 211s91 49 145 11 111-62 248-2" />
          <path d="M-30 243C44 178 105 190 154 231s91 49 145 11 111-62 248-2" />
          <path d="M-30 263C44 198 105 210 154 251s91 49 145 11 111-62 248-2" />
        </g>
        <g fill="none" stroke="url(#field-line)" strokeWidth="1.6">
          <path d="M72 263L168 186L264 219L358 126L450 92" />
          <path d="M168 186L187 83" strokeDasharray="3 6" />
          <path d="M264 219L287 294" strokeDasharray="3 6" />
          <path d="M358 126L392 36" strokeDasharray="3 6" />
        </g>
        <g fill="#142b20" stroke="#d2b365" strokeWidth="2">
          <circle cx="72" cy="263" r="6" />
          <circle cx="168" cy="186" r="6" />
          <circle cx="264" cy="219" r="6" />
          <circle cx="358" cy="126" r="6" />
          <circle cx="450" cy="92" r="6" />
        </g>
        <g fill="#e8efe6" fontFamily="Arial, sans-serif" fontSize="10" letterSpacing="1.5">
          <text x="48" y="286">PLACE</text>
          <text x="144" y="166">SOURCE</text>
          <text x="245" y="245">TIME</text>
          <text x="333" y="106">CONTEXT</text>
          <text x="421" y="72">REVIEW</text>
        </g>
        <circle className="field-orbit" cx="264" cy="219" r="24" fill="none" stroke="#d2b365" strokeOpacity=".5" strokeWidth="1" />
      </svg>

      <figcaption className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-goldl">A working discipline</p>
          <p className="mt-1 max-w-[28ch] font-serif text-lg leading-snug text-white">Make evidence traceable. Make responsibility visible.</p>
        </div>
        <p className="text-[10px] uppercase tracking-[.14em] text-[#9aaf9f]">Observe · interpret · review</p>
      </figcaption>
    </figure>
  );
}
