import React from "react";
import { GradientHeading } from "react-example";

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: "#0a0502", padding: 32 }}>{children}</div>
);

export const Hero = () => (
  <Frame>
    <GradientHeading size="xl" as="h1">
      THARINDU <br /> JAYASANKHA
    </GradientHeading>
  </Frame>
);

export const PageTitle = () => (
  <Frame>
    <GradientHeading size="lg" as="h2">
      SELECTED WORK
    </GradientHeading>
  </Frame>
);

export const SectionTitle = () => (
  <Frame>
    <GradientHeading size="md" as="h3">
      ABOUT ME
    </GradientHeading>
  </Frame>
);
