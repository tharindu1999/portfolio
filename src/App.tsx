/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import React, { useEffect, useRef } from "react";
import { Code2, Server, Layout, Database, Cloud, Sparkles, GitBranch } from "lucide-react";
import {
  Button,
  Magnetic,
  SectionHeading,
  GradientHeading,
  ExperienceCard,
  InfoCard
} from "./components";
import cvFile from "./assets/Tharindu_Jayasankha.pdf";

// Brand accent (#ff4e00) as r,g,b for rgba() glue used by the canvas/glow effects.
const ACCENT_RGB = "255, 78, 0";

const MARQUEE_ITEMS = [
  "C#", "TypeScript", "React.js", "ASP.NET Core", "Python", "Azure", "Kubernetes",
  "Docker", "LangChain", "RAG Pipelines", "PostgreSQL", "RabbitMQ", "Redis", "GraphQL"
];

const SKILL_GROUPS = [
  { name: "Languages", Icon: Code2, items: ["C#", "TypeScript", "JavaScript", "Python"] },
  { name: "Backend Development", Icon: Server, items: ["ASP.NET Core (Web API, Identity)", "Entity Framework Core", "Node.js", "REST", "GraphQL"] },
  { name: "Frontend Development", Icon: Layout, items: ["React.js", "Tailwind CSS", "Ant Design", "Nx Workspace (Micro Frontends)"] },
  { name: "Databases & Messaging", Icon: Database, items: ["PostgreSQL", "SQL Server", "MongoDB", "Redis", "RabbitMQ"] },
  { name: "Cloud & DevOps", Icon: Cloud, items: ["Microsoft Azure", "Docker", "Kubernetes", "Azure DevOps", "CI/CD Pipelines", "ELK Stack", "Grafana"] },
  { name: "AI & Machine Learning", Icon: Sparkles, items: ["RAG Pipelines", "LangChain", "OpenAI & Gemini APIs", "Azure Cognitive Services", "Chroma", "pgvector", "Agentic Coding (Cursor, Codex, Claude)", "PyTorch", "TensorFlow", "Hugging Face Transformers", "OpenCV"] },
  { name: "Parsing & Workflow Engines", Icon: GitBranch, items: ["Nearley.js", "Moo", "Domain Specific Languages", "Rule Engines"] }
];

const EXPERIENCE = [
  {
    role: "Software Engineer",
    company: "Millennium IT ESP",
    period: "2024 – Present",
    points: [
      "Migrated platform authorization from RBAC to ABAC for finer grained permissions across services.",
      "Deployed and operated containerized microservices on Docker & Kubernetes in Azure.",
      "Built production RAG chatbot solutions with Python, LangChain, Node.js and vector databases.",
      "Led R&D on cloud native AI: real time speech to text with speaker diarization on Azure Cognitive Services.",
      "Implemented async inter service messaging with RabbitMQ, caching and sessions with Redis.",
      "Configured Identity Server 4 for secure token management and centralized authentication."
    ]
  },
  {
    role: "Associate Software Engineer",
    company: "Millennium IT ESP",
    period: "2023 – 2024",
    points: [
      "Built responsive micro frontend apps with React.js, TypeScript and Nx Workspace.",
      "Developed RESTful Web APIs in ASP.NET Core with EF Core and LINQ.",
      "Integrated GraphQL APIs to streamline client–server communication.",
      "Engineered a Node.js tokenizer & rule engine (Nearley.js, Moo) parsing DSLs at low latency."
    ]
  },
  {
    role: "Intern Software Engineer",
    company: "Millennium IT ESP",
    period: "2022 – 2023",
    points: [
      "Contributed to a React.js spreadsheet style calculation and reporting system.",
      "Wrote unit and integration tests to safeguard reliability.",
      "Worked in a Scrum team with Git and Azure DevOps pipelines."
    ]
  }
];

const HERO_ROLES = ["Full Stack Software Engineer", "Cloud Native Developer", "RAG & LLM Builder"];

type TermLine = { t?: string; c?: string; json?: boolean; progress?: boolean };

