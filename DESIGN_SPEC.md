# Portfolio Design Spec — Tharindu Jayasankha (Current Design Extraction)

Single-page portfolio website. One-page React app, all sections on one scrolling page.

## Tech Stack
- React 19 + TypeScript, Vite 6
- Tailwind CSS v4 (using `@theme` tokens in CSS, no tailwind.config)
- `motion` (Framer Motion successor) for all animations
- `lucide-react` for icons
- Deployed via gh-pages (uses `import.meta.env.BASE_URL` for asset paths)

## Design Language / Vibe
Dark, moody, "premium agency" aesthetic:
- Near-black warm background with orange accent glows
- Glassmorphism cards (frosted, translucent, thin white borders)
- Serif italic (Playfair Display) for headings/flourishes, Inter for body
- Huge display typography, uppercase micro-labels with wide letter-spacing
- Custom cursor (default cursor hidden), magnetic buttons, scroll-linked 3D cube

## Design Tokens (from index.css @theme)
```css
--font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;   /* weights 300–700 */
--font-serif: "Playfair Display", serif;                       /* 400, 700, italic */
--color-bg: #0a0502;            /* near-black warm brown */
--color-accent: #ff4e00;        /* vivid orange-red */
--color-glass: rgba(255,255,255,0.03);
--color-glass-border: rgba(255,255,255,0.1);
```
Text colors used throughout: `white`, `white/60` (body), `white/50` (hero paragraph), `white/40` (meta/tags), `white/30` (footer). Selection: accent bg, white text.

## Utility Classes
- `.glass` = `bg-glass backdrop-blur-xl border border-glass-border rounded-2xl` (the core card style)
- `.text-gradient` = white → white/50 left-to-right gradient text (hero name)
- `.glow` = `box-shadow: 0 0 40px -10px var(--color-accent)` (hover state)
- 3D helpers: `.perspective-1000`, `.preserve-3d`, `.backface-hidden`

## Global Effects
1. **Custom cursor**: `cursor: none` on root. Two spring-following divs — a 32px orange circle with `mix-blend-difference` (damping 20, stiffness 250) and an 8px white dot (damping 30, stiffness 500).
2. **Background atmosphere**: fixed, -z-10 — two 40%-size blurred (120px) accent-colored radial blobs, top-left (accent/20, `animate-pulse`) and bottom-right (accent/10).
3. **Loader**: 1s full-screen splash on bg color showing "Tharindu." in 4xl serif italic accent, fades out 0.8s.
4. **Magnetic wrapper component**: buttons/links translate toward cursor at 0.3× offset with spring (stiffness 150, damping 15), springs back on leave.
5. **TechCube**: decorative 192px 3D wireframe cube (6 faces, accent-tinted translucent, backdrop-blur) positioned right of hero, hidden below `lg`. Scroll-linked: rotateX/Y 45°→405° over full page scroll, faces "explode" outward 0→100px between 10–50% scroll, opacity fades in/out at page start/end (max 0.4).
6. **Nav gradient overlay**: fixed 128px gradient bg/90 → transparent at top, z-30.

## Layout
- Max content width: `max-w-6xl mx-auto` (contact section `max-w-4xl`)
- Page padding: `px-6 md:px-12`, main starts `pt-32`
- Section vertical rhythm: `py-32`
- Section header pattern: serif-italic `text-4xl md:text-6xl` title left, accent lucide icon (32px) right, `mb-16`, animated in with fade + x-slide on scroll into view (`whileInView`, once)

## Navigation
- Fixed top bar, z-40, `px-6 py-8 md:px-12`, no background (relies on gradient overlay)
- Left: logo "TJ." — 2xl serif italic bold, tracking-tighter
- Right (desktop): links Experience / Achievements / Skills / Education / Research — `text-sm uppercase tracking-widest text-white/60`, hover → accent; staggered fade-in on load (0.1s apart)
- CTA: "Download CV" glass pill button with Download icon, magnetic hover, hover `bg-accent/20`
- Mobile: hamburger (Menu/X icons) → full-screen `bg-bg/95 backdrop-blur-xl` overlay, links in 3xl serif italic, solid accent rounded-full CV button

## Sections (in order)

### 1. Hero (`min-h-[80vh]`, parallax: y 0→-100 and opacity 1→0 over first 20% of scroll)
- Eyebrow: "Software Engineer" — accent, serif italic, xl
- Name: "THARINDU / JAYASANKHA" — `text-6xl md:text-9xl font-bold tracking-tighter leading-[0.9]`, gradient text
- Staggered entrance: eyebrow delay 0.5s, h1 delay 0.7s (y+fade), rest 1.2s
- Paragraph (~max-w-xl, lg, white/50): Full Stack Software Engineer summary (enterprise apps, cloud, applied AI/LLM)
- Contact micro-row (xs, white/40, uppercase, tracking-widest, lucide icons at 12px): phone (+94) 71 206 70 24 · tharindujayasankha@gmail.com · Tilwaththa, Remunagoda, Kaluthara
- Social: GitHub + LinkedIn as glass square icon buttons (p-4), magnetic, hover glow
- TechCube floats at right vertical center (desktop only)

