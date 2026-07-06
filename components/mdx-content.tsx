import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import Link from "next/link";
import React from "react";
import { Copy } from "lucide-react";
import { Button } from "./ui/button";
import CodeBlock from "./mdx/code-block";
import CodeHeader from "./code-header";
import { createHeadingId } from "@/lib/markdown";

function getTextContent(children: React.ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(getTextContent).join("");
  }

  if (React.isValidElement(children)) {
    return getTextContent((children.props as any).children);
  }

  return "";
}

function createHeadingComponent(
  level: 1 | 2 | 3 | 4 | 5 | 6,
  occurrences: Map<string, number>
) {
  const HeadingTag = `h${level}` as const;

  return (props: any) => {
    const { children, className: incomingClassName, id: incomingId, ...rest } =
      props;
    const title = getTextContent(children);
    const key = title.toLowerCase();
    const nextOccurrence = (occurrences.get(key) ?? 0) + 1;
    occurrences.set(key, nextOccurrence);
    const id = incomingId ?? createHeadingId(title, nextOccurrence);

    const className =
      level === 1
        ? "text-xl sm:text-2xl font-bold mt-8 mb-4 text-zinc-900 dark:text-zinc-100 tracking-tight scroll-mt-24"
        : level === 2
          ? "text-lg sm:text-xl font-bold mt-6 mb-3 text-zinc-900 dark:text-zinc-100 tracking-tight scroll-mt-24"
          : level === 3
            ? "text-base sm:text-lg font-bold mt-5 mb-2 text-zinc-900 dark:text-zinc-100 tracking-tight scroll-mt-24"
            : "text-sm sm:text-base font-bold mt-4 mb-2 text-zinc-900 dark:text-zinc-100 tracking-tight scroll-mt-24";

    return (
      <HeadingTag {...rest} id={id} className={className}>
        {children}
      </HeadingTag>
    );
  };
}

interface MDXContentProps {
  source: string;
}

function cleanMarkdown(md: string): string {
  if (!md) return "";
  // Remove HTML comments (e.g. <!-- comments -->)
  return md.replace(/<!--[\s\S]*?-->/g, "");
}

export function MDXContent({ source }: MDXContentProps) {
  const cleanedSource = cleanMarkdown(source);
  const headingOccurrences = new Map<string, number>();
  const components = {
    h1: createHeadingComponent(1, headingOccurrences),
    h2: createHeadingComponent(2, headingOccurrences),
    h3: createHeadingComponent(3, headingOccurrences),
    h4: createHeadingComponent(4, headingOccurrences),
    p: (props: any) => (
      <p
        className="text-[14px] sm:text-[15px] text-zinc-600 dark:text-zinc-300 leading-relaxed mt-4"
        {...props}
      />
    ),
    ul: (props: any) => (
      <ul
        className="list-disc pl-5 mt-4 space-y-2 text-[14px] sm:text-[15px] text-zinc-600 dark:text-zinc-300"
        {...props}
      />
    ),
    ol: (props: any) => (
      <ol
        className="list-decimal pl-5 mt-4 space-y-2 text-[14px] sm:text-[15px] text-zinc-600 dark:text-zinc-300"
        {...props}
      />
    ),
    li: (props: any) => <li className="leading-relaxed" {...props} />,
    a: ({ href, children, ...props }: any) => {
      const isExternal = href?.startsWith("http");
      if (isExternal) {
        return (
          <Link href={href} target="_blank" rel="noopener noreferrer">
            <Button variant="link" {...props}>
              {children}
            </Button>
          </Link>
        );
      }
      return (
        <Link
          href={href}
          className="text-zinc-900 dark:text-white underline underline-offset-4 hover:opacity-85 font-medium"
          {...props}
        >
          {children}
        </Link>
      );
    },

    figure: (props: any) => {
      return (
        <figure
          className="not-prose my-5 relative group/pre"
          data-rehype-pretty-code-figure=""
          {...props}
        />
      );
    },

    pre: ({ children, ...props }: any) => (
      <CodeBlock {...props}>{children}</CodeBlock>
    ),

    code: ({ children, ...props }: any) => {
      const isBlock = "data-language" in props;
      if (isBlock) {
        return (
          <code className="p-0 rounded text-[13px] font-mono" {...props}>
            {children}
          </code>
        );
      }

      return (
        <code
          data-slot="code-block"
          className={
            "text-[13px] font-mono font-medium tracking-tight px-2 py-0.5 rounded-md bg-zinc-500/5 dark:bg-zinc-400/5 text-zinc-500 dark:text-zinc-400 border border-zinc-200/40 dark:border-zinc-800/60 select-none transition-colors"
          }
          {...props}
        >
          {children}
        </code>
      );
    },

    blockquote: (props: any) => (
      <blockquote
        className="pl-4 border-l-2 border-zinc-400 dark:border-zinc-600 italic text-zinc-500 dark:text-zinc-400 my-4"
        {...props}
      />
    ),
  };

  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none">
      <MDXRemote
        source={cleanedSource}
        options={{
          mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [
              [
                rehypePrettyCode as any,
                {
                  theme: "github-dark",
                  keepBackground: false,
                  filterMetaString: (string: string) =>
                    string.replace(/filename="[^"]*"/, ""),
                },
              ],
            ],
          },
        }}
        components={components}
      />
    </div>
  );
}