const TERMINAL_LINES: TermLine[] = [
  { t: "$ whoami" },
  { t: "tharindu, full stack software engineer", c: "rgba(255,255,255,.8)" },
  { t: "$ cat stack.json" },
  { t: '{ "languages": ["C#", "TypeScript", "Python"],', json: true },
  { t: '  "backend": ["ASP.NET Core", "Node.js", "GraphQL"],', json: true },
  { t: '  "frontend": ["React", "Tailwind", "Nx"],', json: true },
  { t: '  "data": ["PostgreSQL", "MongoDB", "Redis", "RabbitMQ"],', json: true },
  { t: '  "cloud": ["Azure", "Docker", "Kubernetes"],', json: true },
  { t: '  "ai": ["LangChain", "RAG", "pgvector", "ViT"] }', json: true },
  { t: "$ ./deploy --production" },
  { t: "→ building image · pushing to registry · rolling out", c: "rgba(255,255,255,.5)" },
  { progress: true },
  { t: "✔ 3+ years shipping in production", c: "#7ee787" }
];

/** Prompt/JSON syntax highlighting for a finished terminal line; null = plain text. */
const termHtml = (line: TermLine, accent: string): string | null => {
  if (line.progress || !line.t) return null;
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const t = line.t;
  if (t.startsWith("$ ")) {
    let body = esc(t.slice(2));
    body = body.replace(/(--?[a-zA-Z][a-zA-Z-]*)/g, `<span style="color:${accent}">$1</span>`);
    return `<span style="color:#7ee787">$</span> <span style="color:#e6edf3">${body}</span>`;
  }
  if (line.json) {
    return esc(t).replace(/("[^"]*")(\s*:)?/g, (_m, str, colon) =>
      colon
        ? `<span style="color:#79c0ff">${str}</span><span style="color:rgba(255,255,255,.45)">${colon}</span>`
        : `<span style="color:#ffa657">${str}</span>`
    );
  }
  return null;
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Connected-particle constellation on a fixed full-viewport canvas. */
const ParticleCanvas = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const accent = `rgb(${ACCENT_RGB})`;
    let w = 0, h = 0, raf = 0;
    const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const N = 55;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35
    }));
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 16900) {
            ctx.globalAlpha = (1 - d2 / 16900) * 0.14;
            ctx.strokeStyle = accent;
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 0.35;
      ctx.fillStyle = accent;
      for (const p of pts) { ctx.beginPath(); ctx.arc(p.x, p.y, 1.4, 0, 7); ctx.fill(); }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} className="fixed inset-0 w-full h-full z-0 pointer-events-none" />;
};

/** Soft accent glow that trails the cursor. */
const CursorGlow = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      if (ref.current) ref.current.style.display = "none";
      return;
    }
    const el = ref.current;
    if (!el) return;
    let tx = window.innerWidth / 2, ty = window.innerHeight / 3, x = tx, y = ty, raf = 0;
    const move = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    window.addEventListener("mousemove", move);
    const tick = () => {
      x += (tx - x) * 0.08; y += (ty - y) * 0.08;
      el.style.left = x + "px"; el.style.top = y + "px";
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", move); };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed pointer-events-none z-[1]"
      style={{
        width: 480, height: 480, borderRadius: "50%", left: 0, top: 0,
        background: `radial-gradient(circle, rgba(${ACCENT_RGB},.14) 0%, rgba(${ACCENT_RGB},0) 65%)`,
        transform: "translate(-50%,-50%)"
      }}
    />
  );
};

/** Looping type/delete cycle through the hero role titles. */
const RoleTyper = () => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) { el.textContent = " " + HERO_ROLES[0]; return; }
    let ri = 0, ci = 0, deleting = false, timer = 0;
    const step = () => {
      const role = HERO_ROLES[ri];
      if (!deleting) {
        ci++;
        el.textContent = " " + role.slice(0, ci);
        if (ci === role.length) { deleting = true; timer = window.setTimeout(step, 1800); return; }
        timer = window.setTimeout(step, 55);
      } else {
        ci--;
        el.textContent = " " + role.slice(0, ci);
        if (ci === 0) { deleting = false; ri = (ri + 1) % HERO_ROLES.length; timer = window.setTimeout(step, 400); return; }
        timer = window.setTimeout(step, 26);
      }
    };
    timer = window.setTimeout(step, 600);
    return () => clearTimeout(timer);
  }, []);

  return <span ref={ref} />;
};

