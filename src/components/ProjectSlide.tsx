export default function ProjectSlide({
  img,
  title,
  tags,
  link,
}: {
  img: string;
  title: string;
  tags: string[];
  link: string;
}) {
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
        <a href={link} className="mt-3 inline-flex px-3 py-1.5 text-sm font-semibold rounded-[1rem] bg-white text-black">
          GITHUB REPO
        </a>
      </div>
    </article>
  );
}
