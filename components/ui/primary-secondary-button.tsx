import React, * as React from 'react';

import {
  cva,
  type VariantProps,
} from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

type Variant = "primary" | "secondary";

interface PrimarySecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
    variant?: Variant;
}

const baseClassName =
    "group relative block rounded-[4px] text-center text-[13px] font-medium tracking-tight transition-[transform] duration-200 active:scale-[0.99] active:duration-[50ms] [backdrop-filter:blur(6px)] px-3 py-1.5 !text-[12px]";

const variantClassName: Record<Variant, string> = {
    secondary: "text-neutral-900 dark:text-neutral-300",
    primary: "text-neutral-50 dark:text-neutral-950",
};

const layerClassName: Record<Variant, string> = {
    secondary:
        "absolute inset-0 rounded-[4px] overflow-hidden transition-colors duration-200 group-active:duration-[50ms] bg-white/90 dark:bg-[#0c0c0e] group-hover:dark:bg-[#121214] border border-black/5 dark:border-white/5 group-hover:border-black/10 dark:group-hover:border-white/10",
    primary:
        "absolute inset-0 rounded-[4px] overflow-hidden transition-colors duration-200 group-active:duration-[50ms] bg-[#18181b] group-hover:bg-[#27272a] dark:bg-white dark:group-hover:bg-neutral-100 border border-black/10 dark:border-white/10",
};

const PrimarySecondaryButton = React.forwardRef<
    HTMLButtonElement,
    PrimarySecondaryButtonProps
