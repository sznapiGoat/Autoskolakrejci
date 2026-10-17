"use client";

import { motion, type Variants } from "motion/react";
import type { VozidloId } from "@/lib/skupiny";
import { TVARY, type Barva, type Kolo, type Znacka } from "@/lib/tvary";

const FILL: Record<Barva, string> = {
  red: "var(--red)",
  glass: "var(--glass)",
  ink: "var(--ink)",
  ink2: "var(--ink-2)",
  white: "var(--white)",
  steel: "#8a929e",
  tarp: "#e4e7eb",
  board: "var(--line-strong)",
  plate: "var(--plate)",
};

/** Tabulka L z cvičných vozidel: modrý čtverec, bílé L. */
export function TabulkaL({ x, y, s }: Znacka) {
  const t = s * 0.16;
  return (
    <g>
      <rect x={x} y={y} width={s} height={s} rx={s * 0.08} fill="var(--plate)" />
      <path
        d={`M${x + s * 0.32},${y + s * 0.18} h${t} v${s * 0.5} h${s * 0.3} v${t} h${-(s * 0.3 + t)} Z`}
        fill="var(--white)"
      />
    </g>
  );
}

const obvod = (r: number) => 2 * Math.PI * r;

export type Jizda = { prijezd: number; odjezd: number; klid: boolean };

function KoloV({ x, r, jizda, rychlost }: Kolo & { jizda: Jizda; rychlost?: number }) {
  // Kolo se otočí přesně o tolik, kolik vozidlo ujede.
  const stupne = (dm: number) => (dm / obvod(r)) * 360;
  const variants: Variants = jizda.klid
    ? {}
    : {
        enter: { rotate: -stupne(jizda.prijezd) },
        rest: { rotate: 0, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
        leave: { rotate: stupne(jizda.odjezd), transition: { duration: 0.6, ease: [0.55, 0, 1, 0.45] } },
      };
  return (
    <g transform={`translate(${x},${-r})`}>
      <motion.g variants={variants} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        {/* při nepřetržité jízdě se kolo otočí jednou za ujetí svého obvodu */}
        <g className={rychlost ? "kolo-toci" : undefined} style={rychlost ? { animationDuration: `${obvod(r) / rychlost}s` } : undefined}>
        <circle r={r} fill="var(--ink)" />
        <circle r={r * 0.58} fill="#c9ced6" />
        <path
          d={`M${-r * 0.5},0 H${r * 0.5} M0,${-r * 0.5} V${r * 0.5}`}
          stroke="var(--ink-2)"
          strokeWidth={r * 0.12}
        />
        <circle r={r * 0.17} fill="var(--ink)" />
        </g>
      </motion.g>
    </g>
  );
}

export function Vozidlo({ id, jizda, rychlost }: { id: VozidloId; jizda?: Jizda; /** dm/s, kola se točí nepřetržitě */ rychlost?: number }) {
  const t = TVARY[id];
  const j = jizda ?? { prijezd: 0, odjezd: 0, klid: true };
  return (
    <g>
      {t.dily.map((p, i) => (
        <path
          key={i}
          d={p.d}
          fill={FILL[p.fill]}
          stroke={p.obrys ? "var(--ink)" : undefined}
          strokeWidth={p.obrys ? 1.2 : undefined}
          vectorEffect="non-scaling-stroke"
          strokeLinejoin="round"
        />
      ))}
      {t.elka.map((z, i) => (
        <TabulkaL key={i} {...z} />
      ))}
      {t.kola.map((k, i) => (
        <KoloV key={i} {...k} jizda={j} rychlost={rychlost} />
      ))}
    </g>
  );
}

/**
 * Vozidlo na vozovce v pevném měřítku. `sirka` je šířka plátna v decimetrech,
 * takže dvě vozidla se stejnou šířkou plátna jsou spolu porovnatelná.
 */
export function VozidloNaSilnici({
  id,
  sirka,
  className,
  popis,
}: {
  id: VozidloId;
  sirka?: number;
  className?: string;
  /** bez popisu je kresba jen dekorace a čtečky ji přeskočí */
  popis?: string;
}) {
  const t = TVARY[id];
  const w = sirka ?? t.delka + 4;
  return (
    <svg
      viewBox={`${t.delka + 2 - w} -38 ${w} 40`}
      className={className}
      role={popis ? "img" : undefined}
      aria-label={popis || undefined}
      aria-hidden={popis ? undefined : true}
    >
      <Vozidlo id={id} />
      <line
        x1={t.delka + 2 - w}
        x2={t.delka + 2}
        y1={0}
        y2={0}
        stroke="var(--ink)"
        strokeWidth={1.5}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Jen obrys: karoserie a kola čárkovaně, pro srovnání s ostatními skupinami. */
export function Obrys({ id }: { id: VozidloId }) {
  const t = TVARY[id];
  return (
    <g fill="none" stroke="var(--line-strong)" strokeWidth={1} strokeDasharray="3 3">
      {t.dily
        .filter((p) => p.obrys)
        .map((p, i) => (
          <path key={i} d={p.d} vectorEffect="non-scaling-stroke" />
        ))}
      {t.kola.map((k, i) => (
        <circle key={i} cx={k.x} cy={-k.r} r={k.r} vectorEffect="non-scaling-stroke" />
      ))}
    </g>
  );
}
