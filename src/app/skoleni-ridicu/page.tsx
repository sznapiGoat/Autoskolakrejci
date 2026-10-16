import type { Metadata } from "next";
import { AUTOSKOLA, drobecky, JsonLd } from "@/components/json-ld";
import { Mapa } from "@/components/mapa";
import { SkoleniFormular, VybratTermin } from "@/components/skoleni-prihlaska";
import { SITE, SKOLENI_MISTA } from "@/lib/site";
import { getTerminy, prihlaskaTerminu, type Termin } from "@/lib/terminy";

export const metadata: Metadata = {
  title: { absolute: "Školení řidičů Třebíč a Jaroměřice nad Rokytnou | termíny | Autoškola Krejčí" },
  description:
    "Pravidelná školení profesních řidičů podle zákona 247/2000 Sb., vstupní školení C, CE a D a školení referentů. Aktuální termíny v Třebíči, Jaroměřicích nad Rokytnou a Přibyslavicích, přihláška online.",
  alternates: { canonical: "/skoleni-ridicu" },
};

const DRUHY = [
  {
    nazev: "Pravidelné školení profesních řidičů",
    text: "Sedm hodin podle §48 zákona 247/2000 Sb. pro řidiče s průkazem profesní způsobilosti.",
  },
  {
    nazev: "Vstupní školení C, CE a D",
    text: "Pro ty, kdo chtějí jezdit z povolání. Po něm následuje zkouška z profesní způsobilosti.",
  },
  {
    nazev: "Školení referentů",
    text: "Pro zaměstnance, kteří v práci řídí služební auto.",
  },
];

/** „pravidelné školení (7 hod. dle §48 …)“ → název a doplněk zvlášť */
function rozlozTyp(typ: string) {
  const velke = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
  const i = typ.indexOf(" (");
  if (i === -1) return { nazev: velke(typ), doplnek: null };
  return { nazev: velke(typ.slice(0, i)), doplnek: typ.slice(i + 2, -1) };
}

