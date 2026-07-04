import React from "react";
import { Button } from "react-example";
import { ArrowUpRight, Download } from "lucide-react";

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: "#0a0502", padding: 32, display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
    {children}
  </div>
);

export const AccentCTA = () => (
  <Frame>
    <Button variant="accent" size="lg" href="mailto:hello@example.com">
      Get in touch <ArrowUpRight size={20} />
    </Button>
  </Frame>
);

export const GlassSecondary = () => (
  <Frame>
    <Button variant="glass" size="lg" href="#">
      Download CV <Download size={20} />
    </Button>
  </Frame>
);

export const CompactNav = () => (
  <Frame>
    <Button variant="glass" size="sm" pill={false} hoverTone="accent" href="#">
      <Download size={16} /> Download CV
    </Button>
  </Frame>
);

export const Sizes = () => (
  <Frame>
    <Button variant="accent" size="sm">Small</Button>
    <Button variant="accent" size="md">Medium</Button>
    <Button variant="accent" size="lg">Large</Button>
  </Frame>
);
