"use client";

import { File, Mail } from "lucide-react";
import { useTheme } from "next-themes";

import {
    about,
    handleRedirect,
    MAIL,
    RESUME,
    SOCIALS,
    subHeading,
} from "@/config";

import SoftPillButton from "../pixel-perfect/soft-pill-button";

export default function About({ iconColor }: { iconColor: string }) {
    return (
        <section className="px-3 text-sm sm:text-base text-zinc-700 dark:text-zinc-200">
            <div>
                <p className="para">{subHeading}</p>

                <ul className="mt-4  text-zinc-600 dark:text-zinc-300 pl-8 para">
                    {about.map((abt, index) => (
                        <li key={index} className="flex gap-2">
                            <span>•</span>
                            {abt}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex items-center gap-2 mt-5">
                <SoftPillButton
                    variant={"secondary"}
                    className="text-xs px-3 py-2"
                    onClick={() => handleRedirect(RESUME)}
                >
                    <div className="flex items-center gap-1">
                        <File size={12} /> Resume
                    </div>
                </SoftPillButton>
                <SoftPillButton
                    variant={"primary"}
                    className="text-xs  px-3 py-2"
                    onClick={() => handleRedirect(MAIL)}
                >
                    <div className="flex items-center gap-1">
                        <Mail size={12} /> Send an email ?
                    </div>
                </SoftPillButton>
            </div>

            <div className="mb-5">
                <p className="para ">
                    <span className="opacity-80">Here are my </span>
                    <span className="dark:text-white opacity-100">socials</span>
                </p>
                <div className="flex items-center gap-2 mt-5">
                    {SOCIALS.map(({ id, Icon, link, title }) => (
                        <SoftPillButton
                            key={id}
                            id={id}
                            onClick={() => handleRedirect(link)}
                            className="text-xs  px-3 py-2"
                        >
                            <div className="flex items-center gap-2">
                                <Icon color={iconColor} size={15} />
                                {title}
                            </div>
                        </SoftPillButton>
                    ))}
                </div>
            </div>
        </section>
    );
}
