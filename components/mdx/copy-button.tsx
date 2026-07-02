"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";

interface CopyButtonProps {
  code: string;
}

export default function CopyButton({ code }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      // Ignore clipboard errors
    }
  }

  return (
    <Button
      data-slot="copy-button"
      variant="ghost"
      size="icon-xs"
      onClick={copy}
      className="
        absolute
        top-2
        right-2
        z-10
        h-8
        w-8
        rounded-md
        border-none
        bg-transparent
        text-muted-foreground
        opacity-0
        transition-opacity
        duration-200
        group-hover/code:opacity-100
      "
      aria-label="Copy code"
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.div
            key="check"
            initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.7, rotate: 20 }}
            transition={{ duration: 0.15 }}
          >
            <Check className="size-4 text-green-500" />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.15 }}
          >
            <Copy className="size-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}
