"use client";

import type { TableOfContentsItem } from "@/lib/markdown";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

interface BlogTocPanelProps {
  items: TableOfContentsItem[];
}

export function BlogTocPanel({ items }: BlogTocPanelProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length === 0) return;

        const bestEntry = visibleEntries.sort(
          (first, second) => second.intersectionRatio - first.intersectionRatio,
        )[0];

        if (bestEntry?.target?.id) {
          setActiveId(bestEntry.target.id);
        }
      },
      {
        rootMargin: "-18% 0px -70% 0px",
        threshold: [0.1, 0.2, 0.4, 0.6, 0.8],
      },
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => {
      observer.disconnect();
    };
  }, [items]);

  const hasActive = useMemo(
    () => items.some((item) => item.id === activeId),
    [activeId, items],
  );

  if (items.length === 0) {
    return null;
  }

  const activeIndex = useMemo(
    () => items.findIndex((item) => item.id === activeId),
    [activeId, items],
  );

  return (
    <aside className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <div className="group/toc relative overflow-hidden rounded-[28px] border border-white/10 bg-zinc-950/70 text-zinc-300 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-[width,max-height,transform,box-shadow] duration-300 ease-out hover:w-[20.5rem] w-[3.75rem] max-h-28 hover:max-h-[calc(100vh-10rem)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.5)] dark:border-white/10 dark:bg-zinc-950/70">
        {/* Left indicators (visible when closed, fades out when open) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 flex w-[3.75rem] items-center justify-center border-r border-white/8 transition-opacity duration-300 group-hover/toc:opacity-0 group-hover/toc:pointer-events-none">
          <div className="flex flex-col gap-1.5">
            {items.map((item, index) => {
              const isActive = item.id === activeId;
              const isPassed = index <= activeIndex;

              const barWidth =
                item.level === 2 ? "w-6" : item.level === 3 ? "w-4" : "w-2.5";

              return (
                <span
                  key={item.id}
                  className={cn(
                    "block rounded-full transition-all duration-300",
                    barWidth,
                    isActive
                      ? "h-1 bg-white"
                      : isPassed
                        ? "h-0.5 bg-white/70"
                        : "h-0.5 bg-white/20",
                  )}
                />
              );
            })}
          </div>
        </div>

        {/* Content Wrapper (fixed width to prevent layout wrapping during width animation) */}
        <div className="toc-scrollbar flex flex-col w-[20.5rem] px-5 py-4 opacity-0 transition-opacity duration-300 ease-out group-hover/toc:opacity-100 max-h-[calc(100vh-10rem)] overflow-y-auto">
          <div className="mb-4 space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-500">
              On this page
            </p>
            {/* <p className="text-sm text-zinc-400 dark:text-zinc-400">
              Jump to a section
            </p> */}
          </div>

          <nav aria-label="Table of contents" className="space-y-1 pr-1">
            {items.map((item) => {
              const isActive = item.id === activeId;

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={cn(
                    "group block rounded-xl px-3 py-2 text-sm leading-snug transition-colors duration-200",
                    item.level >= 3 && "ml-4 text-[13px]",
                    item.level >= 4 && "ml-8 text-[12px]",
                    isActive
                      ? "bg-white/10 text-zinc-50 ring-1 ring-white/10"
                      : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100",
                  )}
                  onClick={(event) => {
                    event.preventDefault();
                    document.getElementById(item.id)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                >
                  <span
                    className={cn(
                      "block transition-transform duration-200",
                      isActive && "translate-x-0.5",
                    )}
                  >
                    {item.title}
                  </span>
                </a>
              );
            })}
          </nav>

          {!hasActive ? null : (
            <div className="mt-4 h-px bg-white/8" aria-hidden="true" />
          )}
        </div>
      </div>
    </aside>
  );
}
