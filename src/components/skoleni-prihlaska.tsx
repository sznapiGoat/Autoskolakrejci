"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import { MojeFrame } from "./moje-frame";

const UDALOST = "vyber-termin";
const FIRMY = "https://rokr.moje-autoskola.cz/prihlaska_firma.php?iframe=1";

/** Tlačítko v jízdním řádu: přepne formulář níž na daný termín a doroluje k němu. */
export function VybratTermin({ src, popis }: { src: string; popis: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        window.dispatchEvent(new CustomEvent(UDALOST, { detail: { src, popis } }));
        document.getElementById("prihlaska")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
      className="inline-flex h-11 items-center rounded-[3px] bg-red px-5 font-bold text-white transition-colors hover:bg-red-deep"
    >
      Přihlásit se
    </button>
  );
}

type Rezim = { src: string; popis: string };

export function SkoleniFormular() {
  const vychozi: Rezim = { src: SITE.moje.skoleni, popis: "Všechny termíny a poptávka školení" };
  const [rezim, setRezim] = useState<Rezim>(vychozi);

  useEffect(() => {
    const h = (e: Event) => setRezim((e as CustomEvent<Rezim>).detail);
    window.addEventListener(UDALOST, h);
    return () => window.removeEventListener(UDALOST, h);
  }, []);

  const volby: Rezim[] = [vychozi, { src: FIRMY, popis: "Hromadná přihláška pro firmy" }];
  const vlastni = !volby.some((v) => v.src === rezim.src);

  return (
    <div>
      <div role="tablist" aria-label="Typ přihlášky" className="mb-4 flex flex-wrap gap-2">
        {vlastni && (
          <button role="tab" aria-selected className="h-10 rounded-[3px] bg-plate px-4 text-sm font-bold text-white">
            {rezim.popis}
          </button>
        )}
        {volby.map((v) => (
          <button
            key={v.src}
            role="tab"
            aria-selected={rezim.src === v.src}
            onClick={() => setRezim(v)}
            className="h-10 rounded-[3px] border border-line-strong px-4 text-sm font-bold text-ink-2 hover:border-ink aria-selected:border-plate aria-selected:bg-plate aria-selected:text-white"
          >
            {v.popis}
          </button>
        ))}
      </div>
      <div className="rounded-[3px] border border-line bg-white p-2 md:p-4">
        <MojeFrame key={rezim.src} src={rezim.src} title={`Přihláška na školení: ${rezim.popis}`} vyska={760} />
      </div>
    </div>
  );
}
