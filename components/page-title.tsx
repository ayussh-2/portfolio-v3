import { SeperatorInline } from "./ui/seperator";

interface PageTitleProps {
  title: string;
  desc: string;
}
export default function PageTitle({ title, desc }: PageTitleProps) {
  return (
    <>
      <SeperatorInline />
      <div className="py-4 px-3">
        <h2 className="text-[16px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
          {title}
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          {desc}
        </p>
      </div>
      <SeperatorInline />
    </>
  );
}
