import Image from "next/image";
import Link from "next/link";
import { Cesta, type Zastavka } from "@/components/cesta";
import { Kolona } from "@/components/kolona";
import { AUTOSKOLA, JsonLd } from "@/components/json-ld";
import { Meritko } from "@/components/meritko";
import { cenaSkupiny, getCenik } from "@/lib/cenik";
import { KURZY, SITE } from "@/lib/site";
import { SKUPINY } from "@/lib/skupiny";

const ZASTAVKY: Zastavka[] = [
  {
    nazev: "Přihláška",
    text: "Online přes Moje autoškola, na papíře, nebo osobně ve středu odpoledne v učebně.",
  },
  {
    nazev: "Lékař",
    text: "Posudek o zdravotní způsobilosti od vašeho praktického lékaře.",
  },
  {
    nazev: "Teorie",
    text: "Výklad v učebně, ve středu od 15:00. Doma elektronická učebnice a testy.",
  },
  {
    nazev: "Jízdy",
    text: "S instruktorem v cvičném voze. Pro skupinu B 28 hodin, k tomu trenažér.",
  },
  {
    nazev: "Zkouška",
    text: "Test a jízda, u C, CE a D navíc ovládání a údržba vozidla.",
  },
];

export default async function Home() {
  const cenik = await getCenik();
  const ceny = Object.fromEntries(SKUPINY.map((s) => [s.id, cenaSkupiny(cenik, s.id)]));
  const cenaB = ceny.b;

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...AUTOSKOLA }} />
      {/* Úvod: text a pod ním kolona vozového parku, i na notebooku se vejde na první obrazovku */}
      <section>
        <div className="mx-auto w-full max-w-[1320px] px-4 pt-10 pb-12 md:px-8 md:pt-14 md:pb-16">
          <h1 className="text-[clamp(2.6rem,7.2vw,6.2rem)] font-extrabold leading-[0.96] tracking-[-0.03em]">
            Řidičák v&nbsp;Třebíči.
            <br />
            <span className="text-red">Od osobáku po autobus.</span>
          </h1>
          <div className="mt-8 flex flex-col gap-7 md:mt-10 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-[52ch] text-lg leading-relaxed text-ink-2">
              Učíme skupiny B, BE, C, CE, D a T. Jsme malá autoškola: výcvik vede většinou přímo majitel Rostislav Krejčí,
              který sám jezdil z povolání.
            </p>
            <div className="flex shrink-0 flex-wrap items-center gap-x-7 gap-y-4">
              <Link
                href="/prihlaska"
                className="inline-flex h-13 items-center rounded-[3px] bg-red px-7 text-lg font-bold text-white transition-colors hover:bg-red-deep"
              >
                Přihlásit se
              </Link>
              <a href={SITE.phoneHref} className="group text-lg">
                <span className="text-muted">nebo zavolejte </span>
                <span className="tnum font-mono font-semibold text-ink underline decoration-line-strong decoration-2 underline-offset-[6px] group-hover:decoration-red">
                  {SITE.phone}
                </span>
              </a>
            </div>
          </div>
        </div>

        <Kolona />
      </section>

      <section aria-label="Základní údaje">
        <div className="mx-auto max-w-[1320px] px-4 pt-8 pb-16 md:px-8 md:pb-24">
          <dl className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <Fakt nazev="Učebna" hodnota={SITE.office.street} />
            <Fakt nazev="Úřední hodiny" hodnota={`${SITE.hours.day} ${SITE.hours.time}`} />
            <Fakt nazev="Kurz skupiny B" hodnota={cenaB ? `od ${cenaB.toLocaleString("cs-CZ")} Kč` : "viz ceník"} />
            <Fakt nazev="Další kurz B" hodnota={KURZY.pristiBKratce} />
          </dl>
        </div>
      </section>

      <Meritko ceny={ceny} />

      {/* Malá autoškola */}
      <section className="mx-auto max-w-[1320px] px-4 py-24 md:px-8 md:py-36">
        <div className="grid gap-14 lg:grid-cols-12">
          <blockquote className="lg:col-span-7">
            <p className="font-display text-[clamp(1.8rem,3.6vw,3rem)] font-bold leading-[1.12] tracking-[-0.015em]">
              „Jsme rozsahem malá autoškola. Výuku a&nbsp;výcvik v&nbsp;řízení provádím převážně sám.“
            </p>
            <footer className="mt-6 text-lg">
              <span className="font-bold">Rostislav Krejčí</span>
              <span className="text-muted">, majitel a instruktor</span>
            </footer>
          </blockquote>

          <div className="lg:col-span-4 lg:col-start-9 lg:pt-3">
            <p className="text-lg leading-relaxed text-ink-2">
              Když je potřeba, vypomůžou kolegové. Všichni, kdo u nás učí, jsou současní nebo bývalí řidiči z povolání: osobní
              i nákladní auta, traktory, soupravy, autobusy.
            </p>
            <Link href="/o-autoskole" className="mt-6 inline-block font-bold text-red underline decoration-2 underline-offset-[6px] hover:text-red-deep">
              O autoškole
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:mt-24 md:grid-cols-12">
          <figure className="md:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] bg-line">
              <Image
                src="/foto/iveco-sklopena-kabina.jpg"
                alt="Iveco autoškoly se sklopenou kabinou, odkrytý motor"
                fill
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 max-w-[52ch] text-[0.95rem] text-muted">
              U skupin C a D je součástí zkoušky ovládání a údržba vozidla. Proto se kabina sklápí i při výcviku.
            </figcaption>
          </figure>
          <figure className="md:col-span-5 md:mt-24">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-line">
              <Image
                src="/foto/logo-na-plachte.jpg"
                alt="Samolepka autoškoly na červeném nákladním voze: Autoškola, Rostislav Krejčí, telefon a web"
                fill
                sizes="(min-width: 768px) 42vw, 100vw"
                className="object-cover object-[38%_50%]"
              />
            </div>
          </figure>
        </div>
      </section>

      {/* Cesta k řidičáku */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-[1320px] px-4 py-24 md:px-8 md:py-32">
          <div className="mb-14 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
            <h2 className="text-[clamp(2rem,4.2vw,3.4rem)] font-extrabold leading-[1.02] tracking-[-0.02em]">
              Jak se k řidičáku dostanete
            </h2>
            <p className="max-w-[38ch] text-ink-2">
              Správní poplatek 700 Kč platíte úřadu v den zkoušky, v ceně kurzu není.
            </p>
          </div>
          <Cesta zastavky={ZASTAVKY} />
        </div>
      </section>

      {/* Trenažér */}
      <section className="bg-asphalt text-white">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-4 py-24 md:px-8 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-[clamp(2rem,4.2vw,3.4rem)] font-extrabold leading-[1.02] tracking-[-0.02em]">
              Trenažér přímo v učebně
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/75">
              Sedačka, volant, pedály a tři monitory. Rozjezdy, řazení a rozhled si vyzkoušíte dřív, než vyjedete mezi auta.
            </p>
            <p className="mt-4 leading-relaxed text-white/60">
              Doma pak pokračujete ve studovně: elektronická učebnice, výuková videa a testy, u kterých instruktor vidí, jak
              vám jdou.
            </p>
            <Link href="/studovna" className="mt-8 inline-block font-bold underline decoration-red decoration-2 underline-offset-[6px] hover:text-white/80">
              Do studovny
            </Link>
          </div>
          <div className="grid grid-cols-5 gap-4 lg:col-span-8">
            <div className="relative col-span-5 aspect-[16/9] overflow-hidden rounded-[3px] bg-white/5 sm:col-span-3 sm:aspect-auto">
              <Image
                src="/foto/trenazer.jpg"
                alt="Trenažér v učebně: sedačka řidiče, volant a tři monitory"
                fill
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 60vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative col-span-5 aspect-[4/3] overflow-hidden rounded-[3px] bg-white/5 sm:col-span-2 sm:aspect-[3/4]">
              <Image
                src="/foto/trenazer-projekce.jpg"
                alt="Učebna se zatemněným oknem, projekce na plátně a trenažér"
                fill
                sizes="(min-width: 1024px) 26vw, (min-width: 640px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Školení řidičů */}
      <section className="mx-auto max-w-[1320px] px-4 py-24 md:px-8 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <h2 className="text-[clamp(2rem,4.2vw,3.4rem)] font-extrabold leading-[1.02] tracking-[-0.02em]">
              Jezdíte z povolání?
            </h2>
            <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-ink-2">
              Jsme akreditované školicí středisko. Děláme pravidelná školení profesních řidičů podle zákona 247/2000 Sb.,
              vstupní školení pro C, CE a D a školení referentů.
            </p>
            <Link
              href="/skoleni-ridicu"
              className="mt-8 inline-flex h-12 items-center rounded-[3px] border-2 border-ink px-6 font-bold transition-colors hover:bg-ink hover:text-white"
            >
              Školení a přihláška
            </Link>
          </div>
          <div>
            <h3 className="font-mono text-xs text-muted">Kde školíme</h3>
            <ul className="mt-3 divide-y divide-line border-y border-line">
              {[
                ["Třebíč", "Bráfova 16/2, přízemí"],
                ["Jaroměřice nad Rokytnou", "Kapinusova 1093, 1. patro"],
                ["Přibyslavice", "Na Návsi 40"],
              ].map(([mesto, adresa]) => (
                <li key={mesto} className="flex flex-col justify-between gap-1 py-5 sm:flex-row sm:items-baseline">
                  <span className="text-xl font-bold">{mesto}</span>
                  <span className="text-ink-2">{adresa}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Závěr */}
      <section className="bg-red text-white">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-10 px-4 py-20 md:flex-row md:items-end md:justify-between md:px-8 md:py-24">
          <div>
            <h2 className="max-w-[18ch] text-[clamp(2rem,4.6vw,3.6rem)] font-extrabold leading-[1.02] tracking-[-0.02em]">
              Přihlaste se online, nebo se ve středu zastavte.
            </h2>
            <p className="mt-5 text-lg text-white/85">
              {SITE.office.street}, {SITE.office.city}. {SITE.hours.day} {SITE.hours.time}, {SITE.hours.note}.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row md:flex-col md:items-end">
            <Link
              href="/prihlaska"
              className="inline-flex h-13 items-center justify-center rounded-[3px] bg-white px-7 text-lg font-bold text-red transition-colors hover:bg-paper"
            >
              Online přihláška
            </Link>
            <a href={SITE.phoneHref} className="tnum font-mono text-2xl font-semibold underline decoration-white/40 decoration-2 underline-offset-[6px] hover:decoration-white">
              {SITE.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Fakt({ nazev, hodnota }: { nazev: string; hodnota: string }) {
  return (
    <div>
      <dt className="font-mono text-xs text-muted">{nazev}</dt>
      <dd className="mt-1 text-lg font-semibold">{hodnota}</dd>
    </div>
  );
}
