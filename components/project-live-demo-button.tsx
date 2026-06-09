"use client";

import React from "react";
import { toast } from "sonner";
import { ExternalLink } from "lucide-react";
import SoftPillButton from "@/components/pixel-perfect/soft-pill-button";

interface ProjectLiveDemoButtonProps {
    liveLink?: string;
}

export default function ProjectLiveDemoButton({ liveLink }: ProjectLiveDemoButtonProps) {
    if (liveLink) {
        return (
            <SoftPillButton
                as="a"
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className="text-xs px-3.5 py-2 flex-1"
            >
                <div className="flex items-center justify-center gap-2">
                    <ExternalLink size={14} /> Live Demo
                </div>
            </SoftPillButton>
        );
    }

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        toast.info("Coming soon!");
    };

    return (
        <SoftPillButton
            type="button"
            variant="primary"
            className="text-xs px-3.5 py-2 flex-1 opacity-50 cursor-not-allowed"
            onClick={handleClick}
        >
            <div className="flex items-center justify-center gap-2">
                <ExternalLink size={14} /> Live Demo
            </div>
        </SoftPillButton>
    );
}
