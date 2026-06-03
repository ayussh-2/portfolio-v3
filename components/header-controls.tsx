"use client";

import Link from "next/link";
import { ArrowLeft, Command } from "lucide-react";
import SoftPillButton from "@/components/pixel-perfect/soft-pill-button";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

interface HeaderControlsProps {
    backText?: string;
}

export function HeaderControls({
    backText = "Back Home",
}: HeaderControlsProps) {
    const router = useRouter();

    const handleBack = () => {
        if (typeof window !== "undefined") {
            const historyStr = sessionStorage.getItem("nav_history");
            if (historyStr) {
                try {
                    const history: string[] = JSON.parse(historyStr);
                    if (
                        history.length > 0 &&
                        history[history.length - 1] === window.location.pathname
                    ) {
                        history.pop();
                    }
                    const prevPath = history.pop();
                    if (prevPath) {
                        sessionStorage.setItem(
                            "nav_history",
                            JSON.stringify(history),
                        );
                        router.push(prevPath, {
                            scroll: false,
                            transitionTypes: ["nav-back"],
                        });
                        return;
                    }
                } catch (e) {
                    console.error("Error tracking back history", e);
                }
            }
        }
        router.push("/", { scroll: false, transitionTypes: ["nav-back"] });
    };

    return (
        <div className="flex items-center justify-between w-full py-4 px-3">
            <SoftPillButton
                as="button"
                variant="secondary"
                className="text-xs px-3 py-2 cursor-pointer"
                onClick={handleBack}
            >
                <div className="flex items-center gap-1">
                    <ArrowLeft size={14} /> {backText}
                </div>
            </SoftPillButton>

            <div
                className="flex items-center gap-2"
                style={{ viewTransitionName: "site-header" }}
            >
                <Button
                    variant="outline"
                    size="sm"
                    className="opacity-80 hover:opacity-100 cursor-pointer"
                    onClick={() => {
                        window.dispatchEvent(
                            new CustomEvent("toggle-command-menu"),
                        );
                    }}
                >
                    <Command className="h-4 w-4" /> K
                </Button>

                <AnimatedThemeToggler duration={500} />
            </div>
        </div>
    );
}
