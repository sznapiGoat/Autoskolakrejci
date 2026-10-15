import type { Metadata } from "next";
import { Zahlavi } from "@/components/zahlavi";
import { KURZY, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Autoškola Rostislav Krejčí, Bráfova 16/2, Třebíč. Telefon 608 82 08 82, e-mail autoskola@rokr.cz. Úřední hodiny ve středu 14:00 až 15:00.",
  alternates: { canonical: "/kontakt" },
};

export default function Kontakt() {
  return (
    <>
      <Zahlavi
        nadpis="Kontakt"
        perex="S dotazy volejte nebo pište SMS. Osobně ve středu odpoledne v učebně, jindy kdykoli po domluvě."
      />

      <div className="mx-auto max-w-[1320px] px-4 pt-14 pb-24 md:px-8 md:pb-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <a href={SITE.phoneHref} className="tnum block font-mono text-[clamp(2.2rem,5vw,3.6rem)] font-semibold leading-none text-red hover:text-red-deep">
              {SITE.phone}
            </a>
            <p className="mt-3 text-muted">volejte nebo pište SMS</p>

            <a href={SITE.emailHref} className="mt-8 block text-2xl font-bold underline decoration-line-strong underline-offset-[6px] hover:decoration-red">
              {SITE.email}
            </a>
            <p className="mt-2 text-muted">případně {SITE.emailAlt}</p>

            <dl className="mt-12 divide-y divide-line border-y border-line">
              <Radek nazev="Úřední hodiny">
                {SITE.hours.day} {SITE.hours.time}
                <span className="block text-ink-2">{SITE.hours.teorie}, {SITE.hours.note}</span>
              </Radek>
              <Radek nazev="Učebna a kancelář">
                {SITE.office.street}, {SITE.office.city}
              </Radek>
              <Radek nazev="Sídlo, fakturační adresa">
                {SITE.billing.street}, {SITE.billing.city}
              </Radek>
              <Radek nazev="Provozovatel">
                {SITE.owner}, IČO {SITE.ico}
                <span className="block text-ink-2">nejsme plátci DPH</span>
              </Radek>
            </dl>

            <p className="mt-10 border-l-[3px] border-red pl-5 leading-relaxed text-ink-2">{KURZY.pristiB}</p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="aspect-[4/3] overflow-hidden rounded-[3px] border border-line bg-white lg:aspect-auto lg:h-full lg:min-h-[520px]">
              <iframe
                src={SITE.office.mapFrame}
                title="Mapa: učebna autoškoly, Bráfova 16/2, Třebíč"
                loading="lazy"
                className="h-full w-full border-0"
              />
            </div>
            <a href={SITE.office.map} rel="noopener" className="mt-3 inline-block underline underline-offset-4 hover:text-red">
              Otevřít v Mapy.cz
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function Radek({ nazev, children }: { nazev: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-4">
      <dt className="font-mono text-xs text-muted sm:pt-1">{nazev}</dt>
      <dd className="font-semibold">{children}</dd>
    </div>
  );
}
