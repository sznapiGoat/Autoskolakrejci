import { OG_SIZE, ogObrazek } from "@/lib/og";

export const alt = "Autoškola Krejčí Třebíč: řidičák od osobáku po autobus, vozidla skupin B, C a D ve skutečném měřítku";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogObrazek({
    nadpis: "Řidičák v Třebíči",
    podtitul: "Od osobáku po autobus. Skupiny B, BE, C, CE, D a T.",
    vozidla: ["fabia", "iveco", "autobus"],
  });
}
