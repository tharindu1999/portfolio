import React from "react";

export interface GradientHeadingProps {
  /** Heading text; use `<br />` for manual line breaks. */
  children: React.ReactNode;
  /** `xl` = hero name scale, `lg` = page-level, `md` = section-level. @default "xl" */
  size?: "md" | "lg" | "xl";
  /** Heading element to render. @default "h1" */
  as?: "h1" | "h2" | "h3";
  className?: string;
}

const SIZES: Record<NonNullable<GradientHeadingProps["size"]>, string> = {
  md: "text-3xl md:text-5xl",
  lg: "text-5xl md:text-7xl",
  xl: "text-6xl md:text-9xl",
};

/**
 * Display heading with the system's white-to-faded gradient fill — bold, tightly
 * tracked, near-solid leading. The hero name treatment; reserve `xl` for one per page.
 */
export function GradientHeading({ children, size = "xl", as = "h1", className = "" }: GradientHeadingProps) {
  const El = as;
  return (
    <El className={`${SIZES[size]} font-bold tracking-tighter leading-[0.9] text-gradient ${className}`}>
      {children}
    </El>
  );
}
