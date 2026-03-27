/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import React, { useState, useEffect, useRef } from "react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Cpu, 
  Cloud, 
  ChevronRight,
  ArrowUpRight,
  Menu,
  X,
  Download,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Terminal,
  Database,
  BrainCircuit,
  Settings
} from "lucide-react";

const EXPERIENCE = [
  {
    company: "Millennium IT ESP",
    role: "Software Engineer",
    period: "2024 – Present",
    points: [
      "Developed and migrated authentication and authorization systems from RBAC to ABAC.",
      "Integrated and configured ASP.NET Identity Server 4 for secure token management.",
      "Deployed and managed containerized microservices with Docker and Kubernetes.",
      "Designed, optimized, and maintained SQL Server, PostgreSQL, and MongoDB databases.",
      "Utilized Azure cloud services for streamlined application deployment and monitoring.",
      "Managed inter-service communication through RabbitMQ and implemented Redis caching.",
      "Built and optimized chatbot solutions with Retrieval-Augmented Generation (RAG) pipelines, leveraging Python, LangChain, vector databases, and Node.js.",
      "Developed Python-based solutions for automated image validation to improve accuracy and reliability in data processing workflows.",
      "Led research and development initiatives on cloud-native AI solutions using Azure Cognitive Services and multiple Large Language Models (LLMs), with a focus on real-time Speech-to-Text processing and advanced speaker diarization."
    ]
  },
  {
    company: "Millennium IT ESP",
    role: "Associate Software Engineer",
    period: "2023 – 2024",
    points: [
      "Built responsive and scalable front-end applications using React.js, TypeScript, and Nx Workspace within a micro frontend architecture.",
      "Developed modern UI components with Tailwind CSS and Ant Design, ensuring cross-device responsiveness and accessibility.",
      "Developed RESTful Web APIs with ASP.NET Core, utilizing Entity Framework Core and LINQ for efficient data querying and business logic implementation.",
      "Integrated GraphQL APIs to optimize client–server communication in enterprise applications.",
      "Implemented advanced tokenizer systems and modular rule engines using Nearley.js and Moo in Node.js, capable of parsing complex domain-specific languages (DSLs) and validating high-volume data streams with low latency."
    ]
  },
  {
    company: "Millennium IT ESP",
    role: "Intern Software Engineer",
    period: "2022 – 2023",
    points: [
      "Contributed to a React.js–based spreadsheet-style calculation and reporting system.",
      "Applied unit testing and integration testing to ensure software reliability.",
      "Gained hands-on experience with Git, Azure DevOps pipelines, and Scrum methodology."
    ]
  }
];

const SKILL_GROUPS = [
  {
    title: "Languages",
    icon: <Terminal size={20} />,
    skills: ["C#", "TypeScript", "JavaScript", "Python", "R"]
  },
  {
    title: "Backend",
    icon: <Settings size={20} />,
    skills: ["ASP.NET Core", "Entity Framework", "Node.js", "GraphQL"]
  },
  {
    title: "Frontend",
    icon: <Code2 size={20} />,
    skills: ["React.js", "Tailwind CSS", "Ant Design", "Nx Workspace"]
  },
  {
    title: "Cloud & DevOps",
    icon: <Cloud size={20} />,
    skills: ["Docker", "Kubernetes", "Azure", "Azure DevOps", "CI/CD"]
  },
  {
    title: "Databases & Messaging",
    icon: <Database size={20} />,
    skills: ["PostgreSQL", "MongoDB", "RabbitMQ", "Redis"]
  },
  {
    title: "AI/ML & Tools",
    icon: <BrainCircuit size={20} />,
    skills: ["TensorFlow", "PyTorch", "Hugging Face", "LangChain", "RAG"]
  }
];

