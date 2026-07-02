// @ts-nocheck

import { ReactElement, ReactNode } from "react";

import CopyButton from "./copy-button";
import { getLanguage, getLanguageIcon } from "./language";

import "./code-block.css";

interface CodeBlockProps {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

function extractCode(children: ReactNode): string {
  if (!children) return "";

  const child = children as ReactElement;

  if (child?.props && typeof child.props.children === "string") {
    return child.props.children;
  }

  if (child?.props && Array.isArray(child.props.children)) {
    return child.props.children
      .map((line: any) => {
        if (typeof line === "string") return line;

        if (line?.props?.children) {
          if (Array.isArray(line.props.children)) {
            return line.props.children
              .map((token: any) =>
                typeof token === "string"
                  ? token
                  : (token?.props?.children ?? ""),
              )
              .join("");
          }

          return line.props.children;
        }

        return "";
      })
      .join("\n");
  }

  return "";
}

export default function CodeBlock({
  children,
  className,
  ...props
}: CodeBlockProps) {
  const language = getLanguage(props["data-language"]);
  const icon = getLanguageIcon(language);

  const code = extractCode(children);

  return (
    <figure data-rehype-pretty-code-figure>
      <div className="group/code relative">
        <div className="code-header">
          <div className="flex items-center gap-2">
            {icon && (
              <i className={`${icon} text-[15px] text-[#fafafa]`} aria-hidden />
            )}

            <span className="code-language">{language}</span>
          </div>
        </div>

        {/* Code */}
        <pre tabIndex={0} className={className} {...props}>
          {children}
        </pre>

        {/* Copy */}
        <CopyButton code={code} />

        {/* Fade */}
        {/* <div aria-hidden className="code-fade" /> */}
      </div>
    </figure>
  );
}
