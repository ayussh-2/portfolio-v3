"use client";

import { useTheme } from 'next-themes';

import { EXPERIENCE } from '@/config';
import {
  AmazonwebservicesOriginalWordmarkIcon,
  ChromePlainIcon,
  FlaskOriginalIcon,
  GraphqlPlainIcon,
  NextjsOriginalIcon,
  NginxOriginalIcon,
  NodejsOriginalIcon,
  PhpPlainIcon,
  ReactOriginalIcon,
  RedisOriginalIcon,
  SocketioOriginalIcon,
  SqlitePlainIcon,
  TypescriptOriginalIcon,
} from '@devicon/react';

import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from '../ui/accordion';
import { SeperatorInline } from '../ui/seperator';
import { Avatar } from './hero';

const techStackIcons: Record<
    string,
    React.ComponentType<{ size?: string | number; className?: string }>
> = {
    TypeScript: TypescriptOriginalIcon,
    "Node.js": NodejsOriginalIcon,
    GraphQL: GraphqlPlainIcon,

    "AWS EC2": AmazonwebservicesOriginalWordmarkIcon,
    Nginx: NginxOriginalIcon,
    Redis: RedisOriginalIcon,
    React: ReactOriginalIcon,
    "Socket.IO": SocketioOriginalIcon,
    "Next.js": NextjsOriginalIcon,
    Flask: FlaskOriginalIcon,
    PHP: PhpPlainIcon,
    SQL: SqlitePlainIcon,
    "Chrome Extension": ChromePlainIcon,
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
            <div className="flex items-center gap-4">
                <Avatar url={logo as string} size="sm" />
                <div className="flex flex-col gap-0.5">
                    <h2 className="text-[17px] font-bold text-zinc-900 dark:text-zinc-100">
                        {company}
                    </h2>
                    <span className="text-[15px] text-zinc-600 dark:text-zinc-400">
                        {role}
                    </span>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <h2 className="text-[15px] text-zinc-900 dark:text-zinc-100">
                    {duration}
                </h2>
                <h2 className="text-[14px] text-zinc-500 dark:text-zinc-400">
                    {location}
                </h2>
            </div>
        </div>
    );
}

type ExperienceDetailProps = {
    details: string[];
    techStack: string[];
};

function ExperienceDetail({ details, techStack }: ExperienceDetailProps) {
    const { resolvedTheme } = useTheme();
    const iconColor = resolvedTheme === "dark" ? "#fff" : "#000";

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
                    {techStack.map((tech, idx) => {
                        const IconComponent = techStackIcons[tech];
                        return (
                            <div
                                key={idx}
                                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[6px] border border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50 dark:bg-[#111111]"
                            >
                                {IconComponent ? (
                                    <IconComponent
                                        size={14}
                                        // @ts-ignore
                                        color={iconColor}
                                    />
                                ) : null}
                                <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
                                    {tech}
                                </span>
                            </div>
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
