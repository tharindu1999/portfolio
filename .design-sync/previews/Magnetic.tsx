import React from "react";
import { Magnetic, Button, IconButton } from "react-example";
import { Github, ArrowUpRight } from "lucide-react";

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: "#0a0502", padding: 32, display: "flex", gap: 24, alignItems: "center", color: "#fff" }}>
    {children}
  </div>
);

export const MagneticButton = () => (
  <Frame>
    <Magnetic>
      <Button variant="accent" size="lg">
        Get in touch <ArrowUpRight size={20} />
      </Button>
    </Magnetic>
  </Frame>
);

export const MagneticIcon = () => (
  <Frame>
    <Magnetic strength={0.5}>
      <IconButton href="https://github.com/example" label="GitHub">
        <Github size={20} />
      </IconButton>
    </Magnetic>
  </Frame>
);
