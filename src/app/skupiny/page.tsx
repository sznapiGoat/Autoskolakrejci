import type { Metadata } from "next";
import Link from "next/link";
import { VozidloNaSilnici } from "@/components/vozidla";
import { Zahlavi } from "@/components/zahlavi";
import { cenaSkupiny, getCenik, kc } from "@/lib/cenik";
import { SKUPINY } from "@/lib/skupiny";

export const metadata: Metadata = {
  title: "Skupiny řidičského oprávnění",
  description:
    "Skupiny B, BE, C, CE, D a T v autoškole Krejčí v Třebíči: věk, předchozí skupina, rozsah výcviku, zkouška a cena kurzu.",
  alternates: { canonical: "/skupiny" },
};

const SIRKA = 170;

export default async function Skupiny() {
  const cenik = await getCenik();

  return (
    <>
      <Zahlavi
        nadpis="Skupiny řidičského oprávnění"
        perex={
          <>
            Všechna vozidla jsou nakreslená ve stejném měřítku, aby byl vidět rozdíl. Podrobně skupiny upravuje §80 až §83
            zákona č. 361/2000 Sb.
          </>
        }
      />

      <section className="mx-auto max-w-[1320px] px-4 pb-24 md:px-8 md:pb-32">
        <ul>
          {SKUPINY.map((s) => {
            const cena = cenaSkupiny(cenik, s.id);
            return (
              <li key={s.id} className="border-b border-line">
                <Link
                  href={`/skupiny/${s.id}`}
                  className="group grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-4 py-7 md:grid-cols-[5rem_15rem_1fr_9rem] md:gap-x-8 md:py-6"
                >
                  <span className="flex h-14 min-w-14 items-center justify-center rounded-[4px] bg-plate px-2 font-mono text-2xl font-bold text-white transition-colors group-hover:bg-red md:h-16 md:min-w-16">
                    {s.kod}
                  </span>
                  <span>
                    <span className="block text-xl font-extrabold tracking-tight md:text-2xl">{s.nazev}</span>
                    <span className="mt-0.5 block text-muted">
                      od {s.vek} let{s.podminka ? `, se ${s.podminka.replace("skupina", "skupinou")}` : ""}
                    </span>
                  </span>
                  <VozidloNaSilnici
                    id={s.vozidlo}
                    sirka={SIRKA}
                    popis={`${s.nazev}, délka přibližně ${s.delka.toLocaleString("cs-CZ")} m`}
                    className="col-span-2 block h-auto w-full md:col-span-1"
                  />
                  <span className="col-span-2 flex items-baseline justify-between md:col-span-1 md:block md:text-right">
                    <span className="tnum font-mono text-sm text-muted md:block">cca {s.delka.toLocaleString("cs-CZ")} m</span>
                    {cena != null && <span className="tnum font-mono text-lg font-semibold md:block">od {kc(cena)}</span>}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">Rozšíření B96</h2>
            <p className="mt-3 max-w-[52ch] leading-relaxed text-ink-2">
              Osobák s přívěsem nad 750 kg, kde celá souprava váží nejvýš 4 250 kg. Platí v celé EU a zkouška je jen z jízdy,
              bez testu. V ceně je jedna hodina kondiční jízdy.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">Zkratky, které uvidíte v ceníku</h2>
            <dl className="mt-3 grid grid-cols-[4.5rem_1fr] gap-x-4 gap-y-2 text-ink-2">
              {[
                ["RB/C", "rozšíření ze skupiny B na C, obdobně RC/CE"],
                ["NPH", "největší povolená hmotnost"],
                ["PÚ", "praktická údržba"],
                ["OÚV", "ovládání a údržba vozidla, část zkoušky u C, CE a D"],
                ["ZK", "zkouška"],
                ["ORP", "obecní úřad obce s rozšířenou působností"],
              ].map(([z, v]) => (
                <div key={z} className="contents">
                  <dt className="font-mono font-semibold text-ink">{z}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
