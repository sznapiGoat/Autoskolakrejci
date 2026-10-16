import type { Metadata } from "next";
import Link from "next/link";
import { Galerie, type Fotka } from "@/components/galerie";
import Image from "next/image";
import { drobecky, JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "O autoškole Rostislava Krejčího",
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
      <JsonLd
        data={drobecky([
          { nazev: "Úvod", cesta: "/" },
          { nazev: "O autoškole", cesta: "/o-autoskole" },
        ])}
      />

      <section className="mx-auto max-w-[1320px] px-4 pt-10 md:px-8 md:pt-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <figure className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-line">
              <Image
                src="/foto/iveco-detail-kabiny.jpg"
                alt="Kabina červeného Iveca autoškoly s tabulkou L a samolepkou s jménem Rostislav Krejčí"
                fill
                preload
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-[62%_50%]"
              />
            </div>
          </figure>

          <div className="lg:col-span-7 lg:pt-4">
            <h1 className="text-[clamp(2.4rem,5.4vw,4.4rem)] font-extrabold leading-[0.98] tracking-[-0.03em]">
              Malá autoškola, která učí i&nbsp;velká auta
            </h1>
            <p className="font-display mt-8 text-[clamp(1.4rem,2.4vw,1.9rem)] font-bold leading-[1.25] tracking-[-0.01em]">
              Osobní auta, přívěsy, nákladní auta, soupravy, autobusy a traktory. Skupiny B, B96, BE, C, CE, D a T.
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

            <div className="mt-12 border-t-2 border-ink pt-6">
              <p className="text-xl leading-relaxed">
                „Přijďte nás navštívit, případně mě kontaktujte. Rád vás ve své autoškole přivítám.“
              </p>
              <p className="mt-3">
                <span className="font-display text-lg font-extrabold">{SITE.owner}</span>
                <span className="text-ink-2">, instruktor teoretické výuky a praktického výcviku, majitel autoškoly a školicího střediska řidičů</span>
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                <a href={SITE.phoneHref} className="tnum font-mono text-lg font-semibold hover:text-red">
                  {SITE.phone}
                </a>
                <Link href="/kontakt" className="font-bold text-red underline decoration-2 underline-offset-[6px]">
                  Kontakt
                </Link>
              </div>
            </div>
          </div>
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
