"use client";

import Script from "next/script";
import { useRef } from "react";
import { SITE } from "@/lib/site";

declare global {
  interface Window {
    iFrameResize?: (opts: Record<string, unknown>, target: HTMLIFrameElement) => void;
  }
}

/**
 * Formulář ze systému Moje autoškola. Jejich iframeResizer nastaví výšku podle obsahu,
 * výchozí výška platí, dokud skript nedoběhne.
 */
export function MojeFrame({ src, title, vyska, line = false }: { src: string; title: string; vyska: number; line?: boolean }) {
  const ref = useRef<HTMLIFrameElement>(null);
  const zmen = () => {
    if (ref.current && window.iFrameResize) window.iFrameResize({ checkOrigin: false }, ref.current);
  };

  return (
    <>
      <iframe
        ref={ref}
        src={src}
        title={title}
        className="block w-full border-0 bg-white"
        style={{ height: vyska }}
        loading={line ? "lazy" : undefined}
        onLoad={zmen}
      />
      <Script src={SITE.moje.resizer} strategy="lazyOnload" onLoad={zmen} />
      <p className="mt-3 text-sm text-muted">
        Formulář běží v systému{" "}
        <a href="https://www.moje-autoskola.cz" className="underline underline-offset-2 hover:text-ink" rel="noopener">
          Moje autoškola
        </a>
        , přes který autoškola eviduje žáky a plánuje jízdy.
      </p>
    </>
  );
}
