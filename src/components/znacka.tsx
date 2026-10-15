import Link from "next/link";

/** Tabulka L + jméno. Stejná modrá tabulka, jaká je na plachtě Iveca. */
export function Znacka({ inverzni = false }: { inverzni?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-3" aria-label="Autoškola Krejčí, úvod">
      <svg viewBox="0 0 32 32" className="size-9 shrink-0" aria-hidden>
        <rect width="32" height="32" rx="3" fill="var(--plate)" />
        <path d="M10.5 6.5h5v14h8v5h-13z" fill="var(--white)" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.05rem] font-extrabold tracking-tight ${inverzni ? "text-white" : "text-ink"}`}>
          Autoškola Krejčí
        </span>
        <span className={`mt-1 font-mono text-[0.7rem] ${inverzni ? "text-white/60" : "text-muted"}`}>
          Třebíč · B BE C CE D T
        </span>
      </span>
    </Link>
  );
}
