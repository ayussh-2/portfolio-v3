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

type ExperienceItem = {
    logo: string;
    role: string;
    company: string;
    duration: string;
    location: string;
    details: string[];
    techStack: string[];
};

export const EXPERIENCE: ExperienceItem[] = [
    {
        logo: "",
        role: "Software Engineer Intern",
        company: "Soundpark",
        duration: "May – July 2025",
        location: "Remote",
        details: [
            "Architected a scalable backend using TypeScript and Node.js, implementing a hybrid REST/GraphQL API (Apollo Server 4) with WebSocket subscriptions, serving 11 resolver modules across 18+ database entities with Drizzle ORM.",
            "Deployed production infrastructure on AWS EC2 with Nginx reverse proxy and PM2 process manager, achieving zero-downtime deployments with cluster mode (4 instances) and 99.5% uptime.",
            "Engineered a multi-provider music aggregation layer integrating Spotify and MusicBrainz APIs with debounced requests, paired with a Redis caching system (cache-aside pattern) that reduced average API response time from 175ms to 10ms.",
        ],
        techStack: [
            "TypeScript",
            "Node.js",
            "GraphQL",
            "Apollo Server",
            "Drizzle ORM",
            "AWS EC2",
            "Nginx",
            "PM2",
            "Redis",
        ],
    },
    {
        logo: "",
        role: "Software Engineer Intern",
        company: "ScanKart AI",
        duration: "December 2024 – January 2025",
        location: "Remote",
        details: [
            "Developed an AI-powered Chrome extension using React and Socket.IO to summarise web content, reducing reading time for users by 50%.",
            "Integrated the AppSumo payment gateway using Next.js and Flask, increasing peak-hour transaction completion rates by 35%.",
        ],
        techStack: [
            "React",
            "Socket.IO",
            "Chrome Extension",
            "Next.js",
            "Flask",
            "Payment Gateway Integration",
        ],
    },
    {
        logo: "",
        role: "Software Engineer Intern",
        company: "Pariksit Inc",
        duration: "May – June 2024",
        location: "Rourkela, Odisha",
        details: [
            "Streamlined academic operations by building a mark management system in PHP and SQL that automated data entry for 400+ students and report generation, reducing manual input by 75% and processing time by 95%.",
            "Established a secure, role-based authentication system to manage 10+ concurrent teacher accounts with distinct access controls.",
        ],
        techStack: [
            "PHP",
            "SQL",
            "Authentication",
            "Role-Based Access Control",
            "Database Design",
        ],
    },
];

export type ExtraItem = {
    id: string;
    role: string;
    organization: string;
    duration: string;
    location: string;
    details: string[];
};

export const EXTRACURRICULARS: ExtraItem[] = [
    {
        id: "gdg",
        role: "Lead Organizer",
        organization: "Google Developers Group on Campus NITR",
        duration: "September 2025 – Present",
        location: "NIT Rourkela",
        details: [
            "Owned technical curriculum and platform infrastructure for an 800+ student developer community; curated and delivered sessions on system design, backend architecture, and full-stack development while leading a 30+ member chapter.",
        ],
    },
    {
        id: "hacknitr",
        role: "Lead Organizer",
        organization: "HackNITR 7.0",
        duration: "January 2026",
        location: "NIT Rourkela",
        details: [
            "Spearheaded end-to-end organization of Odisha's largest student hackathon, driving 6,200+ registrations; oversaw technical infrastructure and a 50+ member organizing team.",
            "Directed delivery of a production-grade Next.js platform and managed event operations for 170+ finalists across a 36-hour hackathon, coordinating stakeholder management with institute administration.",
        ],
    },
    {
        id: "hackodisha",
        role: "Technical Team Lead",
        organization: "HackOdisha 5.0",
        duration: "May – September 2025",
        location: "NIT Rourkela",
        details: [
            "Led a technical team in building a modern, responsive Next.js website with SEO optimisations and rich animations for a premier state-level hackathon with 3,000+ participants.",
            "Managed end-to-end technical delivery including team coordination, architectural decisions, and deployment strategy for a high-traffic event platform.",
        ],
    },
];
