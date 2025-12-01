import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Code, 
  Server, 
  Database, 
  Brain,
  ChevronDown,
  ExternalLink
} from 'lucide-react';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const heroRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Smooth scroll-based animations for hero section
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const heroY = useTransform(heroScrollProgress, [0, 1], [0, -300]);
  const starsOpacity = useTransform(heroScrollProgress, [0, 0.7, 1], [1, 0.5, 0]);
  const starsScale = useTransform(heroScrollProgress, [0, 1], [1, 1.5]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'education', 'research', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const skills = {
    languages: ['React.js', 'TypeScript/JavaScript', '.NET Core (C#, Entity Framework Core)', 'Node.js', 'Python', 'Java', 'Nx Workspace', 'GraphQL', 'Nearley.js', 'Moo'],
    devops: ['Docker', 'Kubernetes', 'Azure DevOps', 'Git', 'CI/CD Pipelines', 'Redis'],
    databases: ['PostgreSQL', 'MongoDB', 'RabbitMQ', 'SQL Server'],
    aiml: ['TensorFlow', 'PyTorch', 'Hugging Face Transformers', 'scikit-learn', 'LangChain', 'RAG pipelines']
  };

  const experiences = [
    {
      title: 'Software Engineer',
      company: 'Millennium IT ESP',
      period: '2024 - Present',
      achievements: [
        'Developed and migrated authentication and authorization systems from Role-Based Access Control (RBAC) to Attribute-Based Access Control (ABAC).',
        'Integrated and configured ASP.NET Identity Server 4 for secure token management and authentication.',
        'Deployed and managed containerized microservices with Docker and Kubernetes, ensuring scalability, reliability, and high availability.',
        'Designed, optimized, and maintained relational (SQL Server, PostgreSQL) and non-relational (MongoDB) databases.',
        'Utilized Azure cloud services for streamlined application deployment, monitoring, and maintenance.',
        'Managed inter-service communication through RabbitMQ and implemented caching and session management using Redis.',
        'Developed Python-based solutions for automated image validation to improve accuracy and reliability in data processing workflows.',
        'Built and optimized chatbot solutions with Retrieval-Augmented Generation (RAG) pipelines, leveraging Python, LangChain, vector databases, and Node.js.',
        'Led research and development initiatives on cloud-native AI solutions using Azure Cognitive Services and multiple Large Language Models (LLMs), with a focus on real-time Speech-to-Text processing and advanced speaker diarization.'
      ]
    },
    {
      title: 'Associate Software Engineer',
      company: 'Millennium IT ESP',
      period: '2023 -2024',
      achievements: [
        'Built responsive and scalable front-end applications using React.js, TypeScript, and Nx Workspace within a micro frontend architecture.',
        'Developed modern UI components with Tailwind CSS and Ant Design, ensuring cross-device responsiveness and accessibility.',
        'Developed RESTful Web APIs with ASP.NET Core, utilizing Entity Framework Core and LINQ for efficient data querying and business logic implementation.',
        'Integrated GraphQL APIs to optimize client-server communication in enterprise applications.',
        'Implemented advanced tokenizer systems and modular rule engines using Nearley.js and Moo in Node.js, capable of parsing complex domain-specific languages (DSLs) and validating high-volume data streams with low latency.'
      ]
    },
    {
      title: 'Intern Software Engineer',
      company: 'Millennium IT ESP',
      period: '2022 -2023',
      achievements: [
        'Contributed to the development of a React.js-based spreadsheet-style calculation and reporting system, implementing features such as dynamic formulas, data validation, and custom report generation.',
        'Applied unit testing and integration testing to ensure software reliability and maintainability.',
        'Gained hands-on experience with version control (Git), Azure DevOps pipelines, and agile practices such as daily stand-ups, sprint planning, and reviews under Scrum methodology.'
      ]
    }
  ];

  return (
    <div className="app">
      {/* Progress Bar */}
      <motion.div className="progress-bar" style={{ scaleX }} />

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-content">
          <motion.div 
            className="logo"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            TJ
          </motion.div>
          <div className="nav-links">
            {['Home', 'About', 'Skills', 'Experience', 'Education', 'Research', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={activeSection === item.toLowerCase() ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.toLowerCase());
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        id="home" 
        className="hero"
        ref={heroRef}
        style={{
          opacity: heroOpacity,
          y: heroY
        }}
      >
        <motion.div 
          className="stars"
          style={{
            opacity: starsOpacity,
            scale: starsScale
          }}
        ></motion.div>
        <motion.div 
          className="stars2"
          style={{
            opacity: starsOpacity,
            scale: starsScale
          }}
        ></motion.div>
        <motion.div 
          className="stars3"
          style={{
            opacity: starsOpacity,
            scale: starsScale
          }}
        ></motion.div>
        
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            THARINDU JAYASANKHA
          </motion.h1>
          <motion.div 
            className="glitch-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            SOFTWARE ENGINEER
          </motion.div>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Full-Stack Developer | AI Engineer
          </motion.p>
          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <button className="btn-primary" onClick={() => scrollToSection('contact')}>
              Get In Touch
            </button>
            <button className="btn-secondary" onClick={() => scrollToSection('experience')}>
              View Work
            </button>
          </motion.div>
          <motion.div
            className="scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <ChevronDown size={32} />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <section id="about" className="section about-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">ABOUT ME</h2>
            <div className="about-content">
              <div className="about-text">
                <p className="lead">
                  Experienced Software Engineer skilled in full-stack development with expertise in React.js, .NET Core, and Kubernetes. Proven ability to design scalable, high-performance software solutions, collaborate effectively in agile, cross-functional teams, and align technology with business objectives.
                </p>
                <div className="contact-info">
                  <div className="contact-item">
                    <Mail size={20} />
                    <a href="mailto:tharindujayasankha@gmail.com">tharindujayasankha@gmail.com</a>
                  </div>
                  <div className="contact-item">
                    <Phone size={20} />
                    <a href="tel:+94712067024">(+94) 712067024</a>
                  </div>
                  <div className="contact-item">
                    <MapPin size={20} />
                    <span>Tilwaththa, Remunagoda, Kaluthara</span>
                  </div>
                </div>
                <div className="social-links">
                  <a href="https://github.com/tharindu1999" target="_blank" rel="noopener noreferrer" className="social-link">
                    <Github size={24} />
                  </a>
                  <a href="https://www.linkedin.com/in/tharindu-jayasankha/" target="_blank" rel="noopener noreferrer" className="social-link">
                    <Linkedin size={24} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section skills-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">TECHNICAL SKILLS</h2>
            <div className="skills-grid">
              <motion.div 
                className="skill-card"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="skill-icon">
                  <Code size={32} />
                </div>
                <h3>Languages & Frameworks</h3>
                <div className="skill-tags">
                  {skills.languages.map((skill, i) => (
                    <span key={i} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                className="skill-card"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="skill-icon">
                  <Server size={32} />
                </div>
                <h3>DevOps & Tools</h3>
                <div className="skill-tags">
                  {skills.devops.map((skill, i) => (
                    <span key={i} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                className="skill-card"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="skill-icon">
                  <Database size={32} />
                </div>
                <h3>Databases & Queues</h3>
                <div className="skill-tags">
                  {skills.databases.map((skill, i) => (
                    <span key={i} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                className="skill-card"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="skill-icon">
                  <Brain size={32} />
                </div>
                <h3>AI/ML & Tools</h3>
                <div className="skill-tags">
                  {skills.aiml.map((skill, i) => (
                    <span key={i} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section experience-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">CAREER EXPERIENCE</h2>
            <div className="timeline">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  className="timeline-item"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h3>{exp.title}</h3>
                      <span className="company">{exp.company}</span>
                      <span className="period">{exp.period}</span>
                    </div>
                    <ul className="achievements">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="section education-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">EDUCATION</h2>
            <div className="education-grid">
              <motion.div 
                className="education-card"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3>Master of Science in Artificial Intelligence</h3>
                <p className="institution">University of Moratuwa</p>
                <p className="status">Reading</p>
              </motion.div>
              <motion.div 
                className="education-card"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3>Bachelor of Science (Honors) in Computer Science</h3>
                <p className="institution">Informatics Institute of Technology</p>
                <p className="status">2020 - 2024</p>
              </motion.div>
              <motion.div 
                className="education-card"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3>GCE Advanced Level</h3>
                <p className="institution">Kalutara Vidyalaya National School</p>
                <p className="status">2018</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="section research-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">RESEARCH AREA</h2>
            <div className="research-content">
              <motion.div 
                className="research-card"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3>Vision Transformers in Computer Vision</h3>
                <p>
                  Developed and implemented Vision Transformer (ViT) models for image classification tasks, exploring the use of transformer architectures in computer vision. Focused on leveraging self-attention mechanisms to capture global image features, improving model performance on large-scale datasets compared to traditional CNNs. Enhanced model accuracy through fine-tuning, data augmentation, and hyperparameter optimization, contributing to advancements in the application of transformers in visual recognition tasks.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">GET IN TOUCH</h2>
            <div className="contact-content">
              <p className="contact-intro">
                I'm always interested in hearing about new opportunities and collaborations. 
                Feel free to reach out!
              </p>
              <div className="contact-methods">
                <motion.a 
                  href="mailto:tharindujayasankha@gmail.com"
                  className="contact-method"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Mail size={32} />
                  <span>Email Me</span>
                  <ExternalLink size={16} />
                </motion.a>
                <motion.a 
                  href="https://www.linkedin.com/in/tharindu-jayasankha/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-method"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Linkedin size={32} />
                  <span>LinkedIn</span>
                  <ExternalLink size={16} />
                </motion.a>
                <motion.a 
                  href="https://github.com/tharindu1999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-method"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Github size={32} />
                  <span>GitHub</span>
                  <ExternalLink size={16} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Tharindu Jayasankha. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
