import { cn } from "@/lib/utils";

export type TechBadgeProps = {
    tech: string;
    icon?: string;
    iconColor?: string;
    className?: string;
};

export function TechBadge({
    tech,
    icon,
    iconColor,
    className = "",
}: TechBadgeProps) {
    return (
        <div
            className={cn(
                "flex items-center gap-1.5 px-2.5 py-1.5 rounded-[6px] border border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50 dark:bg-[#111111]",
                className,
            )}
        >
            {icon ? (
                <i
                    className={`${icon} text-[14px]`}
                    style={{ color: iconColor }}
                />
            ) : null}
            <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
                {tech}
            </span>
        </div>
    );
}
