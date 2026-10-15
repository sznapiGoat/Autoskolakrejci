import type { Metadata } from "next";
import { MojeFrame } from "@/components/moje-frame";
import { Zahlavi } from "@/components/zahlavi";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Studovna pro žáky",
  description:
    "Přihlášení do studovny pro žáky autoškoly Krejčí: elektronická učebnice Schroter, výuková videa, testové otázky a plánování jízd.",
  alternates: { canonical: "/studovna" },
};

const ODKAZY = [
  {
    skupina: "Na zkoušku",
    polozky: [
      ["Testové otázky Ministerstva dopravy", "https://etesty2.mdcr.cz/Home/Tests/ro", "oficiální testy z pravidel"],
      ["Testy profesní způsobilosti", "https://etesty2.mdcr.cz/Home/Tests/zpz", "pro budoucí řidiče z povolání"],
    ],
  },
  {
    skupina: "Z čeho učíme",
    polozky: [
      ["Agentura Schroter", "https://www.schroter.cz", "učebnice a elektronická studovna"],
      ["Nakladatelství Vogel", "http://www.autoskola-vogel.cz", "výukové materiály pro autoškoly"],
      ["systemconsult.cz", "http://www.systemconsult.cz", "Ing. Ivo Machačka, CSc., pro profesní řidiče a dispečery"],
    ],
  },
  {
    skupina: "Pro řidiče z povolání",
    polozky: [
      ["Poradce profi řidiče", "https://www.poradce-ridice.cz", "doporučujeme profesním řidičům"],
      ["Sdružení profesionálních řidičů", "http://www.sdruzeniridicu.cz", ""],
      ["ČESMAD BOHEMIA", "http://www.prodopravce.cz", "sdružení silničních dopravců"],
      ["Centrum služeb pro silniční dopravu", "https://www.cspsd.cz", ""],
      ["Ministerstvo dopravy", "https://www.mdcr.cz", ""],
    ],
  },
] as const;

export default function Studovna() {
  return (
    <>
      <Zahlavi
        nadpis="Studovna"
        perex="Pro žáky, kteří už v kurzu jsou. Heslo dostanete v autoškole. Uvnitř najdete elektronickou učebnici Schroter, výuková videa, testy, jejichž výsledky vidí instruktor, a přihlašování na jízdy."
      />

      <div className="mx-auto grid max-w-[1320px] gap-16 px-4 pt-14 pb-24 md:px-8 md:pb-32 lg:grid-cols-12">
        <section aria-label="Přihlášení do studovny" className="lg:col-span-7">
          <div className="rounded-[3px] border border-line bg-white p-2 md:p-4">
            <MojeFrame src={SITE.moje.studovna} title="Přihlášení do studovny" vyska={720} />
          </div>
        </section>

        <section aria-labelledby="odkazy" className="lg:col-span-4 lg:col-start-9">
          <h2 id="odkazy" className="text-3xl font-extrabold tracking-tight">
            Užitečné odkazy
          </h2>
          {ODKAZY.map((g) => (
            <div key={g.skupina} className="mt-8">
              <h3 className="font-mono text-xs text-muted">{g.skupina}</h3>
              <ul className="mt-2 divide-y divide-line border-y border-line">
                {g.polozky.map(([nazev, href, popis]) => (
                  <li key={href}>
                    <a href={href} rel="noopener" className="block py-3 hover:text-red">
                      <span className="font-semibold">{nazev}</span>
                      {popis && <span className="block text-sm text-muted">{popis}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
