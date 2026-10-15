import Link from "next/link";
import { VozidloNaSilnici } from "@/components/vozidla";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-[1320px] px-4 py-24 md:px-8 md:py-32">
      <VozidloNaSilnici id="fabia" sirka={90} popis="Cvičná Fabie na prázdné silnici" className="block h-auto w-full max-w-[640px]" />
      <h1 className="mt-12 text-[clamp(2.4rem,6vw,4.4rem)] font-extrabold leading-[0.98] tracking-[-0.03em]">
        Tudy cesta nevede.
      </h1>
      <p className="mt-5 max-w-[46ch] text-lg text-ink-2">Stránka neexistuje, nebo se přestěhovala. Zkuste to od začátku.</p>
      <Link href="/" className="mt-8 inline-flex h-12 items-center rounded-[3px] bg-red px-6 font-bold text-white hover:bg-red-deep">
        Na úvod
      </Link>
    </section>
  );
}
