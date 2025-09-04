export default function Navbar() {
  return (
    <header
      className="
        sticky top-0 z-50
        border-b border-white/5
        bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/40
        lg:bg-transparent lg:backdrop-blur-0 lg:supports-[backdrop-filter]:bg-transparent
      "
    >
      <div className="mx-auto max-w-6xl px-4">
        {/* Tablet/Mobile: collapsed */}
        <details className="group lg:hidden">
          <summary className="flex items-center justify-between h-14 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden">
            <a
              href="#home"
              className="inline-flex items-center gap-2 font-black tracking-wide text-sm rounded-[1rem] px-3 py-1 border border-white/20"
            >
              <span className="bg-[var(--accent)] text-black px-2 py-0.5 rounded">KIM'S</span>
              <span>PORTFOLIO</span>
            </a>

            {/* small hamburger */}
            <span className="relative h-[14px] w-5">
              <span className="absolute inset-x-0 top-0 h-px bg-white transition-transform duration-300 origin-left group-open:rotate-45 group-open:translate-y-[5px]" />
              <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-white transition-opacity duration-300 group-open:opacity-0" />
              <span className="absolute inset-x-0 bottom-0 h-px bg-white transition-transform duration-300 origin-left group-open:-rotate-45 group-open:-translate-y-[5px]" />
            </span>
          </summary>

          <div className="overflow-hidden transition-[max-height] duration-300 max-h-0 group-open:max-h-[80vh]">
            <nav className="border-t border-white/10 py-8">
              <ul className="flex flex-col items-center gap-8 text-xl font-extrabold tracking-wider">
                <li><a href="#home" className="hover:text-[var(--accent)]">HOME</a></li>
                <li><a href="#skills" className="hover:text-[var(--accent)]">SKILLS</a></li>
                {/* <li><a href="#experience" className="hover:text-[var(--accent)]">EXPERIENCE</a></li> */}
                <li><a href="#projects" className="hover:text-[var(--accent)]">PROJECTS</a></li>
                <li><a href="#contact" className="hover:text-[var(--accent)]">AI ZONE 🤖</a></li>
              </ul>
            </nav>
          </div>
        </details>

        {/* Desktop: horizontal */}
        <nav className="hidden lg:flex items-center justify-between h-14">
            <a
              href="#home"
              className="inline-flex items-center gap-2 font-black tracking-wide text-sm rounded-[1rem] px-3 py-1 border border-white/20"
            >
              <span className="bg-[var(--accent)] text-black px-2 py-0.5 rounded">KIM'S</span>
              <span>PORTFOLIO</span>
            </a>
          <ul className="flex items-center gap-8 text-sm font-bold tracking-wide">
            <li><a href="#home" className="hover:text-[var(--accent)]">HOME</a></li>
            <li><a href="#skills" className="hover:text-[var(--accent)]">SKILLS</a></li>
            {/* <li><a href="#experience" className="hover:text-[var(--accent)]">EXPERIENCE</a></li> */}
            <li><a href="#projects" className="hover:text-[var(--accent)]">PROJECTS</a></li>
            <li><a href="#contact" className="hover:text-[var(--accent)]">AI ZONE 🤖</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
