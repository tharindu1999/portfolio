import React from "react";

export interface IconButtonProps {
  /** A single lucide icon, e.g. `<Github size={20} />`. */
  children: React.ReactNode;
  /** Link target URL. */
  href: string;
  /** Accessible name for the icon link. */
  label?: string;
  /** Anchor target, e.g. "_blank" for external links. */
  target?: string;
}

/**
 * Square frosted-glass icon link with an accent glow on hover.
 * Used for social links (GitHub, LinkedIn). Wrap in `Magnetic` for the signature hover.
 */
export function IconButton({ children, href, label, target }: IconButtonProps) {
  return (
    <a href={href} target={target} aria-label={label} className="p-4 glass hover:glow transition-all block">
      {children}
    </a>
  );
}
