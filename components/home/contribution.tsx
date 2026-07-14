"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ArrowUpRight } from "lucide-react";
import { CUSTOM_PRS } from "@/config";

type PullRequestState = "Merged" | "Open" | "Closed";

interface Language {
  name: string;
  color: string;
}

export interface PullRequest {
  id?: string;
  title: string;
  description: string;
  url: string;
  repoOwner: string;
  repoName: string;
  state: PullRequestState;
  createdAt: string;
  mergedAt: string | null;
  language?: Language | null;
}

export function ContributionList() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Group and limit to 3 of each state: Merged, Open, Closed
  const sortedPRs = [...CUSTOM_PRS].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const mergedLimit = sortedPRs.filter((p) => p.state === "Merged").slice(0, 3);
  const openLimit = sortedPRs.filter((p) => p.state === "Open").slice(0, 3);
  const closedLimit = sortedPRs.filter((p) => p.state === "Closed").slice(0, 3);

  const limitedPRs = [...mergedLimit, ...openLimit, ...closedLimit].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (limitedPRs.length === 0) {
    return (
      <div className="w-full text-center py-10 text-[13px] text-zinc-500 dark:text-zinc-400">
        No contributions found.
      </div>
    );
  }

  const handleToggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col divide-black/30 dark:divide-white/[0.15] divide-y divide-dashed">
        {limitedPRs.map((prItem, idx) => {
          const itemId = prItem.id || prItem.url || `pr-${idx}`;
          return (
            <ContributionItem
              key={itemId}
              pr={prItem}
              isExpanded={expandedId === itemId}
              onToggleExpand={() => handleToggleExpand(itemId)}
            />
          );
        })}
      </div>
    </div>
  );
}

// Item Component
function ContributionItem({
  pr,
  isExpanded,
  onToggleExpand,
}: {
  pr: PullRequest;
  isExpanded: boolean;
  onToggleExpand: () => void;
}) {
  const formattedDate = pr.mergedAt
    ? format(new Date(pr.mergedAt), "MMM d, yyyy")
    : format(new Date(pr.createdAt), "MMM d, yyyy");

  // State configurations
  const stateConfig = {
    Merged: {
      textClass: "text-purple-600 dark:text-purple-400",
    },
    Open: {
      textClass: "text-green-600 dark:text-green-400",
    },
    Closed: {
      textClass: "text-zinc-500 dark:text-zinc-400",
    },
  };

  const config = stateConfig[pr.state] || stateConfig.Open;

  return (
    <article
      onClick={onToggleExpand}
      className="group/item relative p-5 hover:bg-zinc-50/40 dark:hover:bg-zinc-900/20 transition-all duration-200 ease-out cursor-pointer"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between w-full gap-4">
          <div className="flex flex-col gap-0.5 min-w-0">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 group-hover/item:text-zinc-650 dark:group-hover/item:text-zinc-300 transition-colors duration-150 leading-snug">
              {pr.title}
            </h2>
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium tracking-wide text-zinc-400 dark:text-zinc-400/80 antialiased mt-1">
              <span className="font-semibold text-zinc-500 dark:text-zinc-300">
                {pr.repoOwner}/{pr.repoName}
              </span>
              <span>•</span>
              <span className={cn("font-medium", config.textClass)}>
                {pr.state}
              </span>
              <span>•</span>
              <span>{formattedDate}</span>
              {pr.language && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-1 shrink-0">
                    <span
                      className="size-1.5 rounded-full"
                      style={{ backgroundColor: pr.language.color }}
                    />
                    <span className="text-[11px] font-medium">
                      {pr.language.name}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          <a
            href={pr.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-0.5 text-[12px] font-medium text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 shrink-0 self-start mt-0.5 transition-colors duration-150"
          >
            View PR
            <ArrowUpRight
              size={13}
              className="group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-transform duration-150"
            />
          </a>
        </div>

        {/* Description (displays only if expanded and description exists) */}
        {isExpanded && pr.description && pr.description.trim() !== "" && (
          <div className="mt-2 pr-4 text-[12px] text-zinc-600 dark:text-zinc-400/90 leading-relaxed py-0.5 animate-in fade-in slide-in-from-top-1 duration-200">
            <p className="whitespace-pre-line">{pr.description}</p>
          </div>
        )}
      </div>
    </article>
  );
}

// Loading Skeleton
export function ContributionListFallback() {
  return (
    <div className="flex flex-col divide-black/30 dark:divide-white/[0.15] divide-y divide-dashed animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex flex-col gap-2 p-5">
          <div className="flex justify-between items-start gap-4">
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4" />
              <div className="h-3.5 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2" />
            </div>
            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-12" />
          </div>
        </div>
      ))}
    </div>
  );
}
