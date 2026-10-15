export const SITE = {
  url: "https://www.rokr.cz",
  name: "Autoškola Rostislav Krejčí",
  shortName: "Autoškola Krejčí",
  owner: "Rostislav Krejčí",
  ico: "634 27 630",
  phone: "608 82 08 82",
  phoneHref: "tel:+420608820882",
  email: "autoskola@rokr.cz",
  emailHref: "mailto:autoskola@rokr.cz",
  emailAlt: "rokr@razdva.cz",
  office: {
    label: "Učebna a kancelář",
    street: "Bráfova 16/2, přízemí",
    city: "674 01 Třebíč",
    map: "https://mapy.cz/s/fuhesohohu",
    mapFrame: "https://frame.mapy.cz/s/fuhesohohu",
  },
  billing: {
    street: "Kmochova 726",
    city: "674 01 Třebíč",
  },
  hours: {
    day: "Středa",
    dayShort: "ve středu",
    time: "14:00 až 15:00",
    teorie: "od 15:00 do 17:30 probíhá výuka teorie",
    note: "jindy kdykoli po domluvě",
  },
  moje: {
    prihlaska: "https://rokr.moje-autoskola.cz/prihlaska.php?iframe=1",
    studovna: "https://rokr.moje-autoskola.cz/prihlaseni.html?iframe=1",
    skoleni: "https://rokr.moje-autoskola.cz/prihlaska_skoleni.php?iframe=1",
    resizer: "https://rokr.moje-autoskola.cz/js/iframe-resizer/iframeResizer.min.js",
  },
} as const;

/** Termíny z úvodní stránky rokr.cz, stav k 4. 9. 2026. */
export const KURZY = {
  pristiB: "Další klasický kurz skupiny B začne v polovině prosince 2026. Přesné datum upřesníme.",
  rytmusB: "Klasické kurzy B začínají zhruba po dvou až třech měsících, individuální kdykoli po domluvě.",
  prubezne: "B96, BE, C, CE a D začínáme průběžně.",
} as const;

export const SKOLENI_MISTA = [
  {
    mesto: "Třebíč",
    adresa: "Bráfova 16/2, přízemí",
    map: "https://mapy.cz/s/fuhesohohu",
    frame: "https://frame.mapy.cz/s/fuhesohohu",
  },
  {
    mesto: "Jaroměřice nad Rokytnou",
    adresa: "Kapinusova 1093, 1. patro",
    map: "https://mapy.cz/s/netaburuvo",
    frame: "https://frame.mapy.cz/s/netaburuvo",
  },
  {
    mesto: "Přibyslavice",
    adresa: "Na Návsi 40",
    map: "https://mapy.cz/s/gelamazero",
    frame: "https://frame.mapy.cz/s/gelamazero",
  },
] as const;

export const NAV = [
  { href: "/skupiny", label: "Skupiny" },
  { href: "/cenik", label: "Ceník" },
  { href: "/skoleni-ridicu", label: "Školení řidičů" },
  { href: "/studovna", label: "Studovna" },
  { href: "/kontakt", label: "Kontakt" },
] as const;
