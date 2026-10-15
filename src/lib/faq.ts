import { kc, POPLATKY, type Cenik } from "./cenik";
import { KURZY } from "./site";
import type { Skupina } from "./skupiny";

export type Dotaz = { otazka: string; odpoved: string };

/**
 * Časté dotazy ke skupině. Odpovědi se skládají jen z dat, která máme ověřená
 * (ceník, věk, rozsah výcviku, termíny z rokr.cz), nic se nedomýšlí.
 */
export function dotazy(s: Skupina, cenik: Cenik): Dotaz[] {
  const kurzy = [...cenik.mainCourses, ...cenik.combinedCourses].filter((k) => s.radky.includes(k.group));
  const kondice = cenik.additionalDriving.find((k) => k.group === s.kondice);
  const out: Dotaz[] = [];

  if (kurzy.length) {
    out.push({
      otazka: `Kolik stojí řidičák skupiny ${s.kod} v Třebíči?`,
      odpoved: `${kurzy.map((k) => `${k.group}: ${kc(Number(k.price))}`).join(", ")}. K tomu správní poplatek ${kc(POPLATKY.spravni)}, který se platí úřadu, zpravidla v den zkoušky. Nejsme plátci DPH.`,
    });
  }

  out.push({
    otazka: `Od kolika let můžu dělat skupinu ${s.kod}?`,
    odpoved: `Od ${s.vek} let.${s.podminka ? ` Musíte už mít ${s.podminka.replace("skupina", "skupinu")}.` : ""}`,
  });

  out.push({
    otazka: "Kolik hodin jízd kurz obsahuje a z čeho je zkouška?",
    odpoved: `Výcvik: ${s.jizdy}. Zkouška: ${s.zkouska}. K tomu výuka teorie a praktické údržby v učebně na Bráfově ulici.`,
  });

  out.push({
    otazka: "Kdy kurz začíná?",
    odpoved:
      s.id === "b"
        ? `${KURZY.pristiB} ${KURZY.rytmusB}`
        : s.id === "t"
          ? "Termín domluvíme po přihlášení. Kurz B a T se dá vzít i dohromady jako sdružený kurz."
          : `${KURZY.prubezne} Stačí se přihlásit a termín jízd domluvíme.`,
  });

  if (s.profi) {
    out.push({
      otazka: "Potřebuji k tomu i profesní průkaz?",
      odpoved:
        "Pokud budete jezdit z povolání, ano: potřebujete průkaz profesní způsobilosti řidiče, tedy vstupní školení a zkoušku. Vstupní školení u nás uděláte, je dobré ho naplánovat spolu s kurzem.",
    });
  }

  if (kondice) {
    out.push({
      otazka: "Kolik stojí kondiční jízda nebo opakovaná zkouška?",
      odpoved: `Hodina kondiční jízdy stojí ${kc(kondice.hourPrice)}. Opakovaná zkouška z jízdy ${kc(kondice.examPrice)} plus ${kc(POPLATKY.opakovanaJizdaOrp)} na úřadě.`,
    });
  }

  return out;
}
