"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type Fotka = { src: string; alt: string };

/** Mřížka fotek, kliknutím se fotka otevře přes celou obrazovku v nativním <dialog>. */
export function Galerie({ fotky }: { fotky: Fotka[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [i, setI] = useState<number | null>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (i !== null && !d.open) d.showModal();
    if (i === null && d.open) d.close();
  }, [i]);

  const posun = (o: number) => setI((x) => (x === null ? x : (x + o + fotky.length) % fotky.length));

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {fotky.map((f, n) => (
          <li key={f.src}>
            <button
              type="button"
              onClick={() => setI(n)}
              className="relative block aspect-[16/9] w-full overflow-hidden rounded-[3px] bg-line"
              aria-label={`Zvětšit: ${f.alt}`}
            >
              <Image src={f.src} alt={f.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        onClose={() => setI(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") posun(1);
          if (e.key === "ArrowLeft") posun(-1);
        }}
        onClick={(e) => e.target === e.currentTarget && setI(null)}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-asphalt/95 p-0 text-white backdrop:bg-asphalt/80"
      >
        {i !== null && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-4 py-3 md:px-8">
              <p className="tnum font-mono text-sm text-white/60">
                {i + 1} / {fotky.length}
              </p>
              <button type="button" onClick={() => setI(null)} className="h-11 px-2 font-bold" autoFocus>
                Zavřít
              </button>
            </div>
            <div className="relative flex-1">
              <Image src={fotky[i].src} alt={fotky[i].alt} fill sizes="100vw" className="object-contain" />
            </div>
            <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
              <button type="button" onClick={() => posun(-1)} className="h-11 px-2 font-bold">
                Předchozí
              </button>
              <p className="text-center text-sm text-white/75">{fotky[i].alt}</p>
              <button type="button" onClick={() => posun(1)} className="h-11 px-2 font-bold">
                Další
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
