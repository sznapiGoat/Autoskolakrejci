"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { kc } from "@/lib/format";

/*
  Štítky skupin přímo na fotce v úvodu. Polohy vozidel jsou zlomky fotky (0 až 1),
  fotka je object-cover s ohniskem FOKUS, z toho se dopočítá, kde vozidlo v okně leží.
  Po výměně fotky stačí přepsat FOTKA a VOZIDLA.
*/
const FOTKA = { sirka: 2400, vyska: 1350 };
const FOKUS = { x: 0.62, y: 0.62 };

export type StitekVozidla = {
  kod: string;
  href: string;
  nazev: string;
  vozidlo: string;
  vek: number;
  delka: number;
  cena: number | null;
  /** předek a zadek vozidla, střecha (horní hrana) */
  x0: number;
  x1: number;
  y0: number;
  /** kam se otevře karta s podrobnostmi, ať nezakryje nadpis */
  karta: "nahoru" | "dolu";
};

type Okno = { w: number; h: number };

const ease = [0.22, 1, 0.36, 1] as const;
const metry = (m: number) => m.toLocaleString("cs-CZ", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export function HeroStitky({ vozidla }: { vozidla: StitekVozidla[] }) {
  const obal = useRef<HTMLDivElement>(null);
  const [okno, setOkno] = useState<Okno | null>(null);
  const [aktivni, setAktivni] = useState(0);
  const klid = useReducedMotion() ?? false;

  useEffect(() => {
    const el = obal.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setOkno({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // převod bodu z fotky do pixelů okna podle object-cover a ohniska
  const prevod = (o: Okno) => {
    const meritko = Math.max(o.w / FOTKA.sirka, o.h / FOTKA.vyska);
    const sw = FOTKA.sirka * meritko;
    const sh = FOTKA.vyska * meritko;
    const ox = (o.w - sw) * FOKUS.x;
    const oy = (o.h - sh) * FOKUS.y;
    return { x: (v: number) => ox + v * sw, y: (v: number) => oy + v * sh };
  };

  return (
    <div ref={obal} className="pointer-events-none absolute inset-0 hidden xl:block">
      {okno &&
        vozidla.map((v, i) => {
          const p = prevod(okno);
          const levo = p.x(v.x0);
          const pravo = p.x(v.x1);
          const strecha = p.y(v.y0);
          const kotaY = strecha - 18;
          const zap = aktivni === i;
          return (
            <div key={v.kod}>
              {/* kóta s délkou nad vozidlem */}
              {zap && (
                <div aria-hidden className="absolute" style={{ left: levo, top: kotaY, width: pravo - levo }}>
                  <motion.span
                    key={`k${i}`}
                    className="absolute inset-x-0 top-0 h-[2px] origin-left bg-white shadow-[0_0_0_1px_rgba(20,22,27,0.18)]"
                    initial={klid ? false : { scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, ease }}
                  />
                  <span className="absolute top-0 left-0 h-3 w-[2px] -translate-y-1/2 bg-white" />
                  <span className="absolute top-0 right-0 h-3 w-[2px] -translate-y-1/2 bg-white" />
                  <motion.span
                    key={`d${i}`}
                    className={`tnum absolute top-0 -translate-x-1/2 -translate-y-1/2 rounded-[3px] ${v.karta === "nahoru" ? "left-1/4" : "left-1/2"} bg-white px-2 py-0.5 font-mono text-sm font-semibold text-plate`}
                    initial={klid ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: klid ? 0 : 0.35 }}
                  >
                    cca {metry(v.delka)} m
                  </motion.span>
                </div>
              )}

              {/* štítek skupiny a po aktivaci podrobnosti */}
              <div
                className={`pointer-events-auto absolute flex gap-2 ${v.karta === "nahoru" ? "items-end" : "items-start"}`}
                style={
                  v.karta === "nahoru"
                    ? { left: (levo + pravo) / 2 - 18, bottom: okno.h - (kotaY + 22 + 36) }
                    : { left: (levo + pravo) / 2 - 18, top: kotaY + 22 }
                }
                onPointerEnter={(e) => e.pointerType === "mouse" && setAktivni(i)}
              >
                <button
                  type="button"
                  onClick={() => setAktivni(i)}
                  aria-expanded={zap}
                  aria-label={`Skupina ${v.kod}, ${v.nazev}`}
                  className={`flex h-9 min-w-9 items-center justify-center rounded-[3px] px-2 font-mono text-base font-bold shadow-[0_2px_10px_rgba(20,22,27,0.25)] transition-colors ${
                    zap ? "bg-plate text-white" : "bg-white text-plate hover:bg-paper"
                  }`}
                >
                  {v.kod}
                </button>
                {zap && (
                  <motion.div
                    key={`i${i}`}
                    className="w-max max-w-[17rem] rounded-[3px] bg-white px-3.5 py-2.5 text-ink shadow-[0_6px_24px_rgba(20,22,27,0.25)]"
                    initial={klid ? false : { opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, ease }}
                  >
                    <p className="font-bold leading-snug">{v.nazev}</p>
                    <p className="text-sm text-ink-2">
                      {v.vozidlo}, od {v.vek} let
                      {v.cena ? (
                        <>
                          , <span className="whitespace-nowrap">kurz od {kc(v.cena)}</span>
                        </>
                      ) : null}
                    </p>
                    <Link href={v.href} className="mt-1 inline-block text-sm font-bold text-red underline underline-offset-4">
                      Skupina {v.kod} podrobně
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}
