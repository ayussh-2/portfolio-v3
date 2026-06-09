import { HeaderControls } from "@/components/header-controls";
import { PROJECTS } from "@/config";
import { notFound } from "next/navigation";
import Intersection2 from "@/components/pixel-perfect/intersection2";
import { SeperatorInline } from "@/components/ui/seperator";
import { Safari } from "@/components/ui/safari";
import { Iphone } from "@/components/ui/iphone";
import { TechBadge } from "@/components/ui/tech-badge";
import SoftPillButton from "@/components/pixel-perfect/soft-pill-button";
import ProjectLiveDemoButton from "@/components/project-live-demo-button";
import { ViewTransition } from "react";

interface ProjectPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return PROJECTS.map((project) => ({
        slug: project.slug,
    }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = PROJECTS.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    const isMobile = project.deviceType === "mobile";

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
                    <div className="relative min-h-screen w-full overflow-visible  flex flex-col">
                        {/* Header Controls */}
                        <HeaderControls backText="Back" />

                        <SeperatorInline />

                        {/* Title & Short Desc */}
                        <div className="py-6 px-3">
                            <h1 className="text-[24px] sm:text-[28px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
                                {project.title}
                            </h1>
                            <p className="mt-2 text-sm sm:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                {project.shortDesc}
                            </p>
                        </div>

                        <SeperatorInline />

                        {/* Project Device Mockup Visual */}
                        <div className="py-8 flex justify-center items-center bg-zinc-50/50 dark:bg-zinc-950/20 border-l border-r border-dashed border-black/10 dark:border-white/10">
                            {isMobile ? (
                                <div className="w-48 sm:w-56 shadow-2xl rounded-4xl">
                                    <ViewTransition name={`project-mockup-${project.slug}`} share="morph">
                                        <Iphone src={project.image} />
                                    </ViewTransition>
                                </div>
                            ) : (
                                <div className="w-full max-w-lg shadow-5xl rounded-lg overflow-hidden px-2">
                                    <ViewTransition name={`project-mockup-${project.slug}`} share="morph">
                                        <Safari
                                            imageSrc={project.image}
                                            url={project.liveLink || project.githubLink}
                                        />
                                    </ViewTransition>
                                </div>
                            )}
                        </div>

                        <SeperatorInline />

                        {/* Action Links */}
                        <div className="py-6 flex items-center gap-3 px-3">
                            {project.githubLink && (
                                <SoftPillButton
                                    as="a"
                                    href={project.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variant="secondary"
                                    className="text-xs px-3.5 py-2 flex-1"
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <svg
                                            className="w-4 h-4"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                            <path d="M9 18c-4.51 2-5-2-7-2" />
                                        </svg>
                                        GitHub
                                    </div>
                                </SoftPillButton>
                            )}
                            <ProjectLiveDemoButton liveLink={project.liveLink} />
                        </div>

                        <SeperatorInline />

                        {/* Details / Description */}
                        <div className="py-6 flex-1 px-3">
                            <h2 className="text-[16px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight mb-3">
                                About the Project
                            </h2>
                            <p className="text-[14px] sm:text-[15px] text-zinc-600 dark:text-zinc-300 leading-relaxed">
                                {project.longDesc}
                            </p>

                            {/* Tech Stack */}
                            <div className="mt-8">
                                <h3 className="text-[14px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight mb-3">
                                    Technologies Used
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech, idx) => (
                                        <TechBadge
                                            key={idx}
                                            tech={tech.title}
                                            icon={tech.icon}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="h-12"></div>
                    </div>
                </Intersection2>
            </main>
        </ViewTransition>
    );
}
