"use client";
import About from "@/components/home/about";
import Banner from "@/components/home/banner";
import Experience from "@/components/home/experience";
import Hero from "@/components/home/hero";
import Projects from "@/components/home/projects";
import Github from "@/components/home/github";
import Intersection2 from "@/components/pixel-perfect/intersection2";
import { SeperatorInline } from "@/components/ui/seperator";
import { ViewTransition } from "react";
import Skills from "@/components/home/skills";
import Blogs, { HomePost } from "@/components/home/blogs";
import { BlurFade } from "@/components/ui/blur-fade";

interface HomeClientProps {
  posts: HomePost[];
}

export const BLUR_FADE_STEP = 0.14;
export default function HomeClient({ posts }: HomeClientProps) {
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
                  <SeperatorInline />
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
                  <Github />
                </div>
              </BlurFade>
              <SeperatorInline />
              <BlurFade delay={BLUR_FADE_STEP * 6}>
                <div id="skills">
                  <Skills />
                </div>
              </BlurFade>
            </div>
          </Intersection2>
        </main>
      </BlurFade>
    </ViewTransition>
  );
}
