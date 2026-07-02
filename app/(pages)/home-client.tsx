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
import Footer from "@/components/home/footer";

interface HomeClientProps {
  posts: HomePost[];
}

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
      <main className="w-full md:max-w-xl mx-auto min-h-screen relative flex flex-col overflow-visible">
        <Intersection2>
          <div className="relative min-h-screen w-full overflow-visible">
            <Banner />
            <SeperatorInline />
            <Hero />
            <SeperatorInline />
            <div id="about">
              <About />
            </div>
            <SeperatorInline />
            <div id="experience">
              <Experience />
            </div>
            <SeperatorInline />
            <div id="projects">
              <Projects />
            </div>
            <SeperatorInline />
            <div id="contributions">
              <Github />
            </div>
            <SeperatorInline />
            <div id="skills">
              <Skills />
            </div>
            {posts.length > 0 && (
              <>
                <SeperatorInline />
                <div id="blogs">
                  <Blogs posts={posts} />
                </div>
              </>
            )}
            <SeperatorInline />
            <Footer />
          </div>
        </Intersection2>
      </main>
    </ViewTransition>
  );
}
