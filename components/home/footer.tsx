import { useEffect, useState } from "react";

export default function Footer() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const currentYear = mounted ? new Date().getFullYear() : 2026;

    return (
        <footer className="w-full px-3 py-6 font-mono text-[10px] sm:text-[11px] text-zinc-400/80 dark:text-zinc-500/80 flex flex-col sm:flex-row items-center justify-between gap-3 select-none">
            <div className="flex items-center gap-1.5">
                <span>© {currentYear} Ayush •</span>
                <a
                    href="https://github.com/ayussh-2/portfolio-v3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                >
                    GitHub
                </a>
            </div>

            <div className="flex items-center gap-1">
                <span>Inspired by</span>
                <a
                    href="https://portfolio-v2-koxw.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                >
                    this AWESOME portfolio
                </a>
            </div>
        </footer>
    );
}
