# Tharindu Portfolio DS — build conventions

Dark, editorial portfolio system: near-black warm background, vivid orange accent, frosted-glass surfaces, Playfair Display serif italics for flourishes, Inter for everything else.

## Setup
No provider is required — components work standalone. The stylesheet styles `body` automatically (background `#0a0502`, white Inter text). **Never place these components on a white/light background** — the glass surfaces are translucent white and vanish. If you need an explicit surface color, use class `bg-bg` or `background: var(--color-bg)`.

## Styling idiom
Tailwind utility classes, but the shipped stylesheet is a **compiled subset — only classes that already exist in it resolve; arbitrary Tailwind class names will silently do nothing.** Rules:
- Use the components for all controls/surfaces; for your own layout glue prefer inline styles (`display:flex`, `gap`, `padding`) or the verified classes below.
- Signature classes: `glass` (frosted card surface), `glow` (accent box-shadow, pair with hover), `text-gradient` (white→faded gradient text fill).
- Color: `bg-accent`, `text-accent`, `bg-bg`, `text-white`, muted text steps `text-white/30`, `text-white/40`, `text-white/50`, `text-white/60`; borders `border-accent/20`, `border-accent/50`.
- Type: `font-serif italic` (Playfair Display — headings/flourishes only), `uppercase tracking-widest` for micro-labels, `font-bold tracking-tighter` for display text.
- Tokens (defined in the stylesheet): `--color-bg`, `--color-accent`, `--color-glass`, `--color-glass-border`, `--font-sans`, `--font-serif`. Fonts load from Google Fonts via a remote `@import` — no local font files needed.

## Where the truth lives
Read `styles.css` and its `_ds_bundle.css` import (tokens at top, all available utility classes below) before inventing styling. Per-component API and usage: `components/general/<Name>/<Name>.d.ts` and `<Name>.prompt.md`. Components (all under `window.PortfolioDS`): GlassCard, Button, Magnetic, SectionHeading, Tag, IconButton, GradientHeading, ExperienceCard, InfoCard.

## Idiomatic example
```jsx
const { GradientHeading, Button, Magnetic, Tag, SectionHeading, GlassCard } = window.PortfolioDS;

<div style={{ background: "var(--color-bg)", minHeight: "100vh", padding: 48 }}>
  <p className="text-accent font-serif italic text-xl">Software Engineer</p>
  <GradientHeading size="xl" as="h1">THARINDU <br /> JAYASANKHA</GradientHeading>
  <div style={{ display: "flex", gap: 16, marginTop: 48 }}>
    <Magnetic>
      <Button variant="accent" size="lg">Get in touch</Button>
    </Magnetic>
    <Button variant="glass" size="lg">Download CV</Button>
  </div>
  <SectionHeading title="Skills" />
  <GlassCard padding="md">
    <div className="flex flex-wrap gap-2">
      <Tag>React.js</Tag><Tag>ASP.NET Core</Tag><Tag>LangChain</Tag>
    </div>
  </GlassCard>
</div>
```
Compose sections as: `SectionHeading` opener → `GlassCard`/`ExperienceCard`/`InfoCard` content → `Button`/`IconButton` actions (wrap CTAs in `Magnetic`).
