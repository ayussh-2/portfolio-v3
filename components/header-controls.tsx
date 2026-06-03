"use client";

import Link from "next/link";
import { ArrowLeft, Command } from "lucide-react";
import SoftPillButton from "@/components/pixel-perfect/soft-pill-button";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Button } from "@/components/ui/button";

interface HeaderControlsProps {
    backText?: string;
}

export function HeaderControls({ backText = "Back Home" }: HeaderControlsProps) {
    return (
        <div className="flex items-center justify-between w-full py-4 px-3">
            <Link href="/">
                <SoftPillButton
                    as="div"
                    variant="secondary"
                    className="text-xs px-3 py-2"
                >
                    <div className="flex items-center gap-1">
                        <ArrowLeft size={14} /> {backText}
                    </div>
                </SoftPillButton>
            </Link>

            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="opacity-80 hover:opacity-100 cursor-pointer"
                    onClick={() => {
                        window.dispatchEvent(new CustomEvent("toggle-command-menu"));
                    }}
                >
                    <Command className="h-4 w-4" /> K
                </Button>

                <AnimatedThemeToggler duration={500} />
            </div>
        </div>
    );
}
