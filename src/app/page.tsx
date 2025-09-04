import Navbar from "@/components/Navbar";
import SkillCard from "@/components/SkillCard";
import SimpleCarousel from "@/components/SimpleCarousel";
import ProjectSlide from "@/components/ProjectSlide";
import TimelineItem from "@/components/TimelineCard";
import ExtraCard from "@/components/ExtraCard";
import Image from "next/image";
import TimelineCard from "@/components/TimelineCard";
import { IconName } from "@/components/SkillCard";
import ClientChat from "@/components/ClientChat";

export default function PortfolioPage() {
    const items = [
    {
      date: "MAY 2025 – PRESENT",
      title: "Undergrad Research Assistant",
      org: "Simon Fraser University (SFU)",
      imgSrc: "/image/researchLogo.png",
      bullets: [
        "Building TypeScript static-analysis tools (ts-morph) to detect async anti-patterns (e.g., unhandledPromise, asyncInsideLoop, callbackHell) and testing with Jest to verify the robustness and accuracy of program.",
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

    const data: Array<{ title: string; icon: IconName; items: string[] }> = [
    {
      title: "Technologies",
      icon: "layers", // <Layers />
      items: ["Node.js", "Next.js", "React.js", "Tailwind CSS", "Angular", "Bootstrap", "ShadCN", "Azure", "JavaFX", "Vercel", "AWS", "Jest", "Playwright"],
    },
    {
      title: "Languages",
      icon: "code", // <Code />
      items: ["C++", "Java", "JavaScript", "TypeScript", "HTML", "CSS", "React", "Python"],
    },
    {
      title: "Methodologies & Practices",
      icon: "settings", // <Settings />
      items: ["Prompt Engineering","CI/CD pipeline","Project Management","Agile Methodology","SDLC","Test-Driven Development","API integration"],
    },
    {
      title: "Developer Tools",
      icon: "wrench", // <Wrench />
      items: ["Git","PostgreSQL","GitHub","GitLab","Docker","Eclipse","VS Code","Postman","Figma","Linux","SQL"],
    },
  ];

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
                <a target = "_blank" href="/fallcoop2025-resume-health.pdf" className="bg-[var(--accent)] text-black font-semibold px-4 py-2 pill">
                  VIEW RESUME
                </a>
                <a target = "_blank" href="mailto:kcs11@sfu.ca" className="bg-[var(--accent)]/90 hover:bg-[var(--accent)] text-black font-semibold px-4 py-2 pill">
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
              "/image/vscode.png",
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
          <div className="mt-8 grid gap-5 md:gap-6 lg:gap-8 lg:grid-cols-2">
            {data.map((b) => (
              <SkillCard key={b.title} title={b.title} icon={b.icon} items={b.items} />
            ))}
          </div>
        </section>
         {/* Work Experience */}
        <section id="experience" className="section">
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
           <ProjectSlide
            img="/image/deepPhishing.png"
            title="Deep Phishing"
            tags={["Next.js", "OpenAI", "Tailwind", "Playwright"]}
            repoUrl="https://github.com/CMPT-276-SPRING-2025/final-project-06-valleys"
            demoUrl="https://deep-phishing.vercel.app"
          />

          <ProjectSlide
            img="/image/RLproject.png"
            title="Reinforcement Learning in the context of First Person Shooter"
            tags={["Reinforcement Learning", "Python", "Unity", "ML Agent", "C#"]}
            repoUrl="https://github.com/ribsyo/BadVal"   // only repo button shows
          />
          </SimpleCarousel>
        </section>
        

        {/* Timeline */}


        {/* Extracurricular */}
        <section id="extracurricular" className="section">
          <h2 className="text-2xl font-extrabold tracking-wide border-l-4 border-[var(--accent)] pl-3 mb-6">
            EXTRACURRICULAR
          </h2>

          <div className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-8">
            <ExtraCard
              title="Langara Chess Club"
              subtitle="Former Vice President"
              img="/image/LCC.png"
              certificate={false}                           // <-- boolean (no quotes)
              link="https://www.instagram.com/langarachessclub/"
            />

            <ExtraCard
              title="Langara Global Volunteer"
              subtitle="Team Member and Social Ambassador"
              img="/image/LangaraGlobal.png"
              certificate="/image/statement-of-achievement.pdf"  // file in /public (avoid spaces)
              link="https://www.instagram.com/lg_volunteer/"
            />

            <ExtraCard
              title="Langara Volt"
              subtitle="Mentor and Volunteer"
              img="/image/langara-Volt.png"
              certificate="/image/volt-certificate.pdf"          // rename file to remove spaces
              link= "https://www.instagram.com/lg_volunteer/"                                        // show button with '#'
            />
          </div>
        </section>
                {/* optional quick prompts */}
                {/* <div className="mt-4 flex flex-wrap gap-2">
                  <ClientChat.QuickPrompt>What are Kim’s core skills?</ClientChat.QuickPrompt>
                  <ClientChat.QuickPrompt>Show recent projects.</ClientChat.QuickPrompt>
                  <ClientChat.QuickPrompt>Is Kim available for Spring 2025 co-op?</ClientChat.QuickPrompt>
                  <ClientChat.QuickPrompt>Summarize education & research work.</ClientChat.QuickPrompt>
                </div> */}

        {/* Contact */}
            <section id="contact" className="section overflow-x-hidden">
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <h2 className="text-2xl font-extrabold tracking-wide border-l-4 border-[var(--accent)] pl-3 mb-4">
                    AI ZONE 🤖
                  </h2>
                  <p className="text-[var(--muted)] max-w-prose">
                    Chat with my AI assistant that knows my background, skills, projects, and experience in depth.
                  </p>
                </div>

                <ClientChat
                  endpoint="/api/kim-chat"
                  starter="Hi! I’m Kim’s AI assistant—ask me anything about Kim."
                  className="outline-box rounded-2xl p-4 md:p-5"
                />
              </div>
            </section>


        <footer className="py-8 border-t border-white/5 text-xs text-center text-[var(--muted)]">
          © {new Date().getFullYear()} KIM'S PORTFOLIO
        </footer>
      </main>
    </div>
  );
}
