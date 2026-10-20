import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Moon,
  Sun,
  Mail,
  Download,
  ExternalLink,
  Code2,
  Database,
  Award,
  FileText,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Briefcase,
  Menu,
  X,
  Send,
  Sparkles,
  Layers,
  Calendar,
} from "lucide-react";
import { Github, Linkedin, FileWord } from "./components/Icons";
import "./App.css";

function Portfolio() {
  // Theme state with localStorage persistence
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved !== null ? saved === "dark" : true;
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);

  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: null,
    message: "",
  });

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const skillsData = {
    Frontend: [
      { name: "HTML & CSS", level: 95 },
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "React.js", level: 88 },
      { name: "Next.js", level: 80 },
      { name: "TypeScript", level: 78 },
      { name: "Tailwind CSS", level: 85 },
    ],
    Backend: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 85 },
      { name: "RESTful APIs", level: 88 },
    ],
    Database: [
      { name: "MongoDB & Mongoose", level: 84 },
      { name: "MySQL", level: 80 },
    ],
    "Tools & Technologies": [
      { name: "Git & GitHub", level: 90 },
      { name: "VS Code", level: 95 },
      { name: "Postman", level: 85 },
      { name: "Vite", level: 88 },
    ],
  };

  const projects = [
    {
      title: "College LMS Dashboard",
      description:
        "A full-featured learning management dashboard designed to manage students, courses, assignments, and academic performance tracking with real-time updates.",
      tech: ["React.js", "Next.js", "TypeScript", "MongoDB"],
      github: "https://github.com/",
      demo: "https://github.com/",
      tag: "Full Stack",
    },
    {
      title: "Transport Management System",
      description:
        "A web-based transportation management portal for managing college bus routes, vehicle schedules, seat allocations, and driver logistics seamlessly.",
      tech: ["HTML", "CSS", "JavaScript", "Node.js", "MySQL"],
      github: "https://github.com/",
      demo: "https://github.com/",
      tag: "Web App",
    },
    {
      title: "Female Unemployment Analysis",
      description:
        "An in-depth data analysis and visualization study comparing female unemployment trends and labor force indicators across India, BRICS, and South Asian countries.",
      tech: ["Python", "Pandas", "Data Analysis", "Matplotlib"],
      github: "https://github.com/",
      demo: "https://github.com/",
      tag: "Data Science",
    },
  ];
  const certifications = [
    {
      title: "HackJKLU 2025 — Coordinator",
      category: "Leadership & Technical Hackathon",
      year: "2025",
    },
    {
      title: "Sabrang 2026 — Core Member",
      category: "Core Cultural Fest Coordination",
      year: "2026",
    },
    {
      title: "Sabrang — Coordinator, 2024 & 2025",
      category: "Cultural Fest Coordination & Event Management",
      year: "2024–2025",
    },
    {
      title: "Spardha — Coordinator",
      category: "Inter-College Sports Event",
      year: "2024",
    },
    {
      title: "Aarambh — Cohort Leader",
      category: "Student Leadership",
      year: "2025",
    },
    {
      title: "Prizes & Certificates Team — Core Member",
      category: "Spardha & Hackathon",
      year: "2025",
    },
  ];

  const timelineItems = [
    {
      period: "2024 – Present",
      title: "B.Tech – Computer Science & Engineering",
      org: "JK Lakshmipat University, Jaipur",
      description:
        "Pursuing core computer science engineering covering data structures, algorithms, database management, software engineering, and modern web architectures.",
    },
    {
      period: "2024 – Present",
      title: "Technical Development & Projects",
      org: "Full Stack Exploration & Engineering",
      description:
        "Building responsive web applications and full-stack systems using React.js, Node.js, Express, MongoDB, and modern developer toolchains.",
    },
    {
      period: "Leadership & Activities",
      title: "Event Coordination & Leadership",
      org: "University Leadership Roles",
      description:
        "Serving as Cultural Coordinator, Cohort Leader, and logistics lead across flagship university hackathons and inter-college cultural symposiums.",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, success: null, message: "" });

    try {
      // Send message to the backend endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormStatus({
          submitting: false,
          success: true,
          message: data.message || "Thank you! Your message was received successfully.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormStatus({
          submitting: false,
          success: false,
          message:
            data.error ||
            "Unable to submit message right now. Please try again or reach out directly via email.",
        });
      }
    } catch (err) {
      console.error("Contact form submission error:", err);
      setFormStatus({
        submitting: false,
        success: false,
        message:
          "Network error while connecting to the server. Please ensure the backend is running.",
      });
    }
  };

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      {/* Ambient background glows */}
      <div className="ambient-glow-1" />
      <div className="ambient-glow-2" />
      <div className="ambient-glow-3" />

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="logo">
            Jheel<span>.</span>
          </Link>

          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#education">Timeline</a>
            <a href="#certifications">Achievements</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="nav-actions">
            <button
              className="nav-cv-btn"
              onClick={() => setCvModalOpen(true)}
              aria-label="Download CV"
            >
              <Download size={16} />
              <span>Resume</span>
            </button>

            <button
              className="theme-btn"
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-nav">
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>
              About
            </a>
            <a href="#skills" onClick={() => setMobileMenuOpen(false)}>
              Skills
            </a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)}>
              Projects
            </a>
            <a href="#education" onClick={() => setMobileMenuOpen(false)}>
              Timeline
            </a>
            <a href="#certifications" onClick={() => setMobileMenuOpen(false)}>
              Achievements
            </a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </a>
            <button
              className="nav-cv-btn"
              style={{ justifyContent: "center", marginTop: "0.5rem" }}
              onClick={() => {
                setMobileMenuOpen(false);
                setCvModalOpen(true);
              }}
            >
              <Download size={16} />
              <span>Download CV (PDF / DOCX)</span>
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="hero-section">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="intro-badge">
            <span className="status-dot"></span>
            <span>Available for Opportunities</span>
          </div>

          <h1>
            Hi, I'm <span className="hero-name-gradient">Jheel Jain</span>
          </h1>

          <h2>Computer Science Engineering Student</h2>

          <p className="hero-description">
            Aspiring Full Stack Developer passionate about building responsive,
            scalable, and user-centric web applications with modern frontend and
            backend technologies.
          </p>

          <div className="hero-buttons">
            <a href="#projects" className="primary-btn">
              <span>View My Work</span>
            </a>

            <a href="#contact" className="secondary-btn">
              <span>Contact Me</span>
            </a>

            <button
              className="cv-trigger-btn"
              onClick={() => setCvModalOpen(true)}
            >
              <Download size={18} />
              <span>Download CV</span>
            </button>
          </div>

          <div className="social-links">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="social-icon-btn"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <Github size={20} />
            </a>

            <a
              href="https://www.linkedin.com/in/jheel-jain-a14913357/"
              target="_blank"
              rel="noreferrer"
              className="social-icon-btn"
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={20} />
            </a>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=jainjheel1406@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="social-icon-btn"
              title="Send Email"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="avatar-wrapper">
            <div className="avatar-inner">
              <span className="avatar-initials">JJ</span>
              <span className="avatar-tag">B.Tech CSE</span>
            </div>
          </div>

          <div className="floating-card card-one">
            <Code2 size={20} />
            <span>Full Stack Dev</span>
          </div>

          <div className="floating-card card-two">
            <Database size={20} />
            <span>MERN Stack</span>
          </div>

          <div className="floating-card card-three">
            <Sparkles size={18} />
            <span>JKLU CSE '28</span>
          </div>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-tag">01 // Discovery</div>
          <h2>About Me</h2>
          <p className="section-desc">
            Get to know my academic background, technical focus, and passion for
            technology.
          </p>
        </motion.div>

        <div className="about-grid">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p>
              I'm a dedicated Computer Science Engineering student with an eager
              curiosity for full-stack software development, distributed systems,
              and modern user interfaces.
            </p>

            <p>
              I take pride in translating technical concepts and designs into
              functional, accessible web platforms. Outside of coding, I'm
              actively involved in event organization and student leadership at
              JK Lakshmipat University.
            </p>

            <div className="about-details">
              <div className="detail-card">
                <div className="label">Location</div>
                <div className="value">India</div>
              </div>

              <div className="detail-card">
                <div className="label">Status</div>
                <div className="value">Student / Fresher</div>
              </div>

              <div className="detail-card">
                <div className="label">Degree</div>
                <div className="value">B.Tech CSE</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about-highlights"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="highlight-box">
              <div className="highlight-icon">
                <Code2 size={22} />
              </div>
              <div>
                <h4>Problem Solving</h4>
                <p>
                  Strong grounding in computer science fundamentals, data
                  structures, and systematic debugging.
                </p>
              </div>
            </div>

            <div className="highlight-box">
              <div className="highlight-icon">
                <Layers size={22} />
              </div>
              <div>
                <h4>MERN Stack</h4>
                <p>
                  Hands-on experience with MongoDB, Express, React, and Node.js
                  to deliver end-to-end applications.
                </p>
              </div>
            </div>

            <div className="highlight-box">
              <div className="highlight-icon">
                <Briefcase size={22} />
              </div>
              <div>
                <h4>Campus Leadership</h4>
                <p>
                  Active organizer and coordinator for university hackathons,
                  sports meets, and cultural festivals.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="section-tag">02 // Capabilities</div>
          <h2>Skills & Expertise</h2>
          <p className="section-desc">
            Technologies and toolsets I use to bring ideas to life.
          </p>
        </motion.div>

        <div className="skills-grid">
          {Object.entries(skillsData).map(([category, items], idx) => (
            <motion.div
              className="skill-card"
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="skill-card-header">
                <div className="skill-cat-icon">
                  {category === "Frontend" && <Code2 size={22} />}
                  {category === "Backend" && <Layers size={22} />}
                  {category === "Database" && <Database size={22} />}
                  {category === "Tools & Technologies" && <Sparkles size={22} />}
                </div>
                <h3>{category}</h3>
              </div>

              <div className="skill-items">
                {items.map((skill) => (
                  <div className="skill-item" key={skill.name}>
                    <div className="skill-info">
                      <span>{skill.name}</span>
                      <span className="skill-pct">{skill.level}%</span>
                    </div>

                    <div className="skill-bar">
                      <motion.div
                        className="skill-progress"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="section-tag">03 // Featured Work</div>
          <h2>Recent Projects</h2>
          <p className="section-desc">
            A selection of applications and analytical projects I've built.
          </p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              className="project-card"
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.12, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="project-card-header">
                <span className="project-number">0{index + 1}</span>
                <span className="project-badge">{project.tag}</span>
              </div>

              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <div className="tech-list">
                {project.tech.map((tech) => (
                  <span className="tech-badge" key={tech}>
                    {tech}
                  </span>
                ))}
              </div>

              <div className="project-links">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="project-link-btn"
                  title="View Source on GitHub"
                >
                  <Github size={17} />
                  <span>GitHub</span>
                </a>

                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="project-link-btn primary"
                  title="Live Demo"
                >
                  <ExternalLink size={17} />
                  <span>Live Demo</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EDUCATION & TIMELINE */}
      <section id="education" className="section">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="section-tag">04 // Journey</div>
          <h2>Education & Experience</h2>
          <p className="section-desc">
            Academic milestones and development timeline.
          </p>
        </motion.div>

        <div className="timeline">
          {timelineItems.map((item, idx) => (
            <motion.div
              className="timeline-item"
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="timeline-dot" />

              <div className="timeline-content">
                <div className="timeline-period">
                  <Calendar size={14} />
                  <span>{item.period}</span>
                </div>

                <h3>{item.title}</h3>
                <div className="timeline-org">{item.org}</div>
                <p>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CERTIFICATIONS & ACHIEVEMENTS */}
      <section id="certifications" className="section">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="section-tag">05 // Honors & Roles</div>
          <h2>Certifications & Achievements</h2>
          <p className="section-desc">
            Key university leadership initiatives, sports events, and hackathons.
          </p>
        </motion.div>

        <div className="certifications-grid">
          {certifications.map((cert, idx) => (
            <motion.div
              className="certificate-card"
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="cert-icon-wrapper">
                <Award size={26} />
              </div>

              <div>
                <h3>{cert.title}</h3>
                <p>
                  {cert.category} • {cert.year}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section contact-section">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="section-tag">06 // Communication</div>
          <h2>Let's Connect</h2>
          <p className="section-desc">
            Feel free to send a message or inquire about collaborations.
          </p>
        </motion.div>

        <div className="contact-container">
          <div className="contact-info">
            <h3>Have a project or opportunity in mind?</h3>
            <p>
              Whether you have an internship opening, a project discussion, or
              just want to say hi, my inbox is always open. Fill out the form or
              connect via email.
            </p>

            <div className="contact-cards">
              <div className="contact-card-item">
                <div className="contact-card-icon">
                  <Mail size={22} />
                </div>
                <div>
                  <h4>Email Address</h4>
                  <a href="mailto:jheeljain@example.com">jheeljain@example.com</a>
                </div>
              </div>

              <div className="contact-card-item">
                <div className="contact-card-icon">
                  <MapPin size={22} />
                </div>
                <div>
                  <h4>Location</h4>
                  <span>Jaipur / India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleContactSubmit}>
              {formStatus.message && (
                <div
                  className={`form-alert ${formStatus.success ? "success" : "error"
                    }`}
                >
                  {formStatus.success ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <AlertCircle size={18} />
                  )}
                  <span>{formStatus.message}</span>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="e.g. Alex Smith"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="e.g. alex@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Write your message here..."
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={formStatus.submitting}
              >
                {formStatus.submitting ? (
                  <>
                    <span className="spinner" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CV DOWNLOAD MODAL */}
      <AnimatePresence>
        {cvModalOpen && (
          <div
            className="modal-overlay"
            onClick={() => setCvModalOpen(false)}
          >
            <motion.div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
            >
              <div className="modal-header">
                <div>
                  <h3>Download Curriculum Vitae</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                    Select your preferred document format:
                  </p>
                </div>
                <button
                  className="modal-close-btn"
                  onClick={() => setCvModalOpen(false)}
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="cv-options">
                {/* PDF Option */}
                <div className="cv-option-card">
                  <div className="cv-option-left">
                    <div className="cv-file-icon">
                      <FileText size={24} />
                    </div>
                    <div className="cv-file-info">
                      <h4>PDF Document</h4>
                      <span>Recommended for viewing & ATS</span>
                    </div>
                  </div>

                  <a
                    href="/cv/Jheel_Jain_Resume.pdf"
                    download="Jheel_Jain_Resume.pdf"
                    className="cv-download-action"
                  >
                    <Download size={16} />
                    <span>Download</span>
                  </a>
                </div>

                {/* Word Option */}
                <div className="cv-option-card">
                  <div className="cv-option-left">
                    <div className="cv-file-icon">
                      <FileWord size={24} />
                    </div>
                    <div className="cv-file-info">
                      <h4>Word Document (.docx)</h4>
                      <span>Editable format</span>
                    </div>
                  </div>

                  <a
                    href="/cv/Jheel_Jain_Resume.docx"
                    download="Jheel_Jain_Resume.docx"
                    className="cv-download-action"
                  >
                    <Download size={16} />
                    <span>Download</span>
                  </a>
                </div>
              </div>

              <div className="cv-modal-note">
                💡 <strong>File Placement Note:</strong> Replace files in{" "}
                <code>client/public/cv/</code> as <code>Jheel_Jain_Resume.pdf</code>{" "}
                and <code>Jheel_Jain_Resume.docx</code> to update your resume anytime.
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer>
        <div className="footer-content">
          <p className="footer-text">
            © {new Date().getFullYear()} Jheel Jain. Built with React, Vite & the
            MERN Stack.
          </p>
          <p className="footer-sub">
            Designed for performance, accessibility, and modern aesthetics.
          </p>
        </div>
      </footer>
    </div >
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;