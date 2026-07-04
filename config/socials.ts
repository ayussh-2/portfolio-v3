import { toast } from "sonner";


export const DISCORD_USER_NAME = "ayus.ssh";

export function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
}

export function handleRedirect(url: string) {
    if (url == "discord") {
        copyToClipboard(DISCORD_USER_NAME);
        toast.success("Username copied to clipboard!");
        return;
    }
    window.open(url, "_blank");
}

export type SocialItem = {
    id: string;
    link: string;
    title: string;
    Icon: any;
};

export const SOCIALS: SocialItem[] = [
    {
        id: "github",
        link: "https://github.com/ayussh-2",
        Icon: "devicon-github-original",
        title: "Github",
    },
    {
        id: "linkedin",
        link: "https://www.linkedin.com/in/ayush-a-8b14062b9/",
        Icon: "devicon-linkedin-plain",
        title: "Linkedin",
    },
    {
        id: "leetcode",
        link: "https://leetcode.com/u/ayussh-2/",
        Icon: "devicon-leetcode-plain",
        title: "LeetCode",
    },
    // {
    //     id: "discord",
    //     link: "discord",
    //     Icon: Discord,
    //     title: "Discord",
    // },
];
