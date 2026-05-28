import { motion } from "framer-motion";
import {
  ExternalLink,
  Target,
  Zap,
  Cpu,
  Shield,
  FileText,
  Eye,
  Activity,
  HardDrive,
} from "lucide-react";

const GithubIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
import { projects, siteConfig } from "../data/portfolioData";

const iconMap = {
  target: Target,
  zap: Zap,
  cpu: Cpu,
  shield: Shield,
  "file-text": FileText,
  eye: Eye,
  activity: Activity,
  "hard-drive": HardDrive,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

export default function ProofOfWork() {
  return (
    <section className="relative px-6 sm:px-10 py-24 overflow-hidden">
      <div className="absolute inset-0 dot-matrix opacity-30" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-[var(--color-text-muted)] tracking-[0.2em] uppercase block mb-3"
          >
            {`${siteConfig.sections.projects.number} // ${siteConfig.sections.projects.slug}`}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)]"
          >
            {siteConfig.sections.projects.title}
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-20 h-0.5 bg-gradient-to-r from-[var(--color-cyber-blue)] to-transparent mt-4 origin-left"
          />
        </div>

        {/* Project Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 lg:gap-12"
        >
          {projects.map((project) => (
            <motion.article
              key={project.id}
              variants={cardVariants}
              className="glass-card p-7 sm:p-9 flex flex-col"
            >
              {/* Status */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] font-mono tracking-widest uppercase text-[var(--color-neon-emerald)] px-3 py-1 rounded-full border border-[rgba(0,255,170,0.2)] bg-[rgba(0,255,170,0.05)]">
                  {project.status}
                </span>
                <div className="flex gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-cyber-blue)] hover:border-[var(--color-cyber-blue)] transition-all"
                    >
                      <GithubIcon size={14} />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-neon-emerald)] hover:border-[var(--color-neon-emerald)] transition-all"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-2 leading-tight">
                {project.name}
              </h3>
              <p className="text-sm font-mono text-[var(--color-cyber-blue)] mb-5">
                {project.tagline}
              </p>

              {/* Problem / Solution */}
              <div className="space-y-5 mb-8 flex-1">
                <div>
                  <span className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider">
                    {siteConfig.sections.projects.labels.problem}
                  </span>
                  <p className="text-base text-[var(--color-text-secondary)] leading-relaxed mt-2">
                    {project.problem}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider">
                    {siteConfig.sections.projects.labels.solution}
                  </span>
                  <p className="text-base text-[var(--color-text-secondary)] leading-relaxed mt-2">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Metrics */}
              <div className="flex flex-wrap gap-3 mb-8">
                {project.metrics.map((m) => {
                  const Icon = iconMap[m.icon] || Cpu;
                  return (
                    <div key={m.label} className="metric-badge flex-1 min-w-[100px] p-3 sm:p-4">
                      <div className="flex items-center gap-2">
                        <Icon size={16} className="text-[var(--color-cyber-blue)]" />
                        <span className="metric-value text-2xl sm:text-3xl">{m.value}</span>
                      </div>
                      <span className="metric-label text-[11px]">{m.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2.5 pt-5 border-t border-[var(--color-border)]">
                {project.stack.map((tech) => (
                  <span key={tech} className="tech-tag px-4 py-1.5 text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
