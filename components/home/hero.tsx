import { Command } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { FlipWords } from "../ui/flip-words";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";

const avatarSizes = {
    xs: { class: "w-10 h-10 sm:w-12 sm:h-12", px: 44 },
    sm: { class: "w-12 h-12 sm:w-14 sm:h-14", px: 48 },
    md: { class: "w-16 h-16 sm:w-20 sm:h-20", px: 80 },
    lg: { class: "w-20 h-20 sm:w-24 sm:h-24", px: 96 },
    xl: { class: "w-24 h-24 sm:w-28 sm:h-28", px: 112 },
} as const;

type AvatarSize = keyof typeof avatarSizes;

interface AvatarProps {
    url: string;
    imgClass?: string;
    size?: AvatarSize;
}

export function Avatar({ url, imgClass, size = "md" }: AvatarProps) {
    const sizeConfig = avatarSizes[size];
    return (
        <div
            className={cn(
                "relative p-0.75 rounded-[6px] sm:rounded-[8px] border-[1.5px] border-black/30 dark:border-white/15 shrink-0",
            )}
        >
            <div
                className={cn(
                    "relative rounded-[3px] sm:rounded-[5px] overflow-hidden bg-zinc-100 dark:bg-zinc-900",
                    sizeConfig.class,
                )}
            >
                <Image
                    src={url}
                    alt="Profile"
                    width={sizeConfig.px}
                    height={sizeConfig.px}
                    className={cn("w-full h-full object-cover", imgClass)}
                />
            </div>
        </div>
    );
}

export default function Hero() {
    const words = [
        "Code, Food & Photos!",
        "Full Stack Builder",
        "Backend Engineer",
        "Community Builder",
    ];
    return (
        <section className="flex items-start justify-between w-full py-4 px-3">
            <div className="flex items-end justify-between gap-5">
                <Avatar
                    url={"https://github.com/ayussh-2.png"}
                    imgClass={" dark:grayscale  "}
                />
                <div>
                    <h1 className="text-[20px] sm:text-[24px] font-bold text-zinc-800 dark:text-zinc-100 tracking-tight leading-none mb-0.5">
                        Ayush
                    </h1>

                    <div className="font-sans text-sm  -ml-2">
                        <FlipWords
                            words={words}
                            className="text-black/80 dark:text-white/80"
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between gap-2">
                <Button
                    variant={"outline"}
                    size={"sm"}
                    className="opacity-80 hover:opacity-100 cursor-pointer"
                    onClick={() => {
                        window.dispatchEvent(new CustomEvent("toggle-command-menu"));
                    }}
                >
                    <Command className="h-4 w-4" /> K
                </Button>

                <AnimatedThemeToggler duration={500} />

                {/* <ModeToggle /> */}
            </div>
        </section>
    );
}
