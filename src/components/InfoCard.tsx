import React from "react";
import { GlassCard } from "./GlassCard";

export interface InfoCardProps {
  /** Primary line, e.g. a degree or item name. */
  title: string;
  /** Secondary line in accent color, e.g. the institution. */
  subtitle?: string;
  /** Muted meta line, e.g. a year range. */
  meta?: string;
}

/**
 * Compact glass card for list items like education entries: bold title,
 * accent subtitle, and a muted meta line.
 */
export function InfoCard({ title, subtitle, meta }: InfoCardProps) {
  return (
    <GlassCard padding="sm">
      <h4 className="font-bold text-lg">{title}</h4>
      {subtitle && <p className="text-accent/80 text-sm">{subtitle}</p>}
      {meta && <p className="text-white/30 text-xs mt-2">{meta}</p>}
    </GlassCard>
  );
}
