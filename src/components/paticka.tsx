import Link from "next/link";
import { NAV, SITE } from "@/lib/site";
import { Znacka } from "./znacka";

export function Paticka() {
  return (
    <footer className="bg-asphalt text-white">
      <div className="mx-auto max-w-[1320px] px-4 pt-16 pb-10 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Znacka inverzni />
            <p className="mt-6 max-w-xs text-white/65">
              Malá autoškola a akreditované školicí středisko řidičů. Učí vás lidé, kteří sami jezdili z povolání.
            </p>
          </div>

          <div>
            <h2 className="font-mono text-xs text-white/50">Učebna</h2>
            <p className="mt-3 leading-relaxed">
              {SITE.office.street}
              <br />
              {SITE.office.city}
            </p>
            <a href={SITE.office.map} className="mt-2 inline-block text-white/65 underline underline-offset-4 hover:text-white">
              Otevřít v Mapy.cz
            </a>
          </div>

          <div>
            <h2 className="font-mono text-xs text-white/50">Úřední hodiny</h2>
            <p className="mt-3 leading-relaxed">
              {SITE.hours.day} {SITE.hours.time}
              <br />
              <span className="text-white/65">{SITE.hours.note}</span>
            </p>
            <a href={SITE.phoneHref} className="tnum mt-4 block font-mono text-lg font-semibold hover:text-[#ff8a9b]">
              {SITE.phone}
            </a>
            <a href={SITE.emailHref} className="block text-white/80 hover:text-white">
              {SITE.email}
            </a>
          </div>

          <nav aria-label="Patička">
            <h2 className="font-mono text-xs text-white/50">Stránky</h2>
            <ul className="mt-3 space-y-2">
              {[...NAV, { href: "/prihlaska", label: "Přihláška" }, { href: "/o-autoskole", label: "O autoškole" }].map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-white/80 hover:text-white">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-white/15 pt-6 text-sm text-white/50 md:flex-row md:justify-between">
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            <li>{SITE.owner}</li>
            <li>IČO {SITE.ico}</li>
            <li>
              sídlo {SITE.billing.street}, {SITE.billing.city}
            </li>
            <li>nejsme plátci DPH</li>
          </ul>
          <p>rokr.cz</p>
        </div>
      </div>
    </footer>
  );
}
