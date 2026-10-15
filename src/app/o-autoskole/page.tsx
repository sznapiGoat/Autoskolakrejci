import type { Metadata } from "next";
import Link from "next/link";
import { Galerie, type Fotka } from "@/components/galerie";
import { Zahlavi } from "@/components/zahlavi";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "O autoškole",
  description:
    "Rostislav Krejčí, majitel autoškoly a školicího střediska řidičů v Třebíči. Malá autoškola, instruktoři jsou současní nebo bývalí řidiči z povolání.",
  alternates: { canonical: "/o-autoskole" },
};

const FOTKY: Fotka[] = [
  { src: "/foto/cela-flotila.jpg", alt: "Červené Iveco, červená a stříbrná Fabie a přívěs na parkovišti před halou" },
  { src: "/foto/iveco-souprava-vecer.jpg", alt: "Iveco s přívěsem na parkovišti ve večerním světle" },
  { src: "/foto/octavia-tri-ctvrte.jpg", alt: "Červená Octavia autoškoly se střešní cedulí" },
  { src: "/foto/vozovy-park-dvur.jpg", alt: "Iveco a Fabie autoškoly mezi bílými tahači na dvoře" },
  { src: "/foto/octavia-a-fabia.jpg", alt: "Červená Octavia a stříbrná Fabie vedle sebe zepředu" },
  { src: "/foto/privezy-be.jpg", alt: "Přívěs s plachtou, tabulkou L a nápisem autoškoly před nákladním vozem" },
  { src: "/foto/fabia-u-plachty.jpg", alt: "Červená Fabie zaparkovaná vedle velkého červeného přívěsu" },
  { src: "/foto/iveco-celo.jpg", alt: "Iveco autoškoly zepředu z úhlu" },
  { src: "/foto/fabia-stribrna-privez.jpg", alt: "Stříbrná Fabie se střešní cedulí, vedle přívěs" },
  { src: "/foto/dvur-celkovy.jpg", alt: "Dvůr s Ivecem, Fabiemi a plošinovým přívěsem" },
  { src: "/foto/vozovy-park-fabia-iveco.jpg", alt: "Fabie před Ivecem, vedle bílý tahač" },
  { src: "/foto/trenazer-zak.jpg", alt: "Sedačka trenažéru zezadu, před ní volant a tři monitory" },
];

export default function OAutoskole() {
  return (
    <>
      <Zahlavi nadpis="O autoškole" />

      <section className="mx-auto max-w-[1320px] px-4 pt-14 md:px-8 md:pt-20">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-[clamp(1.5rem,2.6vw,2.1rem)] font-bold leading-[1.25] tracking-[-0.01em]">
              Učíme řídit osobní auta, přívěsy, nákladní auta, soupravy, autobusy a traktory. Skupiny B, B96, BE, C, CE, D a T.
            </p>
            <div className="mt-8 max-w-[60ch] space-y-5 text-lg leading-relaxed text-ink-2">
              <p>
                Jsme akreditované školicí středisko řidičů. Děláme pravidelná školení a na přání i vstupní školení pro budoucí
                řidiče z povolání.
              </p>
              <p>
                Všichni instruktoři, kteří u nás učí, jsou současní nebo bývalí řidiči z povolání. Mají za sebou osobní i
                nákladní auta, traktory, jízdní soupravy a autobusy a mnoho let učí v autoškole.
              </p>
              <p>
                Rozsahem jsme ale malá autoškola. Výuku i výcvik vede převážně majitel sám, kolegyně a kolegové vypomáhají
                podle potřeby.
              </p>
            </div>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="border-t-2 border-ink pt-6">
              <p className="text-2xl font-extrabold tracking-tight">{SITE.owner}</p>
              <p className="mt-2 leading-relaxed text-ink-2">
                instruktor teoretické výuky a praktického výcviku, majitel autoškoly a školicího střediska řidičů
              </p>
              <p className="mt-6 text-lg leading-relaxed">„Přijďte nás navštívit, případně mě kontaktujte. Rád vás ve své autoškole přivítám.“</p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                <a href={SITE.phoneHref} className="tnum font-mono text-lg font-semibold hover:text-red">
                  {SITE.phone}
                </a>
                <Link href="/kontakt" className="font-bold text-red underline decoration-2 underline-offset-[6px]">
                  Kontakt
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section aria-labelledby="vozovy-park" className="mx-auto max-w-[1320px] px-4 py-20 md:px-8 md:py-28">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 id="vozovy-park" className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Vozový park a učebna
          </h2>
          <Link href="/skupiny" className="font-bold text-red underline decoration-2 underline-offset-[6px]">
            Vozidla podle skupin
          </Link>
        </div>
        <Galerie fotky={FOTKY} />
      </section>
    </>
  );
}
