"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { PROJECTS } from "@/config";
import { FileText, Home, Folder, User, Briefcase, GitBranch, Code2, BookOpen } from "lucide-react";

export function CommandMenu() {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        const handleToggle = () => {
            setOpen((open) => !open);
        };

        document.addEventListener("keydown", down);
        window.addEventListener("toggle-command-menu", handleToggle);

        return () => {
            document.removeEventListener("keydown", down);
            window.removeEventListener("toggle-command-menu", handleToggle);
        };
    }, []);

    const runCommand = React.useCallback((command: () => void) => {
        setOpen(false);
        command();
    }, []);

    const navigateToSection = React.useCallback((sectionId: string) => {
        setOpen(false);
        if (window.location.pathname === "/") {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
                return;
            }
        }
        router.push(`/#${sectionId}`);
    }, [router]);

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <Command>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList className="border-t border-black/10 dark:border-white/15 mt-1">
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        <CommandItem
                            onSelect={() => runCommand(() => router.push("/"))}
                            className="cursor-pointer"
                        >
                            <Home className="mr-2 h-4 w-4 opacity-70" />
                            <span>Home</span>
                        </CommandItem>
                        <CommandItem
                            onSelect={() => runCommand(() => router.push("/projects"))}
                            className="cursor-pointer"
                        >
                            <Folder className="mr-2 h-4 w-4 opacity-70" />
                            <span>Projects Archive</span>
                        </CommandItem>
                        <CommandItem
                            onSelect={() => runCommand(() => router.push("/blog"))}
                            className="cursor-pointer"
                        >
                            <BookOpen className="mr-2 h-4 w-4 opacity-70" />
                            <span>Blog</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Go To">
                        <CommandItem
                            onSelect={() => navigateToSection("about")}
                            className="cursor-pointer"
                        >
                            <User className="mr-2 h-4 w-4 opacity-70" />
                            <span>About</span>
                        </CommandItem>
                        <CommandItem
                            onSelect={() => navigateToSection("experience")}
                            className="cursor-pointer"
                        >
                            <Briefcase className="mr-2 h-4 w-4 opacity-70" />
                            <span>Experience</span>
                        </CommandItem>
                        <CommandItem
                            onSelect={() => navigateToSection("projects")}
                            className="cursor-pointer"
                        >
                            <Folder className="mr-2 h-4 w-4 opacity-70" />
                            <span>Projects</span>
                        </CommandItem>
                        <CommandItem
                            onSelect={() => navigateToSection("contributions")}
                            className="cursor-pointer"
                        >
                            <GitBranch className="mr-2 h-4 w-4 opacity-70" />
                            <span>Contributions</span>
                        </CommandItem>
                        <CommandItem
                            onSelect={() => navigateToSection("skills")}
                            className="cursor-pointer"
                        >
                            <Code2 className="mr-2 h-4 w-4 opacity-70" />
                            <span>Skills</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Projects">
                        {PROJECTS.map((project) => (
                            <CommandItem
                                key={project.slug}
                                value={project.title}
                                onSelect={() =>
                                    runCommand(() =>
                                        router.push(`/projects/${project.slug}`)
                                    )
                                }
                                className="cursor-pointer"
                            >
                                <FileText className="mr-2 h-4 w-4 opacity-70" />
                                <span>{project.title}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>
        </CommandDialog>
    );
}
