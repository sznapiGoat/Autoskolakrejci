import { cacheLife, cacheTag } from "next/cache";

export type Termin = {
  id: string;
  typ: string;
  /** „So 5.12.2026 (08:00)“ rozložené na části */
  den: string;
  datum: string;
  cas: string;
  /** ISO datum a čas pro <time> a strukturovaná data */
  iso: string;
  misto: string;
  volno: number | null;
};

const ZDROJ = "https://rokr.moje-autoskola.cz/prihlaska_skoleni.php?iframe=1";

const text = (html: string) =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Vypsané termíny školení z Moje autoškola. Tabulka je přímo v HTML jejich formuláře,
 * načteme ji na serveru, aby termíny byly vidět i pro vyhledávače.
 * Když se něco nepovede, vrátíme prázdný seznam a stránka ukáže jen formulář.
 */
export async function getTerminy(): Promise<Termin[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("terminy");

  try {
    const res = await fetch(ZDROJ);
    if (!res.ok) return [];
    const html = await res.text();
    const start = html.indexOf("ma_prihlaska_skoleni_terminy");
    if (start === -1) return [];
    const tabulka = html.slice(start, html.indexOf("</table>", start));
    const radky = [...tabulka.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((m) => m[1]).filter((r) => r.includes("<td"));

    return radky.flatMap((r) => {
      const bunky = [...r.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((m) => m[1]);
      if (bunky.length < 4) return [];
      const id = r.match(/termin_id=(\d+)/)?.[1];
      const kdy = text(bunky[1]).match(/^(\S+)\s+(\d{1,2})\.(\d{1,2})\.(\d{4})\s*\((\d{1,2}:\d{2})\)/);
      if (!id || !kdy) return [];
      const [, den, d, m, y, cas] = kdy;
      const volno = parseInt(text(bunky[3]), 10);
      return [
        {
          id,
          typ: text(bunky[0]),
          den,
          datum: `${+d}. ${+m}. ${y}`,
          cas,
          // letní čas zhruba od dubna do října, na přesný den přechodu nezáleží
          iso: `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}T${cas.padStart(5, "0")}:00+0${+m >= 4 && +m <= 10 ? 2 : 1}:00`,
          misto: text(bunky[2]),
          volno: Number.isFinite(volno) ? volno : null,
        },
      ];
    });
  } catch {
    return [];
  }
}

export const prihlaskaTerminu = (id: string) => `https://rokr.moje-autoskola.cz/prihlaska_skoleni.php?termin_id=${id}&iframe=1`;
