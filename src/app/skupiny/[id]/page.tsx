import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AUTOSKOLA, drobecky, JsonLd } from "@/components/json-ld";
import { VozidloNaSilnici } from "@/components/vozidla";
import { dotazy } from "@/lib/faq";
import { getCenik, kc, POPLATKY } from "@/lib/cenik";
import { SITE } from "@/lib/site";
import { SKUPINY, skupina } from "@/lib/skupiny";

export function generateStaticParams() {
  return SKUPINY.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: PageProps<"/skupiny/[id]">): Promise<Metadata> {
  const s = skupina((await params).id);
  if (!s) return {};
  return {
    title: s.seo,
    description: `Kurz skupiny ${s.kod} v Třebíči. Od ${s.vek} let, ${s.jizdy}, zkouška: ${s.zkouska}. Výcvik na vozidle ${s.cvicneVozidlo}.`,
    alternates: { canonical: `/skupiny/${s.id}` },
  };
}

export default function Page(props: PageProps<"/skupiny/[id]">) {
  return (
    <Suspense fallback={<div className="min-h-[80svh]" />}>
      <Detail params={props.params} />
    </Suspense>
  );
}

async function Detail({ params }: { params: PageProps<"/skupiny/[id]">["params"] }) {
  const { id } = await params;
  const s = skupina(id);
  if (!s) notFound();

  const cenik = await getCenik();
  const kurzy = [...cenik.mainCourses, ...cenik.combinedCourses].filter((k) => s.radky.includes(k.group));
  const kondice = cenik.additionalDriving.find((k) => k.group === s.kondice);
  const i = SKUPINY.findIndex((g) => g.id === s.id);
  const dalsi = SKUPINY[(i + 1) % SKUPINY.length];
  const delkaText = s.delka.toLocaleString("cs-CZ");
  const faq = dotazy(s, cenik);
  const nejnizsi = kurzy.length ? Math.min(...kurzy.map((k) => Number(k.price))) : null;

  const ld = [
    drobecky([
      { nazev: "Úvod", cesta: "/" },
      { nazev: "Skupiny", cesta: "/skupiny" },
      { nazev: s.h1, cesta: `/skupiny/${s.id}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: s.seo,
      description: s.uvod,
      provider: AUTOSKOLA,
      ...(nejnizsi && {
        offers: { "@type": "Offer", price: nejnizsi, priceCurrency: "CZK", category: "Paid" },
      }),
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "Onsite",
        location: AUTOSKOLA.address,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((d) => ({
        "@type": "Question",
        name: d.otazka,
        acceptedAnswer: { "@type": "Answer", text: d.odpoved },
      })),
    },
  ];

  return (
    <>
      <JsonLd data={ld} />
      <header className="mx-auto max-w-[1320px] px-4 pt-10 md:px-8 md:pt-16">
        <nav aria-label="Drobečková navigace" className="font-mono text-xs text-muted">
          <Link href="/skupiny" className="hover:text-ink">
            Skupiny
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{s.kod}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-16">
          <div className="flex items-start gap-5 md:gap-7">
            <span className="flex h-20 min-w-20 shrink-0 items-center justify-center rounded-[5px] bg-plate px-3 font-mono text-4xl font-bold text-white md:h-28 md:min-w-28 md:text-5xl">
              {s.kod}
            </span>
            <div>
              <h1 className="text-[clamp(2.2rem,5.4vw,4.4rem)] font-extrabold leading-[0.98] tracking-[-0.03em]">
                {s.h1}
              </h1>
              <p className="mt-2 font-mono text-sm text-muted">
                skupina {s.kod} · {s.nazev.toLowerCase()} · Třebíč
              </p>
              <p className="mt-4 max-w-[48ch] text-lg leading-relaxed text-ink-2">{s.uvod}</p>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-x-8 gap-y-5 border-t-2 border-ink pt-5 lg:mb-2">
            <Udaj nazev="Věk" hodnota={`od ${s.vek} let`} />
            <Udaj nazev="Předchozí skupina" hodnota={s.podminka ?? "není potřeba"} />
            <Udaj nazev="Výcvik" hodnota={s.jizdy} />
            <Udaj nazev="Zkouška" hodnota={s.zkouska} />
          </dl>
        </div>
      </header>

      {/* Vozidlo ve vlastním měřítku */}
      <section aria-label="Cvičné vozidlo" className="mt-14 border-y border-line bg-white md:mt-20">
        <div className="mx-auto max-w-[1320px] px-4 py-10 md:px-8 md:py-14">
          <div className={s.delka < 6 ? "mx-auto max-w-[560px]" : s.delka < 10 ? "mx-auto max-w-[920px]" : ""}>
            <div className="mb-3 flex items-center gap-3" aria-hidden>
              <span className="h-3 w-px bg-plate" />
              <span className="h-px flex-1 bg-plate" />
              <span className="tnum font-mono text-sm font-semibold text-plate">cca {delkaText} m</span>
              <span className="h-px flex-1 bg-plate" />
              <span className="h-3 w-px bg-plate" />
            </div>
            <VozidloNaSilnici id={s.vozidlo} popis={`${s.cvicneVozidlo}, délka přibližně ${delkaText} m`} className="block h-auto w-full" />
          </div>
          <p className="mt-6 text-center font-mono text-xs text-muted">
            {s.id === "t" ? "Ilustrační traktor" : `U nás: ${s.cvicneVozidlo}`}. Délka je orientační.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1320px] gap-16 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Opravňuje k řízení</h2>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {s.opravnuje.map((o) => (
              <li key={o} className="py-4 text-lg">
                {o}
              </li>
            ))}
          </ul>

          {s.profi && (
            <div className="mt-10 border-l-[3px] border-red pl-5">
              <h3 className="text-lg font-bold">Budete jezdit z povolání?</h3>
              <p className="mt-2 leading-relaxed text-ink-2">
                Pak potřebujete i průkaz profesní způsobilosti řidiče, tedy vstupní školení a zkoušku. Zvažte to předem, dá se
                to naplánovat spolu s kurzem.
              </p>
              <Link href="/skoleni-ridicu" className="mt-3 inline-block font-bold text-red underline decoration-2 underline-offset-[6px]">
                Školení řidičů
              </Link>
            </div>
          )}
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Cena</h2>
          <table className="mt-6 w-full border-collapse text-left">
            <caption className="sr-only">Ceny kurzů pro skupinu {s.kod}</caption>
            <tbody>
              {kurzy.map((k) => (
                <tr key={k.group} className="border-t border-line align-top">
                  <th scope="row" className="py-4 pr-4">
                    <span className="block font-bold">{k.group}</span>
                    <span className="mt-1 block text-sm font-normal text-muted">{k.note}</span>
                  </th>
                  <td className="tnum py-4 text-right font-mono text-lg font-semibold whitespace-nowrap">{kc(Number(k.price))}</td>
                </tr>
              ))}
              {kondice && (
                <>
                  <tr className="border-t border-line align-top">
                    <th scope="row" className="py-4 pr-4 font-bold">
                      Kondiční jízda, 1 hodina
                    </th>
                    <td className="tnum py-4 text-right font-mono text-lg font-semibold whitespace-nowrap">{kc(kondice.hourPrice)}</td>
                  </tr>
                  <tr className="border-y border-line align-top">
                    <th scope="row" className="py-4 pr-4">
                      <span className="block font-bold">Opakovaná zkouška z jízdy</span>
                      <span className="mt-1 block text-sm font-normal text-muted">
                        plus {kc(POPLATKY.opakovanaJizdaOrp)} na úřadě
                      </span>
                    </th>
                    <td className="tnum py-4 text-right font-mono text-lg font-semibold whitespace-nowrap">{kc(kondice.examPrice)}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
          <p className="mt-5 text-ink-2">
            V ceně kurzu je tištěná učebnice a online studovna. Správní poplatek {kc(POPLATKY.spravni)} platíte úřadu, zpravidla v den
            zkoušky. Nejsme plátci DPH.
          </p>
          <Link href="/cenik" className="mt-4 inline-block font-bold text-red underline decoration-2 underline-offset-[6px]">
            Celý ceník
          </Link>
        </div>
      </section>

      {s.fotky.length > 0 && (
        <section aria-label="Fotky vozidla" className="mx-auto max-w-[1320px] px-4 pb-20 md:px-8 md:pb-28">
          <div className={`grid gap-4 ${s.fotky.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
            {s.fotky.map((f, n) => (
              <figure key={f.src} className={s.fotky.length === 3 && n === 0 ? "md:col-span-2 md:row-span-2" : ""}>
                <div className={`relative overflow-hidden rounded-[3px] bg-line ${s.fotky.length === 3 && n === 0 ? "aspect-[4/3] md:aspect-auto md:h-full" : "aspect-[4/3]"}`}>
                  <Image src={f.src} alt={f.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                </div>
              </figure>
            ))}
          </div>
        </section>
      )}

      <section aria-labelledby="dotazy" className="border-t border-line bg-white">
        <div className="mx-auto grid max-w-[1320px] gap-10 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-12">
          <h2 id="dotazy" className="text-3xl font-extrabold tracking-tight md:text-4xl lg:col-span-4">
            Na co se lidé ptají u skupiny {s.kod}
          </h2>
          <div className="divide-y divide-line border-y border-line lg:col-span-7 lg:col-start-6">
            {faq.map((d) => (
              <details key={d.otazka} className="group py-5">
                <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 text-lg font-bold [&::-webkit-details-marker]:hidden">
                  {d.otazka}
                  <span aria-hidden className="font-mono text-xl font-normal text-red transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-[60ch] leading-relaxed text-ink-2">{d.odpoved}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-red text-white">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-8 px-4 py-16 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <p className="font-display text-[clamp(1.8rem,3.6vw,2.8rem)] font-extrabold leading-tight tracking-tight">Chcete skupinu {s.kod}?</p>
            <p className="mt-2 text-white/85">
              Přihláška online, na papíře nebo osobně {SITE.hours.dayShort} {SITE.hours.time}.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/prihlaska" className="inline-flex h-13 items-center rounded-[3px] bg-white px-7 text-lg font-bold text-red hover:bg-paper">
              Přihláška
            </Link>
            <a href={SITE.phoneHref} className="tnum font-mono text-xl font-semibold underline decoration-white/40 underline-offset-[6px] hover:decoration-white">
              {SITE.phone}
            </a>
          </div>
        </div>
      </section>

      <nav aria-label="Další skupina" className="mx-auto max-w-[1320px] px-4 py-10 md:px-8">
        <Link href={`/skupiny/${dalsi.id}`} className="group flex items-center justify-between gap-6">
          <span className="font-mono text-xs text-muted">Další skupina</span>
          <span className="flex items-center gap-4">
            <span className="font-display text-xl font-extrabold tracking-tight group-hover:text-red md:text-2xl">{dalsi.nazev}</span>
            <span className="flex h-11 min-w-11 items-center justify-center rounded-[3px] bg-plate px-2 font-mono font-bold text-white group-hover:bg-red">
              {dalsi.kod}
            </span>
          </span>
        </Link>
      </nav>
    </>
  );
}

function Udaj({ nazev, hodnota }: { nazev: string; hodnota: string }) {
  return (
    <div>
      <dt className="font-mono text-xs text-muted">{nazev}</dt>
      <dd className="mt-1 text-lg font-semibold">{hodnota}</dd>
    </div>
  );
}