/** zsh-style terminal that types itself out when scrolled into view. */
const Terminal = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const accent = getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim() || `rgb(${ACCENT_RGB})`;
    if (prefersReducedMotion()) {
      TERMINAL_LINES.forEach((l) => {
        const d = document.createElement("div");
        if (l.progress) {
          d.textContent = "[██████████] 100% · deployed";
          d.style.color = "#7ee787";
        } else {
          d.style.color = l.c || (l.json ? "rgba(255,255,255,.45)" : "#e6edf3");
          const h = termHtml(l, accent);
          if (h) d.innerHTML = h; else d.textContent = l.t ?? "";
        }
        el.appendChild(d);
      });
      return;
    }
    const cursor = document.createElement("span");
    cursor.textContent = "▊";
    cursor.style.cssText = `color:${accent};animation:blinkCursor 1s steps(1) infinite`;
    let started = false;
    const timers: number[] = [];
    const run = () => {
      if (el.dataset.ran) return;
      el.dataset.ran = "1";
      el.textContent = "";
      let li = 0;
      const typeLine = () => {
        if (li >= TERMINAL_LINES.length) return;
        const line = TERMINAL_LINES[li];
        const div = document.createElement("div");
        el.appendChild(div);
        el.appendChild(cursor);
        if (line.progress) {
          div.style.color = "rgba(255,255,255,.55)";
          let k = 0;
          const stepBar = () => {
            div.textContent = "[" + "█".repeat(k) + "·".repeat(10 - k) + "] " + k * 10 + "%";
            div.appendChild(cursor);
            if (k < 10) { k++; timers.push(window.setTimeout(stepBar, 110)); }
            else {
              div.textContent = "[██████████] 100% · deployed";
              div.style.color = "#7ee787";
              div.appendChild(cursor);
              li++; timers.push(window.setTimeout(typeLine, 250));
            }
          };
          stepBar();
          return;
        }
        div.style.color = line.c || (line.json ? "rgba(255,255,255,.45)" : "#e6edf3");
        const text = line.t ?? "";
        let ci = 0;
        const typeChar = () => {
          ci++;
          div.textContent = text.slice(0, ci);
          div.appendChild(cursor);
          if (ci < text.length) timers.push(window.setTimeout(typeChar, text.startsWith("$") ? 42 : 14));
          else {
            const h = termHtml(line, accent);
            if (h) { div.innerHTML = h; div.appendChild(cursor); }
            li++; timers.push(window.setTimeout(typeLine, text.startsWith("$") ? 300 : 120));
          }
        };
        typeChar();
      };
      typeLine();
    };
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting) && !started) { started = true; run(); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => { io.disconnect(); timers.forEach(clearTimeout); };
  }, []);

  return (
    <div className="glass rounded-2xl overflow-hidden border border-white/10">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
        <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
        <span className="text-white/40 font-mono text-xs ml-3">tharindu@portfolio: zsh</span>
      </div>
      <div
        ref={ref}
        className="term-body relative px-6 py-5 font-mono text-sm overflow-hidden text-white/75"
        style={{ lineHeight: 1.9, height: 400, whiteSpace: "pre" }}
      />
    </div>
  );
};

/** Scroll-into-view reveal used across every section. */
const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: delay / 1000 }}
    className={className}
  >
    {children}
  </motion.div>
);

const skillChip = "glass text-white/60 rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.1em]";

const FLOATING_SNIPPETS: { text: string; style: React.CSSProperties }[] = [
  { text: "</>", style: { top: "16%", left: "6%", fontSize: 15, color: `rgba(${ACCENT_RGB},.35)`, animation: "floatY 5s ease-in-out infinite alternate" } },
  { text: "kubectl apply", style: { top: "70%", left: "3%", fontSize: 13, color: "rgba(255,255,255,.16)", animation: "floatY 7s ease-in-out infinite alternate-reverse" } },
  { text: "{ react }", style: { top: "12%", right: "8%", fontSize: 13, color: "rgba(255,255,255,.18)", animation: "floatY 6s ease-in-out infinite alternate" } },
  { text: "docker build .", style: { top: "84%", right: "12%", fontSize: 14, color: `rgba(${ACCENT_RGB},.28)`, animation: "floatY 8s ease-in-out infinite alternate-reverse" } },
  { text: "await rag.query()", style: { top: "44%", right: "3%", fontSize: 13, color: "rgba(255,255,255,.14)", animation: "floatY 9s ease-in-out infinite alternate" } }
];

