import type { ReactNode } from "react";

/** Záhlaví podstránky: nadpis, perex a měřítková linka jako u úvodní stránky. */
export function Zahlavi({ nadpis, perex, children }: { nadpis: ReactNode; perex?: ReactNode; children?: ReactNode }) {
  return (
    <header className="mx-auto max-w-[1320px] px-4 pt-12 md:px-8 md:pt-20">
      <div className="grid gap-8 pb-10 md:pb-14 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
        <h1 className="text-[clamp(2.4rem,6vw,4.8rem)] font-extrabold leading-[0.98] tracking-[-0.03em]">{nadpis}</h1>
        {perex && <div className="max-w-[52ch] text-lg leading-relaxed text-ink-2 lg:pb-2">{perex}</div>}
      </div>
      {children}
      <div className="ruler" aria-hidden />
    </header>
  );
}
