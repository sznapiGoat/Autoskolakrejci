import { cenaSkupiny, getCenik, kc } from "@/lib/cenik";
import { OG_SIZE, ogObrazek } from "@/lib/og";
import { SKUPINY, skupina } from "@/lib/skupiny";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Řidičák v autoškole Krejčí v Třebíči, cvičné vozidlo ve skutečném měřítku";

export function generateStaticParams() {
  return SKUPINY.map((s) => ({ id: s.id }));
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const s = skupina((await params).id) ?? SKUPINY[0];
  const cena = cenaSkupiny(await getCenik(), s.id);
  return ogObrazek({
    kod: s.kod,
    nadpis: s.h1,
    podtitul: `Třebíč · od ${s.vek} let${cena ? ` · kurz od ${kc(cena)}` : ""}`,
    vozidla: [s.vozidlo],
    delka: s.delka.toLocaleString("cs-CZ"),
  });
}
