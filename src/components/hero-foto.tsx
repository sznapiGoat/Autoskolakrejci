"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

/*
  Fotka vozidla z boku s kótou přes skutečné auto.
  Všechny polohy jsou zlomky původní fotky (0 až 1), ořez je jen okno do ní.
  Po dodání nové fotky stačí přepsat FOTKA.
*/
const FOTKA = {
  src: "/foto/hero-iveco-plocha.jpg",
  alt: "Červené Iveco autoškoly s plachtou a tabulkou L couvá na cvičné ploše mezi kužely, v kabině sedí žák",
  sirka: 2400,
  vyska: 1350,
  /** okno ořezu ve výšce */
  orez: { horni: 0.14, dolni: 0.86 },
  /** vozidlo: předek, zadek, střecha, vozovka */
  auto: { x0: 0.176, x1: 0.771, y0: 0.3, y1: 0.755 },
  delka: "8,6",
  skupina: { kod: "C", text: "Nákladní automobil, od 21 let" },
};

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroFoto() {
  const klid = useReducedMotion() ?? false;
  const { orez, auto } = FOTKA;
  const okno = orez.dolni - orez.horni;
  // převod svislé polohy z celé fotky do okna ořezu
  const y = (v: number) => `${((v - orez.horni) / okno) * 100}%`;
  const x = (v: number) => `${v * 100}%`;
  const kotaY = auto.y0 - 0.07;

  return (
    <figure className="relative">
      <div
        className="relative w-full overflow-hidden bg-line"
        style={{ aspectRatio: `${FOTKA.sirka} / ${FOTKA.vyska * okno}` }}
      >
        <div className="absolute inset-x-0" style={{ top: `${(-orez.horni / okno) * 100}%`, height: `${100 / okno}%` }}>
          <Image src={FOTKA.src} alt={FOTKA.alt} fill preload sizes="100vw" className="object-cover" />
        </div>

        {/* technická vrstva */}
        <div aria-hidden className="absolute inset-0">
          {/* vynášecí čáry od střechy ke kótě */}
          {[auto.x0, auto.x1].map((v) => (
            <motion.span
              key={v}
              className="absolute w-px bg-white/90"
              style={{ left: x(v), top: y(kotaY - 0.02), height: `calc(${y(auto.y0)} - ${y(kotaY - 0.02)})`, originY: 1 }}
              initial={klid ? false : { scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, ease, delay: 0.5 }}
            />
          ))}

          {/* kóta */}
          <motion.span
            className="absolute h-[2px] bg-white shadow-[0_0_0_1px_rgba(20,22,27,0.15)]"
            style={{ left: x(auto.x0), width: x(auto.x1 - auto.x0), top: y(kotaY) }}
            initial={klid ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease, delay: 0.8 }}
          />
          {[auto.x0, auto.x1].map((v) => (
            <span
              key={`t${v}`}
              className="absolute h-3 w-[2px] -translate-x-1/2 -translate-y-1/2 bg-white"
              style={{ left: x(v), top: y(kotaY) }}
            />
          ))}
          <motion.span
            className="tnum absolute -translate-x-1/2 -translate-y-1/2 rounded-[3px] bg-white px-2 py-0.5 font-mono text-xs font-semibold text-plate sm:text-sm md:px-2.5 md:py-1 md:text-base"
            style={{ left: x((auto.x0 + auto.x1) / 2), top: y(kotaY) }}
            initial={klid ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease, delay: 1.3 }}
          >
            cca {FOTKA.delka} m
          </motion.span>

          {/* štítek skupiny pod předkem vozidla */}
          <motion.span
            className="absolute hidden items-center gap-2.5 rounded-[3px] bg-white py-1.5 pr-3 pl-1.5 sm:flex"
            style={{ left: x(auto.x0), top: `calc(${y(auto.y1)} + 14px)` }}
            initial={klid ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease, delay: 1.45 }}
          >
            <span className="flex h-7 min-w-7 items-center justify-center rounded-[2px] bg-plate px-1 font-mono text-sm font-bold text-white">
              {FOTKA.skupina.kod}
            </span>
            <span className="text-sm font-semibold text-ink">{FOTKA.skupina.text}</span>
          </motion.span>
        </div>
      </div>
      <figcaption className="sr-only">{FOTKA.alt}</figcaption>
    </figure>
  );
}
