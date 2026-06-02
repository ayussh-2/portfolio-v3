"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ProgressiveBlurProps {
    className?: string;
    height?: string;
    position?: "top" | "bottom" | "both";
    blurLevels?: number[];
}

export function ProgressiveBlur({
    className,
    height = "10%",
    position = "bottom",
    blurLevels = [0.5, 1, 2, 4, 8, 16, 32, 64],
}: ProgressiveBlurProps) {
    const step = 100 / blurLevels.length;

    const getMask = (index: number) => {
        if (position === "both") {
            return `linear-gradient(
        rgba(0,0,0,0) 0%,
        rgba(0,0,0,1) 5%,
        rgba(0,0,0,1) 95%,
        rgba(0,0,0,0) 100%
      )`;
        }

        const start = index * step;
        const mid = (index + 1) * step;
        const end = (index + 2) * step;

        const direction = position === "top" ? "to top" : "to bottom";

        return `linear-gradient(
      ${direction},
      rgba(0,0,0,0) ${start}%,
      rgba(0,0,0,1) ${mid}%,
      rgba(0,0,0,1) ${end}%,
      rgba(0,0,0,0) ${Math.min(end + step, 100)}%
    )`;
    };

    return (
        <div
            className={cn(
                "pointer-events-none fixed inset-x-0 z-[999]",
                position === "top"
                    ? "top-0"
                    : position === "bottom"
                      ? "bottom-0"
                      : "inset-y-0",
                className,
            )}
            style={{
                height: position === "both" ? "100vh" : height,
            }}
        >
            {blurLevels.map((blur, index) => (
                <div
                    key={blur}
                    className="absolute inset-0"
                    style={{
                        zIndex: index,
                        backdropFilter: `blur(${blur}px)`,
                        WebkitBackdropFilter: `blur(${blur}px)`,
                        maskImage: getMask(index),
                        WebkitMaskImage: getMask(index),
                    }}
                />
            ))}
        </div>
    );
}
