import type { MetadataRoute } from "next";
import { INDEXOVAT, SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!INDEXOVAT) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE.url}/sitemap.xml` };
}
