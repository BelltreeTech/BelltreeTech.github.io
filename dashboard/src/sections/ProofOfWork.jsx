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
import { GithubIcon } from "../components/icons/BrandIcons";
import GlassCard from "../components/ui/GlassCard";
import MetricBadge from "../components/ui/MetricBadge";
import SectionHeader from "../components/ui/SectionHeader";
import { staggerContainer } from "../utils/animations";
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

export default function ProofOfWork() {
  return (
    <section className="relative px-8 sm:px-16 lg:px-24 py-28 overflow-hidden">
      <div className="absolute inset-0 dot-matrix opacity-30" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <SectionHeader sectionKey="projects" />

        {/* Project Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
        >
          {projects.map((project) => (
            <GlassCard key={project.id} className="p-8 sm:p-12 flex flex-col">
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
              <h3 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-primary)] mb-3 leading-tight">
                {project.name}
              </h3>
              <p className="text-base font-mono text-[var(--color-cyber-blue)] mb-6">
                {project.tagline}
              </p>

              {/* Problem / Solution */}
              <div className="space-y-6 mb-10 flex-1">
                <div>
                  <span className="text-sm font-mono text-[var(--color-text-muted)] uppercase tracking-wider">
                    {siteConfig.sections.projects.labels.problem}
                  </span>
                  <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] leading-loose mt-3">
                    {project.problem}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-mono text-[var(--color-text-muted)] uppercase tracking-wider">
                    {siteConfig.sections.projects.labels.solution}
                  </span>
                  <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] leading-loose mt-3">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Metrics — now using MetricBadge */}
              <div className="flex flex-wrap gap-3 mb-8">
                {project.metrics.map((m) => (
                  <MetricBadge
                    key={m.label}
                    icon={iconMap[m.icon] || Cpu}
                    value={m.value}
                    label={m.label}
                  />
                ))}
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2.5 pt-5 border-t border-[var(--color-border)]">
                {project.stack.map((tech) => (
                  <span key={tech} className="tech-tag px-4 py-1.5 text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
