export type IconName = "layers" | "code" | "settings" | "wrench";
import { Code, Settings, Layers, Wrench } from 'lucide-react';

export default function SkillCard({ title, icon, items }: { title: string; icon: IconName; items: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-6">
      <div className="flex items-center gap-3">
        <IconBox name={icon} />
        <h3 className="text-lg md:text-xl font-semibold">{title}</h3>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((t) => (
          <span key={t} className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-semibold">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function IconBox({ name }: { name: IconName }) {
  const map = { layers: Layers, code: Code, settings: Settings, wrench: Wrench } as const;
  const Lucide = map[name];
  return (
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent)] text-black">
      <Lucide className="h-5 w-5" strokeWidth={2.25} />
    </span>
  );
}