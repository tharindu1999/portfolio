import React from "react";
import { IconButton } from "react-example";
import { Github, Linkedin, Mail } from "lucide-react";

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: "#0a0502", padding: 32, display: "flex", gap: 16 }}>
    <div style={{ color: "#fff", display: "flex", gap: 16 }}>{children}</div>
  </div>
);

export const SocialLinks = () => (
  <Frame>
    <IconButton href="https://github.com/example" target="_blank" label="GitHub">
      <Github size={20} />
    </IconButton>
    <IconButton href="https://linkedin.com/in/example" target="_blank" label="LinkedIn">
      <Linkedin size={20} />
    </IconButton>
    <IconButton href="mailto:hello@example.com" label="Email">
      <Mail size={20} />
    </IconButton>
  </Frame>
);
