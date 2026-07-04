import React from "react";
import { InfoCard } from "react-example";

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: "#0a0502", padding: 32, display: "grid", gap: 24 }}>{children}</div>
);

export const Education = () => (
  <Frame>
    <InfoCard
      title="BSc (Honors) in Computer Science"
      subtitle="Informatics Institute of Technology"
      meta="2020 - 2024"
    />
  </Frame>
);

export const Stack = () => (
  <Frame>
    <InfoCard title="MSc in Artificial Intelligence (Reading)" subtitle="University of Moratuwa" />
    <InfoCard title="BSc (Honors) in Computer Science" subtitle="Informatics Institute of Technology" meta="2020 - 2024" />
    <InfoCard title="GCE Advanced Level" subtitle="Kalutara Vidyalaya National School" meta="2018" />
  </Frame>
);
