import About from '@/components/home/about';
import Banner from '@/components/home/banner';
import Hero from '@/components/home/hero';
import { SeperatorInline } from '@/components/ui/seperator';

export default function Home() {
    return (
        <main className="max-w-xl mx-auto min-h-screen relative flex flex-col overflow-visible border-l border-r border-black/30 dark:border-white/[0.15]">
            <Banner />
            <SeperatorInline />
            <Hero />
            <SeperatorInline />
            <About />
        </main>
    );
}
