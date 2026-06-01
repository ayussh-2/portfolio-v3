import { Command } from 'lucide-react';

import { ModeToggle } from '../toggle';
import { Button } from '../ui/button';
import { FlipWords } from '../ui/flip-words';

export default function Hero() {
    const words = [
        "Code, Food & Photos!",
        "Full Stack Builder",
        "Backend Engineer",
        "Community Builder",
    ];
    return (
        <section className="flex items-start justify-between w-full py-4 px-3">
            <div className="flex items-end justify-between gap-5">
                <div className="relative p-0.75 rounded-[6px] sm:rounded-[8px] border-[1.5px] border-black/30 dark:border-white/15 shrink-0">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-[3px] sm:rounded-[5px] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                        <img
                            src="https://github.com/ayussh-2.png"
                            alt="Profile"
                            className="w-full h-full object-cover grayscale opacity-90 contrast-100 mix-blend-multiply dark:mix-blend-normal"
                        />
                    </div>
                </div>

                <div>
                    <h1 className="text-[20px] sm:text-[24px] font-bold text-zinc-800 dark:text-zinc-100 tracking-tight leading-none mb-0.5">
                        Ayush
                    </h1>

                    <div className="font-sans text-sm  -ml-2">
                        <FlipWords
                            words={words}
                            className="text-black/80 dark:text-white/80"
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between gap-2">
                <Button
                    variant={"outline"}
                    size={"sm"}
                    className="opacity-80 hover:opacity-100"
                >
                    <Command /> K
                </Button>

                <ModeToggle />
            </div>
        </section>
    );
}
