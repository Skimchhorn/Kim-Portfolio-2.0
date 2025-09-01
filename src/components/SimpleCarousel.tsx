"use client";

import { Children, ReactNode, useRef } from "react";

export default function SimpleCarousel({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);

  // move by one full viewport width
  const go = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * dir, behavior: "smooth" });
  };

  const slides = Children.toArray(children); // <-- works for 1+ children

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl border border-white/10">
        <div
          ref={trackRef}
          className="
            flex snap-x snap-mandatory overflow-x-auto scroll-smooth
            [scrollbar-width:none] [-ms-overflow-style:none]
          "
          style={{ scrollbarWidth: "none" } as React.CSSProperties}
        >
          {slides.map((child, i) => (
            <div key={i} className="w-full shrink-0 snap-center">
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* show arrows only if there is more than 1 slide */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 px-3 py-2 backdrop-blur hover:bg-black/60"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 px-3 py-2 backdrop-blur hover:bg-black/60"
            aria-label="Next"
          >
            ›
          </button>
        </>
      )}

      <div className="mt-3 flex justify-center">
        <span className="tag">swipe or use arrows</span>
      </div>
    </div>
  );
}
