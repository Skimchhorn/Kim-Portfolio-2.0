type MaybeUrl = string | undefined | null;

export default function ProjectSlide({
  img,
  title,
  tags,
  repoUrl,   // optional GitHub URL
  demoUrl,   // optional live link
}: {
  img: string;
  title: string;
  tags: string[];
  repoUrl?: MaybeUrl;
  demoUrl?: MaybeUrl;
}) {
  const hasRepo = !!repoUrl && repoUrl.trim().length > 0;
  const hasDemo = !!demoUrl && demoUrl.trim().length > 0;

  return (
    <article className="relative">
      <img src={img} alt={title} className="w-full h-[420px] object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {hasRepo && (
            <a
              href={repoUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-3 py-1.5 text-sm font-semibold rounded-[1rem] bg-white text-black"
              aria-label={`${title} GitHub repository`}
            >
              GITHUB REPO
            </a>
          )}
          {hasDemo && (
            <a
              href={demoUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-3 py-1.5 text-sm font-semibold rounded-[1rem] bg-white/90 text-black hover:bg-white"
              aria-label={`${title} live link`}
            >
              LINK
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
