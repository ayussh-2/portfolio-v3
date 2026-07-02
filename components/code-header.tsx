"use client";

import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { languageIcons } from "./mdx/language";

interface CodeHeaderProps {
  language?: string;
  code: string;
}

const aliases: Record<string, string> = {
  py: "python",
  cxx: "cpp",
  "c++": "cpp",
  md: "markdown",
  yml: "yaml",
  sh: "bash",
  shell: "bash",
  zsh: "bash",
};

export default function CodeHeader({ language, code }: CodeHeaderProps) {
  const [copied, setCopied] = useState(false);

  const normalized =
    aliases[language?.toLowerCase() ?? ""] ?? language?.toLowerCase() ?? "text";

  const icon = languageIcons[normalized];
  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between border-b px-2 py-1">
      <div className="flex items-center gap-2">
        {icon && <i className={`${icon} text-xs`} />}

        <span className="text-xs font-medium capitalize text-zinc-400">
          {normalized}
        </span>
      </div>

      <Button variant="ghost" size="icon-sm" onClick={copy}>
        {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
      </Button>
    </div>
  );
}
