import type { Metadata } from "next";
import Link from "next/link";
import { drobecky, JsonLd } from "@/components/json-ld";
import { cenaSkupiny, getCenik, kc, POPLATKY, type Kurz } from "@/lib/cenik";

export const metadata: Metadata = {
  title: { absolute: "Ceník autoškoly Třebíč 2026 | řidičák B od 21 000 Kč | Autoškola Krejčí" },
  description:
    "Ceník autoškoly Krejčí v Třebíči: řidičák B od 21 000 Kč, rozšíření na BE, C, CE, D a T, sdružené kurzy, kondiční jízdy a poplatky. Nejsme plátci DPH.",
  alternates: { canonical: "/cenik" },
};

const datum = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d}. ${m}. ${y}`;
};

const ODDILY = [
  { id: "kurzy", nazev: "Kurzy" },
  { id: "sdruzene", nazev: "Sdružené kurzy" },
  { id: "kondicni", nazev: "Kondiční jízdy" },
  { id: "poplatky", nazev: "V ceně a mimo cenu" },
];

export default async function Cenik() {
  const cenik = await getCenik();
  const cenaB = cenaSkupiny(cenik, "b");

  return (
    <>
      <JsonLd
        data={drobecky([
          { nazev: "Úvod", cesta: "/" },
          { nazev: "Ceník", cesta: "/cenik" },
        ])}
      />

      <div className="mx-auto grid max-w-[1320px] gap-12 px-4 pt-10 pb-24 md:px-8 md:pt-16 md:pb-32 lg:grid-cols-[19rem_1fr] lg:gap-20">
        {/* Tarifní list: lepivý souhrn */}
        <aside className="lg:sticky lg:top-[104px] lg:self-start">
          <h1 className="text-[clamp(2.6rem,6vw,4.2rem)] font-extrabold leading-[0.98] tracking-[-0.03em]">Ceník autoškoly</h1>
          <dl className="mt-8 divide-y divide-line border-y-2 border-ink">
            {cenaB && <Souhrn nazev="Řidičák B" hodnota={`od ${kc(cenaB)}`} />}
            <Souhrn nazev="Správní poplatek" hodnota={kc(POPLATKY.spravni)} pozn="platí se úřadu, v ceně není" />
            <Souhrn nazev="DPH" hodnota="nejsme plátci" />
          </dl>
          {cenik.updatedAt && <p className="mt-4 font-mono text-xs text-muted">Aktualizováno {datum(cenik.updatedAt)}</p>}
          <nav aria-label="Oddíly ceníku" className="mt-10 hidden lg:block">
            <ul className="space-y-2">
              {ODDILY.map((o) => (
                <li key={o.id}>
                  <a href={`#${o.id}`} className="font-semibold text-ink-2 hover:text-red">
                    {o.nazev}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="min-w-0">
          <Tabulka id="kurzy" nadpis="Kurzy" popis="Výuka a výcvik pro jednotlivé skupiny" kurzy={cenik.mainCourses} />
          <Tabulka
            id="sdruzene"
            nadpis="Sdružené kurzy"
            popis="Dvě skupiny najednou, levněji než zvlášť"
            kurzy={cenik.combinedCourses}
          />

          <section id="kondicni" aria-labelledby="kondicni-h" className="mt-20 scroll-mt-28">
            <h2 id="kondicni-h" className="text-3xl font-extrabold tracking-tight">
              Kondiční jízdy
            </h2>
            <p className="mt-2 text-ink-2">Doplňovací výcvik a opakované zkoušky z jízdy.</p>
            <table className="mt-6 w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-ink font-mono text-xs text-muted">
                  <th scope="col" className="py-3 pr-4 font-normal">
                    Skupina
                  </th>
                  <th scope="col" className="py-3 pr-4 text-right font-normal">
                    Hodina jízdy
                  </th>
                  <th scope="col" className="py-3 text-right font-normal">
                    Opakovaná zkouška
                  </th>
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
                      <span className="block text-sm font-normal text-muted sm:ml-2 sm:inline">
                        + {kc(POPLATKY.opakovanaJizdaOrp)} úřad
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section id="poplatky" aria-labelledby="poplatky-h" className="mt-20 grid scroll-mt-28 gap-12 md:grid-cols-2">
            <h2 id="poplatky-h" className="sr-only">
              Co je v ceně a další poplatky
            </h2>
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight">Co je v ceně kurzu</h3>
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
              <h3 className="text-2xl font-extrabold tracking-tight">Další poplatky</h3>
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
                <Poplatek nazev="Neomluvená jízda" cena={kc(POPLATKY.prostoj)} pozn="omluvit se dá do 19:00 předchozího dne" />
              </dl>
            </div>
          </section>

          <p className="mt-16 border-l-[3px] border-red pl-5 text-ink-2">
            Co která skupina obnáší a od kolika let ji můžete dělat, najdete u{" "}
            <Link href="/skupiny" className="font-semibold text-ink underline underline-offset-4 hover:text-red">
              skupin řidičského oprávnění
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}

function Souhrn({ nazev, hodnota, pozn }: { nazev: string; hodnota: string; pozn?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3.5">
      <dt>
        <span className="block font-semibold">{nazev}</span>
        {pozn && <span className="text-sm text-muted">{pozn}</span>}
      </dt>
      <dd className="tnum font-mono text-lg font-semibold whitespace-nowrap">{hodnota}</dd>
    </div>
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

function Tabulka({ id, nadpis, popis, kurzy }: { id: string; nadpis: string; popis: string; kurzy: Kurz[] }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="mt-20 scroll-mt-28 first:mt-0">
      <h2 id={`${id}-h`} className="text-3xl font-extrabold tracking-tight">
        {nadpis}
      </h2>
      <p className="mt-2 text-ink-2">{popis}</p>
      <table className="mt-6 w-full border-collapse text-left">
        <thead className="sr-only">
          <tr>
            <th scope="col">Kurz</th>
            <th scope="col">Co obsahuje</th>
            <th scope="col">Cena</th>
          </tr>
        </thead>
        <tbody>
          {[...kurzy]
            .sort((x, y) => poradi(x) - poradi(y))
            .map((k) => {
              const { kod, popis } = rozloz(k.group);
              return (
                <tr key={k.group} className="border-b border-line first:border-t-2 first:border-t-ink">
                  <th scope="row" className="w-[1%] py-5 pr-5 align-top whitespace-nowrap">
                    <Kod>{kod}</Kod>
                  </th>
                  <td className="py-5 pr-4 align-top">
                    {popis && <span className="block font-bold first-letter:uppercase">{popis}</span>}
                    <span className="mt-0.5 block text-[0.95rem] text-ink-2">{k.note}</span>
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
