"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { TVARY } from "@/lib/tvary";
import { Vozidlo } from "./vozidla";

export type Zastavka = { nazev: string; text: string };

/** Silnice se zastávkami. Fabia po ní projede podle toho, kam jste dočetli. */
export function Cesta({ zastavky }: { zastavky: Zastavka[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const klid = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.55"] });
  const hladce = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const left = useTransform(hladce, [0, 1], ["0%", "100%"]);
  const x = useTransform(hladce, [0, 1], ["0%", "-100%"]);
  const fabia = TVARY.fabia;

  return (
    <div ref={ref}>
      {/* desktop: vodorovná silnice */}
      <div className="relative hidden md:block">
        <div className="relative h-[72px]">
          <motion.div
            className="absolute bottom-[14px] w-[96px]"
            style={klid ? { left: "100%", x: "-100%" } : { left, x }}
            aria-hidden
          >
            <svg viewBox={`-1 -18 ${fabia.delka + 2} 19`} className="block w-full overflow-visible">
              <Vozidlo id="fabia" />
            </svg>
          </motion.div>
        </div>
        <div className="relative h-[14px] bg-asphalt">
          <div
            className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2"
            style={{
              backgroundImage: "linear-gradient(to right, var(--white) 60%, transparent 60%)",
              backgroundSize: "28px 2px",
            }}
          />
        </div>
        <ol className="grid grid-cols-5">
          {zastavky.map((z, i) => (
            <li key={z.nazev} className="relative pt-8 pr-6">
              <span
                className="absolute top-0 left-0 h-6 w-[3px] bg-red"
                style={i === zastavky.length - 1 ? { left: "auto", right: 0 } : undefined}
                aria-hidden
              />
              <h3 className={`text-xl font-extrabold tracking-tight ${i === zastavky.length - 1 ? "text-right" : ""}`}>
                {z.nazev}
              </h3>
              <p className={`mt-2 text-[0.95rem] leading-relaxed text-ink-2 ${i === zastavky.length - 1 ? "text-right" : ""}`}>
                {z.text}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* mobil: svislá čára */}
      <ol className="relative border-l-[3px] border-asphalt pl-6 md:hidden">
        {zastavky.map((z) => (
          <li key={z.nazev} className="relative pb-8 last:pb-0">
            <span className="absolute top-1.5 -left-[33px] size-[15px] rounded-full border-[3px] border-asphalt bg-white" aria-hidden />
            <h3 className="text-xl font-extrabold tracking-tight">{z.nazev}</h3>
            <p className="mt-1.5 leading-relaxed text-ink-2">{z.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
