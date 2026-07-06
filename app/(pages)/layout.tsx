"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/home/footer";
import { SeperatorInline } from "@/components/ui/seperator";
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const isBlogSlug = segments[0] === "blog" && segments.length > 1;
  return (
    <div className="flex flex-col min-h-screen">
      <div className="grow">{children}</div>
      <div
        className={cn(
          "mx-auto w-full max-w-[40rem]",
          isBlogSlug && "max-w-[37rem]!",
        )}
      >
        <SeperatorInline />
        <Footer />
      </div>
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-50"
        aria-hidden
      >
        <div className="h-(--fade-bottom-height) bg-linear-to-b from-transparent to-background mask-linear-[to_top,black_25%,transparent] backdrop-blur-[1px]" />
        <div className="bg-background pb-[env(safe-area-inset-bottom,0)]" />
      </div>
    </div>
  );
}
