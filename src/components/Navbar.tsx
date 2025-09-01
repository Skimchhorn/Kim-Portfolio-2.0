export default function Navbar() {
  return (
        <header className="sticky top-0 z-50 bg-black/80 backdrop-blur">
    <div className="mx-auto max-w-6xl px-4">
        {/* Tablet/Mobile: collapsed */}
        <details className="group lg:hidden">
        <summary
            className="flex items-center justify-between py-4 cursor-pointer select-none
                    [&::-webkit-details-marker]:hidden list-none"
        >
            {/* Brand */}
          <a href="#home" className="inline-flex items-center gap-2 font-black tracking-wide text-sm rounded-[1rem] px-3 py-1 border border-white/20">
            <span className="bg-[var(--accent)] text-black px-2 py-0.5 rounded">KIM'S</span>
            <span>PORTFOLIO</span>
          </a>

        <span className="relative h-[14px] w-5">
        <span className="absolute inset-x-0 top-0 h-px bg-white
                        transition-transform duration-300 origin-left
                        group-open:rotate-45 group-open:translate-y-[5px]" />
        <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-white
                        transition-opacity duration-300 group-open:opacity-0" />
        <span className="absolute inset-x-0 bottom-0 h-px bg-white
                        transition-transform duration-300 origin-left
                        group-open:-rotate-45 group-open:-translate-y-[5px]" />
        </span>


        </summary>

        {/* Slide-down panel */}
        <div className="overflow-hidden transition-[max-height] duration-300 max-h-0 group-open:max-h-[80vh]">
            <nav className="border-t border-white/10 py-8">
            <ul className="flex flex-col items-center gap-8 text-xl font-extrabold tracking-wider">
                <li><a href="#home" className="hover:text-[var(--accent)]">HOME</a></li>
                <li><a href="#skills" className="hover:text-[var(--accent)]">SKILLS</a></li>
                <li><a href="#projects" className="hover:text-[var(--accent)]">PROJECTS</a></li>
                <li><a href="#contact" className="hover:text-[var(--accent)]">CONTACT ME</a></li>
            </ul>
            </nav>
        </div>
        </details>

        {/* Desktop: horizontal */}
        <div className="hidden lg:flex items-center justify-between py-4">
        <a href="#top"
            className="px-4 py-1 rounded-2xl border border-white/30 text-lg font-extrabold tracking-wider">
            KIM'S PORTFOLIO
        </a>
        <nav>
            <ul className="flex items-center gap-8 text-sm font-bold tracking-wide">
            <li><a href="#home" className="hover:text-[var(--accent)]">HOME</a></li>
            <li><a href="#skills" className="hover:text-[var(--accent)]">SKILLS</a></li>
            <li><a href="#projects" className="hover:text-[var(--accent)]">PROJECTS</a></li>
            <li><a href="#contact" className="hover:text-[var(--accent)]">CONTACT ME</a></li>
            </ul>
        </nav>
        </div>
    </div>
    </header>

  );
}
