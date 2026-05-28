import { motion } from "framer-motion";
import {
  Calendar,
  Server,
  Banknote,
  Users,
  ArrowRight,
  Flag,
  Rocket,
  Star,
} from "lucide-react";
import { roadmap, resourceRequests, profile, siteConfig } from "../data/portfolioData";

const iconMap = {
  server: Server,
  banknote: Banknote,
  users: Users,
};

const milestoneIcons = [Flag, Rocket, Star];

export default function ResourceRequest() {
  return (
    <section className="relative px-6 py-20 overflow-hidden">
      <div className="absolute inset-0 dot-matrix opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-[var(--color-text-muted)] tracking-[0.2em] uppercase block mb-3"
          >
            {`${siteConfig.sections.roadmap.number} // ${siteConfig.sections.roadmap.slug}`}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)]"
          >
            {siteConfig.sections.roadmap.title}
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-20 h-0.5 bg-gradient-to-r from-[var(--color-cyber-blue)] to-transparent mt-4 origin-left"
          />
        </div>

        {/* Horizontal Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card p-6 sm:p-8 mb-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connecting Line (desktop) */}
            <div className="hidden md:block absolute top-[42px] left-[16.5%] right-[16.5%] h-[2px] bg-gradient-to-r from-[var(--color-cyber-blue)] via-[var(--color-neon-emerald)] to-[var(--color-neon-purple)]" />

            {roadmap.map((phase, i) => {
              const MilestoneIcon = milestoneIcons[i];
              const colors = [
                "var(--color-cyber-blue)",
                "var(--color-neon-emerald)",
                "var(--color-neon-purple)",
              ];
              const color = colors[i];
              return (
                <div key={phase.year} className="relative text-center md:text-left">
                  {/* Phase Node */}
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center border-2 relative z-10"
                      style={{
                        borderColor: color,
                        background: `${color}15`,
                      }}
                    >
                      <MilestoneIcon size={16} style={{ color }} />
                    </div>
                    <div>
                      <span className="text-xs font-mono tracking-wider" style={{ color }}>
                        {phase.year}
                      </span>
                      <h4 className="text-base font-bold text-[var(--color-text-primary)]">
                        {phase.title}
                      </h4>
                    </div>
                  </div>

                  {/* Milestones */}
                  <ul className="space-y-2 pl-0 md:pl-[52px]">
                    {phase.milestones.map((ms) => (
                      <li key={ms} className="flex items-start gap-2 text-left">
                        <ArrowRight
                          size={12}
                          className="mt-1 flex-shrink-0"
                          style={{ color }}
                        />
                        <span className="text-sm text-[var(--color-text-secondary)]">{ms}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Resource Request Panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glow-border rounded-2xl p-6 sm:p-8 bg-[var(--color-bg-card)]"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] mb-2">
            {siteConfig.sections.roadmap.resourcePanel.title}
          </h3>
          <p className="text-sm text-[var(--color-text-muted)] font-mono mb-8">
            {siteConfig.sections.roadmap.resourcePanel.subtitle}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {resourceRequests.map((req) => {
              const Icon = iconMap[req.icon] || Server;
              return (
                <div
                  key={req.title}
                  className="glass-card p-5 text-center sm:text-left"
                >
                  <div className="flex items-center gap-3 mb-3 justify-center sm:justify-start">
                    <div className="w-10 h-10 rounded-xl bg-[rgba(0,229,255,0.08)] border border-[rgba(0,229,255,0.15)] flex items-center justify-center">
                      <Icon size={18} className="text-[var(--color-cyber-blue)]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[var(--color-text-primary)]">
                        {req.title}
                      </h4>
                      <span className="text-[10px] font-mono text-[var(--color-text-muted)]">
                        {req.subtitle}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {req.description}
                  </p>
                  <div className="mt-3">
                    <span
                      className={`text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full ${
                        req.priority === "HIGH"
                          ? "bg-[rgba(0,229,255,0.08)] text-[var(--color-cyber-blue)] border border-[rgba(0,229,255,0.15)]"
                          : "bg-[rgba(0,255,170,0.08)] text-[var(--color-neon-emerald)] border border-[rgba(0,255,170,0.15)]"
                      }`}
                    >
                      Priority: {req.priority}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href={siteConfig.sections.roadmap.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button text-base sm:text-lg"
            >
              <Calendar size={20} />
              {siteConfig.sections.roadmap.cta.label}
            </a>
            <p className="mt-4 text-xs text-[var(--color-text-muted)] font-mono">
              {siteConfig.sections.roadmap.cta.subtext}
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center pb-20 lg:pb-6"
        >
          <p className="text-xs font-mono text-[var(--color-text-muted)]">
            © 2026 {profile.name}. All Rights Reserved.
          </p>
          <p className="text-[10px] font-mono text-[var(--color-text-muted)]/50 mt-1">
            {siteConfig.sections.roadmap.footer.builtWith}
          </p>
        </motion.footer>
      </div>
    </section>
  );
}
