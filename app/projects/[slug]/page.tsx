import { HeaderControls } from "@/components/header-controls";
import { PROJECTS } from "@/config";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import Intersection2 from "@/components/pixel-perfect/intersection2";
import { SeperatorInline } from "@/components/ui/seperator";
import { Safari } from "@/components/ui/safari";
import { Iphone } from "@/components/ui/iphone";
import { TechBadge } from "@/components/ui/tech-badge";
import SoftPillButton from "@/components/pixel-perfect/soft-pill-button";

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
                                <Iphone src={project.image} />
                            </div>
                        ) : (
                            <div className="w-full max-w-md shadow-2xl rounded-lg overflow-hidden">
                                <Safari
                                    imageSrc={project.image}
                                    url={project.liveLink || project.githubLink}
                                />
                            </div>
                        )}
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

                    <SeperatorInline />

                    {/* Action Links Footer */}
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
                                    <i className="devicon-github-original text-[14px]" />{" "}
                                    Repository
                                </div>
                            </SoftPillButton>
                        )}
                        {project.liveLink && (
                            <SoftPillButton
                                as="a"
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="primary"
                                className="text-xs px-3.5 py-2 flex-1"
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <ExternalLink size={14} /> Live Demo
                                </div>
                            </SoftPillButton>
                        )}
                    </div>

                    <div className="h-12"></div>
                </div>
            </Intersection2>
        </main>
    );
}
