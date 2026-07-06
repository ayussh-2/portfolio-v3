export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

function normalizeHeadingText(text: string): string {
  return text
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function slugifyHeading(text: string): string {
  return normalizeHeadingText(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function createHeadingId(title: string, occurrence: number): string {
  const slug = slugifyHeading(title) || "section";
  return occurrence > 1 ? `${slug}-${occurrence}` : slug;
}

export function extractTableOfContents(markdown: string): TableOfContentsItem[] {
  if (!markdown) return [];

  const items: TableOfContentsItem[] = [];
  const occurrences = new Map<string, number>();
  const headingPattern = /^(#{2,4})\s+(.+)$/gm;

  for (const match of markdown.matchAll(headingPattern)) {
    const level = match[1].length;
    const title = normalizeHeadingText(match[2] ?? "");
    if (!title) continue;

    const key = title.toLowerCase();
    const nextOccurrence = (occurrences.get(key) ?? 0) + 1;
    occurrences.set(key, nextOccurrence);

    items.push({
      id: createHeadingId(title, nextOccurrence),
      title,
      level,
    });
  }

  return items;
}