import Navbar from "@/components/Navbar";
import SkillCard from "@/components/SkillCard";
import SimpleCarousel from "@/components/SimpleCarousel";
import ProjectSlide from "@/components/ProjectSlide";
import TimelineItem from "@/components/TimelineCard";
import ExtraCard from "@/components/ExtraCard";
import Image from "next/image";
import TimelineCard from "@/components/TimelineCard";


export default function PortfolioPage() {
    const items = [
    {
      date: "MAY 2025 – PRESENT",
      title: "Undergrad Research Assistant",
      org: "Simon Fraser University (SFU)",
      imgSrc: "/image/researchLogo.png",
      bullets: [
        "Building TypeScript static-analysis tools (ts-morph) to detect async anti-patterns (e.g., unhandledPromise, asyncInsideLoop, callbackHell).",
        "Designing testability metrics (Controllability, Observability, Encapsulation Level) and evaluating on open-source Node.js projects.",
        "Implementing LLM-assisted code transformations for automatic repair; documenting results for academic dissemination and tool adoption.",
      ],
    },
    // {
    //   date: "2024 – 2025",
    //   title: "Your Other Role",
    //   org: "Company / Lab",
    //   imgSrc: "/image/researchLogo.png",
    //   bullets: [
    //     "One-liner about what you built/owned.",
    //     "Impact/result with metrics if possible.",
    //   ],
    // },
  ];

  const n = items.length;
  return (
    <div className="min-h-dvh bg-[#0a0a0c] text-white">
      <Navbar />
      <main id="home" className="mx-auto max-w-6xl px-4">
        {/* Hero */}
        <section className="pt-6 pb-16">
          <div className="grid sm:grid-cols-[7fr_4fr] gap-6 items-stretch">
            {/* Intro text card */}
            <div className="outline-box p-6 md:p-8 flex flex-col justify-center">
              <p className="text-sm tracking-widest text-[var(--muted)]">HELLO, I'M</p>
              <h1 className="mt-2 text-4xl md:text-5xl font-black tracking-tight">
                KIM CHHORN SAMBATH
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] max-w-prose">
                I am a dedicated computer science student with a passion for technology and problem-solving. 
                I’m particularly interested in AI, blockchain, web development, and game development where I can 
                apply my skills to create innovative solutions.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a href="/resume.pdf" className="bg-[var(--accent)] text-black font-semibold px-4 py-2 pill">
                  VIEW RESUME
                </a>
                <a href="#contact" className="bg-[var(--accent)]/90 hover:bg-[var(--accent)] text-black font-semibold px-4 py-2 pill">
                  CONTACT ME
                </a>
              </div>
            </div>
        
            {/* Portrait card */}
            <div className="outline-box p-2 flex items-center justify-center">
              <img
                src="/image/kimchhorn-Photo-removebg.png"
                alt="Portrait"
                className="rounded-[1.4rem] object-cover w-full h-full max-w-sm"
              />
            </div>
          </div>
        </section>

        {/* Tech strip */}
        <section className="section">
          <div className="flex flex-wrap items-center gap-8 justify-center opacity-90">
            {[
              "/image/python.png",
              "/image/react.png",
              "/image/javascript.png",
              "/image/html.png",
              "/image/css.png",
              "/image/git.png",
              "/image/java.png",
              "/image/cpp.png",
              "/image/nextjs.png",
              // "/image/.png",
              // "/image/cpp.png",
            ].map((src, i) => (
              <img key={i} src={src} alt="tech" className="h-12 md:h-14 opacity-90" />
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="section">
          <h2 className="text-2xl font-extrabold tracking-wide border-l-4 border-[var(--accent)] pl-3 mb-6">
            TECHINCAL SKILLS
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <SkillCard title="JAVA/JAVAFX" items={["Calculator Application", "Checker Game", "Tic-Tac-Toe Application"]} />
            <SkillCard
              title="FULL-STACK WEB DEVELOPMENT"
              items={["Traveled Countries Website", "Portfolio Website", "AI-Powered Phishing Simulation & Detection"]}
            />
            <SkillCard title="C++" items={["Inflation Rate Calculator"]} />
          </div>
          </section>
<section className="section">
  <h2 className="text-2xl font-extrabold tracking-wide border-l-4 border-[var(--accent)] pl-3 mb-6">
    TECHNICAL WORK EXPERIENCE
  </h2>

  {/* Vertical rail (left) with downward arrow; no left padding here */}
  <div
    className="
      relative pb-16
      [--rail-x:48px]   /* horizontal position of the rail from the section's left */
      [--dot-r:4px]     /* dot radius (h-2/w-2 => 8px, so r=4px) */
      [--conn:22px]     /* connector length from rail → card */
    "
  >
    {/* rail */}
    <div className="absolute left-[var(--rail-x)] top-0 bottom-0 w-px bg-white/15" />

    {/* arrow head (down) + optional tip dot */}
    <span
      aria-hidden
      className="absolute left-[var(--rail-x)] bottom-[-8px] -translate-x-1/2
                 border-x-[8px] border-x-transparent border-t-[16px]
                 border-t-[var(--accent,#ff2222)]"
    />


    {/* items */}
    <div className="space-y-10">
      {items.map((it, i) => (
        <div key={i} className="/* no relative left padding here */">
          {/* DOT — centered on the rail */}
          <span
            aria-hidden
            className="absolute left-[var(--rail-x)] top-8
                       -translate-x-1/2 -translate-y-1/2
                       h-2 w-2 rounded-full bg-white z-10
                       shadow-[0_0_0_4px_rgba(255,255,255,0.08)]"
          />
          {/* CONNECTOR — starts just to the right edge of the dot */}
          <span
            aria-hidden
            className="absolute top-8
                       border-t border-dashed border-white/40
                       w-[var(--conn)]"
            style={{ left: 'calc(var(--rail-x) + var(--dot-r))' }}
          />

          {/* CARD — positioned from the rail + connector only */}
          <div className = "ml-20">
            <TimelineCard
              date={it.date}
              title={it.title}
              org={it.org}
              imgSrc={it.imgSrc}
              bullets={it.bullets}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


        {/* Projects */}
        <section id="projects" className="section">
          <h2 className="text-2xl font-extrabold tracking-wide border-l-4 border-[var(--accent)] pl-3 mb-6">
            TECHINCAL PROJECTS
          </h2>
          <SimpleCarousel>
            <ProjectSlide img="/image/blockchain.png" title="Deep Phishing" tags={["Next.js", "OpenAI", "Tailwindss"]} link="#" />
            <ProjectSlide img="/image/blockchain.png" title="Countries Explorer" tags={["Express", "MongoDB"]} link="#" />
            <ProjectSlide img="/image/blockchain.png" title="Inflation Calculator" tags={["C++"]} link="#" />
            <ProjectSlide img="/image/blockchain.png" title="Inflation Calculator" tags={["C++"]} link="#" />
            <ProjectSlide img="/image/blockchain.png" title="Inflation Calculator" tags={["C++"]} link="#" />
            <ProjectSlide img="/image/blockchain.png" title="Inflation Calculator" tags={["C++"]} link="#" />
            <ProjectSlide img="/image/blockchain.png" title="Inflation Calculator" tags={["C++"]} link="#" />
            <ProjectSlide img="/image/blockchain.png" title="Inflation Calculator" tags={["C++"]} link="#" />
            <ProjectSlide img="/image/blockchain.png" title="Inflation Calculator" tags={["C++"]} link="#" />
            <ProjectSlide img="/image/blockchain.png" title="Inflation Calculator" tags={["C++"]} link="#" />
          </SimpleCarousel>
        </section>
        

        {/* Timeline */}


        {/* Extracurricular */}
        <section id="extracurricular" className="section">
          <h2 className="text-2xl font-extrabold tracking-wide border-l-4 border-[var(--accent)] pl-3 mb-6">
            EXTRACURRICULAR
          </h2>

          <div className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-8">
            <ExtraCard title="Langara Chess Club" subtitle="Former Vice President" img="/image/LCC.png" />
            <ExtraCard title="Langara Global Volunteer" subtitle="Team Member and Social Ambassador" img="/image/LangaraGlobal.png" />
            <ExtraCard title="Langara Volt" subtitle="Mentor and Volunteer" img="/image/langara-Volt.png" />
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="section">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl font-extrabold tracking-wide border-l-4 border-[var(--accent)] pl-3 mb-4">CONTACT</h2>
              <p className="text-[var(--muted)] max-w-prose">Want to collaborate or just say hi? Drop a message and I’ll get back to you.</p>
            </div>
            <form action="/api/contact" method="post" className="grid gap-3">
              <input name="email" type="email" placeholder="Your email" required className="bg-[#0f1016] border border-white/10 rounded-xl px-3 py-2" />
              <textarea name="message" rows={5} placeholder="Message" required className="bg-[#0f1016] border border-white/10 rounded-xl px-3 py-2" />
              <button className="bg-[var(--accent)] text-black font-semibold px-4 py-2 rounded-[1rem] w-max">Send</button>
            </form>
          </div>
        </section>

        <footer className="py-8 border-t border-white/5 text-xs text-center text-[var(--muted)]">
          © {new Date().getFullYear()} KIM'S PORTFOLIO
        </footer>
      </main>
    </div>
  );
}
