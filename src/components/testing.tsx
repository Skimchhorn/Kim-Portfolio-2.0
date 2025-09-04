type MaybeUrl = string | undefined | null;

export default function ProjectSlide({
    img,
    title,
    tags,
    repoUrl,
    demoUrl,
}: {img : string;
    title : string;
    tags: string[];
    repoUrl?: MaybeUrl;
    demoUrl?: MaybeUrl;
}){
    const hasRepo = !!repoUrl && repoUrl.trim().length > 0;
    const hasDemo = !!repoUrl && repoUrl.trim().length > 0;

    return (
        <article className = "relative">
            <img src={img} alt= {title} className = "wfu"/>
            <div className = "absolute inset-0 bg-gradient-tot from-black/80 to-transparent"/>
        </article>
    )
}