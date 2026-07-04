"use client";

import { HeaderControls } from "@/components/header-controls";
import Intersection2 from "@/components/pixel-perfect/intersection2";
import { SeperatorInline } from "@/components/ui/seperator";
import { PROJECTS } from "@/config";
import { ProjectCard, getLayoutItems } from "@/components/home/projects";
import { ViewTransition } from "react";
import PageTitle from "@/components/page-title";
import { BlurFade } from "@/components/ui/blur-fade";

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
      <BlurFade>
        <main className="w-full md:max-w-xl mx-auto min-h-screen relative flex flex-col overflow-visible">
          <Intersection2>
            <div className="relative min-h-screen w-full overflow-visible flex flex-col">
              {/* Header Controls */}
              <HeaderControls />

              {/* <div className="flex items-center justify-between py-4 px-3">
                            <h1 className="text-[20px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                                Archive
                            </h1>
                        </div> */}

              {CATEGORIES.map((category) => {
                const categoryProjects = PROJECTS.filter((p) => {
                  return p.category === category.id;
                });

                if (categoryProjects.length === 0) return null;

                return (
                  <section key={category.id} className=" flex flex-col">
                    <PageTitle title={category.title} desc={category.desc} />
                    <div className="grid grid-cols-2 w-full ">
                      {getLayoutItems(categoryProjects).map(
                        ({ project, colSpanClass, borderClass }, idx) => (
                          <ProjectCard
                            key={project.slug}
                            project={project as any}
                            colSpanClass={colSpanClass}
                            borderClass={borderClass}
                          />
                        ),
                      )}
                    </div>
                  </section>
                );
              })}

              <SeperatorInline />
            </div>
          </Intersection2>
        </main>
      </BlurFade>
    </ViewTransition>
  );
}
