"use client";

import { useEffect, useState } from "react";
import { getGithubContributions } from "@/lib/github";
import { SeperatorInline } from "../ui/seperator";

function getLevel(count: number) {
    if (count === 0) return 0;
    if (count <= 3) return 1;
    if (count <= 6) return 2;
    if (count <= 9) return 3;
    return 4;
}

const themeClasses = {
    0: "fill-white dark:fill-[#18181b]",
    1: "fill-zinc-200 dark:fill-zinc-800",
    2: "fill-zinc-400 dark:fill-zinc-600",
    3: "fill-zinc-500 dark:fill-zinc-400",
    4: "fill-zinc-900 dark:fill-white",
};

export default function GithubCustom() {
    const [calendar, setCalendar] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getGithubContributions("ayussh-2")
            .then((data) => {
                setCalendar(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching contributions:", error);
                setLoading(false);
            });
    }, []);

    return (
        <section className="w-full">
            <h1 className="text-[18px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight my-2 px-3">
                Contributions
            </h1>
            <SeperatorInline />

            <div className="px-3 py-6 w-full flex flex-col gap-4">
                {loading || !calendar ? (
                    <div className="w-full h-[120px] bg-zinc-100 dark:bg-zinc-900/40 animate-pulse rounded-[6px] border border-black/10 dark:border-white/10" />
                ) : (
                    <>
                        <div className="w-full">
                            <svg
                                viewBox="0 0 760 115"
                                className="w-full h-auto"
                            >
                                {calendar.weeks.map(
                                    (week: any, weekIndex: number) => (
                                        <g
                                            key={weekIndex}
                                            transform={`translate(${weekIndex * 14}, 0)`}
                                        >
                                            {week.contributionDays.map(
                                                (
                                                    day: any,
                                                    dayIndex: number,
                                                ) => {
                                                    const level = getLevel(
                                                        day.contributionCount,
                                                    ) as keyof typeof themeClasses;

                                                    return (
                                                        <rect
                                                            key={day.date}
                                                            x={0}
                                                            y={day.weekday * 14}
                                                            width={11}
                                                            height={11}
                                                            rx={2}
                                                            // Removed transition-colors for instant theme snapping
                                                            className={`${themeClasses[level]} stroke-[0.5px] stroke-black/5 dark:stroke-white/5`}
                                                        >
                                                            <title>
                                                                {`${day.contributionCount} contributions on ${day.date}`}
                                                            </title>
                                                        </rect>
                                                    );
                                                },
                                            )}
                                        </g>
                                    ),
                                )}
                            </svg>
                        </div>

                        <div className="flex justify-between items-center text-[12px] text-zinc-500 dark:text-zinc-400 w-full px-1">
                            <span>
                                {calendar.totalContributions} activities in the
                                last year
                            </span>
                            <div className="flex items-center gap-2">
                                <span>Less</span>
                                <div className="flex gap-1">
                                    {[0, 1, 2, 3, 4].map((level) => (
                                        <svg
                                            key={level}
                                            width="11"
                                            height="11"
                                            className="block"
                                        >
                                            <rect
                                                width="11"
                                                height="11"
                                                rx={2}
                                                className={`${themeClasses[level as keyof typeof themeClasses]} stroke-[0.5px] stroke-black/5 dark:stroke-white/5`}
                                            />
                                        </svg>
                                    ))}
                                </div>
                                <span>More</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
