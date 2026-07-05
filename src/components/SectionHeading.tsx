import { motion } from "motion/react";
import React from "react";

export interface SectionHeadingProps {
  /** The section title, set in large serif italic. */
  title: string;
  /** Accent-colored lucide icon shown beside the title. */
  icon?: React.ReactNode;
  /** `split` = big title left / icon right (main sections); `inline` = smaller title with icon beside it (sub-sections). @default "split" */
  variant?: "split" | "inline";
  /** Animate the title sliding in when scrolled into view. @default true */
  animate?: boolean;
}

/**
 * Section header in the system's editorial style: Playfair Display serif italic title
 * with an accent lucide icon. `split` is the full-width section opener; `inline`
 * suits narrower columns like Education/Research.
 */
export function SectionHeading({ title, icon, variant = "split", animate = true }: SectionHeadingProps) {
  const motionProps = animate
    ? { initial: { opacity: 0, x: -20 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true } }
    : {};

  if (variant === "inline") {
    return (
      <div className="flex items-center justify-center gap-4 mb-12">
        <motion.h2 {...motionProps} className="text-4xl font-serif italic">
          {title}
        </motion.h2>
        {icon && <div className="text-accent">{icon}</div>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center gap-2 mb-16">
      {icon && <div className="text-accent">{icon}</div>}
      <motion.h2 {...motionProps} className="text-4xl md:text-6xl font-serif italic">
        {title}
      </motion.h2>
    </div>
  );
}
