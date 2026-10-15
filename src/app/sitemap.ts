import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { SKUPINY } from "@/lib/skupiny";

export default function sitemap(): MetadataRoute.Sitemap {
  const cesty = ["", "/skupiny", "/cenik", "/prihlaska", "/skoleni-ridicu", "/studovna", "/kontakt", "/o-autoskole"];
  return [...cesty, ...SKUPINY.map((s) => `/skupiny/${s.id}`)].map((c) => ({ url: `${SITE.url}${c}` }));
}
