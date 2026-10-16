"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { SKUPINY } from "@/lib/skupiny";
import { TVARY } from "@/lib/tvary";
import { Obrys, Vozidlo } from "./vozidla";

// Plátno v decimetrech. Všechna vozidla stojí předkem na stopčáře.
const VB_X = -4;
const VB_W = 178;
const VB_Y = -40;
const VB_H = 46;
const STOP = 170;
const PRIJEZD = 120;
const ODJEZD = 40;

const pct = (x: number) => `${((x - VB_X) / VB_W) * 100}%`;
const metry = (n: number) => n.toLocaleString("cs-CZ", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const ease = [0.22, 1, 0.36, 1] as const;

type Props = { ceny: Record<string, number | null> };

export function Meritko({ ceny }: Props) {
  const sekce = useRef<HTMLElement>(null);
  const klid = useReducedMotion() ?? false;
  const [aktivni, setAktivni] = useState(0);
  const n = SKUPINY.length;

  const { scrollYProgress } = useScroll({ target: sekce, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(n - 1, Math.max(0, Math.floor(p * n)));
    setAktivni((a) => (a === i ? a : i));
  });
  const prubeh = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const s = SKUPINY[aktivni];
  const delka = TVARY[s.vozidlo].delka;

  // Kóta: počítadlo metrů dojede na délku aktivního vozidla.
  const kota = useMotionValue(s.delka);
  const [kotaText, setKotaText] = useState(metry(s.delka));
  useMotionValueEvent(kota, "change", (v) => setKotaText(metry(v)));
  useEffect(() => {
    if (klid) {
      kota.set(s.delka);
      return;
    }
    const c = animate(kota, s.delka, { duration: 0.9, ease, delay: 0.35 });
    return () => c.stop();
  }, [s.delka, kota, klid]);

  const skoc = (i: number) => {
    const el = sekce.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const rozsah = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + ((i + 0.5) / n) * rozsah, behavior: klid ? "auto" : "smooth" });
  };

  const jizda: Variants = klid
    ? { enter: { opacity: 0 }, rest: { opacity: 1 }, leave: { opacity: 0 } }
    : {
        enter: { x: -PRIJEZD, opacity: 0 },
        rest: {
          x: 0,
          opacity: 1,
          transition: { x: { duration: 1.1, ease }, opacity: { duration: 0.3 } },
        },
        leave: {
          x: ODJEZD,
          opacity: 0,
          transition: { duration: 0.6, ease: [0.55, 0, 1, 0.45] },
        },
      };

  return (
    <section
      ref={sekce}
      aria-labelledby="meritko-nadpis"
      className="relative bg-white"
      style={{ height: `${n * 70 + 100}svh` }}
    >
      <div className="sticky top-16 flex h-[calc(100svh-4rem)] flex-col md:top-[72px] md:h-[calc(100svh-72px)]">
        <div className="mx-auto flex w-full max-w-[1320px] flex-1 flex-col px-4 pt-8 md:px-8 md:pt-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 id="meritko-nadpis" className="max-w-[16ch] text-[clamp(2rem,4.6vw,3.6rem)] font-extrabold leading-[1.02] tracking-[-0.02em]">
              Šest skupin. Ve skutečném měřítku.
            </h2>
            <div role="tablist" aria-label="Skupiny řidičského oprávnění" className="flex flex-wrap gap-1.5">
              {SKUPINY.map((g, i) => (
                <button
                  key={g.id}
                  role="tab"
                  aria-selected={i === aktivni}
                  onClick={() => skoc(i)}
                  className="tnum h-10 min-w-12 rounded-[3px] border border-line-strong px-3 font-mono text-[0.95rem] font-semibold text-ink-2 transition-colors hover:border-ink hover:text-ink aria-selected:border-plate aria-selected:bg-plate aria-selected:text-white"
                >
                  {g.kod}
                </button>
              ))}
            </div>
          </div>

          {/* Plátno */}
          <div className="relative mt-8 md:mt-12">
            <svg
              viewBox={`${VB_X} ${VB_Y} ${VB_W} ${VB_H}`}
              className="block w-full overflow-visible"
              role="img"
              aria-label={`${s.nazev}, skupina ${s.kod}, délka cvičného vozidla přibližně ${metry(s.delka)} metru`}
            >
              {/* obrysy ostatních skupin */}
              {SKUPINY.filter((g) => g.id !== s.id).map((g) => (
                <g key={g.id} transform={`translate(${STOP - TVARY[g.vozidlo].delka},0)`}>
                  <Obrys id={g.vozidlo} />
                </g>
              ))}

              {/* kóta */}
              <motion.g
                key={`kota-${s.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: klid ? 0 : 0.35 } }}
              >
                <motion.path
                  d={`M${STOP - delka},-37.5 H${STOP}`}
                  stroke="var(--plate)"
                  strokeWidth={1.5}
                  vectorEffect="non-scaling-stroke"
                  initial={{ scaleX: klid ? 1 : 0 }}
                  animate={{ scaleX: 1, transition: { duration: 0.9, ease, delay: klid ? 0 : 0.35 } }}
                  style={{ transformBox: "fill-box", originX: 1 }}
                />
                <path
                  d={`M${STOP - delka},-39.5 V-35.5 M${STOP},-39.5 V-35.5`}
                  stroke="var(--plate)"
                  strokeWidth={1.5}
                  vectorEffect="non-scaling-stroke"
                />
              </motion.g>

              {/* aktivní vozidlo */}
              <g transform={`translate(${STOP - delka},0)`}>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.g key={s.id} variants={jizda} initial="enter" animate="rest" exit="leave">
                    <Vozidlo id={s.vozidlo} jizda={{ prijezd: PRIJEZD, odjezd: ODJEZD, klid }} />
                  </motion.g>
                </AnimatePresence>
              </g>

              {/* vozovka, pravítko a stopčára */}
              <line x1={VB_X} x2={VB_X + VB_W} y1={0} y2={0} stroke="var(--ink)" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
              {Array.from({ length: 18 }, (_, m) => (
                <line
                  key={m}
                  x1={STOP - m * 10}
                  x2={STOP - m * 10}
                  y1={0}
                  y2={m % 5 === 0 ? 3 : 1.6}
                  stroke="var(--ink)"
                  strokeWidth={1}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
              <rect x={STOP} y={-1} width={1.6} height={5.5} fill="var(--red)" />
            </svg>

            {/* Popisky v HTML, aby se písmo neškálovalo s plátnem */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <motion.div
                key={`popisek-${s.id}`}
                className="absolute -top-1 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-[3px] bg-white px-1.5 font-mono text-sm font-semibold text-plate md:text-base"
                style={{ left: pct(STOP - delka / 2) }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: klid ? 0 : 0.35 } }}
              >
                <span className="tnum">cca {kotaText} m</span>
              </motion.div>
              {[0, 5, 10, 15].map((m) => (
                <span
                  key={m}
                  className={`tnum absolute top-full mt-1.5 whitespace-nowrap font-mono text-[0.7rem] text-muted md:text-xs ${m === 0 ? "-translate-x-full" : "-translate-x-1/2"}`}
                  style={{ left: pct(STOP - m * 10 + (m === 0 ? 1.6 : 0)) }}
                >
                  {m} m
                </span>
              ))}
            </div>
          </div>

          {/* Údaje o skupině */}
          <div className="mt-12 flex-1 md:mt-14">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={s.id}
                initial={klid ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease } }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="grid gap-x-10 gap-y-6 md:grid-cols-[auto_1fr_auto] md:items-start"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-16 min-w-16 items-center justify-center rounded-[4px] bg-plate px-3 font-mono text-3xl font-bold text-white md:h-20 md:min-w-20 md:text-4xl">
                    {s.kod}
                  </span>
                  <div>
                    <p className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">{s.nazev}</p>
                    <p className="mt-1 text-muted">u nás: {s.cvicneVozidlo}</p>
                  </div>
                </div>

                <dl className="grid grid-cols-2 gap-x-8 gap-y-3 text-[0.95rem] sm:grid-cols-4 md:pt-1">
                  <Udaj nazev="Věk" hodnota={`od ${s.vek} let`} />
                  <Udaj nazev="Předchozí skupina" hodnota={s.podminka ?? "není potřeba"} />
                  <Udaj nazev="Výcvik" hodnota={s.jizdy} />
                  <Udaj nazev="Zkouška" hodnota={s.zkouska} />
                </dl>

                <div className="flex items-end justify-between gap-6 border-t border-line pt-4 md:flex-col md:items-end md:border-0 md:pt-0">
                  {ceny[s.id] != null && (
                    <p className="md:text-right">
                      <span className="block font-mono text-xs text-muted">kurz od</span>
                      <span className="tnum font-mono text-2xl font-semibold">
                        {ceny[s.id]!.toLocaleString("cs-CZ")} Kč
                      </span>
                    </p>
                  )}
                  <Link
                    href={`/skupiny/${s.id}`}
                    className="font-bold text-red underline decoration-2 underline-offset-[6px] hover:text-red-deep"
                  >
                    Skupina {s.kod} podrobně
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="pb-5 text-xs text-muted">
            Délky jsou orientační, podle vozidel, na kterých se u nás jezdí. Traktor je ilustrační.
          </p>
        </div>

        <motion.div aria-hidden className="absolute bottom-0 left-0 h-[3px] bg-plate" style={{ width: prubeh }} />
      </div>
    </section>
  );
}

function Udaj({ nazev, hodnota }: { nazev: string; hodnota: string }) {
  return (
    <div>
      <dt className="font-mono text-xs text-muted">{nazev}</dt>
      <dd className="mt-0.5 font-semibold">{hodnota}</dd>
    </div>
  );
}
