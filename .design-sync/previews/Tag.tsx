import React from "react";
import { Tag } from "react-example";

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: "#0a0502", padding: 32 }}>{children}</div>
);

export const Single = () => (
  <Frame>
    <Tag>TypeScript</Tag>
  </Frame>
);

export const SkillCluster = () => (
  <Frame>
    <div className="flex flex-wrap gap-2">
      <Tag>React.js</Tag>
      <Tag>Tailwind CSS</Tag>
      <Tag>ASP.NET Core</Tag>
      <Tag>PostgreSQL</Tag>
      <Tag>Docker</Tag>
      <Tag>LangChain</Tag>
      <Tag>RAG Pipelines</Tag>
    </div>
  </Frame>
);
