import React from "react";

export interface ButtonProps {
  /** Button label and optional inline icon(s). */
  children: React.ReactNode;
  /** `accent` = solid orange pill with glow hover; `glass` = frosted translucent pill. @default "accent" */
  variant?: "accent" | "glass";
  /** `sm` = compact uppercase nav button, `md` = standard, `lg` = large hero/contact CTA. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Fully rounded pill shape. Set false to keep the glass card's rounded-2xl corners. @default true */
  pill?: boolean;
  /** Hover tint for the glass variant: `subtle` = faint white, `accent` = orange tint. @default "subtle" */
  hoverTone?: "subtle" | "accent";
  /** Renders an anchor instead of a button. */
  href?: string;
  /** Anchor download attribute (with `href`). */
  download?: string;
  /** Anchor target (with `href`). */
  target?: string;
  onClick?: () => void;
  className?: string;
}

const SIZES: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-6 py-2 text-sm uppercase tracking-widest gap-2",
  md: "px-8 py-4 gap-2",
  lg: "px-12 py-6 gap-3",
};

/**
 * Pill button in the system's two styles: solid accent orange (primary CTA, glows on hover)
 * or frosted glass (secondary). Renders an `<a>` when `href` is given, else a `<button>`.
 * Pass lucide icons inside `children` alongside the label.
 */
export function Button({
  children,
  variant = "accent",
  size = "md",
  pill = true,
  hoverTone = "subtle",
  href,
  download,
  target,
  onClick,
  className = "",
}: ButtonProps) {
  const variantCls =
    variant === "accent"
      ? "bg-accent text-white font-bold hover:glow"
      : `glass ${hoverTone === "accent" ? "hover:bg-accent/20" : "hover:bg-white/5"}`;
  const cls = `${SIZES[size]} ${variantCls} ${pill ? "rounded-full" : ""} transition-all inline-flex items-center justify-center ${className}`;

  if (href) {
    return (
      <a href={href} download={download} target={target} onClick={onClick} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