>(
    (
        { className, variant = "primary", asChild = false, children, ...props },
        ref,
    ) => {
        const Comp = asChild ? Slot : "button";
        const isSecondary = variant === "secondary";

        return (
            <Comp
                ref={ref}
                data-variant={variant}
                className={cn(
                    baseClassName,
                    variantClassName[variant],
                    className,
                )}
                {...props}
            >
                <span aria-hidden="true" className={layerClassName[variant]}>
                    {isSecondary ? (
                        <>
                            <span className="absolute inset-0 rounded-[4px] transition duration-200 bg-black/[0.02] dark:bg-transparent group-hover:bg-transparent dark:group-hover:bg-white/[0.02] group-active:bg-black/[0.04] dark:group-active:bg-white/[0.04] group-active:duration-[50ms]" />
                            <span
                                className="absolute inset-0 transition duration-200 group-active:opacity-0 group-active:duration-[50ms] opacity-[0.16] dark:opacity-[0.04]"
                                style={{
                                    background:
                                        "linear-gradient(rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%)",
                                }}
                            />
                            <span
                                className="absolute inset-0 transition duration-200 group-active:duration-[50ms] opacity-[0.04] dark:opacity-[0.1]"
                                style={{
                                    background:
                                        "radial-gradient(65.62% 65.62% at 50% 100%, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)",
                                }}
                            />
                            <span
                                className="absolute inset-0 transition duration-200 group-active:opacity-0 group-active:duration-[50ms] opacity-[0.4] dark:opacity-[0.04]"
                                style={{
                                    background:
                                        "linear-gradient(99deg, rgba(255, 255, 255, 0) 27.7%, rgba(255, 255, 255, 0.12) 60.19%, rgba(255, 255, 255, 0) 86.06%)",
                                }}
                            />
                            <span
                                aria-hidden="true"
                                className="absolute inset-0 rounded-[4px] p-px hidden"
                                style={{
                                    background:
                                        "linear-gradient(transparent 0%, rgb(255, 255, 255) 55%, transparent 80%, rgb(255, 255, 255) 95%)",
                                    WebkitMask:
                                        "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                                    WebkitMaskComposite: "xor",
                                    maskComposite: "exclude",
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <span
                                className="absolute inset-0 transition duration-200 group-active:opacity-0 group-active:duration-[50ms] opacity-[0.12]"
                                style={{
                                    background:
                                        "linear-gradient(rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%)",
                                }}
                            />
                            <span
                                className="absolute inset-0 transition duration-200 group-active:duration-[50ms] opacity-[0.32]"
                                style={{
                                    background:
                                        "radial-gradient(65.62% 65.62% at 50% 100%, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)",
                                }}
                            />
                            <span
                                aria-hidden="true"
                                className="absolute inset-0 rounded-[4px] p-px opacity-[0.24]"
                                style={{
                                    background:
                                        "linear-gradient(rgb(255, 255, 255) 0%, rgb(153, 153, 153) 55%, rgb(255, 255, 255) 80%, rgb(153, 153, 153) 95%)",
                                    WebkitMask:
                                        "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                                    WebkitMaskComposite: "xor",
                                    maskComposite: "exclude",
                                }}
                            />
                        </>
                    )}
                </span>
                <span className="relative">
                    <div
                        className={cn(
                            "flex items-center gap-1.5",
                            isSecondary &&
                                "opacity-70 group-hover:opacity-100 transition-opacity duration-300",
                        )}
                    >
                        {children}
                    </div>
                </span>
            </Comp>
        );
    },
);

PrimarySecondaryButton.displayName = "PrimarySecondaryButton";

function PrimaryButton(props: Omit<PrimarySecondaryButtonProps, "variant">) {
    return <PrimarySecondaryButton variant="primary" {...props} />;
}

function SecondaryButton(props: Omit<PrimarySecondaryButtonProps, "variant">) {
    return <PrimarySecondaryButton variant="secondary" {...props} />;
}

const primarySecondaryButtonVariants = cva(
    "group relative inline-flex items-center justify-center rounded-[4px] text-center text-[13px] font-medium tracking-tight transition-[transform] duration-200 active:scale-[0.99] active:duration-[50ms] [backdrop-filter:blur(6px)] px-3 py-1.5 !text-[12px]",
    {
        variants: {
            variant: {
                primary: "text-neutral-900 dark:text-neutral-300",
                secondary: "text-neutral-50 dark:text-neutral-950",
            },
        },
        defaultVariants: {
            variant: "primary",
        },
    },
);

const overlayBase =
    "absolute inset-0 rounded-[4px] overflow-hidden transition-colors duration-200 group-active:duration-[50ms]";

const primaryOverlay = cn(
    overlayBase,
    "bg-white/90 dark:bg-[#0c0c0e] group-hover:dark:bg-[#121214] border border-black/5 dark:border-white/5 group-hover:border-black/10 dark:group-hover:border-white/10",
);

const secondaryOverlay = cn(
    overlayBase,
    "bg-[#18181b] group-hover:bg-[#27272a] dark:bg-white dark:group-hover:bg-neutral-100 border border-black/10 dark:border-white/10",
);

const primaryMaskStyle: React.CSSProperties = {
    background:
        "linear-gradient(transparent 0%, rgb(255, 255, 255) 55%, transparent 80%, rgb(255, 255, 255) 95%)",
    WebkitMask:
        "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
};

const secondaryMaskStyle: React.CSSProperties = {
    background:
        "linear-gradient(rgb(255, 255, 255) 0%, rgb(153, 153, 153) 55%, rgb(255, 255, 255) 80%, rgb(153, 153, 153) 95%)",
    WebkitMask:
        "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
};

interface PrimarySecondaryButtonProps
    extends
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof primarySecondaryButtonVariants> {
    asChild?: boolean;
}

const PrimarySecondaryButton = React.forwardRef<
    HTMLButtonElement,
    PrimarySecondaryButtonProps
>(({ className, variant, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const isPrimary = variant === "primary" || !variant;

    return (
        <Comp
            ref={ref}
            className={cn(
                primarySecondaryButtonVariants({ variant, className }),
            )}
            {...props}
        >
            <span
                aria-hidden="true"
                className={isPrimary ? primaryOverlay : secondaryOverlay}
            >
                {isPrimary ? (
                    <>
                        <span className="absolute inset-0 rounded-[4px] transition duration-200 bg-black/[0.02] dark:bg-transparent group-hover:bg-transparent dark:group-hover:bg-white/[0.02] group-active:bg-black/[0.04] dark:group-active:bg-white/[0.04] group-active:duration-[50ms]"></span>
                        <span
                            className="absolute inset-0 transition duration-200 group-active:opacity-0 group-active:duration-[50ms] opacity-[0.16] dark:opacity-[0.04]"
                            style={{
                                background:
                                    "linear-gradient(rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%)",
                            }}
                        ></span>
                        <span
                            className="absolute inset-0 transition duration-200 group-active:duration-[50ms] opacity-[0.04] dark:opacity-[0.1]"
                            style={{
                                background:
                                    "radial-gradient(65.62% 65.62% at 50% 100%, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)",
                            }}
                        ></span>
                        <span
                            className="absolute inset-0 transition duration-200 group-active:opacity-0 group-active:duration-[50ms] opacity-[0.4] dark:opacity-[0.04]"
                            style={{
                                background:
                                    "linear-gradient(99deg, rgba(255, 255, 255, 0) 27.7%, rgba(255, 255, 255, 0.12) 60.19%, rgba(255, 255, 255, 0) 86.06%)",
                            }}
                        ></span>
                        <span
                            aria-hidden="true"
                            className="absolute inset-0 rounded-[4px] p-px hidden"
                            style={primaryMaskStyle}
                        ></span>
                    </>
                ) : (
                    <>
                        <span
                            className="absolute inset-0 transition duration-200 group-active:opacity-0 group-active:duration-[50ms] opacity-[0.12]"
                            style={{
                                background:
                                    "linear-gradient(rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%)",
                            }}
                        ></span>
                        <span
                            className="absolute inset-0 transition duration-200 group-active:duration-[50ms] opacity-[0.32]"
                            style={{
                                background:
                                    "radial-gradient(65.62% 65.62% at 50% 100%, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)",
                            }}
                        ></span>
                        <span
                            aria-hidden="true"
                            className="absolute inset-0 rounded-[4px] p-px opacity-[0.24]"
                            style={secondaryMaskStyle}
                        ></span>
                    </>
                )}
            </span>
            <span className="relative">
                <span className="flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                    {children}
                </span>
            </span>
        </Comp>
    );
});

PrimarySecondaryButton.displayName = "PrimarySecondaryButton";

function PrimaryButton(props: PrimarySecondaryButtonProps) {
    return <PrimarySecondaryButton variant="primary" {...props} />;
}

function SecondaryButton(props: PrimarySecondaryButtonProps) {
    return <PrimarySecondaryButton variant="secondary" {...props} />;
}

export {
  PrimaryButton,
  PrimarySecondaryButton,
  type PrimarySecondaryButtonProps,
  primarySecondaryButtonVariants,
  SecondaryButton,
};
