"use client";
import About from "@/components/home/about";
import Banner from "@/components/home/banner";
import Experience from "@/components/home/experience";
import Hero from "@/components/home/hero";
import Projects from "@/components/home/projects";
import {
  GitHubContributions,
  GitHubContributionsFallback,
} from "@/components/github-contributions";
import type { Activity } from "@/components/contribution-graph";
import Intersection2 from "@/components/pixel-perfect/intersection2";
import { SeperatorInline } from "@/components/ui/seperator";
import { Suspense, ViewTransition } from "react";
import Skills from "@/components/home/skills";
import Blogs, { HomePost } from "@/components/home/blogs";
import { BlurFade } from "@/components/ui/blur-fade";
import { ContributionList } from "@/components/home/contribution";

interface HomeClientProps {
  posts: HomePost[];
  contributions: Promise<Activity[]>;
}

export const BLUR_FADE_STEP = 0.14;
export default function HomeClient({ posts, contributions }: HomeClientProps) {
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
            <div className="relative min-h-screen w-full overflow-visible">
              <BlurFade>
                <Banner />
                <Hero />
              </BlurFade>
              <SeperatorInline />
              <BlurFade delay={BLUR_FADE_STEP * 1}>
                <div id="about">
                  <About />
                </div>
              </BlurFade>
              <SeperatorInline />
              <BlurFade delay={BLUR_FADE_STEP * 2}>
                <div id="experience">
                  <Experience />
                </div>
              </BlurFade>
              <SeperatorInline />
              <BlurFade delay={BLUR_FADE_STEP * 3}>
                <div id="projects">
                  <Projects />
                </div>
              </BlurFade>
              <SeperatorInline />
              {posts.length > 0 && (
                <>
                  <BlurFade delay={BLUR_FADE_STEP * 4}>
                    <div id="blogs">
                      <Blogs posts={posts} />
                    </div>
                  </BlurFade>
                </>
              )}
              <SeperatorInline />
              <BlurFade delay={BLUR_FADE_STEP * 5}>
                <div id="contributions">
                  <section className="w-full">
                    <h1 className="text-[18px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight my-2 px-3">
                      Github Activity
                    </h1>
                    <SeperatorInline />
                    <div className="px-3 py-6 w-full flex flex-col gap-4">
                      <Suspense fallback={<GitHubContributionsFallback />}>
                        <GitHubContributions
                          contributions={contributions}
                          githubProfileUrl="https://github.com/ayussh-2"
                        />
                      </Suspense>
                    </div>
                  </section>
                </div>
              </BlurFade>
              <SeperatorInline />
              <BlurFade delay={BLUR_FADE_STEP * 6}>
                <div id="contributions">
                  <section className="w-full">
                    <h1 className="text-[18px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight my-2 px-3">
                      Contributions
                    </h1>
                    <SeperatorInline />
                    <ContributionList />
                  </section>
                </div>
              </BlurFade>
              <SeperatorInline />

              <BlurFade delay={BLUR_FADE_STEP * 7}>
                <div id="skills">
                  <Skills />{" "}
                </div>
              </BlurFade>
            </div>
          </Intersection2>
        </main>
      </BlurFade>
    </ViewTransition>
  );
}
