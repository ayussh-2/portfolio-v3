"use client";
import {
  Moon,
  Sun,
} from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ModeToggle() {
    const { setTheme, theme } = useTheme();
    function handleClick() {
        if (theme == "light") setTheme("dark");
        else setTheme("light");
    }
    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={handleClick}
            className="opacity-80 hover:opacity-100"
        >
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
