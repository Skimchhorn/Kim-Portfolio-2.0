export default function ExtraCard({
  title,
  subtitle,
  img,
}: {
  title: string;
  subtitle: string;
  img: string;
}) {
  return (
    <article
      className="
        outline-box w-full rounded-2xl
        px-4 py-3 md:px-5 md:py-4
        flex items-center gap-4
        hover:bg-white/[0.02] transition-colors
      "
    >
      {/* LEFT: text + actions */}
      <div className="min-w-0">
        <h3 className="font-extrabold leading-tight text-base md:text-lg truncate">
          {title}
        </h3>
        <p className="text-xs text-[var(--muted)] truncate">{subtitle}</p>

        <div className="mt-2 flex flex-wrap gap-2">
          <a
            className="px-2.5 py-1 rounded-[0.9rem] text-[11px] sm:text-xs font-semibold bg-[#1a1b22] border border-white/10"
            href="#"
          >
            LINK
          </a>
          <a
            className="px-2.5 py-1 rounded-[0.9rem] text-[11px] sm:text-xs font-semibold bg-[#1a1b22] border border-white/10"
            href="#"
          >
            CERTIFICATE
          </a>
        </div>
      </div>

      {/* RIGHT: small logo pinned at the end */}
      <div className="ml-auto shrink-0">
        <div className="h-18 w-18 sm:h-14 sm:w-14 md:h-20 md:w-20 rounded-lg overflow-hidden border border-white/10 bg-white/5">
          <img src={img} alt={title} className="h-full w-full object-contain" />
        </div>
      </div>
    </article>
  );
}
