import Link from "next/link";
import type { CSSProperties } from "react";
import { SKUPINY } from "@/lib/skupiny";
import { TVARY } from "@/lib/tvary";
import { Vozidlo } from "./vozidla";

/*
  Kolona vozového parku na silnici v hero. Všechna vozidla ve stejném měřítku
  (--m = délka jednoho decimetru na obrazovce, roste s výškou i šířkou okna) projíždějí zleva doprava, sada je dvakrát za sebou,
  aby smyčka navazovala. Rychlost je v dm/s, z ní se počítá délka smyčky i otáčky kol.
*/
const RYCHLOST = 34; // dm/s, zhruba 12 km/h
const MEZERA = 16; // dm mezi vozidly
const OKRAJ = 2; // dm kolem kresby, aby se kola a obrysy neořízly

const metry = (n: number) => n.toLocaleString("cs-CZ", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export function Kolona() {
  const sirkaSady = SKUPINY.reduce((acc, s) => acc + TVARY[s.vozidlo].delka + OKRAJ * 2 + MEZERA, 0);
  const trvani = sirkaSady / RYCHLOST;

  return (
    <div className="kolona relative" style={{ "--m": "clamp(2.2px, min(0.46svh, 0.3vw), 4.8px)" } as CSSProperties}>
      <div
        className="overflow-hidden motion-reduce:overflow-x-auto"
        style={{
          maskImage: "linear-gradient(to right, transparent, #000 4%, #000 96%, transparent)",
        }}
      >
        <div className="kolona-stopa flex w-max" style={{ animationDuration: `${trvani}s` } as CSSProperties}>
          {[0, 1].map((kopie) => (
            <ul key={kopie} className="flex items-end" aria-hidden={kopie === 1 || undefined}>
              {SKUPINY.map((s) => {
                const delka = TVARY[s.vozidlo].delka;
                return (
                  <li
                    key={s.id}
                    style={{
                      width: `calc(var(--m) * ${delka + OKRAJ * 2})`,
                      marginRight: `calc(var(--m) * ${MEZERA})`,
                    }}
                  >
                    <Link
                      href={`/skupiny/${s.id}`}
                      tabIndex={kopie === 1 ? -1 : undefined}
                      aria-label={kopie === 1 ? undefined : `${s.h1}, skupina ${s.kod}`}
                      className="group flex flex-col items-end gap-2 outline-offset-4"
                    >
                      <span className="flex items-center gap-1.5 whitespace-nowrap">
                        <span className="flex h-7 min-w-7 items-center justify-center rounded-[3px] bg-plate px-1.5 font-mono text-[0.8rem] font-bold text-white transition-colors group-hover:bg-red md:h-8 md:min-w-8 md:text-sm">
                          {s.kod}
                        </span>
                        <span className="tnum hidden font-mono text-xs text-muted sm:inline">{metry(s.delka)} m</span>
                      </span>
                      <svg
                        viewBox={`${-OKRAJ} -38 ${delka + OKRAJ * 2} 38`}
                        className="block h-auto w-full overflow-visible"
                        aria-hidden
                      >
                        <Vozidlo id={s.vozidlo} rychlost={RYCHLOST} />
                      </svg>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </div>

      {/* silnice: stojí, vozidla po ní jedou */}
      <div className="relative h-[calc(var(--m)*7)] bg-asphalt" aria-hidden>
        <div
          className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2"
          style={{
            backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.85) 55%, transparent 55%)",
            backgroundSize: "calc(var(--m) * 30) 2px",
          }}
        />
      </div>
    </div>
  );
}
