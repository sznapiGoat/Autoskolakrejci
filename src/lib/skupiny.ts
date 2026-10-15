export type VozidloId = "fabia" | "traktor" | "octavia-privez" | "iveco" | "autobus" | "iveco-privez";

export type Skupina = {
  id: "b" | "t" | "be" | "c" | "d" | "ce";
  kod: string;
  nazev: string;
  /** nadpis stránky tak, jak lidé hledají */
  h1: string;
  /** titulek do vyhledávání */
  seo: string;
  vozidlo: VozidloId;
  /** čím se u nás jezdí, jen pokud to víme z fotek */
  cvicneVozidlo: string;
  /** orientační délka cvičného vozidla v metrech */
  delka: number;
  vek: number;
  podminka: string | null;
  jizdy: string;
  zkouska: string;
  opravnuje: string[];
  uvod: string;
  /** názvy řádků v ceníku, které ke skupině patří */
  radky: string[];
  /** klíč v tabulce kondičních jízd */
  kondice: string;
  /** u C, CE a D: průkaz profesní způsobilosti */
  profi: boolean;
  fotky: { src: string; alt: string }[];
};

// Seřazeno podle délky vozidla, v tomhle pořadí je projíždí měřítko na homepage.
export const SKUPINY: Skupina[] = [
  {
    id: "b",
    kod: "B",
    nazev: "Osobní automobil",
    h1: "Řidičák na auto",
    seo: "Řidičák na auto (skupina B) v Třebíči",
    vozidlo: "fabia",
    cvicneVozidlo: "Škoda Fabia",
    delka: 4.0,
    vek: 18,
    podminka: null,
    jizdy: "28 hodin jízd",
    zkouska: "test a jízda",
    opravnuje: [
      "vozidla do 3 500 kg",
      "nejvýš 9 osob včetně řidiče",
      "přívěs do 750 kg",
      "zahrnuje i skupinu AM",
    ],
    uvod: "Nejčastější kurz. Klasické kurzy začínají zhruba po dvou až třech měsících, individuální kurz si domluvíte kdykoli.",
    radky: ['B ("klasický" kurz)', 'B ("individuální" kurz)', "RB/B96", "B+T"],
    kondice: "B",
    profi: false,
    fotky: [
      { src: "/foto/fabia-bok.jpg", alt: "Červená Škoda Fabia autoškoly z boku na cvičné ploše" },
      { src: "/foto/cvicna-plocha-kuzely.jpg", alt: "Dvě Fabie autoškoly na ploše s kužely, v pozadí nákladní vůz" }
    ],
  },
  {
    id: "t",
    kod: "T",
    nazev: "Traktor",
    h1: "Řidičák na traktor",
    seo: "Řidičák na traktor (skupina T) v Třebíči",
    vozidlo: "traktor",
    cvicneVozidlo: "traktor",
    delka: 4.2,
    vek: 17,
    podminka: null,
    jizdy: "21 hodin jízd, z B jen 10",
    zkouska: "test a jízda",
    opravnuje: ["traktory a samojízdné pracovní stroje", "s připojeným přípojným vozidlem"],
    uvod: "Traktor řídíte od sedmnácti. S řidičákem na B stačí rozšíření s deseti hodinami jízd, kurz B a T se dá vzít i dohromady.",
    radky: ["T", "RB/T", "B+T"],
    kondice: "T",
    profi: false,
    fotky: [],
  },
  {
    id: "be",
    kod: "BE",
    nazev: "Osobák s přívěsem",
    h1: "Řidičák na přívěs",
    seo: "Řidičák na přívěs (BE a B96) v Třebíči",
    vozidlo: "octavia-privez",
    cvicneVozidlo: "Škoda Octavia s bržděným přívěsem",
    delka: 8.3,
    vek: 18,
    podminka: "skupina B",
    jizdy: "8 hodin jízd",
    zkouska: "test a jízda",
    opravnuje: [
      "přívěs nad 750 kg a do 3 500 kg",
      "menší soupravy do 4 250 kg stačí rozšíření B96",
    ],
    uvod: "Pro těžší přívěs za osobák: obytné přívěsy, vozíky na stroje, koňské přívěsy. Na lehčí soupravy do 4 250 kg stačí rozšíření B96 bez testu.",
    radky: ["RB/BE", "RB/B96"],
    kondice: "BE",
    profi: false,
    fotky: [
      { src: "/foto/octavia-privez-be.jpg", alt: "Červená Octavia autoškoly vedle bržděného přívěsu s plachtou a tabulkou L" },
      { src: "/foto/privez-be.jpg", alt: "Dvounápravový přívěs s plachtou, tabulkou L a nápisem autoškoly" }
    ],
  },
  {
    id: "c",
    kod: "C",
    nazev: "Nákladní automobil",
    h1: "Řidičák na nákladní auto",
    seo: "Řidičák na nákladní auto (skupina C) v Třebíči",
    vozidlo: "iveco",
    cvicneVozidlo: "Iveco EuroCargo s plachtou",
    delka: 8.6,
    vek: 21,
    podminka: "skupina B",
    jizdy: "18 hodin jízd",
    zkouska: "test, jízda a OÚV",
    opravnuje: ["vozidla nad 3 500 kg", "nejvýš 9 osob včetně řidiče", "od roku 2022 i skupinu T"],
    uvod: "Nákladní auto nad 3,5 tuny. Jezdí se na Ivecu s plachtou, u zkoušky je navíc ovládání a údržba vozidla.",
    radky: ["RB/C"],
    kondice: "C",
    profi: true,
    fotky: [
      { src: "/foto/iveco-couvani-plocha.jpg", alt: "Červené Iveco s plachtou couvá na cvičné ploše mezi kužely" },
      { src: "/foto/iveco-sklopena-kabina.jpg", alt: "Iveco se sklopenou kabinou a odkrytým motorem" },
      { src: "/foto/iveco-tri-ctvrte.jpg", alt: "Iveco autoškoly zepředu z úhlu na parkovišti" }
    ],
  },
  {
    id: "d",
    kod: "D",
    nazev: "Autobus",
    h1: "Řidičák na autobus",
    seo: "Řidičák na autobus (skupina D) v Třebíči",
    vozidlo: "autobus",
    cvicneVozidlo: "Irisbus",
    delka: 12.0,
    vek: 24,
    podminka: "skupina B nebo C",
    jizdy: "z C 14 hodin, z B 28 hodin",
    zkouska: "test, jízda a OÚV",
    opravnuje: ["vozidla pro víc než 8 cestujících", "přívěs do 750 kg"],
    uvod: "Autobus pro víc než osm cestujících. Z C je to 14 hodin jízd, rovnou z B 28 hodin.",
    radky: ["RC/D", "RB/D", "RC/CE+D"],
    kondice: "D",
    profi: true,
    fotky: [
      { src: "/foto/autobus-bok.jpg", alt: "Bílý autobus Irisbus s tabulkou L z boku proti slunci" },
      { src: "/foto/autobus-celo.jpg", alt: "Autobus Irisbus zepředu na parkovišti" }
    ],
  },
  {
    id: "ce",
    kod: "CE",
    nazev: "Nákladní souprava",
    h1: "Řidičák na soupravu s přívěsem",
    seo: "Řidičák na kamion s přívěsem (CE) v Třebíči",
    vozidlo: "iveco-privez",
    cvicneVozidlo: "Iveco s přívěsem",
    delka: 16.5,
    vek: 21,
    podminka: "skupina C",
    jizdy: "8 hodin jízd",
    zkouska: "test, jízda a OÚV",
    opravnuje: ["nákladní auto s přívěsem nad 750 kg", "se skupinou D i soupravu DE"],
    uvod: "Nákladní auto s přívěsem. Navazuje na C, stačí osm hodin jízd. S D se dá vzít i jako sdružený kurz.",
    radky: ["RC/CE", "RC/CE+D"],
    kondice: "CE",
    profi: true,
    fotky: [
      { src: "/foto/iveco-s-privesem.jpg", alt: "Iveco s plachtou a přívěsem zepředu z úhlu" },
      { src: "/foto/tazne-zarizeni.jpg", alt: "Detail tažného zařízení a oje přívěsu pod červenou plachtou" },
      { src: "/foto/iveco-souprava.jpg", alt: "Souprava Iveca s přívěsem na parkovišti" }
    ],
  },
];

export const skupina = (id: string) => SKUPINY.find((s) => s.id === id);
