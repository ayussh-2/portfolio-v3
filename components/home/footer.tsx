export default function Footer() {
  return (
    <footer className="w-full px-5 py-6 text-xs text-zinc-500">
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        
        <p className="font-mono">
                     Built with Next.js & Tailwind CSS
                </p>

        <a
          href="https://github.com/ayussh-2/portfolio-v3"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          <i className="devicon-github-original text-sm" />
          <span className="font-mono">Source</span>
        </a>
      </div>
    </footer>
  );
}