export default function App() {
  const cvHref = cvFile;

  return (
    <div className="relative selection:bg-accent selection:text-white">
      <ParticleCanvas />
      <CursorGlow />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-bg/60 border-b border-white/10">
        <div className="max-w-[1160px] mx-auto flex items-center justify-between px-6 md:px-8 py-3.5">
          <a href="#top" className="text-white font-bold tracking-tighter text-lg no-underline">
            TJ<span className="text-accent">.</span>
            <span className="text-accent font-serif italic font-normal text-[15px] ml-2 hidden sm:inline">software engineer</span>
          </a>
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden md:flex items-center gap-6">
              {["About", "Skills", "Experience", "Research", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-white/60 hover:text-accent transition-colors text-[13px] uppercase tracking-[0.12em] no-underline"
                >
                  {item}
                </a>
              ))}
            </div>
            <Button variant="glass" size="sm" pill={false} hoverTone="accent" href={cvHref} download="Tharindu_Jayasankha_CV.pdf">
              Download CV
            </Button>
          </div>
        </div>
      </nav>

      <main id="top" className="relative z-[2]">
        {/* ============ HERO ============ */}
        <section className="min-h-screen flex items-center relative overflow-hidden">
          {FLOATING_SNIPPETS.map((s) => (
            <div key={s.text} data-anim="1" className="absolute font-mono hidden min-[900px]:block" style={s.style}>
              {s.text}
            </div>
          ))}

          <div className="hero-grid max-w-[1160px] mx-auto w-full relative grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-16 items-center px-6 md:px-8 pt-52 lg:pt-36 pb-20">
            {/* Mobile-only compact profile — the only place it fits in the single-column layout: top-right, above the name */}
            <div className="lg:hidden absolute right-6 md:right-8 top-20 z-10">
              <div className="glass rounded-2xl p-1.5" style={{ animation: "floatY 6s ease-in-out infinite alternate" }}>
                <img
                  src={import.meta.env.BASE_URL + "profile.jpg"}
                  alt="Tharindu Jayasankha"
                  className="block object-cover object-top rounded-xl"
                  style={{ width: 96, height: 112 }}
                />
              </div>
            </div>

            <div className="text-left">
              <p className="text-accent font-serif italic text-2xl mb-3">Hi, I’m</p>
              <GradientHeading size="xl" as="h1">
                THARINDU <br /> JAYASANKHA
              </GradientHeading>
              <p className="font-mono text-xl text-white mt-6 min-h-7">
                <span className="text-accent">&gt;_</span>
                <RoleTyper />
                <span
                  data-anim="1"
                  className="inline-block w-2.5 bg-accent align-text-bottom ml-0.5"
                  style={{ height: 22, animation: "blinkCursor 1s steps(1) infinite" }}
                />
              </p>
              <p className="text-white/60 text-[17px] leading-[1.7] max-w-[540px] mt-5 text-justify">
                3+ years building enterprise systems end to end  from React micro frontends to .NET microservices
                on Azure &amp; Kubernetes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-9">
                <Magnetic className="w-full sm:w-auto">
                  <Button variant="accent" size="lg" className="w-full sm:w-auto" href="mailto:tharindujayasankha@gmail.com">
                    Get in touch ↗
                  </Button>
                </Magnetic>
                <Button variant="glass" size="lg" className="w-full sm:w-auto" href={cvHref} download="Tharindu_Jayasankha_CV.pdf">
                  Download CV
                </Button>
              </div>
              <div className="flex gap-3 mt-7">
                <Button variant="glass" size="sm" className="flex-1 sm:flex-none" href="https://github.com/tharindu1999" target="_blank">
                  GitHub ↗
                </Button>
                <Button variant="glass" size="sm" className="flex-1 sm:flex-none" href="https://www.linkedin.com/in/tharindu-jayasankha/" target="_blank">
                  LinkedIn ↗
                </Button>
              </div>
            </div>

            <div className="relative justify-self-center hidden lg:block">
              <div
                data-anim="1"
                className="absolute rounded-[32px]"
                style={{
                  inset: -24,
                  background: `radial-gradient(circle at 50% 40%, rgba(${ACCENT_RGB},.28), rgba(${ACCENT_RGB},0) 70%)`,
                  animation: "pulseGlow 5s ease-in-out infinite"
                }}
              />
              <div data-anim="1" className="glass relative rounded-3xl p-3" style={{ animation: "floatY 6s ease-in-out infinite alternate" }}>
                <img
                  src={import.meta.env.BASE_URL + "profile.jpg"}
                  alt="Tharindu Jayasankha"
                  className="block object-cover object-top rounded-2xl"
                  style={{ width: 174, height: 195 }}
                />
              </div>
              <div className="glass absolute -left-8 -bottom-4 rounded-[14px] px-4 py-2.5 font-mono text-[13px]" style={{ color: "#7ee787" }}>
                ● open to work
              </div>
              <div className="glass absolute -right-10 top-1/3 rounded-[14px] px-4 py-2.5 font-mono text-[13px]">
                <span className="text-accent">3+</span> <span className="text-white/60">yrs exp</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============ MARQUEE ============ */}
        <div className="overflow-hidden border-t border-b border-white/10 py-[18px] relative">
          <div
            data-anim="1"
            className="flex gap-12 w-max font-mono text-[15px] whitespace-nowrap"
            style={{ animation: "marqueeX 36s linear infinite" }}
          >
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((m, i) => (
              <span key={i}>
                <span className="text-white/40">{m}</span>
                <span className="text-accent ml-12">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ============ ABOUT / TERMINAL ============ */}
        <section id="about" className="max-w-[1160px] mx-auto px-6 md:px-8 pt-32 pb-10">
          <Reveal>
            <SectionHeading title="About" animate={false} />
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 mt-2 items-start">
            <Reveal>
              <p className="text-white/70 text-[17px] leading-[1.8] text-justify">
                <span className="text-accent">Full stack software engineer</span> with over three years of
                experience building and scaling enterprise applications end to end, from React micro frontends to
                .NET microservices running on Azure and Kubernetes.
              </p>
              <p className="text-white/70 text-[17px] leading-[1.8] mt-5 text-justify">
                Increasingly focused on <span className="font-serif italic text-accent">applied AI</span>, with
                hands on delivery of production RAG chatbots, LLM integrations, and AI assisted engineering workflows.
              </p>
              <div className="flex gap-8 mt-9">
                <div>
                  <p className="text-4xl font-extrabold text-white tracking-tighter">3+</p>
                  <p className="text-white/40 text-xs uppercase tracking-[0.14em] mt-1">Years experience</p>
                </div>
                <div>
                  <p className="text-4xl font-extrabold text-white tracking-tighter">MSc</p>
                  <p className="text-white/40 text-xs uppercase tracking-[0.14em] mt-1">AI · reading</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <Terminal />
            </Reveal>
          </div>
        </section>

        {/* ============ SKILLS ============ */}
        <section id="skills" className="max-w-[1160px] mx-auto px-6 md:px-8 pt-24 pb-10">
          <Reveal>
            <SectionHeading title="Skills" animate={false} />
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-2">
            {SKILL_GROUPS.map((g) => (
              <Reveal key={g.name}>
                <div className="glass rounded-2xl p-[26px] h-full">
                  <div className="flex items-center gap-3 mb-[18px]">
                    <span className="glass text-accent flex items-center justify-center w-10 h-10 rounded-[10px] shrink-0">
                      <g.Icon size={20} strokeWidth={1.8} />
                    </span>
                    <h4 className="text-white text-lg font-bold m-0">{g.name}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <span key={s} className={skillChip}>{s}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============ EXPERIENCE ============ */}
        <section id="experience" className="max-w-[1160px] mx-auto px-6 md:px-8 pt-24 pb-10">
          <Reveal>
            <SectionHeading title="Experience" animate={false} />
          </Reveal>
          <div className="flex flex-col gap-6 mt-2">
            {EXPERIENCE.map((exp) => (
              <Reveal key={exp.role + exp.period}>
                <ExperienceCard role={exp.role} company={exp.company} period={exp.period} points={exp.points} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============ EDUCATION ============ */}
        <section id="education" className="max-w-[1160px] mx-auto px-6 md:px-8 pt-24 pb-10">
          <Reveal>
            <SectionHeading title="Education" variant="inline" animate={false} />
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Reveal>
              <InfoCard title="MSc in Artificial Intelligence" subtitle="University of Moratuwa" meta="Expected 2026" />
            </Reveal>
            <Reveal>
              <InfoCard title="BSc (Hons) Computer Science" subtitle="University of Westminster, UK (IIT)" meta="Second Class Upper Division · 2020 – 2024" />
            </Reveal>
          </div>
        </section>

        {/* ============ RESEARCH ============ */}
        <section id="research" className="max-w-[1160px] mx-auto px-6 md:px-8 pt-24 pb-10">
          <Reveal>
            <SectionHeading title="Research Area" animate={false} />
          </Reveal>
          <Reveal className="mt-2">
            <div className="glass rounded-2xl p-6 md:p-9 text-center">
              <p className="text-accent font-mono text-xs mb-2.5">// computer vision · vision transformers</p>
              <h3 className="text-white text-[26px] font-bold tracking-tight">
                Gemstone Identification &amp; Authentication Using Vision Transformers
              </h3>
              <p className="text-white/60 text-base leading-[1.8] mt-4 max-w-[840px] mx-auto text-justify">
                Developed and implemented Vision Transformer (ViT) models for image classification, applied to the
                real world problem of identifying and authenticating gemstones without reliance on expert knowledge
                or specialized tools. Leveraged self attention mechanisms to capture global image features,
                outperforming traditional CNN approaches, and built an image preprocessing pipeline to improve input
                quality and classification reliability. Enhanced accuracy through fine tuning, data augmentation,
                and hyperparameter optimization.
              </p>
              <div className="flex gap-8 mt-7 flex-wrap justify-center">
                {[
                  { value: "75.87%", label: "Testing accuracy", accent: true },
                  { value: "0.72", label: "F1 score" },
                  { value: "0.76", label: "Precision" },
                  { value: "0.73", label: "Recall" }
                ].map((m) => (
                  <div key={m.label}>
                    <p className={`text-3xl font-extrabold tracking-tight ${m.accent ? "text-accent" : "text-white"}`}>{m.value}</p>
                    <p className="text-white/40 text-xs uppercase tracking-[0.14em] mt-1">{m.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-6 justify-center">
                {["PyTorch", "Vision Transformers", "Self Attention", "Data Augmentation", "OpenCV"].map((s) => (
                  <span key={s} className={skillChip}>{s}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ============ AWARD ============ */}
        <section id="award" className="max-w-[1160px] mx-auto px-6 md:px-8 pt-24 pb-10">
          <Reveal>
            <SectionHeading title="Recognition" animate={false} />
          </Reveal>
          <Reveal className="mt-2">
            <div className="glass border-accent/20 rounded-[20px] overflow-hidden grid grid-cols-1 md:grid-cols-[380px_1fr] items-stretch">
              <img
                src={import.meta.env.BASE_URL + "award.jpg"}
                alt="CEO Special Award 2026 trophy, Millennium IT ESP"
                className="block w-full object-cover h-[280px] md:h-full md:min-h-[380px]"
              />
              <div className="px-6 py-8 md:px-12 md:py-11 flex flex-col justify-center text-left">
                <p className="text-accent font-mono text-xs mb-3">// awarded 2026</p>
                <h3 className="text-accent font-serif italic text-[32px] font-normal">CEO Special Award 2026</h3>
                <p className="text-white font-bold text-lg mt-2.5">Millennium IT ESP</p>
                <p className="text-white/60 text-base leading-[1.8] mt-4 max-w-[560px]">
                  Awarded for outstanding contribution and exceptional performance demonstrating excellence and
                  impact in developing the <span className="text-accent">‘Rebuild Sri Lanka Data Collection Platform’</span> following
                  Cyclone Ditwa.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ============ CONTACT ============ */}
        <section id="contact" className="max-w-[1160px] mx-auto px-6 md:px-8 pt-36 pb-24 text-center">
          <Reveal>
            <p className="text-accent font-serif italic text-2xl mb-4">Have a project in mind?</p>
            <GradientHeading size="lg" as="h2">LET’S BUILD SOMETHING</GradientHeading>
            <p className="text-white/50 text-[17px] mt-6 mx-auto max-w-[520px] leading-[1.7]">
              Open to software engineering roles. Kalutara, Sri Lanka, remote friendly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Magnetic className="w-full sm:w-auto">
                <Button variant="accent" size="lg" className="w-full sm:w-auto max-w-full !px-6 sm:!px-10 break-all" href="mailto:tharindujayasankha@gmail.com">
                  tharindujayasankha@gmail.com
                </Button>
              </Magnetic>
              <Button variant="glass" size="lg" className="w-full sm:w-auto" href="tel:+94712067024">
                +94 71 206 70 24
              </Button>
            </div>
            <div className="flex gap-3 justify-center mt-6">
              <Button variant="glass" size="sm" className="flex-1 sm:flex-none max-w-[180px]" href="https://github.com/tharindu1999" target="_blank">
                GitHub ↗
              </Button>
              <Button variant="glass" size="sm" className="flex-1 sm:flex-none max-w-[180px]" href="https://www.linkedin.com/in/tharindu-jayasankha/" target="_blank">
                LinkedIn ↗
              </Button>
            </div>
          </Reveal>
        </section>

        <footer className="border-t border-white/10 px-8 py-7 text-center">
          <p className="text-white/30 font-mono text-xs">
            © 2026 Tharindu Jayasankha, built with <span className="text-accent">&lt;/&gt;</span> and coffee
          </p>
        </footer>
      </main>
    </div>
  );
}
