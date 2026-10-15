import type { Metadata } from "next";
import Image from "next/image";
import { MojeFrame } from "@/components/moje-frame";
import { Zahlavi } from "@/components/zahlavi";
import { SITE, SKOLENI_MISTA } from "@/lib/site";

export const metadata: Metadata = {
  title: "Školení řidičů",
  description:
    "Akreditované školicí středisko v Třebíči: pravidelná školení profesních řidičů podle zákona 247/2000 Sb., vstupní školení C, CE a D a školení referentů. Třebíč, Jaroměřice nad Rokytnou, Přibyslavice.",
  alternates: { canonical: "/skoleni-ridicu" },
};

const DRUHY = [
  {
    nazev: "Pravidelné školení profesních řidičů",
    text: "Pro řidiče s průkazem profesní způsobilosti, podle zákona 247/2000 Sb.",
  },
  {
    nazev: "Vstupní školení C, CE a D",
    text: "Pro ty, kdo chtějí jezdit z povolání. Po něm následuje zkouška z profesní způsobilosti.",
  },
  {
    nazev: "Školení referentů",
    text: "Pro zaměstnance, kteří řídí služební auto.",
  },
];

export default function Skoleni() {
  return (
    <>
      <Zahlavi
        nadpis="Školení řidičů"
        perex="Jsme akreditované školicí středisko. Školíme v Třebíči, v Jaroměřicích nad Rokytnou a v Přibyslavicích. Na místě se dá koupit oběd a občerstvení."
      />

      <section className="mx-auto max-w-[1320px] px-4 pt-14 md:px-8">
        <ul className="grid gap-x-10 md:grid-cols-3">
          {DRUHY.map((d) => (
            <li key={d.nazev} className="border-b border-line py-6 md:border-b-0 md:border-l md:py-0 md:pl-6 md:first:border-l-0 md:first:pl-0">
              <h2 className="text-xl font-extrabold tracking-tight md:text-2xl">{d.nazev}</h2>
              <p className="mt-2 leading-relaxed text-ink-2">{d.text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm text-muted">
          Podrobnosti upravuje{" "}
          <a href="https://www.zakonyprolidi.cz/cs/2000-247" className="underline underline-offset-2 hover:text-ink" rel="noopener">
            zákon č. 247/2000 Sb.
          </a>
        </p>
      </section>

      <section aria-labelledby="mista" className="mx-auto max-w-[1320px] px-4 pt-20 md:px-8 md:pt-28">
        <h2 id="mista" className="text-3xl font-extrabold tracking-tight md:text-4xl">
          Kde školíme
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {SKOLENI_MISTA.map((m) => (
            <div key={m.mesto}>
              <div className="aspect-[4/3] overflow-hidden rounded-[3px] border border-line bg-white">
                <iframe src={m.frame} title={`Mapa: ${m.mesto}, ${m.adresa}`} loading="lazy" className="h-full w-full border-0" />
              </div>
              <p className="mt-3 text-xl font-bold">{m.mesto}</p>
              <p className="text-ink-2">{m.adresa}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="prihlaska-skoleni" className="mx-auto mt-20 max-w-[1320px] px-4 pb-24 md:mt-28 md:px-8 md:pb-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="prihlaska-skoleni" className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Přihláška na školení
            </h2>
            <p className="mt-4 leading-relaxed text-ink-2">
              Vyberte vypsaný termín, nebo pošlete poptávku. U poptávky zvolte v nabídce i druh školení, například pravidelné
              sedmihodinové nebo referentské.
            </p>
            <p className="mt-4 leading-relaxed text-ink-2">
              Nebo se ozvěte napřímo: SMS, telefonem, e-mailem nebo osobně.
            </p>
            <div className="mt-5 space-y-1">
              <a href={SITE.phoneHref} className="tnum block font-mono text-xl font-semibold hover:text-red">
                {SITE.phone}
              </a>
              <a href={SITE.emailHref} className="block underline underline-offset-4 hover:text-red">
                {SITE.email}
              </a>
            </div>
            <div className="relative mt-10 hidden aspect-[4/5] overflow-hidden rounded-[3px] bg-line lg:block">
              <Image
                src="/foto/iveco-detail-kabiny.jpg"
                alt="Kabina červeného Iveca autoškoly s tabulkou L a samolepkou autoškoly"
                fill
                sizes="30vw"
                className="object-cover object-[60%_50%]"
              />
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="rounded-[3px] border border-line bg-white p-2 md:p-4">
              <MojeFrame src={SITE.moje.skoleni} title="Přihláška na školení řidičů" vyska={700} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
