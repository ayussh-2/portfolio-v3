"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function NavigationTracker() {
    const pathname = usePathname();

    // Listen to scroll events and save scroll position per path
    useEffect(() => {
        const handleScroll = () => {
            if (typeof window !== "undefined") {
                sessionStorage.setItem("scroll_pos_" + window.location.pathname, window.scrollY.toString());
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const historyStr = sessionStorage.getItem("nav_history");
            let history: string[] = historyStr ? JSON.parse(historyStr) : [];
            
            // Record new history, preventing duplicate consecutive tracks
            if (history.length === 0 || history[history.length - 1] !== pathname) {
                history.push(pathname);
                if (history.length > 20) {
                    history.shift();
                }
                sessionStorage.setItem("nav_history", JSON.stringify(history));
            }

            // Restore scroll position for the current path
            const savedScroll = sessionStorage.getItem("scroll_pos_" + pathname);
            if (savedScroll) {
                const scrollY = parseInt(savedScroll, 10);
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        window.scrollTo({
                            top: scrollY,
                            behavior: "auto"
                        });
                    }, 30);
                });
            } else {
                // Default to top if no scroll history
                window.scrollTo(0, 0);
            }
        }
    }, [pathname]);

    return null;
}
