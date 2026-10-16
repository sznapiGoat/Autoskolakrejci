"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";

/**
 * Logo Kóta zmenšené do hlavičky: tabulka L, AUTOŠKOLA a KREJČÍ jako živý text
 * v Overpass (stejné písmo jako v logu) a tenká kóta bez popisků, které by v téhle
 * velikosti nešly přečíst. Vede na úvod; na úvodu stránka vyjede nahoru.
 */
export function Znacka() {
  const pathname = usePathname();

  return (
    <Link
      href="/"
      onClick={(e) => {
        if (pathname !== "/") return;
        e.preventDefault();
        const klid = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: klid ? "auto" : "smooth" });
      }}
      className="group inline-flex items-center gap-2.5 rounded-[3px]"
      aria-label="Autoškola Krejčí, úvod"
    >
      {/* tabulka je stejně vysoká jako textový blok vedle */}
      <Logo varianta="tabulka" className="size-12 shrink-0 group-hover:[--logo-plate:var(--red)] md:size-[54px]" />
      <span className="flex flex-col font-display font-extrabold leading-none text-ink" aria-hidden>
        <span className="text-[0.58rem] tracking-[0.26em] md:text-[0.62rem]">AUTOŠKOLA</span>
        {/* místo nahoře pro háček nad Č a čárku nad Í */}
        <span className="pt-[0.3em] text-[1.4rem] tracking-[-0.005em] md:text-[1.55rem]">KREJČÍ</span>
        <span className="mt-1 flex items-center">
          <span className="h-[7px] w-px bg-ink" />
          <span className="h-px flex-1 bg-ink" />
          <span className="h-[7px] w-px bg-ink" />
        </span>
      </span>
    </Link>
  );
}
