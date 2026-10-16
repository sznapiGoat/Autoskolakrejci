import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { VozidloId } from "./skupiny";
import { LOGO } from "./logo-data";
import { svgVozidla, TVARY } from "./tvary";

export const OG_SIZE = { width: 1200, height: 630 };

// Písma čteme jednou při načtení modulu, díky tomu se obrázky vygenerují už při buildu.
const PISMA = Promise.all([
  readFile(join(process.cwd(), "assets/fonts/Overpass-ExtraBold.ttf")),
  readFile(join(process.cwd(), "assets/fonts/OverpassMono-SemiBold.ttf")),
]);

const PAPIR = "#f4f5f7";
const INK = "#14161b";
const RED = "#c20426";
const PLATE = "#2c3990";

// Logo Kóta jako data URI, barvy natvrdo (v obrázku nejsou CSS proměnné)
const LOGO_W = 300;
const [, , vbW, vbH] = LOGO.kota.viewBox.split(" ").map(Number);
const LOGO_H = Math.round((LOGO_W * vbH) / vbW);
const LOGO_SRC = `data:image/svg+xml;base64,${Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${LOGO.kota.viewBox}">${LOGO.kota.tvary
    .map(([role, d]) => `<path d="${d}" fill="${role === "plate" ? PLATE : role === "white" ? "#fff" : INK}"/>`)
    .join("")}</svg>`,
).toString("base64")}`;

/** Vozidla vedle sebe na jedné vozovce ve společném měřítku, jako data URI pro <img>. */
function rada(ids: VozidloId[], mezera = 10) {
  let x = 0;
  const g = ids.map((id) => {
    const out = svgVozidla(id, x);
    x += TVARY[id].delka + mezera;
    return out;
  });
  const sirka = x - mezera;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -38 ${sirka + 4} 40">${g.join("")}<line x1="-2" x2="${sirka + 2}" y1="0" y2="0" stroke="${INK}" stroke-width="0.5"/></svg>`;
  return { src: `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`, pomer: (sirka + 4) / 40 };
}

/**
 * Obrázek pro sdílení: tabulka L, nadpis, podtitul a vozidla v měřítku dole.
 * `kod` je volitelný štítek skupiny vedle nadpisu.
 */
export async function ogObrazek({
  nadpis,
  podtitul,
  vozidla,
  kod,
  delka,
}: {
  nadpis: string;
  podtitul: string;
  vozidla: VozidloId[];
  kod?: string;
  delka?: string;
}) {
  const [display, mono] = await PISMA;
  const { src, pomer } = rada(vozidla);
  // vozidla zabírají spodní pás, šířka podle poměru, ale nejvýš celou šířku obrázku
  const vyska = Math.min(240, 1080 / pomer);
  const sirka = vyska * pomer;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: PAPIR,
          padding: "56px 60px 48px",
          fontFamily: "Overpass",
          color: INK,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO_SRC} width={LOGO_W} height={LOGO_H} alt="" />

        <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 44 }}>
          {kod && (
            <div
              style={{
                height: 84,
                minWidth: 84,
                padding: "6px 14px 0",
                background: PLATE,
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontFamily: "Overpass Mono",
                fontSize: 46,
              }}
            >
              {kod}
            </div>
          )}
          <span style={{ fontSize: kod ? 66 : 74, lineHeight: 1, letterSpacing: -2 }}>{nadpis}</span>
        </div>
        <span style={{ fontSize: 30, color: RED, marginTop: 18 }}>{podtitul}</span>

        <div style={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-end" }}>
          {delka && (
            <div style={{ display: "flex", alignItems: "center", width: sirka, marginBottom: 10 }}>
              <div style={{ width: 2, height: 16, background: PLATE }} />
              <div style={{ flex: 1, height: 2, background: PLATE }} />
              <span style={{ fontFamily: "Overpass Mono", fontSize: 22, color: PLATE, padding: "0 12px" }}>cca {delka} m</span>
              <div style={{ flex: 1, height: 2, background: PLATE }} />
              <div style={{ width: 2, height: 16, background: PLATE }} />
            </div>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} width={sirka} height={vyska} alt="" />
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Overpass", data: display, weight: 800, style: "normal" },
        { name: "Overpass Mono", data: mono, weight: 600, style: "normal" },
      ],
    },
  );
}
