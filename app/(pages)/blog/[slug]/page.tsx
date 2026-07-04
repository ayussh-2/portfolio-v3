import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs } from "@/lib/notion";
import BlogPostClient from "./blog-post-client";
import { Metadata } from "next";
import { MDXContent } from "@/components/mdx-content";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <BlogPostClient post={post}>
      <MDXContent source={post.markdown} />
    </BlogPostClient>
  );
}
