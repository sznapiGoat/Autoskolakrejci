"use client";

import { useState } from "react";

/**
 * Mapa z Mapy.cz až na kliknutí. Iframe nastavuje cookies Seznamu,
 * takže se nenačte, dokud o mapu návštěvník sám nepožádá.
 */
export function Mapa({
  frame,
  odkaz,
  nazev,
  popisek,
  className = "",
}: {
  frame: string;
  odkaz: string;
  nazev: string;
  /** velký popisek místa nad tlačítkem, třeba adresa */
  popisek?: string;
  className?: string;
}) {
  const [nactena, setNactena] = useState(false);

  if (nactena) {
    return <iframe src={frame} title={`Mapa: ${nazev}`} className={`border-0 ${className}`} />;
  }

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] bg-[size:32px_32px] p-6 text-center ${className}`}
    >
      {popisek && (
        <div className="mb-4 flex flex-col items-center gap-3">
          <svg viewBox="0 0 32 32" className="size-12" aria-hidden>
            <rect width="32" height="32" rx="3" fill="var(--plate)" />
            <path d="M10.5 6.5h5v14h8v5h-13z" fill="var(--white)" />
          </svg>
          <p className="font-display text-2xl font-extrabold tracking-tight">{popisek}</p>
        </div>
      )}
      <button
        type="button"
        onClick={() => setNactena(true)}
        className="inline-flex h-11 items-center rounded-[3px] border-2 border-ink bg-white px-5 font-bold transition-colors hover:bg-ink hover:text-white"
      >
        Zobrazit mapu
      </button>
      <a href={odkaz} rel="noopener" className="text-sm text-ink-2 underline underline-offset-4 hover:text-red">
        nebo otevřít v Mapy.cz
      </a>
      <p className="max-w-[30ch] text-xs text-muted">Mapa se načte ze serverů Seznamu, který při tom ukládá cookies.</p>
    </div>
  );
}
