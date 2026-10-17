/** Cena v korunách s mezerou po tisících, např. „21 000 Kč“. Bez serverových závislostí, jde i do klienta. */
export function kc(n: number) {
  return `${n.toLocaleString("cs-CZ")} Kč`;
}
