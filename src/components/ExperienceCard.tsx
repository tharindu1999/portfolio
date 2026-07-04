import { ChevronRight } from "lucide-react";
import React from "react";
import { GlassCard } from "./GlassCard";

export interface ExperienceCardProps {
  /** Job title, e.g. "Software Engineer". */
  role: string;
  /** Employer name, shown in accent serif italic. */
  company: string;
  /** Time range, e.g. "2024 – Present". */
  period: string;
  /** Responsibility/achievement bullet points, laid out in two columns on desktop. */
  points: string[];
}

/**
 * Timeline entry card for work experience: role and company header, uppercase period,
 * and a two-column bullet list with accent chevrons. An accent bar sweeps down the
 * left edge on hover.
 */
export function ExperienceCard({ role, company, period, points }: ExperienceCardProps) {
  return (
    <GlassCard padding="lg" accentBar>
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
        <div>
          <h3 className="text-2xl font-bold">{role}</h3>
          <p className="text-accent font-serif italic">{company}</p>
        </div>
        <p className="text-white/40 uppercase tracking-widest text-sm">{period}</p>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {points.map((point, i) => (
          <li key={i} className="text-white/60 text-sm flex gap-3">
            <ChevronRight size={14} className="text-accent shrink-0 mt-1" />
            {point}
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}
