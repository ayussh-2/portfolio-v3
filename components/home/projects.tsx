"use client";

import { useState, ViewTransition } from "react";
import { Card, CardContent } from "../ui/card";
import { SeperatorInline } from "../ui/seperator";
import { motion } from "motion/react";
import SoftPillButton from "../pixel-perfect/soft-pill-button";
import { ArrowUpRight, Play } from "lucide-react";
import { Safari } from "@/components/ui/safari";
import { Iphone } from "@/components/ui/iphone";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

import Link from "next/link";
import { COMMUNITY, HACKATHONS, PERSONAL } from "@/config";

interface ProjectDetail {
  image: string;
  title: string;
  slug: string;
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
  colSpanClass = "col-span-1 max-w-sm",
  borderClass = "",
  className = "",
}: {
  project: ProjectDetail;
  colSpanClass?: string;
  borderClass?: string;
  className?: string;
}) {
  const isMobile = project.deviceType === "mobile";

  return (
    <Card
      className={`w-full ${colSpanClass} rounded-none ${borderClass} border-black/30 dark:border-white/15 border-dashed dark:bg-[#0a0a0a] bg-white ring-0 px-3 h-full flex flex-col relative ${className}`}
    >
      <Link
        href={`/projects/${project.slug}`}
        transitionTypes={["nav-forward"]}
        className="absolute inset-0 z-30 sm:hidden"
      />

      <div className="relative w-full flex flex-col ">
        <motion.div
          className={`relative border-0 overflow-hidden rounded-t-xl flex items-center justify-center w-full ${isMobile ? "aspect-[433/882] py-4 md:aspect-auto md:h-[260px] md:py-3" : "aspect-[1203/753]"}`}
          initial="initial"
          whileHover="hover"
        >
          {isMobile ? (
            <div className="w-[85%] md:w-[45%] md:max-w-[125px] rounded-4xl">
              <ViewTransition
                name={`project-mockup-${project.slug}`}
                share="morph"
              >
                <Iphone src={project.image} />
              </ViewTransition>
            </div>
          ) : (
            <div className="w-full dark:shadow-2xl">
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

          {/* <motion.div
                            className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-20"
                            variants={{
                                initial: { opacity: 0 },
                                hover: {
                                    opacity: 1,
                                    transition: { delay: 0.1, duration: 0.2 },
                                },
                            }}
                        >
                            <Link href={`/projects/${project.slug}`} transitionTypes={['nav-forward']}>
                                <SoftPillButton
                                    variant="primary"
                                    className="text-xs px-3 py-2"
                                >
                                    <Play size={15} />
                                </SoftPillButton>
                            </Link>
                        </motion.div> */}
        </motion.div>
      </div>

      <CardContent className="pt-4 flex-1 flex flex-col justify-between pb-4">
        <div>
          <h2 className="text-[15px] font-bold text-zinc-900 dark:text-zinc-100">
            {project.title}
          </h2>
          <p className="mt-1.5 text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed pr-2">
            {project.shortDesc}
          </p>
        </div>
        <div className="flex items-end justify-between mt-auto pt-4">
          <div className="flex items-end justify-between mt-auto pt-4">
            {/* Replaced space-x-2 with gap-2 for better flexbox spacing */}
            <div className="flex gap-2">
              {project.techStack
                .filter((tech) => !!tech.icon)
                .slice(0, 5)
                .map((tech, i) => (
                  <Tooltip key={i}>
                    <TooltipTrigger asChild>
                      <div
                        className={`cursor-pointer opacity-50 hover:opacity-100 transition-opacity ${
                          i >= 3 ? "hidden sm:block" : ""
                        }`}
                      >
                        <i
                          className={`${tech.icon} text-[20px] md:text-[14px]`}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p className="text-xs">{tech.title}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
            </div>
          </div>
          <div className="group">
            <Link
              className="flex items-center gap-1 text-[12px] font-medium text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-colors cursor-pointer shrink-0"
              href={`/projects/${project.slug}`}
              transitionTypes={["nav-forward"]}
            >
              Details
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function getLayoutItems(projects: any[]): {
  project: any;
  colSpanClass: string;
  borderClass: string;
}[] {
  let currentColMobile = 0;
  const mobileLayout = projects.map((project) => {
    const isMobile = project.deviceType === "mobile";
    const colSpan = isMobile ? 1 : 2;
    if (colSpan === 2 && currentColMobile === 1) {
      currentColMobile = 0;
    }
    const colIndex = currentColMobile;
    currentColMobile = (currentColMobile + colSpan) % 2;
    return { colSpan, colIndex };
  });

  const mobileRows: number[][] = [];
  let currentMobileRow: number[] = [];
  let mobileOccupied = 0;
  mobileLayout.forEach((item, index) => {
    if (item.colSpan === 2) {
      if (mobileOccupied === 1) {
        mobileRows.push(currentMobileRow);
        currentMobileRow = [];
        mobileOccupied = 0;
      }
      currentMobileRow.push(index);
      mobileRows.push(currentMobileRow);
      currentMobileRow = [];
      mobileOccupied = 0;
    } else {
      currentMobileRow.push(index);
      mobileOccupied++;
      if (mobileOccupied === 2) {
        mobileRows.push(currentMobileRow);
        currentMobileRow = [];
        mobileOccupied = 0;
      }
    }
  });
  if (currentMobileRow.length > 0) {
    mobileRows.push(currentMobileRow);
  }
  const mobileLastRow = new Set(mobileRows[mobileRows.length - 1] || []);

  const desktopLayout = projects.map((_, index) => {
    return {
      colSpan: 1,
      colIndex: index % 2,
    };
  });
  const desktopLastRowStart =
    projects.length - (projects.length % 2 === 0 ? 2 : 1);

  return projects.map((project, index) => {
    const mob = mobileLayout[index];
    const desk = desktopLayout[index];
    const isMobile = project.deviceType === "mobile";

    const colSpanClass = isMobile
      ? "col-span-1 max-w-sm"
      : "col-span-2 md:col-span-1 max-w-none md:max-w-sm";

    const mobBorderR = mob.colIndex === 0 && mob.colSpan === 1;
    const deskBorderR = desk.colIndex === 0;

    let verticalBorderClass = "";
    if (mobBorderR && deskBorderR) {
      verticalBorderClass = "border-r";
    } else if (mobBorderR) {
      verticalBorderClass = "border-r md:border-r-0";
    } else if (deskBorderR) {
      verticalBorderClass = "border-none md:border-r";
    } else {
      verticalBorderClass = "border-none";
    }

    const mobBorderB = !mobileLastRow.has(index);
    const deskBorderB = index < desktopLastRowStart;

    let horizontalBorderClass = "";
    if (mobBorderB && deskBorderB) {
      horizontalBorderClass = "border-b";
    } else if (mobBorderB) {
      horizontalBorderClass = "border-b md:border-b-0";
    } else if (deskBorderB) {
      horizontalBorderClass = "border-b-0 md:border-b";
    } else {
      horizontalBorderClass = "border-b-0";
    }

    return {
      project,
      colSpanClass,
      borderClass: `${verticalBorderClass} ${horizontalBorderClass}`,
    };
  });
}

export default function Projects() {
  const homeProjects = [
    ...PERSONAL.slice(0, 2),
    ...HACKATHONS.slice(0, 1),
    ...COMMUNITY.slice(0, 1),
  ];
  const layoutItems = getLayoutItems(homeProjects);

  return (
    <section>
      <h1 className="text-[18px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight my-2 px-3">
        Projects
      </h1>
      <SeperatorInline />
      <div className="grid grid-cols-2 border-l border-r border-black/30 dark:border-white/15 border-dashed">
        {layoutItems.map(({ project, colSpanClass, borderClass }, index) => (
          <ProjectCard
            key={index}
            // @ts-ignore
            project={project}
            colSpanClass={colSpanClass}
            borderClass={borderClass}
          />
        ))}
      </div>
      <SeperatorInline />
      <div className="flex items-center justify-center py-3">
        <Link href="/projects" transitionTypes={["nav-forward"]}>
          <SoftPillButton as="div">See More</SoftPillButton>
        </Link>
      </div>
    </section>
  );
}
