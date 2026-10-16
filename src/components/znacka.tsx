"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Tabulka L + jméno. Stejná modrá tabulka, jaká je na plachtě Iveca.
 * Vede na úvod; když už na úvodu jste, vyjede stránka nahoru.
 */
export function Znacka({ inverzni = false }: { inverzni?: boolean }) {
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
      className="group inline-flex items-center gap-3 rounded-[3px]"
      aria-label="Autoškola Krejčí, úvod"
    >
      <svg viewBox="0 0 32 32" className="size-9 shrink-0" aria-hidden>
        <rect width="32" height="32" rx="3" className="fill-plate transition-colors group-hover:fill-red" />
        <path d="M10.5 6.5h5v14h8v5h-13z" fill="var(--white)" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.05rem] font-extrabold tracking-tight transition-colors ${inverzni ? "text-white" : "text-ink group-hover:text-red"}`}
        >
          Autoškola Krejčí
        </span>
        <span className={`mt-1 font-mono text-[0.7rem] ${inverzni ? "text-white/60" : "text-muted"}`}>
          Třebíč · B BE C CE D T
        </span>
      </span>
    </Link>
  );
}
