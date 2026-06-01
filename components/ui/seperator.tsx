type SeperatorInlineProps = {
    className?: string;
};

export function SeperatorInline({ className }: SeperatorInlineProps) {
    return (
        <div
            aria-hidden="true"
            className={`relative left-1/2 w-screen -translate-x-1/2 h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none seperator ${className ?? ""}`}
        ></div>
    );
}

export function Corner({ className }: { className?: string }) {
    return (
        <div
            aria-hidden="true"
            className={`absolute w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] pointer-events-none z-10 hidden md:block corner ${className ?? ""}`}
        ></div>
    );
}

export function SeperatorVertical({ className }: { className?: string }) {
    return (
        <div
            aria-hidden="true"
            className={`absolute top-1/2 h-screen -translate-y-1/2 right-[31%] w-0 border-r border-black/30 dark:border-white/[0.15] pointer-events-none hidden md:block seperator-vertical ${className ?? ""}`}
        ></div>
    );
}
