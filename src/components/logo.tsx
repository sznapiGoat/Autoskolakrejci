import { LOGO, type Role } from "@/lib/logo-data";

/*
  Logo Kóta: tabulka L, AUTOŠKOLA, KREJČÍ a kóta se skupinami.
  Text a kóta přebírají barvu textu (currentColor), modrou jde přepsat proměnnou --logo-plate.
*/
const FILL: Record<Role, string> = {
  ink: "currentColor",
  plate: "var(--logo-plate, var(--plate))",
  white: "#fff",
};

export function Logo({
  varianta = "kota",
  className,
  title,
}: {
  varianta?: keyof typeof LOGO;
  className?: string;
  /** když chybí, je logo pro čtečky skryté (vedle bývá text) */
  title?: string;
}) {
  const { viewBox, tvary } = LOGO[varianta];
  return (
    <svg
      viewBox={viewBox}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {tvary.map(([role, d], i) => (
        <path key={i} d={d} fill={FILL[role]} />
      ))}
    </svg>
  );
}
