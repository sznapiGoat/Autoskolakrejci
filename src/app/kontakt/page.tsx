import type { Metadata } from "next";
import { AUTOSKOLA, drobecky, JsonLd } from "@/components/json-ld";
import { Mapa } from "@/components/mapa";
import { KURZY, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Kontakt | Autoškola Krejčí, Bráfova 16/2, Třebíč" },
  description:
    "Autoškola Rostislav Krejčí, Bráfova 16/2, Třebíč. Telefon 608 82 08 82, e-mail autoskola@rokr.cz. Úřední hodiny ve středu 14:00 až 15:00, jindy po domluvě.",
  alternates: { canonical: "/kontakt" },
};

export default function Kontakt() {
  return (
    <>
      <JsonLd
        data={[
          { "@context": "https://schema.org", ...AUTOSKOLA },
          drobecky([
            { nazev: "Úvod", cesta: "/" },
            { nazev: "Kontakt", cesta: "/kontakt" },
          ]),
        ]}
      />

      <div className="grid lg:min-h-[calc(100svh-72px)] lg:grid-cols-2">
        {/* Mapa přes celou výšku */}
        <div className="relative order-2 h-[60svh] border-t border-line bg-white lg:order-1 lg:h-auto lg:border-t-0 lg:border-r">
          <Mapa
            frame={SITE.office.mapFrame}
            odkaz={SITE.office.map}
            nazev="učebna autoškoly, Bráfova 16/2, Třebíč"
            popisek="Bráfova 16/2, Třebíč"
            className="absolute inset-0 h-full w-full"
          />
        </div>

        <div className="order-1 px-4 pt-10 pb-16 md:px-8 md:pt-16 lg:order-2 lg:px-16 lg:pb-20">
          <h1 className="text-[clamp(2.4rem,5vw,4rem)] font-extrabold leading-[0.98] tracking-[-0.03em]">
            Kontakt na autoškolu
          </h1>
          <p className="mt-4 max-w-[46ch] text-lg leading-relaxed text-ink-2">
            S dotazy volejte nebo pište SMS. Osobně {SITE.hours.dayShort} odpoledne v učebně, jindy kdykoli po domluvě.
          </p>

          <a
            href={SITE.phoneHref}
            className="tnum mt-10 block font-mono text-[clamp(2.4rem,5.4vw,4.2rem)] font-semibold leading-none text-red hover:text-red-deep"
          >
            {SITE.phone}
          </a>
          <a
            href={SITE.emailHref}
            className="mt-6 inline-block text-2xl font-bold underline decoration-line-strong underline-offset-[6px] hover:decoration-red"
          >
            {SITE.email}
          </a>
          <p className="mt-2 text-muted">případně {SITE.emailAlt}</p>

          <dl className="mt-12 divide-y divide-line border-y border-line">
            <Radek nazev="Úřední hodiny">
              {SITE.hours.day} {SITE.hours.time}
              <span className="block font-normal text-ink-2">
                {SITE.hours.teorie}, {SITE.hours.note}
              </span>
            </Radek>
            <Radek nazev="Učebna a kancelář">
              {SITE.office.street}, {SITE.office.city}
            </Radek>
            <Radek nazev="Sídlo, fakturační adresa">
              {SITE.billing.street}, {SITE.billing.city}
            </Radek>
            <Radek nazev="Provozovatel">
              {SITE.owner}, IČO {SITE.ico}
              <span className="block font-normal text-ink-2">nejsme plátci DPH</span>
            </Radek>
          </dl>

          <p className="mt-10 border-l-[3px] border-red pl-5 leading-relaxed text-ink-2">{KURZY.pristiB}</p>
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
