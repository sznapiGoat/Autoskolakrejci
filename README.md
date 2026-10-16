# Autoškola Krejčí Třebíč

Nový web Autoškoly Rostislav Krejčí (rokr.cz). Skupiny B, BE, C, CE, D a T, školení profesních řidičů, učebna na Bráfově 16/2 v Třebíči.

## Koncept: Měřítko vozidel

Autoškola neučí jen osobák, ale i nákladní auta, soupravy a autobusy. Web to ukazuje doslova: vozidla jednotlivých skupin jsou nakreslená jako SVG ve skutečném měřítku (1 jednotka = 10 cm) a stojí předkem na stejné stopčáře. Kóty a pravítka jsou prvky layoutu.

- **Barvy** jsou změřené z vozového parku: červená plachty Iveca a karoserie Fabií `#C20426`, modrá tabulky L `#2C3990`.
- **Písmo:** nadpisy Overpass (vychází z písma silničního značení), text Atkinson Hyperlegible Next, čísla a kóty Overpass Mono.

## Stack

Next.js 16 (App Router, Cache Components), React 19, Tailwind CSS 4, Motion. Nasazení na Vercel.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

Proměnné prostředí nejsou potřeba.

## Odkud se berou data

| Co | Kde | Jak se mění |
| --- | --- | --- |
| Ceník | `src/lib/cenik.ts` (`ZALOHA`, přepsáno z rokr.cz k 24. 8. 2026) | Ručně v kódu. Sanity (`wnd9n4sb`) se použije, jen když je v ní dokument `cenik` novější než `CENIK_V_REPU`. |
| Termín dalšího kurzu B | `src/lib/site.ts`, konstanty `PRISTI_B` a `PRISTI_B_VETA` | Ručně, na webu se z nich skládá úvod, přihláška, kontakt i časté dotazy. |
| Termíny školení | Moje autoškola, `src/lib/terminy.ts` | Samo. Načítají se na serveru z formuláře a obnovují se po hodině. |
| Přihláška, studovna, přihláška na školení | iframy Moje autoškola (`rokr.moje-autoskola.cz`) | V systému Moje autoškola. |
| Kontakty, úřední hodiny, místa školení | `src/lib/site.ts` | Ručně. |
| Skupiny (věk, výcvik, fotky, nadpisy pro vyhledávání) | `src/lib/skupiny.ts` | Ručně. |
| Siluety vozidel | `src/lib/tvary.ts` | Souřadnice v decimetrech. |

Pozor: v Sanity jsou staré ceny z dubna 2026 a texty s rozbitou diakritikou (UTF-8 uložené jako windows-1250). Načítání to opravuje, ale zdroj je potřeba opravit, než se Sanity znovu začne používat.

## Výměna fotky v hero

Fotka je v `src/components/hero-foto.tsx`, objekt `FOTKA`. Po výměně stačí přepsat cestu, rozměry a polohu vozidla jako zlomky šířky a výšky fotky (`x0` předek, `x1` zadek, `y0` střecha, `y1` vozovka). Kóta a štítek skupiny se posunou samy.

## SEO

- Titulky a nadpisy podle toho, co lidé hledají („Řidičák na autobus (skupina D) v Třebíči“).
- Strukturovaná data: DrivingSchool, Course s cenou, FAQPage u každé skupiny, EducationEvent pro termíny školení, BreadcrumbList.
- Obrázky pro sdílení se generují při buildu (`opengraph-image.tsx`) s kresbou vozidla.
- Dokud web neběží na rokr.cz, má `noindex` a robots.txt zakazuje procházení. Adresa webu se bere z `VERCEL_PROJECT_PRODUCTION_URL`, po přepojení domény se indexování zapne samo.

## Struktura

```
src/app/              stránky (/, /skupiny, /skupiny/[id], /cenik, /prihlaska, /skoleni-ridicu, /studovna, /kontakt, /o-autoskole)
src/components/       meritko.tsx (scrollované měřítko), hero-foto.tsx, vozidla.tsx, cesta.tsx, galerie.tsx, …
src/lib/              data a načítání (cenik, terminy, skupiny, site, faq, og, tvary)
public/foto/          fotky vozového parku a učebny
public/soubory/       PDF přihláška a lékařský posudek
assets/fonts/         TTF písma pro generování obrázků pro sdílení
docs/                 podklady pro klienta
```
