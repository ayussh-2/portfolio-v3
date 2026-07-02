import { getAllPosts } from "@/lib/notion";
import BlogClient from "./blog-client";

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getAllPosts();

  return <BlogClient posts={posts} />;
}
