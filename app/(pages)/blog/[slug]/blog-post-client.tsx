"use client";

import { HeaderControls } from "@/components/header-controls";
import Intersection2 from "@/components/pixel-perfect/intersection2";
import { SeperatorInline } from "@/components/ui/seperator";
import { ViewTransition } from "react";
import { Post } from "@/lib/notion";
import { BlogTag } from "@/components/blog-card";
import { BlurFade } from "@/components/ui/blur-fade";

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
  const BLUR_FADE_STEP = 0.12;
  const wordCount = post.markdown
    ? post.markdown.trim().split(/\s+/).filter(Boolean).length
    : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

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
            <BlurFade delay={BLUR_FADE_STEP * 0}>
              <HeaderControls backText="Back to Blogs" />
            </BlurFade>

            <SeperatorInline />

            <BlurFade delay={BLUR_FADE_STEP * 1}>
              <div className="py-4 px-3 flex flex-col">
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500 mb-2 font-medium">
                  {post.meta.date && (
                    <>
                      <time>
                        {new Date(post.meta.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                      <span>•</span>
                    </>
                  )}
                  <span>{readingTime} min read</span>
                </div>
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
            </BlurFade>

            <SeperatorInline />

            <BlurFade delay={BLUR_FADE_STEP * 2}>
              <article className="pb-6 px-3 flex-1 bg-zinc-50/5 dark:bg-zinc-950/20">
                {children}
              </article>
            </BlurFade>

            <SeperatorInline />

            <div className="h-12" />
          </div>
        </Intersection2>
      </main>
    </ViewTransition>
  );
}
