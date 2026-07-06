import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs } from "@/lib/notion";
import BlogPostClient from "./blog-post-client";
import { Metadata } from "next";
import { MDXContent } from "@/components/mdx-content";
import { extractTableOfContents } from "@/lib/markdown";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  if (slugs.length === 0) {
    return [{ slug: "placeholder" }];
  }
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.meta.title} | Portfolio`,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: "article",
      publishedTime: post.meta.date,
    },
  };
}

async function BlogPostContent({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const tocItems = extractTableOfContents(post.markdown);

  return (
    <BlogPostClient post={post} tocItems={tocItems}>
      <MDXContent source={post.markdown} />
    </BlogPostClient>
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-sm text-zinc-400 dark:text-zinc-500 !max-w-xl mx-auto">
          <Spinner />
        </div>
      }
    >
      <BlogPostContent params={params} />
    </Suspense>
  );
}
