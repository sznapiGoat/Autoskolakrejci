import type { Metadata } from "next";
import Link from "next/link";
import { Zahlavi } from "@/components/zahlavi";
import { getCenik, kc, POPLATKY, type Kurz } from "@/lib/cenik";

export const metadata: Metadata = {
  title: "Ceník kurzů",
  description:
    "Ceník autoškoly Krejčí v Třebíči: kurz B od 21 000 Kč, rozšíření na BE, C, CE, D a T, sdružené kurzy, kondiční jízdy a poplatky.",
  alternates: { canonical: "/cenik" },
};

const datum = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d}. ${m}. ${y}`;
};

export default async function Cenik() {
  const cenik = await getCenik();

  return (
    <>
      <Zahlavi
        nadpis="Ceník"
        perex={
          <>
            Ceny jsou konečné, nejsme plátci DPH. V ceně kurzu není správní poplatek {kc(POPLATKY.spravni)}, ten platíte úřadu,
            zpravidla v den zkoušky.
          </>
        }
      >
        {cenik.updatedAt && (
          <p className="pb-4 font-mono text-xs text-muted">Aktualizováno {datum(cenik.updatedAt)}</p>
        )}
      </Zahlavi>

      <div className="mx-auto max-w-[1320px] px-4 pb-24 md:px-8 md:pb-32">
        <Tabulka nadpis="Kurzy" popis="Výuka a výcvik pro jednotlivé skupiny" kurzy={cenik.mainCourses} />
        <Tabulka nadpis="Sdružené kurzy" popis="Dvě skupiny najednou, levněji než zvlášť" kurzy={cenik.combinedCourses} />

        <section className="mt-20 grid gap-8 lg:grid-cols-[18rem_1fr] lg:gap-16">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">Kondiční jízdy</h2>
            <p className="mt-3 text-ink-2">Doplňovací výcvik a opakované zkoušky z jízdy.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[340px] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-ink font-mono text-xs text-muted">
                  <th scope="col" className="py-3 pr-4 font-normal">Skupina</th>
                  <th scope="col" className="py-3 pr-4 text-right font-normal">Hodina jízdy</th>
                  <th scope="col" className="py-3 text-right font-normal">Opakovaná zkouška z jízdy</th>
                </tr>
              </thead>
              <tbody>
                {cenik.additionalDriving.map((k) => (
                  <tr key={k.group} className="border-b border-line">
                    <th scope="row" className="py-4 pr-4">
                      <Kod>{k.group}</Kod>
                    </th>
                    <td className="tnum py-4 pr-4 text-right font-mono text-lg font-semibold">{kc(k.hourPrice)}</td>
                    <td className="tnum py-4 text-right font-mono text-lg font-semibold">
                      {kc(k.examPrice)}
                      <span className="block text-sm font-normal text-muted sm:ml-2 sm:inline">+ {kc(POPLATKY.opakovanaJizdaOrp)} úřad</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-20 grid gap-12 border-t-2 border-ink pt-12 md:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">Co je v ceně kurzu</h2>
            <ul className="mt-4 space-y-3 leading-relaxed text-ink-2">
              <li>Tištěná učebnice a výukové CD pro skupiny B, BE, C, CE, T a D.</li>
              <li>U C, CE a D navíc učebnice ovládání a údržby vozidel.</li>
              <li>
                Online přístup do{" "}
                <Link href="/studovna" className="font-semibold text-ink underline underline-offset-4 hover:text-red">
                  studovny
                </Link>
                : elektronická učebnice Schroter, výuková videa a testové otázky, jejichž výsledky instruktor vidí.
              </li>
              <li>Testy se píšou doma. Učebna patří výkladu a vysvětlování toho, co nejde.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">Další poplatky</h2>
            <dl className="mt-4 divide-y divide-line border-y border-line">
              <Poplatek nazev="Správní poplatek za zkoušku" cena={kc(POPLATKY.spravni)} pozn="platí se úřadu" />
              <Poplatek
                nazev="Opakovaná zkouška z testu"
                cena={kc(POPLATKY.opakovanyTest.autoskola)}
                pozn={`+ ${kc(POPLATKY.opakovanyTest.orp)} úřad`}
              />
              <Poplatek
                nazev="Opakovaná zkouška z OÚV (C, CE, D)"
                cena={kc(POPLATKY.opakovaneOuv.autoskola)}
                pozn={`+ ${kc(POPLATKY.opakovaneOuv.orp)} úřad`}
              />
              <Poplatek
                nazev="Neomluvená jízda"
                cena={kc(POPLATKY.prostoj)}
                pozn="omluvit se dá do 19:00 předchozího dne"
              />
            </dl>
          </div>
        </section>
      </div>
    </>
  );
}

function Kod({ children }: { children: string }) {
  return (
    <span className="inline-flex h-8 min-w-10 items-center justify-center rounded-[3px] bg-plate px-2 font-mono text-sm font-bold text-white">
      {children}
    </span>
  );
}

/** Rozdělí „B ("klasický" kurz)“ na kód a doplněk, „RB/C“ na rozšíření z B na C. */
function rozloz(group: string): { kod: string; popis: string | null } {
  const m = group.match(/^([A-Z0-9/+]+)\s*(?:\((.*)\))?$/);
  if (!m) return { kod: group, popis: null };
  const [, kod, doplnek] = m;
  if (doplnek) return { kod, popis: doplnek.replace(/"/g, "") };
  const r = kod.match(/^R([A-Z]+)\/(.+)$/);
  if (r) return { kod: r[2], popis: `rozšíření z ${r[1]}` };
  return { kod, popis: "bez řidičáku" };
}

// Řádky v ceníku seřadíme podle skupiny, ke které vedou, ať k sobě patří B, T i D.
const PORADI = ["B", "B96", "BE", "T", "C", "CE", "D", "B+T", "CE+D"];
const poradi = (k: Kurz) => {
  const i = PORADI.indexOf(rozloz(k.group).kod);
  return i === -1 ? PORADI.length : i;
};

function Tabulka({ nadpis, popis, kurzy }: { nadpis: string; popis: string; kurzy: Kurz[] }) {
  return (
    <section className="mt-16 grid gap-8 first:mt-14 lg:grid-cols-[18rem_1fr] lg:gap-16">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight">{nadpis}</h2>
        <p className="mt-3 text-ink-2">{popis}</p>
      </div>
      <table className="w-full border-collapse text-left">
        <thead className="sr-only">
          <tr>
            <th scope="col">Kurz</th>
            <th scope="col">Co obsahuje</th>
            <th scope="col">Cena</th>
          </tr>
        </thead>
        <tbody>
          {[...kurzy].sort((x, y) => poradi(x) - poradi(y)).map((k) => {
            const { kod, popis } = rozloz(k.group);
            return (
              <tr key={k.group} className="border-b border-line first:border-t-2 first:border-t-ink">
                <th scope="row" className="w-[1%] py-5 pr-5 align-top whitespace-nowrap">
                  <Kod>{kod}</Kod>
                </th>
                <td className="py-5 pr-4 align-top">
                  {popis && <span className="block font-bold first-letter:uppercase">{popis}</span>}
                  <span className={`block text-ink-2 ${popis ? "mt-0.5 text-[0.95rem]" : ""}`}>{k.note}</span>
                </td>
                <td className="tnum py-5 text-right align-top font-mono text-lg font-semibold whitespace-nowrap md:text-xl">
                  {kc(Number(k.price))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

function Poplatek({ nazev, cena, pozn }: { nazev: string; cena: string; pozn: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-4">
      <dt>
        <span className="block font-semibold">{nazev}</span>
        <span className="text-sm text-muted">{pozn}</span>
      </dt>
      <dd className="tnum font-mono text-lg font-semibold whitespace-nowrap">{cena}</dd>
    </div>
  );
}
