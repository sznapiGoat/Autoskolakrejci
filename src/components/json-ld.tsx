import { SITE } from "@/lib/site";

/** Strukturovaná data pro vyhledávače. `<` escapujeme, aby obsah nemohl ukončit script. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const AUTOSKOLA = {
  "@type": "DrivingSchool",
  "@id": `${SITE.url}/#autoskola`,
  name: SITE.name,
  url: SITE.url,
  telephone: "+420608820882",
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bráfova 16/2",
    postalCode: "674 01",
    addressLocality: "Třebíč",
    addressCountry: "CZ",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: "Wednesday",
    opens: "14:00",
    closes: "15:00",
  },
} as const;

export function drobecky(polozky: { nazev: string; cesta: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: polozky.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.nazev,
      item: `${SITE.url}${p.cesta}`,
    })),
  };
}
