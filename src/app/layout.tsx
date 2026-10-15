import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible_Next, Overpass, Overpass_Mono } from "next/font/google";
import { Hlavicka } from "@/components/hlavicka";
import { Paticka } from "@/components/paticka";
import { SITE } from "@/lib/site";
import "./globals.css";

const overpass = Overpass({
  variable: "--font-overpass",
  subsets: ["latin", "latin-ext"],
});

const atkinson = Atkinson_Hyperlegible_Next({
  variable: "--font-atkinson",
  subsets: ["latin", "latin-ext"],
});

const overpassMono = Overpass_Mono({
  variable: "--font-overpass-mono",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="cs" className={`${overpass.variable} ${atkinson.variable} ${overpassMono.variable} antialiased`}>
      <body className="flex min-h-svh flex-col">
        <Hlavicka />
        <main className="flex-1">{children}</main>
        <Paticka />
      </body>
    </html>
  );
}
