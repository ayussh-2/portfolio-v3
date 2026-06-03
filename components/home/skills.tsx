import { SeperatorInline } from "../ui/seperator";
import { TechBadge } from "../ui/tech-badge";
import { SKILLS } from "@/config";

export default function Skills() {
    return (
        <section className="w-full">
            <h1 className="text-[18px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight my-2 px-3">
                Skills
            </h1>
            <SeperatorInline />

            <div className="px-3 py-4 flex flex-wrap gap-2.5">
                {SKILLS.map((skill, index) => (
                    <TechBadge
                        key={index}
                        tech={skill.tech}
                        icon={skill.icon}
                    />
                ))}
            </div>
        </section>
    );
}
