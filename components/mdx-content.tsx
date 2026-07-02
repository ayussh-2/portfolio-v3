import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import Link from "next/link";
import React from "react";

const components = {
    h1: (props: any) => (
        <h1 className="text-xl sm:text-2xl font-bold mt-8 mb-4 text-zinc-900 dark:text-zinc-100 tracking-tight" {...props} />
    ),
    h2: (props: any) => (
        <h2 className="text-lg sm:text-xl font-bold mt-6 mb-3 text-zinc-900 dark:text-zinc-100 tracking-tight" {...props} />
    ),
    h3: (props: any) => (
        <h3 className="text-base sm:text-lg font-bold mt-5 mb-2 text-zinc-900 dark:text-zinc-100 tracking-tight" {...props} />
    ),
    p: (props: any) => (
        <p className="text-[14px] sm:text-[15px] text-zinc-600 dark:text-zinc-300 leading-relaxed mt-4" {...props} />
    ),
    ul: (props: any) => (
        <ul className="list-disc pl-5 mt-4 space-y-2 text-[14px] sm:text-[15px] text-zinc-600 dark:text-zinc-300" {...props} />
    ),
    ol: (props: any) => (
        <ol className="list-decimal pl-5 mt-4 space-y-2 text-[14px] sm:text-[15px] text-zinc-600 dark:text-zinc-300" {...props} />
    ),
    li: (props: any) => (
        <li className="leading-relaxed" {...props} />
    ),
    a: ({ href, children, ...props }: any) => {
        const isExternal = href?.startsWith("http");
        if (isExternal) {
            return (
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-900 dark:text-white underline underline-offset-4 hover:opacity-85 font-medium"
                    {...props}
                >
                    {children}
                </a>
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
    pre: (props: any) => (
        <pre
            className="my-6 overflow-x-auto rounded-lg border border-black/10 dark:border-white/10 p-4 text-xs sm:text-sm bg-zinc-950 text-zinc-50"
            {...props}
        />
    ),
    code: ({ className, children, ...props }: any) => {
        const isInline = !className;
        if (isInline) {
            return (
                <code
                    className="px-1.5 py-0.5 rounded text-[13px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
                    {...props}
                >
                    {children}
                </code>
            );
        }
        return (
            <code className={className} {...props}>
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
