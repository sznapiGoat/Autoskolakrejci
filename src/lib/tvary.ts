import type { VozidloId } from "./skupiny";

/*
  Siluety z boku, souřadnice v decimetrech. x = 0 je zadek vozidla,
  y = 0 je vozovka, kladné y míří dolů, takže karoserie leží v záporných y.
*/

export type Barva = "red" | "glass" | "ink" | "ink2" | "white" | "steel" | "tarp" | "board" | "plate";
export type Dil = { d: string; fill: Barva; obrys?: boolean };
export type Kolo = { x: number; r: number };
export type Znacka = { x: number; y: number; s: number };
export type Tvar = { delka: number; dily: Dil[]; kola: Kolo[]; elka: Znacka[] };

function posun(dily: Dil[], dx: number): Dil[] {
  return dily.map((p) => ({
    ...p,
    d: p.d.replace(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g, (_, x, y) => `${+(+x + dx).toFixed(2)},${y}`),
  }));
}

const FABIA: Dil[] = [
  {
    d: "M0,-4 L0,-8.5 Q0.4,-10 2,-10.6 L4.2,-14 Q5,-14.7 7,-14.8 L22,-14.8 Q24,-14.7 25.2,-13.8 L30.2,-9.8 L37.6,-8.7 Q39.7,-8.3 40,-6.6 L40,-3.8 Q40,-3 39.2,-3 L0.8,-3 Q0,-3 0,-4 Z",
    fill: "red",
    obrys: true,
  },
  { d: "M4.9,-10.6 L6.8,-13.9 L21.6,-13.9 L26.6,-10.4 Z", fill: "glass" },
  { d: "M14.1,-13.9 L14.9,-13.9 L14.9,-10.5 L14.1,-10.5 Z", fill: "red" },
  { d: "M13,-16.6 L23,-16.6 L23,-14.8 L13,-14.8 Z", fill: "white", obrys: true },
];

const OCTAVIA: Dil[] = [
  {
    d: "M0,-4.2 L0,-8.9 Q0.3,-9.7 1.6,-9.9 L8.4,-10.2 L11.8,-14.3 Q12.6,-14.8 14.2,-14.8 L26.4,-14.8 Q27.8,-14.7 28.8,-13.8 L33.8,-9.9 L43.2,-8.9 Q45.4,-8.5 45.7,-6.8 L45.7,-3.8 Q45.7,-3 44.9,-3 L0.8,-3 Q0,-3 0,-4.2 Z",
    fill: "red",
    obrys: true,
  },
  { d: "M9.8,-10.3 L12.6,-13.9 L27.2,-13.9 L32,-10.3 Z", fill: "glass" },
  { d: "M19.6,-13.9 L20.4,-13.9 L20.4,-10.3 L19.6,-10.3 Z", fill: "red" },
  { d: "M16,-16.6 L26,-16.6 L26,-14.8 L16,-14.8 Z", fill: "white", obrys: true },
];

const PRIVEZ_BE: Dil[] = [
  { d: "M30,-5.2 L38.6,-4.4 L38.6,-3.8 L30,-4.4 Z", fill: "ink" },
  {
    d: "M0,-6.4 L0,-19.2 Q0,-20 0.8,-20 L29.2,-20 Q30,-20 30,-19.2 L30,-6.4 Z",
    fill: "tarp",
    obrys: true,
  },
  { d: "M0,-6.4 L30,-6.4 L30,-4.4 L0,-4.4 Z", fill: "board" },
];

