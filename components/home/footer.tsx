"use client";
import { handleRedirect, MAIL, SOCIALS } from "@/config";
import Intersection2 from "../pixel-perfect/intersection2";
import SoftPillButton from "../pixel-perfect/soft-pill-button";
import GmailIcon from "../icons/gmail";
import { Copy } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { toast } from "sonner";
import { isValidElement, type ReactNode } from "react";

type FooterItem = {
  id: string;
  link: string;
  title: string;
  Icon: string | ReactNode;
  onClick?: () => void;
};

export default function Footer() {
  const emailAddress = new URL(MAIL).searchParams.get("to") ?? "";

  const extras: FooterItem[] = [
    {
      id: "gmail",
      link: MAIL,
      Icon: <GmailIcon className="size-4.5 md:size-3" />,
      title: "Gmail",
    },
    {
      id: "copy-email",
      link: "copy-email-action",
      Icon: <Copy className="size-4.5 md:size-3" />,
      title: "Copy Email",
      onClick: async () => {
        await navigator.clipboard.writeText(emailAddress);
        toast.success("Email copied to clipboard!");
      },
    },
  ];

  const footerItems: FooterItem[] = [...SOCIALS, ...extras];

  return (
    <footer className="w-full px-4 sm:px-8 pb-10 text-xs text-zinc-500 overflow-clip h-36 md:h-28">
      <Intersection2>
        <div className="mx-auto flex w-full max-w-xl flex-col gap-4 px-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className=" text-center sm:text-left leading-tight">
            <p className="-mt-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Let&apos;s connect
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-2 sm:justify-end">
            {footerItems.map(({ id, Icon, link, title, onClick }) => (
              <HoverCard key={id} openDelay={80} closeDelay={40}>
                <HoverCardTrigger asChild>
                  <SoftPillButton
                    id={id}
                    onClick={onClick ?? (() => handleRedirect(link))}
                    className="text-xs p-2"
                    variant="primary"
                    type="button"
                    aria-label={title}
                  >
                    <div className="flex items-center gap-2">
                      {typeof Icon === "string" ? (
                        <i className={`${Icon} text-[18px] md:text-[12px]`} />
                      ) : isValidElement(Icon) ? (
                        Icon
                      ) : null}
                    </div>
                  </SoftPillButton>
                </HoverCardTrigger>
                <HoverCardContent
                  align="center"
                  side="top"
                  className="w-auto rounded-xl border border-white/10 bg-popover/95 px-3 py-1.5 text-xs shadow-lg backdrop-blur-sm"
                >
                  <p className="font-medium text-center">{title}</p>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </div>
      </Intersection2>
    </footer>
  );
}
