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
        "cn-soft-badge flex w-fit items-center gap-1.5 px-2.5 py-1.5 rounded-[6px] border border-black/5 dark:border-white/5 shadow-sm",
        className,
      )}
    >
      {icon ? (
        <i className={`${icon} text-[14px]`} style={{ color: iconColor }} />
      ) : null}
      <span className="text-[11px] font-medium text-neutral-900 dark:text-neutral-300 tracking-tight">
        {tech}
      </span>
    </div>
  );
}
