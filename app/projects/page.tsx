"use client";

import { HeaderControls } from "@/components/header-controls";
import Intersection2 from "@/components/pixel-perfect/intersection2";
import { SeperatorInline } from "@/components/ui/seperator";
import { PROJECTS } from "@/config";
import { ProjectCard, getLayoutItems } from "@/components/home/projects";
import { ViewTransition } from "react";

const CATEGORIES = [
    {
        id: "personal",
        title: "Personal Projects",
        desc: "Independent tools, applications, and experiments.",
    },
    {
        id: "hackathons",
        title: "Hackathons",
        desc: "Fast-paced builds from regional and global hackathons.",
    },
    {
        id: "community",
        title: "Community Projects",
        desc: "Collaborations and contributions to open communities.",
    },
] as const;

export default function ProjectsPage() {
    return (
        <ViewTransition
            enter={{
                "nav-forward": "nav-forward",
                "nav-back": "nav-back",
                default: "none",
            }}
            exit={{
                "nav-forward": "nav-forward",
                "nav-back": "nav-back",
                default: "none",
            }}
            default="none"
        >
            <main className="w-full md:max-w-xl mx-auto min-h-screen relative flex flex-col overflow-visible">
                <Intersection2>
                    <div className="relative min-h-screen w-full overflow-visible flex flex-col">
                        {/* Header Controls */}
                        <HeaderControls />

                        <div className="flex items-center justify-between py-4 px-3">
                            <h1 className="text-[20px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                                Archive
                            </h1>
                        </div>

                        {CATEGORIES.map((category) => {
                            const categoryProjects = PROJECTS.filter((p) => {
                                return p.category === category.id;
                            });

                            if (categoryProjects.length === 0) return null;

                            return (
                                <section
                                    key={category.id}
                                    className=" flex flex-col"
                                >
                                    <SeperatorInline />
                                    <div className="py-4 px-3">
                                        <h2 className="text-[16px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                                            {category.title}
                                        </h2>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                            {category.desc}
                                        </p>
                                    </div>
                                    <SeperatorInline />
                                    <div className="grid grid-cols-2 w-full border-l border-r border-black/30 dark:border-white/15 border-dashed">
                                        {getLayoutItems(categoryProjects).map(({ project, colSpanClass, borderClass }, idx) => (
                                            <ProjectCard
                                                key={project.slug}
                                                project={project as any}
                                                colSpanClass={colSpanClass}
                                                borderClass={borderClass}
                                            />
                                        ))}
                                    </div>
                                </section>
                            );
                        })}

                        <SeperatorInline />

                        
                    </div>
                </Intersection2>
            </main>
        </ViewTransition>
    );
}
