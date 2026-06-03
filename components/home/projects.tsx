"use client";

import { Card, CardContent } from "../ui/card";
import { SeperatorInline } from "../ui/seperator";
import { motion } from "motion/react";
import SoftPillButton from "../pixel-perfect/soft-pill-button";
import { ArrowUpRight, Play } from "lucide-react";
import { Safari } from "@/components/ui/safari";
import { Iphone } from "@/components/ui/iphone";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

import Link from "next/link";
import { PROJECTS } from "@/config";
import { Button } from "../ui/button";

interface ProjectDetail {
    image: string;
    title: string;
    shortDesc: string;
    techStack: Array<{
        icon: string;
        title: string;
    }>;
    githubLink: string;
    liveLink: string;
    longDesc: string;
    deviceType?: "desktop" | "mobile";
}

export function ProjectCard({
    project,
    isOdd = false,
}: {
    project: ProjectDetail;
    isOdd: boolean;
}) {
    const isMobile = project.deviceType === "mobile";

    return (
        <Card
            className={`w-full max-w-sm rounded-none border-b ${isOdd ? "border-r" : "border-l"} border-black/30 dark:border-white/15 border-dashed dark:bg-[#0a0a0a] bg-white ring-0 px-3`}
        >
            <div>
                <div className="relative w-full rounded-xl border border-black/5 dark:border-white/5 bg-zinc-50/80 dark:bg-[#09090b]/80 shadow-sm flex flex-col overflow-hidden transition-all duration-300 hover:shadow-md hover:border-black/10 dark:hover:border-white/10 group">
                    <motion.div
                        className="relative border-0 overflow-hidden rounded-t-xl flex items-center justify-center bg-zinc-200/30 dark:bg-zinc-800/30"
                        initial="initial"
                        whileHover="hover"
                    >
                        <div className="flex items-end justify-center w-full h-full ">
                            {isMobile ? (
                                <div className="w-27.5 shadow-2xl translate-y-3 mb-5 rounded-4xl">
                                    <Iphone src={project.image} />
                                </div>
                            ) : (
                                <div className="w-full shadow-2xl ">
                                    <Safari
                                        imageSrc={project.image}
                                        url={
                                            project.liveLink ||
                                            project.githubLink
                                        }
                                    />
                                </div>
                            )}
                        </div>

                        <motion.div
                            className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm"
                            variants={{
                                initial: { opacity: 0 },
                                hover: {
                                    opacity: 1,
                                    transition: { delay: 0.1, duration: 0.2 },
                                },
                            }}
                        >
                            <SoftPillButton
                                variant="primary"
                                className="text-xs px-3 py-2"
                            >
                                <Play size={15} />
                            </SoftPillButton>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
            <CardContent className="pt-4">
                <h2 className="text-[15px] font-bold text-zinc-900 dark:text-zinc-100">
                    {project.title}
                </h2>
                <p className="mt-1.5 text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed pr-2">
                    {project.shortDesc}
                </p>
                <div className="flex items-end justify-between">
                    <div className="flex gap-2 mt-4">
                        {project.techStack.slice(0, 5).map((tech, i) =>
                            tech.icon ? (
                                <Tooltip key={i}>
                                    <TooltipTrigger asChild>
                                        <div className="cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
                                            <i
                                                className={`${tech.icon} text-[12px]`}
                                            />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">
                                        <p className="text-xs">{tech.title}</p>
                                    </TooltipContent>
                                </Tooltip>
                            ) : null,
                        )}
                    </div>
                    <div className="group">
                        <Link
                            className="flex items-center gap-1 text-[12px] font-medium text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-colors cursor-pointer shrink-0"
                            href={project.liveLink || project.githubLink}
                            target="_blank"
                        >
                            View
                            <ArrowUpRight size={15} />
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default function Projects() {
    return (
        <section>
            <h1 className="text-[18px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight my-2 px-3">
                Projects
            </h1>
            <SeperatorInline />
            <div className="grid grid-cols-2 ">
                {PROJECTS.slice(0, 4).map((project, index) => (
                    <ProjectCard
                        key={index}
                        // @ts-ignore
                        project={project}
                        // @ts-ignore
                        isOdd={!index % 2}
                    />
                ))}
            </div>
            <SeperatorInline />
            <div className="flex items-center justify-center py-3">
                <SoftPillButton>See More</SoftPillButton>
            </div>
            <SeperatorInline />
        </section>
    );
}
