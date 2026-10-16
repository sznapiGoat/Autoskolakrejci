"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/lib/site";
import { Znacka } from "./znacka";

export function Hlavicka() {
  const pathname = usePathname();
  const [otevreno, setOtevreno] = useState(false);

  // Po přechodu na jinou stránku menu zavřeme. Porovnáváme během renderu, ne v efektu.
  const [cesta, setCesta] = useState(pathname);
  if (cesta !== pathname) {
    setCesta(pathname);
    setOtevreno(false);
  }

  useEffect(() => {
    document.body.style.overflow = otevreno ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [otevreno]);

  const aktivni = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-paper">
        <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-4 md:h-[72px] md:px-8">
          <Znacka />

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Hlavní">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={aktivni(n.href) ? "page" : undefined}
                className="relative py-2 text-[0.95rem] font-semibold text-ink-2 transition-colors hover:text-ink aria-[current=page]:text-ink after:absolute after:inset-x-0 after:-bottom-[1px] after:h-[2px] after:origin-left after:scale-x-0 after:bg-red after:transition-transform aria-[current=page]:after:scale-x-100"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <a href={SITE.phoneHref} className="tnum font-mono text-[0.95rem] font-semibold text-ink hover:text-red">
              {SITE.phone}
            </a>
            <Link
              href="/prihlaska"
              className="inline-flex h-11 items-center rounded-[3px] bg-red px-5 text-[0.95rem] font-bold text-white transition-colors hover:bg-red-deep"
            >
              Přihláška
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOtevreno((o) => !o)}
            aria-expanded={otevreno}
            aria-controls="mobilni-menu"
            className="-mr-2 inline-flex h-11 items-center px-2 text-[0.95rem] font-bold lg:hidden"
          >
            {otevreno ? "Zavřít" : "Menu"}
          </button>
        </div>
      </header>

      {otevreno && (
        <div id="mobilni-menu" className="fixed inset-x-0 top-16 bottom-0 z-30 overflow-y-auto bg-paper lg:hidden">
          <nav className="flex flex-col px-4 pt-4 pb-10" aria-label="Mobilní">
            {[{ href: "/", label: "Úvod" }, ...NAV, { href: "/prihlaska", label: "Přihláška" }].map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="flex items-baseline justify-between border-b border-line py-4 text-2xl font-bold"
              >
                {n.label}
              </Link>
            ))}
            <a href={SITE.phoneHref} className="tnum mt-8 font-mono text-2xl font-semibold text-red">
              {SITE.phone}
            </a>
            <p className="mt-2 text-muted">
              {SITE.hours.day} {SITE.hours.time} v učebně, {SITE.hours.note}
            </p>
          </nav>
        </div>
      )}
    </>
  );
}
