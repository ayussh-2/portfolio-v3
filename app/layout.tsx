import "./styles/globals.css";

import type { Metadata } from "next";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { geistMono, geistSans } from "@/fonts";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CommandMenu } from "@/components/command-menu";
import { NavigationTracker } from "@/components/navigation-tracker";
import { ScrollToTop } from "@/components/scroll-to-top";

import { SEO_METADATA } from "@/config";

export const metadata: Metadata = SEO_METADATA;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <TooltipProvider>
            {children}
            <NavigationTracker />
            <CommandMenu />
            <ScrollToTop />
            <Toaster
              className="font-sans"
              style={{
                fontFamily: "var(--font-sans)",
              }}
            />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