export default async function Skoleni() {
  const terminy = await getTerminy();

  const ld = [
    drobecky([
      { nazev: "Úvod", cesta: "/" },
      { nazev: "Školení řidičů", cesta: "/skoleni-ridicu" },
    ]),
    ...terminy.map((t) => ({
      "@context": "https://schema.org",
      "@type": "EducationEvent",
      name: `${rozlozTyp(t.typ).nazev}, ${t.misto}`,
      startDate: t.iso,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: { "@type": "Place", name: t.misto, address: t.misto },
      organizer: AUTOSKOLA,
      url: `${SITE.url}/skoleni-ridicu`,
    })),
  ];

  return (
    <>
      <JsonLd data={ld} />

      {/* Jízdní řád */}
      <section className="bg-asphalt text-white">
        <div className="mx-auto max-w-[1320px] px-4 pt-12 pb-16 md:px-8 md:pt-20 md:pb-24">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
            <h1 className="text-[clamp(2.4rem,6vw,4.8rem)] font-extrabold leading-[0.98] tracking-[-0.03em]">
              Školení řidičů
            </h1>
            <p className="max-w-[48ch] text-lg leading-relaxed text-white/75 lg:pb-2">
              Akreditované školicí středisko. Školíme v Třebíči, v Jaroměřicích nad Rokytnou a v Přibyslavicích, na místě se
              dá koupit oběd a občerstvení.
            </p>
          </div>

          <div className="mt-12 md:mt-16">
            <h2 className="flex items-baseline justify-between border-b border-white/25 pb-3 font-mono text-xs font-normal text-white/60">
              <span>Vypsané termíny</span>
              <span>aktualizuje se z rezervačního systému</span>
            </h2>
            {terminy.length > 0 ? (
              <ol>
                {terminy.map((t) => (
                  <Radek key={t.id} t={t} />
                ))}
              </ol>
            ) : (
              <p className="border-b border-white/15 py-8 text-lg text-white/80">
                Teď nejsou vypsané žádné termíny. Pošlete níž poptávku školení, nebo zavolejte na{" "}
                <a href={SITE.phoneHref} className="tnum font-mono font-semibold text-white underline underline-offset-4">
                  {SITE.phone}
                </a>
                .
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Druhy školení */}
      <section aria-labelledby="druhy" className="mx-auto max-w-[1320px] px-4 py-20 md:px-8 md:py-28">
        <h2 id="druhy" className="sr-only">
          Druhy školení
        </h2>
        <ul className="grid gap-x-10 md:grid-cols-3">
          {DRUHY.map((d) => (
            <li
              key={d.nazev}
              className="border-b border-line py-6 md:border-b-0 md:border-l md:py-0 md:pl-6 md:first:border-l-0 md:first:pl-0"
            >
              <h3 className="text-xl font-extrabold tracking-tight md:text-2xl">{d.nazev}</h3>
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

      {/* Místa */}
      <section aria-labelledby="mista" className="border-y border-line bg-white">
        <div className="mx-auto max-w-[1320px] px-4 py-20 md:px-8 md:py-24">
          <h2 id="mista" className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Kde školíme
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {SKOLENI_MISTA.map((m) => (
              <div key={m.mesto}>
                <div className="aspect-[4/3] overflow-hidden rounded-[3px] border border-line bg-paper">
                  <Mapa frame={m.frame} odkaz={m.map} nazev={`${m.mesto}, ${m.adresa}`} className="h-full w-full" />
                </div>
                <p className="mt-3 text-xl font-bold">{m.mesto}</p>
                <p className="text-ink-2">{m.adresa}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Přihláška */}
      <section id="prihlaska" aria-labelledby="prihlaska-nadpis" className="mx-auto max-w-[1320px] scroll-mt-24 px-4 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="prihlaska-nadpis" className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Přihláška na školení
            </h2>
            <p className="mt-4 leading-relaxed text-ink-2">
              Vyberte termín v seznamu nahoře, nebo pošlete poptávku. U poptávky zvolte i druh školení, například pravidelné
              sedmihodinové nebo referentské. Firmy můžou přihlásit víc zaměstnanců najednou.
            </p>
            <p className="mt-4 leading-relaxed text-ink-2">Nebo se ozvěte napřímo: SMS, telefonem, e-mailem nebo osobně.</p>
            <div className="mt-5 space-y-1">
              <a href={SITE.phoneHref} className="tnum block font-mono text-xl font-semibold hover:text-red">
                {SITE.phone}
              </a>
              <a href={SITE.emailHref} className="block underline underline-offset-4 hover:text-red">
                {SITE.email}
              </a>
            </div>
          </div>
          <div className="lg:col-span-8">
            <SkoleniFormular />
          </div>
        </div>
      </section>
    </>
  );
}

function Radek({ t }: { t: Termin }) {
  const { nazev, doplnek } = rozlozTyp(t.typ);
  return (
    <li className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-3 border-b border-white/15 py-6 md:grid-cols-[13rem_1fr_7rem_auto] md:py-5">
      <time dateTime={t.iso} className="tnum font-mono">
        <span className="block text-sm text-white/55">
          {t.den} · {t.cas}
        </span>
        <span className="block text-2xl font-semibold whitespace-nowrap">{t.datum}</span>
      </time>
      <div className="col-span-2 row-start-2 md:col-span-1 md:row-start-auto">
        <p className="text-lg font-bold">{t.misto}</p>
        <p className="text-white/65">
          <span>{nazev}</span>
          {doplnek && <span className="text-white/60">, {doplnek}</span>}
        </p>
      </div>
      <p className="tnum text-right font-mono md:text-left">
        {t.volno != null ? (
          <>
            <span className="text-xl font-semibold">{t.volno}</span>
            <span className="ml-1.5 text-sm text-white/60">{t.volno === 1 ? "místo" : t.volno >= 2 && t.volno <= 4 ? "místa" : "míst"}</span>
          </>
        ) : null}
      </p>
      <div className="col-span-2 row-start-3 md:col-span-1 md:row-start-auto">
        <VybratTermin src={prihlaskaTerminu(t.id)} popis={`Termín ${t.datum}, ${t.misto}`} />
      </div>
    </li>
  );
}
