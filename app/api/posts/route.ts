import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/notion";

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    const posts = await getAllPosts();
    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