const IVECO: Dil[] = [
  { d: "M1,-12.2 L84,-12.2 L84,-9.2 L1,-9.2 Z", fill: "ink2" },
  {
    d: "M0.6,-12.2 L0.6,-34 Q0.6,-35 1.6,-35 L68,-35 Q69,-35 69,-34 L69,-12.2 Z",
    fill: "red",
    obrys: true,
  },
  { d: "M0.6,-14 L69,-14 L69,-12.2 L0.6,-12.2 Z", fill: "board" },
  {
    d: "M70,-9.6 L70,-29.6 Q70,-31 71.4,-31 L81.6,-31 Q83.2,-31 83.8,-29.4 L85.4,-18 L86,-13 Q86,-9.6 84,-9.6 Z",
    fill: "red",
    obrys: true,
  },
  { d: "M77.4,-29.6 L82.6,-29.6 L84.3,-19.4 L77.4,-19.4 Z", fill: "glass" },
  { d: "M83,-9.6 L86,-9.6 L86,-7.8 L83,-7.8 Z", fill: "ink2" },
  { d: "M44,-29 L57,-29 L57,-19 L44,-19 Z", fill: "white" },
  { d: "M44,-21.4 L57,-21.4 L57,-19 L44,-19 Z", fill: "plate" },
  { d: "M44,-27.6 L57,-27.6 L57,-26.2 L44,-26.2 Z", fill: "plate" },
];

const PRIVEZ_CE: Dil[] = [
  { d: "M1,-12.2 L61.6,-12.2 L61.6,-9.2 L1,-9.2 Z", fill: "ink2" },
  { d: "M61.6,-8.8 L79.6,-7.6 L79.6,-6.8 L61.6,-8 Z", fill: "ink" },
  {
    d: "M0.6,-12.2 L0.6,-34 Q0.6,-35 1.6,-35 L61,-35 Q62,-35 62,-34 L62,-12.2 Z",
    fill: "red",
    obrys: true,
  },
  { d: "M0.6,-14 L62,-14 L62,-12.2 L0.6,-12.2 Z", fill: "board" },
];

const AUTOBUS: Dil[] = [
  {
    d: "M0,-5.6 L0,-30.4 Q0,-33 2.6,-33 L113.6,-33 Q117.4,-33 118.4,-29.8 L119.6,-12 L120,-8 Q120,-5.6 117.6,-5.6 Z",
    fill: "white",
    obrys: true,
  },
  { d: "M6,-28.4 L106,-28.4 L106,-18 L6,-18 Z", fill: "glass" },
  ...[18, 30, 42, 54, 66, 78, 90].map((x) => ({
    d: `M${x},-28.4 L${x + 1},-28.4 L${x + 1},-18 L${x},-18 Z`,
    fill: "white" as const,
  })),
  { d: "M113.4,-29.4 L117.4,-28.8 L118.8,-14 L113.4,-14 Z", fill: "glass" },
  { d: "M107.2,-28 L112.2,-28 L112.2,-7 L107.2,-7 Z", fill: "glass" },
  { d: "M0,-15 L106,-15 L106,-12 L0,-12 Z", fill: "red" },
];

const TRAKTOR: Dil[] = [
  { d: "M6,-12 L36,-12 L36,-8.6 L6,-8.6 Z", fill: "ink2" },
  {
    d: "M16,-9.5 L16,-16 L39,-16 Q41.4,-16 41.8,-13.6 L42,-10.6 Q42,-9.5 40.8,-9.5 Z",
    fill: "steel",
    obrys: true,
  },
  { d: "M7.4,-27.6 L18.4,-27.6 L18.8,-16 L6.8,-16 Z", fill: "glass" },
  {
    d: "M4.6,-14 L5.2,-28.6 Q5.3,-29.6 6.4,-29.6 L19.4,-29.6 Q20.4,-29.6 20.5,-28.6 L21,-16 L18.8,-16 L18.4,-27.6 L7.4,-27.6 L6.8,-14 Z",
    fill: "ink2",
    obrys: true,
  },
  { d: "M3.8,-29.6 L21.4,-29.6 L21.4,-31 L3.8,-31 Z", fill: "ink" },
  { d: "M24,-16 L24,-24.5 L25.2,-24.5 L25.2,-16 Z", fill: "ink2" },
  {
    d: "M1.2,-12 Q2,-18.6 10,-18.6 Q18,-18.6 18.8,-12 L17,-12 Q16.4,-16.8 10,-16.8 Q3.6,-16.8 3,-12 Z",
    fill: "ink2",
  },
];

