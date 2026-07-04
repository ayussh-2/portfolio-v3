"use client";

import React from "react";
import { toast } from "sonner";
import { ExternalLink } from "lucide-react";
import SoftPillButton from "@/components/pixel-perfect/soft-pill-button";
import { Button } from "./ui/button";
import { handleRedirect } from "@/config";

interface ProjectLiveDemoButtonProps {
  liveLink?: string;
}

export default function ProjectLiveDemoButton({
  liveLink,
}: ProjectLiveDemoButtonProps) {
  if (liveLink) {
    return (
      <Button
        onClick={() => handleRedirect(liveLink)}
        variant="ghost"
        className="text-sm px-3.5 py-2 flex-1 h-14! rounded-none!"
      >
        <div className="flex items-center justify-center gap-2">
          <ExternalLink size={20} /> Live Demo
        </div>
      </Button>
    );
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.info("Coming soon!");
  };

  return (
    <Button
      type="button"
      variant="ghost"
      className="text-sm px-3.5 py-2 flex-1 opacity-50 cursor-not-allowed h-14! rounded-none!"
      onClick={handleClick}
    >
      <div className="flex items-center justify-center gap-2">
        <ExternalLink size={20} /> Live Demo
      </div>
    </Button>
  );
}
