import Link from "next/link";
import { Post } from "@/lib/notion";

interface BlogCardProps {
  post: Post;
}

export function BlogTag({ tag }: { tag: string }) {
  return (
    <span
      key={tag}
      className="text-[10px] font-medium tracking-tight px-2 py-0.5 rounded-md bg-zinc-500/5 dark:bg-zinc-400/5 text-zinc-500 dark:text-zinc-400 border border-zinc-200/40 dark:border-zinc-800/60 select-none transition-colors"
    >
      {tag}
    </span>
  );
}

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <article className="group relative p-5 hover:bg-zinc-50/40 dark:hover:bg-zinc-900/20 transition-all duration-200 ease-out">
      <Link href={`/blog/${post.slug}`} className="block focus:outline-none">
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors duration-150 leading-snug">
              {post.title}
            </h2>

            {formattedDate && (
              <time className="text-xs font-medium tracking-wide text-zinc-400 dark:text-zinc-400/80 antialiased">
                {formattedDate}
              </time>
            )}
          </div>

          <p className="text-sm text-zinc-500 dark:text-zinc-400/90 line-clamp-2 leading-relaxed font-normal">
            {post.description}
          </p>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1.5">
              {post.tags.map((tag) => (
                <BlogTag tag={tag} key={tag} />
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
