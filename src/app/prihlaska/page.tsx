import type { Metadata } from "next";
import { MojeFrame } from "@/components/moje-frame";
import { drobecky, JsonLd } from "@/components/json-ld";
import { KURZY, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Přihláška do autoškoly Třebíč | online i na papíře | Autoškola Krejčí" },
  description:
    "Přihlaste se do autoškoly Krejčí v Třebíči online, na papíře nebo osobně. Přihláška a lékařský posudek ke stažení v PDF.",
  alternates: { canonical: "/prihlaska" },
};

export default function Prihlaska() {
  return (
    <>
      <JsonLd
        data={drobecky([
          { nazev: "Úvod", cesta: "/" },
          { nazev: "Přihláška", cesta: "/prihlaska" },
        ])}
      />

      <header className="mx-auto grid max-w-[1320px] gap-10 px-4 pt-10 md:px-8 md:pt-16 lg:grid-cols-[1.3fr_1fr] lg:items-stretch lg:gap-16">
        <div className="flex flex-col justify-between">
          <h1 className="text-[clamp(2.4rem,6vw,4.8rem)] font-extrabold leading-[0.98] tracking-[-0.03em]">
            Přihláška do autoškoly
          </h1>
          <nav aria-label="Způsoby přihlášení" className="mt-10">
            <ol className="grid border-t-2 border-ink sm:grid-cols-3">
              {[
                ["#online", "Online", "nejrychlejší"],
                ["#papir", "Na papíře", "PDF ke stažení"],
                ["#osobne", "Osobně", `${SITE.hours.dayShort} ${SITE.hours.time}`],
              ].map(([href, nazev, pozn]) => (
                <li key={href} className="border-b border-line sm:border-b-0 sm:border-r sm:last:border-r-0">
                  <a href={href} className="group block py-4 sm:px-4 sm:first:pl-0">
                    <span className="block text-xl font-bold group-hover:text-red">{nazev}</span>
                    <span className="text-sm text-muted">{pozn}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <div className="flex flex-col justify-between rounded-[4px] bg-plate p-6 text-white md:p-8">
          <p className="font-mono text-xs text-white/70">Další klasický kurz skupiny B</p>
          <p className="font-display mt-6 text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-[1.02] tracking-tight">
            {KURZY.pristiBKratce}
          </p>
          <p className="mt-6 leading-relaxed text-white/80">
            Přesné datum upřesníme. Nezávazně se přihlásit můžete už teď, ozveme se vám. {KURZY.prubezne}
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1320px] gap-16 px-4 pt-16 pb-24 md:pt-24 md:px-8 md:pb-32 lg:grid-cols-12">
        <section id="online" aria-labelledby="online-h" className="scroll-mt-28 lg:col-span-7">
          <h2 id="online-h" className="text-3xl font-extrabold tracking-tight md:text-4xl">
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
          <section id="papir" aria-labelledby="papir-h" className="scroll-mt-28">
            <h2 id="papir-h" className="text-3xl font-extrabold tracking-tight">
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

          <section id="osobne" aria-labelledby="osobne-h" className="scroll-mt-28">
            <h2 id="osobne-h" className="text-3xl font-extrabold tracking-tight">
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
