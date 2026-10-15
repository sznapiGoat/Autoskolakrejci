import type { Metadata } from "next";
import { MojeFrame } from "@/components/moje-frame";
import { Zahlavi } from "@/components/zahlavi";
import { KURZY, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Přihláška do autoškoly",
  description:
    "Přihlaste se do autoškoly Krejčí v Třebíči online, na papíře nebo osobně. Přihláška a lékařský posudek ke stažení v PDF.",
  alternates: { canonical: "/prihlaska" },
};

export default function Prihlaska() {
  return (
    <>
      <Zahlavi
        nadpis="Přihláška"
        perex={
          <>
            <span className="font-semibold text-ink">{KURZY.pristiB}</span> {KURZY.prubezne} Nezávazně se přihlásit můžete
            už teď, ozveme se vám.
          </>
        }
      />

      <div className="mx-auto grid max-w-[1320px] gap-16 px-4 pt-14 pb-24 md:px-8 md:pb-32 lg:grid-cols-12">
        <section aria-labelledby="online" className="lg:col-span-7">
          <h2 id="online" className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Online
          </h2>
          <p className="mt-3 max-w-[52ch] text-ink-2">
            Nejrychlejší cesta. Vyplňte formulář a dál postupujte podle pokynů, které po odeslání dostanete.
          </p>
          <div className="mt-8 rounded-[3px] border border-line bg-white p-2 md:p-4">
            <MojeFrame src={SITE.moje.prihlaska} title="Online přihláška do autoškoly" vyska={1050} />
          </div>
        </section>

        <div className="space-y-16 lg:col-span-4 lg:col-start-9">
          <section aria-labelledby="papir">
            <h2 id="papir" className="text-3xl font-extrabold tracking-tight">
              Na papíře
            </h2>
            <ol className="mt-5 space-y-4 leading-relaxed text-ink-2">
              <li>
                <span className="font-semibold text-ink">Přihlášku</span> vytiskněte oboustranně, stačí černobíle, a vyplňte
                první stranu. Jde vyplnit i v počítači.
              </li>
              <li>
                <span className="font-semibold text-ink">Lékařský posudek</span> má jednu stranu. Vyplňte ho a nechte potvrdit
                u svého praktického lékaře.
              </li>
              <li>
                Oba papíry přineste do učebny, nebo je pošlete poštou na adresu učebny či sídla.
              </li>
            </ol>
            <div className="mt-6 flex flex-col gap-2">
              <a
                href="/soubory/zadost-dle-284-2013.pdf"
                download
                className="flex items-baseline justify-between border-y border-line py-4 font-bold hover:text-red"
              >
                Přihláška <span className="font-mono text-xs font-normal text-muted">PDF</span>
              </a>
              <a
                href="/soubory/posudek-dle-271-2015.pdf"
                download
                className="-mt-2 flex items-baseline justify-between border-b border-line py-4 font-bold hover:text-red"
              >
                Lékařský posudek <span className="font-mono text-xs font-normal text-muted">PDF</span>
              </a>
            </div>
            <p className="mt-4 text-sm text-muted">Nemáte tiskárnu? Přihlášku si vyzvedněte u nás.</p>
          </section>

          <section aria-labelledby="osobne">
            <h2 id="osobne" className="text-3xl font-extrabold tracking-tight">
              Osobně
            </h2>
            <p className="mt-4 leading-relaxed text-ink-2">
              {SITE.hours.day} {SITE.hours.time} v učebně, {SITE.office.street}, Třebíč. Jindy po domluvě telefonem nebo
              e-mailem.
            </p>
            <div className="mt-5 space-y-1">
              <a href={SITE.phoneHref} className="tnum block font-mono text-xl font-semibold hover:text-red">
                {SITE.phone}
              </a>
              <a href={SITE.emailHref} className="block underline underline-offset-4 hover:text-red">
                {SITE.email}
              </a>
            </div>
          </section>

          <section aria-labelledby="adresy" className="border-t-2 border-ink pt-6">
            <h2 id="adresy" className="font-mono text-xs text-muted">
              Kam papíry poslat
            </h2>
            <div className="mt-3 grid grid-cols-2 gap-6 text-[0.95rem]">
              <p>
                <span className="block font-semibold">Učebna</span>
                {SITE.office.street}
                <br />
                {SITE.office.city}
              </p>
              <p>
                <span className="block font-semibold">Sídlo</span>
                {SITE.billing.street}
                <br />
                {SITE.billing.city}
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
