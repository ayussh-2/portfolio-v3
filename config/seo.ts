    import type { Metadata } from "next";

    export const SEO_METADATA: Metadata = {
        title: {
            default: "Ayush | Software Engineer & Backend Developer",
            template: "%s | Ayush"
        },
        description: "Software Engineer & Lead Organizer at GDG on Campus NIT Rourkela. Specialized in building fast, scalable backends, microservices, and high-performance web applications using Go, TypeScript, Node.js, and React.",
        keywords: [
            "Ayush",
            "Ayush Rourkela",
            "Ayush NIT Rourkela",
            "GDG NIT Rourkela",
            "HackNITR Organizer",
            "Software Engineer",
            "Backend Developer",
            "Go Developer",
            "TypeScript Developer",
            "Next.js Developer",
            "Web Developer Portfolio",
            "Soundpark Intern"
        ],
        authors: [{ name: "Ayush", url: "https://github.com/ayussh-2" }],
        creator: "Ayush",
        icons: {
            icon: "/icon.svg",
            shortcut: "/icon.svg",
            apple: "/icon.svg",
        },
        openGraph: {
            type: "website",
            locale: "en_US",
            url: "https://github.com/ayussh-2",
            title: "Ayush | Software Engineer & Backend Developer",
            description: "Software Engineer & Lead Organizer at GDG on Campus NIT Rourkela.",
            siteName: "Ayush Portfolio",
            images: [
                {
                    url: "https://ik.imagekit.io/euurqxbuc/portfolio/ChatGPT%20Image%20Jul%204,%202026,%2001_54_59%20PM.webp",
                    width: 1200,
                    height: 630,
                    alt: "Ayush Portfolio Banner",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: "Ayush | Software Engineer & Backend Developer",
            description: "Software Engineer & Lead Organizer at GDG on Campus NIT Rourkela.",
            images: ["https://ik.imagekit.io/euurqxbuc/portfolio/ChatGPT%20Image%20Jul%204,%202026,%2001_54_59%20PM.webp"],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
    };
