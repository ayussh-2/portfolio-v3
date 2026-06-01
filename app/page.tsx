import About from '@/components/home/about';
import Banner from '@/components/home/banner';
import Experience from '@/components/home/experience';
import Hero from '@/components/home/hero';
import Intersection2 from '@/components/pixel-perfect/intersection2';
import { SeperatorInline } from '@/components/ui/seperator';

export default function Home() {
    return (
        <main className="w-full md:max-w-xl mx-auto min-h-screen relative flex flex-col overflow-visible">
            <Intersection2>
                <Banner />
                <SeperatorInline />
                <Hero />
                <SeperatorInline />
                <About />
                <SeperatorInline />
                <Experience />
                <SeperatorInline />
            </Intersection2>
        </main>
    );
}
