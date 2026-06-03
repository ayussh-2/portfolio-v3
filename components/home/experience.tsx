"use client";

import { useTheme } from "next-themes";

import { EXPERIENCE } from "@/config";
import {
    Accordion,
    AccordionItem,
    AccordionPanel,
    AccordionTrigger,
} from "../ui/accordion";
import { Avatar } from "./hero";
import { SeperatorInline } from "../ui/seperator";
import { TechBadge } from "../ui/tech-badge";

const techStackIcons: Record<string, string> = {
    TypeScript: "devicon-typescript-plain",
    "Node.js": "devicon-nodejs-plain",
    GraphQL: "devicon-graphql-plain",

    "AWS EC2": "devicon-amazonwebservices-plain-wordmark",
    Nginx: "devicon-nginx-original",
    Redis: "devicon-redis-plain",
    React: "devicon-react-original",
    "Socket.IO": "devicon-socketio-original",
    "Next.js": "devicon-nextjs-plain",
    Flask: "devicon-flask-original",
    PHP: "devicon-php-plain",
    SQL: "devicon-sqlite-plain",
    "Chrome Extension": "devicon-chrome-plain",
};

type ExperienceItemProps = {
    logo?: string;
    role: string;
    company: string;
    duration: string;
    location: string;
};

function ExperienceItem({
    logo,
    role,
    company,
    duration,
    location,
}: ExperienceItemProps) {
    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4 min-w-0 flex-1">
                <Avatar url={logo as string} size="sm" />
                <div className="flex flex-col gap-0.5 min-w-0">
                    <h2 className="text-[17px] font-bold text-zinc-900 dark:text-zinc-100 truncate">
                        {company}
                    </h2>
                    <span className="text-[15px] text-zinc-600 dark:text-zinc-400 truncate">
                        {role}
                    </span>
                </div>
            </div>
            <div className="flex flex-col items-end shrink-0">
                <h2 className="text-[15px] text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                    {duration}
                </h2>
                <h2 className="text-[14px] text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                    {location}
                </h2>
            </div>
        </div>
    );
}

type ExperienceDetailProps = {
    details: string[];
    techStack?: string[];
};

function ExperienceDetail({ details, techStack = [] }: ExperienceDetailProps) {
    return (
        <div>
            <ul className="mb-4 space-y-2 text-[13px] leading-relaxed list-disc pl-5">
                {details.map((detail, idx) => (
                    <li className="flex items-start gap-1.5" key={idx}>
                        <span>•</span>
                        <span> {detail}</span>
                    </li>
                ))}
            </ul>

            <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                    {techStack &&
                        techStack.map((tech, idx) => {
                            const IconComponent = techStackIcons[tech];
                            return (
                                <TechBadge
                                    key={idx}
                                    tech={tech}
                                    icon={IconComponent}
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default function Experience() {
    return (
        <section>
            <h1 className="text-[18px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight my-2! px-3">
                Experience
            </h1>
            <SeperatorInline />
            <Accordion>
                {EXPERIENCE.map((exp, idx) => (
                    <AccordionItem
                        key={exp.company}
                        value={`experience-${idx}`}
                        className="border-b border-dashed px-3 rounded-none"
                    >
                        <AccordionTrigger>
                            <ExperienceItem {...exp} />
                        </AccordionTrigger>
                        <AccordionPanel>
                            <ExperienceDetail
                                details={exp.details}
                                techStack={exp.techStack}
                            />
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}
