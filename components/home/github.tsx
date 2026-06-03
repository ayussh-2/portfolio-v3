"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { SeperatorInline } from "../ui/seperator";

export default function Github({ iconColor }: { iconColor: string }) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const calendarTheme = {
        light: ["#f4f4f5", "#e4e4e7", "#a1a1aa", "#71717a", "#18181b"],
        dark: ["#18181b", "#27272a", "#52525b", "#a1a1aa", "#ffffff"],
    };

    const customLabels = {
        totalCount: "{{count}} activities in the last year",
    };

    return (
        <section className="w-full">
            <h1 className="text-[18px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight my-2 px-3">
                Contributions
            </h1>
            <SeperatorInline />
            <div className="px-3 py-6 w-full">
                {mounted ? (
                    <div className="w-full flex justify-center [&_.react-activity-calendar]:w-full [&_.react-activity-calendar]:max-w-full [&_.react-activity-calendar_svg]:w-full [&_.react-activity-calendar_svg]:h-auto">
                        <GitHubCalendar
                            username="ayussh-2"
                            theme={calendarTheme}
                            colorScheme={
                                resolvedTheme === "dark" ? "dark" : "light"
                            }
                            labels={customLabels}
                            blockSize={11}
                            blockMargin={3}
                            blockRadius={2}
                            fontSize={12}
                        />
                    </div>
                ) : (
                    <div className="w-full h-[120px] bg-zinc-100 dark:bg-zinc-900/40 animate-pulse rounded-[6px] border border-black/10 dark:border-white/10" />
                )}
            </div>
        </section>
    );
}
