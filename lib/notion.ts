import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { cacheLife } from "next/cache";

const token = process.env.NOTION_TOKEN;
const databaseId = process.env.NOTION_DATABASE_ID;

if (!token || !databaseId) {
    if (!token) {
        throw new Error("NOTION_TOKEN is missing");
    }
    if (!databaseId) {
        throw new Error("NOTION_DATABASE_ID is missing");
    }
}

export const notionClient = new Client({ auth: token });
export const n2m = new NotionToMarkdown({ notionClient });

export interface Post {
    id: string;
    slug: string;
    title: string;
    description: string;
    date: string;
    tags: string[];
}

function parseNotionPage(page:any): Post | null {
    const properties = page.properties;

    const titleProperty = properties.Title || Object.values(properties).find((p: any) => p.type === 'title');
    const title = titleProperty?.title?.[0]?.plain_text || "";

    const slug = properties.Slug?.rich_text?.[0]?.plain_text || "";

    const description = properties.Description?.rich_text?.[0]?.plain_text || "";

    const dateValue = properties.Date?.date?.start || "";

    const tags = properties.Tags?.multi_select?.map((t: any) => t.name) || [];

    const published = properties.Published?.checkbox || false;

    if (!published || !slug) {
        return null;
    }

    return {
        id: page.id,
        slug,
        title,
        description,
        date: dateValue,
        tags,
    };
}

export async function getAllPosts(): Promise<Post[]> {
    "use cache";
    cacheLife("hours");
    const response = await notionClient.dataSources.query({
        data_source_id: databaseId!,
        filter: {
            and: [
                {
                    property: "Published",
                    checkbox: {
                        equals: true,
                    },
                },
                {
                    property: "Slug",
                    rich_text: {
                        is_not_empty: true,
                    },
                },
            ],
        },
        sorts: [
            {
                property: "Date",
                direction: "descending",
            },
        ],
    });

    const posts: Post[] = [];
    for (const page of response.results) {
        const post = parseNotionPage(page);
        if (post) {
            posts.push(post);
        }
    }
    return posts;
}

export async function getPostBySlug(slug: string): Promise<{ meta: Post; markdown: string } | null> {
    "use cache";
    cacheLife("hours");
    const response = await notionClient.dataSources.query({
        data_source_id: databaseId!,
        filter: {
            and: [
                {
                    property: "Published",
                    checkbox: {
                        equals: true,
                    },
                },
                {
                    property: "Slug",
                    rich_text: {
                        equals: slug,
                    },
                },
            ],
        },
        page_size: 1,
    });

    if (response.results.length === 0) {
        return null;
    }

    const page = response.results[0];
    const meta = parseNotionPage(page);
    if (!meta) {
        return null;
    }

    const mdblocks = await n2m.pageToMarkdown(page.id);
    const mdString = n2m.toMarkdownString(mdblocks);

    return {
        meta,
        markdown: mdString.parent || "",
    };
}

export async function getAllSlugs(): Promise<string[]> {
    "use cache";
    cacheLife("hours");
    const response = await notionClient.dataSources.query({
        data_source_id: databaseId!,
        filter: {
            and: [
                {
                    property: "Published",
                    checkbox: {
                        equals: true,
                    },
                },
                {
                    property: "Slug",
                    rich_text: {
                        is_not_empty: true,
                    },
                },
            ],
        },
    });

    const slugs: string[] = [];
    for (const page of response.results) {
        const slugText = (page as any).properties.Slug?.rich_text?.[0]?.plain_text;
        if (slugText) {
            slugs.push(slugText);
        }
    }
    return slugs;
}
