import { getAllPosts, getPostBySlug } from "@/lib/notion";
import HomeClient from "./home-client";

export const revalidate = 3600;

export default async function Home() {
  const allPosts = await getAllPosts();

  const posts = await Promise.all(
    allPosts.slice(0, 3).map(async (post) => {
      const fullPost = await getPostBySlug(post.slug);
      const wordCount = fullPost?.markdown
        ? fullPost.markdown.trim().split(/\s+/).filter(Boolean).length
        : 0;
      const readingTime = Math.max(1, Math.ceil(wordCount / 200));
      return {
        ...post,
        readingTime,
      };
    }),
  );

  return <HomeClient posts={posts} />;
}
