import {
  File,
  Mail,
} from 'lucide-react';

import SoftPillButton from '../pixel-perfect/soft-pill-button';

export default function About() {
    return (
        <section className="px-3 text-sm sm:text-base text-zinc-700 dark:text-zinc-200">
            <div>
                <p className="para">
                    Engineer. I build full-stack systems and developer tools.
                </p>

                <ul className="mt-4  text-zinc-600 dark:text-zinc-300 list-disc pl-10 para">
                    <li>
                        B.Tech, Civil Engineering at NIT Rourkela (2023-2027).
                    </li>
                    <li>
                        Interned at Soundpark, ScanKart AI, and Pariksit Inc,
                        shipping backend and product features.
                    </li>
                    <li>
                        Lead organizer for GDG on Campus NITR and HackNITR 7.0.
                    </li>
                </ul>
            </div>

            <div className="flex items-center gap-2 mt-5">
                <SoftPillButton
                    variant={"secondary"}
                    className="text-xs px-3 py-2"
                >
                    <div className="flex items-center gap-1">
                        <File size={12} /> Resume
                    </div>
                </SoftPillButton>
                <SoftPillButton
                    variant={"primary"}
                    className="text-xs  px-3 py-2"
                >
                    <div className="flex items-center gap-1">
                        <Mail size={12} /> Send an email ?
                    </div>
                </SoftPillButton>
            </div>
        </section>
    );
}
