import React from "react";

export interface TagProps {
  /** Short label, e.g. a technology name. */
  children: React.ReactNode;
  className?: string;
}

/**
 * Tiny uppercase glass chip used for skills and topic tags.
 * Muted by default; parent cards may brighten it on hover via group classes.
 */
export function Tag({ children, className = "" }: TagProps) {
  return (
    <span className={`text-[10px] uppercase tracking-widest px-2 py-1 glass text-white/40 ${className}`}>
      {children}
    </span>
  );
}
