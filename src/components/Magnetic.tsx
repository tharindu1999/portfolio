import { motion } from "motion/react";
import React, { useRef, useState } from "react";

export interface MagneticProps {
  /** The element that should follow the cursor (typically a Button or IconButton). */
  children: React.ReactNode;
  /** How strongly the content drifts toward the cursor (0–1). @default 0.3 */
  strength?: number;
  /** Classes for the wrapper (e.g. `w-full sm:w-auto` to make a wrapped button full-width on mobile). */
  className?: string;
}

/**
 * Magnetic hover wrapper — the system's signature interaction. Its child drifts toward
 * the cursor with a spring while hovered and snaps back on leave. Wrap buttons and
 * social icons; purely decorative, renders children unchanged when idle.
 */
export function Magnetic({ children, strength = 0.3, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * strength, y: y * strength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}