### 2. Experience (`#experience`)
Three glass cards (p-8 md:p-12), staggered y+fade in on view. Each card:
- Left accent bar (1px wide, full height) that scales y 0→100% on hover (origin top, 500ms)
- Header row: role (2xl bold) + company (accent serif italic) | period (white/40 uppercase tracking-widest sm, right)
- Bullet points in 2-column grid (md+), each with accent ChevronRight (14px), `text-white/60 text-sm`

Content:
1. **Software Engineer, Millennium IT ESP, 2024–Present** — RBAC→ABAC auth migration; IdentityServer4; Docker/K8s microservices; SQL Server/PostgreSQL/MongoDB; Azure; RabbitMQ + Redis; RAG chatbots (Python, LangChain, vector DBs, Node.js); Python image-validation automation; R&D on Azure Cognitive Services + LLMs, real-time Speech-to-Text & speaker diarization.
2. **Associate Software Engineer, Millennium IT ESP, 2023–2024** — React.js/TypeScript/Nx micro frontends; Tailwind + Ant Design; ASP.NET Core Web APIs (EF Core, LINQ); GraphQL; tokenizer/rule engines with Nearley.js + Moo for DSL parsing.
3. **Intern Software Engineer, Millennium IT ESP, 2022–2023** — React spreadsheet-style calc/reporting system; unit/integration testing; Git, Azure DevOps, Scrum.

### 3. Achievements (`#achievements`)
One large glass card (border-accent/20) with:
- Icon chip (accent/10 bg, rounded-2xl) + title (3xl bold) + org (accent serif italic)
- Description paragraph (lg, white/60)
- Right: 288px-wide 3:4 photo (`award.jpg`), rounded-2xl, hover: image scales 1.1 (700ms) + gradient overlay reveals "Official Award" caption
- Decorations: giant ghost ArrowUpRight (240px, accent/5) top-right; 1px accent→transparent gradient line along bottom

Content: **CEO Special Award 2026 — Millennium IT ESP** — for the "Rebuild Sri Lanka Data Collection Platform" following Cyclone Ditwa.

### 4. Technical Skills (`#skills`)
Grid `1 / sm:2 / lg:3` of glass cards (p-8), staggered scale+fade in. Each: accent icon (scales 1.1 on hover), bold title, wrap of tiny tag chips (`text-[10px] uppercase tracking-widest px-2 py-1 glass text-white/40`, brighten on card hover).

Groups (icon → skills):
- Languages (Terminal): C#, TypeScript, JavaScript, Python, R
- Backend (Settings): ASP.NET Core (Web API, Identity), EF Core, Node.js, GraphQL
- Frontend (Code2): React.js, Tailwind CSS, Ant Design, Nx Workspace (Micro Frontend)
- Databases/Caching/Messaging (Database): PostgreSQL, MongoDB, RabbitMQ, Redis
- Cloud/DevOps/Monitoring (Cloud): Docker, Kubernetes, Azure, Azure DevOps, CI/CD, ELK, Grafana
- ML & Deep Learning (BrainCircuit): TensorFlow, PyTorch, Hugging Face Transformers, scikit-learn
- LLM & Applied AI (Cpu): RAG Pipelines, LangChain, Vector Search, OpenAI API, Gemini API, Azure Cognitive Services
- Vector Databases (Database): Chroma, pgvector (PostgreSQL)
- Computer Vision (Code2): OpenCV, Vision Transformers (ViT), CNNs
- Parsing & Language Tooling (Terminal): Nearley.js, Moo, DSL Design

### 5. Education + Research (side-by-side 2-col grid on lg, `#education` / `#research`)
**Education** — three compact glass cards (p-6): degree (bold lg), institution (accent/80 sm), period (white/30 xs):
- MSc in Artificial Intelligence (Reading) — University of Moratuwa
- BSc (Hons) Computer Science — Informatics Institute of Technology, 2020–2024
- GCE A/L — Kalutara Vidyalaya National School, 2018

**Research** — one glass card (p-8): "Vision Transformers in Computer Vision" — ViT models for image classification, self-attention for global features vs CNNs. Tags: ViT, Self-Attention, CNN Comparison.

### 6. Contact (`#contact`, centered, max-w-4xl)
- Headline: "Let's build / something **great.**" ("great." in accent) — `text-5xl md:text-8xl` serif italic tracking-tighter
- Two magnetic pill buttons (px-12 py-6, rounded-full): solid accent "Get in touch" (mailto, hover glow) + glass "Download CV"

### Footer
Top border white/5, `py-12`. Left: "© 2026 Tharindu Jayasankha. All rights reserved." Right: GitHub / LinkedIn text links. All `text-xs uppercase tracking-[0.2em] text-white/30`, hover accent.

## Links & Assets
- GitHub: https://github.com/tharindu1999
- LinkedIn: https://www.linkedin.com/in/tharindu-jayasankha/
- CV PDF: `public/THARINDU_JAYASANKHA_CV.pdf` (download name: Tharindu_Jayasankha_CV.pdf)
- Award photo: `public/award.jpg`

## Animation Summary (motion/react)
- Entrance: `initial` y/x offset + opacity 0 → `whileInView` (viewport once) or on-load with `isLoaded` gate; staggers via delay `i * 0.05–0.1`
- Scroll-linked: `useScroll` on page container + `useTransform` for hero parallax/fade and TechCube rotation/explosion
- Hover micro-interactions: glow shadows, accent bars scaling in, image zoom, icon scale, border-color shifts — mostly CSS transitions on group hover
- Springs for cursor and magnetic elements
