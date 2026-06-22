import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { NewsArticle } from "@/lib/content";

export function StoryCard({ article, readMore }: { article: NewsArticle; readMore: string }) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-surface-dark bg-white transition-shadow hover:shadow-lg"
    >
      {article.image && (
        <div className="relative aspect-[16/9] bg-surface-dark">
          <Image
            src={article.image}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 33vw"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        {article.publishedAt && (
          <time className="text-xs text-text-muted">{article.publishedAt}</time>
        )}
        <h3 className="mt-2 font-heading text-lg font-bold text-primary group-hover:text-primary-light line-clamp-2">
          {article.title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-text-muted line-clamp-3">{article.excerpt}</p>
        <span className="mt-4 text-sm font-semibold text-accent">{readMore} →</span>
      </div>
    </Link>
  );
}
