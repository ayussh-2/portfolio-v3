"use client";

import { HeaderControls } from "@/components/header-controls";
import Intersection2 from "@/components/pixel-perfect/intersection2";
import { SeperatorInline } from "@/components/ui/seperator";
import { ViewTransition } from "react";
import { Post } from "@/lib/notion";

import { BlogCard } from "@/components/blog-card";
import PageTitle from "@/components/page-title";

interface BlogClientProps {
  posts: Post[];
}

const transitionConfig = {
  enter: {
    "nav-forward": "nav-forward",
    "nav-back": "nav-back",
    default: "none",
  },
  exit: {
    "nav-forward": "nav-forward",
    "nav-back": "nav-back",
    default: "none",
  },
};

export default function BlogClient({ posts }: BlogClientProps) {
  return (
    <ViewTransition {...transitionConfig} default="none">
      <main className="w-full md:max-w-xl! mx-auto min-h-screen relative flex flex-col overflow-visible px-4 md:px-0">
        <Intersection2>
          <div className="relative min-h-screen w-full overflow-visible flex flex-col">
            <HeaderControls backText="Home" />
            <PageTitle title="Blogs" desc="Thoughts on building software" />

            {posts.length === 0 ? (
              <div className="py-16 text-center px-4 border-l border-r border-black/10 dark:border-white/10 border-dashed flex-1 flex flex-col justify-center items-center">
                <p className="text-sm text-zinc-400 dark:text-zinc-500 font-medium">
                  No published posts found. Check back later!
                </p>
              </div>
            ) : (
              <div className="flex flex-col  divide-black/30 dark:divide-white/[0.15]  divide-y divide-dashed flex-1">
                {posts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            )}

            {/* <SeperatorInline /> */}
          </div>
        </Intersection2>
      </main>
    </ViewTransition>
  );
}