export const TVARY: Record<VozidloId, Tvar> = {
  fabia: {
    delka: 40,
    dily: FABIA,
    kola: [
      { x: 7.2, r: 3.1 },
      { x: 32.4, r: 3.1 },
    ],
    elka: [],
  },
  traktor: {
    delka: 42,
    dily: TRAKTOR,
    kola: [
      { x: 10, r: 8 },
      { x: 34.5, r: 5 },
    ],
    elka: [{ x: 30.4, y: -15.2, s: 3.6 }],
  },
  "octavia-privez": {
    delka: 83.3,
    dily: [...PRIVEZ_BE, ...posun(OCTAVIA, 37.6)],
    kola: [
      { x: 13.6, r: 2.1 },
      { x: 18, r: 2.1 },
      { x: 37.6 + 8.6, r: 3.15 },
      { x: 37.6 + 34.4, r: 3.15 },
    ],
    elka: [{ x: 2.6, y: -17.2, s: 3.6 }],
  },
  iveco: {
    delka: 86,
    dily: IVECO,
    kola: [
      { x: 22, r: 4.8 },
      { x: 76, r: 4.8 },
    ],
    elka: [{ x: 61, y: -31, s: 4.6 }],
  },
  autobus: {
    delka: 120,
    dily: AUTOBUS,
    kola: [
      { x: 25, r: 5 },
      { x: 94.5, r: 5 },
    ],
    elka: [{ x: 1.6, y: -27.4, s: 4.6 }],
  },
  "iveco-privez": {
    delka: 165,
    dily: [...PRIVEZ_CE, ...posun(IVECO, 79)],
    kola: [
      { x: 14, r: 4.6 },
      { x: 49, r: 4.6 },
      { x: 79 + 22, r: 4.8 },
      { x: 79 + 76, r: 4.8 },
    ],
    elka: [
      { x: 2.6, y: -31, s: 4.6 },
      { x: 79 + 61, y: -31, s: 4.6 },
    ],
  },
};

/** Barvy pro statické SVG (obrázky pro sdílení), na webu se používají CSS proměnné. */
const HEX: Record<Barva, string> = {
  red: "#c20426",
  glass: "#dfe5ec",
  ink: "#14161b",
  ink2: "#3a3f4a",
  white: "#ffffff",
  steel: "#8a929e",
  tarp: "#e4e7eb",
  board: "#b9bec8",
  plate: "#2c3990",
};

/** Vozidlo jako samostatný SVG řetězec, souřadnice v decimetrech, x = 0 je zadek. */
export function svgVozidla(id: VozidloId, posunX = 0): string {
  const t = TVARY[id];
  const dily = t.dily
    .map(
      (p) =>
        `<path d="${p.d}" fill="${HEX[p.fill]}"${p.obrys ? ` stroke="${HEX.ink}" stroke-width="0.35" stroke-linejoin="round"` : ""}/>`,
    )
    .join("");
  const elka = t.elka
    .map((z) => {
      const tl = z.s * 0.16;
      return `<rect x="${z.x}" y="${z.y}" width="${z.s}" height="${z.s}" rx="${z.s * 0.08}" fill="${HEX.plate}"/><path d="M${z.x + z.s * 0.32},${z.y + z.s * 0.18} h${tl} v${z.s * 0.5} h${z.s * 0.3} v${tl} h${-(z.s * 0.3 + tl)} Z" fill="#fff"/>`;
    })
    .join("");
  const kola = t.kola
    .map(
      (k) =>
        `<circle cx="${k.x}" cy="${-k.r}" r="${k.r}" fill="${HEX.ink}"/><circle cx="${k.x}" cy="${-k.r}" r="${k.r * 0.58}" fill="#c9ced6"/><circle cx="${k.x}" cy="${-k.r}" r="${k.r * 0.17}" fill="${HEX.ink}"/>`,
    )
    .join("");
  return `<g transform="translate(${posunX},0)">${dily}${elka}${kola}</g>`;
}
