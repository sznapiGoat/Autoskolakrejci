import path from "node:path";
import type { NextConfig } from "next";

/** Adresy starého webu rokr.cz, ať odkazy z Googlu a odjinud nekončí chybou. */
const STARY_WEB: [string, string][] = [
  ["/index.html", "/"],
  ["/skupiny.html", "/skupiny"],
  ["/cenik.html", "/cenik"],
  ["/kontakt.html", "/kontakt"],
  ["/skoleni.html", "/skoleni-ridicu"],
  ["/prihlasky.html", "/prihlaska"],
  ["/onas.html", "/o-autoskole"],
  ["/odkazy.html", "/studovna#odkazy"],
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  async redirects() {
    return STARY_WEB.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
  partialPrefetching: true,
  turbopack: {
    // V domovské složce leží jiný package-lock.json, bez tohohle by ho Next bral jako kořen.
    root: path.join(__dirname),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
