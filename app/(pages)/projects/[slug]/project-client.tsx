"use client";

import { HeaderControls } from "@/components/header-controls";
import Intersection2 from "@/components/pixel-perfect/intersection2";
import { SeperatorInline } from "@/components/ui/seperator";
import { Safari } from "@/components/ui/safari";
import { Iphone } from "@/components/ui/iphone";
import { TechBadge } from "@/components/ui/tech-badge";
import SoftPillButton from "@/components/pixel-perfect/soft-pill-button";
import ProjectLiveDemoButton from "@/components/project-live-demo-button";
import { ViewTransition } from "react";
import type { Project } from "@/config/projects";
import { Button } from "@/components/ui/button";
import { handleRedirect } from "@/config";

interface ProjectClientProps {
  project: Project;
}

export default function ProjectClient({ project }: ProjectClientProps) {
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
                <div className="w-48 sm:w-56 rounded-4xl">
                  <ViewTransition
                    name={`project-mockup-${project.slug}`}
                    share="morph"
                  >
                    <Iphone src={project.image} />
                  </ViewTransition>
                </div>
              ) : (
                <div className="w-full max-w-lg rounded-lg overflow-hidden px-2">
                  <ViewTransition
                    name={`project-mockup-${project.slug}`}
                    share="morph"
                  >
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
            <div className="grid grid-cols-2">
              {project.githubLink && (
                <Button
                  onClick={() => handleRedirect(project.githubLink)}
                  variant="ghost"
                  className="text-sm px-3.5 py-2 flex-1 h-14!   border-black/10 dark:border-white/10 border-dashed border-r-muted-foreground rounded-none!"
                >
                  <div className="flex items-center justify-center gap-2">
                    <i className="devicon-github-original text-[20px]" />
                    GitHub
                  </div>
                </Button>
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
                    <TechBadge key={idx} tech={tech.title} icon={tech.icon} />
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
