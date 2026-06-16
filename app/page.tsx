"use client";
import About from "@/components/home/about";
import Banner from "@/components/home/banner";
import Experience from "@/components/home/experience";
import Hero from "@/components/home/hero";
import Projects from "@/components/home/projects";
import Github from "@/components/home/github";
import Intersection2 from "@/components/pixel-perfect/intersection2";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { SeperatorInline } from "@/components/ui/seperator";
import { useTheme } from "next-themes";
import { useState, useEffect, ViewTransition } from "react";
import Skills from "@/components/home/skills";
import Footer from "@/components/home/footer";

export default function Home() {
    const { theme } = useTheme();
    const [color, setColor] = useState("");
    useEffect(() => {
        if (theme == "dark") setColor("#d4d4d8");
        else setColor("#3f3f46");
    }, [theme]);
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
                        {/* <ProgressiveBlur height="70px" position="top" /> */}

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
                        <SeperatorInline />
                        <Footer />
                        {/* <div className="h-10"></div>
                        <ProgressiveBlur height="30px" position="bottom" /> */}
                    </div>
                </Intersection2>
            </main>
        </ViewTransition>
    );
}
