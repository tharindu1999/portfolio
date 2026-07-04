import React from "react";

export interface GlassCardProps {
  /** Card contents. */
  children: React.ReactNode;
  /** Extra classes merged onto the card (e.g. `border-accent/20`, `hover:border-accent/50`). */
  className?: string;
  /** Show the accent bar that sweeps down the left edge on hover. @default false */
  accentBar?: boolean;
  /** Padding preset: `sm` = p-6, `md` = p-8, `lg` = p-8 md:p-12, `none` = no padding. @default "md" */
  padding?: "none" | "sm" | "md" | "lg";
}

const PADDING: Record<NonNullable<GlassCardProps["padding"]>, string> = {
  none: "",
  sm: "p-6",
  md: "p-8",
  lg: "p-8 md:p-12",
};

/**
 * Frosted glassmorphism card — the core surface of this design system.
 * Translucent white fill, backdrop blur, thin white border, rounded-2xl corners.
 * Use it for every content panel: experience entries, skill groups, education items.
 */
export function GlassCard({
  children,
  className = "",
  accentBar = false,
  padding = "md",
}: GlassCardProps) {
  return (
    <div className={`glass relative overflow-hidden group ${PADDING[padding]} ${className}`}>
      {accentBar && (
        <div className="absolute top-0 left-0 w-1 h-full bg-accent scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500" />
      )}
      {children}
    </div>
  );
}
