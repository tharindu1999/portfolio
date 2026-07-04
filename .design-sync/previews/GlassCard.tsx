import React from "react";
import { GlassCard } from "react-example";

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: "#0a0502", padding: 32 }}>{children}</div>
);

export const Default = () => (
  <Frame>
    <GlassCard padding="md">
      <h4 className="text-lg font-bold mb-2 text-white">Cloud &amp; DevOps</h4>
      <p className="text-white/60 text-sm">
        Docker, Kubernetes, and Azure pipelines for containerized microservice deployments.
      </p>
    </GlassCard>
  </Frame>
);

export const WithAccentBar = () => (
  <Frame>
    <GlassCard padding="lg" accentBar>
      <h3 className="text-2xl font-bold text-white">Software Engineer</h3>
      <p className="text-accent font-serif italic">Millennium IT ESP</p>
      <p className="text-white/60 text-sm mt-4">
        Hover the card to see the accent bar sweep down the left edge.
      </p>
    </GlassCard>
  </Frame>
);

export const AccentBorder = () => (
  <Frame>
    <GlassCard padding="sm" className="border-accent/20">
      <p className="text-white/60 text-sm">A card with a subtle accent-tinted border.</p>
    </GlassCard>
  </Frame>
);
