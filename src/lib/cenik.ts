import { createClient } from "next-sanity";
import { cacheLife, cacheTag } from "next/cache";

const sanity = createClient({
  projectId: "wnd9n4sb",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

export type Kurz = { group: string; price: number; note: string };
export type Kondice = { group: string; hourPrice: number; examPrice: number };
export type Cenik = {
  mainCourses: Kurz[];
  combinedCourses: Kurz[];
  additionalDriving: Kondice[];
  updatedAt: string | null;
};

// Ceník přepsaný z rokr.cz (aktualizováno 24. 8. 2026). Sanity se použije, jen když je novější.
export const CENIK_V_REPU = "2026-08-24";
const ZALOHA: Cenik = {
  mainCourses: [
    { group: 'B ("klasický" kurz)', price: 21000, note: "teorie, PÚ + 28 hodin jízd + ZK (test + jízda)" },
    { group: 'B ("individuální" kurz)', price: 24000, note: "teorie, PÚ + 28 hodin jízd + ZK (test + jízda)" },
    { group: "RB/B96", price: 3800, note: "v ceně 1 hodina kondiční jízdy + ZK z jízdy" },
    { group: "RB/BE", price: 9000, note: "teorie, PÚ + 8 hodin jízd + ZK (test + jízda)" },
    { group: "RB/T", price: 13500, note: "teorie, PÚ + 10 hodin jízd + ZK" },
    { group: "RB/D", price: 53000, note: "teorie, PÚ + 28 hodin jízd + ZK (test + jízda + OÚV)" },
    { group: "T", price: 23500, note: "teorie, PÚ + 21 hodin jízd + ZK (test + jízda)" },
    { group: "RB/C", price: 29000, note: "teorie, PÚ + 18 hodin jízd + ZK (test + jízda + OÚV)" },
    { group: "RC/CE", price: 14200, note: "teorie, PÚ + 8 hodin jízd + ZK (test + jízda + OÚV)" },
    { group: "RC/D", price: 29500, note: "teorie, PÚ + 14 hodin jízd + ZK (test + jízda + OÚV)" },
  ],
  combinedCourses: [
    { group: "B+T", price: 40500, note: "teorie, PÚ + 28 + 21 hodin jízd + ZK (test + jízdy)" },
    { group: "RC/CE+D", price: 40500, note: "teorie, PÚ + 8 + 14 hodin jízd + ZK (test + jízdy)" },
  ],
  additionalDriving: [
    { group: "B", hourPrice: 600, examPrice: 500 },
    { group: "BE", hourPrice: 900, examPrice: 800 },
    { group: "T", hourPrice: 1000, examPrice: 800 },
    { group: "C", hourPrice: 1200, examPrice: 1200 },
    { group: "CE", hourPrice: 1500, examPrice: 1500 },
    { group: "D", hourPrice: 1400, examPrice: 1400 },
  ],
  updatedAt: CENIK_V_REPU,
};

/** Poplatky, které nejsou v ceně kurzu. ORP = obecní úřad obce s rozšířenou působností. */
export const POPLATKY = {
  spravni: 700,
  opakovanaJizdaOrp: 400,
  opakovanyTest: { autoskola: 300, orp: 100 },
  opakovaneOuv: { autoskola: 100, orp: 200 },
  prostoj: 300,
} as const;

/*
  Část textů v Sanity je uložená rozbitě: UTF-8 přečtené jako windows-1250
  („klasickĂ˝“ místo „klasický“). Převedeme znaky zpět na bajty a přečteme znovu.
*/
let cp1250: Map<string, number> | null = null;
function opravKodovani(s: string): string {
  const t = s.trim();
  if (!/[ĂÄĹÅ]/.test(t)) return t;
  if (!cp1250) {
    const dec = new TextDecoder("windows-1250");
    cp1250 = new Map();
    for (let b = 0x80; b <= 0xff; b++) cp1250.set(dec.decode(new Uint8Array([b])), b);
  }
  const bajty: number[] = [];
  for (const ch of t) {
    const code = ch.charCodeAt(0);
    const b = code < 0x80 ? code : cp1250.get(ch);
    if (b === undefined) return t;
    bajty.push(b);
  }
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(new Uint8Array(bajty));
  } catch {
    return t;
  }
}

const vycisti = <T extends { group: string; note?: string }>(rows: T[]) =>
  rows.map((r) => ({ ...r, group: opravKodovani(r.group), ...(r.note != null && { note: opravKodovani(r.note) }) }));

export async function getCenik(): Promise<Cenik> {
  "use cache";
  cacheLife("hours");
  cacheTag("cenik");

  try {
    const res = await sanity.fetch<Partial<Cenik> & { _updatedAt?: string } | null>(
      `*[_type == "cenik"][0]{ mainCourses, combinedCourses, additionalDriving, _updatedAt }`,
    );
    // Sanity bereme jen tehdy, když ji někdo upravil později než ceník v repu.
    if (!res || !res._updatedAt || res._updatedAt.slice(0, 10) <= CENIK_V_REPU) return ZALOHA;
    return {
      mainCourses: res.mainCourses?.length ? vycisti(res.mainCourses) : ZALOHA.mainCourses,
      combinedCourses: res.combinedCourses?.length ? vycisti(res.combinedCourses) : ZALOHA.combinedCourses,
      additionalDriving: res.additionalDriving?.length ? vycisti(res.additionalDriving) : ZALOHA.additionalDriving,
      updatedAt: res._updatedAt.slice(0, 10),
    };
  } catch {
    return ZALOHA;
  }
}

/** Nejnižší cena kurzu pro danou skupinu, podle názvu řádku v ceníku. */
export function cenaSkupiny(cenik: Cenik, id: string): number | null {
  const pravidla: Record<string, (g: string) => boolean> = {
    b: (g) => /^B\b/.test(g),
    be: (g) => g === "RB/BE",
    t: (g) => g === "T",
    c: (g) => g === "RB/C",
    ce: (g) => g === "RC/CE",
    d: (g) => g === "RC/D" || g === "RB/D",
  };
  const test = pravidla[id];
  if (!test) return null;
  const ceny = cenik.mainCourses.filter((k) => test(k.group)).map((k) => Number(k.price));
  return ceny.length ? Math.min(...ceny) : null;
}

export { kc } from "./format";
