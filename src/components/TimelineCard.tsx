"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type TimelineCardProps = {
  date: string;                // e.g., "MAY 2025 – PRESENT"
  title: string;               // e.g., "Research Assistant"
  org: string;                 // e.g., "Simon Fraser University (SFU)"
  imgSrc?: string;             // e.g., "/sfu.png"
  bullets?: string[];          // bullet points
};

// Collapses on small screens, expanded by default on md+
export default function TimelineCard({
  date, title, org, imgSrc = "/sfu.png", bullets = []
}: TimelineCardProps) {
  const detRef = useRef<HTMLDetailsElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (detRef.current) {
      // expand on md+, collapse on mobile
      if (isDesktop) detRef.current.open = true;
      else detRef.current.open = false;
    }
  }, [isDesktop]);

  return (
    <details
      ref={detRef}
      className="group rounded-2xl border border-white/10 bg-white/0 hover:bg-white/[0.03] transition-colors"
    >
      <summary className="list-none cursor-pointer select-none px-4 py-3 flex items-center gap-3 md:cursor-default md:pointer-events-none">
        <span className="hidden" />

        <div className="flex-1">
          <div className="text-sm tracking-wide text-white/70">{date}</div>
          <div className="font-bold">{title}</div>
          <div className="text-white/70">{org}</div>
        </div>
        {/* chevron only on mobile */}
        <svg
          className="h-5 w-5 md:hidden transition-transform group-open:rotate-180"
          viewBox="0 0 20 20" fill="currentColor"
        >
          <path fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd" />
        </svg>
      </summary>

      <div className="px-4 pb-4 md:pt-0">
        <div className="mt-2 grid grid-cols-[80px,1fr] gap-4 items-start">
          <div className="relative h-16 w-16 overflow-hidden rounded-full border border-white/10">
            <Image
              src={imgSrc}
              alt="Organization logo"
              fill
              sizes="64px"
              className="object-contain bg-white/5"
              priority
            />
          </div>
          <ul className="space-y-2 text-sm leading-relaxed text-white/90">
            {bullets.map((b, i) => (
              <li key={i} className="pl-4 relative">
                <span className="absolute left-0 top-2 h-1 w-1 rounded-full bg-white/70"></span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </details>
  );
}
