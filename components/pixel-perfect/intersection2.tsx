// const Intersection2 = ({ children }: { children: React.ReactNode }) => (
//     <div className="relative w-full flex justify-center">
//         <div className="relative w-full max-w-lg border-l border-r border-dashed border-black/10 dark:border-white/15">
//             <div className="absolute top-0 bottom-0 -left-8 w-8 -z-10 bg-[image:repeating-linear-gradient(315deg,var(--pattern-color)_0,var(--pattern-color)_1px,transparent_0,transparent_50%)] bg-[size:10px_10px] [--pattern-color:rgba(0,0,0,0.05)] dark:[--pattern-color:rgba(255,255,255,0.05)]" />

//             <div className="absolute top-0 bottom-0 -right-8 w-8 -z-10 bg-[image:repeating-linear-gradient(315deg,var(--pattern-color)_0,var(--pattern-color)_1px,transparent_0,transparent_50%)] bg-[size:10px_10px] [--pattern-color:rgba(0,0,0,0.05)] dark:[--pattern-color:rgba(255,255,255,0.05)]" />

//             {/* Content */}
//             <div>{children}</div>
//         </div>
//     </div>
// );

const Intersection2 = ({ children }: { children: React.ReactNode }) => (
    // 1. The container now acts as your primary "Main" wrapper
    <div className="relative w-full max-w-xl md:max-w-3xl mx-auto min-h-screen ">
        {/* Left Pattern Gutter */}
        <div className="hidden sm:block sm:absolute top-0 bottom-0 -left-8 w-8 -z-10 border-l border-r border-black/30 dark:border-white/15 border-dashed bg-[image:repeating-linear-gradient(315deg,var(--pattern-color)_0,var(--pattern-color)_1px,transparent_0,transparent_50%)] bg-[size:10px_10px] [--pattern-color:rgba(0,0,0,0.05)] dark:[--pattern-color:rgba(255,255,255,0.05)]" />

        {/* Right Pattern Gutter */}
        <div className="hidden sm:block sm:absolute top-0 bottom-0 -right-8 w-8 -z-10 border-l border-r border-dashed border-black/30 dark:border-white/15 bg-[image:repeating-linear-gradient(315deg,var(--pattern-color)_0,var(--pattern-color)_1px,transparent_0,transparent_50%)] bg-[size:10px_10px] [--pattern-color:rgba(0,0,0,0.05)] dark:[--pattern-color:rgba(255,255,255,0.05)]" />

        {/* Content Area */}
        <div className="flex flex-col">{children}</div>
    </div>
);
export default Intersection2;
