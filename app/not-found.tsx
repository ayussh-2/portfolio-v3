import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Intersection2 from "@/components/pixel-perfect/intersection2";
import { SeperatorInline } from "@/components/ui/seperator";
import SoftPillButton from "@/components/pixel-perfect/soft-pill-button";
import { HeaderControls } from "@/components/header-controls";
import { ViewTransition } from "react";

export default function NotFound() {
    return (
        <ViewTransition
            enter={{
                "nav-forward": "nav-forward",
                "nav-back": "nav-back",
                default: "none",
            }}
            exit={{
                "nav-forward": "nav-forward",
                "nav-back": "nav-back",
                default: "none",
            }}
            default="none"
        >
            <main className="w-full md:max-w-xl mx-auto min-h-screen relative flex flex-col overflow-visible">
                <Intersection2>
                    <div className="relative min-h-screen w-full overflow-visible px-3 flex flex-col justify-between py-4">
                        {/* Header Controls */}
                        <div className="w-full">
                            <HeaderControls />
                            <SeperatorInline />
                        </div>

                        <div className="relative w-full h-[40vh] flex flex-col justify-center items-center my-auto">
                            <div className="z-20 text-center select-none">
                                <h1 className="text-[72px] sm:text-[84px] font-mono font-bold leading-none tracking-tighter text-zinc-900 dark:text-zinc-100">
                                    404
                                </h1>
                                <p className="text-sm font-medium tracking-widest uppercase text-zinc-500 dark:text-zinc-400 mt-2">
                                    Page Not Found
                                </p>
                                <div className="mt-5">
                                    <Link href="/" transitionTypes={['nav-back']}>
                                        <SoftPillButton
                                            as="div"
                                            variant="secondary"
                                            className="text-xs px-3 py-2 w-full flex justify-center"
                                        >
                                            <div className="flex items-center gap-1">
                                                <ArrowLeft size={14} /> Back Home
                                            </div>
                                        </SoftPillButton>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Footer Details & Action */}
                    </div>
                </Intersection2>
            </main>
        </ViewTransition>
    );
}
