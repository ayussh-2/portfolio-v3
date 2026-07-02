"use client";

import { HeaderControls } from "@/components/header-controls";
import Intersection2 from "@/components/pixel-perfect/intersection2";
import { SeperatorInline } from "@/components/ui/seperator";
import { ViewTransition } from "react";
import { Post } from "@/lib/notion";
import { BlogTag } from "@/components/blog-card";

interface BlogPostClientProps {
  post: {
    meta: Post;
    markdown: string;
  };
  children: React.ReactNode;
}

export default function BlogPostClient({
  post,
  children,
}: BlogPostClientProps) {
  return (
    <ViewTransition
      enter={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      exit={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      default="none"
    >
      <main className="w-full md:max-w-xl mx-auto min-h-screen relative flex flex-col overflow-visible">
        <Intersection2>
          <div className="relative min-h-screen w-full overflow-visible flex flex-col">
            <HeaderControls backText="Back to Blogs" />

            <SeperatorInline />

            <div className="py-4 px-3 flex flex-col">
              {post.meta.date && (
                <time className="text-xs text-zinc-400 dark:text-zinc-500 mb-2">
                  {new Date(post.meta.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              )}
              <h1 className="text-[24px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
                {post.meta.title}
              </h1>
              {post.meta.description && (
                <p className="mt-2 text-sm sm:text-sm text-zinc-500 dark:text-zinc-400 leading-[1.4]">
                  {post.meta.description}
                </p>
              )}
              {post.meta.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {post.meta.tags.map((tag) => (
                    <BlogTag tag={tag} key={tag} />
                  ))}
                </div>
              )}
            </div>

            <SeperatorInline />

            {/* Article Content */}
            <article className="pb-6 px-3 flex-1  bg-zinc-50/5 dark:bg-zinc-950/20">
              {children}
            </article>

            <SeperatorInline />

            <div className="h-12" />
          </div>
        </Intersection2>
      </main>
    </ViewTransition>
  );
}
