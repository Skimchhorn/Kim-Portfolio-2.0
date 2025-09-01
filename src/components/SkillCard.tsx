export default function SkillCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="outline-box p-6">
      <h3 className="font-extrabold text-lg">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((it) => (
          <li
            key={it}
            className="pl-3 relative before:content-['-'] before:absolute before:left-0 before:text-[var(--accent)]"
          >
            {it}
          </li>
        ))}
      </ul>
      <a href="#" className="inline-flex mt-4 px-3 py-1.5 text-sm font-semibold rounded-[1rem] bg-[#1a1b22] border border-white/10 hover:border-white/20">
        GITHUB REPO
      </a>
    </div>
  );
}
