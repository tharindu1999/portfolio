import React from "react";
import { SectionHeading } from "react-example";
import { Briefcase, GraduationCap } from "lucide-react";

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: "#0a0502", padding: 32 }}>{children}</div>
);

export const Split = () => (
  <Frame>
    <SectionHeading title="Experience" icon={<Briefcase size={32} />} animate={false} />
  </Frame>
);

export const Inline = () => (
  <Frame>
    <SectionHeading title="Education" icon={<GraduationCap size={28} />} variant="inline" animate={false} />
  </Frame>
);
