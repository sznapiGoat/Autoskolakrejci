import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible_Next, Overpass, Overpass_Mono } from "next/font/google";
import { Hlavicka } from "@/components/hlavicka";
import { Paticka } from "@/components/paticka";
import { cenaSkupiny, getCenik } from "@/lib/cenik";
import { INDEXOVAT, KURZY, SITE } from "@/lib/site";
import { SKUPINY } from "@/lib/skupiny";
import "./globals.css";

const overpass = Overpass({
  variable: "--font-overpass",
  subsets: ["latin", "latin-ext"],
});

const atkinson = Atkinson_Hyperlegible_Next({
  variable: "--font-atkinson",
  subsets: ["latin", "latin-ext"],
  // Next pro tohle písmo nemá metriky záložního fontu, záloha je proto ruční
  adjustFontFallback: false,
  fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"],
});

const overpassMono = Overpass_Mono({
  variable: "--font-overpass-mono",
  subsets: ["latin", "latin-ext"],
  // jen drobné popisky a ceny, nemusí soupeřit s hero fotkou o přednostní stažení
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  robots: INDEXOVAT ? undefined : { index: false, follow: false },
  title: {
    default: "Autoškola Krejčí Třebíč | řidičák B, C, CE, D, T",
    template: "%s | Autoškola Krejčí Třebíč",
  },
  description:
    "Autoškola Rostislav Krejčí v Třebíči. Výuka a výcvik skupin B, BE, C, CE, D a T, školení profesionálních řidičů a trenažér v učebně na Bráfově ulici.",
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: SITE.name,
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f5f7",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const cenik = await getCenik();
  const ceny = Object.fromEntries(SKUPINY.map((s) => [s.id, cenaSkupiny(cenik, s.id)]));

  return (
    <html lang="cs" className={`${overpass.variable} ${atkinson.variable} ${overpassMono.variable} antialiased`}>
      <body className="flex min-h-svh flex-col">
        <Hlavicka ceny={ceny} pristiB={KURZY.pristiBKratce} />
        <main className="flex-1">{children}</main>
        <Paticka />
      </body>
    </html>
  );
}