const EDUCATION = [
  {
    degree: "Master of Science in Artificial Intelligence (Reading)",
    institution: "University of Moratuwa",
    period: ""
  },
  {
    degree: "Bachelor of Science (Honors) in Computer Science",
    institution: "Informatics Institute of Technology",
    period: "2020 - 2024"
  },
  {
    degree: "GCE Advanced Level",
    institution: "Kalutara Vidyalaya National School",
    period: "2018"
  }
];

const ACHIEVEMENTS = [
  {
    title: "CEO Special Award 2026",
    organization: "Millennium IT ESP",
    description: "Awarded for outstanding contribution and exceptional performance demonstrating excellence and impact in developing the 'Rebuild Sri Lanka Data Collection Platform' following Cyclone Ditwa.",
    icon: <ArrowUpRight size={24} />,
    image: "/award.jpg"
  }
];

const TechCube = ({ scrollProgress }: { scrollProgress: any }) => {
  const rotateX = useTransform(scrollProgress, [0, 1], [45, 405]);
  const rotateY = useTransform(scrollProgress, [0, 1], [45, 405]);
  const explode = useTransform(scrollProgress, [0.1, 0.5], [0, 100]);
  const opacity = useTransform(scrollProgress, [0, 0.1, 0.8, 1], [0, 0.4, 0.4, 0]);

  return (
    <motion.div 
      style={{ rotateX, rotateY, opacity }}
      className="w-48 h-48 preserve-3d relative pointer-events-none"
    >
      {/* Cube Faces */}
      {[
        { transform: "rotateY(0deg) translateZ(var(--tz))", color: "bg-accent/40" },
        { transform: "rotateY(180deg) translateZ(var(--tz))", color: "bg-accent/30" },
        { transform: "rotateY(90deg) translateZ(var(--tz))", color: "bg-accent/20" },
        { transform: "rotateY(-90deg) translateZ(var(--tz))", color: "bg-accent/10" },
        { transform: "rotateX(90deg) translateZ(var(--tz))", color: "bg-accent/50" },
        { transform: "rotateX(-90deg) translateZ(var(--tz))", color: "bg-accent/60" },
      ].map((face, i) => (
        <motion.div
          key={i}
          style={{ 
            transform: face.transform,
            "--tz": explode.get() + 96 + "px"
          } as any}
          className={`absolute inset-0 border border-accent/50 ${face.color} backdrop-blur-sm flex items-center justify-center`}
        >
          <div className="w-full h-full border border-accent/20 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-accent/40 blur-sm" />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);


  return (
    <div ref={containerRef} className="relative min-h-screen selection:bg-accent selection:text-white cursor-none">
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 bg-accent rounded-full pointer-events-none z-[100] mix-blend-difference"
        animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
        transition={{ type: "spring", damping: 20, stiffness: 250, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[100]"
        animate={{ x: mousePos.x - 4, y: mousePos.y - 4 }}
        transition={{ type: "spring", damping: 30, stiffness: 500, mass: 0.2 }}
      />

      {/* Background Atmosphere */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full" />
      </div>

      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-bg"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-serif italic text-accent"
            >
              Tharindu.
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-8 md:px-12 flex justify-between items-center">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={isLoaded ? { x: 0, opacity: 1 } : {}}
          className="text-2xl font-serif italic font-bold tracking-tighter"
        >
          TJ.
        </motion.div>

        <div className="hidden md:flex gap-8 items-center">
          {["Experience", "Achievements", "Skills", "Education", "Research"].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ y: -10, opacity: 0 }}
              animate={isLoaded ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1 * i + 0.5 }}
              className="text-sm uppercase tracking-widest text-white/60 hover:text-accent transition-colors"
            >
              {item}
            </motion.a>
          ))}
          <Magnetic>
            <a
              href="/THARINDU_JAYASANKHA_CV.pdf"
              download="Tharindu_Jayasankha_CV.pdf"
              className="px-6 py-2 glass hover:bg-accent/20 transition-all text-sm uppercase tracking-widest flex items-center gap-2"
            >
              <Download size={16} /> Download CV
            </a>
          </Magnetic>
        </div>

        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-bg/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {["Experience", "Achievements", "Skills", "Education", "Research"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-serif italic hover:text-accent transition-colors"
              >
                {item}
              </a>
            ))}
            <a
              href="/THARINDU_JAYASANKHA_CV.pdf"
              download="Tharindu_Jayasankha_CV.pdf"
              onClick={() => setIsMenuOpen(false)}
              className="px-8 py-4 bg-accent text-white rounded-full flex items-center gap-2"
            >
              <Download size={20} /> Download CV
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="px-6 md:px-12 pt-32">
        {/* Hero Section */}
        <motion.section 
          style={{ y: heroY, opacity: heroOpacity }}
          className="min-h-[80vh] flex flex-col justify-center max-w-6xl mx-auto"
        >
          <div className="space-y-4">
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={isLoaded ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="text-accent font-serif italic text-xl"
            >
              Software Engineer
            </motion.p>
            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={isLoaded ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.9] text-gradient relative z-10"
            >
              THARINDU <br />
              JAYASANKHA
            </motion.h1>

            {/* Interactive Tech Cube */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 perspective-1000 hidden lg:block">
              <TechCube scrollProgress={scrollYProgress} />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : {}}
              transition={{ delay: 1.2 }}
              className="flex flex-col md:flex-row gap-8 pt-12 items-start md:items-center"
            >
              <div className="max-w-xl space-y-4">
                <p className="text-lg text-white/50 leading-relaxed">
                  Experienced Software Engineer skilled in full-stack development with expertise in React.js, ASP.NET Core, and Kubernetes. Proven ability to design scalable, high-performance software solutions.
                </p>
                <div className="flex flex-wrap gap-4 text-xs text-white/40 uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Phone size={12} /> (+94) 71 206 70 24</span>
                  <span className="flex items-center gap-1"><Mail size={12} /> tharindujayasankha@gmail.com</span>
                  <span className="flex items-center gap-1"><MapPin size={12} /> Tilwaththa, Remunagoda, Kaluthara</span>
                </div>
              </div>
              <div className="flex gap-4">
                <Magnetic>
                  <a href="https://github.com/tharindu1999" target="_blank" className="p-4 glass hover:glow transition-all block">
                    <Github size={20} />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a href="https://www.linkedin.com/in/tharindu-jayasankha/" target="_blank" className="p-4 glass hover:glow transition-all block">
                    <Linkedin size={20} />
                  </a>
                </Magnetic>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Experience Section */}
        <section id="experience" className="py-32 max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-serif italic"
            >
              Experience
            </motion.h2>
            <Briefcase className="text-accent mb-2" size={32} />
          </div>

          <div className="space-y-12">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={exp.role + exp.period}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 md:p-12 relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-accent scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500" />
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-2xl font-bold">{exp.role}</h3>
                    <p className="text-accent font-serif italic">{exp.company}</p>
                  </div>
                  <p className="text-white/40 uppercase tracking-widest text-sm">{exp.period}</p>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {exp.points.map((point, j) => (
                    <li key={j} className="text-white/60 text-sm flex gap-3">
                      <ChevronRight size={14} className="text-accent shrink-0 mt-1" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="py-32 max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-serif italic"
            >
              Achievements
            </motion.h2>
            <ArrowUpRight className="text-accent mb-2" size={32} />
          </div>

          <div className="grid grid-cols-1 gap-12">
            {ACHIEVEMENTS.map((ach, i) => (
              <motion.div
                key={ach.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 md:p-12 relative overflow-hidden group border-accent/20"
              >
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                  <div className="flex-1 relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 bg-accent/10 rounded-2xl text-accent">
                        {ach.icon}
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold">{ach.title}</h3>
                        <p className="text-accent font-serif italic">{ach.organization}</p>
                      </div>
                    </div>
                    <p className="text-white/60 text-lg leading-relaxed mb-8">
                      {ach.description}
                    </p>
                  </div>
                  
                  {ach.image && (
                    <div className="w-full lg:w-72 aspect-[3/4] relative group/img overflow-hidden rounded-2xl border border-white/10">
                      <img 
                        src={ach.image} 
                        alt={ach.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end p-6">
                        <span className="text-xs uppercase tracking-widest text-white/60">Official Award</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="absolute top-0 right-0 p-8 text-accent/5 pointer-events-none">
                  <ArrowUpRight size={240} />
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-transparent opacity-30" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-32 max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-serif italic"
            >
              Technical Skills
            </motion.h2>
            <Terminal className="text-accent mb-2" size={32} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILL_GROUPS.map((group, i) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-8 glass hover:border-accent/50 transition-colors group"
              >
                <div className="mb-6 text-accent group-hover:scale-110 transition-transform">
                  {group.icon}
                </div>
                <h4 className="text-lg font-bold mb-4">{group.title}</h4>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map(skill => (
                    <span key={skill} className="text-[10px] uppercase tracking-widest px-2 py-1 glass text-white/40 group-hover:text-white group-hover:border-accent/30 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education & Research Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-32 max-w-6xl mx-auto">
          <section id="education">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-4xl font-serif italic">Education</h2>
              <GraduationCap className="text-accent" size={28} />
            </div>
            <div className="space-y-6">
              {EDUCATION.map((edu, i) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="glass p-6"
                >
                  <h4 className="font-bold text-lg">{edu.degree}</h4>
                  <p className="text-accent/80 text-sm">{edu.institution}</p>
                  {edu.period && <p className="text-white/30 text-xs mt-2">{edu.period}</p>}
                </motion.div>
              ))}
            </div>
          </section>

          <section id="research">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-4xl font-serif italic">Research</h2>
              <BrainCircuit className="text-accent" size={28} />
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-8 space-y-4"
            >
              <h4 className="text-xl font-bold">Vision Transformers in Computer Vision</h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Developed and implemented Vision Transformer (ViT) models for image classification tasks, exploring the use of transformer architectures in computer vision. Focused on leveraging self-attention mechanisms to capture global image features, improving model performance on large-scale datasets compared to traditional CNNs.
              </p>
              <div className="flex gap-2">
                <span className="text-[10px] uppercase tracking-widest px-2 py-1 glass text-white/40">ViT</span>
                <span className="text-[10px] uppercase tracking-widest px-2 py-1 glass text-white/40">Self-Attention</span>
                <span className="text-[10px] uppercase tracking-widest px-2 py-1 glass text-white/40">CNN Comparison</span>
              </div>
            </motion.div>
          </section>
        </div>



        {/* Contact Section */}
        <section id="contact" className="py-32 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <h2 className="text-5xl md:text-8xl font-serif italic tracking-tighter">
              Let's build <br /> something <span className="text-accent">great.</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              <Magnetic>
                <a 
                  href="mailto:tharindujayasankha@gmail.com" 
                  className="px-12 py-6 bg-accent text-white font-bold rounded-full hover:glow transition-all flex items-center gap-3"
                >
                  Get in touch <ArrowUpRight size={20} />
                </a>
              </Magnetic>
              <Magnetic>
                <a 
                  href="/THARINDU_JAYASANKHA_CV.pdf"
                  download="Tharindu_Jayasankha_CV.pdf"
                  className="px-12 py-6 glass hover:bg-white/5 transition-all rounded-full flex items-center gap-3"
                >
                  Download CV <Download size={20} />
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-white/30 text-xs uppercase tracking-[0.2em]">
          © 2026 Tharindu Jayasankha. All rights reserved.
        </p>
        <div className="flex gap-8">
          <a href="https://github.com/tharindu1999" target="_blank" className="text-xs uppercase tracking-[0.2em] text-white/30 hover:text-accent transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/tharindu-jayasankha/" target="_blank" className="text-xs uppercase tracking-[0.2em] text-white/30 hover:text-accent transition-colors">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}
