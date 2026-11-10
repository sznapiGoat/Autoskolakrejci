import Link from "next/link";
import { KURZY } from "@/lib/site";

/** Úzká lišta nad hlavičkou s termínem dalšího kurzu B. Termín se mění v lib/site.ts. */
export function Lista() {
  return (
    <div className="bg-asphalt text-white">
      <p className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2 text-center text-[0.8rem] sm:text-sm md:px-8">
        <span>
          <span className="text-white/60">Další kurz <span className="hidden sm:inline">skupiny </span>B: </span>
          <span className="font-semibold">{KURZY.pristiBKratce}</span>
        </span>
        <Link href="/prihlaska" className="font-semibold underline decoration-red decoration-2 underline-offset-4 hover:text-white/80">
          Přihláška
        </Link>
      </p>
    </div>
  );
}
