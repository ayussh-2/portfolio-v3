import { SeperatorInline } from "../ui/seperator";
import { BlogTag } from "@/components/blog-card";
import { Post } from "@/lib/notion";
import Link from "next/link";
import { Button } from "../ui/button";
import { CircleChevronRight } from "lucide-react";

export interface HomePost extends Post {
  readingTime: number;
}

interface BlogsProps {
  posts: HomePost[];
}

export default function Blogs({ posts }: BlogsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="w-full">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-[18px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight my-2 px-3">
          Blogs
        </h1>
        <Link href="/blog" transitionTypes={["nav-forward"]}>
          <Button variant="link" className="p-2 mr-2">
            <div className="flex items-center gap-2">
              See More
              <CircleChevronRight className="size-4" />
            </div>
          </Button>
        </Link>
      </div>
      <SeperatorInline />

      <div className="flex flex-col divide-black/30 dark:divide-white/[0.15] divide-y divide-dashed ">
        {posts.map((post) => {
          const formattedDate = post.date
            ? new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : null;

          return (
            <article
              key={post.slug}
              className="group relative p-5 hover:bg-zinc-50/40 dark:hover:bg-zinc-900/20 transition-all duration-200 ease-out"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="block focus:outline-none"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-0.5">
                    <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors duration-150 leading-snug">
                      {post.title}
                    </h2>

                    <div className="flex items-center gap-1.5 text-xs font-medium tracking-wide text-zinc-400 dark:text-zinc-400/80 antialiased">
                      {formattedDate && <time>{formattedDate}</time>}
                      {formattedDate && <span>•</span>}
                      <span>{post.readingTime} min read</span>
                    </div>
                  </div>

                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {post.tags.slice(0, 3).map((tag) => (
                        <BlogTag tag={tag} key={tag} />
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </article>
          );
        })}
      </div>

      {/* <SeperatorInline />
      <div className="flex items-center justify-center py-3">
        <Link href="/blog" transitionTypes={["nav-forward"]}>
          <SoftPillButton as="div">See More</SoftPillButton>
        </Link>
      </div> */}
    </section>
  );
}
