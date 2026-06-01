import type { ComponentType } from 'react';

import { toast } from 'sonner';

import Discord from '@/components/icons/discord';
import LeetCode from '@/components/icons/leetcode';
import {
  GithubOriginalIcon,
  LinkedinOriginalIcon,
} from '@devicon/react';

export const about = [
    "B.Tech, Civil Engineering at NIT Rourkela (2023-2027).",
    "Interned at Soundpark, ScanKart AI, and Pariksit Inc,shipping backend and product features.",
    "Lead organizer for GDG on Campus NITR and HackNITR 7.0.",
];

export const subHeading =
    "Engineer. I build full-stack systems and developer tools.";

export const RESUME =
    "https://drive.google.com/file/d/1ntZqA9BFDVf1UBSlPikTuOM79lbaOIg-/view?usp=sharing";

export const MAIL =
    "https://mail.google.com/mail/?view=cm&fs=1&to=ayushatschool5%40gmail.com";

export function handleRedirect(url: string) {
    if (url == "discord") {
        copyToClipboard(DISCORD_USER_NAME);
        toast.success("Username copied to clipboard!");
        return;
    }
    window.open(url, "_blank");
}

export function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
}

export const DISCORD_USER_NAME = "ayus.ssh";
type SocialItem = {
    id: string;
    link: string;
    title: string;
    Icon: ComponentType<{
        size?: string | number;
        className?: string;
        color?: string;
    }>;
};

export const SOCIALS: SocialItem[] = [
    {
        id: "github",
        link: "https://github.com/ayussh-2",
        Icon: GithubOriginalIcon,
        title: "Github",
    },
    {
        id: "linkedin",
        link: "https://www.linkedin.com/in/ayush-a-8b14062b9/",
        Icon: LinkedinOriginalIcon,
        title: "Linkedin",
    },
    {
        id: "leetcode",
        link: "https://leetcode.com/u/ayussh-2/",
        Icon: LeetCode,
        title: "LeetCode",
    },
    {
        id: "discord",
        link: "discord",
        Icon: Discord,
        title: "Discord",
    },
];
