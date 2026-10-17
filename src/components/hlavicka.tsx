"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { kc } from "@/lib/format";
import { SITE } from "@/lib/site";
import { SKUPINY } from "@/lib/skupiny";
import { VozidloNaSilnici } from "./vozidla";
import { Znacka } from "./znacka";

type Props = {
  /** nejnižší cena kurzu podle skupiny, z ceníku na serveru */
  ceny: Record<string, number | null>;
  pristiB: string;
};

const DALSI = [
  { href: "/skoleni-ridicu", label: "Školení řidičů" },
  { href: "/studovna", label: "Studovna" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

const odkazCls =
  "relative py-2 text-[0.95rem] font-semibold text-ink-2 transition-colors hover:text-ink aria-[current=page]:text-ink after:absolute after:inset-x-0 after:-bottom-[1px] after:h-[2px] after:origin-left after:scale-x-0 after:bg-red after:transition-transform aria-[current=page]:after:scale-x-100";

export function Hlavicka({ ceny, pristiB }: Props) {
  const pathname = usePathname();
  const [mobil, setMobil] = useState(false);
  const [panel, setPanel] = useState(false);
  const tlacitko = useRef<HTMLButtonElement>(null);
  const obal = useRef<HTMLDivElement>(null);
  const zavrit = useRef<ReturnType<typeof setTimeout> | null>(null);
  // panel otevřený najetím myší; první klik ho pak nechá otevřený, místo aby ho přepnul
  const odNajeti = useRef(false);
  const panelId = useId();

  // Po přechodu na jinou stránku menu zavřeme. Porovnáváme během renderu, ne v efektu.
  const [cesta, setCesta] = useState(pathname);
  if (cesta !== pathname) {
    setCesta(pathname);
    setMobil(false);
    setPanel(false);
  }

  useEffect(() => {
    document.body.style.overflow = mobil ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobil]);

  // Klik mimo panel a Escape panel zavřou.
  useEffect(() => {
    if (!panel) return;
    const mimo = (e: PointerEvent) => {
      if (obal.current && !obal.current.contains(e.target as Node)) setPanel(false);
    };
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPanel(false);
        tlacitko.current?.focus();
      }
    };
    document.addEventListener("pointerdown", mimo);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", mimo);
      document.removeEventListener("keydown", esc);
    };
  }, [panel]);

  const aktivni = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const kurzyAktivni = aktivni("/skupiny") || aktivni("/cenik");

  // Najetí myší otevře hned, odjetí zavře s malým zpožděním, aby se panel nezavřel cestou k němu.
  const najeti = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    if (zavrit.current) clearTimeout(zavrit.current);
    odNajeti.current = true;
    setPanel(true);
  };
  const odjeti = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    odNajeti.current = false;
    zavrit.current = setTimeout(() => setPanel(false), 180);
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-paper">
        <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-4 md:h-[72px] md:px-8">
          <Znacka />

          <nav className="hidden h-full items-center gap-7 lg:flex" aria-label="Hlavní">
            <div
              ref={obal}
              className="flex h-full items-center"
              onPointerEnter={najeti}
              onPointerLeave={odjeti}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) setPanel(false);
              }}
            >
              <button
                ref={tlacitko}
                type="button"
                aria-expanded={panel}
                aria-controls={panelId}
                aria-current={kurzyAktivni ? "page" : undefined}
                onClick={() => {
                  // najetí a klik přijdou těsně po sobě, stav panelu tu ještě nemusí být aktuální
                  if (odNajeti.current) {
                    odNajeti.current = false;
                    setPanel(true);
                    return;
                  }
                  setPanel((p) => !p);
                }}
                className={`${odkazCls} flex items-center gap-1.5`}
              >
                Kurzy a ceny
                <svg viewBox="0 0 10 6" className={`h-1.5 w-2.5 transition-transform ${panel ? "rotate-180" : ""}`} aria-hidden>
                  <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </button>

              <div
                id={panelId}
                hidden={!panel}
                className="absolute inset-x-0 top-full border-b border-line bg-white shadow-[0_24px_40px_-24px_rgba(20,22,27,0.25)] motion-safe:animate-[panel_160ms_ease-out]"
              >
                <div className="mx-auto grid max-w-[1320px] gap-10 px-8 pt-6 pb-8 xl:grid-cols-[1fr_17rem]">
                  <ul>
                    {SKUPINY.map((s) => (
                      <li key={s.id}>
                        <Link
                          href={`/skupiny/${s.id}`}
                          aria-current={aktivni(`/skupiny/${s.id}`) ? "page" : undefined}
                          className="group grid grid-cols-[3.25rem_1fr_6rem_8.5rem_11rem] items-center gap-x-5 border-b border-line py-2.5 last:border-b-0 hover:bg-paper aria-[current=page]:bg-paper"
                        >
                          <span className="flex h-10 min-w-10 items-center justify-center justify-self-start rounded-[3px] bg-plate px-2 font-mono text-[0.95rem] font-bold text-white transition-colors group-hover:bg-red">
                            {s.kod}
                          </span>
                          <span className="font-display text-lg font-extrabold tracking-tight group-hover:text-red">{s.h1}</span>
                          <span className="text-[0.95rem] text-muted">od {s.vek} let</span>
                          <span className="tnum text-right font-mono font-semibold">
                            {ceny[s.id] != null ? `od ${kc(ceny[s.id]!)}` : ""}
                          </span>
                          <VozidloNaSilnici id={s.vozidlo} sirka={170} className="block h-auto w-full" />
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col gap-6 border-line xl:border-l xl:pl-8">
                    <p>
                      <span className="block font-mono text-xs text-muted">Další kurz skupiny B</span>
                      <span className="font-display text-xl font-extrabold tracking-tight">{pristiB}</span>
                    </p>
                    <p className="text-[0.95rem] leading-relaxed text-ink-2">
                      Vozidla jsou ve stejném měřítku. Ceny jsou za celý kurz včetně zkoušky, bez správního poplatku 700 Kč.
                    </p>
                    <div className="flex flex-col gap-3">
                      <Link
                        href="/cenik"
                        className="font-bold text-red underline decoration-2 underline-offset-[6px] hover:text-red-deep"
                      >
                        Celý ceník a kondiční jízdy
                      </Link>
                      <Link href="/skupiny" className="font-bold underline decoration-line-strong decoration-2 underline-offset-[6px] hover:decoration-ink">
                        Porovnat všechny skupiny
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {DALSI.map((n) => (
              <Link key={n.href} href={n.href} aria-current={aktivni(n.href) ? "page" : undefined} className={odkazCls}>
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
            onClick={() => setMobil((o) => !o)}
            aria-expanded={mobil}
            aria-controls="mobilni-menu"
            className="-mr-2 inline-flex h-11 items-center px-2 text-[0.95rem] font-bold lg:hidden"
          >
            {mobil ? "Zavřít" : "Menu"}
          </button>
        </div>
      </header>

      {mobil && (
        <div id="mobilni-menu" className="fixed inset-x-0 top-16 bottom-0 z-30 overflow-y-auto bg-paper lg:hidden">
          <nav className="flex flex-col px-4 pt-6 pb-10" aria-label="Mobilní">
            <p className="font-mono text-xs text-muted">Kurzy a ceny</p>
            <ul className="mt-2 border-t border-line">
              {SKUPINY.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/skupiny/${s.id}`}
                    className="grid grid-cols-[2.75rem_1fr_auto] items-center gap-3 border-b border-line py-3"
                  >
                    <span className="flex h-9 min-w-9 items-center justify-center justify-self-start rounded-[3px] bg-plate px-1.5 font-mono text-sm font-bold text-white">
                      {s.kod}
                    </span>
                    <span className="font-display text-lg leading-tight font-extrabold tracking-tight">{s.h1}</span>
                    <span className="tnum font-mono text-sm font-semibold">{ceny[s.id] != null ? `od ${kc(ceny[s.id]!)}` : ""}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/cenik" className="mt-3 self-start font-bold text-red underline decoration-2 underline-offset-[6px]">
              Celý ceník a kondiční jízdy
            </Link>

            <div className="mt-8 border-t border-line">
              {[{ href: "/", label: "Úvod" }, ...DALSI, { href: "/o-autoskole", label: "O autoškole" }, { href: "/prihlaska", label: "Přihláška" }].map(
                (n) => (
                  <Link key={n.href} href={n.href} className="flex border-b border-line py-4 text-2xl font-bold">
                    {n.label}
                  </Link>
                ),
              )}
            </div>
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
