import React from "react";
import { ExperienceCard } from "react-example";

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: "#0a0502", padding: 32 }}>{children}</div>
);

export const CurrentRole = () => (
  <Frame>
    <ExperienceCard
      role="Software Engineer"
      company="Millennium IT ESP"
      period="2024 – Present"
      points={[
        "Migrated authentication and authorization systems from RBAC to ABAC.",
        "Deployed and managed containerized microservices with Docker and Kubernetes.",
        "Built chatbot solutions with Retrieval-Augmented Generation (RAG) pipelines.",
        "Managed inter-service communication through RabbitMQ and Redis caching.",
      ]}
    />
  </Frame>
);

export const EarlierRole = () => (
  <Frame>
    <ExperienceCard
      role="Associate Software Engineer"
      company="Millennium IT ESP"
      period="2023 – 2024"
      points={[
        "Built responsive front-end applications with React.js and TypeScript.",
        "Developed RESTful Web APIs with ASP.NET Core and Entity Framework Core.",
      ]}
    />
  </Frame>
);
